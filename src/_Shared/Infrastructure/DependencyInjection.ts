import { CompanyService } from "../../Companies/Application/CompanyService";
import { CompanyRepository } from "../../Companies/Domain/CompanyRepository";
import { CompanyFirebaseRepository } from "../../Companies/Infrastructure/CompanyFirebaseRepository";
import { UserService } from "../../Users/Application/UserService";
import { UserRepository } from "../../Users/Domain/UserRepository";
import { AuthController } from "../../Users/Infrastructure/AuthController";
import { CompanyController } from "../../Companies/Infrastructure/CompanyController";
import { UserFirebaseRepository } from "../../Users/Infrastructure/UserFirebaseRepository";
import { VersionController } from "../../Version/Infrastructure/VersionController";
import { UserController } from "../../Users/Infrastructure/UserController";
import { InsertScriptController } from "./InsertScriptController";

/** Users */
export const userRepository: UserRepository = new UserFirebaseRepository();
export const userService: UserService = new UserService(userRepository);
export const userController: UserController = new UserController(userService);
export const authController: AuthController = new AuthController(userService);

/** Company */
export const companyRepository: CompanyRepository =
  new CompanyFirebaseRepository();
export const companyService: CompanyService = new CompanyService(
  companyRepository
);
export const companyController: CompanyController = new CompanyController(
  companyService,
  userService
);

/** Version */
export const versionController: VersionController = new VersionController();

/** Insert script */
export const insertScriptController: InsertScriptController =
  new InsertScriptController(companyService, userService);
