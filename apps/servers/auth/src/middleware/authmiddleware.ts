import { Request, Response, NextFunction } from "express";
import PrismaQuery from "../models/prisma";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRETKEY || "yourSecretKey";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token=req.cookies.access_token;
  const prisma = new PrismaQuery();
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded: any = jwt.verify(token, secretKey);
    const user = await prisma.findUserById(decoded.userId);

    if (!user) {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
