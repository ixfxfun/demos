import { __export } from "./chunk-51aI8Tpl.js";
import { numberInclusiveRangeTest$2 as numberInclusiveRangeTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-D3QR_A5v.js";
import { arrayTest$2 as arrayTest } from "./arrays-D1QkwjZy.js";
import { cloneFromFields$2 as cloneFromFields } from "./records-Ci2FTwQh.js";
import { continuously } from "./continuously-COmg5gMG.js";
import { intervalToMs$2 as intervalToMs } from "./interval-type-2J0Z5AgI.js";
import { SimpleEventEmitter$2 as SimpleEventEmitter } from "./simple-event-emitter-Bvk_YVow.js";
import { clamp$2 as clamp, clampIndex$2 as clampIndex } from "./clamp-C4PxbMDL.js";
import { ObjectTracker, quantiseEvery$2 as quantiseEvery } from "./object-tracker-BbrrYIJz.js";
import { guard as guard$1, guard$1 as guard, isPoint, isPositioned, isRect } from "./empty-j1qlaeLR.js";
import { angleConvert$2 as angleConvert, angleParse$2 as angleParse, angleRadian, corners, distance, fromPoints, joinPointsToLines, toCartesian } from "./corners-CPHrX858.js";
import { guard$2, isCubicBezier, isLine, isQuadraticBezier, length } from "./guard-DhtKQaVe.js";
import { Placeholder, getPointParameter, subtract } from "./multiply-CD_9keAA.js";
import { TrackedValueMap } from "./tracker-base-4Fqhp-ju.js";
import { Empty$1 as Empty, EmptyPositioned, Placeholder$1 } from "./placeholder-DEuEL_Il.js";
import { resolveEl$2 as resolveEl } from "./resolve-el-CWYrWSRe.js";
import { convert, extractColorParts, hex2hsl, hex2rgb, toColour, toCssColour, withOpacity as withOpacity$1, withOpacity$1 as withOpacity } from "./conversion-Do2NqrqP.js";

//#region ../packages/geometry/src/line/from-numbers.ts
/**
* Returns a line from a basis of coordinates (x1, y1, x2, y2)
* 
* ```js
* import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
* // Line from 0,1 -> 10,15
* Lines.fromNumbers(0, 1, 10, 15);
* ```
* @param x1 
* @param y1 
* @param x2 
* @param y2 
* @returns 
*/
const fromNumbers = (x1, y1, x2, y2) => {
	if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
	if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
	if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
	if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
	const a = {
		x: x1,
		y: y1
	};
	const b = {
		x: x2,
		y: y2
	};
	return fromPoints(a, b);
};

//#endregion
//#region ../packages/geometry/src/polar/ray.ts
/**
* Converts a ray to a Line in cartesian coordinates.
* 
* @param ray 
* @param origin Override or provide origin point
* @returns 
*/
const toCartesian$1 = (ray, origin) => {
	const o = getOrigin(ray, origin);
	const a = toCartesian(ray.offset, ray.angleRadian, o);
	const b = toCartesian(ray.offset + ray.length, ray.angleRadian, o);
	return {
		a,
		b
	};
};
const getOrigin = (ray, origin) => {
	if (origin !== void 0) return origin;
	if (ray.origin !== void 0) return ray.origin;
	return {
		x: 0,
		y: 0
	};
};
/**
* Returns a PolarRay based on a line and origin.
* If `origin` is omitted, the origin is taken to be the 'a' point of the line.
* @param line 
* @param origin 
* @returns 
*/
const fromLine = (line$2, origin) => {
	const o = origin ?? line$2.a;
	return {
		angleRadian: angleRadian(line$2.b, o),
		offset: distance(line$2.a, o),
		length: distance(line$2.b, line$2.a),
		origin: o
	};
};

//#endregion
//#region ../packages/geometry/src/point/is-equal.ts
/**
* Returns _true_ if the points have identical values
*
* ```js
* const a = {x: 10, y: 10};
* const b = {x: 10, y: 10;};
* a === b        // False, because a and be are different objects
* isEqual(a, b)   // True, because a and b are same value
* ```
* @param p Points
* @returns _True_ if points are equal
*/
const isEqual$1 = (...p) => {
	if (p === void 0) throw new Error(`parameter 'p' is undefined`);
	if (p.length < 2) return true;
	for (let index = 1; index < p.length; index++) {
		if (p[index].x !== p[0].x) return false;
		if (p[index].y !== p[0].y) return false;
	}
	return true;
};

//#endregion
//#region ../packages/geometry/src/point/centroid.ts
/**
* Calculates the [centroid](https://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points) of a set of points
* Undefined values are skipped over.
*
* ```js
* // Find centroid of a list of points
* const c1 = centroid(p1, p2, p3, ...);
*
* // Find centroid of an array of points
* const c2 = centroid(...pointsArray);
* ```
* @param points
* @returns A single point
*/
const centroid = (...points) => {
	if (!Array.isArray(points)) throw new Error(`Expected list of points`);
	const sum = points.reduce((previous, p) => {
		if (p === void 0) return previous;
		if (Array.isArray(p)) throw new TypeError(`'points' list contains an array. Did you mean: centroid(...myPoints)?`);
		if (!isPoint(p)) throw new Error(`'points' contains something which is not a point: ${JSON.stringify(p)}`);
		return {
			x: previous.x + p.x,
			y: previous.y + p.y
		};
	}, {
		x: 0,
		y: 0
	});
	return Object.freeze({
		x: sum.x / points.length,
		y: sum.y / points.length
	});
};

//#endregion
//#region ../packages/geometry/src/vector.ts
const EmptyCartesian = Object.freeze({
	x: 0,
	y: 0
});
const piPi = Math.PI * 2;
const pi = Math.PI;
/**
* Create a vector from a point
*
* If `unipolar` normalisation is used, direction will be fixed to 0..2π
* if `bipolar` normalisation is used, direction will be fixed to -π...π
* @param pt Point
* @param angleNormalisation Technique to normalise angle
* @param origin Origin to calculate vector from or 0,0 if left empty
* @returns
*/
const fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian) => {
	pt = subtract(pt, origin);
	let direction = Math.atan2(pt.y, pt.x);
	if (angleNormalisation === `unipolar` && direction < 0) direction += piPi;
	else if (angleNormalisation === `bipolar`) {
		if (direction > pi) direction -= piPi;
		else if (direction <= -pi) direction += piPi;
	}
	return Object.freeze({
		distance: distance(pt),
		angleRadian: direction
	});
};
/**
* Returns a Cartesian-coordinate vector from a line a -> b
* @param line
* @returns
*/
const fromLineCartesian = (line$2) => subtract(line$2.b, line$2.a);
/**
* Returns a polar-coordinate vector from a line a -> b
* @param line
* @returns
*/
const fromLinePolar = (line$2) => {
	guard$2(line$2, `line`);
	const pt = subtract(line$2.b, line$2.a);
	return fromPointPolar(pt);
};

//#endregion
//#region ../packages/geometry/src/point/relation.ts
/**
* Tracks the relation between two points.
* 
* 1. Call `Points.relation` with the initial reference point
* 2. You get back a function
* 3. Call the function with a new point to compute relational information.
* 
* It computes angle, average, centroid, distance and speed.
* 
* ```js
* import { Points } from "https://unpkg.com/ixfx/dist/geometry.js";
*
* // Reference point: 50,50
* const t = Points.relation({x:50,y:50}); // t is a function
*
* // Invoke the returned function with a point
* const relation = t({ x:0, y:0 }); // Juicy relational data
* ```
* 
* Or with destructuring:
* 
* ```js
* const { angle, distanceFromStart, distanceFromLast, average, centroid, speed } = t({ x:0,y:0 });
* ```
*
* x & y coordinates can also be used as parameters:
* ```js
* const t = Points.relation(50, 50);
* const result = t(0, 0);
* // result.speed, result.angle ...
* ```
*
* Note that intermediate values are not stored. It keeps the initial
* and most-recent point. If you want to compute something over a set
* of prior points, you may want to use {@link Trackers.points}
* @param a Initial point, or x value
* @param b y value, if first option is a number.
* @returns
*/
const relation = (a, b) => {
	const start = getPointParameter(a, b);
	let totalX = 0;
	let totalY = 0;
	let count = 0;
	let lastUpdate = performance.now();
	let lastPoint = start;
	const update = (aa, bb) => {
		const p = getPointParameter(aa, bb);
		totalX += p.x;
		totalY += p.y;
		count++;
		const distanceFromStart = distance(p, start);
		const distanceFromLast = distance(p, lastPoint);
		const now = performance.now();
		const speed = distanceFromLast / (now - lastUpdate);
		lastUpdate = now;
		lastPoint = p;
		return Object.freeze({
			angle: angleRadian(p, start),
			distanceFromStart,
			distanceFromLast,
			speed,
			centroid: centroid(p, start),
			average: {
				x: totalX / count,
				y: totalY / count
			}
		});
	};
	return update;
};

