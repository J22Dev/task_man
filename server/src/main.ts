import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APP_CONFIG } from "./modules/config/config";
import { errorMiddleware } from "./modules/middleware/error.middleware";
import { authRouter } from "./modules/auth/auth.routes";

export const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(errorMiddleware);

const main = async () => {
  app.listen(APP_CONFIG.PORT, () =>
    console.log(`Running On: ${APP_CONFIG.PORT}`)
  );
};

main();
