let socket;
let myId = null;
let players = {};
let bullets = [];

function send(msg) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  }
}

function startSocket() {
  socket = new WebSocket("wss://gunsgunsguns.maikanamaikana.workers.dev/");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };
  socket.onerror = (e) => {
    console.error("WebSocket error", e);
  };
  socket.onclose = () => {
    console.log("WebSocket closed");
  };
  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    console.log("[WS受信]", msg);

    if (msg.type === "init") {
      myId = msg.id;
    } else if (msg.type === "players") {
      players = msg.players;
    } else if (msg.type === "bullet") {
      bullets.push(msg.bullet);
    }
  };
}
