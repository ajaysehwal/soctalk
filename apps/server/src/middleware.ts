import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {User} from "./models";
const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('X-Authorization');
  const key = process.env.SECRET_KEY || "abcd@9999";
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
 try {
    const decoded: any = jwt.verify(token, key);
    const user = await User.findById(decoded.id);
     
    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default middleware;
