function compare(a, b) {
  return (a.question < b.question) ? -1 : 1;
}

export function toFill(dictionary, limit) {
  let output = [];
  let tmp = [...dictionary];
  for (let i = 0; i < limit; i++) {
    let item = getRandom(tmp);
    output.push(item);
    tmp = deleteItem(item, tmp);
  }
  return output.sort(compare);
}

function deleteItem(item, array) {
  return array.filter((e) => {
    return (item instanceof Object) ? e.question !== item.question : e !== item;
  });
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getDate(timestamp) {
  return new Intl.DateTimeFormat("ru-Ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date(parseInt(timestamp)))
    .split(", ");
}

export function fireShow(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  // resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  // init
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // objects
  let listFire = [];
  let listFirework = [];
  let fireNumber = 20;
  let center = {x: canvas.width / 2, y: canvas.height / 2};
  let range = 400;
  for (let i = 0; i < fireNumber; i++) {
    let fire = {
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

  (function loop() {
    requestAnimationFrame(loop);
    update();
    draw();
  })();

  function update() {
    for (let i = 0; i < listFire.length; i++) {
      let fire = listFire[i];
      if (fire.y <= fire.far) {
        let color = randColor();
        for (let i = 0; i < fireNumber * 5; i++) {
          let firework = {
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
        fire.y = fire.base.y;
        fire.x = fire.base.x;
        fire.vx = fire.base.vx;
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
        firework.alpha = firework.life / firework.base.life;
        firework.size = firework.alpha * firework.base.size;
        firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
        firework.life--;
        if (firework.life <= 0) {
          listFirework.splice(i, 1);
        }
      }
    }
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.18;
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
}