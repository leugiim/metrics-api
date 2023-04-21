import { Company } from "../../Company/Domain/Company";
import { Permission, User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user) delete user.password;
    return user;
  }

  async login(username: string, password: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findByUsername(
      username
    );

    if (!user) return null;
    if (user.password !== password) return null;

    delete user.password;
    return user;
  }

  async addCompanyPermission(
    username: string,
    companyName: string
  ): Promise<User> {
    const user: User | null = await this.userRepository.findByUsername(
      username
    );
    if (!user) throw new Error("User not found");

    if (user.companiesPermissions.includes(companyName))
      throw new Error("User already have permission to access to this company");

    return await this.userRepository.addCompanyPermission(user, companyName);
  }

  haveRolePermission(user: User, permission: Permission): boolean {
    return user.roles[permission];
  }

  haveCompanyPermission(user: User, companyName: string): boolean {
    return user.companiesPermissions.some(permission => permission.toLowerCase() === companyName.toLowerCase());  }
}
