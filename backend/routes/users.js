const { Router } = require("express");
const router = Router();
const cors = require("cors")
// Data interface
const mongoConnection = require("../dataInterface/mongoDB")


// "POST" requests

    // curl -X POST -H "Content-Type: application/json" -d '{"username":"user1", "email":"carlitos@uw.edu","password":"secrets!", "firstName":"Carlos", "lastName":"Caceres"}' http://localhost:5000/users/register
    router.post("/register",cors(), async (req, res) => {
      let result = await mongoConnection.createUser(req.body)
      if(!result.Error){
        return res.status(200).send(result)
      }else{
        res.status(500).send(result)
      }
    }),

    // curl -X POST -H "Content-Type: application/json" -d '{"usernameOrEmail":"carlitos@uw.edu","password":"secrets!",}' http://localhost:5000/users/login
    // curl -X POST -H "Content-Type: application/json" -d '{"usernameOrEmail":"user1","password":"secrets!"}' http://localhost:5000/users/login
    router.post("/login", cors(), async (req, res) => {
        let result = await mongoConnection.signIn(req.body)
        if(result.error){
          res.status(500).send(result)
        }else{
          res.status(200).send(result)
        }
    }),





module.exports = router;
