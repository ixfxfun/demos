import {
  Svg_exports
} from "./chunk-JKLCXLZ5.js";
import {
  Video_exports
} from "./chunk-65WH6KYI.js";
import {
  clamp as clamp2,
  flip
} from "./chunk-GNXMKKD5.js";
import {
  Empty2,
  EmptyPositioned,
  ImageDataGrid_exports,
  Placeholder,
  PlaceholderPositioned,
  corners,
  corners2,
  isEqualSize,
  multiplyScalar,
  scaler as scaler2,
  subtract as subtract2
} from "./chunk-M43OQIGJ.js";
import {
  StackImmutable
} from "./chunk-EQQ747SO.js";
import {
  ofArrayMutable,
  ofCircularMutable
} from "./chunk-NAPITDOI.js";
import {
  immutable
} from "./chunk-SHF5276B.js";
import {
  Empty,
  Ops,
  distanceToExterior,
  getField,
  getPaths,
  guard2,
  intersectsPoint,
  isCubicBezier,
  isEqual,
  isLine,
  isPlaceholder,
  isQuadraticBezier,
  point_exports,
  quantiseEvery,
  sources_exports,
  subtract
} from "./chunk-TIIF2VKF.js";
import {
  Colour_exports,
  getCssVariable,
  guard,
  multiplyOpacity,
  randomHue,
  resolveToString,
  scale,
  scaler
} from "./chunk-MXBHIKA7.js";
import {
  minIndex
} from "./chunk-NGZXMICH.js";
import {
  clamp
} from "./chunk-I2PHDNRW.js";
import {
  MapOfSimpleMutable,
  SimpleEventEmitter
} from "./chunk-XGQNP3YG.js";
import {
  resolveEl
} from "./chunk-ZNCB3DZ2.js";
import {
  minMaxAvg,
  throwResult,
  withoutUndefined
} from "./chunk-BDIBLBFS.js";
import {
  throwArrayTest
} from "./chunk-27HWJFP3.js";
import {
  round
} from "./chunk-OTGZJTOP.js";
import {
  ifNaN,
  throwNumberTest
} from "./chunk-BLACMGG6.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  BipolarView: () => BipolarView_exports,
  CartesianCanvasPlot: () => CartesianCanvasPlot,
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  ImageDataGrid: () => ImageDataGrid_exports,
  Palette: () => Palette_exports,
  Plot: () => plot_exports,
  Plot2: () => Plot2_exports,
  PlotOld: () => PlotOld_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports,
  scaleCanvas: () => scaleCanvas
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
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
  for (const arc2 of arcsArray) {
    draw2(arc2);
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
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  if (Array.isArray(circlesToDraw)) {
    for (const c of circlesToDraw) draw2(c);
  } else {
    draw2(circlesToDraw);
  }
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (ellipse2) => {
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
    draw2(ellipse2);
  }
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path) => {
    if (isQuadraticBezier(path)) quadraticBezier(ctx, path, opts);
    else if (isLine(path)) line(ctx, path, opts);
    else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw)) {
    for (const p of pathsToDraw) draw2(p);
  } else {
    draw2(pathsToDraw);
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
  let stroke = opts.stroke ? opts.stroke : opts.strokeStyle !== void 0;
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
  const draw2 = (d) => {
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
    for (const t of toDraw) draw2(t);
  } else {
    draw2(toDraw);
  }
};
var triangle = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t) => {
    connectedPoints(ctx, corners2(t), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
  const stroke = opts.stroke ?? (opts.strokeStyle === void 0 ? false : true);
  const draw2 = (d) => {
    const x = `x` in d ? d.x : 0;
    const y = `y` in d ? d.y : 0;
    if (filled) ctx.fillRect(x, y, d.width, d.height);
    if (stroke) {
      if (opts.strokeWidth) ctx.lineWidth = opts.strokeWidth;
      ctx.strokeRect(x, y, d.width, d.height);
    }
    if (opts.crossed) {
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
      draw2(t);
    }
  } else {
    draw2(toDraw);
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
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
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

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  AxisX: () => AxisX,
  AxisY: () => AxisY,
  Legend: () => Legend,
  Plot: () => Plot,
  PlotArea: () => PlotArea,
  Series: () => Series
});

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

// src/visual/ScaleCanvas.ts
var scaleCanvas = (domQueryOrElement) => {
  const canvasElement = resolveEl(domQueryOrElement);
  const ratio = window.devicePixelRatio;
  canvasElement.style.width = canvasElement.width + `px`;
  canvasElement.style.height = canvasElement.height + `px`;
  canvasElement.width *= devicePixelRatio;
  canvasElement.height *= devicePixelRatio;
  const getContext2 = () => {
    const ctx = canvasElement.getContext(`2d`);
    if (ctx === null) throw new Error(`Could not get drawing context`);
    ctx.save();
    ctx.scale(ratio, ratio);
    return ctx;
  };
  return { ctx: getContext2(), element: canvasElement, bounds: canvasElement.getBoundingClientRect() };
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

// src/dom/CanvasSizing.ts
var parentSizeCanvas = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el.nodeName}`
    );
  }
  const parent = el.parentElement;
  if (parent === null) throw new Error(`Element has no parent`);
  const ctx = el.getContext(`2d`);
  if (ctx === null) throw new Error(`Could not create drawing context`);
  el.style.width = `100%`;
  el.style.height = `100%`;
  const ro = resizeObservable(parent, timeoutMs).onValue(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0) return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el.setAttribute(`width`, el.offsetWidth + `px`);
      el.setAttribute(`height`, el.offsetHeight + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ ctx, el, bounds });
      }
    }
  );
  return ro;
};
var fullSizeCanvas = (domQueryOrEl, onResized, skipCss = false) => {
  if (domQueryOrEl === null || domQueryOrEl === void 0) {
    throw new Error(`domQueryOrEl is null or undefined`);
  }
  const el = resolveEl(domQueryOrEl);
  if (el.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el.nodeName}`
    );
  }
  const ctx = el.getContext(`2d`);
  if (ctx === null) throw new Error(`Could not create drawing context`);
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el.width = width;
    el.height = height;
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: { x: width / 2, y: height / 2 }
      };
      onResized({ ctx, el, bounds });
    }
  };
  if (!skipCss) {
    el.style.top = `0`;
    el.style.left = `0`;
    el.style.zIndex = `-100`;
    el.style.position = `fixed`;
  }
  const r = windowResize();
  r.onValue(update);
  update();
  return r;
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  constructor(series) {
    this.dirty = false;
    this.type = `array`;
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
    this._range = void 0;
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0) return this._range;
    this.dirty = false;
    const updatedRange = minMaxAvg(this.data);
    if (this._range === void 0 || updatedRange.max !== this._range.max || updatedRange.min !== this._range.min) {
      this._range = updatedRange;
      return { ...this._range, changed: true };
    } else {
      return { ...this._range, changed: false };
    }
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  constructor() {
    super(...arguments);
    this.desiredDataPointMinWidth = 5;
  }
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    this.width = 3;
    // How many pixels wide per data point on last draw
    this.lastPxPerPt = -1;
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this.axisRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRange = { ...this.axisRange };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    this.formattedPrecision = opts.formattedPrecision ?? -1;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else throw new Error(`Unknown sourceType. Expected array|stream`);
  }
  formatValue(v) {
    if (this.formattedPrecision < 0) {
      if (Math.abs(v) < 100) return v.toFixed(2);
      return Math.floor(v).toString();
    } else {
      return v.toFixed(this.formattedPrecision);
    }
  }
  get visualFormatted() {
    const d = this.visualDataRange;
    const min = this.formatValue(d.min);
    const max = this.formatValue(d.max);
    const longest = min.length > max.length ? min : max;
    return { min, max, longest };
  }
  get visualDataRange() {
    let vr = this._visualRange;
    const sourceRange = this.source.range;
    let changed = false;
    if (sourceRange.changed) {
      if (this._visualRangeStretch) {
        const rmin = Math.min(ifNaN(vr.min, sourceRange.min), sourceRange.min);
        const rmax = Math.max(ifNaN(vr.max, sourceRange.max), sourceRange.max);
        if (rmin !== vr.min || rmax !== vr.max) {
          vr = { min: rmin, max: rmax };
          changed = true;
        }
      } else {
        if (!isRangeEqual(sourceRange, vr)) {
          vr = sourceRange;
          changed = true;
        }
      }
    }
    this._visualRange = vr;
    return { ...vr, changed };
  }
  scaleValue(value) {
    if (this.source === void 0) return value;
    const r = this.visualDataRange;
    if (r.changed) {
      this.plot.notify(`range-change`, this.plot.plotArea);
    }
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    throwNumberTest(value, ``, `value`);
    this.source.add(value);
    this.plot.plotArea.drawingInvalidated(`Series.add`);
  }
  /**
   * Clears the underlying source
   * and sets a flag that the plot area needs redrawing
   */
  clear() {
    this.source.clear();
    this._visualRange = { ...this.axisRange };
    this.plot.plotArea.layoutInvalidated(`Series.clear`);
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `PlotArea`, region);
    this.plot = plot2;
    this.paddingPx = 0;
    this.piPi = Math.PI * 2;
    // If pointer is more than this distance away from a data point, it's ignored
    this.pointerDistanceThreshold = 20;
    this.lastRangeChange = 0;
  }
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, _parent) {
    const axisY = opts.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const legend = opts.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const axisX = opts.getActualSize(`AxisX`);
    const axisXHeight = axisX?.height ?? 0;
    if (!axisY) return `No AxisY. Measured: ${opts.whatIsMeasured().join(`, `)}`;
    if (!legend) return `No Legend`;
    if (!axisX) return `No AxisX`;
    return {
      width: opts.bounds.width - axisY.width - this.paddingPx,
      height: opts.bounds.height - legendHeight - axisXHeight - padding
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const axisYWidth = axisY?.width ?? 0;
    return {
      x: axisYWidth,
      y: padding
      // layoutState.bounds.height - height - axisXHeight - legendHeight
    };
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY)
      this.layoutInvalidated(`PlotArea.onNotify measureApplied to axisY`);
    if (message === `laidout` && source === this.plot.legend)
      this.layoutInvalidated(`PlotArea.onNotify laidout to legend`);
  }
  // protected onClick(p: Point): void {
  //   this.plot.frozen = !this.plot.frozen;
  // }
  onPointerLeave() {
    for (const series of this.plot.series.values()) {
      series.tooltip = void 0;
    }
    this.pointer = void 0;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerLeave`);
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerMove`);
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0) return;
    for (const series of this.plot.series.values()) {
      if (p === void 0) {
        series.tooltip = void 0;
        return;
      }
      if (series.dataHitPoint === void 0) return;
      const v = series.dataHitPoint(p);
      if (v[0] === void 0) return;
      if (v[1] > this.pointerDistanceThreshold) return;
      series.tooltip = series.formatValue(v[0].value);
    }
    this.plot.legend.drawingInvalidated(`PlotArea.updateTooltip`);
  }
  drawSelf(ctx) {
    if (this.plot.frozen) return;
    const seriesCopy = this.plot.seriesArray();
    ctx.clearRect(0, -1, this.canvasRegion.width, this.canvasRegion.height + 5);
    for (const series of seriesCopy) {
      if (series.source.type === `array` || series.source.type === `stream`) {
        const arraySeries = series.source;
        if (arraySeries.data === void 0) return;
        const d = [...arraySeries.data];
        this.drawDataSet(series, d, ctx);
      } else console.warn(`Unknown data source type ${series.source.type}`);
    }
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.canvasRegion.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = subtract2(this.canvasRegion, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => distanceToExterior(pt, v2));
      const index = minIndex(...distances);
      const closest = shapes[index];
      if (closest === void 0) [void 0, 0];
      return [closest, distances[index]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let index = 0; index < d.length; index++) {
        const scaled = clamp(series.scaleValue(d[index]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index, value: d[index] });
        if (index == 0) ctx.moveTo(x + pxPerPt / 2, y);
        else ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.canvasRegion.height)
          console.warn(`${y} h: ${this.canvasRegion.height}`);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index, value: d[index] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index,
          value: d[index]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `Legend`, region);
    this.plot = plot2;
    this.sampleSize = { width: 10, height: 10 };
    this.padding = 3;
    this.widthSnapping = 20;
    this.labelMeasurements = /* @__PURE__ */ new Map();
  }
  clear() {
  }
  layoutSelf(measureState, layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const axisYWidth = axisY?.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: axisYWidth,
      y: layoutState.bounds.height - height
    };
  }
  measureSelf(opts, _parent) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    const ctx = opts.ctx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    let rowX = padding;
    let y = padding;
    const availableWidth = opts.bounds.width - yAxisWidth - padding;
    let rowHeight = 0;
    ctx.textBaseline = `middle`;
    for (const s of series) {
      let labelWidth = sample.width + padding;
      const text = textRect(ctx, s.name, padding, widthSnapping);
      labelWidth += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        labelWidth += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      rowHeight = Math.min(sample.height + padding + padding, text.height + padding + padding);
      labelWidth += padding;
      if (rowX + labelWidth > availableWidth) {
        rowX = padding;
        y += rowHeight;
      }
      const r = { width: 10, height: 10, x: rowX, y };
      rowX = rowX + labelWidth;
      this.labelMeasurements.set(s.name, r);
    }
    return {
      width: availableWidth,
      height: y + rowHeight
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    this.debugLog(`drawSelf`);
    ctx.clearRect(0, 0, this.canvasRegion.width, this.canvasRegion.height);
    for (const s of series) {
      const r = this.labelMeasurements.get(s.name);
      if (r === void 0) continue;
      let x = r.x;
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, r.y, sample.width, sample.height);
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillStyle = this.plot.legendTextColour;
      ctx.fillText(s.name, x, r.y + sample.height / 2);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.legendTextColour;
        ctx.fillText(s.tooltip, r.x, r.y + sample.height / 2);
      }
    }
  }
  onNotify(message, source) {
    this.debugLog(`onNotify ${message} source: ${source.id}`);
    if (message === `measureApplied` && source === this._parent.axisY) {
      this.layoutInvalidated(`Legend.onNotify measureApplied to axisY`);
    } else if (message == `range-change`) {
    }
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisX`, region);
    this.plot = plot2;
    this.paddingPx = 2;
  }
  clear() {
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY) {
      this.layoutInvalidated(`AxisX.onNotify measureApplied to axisY`);
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.canvasRegion;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(0, strokeWidth / 2);
    ctx.lineTo(v.width, strokeWidth / 2);
    ctx.stroke();
  }
  measureSelf(opts, _parent) {
    const plot2 = this.plot;
    const padding = this.paddingPx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const heightOfText = 0;
    const h = plot2.axisStrokeWidth + heightOfText + padding + padding;
    return {
      width: opts.bounds.width - yAxisWidth - padding,
      height: h
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const yAxis = measureState.measurements.get(`AxisY`);
    const legend = measureState.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: yAxisWidth,
      y: measureState.bounds.height - height - legendHeight
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisY`, region);
    this.plot = plot2;
    // Total character width of label
    this._minCharLength = 3;
    //seriesToShow: string | undefined;
    this.paddingPx = 3;
    this.lastPlotAreaHeight = 0;
    this.lastRange = { min: 0, max: 0 };
    this.showDataLabels = true;
  }
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
    this.debugLog(`measurePreflight`);
  }
  onNotify(message, source) {
    const pa = this.plot.plotArea;
    if (message === `range-change`) {
      this.drawingInvalidated(`range-change`);
      return;
    }
    if (message === `measureApplied` && source === pa && pa.canvasRegion.height !== this.lastPlotAreaHeight) {
      this.lastPlotAreaHeight = pa.canvasRegion.height;
      this.drawingInvalidated(`AxisY.onNotify height change`);
    }
  }
  measureSelf(copts) {
    this.debugLog(`measureSelf. needsLayout: ${this._needsLayoutX} needsDrawing: ${this._needsDrawing}`);
    if (copts.ctx === void 0) throw new Error(`opts.ctx is undefined`);
    switch (this.plot.scaling) {
      case `normalise`:
        return this.#measureNormalise(copts);
      default:
        return this.#measureIndependent(copts);
    }
  }
  #measureIndependent(copts) {
    const paddingPx = this.paddingPx;
    let width = this.plot.axisStrokeWidth + paddingPx;
    if (this.showDataLabels) {
      for (const s of this.plot.seriesArray()) {
        const r = s.visualFormatted;
        let chars = Math.max(r.longest.length, this._minCharLength);
        width += textWidth(copts.ctx, `9`.repeat(chars + 1), paddingPx);
      }
    }
    return {
      width,
      height: copts.bounds.height
    };
  }
  /**
   * Single data display
   * @param copts 
   * @returns 
   */
  #measureNormalise(copts) {
    const paddingPx = this.paddingPx;
    let width = this.plot.axisStrokeWidth + paddingPx;
    if (this.showDataLabels) {
      width += textWidth(copts.ctx, `100%`, paddingPx * 2);
    }
    const w = copts.resolveToPx(this.desiredRegion?.width, width, width);
    return {
      width: w,
      height: copts.bounds.height
    };
  }
  layoutSelf(_measureState, _layoutState, _parent) {
    return { x: 0, y: 0 };
  }
  drawSelf(ctx) {
    switch (this.plot.scaling) {
      case `normalise`:
        this.#drawNormalised(ctx);
        break;
      default:
        this.#drawIndependent(ctx);
    }
  }
  // getSeries(): Series | undefined {
  //   return this.seriesToShow === undefined ?
  //     // Pick first series
  //     this.plot.seriesArray()[ 0 ] :
  //     // Try designated series name
  //     this.plot.series.get(this.seriesToShow);
  // }
  /**
  * Draw all the axis on a common scale
  * @param ctx 
  */
  #drawNormalised(ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.canvasRegion;
    const paddingPx = this.paddingPx;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    const lineX = v.width - strokeWidth / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
    ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx);
    ctx.stroke();
    ctx.fillStyle = plot2.axisTextColour;
    ctx.textBaseline = `top`;
    const labelWidth = this.canvasRegion.width - strokeWidth - paddingPx;
    let m = ctx.measureText(`0%`);
    ctx.fillText(`0%`, labelWidth - m.width, plotArea.canvasRegion.height - paddingPx);
    m = ctx.measureText(`100%`);
    ctx.fillText(`100%`, labelWidth - m.width, plotArea.canvasRegion.y);
  }
  #drawIndependent(ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.canvasRegion;
    const paddingPx = this.paddingPx;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    const lineX = v.width - strokeWidth / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
    ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx);
    ctx.stroke();
    const swatchSize = 10;
    let xOffset = paddingPx;
    const middleY = (plotArea.canvasRegion.height - paddingPx) / 2;
    for (const s of this.plot.seriesArray()) {
      ctx.textBaseline = `top`;
      const r = s.visualFormatted;
      let actualWidth = 0;
      let xPre = xOffset;
      if (isRangeSinglePoint(s.visualDataRange)) {
        ctx.fillStyle = plot2.axisTextColour;
        let m = ctx.measureText(r.max);
        ctx.fillText(r.max, xOffset, middleY + swatchSize);
        actualWidth = m.width;
        xOffset += m.width + paddingPx;
      } else {
        ctx.fillStyle = plot2.axisTextColour;
        let m1 = ctx.measureText(r.min);
        ctx.fillText(r.min, xOffset, plotArea.canvasRegion.height - paddingPx);
        let m2 = ctx.measureText(r.max);
        ctx.fillText(r.max, xOffset, plotArea.canvasRegion.y);
        actualWidth = Math.max(m1.width, m2.width);
        xOffset += actualWidth + paddingPx;
      }
      ctx.fillStyle = s.colour;
      ctx.fillRect(xPre + (actualWidth / 2 - swatchSize / 2), middleY - swatchSize / 2, swatchSize, swatchSize);
    }
  }
  // seriesAxis(series: Series, ctx: CanvasRenderingContext2D) {
  //   const plot = this.plot;
  //   const plotArea = plot.plotArea;
  //   const v = this.canvasRegion;
  //   const paddingPx = this.paddingPx;
  //   const r = series.visualRange;
  //   const strokeWidth = plot.axisStrokeWidth;
  //   const colour = this.colour ?? plot.axisStrokeColour;
  //   ctx.strokeStyle = colour;
  //   ctx.fillStyle = colour;
  //   if (Number.isNaN(r.min) && Number.isNaN(r.max)) return; // Empty
  //   this.lastRange = r;
  //   ctx.clearRect(0, 0, v.width, v.height);
  //   // ctx.fillStyle = `yellow`;
  //   // ctx.fillRect(0, 0, this.canvasRegion.width, this.canvasRegion.height);
  //   ctx.beginPath();
  //   ctx.lineWidth = strokeWidth;
  //   const lineX = v.width - strokeWidth / 2;
  //   ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
  //   ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx);// + strokeWidth + strokeWidth);
  //   ctx.stroke();
  //   ctx.textBaseline = `top`;
  //   const fromRight = v.width - paddingPx * 4;
  //   ctx.fillStyle = plot.axisTextColour;
  //   if (isRangeSinglePoint(r)) {
  //     this.debugLog(`rangeSinglePoint`);
  //     drawText(ctx, series.formatValue(r.max), (size) => [
  //       fromRight - size.width,
  //       plotArea.computeY(series, r.max) - paddingPx * 4,
  //     ]);
  //   } else {
  //     // Draw min/max data labels
  //     drawText(ctx, series.formatValue(r.max), (size) => [
  //       fromRight - size.width,
  //       plotArea.computeY(series, r.max) + strokeWidth / 2,
  //     ]);
  //     drawText(ctx, series.formatValue(r.min), (size) => [
  //       fromRight - size.width,
  //       plotArea.computeY(series, r.min) - 5,
  //     ]);
  //   }
  // }
};
var Plot = class extends CanvasBox {
  constructor(canvasElementOrQuery, opts = {}) {
    const { ctx, element, bounds } = scaleCanvas(canvasElementOrQuery);
    super(void 0, `Plot`);
    this._frozen = false;
    this._canvasEl = element;
    this.bounds = bounds;
    this.scaling = opts.scaling ?? `normalise`;
    this._ctx = ctx;
    if (opts.autoSize) {
      parentSizeCanvas(element, (event) => {
        this.bounds = element.getBoundingClientRect();
        this.plotArea.bounds = this.bounds;
        this.legend.bounds = this.bounds;
        this.axisX.bounds = this.bounds;
        this.axisY.bounds = this.bounds;
        ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);
        this.drawingInvalidated(`resize`);
        this.layoutInvalidated(`resize`);
        this.update(event.ctx, true);
      });
    }
    this.axisStrokeColour = opts.axisStrokeColour ?? `black`;
    this.axisTextColour = opts.axisTextColour ?? `black`;
    this.legendTextColour = opts.legendTextColour ?? `black`;
    this.axisStrokeWidth = opts.axisStrokeWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this, bounds);
    this.legend = new Legend(this, bounds);
    this.axisX = new AxisX(this, bounds);
    this.axisY = new AxisY(this, bounds);
  }
  update(ctx, force = false) {
    if (ctx === void 0) ctx = this._ctx;
    super.update(ctx, force);
  }
  /**
   * Calls 'clear()' on each of the series
   */
  clearSeries() {
    for (const series of this.series.values()) {
      series.clear();
    }
    this.update();
  }
  /**
   * Removes all series, plot, legend
   * and axis data.
   */
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.layoutInvalidated(`Plot.clear`);
    this.drawingInvalidated(`Plot.clear`);
    this.update();
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this._canvasEl.classList.add(`frozen`);
      this._canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this._canvasEl.title = ``;
      this._canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  /**
   * Plots a simple object, eg `{ x: 10, y: 20, z: 300 }`
   * Series are automatically created for each property of `o`
   *
   * Be sure to call `update()` to visually refresh.
   * @param o
   */
  plot(o) {
    const paths2 = getPaths(o, true);
    let seriesCreated = false;
    for (const p of paths2) {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
        seriesCreated = true;
      }
      const f = getField(o, p);
      throwResult(f);
      s.add(f.value);
    }
    if (seriesCreated) this.legend.layoutInvalidated(`new series`);
    this.update();
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create2 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, `${prefix}${key}.`);
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap((k) => create2(k));
  }
  createSeries(name, type = `array`, seriesOpts) {
    const seriesLength = this.seriesLength;
    if (name === void 0) name = `series-${seriesLength}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${seriesLength * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts) opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.drawingInvalidated(`Plot.createSeries`);
    return s;
  }
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

// src/visual/PlotOld.ts
var PlotOld_exports = {};
__export(PlotOld_exports, {
  add: () => add,
  calcScale: () => calcScale,
  defaultAxis: () => defaultAxis,
  draw: () => draw,
  drawValue: () => drawValue,
  plot: () => plot
});
var piPi = Math.PI * 2;
var defaultAxis = (name) => ({
  endWith: `none`,
  lineWidth: 1,
  namePosition: `none`,
  name,
  showLabels: name === `y`,
  showLine: true,
  // For y axis, it's the width, for x axis it's the text height
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const scales = [];
  for (const s of buffer.keys()) {
    const series = [...buffer.get(s)];
    if (series.length === 0) break;
    let { min, max } = minMaxAvg(series);
    let range = max - min;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      colour = drawingOpts.defaultSeriesVariable ? getCssVariable(
        `accent`,
        drawingOpts.defaultSeriesColour
      ) : drawingOpts.defaultSeriesColour;
    }
    if (range === 0) {
      range = min;
      min = min - range / 2;
      max = max + range / 2;
    }
    scales.push({
      min,
      max,
      range,
      name: s,
      colour
    });
  }
  return scales;
};
var add = (buffer, value, series = ``) => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c);
  drawing = {
    ...drawing,
    highlightIndex: index,
    leadingEdgeDot: true,
    translucentPlot: false,
    style: `none`,
    clearCanvas: false
  };
  draw(buffer, drawing);
};
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({
  ...s,
  range: range[1] - range[0],
  min: range[0],
  max: range[1]
}));
var draw = (buffer, drawing) => {
  const { x: xAxis, y: yAxis, ctx, canvasSize } = drawing;
  const margin = drawing.margin;
  const series = drawing.y.scaleRange ? scaleWithFixedRange(buffer, drawing.y.scaleRange, drawing) : calcScale(buffer, drawing, drawing.seriesColours);
  if (drawing.clearCanvas)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (drawing.debug) {
    ctx.strokeStyle = `orange`;
    ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
  }
  ctx.translate(margin, margin);
  const plotSize = drawing.plotSize ?? plotSizeFromBounds(canvasSize, drawing);
  const axisSize = {
    height: plotSize.height + margin + margin,
    width: plotSize.width
  };
  if (yAxis.showLabels || yAxis.showLine) {
    for (const s of series) {
      if (yAxis.allowedSeries !== void 0 && !yAxis.allowedSeries.includes(s.name)) continue;
      drawYSeriesScale(s, axisSize, drawing);
    }
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(
      plotSize.width,
      calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth,
      drawing
    );
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  const ptr = translatePoint(ctx, drawing.pointer);
  for (const s of series) {
    const data = buffer.getSource(s.name);
    if (data === void 0) continue;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  }
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    const legendSize = {
      width: plotSize.width,
      height: drawing.x.textSize + margin + margin
    };
    drawLegend(series, drawing, legendSize);
    ctx.restore();
  }
  ctx.resetTransform();
};
var drawYSeriesScale = (series, plotSize, drawing) => {
  const { ctx, y, digitsPrecision, margin } = drawing;
  const { height } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y.textSize, height + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y.colour) ctx.fillStyle = y.colour;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max - min : series.range;
  const mid = min + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(
    min.toFixed(digitsPrecision),
    0,
    calcYForValue(min, series, height) - halfHeight
  );
  ctx.fillText(
    mid.toFixed(digitsPrecision),
    0,
    calcYForValue(mid, series, height) - halfHeight
  );
  ctx.fillText(
    max.toFixed(digitsPrecision),
    0,
    calcYForValue(max, series, height) - margin
  );
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0) throw new Error(`series undefined`);
  const { ctx, y } = drawing;
  const { height } = plotSize;
  const min = y.labelRange ? y.labelRange[0] : series.min;
  const max = y.labelRange ? y.labelRange[1] : series.max;
  const minPos = calcYForValue(min, series, height);
  const maxPos = calcYForValue(max, series, height);
  ctx.translate(y.lineWidth, 0);
  ctx.lineWidth = y.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y.colour) ctx.strokeStyle = y.colour;
  ctx.stroke();
  ctx.translate(y.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  for (const s of series) {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += ` ` + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  }
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine) return;
  if (x.colour) ctx.strokeStyle = x.colour;
  ctx.lineWidth = x.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(width, yPos);
  ctx.stroke();
};
var drawSeriesData = (series, values, plotSize, drawing, leadingEdgeIndex) => {
  const { ctx, lineWidth, translucentPlot = false, margin, x: xAxis } = drawing;
  const style = drawing.style ?? `connected`;
  const height = plotSize.height - margin;
  let dataXScale = 1;
  if (xAxis.scaleRange) {
    const xAxisRange = xAxis.scaleRange[1] - xAxis.scaleRange[0];
    dataXScale = plotSize.width / xAxisRange;
  } else {
    dataXScale = drawing.capacity === 0 ? plotSize.width / values.length : plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot) return multiplyOpacity(c, 0.2);
    return c;
  };
  if (style === `dots`) {
    ctx.fillStyle = colourTransform(series.colour);
  } else if (style === `none`) {
  } else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colourTransform(series.colour);
  }
  for (let index = 0; index < values.length; index += incrementBy) {
    const y = calcYForValue(values[index], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi);
      ctx.fill();
    } else if (style === `none`) {
    } else {
      if (index == 0) ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (index === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[index];
    }
    x += dataXScale;
  }
  if (style === `connected`) {
    ctx.stroke();
  }
  if (leadingEdge !== void 0 && drawing.leadingEdgeDot) {
    ctx.beginPath();
    ctx.fillStyle = colourTransform(series.colour);
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var calcYForValue = (v, series, height) => (1 - (v - series.min) / series.range) * height;
var calcSizing = (margin, x, y, showLegend) => {
  let fromLeft = margin;
  if (y.showLabels) fromLeft += y.textSize;
  if (y.showLine) fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine) fromLeft += margin + margin;
  const fromRight = margin;
  const fromTop = margin + margin;
  let fromBottom = margin + margin;
  fromBottom += x.showLabels ? x.textSize : margin;
  if (x.showLine) fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine) fromBottom += margin;
  if (showLegend) fromBottom += x.textSize;
  return {
    left: fromLeft,
    right: fromRight,
    top: fromTop,
    bottom: fromBottom
  };
};
var plotSizeFromBounds = (bounds, opts) => {
  const { width, height } = bounds;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width - sizing.left - sizing.right,
    height: height - sizing.top - sizing.bottom
  };
};
var canvasSizeFromPlot = (plot2, opts) => {
  const { width, height } = plot2;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width + sizing.left + sizing.right,
    height: height + sizing.top + sizing.bottom
  };
};
var plot = (parentElementOrQuery, opts) => {
  if (parentElementOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElementOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  let plotSize = opts.plotSize;
  let canvasSize;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  } else {
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
    plotSize = opts.plotSize;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  }
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event) => {
    pointer.x = event.offsetX;
    pointer.y = event.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? ofCircularMutable({ capacity }) : ofArrayMutable();
  const metrics = ctx.measureText(`Xy`);
  const coalesce = opts.coalesce ?? true;
  if (ctx === null) throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x) xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y) yAxis = { ...yAxis, ...opts.y };
  let drawingOpts = {
    ...opts,
    y: yAxis,
    x: xAxis,
    pointer,
    capacity,
    coalesce,
    plotSize,
    canvasSize,
    ctx,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    style: opts.style ?? `connected`,
    defaultSeriesColour: opts.defaultSeriesColour ?? `yellow`,
    margin: 3,
    clearCanvas: true,
    leadingEdgeDot: true,
    debug: opts.debug ?? false,
    digitsPrecision: opts.digitsPrecision ?? 2,
    lineWidth: opts.lineWidth ?? 2,
    showLegend: opts.showLegend ?? false
  };
  if (plotSize) {
    const canvasSize2 = canvasSizeFromPlot(plotSize, drawingOpts);
    canvasEl.width = canvasSize2.width;
    canvasEl.height = canvasSize2.height;
    drawingOpts.canvasSize = canvasSize2;
  }
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = {
        ...drawingOpts,
        plotSize: plotSizeFromBounds(bounds, drawingOpts),
        canvasSize: bounds
      };
      draw(buffer, drawingOpts);
    });
  }
  return {
    drawValue: (index) => {
      drawValue(index, buffer, drawingOpts);
    },
    dispose: () => {
      canvasEl.removeEventListener(`pointermove`, onPointerMove);
      if (destroyCanvasEl) canvasEl.remove();
    },
    add: (value, series = ``, skipDrawing = false) => {
      add(buffer, value, series);
      if (skipDrawing) return;
      draw(buffer, drawingOpts);
    },
    draw: () => {
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
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

// src/dom/CanvasHelper.ts
var CanvasHelper = class extends SimpleEventEmitter {
  #scaler;
  #currentSize = Empty2;
  #ctx;
  constructor(domQueryOrEl, opts = {}) {
    super();
    if (!domQueryOrEl) throw new Error(`Param 'domQueryOrEl' is null or undefined`);
    this.el = resolveEl(domQueryOrEl);
    if (this.el.nodeName !== `CANVAS`) {
      throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
    }
    this.opts = {
      fill: opts.fill ?? `none`,
      height: opts.height ?? -1,
      width: opts.width ?? -1,
      zIndex: opts.zIndex ?? -1,
      scaleBy: opts.scaleBy ?? `both`,
      onResize: opts.onResize,
      clearOnResize: opts.clearOnResize ?? true,
      draw: opts.draw,
      skipCss: opts.skipCss ?? false,
      colourSpace: `srgb`
    };
    this.#scaler = scaler2(`both`);
    this.#init();
  }
  #getContext(reset = false) {
    if (this.#ctx === void 0 || reset) {
      const ratio = this.ratio;
      const c = this.el.getContext(`2d`);
      if (c === null) throw new Error(`Could not create drawing context`);
      this.#ctx = c;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.scale(ratio, ratio);
    }
    return this.#ctx;
  }
  setLogicalSize(logicalSize) {
    guard2(logicalSize, `logicalSize`);
    const ratio = window.devicePixelRatio || 1;
    this.#scaler = scaler2(this.opts.scaleBy, logicalSize);
    const pixelScaled = multiplyScalar(logicalSize, ratio);
    this.el.width = pixelScaled.width;
    this.el.height = pixelScaled.height;
    this.el.style.width = logicalSize.width.toString() + `px`;
    this.el.style.height = logicalSize.height.toString() + `px`;
    this.#getContext(true);
    if (this.opts.clearOnResize) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.#currentSize = logicalSize;
    const r = this.opts.onResize;
    if (r) {
      setTimeout(() => {
        r(this.ctx, this.size, this);
      }, 100);
    }
    this.fireEvent(`resize`, { ctx: this.ctx, size: this.#currentSize, helper: this });
  }
  /**
   * Notified that parent has changed size
   * @returns 
   */
  #onParentResize() {
    let parentEl = this.el.parentElement;
    if (!parentEl) {
      console.warn(`No parent element`);
      return;
    }
    const bounds = parentEl.getBoundingClientRect();
    this.setLogicalSize({ width: bounds.width, height: bounds.height });
  }
  /**
   * Notified that window has changed size
   */
  #onWindowResize() {
    this.setLogicalSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  #init() {
    switch (this.opts.fill) {
      case `viewport`: {
        if (!this.opts.skipCss) {
          this.el.style.position = `absolute`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
          this.el.style.zIndex = this.opts.zIndex.toString();
        }
        const r = windowResize();
        r.onValue(() => {
          this.#onWindowResize();
        });
        this.#onWindowResize();
        break;
      }
      case `parent`: {
        if (!this.opts.skipCss) {
          this.el.style.position = `relative`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
        }
        const r = windowResize();
        r.onValue(() => {
          this.#onParentResize();
        });
        this.#onParentResize();
        break;
      }
      case `none`: {
        let { width, height } = this.el.getBoundingClientRect();
        if (this.opts.width > 0) width = this.opts.width;
        if (this.opts.height > 0) height = this.opts.height;
        const desiredSize = { width, height };
        this.setLogicalSize(desiredSize);
        break;
      }
      default: {
        throw new Error(`Unknown 'fill' value. Expecting: 'none', 'viewport' or 'fill'`);
      }
    }
    const d = this.opts.draw;
    if (d) {
      const sched = () => {
        d(this.ctx, this.#currentSize, this);
        requestAnimationFrame(sched);
      };
      setTimeout(() => {
        sched();
      }, 100);
    }
  }
  /**
   * Clears the canvas.
   * 
   * Shortcut for:
   * `this.ctx.clearRect( 0, 0, this.width, this.height)`
   */
  clear() {
    if (this.#ctx) {
      this.#ctx.clearRect(0, 0, this.width, this.height);
    }
  }
  fill(colour) {
    if (this.#ctx) {
      if (colour) this.#ctx.fillStyle = colour;
      this.#ctx.fillRect(0, 0, this.width, this.height);
    }
  }
  /**
   * Gets the drawing context
   */
  get ctx() {
    if (this.#ctx === void 0) throw new Error(`Context not available`);
    return this.#getContext();
  }
  /**
   * Gets the logical width of the canvas
   * See also: {@link height}, {@link size}
   */
  get width() {
    return this.#currentSize.width;
  }
  /**
   * Gets the logical height of the canvas
   * See also: {@link width}, {@link size}
   */
  get height() {
    return this.#currentSize.height;
  }
  /**
   * Gets the logical size of the canvas
   * See also: {@link width}, {@link height}
   */
  get size() {
    return this.#currentSize;
  }
  /**
   * Gets the current scaling ratio being used
   * to compensate for high-DPI display
   */
  get ratio() {
    return window.devicePixelRatio || 1;
  }
  /**
   * Returns the width or height, whichever is smallest
   */
  get dimensionMin() {
    return Math.min(this.width, this.height);
  }
  /**
   * Returns the width or height, whichever is largest
   */
  get dimensionMax() {
    return Math.max(this.width, this.height);
  }
  /**
   * Returns a Scaler that converts from relative to absolute
   * coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x600
   * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
   * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
   * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
   * ```
   */
  get toAbsolute() {
    return this.#scaler.abs;
  }
  drawBounds(strokeStyle = `green`) {
    Drawing_exports.rect(
      this.#getContext(),
      { x: 0, y: 0, width: this.width, height: this.height },
      { crossed: true, strokeStyle, strokeWidth: 2 }
    );
  }
  /**
   * Returns a Scaler that converts from absolute
   * to relative coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x500
   * toRelative({ x: 800, y:600 });  // { x: 1,   y: 1 }
   * toRelative({ x: 0,   y: 0 });   // { x: 0,   y: 0 }
   * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
   * ```
   */
  get toRelative() {
    return this.#scaler.rel;
  }
  /**
   * Gets the center coordinate of the canvas
   */
  get center() {
    return { x: this.width / 2, y: this.height / 2 };
  }
  getImageData() {
    const data = this.ctx.getImageData(0, 0, this.width, this.height, { colorSpace: this.opts.colourSpace });
    if (!data) throw new Error(`Could not get image data from context`);
    return data;
  }
  /**
   * Returns the canvas frame data as a writable grid.
   * When editing, make as many edits as needed before calling
   * `flip`, which writes buffer back to the canvas.
   * ```js
   * const g = helper.getWritableBuffer();
   * // Get {r,g,b,opacity} of pixel 10,10
   * const pixel = g.get({x:10,y:10});
   * 
   * // Set a colour to pixel 10,10
   * g.set({r: 0.5, g:1, b:0, opacity:0}, {x:10,y:10});
   * 
   * // Write buffer to canvas
   * g.flip();
   * ```
   * @returns
   */
  getWritableBuffer() {
    const ctx = this.ctx;
    let data = this.getImageData();
    const grid = ImageDataGrid_exports.grid(data);
    const get = ImageDataGrid_exports.accessor(data);
    const set = ImageDataGrid_exports.setter(data);
    const flip2 = () => {
      ctx.putImageData(data, 0, 0);
    };
    return { grid, get, set, flip: flip2 };
  }
};
var imageDataAsGrid = (canvas, colorSpace = `srgb`) => {
  const ctx = canvas.getContext(`2d`);
  if (!ctx) throw new Error(`Could not create context`);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height, { colorSpace });
  if (!data) throw new Error(`Could not get image data from context`);
  const get = ImageDataGrid_exports.accessor(data);
  const set = ImageDataGrid_exports.setter(data);
};

