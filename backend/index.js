//const cool = require('cool-ascii-faces');
const server = require("./server");

const port = 5000;

server.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);