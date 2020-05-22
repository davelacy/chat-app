const express = require("express");
const http = require("http");
const app = express();

const ngrok = require("ngrok");
const path = require("path");
const port = process.env.PORT || 9000;
const server = http.createServer(app);

const websocketServer = require("./modules/websocketServer");

websocketServer(server);

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

(async function () {
  const url = await ngrok.connect(port);
  console.log(`Public shareable link can be found here: ${url}`);
})();

server.listen(port, () => console.log(`Web users listening on port: ${port}`));

const stop = () => server.close();

module.exports = server;
module.exports.stop = stop;