// src/visual/plot/CartesianCanvasPlot.ts
var CartesianCanvasPlot = class {
  constructor(domQueryOrEl, data, options = {}) {
    this.actualDataRange = EmptyPositioned;
    this.visibleRange = PlaceholderPositioned;
    this.axisRounder = round(1, true);
    /**
     * List of lines to draw after drawing everything else.
     * Lines are given in value-coordinate space
     */
    this.overlayLines = [];
    this.renderArea = { ...EmptyPositioned, dimensionMin: 0 };
    if (!data) throw new TypeError(`Param 'data' is undefined`);
    if (typeof data !== `object`) throw new TypeError(`Param 'data' is not an object. Got: ${typeof data}`);
    this.#data = data;
    this.#lastDataChange = 0;
    this.#rangeMode = options.range ?? `auto`;
    this.#valueStyle = options.valueStyle ?? `dot`;
    this.#connectStyle = options.connectStyle ?? ``;
    this.whiskerLength = options.whiskerLength ?? 5;
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
    this.margin = options.margin ?? 0;
    this.helper = new CanvasHelper(domQueryOrEl, {
      width: 500,
      height: 400
    });
    this.helper.el.addEventListener(`click`, (event) => {
      const { x, y } = event;
      const value = this.screenToValue(event);
      console.log(`orig: ${x}x${y} -> ${value.x}x${value.y}`);
    });
    this.computeRenderArea();
  }
  #data;
  #lastDataChange;
  #grid;
  #rangeMode;
  #currentRange;
  #axisStyle;
  #valueStyle;
  #connectStyle;
  #rangeManual;
  #textStyle;
  computeRenderArea() {
    const m = this.margin;
    const width = this.helper.width - m - m;
    const height = this.helper.height - m - m;
    this.renderArea = {
      x: m,
      y: m,
      width,
      height,
      dimensionMin: Math.min(width, height)
    };
    return this.renderArea;
  }
  getCurrentRange() {
    if (this.#data.lastChange === this.#lastDataChange && this.#currentRange) return this.#currentRange;
    this.#lastDataChange = this.#data.lastChange;
    const r = this.#createRange();
    this.#currentRange = r;
    return r;
  }
  #createRange() {
    const range = this.getDataRange();
    const valueToRelative = relativeCompute(range);
    const relativeToValue = absoluteCompute(range);
    let xOffset = this.renderArea.x;
    let yOffset = this.renderArea.y;
    if (this.renderArea.dimensionMin === this.renderArea.height) {
      xOffset += this.renderArea.width / 2 - this.renderArea.dimensionMin / 2;
    } else if (this.renderArea.dimensionMin === this.renderArea.width && this.renderArea.width !== this.renderArea.height) {
      yOffset += this.renderArea.height / 2 - this.renderArea.dimensionMin / 2;
    }
    const relativeToElementSpace = (pt) => {
      let { x, y } = pt;
      if (x === Number.NEGATIVE_INFINITY) x = 0;
      else if (x === Number.POSITIVE_INFINITY) x = 1;
      if (y === Number.NEGATIVE_INFINITY) y = 0;
      else if (y === Number.POSITIVE_INFINITY) y = 1;
      x = x * this.renderArea.dimensionMin;
      y = (1 - y) * this.renderArea.dimensionMin;
      x += xOffset;
      y += yOffset;
      return { x, y };
    };
    const elementSpaceToRelative = (pt) => {
      let { x, y } = pt;
      x -= xOffset;
      y -= yOffset;
      x /= this.renderArea.dimensionMin;
      y /= this.renderArea.dimensionMin;
      return { x, y: 1 - y };
    };
    return {
      valueToRelative,
      relativeToElementSpace,
      elementSpaceToRelative,
      relativeToValue,
      range
    };
  }
  /**
   * Converts a point in data space to viewport space
   * @param pt 
   */
  valueToViewport(pt) {
    const c = this.getCurrentRange();
    const rel = c.valueToRelative(pt);
    const canvas = c.relativeToElementSpace(rel);
    const el = this.helper.el;
    const bounds = el.getBoundingClientRect();
    return {
      x: canvas.x + bounds.left,
      y: canvas.y + bounds.top
    };
  }
  /**
   * Positions an element at the viewport location of `data` point.
   * Ensure the element has `position:absolute` set.
   * @param data 
   * @param elOrQuery 
   * @param by 
   */
  positionAt(data, elOrQuery, by = `middle`, relativeToQuery) {
    const el = resolveEl(elOrQuery);
    let { x, y } = this.valueToViewport(data);
    if (by === `middle`) {
      const bounds = el.getBoundingClientRect();
      x -= bounds.width / 2;
      y -= bounds.height / 2;
    } else if (by === `top-left`) {
    } else throw new Error(`Param 'by' expected to be 'middle' or 'top-left'.`);
    if (relativeToQuery) {
      const relativeTo = resolveEl(relativeToQuery);
      const bounds = relativeTo.getBoundingClientRect();
      x -= bounds.left;
      y -= bounds.top;
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
  #valueToElementSpace(a, debug) {
    const ds = this.getCurrentRange();
    const rel = ds.valueToRelative(a);
    const scr = ds.relativeToElementSpace(rel);
    if (debug) console.log(`orig: ${a.x}x${a.y} rel: ${rel.x}x${rel.y} scr: ${scr.x}x${scr.y}`);
    return {
      ...a,
      x: scr.x,
      y: scr.y
    };
  }
  /**
   * Converts a point in pixel coordinates to a value.
   * Useful for converting from user input coordinates.
   * @param a 
   * @returns 
   */
  screenToValue(a) {
    const ds = this.getCurrentRange();
    const bounds = this.helper.el.getBoundingClientRect();
    const elem = point_exports.subtract(a, bounds);
    const rel = ds.elementSpaceToRelative(elem);
    const val = ds.relativeToValue(rel);
    return val;
  }
  valueToScreen(a) {
    const ds = this.getCurrentRange();
    const rel = ds.valueToRelative(a);
    const scr = ds.relativeToElementSpace(rel);
    const bounds = this.helper.el.getBoundingClientRect();
    return {
      x: scr.x + bounds.x,
      y: scr.y + bounds.y
    };
  }
  valueRectToScreen(a, b) {
    a = this.valueToScreen(a);
    b = this.valueToScreen(b);
    return {
      x: a.x,
      y: b.y,
      width: b.x - a.x,
      height: a.y - b.y
    };
  }
  /**
   * Compute screen coordinates based on two points in value space
   * @param valueA 
   * @param valueB 
   */
  #computeScreenLine(valueA, valueB, debug = false) {
    valueA = this.#valueToElementSpace(valueA, debug);
    valueB = this.#valueToElementSpace(valueB, debug);
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
    this.helper.clear();
    const ctx = this.helper.ctx;
    this.#useGrid();
    if (this.show.axes) this.#drawAxes();
    let count = 0;
    for (const [k, v] of this.#data.getEntries()) {
      let meta = this.#data.getMeta(k);
      if (!meta) {
        meta = this.getDefaultMeta();
        this.#data.setMeta(k, meta);
      }
      this.#drawSeries(k, v, meta);
      count++;
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
    const l = this.#computeScreenLine(line2.a, line2.b);
    this.#drawLineAbsolute(l, colour, width);
  }
  setMeta(series, meta) {
    this.#data.setMeta(series, {
      ...this.getDefaultMeta(),
      ...meta
    });
  }
  #drawAxes() {
    const { colour, width } = this.#axisStyle;
    let yAxis = this.#computeScreenLine({ x: 0, y: Number.NEGATIVE_INFINITY }, { x: 0, y: Number.POSITIVE_INFINITY }, false);
    let xAxis = this.#computeScreenLine({ x: Number.NEGATIVE_INFINITY, y: 0 }, { x: Number.POSITIVE_INFINITY, y: 0 }, false);
    this.#drawLineAbsolute(xAxis, colour, width, false);
    this.#drawLineAbsolute(yAxis, colour, width, false);
  }
  #drawYAxisValues(yPoints) {
    const { ctx } = this.helper;
    ctx.font = this.#textStyle.size + " " + this.#textStyle.font;
    ctx.fillStyle = this.#textStyle.colour;
    ctx.textBaseline = `middle`;
    for (const p of yPoints) {
      if (p.x === 0 && p.y === 0) continue;
      const scr = this.#valueToElementSpace(p, false);
      const val = this.axisRounder(p.y);
      const label = val.toString();
      const measure = ctx.measureText(label);
      let x = scr.x - measure.width - this.whiskerLength / 2 - 5;
      let y = scr.y;
      ctx.fillText(label, x, y);
    }
  }
  #drawXAxisValues(xPoints) {
    const { ctx } = this.helper;
    ctx.font = this.#textStyle.size + " " + this.#textStyle.font;
    ctx.fillStyle = this.#textStyle.colour;
    ctx.textBaseline = `top`;
    for (const p of xPoints) {
      const scr = this.#valueToElementSpace(p, false);
      const val = this.axisRounder(p.x);
      const label = val.toString();
      const measure = ctx.measureText(label);
      let x = scr.x - measure.width / 2;
      let y = scr.y + measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + this.whiskerLength / 2;
      ctx.fillText(label, x, y);
    }
  }
  #drawWhisker(p, vertical) {
    const whiskerHalfLength = this.whiskerLength / 2;
    const v = vertical ? { x: p.x, y: 0 } : { y: p.y, x: 0 };
    const scr = this.#valueToElementSpace(v, false);
    const line2 = vertical ? {
      a: { x: scr.x, y: scr.y - whiskerHalfLength },
      b: { x: scr.x, y: scr.y + whiskerHalfLength }
    } : {
      a: { y: scr.y, x: scr.x - whiskerHalfLength },
      b: { y: scr.y, x: scr.x + whiskerHalfLength }
    };
    this.#drawLineAbsolute(line2, this.#axisStyle.colour, this.#axisStyle.width, false);
  }
  #drawGridline(p, vertical) {
    const line2 = vertical ? this.#computeScreenLine({ x: p.x, y: Number.NEGATIVE_INFINITY }, { x: p.x, y: Number.POSITIVE_INFINITY }) : this.#computeScreenLine({ y: p.y, x: Number.NEGATIVE_INFINITY }, { y: p.y, x: Number.POSITIVE_INFINITY }, false);
    this.#drawLineAbsolute(line2, this.#grid.colour, p.major ? this.#grid.width * 2 : this.#grid.width);
  }
  #useGrid() {
    const g = this.#grid;
    const showGrid = this.show.grid;
    const showWhiskers = this.show.whiskers;
    const showValues = this.show.axisValues;
    const mm = this.getCurrentRange().range;
    const { increments, colour: strokeStyle, width: strokeWidth, major } = g;
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
    const ctx = this.helper.ctx;
    ctx.beginPath();
    for (let i = 0; i < dots.length; i++) {
      const dot2 = this.#valueToElementSpace(dots[i], false);
      if (i === 0) ctx.moveTo(dot2.x, dot2.y);
      ctx.lineTo(dot2.x, dot2.y);
    }
    ctx.strokeStyle = Colour_exports.resolveToString(colour);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
  }
  #drawDot(originalDot, fallbackColour, fallbackRadius) {
    const ctx = this.helper.ctx;
    const dot2 = this.#valueToElementSpace(originalDot, false);
    const radius = originalDot.radius ?? fallbackRadius;
    ctx.fillStyle = Colour_exports.resolveToString(originalDot.fillStyle ?? fallbackColour);
    ctx.beginPath();
    ctx.arc(dot2.x, dot2.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  #drawLineAbsolute(line2, colour, width, debug = false) {
    if (debug) console.log(line2);
    const ctx = this.helper.ctx;
    ctx.beginPath();
    ctx.moveTo(line2.a.x, line2.a.y);
    ctx.lineTo(line2.b.x, line2.b.y);
    ctx.strokeStyle = Colour_exports.resolveToString(colour);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
  }
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
    return yield* this.#data.valuesFlat();
  }
  *getEntries() {
    return yield* this.#data.entries();
  }
  *getSeries() {
    return yield* this.#data.values();
  }
  add(value, series = `default`) {
    this.#data.addKeyedValues(series, value);
    this.lastChange = performance.now();
  }
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Visuals: {
        SceneGraph: SceneGraph_exports,
        Plot2: Plot2_exports,
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
  Drawing_exports,
  SceneGraph_exports,
  scaleCanvas,
  windowResize,
  resizeObservable,
  DomRx_exports,
  parentSizeCanvas,
  fullSizeCanvas,
  Plot2_exports,
  Palette_exports,
  BipolarView_exports,
  PlotOld_exports,
  CanvasHelper,
  imageDataAsGrid,
  CartesianCanvasPlot,
  plot_exports,
  visual_exports
};
//# sourceMappingURL=chunk-4UKC26OS.js.map