"use client";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import { useUser } from "./useUser";
import { useScroller } from "./useScroller";

export interface MessagesDataI {
  _id: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: any;
  createdAt: any;
  updatedAt: any;
  __v: number;
}

export const useMessage = () => {
  const { handleScroll } = useScroller();
  const socket = useSocket();
  const user = useUser();
  const [messages, setMessages] = useState<MessagesDataI[]>([]);
  const [messagesLoad, setMessagesLoad] = useState<boolean>(false);

  const sendMessage = useCallback(
    (data: {
      content: string;
      sender: string | undefined;
      recipient: string | string[];
    }) => {
      if (data) {
        socket?.emit("sendMessage", data, (response: any) => {
          console.log("Message sent:", response);
        });
      }
    },
    [socket]
  );

  const getAllMessages = useCallback(
    (recipientId: string | string[]) => {
      setMessagesLoad(true);
    const check=  socket?.emit("requestMessages", recipientId, (messages: any) => {
        console.log("AllMessages",messages)
        setMessages(messages);
        setMessagesLoad(false);
        handleScroll();
      });
      console.log("chekcer",check);
    },
    [socket]
  );


  useEffect(() => {
   const handleReceivedMessage = (newMessage: any) => {
    setMessages((prev) => {
      const previousMessages = Array.isArray(prev) ? prev : [];
      return [...previousMessages, newMessage];
    });
      handleScroll();
    };

    socket?.on("receivedMessage", handleReceivedMessage);
    socket?.on("getMessage", handleReceivedMessage);

    return () => {
      socket?.off("receivedMessage", handleReceivedMessage);
      socket?.off("getMessage", handleReceivedMessage);
    };
  }, [socket, handleScroll]);

  return { sendMessage, getAllMessages, messages, messagesLoad };
};
