import { Socket } from "socket.io-client";
import { create } from "zustand";

interface User {
  username: string;
  id?: string;
  _id?: string;
}

interface UserStore {
  user: User;
  users: User[];
  loading: boolean;
}

interface UserStoreActions {
  setUser: (user: User) => void;
  setUsers: (users:any) => void;
  setLoading: (loading: boolean) => void;
}

interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

export const userStore = create<UserStore & UserStoreActions>((set) => ({
  user: { username: "", _id: "" },
  loading: false,
  users: [],

  setUser: (user: User) => set({ user }),
  setUsers: (users) => set({ users }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export const socketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));

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
interface MessageStore {
  message: string;
  setMessage: (message: string) => void;
}
export const messageStore = create<MessageStore>((set) => ({
  message: "",
  setMessage: (message: string) => set({ message }),
}));

interface ConnectionRequestStoreI {
  request: User | null;
  setRequest: (request: User) => void;
}
export const ConnectionRequestStore = create<ConnectionRequestStoreI>(
  (set) => ({
    request: null,
    setRequest: (request: User) => set({ request }),
  })
);
