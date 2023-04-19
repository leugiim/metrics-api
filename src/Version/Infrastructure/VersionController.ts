import express from "express";
import { ResponseApi } from "../../model/ResponseApi";
import { title, version } from "../Domain/Version";

const router = express.Router();

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
