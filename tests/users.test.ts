import { UserService } from "../src/Users/Application/UserService";
import { Permission } from "../src/Users/Domain/User";
import { UserMockRepository } from "../src/Users/Infrastructure/UserMockRepository";

let userService: UserService;
let RIGHT_USER = "user";
let RIGHT_PASSWORD = "password";
let WRONG_USER = "wrong_user";
let WRONG_PASSWORD = "wrong_password";

beforeEach(() => {
  userService = new UserService(new UserMockRepository());
});

describe("UserService", () => {
  describe("findByUsername", () => {
    it("should return a user object", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      expect(user).toBeDefined();
      expect(user.username).toBe(RIGHT_USER);
    });
    it("should return a null if not exists", async () => {
      const user = await userService.findByUsername(WRONG_USER);

      expect(user).toBeNull();
    });
  });

  describe("login", () => {
    it("should return a user object using correct password", async () => {
      const user = await userService.login(RIGHT_USER, RIGHT_PASSWORD);

      expect(user).toBeDefined();
      expect(user.username).toBe(RIGHT_USER);
    });
    it("should return a user object using wrong username", async () => {
      const user = await userService.login(WRONG_USER, RIGHT_PASSWORD);

      expect(user).toBeNull();
    });
    it("should return a user object using wrong password", async () => {
      const user = await userService.login(RIGHT_USER, WRONG_PASSWORD);

      expect(user).toBeNull();
    });
  });

  describe("haveRolePermission", () => {
    it("should return true if use a user who can read companies", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canReadCompanies = true;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_READ_COMPANIES
      );

      expect(haveRole).toBe(true);
    });
    it("should return false if use a user who can not read companies", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canReadCompanies = false;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_READ_COMPANIES
      );

      expect(haveRole).toBe(false);
    });
    it("should return true if use a user who can write companies", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canWriteCompanies = true;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_WRITE_COMPANIES
      );

      expect(haveRole).toBe(true);
    });
    it("should return false if use a user who can not write companies", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canWriteCompanies = false;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_WRITE_COMPANIES
      );

      expect(haveRole).toBe(false);
    });
    it("should return true if use a user who can read metrics", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canReadMetrics = true;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_READ_METRICS
      );

      expect(haveRole).toBe(true);
    });
    it("should return false if use a user who can not write metrics", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canReadMetrics = false;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_READ_METRICS
      );

      expect(haveRole).toBe(false);
    });
    it("should return true if use a user who can write metrics", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canWriteMetrics = true;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_WRITE_METRICS
      );

      expect(haveRole).toBe(true);
    });
    it("should return false if use a user who can not write metrics", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.roles.canWriteMetrics = false;
      const haveRole = userService.haveRolePermission(
        user,
        Permission.CAN_WRITE_METRICS
      );

      expect(haveRole).toBe(false);
    });
  });

  describe("haveCompanyPermission", () => {
    it("should return true if use a user who can access to company", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.companiesPermissions = ["company"];
      const havePermission = userService.haveCompanyPermission(user, "company");

      expect(havePermission).toBe(true);
    });
    it("should return false if use a user who can not access to company", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.companiesPermissions = [];
      const havePermission = userService.haveCompanyPermission(user, "company");

      expect(havePermission).toBe(false);
    });
    it("should return false if use a user who can access to another company", async () => {
      const user = await userService.findByUsername(RIGHT_USER);

      user.companiesPermissions = ["another_company"];
      const havePermission = userService.haveCompanyPermission(user, "company");

      expect(havePermission).toBe(false);
    });
  });
});
