import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async login(username: string, password: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findByUsername(
      username
    );

    if (!user) return null;
    if (user.password !== password) return null;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}
