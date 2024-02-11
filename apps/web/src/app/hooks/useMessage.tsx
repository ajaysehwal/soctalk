"use client";
import { useContext, useState } from "react";
import { SocketContext } from "../context";

export const useMessage = () => {
  const { socket }: any = useContext(SocketContext);
  const [response, setResponse] = useState<string>("");
  const sendMessage = (message:string) => {
    if (socket) {
      socket.emit("message", message);
      getResponse();
    } else {
      throw new Error("sockets are not connected");
    }
  };
  const getResponse = () => {
    socket.on("message", (msg: string) => {
      setResponse(msg);
    });
  };
  return { sendMessage, response };
};
