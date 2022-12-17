console.clear();
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import accoutnRoutes from "./routes/account.js";
import authRRouter from "./routes/auth.js";
import authSessionRouter from "./routes/auth_session.js";
import authTokenRouter from "./routes/auth_token.js";

dotenv.config();

const PORT = process.env.PORT; //2345
const expressApp = express();

//activacion de midelware
expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use("/accoutn", accoutnRoutes);
expressApp.use("/auth", authRRouter);

expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/auth-session", authSessionRouter);

expressApp.listen(PORT, () => {
  console.log(`Algo esta pasando en el puerto ${PORT}`);
});