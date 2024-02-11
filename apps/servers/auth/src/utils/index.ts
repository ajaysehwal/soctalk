import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return compare(password, hashedPassword);
};

export const generateJwtToken = (
  userId: string,
  username: string,
  res: Response
) => {
  const jwtkey = process.env.SECRETKEY || "authapp$82//@!";
  const access_token = jwt.sign(
    { userId, username, type: "access_token" },
    jwtkey,
    {
      expiresIn: "15d",
    }
  );
  const refreshToken = jwt.sign({ userId, type: "refresh_token" }, jwtkey, {
    expiresIn: "30d",
  });

  res.cookie("access_token", access_token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //15days
    httpOnly: false,
    secure: process.env.Node_ENV === "production",
    sameSite: "lax",
  });
  res.cookie("refresh_token", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    httpOnly: false,
    secure: process.env.Node_ENV === "production",
    sameSite: "lax",
  });
  return access_token;
};

export const StoreSession = (
  values: { username: string; userId: string },
  session: any
) => {
  return (session.user = {
    username: values.username,
    user_id: values.userId,
  });
};
