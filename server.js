const express = require("express");
const http = require("http");
const app = express();

const path = require("path");
const port = process.env.PORT || 9000;
const server = http.createServer(app);

const websocketServer = require("./modules/websocketServer");

websocketServer(server);

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(port, () =>
  console.log(`Local chat app running at: http://localhost:${port}`)
);

const stop = () => server.close();

module.exports = server;
module.exports.stop = stop;
