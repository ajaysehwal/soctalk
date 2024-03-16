import { useContext } from "react";
import { SocketContext } from "../context/socketProvider";

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("Socket Context is undefined");
  }
  return state.socket;
};
