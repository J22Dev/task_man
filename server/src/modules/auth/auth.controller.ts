import { RequestHandler } from "express";
import { REGISTER_USER_MODEL } from "./auth.models";
import { db } from "../config/db";

export const registerUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body as REGISTER_USER_MODEL;
    const foundUser = await db.user.findUnique;
  } catch (error) {
    next(error);
  }
};
export const signInUserHandler: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const signOutUserHandler: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const refreshUserHandler: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