//#endregion
//#region ../packages/geometry/src/point/point-tracker.ts
/**
* A tracked point. Mutable. Useful for monitoring how
* it changes over time. Eg. when a pointerdown event happens, to record the start position and then
* track the pointer as it moves until pointerup.
*
* See also
* * [Playground](https://clinth.github.io/ixfx-play/data/point-tracker/index.html)
* * {@link points}: Track several points, useful for multi-touch.
* * [ixfx Guide to Point Tracker](https://ixfx.fun/geometry/tracking/)
* 
* ```js
* // Create a tracker on a pointerdown
* const t = new PointTracker();
*
* // ...and later, tell it when a point is seen (eg. pointermove)
* const nfo = t.seen({x: evt.x, y:evt.y});
* // nfo gives us some details on the relation between the seen point, the start, and points inbetween
* // nfo.angle, nfo.centroid, nfo.speed etc.
* ```
*
* Compute based on last seen point
* ```js
* t.angleFromStart();
* t.distanceFromStart();
* t.x / t.y
* t.length; // Total length of accumulated points
* t.elapsed; // Total duration since start
* t.lastResult; // The PointSeenInfo for last seen point
* ```
*
* Housekeeping
* ```js
* t.reset(); // Reset tracker
* ```
*
* By default, the tracker only keeps track of the initial point and
* does not store intermediate 'seen' points. To use the tracker as a buffer,
* set `storeIntermediate` option to _true_.
*
* ```js
* // Keep only the last 10 points
* const t = new PointTracker({
*  sampleLimit: 10
* });
*
* // Store all 'seen' points
* const t = new PointTracker({
*  storeIntermediate: true
* });
*
* // In this case, the whole tracker is automatically
* // reset after 10 samples
* const t = new PointTracker({
*  resetAfterSamples: 10
* })
* ```
*
* When using a buffer limited by `sampleLimit`, the 'initial' point will be the oldest in the
* buffer, not actually the very first point seen.
*/
var PointTracker = class extends ObjectTracker {
	initialRelation;
	markRelation;
	lastResult;
	constructor(opts = {}) {
		super(opts);
	}
	/**
	* Notification that buffer has been knocked down to `sampleLimit`.
	* 
	* This will reset the `initialRelation`, which will use the new oldest value.
	*/
	onTrimmed(_reason) {
		this.initialRelation = void 0;
	}
	/**
	* @ignore
	*/
	onReset() {
		super.onReset();
		this.lastResult = void 0;
		this.initialRelation = void 0;
		this.markRelation = void 0;
	}
	/**
	* Adds a PointerEvent along with its
	* coalesced events, if available.
	* @param p 
	* @returns 
	*/
	seenEvent(p) {
		if (`getCoalescedEvents` in p) {
			const events = p.getCoalescedEvents();
			const asPoints = events.map((event) => ({
				x: event.clientX,
				y: event.clientY
			}));
			return this.seen(...asPoints);
		} else return this.seen({
			x: p.clientX,
			y: p.clientY
		});
	}
	/**
	* Makes a 'mark' in the tracker, allowing you to compare values
	* to this point.
	*/
	mark() {
		this.markRelation = relation(this.last);
	}
	/**
	* Tracks a point, returning data on its relation to the
	* initial point and the last received point.
	* 
	* Use {@link seenEvent} to track a raw `PointerEvent`.
	* 
	* @param _p Point
	*/
	computeResults(_p) {
		const currentLast = this.last;
		const previousLast = this.values.at(-2);
		if (this.initialRelation === void 0 && this.initial) this.initialRelation = relation(this.initial);
		else if (this.initialRelation === void 0) throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
		const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
		const initialRel = this.initialRelation(currentLast);
		const markRel = this.markRelation !== void 0 ? this.markRelation(currentLast) : void 0;
		const speed = previousLast === void 0 ? 0 : length(previousLast, currentLast) / (currentLast.at - previousLast.at);
		const lastRel = {
			...lastRelation(currentLast),
			speed
		};
		const r = {
			fromInitial: initialRel,
			fromLast: lastRel,
			fromMark: markRel,
			values: [...this.values]
		};
		this.lastResult = r;
		return r;
	}
	/**
	* Returns a polyline representation of stored points.
	* Returns an empty array if points were not saved, or there's only one.
	*/
	get line() {
		if (this.values.length === 1) return [];
		return joinPointsToLines(...this.values);
	}
	/**
	* Returns a vector of the initial/last points of the tracker.
	* Returns as a polar coordinate
	*/
	get vectorPolar() {
		return fromLinePolar(this.lineStartEnd);
	}
	/**
	* Returns a vector of the initial/last points of the tracker.
	* Returns as a Cartesian coordinate
	*/
	get vectorCartesian() {
		return fromLineCartesian(this.lineStartEnd);
	}
	/**
	* Returns a line from initial point to last point.
	*
	* If there are less than two points, Lines.Empty is returned
	*/
	get lineStartEnd() {
		const initial = this.initial;
		if (this.values.length < 2 || !initial) return Empty$1;
		return {
			a: initial,
			b: this.last
		};
	}
	/**
	* Returns distance from latest point to initial point.
	* If there are less than two points, zero is returned.
	*
	* This is the direct distance from initial to last,
	* not the accumulated length.
	* @returns Distance
	*/
	distanceFromStart() {
		const initial = this.initial;
		return this.values.length >= 2 && initial !== void 0 ? distance(initial, this.last) : 0;
	}
	/**
	* Difference between last point and the initial point, calculated
	* as a simple subtraction of x,y & z.
	*
	* `Points.Placeholder` is returned if there's only one point so far.
	*/
	difference() {
		const initial = this.initial;
		return this.values.length >= 2 && initial !== void 0 ? subtract(this.last, initial) : Placeholder;
	}
	/**
	* Returns angle (in radians) from latest point to the initial point
	* If there are less than two points, undefined is return.
	* @returns Angle in radians
	*/
	angleFromStart() {
		const initial = this.initial;
		if (initial !== void 0 && this.values.length > 2) return angleRadian(initial, this.last);
	}
	/**
	* Returns the total length of accumulated points.
	* Returns 0 if points were not saved, or there's only one
	*/
	get length() {
		if (this.values.length === 1) return 0;
		const l = this.line;
		return length(l);
	}
	/**
	* Returns the last x coord
	*/
	get x() {
		return this.last.x;
	}
	/**
	* Returns the last y coord
	*/
	get y() {
		return this.last.y;
	}
	/**
	* Returns the last z coord (or _undefined_ if not available)
	*/
	get z() {
		return this.last.z;
	}
};
/**
* A {@link TrackedValueMap} for points. Uses {@link PointTracker} to
* track added values.
*/
var PointsTracker = class extends TrackedValueMap {
	constructor(opts = {}) {
		super((key, start) => {
			if (start === void 0) throw new Error(`Requires start point`);
			const p = new PointTracker({
				...opts,
				id: key
			});
			p.seen(start);
			return p;
		});
	}
	/**
	* Track a PointerEvent
	* @param event
	*/
	seenEvent(event) {
		if (`getCoalescedEvents` in event) {
			const events = event.getCoalescedEvents();
			const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
			return Promise.all(seens);
		} else return Promise.all([super.seen(event.pointerId.toString(), event)]);
	}
};

//#endregion
//#region ../packages/geometry/src/line/index.ts
const Empty$1 = Object.freeze({
	a: Object.freeze({
		x: 0,
		y: 0
	}),
	b: Object.freeze({
		x: 0,
		y: 0
	})
});
const Placeholder$2 = Object.freeze({
	a: Object.freeze({
		x: Number.NaN,
		y: Number.NaN
	}),
	b: Object.freeze({
		x: Number.NaN,
		y: Number.NaN
	})
});

//#endregion
//#region ../packages/geometry/src/triangle/guard.ts
/**
* Throws an exception if the triangle is invalid
* @param t
* @param name
*/
const guard$6 = (t, name = `t`) => {
	if (t === void 0) throw new Error(`{$name} undefined`);
	guard(t.a, name + `.a`);
	guard(t.b, name + `.b`);
	guard(t.c, name + `.c`);
};

//#endregion
//#region ../packages/geometry/src/rect/apply.ts
/**
* Applies an operation over each field of a rectangle.
* ```js
* // Convert x,y,width,height to integer values
* applyFields(v => Number.floor(v), someRect);
* ```
* @param op
* @param rectOrWidth 
* @param heightValue 
* @returns 
*/
function applyFields(op, rectOrWidth, heightValue) {
	let width = typeof rectOrWidth === `number` ? rectOrWidth : rectOrWidth.width;
	let height = typeof rectOrWidth === `number` ? heightValue : rectOrWidth.height;
	if (width === void 0) throw new Error(`Param 'width' undefined`);
	if (height === void 0) throw new Error(`Param 'height' undefined`);
	width = op(width, `width`);
	height = op(height, `height`);
	if (typeof rectOrWidth === `object`) if (isPositioned(rectOrWidth)) {
		const x = op(rectOrWidth.x, `x`);
		const y = op(rectOrWidth.y, `y`);
		return {
			...rectOrWidth,
			width,
			height,
			x,
			y
		};
	} else return {
		...rectOrWidth,
		width,
		height
	};
	return {
		width,
		height
	};
}
function applyScalar(op, rect$1, parameter) {
	return isPositioned(rect$1) ? Object.freeze({
		...rect$1,
		x: op(rect$1.x, parameter),
		y: op(rect$1.y, parameter),
		width: op(rect$1.width, parameter),
		height: op(rect$1.height, parameter)
	}) : Object.freeze({
		...rect$1,
		width: op(rect$1.width, parameter),
		height: op(rect$1.height, parameter)
	});
}

