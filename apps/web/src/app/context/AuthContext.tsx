"use client";
import { createContext, ReactNode, useReducer, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { Cookies } from "../services";
import React from "react";

const COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export interface AuthContextProps {
  load: boolean;
  error: Error | null;
  dispatch: Dispatch<AuthAction>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthState {
  load: boolean;
  error: Error | null;
}

export type AuthAction = { type: "LOGOUT" } | { type: "ERROR"; payload: Error };

const LOGOUT_ACTION = "LOGOUT";
const ERROR_ACTION = "ERROR";

export class AuthService {
  static isAuthenticated(): boolean {
    const cookies = new Cookies();
    const accessToken = cookies.getCookie(COOKIE_NAMES.ACCESS_TOKEN);
    return !!accessToken;
  }

  static logout(): void {
    try {
      const cookies = new Cookies();
      cookies.deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
      cookies.deleteCookie(COOKIE_NAMES.REFRESH_TOKEN);
    } catch (err) {
      console.error("Error during logout:", err);
      throw new Error("There was an error during logout");
    }
  }
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGOUT_ACTION:
      return { ...state, load: false, error: null };
    case ERROR_ACTION:
      return { ...state, error: action.payload, load: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, {
    load: false,
    error: null,
  });

  const logout = () => {
    try {
      AuthService.logout();
      dispatch({ type: LOGOUT_ACTION });
      router.push("/login", { scroll: false });
    } catch (err: any) {
      dispatch({ type: ERROR_ACTION, payload: err.message });
    }
  };

  const contextValue = {
    ...state,
    dispatch,
    logout,
    isAuthenticated: () => AuthService.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
