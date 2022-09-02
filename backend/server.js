const express = require("express");
const routes = require("./routes");
const cors = require("cors");
// cor updated to match the netlify url
const corsOptions = {origin:'*' };

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

server.use(routes);

module.exports = server;
