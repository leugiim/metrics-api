import { Router, Request, Response } from "express";
import { ResponseApi } from "../../model/ResponseApi";
import { title, version } from "../Domain/Version";

export class VersionController {
  public router = Router();

  constructor() {
    this.router.get("/", this.getVersion.bind(this));
  }

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
  getVersion = async (req: Request, res: Response) => {
    const response = new ResponseApi();

    try {
      response.content = { title, version };
    } catch (ex) {
      response.setError(ex);
    }

    res.status(response.httpStatus).json(response);
  };
}
