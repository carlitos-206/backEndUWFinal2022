const server = require("../server");

// Declare that `jes` will mock `mongoData`. Must be before the require
// statement for `mongoData`.
jest.mock("../dataInterface/mongoDB");
const mongoData = require("../dataInterface/mongoDB")

describe("/fires routes", () => {

  describe("GET /fires", () =>{
    it("should return an array of fire data on success", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return a status code of 500 on failure", async () => {
      /* TODO */
      expect(false).toEqual(true);
    })
  });

  describe("GET /fires/:id", () =>{
    it("should return a fire's data on success", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return status code 404 if fire is not found", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return a status code of 500 on failure", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
  });

  describe("GET /fires/comments/:id", () =>{
    it("should return a single comment's data on success", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return status code 404 if comment is not found", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return a status code of 500 on failure", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
  });

  describe("GET /fires/comments/user/:id", () =>{
    it("should return an array of user's comments on success", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return status code 404 if user is not found", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return a status code of 500 on failure", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
  });

  describe("GET /fires/comments/fire/:id", () =>{
    it("should return an array of fire's comments on success", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return status code 404 if fire is not found", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
    it("should return a status code of 500 on failure", async () => {
      /* TODO */
      expect(false).toEqual(true);
    });
  });

});