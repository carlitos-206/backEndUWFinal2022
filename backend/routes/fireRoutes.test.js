const request = require("supertest");
const server = require("../server");
// Declare that `jest` will mock `mongoData`. Must be before the `mongoData`
// import.
jest.mock("../dataInterface/mongoDB");
const mongoData = require("../dataInterface/mongoDB");

describe("/fires routes", () => {

  describe("GET /fires", () =>{
    it("should return an array of fire data on success", async () => {
      mongoData.getAllFires.mockResolvedValue([{
        "_id":"62fb42131c5b7ea309f7e0e0",
        "total_acres":null,
        "containment_datetime":"2014-08-24T18:59:59Z",
        "control_datetime":"2014-08-24T19:01:00Z",
        "daily_acres":0.1,"discovery_acres":null,
        "estimated_cost_to_date":null,
        "final_fire_report_approved_date":null,
        "fire_origin":{
          "cause":"Natural",
          "general":null,
          "specific":null
        },
        "fire_discovery_datetime":"2014-07-17T20:07:59Z",
        "fire_out_datetime":"2014-08-28T18:59:59Z",
        "incident_name":"DUNCAN HILL 2-ENTIAT",
        "location":{
          "latitude":null,
          "longitude":null,
          "city":null,
          "county":"Chelan",
          "state":"US-WA"
        },
        "predominant_fuel_group":null,
        "modified_by_system":"wfdss",
        "created_on_datetime":"2014-08-29T01:20:27Z",
        "modified_on_datetime":"2014-08-29T18:46:06Z",
        "source":"IRWIN",
        "admin":{
          "created":"2022-08-16T07:06:59.277Z",
          "modified":null
        }}]);
      const res = await request(server).get("/fires");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 500 on failure", async () => {
      mongoData.getAllFires.mockResolvedValue();
      const res = await request(server).get("/fires");
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /fires/:id", () =>{
    it("should return a fire's data on success", async () => {
      mongoData.getFireById.mockResolvedValue({
        "_id":"62fb42131c5b7ea309f7e0e0",
        "total_acres":null,
        "containment_datetime":"2014-08-24T18:59:59Z",
        "control_datetime":"2014-08-24T19:01:00Z",
        "daily_acres":0.1,"discovery_acres":null,
        "estimated_cost_to_date":null,
        "final_fire_report_approved_date":null,
        "fire_origin":{
          "cause":"Natural",
          "general":null,
          "specific":null
        },
        "fire_discovery_datetime":"2014-07-17T20:07:59Z",
        "fire_out_datetime":"2014-08-28T18:59:59Z",
        "incident_name":"DUNCAN HILL 2-ENTIAT",
        "location":{
          "latitude":null,
          "longitude":null,
          "city":null,
          "county":"Chelan",
          "state":"US-WA"
        },
        "predominant_fuel_group":null,
        "modified_by_system":"wfdss",
        "created_on_datetime":"2014-08-29T01:20:27Z",
        "modified_on_datetime":"2014-08-29T18:46:06Z",
        "source":"IRWIN",
        "admin":{
          "created":"2022-08-16T07:06:59.277Z",
          "modified":null
        }});
      const res = await request(server).get("/fires/62fb42131c5b7ea309f7e0e0");
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 500 on failure", async () => {
      mongoData.getFireById.mockResolvedValue();
      const res = await request(server).get("/fires/abc");
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("POST /fires", () =>{
    it("should return a success message with the new fire's id on success", async () => {
      mongoData.getFireById.mockResolvedValue({
        newObjectId: "$#!&$#!&$#!",
        message: "Fire created! ID: $#!&$#!&$#!"
      });
      const res = await request(server).post("/fires");
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 500 on failure", async () => {
      mongoData.getFireById.mockResolvedValue();
      const res = await request(server).post("/fires");
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /fires/comments/:id", () =>{
    it("should return a single comment's data on success", async () => {
      mongoData.getFireCommentByCommentId.mockResolvedValue({
        "_id":"630250491f3d48c59da2eec7",
        "username":"User1",
        "text":"Khanh Test fire comments",
        "fire_id":"62fb42131c5b7ea309f7e0e0",
        "createdDate":"2022-08-22T07:00:00.000Z"
      });
      const res = await request(server).get("/fires/comments/630250491f3d48c59da2eec7");
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return status code 404 if comment is not found", async () => {
      mongoData.getFireCommentByCommentId.mockResolvedValue({
        "error": "No comments found for commentId: abc"
      });
      const res = await request(server).get("/fires/comments/abc");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /fires/comments/user/:id", () =>{
    it("should return an array of user's comments on success", async () => {
      mongoData.getFireCommentsByUser.mockResolvedValue([{
        "_id":"630250491f3d48c59da2eec7",
        "username":"User1",
        "text":"Khanh Test fire comments",
        "fire_id":"62fb42131c5b7ea309f7e0e0",
        "createdDate":"2022-08-22T07:00:00.000Z"
      }]);
      const res = await request(server).get("/fires/comments/user/User1");
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return status code 404 if user is not found", async () => {
      mongoData.getFireCommentsByUser.mockResolvedValue({
        "message": "No comments found for userId: ${req.params.id}"
      });
      const res = await request(server).get("/fires/comments/user/abc")
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /fires/:id/comments", () =>{
    it("should return an array of fire's comments on success", async () => {
      mongoData.getFireCommentsByFire.mockResolvedValue([{
        "_id":"630250491f3d48c59da2eec7",
        "username":"User1",
        "text":"Khanh Test fire comments",
        "fire_id":"62fb42131c5b7ea309f7e0e0",
        "createdDate":"2022-08-22T07:00:00.000Z"
      }]);
      const res = await request(server).get("/fires/62fb42131c5b7ea309f7e0e0/comments");
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return status code 404 if fire is not found", async () => {
      mongoData.getFireCommentsByFire.mockResolvedValue({
        "error": "No comments found for fireid: abc"
      });
      const res = await request(server).get("/fires/abc/comments");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });

});