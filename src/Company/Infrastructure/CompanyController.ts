import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
import type { Company } from "../Domain/Company";
import {
  isLoged,
  haveRole,
  haveCompanyPermission,
} from "../../_Shared/Infrastructure/Auth";
import { CompanyService } from "../Application/CompanyService";
import { UserService } from "../../Users/Application/UserService";
import { Permission } from "../../Users/Domain/User";

export class CompanyController {
  public router = Router();

  constructor(
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.router.get(
      "/:name",
      isLoged,
      haveRole(Permission.CAN_READ_COMPANIES),
      haveCompanyPermission,
      this.getCompany.bind(this)
    );
  }

  /**
   * @swagger
   * /company/{name}:
   *   get:
   *     summary: Get company
   *     description: Get company by name
   *     parameters:
   *      - in: path
   *        name: name
   *        schema:
   *          type: string
   *        required: true
   *     security:
   *      - bearerAuth: []
   *     tags:
   *      - company
   *     responses:
   *       '200':
   *         description: OK
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal Server Error
   */
  getCompany = async (req: Request, res: Response) => {
    const response = new ResponseApi<Company>();

    try {
      let companyName = req.params.name;
      response.setContent(await this.companyService.findByName(companyName));
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };
}
