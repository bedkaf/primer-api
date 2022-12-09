
import express from "express";
import dotenv from "dotenv";
import accoutnRoutes from "./routes/account.js";

dotenv.config();

const PORT = process.env.PORT; //2345
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(accoutnRoutes);

expressApp.listen(PORT, () => {
  console.log(`Algo esta pasando en el puerto ${PORT}`);
});