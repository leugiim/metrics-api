module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  coveragePathIgnorePatterns: ["<rootDir>/tests"],
  testMatch: ["**/tests/**/*.test.ts"],
};
