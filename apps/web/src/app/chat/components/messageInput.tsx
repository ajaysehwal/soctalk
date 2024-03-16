import { useMessage } from "@/app/hooks/useMessage";
import { useUser } from "@/app/hooks/useUser";
import { messageStore } from "@/app/zustand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FormEvent } from "react";

export default function MessageInput({
  recipientId,
}: {
  recipientId: string | string[];
}) {
  const { message, setMessage } = messageStore();
  const { sendMessage } = useMessage();
  const user = useUser();

  const handleMessage = (e: FormEvent) => {
    e.preventDefault();
    const newMessage = {
      content: message,
      sender: user?.id,
      recipient: recipientId,
    };
    sendMessage(newMessage);
  };

  return (
    <>
      <footer className="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 px-2 sm:py-6">
        <form
          method="post"
          onSubmit={(e) => handleMessage(e)}
          className="relative flex items-center align-middle justify-center"
        >
          <Input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Type your message here"
            className="p-4 block w-full h-[60px] bg-gray-100 border-gray-200 rounded-lg text-sm"
            required
          />
          <Button
            type="button"
            className="absolute right-[7px] inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </Button>
        </form>
      </footer>
    </>
  );
}
