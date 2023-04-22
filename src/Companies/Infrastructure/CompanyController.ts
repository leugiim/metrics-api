import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
import type { Company, Metric } from "../Domain/Company";
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
      haveRole(Permission.CAN_READ_METRICS),
      haveCompanyPermission,
      this.getCompany.bind(this)
    );

    this.router.post(
      "/",
      isLoged,
      haveRole(Permission.CAN_WRITE_COMPANIES),
      this.createCompany.bind(this)
    );

    this.router.put(
      "/:name",
      isLoged,
      haveRole(Permission.CAN_WRITE_METRICS),
      haveCompanyPermission,
      this.createMetric.bind(this)
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
      let companyName = decodeURIComponent(req.params.name);
      response.setContent(await this.companyService.findByName(companyName));
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };

  /**
   * @swagger
   * /company:
   *   post:
   *     summary: Create company
   *     description: Create company by name
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *             required:
   *               - name
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
  createCompany = async (req: Request, res: Response) => {
    const response = new ResponseApi<Company>();

    try {
      let companyName = req.body.name;
      if (!companyName) throw new Error("Company name is required");

      const company = await this.companyService.createByName(companyName);
      await this.userService.addCompanyPermission(req.username, company.name);

      response.setContent(company);
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };

  /**
   * @swagger
   * /company/{name}:
   *   put:
   *     summary: Create metric
   *     description: Create metric in company by description
   *     parameters:
   *      - in: path
   *        name: name
   *        schema:
   *          type: string
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               metricName:
   *                 type: string
   *               description:
   *                 type: string
   *             required:
   *               - metricName
   *               - description
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
  createMetric = async (req: Request, res: Response) => {
    const response = new ResponseApi<Metric>();

    try {
      let companyName = decodeURIComponent(req.params.name);
      let metricName = req.body.metricName;
      if (!metricName) throw new Error("Metric name is required");
      let description = req.body.description;
      if (!description) throw new Error("Description is required");

      const metric = await this.companyService.createMetric(
        companyName,
        metricName,
        description
      );

      response.setContent(metric);
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };
}
