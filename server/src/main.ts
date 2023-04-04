import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APP_CONFIG } from "./modules/config/config";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());

const main = async () => {
  app.listen(APP_CONFIG.PORT, () =>
    console.log(`Running On: ${APP_CONFIG.PORT}`)
  );
};

main();
