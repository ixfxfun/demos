import { __export } from "./chunk-Cn1u12Og.js";
import { arrayTest, numberInclusiveRangeTest, numberTest, percentTest, resultThrow } from "./src-B5kzJkYi.js";
import { clamp, interpolate, pairwise, quantiseEvery } from "./src-DtvLL3oi.js";
import { cloneFromFields } from "./records-ButNOjS_.js";
import "./is-primitive-Bo4OHt3v.js";
import "./interval-type-klk0IZBm.js";
import "./basic-BlF-8Fo-.js";
import { StackImmutable, continuously, delayLoop } from "./src-CGZcvPbX.js";
import { SimpleEventEmitter } from "./src-BB8BKEVc.js";
import "./key-value-BXKMXEIP.js";
import "./dist-STbyDn6P.js";
import "./resolve-core-hiYZW4xF.js";
import { ElementSizer, resolveEl } from "./src-mdH5NzeF.js";
import { Empty$1 as Empty, EmptyPositioned, PointsTracker, angleConvert, angleParse, applyFields, corners, corners$1, guard as guard$1, guard$1 as guard, indexFromCell, isCubicBezier, isEqual, isLine, isQuadraticBezier, multiplyScalar$1 as multiplyScalar, rows, scaler } from "./src-BxRlvgsb.js";
import "./bezier-BF9M23nT.js";
import { convert, hex2hsl, hex2oklch, hex2rgb, hsl2rgb, index_default, multiplyOpacity, oklab2rgb, rgb2hsl, rgb2oklch } from "./src-DBz_PpZQ.js";

