import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class UserMockRepository implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const users: User[] = [
      {
        username: "user1",
        password: "password",
        roles: {
          canReadCompanies: true,
          canWriteCompanies: true,
          canReadMetrics: true,
          canWriteMetrics: true,
        },
        companiesPermissions: ["company1", "company2"],
      },
      {
        username: "user2",
        password: "password",
        roles: {
          canReadCompanies: true,
          canWriteCompanies: true,
          canReadMetrics: true,
          canWriteMetrics: true,
        },
        companiesPermissions: ["company3"],
      },
      {
        username: "user3",
        password: "password",
        roles: {
          canReadCompanies: true,
          canWriteCompanies: false,
          canReadMetrics: true,
          canWriteMetrics: false,
        },
        companiesPermissions: ["company1"],
      },
      {
        username: "user4",
        password: "password",
        roles: {
          canReadCompanies: false,
          canWriteCompanies: false,
          canReadMetrics: false,
          canWriteMetrics: false,
        },
        companiesPermissions: ["company3"],
      },
    ];

    return users.find((user) => user.username === username) ?? null;
  }
}
