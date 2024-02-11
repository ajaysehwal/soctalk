import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoginInterface } from "../../interfaces";
import { Login } from "@/app/services";
export default function Loginform() {
  const router = useRouter();

  const server_host = process.env.SERVER_HOST ? process.env.SERVER_HOST : "";
  const login = new Login(server_host);
  const { toast } = useToast();
  const [load, setload] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<LoginInterface>();
  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    setload(true);
    try {
      const response = await login._validating(data);
      if (response.status) {
        toast({
          variant: "success",
          title: "Login Successfully",
        });
        router.push("/", { scroll: false });
      } else {
        toast({
          variant: "default",
          title: response.response,
        });
      }
      setload(false);
    } catch (err) {
      setload(false);
      toast({
        variant: "destructive",
        title: "Not Login Successfully",
      });
    }
  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          {/* <!-- Form Group --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-2 dark:text-white"
            >
              Username
            </label>
            <div className="relative">
              <Input
                {...register("username")}
                type="text"
                id="username"
                name="username"
              />
              <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                <svg
                  className="h-5 w-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="email-error">
              Please include a valid email address so we can get back to you
            </p>
          </div>
          {/* <!-- End Form Group -->

                <!-- Form Group --> */}
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm mb-2 dark:text-white"
              >
                Password
              </label>
              <a
                className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="../examples/html/recover-account.html"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                id="password"
                name="password"
              />
              <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                <svg
                  className="h-5 w-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="password-error">
              8+ characters required
            </p>
          </div>
          {/* <!-- End Form Group -->

                <!-- Checkbox --> */}
          <div className="flex items-center">
            <div className="flex">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              />
            </div>
            <div className="ms-3">
              <label htmlFor="remember-me" className="text-sm dark:text-white">
                Remember me
              </label>
            </div>
          </div>
          {/* <!-- End Checkbox --> */}

          <Button disabled={load} type="submit">
            {load ? (
              <>
                {" "}
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Signing...
              </>
            ) : (
              <>Sign up</>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
