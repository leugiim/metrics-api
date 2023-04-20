import { Permission, User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async login(username: string, password: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findByUsername(
      username
    );

    if (!user) return null;
    if (user.password !== password) return null;

    delete user.password;
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if(user) delete user.password;
    return user;
  }

  haveRolePermission(user: User, permission: Permission): boolean {
    return !user.roles[permission];
  }

  haveCompanyPermission(user: User, companyName: string): boolean {
    return !user.companiesPermissions.includes(companyName);
  }
}