//#endregion
//#region ../packages/geometry/src/rect/is-equal.ts
/**
* Returns _true_ if two rectangles have identical values.
* Both rectangles must be positioned or not.
*
* ```js
* import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
* const rectA = { width: 10, height: 10, x: 10, y: 10 };
* const rectB = { width: 10, height: 10, x: 20, y: 20 };
*
* // False, because coordinates are different
* Rects.isEqual(rectA, rectB)
*
* // True, even though x,y are different
* Rects.isEqualSize(rectA, rectB);
* ```
* @param a
* @param b
* @returns
*/
const isEqual = (a, b) => {
	if (isPositioned(a) && isPositioned(b)) {
		if (!isEqual$1(a, b)) return false;
		return a.width === b.width && a.height === b.height;
	} else if (!isPositioned(a) && !isPositioned(b)) return a.width === b.width && a.height === b.height;
	else return false;
};

//#endregion
//#region ../packages/geometry/src/rect/multiply.ts
const multiplyOp = (a, b) => a * b;
/**
* Multiplies all components of `rect` by `amount`.
* This includes x,y if present.
* 
* ```js
* multiplyScalar({ width:10, height:20 }, 2); // { width:20, height: 40 }
* multiplyScalar({ x: 1, y: 2, width:10, height:20 }, 2); // { x: 2, y: 4, width:20, height: 40 }
* ```
* 
* Use {@link multiplyDim} to only multiply width & height.
* @param rect
* @param amount
*/
function multiplyScalar(rect$1, amount) {
	return applyScalar(multiplyOp, rect$1, amount);
}

//#endregion
//#region ../packages/geometry/src/grid/inside.ts
/**
* Returns _true_ if cell coordinates are above zero and within bounds of grid
*
* @param grid
* @param cell
* @return
*/
const inside = (grid$2, cell) => {
	if (cell.x < 0 || cell.y < 0) return false;
	if (cell.x >= grid$2.cols || cell.y >= grid$2.rows) return false;
	return true;
};

//#endregion
//#region ../packages/geometry/src/grid/guards.ts
/**
* Throws an exception if any of the cell's parameters are invalid
* @private
* @param cell
* @param parameterName
* @param grid
*/
const guardCell = (cell, parameterName = `Param`, grid$2) => {
	if (cell === void 0) throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
	if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
	if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
	if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
	if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
	if (!Number.isInteger(cell.x)) throw new TypeError(parameterName + `.x is non-integer`);
	if (!Number.isInteger(cell.y)) throw new TypeError(parameterName + `.y is non-integer`);
	if (grid$2 !== void 0 && !inside(grid$2, cell)) throw new Error(`${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid$2.cols}, ${grid$2.rows}`);
};
/**
* Throws an exception if any of the grid's parameters are invalid
* @param grid
* @param parameterName
*/
const guardGrid = (grid$2, parameterName = `Param`) => {
	if (grid$2 === void 0) throw new Error(`${parameterName} is undefined. Expecting grid.`);
	if (!(`rows` in grid$2)) throw new Error(`${parameterName}.rows is undefined`);
	if (!(`cols` in grid$2)) throw new Error(`${parameterName}.cols is undefined`);
	if (!Number.isInteger(grid$2.rows)) throw new TypeError(`${parameterName}.rows is not an integer`);
	if (!Number.isInteger(grid$2.cols)) throw new TypeError(`${parameterName}.cols is not an integer`);
};

//#endregion
//#region ../packages/geometry/src/grid/apply-bounds.ts
/**
* Calculates a legal position for a cell based on
* `grid` size and `bounds` wrapping logic.
* @param grid 
* @param cell 
* @param wrap 
* @returns 
*/
const applyBounds = function(grid$2, cell, wrap$1 = `undefined`) {
	guardGrid(grid$2, `grid`);
	guardCell(cell, `cell`);
	let x = cell.x;
	let y = cell.y;
	switch (wrap$1) {
		case `wrap`: {
			x = x % grid$2.cols;
			y = y % grid$2.rows;
			if (x < 0) x = grid$2.cols + x;
			else if (x >= grid$2.cols) x -= grid$2.cols;
			if (y < 0) y = grid$2.rows + y;
			else if (y >= grid$2.rows) y -= grid$2.rows;
			x = Math.abs(x);
			y = Math.abs(y);
			break;
		}
		case `stop`: {
			x = clampIndex(x, grid$2.cols);
			y = clampIndex(y, grid$2.rows);
			break;
		}
		case `undefined`: {
			if (x < 0 || y < 0) return;
			if (x >= grid$2.cols || y >= grid$2.rows) return;
			break;
		}
		case `unbounded`: break;
		default: throw new Error(`Unknown BoundsLogic '${wrap$1}'. Expected: wrap, stop, undefined or unbounded`);
	}
	return Object.freeze({
		x,
		y
	});
};

//#endregion
//#region ../packages/geometry/src/grid/enumerators/cells.ts
/**
* Enumerate all cell coordinates in an efficient manner.
* Runs left-to-right, top-to-bottom.
* 
* If end of grid is reached, behaviour depends on `wrap`:
* * _true_ (default): iterator will wrap to ensure all are visited.
* * _false_: iterator stops at end of grid
* 
* ```js
* import { Grids } from 'ixfx/geometry.js';
* 
* // Enumerate each cell position, left-to-right, top-to-bottom
* for (const cell of Grids.By.cells(grid)) {
*  // cell will be { x, y }
* }
* ```
* 
* See also:
* * {@link cellValues}: Iterate over cell values
* * {@link cellsAndValues}: Iterate over pairs of cell coordinates and cell values
* @param grid Grid to iterate over
* @param start Starting cell position (default: {x:0,y:0})
* @param wrap If true (default), iteration will wrap around through (0,0) when end of grid is reached.
*/
function* cells(grid$2, start, wrap$1 = true) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	guardGrid(grid$2, `grid`);
	guardCell(start, `start`, grid$2);
	let { x, y } = start;
	let canMove = true;
	do {
		yield {
			x,
			y
		};
		x++;
		if (x === grid$2.cols) {
			y++;
			x = 0;
		}
		if (y === grid$2.rows) if (wrap$1) {
			y = 0;
			x = 0;
		} else canMove = false;
		if (x === start.x && y === start.y) canMove = false;
	} while (canMove);
}

//#endregion
//#region ../packages/geometry/src/grid/as.ts
/**
* Enumerate rows of grid, returning all the cells in the row
* as an array
*
* ```js
* for (const row of Grid.As.rows(shape)) {
*  // row is an array of Cells.
*  // [ {x:0, y:0}, {x:1, y:0} ... ]
* }
* ```
* 
* Use `Grid.values` to convert the returned iterator into values:
* ```js
* for (const v of Grid.values(Grid.rows(shape))) {
* }
* ```
* @param grid
* @param start
*/
const rows = function* (grid$2, start) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	let row = start.y;
	let rowCells = [];
	for (const c of cells(grid$2, start)) if (c.y === row) rowCells.push(c);
	else {
		yield rowCells;
		rowCells = [c];
		row = c.y;
	}
	if (rowCells.length > 0) yield rowCells;
};

//#endregion
//#region ../packages/geometry/src/grid/offset.ts
/**
* Returns a coordinate offset from `start` by `vector` amount.
*
* Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
*
* Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift up/down a line.
* 
* Use {@link Grids.applyBounds} if you need to calculate a wrapped coordinate without adding two together.
* @param grid Grid to traverse
* @param vector Offset in x/y
* @param start Start point
* @param bounds
* @returns Cell
*/
const offset = function(grid$2, start, vector, bounds = `undefined`) {
	return applyBounds(grid$2, {
		x: start.x + vector.x,
		y: start.y + vector.y
	}, bounds);
};

