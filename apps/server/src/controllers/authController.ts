import {User} from "../models";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils";
export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password }: any = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Username not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Please enter valid password" });
      }

      const token = await generateTokenAndSetCookie(
        { id: user._id, username: user.username },
        res
      );

      res.status(200).json({
        _id: user._id,
        username: user.username,
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      console.log(user);
      if (user) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userBody = {
        username,
        password: hashedPassword,
      };
      const createUser = new User(userBody);
      if (createUser) {
        await createUser.save();
        const token = await generateTokenAndSetCookie(
          { id: createUser._id, username: createUser.username },
          res
        );

        res.status(201).json({
          _id: createUser._id,
          username: createUser.username,
        });
      }
    } catch (err) {
      return err;
    }
  }
}
