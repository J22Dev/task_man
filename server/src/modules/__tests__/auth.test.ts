import { app } from "../../main";
import superTest from "supertest";

const user = {
  firstName: "James",
  lastName: "Smith",
  email: "jtz@mail.io",
  userName: "jtz1234",
  password: "3edc4rfv#EDC$RFV",
};
describe("auth", () => {
  // Register Route
  describe("Register User", () => {
    describe("Success", () => {
      it("Should Return User and Access Token", async () => {
        const res = await superTest(app).post("/auth/register").send(user);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("user");
        expect(res.body).toHaveProperty("accessToken");
      });
    });
    describe("User Exists", () => {
      it("Should State User Name or Email In Use", async () => {
        const res = await superTest(app).post("/auth/register").send(user);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("In Use");
      });
    });
  });
  // Sign In Route
  describe("Sign In User", () => {
    describe("Success", () => {
      it("Should Return User and Access Token", async () => {
        const res = await superTest(app)
          .post("/auth/login")
          .send({ email: user.email, password: user.password });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("user");
        expect(res.body).toHaveProperty("accessToken");
      });
    });
    describe("Failure", () => {
      it("Should Return 401, Not Authorized", async () => {
        const res = await superTest(app)
          .post("/auth/login")
          .send({
            email: user.email,
            password: user.password.slice(0, user.password.length - 1) + "1",
          });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
      });
    });
  });
  // Refresh Route
});
