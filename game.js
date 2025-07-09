const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let players = {};
let bullets = [];
let myId = null;

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let id in players) {
    const p = players[id];
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 40, 40);
    ctx.fillStyle = "#fff";
    ctx.fillText(`HP:${p.hp}`, p.x, p.y - 10);
  }
  for (let b of bullets) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(b.x, b.y, 5, 5);
  }
}

function update() {
  const me = players[myId];
  if (!me) return;

  if (keys["a"]) me.x -= 4;
  if (keys["d"]) me.x += 4;
  if (keys[" "] && Date.now() - me.lastShot > 400) {
    bullets.push({x: me.x + 20, y: me.y + 20, vx: 8});
    me.lastShot = Date.now();
    send({type: "shoot", x: me.x + 20, y: me.y + 20});
  }

  for (let b of bullets) b.x += b.vx;
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

startSocket();
loop();
