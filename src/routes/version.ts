import express from "express";
import { ResponseApi } from "../model/ResponseApi";

const router = express.Router();

export const title = "Factorial metrics API";
export const version = "1.0.0";

/**
 * @swagger
 * /version:
 *   get:
 *     summary: Obtiene la versión de la api
 *     description: Obtiene la versión de la api
 *     tags:
 *      - version
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/", (req, res) => {
  const response = new ResponseApi();

  try {
    response.content = { title, version };
  } catch (ex) {
    response.setError(ex);
  }

  res.status(response.httpStatus).json(response);
});

export default router;
