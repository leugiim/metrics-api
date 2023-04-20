import { request } from "./setup";

describe("Test the version path", () => {
  test("It should response the GET method", async () => {
    const response = await request.get("/version");
    expect(response.status).toBe(200);
  });
});
