const express = require("express");
const app = express()

app.get('/', (req, res)=>{
  res.status(200).send({message:'success'})
})
app.listen(5000)