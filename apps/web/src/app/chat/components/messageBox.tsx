import React from "react";
import { MessagesDataI } from "@/app/zustand";
import { useUser } from "@/app/hooks/useUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSkeletons } from "./Skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
const Message = ({
  message,
  isSender,
}: {
  message: string;
  isSender: boolean;
}) => {
  const listStyle = isSender
    ? "max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4"
    : "flex gap-x-2 sm:gap-x-4";
  const boxbgColor = isSender ? "bg-blue-600" : "bg-white";
  const innerDivbgColor =
    !isSender &&
    "leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 font-semibold";
  const textColor = isSender ? "text-white" : "text-gray-800";

  return (
    <li className={listStyle}>
      <div className={`grow ${isSender && "text-end"} space-y-3`}>
        <div className="inline-flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={`flex gap-1 inline-block ${boxbgColor}  rounded-2xl`}
          >
            {!isSender && (
              <Avatar>
                <AvatarImage
                  className="inline-block size-[29px] rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`inline-block ${innerDivbgColor} rounded-2xl p-4 shadow-sm`}
            >
              <p className={`text-sm ${textColor}`}>{message}</p>
            </div>
          </motion.div>
          {isSender && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500"
            >
              <svg
                className="flex-shrink-0 size-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 7 17l-5-5" />
                <path d="m22 10-7.5 7.5L13 16" />
              </svg>
              Sent
            </motion.span>
          )}
        </div>
      </div>
    </li>
  );
};
export default function messageBox({
  data,
  load,
}: {
  data: MessagesDataI[];
  load: boolean;
}) {
  const user = useUser();
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <ScrollArea className="w-[90%] m-auto p-4 rounded-md">
        <ul className="mt-16 space-y-5">
          {!data && load ? (
            <MessageSkeletons />
          ) : (
            data?.map((el, i) => (
              <Message
                key={i}
                message={el.content}
                isSender={el.sender === user?.id}
              />
            ))
          )}
        </ul>
      </ScrollArea>
    </div>
  );
}
