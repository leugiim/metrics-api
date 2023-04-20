import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
import type { User } from "../Domain/User";
import { UserService } from "../Application/UserService";
import { isLoged } from "../../_Shared/Infrastructure/Auth";

export class UserController {
  public router = Router();

  constructor(private userService: UserService) {
    this.router.get("/", isLoged, this.get.bind(this));
  }

  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Get user
   *     description: Get user by token
   *     security:
   *      - bearerAuth: []
   *     tags:
   *      - user
   *     responses:
   *       '200':
   *         description: OK
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal Server Error
   */
  get = async (req: Request, res: Response) => {
    const response = new ResponseApi<User>();

    try {
      response.setContent(req.user);
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };
}
