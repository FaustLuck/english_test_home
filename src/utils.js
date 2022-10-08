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

export function failShow(canvas) {
  [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;
  const r = Math.round(Math.min(w, h) / 4);
  const x = Math.round(w / 2);
  const y = Math.round(h / 2);
  const toRadian = (angle) => angle * Math.PI / 180;
  const getRandom = (min, max) => Math.random() * (max - min) + min;

  const combustionColor = "rgb(255, 231, 188)";
  const wickLightColor = "rgb(153, 54, 0)";
  const wickDarkColor = "rgb(107, 38, 0)";
  let bombLightColor = "rgb(42, 42, 42)";
  let bombDarkColor = "rgb(29, 29, 29)";

  const [corkXr, corkYr] = [r / 3, r / 10];
  let corkBottom = -r * 11 / 12;
  let corkUp = corkBottom - r / 5;

  let sparkles = [];

  let isCombustionStart = false;
  let startFlame = 1;
  const lengthFlame = .1;
  let opacityFragments = 1;

  const sparkle = {
    create(x, y) {
      const translate = {x, y};
      let coords = {x: 0, y: 0, r: 5};
      const isNegative = Math.round(getRandom(0, 1));
      const dx = isNegative === 1 ? getRandom(0, 50) * -0.1 : getRandom(0, 50) * 0.1;
      let dy = getRandom(-10, 10);
      const color = `hsl(${getRandom(30, 60)},100%,${getRandom(50, 100)}%)`;
      return {color, coords: {dx, dy, ...coords}, translate};
    },
    draw({translate, coords, color}) {
      ctx.save();
      ctx.translate(translate.x, translate.y);
      ctx.rotate(30 * Math.PI / 180);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, coords.r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
      return this.update(coords);
    },
    update(coords) {
      coords.r -= .05;
      coords.x += coords.dx;
      coords.y += coords.dy;
      coords.dy++;
      return coords;
    }
  };
  const triangle = {
    create(a, b, c) {
      const delta = {
        x: (Math.min(a.x, b.x, c.x)) * 10 / r,
        y: (Math.min(a.y, b.y, c.y)) * 10 / r
      };
      const translate = {x: 0, y: 0};
      return {a, b, c, delta, translate};
    },
    update({delta, translate}) {
      translate.x += delta.x;
      translate.y += delta.y;
      return translate;
    },
    draw({a, b, c, translate, delta}) {
      ctx.save();
      ctx.translate(translate.x, translate.y);
      ctx.fillStyle = "transparent";
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.clip();
      frame();
      ctx.restore();
      return this.update({delta, translate});
    }
  };
  let triangles = [];
  let opacityFlame = 1;
  let flame = [];

  let widthText = 1;
  let scaleText = 0;

  function frame() {
    const dx = r / 4;
    const angle = Math.acos(dx / (2 * r));
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = bombDarkColor;
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-atop";
    ctx.beginPath();
    ctx.arc(0, 0, r, -angle, angle);
    ctx.arc(dx, 0, r, Math.PI - angle, Math.PI + angle);
    ctx.fillStyle = bombLightColor;
    ctx.fill();
    ctx.restore();
  }

  function cork() {
    function down(step) {
      const angle = toRadian(120);
      ctx.beginPath();
      ctx.ellipse(0, corkUp, corkXr, corkYr, 0, angle * !step, angle * step || Math.PI);
      ctx.ellipse(0, corkBottom, corkXr, corkYr, 0, angle * step || Math.PI, angle * !step, true);
      ctx.ellipse(0, corkUp, corkXr, corkYr, 0, angle * !step, angle * !step);
      ctx.stroke();
      ctx.fill();
    }

    function up(step) {
      const angle = toRadian(160);
      ctx.beginPath();
      ctx.ellipse(0, corkUp, corkXr, corkYr, 0, angle, 2 * (angle - Math.PI), !!step);
      ctx.stroke();
      ctx.fill();
    }

    for (let step = 0; step < 2; step++) {
      ctx.fillStyle = step ? bombLightColor : bombDarkColor;
      ctx.strokeStyle = step ? bombLightColor : bombDarkColor;
      up(step);
      down(step);
    }
  }

  function wick(start = 0, end = 1, flameColor) {
    const angle = toRadian(120);
    const P0 = {x: 0, y: corkUp};
    const CP1 = {x: -corkXr / 2, y: corkUp - r / 4};
    const CP2 = {x: corkXr / 3, y: corkUp - r / 2};
    const PF = {x: -corkXr / 6, y: corkUp - r * 3 / 4};
    const [xR, yR] = [corkXr / 6, corkYr / 6];
    let dx, dy;

    function middleWick(t) {
      const B0 = (1 - t) ** 3;
      const B1 = 3 * t * (1 - t) ** 2;
      const B2 = 3 * t ** 2 * (1 - t);
      const B3 = t ** 3;
      dx = (B0 * P0.x) + (B1 * CP1.x) + (B2 * CP2.x) + (B3 * PF.x);
      dy = (B0 * P0.y) + (B1 * CP1.y) + (B2 * CP2.y) + (B3 * PF.y);
      ctx.beginPath();
      ctx.strokeStyle = flameColor || wickDarkColor;
      ctx.ellipse(dx, dy, xR, yR, 0, angle, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = flameColor || wickLightColor;
      ctx.ellipse(dx, dy, xR, yR, 0, 0, angle);
      ctx.stroke();
    }

    function wickUp() {
      ctx.beginPath();
      ctx.fillStyle = flameColor || wickDarkColor;
      ctx.ellipse(dx, dy, xR, yR, 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    for (let t = start; t <= end; t += .001) {
      middleWick(t);
    }
    wickUp();
    if (flameColor) return [dx, dy];
  }

  function drawCombustion() {
    isCombustionStart = true;
    frame();
    cork();
    wick(0, startFlame);
    const startCombustion = Math.max(startFlame, 0);
    const endCombustion = Math.min(1, startFlame + lengthFlame);
    let [sparkleX, sparkleY] = wick(startCombustion, endCombustion, combustionColor);
    if (sparkleX && sparkleY) sparkles.push(sparkle.create(sparkleX, sparkleY));
    sparkles = sparkles.filter(el => {
      el.coords = sparkle.draw(el);
      return el.coords.r > 0;
    });
    startFlame -= lengthFlame / 10;
  }

  function drawBoom() {
    triangles = triangles.filter(el => {
      el.translate = triangle.draw(el);
      return (Math.abs(el.translate.x) < w && Math.abs(el.translate.y) < h);
    });
    corkUp -= 10;
    corkBottom -= 10;
    cork();
    opacityFragments -= .01;
    bombLightColor = `rgba(42, 42, 42, ${opacityFragments})`;
    bombDarkColor = `rgba(29, 29, 29, ${opacityFragments})`;
  }

  function drawFlame() {
    opacityFlame -= .02;
    for (let j = 0; j < flame.length; j++) {
      const {r, g, b, o} = flame[j].color;
      ctx.fillStyle = `rgba(${r},${g},${b},${o}`;
      const inner = flame[j].pos;
      ctx.beginPath();
      inner.forEach(({x, y}) => {
        ctx.lineTo(x, y);
      });
      ctx.fill();

      flame[j].pos = inner.map(update);
      flame[j].color = updateColor(flame[j].color);
    }

    flame = flame.filter(el => {
      return el.pos.every(pos => Math.abs(pos.x) < canvas.width * 10 && Math.abs(pos.y) < canvas.height * 10);
    });

    function updateColor({r, g, b, o}) {
      return {
        r,
        g: g - 1,
        b: b - .5,
        o: o - .02
      };
    }

    function update({x, y}) {
      const dx = x / 15;
      const dy = y / 15;
      return {
        x: x + dx,
        y: y + dy
      };
    }
  }

  function drawText() {
    const text = "TEST OVER";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = `rgba(255, 255, 255, 1)`;
    ctx.save();
    for (let i = .02; i < .1; i += .02) {
      ctx.font = `${(scaleText - i) * 16}rem Khula sans-serif`;
      ctx.fillText(text, x, y);
    }
    ctx.restore();
    ctx.font = `${scaleText * 16}rem Khula sans-serif`;
    ctx.fillText(text, x, y);
    ctx.font = `${scaleText * 16}rem Khula sans-serif`;
    ctx.strokeStyle = `rgba(0, 0, 0, 1)`;
    ctx.strokeText(text, x, y);
    scaleText += .01;
    widthText = ctx.measureText(text).width;
  }

  function draw() {
    if (widthText < x * 1.5) {
      requestAnimationFrame(draw);
      ctx.fillStyle = "#000";
      ctx.fillRect(-canvas.width, -canvas.height, 2 * canvas.width, 2 * canvas.height);
    } else {
      setTimeout(() => console.log("redirect"), 3000);
    }
    if (sparkles.length || !isCombustionStart) drawCombustion();
    if (!sparkles.length && opacityFragments >= 0) drawBoom();
    if (opacityFragments < .5 && opacityFlame > 0) drawFlame();
    if (opacityFlame < 0 && widthText === 1) {
      ctx.rotate(toRadian(30));
      ctx.translate(-x, -y);
    }
    if (opacityFlame < 0) drawText();
  }

  function createTriangles() {
    const [points, indices] = createPoints(r);
    const output = [];
    for (let i = 0; i < indices.length; i += 3) {
      const tr = triangle.create(
        points[indices[i]],
        points[indices[i + 1]],
        points[indices[i + 2]]
      );
      output.push(tr);
    }
    return output;
  }

  function getRandomPointFlame(max) {
    const distance = 100;
    let duration = 1;
    let angles = [];
    let index = 0;
    for (let i = 0; i < max; i++) {
      const angle = getRandom(0, 2 * Math.PI);
      angles.push(angle);
    }
    angles.sort();
    return function () {
      const x = distance * Math.cos(angles[index]) * (1 - duration / 4);
      const y = distance * Math.sin(angles[index]) * (1 - duration / 4);
      duration *= -1;
      index++;
      return {x, y};
    };
  }

  function createFlamePoints() {
    if (flame[flame.length - 1]?.flag) flame[flame.length - 1].flag = false;
    let color = {r: 255, g: 236, b: 73, o: opacityFlame};
    const max = Math.round(getRandom(50, 75));
    const getPoint = getRandomPointFlame(max);
    let pos = [];
    for (let i = 0; i < max; i++) {
      pos.push(getPoint());
    }
    flame.push({
      flag: true,
      pos,
      color
    });
  }

  function createPoints(r) {
    const EPS = 1e-7;
    const points = [];
    const size = Math.floor(r / 4);
    for (let i = 0; i < size; i++) {
      points.push(getRandomPoint(r));
    }

    function getRandomPoint(r) {
      const x = Math.random() * (3 * r) - 1.5 * r;
      const y = Math.random() * (3 * r) - 1.5 * r;
      return {x, y};
    }

    // функция, находящая триангуляцию
    function triangulate(points) {
      let n = points.length;

      if (n < 3) return []; // треугольников нет
      points = points.slice(0); // копия массива

      // массив индексов, отсортированных по координате икс
      let ind = [];
      for (let i = 0; i < n; i++) ind.push(i);
      ind.sort((l, r) => points[l].x - points[r].x);
      // находим треугольник, содержащий все точки, и вставляем его в конец массива с вершинами
      let big = big_triangle(points);
      points.push(big.p1, big.p2, big.p3);

      let cur_points = [circusCircle_of_triangle(points, n, n + 1, n + 2)];
      let ans = [];
      let edges = [];

      // перебираем все точки
      for (let i = ind.length - 1; i >= 0; i--) {
        // перебираем все треугольники
        // если точка находится внутри треугольника, то нужно его удалить
        for (let j = cur_points.length - 1; j >= 0; j--) {
          // если точка справа от описанной окружности, то треугольник проверять больше не нужно
          // точки отсортированы и поэтому тоже будут справа
          let dx = points[ind[i]].x - cur_points[j].x;
          if (dx > 0 && dx * dx > cur_points[j].r) {
            ans.push(cur_points[j]);
            cur_points.splice(j, 1);
            continue;
          }

          // если точка вне окружности, то треугольник изменять не нужно
          let dy = points[ind[i]].y - cur_points[j].y;
          if (dx * dx + dy * dy - cur_points[j].r > EPS) {
            continue;
          }
          // удаляем треугольник и добавляем его стороны в список ребер
          edges.push(
            cur_points[j].a, cur_points[j].b,
            cur_points[j].b, cur_points[j].c,
            cur_points[j].c, cur_points[j].a
          );
          cur_points.splice(j, 1);
        }
        // удаляем кратные ребра
        delete_multiples_edges(edges);
        // создаем новые треугольники последовательно по списку ребер
        for (let j = edges.length - 1; j >= 0;) {
          let b = edges[j];
          j--;
          if (j < 0) break;
          let a = edges[j];
          j--;
          cur_points.push(circusCircle_of_triangle(points, a, b, ind[i]));
        }
        edges = [];
      }
      // формируем массив с триангуляцией
      for (let i = cur_points.length - 1; i >= 0; i--) {
        ans.push(cur_points[i]);
      }
      let tr = [];
      for (let i = 0; i < ans.length; i++) {
        if (ans[i].a < n && ans[i].b < n && ans[i].c < n) {
          tr.push(ans[i].a, ans[i].b, ans[i].c);
        }
      }
      return tr;
    }

    // вычисление центра и радиуса описанной окружности вокруг треугольника
    function circusCircle_of_triangle(points, v1, v2, v3) {
      let x1 = points[v1].x, y1 = points[v1].y;
      let x2 = points[v2].x, y2 = points[v2].y;
      let x3 = points[v3].x, y3 = points[v3].y;
      let dy12 = Math.abs(y1 - y2), dy23 = Math.abs(y2 - y3);
      let xc, yc;
      if (dy12 < EPS) {
        let m2 = -((x3 - x2) / (y3 - y2));
        let mx2 = (x2 + x3) / 2, my2 = (y2 + y3) / 2;
        xc = (x1 + x2) / 2;
        yc = m2 * (xc - mx2) + my2;
      } else if (dy23 < EPS) {
        let m1 = -((x2 - x1) / (y2 - y1));
        let mx1 = (x1 + x2) / 2, my1 = (y1 + y2) / 2;
        xc = (x2 + x3) / 2;
        yc = m1 * (xc - mx1) + my1;
      } else {
        let m1 = -((x2 - x1) / (y2 - y1)), m2 = -((x3 - x2) / (y3 - y2));
        let mx1 = (x1 + x2) / 2, my1 = (y1 + y2) / 2;
        let mx2 = (x2 + x3) / 2, my2 = (y2 + y3) / 2;
        xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        if (dy12 > dy23) yc = m1 * (xc - mx1) + my1;
        else yc = m2 * (xc - mx2) + my2;
      }
      let dx = x2 - xc, dy = y2 - yc;
      return {"a": v1, "b": v2, "c": v3, "x": xc, "y": yc, "r": dx * dx + dy * dy};
    }

// функция, находящая треугольник, содержащий все точки множества
    function big_triangle(points) {
      let minX = 1000000, maxX = -1000000, minY = 1000000, maxY = -1000000;
      for (let i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i].x);
        minY = Math.min(minY, points[i].y);
        maxX = Math.max(maxX, points[i].x);
        maxY = Math.max(maxY, points[i].y);
      }
      let dx = maxX - minX, dy = maxY - minY;
      let dxy = Math.max(dx, dy);
      let midX = dx * 0.5 + minX, midY = dy * 0.5 + minY;
      const p1 = {
        x: midX - 10 * dxy,
        y: midY - 10 * dxy
      };
      const p2 = {
        x: midX,
        y: midY + 10 * dxy
      };
      const p3 = {
        x: midX + 10 * dxy,
        y: midY - 10 * dxy
      };
      return {p1, p2, p3};
    }

// функция, удаляющая кратные ребра
    function delete_multiples_edges(edges) {
      for (let j = edges.length - 1; j >= 0;) {
        let b = edges[j];
        j--;
        let a = edges[j];
        j--;
        let n, m;
        for (let i = j; i >= 0;) {
          n = edges[i];
          i--;
          m = edges[i];
          i--;
          if (a === m && b === n) {
            edges.splice(j + 1, 2);
            edges.splice(i + 1, 2);
            break;
          }
          if (a === n && b === m) {
            edges.splice(j + 1, 2);
            edges.splice(i + 1, 2);
            break;
          }
        }
      }
    }

    return [points, triangulate(points)];
  }

  ctx.translate(x, y);
  ctx.rotate(toRadian(-30));
  triangles = createTriangles(r);
  createFlamePoints();
  draw();
}