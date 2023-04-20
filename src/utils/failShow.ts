import { useCommonStore } from "@/store/common";

export interface Coordinate {
  x: number;
  y: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  o: number;
}

interface Sparkle {
  color: string;
  coords: SparkleCoords;
  translate: Coordinate;
}

interface SparkleCoords {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
}

interface Triangle {
  a: Coordinate,
  b: Coordinate,
  c: Coordinate,
  delta: Coordinate,
  translate: Coordinate
}

interface Flame {
  flag: boolean;
  pos: Coordinate[];
  color: Color;
}

export function failShow(canvas: HTMLCanvasElement) {
  [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const r = Math.round(Math.min(w, h) / 4);
  const x = Math.round(w / 2);
  const y = Math.round(h / 2);
  const toRadian = (angle: number) => angle * Math.PI / 180;
  const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

  const combustionColor: string = "rgb(255, 231, 188)";
  const wickLightColor: string = "rgb(153, 54, 0)";
  const wickDarkColor: string = "rgb(107, 38, 0)";
  let bombLightColor: string = "rgb(42, 42, 42)";
  let bombDarkColor: string = "rgb(29, 29, 29)";

  const [corkXr, corkYr] = [r / 3, r / 10];
  let corkBottom = -r * 11 / 12;
  let corkUp = corkBottom - r / 5;

  let sparkles: Sparkle[] = [];

  let isCombustionStart = false;
  let startFlame = 1;
  const lengthFlame = .1;
  let opacityFragments = 1;

  const sparkle = {
    create(x: number, y: number): Sparkle {
      const translate = { x, y };
      let coords = { x: 0, y: 0, r: 5 };
      const isNegative = Math.round(getRandom(0, 1));
      const dx = isNegative === 1 ? getRandom(0, 50) * -0.1 : getRandom(0, 50) * 0.1;
      let dy = getRandom(-10, 10);
      const color = `hsl(${getRandom(30, 60)},100%,${getRandom(50, 100)}%)`;
      return { color, coords: { dx, dy, ...coords }, translate };
    },
    draw({ translate, coords, color }: Sparkle) {
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
    update(coords: SparkleCoords) {
      coords.r -= .05;
      coords.x += coords.dx;
      coords.y += coords.dy;
      coords.dy++;
      return coords;
    }
  };
  const triangle = {
    create(a: Coordinate, b: Coordinate, c: Coordinate): Triangle {
      const delta: Coordinate = {
        x: (Math.min(a.x, b.x, c.x)) * 10 / r,
        y: (Math.min(a.y, b.y, c.y)) * 10 / r
      };
      const translate: Coordinate = { x: 0, y: 0 };
      return { a, b, c, delta, translate };
    },
    update({ delta, translate }: { delta: Coordinate, translate: Coordinate }) {
      translate.x += delta.x;
      translate.y += delta.y;
      return translate;
    },
    draw({ a, b, c, translate, delta }: Triangle) {
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
      return this.update({ delta, translate });
    }
  };
  let triangles: Triangle[] = [];
  let opacityFlame = 1;
  let flame: Flame[] = [];

  let widthText = 1;
  let scaleText = 0;

  function frame() {
    if (!ctx) return;
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


    function down(step: number) {
      if (!ctx) return;
      const angle = toRadian(120);
      ctx.beginPath();
      ctx.ellipse(0, corkUp, corkXr, corkYr, 0, (angle * +!step), angle * step || Math.PI);
      ctx.ellipse(0, corkBottom, corkXr, corkYr, 0, angle * step || Math.PI, angle * +!step, true);
      ctx.ellipse(0, corkUp, corkXr, corkYr, 0, angle * +!step, angle * +!step);
      ctx.stroke();
      ctx.fill();
    }

    function up(step: number) {
      if (!ctx) return;
      const angle = toRadian(160);
      ctx.beginPath();
      ctx.ellipse(0, corkUp, corkXr, corkYr, 0, angle, 2 * (angle - Math.PI), !!step);
      ctx.stroke();
      ctx.fill();
    }

    for (let step = 0; step < 2; step++) {
      if (!ctx) return;
      ctx.fillStyle = step ? bombLightColor : bombDarkColor;
      ctx.strokeStyle = step ? bombLightColor : bombDarkColor;
      up(step);
      down(step);
    }
  }

  function wick(start = 0, end = 1, flameColor = "") {
    const angle = toRadian(120);
    const P0 = { x: 0, y: corkUp };
    const CP1 = { x: -corkXr / 2, y: corkUp - r / 4 };
    const CP2 = { x: corkXr / 3, y: corkUp - r / 2 };
    const PF = { x: -corkXr / 6, y: corkUp - r * 3 / 4 };
    const [xR, yR] = [corkXr / 6, corkYr / 6];
    let dx: number | undefined, dy: number | undefined;

    function calculateBezierCoords(t: number) {
      const B0 = (1 - t) ** 3;
      const B1 = 3 * t * (1 - t) ** 2;
      const B2 = 3 * t ** 2 * (1 - t);
      const B3 = t ** 3;
      const dx = (B0 * P0.x) + (B1 * CP1.x) + (B2 * CP2.x) + (B3 * PF.x);
      const dy = (B0 * P0.y) + (B1 * CP1.y) + (B2 * CP2.y) + (B3 * PF.y);
      return [dx, dy];
    }

    function middleWick() {
      let dx, dy: undefined | number;
      if (!ctx) return [];
      for (let i = start; i <= end; i += .001) {
        [dx, dy] = calculateBezierCoords(i);
        ctx.beginPath();
        ctx.strokeStyle = flameColor || wickDarkColor;
        ctx.ellipse(dx, dy, xR, yR, 0, angle, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = flameColor || wickLightColor;
        ctx.ellipse(dx, dy, xR, yR, 0, 0, angle);
        ctx.stroke();
      }
      return [dx, dy];
    }

    function wickUp() {
      if (!ctx || !dx || !dy) return;
      ctx.beginPath();
      ctx.fillStyle = flameColor || wickDarkColor;
      ctx.ellipse(dx, dy, xR, yR, 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    [dx, dy] = middleWick();
    wickUp();
    return [dx, dy];
    // return (flameColor) ? [dx, dy] : [0, 0];
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
    if (!ctx) return;
    opacityFlame -= .02;
    for (let j = 0; j < flame.length; j++) {
      const { r, g, b, o } = flame[j].color;
      ctx.fillStyle = `rgba(${r},${g},${b},${o}`;
      const inner = flame[j].pos;
      ctx.beginPath();
      inner.forEach(({ x, y }) => {
        ctx.lineTo(x, y);
      });
      ctx.fill();

      flame[j].pos = inner.map(update);
      flame[j].color = updateColor(flame[j].color);
    }

    flame = flame.filter(el => {
      return el.pos.every(pos => Math.abs(pos.x) < canvas.width * 10 && Math.abs(pos.y) < canvas.height * 10);
    });

    function updateColor({ r, g, b, o }: Color) {
      return {
        r,
        g: g - 1,
        b: b - .5,
        o: o - .02
      };
    }

    function update({ x, y }: Coordinate) {
      const dx = x / 15;
      const dy = y / 15;
      return {
        x: x + dx,
        y: y + dy
      };
    }
  }

  function drawText() {
    if (!ctx) return;
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
    if (!ctx) return;
    if (widthText < x * 1.5) {
      requestAnimationFrame(draw);
      ctx.fillStyle = "#000";
      ctx.fillRect(-canvas.width, -canvas.height, 2 * canvas.width, 2 * canvas.height);
    } else {
      setTimeout(() => useCommonStore().setAnimationStatus(false), 3000);
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
    const [points, indices] = createPoints(r) as [Coordinate[], number[]];
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

  function getRandomPointFlame(max: number) {
    const distance = 100;
    let duration = 1;
    let angles: number[] = [];
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
      return { x, y };
    };
  }

  function createFlamePoints() {
    if (flame[flame.length - 1]?.flag) flame[flame.length - 1].flag = false;
    let color: Color = { r: 255, g: 236, b: 73, o: opacityFlame };
    const max = Math.round(getRandom(50, 75));
    const getPoint = getRandomPointFlame(max);
    let pos: Coordinate[] = [];
    for (let i = 0; i < max; i++) {
      pos.push(getPoint());
    }
    flame.push({
      flag: true,
      pos,
      color
    });
  }

  function createPoints(r: number) {
    const EPS = 1e-7;
    const points: Coordinate[] = [];
    const size = Math.floor(r / 4);
    for (let i = 0; i < size; i++) {
      points.push(getRandomPoint(r));
    }

    function getRandomPoint(r: number) {
      const x = Math.random() * (3 * r) - 1.5 * r;
      const y = Math.random() * (3 * r) - 1.5 * r;
      return { x, y };
    }

    function triangulate(points: Coordinate[]): number[] {
      let n = points.length;
      if (n < 3) return [];
      points = points.slice(0);
      let ind = [];
      for (let i = 0; i < n; i++) ind.push(i);
      ind.sort((l, r) => points[l].x - points[r].x);
      let big = big_triangle(points);
      points.push(big.p1, big.p2, big.p3);
      let cur_points = [circusCircle_of_triangle(points, n, n + 1, n + 2)];
      let ans = [];
      let edges = [];
      for (let i = ind.length - 1; i >= 0; i--) {
        for (let j = cur_points.length - 1; j >= 0; j--) {
          let dx = points[ind[i]].x - cur_points[j].x;
          if (dx > 0 && dx * dx > cur_points[j].r) {
            ans.push(cur_points[j]);
            cur_points.splice(j, 1);
            continue;
          }
          let dy = points[ind[i]].y - cur_points[j].y;
          if (dx * dx + dy * dy - cur_points[j].r > EPS) {
            continue;
          }
          edges.push(
            cur_points[j].a, cur_points[j].b,
            cur_points[j].b, cur_points[j].c,
            cur_points[j].c, cur_points[j].a
          );
          cur_points.splice(j, 1);
        }
        delete_multiples_edges(edges);
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

    function circusCircle_of_triangle(points: Coordinate[], v1: number, v2: number, v3: number) {
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
      return { "a": v1, "b": v2, "c": v3, "x": xc, "y": yc, "r": dx * dx + dy * dy };
    }

    function big_triangle(points: Coordinate[]) {
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
      return { p1, p2, p3 };
    }

    function delete_multiples_edges(edges: number[]) {
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
  triangles = createTriangles();
  createFlamePoints();
  draw();
  useCommonStore().setAnimationStatus(true);
}