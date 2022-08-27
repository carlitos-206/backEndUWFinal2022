const { Router } = require("express");
const router = Router();
const bodyParser = require('body-parser');
// Data interface
const mongoConnection = require("../dataInterface/mongoDB");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// "GET" requests --- READ

// curl http://localhost:5000/fires/
router.get("/", async (req, res) => {
  let statusCode = 500
  const result = await mongoConnection.getAllFires();
  if (result.length >0) {
    statusCode = 200
    res.status(statusCode).send(result);
  } else {
    res.status(statusCode).send({ error: "Failed to retrieve fire data." });
  }
});

//get all fires by month and year
// curl http://localhost:5000/fires/in/:month/:year
// curl http://localhost:5000/fires/in/Jul/2014

router.get("/in/:month/:year", async(req, res) => {

  let statusCode
  const result = await mongoConnection.getFireByMonthYear(req.params.month, req.params.year);
  if (result) {
    statusCode = 200
    res.status(statusCode).send(result);
  } else {
    statusCode = 404
    res.status(statusCode).send({ error: "Failed to retrieve fire data." });
  }

});

// curl http://localhost:5000/fires/:id
// curl http://localhost:5000/fires/62fb42181c5b7ea309f7e0e8
router.get("/:id([0-9a-fA-F]{24})", async (req, res, next) => {
  let statusCode
  const result = await mongoConnection.getFireById(req.params.id);
  if (!result) {
    statusCode = 404;
    res.status(statusCode).send({ error: "Failed to retrieve fire data." });
  } else {
    statusCode = 200;
    res.status(statusCode).send(result);
    
  }
});

// get all comments by fire id
// curl http://localhost:5000/fires/:id/comments
// curl http://localhost:5000/fires/62fb42131c5b7ea309f7e0e0/comments
router.get("/:id/comments", async (req, res, next) => {
  let statusCode;
  const result = await mongoConnection.getFireComments(req.params.id);
  if (!result) {
    statusCode = 404;
    res.status(statusCode).send({ error: "No comments found for fireid: ${req.params.id}" });
  } else {
    statusCode = 200;
    res.status(statusCode).send(result);    
  }
});
// get comments by comment id
// curl http://localhost:5000/fires/comments/:id
// curl http://localhost:5000/fires/comments/630250491f3d48c59da2eec7
router.get("/comments/:id", async (req, res) => {
  const result = await mongoConnection.getFireCommentByCommentId(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res
      .status(404)
      .send({ message: "No comments found for commentId: ${req.params.id}" });
  }
});
//get all fire comments by username
// curl http://localhost:5000/fires/comments/user/:username
// curl http://localhost:5000/fires/comments/user/User1
router.get("/comments/user/:username", async (req, res) => {
  const result = await mongoConnection.getFireCommentsByUser(req.params.username);
  if (result) {
    res.status(200).send(result);
  } else {
    res
      .status(404)
      .send({ message: "No comments found for username: ${req.params.username}" });
  }
});
//create new comment
// curl -X POST -H "Content-Type: application/json" -d '{"text":"Khanh test creating comment"}' http://localhost:5000/fires/62fb42131c5b7ea309f7e0e0/user/User1/comments
router.post(
  "/:id([0-9a-fA-F]{24})/user/:userName/comments",
  async (req, res) => {
    let resultStatus;
    if (req.params.userName === "") {
      resultStatus = 404;
      res.status(resultStatus).send({ error: "UserName must not be blank." });
    }
    //validate text
    if (req.body.text === "") {
      resultStatus = 400;
      res.status(resultStatus).send({ error: "Comments must not be blank." });
    } else {
      const result = await mongoConnection.createComment(req.params, req.body);
      if (result.error) {
        resultStatus = 500;
        res
          .status(resultStatus)
          .send({ error: "Something went wrong. Please try again." });
      } else {
        resultStatus = 200;
        res.status(resultStatus).send(result);
      }
    }
  }
);
//modify comment
// curl -X PUT -H "Content-Type: application/json" -d '{"text": "Updated comment..."}' http://localhost:5000/fires/comments/:id
// curl -X PUT -H "Content-Type: application/json" -d '{"text": "Updated comment..."}' http://localhost:5000/fires/comments/6303d66a816e5c3e74ac0980
router.put("/comments/:id([0-9a-fA-F]{24})", async (req, res, err) => {
  let resultStatus;
  try
  {
    const result = await mongoConnection.updateComment(req.params.id, req.body)
    if(result.error){
      resultStatus = 404;
    } else {
      resultStatus = 200;
    }
    res.status(resultStatus).send(result);
  }
  catch (err)
  {
    resultStatus = 500;
    res.status(resultStatus).send({error: "Something went wrong. Please try again!"});
  }
  
});
//delete comment by comment id
//  curl -X DELETE http://localhost:5000/fires/comments/6303d66a816e5c3e74ac0980
router.delete("/comments/:commentId([0-9a-fA-F]{24})", async(req, res)=>{
  const result = await mongoConnection.deleteComment(req.params.commentId)
  if(result.error){
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }
  res.status(resultStatus).send(result);
})
//get a bookmark by a bookmarkid
//curl http://localhost:5000/fires/bookmarks/6303ec16a84112a7a4be6753
router.get("/bookmarks/:id([0-9a-fA-F]{24})", async (req, res, next) => {

  const result = await mongoConnection.getBookmarkByBookmarkId(req.params.id);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ error: "Failed to retrieve bookmark!" });
  }

});

