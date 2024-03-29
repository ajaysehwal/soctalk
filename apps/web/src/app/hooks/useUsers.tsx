import axios from "axios";
import { useCallback, useEffect } from "react";
import { userStore } from "../zustand";
import { configureAxios } from "../libs";
import Cookies from "js-cookie";
import { useUser } from "./useUser";
export const useUsers = () => {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
  const access_token = Cookies.get(ACCESS_TOKEN);
  const { setUsers, users, loading, setLoading } = userStore();
  const user = useUser();
  const current_user = user?.id;
  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/users`);
      const users = response.data.response;
      shuffleUsers(users);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching all users:", err);
    }
  }, []);
  useEffect(() => {
    configureAxios(access_token);
    getAllUsers();
  }, [current_user]);
  const selectedRecipient = (recipientId: string | string[]) => {
    const findrecipient = users.find((user) => user._id === recipientId);
    return { username: findrecipient?.username, _id: findrecipient?._id };
  };
  const shuffleUsers = (users: { username: string; _id: string }[]) => {
    const newUsers = [...users];
    for (let i = newUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newUsers[i], newUsers[j]] = [newUsers[j], newUsers[i]];
    }
    setUsers(newUsers);
  };
  return { users, loading, selectedRecipient };
};
