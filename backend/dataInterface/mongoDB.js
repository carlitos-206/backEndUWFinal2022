const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
  "mongodb+srv://carlitos206:SharedFakePass123@cluster0.lshmeod.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'washingtonFiresDB';
const fire_Collection = 'fires'
const comments_Collection = 'comments';
const users_Collection = 'users';

module.exports = {}

module.exports.getAllFires = async () => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(fire_Collection);
    // Edit limit to get all fires when in prduction
    const result = await collection.find({}).limit(1).toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
module.exports.getFireById = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(fire_Collection);
    const result = await collection.findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
module.exports.getFireComments = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const result = await collection.find({ fire_id: id }).toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
module.exports.getFireCommentsByUser = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const result = await collection.find({ user_id: id }).toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
module.exports.getFireCommentsByFire = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const result = await collection.find({ fire_id: id }).toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}


// module.exports.getFireCommentsByUserAndFire = async (id, fire_id) => {
//   try {
//     await client.connect();
//     const db = client.db(databaseName);
//     const collection = db.collection(comments_Collection);
//     const result = await collection.find({ user_id: id, fire_id: fire_id }).toArray();
//     return result;
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// }
// ......
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
//     "POOCity": null, 
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

// module.exports.create = async (data, setOrigin) => {
//   const database = client.db(databaseName)
//   const fire = database.collection(fire_Collection)

//   const result = await fire.insertMany(
//                 [{
//                   total_acres: data.properties.CalculatedAcres,
//                   containment_datetime: data.properties.ContainmentDateTime,
//                   control_datetime: data.properties.ControlDateTime,
//                   daily_acres: data.properties.DailyAcres,
//                   discovery_acres: data.properties.DiscoveryAcres,
//                   estimated_cost_to_date: data.properties.EstimatedCostToDate,
//                   final_fire_report_approved_date: data.properties.FinalFireReportApprovedDate,
//                   fire_origin: {
//                     cause: data.properties.FireCause,
//                     general: data.properties.FireCauseGeneral,
//                     specific: data.properties.FireCauseSpecific,
//                     },
//                   fire_discovery_datetime: data.properties.FireDiscoveryDateTime,
//                   fire_out_datetime: data.properties.FireOutDateTime,
//                   incident_name: data.properties.IncidentName,
//                   location:{
//                     latitude: data.properties.InitialLatitude,
//                     longitude: data.properties.InitialLongitude,
//                     city: data.properties.POOCity,
//                     county: data.properties.POOCounty,
//                     state: data.properties.POOState,
//                   },
//                   predominant_fuel_group: data.properties.PredominantFuelGroup,
//                   modified_by_system: data.properties.ModifiedBySystem,
//                   created_on_datetime: data.properties.CreatedOnDateTime_dt,
//                   modified_on_datetime: data.properties.ModifiedOnDateTime_dt,
//                   source: data.properties.Source,
//                   admin:{
//                     created: new Date(),
//                     modified: null,
//                   }
//                 }])

//   if(result.acknowledged){
//     return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
//   }else{
//     return {error: "Something went wrong. Please try again.", id: data.OBJECTID, set: setOrigin}
//   }
// }