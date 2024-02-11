"use client";
import React, { useEffect, useState } from "react";
import {io,Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
interface SocketContextProps{
  socket:Socket | undefined
}
export const SocketContext = React.createContext<SocketContextProps | null>(null);
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const serverUrl = process.env.Socket_Server || "";
  useEffect(()=>{
   const _socket=io(serverUrl);
   _socket.on('connect',()=>{
    console.log('Server connected');
   })
   setSocket(_socket);
   _socket.on('message',(msg)=>console.log(msg));
   return ()=>{
    _socket.disconnect();
   }
  },[serverUrl])
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
