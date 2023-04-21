import supertest from "supertest";
import app, { server } from "../src";

beforeAll(() => {});

afterAll(async () => {
  await server.close();
});

export const request = supertest(app);