//get all bookmarks by a username
//curl http://localhost:5000/fires/user/:username/bookmarks
//curl http://localhost:5000/fires/user/User1/bookmarks
router.get("/user/:username/bookmarks", async (req, res) => {
  let returnStatus
  const result = await mongoConnection.getBookmarkByUserName(req.params.username);
  if (!result){
    returnStatus = 404
    res.status(returnStatus).send({ error: "Failed to retrieve bookmark!" });
  } else {
    returnStatus = 200
    res.status(returnStatus).send(result);
  }
});

//get all bookmarks by a fireid
//curl http://localhost:5000/fires/:id/bookmarks
//curl http://localhost:5000/fires/62fb42181c5b7ea309f7e0e8/bookmarks
router.get("/:id/bookmarks", async (req, res, next) => {
  let returnStatus;
  const result = await mongoConnection.getAllBookmarksByFireId(req.params.id);
  if (!result){
    returnStatus = 404
    res.status(returnStatus).send({ error: "Failed to retrieve bookmark!" });
  } else {
    returnStatus = 200
    res.status(returnStatus).send(result);
  }
});
//create a bookmark by fireid and username
// curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:5000/fires/:id/user/:userName/bookmarks
// curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:5000/fires/62fb42131c5b7ea309f7e0e0/user/User1/bookmarks
router.post(
  "/:id([0-9a-fA-F]{24})/user/:userName/bookmarks",
  async (req, res) => {
    let resultStatus;
    if (req.params.userName === "") {
      resultStatus = 404;
      res.status(resultStatus).send({ error: "UserName must not be blank." });
    }
    else {
      const result = await mongoConnection.createBookmark(req.params);
      if (result.error) {
        resultStatus = 500;
        res
          .status(resultStatus)
          .send({ error: "Something went wrong. Please try again." });
      } else {
        resultStatus = 200;
        res.status(resultStatus).send(result);
      }
    }
  }
);
//delete a bookmark by bookmarkid
//  curl -X DELETE http://localhost:5000/fires/bookmarks/:id
//  curl -X DELETE http://localhost:5000/fires/bookmarks/6303e187a84112a7a4be6752

router.delete("/bookmarks/:id([0-9a-fA-F]{24})", async(req, res)=>{
  const result = await mongoConnection.deleteBookmark(req.params.id)
  
  if(result.error){
    resultStatus = 404;
  } else {
    resultStatus = 200;
  }
  res.status(resultStatus).send(result);
})

module.exports = router;

// IGNORE BELOW THIS LINE BUT KEEP FOR REFERENCE

//  ***ENSURE TO MOVE module.exports = router TO ENCAPSULATE THE CODE***

