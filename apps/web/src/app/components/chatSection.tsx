import React from "react";
import MessageInput from "./messageInput";
import Navbar from "./navbar";
const Messages = [
  {
    FirstUser: "Hi",
    Seconduser: "Hello bhai",
  },
  {
    FirstUser: "or suna de bhai kya hall h",
    Seconduser: "kuck nhai bhai bs thik hu",
  },
  {
    FirstUser: "or kr kra h",
    Seconduser: "bs timepass or tu suna",
  },
];

export default function ChatSection() {
  return (
    <>
      <Navbar />
      <div className="w-[80%] m-auto">
        {Messages?.map((el) => (
          <ul className="space-y-5">
            <li className="flex ms-auto gap-x-2 sm:gap-x-4">
              <div className="grow text-end space-y-3">
                <div className="inline-flex flex-col justify-end">
                  <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-white"></p>
                  </div>

                  <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500">
                    <svg
                      className="flex-shrink-0 w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 7 17l-5-5" />
                      <path d="m22 10-7.5 7.5L13 16" />
                    </svg>
                    Sent
                  </span>
                </div>
              </div>

              <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
                <span className="text-sm font-medium text-white leading-none">
                  AZ
                </span>
              </span>
            </li>
            <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                alt="Image Description"
              />

              <div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                  <p className="text-sm text-gray-800 dark:text-white">
                    {el.Seconduser}
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Here're some links to get started
                    </p>
                    <ul>
                      <li>
                        <a
                          className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="../docs/index.html"
                        >
                          Installation Guide
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="../docs/frameworks.html"
                        >
                          Framework Guides
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <span className="mt-1.5 flex items-center gap-x-1 text-xs text-red-500">
                  <svg
                    className="flex-shrink-0 w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  Not sent
                </span>
              </div>
            </li>
          </ul>
        ))}
        <MessageInput  />
      </div>
    </>
  );
}
