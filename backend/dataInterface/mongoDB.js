const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
//const { use } = require("../routes");
const auth = require('../auth')
const uri = process.env.MONGO_URI

const client = new MongoClient(uri);

const databaseName = "washingtonFiresDB";
const fire_Collection = "fires";
const comments_Collection = "comments";
const users_Collection = "users";
const bookmarks_Collection = "bookmarks";

module.exports = {};
// get all fires
module.exports.getAllFires = async () => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(fire_Collection);
    // Edit limit to get all fires when in prduction
    const result = await collection.find({}).toArray();
    return result;
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire data.'}
  } finally {
    await client.close();
  }
};
// get all fires by month and year
module.exports.getFireByMonthYear = async (month, year) => {
  //array to find month number by month name
  const monthsShort = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(fire_Collection);
    //get month num
    const monthNum = monthsShort[month];
    //contruct frmDate
    const frmDate = `${year}-${monthNum}-01`;
    //get month end date
    const endDt = new Date(year, monthNum, 0);
    // construct toDate
    const toDate = `${year}-${monthNum}-${endDt}`;
    // get all fires between the start and end date of a given month
    const result = await collection.find({ fire_discovery_datetime : { $gt: frmDate, $lt: toDate}});

    return result
    ? result.toArray()
    : {
      error: `We've encountered an error. Please try again later.`,
    };
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire data.'}
  }
}
//get fire by fire id
module.exports.getFireById = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(fire_Collection);
    const result = await collection.findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire data.'}
  } finally {
    await client.close();
  }
};
//get fire by incident name
module.exports.getFireByIncidentName = async (name) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(fire_Collection);
    const result = await collection.find({ incident_name: name })
    return result
    ? result.toArray()
    : {
      error: `We've encountered an error. Please try again later.`,
    };
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire data.'}
  }
};

//get fire comment by fire id
module.exports.getFireComments = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const query = { fire_id: ObjectId(id) };
    const result = await collection.find(query).toArray();
    return result;
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire comments.'}
  } finally {
    await client.close();
  }
};
//get fire comment by a commentid
module.exports.getFireCommentByCommentId = async (commentId) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const query = { _id: ObjectId(commentId) };
    const result = await collection.findOne(query);
    return result;
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire comments.'}
  } finally {
    await client.close();
  }
};
//get all fire comments by userid
module.exports.getFireCommentsByUser = async (username) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const result = await collection.find({ username: username }).toArray();
    return result;
  } catch (err) {
    return {error: 'Something is wrong. Not able to retrieve fire comments.'}
  } finally {
    await client.close();
  }
};

//create a comment by fireid, userid
module.exports.createComment = async (paramObj, newObj) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const commentObj = {
      ...newObj,
      fire_id: ObjectId(paramObj.id),
      username: paramObj.userName,
      text: newObj.text,
      createdDate: new Date(),
    };
    const result = await collection.insertOne(commentObj);
    if (result.acknowledged) {
      return {
        newObjectId: result.insertedId,
        message: `Comment created! ID: ${result.insertedId}`,
      };
    } else {
      return { error: "New comment insert failed." };
    }
  } catch (err) {
    return {error: 'Something is wrong. Not able to insert comment.'}
  } finally {
    await client.close();
  }
};
//update comment by comment id
module.exports.updateComment = async (commentId, newObj) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);
    const updateRules = {
      $set: { text: newObj.text },
    };
    const filter = { _id: ObjectId(commentId) };
    const result = await collection.updateOne(filter, updateRules);

    if (result.modifiedCount != 1) {
      return {
        error: `Something went wrong. ${result.modifiedCount} comment was updated. Please try again.`,
      };
    }

    const updatedComment = module.exports.getFireCommentByCommentId(commentId);
    return updatedComment;
  } catch (err) {
    return { Error: "Failed to Update Comment" };
  } finally {
    await client.close();
  }
};
//delete comment by comment id
module.exports.deleteComment = async (commentId) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(comments_Collection);

    const deletionRules = { _id: ObjectId(commentId) };
    const result = await collection.deleteOne(deletionRules);
    if (result.deletedCount != 1) {
      return {
        error: `Something went wrong. ${result.deletedCount} comments were deleted. Please try again.`,
      };
    }

    return { message: `Deleted ${result.deletedCount} comment.` };
  } catch (err) {
    return { Error: "Failed to Delete Comment" };
  } finally {
    await client.close();
  }
};

