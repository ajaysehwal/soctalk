import { Express } from "express-serve-static-core";
import { AuthController } from "../controllers/authController";
export const InitAuthRoutes = (app: Express) => {
  const authController = new AuthController();
  app.post("/register", (req, res) => authController.register(req, res));
  app.post("/login", (req, res) => authController.login(req, res));
};
