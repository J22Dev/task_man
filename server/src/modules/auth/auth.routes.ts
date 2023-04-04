import { Router } from "express";
import * as authService from "./auth.controller";

export const authRouter = Router();

authRouter
  .post("/register", authService.registerUserHandler)
  .post("/login", authService.signInUserHandler)
  .get("/refresh", authService.refreshUserHandler)
  .get("/logout", authService.signOutUserHandler);
