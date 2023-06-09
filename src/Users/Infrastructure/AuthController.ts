import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
import type { User } from "../Domain/User";
import { UserService } from "../Application/UserService";
import { loginAuth } from "../../_Shared/Infrastructure/Auth";

export class AuthController {
  public router = Router();

  constructor(private userService: UserService) {
    this.router.get("/", loginAuth, this.login.bind(this));
  }

  /**
   * @swagger
   * /auth:
   *   get:
   *     summary: Login
   *     description: Login user by username and password
   *     security:
   *      - basicAuth: []
   *     tags:
   *      - auth
   *     responses:
   *       '200':
   *         description: OK
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal Server Error
   */
  login = async (req: Request, res: Response) => {
    const response = new ResponseApi<User>();

    try {
      response.setContent(req.user);
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };
}
