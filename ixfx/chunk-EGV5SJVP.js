import {
  Svg_exports
} from "./chunk-R2XC6DT2.js";
import {
  Video_exports
} from "./chunk-KZMI6SQ4.js";
import {
  clamp as clamp2
} from "./chunk-BL4ZBI5J.js";
import {
  Empty2,
  EmptyPositioned,
  ImageDataGrid_exports,
  Placeholder,
  PlaceholderPositioned,
  corners,
  corners2,
  isEqualSize,
  rect_exports
} from "./chunk-OQT4QDLV.js";
import {
  StackImmutable
} from "./chunk-B7YMT2OB.js";
import {
  immutable
} from "./chunk-D7ASMYBE.js";
import {
  Empty,
  Ops,
  guard2,
  intersectsPoint,
  isCubicBezier,
  isEqual,
  isLine,
  isPlaceholder,
  isQuadraticBezier,
  piPi2 as piPi,
  point_exports,
  quantiseEvery,
  sources_exports,
  subtract
} from "./chunk-B77CGYDG.js";
import {
  Colour_exports,
  guard,
  multiplyOpacity,
  randomHue,
  resolveToString,
  scaler,
  scalerTwoWay
} from "./chunk-W4IV5LHQ.js";
import {
  clamp
} from "./chunk-QAEJS6HO.js";
import {
  MapOfSimpleMutable
} from "./chunk-47H3N64R.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  withoutUndefined
} from "./chunk-LZ42FUDS.js";
import {
  throwArrayTest
} from "./chunk-AKC4PULA.js";
import {
  round
} from "./chunk-4LY3IBHN.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  BipolarView: () => BipolarView_exports,
  CanvasRegion: () => CanvasRegion,
  CanvasSource: () => CanvasSource,
  CartesianCanvasPlot: () => CartesianCanvasPlot,
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  ImageDataGrid: () => ImageDataGrid_exports,
  Palette: () => Palette_exports,
  Plot: () => plot_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports,
  insert: () => insert
});

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  copyToImg: () => copyToImg,
  dot: () => dot,
  drawingStack: () => drawingStack,
  ellipse: () => ellipse,
  getContext: () => getContext,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textHeight: () => textHeight,
  textRect: () => textRect,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle
});
var PIPI = Math.PI * 2;
var getContext = (canvasElementContextOrQuery) => {
  if (canvasElementContextOrQuery === null) {
    throw new Error(
      `canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`
    );
  }
  if (canvasElementContextOrQuery === void 0) {
    throw new Error(
      `canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`
    );
  }
  const ctx = canvasElementContextOrQuery instanceof CanvasRenderingContext2D ? canvasElementContextOrQuery : canvasElementContextOrQuery instanceof HTMLCanvasElement ? canvasElementContextOrQuery.getContext(`2d`) : typeof canvasElementContextOrQuery === `string` ? resolveEl(canvasElementContextOrQuery).getContext(`2d`) : canvasElementContextOrQuery;
  if (ctx === null) throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getContext(ctxOrCanvasEl);
  return {
    ctx,
    paths(pathsToDraw, opts) {
      paths(ctx, pathsToDraw, opts);
    },
    line(lineToDraw, opts) {
      line(ctx, lineToDraw, opts);
    },
    rect(rectsToDraw, opts) {
      rect(ctx, rectsToDraw, opts);
    },
    bezier(bezierToDraw, opts) {
      bezier(ctx, bezierToDraw, opts);
    },
    connectedPoints(pointsToDraw, opts) {
      connectedPoints(ctx, pointsToDraw, opts);
    },
    pointLabels(pointsToDraw, opts) {
      pointLabels(ctx, pointsToDraw, opts);
    },
    dot(dotPosition, opts) {
      dot(ctx, dotPosition, opts);
    },
    circle(circlesToDraw, opts) {
      circle(ctx, circlesToDraw, opts);
    },
    arc(arcsToDraw, opts) {
      arc(ctx, arcsToDraw, opts);
    },
    textBlock(lines, opts) {
      if (opts.bounds === void 0 && canvasBounds !== void 0) {
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      }
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}, ...additionalOps) => {
  if (ctx === void 0) throw new Error(`ctx undefined`);
  const stack = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
  stack.apply();
  return stack;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
  for (const arc2 of arcsArray) {
    draw(arc2);
  }
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply = (ctx) => {
    if (fillStyle) ctx.fillStyle = fillStyle;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
  };
  return apply;
};
var lineOp = (lineWidth, lineJoin, lineCap) => {
  const apply = (ctx) => {
    if (lineWidth) ctx.lineWidth = lineWidth;
    if (lineJoin) ctx.lineJoin = lineJoin;
    if (lineCap) ctx.lineCap = lineCap;
  };
  return apply;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0) stk = new StackImmutable();
  const push = (...ops) => {
    if (stk === void 0) stk = new StackImmutable();
    const s = stk.push(...ops);
    for (const o of ops) o(ctx);
    return drawingStack(ctx, s);
  };
  const pop = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply = () => {
    if (stk === void 0) return drawingStack(ctx);
    for (const op of stk.data) op(ctx);
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  for (const [index, p] of points.entries()) {
    if (index + 2 >= points.length) continue;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  }
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  if (Array.isArray(circlesToDraw)) {
    for (const c of circlesToDraw) draw(c);
  } else {
    draw(circlesToDraw);
  }
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (ellipse2) => {
    ctx.beginPath();
    const rotation = ellipse2.rotation ?? 0;
    const startAngle = ellipse2.startAngle ?? 0;
    const endAngle = ellipse2.endAngle ?? PIPI;
    ctx.ellipse(ellipse2.x, ellipse2.y, ellipse2.radiusX, ellipse2.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  const ellipsesArray = Array.isArray(ellipsesToDraw) ? ellipsesToDraw : [ellipsesToDraw];
  for (const ellipse2 of ellipsesArray) {
    draw(ellipse2);
  }
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (path) => {
    if (isQuadraticBezier(path)) quadraticBezier(ctx, path, opts);
    else if (isLine(path)) line(ctx, path, opts);
    else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw)) {
    for (const p of pathsToDraw) draw(p);
  } else {
    draw(pathsToDraw);
  }
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  throwArrayTest(pts);
  if (pts.length === 0) return;
  for (const [index, pt] of pts.entries()) guard(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  if (opts.lineWidth) ctx.lineWidth = opts.lineWidth;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (const pt of pts) ctx.lineTo(pt.x, pt.y);
  if (shouldLoop) ctx.lineTo(pts[0].x, pts[0].y);
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0) return;
  for (const [index, pt] of pts.entries()) guard(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  for (const [index, pt] of pts.entries()) {
    const label = labels !== void 0 && index < labels.length ? labels[index] : index.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  }
};
var translatePoint = (ctx, point) => {
  const m = ctx.getTransform();
  return {
    x: point.x * m.a + point.y * m.c + m.e,
    y: point.x * m.b + point.y * m.d + m.f
  };
};
var copyToImg = (canvasEl) => {
  const img = document.createElement(`img`);
  img.src = canvasEl.toDataURL(`image/jpeg`);
  return img;
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0) opts = {};
  const radius = opts.radius ?? 10;
  const positions = Array.isArray(pos) ? pos : [pos];
  const stroke = opts.stroke ? opts.stroke : opts.strokeStyle !== void 0;
  let filled = opts.filled ? opts.filled : opts.fillStyle !== void 0;
  if (!stroke && !filled) filled = true;
  applyOpts(ctx, opts);
  for (const pos2 of positions) {
    ctx.beginPath();
    if (`radius` in pos2) {
      ctx.arc(pos2.x, pos2.y, pos2.radius, 0, 2 * Math.PI);
    } else {
      ctx.arc(pos2.x, pos2.y, radius, 0, 2 * Math.PI);
    }
    if (filled) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  if (isDebug) {
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: multiplyOpacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: multiplyOpacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    stack.apply();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: multiplyOpacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: multiplyOpacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    connectedPoints(ctx, [a, quadratic, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o);
  const draw = (d) => {
    const { a, b } = d;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a.x, a.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a, { radius: 5, strokeStyle: `black` });
      dot(ctx, b, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) draw(t);
  } else {
    draw(toDraw);
  }
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw = (t) => {
    connectedPoints(ctx, corners2(t), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw(t);
    }
  } else {
    draw(toDraw);
  }
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
  const stroke = opts.stroke ?? (opts.strokeStyle === void 0 ? false : true);
  const draw = (d) => {
    const x = `x` in d ? d.x : 0;
    const y = `y` in d ? d.y : 0;
    if (filled) ctx.fillRect(x, y, d.width, d.height);
    if (stroke) {
      if (opts.strokeWidth) ctx.lineWidth = opts.strokeWidth;
      ctx.strokeRect(x, y, d.width, d.height);
    }
    if (opts.crossed) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(d.width, d.height);
      ctx.stroke();
      ctx.moveTo(0, d.height);
      ctx.lineTo(d.width, 0);
      ctx.stroke();
    }
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw(t);
    }
  } else {
    draw(toDraw);
  }
};
var textWidth = (ctx, text, padding = 0, widthMultiple) => {
  const rect2 = textRect(ctx, text, padding, widthMultiple);
  return rect2.width;
};
var textRect = (ctx, text, padding = 0, widthMultiple) => {
  if (text === void 0 || text === null || text.length === 0) return Empty2;
  const m = ctx.measureText(text);
  const width = widthMultiple ? quantiseEvery(m.width, widthMultiple) + padding : m.width + padding;
  return {
    width,
    height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
  };
};
var textHeight = (ctx, text, padding = 0) => {
  const rect2 = textRect(ctx, text, padding);
  return rect2.height;
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const align = opts.align ?? `top`;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent + 3
  );
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width) {
    x = bounds.width - (maxWidth + anchorPadding);
  } else x -= anchorPadding;
  if (x < bounds.x) x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height) {
    y = bounds.height - (totalHeight + anchorPadding);
  } else y -= anchorPadding;
  if (y < bounds.y) y = bounds.y + anchorPadding;
  if (align === `top`) {
    ctx.textBaseline = `top`;
  } else {
    ctx.textBaseline = `middle`;
  }
  for (const [index, line2] of lines.entries()) {
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
};
var textBlockAligned = (ctx, text, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  const lines = typeof text === `string` ? [text] : text;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let y = 0;
  if (vert === `center`) y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  for (const [index, line2] of lines.entries()) {
    let x = 0;
    if (horiz === `center`) x = middleX - blocks[index].width / 2;
    else if (horiz === `right`) x = bounds.width - blocks[index].width;
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
  ctx.restore();
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create
});
var create = (fallbacks) => new PaletteImpl(fallbacks);
var PaletteImpl = class {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #store = /* @__PURE__ */ new Map();
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #aliases = /* @__PURE__ */ new Map();
  #lastFallback = 0;
  #elementBase;
  constructor(fallbacks) {
    if (fallbacks !== void 0) this.fallbacks = fallbacks;
    else this.fallbacks = [`red`, `blue`, `green`, `orange`];
    this.#elementBase = document.body;
  }
  setElementBase(el) {
    this.#elementBase = el;
  }
  add(key, colour) {
    this.#store.set(key, colour);
  }
  alias(from, to) {
    this.#aliases.set(from, to);
  }
  get(key, fallback) {
    const alias = this.#aliases.get(key);
    if (alias !== void 0) key = alias;
    const c = this.#store.get(key);
    if (c !== void 0) return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(this.#elementBase).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0) return fallback;
      fromCss = this.fallbacks[this.#lastFallback];
      this.#lastFallback++;
      if (this.#lastFallback === this.fallbacks.length) this.#lastFallback = 0;
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key)) return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return this.#store.has(key);
  }
};

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasLayoutState: () => CanvasLayoutState,
  CanvasMeasureState: () => CanvasMeasureState,
  LayoutState: () => LayoutState,
  MeasureState: () => MeasureState,
  boxRectFromPx: () => boxRectFromPx,
  boxRectFromRectPx: () => boxRectFromRectPx,
  boxUnitFromPx: () => boxUnitFromPx
});

