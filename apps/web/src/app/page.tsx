"use client";
import { SocketProvider } from "./context/socketProvider";

export default function Home() {
  return (
    <SocketProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </SocketProvider>
  );
}