//#endregion
//#region ../packages/geometry/src/grid/indexing.ts
/**
* Returns the index for a given cell.
* This is useful if a grid is stored in an array.
*
* ```js
* const data = [
*  1, 2,
*  3, 4,
*  5, 6 ];
* const cols = 2; // Grid of 2 columns wide
* const index = indexFromCell(cols, {x: 1, y: 1});
* // Yields an index of 3
* console.log(data[index]); // Yields 4
* ```
*
* Bounds logic is applied to cell.x/y separately. Wrapping
* only ever happens in same col/row.
* @see cellFromIndex
* @param grid Grid
* @param cell Cell to get index for
* @param wrap Logic for if we hit bounds of grid
* @returns
*/
const indexFromCell = (grid$2, cell, wrap$1) => {
	guardGrid(grid$2, `grid`);
	if (cell.x < 0) switch (wrap$1) {
		case `stop`: {
			cell = {
				...cell,
				x: 0
			};
			break;
		}
		case `unbounded`: throw new Error(`unbounded not supported`);
		case `undefined`: return void 0;
		case `wrap`: {
			cell = offset(grid$2, {
				x: 0,
				y: cell.y
			}, {
				x: cell.x,
				y: 0
			}, `wrap`);
			break;
		}
	}
	if (cell.y < 0) switch (wrap$1) {
		case `stop`: {
			cell = {
				...cell,
				y: 0
			};
			break;
		}
		case `unbounded`: throw new Error(`unbounded not supported`);
		case `undefined`: return void 0;
		case `wrap`: {
			cell = {
				...cell,
				y: grid$2.rows + cell.y
			};
			break;
		}
	}
	if (cell.x >= grid$2.cols) switch (wrap$1) {
		case `stop`: {
			cell = {
				...cell,
				x: grid$2.cols - 1
			};
			break;
		}
		case `unbounded`: throw new Error(`unbounded not supported`);
		case `undefined`: return void 0;
		case `wrap`: {
			cell = {
				...cell,
				x: cell.x % grid$2.cols
			};
			break;
		}
	}
	if (cell.y >= grid$2.rows) switch (wrap$1) {
		case `stop`: {
			cell = {
				...cell,
				y: grid$2.rows - 1
			};
			break;
		}
		case `unbounded`: throw new Error(`unbounded not supported`);
		case `undefined`: return void 0;
		case `wrap`: {
			cell = {
				...cell,
				y: cell.y % grid$2.rows
			};
			break;
		}
	}
	const index = cell.y * grid$2.cols + cell.x;
	return index;
};

//#endregion
//#region ../packages/collections/src/stack/StackFns.ts
const trimStack = (opts, stack, toAdd) => {
	const potentialLength = stack.length + toAdd.length;
	const policy = opts.discardPolicy ?? `additions`;
	const capacity = opts.capacity ?? potentialLength;
	const toRemove = potentialLength - capacity;
	if (opts.debug) console.log(`Stack.push: stackLen: ${stack.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
	switch (policy) {
		case `additions`: {
			if (opts.debug) console.log(`Stack.push:DiscardAdditions: stackLen: ${stack.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
			if (stack.length === opts.capacity) return stack;
			else return [...stack, ...toAdd.slice(0, toAdd.length - toRemove)];
		}
		case `newer`: if (toRemove >= stack.length) return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
		else {
			if (opts.debug) console.log(` from orig: ${JSON.stringify(stack.slice(0, stack.length - toRemove))}`);
			return [...stack.slice(0, stack.length - toRemove), ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))];
		}
		case `older`: return [...stack, ...toAdd].slice(toRemove);
		default: throw new Error(`Unknown discard policy ${policy}`);
	}
};
const push = (opts, stack, ...toAdd) => {
	const potentialLength = stack.length + toAdd.length;
	const overSize = opts.capacity && potentialLength > opts.capacity;
	const toReturn = overSize ? trimStack(opts, stack, toAdd) : [...stack, ...toAdd];
	return toReturn;
};
const pop = (opts, stack) => {
	if (stack.length === 0) throw new Error(`Stack is empty`);
	return stack.slice(0, -1);
};
/**
* Peek at the top of the stack (end of array)
*
* @typeParam V - Type of stored items
* @param {StackOpts} opts
* @param {V[]} stack
* @returns {(V | undefined)}
*/
const peek = (opts, stack) => stack.at(-1);
const isEmpty = (opts, stack) => stack.length === 0;
const isFull = (opts, stack) => {
	if (opts.capacity) return stack.length >= opts.capacity;
	return false;
};

//#endregion
//#region ../packages/collections/src/stack/StackImmutable.ts
var StackImmutable = class StackImmutable {
	opts;
	data;
	constructor(opts = {}, data = []) {
		this.opts = opts;
		this.data = data;
	}
	push(...toAdd) {
		return new StackImmutable(this.opts, push(this.opts, this.data, ...toAdd));
	}
	pop() {
		return new StackImmutable(this.opts, pop(this.opts, this.data));
	}
	forEach(fn) {
		this.data.forEach(fn);
	}
	forEachFromTop(fn) {
		[...this.data].reverse().forEach(fn);
	}
	get isEmpty() {
		return isEmpty(this.opts, this.data);
	}
	get isFull() {
		return isFull(this.opts, this.data);
	}
	get peek() {
		return peek(this.opts, this.data);
	}
	get length() {
		return this.data.length;
	}
};

//#endregion
//#region ../packages/geometry/src/scaler.ts
/**
* Returns a set of scaler functions, to convert to and from ranges.
*
* ```js
* const scaler = Scaler.scaler(`both`, {width:window.innerWidth, height:window.innerHeight});
* // Assuming screen of 800x400...
* scaler.abs(400,200);          // Yields { x:0.5, y:0.5 }
* scaler.abs({ x:400, y:200 }); // Yields { x:0.5, y:0.5 }
*
* scaler.rel(0.5, 0.5);         // Yields: { x:400, y:200 }
* scaler.rel({ x:0.5, y:0.5 }); // Yields: { x:400, y:200 }
* ```
*
* If no default range is provided, it must be given each time the scale function is used.
*
* ```js
* const scaler = Scaler.scaler(`both`);
*
* scaler.abs(400, 200, 800, 400);
* scaler.abs(400, 200, { width: 800, height: 400 });
* scaler.abs({ x:400, y: 200}, { width: 800, height: 400 });
* scaler.abs({ x:400, y: 200}, 800, 400);
* // All are the same, yielding { x:0.5, y:0.5 }
*
* scaler.abs(400, 200); // Throws an exception because there is no scale
* ```
* @param scaleBy Dimension to scale by
* @param defaultRect Default range
* @returns
*/
const scaler = (scaleBy = `both`, defaultRect) => {
	const defaultBounds = defaultRect ?? Placeholder$1;
	let sw = 1;
	let sh = 1;
	let s = {
		x: 1,
		y: 1
	};
	const computeScale = () => {
		switch (scaleBy) {
			case `height`: return {
				x: sh,
				y: sh
			};
			case `width`: return {
				x: sw,
				y: sw
			};
			case `min`: return {
				x: Math.min(sw, sh),
				y: Math.min(sw, sh)
			};
			case `max`: return {
				x: Math.max(sw, sh),
				y: Math.max(sw, sh)
			};
			default: return {
				x: sw,
				y: sh
			};
		}
	};
	const normalise = (a, b, c, d) => {
		let inX = Number.NaN;
		let inY = Number.NaN;
		let outW = defaultBounds.width;
		let outH = defaultBounds.height;
		if (typeof a === `number`) {
			inX = a;
			if (typeof b === `number`) {
				inY = b;
				if (c === void 0) return [
					inX,
					inY,
					outW,
					outH
				];
				if (isRect(c)) {
					outW = c.width;
					outH = c.height;
				} else if (typeof c === `number`) {
					outW = c;
					if (typeof d === `number`) outH = d;
					else throw new TypeError(`Missing final height value`);
				} else throw new Error(`Missing valid output range`);
			} else if (isRect(b)) {
				outW = b.width;
				outH = b.height;
			} else throw new Error(`Expected input y or output Rect to follow first number parameter`);
		} else if (isPoint(a)) {
			inX = a.x;
			inY = a.y;
			if (b === void 0) return [
				inX,
				inY,
				outW,
				outH
			];
			if (isRect(b)) {
				outW = b.width;
				outH = b.height;
			} else if (typeof b === `number`) {
				outW = b;
				if (typeof c === `number`) outH = c;
				else throw new TypeError(`Expected height as third parameter after Point and output width`);
			} else throw new TypeError(`Expected Rect or width as second parameter when first parameter is a Point`);
		} else throw new Error(`Expected input Point or x value as first parameter`);
		return [
			inX,
			inY,
			outW,
			outH
		];
	};
	const scaleAbs = (a, b, c, d) => {
		const n = normalise(a, b, c, d);
		return scaleNormalised(true, ...n);
	};
	const scaleRel = (a, b, c, d) => {
		const n = normalise(a, b, c, d);
		return scaleNormalised(false, ...n);
	};
	const scaleNormalised = (abs, x, y, w, h) => {
		if (Number.isNaN(w)) throw new Error(`Output width range missing`);
		if (Number.isNaN(h)) throw new Error(`Output height range missing`);
		if (w !== sw || h !== sh) {
			sw = w;
			sh = h;
			s = computeScale();
		}
		return abs ? {
			x: x * s.x,
			y: y * s.y
		} : {
			x: x / s.x,
			y: y / s.y
		};
	};
	return {
		computeScale,
		rel: scaleRel,
		abs: scaleAbs,
		width: defaultBounds.width,
		height: defaultBounds.height
	};
};

