const request = require("supertest");
const server = require("../server");
// Declare that `jest` will mock `mongoData`. Must be before the `mongoData`
// import.
jest.mock("../dataInterface/mongoDB");
const mongoData = require("../dataInterface/mongoDB");

describe("/users routes", () => {

  describe("POST /users/register", () => {
    it("should return a message with a newObjectId on success", async () => {
      mongoData.createUser.mockResolvedValue({
        "newObjectId":"62fec4469f618fef99536602",
        "message":"User created! ID: 62fec4469f618fef99536602",
        "pass":"$#!&$#!&$#!&$#!&$#!&$#!&$#!&$#!&$#!&$#!&$#!&$#!&"
      });
      const res = await request(server).post("/users/register");
      expect(res.statusCode).toEqual(200);
      expect(res.body.newObjectId).toBeDefined();
      expect(res.body.Error).not.toBeDefined();
    });
    it("should return a status code of 500 on failure", async () => {
      mongoData.createUser.mockResolvedValue({
        "Error": "Failed to Create"
      });
      const res = await request(server).post("/users/register");
      expect(res.statusCode).toEqual(500);
      expect(res.body.Error).toBeDefined();
    });
  });

  describe("POST /users/login", () => {
    it("should return an object with username & email on success", async () => {
      mongoData.signIn.mockResolvedValue({
        "username":"user1",
        "email":"carlitos@uw.edu"
      });
      const res = await request(server).post("/users/login");
      expect(res.statusCode).toEqual(200);
      expect(res.body.username).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 on failure", async () => {
      mongoData.signIn.mockResolvedValue({
        "error": "Failed to locate user"
      });
      const res = await request(server).post("/users/login");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });

});