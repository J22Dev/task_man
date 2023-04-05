import jwt from "jsonwebtoken";
import argon from "argon2";
import { JWT_CONFIG } from "../config/config";

export const hashString = (string: string) => argon.hash(string);
export const verifyHash = (hash: string, plain: string) =>
  argon.verify(hash, plain);

type TOKEN_TYPE = "ACCESS" | "REFRESH";
type JWT_PAYLOAD = Record<string, string> & {
  sub: string;
};
type SIGN_JWT_PAYLOAD = {
  type: TOKEN_TYPE;
  payload: JWT_PAYLOAD;
};
type VERIFY_JWT_PAYLOAD = { type: TOKEN_TYPE; payload: string };

const getConfig = (type: TOKEN_TYPE) => {
  return JWT_CONFIG[type];
};
const signToken = ({ type, payload }: SIGN_JWT_PAYLOAD) => {
  const { SECRET, EXPIRES_IN } = getConfig(type);
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};
export const signUserTokens = (p: JWT_PAYLOAD) => {
  return {
    accessToken: signToken({ type: "ACCESS", payload: p }),
    refreshToken: signToken({ type: "REFRESH", payload: p }),
  };
};
export const signAccessToken = (p: JWT_PAYLOAD) =>
  signUserTokens(p).accessToken;
export const signRefreshToken = (p: JWT_PAYLOAD) =>
  signUserTokens(p).refreshToken;
export const verifyToken = async ({
  type,
  payload,
}: VERIFY_JWT_PAYLOAD): Promise<false | JWT_PAYLOAD> => {
  return new Promise((res, rej) => {
    jwt.verify(payload, getConfig(type).SECRET, (err, decoded) => {
      if (err) res(false);
      res(decoded as JWT_PAYLOAD);
    });
  });
};
