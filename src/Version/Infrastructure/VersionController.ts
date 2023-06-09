import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
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
   *     summary: Get API version
   *     description: Get API information
   *     tags:
   *      - version
   *     responses:
   *       '200':
   *         description: OK
   */
  getVersion = async (req: Request, res: Response) => {
    const response = new ResponseApi();

    try {
      response.setContent({ title, version });
    } catch (ex) {
      response.setError(ex);
    }

    res.status(response.getHttpStatus()).json(response);
  };
}
