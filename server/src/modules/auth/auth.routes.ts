import { Router } from "express";
import * as authService from "./auth.controller";
import { valMiddleware } from "../middleware/val.middleware";
import { loginUserModel, registerUserModel } from "./auth.models";

export const authRouter = Router();

authRouter
  .post(
    "/register",
    valMiddleware(registerUserModel),
    authService.registerUserHandler
  )
  .post("/login", valMiddleware(loginUserModel), authService.signInUserHandler)
  .get("/refresh", authService.refreshUserHandler)
  .get("/logout", authService.signOutUserHandler);
