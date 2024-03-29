import { useCommonStore } from "@/store/common";

interface Fire {
  x: number;
  y: number;
  size: number;
  fill: string;
  vx: number;
  vy: number;
  ax: number;
  far: number;
  base?: Base;
}

interface Base {
  x: number;
  y: number;
  vx: number;
}

interface FireworkBase {
  life: number;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  size: number;
  fill: string;
  vx: number;
  vy: number;
  ay: number;
  alpha: number;
  life: number;
  base?: FireworkBase;
}

export function fireShow(canvas: HTMLCanvasElement) {
  let start: number;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let listFire: Fire[] = [];
  let listFirework: Firework[] = [];
  let fireNumber = 20;
  let center = { x: canvas.width / 2, y: canvas.height / 2 };
  let range = 400;
  for (let i = 0; i < fireNumber; i++) {
    let fire: Fire = {
      x: (Math.random() * range) / 2 - range / 4 + center.x,
      y: Math.random() * range * 2 + canvas.height,
      size: Math.random() + 0.5,
      fill: "#fd1",
      vx: Math.random() - 0.5,
      vy: -(Math.random() + 4),
      ax: Math.random() * 0.02 - 0.01,
      far: Math.random() * range + (center.y - range),
    };
    fire.base = {
      x: fire.x,
      y: fire.y,
      vx: fire.vx,
    };
    listFire.push(fire);
  }

  function randColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b}`;
  }

  function loop(timestamp: number) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    if (progress > 5000) decreaseOpacity();
    update();
    draw();
    requestAnimationFrame(loop);

  }

  function decreaseOpacity() {
    let opacity = parseInt(getComputedStyle(canvas).opacity);
    if (opacity <= 0) useCommonStore().setAnimationStatus(false);
    opacity -= .01;
    canvas.style.opacity = String(opacity);

  }

  function update() {
    for (let i = 0; i < listFire.length; i++) {
      let fire = listFire[i];
      if (fire.y <= fire.far) {
        let color = randColor();
        for (let i = 0; i < fireNumber * 5; i++) {
          let firework: Firework = {
            x: fire.x,
            y: fire.y,
            size: Math.random() + 1.5,
            fill: color,
            vx: Math.random() * 5 - 2.5,
            vy: Math.random() * -5 + 1.5,
            ay: 0.05,
            alpha: 1,
            life: Math.round((Math.random() * range) / 2) + range / 2,
          };
          firework.base = {
            life: firework.life,
            size: firework.size,
          };
          listFirework.push(firework);
        }
        if (fire.base) {
          fire.y = fire.base.y;
          fire.x = fire.base.x;
          fire.vx = fire.base.vx;
        }
        fire.ax = Math.random() * 0.02 - 0.01;
      }
      fire.x += fire.vx;
      fire.y += fire.vy;
      fire.vx += fire.ax;
    }

    for (let i = listFirework.length - 1; i >= 0; i--) {
      let firework = listFirework[i];
      if (firework) {
        firework.x += firework.vx;
        firework.y += firework.vy;
        firework.vy += firework.ay;
        if (firework.base) {
          firework.alpha = firework.life / firework.base.life;
          firework.size = firework.alpha * firework.base.size;
        }
        firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
        firework.life--;
        if (firework.life <= 0) {
          listFirework.splice(i, 1);
        }
      }
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = .18;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 1;
    for (let i = 0; i < listFire.length; i++) {
      let fire = listFire[i];
      ctx.beginPath();
      ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = fire.fill;
      ctx.fill();
    }

    for (let i = 0; i < listFirework.length; i++) {
      let firework = listFirework[i];
      ctx.globalAlpha = firework.alpha;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = firework.fill;
      ctx.fill();
    }
  }

  requestAnimationFrame(loop);
  useCommonStore().setAnimationStatus(true);
}