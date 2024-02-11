import React from "react";
import { Logo } from "../utils";

export default function Sidebar({activeuser}:{activeuser:number}) {
  return (
    <>
      <div className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[10] w-64 bg-blue-400 border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900 dark:border-gray-700">
        <nav className="hs-accordion-group w-full h-full flex flex-col">
          <div className="flex items-center justify-between pt-4 pe-4 ps-7 pb-2 text-blue-700 font-bold">
            <Logo />
          </div>

          <div className="h-full overflow-hidden"></div>

          <div className="mt-auto">
            <div className="py-2.5 px-7">
              <p className="inline-flex items-center gap-x-2 text-xs text-green-600">
                <span className="block w-1.5 h-1.5 rounded-full bg-green-600"></span>
                Active {activeuser} people
              </p>
            </div>
            {/* <AccountMenu /> */}
          </div>
        </nav>
      </div>
    </>
  );
}
