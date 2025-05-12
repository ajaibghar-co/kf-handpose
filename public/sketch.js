/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose;
let video;
let hands = [];
let opts = {
  maxHands: 1,
  flipped: true,
  runtime: "tfjs",
  modelType: "full",
  detectorModelUrl: undefined, //default to use the tf.hub model
  landmarkModelUrl: undefined, //default to use the tf.hub model
};

function preload() {
  // Load the handPose model
  handPose = ml5.handPose(opts);
}

let bVerbose = false;
let socket;

function setup() {
  createCanvas(640, 480);
  setupOsc("http://127.0.0.1:8081", 12000, 4560);

  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video

  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand);
    fill(255, 0, 190);
    ind = hand.index_finger_tip;
    mid = hand.middle_finger_tip;
    ring = hand.ring_finger_tip;
    pinky = hand.pinky_finger_tip;
    thumb = hand.thumb_tip;
    circle(ind.x, ind.y, 20);
    circle(thumb.x, thumb.y, 20);
    circle(mid.x, mid.y, 20);
    circle(ring.x, ring.y, 20);
    circle(pinky.x, pinky.y, 20);
    let d1 = dist(ind.x, ind.y, thumb.x, thumb.y);
    let d2 = dist(mid.x, mid.y, thumb.x, thumb.y);
    let d3 = dist(ring.x, ring.y, thumb.x, thumb.y);
    let d4 = dist(pinky.x, pinky.y, thumb.x, thumb.y);
    // console.log(d);
    sendOsc("/p5js", [d1, d2, d3, d4]);
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
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
