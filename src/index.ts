import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { useSwagger } from "./_Shared/Infrastructure/Swagger";
import {
  authController,
  companyController,
  userController,
  versionController,
  insertScriptController,
} from "./_Shared/Infrastructure/DependencyInjection";
import { JWT_SECRET } from "./_Shared/Infrastructure/Auth";

const app = express();
dotenv.config();

// Config cors
app.use(cors());

// Config auth
app.use(
  session({ secret: JWT_SECRET, resave: false, saveUninitialized: false })
);

// Config swagger
app.use(useSwagger());

// Config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config routes
app.use("/auth", authController.router);
app.use("/user", userController.router);
app.use("/company", companyController.router);
app.use("/version", versionController.router);
app.use("/script", insertScriptController.router);

export const server = app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    `La aplicación está corriendo en el puerto ${process.env.PORT ?? 3000}.`
  );
});

export default app;
