import { useState, useContext } from "react";
import { SocketContext } from "../context";

export const useSocket = () => {
  const [activeUsersCount, setActiveUserCount] = useState<number>(0);
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("Socket Context is undefined");
  }
  const io=state?.socket;

  state.socket?.getActiveUserCount((count: number) =>
    setActiveUserCount(count)
  );
  return { activeUsersCount  };
};
