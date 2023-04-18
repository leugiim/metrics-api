import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { title, version } from "./routes/version";

export const useSwagger = () => {
  const router = express.Router();

  const options = {
    definition: {
      openapi: "3.0.0",
      info: { title, version },
      servers: [
        {
          url: `${process.env.URL}:${process.env.PORT}`,
        },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };

  const specs = swaggerJsdoc(options);

  router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  router.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  return router;
};
