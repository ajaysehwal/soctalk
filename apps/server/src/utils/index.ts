import { Response } from "express";
import jwt from "jsonwebtoken";
const secret_key = () => {
  return process.env.SECRET_KEY || "abcd@9999/";
};
export const generateTokenAndSetCookie = async (
  user: { username: string; id: any },
  res: Response
) => {
  const key = secret_key();
  const token = jwt.sign(user, key, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax",
  });
  return token;
};

export const JwtDecoder = (token:any) => {
  try {
    const decoded: any = jwt.decode(token);
    return decoded.id;
  } catch (err) {
    console.log(err);
    throw new Error(JSON.stringify(err));
  }
};
