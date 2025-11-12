const canvas = document.getElementById("bubbles-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

class Bubble {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.radius = Math.random() * 12 + 6;
    this.speed = Math.random() * 0.4 + 0.2;
    const colors = [
      "rgba(255, 0, 0, 0.6)",      // red
      "rgba(255, 105, 180, 0.6)",  // pink
      "rgba(0, 191, 255, 0.6)"     // blue
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.6 + 0.3;
  }

  rise() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.04) * 0.5;
    if (this.y + this.radius < 0) this.reset();
  }

  draw() {
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.3, this.color);
    g.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.fillStyle = g;
    ctx.globalAlpha = this.alpha;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const bubbles = Array.from({ length: 30 }, () => new Bubble());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => { b.rise(); b.draw(); });
  requestAnimationFrame(animate);
}
animate();
