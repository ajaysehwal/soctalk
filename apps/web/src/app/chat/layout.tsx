"use client";
import Sidebar from "./components/sidebar";
import ChatSection from "./[id]/page";
import { useParams } from "next/navigation";
import Chat from "./page";
import { SocketProvider } from "../context/socketProvider";
import RightSideBar from "./components/RightSideBar";
export default function ChatSectionLayout() {
  const params = useParams();
  return (
    <SocketProvider>
      <div>
        <Sidebar />
        <div className="relative h-screen w-full lg:ps-64 dark:bg-black bg-white">
          {params.id ? <ChatSection /> : <Chat />}
        </div>
        <RightSideBar />
      </div>
    </SocketProvider>
  );
}
