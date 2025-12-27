/*
 * Copyright (C) 2025 Katherine McNeil
 *
 * Author: Katherine McNeil
 *
 * This code is the property of Katherine McNeil and may not be copied,
 * distributed, or modified without explicit permission.
 *
 * © 2025 Katherine McNeil. All rights reserved.
 */

const canvas = document.getElementById("bubbles-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resize();
window.addEventListener("resize", resize);

class Bubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.radius = Math.random() * 12 + 6;
    this.speed = Math.random() * 0.4 + 0.2;

    const colors = [
      "rgba(255, 0, 0, 0.6)",
      "rgba(255, 105, 180, 0.6)",
      "rgba(0, 191, 255, 0.6)"
    ];

    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.6 + 0.3;
  }

  rise() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.04) * 0.5;

    if (this.y + this.radius < 0) {
      this.reset();
    }
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 2
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.3, this.color);
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = this.alpha;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const bubbles = Array.from({ length: 30 }, () => new Bubble());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(bubble => {
    bubble.rise();
    bubble.draw();
  });

  requestAnimationFrame(animate);
}

animate();
