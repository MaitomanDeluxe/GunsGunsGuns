let socket;

function send(msg) {
  socket.send(JSON.stringify(msg));
}

function startSocket() {
  socket = new WebSocket("wss://your-worker-url.workers.dev");

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "init") {
      myId = msg.id;
    } else if (msg.type === "players") {
      players = msg.players;
    } else if (msg.type === "bullet") {
      bullets.push(msg.bullet);
    }
  };
}
