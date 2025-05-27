let bVerbose = false;
let socket;

function setup() {
  createCanvas(640, 480);
  setupOsc("http://127.0.0.1:8081", 12000, 4560);

  // textWrap(CHAR);
  rectMode(CORNERS);
  // textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  background(150);
}

function draw() {
  fill(255, 0, 190);

  circle(mouseX, mouseY, 20);
  let x = mouseX;
  let y = mouseY;
  sendOsc("/p5js", [x, y]);
}

function sendOsc(address, value) {
  socket.emit("message", [address].concat(value));
}

function setupOsc(oscHost, oscPortIn, oscPortOut) {
  socket = io.connect(oscHost, {
    port: 8081,
    rememberTransport: false,
  });
  socket.on("connect", function () {
    socket.emit("config", {
      server: { port: oscPortIn, host: "127.0.0.1" },
      client: { port: oscPortOut, host: "127.0.0.1" },
    });
  });
}
