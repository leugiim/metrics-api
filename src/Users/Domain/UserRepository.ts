import { User } from "./User";

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  addCompanyPermission(user: User, companyName: string): Promise<User>;
}
