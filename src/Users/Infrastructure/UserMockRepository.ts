import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class UserMockRepository implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const users: User[] = [
      {
        username: "user",
        password: "password",
        roles: {
          canReadCompanies: false,
          canWriteCompanies: false,
          canReadMetrics: false,
          canWriteMetrics: false,
        },
        companiesPermissions: [],
      },
    ];

    return users.find((user) => user.username === username) ?? null;
  }

  async addCompanyPermission(user: User, companyName: string): Promise<User> {
    user.companiesPermissions.push(companyName);
    return user;
  }
}
