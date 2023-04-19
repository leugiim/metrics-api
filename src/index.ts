import express from "express";
import cors from "cors";
import passport from 'passport';
import session from 'express-session';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { useSwagger } from "./swagger";
import versionRouter from "./Version/Infrastructure/VersionController";

const app = express();
dotenv.config();

// Config cors
app.use(cors());

// Config auth
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Config swagger
app.use(useSwagger());

// Config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config routes
app.use("/version", versionRouter);

app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    `La aplicación está corriendo en el puerto ${process.env.PORT ?? 3000}.`
  );
});
