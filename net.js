let socket;

function send(msg) {
  socket.send(JSON.stringify(msg));
}

function startSocket() {
  // net.js の該当行
  const socket = new WebSocket("wss://gunsgunsguns.maikanamaikana.workers.dev/");


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
