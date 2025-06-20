var osc = require("node-osc");
var io = require("socket.io")(8081);
const express = require("express");
const app = express();
const port = 4567;

app.use(express.static("public"));

var oscServer, oscClient;

var isConnected = false;

io.sockets.on("connection", function (socket) {
  console.log("connection established");
  socket.on("config", function (obj) {
    isConnected = true;
    oscServer = new osc.Server(obj.server.port, obj.server.host);
    oscClient = new osc.Client(obj.client.host, obj.client.port);
    oscClient.send("/status", socket.sessionId + " connected");
    oscServer.on("message", function (msg, rinfo) {
      socket.emit("message", msg);
    });
    socket.emit("connected", 1);
  });
  socket.on("message", function (obj) {
    oscClient.send.apply(oscClient, obj);
  });
  socket.on("disconnect", function () {
    if (isConnected) {
      oscServer.kill();
      oscClient.kill();
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
