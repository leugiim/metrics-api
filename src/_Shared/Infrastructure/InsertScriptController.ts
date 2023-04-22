import { Router, Request, Response } from "express";
import { ResponseApi } from "../../_Shared/Domain/ResponseApi";
import type { Company, Metric } from "../../Companies/Domain/Company";
import {
  isLoged,
  haveRole,
  haveCompanyPermission,
} from "../../_Shared/Infrastructure/Auth";
import { CompanyService } from "../../Companies/Application/CompanyService";
import { UserService } from "../../Users/Application/UserService";
import { Permission } from "../../Users/Domain/User";

export class InsertScriptController {
  public router = Router();
  private MAX = 200;
  private MIN = 50;

  constructor(
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.router.post(
      "/",
      isLoged,
      haveRole(Permission.CAN_WRITE_COMPANIES),
      haveRole(Permission.CAN_WRITE_METRICS),
      this.createCompanyWithManyMetrics.bind(this)
    );
  }

  /**
   * @swagger
   * /script:
   *   post:
   *     summary: Create company
   *     description: Create company with fake data
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               metricName:
   *                 type: string
   *               description:
   *                 type: string
   *                 description: Use "{{random}}" token to replace with random number
   *             required:
   *               - name
   *               - metricName
   *               - description
   *     security:
   *      - bearerAuth: []
   *     tags:
   *      - script
   *     responses:
   *       '200':
   *         description: OK
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal Server Error
   */
  createCompanyWithManyMetrics = async (req: Request, res: Response) => {
    const response = new ResponseApi<Company>();

    try {
      let companyName: string = req.body.name;
      let metricName: string = req.body.metricName;
      let description: string = req.body.description;
      if (!companyName) throw new Error("Company name is required");
      if (!metricName) throw new Error("Count is required");
      if (!description) throw new Error("Count is required");

      const company: Company = {
        name: companyName,
        metrics: {
          [metricName]: [],
        },
      };

      // Create 4 days of metrics
      for (let day = 17; day < 25; day++) {
        const count =
          Math.floor(Math.random() * (this.MAX - this.MIN + 1)) + this.MIN;

        for (let i = 0; i < count; i++) {
          const randomDate = new Date(`2023-04-${day}`);
          randomDate.setHours(Math.floor(Math.random() * 24));
          randomDate.setMinutes(Math.floor(Math.random() * 60));
          randomDate.setSeconds(Math.floor(Math.random() * 60));

          const randomDescription = description.replace(
            "{{random}}",
            Math.floor(Math.random() * 99999).toString()
          );

          const metric: Metric = {
            date: randomDate,
            description: randomDescription,
          };
          company.metrics[metricName].push(metric);
        }
      }

      await this.companyService.createCompany(company);
      try {
        // Skip if user have permission yet
        await this.userService.addCompanyPermission(req.username, company.name);
      } catch (ex) {}
      response.setContent(company);
    } catch (ex) {
      response.setError(ex);
    }

    return res.status(response.getHttpStatus()).json(response);
  };
}