// src/geometry/rect/Clamp.ts
var clamp3 = (value, maximum) => {
  return Object.freeze({
    ...value,
    width: Math.min(value.width, maximum.width),
    height: Math.min(value.height, maximum.height)
  });
};

// src/visual/SceneGraph.ts
var boxUnitFromPx = (v) => {
  return { type: `px`, value: v };
};
var boxRectFromPx = (x, y, width, height) => {
  return {
    x: boxUnitFromPx(x),
    y: boxUnitFromPx(y),
    width: boxUnitFromPx(width),
    height: boxUnitFromPx(height)
  };
};
var boxRectFromRectPx = (r) => {
  return {
    x: boxUnitFromPx(r.x),
    y: boxUnitFromPx(r.y),
    width: boxUnitFromPx(r.width),
    height: boxUnitFromPx(r.height)
  };
};
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0) return true;
  if (a === void 0) return false;
  if (b === void 0) return false;
  if (a.x && b.x && !unitIsEqual(a.x, b.x)) return false;
  if (a.y && b.y && !unitIsEqual(a.y, b.y)) return false;
  if (a.width && b.width && !unitIsEqual(a.width, b.width)) return false;
  if (a.height && b.height && !unitIsEqual(a.height, b.height)) return false;
  return true;
};
var BaseState = class {
  constructor(bounds) {
    this.bounds = bounds;
    this.pass = 0;
  }
  resolveToPx(u, maxValue, defaultValue) {
    if (u === void 0 && defaultValue !== void 0) return defaultValue;
    if (u === void 0) return;
    if (u.type === void 0) throw new TypeError(`Expected 'type' and 'value' fields. Type is missing`);
    if (u.value === void 0) throw new TypeError(`Expected 'type' and 'value' fields. Value is missing`);
    if (u.type === `px`) return u.value;
    if (u.type === `pc`) return u.value * maxValue;
    throw new Error(`Unknown unit type: ${u.type}`);
  }
  resolveBox(box) {
    if (box === void 0) return void 0;
    const x = this.resolveToPx(box.x, this.bounds.width);
    const y = this.resolveToPx(box.y, this.bounds.height);
    const width = this.resolveToPx(box.width, this.bounds.width);
    const height = this.resolveToPx(box.height, this.bounds.height);
    if (!width || !height) throw new TypeError(`Expected width and height`);
    if (x === void 0 && y === void 0) {
      return Object.freeze({ width, height });
    } else {
      if (!x || !y) throw new TypeError(`Expected x and y`);
      return Object.freeze({
        x,
        y,
        width,
        height
      });
    }
  }
};
var MeasureState = class extends BaseState {
  constructor(bounds) {
    super(bounds);
    this.measurements = /* @__PURE__ */ new Map();
  }
  getActualSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0) return;
    if (isPlaceholder(s.actual)) return;
    return s.actual;
  }
  whatIsMeasured() {
    return [...this.measurements.keys()];
  }
};
var LayoutState = class extends BaseState {
  constructor(bounds) {
    super(bounds);
    this.layouts = /* @__PURE__ */ new Map();
  }
};
var Box = class {
  /**
   * Constructor.
   * 
   * If `parent` is provided, `parent.onChildAdded(this)` is called.
   * @param parent parent box 
   * @param id id of this box
   */
  constructor(parent, id) {
    /** Rectangle Box occupies in canvas/etc */
    this.canvasRegion = PlaceholderPositioned;
    this.children = [];
    this._idMap = /* @__PURE__ */ new Map();
    this.debugLayout = false;
    this._visible = true;
    this._ready = true;
    this.takesSpaceWhenInvisible = false;
    this._needsMeasuring = true;
    this._needsLayoutX = true;
    this._needsDrawing = true;
    this.debugHue = randomHue();
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  /**
   * Returns _true_ if `box` is a child
   * @param box 
   * @returns 
   */
  hasChild(box) {
    const byReference = this.children.find((c) => c === box);
    const byId = this.children.find((c) => c.id === box.id);
    return byReference !== void 0 || byId !== void 0;
  }
  /**
   * Sends a message to all child boxes.
   * 
   * This first calls `onNotify` on this instance,
   * before calling `notify()` on each child.
   * @param message 
   * @param source 
   */
  notify(message, source) {
    this.onNotify(message, source);
    for (const c of this.children) c.notify(message, source);
  }
  *getChildren() {
    return this.children.entries();
  }
  /**
   * Handles a received message
   * @param _message 
   * @param _source 
   */
  onNotify(_message, _source) {
  }
  /**
   * Notification a child box has been added
   * 
   * Throws if
   * - child has parent as its own child
   * - child is same as this
   * - child is already child of this
   * @param child 
   */
  onChildAdded(child) {
    if (child.hasChild(this)) throw new Error(`Recursive`);
    if (child === this) throw new Error(`Cannot add self as child`);
    if (this.hasChild(child)) throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
    this.layoutInvalidated(`Box.onChildAdded`);
  }
  /**
   * Sets `_ready` to `ready`. If `includeChildren` is _true_,
   * `setReady` is called on each child
   * @param ready 
   * @param includeChildren 
   */
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      for (const c of this.children) c.setReady(ready, includeChildren);
    }
  }
  /**
   * Gets visible state
   */
  get visible() {
    return this._visible;
  }
  /**
   * Sets visible state
   */
  set visible(v) {
    if (this._visible === v) return;
    this._visible = v;
    this.layoutInvalidated(`Box.set visible`);
  }
  /**
   * Gets the box's desired region, or _undefined_
   */
  get desiredRegion() {
    return this._desiredRect;
  }
  /**
   * Sets the box's desired region.
   * Calls `onLayoutNeeded()`
   */
  set desiredRegion(v) {
    if (boxRectIsEqual(v, this._desiredRect)) return;
    this._desiredRect = v;
    this.layoutInvalidated(`set desiredRegion`);
  }
  /**
   * Calls `notifyChildLayoutNeeded`
   */
  layoutInvalidated(reason) {
    if (reason === void 0) debugger;
    this.debugLog(`layoutInvalidated ${reason}`);
    this._needsMeasuring = true;
    this._needsLayoutX = true;
    this._needsDrawing = true;
    this.notifyChildLayoutNeeded();
  }
  drawingInvalidated(_reason) {
    this._needsDrawing = true;
  }
  /**
   * Called from a child, notifying us that
   * its layout has changed
   * @returns 
   */
  notifyChildLayoutNeeded() {
    this._needsDrawing = true;
    this._needsLayoutX = true;
    this._needsMeasuring = true;
    if (this._parent === void 0) return;
    this._parent.notifyChildLayoutNeeded();
  }
  /**
   * Returns the root box
   */
  get root() {
    if (this._parent === void 0) return this;
    return this._parent.root;
  }
  /**
   * Prepare for measuring
   */
  measurePreflight() {
  }
  /**
   * Applies actual size, returning _true_ if size is different than before
   * 
   * 1. Sets `_needsLayout` to _false_.
   * 2. Sets `visual` to `m`
   * 3. Calls `measureApply` on each child
   * 4. If there's a change or `force`, sets `needsDrawing` to _true_, and notifies root of `measureApplied`
   * @param m Measurement for box
   * @returns 
   */
  measureApply(m) {
    this._needsMeasuring = false;
    const different = this._measuredSize === void 0 ? true : !isEqualSize(m.actual, this._measuredSize);
    if (different) {
      this._needsLayoutX = true;
    }
    this._measuredSize = { width: m.actual.width, height: m.actual.height };
    for (const c of m.children) {
      if (c !== void 0) c.ref.measureApply(c);
    }
    if (different) {
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  layoutApply(l) {
    this._needsLayoutX = false;
    const different = this._layoutPosition === void 0 ? true : !isEqual(l.actual, this._layoutPosition);
    this._layoutPosition = { x: l.actual.x, y: l.actual.y };
    for (const c of l.children) {
      if (c !== void 0) c.ref.layoutApply(c);
    }
    if (different) {
      this.root.notify(`layoutApplied`, this);
    }
    return different;
  }
  /**
   * Debug log from this box context
   * @param m 
   */
  debugLog(m) {
    if (!this.debugLayout) return;
    console.log(`SceneGraph[${this.id}]`, m);
  }
  layoutStart(measureState, layoutState, force, parent) {
    const m = {
      ref: this,
      actual: Empty,
      children: []
    };
    layoutState.layouts.set(this.id, m);
    const currentPosition = this.layoutSelf(measureState, layoutState, parent);
    this.root.notify(`laidout`, this);
    if (currentPosition === void 0) return;
    m.actual = currentPosition;
    m.children = this.children.map((c) => c.layoutStart(measureState, layoutState, force, m));
    if (withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  layoutSelf(measureState, layoutState, _parent) {
    const box = layoutState.resolveBox(this._desiredRect);
    const x = box === void 0 ? 0 : `x` in box ? box.x : 0;
    const y = box === void 0 ? 0 : `y` in box ? box.y : 0;
    if (x === void 0) debugger;
    if (y === void 0) debugger;
    return { x, y };
  }
  /**
   * Start of measuring
   * 1. Keeps track of measurements in `opts.measurements`
   * 2. If this box takes space
   * 2.1. Measure itself if needed
   * 2.2. Use size
   * 2. Calls `measureStart` on each child
   * @param opts Options
   * @param force Force measurement
   * @param parent Parent's measurement 
   * @returns Measurement
   */
  measureStart(opts, force, parent) {
    this.measurePreflight();
    const m = {
      ref: this,
      // So far no known measurement
      actual: Placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.actual = EmptyPositioned;
    } else {
      let currentMeasurement = this._measuredSize;
      if (this._needsMeasuring || this._measuredSize === void 0) {
        currentMeasurement = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (typeof currentMeasurement === `string`) {
        return;
      } else if (currentMeasurement === void 0) {
        return;
      }
      m.actual = currentMeasurement;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  /**
   * Measure the box
   * 1. Uses desired rectangle, if possible
   * 2. Otherwise uses parent's size
   * @param opts Measure state
   * @param parent Parent size
   * @returns 
   */
  measureSelf(opts, parent) {
    let size = Placeholder;
    const context = parent ? parent.actual : opts.bounds;
    const desired = opts.resolveBox(this._desiredRect);
    size = desired ? clamp3(desired, context) : context;
    if (isPlaceholder(size)) {
      return `Box.measureSelf - No size for box?`;
    }
    return size;
  }
  // protected updateDone(state: MeasureState, force: boolean): void {
  //   this.onUpdateDone(state, force);
  //   for (const c of this.children) c.updateDone(state, force);
  // }
  /**
   * Update has completed
   * @param state 
   * @param force 
   */
  //abstract onUpdateDone(state: MeasureState, force: boolean): void;
  /**
   * Update
   * 1. Calls `this.updateBegin()` to initialise measurement state
   * 2. In a loop, run `measureStart()` and then `measureApply` if possible
   * 3. Call `updateDone` when finished
   * @param force Force update
   * @returns 
   */
  update(context, force = false) {
    if (context === void 0) throw new Error(`context is undefined`);
    if (!this._needsMeasuring && !this._needsLayoutX && !force) return;
    const [measureState, layoutState] = this.updateBegin(context);
    let attempts = 5;
    let measureApplied = false;
    let layoutApplied = false;
    if (this._needsMeasuring || force) {
      while (attempts--) {
        const m = this.measureStart(measureState, force);
        if (m !== void 0) {
          this.measureApply(m);
          if (!this._ready) return;
          measureApplied = true;
        }
      }
      if (!measureApplied) this.debugLog(`Ran out of measurement attempts`);
    }
    if (this._needsLayoutX || force) {
      const p = this.layoutStart(measureState, layoutState, force);
      if (p === void 0) {
        this.debugLog(`Warning: could not layout`);
      } else {
        this.layoutApply(p);
        layoutApplied = true;
      }
    }
    this.updateComplete(measureApplied, layoutApplied);
  }
};
var CanvasMeasureState = class extends MeasureState {
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0) throw new Error(`ctx is undefined`);
  }
};
var CanvasLayoutState = class extends LayoutState {
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0) throw new Error(`ctx is undefined`);
  }
};
var CanvasBox = class _CanvasBox extends Box {
  constructor(parent, id, bounds) {
    super(parent, id);
    this.bounds = bounds;
    this.debugLog(`CanvasBox ctor bounds: ${JSON.stringify(bounds)}`);
  }
  static fromCanvas(canvasElement) {
    const box = new _CanvasBox(void 0, `canvas-box`, canvasElement.getBoundingClientRect());
    return box;
  }
  /**
   * Called if this is the parent Box
   */
  addEventHandlers(element) {
    element.addEventListener(`pointermove`, (event) => {
      const p = { x: event.offsetX, y: event.offsetY };
      this.notifyPointerMove(p);
    });
    element.addEventListener(`pointerleave`, (_event) => {
      this.notifyPointerLeave();
    });
    element.addEventListener(`click`, (event) => {
      const p = { x: event.offsetX, y: event.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(_p) {
  }
  /**
   * Click event has happened on canvas
   * 1. If it's within our range, call `onClick` and pass to all children via `notifyClick`
   * @param p 
   * @returns 
   */
  notifyClick(p) {
    if (isPlaceholder(this.canvasRegion)) return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onClick(pp);
      for (const c of this.children) c.notifyClick(pp);
    }
  }
  /**
   * Pointer has left
   * 1. Pass notification to all children via `notifyPointerLeave`
   */
  notifyPointerLeave() {
    this.onPointerLeave();
    for (const c of this.children) c.notifyPointerLeave();
  }
  /**
   * Pointer has moved
   * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
   * @param p 
   * @returns 
   */
  notifyPointerMove(p) {
    if (isPlaceholder(this.canvasRegion)) return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onPointerMove(pp);
      for (const c of this.children) c.notifyPointerMove(pp);
    }
  }
  /**
   * Handler when pointer has left
   */
  onPointerLeave() {
  }
  /**
   * Handler when pointer moves within our region
   * @param _p 
   */
  onPointerMove(_p) {
  }
  /**
   * Performs recalculations and drawing as necessary
   * If nothing needs to happen, function returns.
   * @param context 
   * @param force Force update
   */
  update(context, force = false) {
    super.update(context, force);
    this.draw(context, force);
  }
  getBounds() {
    return this.bounds === void 0 && this._parent ? this._parent.bounds : this.bounds;
  }
  unsetBounds() {
    this.bounds = void 0;
  }
  /**
   * Update begins.
   * @returns MeasureState
   */
  updateBegin(context) {
    if (context === void 0) throw new Error(`Context is undefined`);
    let bounds = this.getBounds();
    if (bounds === void 0) {
      this.debugLog(`No bounds for element or parent, using canvas bounds`);
      bounds = { x: 0, y: 0, width: context.canvas.width, height: context.canvas.height };
    }
    return [
      new CanvasMeasureState(bounds, context),
      new CanvasLayoutState(bounds, context)
    ];
  }
  updateComplete(_measureChanged, _layoutChanged) {
    this.canvasRegion = PlaceholderPositioned;
  }
  measureApply(m) {
    const different = super.measureApply(m);
    if (different) this.canvasRegion = PlaceholderPositioned;
    return different;
  }
  layoutApply(l) {
    const different = super.layoutApply(l);
    if (different) this.canvasRegion = PlaceholderPositioned;
    return different;
  }
  draw(ctx, force = false) {
    if (this._needsDrawing || force) {
      if (isPlaceholder(this.canvasRegion)) {
        if (this._layoutPosition === void 0) return;
        if (this._measuredSize === void 0) return;
        this.canvasRegion = {
          x: this._layoutPosition.x,
          y: this._layoutPosition.y,
          width: this._measuredSize.width,
          height: this._measuredSize.height
        };
      }
      if (this._needsLayoutX || this._needsMeasuring) {
      }
      ctx.save();
      const v = this.canvasRegion;
      ctx.translate(v.x, v.y);
      ctx.beginPath();
      ctx.rect(0, 0, v.width, v.height);
      ctx.clip();
      if (this.debugLayout) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
        ctx.strokeRect(0, 0, v.width, v.height);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillText(this.id, 10, 10, v.width);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(v.width, v.height);
        ctx.stroke();
      }
      this.drawSelf(ctx);
      this._needsDrawing = false;
      ctx.restore();
    }
    for (const c of this.children) {
      c.draw(ctx, force);
    }
  }
  /**
   * Draw this object
   * @param _ctx 
   */
  drawSelf(_ctx) {
  }
};

// src/visual/CanvasRegion.ts
var CanvasSource = class {
  #canvasEl;
  #ctx;
  #sizeBasis;
  #sizeScaler;
  #logicalSize;
  #pixelScaling;
  #regions = [];
  constructor(canvasElementOrQuery, sizeBasis = `min`) {
    this.#canvasEl = resolveEl(canvasElementOrQuery);
    this.#sizeBasis = sizeBasis;
    this.#pixelScaling = window.devicePixelRatio || 1;
    this.#sizeScaler = this.#createSizeScaler();
    this.#logicalSize = this.setLogicalSize({ width: this.#canvasEl.width, height: this.#canvasEl.height });
  }
  setLogicalSize(size) {
    this.#logicalSize = size;
    const el = this.#canvasEl;
    el.width = size.width * this.#pixelScaling;
    el.height = size.height * this.#pixelScaling;
    el.style.width = `${size.width.toString()}px`;
    el.style.height = `${size.height.toString()}px`;
    this.#sizeScaler = this.#createSizeScaler();
    this.invalidateContext();
    return size;
  }
  #createSizeScaler() {
    let inMax = 1;
    switch (this.#sizeBasis) {
      case `min`:
        inMax = Math.min(this.#canvasEl.width, this.#canvasEl.height);
        break;
      case `max`:
        inMax = Math.max(this.#canvasEl.width, this.#canvasEl.height);
        break;
    }
    const s = scalerTwoWay(0, inMax, 0, 1);
    return {
      abs: s.in,
      rel: s.out
    };
  }
  invalidateContext() {
    this.#ctx = void 0;
  }
  #add(region) {
    this.#regions.push(region);
    return region;
  }
  createFixedAbsolute(canvasCoordsRect) {
    return this.#add(new CanvasRegion(this, () => canvasCoordsRect));
  }
  toAbsPoint(pt, kind = `independent`) {
    let { x, y } = pt;
    switch (kind) {
      case `independent`:
        x *= this.width;
        y *= this.height;
    }
    return { x, y };
  }
  get offset() {
    const b = this.#canvasEl.getBoundingClientRect();
    return { x: b.left, y: b.top };
  }
  toRelPoint(pt, source, kind = `independent`, clamped = true) {
    let { x, y } = pt;
    if (source === `screen`) {
      const b = this.#canvasEl.getBoundingClientRect();
      x -= b.x;
      y -= b.y;
    }
    switch (kind) {
      case `independent`:
        x /= this.width;
        y /= this.height;
        break;
      case `skip`:
        break;
    }
    if (clamped) {
      x = clamp(x);
      y = clamp(y);
    }
    return { x, y };
  }
  toAbsRect(rect2, kind = `independent`) {
    let { width, height } = rect2;
    switch (kind) {
      case `independent`:
        width *= this.width;
        height *= this.height;
        if (rect_exports.isRectPositioned(rect2)) {
          return {
            ...this.toAbsPoint(rect2),
            width,
            height
          };
        }
    }
    return { width, height };
  }
  createRelative(rect2, kind = `independent`) {
    let compute;
    switch (kind) {
      case `independent`:
        compute = (source) => ({
          x: rect2.x * source.width,
          y: rect2.y * source.height,
          width: rect2.width * source.width,
          height: rect2.height * source.height
        });
        break;
    }
    return this.#add(new CanvasRegion(this, compute));
  }
  clear() {
    const c = this.context;
    c.clearRect(0, 0, this.width, this.height);
  }
  get context() {
    if (this.#ctx) return this.#ctx;
    const c = this.#canvasEl.getContext(`2d`);
    if (!c) throw new Error(`Could not create 2d context`);
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.scale(this.#pixelScaling, this.#pixelScaling);
    this.#ctx = c;
    for (const r of this.#regions) {
      r.recomputeRegion();
    }
    return this.#ctx;
  }
  get sizeScaler() {
    return this.#sizeScaler;
  }
  get width() {
    return this.#logicalSize.width;
  }
  get height() {
    return this.#logicalSize.height;
  }
};
var CanvasRegion = class {
  #regionCompute;
  #r;
  /**
   * Creates, using coordinate in canvas coordinates
   */
  constructor(source, regionCompute) {
    this.source = source;
    this.#regionCompute = regionCompute;
    this.#r = regionCompute(source);
  }
  recomputeRegion() {
    this.#r = this.#regionCompute(this.source);
  }
  /**
   * Converts a region-relative point (0..1) to an absolute
   * point, which uses region-relative coordinates.
   * 
   * Eg if the region had an x,y of 100,100, `toAbsRegion({x:0,y:0})`
   * will return 0,0.
   *
   * @param rel 
   * @param scaleBy 
   * @returns 
   */
  toAbsRegion(regionRel, scaleBy = `both`) {
    switch (scaleBy) {
      case `both`:
        return {
          x: regionRel.x * this.#r.width,
          y: regionRel.y * this.#r.height
        };
        break;
    }
  }
  applyRegionOffset(p) {
    return {
      x: p.x + this.#r.x,
      y: p.y + this.#r.y
    };
  }
  drawConnectedPointsRelative(relativePoints, strokeStyle, lineWidth = 1) {
    const points = relativePoints.map((p) => this.toAbsRegion(p));
    this.drawConnectedPoints(points, strokeStyle, lineWidth);
  }
  drawConnectedPoints(points, strokeStyle, lineWidth = 1) {
    const c = this.context;
    c.save();
    c.translate(this.#r.x, this.#r.y);
    c.beginPath();
    c.strokeStyle = strokeStyle;
    c.lineWidth = lineWidth;
    for (let index = 0; index < points.length; index++) {
      if (index === 0) {
        c.moveTo(points[index].x, points[index].y);
      } else {
        c.lineTo(points[index].x, points[index].y);
      }
    }
    c.stroke();
    c.restore();
  }
  /**
   * Fills text at a relative position
   * @param text 
   * @param relPos Relative, meaning 0.5,0.5 is the middle of the region
   * @param fillStyle 
   * @param baseline 
   * @param align 
   */
  fillTextRelative(text, relPos, fillStyle = `black`, font, baseline = `alphabetic`, align = `start`) {
    const point = this.toAbsRegion(relPos);
    this.fillTextRelative(text, point, fillStyle, font, baseline, align);
  }
  /**
   * Fills text at a region-relative position
   * @param text 
   * @param point Region relative, meaning 0,0 is top-left of region
   * @param fillStyle 
   * @param baseline 
   * @param align 
   */
  fillText(text, point, fillStyle = `black`, font, baseline = `alphabetic`, align = `start`) {
    const c = this.context;
    c.save();
    c.translate(this.#r.x, this.#r.y);
    if (font.length > 0) {
      c.font = font;
    }
    c.textBaseline = baseline;
    c.textAlign = align;
    c.fillStyle = fillStyle;
    c.fillText(text, point.x, point.y);
    c.restore();
  }
  drawCircles(relativeCircles, fillStyle, strokeStyle = ``, lineWidth = 1) {
    const circles = relativeCircles.map((c2) => {
      return {
        ...this.toAbsRegion(c2),
        radius: this.source.sizeScaler.abs(c2.radius)
      };
    });
    const c = this.context;
    c.save();
    c.translate(this.#r.x, this.#r.y);
    c.fillStyle = fillStyle;
    c.strokeStyle = strokeStyle;
    c.lineWidth = lineWidth;
    for (const circle2 of circles) {
      c.beginPath();
      c.arc(circle2.x, circle2.y, circle2.radius, 0, piPi);
      c.closePath();
      if (fillStyle.length > 0) {
        c.fill();
      }
      if (strokeStyle.length > 0) {
        c.stroke();
      }
    }
    c.restore();
  }
  clear() {
    const c = this.context;
    c.clearRect(this.#r.x, this.#r.y, this.#r.width, this.#r.height);
  }
  fill(fillStyle = `white`) {
    const c = this.context;
    c.fillStyle = fillStyle;
    c.fillRect(this.#r.x, this.#r.y, this.#r.width, this.#r.height);
  }
  drawBounds(strokeStyle, lineWidth = 1) {
    this.drawConnectedPointsRelative([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 }
    ], strokeStyle, lineWidth);
    this.drawConnectedPointsRelative([
      { x: 0, y: 1 },
      { x: 1, y: 0 }
    ], strokeStyle, lineWidth);
    this.drawConnectedPointsRelative([
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ], strokeStyle, lineWidth);
  }
  /**
   * Converts a  point to a region-relative one.
   * @param pt 
   * @param kind 
   * @returns 
   */
  toRelPoint(pt, source = `screen`, kind = `independent`, clamped = true) {
    pt = this.source.toRelPoint(pt, source, `skip`, false);
    let { x, y } = pt;
    x -= this.x;
    y -= this.y;
    switch (kind) {
      case `independent`:
        x /= this.width;
        y /= this.height;
    }
    if (clamped) {
      x = clamp(x);
      y = clamp(y);
    }
    return { x, y };
  }
  absToRegionPoint(pt, source, clamped) {
    if (source === `screen`) {
      pt = point_exports.subtract(pt, this.source.offset);
    }
    let { x, y } = pt;
    x -= this.x;
    y -= this.y;
    if (clamped) {
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > this.width + this.x) x = this.x + this.width;
      if (y > this.height + this.y) y = this.y + this.height;
    }
    return { x, y };
  }
  get center() {
    return rect_exports.center(this.#r);
  }
  get context() {
    return this.source.context;
  }
  set region(value) {
    this.#r = value;
  }
  get region() {
    return this.#r;
  }
  get width() {
    return this.#r.width;
  }
  get height() {
    return this.#r.height;
  }
  get x() {
    return this.#r.x;
  }
  get y() {
    return this.#r.y;
  }
  get dimensionMin() {
    return Math.min(this.#r.width, this.#r.height);
  }
};

// src/visual/BipolarView.ts
var BipolarView_exports = {};
__export(BipolarView_exports, {
  init: () => init
});
function getNumericAttribute(el, name, defaultValue) {
  const a = el.getAttribute(name);
  if (a === null) return defaultValue;
  return Number.parseInt(a);
}
var init = (elementQuery, options = {}) => {
  const element = document.querySelector(elementQuery);
  if (!element) throw new Error(`Element query could not be found (${elementQuery})`);
  const labels = options.labels ?? [`x`, `y`];
  const labelPrecision = options.labelPrecision ?? 2;
  const asPercentages = options.asPercentages ?? false;
  const displayLastValues = options.displayLastValues ?? 0;
  const showWhiskers = options.showWhiskers ?? true;
  const showDot = options.showDot ?? true;
  const showLabels = options.showLabels ?? true;
  const yAxisBottomNegative = options.yAxisBottomNegative ?? true;
  const axisColour = resolveToString(options.axisColour, `silver`);
  const bgColour = resolveToString(options.bgColour, `white`);
  const whiskerColour = resolveToString(options.whiskerColour, `black`);
  const dotColour = resolveToString(options.dotColour, options.whiskerColour, `black`);
  const labelColour = resolveToString(options.labelColour, options.axisColour, `silver`);
  const axisWidth = options.axisWidth ?? 1 * window.devicePixelRatio;
  const dotRadius = options.dotRadius ?? 5 * window.devicePixelRatio;
  const pad = options.padding ?? 10 * window.devicePixelRatio;
  const whiskerSize = options.whiskerSize ?? 5 * window.devicePixelRatio;
  const width = options.width ?? getNumericAttribute(element, `width`, 200) * window.devicePixelRatio;
  const height = options.height ?? getNumericAttribute(element, `height`, 200) * window.devicePixelRatio;
  let lastValues;
  if (displayLastValues > 0) {
    lastValues = immutable({
      capacity: displayLastValues,
      discardPolicy: `older`
    });
  }
  element.width = width;
  element.height = height;
  element.style.width = `${width / window.devicePixelRatio}px`;
  element.style.height = `${height / window.devicePixelRatio}px`;
  const midY = height / 2;
  const midX = width / 2;
  const ctx = element.getContext(`2d`);
  if (!ctx) throw new Error(`Could not create drawing context`);
  if (window.devicePixelRatio >= 2) {
    ctx.font = `20px sans-serif`;
  }
  const percentageFormat = (v) => `${Math.round(v * 100)}%`;
  const fixedFormat = (v) => v.toFixed(labelPrecision);
  const valueFormat = asPercentages ? percentageFormat : fixedFormat;
  if (showLabels) {
    labels[0] = labels[0] + `:`;
    labels[1] = labels[1] + `:`;
  } else {
    labels[0] = ``;
    labels[1] = ``;
  }
  const renderBackground = options.renderBackground ?? ((ctx2, width2, height2) => {
    if (options.bgColour === `transparent`) {
      ctx2.clearRect(0, 0, width2, height2);
    } else {
      ctx2.fillStyle = bgColour;
      ctx2.fillRect(0, 0, width2, height2);
    }
  });
  return (x, y) => {
    x = clamp2(x);
    y = clamp2(y);
    renderBackground(ctx, width, height);
    ctx.fillStyle = labelColour;
    ctx.textBaseline = `top`;
    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText((labels[1] + ` ` + valueFormat(y)).trim(), -midX + pad, 1);
    ctx.restore();
    ctx.fillText((labels[0] + ` ` + valueFormat(x)).trim(), pad, midX + 2);
    if (!yAxisBottomNegative) y *= -1;
    ctx.strokeStyle = axisColour;
    ctx.lineWidth = axisWidth;
    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.lineTo(width - pad, midY);
    ctx.moveTo(midX, pad);
    ctx.lineTo(midX, height - pad);
    ctx.stroke();
    ctx.closePath();
    const yy = (height - pad - pad) / 2 * -y;
    const xx = (width - pad - pad) / 2 * x;
    const dotPos = { x: xx, y: yy, radius: dotRadius };
    if (lastValues) {
      lastValues = lastValues.enqueue(dotPos);
    }
    ctx.save();
    ctx.translate(midX, midY);
    if (showDot) {
      if (lastValues) {
        const opacityStep = 1 / lastValues.length;
        let opacity = 1;
        lastValues.forEach((d) => {
          const colour = multiplyOpacity(dotColour, opacity);
          circle(ctx, d, { fillStyle: colour });
          opacity -= opacityStep;
        });
      } else {
        circle(ctx, dotPos, { fillStyle: dotColour });
      }
    }
    if (showWhiskers) {
      ctx.strokeStyle = whiskerColour;
      ctx.beginPath();
      ctx.moveTo(0, yy - whiskerSize);
      ctx.lineTo(0, yy + whiskerSize);
      ctx.moveTo(xx - whiskerSize, 0);
      ctx.lineTo(xx + whiskerSize, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  };
};

// src/visual/plot/index.ts
var plot_exports = {};
__export(plot_exports, {
  CartesianCanvasPlot: () => CartesianCanvasPlot,
  DataSet: () => DataSet,
  absoluteCompute: () => absoluteCompute,
  computeAxisMark: () => computeAxisMark,
  computeMinMax: () => computeMinMax,
  insert: () => insert,
  relativeCompute: () => relativeCompute
});

// src/visual/plot/Cartesian.ts
var computeMinMax = (mm) => {
  const x = mm.map((m) => m.x);
  const y = mm.map((m) => m.y);
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);
  const width = maxX - minX;
  const height = maxY - minY;
  return {
    min: { x: minX, y: minY },
    max: { x: maxX, y: maxY },
    width,
    height,
    minDim: Math.min(width, height),
    maxDim: Math.max(width, height)
  };
};
var relativeCompute = (minMax) => {
  if (!Number.isFinite(minMax.height)) {
    return (point) => point;
  }
  const xScale = scaler(minMax.min.x, minMax.max.x);
  const yScale = scaler(minMax.min.y, minMax.max.y);
  return (point) => ({
    x: xScale(point.x),
    y: yScale(point.y)
  });
};
var absoluteCompute = (minMax) => {
  const xScale = scaler(0, 1, minMax.min.x, minMax.max.x);
  const yScale = scaler(0, 1, minMax.min.y, minMax.max.y);
  return (point) => ({
    x: xScale(point.x),
    y: yScale(point.y)
  });
};
var computeAxisMark = (mm, increments, major) => {
  const xValues = [];
  let count = 0;
  for (let x = mm.min.x; x < mm.max.x; x += increments) {
    const isMajor = count % major === 0;
    xValues.push({ x, y: 0, major: isMajor });
    count++;
  }
  count = 0;
  const yValues = [];
  for (let y = mm.min.y; y < mm.max.y; y += increments) {
    const isMajor = count % major === 0;
    yValues.push({ x: 0, y, major: isMajor });
    count++;
  }
  return { x: xValues, y: yValues };
};

// src/visual/plot/DataSet.ts
var DataSet = class {
  #data;
  #meta;
  constructor() {
    this.lastChange = performance.now();
    this.#data = new MapOfSimpleMutable();
    this.#meta = /* @__PURE__ */ new Map();
  }
  get metaCount() {
    return this.#meta.size;
  }
  clear() {
    this.#data.clear();
    this.lastChange = performance.now();
  }
  set(series, data) {
    this.#data.setValues(series, data);
  }
  deleteBySeries(series) {
    const changed = this.#data.delete(series);
    if (changed) {
      this.lastChange = performance.now();
    }
    return changed;
  }
  setMeta(series, meta) {
    this.#meta.set(series, meta);
  }
  hasMeta(series) {
    return this.#meta.has(series);
  }
  getMeta(series) {
    return this.#meta.get(series);
  }
  *getValues() {
    yield* this.#data.valuesFlat();
  }
  *getEntries() {
    yield* this.#data.entries();
  }
  *getSeries() {
    yield* this.#data.values();
  }
  add(value, series = `default`) {
    this.#data.addKeyedValues(series, value);
    this.lastChange = performance.now();
  }
};

// src/dom/DomRx.ts
var DomRx_exports = {};
__export(DomRx_exports, {
  resizeObservable: () => resizeObservable,
  themeChange: () => themeChange,
  windowResize: () => windowResize
});
var windowResize = (elapsed) => Ops.debounce({ elapsed: elapsed ?? 100 })(sources_exports.event(window, `resize`, { innerWidth: 0, innerHeight: 0 }));
var themeChange = () => {
  const m = sources_exports.observable((stream) => {
    const ro = new MutationObserver((entries) => {
      stream.set(entries);
    });
    const opts = {
      attributeFilter: [`class`],
      attributes: true
    };
    ro.observe(document.documentElement, opts);
    return () => {
      ro.disconnect();
    };
  });
  return m;
};
var resizeObservable = (elem, interval) => {
  if (elem === null) {
    throw new Error(`elem parameter is null. Expected element to observe`);
  }
  if (elem === void 0) {
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  }
  const m = sources_exports.observable((stream) => {
    const ro = new ResizeObserver((entries) => {
      stream.set(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
  return Ops.debounce({ elapsed: interval ?? 100 })(m);
};

// src/dom/ElementSizing.ts
var ElementSizer = class _ElementSizer {
  #stretch;
  #size;
  #naturalSize;
  #naturalRatio;
  #viewport;
  #onSetSize;
  #el;
  #containerEl;
  #disposed = false;
  #resizeObservable;
  constructor(elOrQuery, options) {
    this.#el = resolveEl(elOrQuery);
    this.#containerEl = options.containerEl ? resolveEl(options.containerEl) : this.#el.parentElement;
    this.#stretch = options.stretch ?? `none`;
    this.#onSetSize = options.onSetSize;
    this.#size = Empty2;
    let naturalSize = options.naturalSize;
    if (naturalSize === void 0) {
      naturalSize = this.#el.getBoundingClientRect();
    }
    this.#naturalRatio = 1;
    this.#naturalSize = naturalSize;
    this.setNaturalSize(naturalSize);
    this.#viewport = EmptyPositioned;
    if (this.#containerEl === document.body) {
      this.#byViewport();
    } else {
      this.#byContainer();
    }
  }
  dispose(reason) {
    if (this.#disposed) return;
    this.#disposed = true;
    if (this.#resizeObservable) {
      this.#resizeObservable.dispose(`ElementSizing (${reason})`);
      this.#resizeObservable = void 0;
    }
  }
  static canvasParent(canvasElementOrQuery, options) {
    const el = resolveEl(canvasElementOrQuery);
    const er = new _ElementSizer(el, {
      ...options,
      onSetSize(size, el2) {
        el2.width = size.width;
        el2.height = size.height;
        if (options.onSetSize) options.onSetSize(size, el2);
      }
    });
    return er;
  }
  static canvasViewport(canvasElementOrQuery, options) {
    const el = resolveEl(canvasElementOrQuery);
    el.style.position = `absolute`;
    el.style.zIndex = (options.zIndex ?? 0).toString();
    el.style.left = `0px`;
    el.style.top = `0px`;
    const opts = { ...options, containerEl: document.body };
    return this.canvasParent(canvasElementOrQuery, opts);
  }
  static svgViewport(svg) {
    const er = new _ElementSizer(svg, {
      containerEl: document.body,
      stretch: `both`,
      onSetSize(size) {
        svg.setAttribute(`width`, size.width.toString());
        svg.setAttribute(`height`, size.height.toString());
      }
    });
    return er;
  }
  #byContainer() {
    const c = this.#containerEl;
    if (!c) throw new Error(`No container element`);
    const r = resizeObservable(c);
    r.onValue((v) => {
      this.#onParentResize(v);
    });
    const current = this.#getStretchSize(c.getBoundingClientRect());
    this.size = current;
    this.#resizeObservable = r;
  }
  #byViewport() {
    const r = windowResize();
    r.onValue((v) => {
      this.#onViewportResize();
    });
    this.#resizeObservable = r;
    this.#onViewportResize();
  }
  #onViewportResize() {
    this.size = { width: window.innerWidth, height: window.innerHeight };
    this.#viewport = {
      x: 0,
      y: 0,
      ...this.size
    };
  }
  /**
   * Sets the 'natural' size of an element.
   * This can also be specified when creating ElementSizer.
   * @param size 
   */
  setNaturalSize(size) {
    this.#naturalSize = size;
    this.#naturalRatio = size.width / size.height;
  }
  get naturalSize() {
    return this.#naturalSize;
  }
  get viewport() {
    return this.#viewport;
  }
  #getStretchSize(parentSize) {
    let { width, height } = parentSize;
    let stretch = this.#stretch;
    if (stretch === `min`) {
      stretch = width < height ? `width` : `height`;
    } else if (stretch === `max`) {
      stretch = width > height ? `width` : `height`;
    }
    if (stretch === `width`) {
      height = width / this.#naturalRatio;
    } else if (stretch === `height`) {
      width = height * this.#naturalRatio;
    }
    return { width, height };
  }
  #onParentResize(args) {
    const box = args[0].contentBoxSize[0];
    const parentSize = { width: box.inlineSize, height: box.blockSize };
    this.size = this.#getStretchSize(parentSize);
    this.#viewport = {
      x: 0,
      y: 0,
      width: parentSize.width,
      height: parentSize.height
    };
  }
  set size(size) {
    guard2(size, `size`);
    this.#size = size;
    this.#onSetSize(size, this.#el);
  }
  get size() {
    return this.#size;
  }
};

// src/visual/plot/CartesianCanvasPlot.ts
var insert = (insertOptions, options = {}) => {
  const parentEl = insertOptions.fill === `viewport` ? document.body : resolveEl(insertOptions.parent);
  const canvasEl = document.createElement(`canvas`);
  parentEl.prepend(canvasEl);
  const ds = new DataSet();
  const source = new CanvasSource(canvasEl, `min`);
  const rect2 = insertOptions.region ?? { x: 0, y: 0, width: 1, height: 1 };
  const region = source.createRelative(rect2, `independent`);
  const p = new CartesianCanvasPlot(region, ds, options);
  if (insertOptions.fill === `viewport`) {
    ElementSizer.canvasViewport(canvasEl, {
      onSetSize: (size, _el) => {
        source.setLogicalSize(size);
        p.invalidateRange();
        p.draw();
      }
    });
  } else {
    ElementSizer.canvasParent(canvasEl, {
      onSetSize: (size, _el) => {
        source.setLogicalSize(size);
        p.invalidateRange();
        p.draw();
      }
    });
  }
  return p;
};
var CartesianCanvasPlot = class {
  constructor(cr, data, options = {}) {
    this.actualDataRange = EmptyPositioned;
    this.visibleRange = PlaceholderPositioned;
    this.axisRounder = round(1, true);
    /**
     * List of lines to draw after drawing everything else.
     * Lines are given in value-coordinate space
     */
    this.overlayLines = [];
    if (!data) throw new TypeError(`Param 'data' is undefined`);
    if (typeof data !== `object`) throw new TypeError(`Param 'data' is not an object. Got: ${typeof data}`);
    this.onInvalidated = options.onInvalidated;
    this.#data = data;
    this.#canvasRegion = cr;
    this.#lastDataChange = 0;
    this.#visualClear = options.clear ?? `region`;
    this.#rangeMode = options.range ?? `auto`;
    this.#valueStyle = options.valueStyle ?? `dot`;
    this.#connectStyle = options.connectStyle ?? ``;
    this.whiskerLength = options.whiskerLength ?? 5;
    this.#visualPadding = options.visualPadding ?? 20;
    this.show = {
      axes: true,
      axisValues: true,
      grid: true,
      whiskers: true,
      ...options.show
    };
    this.#axisStyle = {
      colour: `black`,
      width: 2,
      ...options.axisStyle
    };
    this.#textStyle = {
      colour: `black`,
      size: `1em`,
      font: `system-ui`,
      ...options.textStyle
    };
    this.#grid = {
      increments: 0.1,
      major: 5,
      colour: `whitesmoke`,
      width: 1,
      ...options.grid
    };
  }
  #data;
  #lastDataChange;
  #canvasRegion;
  #grid;
  #rangeMode;
  #currentRange;
  #axisStyle;
  #valueStyle;
  #connectStyle;
  #rangeManual;
  #textStyle;
  #visualPadding;
  #visualClear;
  getCurrentRange() {
    if (this.#data.lastChange === this.#lastDataChange && this.#currentRange) return this.#currentRange;
    this.#lastDataChange = this.#data.lastChange;
    const r = this.#createRange();
    this.#currentRange = r;
    if (this.onInvalidated) this.onInvalidated();
    return r;
  }
  invalidateRange() {
    this.#currentRange = void 0;
  }
  #createRange() {
    const range = this.getDataRange();
    const absDataToRelative = relativeCompute(range);
    const relDataToAbs = absoluteCompute(range);
    const cr = this.#canvasRegion;
    const padding = this.#visualPadding;
    let xOffset = cr.x + padding;
    let yOffset = cr.y + padding;
    const allowedHeight = cr.height - padding * 2;
    const allowedWidth = cr.width - padding * 2;
    const dimensionMin = Math.min(allowedHeight, allowedWidth);
    ;
    if (allowedWidth >= allowedHeight) {
      xOffset += allowedWidth / 2 - dimensionMin / 2;
    } else {
      yOffset += allowedHeight / 2 - dimensionMin / 2;
    }
    const relDataToCanvas = (pt) => {
      let { x, y } = pt;
      if (x === Number.NEGATIVE_INFINITY) x = 0;
      else if (x === Number.POSITIVE_INFINITY) x = 1;
      if (y === Number.NEGATIVE_INFINITY) y = 0;
      else if (y === Number.POSITIVE_INFINITY) y = 1;
      x = x * dimensionMin;
      y = (1 - y) * dimensionMin;
      x += xOffset;
      y += yOffset;
      return { x, y };
    };
    const canvasToRelData = (pt) => {
      let { x, y } = pt;
      x -= xOffset;
      y -= yOffset;
      x = x / dimensionMin;
      y = 1 - y / dimensionMin;
      return { x, y };
    };
    const regionSpaceToRelative = (pt) => {
      let { x, y } = pt;
      x = x - cr.x + this.#visualPadding;
      y = dimensionMin + this.#visualPadding - y;
      x /= dimensionMin;
      y = y / dimensionMin;
      return { x, y };
    };
    return {
      absDataToRelative,
      relDataToCanvas,
      canvasToRelData,
      regionSpaceToRelative,
      relDataToAbs,
      range
    };
  }
  /**
   * Positions an element at the viewport location of `data` point.
   * Ensure the element has `position:absolute` set.
   * @param data 
   * @param elementToPosition 
   * @param by 
   */
  positionElementAt(data, elementToPosition, by = `middle`, relativeToQuery) {
    const el = resolveEl(elementToPosition);
    let { x, y } = this.valueToScreenSpace(data);
    if (by === `middle`) {
      const bounds = el.getBoundingClientRect();
      x -= bounds.width / 2;
      y -= bounds.height / 2;
    } else if (by === `top-left`) {
    } else throw new Error(`Param 'by' expected to be 'middle' or 'top-left'.`);
    if (relativeToQuery) {
      const relativeTo = resolveEl(relativeToQuery);
      const bounds = relativeTo.getBoundingClientRect();
      x -= bounds.x;
      y -= bounds.y;
    }
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }
  /**
   * When range is auto, returns the range of the data
   * Otherwise returns the user-provided range.
   * @returns 
   */
  getDataRange() {
    if (this.#rangeMode === `auto`) {
      return computeMinMax([...this.#data.getValues()]);
    } else {
      if (!this.#rangeManual) {
        this.#rangeManual = computeMinMax([this.#rangeMode.max, this.#rangeMode.min]);
      }
      return this.#rangeManual;
    }
  }
  valueToScreenSpace(dataPoint) {
    const region = this.valueToRegionSpace(dataPoint);
    const offset = this.canvasSource.offset;
    const scr = {
      x: region.x + offset.x,
      y: region.y + offset.y
    };
    return scr;
  }
  valueToRegionSpace(dataValue, debug = false) {
    const ds = this.getCurrentRange();
    const rel = ds.absDataToRelative(dataValue);
    const region = ds.relDataToCanvas(rel);
    if (debug) console.log(`orig: ${dataValue.x}x${dataValue.y} rel: ${rel.x}x${rel.y} region: ${region.x}x${region.y}`);
    return {
      ...dataValue,
      x: region.x,
      y: region.y
    };
  }
  // #regionSpaceToValue(scr: Point, clamped: boolean) {
  //   const ds = this.getCurrentRange();
  //   const rel = ds.regionSpaceToRelative(scr);
  //   //console.log(`regionSpaceToRelative ${ rel.x.toFixed(2) },${ rel.y.toFixed(2) }`);
  //   const value = ds.relDataToAbs(rel);
  //   //if (debug) console.log(`orig: ${ a.x }x${ a.y } rel: ${ rel.x }x${ rel.y } scr: ${ scr.x }x${ scr.y }`);
  //   const pt = {
  //     ...scr,
  //     x: value.x,
  //     y: value.y
  //   }
  //   if (clamped) return clamp(pt);
  //   return pt;
  // }
  /**
   * Converts a point in pixel coordinates to a value.
   * Useful for converting from user input coordinates.
   * @param point 
   * @returns 
   */
  pointToValue(point, _source) {
    const ds = this.getCurrentRange();
    const canvasPoint = point_exports.subtract(point, this.canvasSource.offset);
    const v = ds.canvasToRelData(canvasPoint);
    return ds.relDataToAbs(v);
  }
  // valueToScreen(a: Point) {
  //   const ds = this.getCurrentRange();
  //   const rel = ds.valueToRelative(a);
  //   const scr = ds.relativeToElementSpace(rel);
  //   const bounds = this.helper.el.getBoundingClientRect();
  //   return {
  //     x: scr.x + bounds.x,
  //     y: scr.y + bounds.y
  //   }
  // }
  // valueRectToScreen(a: Point, b: Point): RectPositioned {
  //   a = this.valueToScreen(a);
  //   b = this.valueToScreen(b);
  //   return {
  //     x: a.x,
  //     y: b.y,
  //     width: b.x - a.x,
  //     height: a.y - b.y
  //   }
  // }
  /**
   * Compute canvas-relative coordinates based on two points in value space
   * @param valueA 
   * @param valueB 
   */
  #valueLineToCanvasSpace(valueA, valueB, debug = false) {
    valueA = this.valueToRegionSpace(valueA, debug);
    valueB = this.valueToRegionSpace(valueB, debug);
    return { a: valueA, b: valueB };
  }
  getDefaultMeta() {
    return {
      colour: Colour_exports.goldenAngleColour(this.#data.metaCount),
      lineWidth: 2,
      dotRadius: 5
    };
  }
  draw() {
    if (this.#visualClear === `region`) {
      this.#canvasRegion.clear();
    } else {
      this.canvasSource.clear();
    }
    this.#useGrid();
    if (this.show.axes) this.#drawAxes();
    for (const [k, v] of this.#data.getEntries()) {
      let meta = this.#data.getMeta(k);
      if (!meta) {
        meta = this.getDefaultMeta();
        this.#data.setMeta(k, meta);
      }
      this.#drawSeries(k, v, meta);
    }
    for (const line2 of this.overlayLines) {
      this.drawLine(line2, line2.colour, line2.width);
    }
  }
  /**
   * Draws a line in value-coordinate space
   * @param line 
   * @param colour 
   * @param width 
   */
  drawLine(line2, colour, width) {
    const l = this.#valueLineToCanvasSpace(line2.a, line2.b);
    this.#drawLineCanvasSpace(l, colour, width);
  }
  setMeta(series, meta) {
    this.#data.setMeta(series, {
      ...this.getDefaultMeta(),
      ...meta
    });
  }
  #drawAxes() {
    const { colour, width } = this.#axisStyle;
    const yAxis = this.#valueLineToCanvasSpace({ x: 0, y: Number.NEGATIVE_INFINITY }, { x: 0, y: Number.POSITIVE_INFINITY }, false);
    const xAxis = this.#valueLineToCanvasSpace({ x: Number.NEGATIVE_INFINITY, y: 0 }, { x: Number.POSITIVE_INFINITY, y: 0 }, false);
    this.#drawLineCanvasSpace(xAxis, colour, width, false);
    this.#drawLineCanvasSpace(yAxis, colour, width, false);
  }
  #drawYAxisValues(yPoints) {
    const ctx = this.#canvasRegion.context;
    ctx.font = this.#textStyle.size + ` ` + this.#textStyle.font;
    ctx.fillStyle = this.#textStyle.colour;
    ctx.textBaseline = `middle`;
    for (const p of yPoints) {
      if (p.x === 0 && p.y === 0) continue;
      const reg = this.valueToRegionSpace(p, false);
      const value = this.axisRounder(p.y);
      const label = value.toString();
      const measure = ctx.measureText(label);
      const x = reg.x - measure.width - this.whiskerLength / 2 - 5;
      const y = reg.y;
      ctx.fillText(label, x, y);
    }
  }
  #drawXAxisValues(xPoints) {
    const ctx = this.#canvasRegion.context;
    ctx.font = this.#textStyle.size + ` ` + this.#textStyle.font;
    ctx.fillStyle = this.#textStyle.colour;
    ctx.textBaseline = `top`;
    for (const p of xPoints) {
      const reg = this.valueToRegionSpace(p, false);
      const value = this.axisRounder(p.x);
      const label = value.toString();
      const measure = ctx.measureText(label);
      const x = reg.x - measure.width / 2;
      const y = reg.y + measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + this.whiskerLength / 2;
      ctx.fillText(label, x, y);
    }
  }
  #drawWhisker(p, vertical) {
    const whiskerHalfLength = this.whiskerLength / 2;
    const v = vertical ? { x: p.x, y: 0 } : { y: p.y, x: 0 };
    const reg = this.valueToRegionSpace(v, false);
    const line2 = vertical ? {
      a: { x: reg.x, y: reg.y - whiskerHalfLength },
      b: { x: reg.x, y: reg.y + whiskerHalfLength }
    } : {
      a: { y: reg.y, x: reg.x - whiskerHalfLength },
      b: { y: reg.y, x: reg.x + whiskerHalfLength }
    };
    this.#drawLineCanvasSpace(line2, this.#axisStyle.colour, this.#axisStyle.width, false);
  }
  #drawGridline(p, vertical) {
    const line2 = vertical ? this.#valueLineToCanvasSpace({ x: p.x, y: Number.NEGATIVE_INFINITY }, { x: p.x, y: Number.POSITIVE_INFINITY }) : this.#valueLineToCanvasSpace({ y: p.y, x: Number.NEGATIVE_INFINITY }, { y: p.y, x: Number.POSITIVE_INFINITY }, false);
    this.#drawLineCanvasSpace(line2, this.#grid.colour, p.major ? this.#grid.width * 2 : this.#grid.width);
  }
  #useGrid() {
    const g = this.#grid;
    const showGrid = this.show.grid;
    const showWhiskers = this.show.whiskers;
    const showValues = this.show.axisValues;
    const mm = this.getCurrentRange().range;
    const { increments, major } = g;
    const axisMarks = computeAxisMark(mm, increments, major);
    for (const p of axisMarks.x) {
      if (showGrid) this.#drawGridline(p, true);
      if (showWhiskers && p.major) this.#drawWhisker(p, true);
    }
    for (const p of axisMarks.y) {
      if (showGrid) this.#drawGridline(p, false);
      if (showWhiskers && p.major) this.#drawWhisker(p, false);
    }
    if (showValues) {
      this.#drawXAxisValues(axisMarks.x.filter((p) => p.major));
      this.#drawYAxisValues(axisMarks.y.filter((p) => p.major));
    }
  }
  #drawSeries(name, series, meta) {
    if (this.#connectStyle === `line`) {
      this.#drawConnected(series, meta.colour, meta.lineWidth);
    }
    if (this.#valueStyle === `dot`) {
      for (const v of series) {
        this.#drawDot(v, meta.colour, meta.dotRadius);
      }
    }
  }
  #drawConnected(dots, colour, width) {
    const ctx = this.#canvasRegion.context;
    ctx.beginPath();
    for (const [index, dot_] of dots.entries()) {
      const dot2 = this.valueToRegionSpace(dot_, false);
      if (index === 0) ctx.moveTo(dot2.x, dot2.y);
      ctx.lineTo(dot2.x, dot2.y);
    }
    ctx.strokeStyle = Colour_exports.resolveToString(colour);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
  }
  #drawDot(originalDot, fallbackColour, fallbackRadius) {
    const colour = Colour_exports.resolveToString(originalDot.fillStyle ?? fallbackColour);
    const pos = this.valueToRegionSpace(originalDot);
    const radius = originalDot.radius ?? fallbackRadius;
    this.#canvasRegion.drawCircles([
      { ...pos, radius }
    ], colour);
  }
  #drawLineCanvasSpace(line2, colour, width, debug = false) {
    if (debug) console.log(line2);
    const ctx = this.#canvasRegion.context;
    colour = Colour_exports.resolveToString(colour);
    ctx.beginPath();
    ctx.moveTo(line2.a.x, line2.a.y);
    ctx.lineTo(line2.b.x, line2.b.y);
    ctx.strokeStyle = Colour_exports.resolveToString(colour);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
  }
  get dataSet() {
    return this.#data;
  }
  get canvasRegion() {
    return this.#canvasRegion;
  }
  get canvasSource() {
    return this.#canvasRegion.source;
  }
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Visuals: {
        SceneGraph: SceneGraph_exports,
        Drawing: Drawing_exports,
        Svg: Svg_exports,
        Palette: Palette_exports,
        Colour: Colour_exports,
        Video: Video_exports
      }
    };
  }
} catch {
}

export {
  makeHelper,
  Drawing_exports,
  Palette_exports,
  SceneGraph_exports,
  CanvasSource,
  CanvasRegion,
  BipolarView_exports,
  DomRx_exports,
  ElementSizer,
  insert,
  CartesianCanvasPlot,
  plot_exports,
  visual_exports
};
//# sourceMappingURL=chunk-EGV5SJVP.js.map