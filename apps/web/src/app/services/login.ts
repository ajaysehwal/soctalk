import axios from "axios";
import { LoginInterface } from "../interfaces";
interface Response {
  status: boolean;
  response: string;
}
export class Login {
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

  private validateField(value: string, fieldName: string) {
    if (value.trim() === "") {
      return `Please enter your ${fieldName}`;
    }
    return null;
  }
  private validatePassword(password: string) {
    return this.validateField(password, "password");
  }
  private validateUsername(username: string) {
    return this.validateField(username, "username");
  }
  private async login(data: LoginInterface): Promise<Response> {
    try {
      const response = await axios.post(this.serverHost("login"), data, {
        withCredentials: true,
      });
      return { status: true, response: response.data.response };
    } catch (err: any) {
      const error = err.response?.data?.message;
      return { status: false, response: error };
    }
  }
  public async _validating(inputs: LoginInterface): Promise<Response> {
    const { username, password } = inputs;
    const usernameError = this.validateUsername(username);
    const passwordError = this.validatePassword(password);
    if (usernameError) {
      return { status: false, response: usernameError };
    }
    if (passwordError) {
      return { status: false, response: passwordError };
    }
    const LoginResponse = await this.login(inputs);
    return LoginResponse;
  }
}