// // curl http://localhost:5000/fires/comments/:id
// router.get('/comments/:id', async(req, res)=>{
//   const result = await mongoConnection.getFireComments(req.params.id)
//   if(result){
//     res.status(200).send(result)
//   }else{
//     res.status(200).send({message: 'Failed'})
//   }
// }
// )
// // curl http://localhost:5000/fires/comments/user/:id
// router.get('/comments/user/:id', async(req, res)=>{
//   const result = await mongoConnection.getFireCommentsByUser(req.params.id)
//   if(result){
//     res.status(200).send(result)
//   }else{
//     res.status(200).send({message: 'Failed'})
//   }
// }
// )
// // curl http://localhost:5000/fires/comments/fire/:id
// router.get('/comments/fire/:id', async(req, res)=>{
//   const result = await mongoConnection.getFireCommentsByFire(req.params.id)
//   if(result){
//     res.status(200).send(result)
//   }else{
//     res.status(200).send({message: 'Failed'})
//   }
// }
// )

// // These are the data sets for mongo db
// const dataSet_1 = require("../hardData/WAData_set_1.json")
// const dataSet_2 = require("../hardData/WAData_set_2.json")
// const dataSet_3 = require("../hardData/WAData_set_3.json")

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
// const setOne = async()=>{
//   for(let i = 0; i < dataSet_1.length; i++){
//     mongoConnection.create(dataSet_1[i], 'set_1')
//     if(i % 9 === 0){
//       console.log(i, 'set_1')
//       await sleep(5000)
//     }
// }
//   return true
// }
// const setTwo = async()=>{
//   const set_1 = await setOne()
//   if(set_1){
//     for(let i = 0; i < dataSet_2.length; i++){
//       mongoConnection.create(dataSet_2[i], 'set_1')
//       if(i % 9 === 0){
//         console.log(i, 'set_2')
//         await sleep(5000)
//       }
//   }
// }
//   return true
// }

// const setThree = async()=>{
//   const set_2 = await setTwo()
//   if(set_2){
//   for(let i = 0; i < dataSet_3.length; i++){
//       mongoConnection.create(dataSet_3[i], 'set_1')
//       if(i % 9 === 0){
//         console.log(i, 'set_3')
//         await sleep(5000)
//       }
//     }
//   }
//   return true
// }
// router.get('/', async(req, res)=>{
//   const success = await setThree()
//   if(success){
//     res.status(200).send({message: 'success'})
//   }else{
//     res.status(200).send({message: 'Failed'})
//   }
// })

// example:
// {
//   "properties": {
//     "CalculatedAcres": 50.64,
//     "ContainmentDateTime": "2020-08-06T23:13:07Z",
//     "ControlDateTime": "2020-08-06T23:13:24Z",
//     "DailyAcres": 50.6,
//     "DiscoveryAcres": 20.0,
//     "DispatchCenterID": "MTMCC",
//     "EstimatedCostToDate": null,
//     "FinalFireReportApprovedByTitle": null,
//     "FinalFireReportApprovedDate": "2020-08-12T20:45:59Z",
//     "FireCause": "Human",
//     "FireCauseGeneral": "Equipment",
//     "FireCauseSpecific": "Farming Equipment",
//     "FireDiscoveryDateTime": "2020-08-06T18:58:00Z",
//     "FireOutDateTime": "2020-08-12T14:00:00Z",
//     "IncidentName": "Ramme",
//     "InitialLatitude": 45.78496,
//     "InitialLongitude": -104.4958,
//     "POOCounty": "Carter",
//     "POOState": "US-MT",
//     "PredominantFuelGroup": "Grass",
//     "ModifiedBySystem": "INFORM_Inspector",
//     "CreatedOnDateTime_dt": "2020-08-06T19:50:29Z",
//     "ModifiedOnDateTime_dt": "2020-08-12T20:46:01Z",
//     "Source": "IRWIN",
//     },
//     "geometry": {
//       "type": "Point",
//       "coordinates": [ -104.457510856999988, 45.785037225000053 ]
//       }
// },
