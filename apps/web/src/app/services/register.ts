import axios from "axios";
import { RegistationInterface } from "../interfaces";

export class Registration {
  private serverHost: (route: string) => string;

  constructor(serverHost: string) {
    if (!this.isValidURL(serverHost)) {
      throw new Error("Invalid server host URL");
    }
    this.serverHost = (route: string) => `${serverHost}${route}`;
  }
  private isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  private validateField(value: string, fieldName: string): string | null {
    if (value.trim() === "") {
      return `Please enter your ${fieldName}`;
    }
    return null;
  }

  private validatePassword(
    password: string,
    confirmPassword: string
  ): string | null {
    const passwordFieldError = this.validateField(password, "password");
    if (passwordFieldError) {
      return "Please enter vaild password";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/\d/.test(password)) {
      return "Password must contain at least one digit";
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return "Password must contain at least one special character";
    }

    if (/\s/.test(password)) {
      return "Password must not contain spaces";
    }

    if (password !== confirmPassword) {
      return "Both passwords should match";
    }

    return null;
  }

  private validateUsername(username: string): string | null {
    const usernameFieldError = this.validateField(username, "username");
    if (usernameFieldError) {
      return usernameFieldError;
    }
    return null;
  }

  private async register(
    data: RegistationInterface
  ): Promise<{ status: boolean; response?: any }> {
    try {
      const { username, password } = data;
      const response = await axios.post(
        this.serverHost("register"),
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data.message;
      return { status: false, response: errorMessage };
    }
  }

  public async _validating(
    inputs: RegistationInterface
  ): Promise<{ status: boolean; response?: string }> {
    try {
      const { password, confirmPassword, username } = inputs;

      const usernameValidationError = this.validateUsername(username);
      if (usernameValidationError) {
        return { status: false, response: usernameValidationError };
      }
      const passwordErrors = this.validatePassword(password, confirmPassword);
      if (passwordErrors) {
        return { status: false, response: passwordErrors };
      }

      const response = await this.register(inputs);
      return response;
    } catch (error) {
      return { status: false, response: "An unexpected error occurred" };
    }
  }
}
