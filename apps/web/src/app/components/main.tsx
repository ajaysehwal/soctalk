"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, useAuth, } from "../hooks";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import ChatSection from "./chatSection";
import { useMessage } from "../hooks/useMessage";
export default function Main(): JSX.Element {
  const router = useRouter();
  const { username } = useUser();
  const { logout } = useAuth();
  const {sendMessage,response}=useMessage();
  console.log(response);
  return (
    <>
    
        <div className="relative h-screen w-full lg:ps-64">
          <div className="py-10 lg:py-14">
            <Sidebar activeuser={30} />
            <ChatSection />
            <Button onClick={()=>sendMessage("hello world")}>Test</Button>
          </div>
        </div>
    </>
  );
}
