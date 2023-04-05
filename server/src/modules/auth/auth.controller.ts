import { RequestHandler } from "express";
import { LOGIN_USER_MODEL, REGISTER_USER_MODEL } from "./auth.models";
import { db } from "../config/db";
import {
  hashString,
  signUserTokens,
  verifyHash,
  verifyToken,
} from "./auth.utils";
import { COOKIE_CONFIG } from "../config/config";

export const registerUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body as REGISTER_USER_MODEL;
    // Check If User Exists
    const foundUser = await db.user.findFirst({
      where: {
        OR: [{ email: userData.email }, { userName: userData.userName }],
      },
    });
    if (foundUser) {
      const userName = foundUser.userName === userData.userName;
      const email = foundUser.email === userData.email;
      if (userName)
        return res.status(400).json({ message: "User Name In Use" });
      if (email) return res.status(400).json({ message: "Email In Use" });
    }
    // Hash Password and Create User
    const hashedPassword = await hashString(userData.password);
    const newUser = await db.user.create({
      data: { ...userData, password: hashedPassword },
    });
    // Sign Tokens
    const tokens = signUserTokens({ sub: newUser.userId });
    await db.user.update({
      where: { userId: newUser.userId },
      data: { refreshToken: tokens.refreshToken },
    });
    // Create Cookie and Send Payload
    const { password, refreshToken, ...rest } = newUser;
    return res
      .cookie("rToken", tokens.refreshToken, COOKIE_CONFIG)
      .status(201)
      .json({ user: rest, accessToken: tokens.accessToken });
  } catch (error) {
    next(error);
  }
};
export const signInUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body as LOGIN_USER_MODEL;
    // Check If User Exists
    const foundUser = await db.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (!foundUser) return res.status(401).json({ message: "Not Authorized" });
    const { password, refreshToken, ...rest } = foundUser;
    // Validate Password
    const isPasswordValid = await verifyHash(password, userData.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Not Authorized" });
    // Update Token
    const tokens = signUserTokens({ sub: foundUser.userId });
    await db.user.update({
      where: { userId: foundUser.userId },
      data: { refreshToken: tokens.refreshToken },
    });
    // Sign Cookie and Send User
    return res
      .cookie("rToken", tokens.refreshToken, COOKIE_CONFIG)
      .status(200)
      .json({ user: rest, accessToken: tokens.accessToken });
  } catch (error) {
    next(error);
  }
};
export const signOutUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.rToken;
    if (!refreshToken)
      return res
        .clearCookie("rToken", COOKIE_CONFIG)
        .status(200)
        .json({ message: "Signed Out" });
    const decoded = await verifyToken({
      type: "REFRESH",
      payload: refreshToken,
    });
    if (decoded === false)
      return res.status(401).json({ message: "Not Authorized" });
    await db.user.update({
      where: { userId: decoded.sub },
      data: { refreshToken: null },
    });
    return res
      .clearCookie("rToken", COOKIE_CONFIG)
      .status(200)
      .json({ message: "Signed Out" });
  } catch (error) {
    next(error);
  }
};

export const refreshUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.rToken;
    if (!token) return res.status(401).json({ message: "Not Authorized" });
    // Verify Token
    const decoded = await verifyToken({ type: "REFRESH", payload: token });
    if (decoded === false)
      return res.status(401).json({ message: "Not Authorized" });
    // Find User
    const foundUser = await db.user.findUnique({
      where: { userId: decoded.sub },
    });
    if (!foundUser) return res.status(403);
    const { password, refreshToken, ...rest } = foundUser;
    // Sign Token
    const accessToken = signUserTokens({ sub: foundUser.userId }).accessToken;
    // Return User and New Access Token
    return res.status(200).json({ user: rest, accessToken });
  } catch (error) {
    next(error);
  }
};
