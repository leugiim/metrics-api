import passport from "passport";
import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
import type { User } from "../Domain/User";
import { UserService } from "../Application/UserService";
import { loginAuth } from "../../auth";

export class AuthController {
  public router = Router();

  constructor(private userService: UserService) {
    this.router.post(
      "/",
      loginAuth,
      this.login.bind(this)
    );
  }

  /**
   * @swagger
   * /auth:
   *   post:
   *     summary: Obtiene la versión de la api
   *     description: Obtiene la versión de la api
   *     tags:
   *      - auth
   *     responses:
   *       '200':
   *         description: OK
   */
  login = async (req: Request, res: Response) => {
    const response = new ResponseApi<User>();

    try {
      response.content = req.user as User;
    } catch (ex) {
      response.setError(ex);
    }

    res.status(response.httpStatus).json(response);
  };
}