//get a bookmark by bookmarkid
module.exports.getBookmarkByBookmarkId = async(id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(bookmarks_Collection);
    const result = await collection.findOne({ _id: ObjectId(id) });
    return result;

  } catch (err) {
    return { error: "Failed to retrieve bookmark" };
  } finally {
    await client.close();
  }
}
//get all bookmarks by a username
module.exports.getBookmarkByUserName = async(userName) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(bookmarks_Collection);
    const result = await collection.find({ username: userName });
    return result
    ? result.toArray()
    : {
      error: `We've encountered an error. Please try again later.`,
    };

  } catch (err) {
    return { error: `Failed to retrieve bookmarks for a username: ${userName}` };
  }
}
// get all bookmarks by fireid
module.exports.getAllBookmarksByFireId = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(bookmarks_Collection);
    const result = await collection.find({ fire_id: ObjectId(id) });
    if(result){
      return result
    }else{
      return {error: 'could not locate'}
    }

  } catch (err) {
    return { error: `Failed to retrieve bookmarks for fire_id: ${id} and username: ${userName}` };
  }
}

// get all bookmarks by fireid and a username
module.exports.getBookmarksByFireIdUserName = async (id, userName) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(bookmarks_Collection);
    const result = await collection.findOne({ fire_id: ObjectId(id), username: userName });
  if(result){
    return result
  }else{
    return {error: `Book mark does not exist.`}
  }

  } catch (err) {
    return { error: `Failed to retrieve bookmarks for fire_id: ${id}` };
  }
}
// create a bookmark by fireid and username
module.exports.createBookmark = async (paramObj) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(bookmarks_Collection);
    const bookmarkObj = {
      fire_id: ObjectId(paramObj.id),
      username: paramObj.userName,
      createdDate: new Date(),
    };
    const result = await collection.insertOne(bookmarkObj);
    if (result.acknowledged) {
      return {
        newObjectId: result.insertedId,
        message: `Bookmark created! ID: ${result.insertedId}`,
      };
    } else {
      return { error: "New comment insert failed." };
    }

  }catch (err) {
    return { error: "Failed to create bookmarks for fire_id: ${id}" };
  } finally {
    await client.close();
  }

}
//delete a bookmark by bookmarkid
module.exports.deleteBookmark = async (id) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(bookmarks_Collection);

    const deletionRules = { _id: ObjectId(id) };
    const result = await collection.deleteOne(deletionRules);
    if (result.deletedCount != 1) {
      return {
        error: `Something went wrong. 0 bookmarks were deleted. Please try again.`,
      };
    }

    return { message: `Deleted one bookmark.` };
  } catch (err) {
    return { Error: "Failed to Delete a bookmark" };
  } finally {
    await client.close();
  }
};
//create or register a user

module.exports.createUser = async (user) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(users_Collection);
    let emailExist = await collection.findOne({ email: user.email });
    let usernameExist = await collection.findOne({ username: user.username });
    if(usernameExist && emailExist){
      return { Error: "Username already exists and Email already exists"};
    }
    if (emailExist) {
      return { Error: "Email already exists"};
    } 
    if(usernameExist){
      return { Error: "Username already exists"};
    }
    else {
      let hashedPassword = await bcrypt.hash(user.password, 10);
      let vettedUser = {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const result = await collection.insertOne(vettedUser);
      return {
        newObjectId: result.insertedId,
        message: `User created! ID: ${result.insertedId}`
      };
    }
  } catch (err) {
    return { Error: "Failed to Create User" };
  } finally {
    await client.close();
  }
};

//user login
module.exports.signIn = async (user) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(users_Collection);
    const userExistEmail = await collection.findOne({
      email: user.usernameOrEmail,
    });
    const userExistUsername = await collection.findOne({
      username: user.usernameOrEmail,
    });
    if (userExistEmail) {
      if (await bcrypt.compare(user.password, userExistEmail.password)) {
        let token = auth.createToken(user.password)
        return {
          username: userExistEmail.username,
          email: userExistEmail.email,
          token: token
        };
      }
    }
    if (userExistUsername) {
      if (await bcrypt.compare(user.password, userExistUsername.password)) {
        return {
          username: userExistUsername.username,
          email: userExistUsername.email,
        };
      }
    }else{
      return {error: "Failed to locate user" }
    }
  } catch (err) {
    return { error: "Failed to locate user" };
  } finally {
    await client.close();
  }
};

//delete a bookmark by bookmarkid
module.exports.deleteAccount = async (username) => {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(users_Collection);
    const deletionRules = {username: username };
    const result = await collection.deleteOne(deletionRules);
    if (result.deletedCount != 1) {
      return {
        error: `Failed to delete account`,
      };
    }

    return { message: `Account` };

  } catch (err) {
    return { Error: "Failed to delete account" };
  } finally {
    await client.close();
  }
};

// IGNORE BELOW THIS LINE BUT KEEP FOR REFERENCE

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
