"use client";
import React, { useEffect } from "react";
import Loginform from "./components/form";
import { Button } from "@/components/ui/button";
import { GoogleSVG, Logo } from "../utils";
import { useAuth } from "../hooks";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(()=>{
    if (isAuthenticated()) {
      router.push("/", { scroll: false });
    }
  },[])
  
  return (
    <div
      className="h-[100vh] "
      style={{
        backgroundImage:
          "linear-gradient( 111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58% )",
      }}
    >
      <Logo />
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
            </div>

            <div className="mt-5">
              <Loginform />
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>
              <Button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <GoogleSVG />
                Sign in with Google
              </Button>
            </div>
            <div className="text-center">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account yet?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/register"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
