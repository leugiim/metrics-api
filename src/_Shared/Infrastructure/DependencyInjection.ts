import { UserService } from "../../Users/Application/UserService";
import { UserRepository } from "../../Users/Domain/UserRepository";
import { AuthController } from "../../Users/Infrastructure/AuthController";
import { UserFirebaseRepository } from "../../Users/Infrastructure/UserFirebaseRepository";
import { VersionController } from "../../Version/Infrastructure/VersionController";

/** Users */
export const userRepository: UserRepository = new UserFirebaseRepository();
export const userService: UserService = new UserService(userRepository);
export const authController: AuthController = new AuthController(userService);

/** Version */
export const versionController: VersionController = new VersionController();
