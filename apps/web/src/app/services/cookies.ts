import jwt from "jsonwebtoken";

interface CookieOptions {
  path: string;
  maxAge: number;
  sameSite: "Strict" | "Lax" | "None";
  secure: boolean;
}

export interface TokenPayload {
  username: string;
  exp?:number;
  iat?:number;
  type:string;
  userId:string;
}

class Cookies {
  private expires:string;
  private maxtime: number;
  private Security_Key: string;

  constructor() {
    this.expires = new Date(0).toUTCString();
    this.maxtime = 100 * 365 * 24 * 60 * 60;
    this.Security_Key =
      process.env.Security_Key || "uoqu@@@@yousoctalk";
  }

  private getCookieOptions(): CookieOptions {
    return {
      path: "/",
      maxAge: this.maxtime,
      sameSite: "Lax",
      secure: true,
    };
  }

  public setCookie(name: string, value: string | undefined) {
    try {
      const cookieOptions = this.getCookieOptions();
      const cookieString = `${name}=${value}; ${this.serializeCookieOptions(
        cookieOptions
      )};`;
      return (document.cookie = cookieString);
    } catch (err) {
      return err;
    }
  }

  public deleteCookie(name: string) {
    const cookieOptions = { ...this.getCookieOptions(), maxAge: 0 };
    const cookieString = `${name}=; ${this.serializeCookieOptions(
      cookieOptions
    )}`;
    return (document.cookie = cookieString);
  }

  public getCookie(name: string | undefined): string | undefined {
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split("=");
        if (cookieName === name) {
          return cookieValue;
        }
      }
    }
    return undefined;
  }

  private serializeCookieOptions(options: CookieOptions): string {
    return Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  }
}

export { Cookies };
