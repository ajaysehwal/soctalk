import { Express } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/usersController";
import middleware from "../middleware";
export const initAuthRoutes = (app: Express) => {
  const authController = new AuthController();

  app.post("/login", (req, res) => authController.login(req, res));
  app.post("/register", (req, res) => authController.register(req, res));
};

export const InitUserDataRoutes = (app: Express) => {
  const userController = new UserController();

  app.get("/users",middleware,(req, res) => userController.getAllUsers(req, res));
};


