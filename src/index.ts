import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { useSwagger } from "./swagger";
import versionRouter from "./routes/version";

const app = express();
dotenv.config();

app.use(cors());
app.use(useSwagger());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/version", versionRouter);

app.get("/", (_req, res) => {
  res.send("¡Hola, mundo!");
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    `La aplicación está corriendo en el puerto ${process.env.PORT ?? 3000}.`
  );
});
