import { Cookies } from "../services";
import { useEffect, useMemo, useState } from "react";
import jwt from "jsonwebtoken";
interface User {
  username: string;
  id: string;
}
export const useUser = (): User => {
  const [user, setUser] = useState<User>({ username: "", id: "" });

  const getUser = useMemo(
    () => async () => {
      try {
        const cookies = new Cookies();
        const token = cookies.getCookie("access_token");
        if (token) {
          const decoded = jwt.decode(token);
          const { username, userId }: any = decoded;
          const neededValues = { username, id: userId };
          setUser(neededValues);
        } else {
          throw new Error("Unable to find access_token");
        }
      } catch (err: any) {
        throw new Error(err.message);
      }
    },
    []
  );

  useEffect(() => {
    getUser();
  }, [getUser]);
  return user;
};