//#endregion
//#region ../packages/geometry/src/triangle/corners.ts
/**
* Returns the corners (vertices) of the triangle as an array of points
* @param t
* @returns Array of length three
*/
const corners$1 = (t) => {
	guard$6(t);
	return [
		t.a,
		t.b,
		t.c
	];
};

//#endregion
//#region ../packages/flow/src/delay.ts
/**
* Iterate over a source iterable with some delay between results.
* Delay can be before, after or both before and after each result from the
* source iterable.
*
* Since it's an async iterable, `for await ... of` is needed.
*
* ```js
* const opts = { intervalMs: 1000, delay: 'before' };
* const iterable = count(10);
* for await (const i of delayIterable(iterable, opts)) {
*  // Prints 0..9 with one second between
* }
* ```
*
* Use {@link delay} to return a result after some delay
*
* @param iter
* @param opts
*/
/**
* Async generator that loops via `requestAnimationFrame`.
*
* We can use `for await of` to run code:
* ```js
* const loop = delayAnimationLoop();
* for await (const o of loop) {
*  // Do something...
*  // Warning: loops forever
* }
* // Warning: execution doesn't continue to this point
* // unless there is a 'break' in loop.
* ```
* 
* Or use the generator in manually:
* ```js
* // Loop forever
* (async () => {
*  const loop = delayAnimationLoop();
*  while (true) {
*    await loop.next();
*
*    // Do something...
*    // Warning: loops forever
*  }
* })();
* ```
* 
* Practically, these approaches are not so useful
* because execution blocks until the loop finishes.
* 
* Instead, we might want to continually loop a bit
* of code while other bits of code continue to run.
* 
* The below example shows how to do this.
* 
* ```js
* setTimeout(async () => {
*  for await (const _ of delayAnimationLoop()) {
*    // Do soething at animation speed
*  }
* });
* 
* // Execution continues while loop also runs
* ```
*
*/
async function* delayAnimationLoop() {
	let resolve;
	let p = new Promise((r) => resolve = r);
	let timer = 0;
	const callback = () => {
		if (resolve) resolve();
		p = new Promise((r) => resolve = r);
	};
	try {
		while (true) {
			timer = globalThis.requestAnimationFrame(callback);
			const _ = await p;
			yield _;
		}
	} finally {
		if (resolve) resolve();
		globalThis.cancelAnimationFrame(timer);
	}
}
/**
* Async generator that loops at a given interval.
* 
* @example 
* For Await loop every second
* ```js
* const loop = delayLoop(1000);
* // Or: const loop = delayLoop({ secs: 1 });
* for await (const o of loop) {
*  // Do something...
*  // Warning: loops forever
* }
* ```
* 
* @example 
* Loop runs every second
* ```js
* (async () => {
*  const loop = delayLoop(1000);
*  // or: loop = delayLoop({ secs: 1 });
*  while (true) {
*    await loop.next();
*
*    // Do something...
*    // Warning: loops forever
*  }
* })();
* ```
* 
* Alternatives:
* * {@link delay} to run a single function after a delay
* * {@link sleep} pause execution
* * {@link continuously} to start/stop/adjust a constantly running loop
*
* @param timeout Delay. If 0 is given, `requestAnimationFrame` is used over `setTimeout`.
*/
async function* delayLoop(timeout) {
	const timeoutMs = intervalToMs(timeout);
	if (typeof timeoutMs === `undefined`) throw new Error(`timeout is undefined`);
	if (timeoutMs < 0) throw new Error(`Timeout is less than zero`);
	if (timeoutMs === 0) return yield* delayAnimationLoop();
	let resolve;
	let p = new Promise((r) => resolve = r);
	let timer;
	const callback = () => {
		if (resolve) resolve();
		p = new Promise((r) => resolve = r);
	};
	try {
		while (true) {
			timer = globalThis.setTimeout(callback, timeoutMs);
			const _ = await p;
			yield _;
		}
	} finally {
		if (resolve) resolve();
		if (timer !== void 0) globalThis.clearTimeout(timer);
		timer = void 0;
	}
}

//#endregion
//#region ../packages/dom/src/css.ts
/**
* Returns the computed measurements of CSS properties via [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
* ```js
* const v = getComputedPixels(`#some-el`, `borderTopWidth`, `borderLeftWidth`);
* v.borderTopWidth;  // number
* b.borderLeftWidth; // number
* ```
* 
* Throws an error if value from `getComputedStyle` is not a string or does not end in 'px'.
* @param elOrQuery 
* @param properties 
* @returns 
*/
const getComputedPixels = (elOrQuery, ...properties) => {
	const s = getComputedStyle(resolveEl(elOrQuery));
	const returnValue = {};
	for (const property of properties) {
		const v = s[property];
		if (typeof v === `string`) if (v.endsWith(`px`)) returnValue[property] = Number.parseFloat(v.substring(0, v.length - 2));
		else throw new Error(`Property '${String(property)}' does not end in 'px'. Value: ${v}`);
		else throw new Error(`Property '${String(property)}' is not type string. Got: ${typeof v} Value: ${v}`);
	}
	return returnValue;
};

//#endregion
//#region ../packages/dom/src/element-sizing.ts
/**
* Consider using static methods:
* 
* ```js
* // Resize an <SVG> element to match viewport
* Dom.ElementSizer.svgViewport(svg);
* 
* // Resize canvas to match its parent
* Dom.ElementSizer.canvasParent(canvas);
* 
* // Resize canvas to match viewport
* Dom.ElementSizer.canvasViewport(canvas);
* ```
*/
var ElementSizer = class ElementSizer {
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
		this.#size = Empty;
		let naturalSize = options.naturalSize;
		if (naturalSize === void 0) naturalSize = this.#el.getBoundingClientRect();
		this.#naturalRatio = 1;
		this.#naturalSize = naturalSize;
		this.setNaturalSize(naturalSize);
		this.#viewport = EmptyPositioned;
		if (this.#containerEl === document.body) this.#byViewport();
		else this.#byContainer();
	}
	dispose(reason) {
		if (this.#disposed) return;
		this.#disposed = true;
		if (this.#resizeObservable) {
			this.#resizeObservable.disconnect();
			this.#resizeObservable = void 0;
		}
	}
	static canvasParent(canvasElementOrQuery, options) {
		const el = resolveEl(canvasElementOrQuery);
		const er = new ElementSizer(el, {
			...options,
			onSetSize(size, el$1) {
				el$1.width = size.width;
				el$1.height = size.height;
				if (options.onSetSize) options.onSetSize(size, el$1);
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
		const opts = {
			...options,
			containerEl: document.body
		};
		return this.canvasParent(canvasElementOrQuery, opts);
	}
	/**
	* Size an SVG element to match viewport
	* @param svg 
	* @returns 
	*/
	static svgViewport(svg, onSizeSet) {
		const er = new ElementSizer(svg, {
			containerEl: document.body,
			stretch: `both`,
			onSetSize(size) {
				svg.setAttribute(`width`, size.width.toString());
				svg.setAttribute(`height`, size.height.toString());
				if (onSizeSet) onSizeSet(size);
			}
		});
		return er;
	}
	#byContainer() {
		const c = this.#containerEl;
		if (!c) throw new Error(`No container element`);
		const r = new ResizeObserver((entries) => {
			this.#onParentResize(entries);
		});
		r.observe(c);
		const current = this.#computeSizeBasedOnParent(c.getBoundingClientRect());
		this.size = current;
		this.#resizeObservable = r;
	}
	#byViewport() {
		const r = new ResizeObserver((entries) => {
			this.#onViewportResize();
		});
		r.observe(document.documentElement);
		this.#resizeObservable = r;
		this.#onViewportResize();
	}
	#onViewportResize() {
		this.size = {
			width: window.innerWidth,
			height: window.innerHeight
		};
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
	#computeSizeBasedOnParent(parentSize) {
		let { width, height } = parentSize;
		let stretch = this.#stretch;
		if (stretch === `min`) stretch = width < height ? `width` : `height`;
		else if (stretch === `max`) stretch = width > height ? `width` : `height`;
		if (stretch === `width`) height = width / this.#naturalRatio;
		else if (stretch === `height`) width = height * this.#naturalRatio;
		if (this.#el instanceof HTMLElement) {
			const b = getComputedPixels(this.#el, `borderTopWidth`, `borderLeftWidth`, `borderRightWidth`, `borderBottomWidth`);
			width -= b.borderLeftWidth + b.borderRightWidth;
			height -= b.borderTopWidth + b.borderBottomWidth;
		}
		return {
			width,
			height
		};
	}
	#onParentResize(args) {
		const box = args[0].contentBoxSize[0];
		const parentSize = {
			width: box.inlineSize,
			height: box.blockSize
		};
		this.size = this.#computeSizeBasedOnParent(parentSize);
		this.#viewport = {
			x: 0,
			y: 0,
			width: parentSize.width,
			height: parentSize.height
		};
	}
	set size(size) {
		guard$1(size, `size`);
		this.#size = size;
		this.#onSetSize(size, this.#el);
	}
	get size() {
		return this.#size;
	}
};

