/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  // https://github.com/Quramy/jest-prisma/tree/main/packages/jest-prisma-node
  testEnvironment: "@quramy/jest-prisma-node/environment",
  setupFilesAfterEnv: ["<rootDir>/setup-prisma.js"],
};
