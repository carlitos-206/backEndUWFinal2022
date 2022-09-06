const request = require("supertest");
const server = require("../server");
// Declare that `jest` will mock `mongoData`. Must be before the `mongoData`
// import.
jest.mock("../dataInterface/mongoDB");
const mongoData = require("../dataInterface/mongoDB");

describe("/fires routes", () => {
  // test get all fires
  describe("GET /fires", () => {
    it("should return an array of fire data on success", async () => {
      mongoData.getAllFires.mockResolvedValue([
        {
          _id: "62fb42131c5b7ea309f7e0e0",
          total_acres: null,
          containment_datetime: "2014-08-24T18:59:59Z",
          control_datetime: "2014-08-24T19:01:00Z",
          daily_acres: 0.1,
          discovery_acres: null,
          estimated_cost_to_date: null,
          final_fire_report_approved_date: null,
          fire_origin: {
            cause: "Natural",
            general: null,
            specific: null,
          },
          fire_discovery_datetime: "2014-07-17T20:07:59Z",
          fire_out_datetime: "2014-08-28T18:59:59Z",
          incident_name: "DUNCAN HILL 2-ENTIAT",
          location: {
            latitude: null,
            longitude: null,
            city: null,
            county: "Chelan",
            state: "US-WA",
          },
          predominant_fuel_group: null,
          modified_by_system: "wfdss",
          created_on_datetime: "2014-08-29T01:20:27Z",
          modified_on_datetime: "2014-08-29T18:46:06Z",
          source: "IRWIN",
          admin: {
            created: "2022-08-16T07:06:59.277Z",
            modified: null,
          },
        },
      ]);
      const res = await request(server).get("/fires");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });

    it("should return a status code of 500 on failure", async () => {
      mongoData.getAllFires.mockResolvedValue({
        error: "Failed to retrieve fire data.",
      });
      const res = await request(server).get("/fires");
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
    // test fires by fireid
    describe("GET /fires/:id", () => {
      it("should return a fire's data on success", async () => {
        mongoData.getFireById.mockResolvedValue({
          _id: "62fb42131c5b7ea309f7e0e0",
          total_acres: null,
          containment_datetime: "2014-08-24T18:59:59Z",
          control_datetime: "2014-08-24T19:01:00Z",
          daily_acres: 0.1,
          discovery_acres: null,
          estimated_cost_to_date: null,
          final_fire_report_approved_date: null,
          fire_origin: {
            cause: "Natural",
            general: null,
            specific: null,
          },
          fire_discovery_datetime: "2014-07-17T20:07:59Z",
          fire_out_datetime: "2014-08-28T18:59:59Z",
          incident_name: "DUNCAN HILL 2-ENTIAT",
          location: {
            latitude: null,
            longitude: null,
            city: null,
            county: "Chelan",
            state: "US-WA",
          },
          predominant_fuel_group: null,
          modified_by_system: "wfdss",
          created_on_datetime: "2014-08-29T01:20:27Z",
          modified_on_datetime: "2014-08-29T18:46:06Z",
          source: "IRWIN",
          admin: {
            created: "2022-08-16T07:06:59.277Z",
            modified: null,
          },
        });
        const res = await request(server).get(
          "/fires/62fb42131c5b7ea309f7e0e0"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBeDefined();
      });
      it("should return a status code of 404 on failure", async () => {
        mongoData.getFireById.mockResolvedValue(null);
        const res = await request(server).get(
          "/fires/62fb42131c5b7ea309f7e2e2"
        );
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toBeDefined();
      });
    });
  });
  // test get all fires by month and year
  describe("GET /fires/in/:month/:year", () => {
    it("should return a fire's data on success", async () => {
      mongoData.getFireByMonthYear.mockResolvedValue({
        _id: "62fb42131c5b7ea309f7e0e0",
        total_acres: null,
        containment_datetime: "2014-08-24T18:59:59Z",
        control_datetime: "2014-08-24T19:01:00Z",
        daily_acres: 0.1,
        discovery_acres: null,
        estimated_cost_to_date: null,
        final_fire_report_approved_date: null,
        fire_origin: {
          cause: "Natural",
          general: null,
          specific: null,
        },
        fire_discovery_datetime: "2014-07-17T20:07:59Z",
        fire_out_datetime: "2014-08-28T18:59:59Z",
        incident_name: "DUNCAN HILL 2-ENTIAT",
        location: {
          latitude: null,
          longitude: null,
          city: null,
          county: "Chelan",
          state: "US-WA",
        },
        predominant_fuel_group: null,
        modified_by_system: "wfdss",
        created_on_datetime: "2014-08-29T01:20:27Z",
        modified_on_datetime: "2014-08-29T18:46:06Z",
        source: "IRWIN",
        admin: {
          created: "2022-08-16T07:06:59.277Z",
          modified: null,
        },
      });
      const res = await request(server).get("/fires/in/Jul/2014");
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 on failure", async () => {
      mongoData.getFireByMonthYear.mockResolvedValue(null);
      const res = await request(server).get("/fires/in/May/2014");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });
  // test  get all comments by fire id
  
  describe("GET /fires/:id/comments", () =>{
    it("should return an array of fire's comments on success", async () => {
      mongoData.getFireComments.mockResolvedValue([{
        "_id":"630250491f3d48c59da2eec7",
        "username":"User1",
        "text":"Khanh Test fire comments",
        "fire_id":"62fb42131c5b7ea309f7e0e0",
        "createdDate":"2022-08-22T07:00:00.000Z"
      },]);
      const res = await request(server).get("/fires/62fb42131c5b7ea309f7e0e0/comments");
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return status code 404 if fire is not found", async () => {
      mongoData.getFireComments.mockResolvedValue(null);
      const res = await request(server).get("/fires/62fb42131c5b7ea309f7e0e0/comments");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });
  
  // test get comment by comment id
  describe("GET /comments/:id", () => {
    it("should return a single comment for a given comment id on success", async () => {
      mongoData.getFireCommentByCommentId.mockResolvedValue([
        {
          _id: "630250491f3d48c59da2eec7",
          username: "User1",
          text: "Khanh Test fire comments",
          fire_id: "62fb42131c5b7ea309f7e0e0",
          createdDate: "2022-08-22T07:00:00.000Z",
        },
      ]);
      const res = await request(server).get(
        "/fires/comments/5a9427648b0beebeb6957bda"
      );
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if comment not found", async () => {
      mongoData.getFireCommentByCommentId.mockResolvedValue(null);
      const res = await request(server).get(
        "/fires/comments/5a9427648b0beebeb6957bdc"
      );
      expect(res.statusCode).toEqual(404);
    });
  });
  // test get all comments by username
  describe("GET /comments/user/:username", () => {
    it("should return comments for a given username on success", async () => {
      mongoData.getFireCommentsByUser.mockResolvedValue([
        {
          _id: "630250491f3d48c59da2eec7",
          username: "User1",
          text: "Khanh Test fire comments",
          fire_id: "62fb42131c5b7ea309f7e0e0",
          createdDate: "2022-08-22T07:00:00.000Z",
        },
      ]);
      const res = await request(server).get("/fires/comments/user/User1");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if comment not found", async () => {
      mongoData.getFireCommentsByUser.mockResolvedValue(null);
      const res = await request(server).get("/fires/comments/user/User0");
      expect(res.statusCode).toEqual(404);
    });
  });
  // test create comment by fire id , username
  // curl -X POST -H "Content-Type: application/json" -d '{"text":"Khanh test creating comment"}' http://localhost:8000/fires/62fb42131c5b7ea309f7e0e0/user/User1/comments
  describe("POST /:id/user/:username/comments", () => {
    it("should return the comment for a fireid and username on success", async () => {
      mongoData.createComment.mockResolvedValue({
        newObjectId: "630a10d2b0cbaf4fe936e835",
        message: "Comment created! ID: 630a10d2b0cbaf4fe936e835",
      });
      const res = await request(server)
        .post("/fires/573a1391f29313caabcd8978/user/User1/comments")
        .send({ text: "Something..." });
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message if username param is missing", async () => {
      mongoData.createComment.mockResolvedValue({
        error: "UserName must not be blank.",
      });
      const res = await request(server)
        .post("/fires/573a13a3f29313caabd0e77b/user//comments")
        .send({ text: "Username is missing..." });
      expect(res.statusCode).toEqual(404);
    });
    it("should return an error message if body is missing comment text", async () => {
      mongoData.createComment.mockResolvedValue({
        error: "Comments must not be blank.",
      });
      const res = await request(server)
        .post("/fires/573a13a3f29313caabd0e77b/user/User1/comments")
        .send({ text: "" });
      expect(res.statusCode).toEqual(400);
    });
    it("should return an error message if comment fails to be created", async () => {
      mongoData.createComment.mockResolvedValue({
        error: "Something went wrong. Please try again.",
      });
      const res = await request(server)
        .post("/fires/badroute/user/User1/comments")
        .send({ text: "Something..." });
      expect(res.statusCode).toEqual(404);
    });
  });
  // test modify comment by comment id
  // curl -X PUT -H "Content-Type: application/json" -d '{"text": "Updated comment..."}' http://localhost:8000/fires/comments/6303d66a816e5c3e74ac0980
  describe("PUT /comments/:id", () => {
    it("should return the updated comment on success", async () => {
      mongoData.updateComment.mockResolvedValue({
        _id: "573a13a3f29313caabd0e77b",
        text: "Updated comment...",
      });
      const res = await request(server)
        .put("/fires/comments/5a9427648b0beebeb6957bda")
        .send({ text: "Updated comment..." });
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message if a comment fails to be updated", async () => {
      mongoData.updateComment.mockResolvedValue({
        error: "Something went wrong. Please try again!",
      });
      const res = await request(server)
        .put("/fires/comments/5a9427648b0beebeb6957bda")
        .send();
      expect(res.statusCode).toEqual(404);
    });
  });
  // test delete comment by comment id
  //  curl -X DELETE http://localhost:8000/fires/comments/6303d66a816e5c3e74ac0980
  describe("DELETE /comments/:id", () => {
    it("should return a message on success", async () => {
      mongoData.deleteComment.mockResolvedValue({
        message: "Deleted 1 comment.",
      });
      const res = await request(server)
        .delete("/fires/comments/62e082f7b04837f399c01a2b")
        .send();
      expect(res.statusCode).toEqual(200);
    });
    it("should return a error message if a comment fails to be deleted", async () => {
      mongoData.deleteComment.mockResolvedValue({
        Error: "Failed to Delete Comment",
      });
      const res = await request(server).delete("/fires/comments").send();
      expect(res.statusCode).toEqual(404);
    });
  });
  // test get a bookmark by a bookmark id
  describe("GET /fires/bookmarks/:id", () => {
    it("should return a bookmark on success", async () => {
      mongoData.getBookmarkByBookmarkId.mockResolvedValue({
        _id: "6303e187a84112a7a4be6752",
        username: "User1",
        fire_id: "62fb42181c5b7ea309f7e0e8",
        createdDate: "2022-08-21T07:00:00.000+00:00",
      });
      const res = await request(server).get(
        "/fires/bookmarks/6303e187a84112a7a4be6752"
      );
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(false);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if bookmark not found", async () => {
      mongoData.getBookmarkByBookmarkId.mockResolvedValue(null);
      const res = await request(server).get(
        "/fires/bookmarks/6303e187a84112a7a4be6752"
      );
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });

  // test get all bookmarks by username
  describe("GET /fires/user/:username/bookmarks", () => {
    it("should return all bookmarks belong to a username on success", async () => {
      mongoData.getBookmarkByUserName.mockResolvedValue([
        {
          _id: "6303ec16a84112a7a4be6753",
          username: "User1",
          fire_id: "62fb42181c5b7ea309f7e0e8",
          createdDate: "2022-08-21T07:00:00.000Z",
        },
      ]);
      const res = await request(server).get("/fires/user/User1/bookmarks");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if bookmark not found", async () => {
      mongoData.getBookmarkByUserName.mockResolvedValue(null);
      const res = await request(server).get("/fires/user/User1/bookmarks");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });
  // test get all bookmarks by fireid
  describe("GET /fires/:id/bookmarks", () => {
    it("should return all bookmarks belong to a fireid on success", async () => {
      mongoData.getAllBookmarksByFireId.mockResolvedValue([
        {
          _id: "6303ec16a84112a7a4be6753",
          username: "User1",
          fire_id: "62fb42181c5b7ea309f7e0e8",
          createdDate: "2022-08-21T07:00:00.000Z",
        },
      ]);
      const res = await request(server).get(
        "/fires/62fb42181c5b7ea309f7e0e8/bookmarks"
      );
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if bookmark not found", async () => {
      mongoData.getAllBookmarksByFireId.mockResolvedValue(null);
      const res = await request(server).get(
        "/fires/62fb42181c5b7ea309f7e0e8/bookmarks"
      );
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });
   // test get all bookmarks by fireid and username
   describe("GET /fires/:id/user/:username/bookmarks", () => {
    it("should return all bookmarks belong to a fireid on success", async () => {
      mongoData.getBookmarksByFireIdUserName.mockResolvedValue([
        {
          _id: "6303ec16a84112a7a4be6753",
          username: "User1",
          fire_id: "62fb42181c5b7ea309f7e0e8",
          createdDate: "2022-08-21T07:00:00.000Z",
        },
      ]);
      const res = await request(server).get(
        "/fires/62fb42181c5b7ea309f7e0e8/user/User1/bookmarks"
      );
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if bookmark not found", async () => {
      mongoData.getBookmarksByFireIdUserName.mockResolvedValue(null);
      const res = await request(server).get(
        "/fires/62fb42181c5b7ea309f7e2e2/user/User1/bookmarks"
      )
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });
  // create a bookmark by fireid and username
  // curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:8000/fires/62fb42181c5b7ea309f7e0e9/user/User1/bookmarks
  describe("POST /", () => {
    it("should return the bookmark for a fireid and userid on success", async () => {
      mongoData.createBookmark.mockResolvedValue({
        newObjectId: "63095e9d1b9bf737af33097c",
        message: "Bookmark created! ID: 63095e9d1b9bf737af33097c",
      });
      const res = await request(server)
        .post("/fires/62fb42181c5b7ea309f7e0e9/user/User1/bookmarks")
        .send({});
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message if missing userid", async () => {
      mongoData.createBookmark.mockResolvedValue({
        error: "UserName must not be blank.",
      });
      const res = await request(server)
        .post("/fires/62fb42181c5b7ea309f7e0e9/user//bookmarks")
        .send({});
      expect(res.statusCode).toEqual(404);
    });
    it("should return an error message if bookmark not created", async () => {
      mongoData.createBookmark.mockResolvedValue({
        error: "Something went wrong. Please try again.",
      });
      const res = await request(server)
        .post("/fires/62fb42181c5b7ea309f7e0e9/user/User1/bookmarks")
        .send({});
      expect(res.statusCode).toEqual(500);
    });
  });

  // remove bookmark by bookmarkid
  describe("DELETE /bookmarks/:id", () => {
    it("should return a message on success", async () => {
      mongoData.deleteBookmark.mockResolvedValue({
        message: "Deleted one bookmark.",
      });
      const res = await request(server)
        .delete("/fires/bookmarks/62e082f7b04837f399c01a2b")
        .send();
      expect(res.statusCode).toEqual(200);
    });
    it("should return a error message if a bookmark fails to be deleted", async () => {
      mongoData.deleteBookmark.mockResolvedValue({
        error:
          "Something went wrong. 0 bookmarks were deleted. Please try again.",
      });
      const res = await request(server)
        .delete("/fires/bookmarks/62e082f7b04837f399c01a2b")
        .send();
      expect(res.statusCode).toEqual(404);
    });
  });
});

