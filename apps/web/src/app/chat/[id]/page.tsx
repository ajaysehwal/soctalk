"use client";
import { messageStore } from "@/app/zustand";
import { useParams } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import { useUsers } from "@/app/hooks/useUsers";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";
import MessageBox from "../components/messageBox";
import { useMessage } from "@/app/hooks/useMessage";
import { useScroller } from "@/app/hooks/useScroller";
import MessageInput from "../components/messageInput";
import { Navbar } from "../components/navbar";
export default function ChatSection() {
  const { selectedRecipient } = useUsers();
  const { id } = useParams();
  const { handleScroll } = useScroller();
  const selectedUser = selectedRecipient(id);
  const socket = useSocket();
  const { getAllMessages, messages, messagesLoad } = useMessage();
  useEffect(() => {
    if (id) {
      getAllMessages(id);
    }
    return () => {
      socket?.off("requestMessages");
    };
  }, [socket,id]);

  useEffect(() => {
    handleScroll();
  }, [messages,id]);
  return (
    <>
      <Navbar selectedUser={selectedUser} />
      <MessageBox data={messages} load={messagesLoad} />
      <MessageInput recipientId={id} />
    </>
  );
}
