const server = require("./server");

const port = 5001;

server.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);