//#region packages/visual/src/drawing.ts
var drawing_exports = {};
__export(drawing_exports, {
	arc: () => arc,
	bezier: () => bezier,
	circle: () => circle$1,
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
const PIPI = Math.PI * 2;
/**
* Gets a 2d drawing context from canvas element or query, or throws an error
* @param canvasElementContextOrQuery Canvas element reference or DOM query
* @returns Drawing context.
*/
const getContext = (canvasElementContextOrQuery) => {
	if (canvasElementContextOrQuery === null) throw new Error(`canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`);
	if (canvasElementContextOrQuery === void 0) throw new Error(`canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`);
	const ctx = canvasElementContextOrQuery instanceof CanvasRenderingContext2D ? canvasElementContextOrQuery : canvasElementContextOrQuery instanceof HTMLCanvasElement ? canvasElementContextOrQuery.getContext(`2d`) : typeof canvasElementContextOrQuery === `string` ? resolveEl(canvasElementContextOrQuery).getContext(`2d`) : canvasElementContextOrQuery;
	if (ctx === null) throw new Error(`Could not create 2d context for canvas`);
	return ctx;
};
/**
* Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
* @param ctxOrCanvasEl Drawing context or canvs element reference
* @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
* @returns
*/
const makeHelper = (ctxOrCanvasEl, canvasBounds) => {
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
			circle$1(ctx, circlesToDraw, opts);
		},
		arc(arcsToDraw, opts) {
			arc(ctx, arcsToDraw, opts);
		},
		textBlock(lines, opts) {
			if (opts.bounds === void 0 && canvasBounds !== void 0) opts = {
				...opts,
				bounds: {
					...canvasBounds,
					x: 0,
					y: 0
				}
			};
			textBlock(ctx, lines, opts);
		}
	};
};
/**
* Creates a drawing op to apply provided options
* @param opts Drawing options that apply
* @returns Stack
*/
const optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
/**
* Applies drawing options to `ctx`, returning a {@link DrawingStack}
* @param ctx Context
* @param opts Options
* @returns
*/
const applyOpts$1 = (ctx, opts = {}, ...additionalOps) => {
	if (ctx === void 0) throw new Error(`ctx undefined`);
	const stack = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
	stack.apply();
	return stack;
};
/**
* Draws one or more arcs.
* @param ctx
* @param arcs
* @param opts
*/
const arc = (ctx, arcs, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (arc$1) => {
		ctx.beginPath();
		ctx.arc(arc$1.x, arc$1.y, arc$1.radius, arc$1.startRadian, arc$1.endRadian);
		ctx.stroke();
	};
	const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
	for (const arc$1 of arcsArray) draw(arc$1);
};
/**
* Colouring drawing op. Applies `fillStyle` and `strokeStyle`
* @param strokeStyle
* @param fillStyle
* @returns
*/
const coloringOp = (strokeStyle, fillStyle) => {
	const apply = (ctx) => {
		if (fillStyle) ctx.fillStyle = fillStyle;
		if (strokeStyle) ctx.strokeStyle = strokeStyle;
	};
	return apply;
};
const lineOp = (lineWidth, lineJoin, lineCap) => {
	const apply = (ctx) => {
		if (lineWidth) ctx.lineWidth = lineWidth;
		if (lineJoin) ctx.lineJoin = lineJoin;
		if (lineCap) ctx.lineCap = lineCap;
	};
	return apply;
};
/**
* Creates and returns an immutable drawing stack for a context
* @param ctx Context
* @param stk Initial stack operations
* @returns
*/
const drawingStack = (ctx, stk) => {
	stk ??= new StackImmutable();
	const push = (...ops) => {
		stk ??= new StackImmutable();
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
	return {
		push,
		pop,
		apply
	};
};
/**
* Draws a curved line through a set of points
* @param ctx 
* @param points 
* @param opts 
*/
const lineThroughPoints = (ctx, points, opts) => {
	applyOpts$1(ctx, opts);
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
/**
* Draws one or more circles. Will draw outline/fill depending on
* whether `strokeStyle` or `fillStyle` params are present in the drawing options.
*
* ```js
* // Draw a circle with radius of 10 at 0,0
* circle(ctx, {radius:10});
*
* // Draw a circle of radius 10 at 100,100
* circle(ctx, {radius: 10, x: 100, y: 100});
*
* // Draw two blue outlined circles
* circle(ctx, [ {radius: 5}, {radius: 10} ], {strokeStyle:`blue`});
* ```
* @param ctx Drawing context
* @param circlesToDraw Circle(s) to draw
* @param opts Drawing options
*/
const circle$1 = (ctx, circlesToDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (c) => {
		ctx.beginPath();
		ctx.arc(c.x, c.y, c.radius, 0, PIPI);
		if (opts.strokeStyle) ctx.stroke();
		if (opts.fillStyle) ctx.fill();
	};
	if (Array.isArray(circlesToDraw)) for (const c of circlesToDraw) draw(c);
	else draw(circlesToDraw);
};
/**
* Draws one or more ellipses. Will draw outline/fill depending on
* whether `strokeStyle` or `fillStyle` params are present in the drawing options.
* @param ctx
* @param ellipsesToDraw
* @param opts
*/
const ellipse = (ctx, ellipsesToDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (ellipse$1) => {
		ctx.beginPath();
		const rotation = ellipse$1.rotation ?? 0;
		const startAngle = ellipse$1.startAngle ?? 0;
		const endAngle = ellipse$1.endAngle ?? PIPI;
		ctx.ellipse(ellipse$1.x, ellipse$1.y, ellipse$1.radiusX, ellipse$1.radiusY, rotation, startAngle, endAngle);
		if (opts.strokeStyle) ctx.stroke();
		if (opts.fillStyle) ctx.fill();
	};
	const ellipsesArray = Array.isArray(ellipsesToDraw) ? ellipsesToDraw : [ellipsesToDraw];
	for (const ellipse$1 of ellipsesArray) draw(ellipse$1);
};
/**
* Draws one or more paths.
* supported paths are quadratic beziers and lines.
* @param ctx
* @param pathsToDraw
* @param opts
*/
const paths = (ctx, pathsToDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (path) => {
		if (isQuadraticBezier(path)) quadraticBezier(ctx, path, opts);
		else if (isLine(path)) line(ctx, path, opts);
		else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
	};
	if (Array.isArray(pathsToDraw)) for (const p of pathsToDraw) draw(p);
	else draw(pathsToDraw);
};
/**
* Draws a line between all the given points.
* If a fillStyle is specified, it will be filled.
*
* See also:
* * {@link line}: Draw one or more lines
*
* @param ctx
* @param pts
*/
const connectedPoints = (ctx, pts, opts = {}) => {
	const shouldLoop = opts.loop ?? false;
	resultThrow(arrayTest(pts, `pts`));
	if (pts.length === 0) return;
	for (const [index, pt] of pts.entries()) guard(pt, `Index ${index}`);
	applyOpts$1(ctx, opts);
	if (opts.lineWidth) ctx.lineWidth = opts.lineWidth;
	ctx.beginPath();
	ctx.moveTo(pts[0].x, pts[0].y);
	for (const pt of pts) ctx.lineTo(pt.x, pt.y);
	if (shouldLoop) ctx.lineTo(pts[0].x, pts[0].y);
	if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) ctx.stroke();
	if (opts.fillStyle) ctx.fill();
};
/**
* Draws labels for a set of points
* @param ctx
* @param pts Points to draw
* @param opts
* @param labels Labels for points
*/
const pointLabels = (ctx, pts, opts = {}, labels) => {
	if (pts.length === 0) return;
	for (const [index, pt] of pts.entries()) guard(pt, `Index ${index}`);
	applyOpts$1(ctx, opts);
	for (const [index, pt] of pts.entries()) {
		const label = labels !== void 0 && index < labels.length ? labels[index] : index.toString();
		ctx.fillText(label.toString(), pt.x, pt.y);
	}
};
/**
* Returns `point` with the canvas's translation matrix applied
* @param ctx
* @param point
* @returns
*/
const translatePoint = (ctx, point) => {
	const m = ctx.getTransform();
	return {
		x: point.x * m.a + point.y * m.c + m.e,
		y: point.x * m.b + point.y * m.d + m.f
	};
};
/**
* Creates a new HTML IMG element with a snapshot of the
* canvas. Element will need to be inserted into the document.
*
* ```
* const myCanvas = document.getElementById('someCanvas');
* const el = copyToImg(myCanvas);
* document.getElementById('images').appendChild(el);
* ```
* @param canvasEl
* @returns
*/
const copyToImg = (canvasEl) => {
	const img = document.createElement(`img`);
	img.src = canvasEl.toDataURL(`image/jpeg`);
	return img;
};
/**
* Draws filled circle(s) at provided point(s)
* @param ctx
* @param pos
* @param opts
*/
const dot = (ctx, pos, opts) => {
	opts ??= {};
	const radius = opts.radius ?? 10;
	const positions = Array.isArray(pos) ? pos : [pos];
	const stroke = opts.stroke ? opts.stroke : opts.strokeStyle !== void 0;
	let filled = opts.filled ? opts.filled : opts.fillStyle !== void 0;
	if (!stroke && !filled) filled = true;
	applyOpts$1(ctx, opts);
	for (const pos$1 of positions) {
		ctx.beginPath();
		if (`radius` in pos$1) ctx.arc(pos$1.x, pos$1.y, pos$1.radius, 0, 2 * Math.PI);
		else ctx.arc(pos$1.x, pos$1.y, radius, 0, 2 * Math.PI);
		if (filled) ctx.fill();
		if (stroke) ctx.stroke();
	}
};
/**
* Draws a cubic or quadratic bezier
* @param ctx
* @param bezierToDraw
* @param opts
*/
const bezier = (ctx, bezierToDraw, opts) => {
	if (isQuadraticBezier(bezierToDraw)) quadraticBezier(ctx, bezierToDraw, opts);
	else if (isCubicBezier(bezierToDraw)) cubicBezier(ctx, bezierToDraw, opts);
};
const cubicBezier = (ctx, bezierToDraw, opts = {}) => {
	let stack = applyOpts$1(ctx, opts);
	const { a, b, cubic1, cubic2 } = bezierToDraw;
	const isDebug = opts.debug ?? false;
	if (isDebug) {}
	ctx.beginPath();
	ctx.moveTo(a.x, a.y);
	ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
	ctx.stroke();
	if (isDebug) {
		stack = stack.push(optsOp({
			...opts,
			strokeStyle: multiplyOpacity(opts.strokeStyle ?? `silver`, .6),
			fillStyle: multiplyOpacity(opts.fillStyle ?? `yellow`, .4)
		}));
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
const quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
	const { a, b, quadratic } = bezierToDraw;
	const isDebug = opts.debug ?? false;
	let stack = applyOpts$1(ctx, opts);
	ctx.beginPath();
	ctx.moveTo(a.x, a.y);
	ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
	ctx.stroke();
	if (isDebug) {
		stack = stack.push(optsOp({
			...opts,
			strokeStyle: multiplyOpacity(opts.strokeStyle ?? `silver`, .6),
			fillStyle: multiplyOpacity(opts.fillStyle ?? `yellow`, .4)
		}));
		connectedPoints(ctx, [
			a,
			quadratic,
			b
		]);
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
/**
* Draws one or more lines.
*
* Each line is drawn independently, ie it's not assumed lines are connected.
*
* See also:
* * {@link connectedPoints}: Draw a series of connected points
* @param ctx
* @param toDraw
* @param opts
*/
const line = (ctx, toDraw, opts = {}) => {
	const isDebug = opts.debug ?? false;
	const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
	applyOpts$1(ctx, opts, o);
	const draw = (d) => {
		const { a, b } = d;
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
		if (isDebug) {
			ctx.fillText(`a`, a.x, a.y);
			ctx.fillText(`b`, b.x, b.y);
			dot(ctx, a, {
				radius: 5,
				strokeStyle: `black`
			});
			dot(ctx, b, {
				radius: 5,
				strokeStyle: `black`
			});
		}
		ctx.stroke();
	};
	if (Array.isArray(toDraw)) for (const t of toDraw) draw(t);
	else draw(toDraw);
};
/**
* Draws one or more triangles
* @param ctx
* @param toDraw
* @param opts
*/
const triangle = (ctx, toDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (t) => {
		connectedPoints(ctx, corners(t), {
			...opts,
			loop: true
		});
		if (opts.debug) pointLabels(ctx, corners(t), void 0, [
			`a`,
			`b`,
			`c`
		]);
	};
	if (Array.isArray(toDraw)) for (const t of toDraw) draw(t);
	else draw(toDraw);
};
/**
* Draws one or more rectangles.
* 
* @param ctx
* @param toDraw
* @param opts
*/
const rect = (ctx, toDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
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
		if (opts.debug) pointLabels(ctx, corners$1(d), void 0, [
			`NW`,
			`NE`,
			`SE`,
			`SW`
		]);
	};
	if (Array.isArray(toDraw)) for (const t of toDraw) draw(t);
	else draw(toDraw);
};
/**
* Returns the width of `text`. Rounds number up to nearest multiple if provided. If
* text is empty or undefined, 0 is returned.
* @param ctx
* @param text
* @param widthMultiple
* @returns
*/
const textWidth = (ctx, text, padding = 0, widthMultiple) => {
	const rect$1 = textRect(ctx, text, padding, widthMultiple);
	return rect$1.width;
};
const textRect = (ctx, text, padding = 0, widthMultiple) => {
	if (text === void 0 || text === null || text.length === 0) return Empty;
	const m = ctx.measureText(text);
	const width = widthMultiple ? quantiseEvery(m.width, widthMultiple) + padding : m.width + padding;
	return {
		width,
		height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
	};
};
const textHeight = (ctx, text, padding = 0) => {
	const rect$1 = textRect(ctx, text, padding);
	return rect$1.height;
};
/**
* Draws a block of text. Each array item is considered a line.
* @param ctx
* @param lines
* @param opts
*/
const textBlock = (ctx, lines, opts) => {
	applyOpts$1(ctx, opts);
	const anchorPadding = opts.anchorPadding ?? 0;
	const align = opts.align ?? `top`;
	const anchor = opts.anchor;
	const bounds = opts.bounds ?? {
		x: 0,
		y: 0,
		width: 1e6,
		height: 1e6
	};
	const blocks = lines.map((l) => ctx.measureText(l));
	const widths = blocks.map((tm) => tm.width);
	const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent + 3);
	const maxWidth = Math.max(...widths);
	const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
	let { x, y } = anchor;
	if (anchor.x + maxWidth > bounds.width) x = bounds.width - (maxWidth + anchorPadding);
	else x -= anchorPadding;
	if (x < bounds.x) x = bounds.x + anchorPadding;
	if (anchor.y + totalHeight > bounds.height) y = bounds.height - (totalHeight + anchorPadding);
	else y -= anchorPadding;
	if (y < bounds.y) y = bounds.y + anchorPadding;
	if (align === `top`) ctx.textBaseline = `top`;
	else ctx.textBaseline = `middle`;
	for (const [index, line$1] of lines.entries()) {
		ctx.fillText(line$1, x, y);
		y += heights[index];
	}
};
/**
* Draws an aligned text block
*/
const textBlockAligned = (ctx, text, opts) => {
	const { bounds } = opts;
	const { horiz = `left`, vert = `top` } = opts;
	const lines = typeof text === `string` ? [text] : text;
	applyOpts$1(ctx, opts);
	ctx.save();
	ctx.translate(bounds.x, bounds.y);
	ctx.textAlign = `left`;
	ctx.textBaseline = `top`;
	const middleX = bounds.width / 2;
	const middleY = bounds.height / 2;
	const blocks = lines.map((l) => ctx.measureText(l));
	const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
	const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
	let y = 0;
	if (vert === `center`) y = middleY - totalHeight / 2;
	else if (vert === `bottom`) y = bounds.height - totalHeight;
	for (const [index, line$1] of lines.entries()) {
		let x = 0;
		if (horiz === `center`) x = middleX - blocks[index].width / 2;
		else if (horiz === `right`) x = bounds.width - blocks[index].width;
		ctx.fillText(line$1, x, y);
		y += heights[index];
	}
	ctx.restore();
};

//#endregion
//#region packages/visual/src/colour/guards.ts
const isHsl = (v) => {
	if (typeof v !== `object`) return false;
	if (!(`h` in v)) return false;
	if (!(`s` in v)) return false;
	if (!(`l` in v)) return false;
	if (!(`unit` in v)) return false;
	if (!(`space` in v)) return false;
	if (v.space !== `hsl`) return false;
	return true;
};
const isRgb = (v) => {
	if (typeof v !== `object`) return false;
	if (!(`r` in v)) return false;
	if (!(`g` in v)) return false;
	if (!(`b` in v)) return false;
	if (!(`space` in v)) return false;
	if (!(`unit` in v)) return false;
	if (v.space === `srgb`) return true;
	return false;
};
/**
* If the input object has r,g&b properties, it will return a fully-
* formed Rgb type with `unit` and `space` properties.
* 
* If it lacks these basic three properties or they are out of range,
*  _undefined_ is returned.
* 
* If RGB values are less than 1 assumes unit:scalar. Otherwise unit:8bit.
* If RGB values exceed 255, _undefined_ returned.
* @param v 
* @returns 
*/
const tryParseObjectToRgb = (v) => {
	if (!(`r` in v && `g` in v && `b` in v)) return;
	if (!(`unit` in v)) if (v.r <= 1 && v.g <= 1 && v.b <= 1) v.unit = `scalar`;
	else if (v.r > 255 && v.g <= 255 && v.b <= 255) return;
	else v.unit = `8bit`;
	if (!(`space` in v)) v.space = `srgb`;
	return v;
};
const tryParseObjectToHsl = (v) => {
	if (!(`h` in v && `s` in v && `l` in v)) return;
	if (!(`unit` in v)) if (v.r <= 1 && v.g <= 1 && v.b <= 1) v.unit = `scalar`;
	else if (v.s > 100 && v.l <= 100) return;
	else v.unit = `absolute`;
	if (!(`space` in v)) v.space = `hsl`;
	return v;
};
const isOkLch = (v) => {
	if (typeof v !== `object`) return false;
	if (!(`l` in v)) return false;
	if (!(`c` in v)) return false;
	if (!(`h` in v)) return false;
	if (!(`unit` in v)) return false;
	if (!(`space` in v)) return false;
	if (v.space === `lch`) return true;
	if (v.space === `oklch`) return true;
	return false;
};
const isColourish = (v) => {
	if (typeof v === `string`) return true;
	if (typeof v !== `object`) return false;
	if (isHsl(v)) return true;
	if (isOkLch(v)) return true;
	if (isRgb(v)) return true;
	return false;
};

//#endregion
//#region packages/visual/src/colour/utility.ts
function calculateHueDistance(a, b, limit = 1) {
	let long = -1;
	let short = -1;
	if (b < a) {
		long = b - a;
		short = limit - (a - b);
	} else {
		long = b - a;
		short = long - limit;
	}
	const forward = short > 0 ? short : long;
	const backward = short > 0 ? long : short;
	if (Math.abs(long) < Math.abs(short)) {
		const t = short;
		short = long;
		long = t;
	}
	return {
		long,
		short,
		forward,
		backward
	};
}
function wrapScalarHue(value) {
	value = value % 1;
	if (value < 0) return (1 - Math.abs(value)) % 1;
	return value;
}

//#endregion
//#region packages/visual/src/colour/hsl.ts
var hsl_exports = {};
__export(hsl_exports, {
	absolute: () => absolute$1,
	changeLightness: () => changeLightness$1,
	fromCss: () => fromCss$2,
	fromHexString: () => fromHexString$2,
	generateScalar: () => generateScalar$1,
	guard: () => guard$5,
	interpolator: () => interpolator$3,
	parseCssHslFunction: () => parseCssHslFunction,
	scalar: () => scalar,
	toAbsolute: () => toAbsolute$1,
	toCssString: () => toCssString,
	toLibraryRgb: () => toLibraryRgb,
	toScalar: () => toScalar$2,
	withOpacity: () => withOpacity$3
});
/**
* Scales the opacity value of an input HSL value
* ```js
* withOpacity()
* ```
* @param value Colour
* @param fn Function that calcules opacity based on input scalar value
* @returns 
*/
const withOpacity$3 = (value, fn) => {
	switch (value.unit) {
		case `absolute`: return {
			...value,
			opacity: fn((value.opacity ?? 100) / 100, value) * 100
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
};
/**
* Increases or decreases lightness by this percentage, returning new colour
* 
* Amount to change:
* * 'fixed': a fixed amount
* * 'delta': increase/decrease by this amount
* * 'pdelta': proportion of current value to change by ('percentage delta')
* 
* ```
* const colour = { h: 0.5, s: 0.5, l: 0.5, space: `hsl`, unit: `scalar` };
* changeLightness(colour, { pdelta: 0.1 }); // l: 0.55
* changeLightness(colour, { delta: 0.1 });  // l: 0.6
* changeLightness(colour, { fixed: 0.5 });  // l: 0.5
* ```
* 
* Keep in mind the numerical value will depend on the unit of `value`. If it's scalar,
* lightness is 0..1 scale, otherwise 0..100 scale.
* 
* Use negative values to decrease (does not apply to 'fixed')
* @param value Hsl colour
* @param amount Amount to change
*/
const changeLightness$1 = (value, amount) => {
	let newL = 0;
	if (typeof amount.pdelta !== `undefined`) newL = value.l + value.l * amount.pdelta;
	else if (typeof amount.delta !== `undefined`) newL = amount.delta + value.l;
	else if (typeof amount.fixed !== `undefined`) {
		if (amount.fixed < 0) throw new TypeError(`Cannot use negative value with 'fixed'`);
		newL = amount.fixed;
	} else throw new TypeError(`Parameter 'amount' is missing 'delta/pdelta/fixed' properties`);
	return {
		...value,
		l: scaleProperty(value, newL, `l`)
	};
};
const scaleProperty = (hsl, value, property) => {
	if (hsl.unit === `scalar`) {
		if (value > 1) value = 1;
		else if (value < 0) value = 0;
	} else if (value > 100) value = 100;
	else if (value < 0) value = 0;
	return value;
};
const hslTransparent = Object.freeze({
	h: 0,
	s: 0,
	l: 0,
	opacity: 0,
	unit: `absolute`,
	space: `hsl`
});
function fromHexString$2(hexString, options = {}) {
	return fromLibrary$2(hex2hsl(hexString), options);
}
function fromCss$2(value, options = {}) {
	value = value.toLowerCase();
	if (value.startsWith(`hsla(`)) throw new Error(`hsla() not supported`);
	if (value.startsWith(`rgba(`)) throw new Error(`rgba() not supported`);
	if (value.startsWith(`#`)) return fromHexString$2(value, options);
	if (value.startsWith(`--`)) try {
		value = resolveCss(value);
	} catch (error) {
		if (typeof options.fallbackString !== `undefined`) value = options.fallbackString;
		if (typeof options.fallbackColour !== `undefined`) return options.fallbackColour;
		throw error;
	}
	if (value === `transparent`) return hslTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$2(cssDefinedHexColours[value], options);
	if (value.startsWith(`rgb(`)) {
		const hsl = toLibraryHsl(value);
		return fromLibrary$2(hsl, options);
	}
	if (!value.startsWith(`hsl(`)) try {
		value = convert(value, `hsl`);
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	try {
		const hsl = parseCssHslFunction(value);
		if (options.scalar) return toScalar$2(hsl);
		return toAbsolute$1(hsl);
	} catch (error) {
		if (options.fallbackColour) return options.fallbackColour;
		throw error;
	}
}
const toCssString = (hsl) => {
	const abs = toAbsolute$1(hsl);
	let css = `hsl(${abs.h}deg ${abs.s}% ${abs.l}%`;
	if (`opacity` in abs && abs.opacity !== void 0 && abs.opacity < 100) css += ` / ${abs.opacity}%`;
	css += ")";
	return css;
};
function fromLibrary$2(hsl, parsingOptions = {}) {
	if (typeof hsl === `undefined` || hsl === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	const scalarOpt = parsingOptions.scalar ?? true;
	resultThrow(numberInclusiveRangeTest(hsl.h, 0, 360, `h`), numberInclusiveRangeTest(hsl.s, 0, 100, `s`), numberInclusiveRangeTest(hsl.l, 0, 100, `l`), percentTest(hsl.alpha ?? 1, `alpha`));
	if (scalarOpt) return scalar(hsl.h / 360, hsl.s / 100, hsl.l / 100, hsl.alpha ?? 1);
	else return absolute$1(hsl.h, hsl.s, hsl.l, (hsl.alpha ?? 1) * 100);
}
const toAbsolute$1 = (hslOrString) => {
	if (typeof hslOrString === `string`) return fromCss$2(hslOrString, { scalar: false });
	if (isRgb(hslOrString)) return toAbsolute$1(fromLibrary$2(toLibraryHsl(hslOrString), { scalar: false }));
	const hsl = hslOrString;
	guard$5(hsl);
	if (hsl.unit === `absolute`) return hsl;
	return {
		h: hsl.h * 360,
		s: hsl.s * 100,
		l: hsl.l * 100,
		opacity: (hsl.opacity ?? 1) * 100,
		unit: `absolute`,
		space: `hsl`
	};
};
/**
* Generates a {@link HslScalar} value.
* 
* ```js
* generateScaler(10); // 10deg, default to full saturation, half lightness and full opacity
* 
* // Generate HSL value from radian angle and 50% saturation
* generateScalar(`10rad`, 0.5); 
* 
* // Generate from numeric CSS variable
* generateScalar(`--hue`);
* ```
* @param absoluteHslOrVariable Hue angle or CSS variable
* @param saturation 
* @param lightness 
* @param opacity 
*/
const generateScalar$1 = (absoluteHslOrVariable, saturation = 1, lightness$1 = .5, opacity = 1) => {
	if (typeof absoluteHslOrVariable === `string`) {
		if (absoluteHslOrVariable.startsWith(`--`)) absoluteHslOrVariable = getComputedStyle(document.body).getPropertyValue(absoluteHslOrVariable).trim();
	}
	const hue = angleParse(absoluteHslOrVariable);
	if (saturation > 1) throw new TypeError(`Param 'saturation' must be between 0..1`);
	if (lightness$1 > 1) throw new TypeError(`Param 'lightness' must be between 0..1`);
	if (opacity > 1) throw new TypeError(`Param 'opacity' must be between 0..1`);
	const hueDeg = angleConvert(hue, `deg`).value / 360;
	return {
		h: hueDeg,
		s: saturation,
		l: lightness$1,
		opacity,
		unit: `scalar`,
		space: `hsl`
	};
};
/**
* Converts a {@link Hsl} value to scalar units, or parses a colour string
* and converts it.
* 
* ```js
* toScalar({ h: 100, s: 50, l: 100, unit: `absolute` });
* toScalar(`red`);
* ```
* @param hslOrString 
* @returns 
*/
const toScalar$2 = (hslOrString) => {
	if (typeof hslOrString === `string`) return fromCss$2(hslOrString, { scalar: true });
	if (isRgb(hslOrString)) return toScalar$2(fromLibrary$2(toLibraryHsl(hslOrString), { scalar: true }));
	const hsl = hslOrString;
	guard$5(hsl);
	if (hsl.unit === `scalar`) return hsl;
	return {
		h: hsl.h / 360,
		s: hsl.s / 100,
		l: hsl.l / 100,
		opacity: (hsl.opacity ?? 1) / 100,
		unit: `scalar`,
		space: `hsl`
	};
};
const guard$5 = (hsl) => {
	const { h, s, l, opacity, space, unit } = hsl;
	if (space !== `hsl`) throw new Error(`Space is expected to be 'hsl'. Got: ${space}`);
	if (unit === `absolute`) resultThrow(numberTest(h, `finite`, `h`), numberInclusiveRangeTest(s, 0, 100, `s`), numberInclusiveRangeTest(l, 0, 100, `l`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 100, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(h, `percentage`, `h`), numberTest(s, `percentage`, `s`), numberTest(l, `percentage`, `l`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
};
const interpolator$3 = (a, b, direction = `shorter`) => {
	a = toScalar$2(a);
	b = toScalar$2(b);
	const aOpacity = a.opacity ?? 1;
	const distanceCalc = calculateHueDistance(a.h, b.h, 1);
	const hueDistance = direction === `longer` ? distanceCalc.long : distanceCalc.short;
	const satDistance = b.s - a.s;
	const lightDistance = b.l - a.l;
	const opacityDistance = (b.opacity ?? 1) - aOpacity;
	return (amount) => {
		amount = clamp(amount);
		let h = interpolate(amount, 0, Math.abs(hueDistance));
		if (hueDistance < 0) h = a.h - h;
		else h = a.h + h;
		const s = interpolate(amount, 0, satDistance);
		const l = interpolate(amount, 0, lightDistance);
		const o = interpolate(amount, 0, opacityDistance);
		return scalar(wrapScalarHue(h), s + a.s, l + a.l, o + aOpacity);
	};
};
/**
* Creates a HslScalar value from scalar (0..1) values
* @param hue 
* @param sat 
* @param lightness 
* @param opacity 
* @returns 
*/
function scalar(hue = .5, sat = 1, lightness$1 = .5, opacity = 1) {
	const hsl = {
		unit: `scalar`,
		space: `hsl`,
		h: hue,
		s: sat,
		l: lightness$1,
		opacity
	};
	guard$5(hsl);
	return hsl;
}
function absolute$1(hue = 200, sat = 100, lightness$1 = 50, opacity = 100) {
	const hsl = {
		unit: `absolute`,
		space: `hsl`,
		h: hue,
		s: sat,
		l: lightness$1,
		opacity
	};
	guard$5(hsl);
	return hsl;
}
/**
* It seems Colorizr can't handle 'deg' units
* @param value 
*/
function parseCssHslFunction(value) {
	if (value.startsWith(`hsla`)) throw new Error(`hsla() is not supported`);
	if (!value.startsWith(`hsl(`)) throw new Error(`Expected hsl(..) CSS colour`);
	const start = value.indexOf("(");
	const end = value.indexOf(")");
	if (end < start) throw new Error(`Is hsl() not terminated? Missing ')'`);
	const part = value.substring(start + 1, end);
	let split = part.split(/[\s,]+/);
	if (split.length < 3) throw new Error(`Expected three tokens. Got: ${split.length} length`);
	let returnRelative = false;
	if (split[0].endsWith(`%`)) returnRelative = true;
	if (split[1].endsWith(`%`) && split[2].endsWith(`%`)) returnRelative = true;
	const valueAsScalar = (v, pos) => {
		if (v === `none`) return 0;
		if (v.endsWith(`%`)) return Number.parseFloat(v.substring(0, v.length - 1)) / 100;
		if (v.endsWith(`deg`) && pos === 0) v = v.substring(0, v.length - 3);
		const vf = Number.parseFloat(v);
		if (pos === 0) return vf / 360;
		if (pos === 3) return vf;
		return vf / 100;
	};
	const valueAsAbs = (v, pos) => {
		if (v === `none`) return 0;
		if (v.endsWith(`%`)) {
			const vf$1 = Number.parseFloat(v.substring(0, v.length - 1));
			if (pos === 0) return vf$1 * 360;
			return vf$1;
		}
		if (v.endsWith(`deg`) && pos === 0) return Number.parseFloat(v.substring(0, v.length - 3));
		const vf = Number.parseFloat(v);
		return vf;
	};
	if (split.length > 3) {
		if (split[3] === "/") split = [
			split[0],
			split[1],
			split[2],
			split[4]
		];
	}
	if (returnRelative) return scalar(valueAsScalar(split[0], 0), valueAsScalar(split[1], 1), valueAsScalar(split[2], 2), valueAsScalar(split[3] ?? `100%`, 3));
	else return absolute$1(valueAsAbs(split[0], 0), valueAsAbs(split[1], 1), valueAsAbs(split[2], 2), valueAsAbs(split[3] ?? `100%`, 3));
}
/**
* Converts a Hsl structure (or CSS string) to Colorizr's RGB format
* @param hsl HSL colour
* @returns 
*/
function toLibraryRgb(hsl) {
	if (typeof hsl === `string`) {
		const parseResult = fromCss$2(hsl, { scalar: false });
		return toLibraryRgb(parseResult);
	}
	hsl = toAbsolute$1(hsl);
	const rgb = hsl2rgb({
		h: hsl.h,
		s: hsl.s,
		l: hsl.l
	});
	return {
		...rgb,
		alpha: (hsl.opacity ?? 100) / 100 * 255
	};
}

//#endregion
//#region packages/visual/src/colour/oklch.ts
var oklch_exports = {};
__export(oklch_exports, {
	OKLCH_CHROMA_MAX: () => OKLCH_CHROMA_MAX,
	absolute: () => absolute,
	fromCss: () => fromCss$1,
	fromHexString: () => fromHexString$1,
	fromLibrary: () => fromLibrary$1,
	generateScalar: () => generateScalar,
	guard: () => guard$4,
	interpolator: () => interpolator$2,
	scalar: () => scalar$2,
	toAbsolute: () => toAbsolute,
	toCssString: () => toCssString$2,
	toScalar: () => toScalar$1,
	withOpacity: () => withOpacity$2
});
const OKLCH_CHROMA_MAX = .4;
const guard$4 = (lch) => {
	const { l, c, h, opacity, space, unit } = lch;
	if (space !== `oklch`) throw new Error(`Space is expected to be 'oklch'. Got: ${space}`);
	if (unit === `absolute`) resultThrow(percentTest(l, `l`), () => {
		if (typeof c === `number`) return numberInclusiveRangeTest(c, 0, OKLCH_CHROMA_MAX, `c`);
	}, () => {
		if (typeof h === `number`) return numberInclusiveRangeTest(c, 0, 360, `h`);
	}, percentTest(opacity ?? 1, `opacity`));
	else if (unit === `scalar`) resultThrow(percentTest(l, `l`), percentTest(c, `c`), percentTest(h, `h`), percentTest(lch.opacity ?? 1, `opacity`));
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
};
/**
* Coverts from the Colorizr library
* Tests ranges:
* * l: 0..1
* * c: 0..1
* * h: 0..360
* * alpha: 0..1
* 
* Default option: { scalar: true }
* @param lch LCH value
* @param parsingOptions Options for parsing 
* @returns 
*/
function fromLibrary$1(lch, parsingOptions = {}) {
	if (typeof lch === `undefined` || lch === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	const scalarReturn = parsingOptions.scalar ?? true;
	resultThrow(percentTest(lch.l, `l`), percentTest(lch.c, `c`), numberInclusiveRangeTest(lch.h, 0, 360, `h`), percentTest(lch.alpha ?? 1, `alpha`));
	if (scalarReturn) return scalar$2(lch.l, lch.c / OKLCH_CHROMA_MAX, lch.h / 360, lch.alpha ?? 1);
	else return absolute(lch.l, lch.c, lch.h, lch.alpha ?? 1);
}
const fromHexString$1 = (hexString, options = {}) => {
	return fromLibrary$1(hex2oklch(hexString), options);
};
const oklchTransparent = Object.freeze({
	l: 0,
	c: 0,
	h: 0,
	opacity: 0,
	unit: `absolute`,
	space: `oklch`
});
function fromCss$1(value, options = {}) {
	value = value.toLowerCase();
	if (value.startsWith(`#`)) return fromHexString$1(value, options);
	if (value === `transparent`) return oklchTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$1(cssDefinedHexColours[value], options);
	if (value.startsWith(`rgb(`)) {
		const rgb = to8bit(parseCssRgbFunction(value));
		const lch$1 = rgb2oklch({
			r: rgb.r,
			g: rgb.g,
			b: rgb.b
		});
		return fromLibrary$1(lch$1, options);
	}
	if (!value.startsWith(`hsl(`) && !value.startsWith(`oklch(`)) try {
		const converted = convert(value, `oklch`);
		value = converted;
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	const cc = new index_default(value);
	const lch = cc.oklch;
	return fromLibrary$1(lch, options);
}
/**
* Returns a string or {@link OkLch} value to absolute form.
* 
* This means ranges are:
* * lightness: 0..1
* * chroma: 0...CHROMA_MAX (0.4)
* * hue: 0..360
* @param lchOrString 
* @returns 
*/
const toAbsolute = (lchOrString) => {
	if (typeof lchOrString === `string`) return toAbsolute(fromCss$1(lchOrString, { scalar: true }));
	guard$4(lchOrString);
	if (lchOrString.unit === `absolute`) return lchOrString;
	return {
		space: `oklch`,
		unit: `absolute`,
		l: lchOrString.l,
		c: lchOrString.c * OKLCH_CHROMA_MAX,
		h: lchOrString.h * 360,
		opacity: lchOrString.opacity
	};
};
const toScalar$1 = (lchOrString) => {
	if (typeof lchOrString === `string`) return toScalar$1(fromCss$1(lchOrString, { scalar: true }));
	const lch = lchOrString;
	guard$4(lch);
	if (lch.unit === `scalar`) return lch;
	return {
		l: lch.l,
		c: lch.c / OKLCH_CHROMA_MAX,
		h: lch.h / 360,
		opacity: lch.opacity ?? 1,
		unit: `scalar`,
		space: `oklch`
	};
};
/**
* Returns the colour as a CSS colour string: `oklch(l c h / opacity)`.
*
* @param lch Colour
* @param precision Set precision of numbers, defaults to 3 
* @returns CSS colour string
*/
const toCssString$2 = (lch, precision = 3) => {
	guard$4(lch);
	const { l, c, h, opacity } = lch;
	let css = ``;
	switch (lch.unit) {
		case `absolute`:
			css = `oklch(${(l * 100).toFixed(precision)}% ${c.toFixed(precision)} ${h.toFixed(precision)}`;
			break;
		case `scalar`:
			css = `oklch(${l.toFixed(precision)} ${(c * OKLCH_CHROMA_MAX).toFixed(precision)} ${(h * 360).toFixed(precision)}`;
			break;
	}
	if (typeof opacity !== `undefined` && opacity !== 1) css += ` / ${opacity.toFixed(precision)}`;
	css += `)`;
	return css;
};
const generateScalar = (absoluteHslOrVariable, chroma = 1, lightness$1 = .5, opacity = 1) => {
	if (typeof absoluteHslOrVariable === `string`) {
		if (absoluteHslOrVariable.startsWith(`--`)) absoluteHslOrVariable = getComputedStyle(document.body).getPropertyValue(absoluteHslOrVariable).trim();
	}
	if (lightness$1 > 1) throw new TypeError(`Param 'lightness' must be between 0..1`);
	if (chroma > 1) throw new TypeError(`Param 'chroma' must be between 0..1`);
	const hue = angleParse(absoluteHslOrVariable);
	const hueDeg = angleConvert(hue, `deg`).value / 360;
	if (opacity > 1) throw new TypeError(`Param 'opacity' must be between 0..1`);
	return {
		l: lightness$1,
		c: chroma,
		h: hueDeg,
		opacity,
		unit: `scalar`,
		space: `oklch`
	};
};
/**
* Scales the opacity value of an input Oklch value
* ```js
* withOpacity()
* ```
* @param value 
* @param fn 
* @returns 
*/
const withOpacity$2 = (value, fn) => {
	switch (value.unit) {
		case `absolute`: return {
			...value,
			opacity: fn((value.opacity ?? 100) / 100, value) * 100
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
};
const interpolator$2 = (a, b, direction = `shorter`) => {
	a = toScalar$1(a);
	b = toScalar$1(b);
	const aOpacity = a.opacity ?? 1;
	const distanceCalc = calculateHueDistance(a.h, b.h, 1);
	const hueDistance = direction === `longer` ? distanceCalc.long : distanceCalc.short;
	const chromaDistance = b.c - a.c;
	const lightDistance = b.l - a.l;
	const opacityDistance = (b.opacity ?? 1) - aOpacity;
	return (amount) => {
		amount = clamp(amount);
		let h = interpolate(amount, 0, Math.abs(hueDistance));
		if (hueDistance < 0) h = a.h - h;
		else h = a.h + h;
		const c = interpolate(amount, 0, chromaDistance);
		const l = interpolate(amount, 0, lightDistance);
		const o = interpolate(amount, 0, opacityDistance);
		return scalar$2(l + a.l, c + a.c, wrapScalarHue(h), o + aOpacity);
	};
};
function scalar$2(lightness$1 = .7, chroma = .1, hue = .5, opacity = 1) {
	const lch = {
		unit: `scalar`,
		space: `oklch`,
		l: lightness$1,
		c: chroma,
		h: hue,
		opacity
	};
	guard$4(lch);
	return lch;
}
/**
* Create an LCH colour using absolute hue
* @param l Lightness 0..1
* @param c Chroma 0..4
* @param h Hue 0..360
* @param opacity 
* @returns 
*/
const absolute = (l, c, h, opacity = 1) => {
	const lch = {
		space: `oklch`,
		unit: `absolute`,
		opacity,
		l,
		c,
		h
	};
	guard$4(lch);
	return lch;
};

//#endregion
//#region packages/visual/src/colour/css-colours.ts
/**
* Converts from some kind of colour that is legal in CSS
* into a structured Colour type.
* 
* Handles: hex format, CSS variables, colour names
* ```js
* fromCssColour(`#ffffff`);
* fromCssColour(`blue`);
* fromCssColour(`--some-variable`);
* fromCssColour(`hsl(50, 50%, 50%)`);
* fromCssColour(`rgb(50, 100, 100)`);
* ```
* @param colour 
* @returns 
*/
const fromCssColour = (colour) => {
	if (colour.startsWith(`#`)) return fromHexString(colour, true);
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return fromHexString(cssDefinedHexColours[colour], true);
	if (colour.startsWith(`--`)) {
		const fromCss$3 = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss$3.length === 0 || fromCss$3 === null) throw new Error(`Variable missing: ${colour}`);
		return fromCssColour(fromCss$3);
	}
	colour = colour.toLowerCase();
	if (colour.startsWith(`hsl(`)) return fromCss$2(colour, { scalar: true });
	if (colour.startsWith(`rgb(`)) return fromCss(colour, { scalar: true });
	if (colour.startsWith(`oklch(`)) return fromCss$1(colour, { scalar: true });
	throw new Error(`String colour is not a hex colour, CSS variable nor well-defined colour. Input: '${colour}'`);
};
/**
* Resolves a named colour or CSS variable to a colour string.
* Doesn't do conversion or parsing.
* 
* ```js
* resolveCss(`red`);
* resolveCss(`my-var`);
* ```
* @param colour Colour
* @param fallback Fallback if CSS variable is missing
* @returns 
*/
const resolveCss = (colour, fallback) => {
	if (colour.startsWith(`--`)) {
		const fromCss$3 = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss$3.length === 0 || fromCss$3 === null) {
			if (typeof fallback !== `undefined`) return fallback;
			throw new Error(`CSS variable missing: '${colour}'`);
		}
		return resolveCss(fromCss$3);
	}
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return cssDefinedHexColours[colour];
	return colour;
};
const cssDefinedHexColours = {
	"aliceblue": "#f0f8ff",
	"antiquewhite": "#faebd7",
	"aqua": "#00ffff",
	"aquamarine": "#7fffd4",
	"azure": "#f0ffff",
	"beige": "#f5f5dc",
	"bisque": "#ffe4c4",
	"black": "#000000",
	"blanchedalmond": "#ffebcd",
	"blue": "#0000ff",
	"blueviolet": "#8a2be2",
	"brown": "#a52a2a",
	"burlywood": "#deb887",
	"cadetblue": "#5f9ea0",
	"chartreuse": "#7fff00",
	"chocolate": "#d2691e",
	"coral": "#ff7f50",
	"cornflowerblue": "#6495ed",
	"cornsilk": "#fff8dc",
	"crimson": "#dc143c",
	"cyan": "#00ffff",
	"darkblue": "#00008b",
	"darkcyan": "#008b8b",
	"darkgoldenrod": "#b8860b",
	"darkgray": "#a9a9a9",
	"darkgreen": "#006400",
	"darkkhaki": "#bdb76b",
	"darkmagenta": "#8b008b",
	"darkolivegreen": "#556b2f",
	"darkorange": "#ff8c00",
	"darkorchid": "#9932cc",
	"darkred": "#8b0000",
	"darksalmon": "#e9967a",
	"darkseagreen": "#8fbc8f",
	"darkslateblue": "#483d8b",
	"darkslategray": "#2f4f4f",
	"darkturquoise": "#00ced1",
	"darkviolet": "#9400d3",
	"deeppink": "#ff1493",
	"deepskyblue": "#00bfff",
	"dimgray": "#696969",
	"dodgerblue": "#1e90ff",
	"firebrick": "#b22222",
	"floralwhite": "#fffaf0",
	"forestgreen": "#228b22",
	"fuchsia": "#ff00ff",
	"gainsboro": "#dcdcdc",
	"ghostwhite": "#f8f8ff",
	"gold": "#ffd700",
	"goldenrod": "#daa520",
	"gray": "#808080",
	"green": "#008000",
	"greenyellow": "#adff2f",
	"honeydew": "#f0fff0",
	"hotpink": "#ff69b4",
	"indianred": "#cd5c5c",
	"indigo": "#4b0082",
	"ivory": "#fffff0",
	"khaki": "#f0e68c",
	"lavender": "#e6e6fa",
	"lavenderblush": "#fff0f5",
	"lawngreen": "#7cfc00",
	"lemonchiffon": "#fffacd",
	"lightblue": "#add8e6",
	"lightcoral": "#f08080",
	"lightcyan": "#e0ffff",
	"lightgoldenrodyellow": "#fafad2",
	"lightgray": "#d3d3d3",
	"lightgreen": "#90ee90",
	"lightpink": "#ffb6c1",
	"lightsalmon": "#ffa07a",
	"lightseagreen": "#20b2aa",
	"lightskyblue": "#87cefa",
	"lightslategray": "#778899",
	"lightsteelblue": "#b0c4de",
	"lightyellow": "#ffffe0",
	"lime": "#00ff00",
	"limegreen": "#32cd32",
	"linen": "#faf0e6",
	"magenta": "#ff00ff",
	"maroon": "#800000",
	"mediumaquamarine": "#66cdaa",
	"mediumblue": "#0000cd",
	"mediumorchid": "#ba55d3",
	"mediumpurple": "#9370db",
	"mediumseagreen": "#3cb371",
	"mediumslateblue": "#7b68ee",
	"mediumspringgreen": "#00fa9a",
	"mediumturquoise": "#48d1cc",
	"mediumvioletred": "#c71585",
	"midnightblue": "#191970",
	"mintcream": "#f5fffa",
	"mistyrose": "#ffe4e1",
	"moccasin": "#ffe4b5",
	"navajowhite": "#ffdead",
	"navy": "#000080",
	"oldlace": "#fdf5e6",
	"olive": "#808000",
	"olivedrab": "#6b8e23",
	"orange": "#ffa500",
	"orangered": "#ff4500",
	"orchid": "#da70d6",
	"palegoldenrod": "#eee8aa",
	"palegreen": "#98fb98",
	"paleturquoise": "#afeeee",
	"palevioletred": "#db7093",
	"papayawhip": "#ffefd5",
	"peachpuff": "#ffdab9",
	"peru": "#cd853f",
	"pink": "#ffc0cb",
	"plum": "#dda0dd",
	"powderblue": "#b0e0e6",
	"purple": "#800080",
	"rebeccapurple": "#663399",
	"red": "#ff0000",
	"rosybrown": "#bc8f8f",
	"royalblue": "#4169e1",
	"saddlebrown": "#8b4513",
	"salmon": "#fa8072",
	"sandybrown": "#f4a460",
	"seagreen": "#2e8b57",
	"seashell": "#fff5ee",
	"sienna": "#a0522d",
	"silver": "#c0c0c0",
	"skyblue": "#87ceeb",
	"slateblue": "#6a5acd",
	"slategray": "#708090",
	"snow": "#fffafa",
	"springgreen": "#00ff7f",
	"steelblue": "#4682b4",
	"tan": "#d2b48c",
	"teal": "#008080",
	"thistle": "#d8bfd8",
	"tomato": "#ff6347",
	"turquoise": "#40e0d0",
	"violet": "#ee82ee",
	"wheat": "#f5deb3",
	"white": "#ffffff",
	"whitesmoke": "#f5f5f5",
	"yellow": "#ffff00",
	"yellowgreen": "#9acd32",
	"transparent": "#00000000"
};

//#endregion
//#region packages/visual/src/colour/srgb.ts
var srgb_exports = {};
__export(srgb_exports, {
	changeLightness: () => changeLightness,
	eightBit: () => eightBit,
	fromCss: () => fromCss,
	fromHexString: () => fromHexString,
	guard: () => guard$3,
	interpolator: () => interpolator$1,
	lightness: () => lightness,
	parseCssRgbFunction: () => parseCssRgbFunction,
	scalar: () => scalar$1,
	to8bit: () => to8bit,
	toCssString: () => toCssString$1,
	toLibraryHsl: () => toLibraryHsl,
	toScalar: () => toScalar,
	withOpacity: () => withOpacity$1
});
const withOpacity$1 = (value, fn) => {
	switch (value.unit) {
		case `8bit`: return {
			...value,
			opacity: fn((value.opacity ?? 255) / 255, value) * 255
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
};
function fromHexString(hexString, scalar$3 = true) {
	return fromLibrary(hex2rgb(hexString), { scalar: scalar$3 });
}
const srgbTansparent = Object.freeze({
	r: 0,
	g: 0,
	b: 0,
	opacity: 0,
	unit: `8bit`,
	space: `srgb`
});
/**
* Converts a colour in a legal CSS form into Rgb value, by default RgbScalar (0..1) scale.
* ```js
* fromCss(`rebeccapurple`);
* fromCss(`rgb(40% 20% 60%)`);
* 
* // Get 8bit version on 0..255 scale
* fromCss(`blue`, { scalar: false });
* ```
* 
* @param value 
* @param options 
* @returns 
*/
function fromCss(value, options = {}) {
	value = value.toLowerCase();
	if (value.startsWith(`hsla(`)) throw new Error(`hsla() not supported`);
	if (value.startsWith(`rgba(`)) throw new Error(`rgba() not supported`);
	const scalar$3 = options.scalar ?? true;
	if (value.startsWith(`#`)) return fromHexString(value, scalar$3);
	if (value === `transparent`) return srgbTansparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) fromHexString(cssDefinedHexColours[value], scalar$3);
	if (value.startsWith(`hsl(`)) {
		const rgb = toLibraryRgb(value);
		return fromLibrary(rgb, options);
	}
	if (!value.startsWith(`rgb(`)) try {
		value = convert(value, `rgb`);
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	try {
		const rgb = parseCssRgbFunction(value);
		if (scalar$3) return toScalar(rgb);
		return to8bit(rgb);
	} catch (error) {
		if (options.fallbackColour) return options.fallbackColour;
		throw error;
	}
}
const toCssString$1 = (rgb) => {
	guard$3(rgb);
	switch (rgb.unit) {
		case `8bit`:
			if (rgb.opacity === void 0 || rgb.opacity === 255) return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
			return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${(rgb.opacity ?? 255) / 255})`;
		case `scalar`:
			if (rgb.opacity === void 0 || rgb.opacity === 1) return `rgb(${rgb.r * 100}% ${rgb.g * 100}% ${rgb.b * 100}%)`;
			return `rgb(${rgb.r * 100}% ${rgb.g * 100}% ${rgb.b * 100}% / ${(rgb.opacity ?? 1) * 100}%)`;
		default: throw new Error(`Unknown unit: ${rgb.unit}`);
	}
};
function fromLibrary(rgb, parsingOptions = {}) {
	if (parsingOptions.scalar) return {
		r: rgb.r / 255,
		g: rgb.g / 255,
		b: rgb.b / 255,
		opacity: rgb.alpha ?? 1,
		unit: `scalar`,
		space: `srgb`
	};
	else return {
		r: rgb.r,
		g: rgb.g,
		b: rgb.b,
		opacity: rgb.alpha ?? 255,
		unit: `8bit`,
		space: `srgb`
	};
}
const to8bit = (rgbOrString) => {
	if (typeof rgbOrString === `string`) return fromCss(rgbOrString, { scalar: false });
	if (isHsl(rgbOrString)) return to8bit(fromLibrary(toLibraryRgb(rgbOrString), { scalar: false }));
	guard$3(rgbOrString);
	if (rgbOrString.unit === `8bit`) return rgbOrString;
	return {
		r: rgbOrString.r * 255,
		g: rgbOrString.g * 255,
		b: rgbOrString.b * 255,
		opacity: (rgbOrString.opacity ?? 1) * 255,
		unit: `8bit`,
		space: `srgb`
	};
};
const toScalar = (rgbOrString) => {
	if (typeof rgbOrString === `string`) return fromCss(rgbOrString, { scalar: true });
	if (isHsl(rgbOrString)) return toScalar(fromLibrary(toLibraryRgb(rgbOrString), { scalar: true }));
	guard$3(rgbOrString);
	if (rgbOrString.unit === `scalar`) return rgbOrString;
	return {
		r: rgbOrString.r / 255,
		g: rgbOrString.g / 255,
		b: rgbOrString.b / 255,
		opacity: (rgbOrString.opacity ?? 1) / 255,
		unit: `scalar`,
		space: `srgb`
	};
};
const guard$3 = (rgb) => {
	const { r, g, b, opacity, space, unit } = rgb;
	if (space !== `srgb`) throw new Error(`Space is expected to be 'srgb'. Got: ${space}`);
	if (unit === `8bit`) resultThrow(numberInclusiveRangeTest(r, 0, 255, `r`), numberInclusiveRangeTest(g, 0, 255, `g`), numberInclusiveRangeTest(b, 0, 255, `b`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 255, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(r, `percentage`, `r`), numberTest(g, `percentage`, `g`), numberTest(b, `percentage`, `b`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be '8bit' or 'scalar'. Got: ${unit}`);
};
/**
* Sets the lightness value.
* 
* Amount to change:
* * 'fixed': a fixed amount
* * 'delta': increase/decrease by this amount
* * 'pdelta': proportion of current value to change by ('percentage delta')
* 
* Use negative values to decrease
* @param value 
* @param amount 
*/
const changeLightness = (rgb, amount) => {
	let newL = 0;
	const co = new index_default(toCssString$1(rgb));
	const scalarUnit = rgb.unit === `scalar`;
	if (typeof amount.pdelta !== `undefined`) newL = co.oklab.l + co.oklab.l * amount.pdelta;
	else if (typeof amount.delta !== `undefined`) newL = co.oklab.l + amount.delta;
	else if (typeof amount.fixed !== `undefined`) {
		if (amount.fixed < 0) throw new TypeError(`Amount cannot be negative when using 'fixed'`);
		newL = amount.fixed;
	} else throw new TypeError(`Parameter 'amount' is missing 'pdelta/delta/fixed' properties`);
	if (newL < 0) newL = 0;
	else if (newL > 1) newL = 1;
	const rgbResult = oklab2rgb({
		a: co.oklab.a,
		b: co.oklab.b,
		l: newL,
		alpha: co.oklab.alpha
	});
	return fromLibrary(rgbResult, { scalar: scalarUnit });
};
/**
* Returns a lightness value (0..1) for an RGB input
* 
* Calculates lightness by converting to Oklab and using the 'L' value
* @param rgb 
* @returns 
*/
function lightness(rgb) {
	const co = new index_default(toCssString$1(rgb));
	return co.oklab.l;
}
/**
* Creates a Rgb8Bit value from 8bit (0..255) values
* @param red 
* @param green 
* @param blue 
* @param opacity 
* @returns 
*/
function eightBit(red = 100, green = 100, blue = 100, opacity = 255) {
	const rgb = {
		unit: `8bit`,
		space: `srgb`,
		r: red,
		g: green,
		b: blue,
		opacity
	};
	guard$3(rgb);
	return rgb;
}
/**
* Creates a RgbScalar value from scalar (0..1) values
* @param red 
* @param green 
* @param blue 
* @param opacity 
* @returns 
*/
function scalar$1(red = .5, green = .5, blue = .5, opacity = 1) {
	const rgb = {
		unit: `scalar`,
		space: `srgb`,
		r: red,
		g: green,
		b: blue,
		opacity
	};
	guard$3(rgb);
	return rgb;
}
/**
* It seems Colorizr can't handle % values properly :'(
* @param value 
*/
function parseCssRgbFunction(value) {
	if (value.startsWith(`rgba`)) throw new Error(`RGBA is not supported`);
	if (!value.startsWith(`rgb(`)) throw new Error(`Expected rgb(..) CSS colour`);
	const start = value.indexOf("(");
	const end = value.indexOf(")");
	if (end < start) throw new Error(`Is rgb() not terminated? Missing ')'`);
	const part = value.substring(start + 1, end);
	let split = part.split(/[\s,]+/);
	if (split.length < 3) throw new Error(`Expected three tokens. Got: ${split.length} length`);
	let relativeCount = 0;
	for (const s of split) if (s.endsWith("%")) relativeCount++;
	const valueAsScalar = (v, pos) => {
		if (v.endsWith(`%`)) return Number.parseFloat(v.substring(0, v.length - 1)) / 100;
		if (pos < 3) return Number.parseFloat(v) / 255;
		else return Number.parseFloat(v);
	};
	const valueAs8bit = (v, pos) => {
		if (v.endsWith(`%`)) return Number.parseFloat(v.substring(0, v.length - 1)) / 100 * 255;
		if (pos < 3) return Number.parseFloat(v);
		else return Number.parseFloat(v) * 255;
	};
	if (split.length > 3) {
		if (split[3] === "/") split = [
			split[0],
			split[1],
			split[2],
			split[4]
		];
	}
	if (relativeCount > 1) return scalar$1(valueAsScalar(split[0], 0), valueAsScalar(split[1], 1), valueAsScalar(split[2], 2), valueAsScalar(split[3] ?? `1`, 3));
	else return eightBit(valueAs8bit(split[0], 0), valueAs8bit(split[1], 1), valueAs8bit(split[2], 2), valueAs8bit(split[3] ?? `1`, 3));
}
/**
* Interpolates colours in Srgb space. Probably
* really ugly, use OkLch space isntead.
* 
* ```js
* const i = interpolator(`red`, `blue`);
* i(0.5); // Get 50% between these colours
* ```
* @param colourA 
* @param colourB 
* @returns 
*/
const interpolator$1 = (colourA, colourB) => {
	const aa = toScalar(colourA);
	const bb = toScalar(colourB);
	const aOpacity = aa.opacity ?? 1;
	const opacityDistance = (bb.opacity ?? 1) - aOpacity;
	const r = bb.r - aa.r;
	const g = bb.g - aa.g;
	const b = bb.b - aa.b;
	return (amount) => {
		amount = clamp(amount);
		return scalar$1(aa.r + interpolate(amount, 0, r), aa.g + interpolate(amount, 0, g), aa.b + interpolate(amount, 0, b), aOpacity + interpolate(amount, 0, opacityDistance));
	};
};
/**
* Converts a Rgb structure (or CSS string) to Colorizr's HSL format
* @param rgb 
* @returns 
*/
function toLibraryHsl(rgb) {
	if (typeof rgb === `string`) {
		const parseResult = fromCss(rgb, { scalar: false });
		return toLibraryHsl(parseResult);
	}
	rgb = to8bit(rgb);
	const hsl = rgb2hsl({
		r: rgb.r,
		g: rgb.g,
		b: rgb.b
	});
	return {
		...hsl,
		alpha: (rgb.opacity ?? 255) / 255
	};
}

//#endregion
//#region packages/visual/src/image-data-grid.ts
var image_data_grid_exports = {};
__export(image_data_grid_exports, {
	accessor: () => accessor,
	byColumn: () => byColumn,
	byRow: () => byRow,
	grid: () => grid,
	setter: () => setter,
	wrap: () => wrap
});
/**
* Returns a {@link @ixfx/geometry/Grids.Grid} based on the provided `image`
* @param image ImageData
* @returns Grid
*/
const grid = (image) => {
	const g = {
		rows: image.width,
		cols: image.height
	};
	return g;
};
/**
* Returns an object that allows get/set grid semantics on the underlying `image` data.
* Uses 8-bit sRGB values, meaning 0..255 range for red, green, blue & opacity.
* 
* ```js
* // Get CANVAS element, drawing context and then image data
* const canvasEl = document.querySelector(`#my-canvas`);
* const ctx = canvasEl.getContext(`2d`);
* const imageData = ctx.getImageData();
* 
* // Now that we have image data, we can wrap it:
* const asGrid = ImageDataGrid.wrap(imageData);
* asGrid.get({ x:10, y: 20 }); // Get pixel at 10,20
* asGrid.set(colour, { x:10, y: 20 }); // Set pixel value
* 
* // Display changes back on the canvas
* ctx.putImageData(imageData, 0, 0)
* ```
* @param image 
* @returns 
*/
const wrap = (image) => {
	return {
		...grid(image),
		get: accessor(image),
		set: setter(image)
	};
};
/**
* Returns a function to access pixel values by x,y
* @param image 
* @returns 
*/
const accessor = (image) => {
	const g = grid(image);
	const data = image.data;
	const fn = (cell, bounds = `undefined`) => {
		const index = indexFromCell(g, cell, bounds);
		if (index === void 0) return;
		const pxIndex = index * 4;
		return {
			r: data[pxIndex],
			g: data[pxIndex + 1],
			b: data[pxIndex + 2],
			opacity: data[pxIndex + 3],
			unit: `8bit`,
			space: `srgb`
		};
	};
	return fn;
};
/**
* Returns a function that sets pixel values
* @param image 
* @returns 
*/
const setter = (image) => {
	const g = grid(image);
	const data = image.data;
	const fn = (value, cell, bounds = `undefined`) => {
		const index = indexFromCell(g, cell, bounds);
		if (index === void 0) throw new Error(`Cell out of range. ${cell.x},${cell.y}`);
		const pixel = to8bit(value);
		const pxIndex = index * 4;
		data[pxIndex] = pixel.r;
		data[pxIndex + 1] = pixel.g;
		data[pxIndex + 2] = pixel.b;
		data[pxIndex + 3] = pixel.opacity ?? 255;
	};
	return fn;
};
/**
* Yields pixels of an image row by row
* @param image 
*/
function* byRow(image) {
	const a = accessor(image);
	const g = grid(image);
	const v = rows(g, {
		x: 0,
		y: 0
	});
	for (const row of v) {
		const pixels = row.map((p) => a(p, `undefined`));
		yield pixels;
	}
}
/**
* Yields pixels of an image column by column
* @param image 
*/
function* byColumn(image) {
	const a = accessor(image);
	const g = grid(image);
	for (let x = 0; x < g.cols; x++) {
		const col = [];
		for (let y = 0; y < g.rows; y++) {
			const p = a({
				x,
				y
			}, `undefined`);
			if (p) col.push(p);
		}
		yield col;
	}
}

//#endregion
//#region packages/visual/src/canvas-helper.ts
/**
* A wrapper for the CANVAS element that scales the canvas for high-DPI displays
* and helps with resizing.
* 
* ```js
* const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both` });
* const { ctx, width, height } = canvas.ctx; // Get drawing context, width & height
* ```
* 
* Draw whenever it is resized using the 'resize' event
* ```js
* canvas.addEventListener(`resize`, ({ctx, size}) => {
*  // Use ctx...  
* });
* ```
* 
* Or provide a function when initialising:
* ```js
* const onResize = (ctx, size) => {
*  // Do drawing
* }
* const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both`, onResize });
* ```
* 
* Automatically draw at animation speeds:
* ```js
* const draw = () => {
* }
* const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both`, draw });
* ```
*/
var CanvasHelper = class extends SimpleEventEmitter {
	el;
	opts;
	#scaler;
	#scalerSize;
	#viewport = EmptyPositioned;
	#logicalSize = Empty;
	#ctx;
	#drawHelper;
	#resizer;
	#disposed = false;
	constructor(domQueryOrEl, opts = {}) {
		super();
		if (!domQueryOrEl) throw new Error(`Param 'domQueryOrEl' is null or undefined`);
		this.el = resolveEl(domQueryOrEl);
		if (this.el.nodeName !== `CANVAS`) throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
		const size = this.el.getBoundingClientRect();
		this.opts = {
			resizeLogic: opts.resizeLogic ?? `none`,
			disablePointerEvents: opts.disablePointerEvents ?? false,
			pixelZoom: opts.pixelZoom ?? (window.devicePixelRatio || 1),
			height: opts.height ?? size.height,
			width: opts.width ?? size.width,
			zIndex: opts.zIndex ?? -1,
			coordinateScale: opts.coordinateScale ?? `both`,
			onResize: opts.onResize,
			clearOnResize: opts.clearOnResize ?? true,
			draw: opts.draw,
			skipCss: opts.skipCss ?? false,
			colourSpace: `srgb`
		};
		this.#scaler = scaler(`both`);
		this.#scalerSize = scaler(`both`, size);
		this.#init();
	}
	getRectangle() {
		return {
			x: 0,
			y: 0,
			...this.#logicalSize
		};
	}
	dispose(reason) {
		if (this.#disposed) return;
		this.#disposed = true;
		if (this.#resizer) {
			this.#resizer.dispose(`CanvasHelper disposing ${reason}`.trim());
			this.#resizer = void 0;
		}
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
	/**
	* Gets the drawable area of the canvas.
	* This accounts for scaling due to high-DPI displays etc.
	* @returns 
	*/
	getPhysicalSize() {
		return {
			width: this.width * this.ratio,
			height: this.height * this.ratio
		};
	}
	/**
	* Creates a drawing helper for the canvas.
	* If one is already created it is reused.
	*/
	getDrawHelper() {
		if (!this.#drawHelper) this.#drawHelper = makeHelper(this.#getContext(), {
			width: this.width,
			height: this.height
		});
	}
	setLogicalSize(logicalSize) {
		guard$1(logicalSize, `logicalSize`);
		const logicalSizeInteger = applyFields((v) => Math.floor(v), logicalSize);
		const ratio = this.opts.pixelZoom;
		this.#scaler = scaler(this.opts.coordinateScale, logicalSize);
		this.#scalerSize = scaler(`both`, logicalSize);
		const pixelScaled = multiplyScalar(logicalSize, ratio);
		this.el.width = pixelScaled.width;
		this.el.height = pixelScaled.height;
		this.el.style.width = logicalSizeInteger.width.toString() + `px`;
		this.el.style.height = logicalSizeInteger.height.toString() + `px`;
		this.#getContext(true);
		if (this.opts.clearOnResize) this.ctx.clearRect(0, 0, this.width, this.height);
		this.#logicalSize = logicalSizeInteger;
		const r = this.opts.onResize;
		if (r) setTimeout(() => {
			r(this.ctx, this.size, this);
		}, 100);
		this.fireEvent(`resize`, {
			ctx: this.ctx,
			size: this.#logicalSize,
			helper: this
		});
	}
	#init() {
		const d = this.opts.draw;
		if (d) {
			const sched = () => {
				d(this.ctx, this.#logicalSize, this);
				requestAnimationFrame(sched);
			};
			setTimeout(() => {
				sched();
			}, 100);
		}
		if (!this.opts.disablePointerEvents) this.#handleEvents();
		const resizeLogic = this.opts.resizeLogic ?? `none`;
		if (resizeLogic === `none`) this.setLogicalSize({
			width: this.opts.width,
			height: this.opts.height
		});
		else {
			const resizerOptions = {
				onSetSize: (size) => {
					if (isEqual(this.#logicalSize, size)) return;
					this.setLogicalSize(size);
				},
				naturalSize: {
					width: this.opts.width,
					height: this.opts.height
				},
				stretch: this.opts.resizeLogic ?? `none`
			};
			this.#resizer = new ElementSizer(this.el, resizerOptions);
		}
		this.#getContext();
	}
	#handleEvents() {
		const handlePointerEvent = (event) => {
			const { offsetX, offsetY } = event;
			const physicalX = offsetX * this.ratio;
			const physicalY = offsetY * this.ratio;
			event = cloneFromFields(event);
			const eventData = {
				physicalX,
				physicalY,
				...event
			};
			switch (event.type) {
				case `pointerup`: {
					this.fireEvent(`pointerup`, eventData);
					break;
				}
				case `pointermove`: {
					this.fireEvent(`pointermove`, eventData);
					break;
				}
				case `pointerdown`: {
					this.fireEvent(`pointerup`, eventData);
					break;
				}
			}
		};
		this.el.addEventListener(`pointermove`, handlePointerEvent);
		this.el.addEventListener(`pointerdown`, handlePointerEvent);
		this.el.addEventListener(`pointerup`, handlePointerEvent);
	}
	/**
	* Clears the canvas.
	* 
	* Shortcut for:
	* `ctx.clearRect(0, 0, this.width, this.height)`
	*/
	clear() {
		if (!this.#ctx) return;
		this.#ctx.clearRect(0, 0, this.width, this.height);
	}
	/**
	* Fills the canvas with a given colour.
	* 
	* Shortcut for:
	* ```js
	* ctx.fillStyle = ``;
	* ctx.fillRect(0, 0, this.width, this.height);
	* ```
	* @param colour Colour
	*/
	fill(colour) {
		if (!this.#ctx) return;
		if (colour) this.#ctx.fillStyle = colour;
		this.#ctx.fillRect(0, 0, this.width, this.height);
	}
	/**
	* Gets the drawing context
	*/
	get ctx() {
		if (this.#ctx === void 0) throw new Error(`Context not available`);
		return this.#getContext();
	}
	get viewport() {
		return this.#viewport;
	}
	/**
	* Gets the logical width of the canvas
	* See also: {@link height}, {@link size}
	*/
	get width() {
		return this.#logicalSize.width;
	}
	/**
	* Gets the logical height of the canvas
	* See also: {@link width}, {@link size}
	*/
	get height() {
		return this.#logicalSize.height;
	}
	/**
	* Gets the logical size of the canvas
	* See also: {@link width}, {@link height}
	*/
	get size() {
		return this.#logicalSize;
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
	drawBounds(strokeStyle = `green`) {
		const ctx = this.#getContext();
		rect(ctx, {
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		}, {
			crossed: true,
			strokeStyle,
			strokeWidth: 1
		});
		rect(ctx, this.#viewport, {
			crossed: true,
			strokeStyle: `silver`,
			strokeWidth: 3
		});
	}
	/**
	* Returns a Scaler that converts from absolute
	* to relative coordinates.
	* This is based on the canvas size.
	* 
	* ```js
	* // Assuming a canvas of 800x500
	* toRelative({ x: 800, y: 600 });  // { x: 1,   y: 1 }
	* toRelative({ x: 0, y: 0 });   // { x: 0,   y: 0 }
	* toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
	* ```
	*/
	get toRelative() {
		return this.#scaler.rel;
	}
	/**
	* Returns a scaler for points based on width & height
	*/
	get toAbsoluteFixed() {
		return this.#scalerSize.abs;
	}
	/**
	* Returns a scaler for points based on width & height
	*/
	get toRelativeFixed() {
		return this.#scalerSize.rel;
	}
	get logicalCenter() {
		return {
			x: this.#logicalSize.width / 2,
			y: this.#logicalSize.height / 2
		};
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
	/**
	* Gets the center coordinate of the canvas
	*/
	get center() {
		return {
			x: this.width / 2,
			y: this.height / 2
		};
	}
	/**
	* Gets the image data for the canvas.
	* Uses the 'physical' canvas size. Eg. A logical size of 400x400 might be
	* 536x536 with a high-DPI display.
	* @returns 
	*/
	getImageData() {
		const size = this.getPhysicalSize();
		const data = this.ctx.getImageData(0, 0, size.width, size.height, { colorSpace: this.opts.colourSpace });
		if (data === null || data === void 0) throw new Error(`Could not get image data from context`);
		return data;
	}
	/**
	* Returns the canvas frame data as a writable grid.
	* When editing, make as many edits as needed before calling
	* `flip`, which writes buffer back to the canvas.
	* ```js
	* const g = helper.getWritableBuffer();
	* // Get {r,g,b,opacity} of pixel 10,10
	* const pixel = g.get({ x: 10, y: 10 });
	* 
	* // Set a colour to pixel 10,10
	* g.set({ r: 0.5, g: 1, b: 0, opacity: 0 }, { x: 10, y: 10 });
	* 
	* // Write buffer to canvas
	* g.flip();
	* ```
	* 
	* Uses 'physical' size of canvas. Eg with a high-DPI screen, this will
	* mean a higher number of rows and columns compared to the logical size.
	* @returns
	*/
	getWritableBuffer() {
		const ctx = this.ctx;
		const data = this.getImageData();
		const grid$1 = grid(data);
		const get = accessor(data);
		const set = setter(data);
		const flip = () => {
			ctx.putImageData(data, 0, 0);
		};
		return {
			grid: grid$1,
			get,
			set,
			flip
		};
	}
};

//#endregion
//#region packages/visual/src/svg/apply.ts
/**
* Applies drawing options to given SVG element.
* Applies: fillStyle
* @param elem Element
* @param opts Drawing options
*/
const applyOpts = (elem, opts) => {
	if (opts.fillStyle) elem.setAttributeNS(null, `fill`, opts.fillStyle);
	if (opts.opacity) elem.setAttributeNS(null, `opacity`, opts.opacity.toString());
};

//#endregion
//#region packages/visual/src/svg/create.ts
/**
* Creates and appends a SVG element.
*
* ```js
* // Create a circle
* const circleEl = createOrResolve(parentEl, `SVGCircleElement`);
* ```
*
* If `queryOrExisting` is specified, it is used as a query to find an existing element. If
* query starts with `#`, this will be set as the element id, if created.
*
* ```js
* // Creates an element with id 'myCircle' if it doesn't exist
* const circleEl = createOrResolve(parentEl, `SVGCircleElement`, `#myCircle`);
* ```
* @param parent Parent element
* @param type Type of SVG element
* @param queryOrExisting Query, eg `#id`
* @returns
*/
const createOrResolve = (parent, type, queryOrExisting, suffix) => {
	let existing = null;
	if (queryOrExisting !== void 0) existing = typeof queryOrExisting === `string` ? parent.querySelector(queryOrExisting) : queryOrExisting;
	if (existing === null) {
		const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
		parent.append(p);
		if (queryOrExisting && typeof queryOrExisting === `string` && queryOrExisting.startsWith(`#`)) p.id = suffix !== void 0 && !queryOrExisting.endsWith(suffix) ? queryOrExisting.slice(1) + suffix : queryOrExisting.slice(1);
		return p;
	}
	return existing;
};

//#endregion
//#region packages/visual/src/colour/generate.ts
/**
* Returns a full HSL colour string (eg `hsl(20,50%,75%)`) based on a index.
* It's useful for generating perceptually different shades as the index increments.
*
* ```
* el.style.backgroundColor = goldenAgeColour(10);
* ```
*
* Saturation and lightness can be specified, as numeric ranges of 0-1.
*
* @param saturation Saturation (0-1), defaults to 0.5
* @param lightness Lightness (0-1), defaults to 0.75
* @param alpha Opacity (0-1), defaults to 1.0
* @returns HSL colour string eg `hsl(20,50%,75%)`
*/
const goldenAngleColour = (index, saturation = .5, lightness$1 = .75, alpha = 1) => {
	resultThrow(numberTest(index, `positive`, `index`), numberTest(saturation, `percentage`, `saturation`), numberTest(lightness$1, `percentage`, `lightness`), numberTest(alpha, `percentage`, `alpha`));
	const hueDeg = index * 137.508;
	const hueRel = hueDeg % 360 / 360;
	return toCssString(scalar(hueRel, saturation, lightness$1, alpha));
};
/**
* Returns a random hue component (0..359)
* 
* ```
* // Generate hue
* const h = randomHue(); // 0-359
*
* // Generate hue and assign as part of a HSL string
* el.style.backgroundColor = `hsl(${randomHue(), 50%, 75%})`;
* ```
* @param rand
* @returns
*/
const randomHue = (rand = Math.random) => rand() * 360;

//#endregion
//#region packages/visual/src/colour/math.ts
/**
* Multiplies the opacity of a colour by `amount`, returning a computed CSS colour.
* 
* ```js
* multiplyOpacity(`red`, 0.5); // Returns a colour string
* ```
* 
* For example, to half the opacity, use `amount: 0.5`.
* Clamps the result to ensure it's between 0..1
* @param colourish Colour
* @param amount Amount
* @returns 
*/
function multiplyOpacity$1(colourish, amount) {
	return withOpacity(colourish, (o) => clamp(o * amount));
}
/**
* Does a computation with the opacity of a colour, returning colour.
* 
* Passes operation to `HslSpace` or `SrgbSpace` depending on space of `colourish`.
* @param colourish Colour
* @param fn Function that takes original opacity as input and returns output opacity
*/
function withOpacity(colourish, fn) {
	const colour = toColour(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity$3(colour, fn);
			break;
		case `srgb`:
			result = withOpacity$1(colour, fn);
			break;
		case `oklch`:
			result = withOpacity$2(colour, fn);
			break;
		default: throw new Error(`Unknown space: '${colour.space}'. Expected hsl, srgb, oklch`);
	}
	if (!result) throw new Error(`Is colour in correct form?`);
	if (typeof colourish === `string`) return toCssColour(result);
	return result;
}
function setOpacity(colourish, opacity) {
	const colour = toColour(colourish);
	colour.opacity = opacity;
	if (typeof colourish === `string`) return toCssColour(colour);
	return colour;
}

//#endregion
//#region packages/visual/src/colour/interpolate.ts
function interpolateInit(colours, destination = `hsl`) {
	if (!Array.isArray(colours)) throw new Error(`Param 'colours' is not an array as expected. Got: ${typeof colours}`);
	if (colours.length < 2) throw new Error(`Param 'colours' should be at least two in length. Got: ${colours.length}`);
	const c = colours.map((colour) => convertScalar(colour, destination));
	return [...pairwise(c)];
}
/**
* Returns a CSS `linear-gradient` with stops corresponding to the given list of `colours`.
* ```js
* element.style.background = Colour.cssLinearGradient(['red','green','blue']);
* ```
* @param colours 
* @returns 
*/
const cssLinearGradient = (colours) => {
	const c = colours.map((c$1) => toCssColour(c$1));
	return `linear-gradient(to right, ${c.join(`, `)})`;
};
/**
* Returns a function that interpolates between two colours. Returns string colour values.
* ```js
* const i = interpolator(`blue`, `red`);
* i(0.5); // Get the colour at 50%, as a string.
* ```
* 
* To work with structured colour values, use one of the space's `interpolate` functions.
* @param colourA 
* @param colourB 
* @param options 
* @returns 
*/
const interpolator = (colourA, colourB, options = {}) => {
	const space = options.space ?? `oklch`;
	const direction = options.direction ?? `shorter`;
	let inter;
	switch (space) {
		case `hsl`:
			inter = interpolator$3(convert$1(colourA, `hsl-scalar`), convert$1(colourB, `hsl-scalar`), direction);
			break;
		case `srgb`:
			inter = interpolator$1(convert$1(colourA, `srgb-scalar`), convert$1(colourB, `srgb-scalar`));
			break;
		default: inter = interpolator$2(convert$1(colourA, `oklch-scalar`), convert$1(colourB, `oklch-scalar`), direction);
	}
	return (amount) => toCssColour(inter(amount));
};
/**
* Produces a stepped scale of colours.
* 
* ```js
* // A scale of from red to green, with three colours in-between
* const steps = Colour.scale([ `red`, `green` ], { stepsBetween: 3 });
* for (const step of steps) {
*  // A CSS colour string
* }
* ```
* 
* {@link cssLinearGradient} can produce a smooth gradient in CSS on the basis
* of the stepped colours.
* @param colours 
* @param opts 
* @returns 
*/
const scale = (colours, opts = {}) => {
	const direction = opts.direction ?? `shorter`;
	const space = opts.space ?? `oklch`;
	const pieces = interpolateInit(colours, space);
	let stepsBetween = 0;
	if (typeof opts.stepsBetween === `number`) {
		stepsBetween = opts.stepsBetween;
		if (stepsBetween < 1) throw new Error(`Param 'stepsBetween' must be at least 1`);
	} else if (typeof opts.stepsTotal === `number`) {
		if (opts.stepsTotal <= colours.length) throw new Error(`Param 'stepsTotal' must be greater than number of provided colour stops (${colours.length}) +1 per stop`);
		const totalSteps = opts.stepsTotal - colours.length;
		stepsBetween = Math.floor(totalSteps / pieces.length);
	}
	const steps = pieces.map((piece) => {
		const pieceSteps = createSteps(piece[0], piece[1], {
			steps: stepsBetween,
			space,
			direction,
			exclusive: true
		});
		pieceSteps.push(piece[1]);
		return pieceSteps;
	});
	const firstPiece = pieces[0];
	steps.unshift([firstPiece[0]]);
	return steps.flat().map((c) => toCssColour(c));
};
/**
* Creates discrete colour steps between two colours. 
* 
* Start and end colours are included (and counted as a step) unless `exclusive` is set to _true_
* 
* ```js
* // Array of five HslScalar 
* createSteps(`red`,`blue`, { steps: 5 });
* ```
* 
* Defaults to the oklch colour space, 5 steps and non-exclusive.
* @param a Start colour
* @param b End colour
* @param options
* @returns 
*/
function createSteps(a, b, options = {}) {
	const exclusive = options.exclusive ?? false;
	const steps = options.steps ?? 5;
	const space = options.space ?? `oklch`;
	const direction = options.direction ?? `shorter`;
	if (!exclusive && steps < 2) throw new Error(`Param 'steps' should be at least 2 when 'exclusive' is false`);
	if (exclusive && steps < 1) throw new Error(`Param 'steps' should be at least 1 when 'exlusive' is true`);
	const aa = convertScalar(a, space);
	const bb = convertScalar(b, space);
	let inter;
	switch (space) {
		case `hsl`:
			inter = interpolator$3(aa, bb, direction);
			break;
		case `oklch`:
			inter = interpolator$2(aa, bb, direction);
			break;
		case `srgb`:
			inter = interpolator$1(aa, bb);
			break;
		default: throw new Error(`Colour space '${space}' not supported for interpolation.`);
	}
	if (!inter) throw new Error(`Could not create interpolator for space: ${space}`);
	let stepBy = 0;
	let startAt = 0;
	let endAt = 1;
	if (exclusive) {
		stepBy = 1 / (steps + 1);
		startAt = stepBy;
		endAt = 1 - stepBy;
	} else stepBy = 1 / (steps - 1);
	const results = [];
	for (let interpolateAmount = startAt; interpolateAmount <= endAt; interpolateAmount += stepBy) results.push(inter(interpolateAmount));
	return results;
}

//#endregion
//#region packages/visual/src/colour/index.ts
var colour_exports = {};
__export(colour_exports, {
	HslSpace: () => hsl_exports,
	OklchSpace: () => oklch_exports,
	SrgbSpace: () => srgb_exports,
	convert: () => convert$1,
	convertScalar: () => convertScalar,
	convertToString: () => convertToString,
	createSteps: () => createSteps,
	cssDefinedHexColours: () => cssDefinedHexColours,
	cssLinearGradient: () => cssLinearGradient,
	fromCssColour: () => fromCssColour,
	goldenAngleColour: () => goldenAngleColour,
	guard: () => guard$2,
	interpolator: () => interpolator,
	isColourish: () => isColourish,
	isHsl: () => isHsl,
	isOkLch: () => isOkLch,
	isRgb: () => isRgb,
	multiplyOpacity: () => multiplyOpacity$1,
	randomHue: () => randomHue,
	resolveCss: () => resolveCss,
	rgbToHsl: () => rgbToHsl,
	scale: () => scale,
	setOpacity: () => setOpacity,
	toColour: () => toColour,
	toCssColour: () => toCssColour,
	toLibraryColour: () => toLibraryColour,
	toStringFirst: () => toStringFirst,
	tryParseObjectToHsl: () => tryParseObjectToHsl,
	tryParseObjectToRgb: () => tryParseObjectToRgb,
	withOpacity: () => withOpacity
});

//#endregion
//#region packages/visual/src/colour/conversion.ts
/**
* Converts an object or string representation of colour to ixfx's
* structured colour.
* Use {@link convertToString} if you want a CSS colour string instead.
* @param colour 
* @param destination 
* @returns 
*/
function convert$1(colour, destination) {
	if (destination === `hsl-scalar`) {
		if (typeof colour === `string` || isHsl(colour) || isRgb(colour)) return toScalar$2(colour);
	} else if (destination === `hsl-absolute`) {
		if (typeof colour === `string` || isHsl(colour)) return toAbsolute$1(colour);
	} else if (destination === `oklch-scalar`) {
		if (typeof colour === `string` || isOkLch(colour)) return toScalar$1(colour);
	} else if (destination === `oklch-absolute`) {
		if (typeof colour === `string` || isOkLch(colour)) return toAbsolute(colour);
	} else if (destination === `srgb-8bit`) {
		if (typeof colour === `string` || isRgb(colour)) return to8bit(colour);
	} else if (destination === `srgb-scalar`) {
		if (typeof colour === `string` || isRgb(colour)) return toScalar(colour);
	} else throw new Error(`Destination '${destination}' not supported for input: ${JSON.stringify(colour)}`);
	return convert$1(toCssColour(colour), destination);
}
/**
* Like {@link convert}, but result is a CSS colour string
* @param colour 
* @param destination 
* @returns 
*/
function convertToString(colour, destination) {
	const c = convert$1(colour, destination);
	return toCssColour(c);
}
function convertScalar(colour, destination) {
	if (destination === `oklch`) return convert$1(colour, `oklch-scalar`);
	if (destination === `srgb`) return convert$1(colour, `srgb-scalar`);
	if (destination === `hsl`) return convert$1(colour, `hsl-scalar`);
	throw new Error(`Unknown destination: '${destination}'`);
}
const toCssColour = (colour) => {
	if (typeof colour === `string`) return colour;
	if (isHsl(colour)) return toCssString(colour);
	if (isRgb(colour)) return toCssString$1(colour);
	if (isOkLch(colour)) return toCssString$2(colour);
	const asRgb = tryParseObjectToRgb(colour);
	if (asRgb) return toCssString$1(asRgb);
	const asHsl = tryParseObjectToHsl(colour);
	if (asHsl) return toCssString(asHsl);
	throw new Error(`Unknown colour format: '${JSON.stringify(colour)}'`);
};
const toLibraryColour = (colour) => {
	const asCss = toCssColour(colour);
	return new index_default(asCss);
};
const guard$2 = (colour) => {
	switch (colour.space) {
		case `hsl`:
			guard$5(colour);
			break;
		case `srgb`:
			guard$3(colour);
			break;
		case `oklch`:
			guard$4(colour);
			break;
		default: throw new Error(`Unsupported colour space: '${colour.space}'`);
	}
};
const toColour = (colourish) => {
	if (!isColourish(colourish)) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc. Got: ${JSON.stringify(colourish)}`);
	let c;
	if (typeof colourish === `string`) c = fromCssColour(colourish);
	else c = colourish;
	if (c === void 0) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc.`);
	guard$2(c);
	return c;
};
/**
* Returns a CSS-ready string
* representation.
* ```js
* element.style.backgroundColor = resolveToString(`red`);
* ```
* 
* Tries each parameter in turn, returning the value
* for the first that resolves. This can be useful for
* having fallback values.
* 
* ```js
* // Try a CSS variable, a object property or finally fallback to red.
* element.style.backgroundColor = toStringFirst('--some-var', opts.background, `red`);
* ```
* @param colours Array of colours to resolve
* @returns 
*/
const toStringFirst = (...colours) => {
	for (const colour of colours) {
		if (colour === void 0) continue;
		if (colour === null) continue;
		try {
			const c = toColour(colour);
			return toCssColour(c);
		} catch {}
	}
	return `rebeccapurple`;
};
function rgbToHsl(rgb, scalarResult) {
	let { r, g, b } = rgb;
	const opacity = rgb.opacity ?? 1;
	if (rgb.unit === `8bit`) {
		r /= 255;
		g /= 255;
		b /= 255;
	}
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = (max + min) / 2;
	let s = h;
	const l = h;
	if (max === min) if (scalarResult) return scalar(0, 0, 0, opacity);
	else return absolute$1(0, 0, 0, opacity);
	const d = max - min;
	s = l >= .5 ? d / (2 - (max + min)) : d / (max + min);
	switch (max) {
		case r:
			h = ((g - b) / d + 0) * 60;
			break;
		case g:
			h = ((b - r) / d + 2) * 60;
			break;
		case b:
			h = ((r - g) / d + 4) * 60;
			break;
	}
	if (scalarResult) return scalar(h / 360, s, l, opacity);
	else return absolute$1(h, s * 100, l * 100, opacity);
}

//#endregion
//#region packages/visual/src/svg/stroke.ts
/**
* Applies drawing options to given SVG element.
* Applies: strokeStyle, strokeWidth, strokeDash, strokeLineCap
* @param elem Element
* @param opts
*/
const applyStrokeOpts = (elem, opts) => {
	if (opts.strokeStyle) elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
	if (opts.strokeWidth) elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
	if (opts.strokeDash) elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
	if (opts.strokeLineCap) elem.setAttribute(`stroke-linecap`, opts.strokeLineCap);
};

//#endregion
//#region packages/visual/src/svg/elements.ts
/**
* Updates an existing `SVGCircleElement` with potentially updated circle data and drawing options
* @param elem Element
* @param circle Circle
* @param opts Drawing options
* @returns SVGCircleElement
*/
const circleUpdate = (elem, circle$2, opts) => {
	elem.setAttributeNS(null, `cx`, circle$2.x.toString());
	elem.setAttributeNS(null, `cy`, circle$2.y.toString());
	elem.setAttributeNS(null, `r`, circle$2.radius.toString());
	if (opts) applyOpts(elem, opts);
	if (opts) applyStrokeOpts(elem, opts);
	return elem;
};
/**
* Creates or reuses a `SVGCircleElement`.
*
* To update an existing element, use `circleUpdate`
* @param circle
* @param parent
* @param opts
* @param queryOrExisting
* @returns
*/
const circle = (circle$2, parent, opts, queryOrExisting) => {
	const p = createOrResolve(parent, `circle`, queryOrExisting);
	return circleUpdate(p, circle$2, opts);
};

//#endregion
//#region packages/visual/src/pointer-visualise.ts
/**
* Visualises pointer events within a given element.
*
* ```js
* // Show pointer events for whole document
* pointerVis(document);
* ```
*
* Note you may need to set the following CSS properties on the target element:
*
* ```css
* touch-action: none;
* user-select: none;
* overscroll-behavior: none;
* ```
*
* Options
* * touchRadius/mouseRadius: size of circle for these kinds of pointer events
* * trace: if true, intermediate events are captured and displayed
* @param elOrQuery Element to monitor
* @param options Options
*/
const pointerVisualise = (elOrQuery, options = {}) => {
	const touchRadius = options.touchRadius ?? 45;
	const mouseRadius = options.touchRadius ?? 20;
	const trace = options.trace ?? false;
	const hue = options.hue ?? 100;
	const startFillStyle = `hsla(${hue}, 100%, 10%, 10%)`;
	let currentHue = hue;
	const el = resolveEl(elOrQuery);
	const tracker = new PointsTracker({ storeIntermediate: trace });
	const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
	svg.id = `pointerVis`;
	svg.style.zIndex = `-1000`;
	svg.style.position = `fixed`;
	svg.style.top = `0`;
	svg.style.left = `0`;
	svg.style.width = `100%`;
	svg.style.height = `100%`;
	svg.style.boxSizing = `border-box`;
	svg.style.border = `3px solid red`;
	svg.style.pointerEvents = `none`;
	svg.style.touchAction = `none`;
	const er = ElementSizer.svgViewport(svg);
	let pointerCount = 0;
	const lostPointer = (event) => {
		const id = event.pointerId.toString();
		tracker.delete(id);
		currentHue = hue;
		svg.querySelector(`#pv-start-${id}`)?.remove();
		for (let index = 0; index < pointerCount + 10; index++) svg.querySelector(`#pv-progress-${id}-${index}`)?.remove();
		pointerCount = 0;
	};
	const trackPointer = async (event) => {
		const id = event.pointerId.toString();
		const pt = {
			x: event.x,
			y: event.y
		};
		const type = event.pointerType;
		if (event.type === `pointermove` && !tracker.has(id)) return;
		const info = await tracker.seen(event.pointerId.toString(), {
			x: event.clientX,
			y: event.clientY
		});
		if (info.values.length === 1) {
			const el$1 = circle({
				...info.values[0],
				radius: type === `touch` ? touchRadius : mouseRadius
			}, svg, { fillStyle: startFillStyle }, `#pv-start-${id}`);
			el$1.style.pointerEvents = `none`;
			el$1.style.touchAction = `none`;
		}
		const fillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
		const el2 = circle({
			...pt,
			radius: type === `touch` ? touchRadius : mouseRadius
		}, svg, { fillStyle }, `#pv-progress-${id}-${info.values.length}`);
		el2.style.pointerEvents = `none`;
		el2.style.touchAction = `none`;
		currentHue += 1;
		pointerCount = info.values.length;
	};
	document.body.append(svg);
	el.addEventListener(`pointerdown`, trackPointer);
	el.addEventListener(`pointermove`, trackPointer);
	el.addEventListener(`pointerup`, lostPointer);
	el.addEventListener(`pointerleave`, lostPointer);
	el.addEventListener(`contextmenu`, (event) => {
		event.preventDefault();
	});
};

//#endregion
//#region packages/visual/src/named-colour-palette.ts
var named_colour_palette_exports = {};
__export(named_colour_palette_exports, { create: () => create });
const create = (fallbacks) => new NamedColourPaletteImpl(fallbacks);
var NamedColourPaletteImpl = class {
	#store = /* @__PURE__ */ new Map();
	#aliases = /* @__PURE__ */ new Map();
	fallbacks;
	#lastFallback = 0;
	#elementBase;
	constructor(fallbacks) {
		if (fallbacks !== void 0) this.fallbacks = fallbacks;
		else this.fallbacks = [
			`red`,
			`blue`,
			`green`,
			`orange`
		];
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
		const variableName = `--` + key;
		let fromCss$3 = getComputedStyle(this.#elementBase).getPropertyValue(variableName).trim();
		if (fromCss$3 === void 0 || fromCss$3.length === 0) {
			if (fallback !== void 0) return fallback;
			fromCss$3 = this.fallbacks[this.#lastFallback];
			this.#lastFallback++;
			if (this.#lastFallback === this.fallbacks.length) this.#lastFallback = 0;
		}
		return fromCss$3;
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

//#endregion
//#region packages/visual/src/video.ts
var video_exports = {};
__export(video_exports, {
	capture: () => capture,
	frames: () => frames,
	manualCapture: () => manualCapture
});
/**
* Generator that yields frames from a video element as [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
*
* ```js
* import { Video } from '@ixfx/visual.js'
*
* const ctx = canvasEl.getContext(`2d`);
* for await (const frame of Video.frames(videoEl)) {
*   // TODO: Some processing of pixels
*
*   // Draw image on to the visible canvas
*   ctx.putImageData(frame, 0, 0);
* }
* ```
*
* Under the hood it creates a hidden canvas where frames are drawn to. This is necessary
* to read back pixel data. An existing canvas can be used if it is passed in as an option.
*
* Options:
* * `canvasEl`: CANVAS element to use as a buffer (optional)
* * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
* * `showCanvas`: Whether buffer canvas will be shown (false by default)
* @param sourceVideoEl
* @param opts
*/
async function* frames(sourceVideoEl, opts = {}) {
	const maxIntervalMs = opts.maxIntervalMs ?? 0;
	const showCanvas = opts.showCanvas ?? false;
	let canvasEl = opts.canvasEl;
	let w, h;
	w = h = 0;
	if (canvasEl === void 0) {
		canvasEl = document.createElement(`CANVAS`);
		canvasEl.classList.add(`ixfx-frames`);
		if (!showCanvas) canvasEl.style.display = `none`;
		document.body.appendChild(canvasEl);
	}
	const updateSize = () => {
		if (canvasEl === void 0) return;
		w = sourceVideoEl.videoWidth;
		h = sourceVideoEl.videoHeight;
		canvasEl.width = w;
		canvasEl.height = h;
	};
	let c = null;
	const looper = delayLoop(maxIntervalMs);
	for await (const _ of looper) {
		if (w === 0 || h === 0) updateSize();
		if (w === 0 || h === 0) continue;
		c ??= canvasEl.getContext(`2d`);
		if (c === null) return;
		c.drawImage(sourceVideoEl, 0, 0, w, h);
		const pixels = c.getImageData(0, 0, w, h);
		yield pixels;
	}
}
/**
* Captures frames from a video element. It can send pixel data to a function or post to a worker script.
*
* @example Using a function
* ```js
* // Capture from a VIDEO element, handling frame data
* // imageData is ImageData type: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
* Video.capture(sourceVideoEl, {
*  onFrame(imageData => {
*    // Do something with pixels...
*  });
* });
* ```
*
* @example Using a worker
* ```js
* Video.capture(sourceVideoEl, {
*  workerScript: `./frameProcessor.js`
* });
* ```
*
* In frameProcessor.js:
* ```
* const process = (frame) => {
*  // ...process frame
*
*  // Send image back?
*  self.postMessage({frame});
* };
*
* self.addEventListener(`message`, evt => {
*   const {pixels, width, height} = evt.data;
*   const frame = new ImageData(new Uint8ClampedArray(pixels),
*     width, height);
*
*   // Process it
*   process(frame);
* });
* ```
*
* Options:
* * `canvasEl`: CANVAS element to use as a buffer (optional)
* * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
* * `showCanvas`: Whether buffer canvas will be shown (false by default)
* * `workerScript`: If this specified, this URL will be loaded as a Worker, and frame data will be automatically posted to it
*
* Implementation: frames are captured using a animation-speed loop to a hidden canvas. From there
* the pixel data is extracted and sent to either destination. In future the intermediate drawing to a
* canvas could be skipped if it becomes possible to get pixel data from an ImageBitmap.
* @param sourceVideoEl Source VIDEO element
* @param opts
* @returns
*/
const capture = (sourceVideoEl, opts = {}) => {
	const maxIntervalMs = opts.maxIntervalMs ?? 0;
	const showCanvas = opts.showCanvas ?? false;
	const onFrame = opts.onFrame;
	const w = sourceVideoEl.videoWidth;
	const h = sourceVideoEl.videoHeight;
	const canvasEl = document.createElement(`CANVAS`);
	canvasEl.classList.add(`ixfx-capture`);
	if (!showCanvas) canvasEl.style.display = `none`;
	canvasEl.width = w;
	canvasEl.height = h;
	let c = null;
	let worker;
	if (opts.workerScript) worker = new Worker(opts.workerScript);
	const getPixels = worker || onFrame;
	if (!getPixels && !showCanvas) console.warn(`Video will be captured to hidden element without any processing. Is this what you want?`);
	const loop = continuously(() => {
		if (c === null) c = canvasEl.getContext(`2d`);
		if (c === null) return;
		c.drawImage(sourceVideoEl, 0, 0, w, h);
		let pixels;
		if (getPixels) pixels = c.getImageData(0, 0, w, h);
		if (worker) worker.postMessage({
			pixels: pixels.data.buffer,
			width: w,
			height: h,
			channels: 4
		}, [pixels.data.buffer]);
		if (onFrame) try {
			onFrame(pixels);
		} catch (e) {
			console.error(e);
		}
	}, maxIntervalMs);
	return {
		start: () => {
			loop.start();
		},
		cancel: () => {
			loop.cancel();
		},
		canvasEl
	};
};
const manualCapture = (sourceVideoEl, opts = {}) => {
	const showCanvas = opts.showCanvas ?? false;
	const w = sourceVideoEl.videoWidth;
	const h = sourceVideoEl.videoHeight;
	const definedCanvasEl = opts.canvasEl !== void 0;
	let canvasEl = opts.canvasEl;
	if (!canvasEl) {
		canvasEl = document.createElement(`CANVAS`);
		canvasEl.classList.add(`ixfx-capture`);
		document.body.append(canvasEl);
		if (!showCanvas) canvasEl.style.display = `none`;
	}
	canvasEl.width = w;
	canvasEl.height = h;
	const capture$1 = () => {
		let c$1;
		if (!c$1) c$1 = canvasEl.getContext(`2d`, { willReadFrequently: true });
		if (!c$1) throw new Error(`Could not create graphics context`);
		c$1.drawImage(sourceVideoEl, 0, 0, w, h);
		const pixels = c$1.getImageData(0, 0, w, h);
		pixels.currentTime = sourceVideoEl.currentTime;
		if (opts.postCaptureDraw) opts.postCaptureDraw(c$1, w, h);
		return pixels;
	};
	const dispose = () => {
		if (definedCanvasEl) return;
		try {
			canvasEl.remove();
		} catch (_) {}
	};
	const c = {
		canvasEl,
		capture: capture$1,
		dispose
	};
	return c;
};

//#endregion
//#region packages/visual/src/index.ts
try {
	if (typeof window !== `undefined`) window.ixfx = {
		...window.ixfx,
		Visuals: {
			NamedColourPalette: named_colour_palette_exports,
			Colour: colour_exports,
			Video: video_exports
		}
	};
} catch {}

//#endregion
export { CanvasHelper, colour_exports as Colour, drawing_exports as Drawing, image_data_grid_exports as ImageDataGrid, video_exports as Video, pointerVisualise };
//# sourceMappingURL=visual.js.map