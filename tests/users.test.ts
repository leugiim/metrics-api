import { UserService } from "../src/Users/Application/UserService";
import { UserMockRepository } from "../src/Users/Infrastructure/UserMockRepository";

let userService: UserService;

beforeEach(() => {
  userService = new UserService(new UserMockRepository());
});

describe("UserService", () => {
  describe("findByUsername", () => {
    it("should return a user object", async () => {
      const user = await userService.findByUsername("user1");

      expect(user).toBeDefined();
      expect(user.username).toBe("user1");
    });
    it("should return a null if not exists", async () => {
      const user = await userService.findByUsername("user12");

      expect(user).toBeNull();
    });
  });
});
