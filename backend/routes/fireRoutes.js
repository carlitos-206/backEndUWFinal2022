const { Router } = require("express");
const router = Router();

// Data interface
const mongoConnection = require("../dataInterface/mongoDB")

// "GET" requests --- READ

      // curl http://localhost:5000/fires/
      router.get('/', async(req, res)=>{
        const result = await mongoConnection.getAllFires()
        if(result){
          res.status(200).send(result)
        }else{
          res.status(200).send({message: 'Failed'})
        }
      })

      // curl http://localhost:5000/fires/:id
      router.get('/:id', async(req, res)=>{
        const result = await mongoConnection.getFireById(req.params.id)
        if(result){
          res.status(200).send(result)
        }else{
          res.status(200).send({message: 'Failed'})
        }
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
