import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userStore } from "../zustand";
import { configureAxios } from "../libs";
import { useSocket } from ".";

interface User {
  username: string;
  id?: string;
}

export const useUser = (): User | undefined => {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
  const access_token = Cookies.get(ACCESS_TOKEN);
  const { user, setUser } = userStore();
  const [connections, setConnection] = useState([]);
  const fetchUser = async (token: string | undefined): Promise<void> => {
    try {
      if (token) {
        const decodedData = jwt.decode(token) as JwtPayload | null;

        if (decodedData) {
          const { username, id } = decodedData;
          setUser({ username, id });
        }
      } else {
        setUser({ username: "" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getUserConnections = () => {};
 
  useEffect(() => {
    configureAxios(access_token);
    const fetchData = async (): Promise<void> => {
      await fetchUser(access_token);
    };
    fetchData();
  }, [access_token, setUser]);

  return user;
};
