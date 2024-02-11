import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Registration } from "../../services";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegistationInterface } from "../../interfaces";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Registerform() {
  const router = useRouter();
  const server_host = process.env.SERVER_HOST
    ? process.env.SERVER_HOST
    : "";
  const registration = new Registration(server_host);
  const { toast } = useToast();
  const [load, setload] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<RegistationInterface>();
  const onSubmit: SubmitHandler<RegistationInterface> = async (data) => {
    setload(true);
    const result = await registration._validating(data);
    setload(false);
    if (!result.status) {
      toast({
        variant: "destructive",
        title: result.response,
        description: "There was a problem with your request.",
      });
    } else {
      toast({
        variant: "success",
        title: "Registration Successfully",
        description: "Thank you for joining our SocTalk User Community",
      });
      setTimeout(() => {
        router.push("/", { scroll: false });
      }, 1000);
      setload(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="grid gap-y-4">
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
                aria-describedby="email-error"
              />
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
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
          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-2 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                id="password"
                name="password"
              />
              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
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

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm mb-2 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type="text"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
          </div>

          <Button disabled={load} type="submit">
            {load ? (
              <>
                {" "}
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
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
