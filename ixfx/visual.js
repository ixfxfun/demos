import { __export } from "./chunk-51aI8Tpl.js";
import { arrayTest, numberInclusiveRangeTest, numberTest, resultThrow } from "./src-BhN8B7uk.js";
import { clamp } from "./src-Cyp-w-xE.js";
import { cloneFromFields, continuously } from "./src-Cjy4Jx5o.js";
import { StackImmutable, delayLoop } from "./src-Ct16kpGA.js";
import { SimpleEventEmitter } from "./maps-CyRBIIF3.js";
import { Empty, EmptyPositioned, PointsTracker, angleConvert, angleParse, applyFields, corners, guard as guard$1, guard$1 as guard, indexFromCell, isCubicBezier, isEqual, isLine, isQuadraticBezier, multiplyScalar, rows, scaler } from "./src-CHmQoYVM.js";
import "./bezier-BdPT6F7P.js";
import { ElementSizer, resolveEl } from "./src-BcsRx2nU.js";
import "./dist-B0diH7Mh.js";
import { convert, extractColorParts, hex2hsl, hex2oklch, hex2rgb, multiplyOpacity } from "./src-COIiQ9nR.js";

//#region packages/visual/src/drawing.ts
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
		if (opts.debug) pointLabels(ctx, corners(d), void 0, [
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

//#endregion
//#region packages/visual/src/colour/hsl.ts
var hsl_exports = {};
__export(hsl_exports, {
	fromCssAbsolute: () => fromCssAbsolute$1,
	fromCssScalar: () => fromCssScalar$1,
	fromHexString: () => fromHexString$2,
	generateScalar: () => generateScalar$1,
	guard: () => guard$5,
	toAbsolute: () => toAbsolute$1,
	toCssString: () => toCssString$2,
	toScalar: () => toScalar$2,
	withOpacity: () => withOpacity$2
});
/**
* Scales the opacity value of an input HSL value
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
const hslTransparent = Object.freeze({
	h: 0,
	s: 0,
	l: 0,
	opacity: 0,
	unit: `absolute`,
	space: `hsl`
});
const fromHexString$2 = (hexString) => fromLibrary$2(hex2hsl(hexString));
const fromCssAbsolute$1 = (value, options = {}) => {
	value = value.toLowerCase();
	if (value.startsWith(`#`)) return fromHexString$2(value);
	if (value === `transparent`) return hslTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$2(cssDefinedHexColours[value]);
	if (!value.startsWith(`hsl(`) && !value.startsWith(`hsla(`)) try {
		const converted = convert(value, `hsl`);
		value = converted;
	} catch (e) {
		if (options.fallbackString) value = options.fallbackString;
		else throw e;
	}
	const c = extractColorParts(value);
	if (c.model !== `hsl`) {
		if (options.fallbackColour) return options.fallbackColour;
		throw new Error(`Expecting HSL colour space. Got: ${c.model}`);
	}
	return fromLibrary$2(c, options);
};
const fromCssScalar$1 = (value, options = {}) => toScalar$2(fromCssAbsolute$1(value, options));
const toCssString$2 = (hsl) => {
	const abs = toAbsolute$1(hsl);
	let css = `hsl(${abs.h}deg ${abs.s}% ${abs.l}%`;
	if (`opacity` in abs && abs.opacity !== void 0 && abs.opacity < 100) css += ` / ${abs.opacity}%`;
	css += ")";
	return css;
};
const fromLibrary$2 = (hsl, parsingOptions = {}) => {
	if (typeof hsl === `undefined` || hsl === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	resultThrow(numberInclusiveRangeTest(hsl.h, 0, 360, `h`), numberInclusiveRangeTest(hsl.s, 0, 100, `s`), numberInclusiveRangeTest(hsl.l, 0, 100, `l`), () => hsl.alpha !== void 0 ? numberInclusiveRangeTest(hsl.alpha, 0, 100, `alpha`) : {
		success: true,
		value: hsl
	});
	return {
		h: hsl.h,
		s: hsl.s,
		l: hsl.l,
		opacity: (hsl.alpha ?? 1) * 100,
		unit: `absolute`,
		space: `hsl`
	};
};
const toAbsolute$1 = (hsl) => {
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
const generateScalar$1 = (absoluteHslOrVariable, saturation = 1, lightness = .5, opacity = 1) => {
	if (typeof absoluteHslOrVariable === `string`) {
		if (absoluteHslOrVariable.startsWith(`--`)) absoluteHslOrVariable = getComputedStyle(document.body).getPropertyValue(absoluteHslOrVariable).trim();
	}
	const hue = angleParse(absoluteHslOrVariable);
	if (saturation > 1) throw new TypeError(`Param 'saturation' must be between 0..1`);
	if (lightness > 1) throw new TypeError(`Param 'lightness' must be between 0..1`);
	if (opacity > 1) throw new TypeError(`Param 'opacity' must be between 0..1`);
	const hueDeg = angleConvert(hue, `deg`).value / 360;
	return {
		h: hueDeg,
		s: saturation,
		l: lightness,
		opacity,
		unit: `scalar`,
		space: `hsl`
	};
};
const toScalar$2 = (hsl) => {
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
	if (colour.startsWith(`#`)) return fromHexString$1(colour);
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return fromHexString$1(cssDefinedHexColours[colour]);
	if (colour.startsWith(`--`)) {
		const fromCss = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss.length === 0 || fromCss === null) throw new Error(`Variable missing: ${colour}`);
		return fromCssColour(fromCss);
	}
	colour = colour.toLowerCase();
	if (colour.startsWith(`hsl(`) || colour.startsWith(`hsla(`)) return fromCssAbsolute$1(colour);
	if (colour.startsWith(`rgb(`) || colour.startsWith(`rgba(`)) return fromCss8bit(colour);
	throw new Error(`String colour is not a hex colour, CSS variable nor well-defined colour name: '${colour}'`);
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
	fromCss8bit: () => fromCss8bit,
	fromHexString: () => fromHexString$1,
	guard: () => guard$4,
	to8bit: () => to8bit,
	toCssString: () => toCssString$1,
	toScalar: () => toScalar$1,
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
const fromHexString$1 = (hexString) => fromLibrary$1(hex2rgb(hexString));
const srgbTansparent = Object.freeze({
	r: 0,
	g: 0,
	b: 0,
	opacity: 0,
	unit: `8bit`,
	space: `srgb`
});
const fromCss8bit = (value, options = {}) => {
	value = value.toLowerCase();
	if (value.startsWith(`#`)) return fromHexString$1(value);
	if (value === `transparent`) return srgbTansparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$1(cssDefinedHexColours[value]);
	if (!value.startsWith(`rgb(`) && !value.startsWith(`rgba(`)) try {
		const converted = convert(value, `rgb`);
		value = converted;
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	const c = extractColorParts(value);
	if (c.model !== `rgb`) throw new Error(`Expecting RGB colour space. Got: ${c.model}`);
	return fromLibrary$1(c);
};
const toCssString$1 = (rgb) => {
	guard$4(rgb);
	switch (rgb.unit) {
		case `8bit`:
			if (rgb.opacity === void 0 || rgb.opacity === 255) return `rgb(${rgb.r} ${rgb.b} ${rgb.g})`;
			return `rgb(${rgb.r} ${rgb.b} ${rgb.g} / ${(rgb.opacity ?? 255) / 255})`;
		case `scalar`:
			if (rgb.opacity === void 0 || rgb.opacity === 1) return `rgb(${rgb.r * 100}% ${rgb.b * 100}% ${rgb.g * 100}%)`;
			return `rgb(${rgb.r * 100}% ${rgb.b * 100}% ${rgb.g * 100}% / ${(rgb.opacity ?? 1) * 100}%)`;
		default: throw new Error(`Unknown unit: ${rgb.unit}`);
	}
};
const fromLibrary$1 = (rgb) => {
	return {
		r: rgb.r,
		g: rgb.g,
		b: rgb.b,
		opacity: rgb.alpha ?? 255,
		unit: `8bit`,
		space: `srgb`
	};
};
const to8bit = (rgb) => {
	guard$4(rgb);
	if (rgb.unit === `8bit`) return rgb;
	return {
		r: rgb.r * 255,
		g: rgb.g * 255,
		b: rgb.b * 255,
		opacity: rgb.opacity ?? 255,
		unit: `8bit`,
		space: `srgb`
	};
};
const toScalar$1 = (rgb) => {
	guard$4(rgb);
	if (rgb.unit === `scalar`) return rgb;
	return {
		r: rgb.r / 255,
		g: rgb.g / 255,
		b: rgb.b / 255,
		opacity: (rgb.opacity ?? 1) / 255,
		unit: `scalar`,
		space: `srgb`
	};
};
const guard$4 = (rgb) => {
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
//#region packages/visual/src/colour/types.ts
const isHsl = (v) => {
	if (typeof v === `object`) {
		if (!(`h` in v && `s` in v && `l` in v)) return false;
		if (!(`unit` in v)) return false;
		if (`space` in v) {
			if (v.space !== `hsl`) return false;
		}
	}
	return false;
};
const isRgb = (v) => {
	if (typeof v === `object`) {
		if (!(`r` in v && `g` in v && `b` in v)) return false;
		if (!(`unit` in v)) return false;
		if (`space` in v) {
			if (v.space !== `srgb`) return false;
		}
	}
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
const isLch = (v) => {
	if (typeof v === `object`) {
		if (!(`l` in v && `c` in v && `h` in v)) return false;
		if (!(`unit` in v)) return false;
		if (`space` in v) {
			if (v.space !== `lch` && v.space !== `oklch`) return false;
		}
	}
	return false;
};
const isColourish = (v) => {
	if (typeof v === `string`) return true;
	if (typeof v !== `object`) return false;
	if (isHsl(v)) return true;
	if (isLch(v)) return true;
	if (isRgb(v)) return true;
	return false;
};

//#endregion
//#region packages/visual/src/colour/conversion.ts
const toCssColour = (colour) => {
	if (typeof colour === `string`) return colour;
	if (isHsl(colour)) return toCssString$2(colour);
	if (isRgb(colour)) return toCssString$1(colour);
	const asRgb = tryParseObjectToRgb(colour);
	if (asRgb) return toCssString$1(asRgb);
	const asHsl = tryParseObjectToHsl(colour);
	if (asHsl) return toCssString$2(asHsl);
	throw new Error(`Unknown colour format: '${JSON.stringify(colour)}'`);
};
const convert$1 = (colour, destination) => {
	if (destination === `srgb`) destination = `rgb`;
	return convert(colour, destination);
};
const guard$3 = (colour) => {
	switch (colour.space) {
		case `hsl`:
			guard$5(colour);
			break;
		case `srgb`:
			guard$4(colour);
			break;
		default: throw new Error(`Unknown colour space: '${colour.space}'`);
	}
};
const toColour = (colourish) => {
	if (!isColourish(colourish)) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc.`);
	let c;
	if (typeof colourish === `string`) c = fromCssColour(colourish);
	else c = colourish;
	if (c === void 0) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc.`);
	guard$3(c);
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
		let fromCss = getComputedStyle(this.#elementBase).getPropertyValue(variableName).trim();
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
const goldenAngleColour = (index, saturation = .5, lightness = .75, alpha = 1) => {
	resultThrow(numberTest(index, `positive`, `index`), numberTest(saturation, `percentage`, `saturation`), numberTest(lightness, `percentage`, `lightness`), numberTest(alpha, `percentage`, `alpha`));
	const hue = index * 137.508;
	return alpha === 1 ? `hsl(${hue},${saturation * 100}%,${lightness * 100}%)` : `hsl(${hue},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
/**
* Returns a random hue component (0..359)
* ```
* // Generate hue
* const h =randomHue(); // 0-359
*
* // Generate hue and assign as part of a HSL string
* el.style.backgroundColor = `hsl(${randomHue(), 50%, 75%})`;
* ```
* @param rand
* @returns
*/
const randomHue = (rand = Math.random) => {
	const r = rand();
	return r * 360;
};

//#endregion
//#region packages/visual/src/colour/math.ts
function multiplyOpacity$1(colourish, amount) {
	return withOpacity(colourish, (o) => clamp(o * amount));
}
function withOpacity(colourish, fn) {
	const colour = toColour(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity$2(colour, fn);
			break;
		case `srgb`:
			result = withOpacity$1(colour, fn);
			break;
		default: throw new Error(`Unknown space: '${colour.space}'. Expected hsl, srgb, oklch`);
	}
	if (!result) throw new Error(`Is colour in correct form?`);
	if (typeof colourish === `string`) return toCssColour(result);
	return result;
}

//#endregion
//#region packages/visual/src/colour/oklch.ts
var oklch_exports = {};
__export(oklch_exports, {
	fromCssAbsolute: () => fromCssAbsolute,
	fromCssScalar: () => fromCssScalar,
	fromHexString: () => fromHexString,
	generateScalar: () => generateScalar,
	guard: () => guard$2,
	toAbsolute: () => toAbsolute,
	toCssString: () => toCssString,
	toScalar: () => toScalar
});
const guard$2 = (lch) => {
	const { l, c, h, opacity, space, unit } = lch;
	if (space !== `oklch`) throw new Error(`Space is expected to be 'oklch'. Got: ${space}`);
	if (unit === `absolute`) resultThrow(numberTest(l, `percentage`, `l`), numberTest(c, `percentage`, `c`), numberTest(h, `percentage`, `h`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 100, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(l, `percentage`, `l`), numberTest(c, `percentage`, `c`), numberTest(h, `percentage`, `h`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
};
const fromLibrary = (lch, parsingOptions = {}) => {
	if (typeof lch === `undefined` || lch === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	resultThrow(numberInclusiveRangeTest(lch.l, 0, 360, `l`), numberInclusiveRangeTest(lch.c, 0, 100, `c`), numberInclusiveRangeTest(lch.h, 0, 100, `h`), () => lch.alpha !== void 0 ? numberInclusiveRangeTest(lch.alpha, 0, 100, `alpha`) : {
		success: true,
		value: lch
	});
	return {
		l: lch.l,
		c: lch.c,
		h: lch.h,
		opacity: (lch.alpha ?? 1) * 100,
		unit: `absolute`,
		space: `oklch`
	};
};
const fromHexString = (hexString) => fromLibrary(hex2oklch(hexString));
const oklchTransparent = Object.freeze({
	l: 0,
	c: 0,
	h: 0,
	opacity: 0,
	unit: `absolute`,
	space: `oklch`
});
const fromCssAbsolute = (value, options = {}) => {
	value = value.toLowerCase();
	if (value.startsWith(`#`)) return fromHexString(value);
	if (value === `transparent`) return oklchTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString(cssDefinedHexColours[value]);
	if (!value.startsWith(`hsl(`) && !value.startsWith(`oklch(`)) try {
		const converted = convert(value, `oklch`);
		value = converted;
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	const c = extractColorParts(value);
	if (c.model !== `oklch`) {
		if (options.fallbackColour) return options.fallbackColour;
		throw new Error(`Expecting OKLCH colour space. Got: ${c.model}`);
	}
	return fromLibrary(c, options);
};
const fromCssScalar = (value, options = {}) => toScalar(fromCssAbsolute(value, options));
const toScalar = (lch) => {
	guard$2(lch);
	if (lch.unit === `scalar`) return lch;
	return {
		l: lch.l / 360,
		c: lch.c / 100,
		h: lch.h / 100,
		opacity: (lch.opacity ?? 1) / 100,
		unit: `scalar`,
		space: `oklch`
	};
};
const toAbsolute = (lch) => {
	if (lch.unit === `absolute`) return lch;
	return {
		space: `oklch`,
		unit: `absolute`,
		l: lch.l * 100,
		c: lch.c * 100,
		h: lch.h * 360,
		opacity: lch.opacity
	};
};
const toCssString = (lch) => {
	guard$2(lch);
	const { l, c, h, opacity } = lch;
	let css = ``;
	switch (lch.unit) {
		case `absolute`: css = `lch(${l}% ${c}% ${h})`;
	}
	if (typeof opacity !== `undefined`) css += ` / ${opacity}`;
	css += `)`;
	return css;
};
const generateScalar = (absoluteHslOrVariable, chroma = 1, lightness = .5, opacity = 1) => {
	if (typeof absoluteHslOrVariable === `string`) {
		if (absoluteHslOrVariable.startsWith(`--`)) absoluteHslOrVariable = getComputedStyle(document.body).getPropertyValue(absoluteHslOrVariable).trim();
	}
	if (lightness > 1) throw new TypeError(`Param 'lightness' must be between 0..1`);
	if (chroma > 1) throw new TypeError(`Param 'chroma' must be between 0..1`);
	const hue = angleParse(absoluteHslOrVariable);
	const hueDeg = angleConvert(hue, `deg`).value / 360;
	if (opacity > 1) throw new TypeError(`Param 'opacity' must be between 0..1`);
	return {
		l: lightness,
		c: chroma,
		h: hueDeg,
		opacity,
		unit: `scalar`,
		space: `oklch`
	};
};

//#endregion
//#region packages/visual/src/colour/index.ts
var colour_exports = {};
__export(colour_exports, {
	HslSpace: () => hsl_exports,
	OklchSpace: () => oklch_exports,
	SrgbSpace: () => srgb_exports,
	convert: () => convert$1,
	cssDefinedHexColours: () => cssDefinedHexColours,
	fromCssColour: () => fromCssColour,
	goldenAngleColour: () => goldenAngleColour,
	guard: () => guard$3,
	multiplyOpacity: () => multiplyOpacity$1,
	randomHue: () => randomHue,
	toColour: () => toColour,
	toCssColour: () => toCssColour,
	toStringFirst: () => toStringFirst,
	withOpacity: () => withOpacity
});

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
* import { Video } from 'https://unpkg.com/ixfx/dist/visual.js'
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
		if (c === null) c = canvasEl.getContext(`2d`);
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
* import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
*
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
* import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
*
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
export { CanvasHelper, colour_exports as Colour, image_data_grid_exports as ImageDataGrid, video_exports as Video, pointerVisualise };
//# sourceMappingURL=visual.js.map