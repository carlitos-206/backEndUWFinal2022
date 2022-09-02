const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const corsOptions = {origin:"https://famous-tanuki-4913b3.netlify.app/"};

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

server.use(routes);

module.exports = server;
