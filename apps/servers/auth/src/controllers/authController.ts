import { Request, Response } from "express";
import bcrypt from "bcrypt";

import PrismaQuery from "../models/prisma";
import { generateJwtToken } from "../utils";
class UserService {
  private prisma: PrismaQuery;

  constructor() {
    this.prisma = new PrismaQuery();
  }

  async createUser(username: string, password: string) {
    return this.prisma.createUser(username, password);
  }

  async findUserByUsername(username: string) {
    return this.prisma.findUserByUsername(username);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string) {
    const password = plainPassword.trim();
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  }
}

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const existingUser = await this.userService.findUserByUsername(username);

      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Username already registered",
        });
      }
      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      const newUser = await this.userService.createUser(
        username,
        hashedPassword
      );
      if (!newUser) {
        return res.status(401).json({
          status: false,
          response: "There is error in database",
        });
      }
      const token = generateJwtToken(newUser.id, newUser.username, res);
      return res.status(201).json({
        status: true,
        response: token,
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const existingUser = await this.userService.findUserByUsername(username);
      if (!existingUser) {
        return res.status(400).json({
          status: false,
          message: "Username not exists",
        });
      }
      const passwordValidate = await this.userService.comparePasswords(
        password,
        existingUser.password
      );
      if (!passwordValidate) {
        return res.status(400).json({
          status: false,
          message: "Invalid password, try again",
        });
      }
      const token = generateJwtToken(
        existingUser.id,
        existingUser.username,
        res
      );

      return res.json({
        status: true,
        response: token,
      });
    } catch (error) {
      console.error("Error during user login:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
  }
}
