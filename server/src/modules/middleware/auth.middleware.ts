import { RequestHandler } from "express";
import { verifyToken } from "../auth/auth.utils";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const bearerToken =
      req.headers.authorization || req.headers["Authorization"];
    if (!bearerToken)
      return res.status(401).json({ message: "Not Authorized" });
    const token = (bearerToken as string).split(" ")[1];
    const decoded = await verifyToken({ type: "ACCESS", payload: token });
    if (!decoded) return res.status(401).json({ message: "Not Authorized" });
    (req as any).userId = decoded.sub;
    next();
  } catch (error) {
    next(error);
  }
};
