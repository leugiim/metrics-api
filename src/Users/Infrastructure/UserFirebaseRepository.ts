import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";
import { firebase } from "../../_Shared/Infrastructure/Firebase";

export class UserFirebaseRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Implementar el método findById
    return null;
  }

  async findByUsername(username: string): Promise<User | null> {
    // Implementar el método findByUsername
    return null;
  }
}
