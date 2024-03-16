"use client";
import { useUser } from "@/app/hooks/useUser";
import { useUsers } from "@/app/hooks/useUsers";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SidebarUsers from "./sidebarUsers";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarShortcut,
} from "@/components/ui/menubar";
export default function Sidebar() {
  const user = useUser();
  const router = useRouter();
  const handlelogOut = () => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
    Cookies.remove(ACCESS_TOKEN);
    router.push("/login");
  };
  return (
    <div
      id="application-sidebar"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900 dark:border-gray-700"
    >
      <nav
        className="hs-accordion-group size-full flex flex-col"
        data-hs-accordion-always-open
      >
        <div className="flex items-center justify-between pt-4 pe-4 ps-7">
          <p className="text-2xl font-semibold">
            {" "}
            Soc<span className="text-blue-600 font-bold">Talk</span>
          </p>
        </div>
        <SidebarUsers />
        <div className="mt-auto">
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="flex align-center items-center  gap-3 w-full border-gray-200 dark:border-gray-700">
                  {user?.username}
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </nav>
    </div>
  );
}
