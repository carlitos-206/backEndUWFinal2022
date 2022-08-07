const { Router } = require("express");
const router = Router();




// curl http://localhost:5000/users
router.get('/', async(req, res)=>{
  res.status(200).send({message: 'success'})
})

module.exports = router;