//#endregion
//#region ../packages/visual/src/colour/math.ts
function multiplyOpacity$1(colourish, amount) {
	return withOpacity$5(colourish, (o) => clamp(o * amount));
}
function withOpacity$5(colourish, fn) {
	const colour = toColour(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity(colour, fn);
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
//#region ../packages/visual/dist/src/drawing.js
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
	line: () => line$1,
	lineThroughPoints: () => lineThroughPoints,
	makeHelper: () => makeHelper$1,
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
const makeHelper$1 = (ctxOrCanvasEl, canvasBounds) => {
	const ctx = getContext(ctxOrCanvasEl);
	return {
		ctx,
		paths(pathsToDraw, opts) {
			paths(ctx, pathsToDraw, opts);
		},
		line(lineToDraw, opts) {
			line$1(ctx, lineToDraw, opts);
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
	if (stk === void 0) stk = new StackImmutable();
	const push$1 = (...ops) => {
		if (stk === void 0) stk = new StackImmutable();
		const s = stk.push(...ops);
		for (const o of ops) o(ctx);
		return drawingStack(ctx, s);
	};
	const pop$1 = () => {
		const s = stk?.pop();
		return drawingStack(ctx, s);
	};
	const apply = () => {
		if (stk === void 0) return drawingStack(ctx);
		for (const op of stk.data) op(ctx);
		return drawingStack(ctx, stk);
	};
	return {
		push: push$1,
		pop: pop$1,
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
	const draw = (path$1) => {
		if (isQuadraticBezier(path$1)) quadraticBezier(ctx, path$1, opts);
		else if (isLine(path$1)) line$1(ctx, path$1, opts);
		else throw new Error(`Unknown path type ${JSON.stringify(path$1)}`);
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
	if (opts === void 0) opts = {};
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
			strokeStyle: multiplyOpacity$1(opts.strokeStyle ?? `silver`, .6),
			fillStyle: multiplyOpacity$1(opts.fillStyle ?? `yellow`, .4)
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
			strokeStyle: multiplyOpacity$1(opts.strokeStyle ?? `silver`, .6),
			fillStyle: multiplyOpacity$1(opts.fillStyle ?? `yellow`, .4)
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
const line$1 = (ctx, toDraw, opts = {}) => {
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
		connectedPoints(ctx, corners$1(t), {
			...opts,
			loop: true
		});
		if (opts.debug) pointLabels(ctx, corners$1(t), void 0, [
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
* Returns the width of `text`. Rounds number up to nearest multiple if provided. If
* text is empty or undefined, 0 is returned.
* @param ctx
* @param text
* @param widthMultiple
* @returns
*/
const textWidth = (ctx, text$1, padding = 0, widthMultiple) => {
	const rect$1 = textRect(ctx, text$1, padding, widthMultiple);
	return rect$1.width;
};
const textRect = (ctx, text$1, padding = 0, widthMultiple) => {
	if (text$1 === void 0 || text$1 === null || text$1.length === 0) return Empty;
	const m = ctx.measureText(text$1);
	const width = widthMultiple ? quantiseEvery(m.width, widthMultiple) + padding : m.width + padding;
	return {
		width,
		height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
	};
};
const textHeight = (ctx, text$1, padding = 0) => {
	const rect$1 = textRect(ctx, text$1, padding);
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
	for (const [index, line$2] of lines.entries()) {
		ctx.fillText(line$2, x, y);
		y += heights[index];
	}
};
/**
* Draws an aligned text block
*/
const textBlockAligned = (ctx, text$1, opts) => {
	const { bounds } = opts;
	const { horiz = `left`, vert = `top` } = opts;
	const lines = typeof text$1 === `string` ? [text$1] : text$1;
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
	for (const [index, line$2] of lines.entries()) {
		let x = 0;
		if (horiz === `center`) x = middleX - blocks[index].width / 2;
		else if (horiz === `right`) x = bounds.width - blocks[index].width;
		ctx.fillText(line$2, x, y);
		y += heights[index];
	}
	ctx.restore();
};

//#endregion
//#region ../packages/visual/dist/src/colour/hsl.js
var hsl_exports = {};
__export(hsl_exports, {
	fromCssAbsolute: () => fromCssAbsolute,
	fromCssScalar: () => fromCssScalar,
	fromHexString: () => fromHexString$1,
	generateScalar: () => generateScalar,
	guard: () => guard$5,
	toAbsolute: () => toAbsolute,
	toCssString: () => toCssString$1,
	toScalar: () => toScalar$1,
	withOpacity: () => withOpacity$4
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
const withOpacity$4 = (value, fn) => {
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
const fromHexString$1 = (hexString) => fromLibrary$1(hex2hsl(hexString));
const fromCssAbsolute = (value, options = {}) => {
	value = value.toLowerCase();
	if (value.startsWith(`#`)) return fromHexString$1(value);
	if (value === `transparent`) return hslTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$1(cssDefinedHexColours[value]);
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
	return fromLibrary$1(c, options);
};
const fromCssScalar = (value, options = {}) => toScalar$1(fromCssAbsolute(value, options));
const toCssString$1 = (hsl) => {
	const abs = toAbsolute(hsl);
	let css = `hsl(${abs.h}deg ${abs.s}% ${abs.l}%`;
	if (`opacity` in abs && abs.opacity !== void 0 && abs.opacity < 100) css += ` / ${abs.opacity}%`;
	css += ")";
	return css;
};
const fromLibrary$1 = (hsl, parsingOptions = {}) => {
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
const toAbsolute = (hsl) => {
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
const generateScalar = (absoluteHslOrVariable, saturation = 1, lightness = .5, opacity = 1) => {
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
const toScalar$1 = (hsl) => {
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
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 100, `s`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(h, `percentage`, `h`), numberTest(s, `percentage`, `s`), numberTest(l, `percentage`, `l`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
};

//#endregion
//#region ../packages/visual/dist/src/colour/css-colours.js
/**
* Converts from some kind of colour that is legal in CSS
*
* Handles: hex format, CSS variables, colour names
* to an object
* @param colour
* @returns
*/
const fromCssColour = (colour) => {
	if (colour.startsWith(`#`)) return fromHexString(colour);
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return fromHexString(cssDefinedHexColours[colour]);
	if (colour.startsWith(`--`)) {
		const fromCss = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss.length === 0 || fromCss === null) throw new Error(`Variable missing: ${colour}`);
		return fromCssColour(fromCss);
	}
	colour = colour.toLowerCase();
	if (colour.startsWith(`hsl(`) || colour.startsWith(`hsla(`)) return fromCssAbsolute(colour);
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
//#region ../packages/visual/dist/src/colour/srgb.js
var srgb_exports = {};
__export(srgb_exports, {
	fromCss8bit: () => fromCss8bit,
	fromHexString: () => fromHexString,
	guard: () => guard$4,
	to8bit: () => to8bit,
	toCssString: () => toCssString,
	toScalar: () => toScalar,
	withOpacity: () => withOpacity$3
});
const withOpacity$3 = (value, fn) => {
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
const fromHexString = (hexString) => fromLibrary(hex2rgb(hexString));
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
	if (value.startsWith(`#`)) return fromHexString(value);
	if (value === `transparent`) return srgbTansparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString(cssDefinedHexColours[value]);
	if (!value.startsWith(`rgb(`) && !value.startsWith(`rgba(`)) try {
		const converted = convert(value, `rgb`);
		value = converted;
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	const c = extractColorParts(value);
	if (c.model !== `rgb`) throw new Error(`Expecting RGB colour space. Got: ${c.model}`);
	return fromLibrary(c);
};
const toCssString = (rgb) => {
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
const fromLibrary = (rgb) => {
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
const toScalar = (rgb) => {
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
//#region ../packages/visual/dist/src/image-data-grid.js
var image_data_grid_exports = {};
__export(image_data_grid_exports, {
	accessor: () => accessor,
	byColumn: () => byColumn,
	byRow: () => byRow,
	grid: () => grid$1,
	setter: () => setter,
	wrap: () => wrap
});
/**
* Returns a {@link Grids.Grid} based on the provided `image`
* @param image ImageData
* @returns Grid
*/
const grid$1 = (image) => {
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
		...grid$1(image),
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
	const g = grid$1(image);
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
	const g = grid$1(image);
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
	const g = grid$1(image);
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
	const g = grid$1(image);
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
//#region ../packages/visual/dist/src/canvas-helper.js
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
		if (!this.#drawHelper) this.#drawHelper = makeHelper$1(this.#getContext(), {
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
		const grid$2 = grid$1(data);
		const get = accessor(data);
		const set = setter(data);
		const flip = () => {
			ctx.putImageData(data, 0, 0);
		};
		return {
			grid: grid$2,
			get,
			set,
			flip
		};
	}
};

//#endregion
//#region ../packages/visual/dist/src/svg/apply.js
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
//#region ../packages/visual/dist/src/svg/bounds.js
/**
* Get the bounds of an SVG element (determined by its width/height attribs)
* @param svg
* @returns
*/
const getBounds = (svg) => {
	const w = svg.getAttributeNS(null, `width`);
	const width = w === null ? 0 : Number.parseFloat(w);
	const h = svg.getAttributeNS(null, `height`);
	const height = h === null ? 0 : Number.parseFloat(h);
	return {
		width,
		height
	};
};
/**
* Set the bounds of an element, using its width/height attribs.
* @param svg
* @param bounds
*/
const setBounds = (svg, bounds) => {
	svg.setAttributeNS(null, `width`, bounds.width.toString());
	svg.setAttributeNS(null, `height`, bounds.height.toString());
};

//#endregion
//#region ../packages/visual/dist/src/svg/create.js
/**
* Creates an element of `type` and with `id` (if specified)
* @param type Element type, eg `circle`
* @param id Optional id to assign to element
* @returns Element
*/
const createEl = (type, id) => {
	const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
	if (id) m.id = id;
	return m;
};
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
//#region ../packages/visual/dist/src/colour/types.js
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
//#region ../packages/visual/dist/src/colour/conversion.js
const toCssColour$1 = (colour) => {
	if (typeof colour === `string`) return colour;
	if (isHsl(colour)) return toCssString$1(colour);
	if (isRgb(colour)) return toCssString(colour);
	const asRgb = tryParseObjectToRgb(colour);
	if (asRgb) return toCssString(asRgb);
	const asHsl = tryParseObjectToHsl(colour);
	if (asHsl) return toCssString$1(asHsl);
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
const toColour$1 = (colourish) => {
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
			const c = toColour$1(colour);
			return toCssColour$1(c);
		} catch {}
	}
	return `rebeccapurple`;
};

//#endregion
//#region ../packages/visual/dist/src/svg/stroke.js
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
//#region ../packages/visual/dist/src/svg/markers.js
const createMarker = (id, opts, childCreator) => {
	const m = createEl(`marker`, id);
	if (opts.markerWidth) m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
	if (opts.markerHeight) m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
	if (opts.orient) m.setAttribute(`orient`, opts.orient.toString());
	else m.setAttribute(`orient`, `auto-start-reverse`);
	if (opts.viewBox) m.setAttribute(`viewBox`, opts.viewBox.toString());
	if (opts.refX) m.setAttribute(`refX`, opts.refX.toString());
	if (opts.refY) m.setAttribute(`refY`, opts.refY.toString());
	if (childCreator) {
		const c = childCreator();
		m.appendChild(c);
	}
	return m;
};
const markerPrebuilt = (elem, opts, _context) => {
	if (elem === null) return `(elem null)`;
	const parent = elem.ownerSVGElement;
	if (parent === null) throw new Error(`parent for elem is null`);
	const defsEl = createOrResolve(parent, `defs`, `defs`);
	let defEl = defsEl.querySelector(`#${opts.id}`);
	if (defEl !== null) return `url(#${opts.id})`;
	if (opts.id === `triangle`) {
		opts = {
			...opts,
			strokeStyle: `transparent`
		};
		if (!opts.markerHeight) opts = {
			...opts,
			markerHeight: 6
		};
		if (!opts.markerWidth) opts = {
			...opts,
			markerWidth: 6
		};
		if (!opts.refX) opts = {
			...opts,
			refX: opts.markerWidth
		};
		if (!opts.refY) opts = {
			...opts,
			refY: opts.markerHeight
		};
		if (!opts.fillStyle || opts.fillStyle === `none`) opts = {
			...opts,
			fillStyle: `black`
		};
		if (!opts.viewBox) opts = {
			...opts,
			viewBox: `0 0 10 10`
		};
		defEl = createMarker(opts.id, opts, () => {
			const tri = createEl(`path`);
			tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
			if (opts) applyOpts(tri, opts);
			return tri;
		});
	} else throw new Error(`Do not know how to make ${opts.id}`);
	defEl.id = opts.id;
	defsEl.appendChild(defEl);
	return `url(#${opts.id})`;
};

//#endregion
//#region ../packages/visual/dist/src/svg/path.js
/**
* Applies path drawing options to given element
* Applies: markerEnd, markerStart, markerMid
* @param elem Element (presumed path)
* @param opts Options
*/
const applyPathOpts = (elem, opts) => {
	if (opts.markerEnd) elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerEnd, opts));
	if (opts.markerStart) elem.setAttribute(`marker-start`, markerPrebuilt(elem, opts.markerStart, opts));
	if (opts.markerMid) elem.setAttribute(`marker-mid`, markerPrebuilt(elem, opts.markerMid, opts));
};

//#endregion
//#region ../packages/visual/dist/src/svg/elements.js
var elements_exports = {};
__export(elements_exports, {
	circle: () => circle,
	circleUpdate: () => circleUpdate,
	grid: () => grid,
	group: () => group,
	groupUpdate: () => groupUpdate,
	line: () => line,
	lineUpdate: () => lineUpdate,
	path: () => path,
	pathUpdate: () => pathUpdate,
	polarRayUpdate: () => polarRayUpdate,
	text: () => text,
	textPath: () => textPath,
	textPathUpdate: () => textPathUpdate,
	textUpdate: () => textUpdate
});
const numberOrPercentage = (v) => {
	if (v >= 0 && v <= 1) return `${v * 100}%`;
	return v.toString();
};
/**
* Creates and adds an SVG path element
* @example
* ```js
* const paths = [
*  `M300,200`,
*  `a25,25 -30 0,1 50, -25 l 50,-25`
* ]
* const pathEl = path(paths, parentEl);
* ```
* @param svgOrArray Path syntax, or array of paths. Can be empty if path data will be added later
* @param parent SVG parent element
* @param opts Options Drawing options
* @returns
*/
const path = (svgOrArray, parent, opts, queryOrExisting) => {
	const elem = createOrResolve(parent, `path`, queryOrExisting);
	const svg = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`\n`);
	elem.setAttributeNS(null, `d`, svg);
	parent.append(elem);
	return pathUpdate(elem, opts);
};
const pathUpdate = (elem, opts) => {
	if (opts) applyOpts(elem, opts);
	if (opts) applyStrokeOpts(elem, opts);
	return elem;
};
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
/**
* Creates or resuses a `SVGGElement` (group)
*
* To update an existing elemnet, use `groupUpdate`
* @param children
* @param parent
* @param queryOrExisting
* @returns
*/
const group = (children, parent, queryOrExisting) => {
	const p = createOrResolve(parent, `g`, queryOrExisting);
	return groupUpdate(p, children);
};
const groupUpdate = (elem, children) => {
	for (const c of children) if (c.parentNode !== elem) elem.append(c);
	return elem;
};
/**
* Creates or reuses a SVGLineElement.
*
* @param line
* @param parent
* @param opts
* @param queryOrExisting
* @returns
*/
const line = (line$2, parent, opts, queryOrExisting) => {
	const lineEl = createOrResolve(parent, `line`, queryOrExisting);
	return lineUpdate(lineEl, line$2, opts);
};
/**
* Updates a SVGLineElement instance with potentially changed line and drawing data
* @param lineEl
* @param line
* @param opts
* @returns
*/
const lineUpdate = (lineEl, line$2, opts) => {
	lineEl.setAttributeNS(null, `x1`, line$2.a.x.toString());
	lineEl.setAttributeNS(null, `y1`, line$2.a.y.toString());
	lineEl.setAttributeNS(null, `x2`, line$2.b.x.toString());
	lineEl.setAttributeNS(null, `y2`, line$2.b.y.toString());
	if (opts) applyOpts(lineEl, opts);
	if (opts) applyPathOpts(lineEl, opts);
	if (opts) applyStrokeOpts(lineEl, opts);
	return lineEl;
};
const polarRayUpdate = (lineEl, ray, opts) => {
	const l = toCartesian$1(ray);
	lineEl.setAttributeNS(null, `x1`, l.a.x.toString());
	lineEl.setAttributeNS(null, `y1`, l.a.y.toString());
	lineEl.setAttributeNS(null, `x2`, l.b.x.toString());
	lineEl.setAttributeNS(null, `y2`, l.b.y.toString());
	if (opts) applyOpts(lineEl, opts);
	if (opts) applyPathOpts(lineEl, opts);
	if (opts) applyStrokeOpts(lineEl, opts);
	return lineEl;
};
/**
* Updates an existing SVGTextPathElement instance with text and drawing options
* @param el
* @param text
* @param opts
* @returns
*/
const textPathUpdate = (el, text$1, opts) => {
	if (opts?.method) el.setAttributeNS(null, `method`, opts.method);
	if (opts?.side) el.setAttributeNS(null, `side`, opts.side);
	if (opts?.spacing) el.setAttributeNS(null, `spacing`, opts.spacing);
	if (opts?.startOffset) el.setAttributeNS(null, `startOffset`, numberOrPercentage(opts.startOffset));
	if (opts?.textLength) el.setAttributeNS(null, `textLength`, numberOrPercentage(opts.textLength));
	if (text$1) el.textContent = text$1;
	if (opts) applyOpts(el, opts);
	if (opts) applyStrokeOpts(el, opts);
	return el;
};
/**
* Creates or reuses a SVGTextPathElement.
* @param pathReference
* @param text
* @param parent
* @param opts
* @param textQueryOrExisting
* @param pathQueryOrExisting
* @returns
*/
const textPath = (pathReference, text$1, parent, opts, textQueryOrExisting, pathQueryOrExisting) => {
	const textEl = createOrResolve(parent, `text`, textQueryOrExisting, `-text`);
	textUpdate(textEl, void 0, void 0, opts);
	const p = createOrResolve(textEl, `textPath`, pathQueryOrExisting);
	p.setAttributeNS(null, `href`, pathReference);
	return textPathUpdate(p, text$1, opts);
};
/**
* Updates an existing SVGTextElement instance with position, text and drawing options
* @param el
* @param pos
* @param text
* @param opts
* @returns
*/
const textUpdate = (el, pos, text$1, opts) => {
	if (pos) {
		el.setAttributeNS(null, `x`, pos.x.toString());
		el.setAttributeNS(null, `y`, pos.y.toString());
	}
	if (text$1) el.textContent = text$1;
	if (opts) {
		applyOpts(el, opts);
		if (opts) applyStrokeOpts(el, opts);
		if (opts.anchor) el.setAttributeNS(null, `text-anchor`, opts.anchor);
		if (opts.align) el.setAttributeNS(null, `alignment-baseline`, opts.align);
		const userSelect = opts.userSelect ?? true;
		if (!userSelect) el.style.userSelect = `none`;
	}
	return el;
};
/**
* Creates or reuses a SVGTextElement
* @param pos Position of text
* @param text Text
* @param parent
* @param opts
* @param queryOrExisting
* @returns
*/
const text = (text$1, parent, pos, opts, queryOrExisting) => {
	const p = createOrResolve(parent, `text`, queryOrExisting);
	return textUpdate(p, pos, text$1, opts);
};
/**
* Creates a square grid based at a center point, with cells having `spacing` height and width.
*
* It fits in as many cells as it can within `width` and `height`.
*
* Returns a SVG group, consisting of horizontal and vertical lines
* @param parent Parent element
* @param center Center point of grid
* @param spacing Width/height of cells
* @param width How wide grid should be
* @param height How high grid should be
* @param opts
*/
const grid = (parent, center, spacing, width, height, opts = {}) => {
	if (!opts.strokeStyle) opts = {
		...opts,
		strokeStyle: toStringFirst(`bg-dim`, `silver`)
	};
	if (!opts.strokeWidth) opts = {
		...opts,
		strokeWidth: 1
	};
	const g = createEl(`g`);
	applyOpts(g, opts);
	applyPathOpts(g, opts);
	applyStrokeOpts(g, opts);
	let y = 0;
	while (y < height) {
		const horiz = fromNumbers(0, y, width, y);
		line(horiz, g);
		y += spacing;
	}
	let x = 0;
	while (x < width) {
		const vert = fromNumbers(x, 0, x, height);
		line(vert, g);
		x += spacing;
	}
	parent.append(g);
	return g;
};

//#endregion
//#region ../packages/visual/dist/src/svg/geometry.js
/**
* Returns a Line type from an SVGLineElement
* @param el SVG Line Element
* @returns
*/
const lineFromSvgLine = (el) => {
	if (!el) throw new Error(`Param 'el' is undefined`);
	const a = {
		x: el.x1.baseVal.value,
		y: el.y1.baseVal.value
	};
	const b = {
		x: el.x2.baseVal.value,
		y: el.y2.baseVal.value
	};
	return {
		a,
		b
	};
};
const polarRayFromSvgLine = (el, origin) => {
	const l = lineFromSvgLine(el);
	return fromLine(l, origin);
};

//#endregion
//#region ../packages/visual/dist/src/svg/remove.js
/**
* Removes an SVG element from a parent
* @param parent Parent
* @param queryOrExisting Query or existing element
* @returns
*/
const remove = (parent, queryOrExisting) => {
	if (typeof queryOrExisting === `string`) {
		const elem = parent.querySelector(queryOrExisting);
		if (elem === null) return;
		elem.remove();
	} else queryOrExisting.remove();
};
/**
* Removes all children of `parent`, but not `parent` itself.
* @param parent
*/
const clear = (parent) => {
	let c = parent.lastElementChild;
	while (c) {
		c.remove();
		c = parent.lastElementChild;
	}
};

//#endregion
//#region ../packages/visual/dist/src/svg/helper.js
/**
* Creates a {@link SvgHelper} for the creating and management of SVG elements.
* @param parent
* @param parentOpts
* @returns
*/
const makeHelper = (parent, parentOpts) => {
	if (parentOpts) {
		applyOpts(parent, parentOpts);
		applyStrokeOpts(parent, parentOpts);
	}
	const o = {
		remove: (queryOrExisting) => {
			remove(parent, queryOrExisting);
		},
		text: (text$1, pos, opts, queryOrExisting) => text(text$1, parent, pos, opts, queryOrExisting),
		textPath: (pathReference, text$1, opts, textQueryOrExisting, pathQueryOrExisting) => textPath(pathReference, text$1, parent, opts, textQueryOrExisting, pathQueryOrExisting),
		line: (line$2, opts, queryOrExisting) => line(line$2, parent, opts, queryOrExisting),
		circle: (circle$2, opts, queryOrExisting) => circle(circle$2, parent, opts, queryOrExisting),
		path: (svgString, opts, queryOrExisting) => path(svgString, parent, opts, queryOrExisting),
		grid: (center, spacing, width, height, opts) => grid(parent, center, spacing, width, height, opts),
		query: (selectors) => parent.querySelector(selectors),
		get width() {
			const w = parent.getAttributeNS(null, `width`);
			if (w === null) return 0;
			return Number.parseFloat(w);
		},
		set width(width) {
			parent.setAttributeNS(null, `width`, width.toString());
		},
		get parent() {
			return parent;
		},
		get height() {
			const w = parent.getAttributeNS(null, `height`);
			if (w === null) return 0;
			return Number.parseFloat(w);
		},
		set height(height) {
			parent.setAttributeNS(null, `height`, height.toString());
		},
		clear: () => {
			while (parent.firstChild) parent.lastChild.remove();
		}
	};
	return o;
};

//#endregion
//#region ../packages/visual/dist/src/svg/index.js
var svg_exports = {};
__export(svg_exports, {
	Elements: () => elements_exports,
	applyOpts: () => applyOpts,
	applyPathOpts: () => applyPathOpts,
	applyStrokeOpts: () => applyStrokeOpts,
	clear: () => clear,
	createEl: () => createEl,
	createMarker: () => createMarker,
	createOrResolve: () => createOrResolve,
	getBounds: () => getBounds,
	lineFromSvgLine: () => lineFromSvgLine,
	makeHelper: () => makeHelper,
	markerPrebuilt: () => markerPrebuilt,
	polarRayFromSvgLine: () => polarRayFromSvgLine,
	remove: () => remove,
	setBounds: () => setBounds
});

//#endregion
//#region ../packages/visual/dist/src/pointer-visualise.js
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
//#region ../packages/visual/dist/src/colour/generate.js
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
//#region ../packages/visual/dist/src/colour/math.js
function multiplyOpacity(colourish, amount) {
	return withOpacity$2(colourish, (o) => clamp(o * amount));
}
function withOpacity$2(colourish, fn) {
	const colour = toColour$1(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity$4(colour, fn);
			break;
		case `srgb`:
			result = withOpacity$3(colour, fn);
			break;
		default: throw new Error(`Unknown space: '${colour.space}'. Expected hsl, srgb, oklch`);
	}
	if (!result) throw new Error(`Is colour in correct form?`);
	if (typeof colourish === `string`) return toCssColour$1(result);
	return result;
}

//#endregion
//#region ../packages/visual/dist/src/colour/index.js
var colour_exports = {};
__export(colour_exports, {
	HslSpace: () => hsl_exports,
	SrgbSpace: () => srgb_exports,
	convert: () => convert$1,
	cssDefinedHexColours: () => cssDefinedHexColours,
	fromCssColour: () => fromCssColour,
	goldenAngleColour: () => goldenAngleColour,
	guard: () => guard$3,
	multiplyOpacity: () => multiplyOpacity,
	randomHue: () => randomHue,
	toColour: () => toColour$1,
	toCssColour: () => toCssColour$1,
	toStringFirst: () => toStringFirst,
	withOpacity: () => withOpacity$2
});

//#endregion
//#region ../packages/visual/dist/src/video.js
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
//#region src/visual.ts
var visual_exports = {};
__export(visual_exports, {
	CanvasHelper: () => CanvasHelper,
	Colour: () => colour_exports,
	Drawing: () => drawing_exports,
	ImageDataGrid: () => image_data_grid_exports,
	Svg: () => svg_exports,
	Video: () => video_exports,
	pointerVisualise: () => pointerVisualise
});

//#endregion
export { CanvasHelper, colour_exports, drawing_exports, image_data_grid_exports, pointerVisualise, svg_exports, video_exports, visual_exports };
//# sourceMappingURL=visual-BemaymgY.js.map