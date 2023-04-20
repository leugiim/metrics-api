import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { title, version } from "../../Version/Domain/Version";

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
      security: [{
        bearerAuth: [],
      }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      }
    },
    apis: ["./src/**/Infrastructure/*Controller.ts"],
  };

  const specs = swaggerJsdoc(options);

  router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  router.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  return router;
};
