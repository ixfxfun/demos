import { __export } from "./chunk-Cl8Af3a2.js";
import { numberInclusiveRangeTest$2 as numberInclusiveRangeTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-Dp7VYKrL.js";
import { arrayTest$2 as arrayTest } from "./arrays-DK3ULiCq.js";
import { cloneFromFields$2 as cloneFromFields } from "./records-DdxuexLd.js";
import { continuously$2 as continuously } from "./continuously-DAkCoRSm.js";
import { intervalToMs$2 as intervalToMs } from "./interval-type-ClgeI-0m.js";
import { SimpleEventEmitter$2 as SimpleEventEmitter } from "./simple-event-emitter-t3Reuycz.js";
import { clamp$2 as clamp, clampIndex$2 as clampIndex } from "./clamp-BOARHdp2.js";
import { guard$1 as guard, guard$2 as guard$1, isPoint, isPositioned, isRect } from "./guard-B1JeQCTa.js";
import { Placeholder, angleRadian, corners, distance, getPointParameter, joinPointsToLines, subtract } from "./corners-Bm7AWbdG.js";
import { guard as guard$2, isCubicBezier, isLine, isQuadraticBezier, length } from "./guard-DtZLjFlb.js";
import { TrackedValueMap } from "./tracker-base-lIhvOloS.js";
import { ObjectTracker } from "./object-tracker-BJ4Ulzol.js";
import { Empty$1 as Empty, EmptyPositioned } from "./empty-CUtyefMc.js";
import { resolveEl$2 as resolveEl } from "./resolve-el-CYwbLz6U.js";
import { HslSpace, SrgbSpace, extractColorParts, hex2rgb, toColour, toCssColour } from "./conversion-D7bZsh7V.js";

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
const fromLineCartesian = (line$1) => subtract(line$1.b, line$1.a);
/**
* Returns a polar-coordinate vector from a line a -> b
* @param line
* @returns
*/
const fromLinePolar = (line$1) => {
	guard$2(line$1, `line`);
	const pt = subtract(line$1.b, line$1.a);
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
//#region ../packages/geometry/src/rect/placeholder.ts
const Placeholder$1 = Object.freeze({
	width: Number.NaN,
	height: Number.NaN
});
const PlaceholderPositioned = Object.freeze({
	x: Number.NaN,
	y: Number.NaN,
	width: Number.NaN,
	height: Number.NaN
});

//#endregion
//#region ../packages/geometry/src/grid/inside.ts
/**
* Returns _true_ if cell coordinates are above zero and within bounds of grid
*
* @param grid
* @param cell
* @return
*/
const inside = (grid$1, cell) => {
	if (cell.x < 0 || cell.y < 0) return false;
	if (cell.x >= grid$1.cols || cell.y >= grid$1.rows) return false;
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
const guardCell = (cell, parameterName = `Param`, grid$1) => {
	if (cell === void 0) throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
	if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
	if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
	if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
	if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
	if (!Number.isInteger(cell.x)) throw new TypeError(parameterName + `.x is non-integer`);
	if (!Number.isInteger(cell.y)) throw new TypeError(parameterName + `.y is non-integer`);
	if (grid$1 !== void 0 && !inside(grid$1, cell)) throw new Error(`${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid$1.cols}, ${grid$1.rows}`);
};
/**
* Throws an exception if any of the grid's parameters are invalid
* @param grid
* @param parameterName
*/
const guardGrid = (grid$1, parameterName = `Param`) => {
	if (grid$1 === void 0) throw new Error(`${parameterName} is undefined. Expecting grid.`);
	if (!(`rows` in grid$1)) throw new Error(`${parameterName}.rows is undefined`);
	if (!(`cols` in grid$1)) throw new Error(`${parameterName}.cols is undefined`);
	if (!Number.isInteger(grid$1.rows)) throw new TypeError(`${parameterName}.rows is not an integer`);
	if (!Number.isInteger(grid$1.cols)) throw new TypeError(`${parameterName}.cols is not an integer`);
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
const applyBounds = function(grid$1, cell, wrap$1 = `undefined`) {
	guardGrid(grid$1, `grid`);
	guardCell(cell, `cell`);
	let x = cell.x;
	let y = cell.y;
	switch (wrap$1) {
		case `wrap`: {
			x = x % grid$1.cols;
			y = y % grid$1.rows;
			if (x < 0) x = grid$1.cols + x;
			else if (x >= grid$1.cols) x -= grid$1.cols;
			if (y < 0) y = grid$1.rows + y;
			else if (y >= grid$1.rows) y -= grid$1.rows;
			x = Math.abs(x);
			y = Math.abs(y);
			break;
		}
		case `stop`: {
			x = clampIndex(x, grid$1.cols);
			y = clampIndex(y, grid$1.rows);
			break;
		}
		case `undefined`: {
			if (x < 0 || y < 0) return;
			if (x >= grid$1.cols || y >= grid$1.rows) return;
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
function* cells(grid$1, start, wrap$1 = true) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	guardGrid(grid$1, `grid`);
	guardCell(start, `start`, grid$1);
	let { x, y } = start;
	let canMove = true;
	do {
		yield {
			x,
			y
		};
		x++;
		if (x === grid$1.cols) {
			y++;
			x = 0;
		}
		if (y === grid$1.rows) if (wrap$1) {
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
const rows = function* (grid$1, start) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	let row = start.y;
	let rowCells = [];
	for (const c of cells(grid$1, start)) if (c.y === row) rowCells.push(c);
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
const offset = function(grid$1, start, vector, bounds = `undefined`) {
	return applyBounds(grid$1, {
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
const indexFromCell = (grid$1, cell, wrap$1) => {
	guardGrid(grid$1, `grid`);
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
			cell = offset(grid$1, {
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
				y: grid$1.rows + cell.y
			};
			break;
		}
	}
	if (cell.x >= grid$1.cols) switch (wrap$1) {
		case `stop`: {
			cell = {
				...cell,
				x: grid$1.cols - 1
			};
			break;
		}
		case `unbounded`: throw new Error(`unbounded not supported`);
		case `undefined`: return void 0;
		case `wrap`: {
			cell = {
				...cell,
				x: cell.x % grid$1.cols
			};
			break;
		}
	}
	if (cell.y >= grid$1.rows) switch (wrap$1) {
		case `stop`: {
			cell = {
				...cell,
				y: grid$1.rows - 1
			};
			break;
		}
		case `unbounded`: throw new Error(`unbounded not supported`);
		case `undefined`: return void 0;
		case `wrap`: {
			cell = {
				...cell,
				y: cell.y % grid$1.rows
			};
			break;
		}
	}
	const index = cell.y * grid$1.cols + cell.x;
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
		guard(size, `size`);
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
	return withOpacity$3(colourish, (o) => clamp(o * amount));
}
function withOpacity$3(colourish, fn) {
	const colour = toColour(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = HslSpace.withOpacity(colour, fn);
			break;
		case `srgb`:
			result = SrgbSpace.withOpacity(colour, fn);
			break;
		default: throw new Error(`Unknown space: '${colour.space}'. Expected hsl, srgb, oklch`);
	}
	if (!result) throw new Error(`Is colour in correct form?`);
	if (typeof colourish === `string`) return toCssColour(result);
	return result;
}

//#endregion
//#region ../packages/visual/dist/src/drawing.js
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
	for (const [index, pt] of pts.entries()) guard$1(pt, `Index ${index}`);
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
	for (const [index, pt] of pts.entries()) guard$1(pt, `Index ${index}`);
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
//#region ../packages/visual/dist/src/colour/srgb.js
const withOpacity$2 = (value, fn) => {
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
const fromCss = (value) => {
	if (value.startsWith(`rgb`)) throw new Error(`Expecting CSS string in the form of 'rgb(...)'. Got: '${value}'`);
	const c = extractColorParts(value);
	if (c.model !== `rgb`) throw new Error(`Expecting RGB colour space. Got: ${c.model}`);
	return fromLibrary$1(c);
};
const toCss$1 = (rgb) => {
	guard$5(rgb);
	switch (rgb.unit) {
		case `8bit`: return `rgb(${rgb.r} ${rgb.b} ${rgb.g} / ${(rgb.opacity ?? 255) / 255})`;
		case `scalar`: return `rgb(${rgb.r * 100}% ${rgb.b * 100}% ${rgb.g * 100}% / ${(rgb.opacity ?? 1) * 100}%)`;
		default: throw new Error(`Unknown unit: ${rgb.unit}`);
	}
};
const toLibrary$1 = (rgb) => {
	const abs = to8bit(rgb);
	return {
		r: abs.r,
		g: abs.g,
		b: abs.b,
		alpha: abs.opacity
	};
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
	guard$5(rgb);
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
	guard$5(rgb);
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
const guard$5 = (rgb) => {
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
const SrgbSpace$1 = {
	withOpacity: withOpacity$2,
	toCss: toCss$1,
	fromCss,
	toLibrary: toLibrary$1,
	fromLibrary: fromLibrary$1,
	guard: guard$5,
	toScalar: toScalar$1,
	to8bit
};

//#endregion
//#region ../packages/visual/dist/src/image-data-grid.js
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
* Returns a {@link Grids.Grid} based on the provided `image`
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
		const pixel = SrgbSpace$1.to8bit(value);
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
		if (!this.#drawHelper) this.#drawHelper = makeHelper(this.#getContext(), {
			width: this.width,
			height: this.height
		});
	}
	setLogicalSize(logicalSize) {
		guard(logicalSize, `logicalSize`);
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
//#region ../packages/visual/dist/src/svg/create.js
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
//#region ../packages/visual/dist/src/colour/hsl.js
const withOpacity$1 = (value, fn) => {
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
const fromCssAbsolute = (value, options = {}) => {
	if (value.startsWith(`hsl`)) if (options.fallbackString) value = options.fallbackString;
	else throw new Error(`Expecting CSS string in the form of 'hsl(...) or hsla(...)'. Got: '${value}'`);
	const c = extractColorParts(value);
	if (c.model !== `hsl`) {
		if (options.fallbackColour) return options.fallbackColour;
		throw new Error(`Expecting HSL colour space. Got: ${c.model}`);
	}
	return fromLibrary(c, options);
};
const fromCssScalar = (value, options = {}) => toScalar(fromCssAbsolute(value, options));
const toCss = (hsl) => {
	const abs = toAbsolute(hsl);
	let css = `hsl(${abs.h}deg ${abs.s}% ${abs.l}%`;
	if (`opacity` in abs && abs.opacity !== void 0) css += ` / ${abs.opacity / 100}`;
	css += ")";
	return css;
};
const toLibrary = (hsl) => {
	const abs = toAbsolute(hsl);
	return {
		h: abs.h,
		s: abs.s,
		l: abs.l,
		alpha: abs.opacity
	};
};
const fromLibrary = (hsl, parsingOptions = {}) => {
	if (typeof hsl === `undefined` || hsl === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	resultThrow(numberInclusiveRangeTest(hsl.h, 0, 255, `h`), numberInclusiveRangeTest(hsl.s, 0, 255, `s`), numberInclusiveRangeTest(hsl.l, 0, 255, `l`), numberInclusiveRangeTest(hsl.alpha, 0, 100, `alpha`));
	return {
		h: hsl.h,
		s: hsl.s,
		l: hsl.l,
		opacity: hsl.alpha ?? 100,
		unit: `absolute`,
		space: `hsl`
	};
};
const toAbsolute = (hsl) => {
	guard$4(hsl);
	if (hsl.unit === `absolute`) return hsl;
	return {
		h: hsl.h * 360,
		s: hsl.s * 100,
		l: hsl.l * 100,
		opacity: hsl.opacity ?? 100,
		unit: `absolute`,
		space: `hsl`
	};
};
const toScalar = (hsl) => {
	guard$4(hsl);
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
const guard$4 = (hsl) => {
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
const HslSpace$1 = {
	withOpacity: withOpacity$1,
	fromCssAbsolute,
	fromCssScalar,
	toCss,
	toLibrary,
	fromLibrary,
	guard: guard$4,
	toScalar,
	toAbsolute
};

//#endregion
//#region ../packages/visual/dist/src/colour/css-colours.js
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
	"yellowgreen": "#9acd32"
};

//#endregion
//#region ../packages/visual/dist/src/colour/conversion.js
const hexStringToColour = (hexString) => {
	const rgb = hex2rgb(hexString);
	return SrgbSpace$1.fromLibrary(rgb);
};
const toCssColour$1 = (colour) => {
	if (typeof colour === `string`) return colour;
	if (isHsl(colour)) return HslSpace$1.toCss(colour);
	if (isRgb(colour)) return SrgbSpace$1.toCss(colour);
	throw new Error(`Unknown colour format: '${JSON.stringify(colour)}'`);
};
const fromCssColour = (colour) => {
	if (colour.startsWith(`#`)) return hexStringToColour(colour);
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return hexStringToColour(cssDefinedHexColours[colour]);
	if (colour.startsWith(`--`)) {
		const fromCss$1 = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss$1.length === 0) throw new Error(`Variable missing: ${colour}`);
		if (fromCss$1.startsWith(`#`)) hexStringToColour(fromCss$1);
		if (fromCss$1.startsWith(`rgb`)) return SrgbSpace$1.fromCss(fromCss$1);
		if (fromCss$1.startsWith(`hsl`)) return HslSpace$1.fromCssScalar(fromCss$1);
		throw new Error(`CSS variable value not a hex, rgb or hsl colour function: '${fromCss$1}'`);
	}
	throw new Error(`String colour is not a hex colour nor well-defined colour name`);
};
const guard$3 = (colour) => {
	switch (colour.space) {
		case `hsl`:
			HslSpace$1.guard(colour);
			break;
		case `srgb`:
			SrgbSpace$1.guard(colour);
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
//#region ../packages/visual/dist/src/svg/elements.js
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
	return withOpacity(colourish, (o) => clamp(o * amount));
}
function withOpacity(colourish, fn) {
	const colour = toColour$1(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = HslSpace$1.withOpacity(colour, fn);
			break;
		case `srgb`:
			result = SrgbSpace$1.withOpacity(colour, fn);
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
	HslSpace: () => HslSpace$1,
	RgbSpace: () => SrgbSpace$1,
	fromCssColour: () => fromCssColour,
	goldenAngleColour: () => goldenAngleColour,
	guard: () => guard$3,
	multiplyOpacity: () => multiplyOpacity,
	randomHue: () => randomHue,
	toColour: () => toColour$1,
	toCssColour: () => toCssColour$1,
	toStringFirst: () => toStringFirst,
	withOpacity: () => withOpacity
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
	ImageDataGrid: () => image_data_grid_exports,
	Video: () => video_exports,
	pointerVisualise: () => pointerVisualise
});

//#endregion
export { CanvasHelper, colour_exports, image_data_grid_exports, pointerVisualise, video_exports, visual_exports };
//# sourceMappingURL=visual-Ch8aypBX.js.map