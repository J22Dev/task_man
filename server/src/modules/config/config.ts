import dotenv from "dotenv";
dotenv.config();

export const APP_CONFIG = {
  PORT: parseInt(process.env.PORT as string),
  NODE_ENV: process.env.NODE_ENV as string,
};

export const JWT_CONFIG = {
  ACCESS: {
    SECRET: process.env.JWT_ACCESS_SECRET as string,
    EXPIRES_IN: process.env.JWT_ACCESS_EXPIRATION as string,
  },
  REFRESH: {
    SECRET: process.env.JWT_REFRESH_SECRET as string,
    EXPIRES_IN: process.env.JWT_REFRESH_EXPIRATION as string,
  },
};

export const OBJECT_STORAGE_CONFIG = {};
