"use client";
import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { socketStore } from "../zustand";
import { useUser } from "../hooks/useUser";
import Cookies from "js-cookie";
interface SocketProviderProps {
  children?: React.ReactNode;
}
interface SocketContextProps {
  socket: Socket | null;
}
export const SocketContext = React.createContext<SocketContextProps | null>(
  null
);
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const user = useUser();
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
  const access_token = Cookies.get(ACCESS_TOKEN);
  const { socket, setSocket } = socketStore();
  const serverUrl = process.env.SERVER_URL || "";
  useEffect(() => {
    const _socket = io(serverUrl, {
      query: { userId: user?.id, token: access_token },
    });
    _socket.on("connection", () => {
      console.log("Server connected");
    });
    setSocket(_socket);
    socket?.emit("sender", user?.id);
    return () => {
      _socket.disconnect();
    };
  }, [serverUrl, user?.id]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
