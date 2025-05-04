import { numberTest$2 as numberTest, percentTest$2 as percentTest, resultThrow$2 as resultThrow } from "./numbers-DtsSfeyJ.js";
import { getRectPositioned, guard$2 as guard, isPoint, isPoint3d } from "./guard-Bfaw8dgv.js";

//#region ../packages/geometry/src/line/from-points.ts
/**
* Returns a line from two points
* 
* ```js
* import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
* // Line from 0,1 to 10,15
* const line = Lines.fromPoints( { x:0, y:1 }, { x:10, y:15 });
* // line is: { a: { x: 0, y: 1}, b: { x: 10, y: 15 } };
* ```
* @param a Start point
* @param b End point
* @returns 
*/
const fromPoints = (a, b) => {
	guard(a, `a`);
	guard(b, `b`);
	a = Object.freeze({ ...a });
	b = Object.freeze({ ...b });
	return Object.freeze({
		a,
		b
	});
};

//#endregion
//#region ../packages/geometry/src/line/join-points-to-lines.ts
/**
* Returns an array of lines that connects provided points. Note that line is not closed.
* 
* Eg, if points a,b,c are provided, two lines are provided: a->b and b->c.
* 
* ```js
* import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
* const lines = Lines.joinPointsToLines(ptA, ptB, ptC);
* // lines is an array of, well, lines
* ```
* @param points 
* @returns 
*/
const joinPointsToLines = (...points) => {
	const lines = [];
	let start = points[0];
	for (let index = 1; index < points.length; index++) {
		lines.push(fromPoints(start, points[index]));
		start = points[index];
	}
	return lines;
};

//#endregion
//#region ../packages/geometry/src/line/guard.ts
/**
* Returns true if `p` is a valid line, containing `a` and `b` Points.
* ```js
* import { Lines } from 'https://unpkg.com/ixfx/dist/geometry.js'
* Lines.isLine(l);
* ```
* @param p Value to check
* @returns True if a valid line.
*/
const isLine = (p) => {
	if (p === void 0) return false;
	if (p.a === void 0) return false;
	if (p.b === void 0) return false;
	if (!isPoint(p.a)) return false;
	if (!isPoint(p.b)) return false;
	return true;
};
/**
* Returns true if `p` is a {@link PolyLine}, ie. an array of {@link Line}s.
* Validates all items in array.
* @param p 
* @returns
*/
const isPolyLine = (p) => {
	if (!Array.isArray(p)) return false;
	const valid = !p.some((v) => !isLine(v));
	return valid;
};
/**
* Throws an exception if:
* * line is undefined
* * a or b parameters are missing
* 
* Does not validate points
* @param line 
* @param name 
*/
const guard$1 = (line, name = `line`) => {
	if (line === void 0) throw new Error(`${name} undefined`);
	if (line.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`);
	if (line.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`);
};

//#endregion
//#region ../packages/geometry/src/line/get-points-parameter.ts
/**
* Returns [a,b] points from either a line parameter, or two points.
* It additionally applies the guardPoint function to ensure validity.
* This supports function overloading.
* @ignore
* @param aOrLine 
* @param b 
* @returns 
*/
const getPointParameter$1 = (aOrLine, b) => {
	let a;
	if (isLine(aOrLine)) {
		b = aOrLine.b;
		a = aOrLine.a;
	} else {
		a = aOrLine;
		if (b === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
	}
	guard(a, `a`);
	guard(a, `b`);
	return [a, b];
};

//#endregion
//#region ../packages/geometry/src/line/length.ts
/**
* Returns length of line, polyline or between two points
* 
* @param aOrLine Point A, line or polyline (array of lines)
* @param pointB Point B, if first parameter is a point
* @returns Length (total accumulated length for arrays)
*/
function length$1(aOrLine, pointB) {
	if (isPolyLine(aOrLine)) {
		const sum$1 = aOrLine.reduce((accumulator, v) => length$1(v) + accumulator, 0);
		return sum$1;
	}
	if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
	const [a, b] = getPointParameter$1(aOrLine, pointB);
	const x = b.x - a.x;
	const y = b.y - a.y;
	if (a.z !== void 0 && b.z !== void 0) {
		const z = b.z - a.z;
		return Math.hypot(x, y, z);
	} else return Math.hypot(x, y);
}

//#endregion
//#region ../packages/geometry/src/line/interpolate.ts
/**
* Calculates a point in-between a line's start and end points.
* 
* @param amount Interpolation amount
* @param aOrLine Line, or first point
* @param pointBOrAllowOverflow Second point (if needed) or allowOverflow.
* @param allowOverflow If true, interpolation amount is permitted to exceed 0..1, extending the line.
* @returns 
*/
function interpolate(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
	if (typeof pointBOrAllowOverflow === `boolean`) {
		allowOverflow = pointBOrAllowOverflow;
		pointBOrAllowOverflow = void 0;
	}
	if (!allowOverflow) resultThrow(percentTest(amount, `amount`));
	else resultThrow(numberTest(amount, ``, `amount`));
	const [a, b] = getPointParameter$1(aOrLine, pointBOrAllowOverflow);
	const d = length$1(a, b);
	const d2 = d * (1 - amount);
	if (d === 0 && d2 === 0) return Object.freeze({ ...b });
	const x = b.x - d2 * (b.x - a.x) / d;
	const y = b.y - d2 * (b.y - a.y) / d;
	return Object.freeze({
		...b,
		x,
		y
	});
}

//#endregion
//#region ../packages/geometry/src/point/get-point-parameter.ts
function getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6) {
	if (isPoint3d(a1) && isPoint3d(ab2)) return [a1, ab2];
	if (isPoint(a1) && isPoint(ab2)) return [a1, ab2];
	if (isPoint3d(a1)) {
		const b$1 = {
			x: ab2,
			y: ab3,
			z: ab4
		};
		if (!isPoint3d(b$1)) throw new Error(`Expected x, y & z parameters`);
		return [a1, b$1];
	}
	if (isPoint(a1)) {
		const b$1 = {
			x: ab2,
			y: ab3
		};
		if (!isPoint(b$1)) throw new Error(`Expected x & y parameters`);
		return [a1, b$1];
	}
	if (typeof ab5 !== `undefined` && typeof ab4 !== `undefined`) {
		const a$1 = {
			x: a1,
			y: ab2,
			z: ab3
		};
		const b$1 = {
			x: ab4,
			y: ab5,
			z: ab6
		};
		if (!isPoint3d(a$1)) throw new Error(`Expected x,y,z for first point`);
		if (!isPoint3d(b$1)) throw new Error(`Expected x,y,z for second point`);
		return [a$1, b$1];
	}
	const a = {
		x: a1,
		y: ab2
	};
	const b = {
		x: ab3,
		y: ab4
	};
	if (!isPoint(a)) throw new Error(`Expected x,y for first point`);
	if (!isPoint(b)) throw new Error(`Expected x,y for second point`);
	return [a, b];
}
/**
* Returns a Point form of either a point, x,y params or x,y,z params.
* If parameters are undefined, an empty point is returned (0, 0)
* @ignore
* @param a
* @param b
* @returns
*/
function getPointParameter(a, b, c) {
	if (a === void 0) return {
		x: 0,
		y: 0
	};
	if (Array.isArray(a)) {
		if (a.length === 0) return Object.freeze({
			x: 0,
			y: 0
		});
		if (a.length === 1) return Object.freeze({
			x: a[0],
			y: 0
		});
		if (a.length === 2) return Object.freeze({
			x: a[0],
			y: a[1]
		});
		if (a.length === 3) return Object.freeze({
			x: a[0],
			y: a[1],
			z: a[2]
		});
		throw new Error(`Expected array to be 1-3 elements in length. Got ${a.length}.`);
	}
	if (isPoint(a)) return a;
	else if (typeof a !== `number` || typeof b !== `number`) throw new TypeError(`Expected point or x,y as parameters. Got: a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
	if (typeof c === `number`) return Object.freeze({
		x: a,
		y: b,
		z: c
	});
	return Object.freeze({
		x: a,
		y: b
	});
}

//#endregion
//#region ../packages/geometry/src/point/distance.ts
/**
* Calculate distance between two points.
* If both points have a `z` property, the distance is 3D distance is calculated.
* If only one point has a `z`, it is ignored.
*
* ```js
* // Distance between two points
* const ptA = { x: 0.5, y:0.8 };
* const ptB = { x: 1, y: 0.4 };
* distance(ptA, ptB);
* // Or, provide x,y as parameters
* distance(ptA, 0.4, 0.9);
*
* // Distance from ptA to x: 0.5, y:0.8, z: 0.1
* const ptC = { x: 0.5, y:0.5, z: 0.3 };
* // With x,y,z as parameters:
* distance(ptC, 0.5, 0.8, 0.1);
* ```
* @param a First point
* @param xOrB Second point, or x coord
* @param y y coord, if x coord is given
* @param z Optional z coord, if x and y are given.
* @returns
*/
function distance(a, xOrB, y, z) {
	const pt = getPointParameter(xOrB, y, z);
	guard(pt, `b`);
	guard(a, `a`);
	return isPoint3d(pt) && isPoint3d(a) ? Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z) : Math.hypot(pt.x - a.x, pt.y - a.y);
}

//#endregion
//#region ../packages/geometry/src/point/divider.ts
/**
* Returns a Point with the x,y,z values of two points divide (a/b).
* 
* `z` parameter is used, if present. Uses a default value of 0 for 'z' when dividing a 2D point with a 3D one.
*
* Examples:
*
* ```js
* divide(ptA, ptB);
* divide(x1, y1, x2, y2);
* divide(ptA, x2, y2);
* ```
*/
function divide(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard(ptA, `a`);
	guard(ptB, `b`);
	if (ptB.x === 0) throw new TypeError("Cannot divide by zero (b.x is 0)");
	if (ptB.y === 0) throw new TypeError("Cannot divide by zero (b.y is 0)");
	const pt = {
		x: ptA.x / ptB.x,
		y: ptA.y / ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) {
		if (ptB.z === 0) throw new TypeError("Cannot divide by zero (b.z is 0)");
		pt.z = (ptA.z ?? 0) / (ptB.z ?? 0);
	}
	return Object.freeze(pt);
}

//#endregion
//#region ../packages/geometry/src/point/subtract.ts
/**
* Returns a Point with the x,y,z values of two points subtracted (a-b).
* 
* `z` parameter is used if present. Uses a default value of 0 for 'z' when subtracting a 2D point with a 3D one.
*
* Examples:
*
* ```js
* subtract(ptA, ptB);
* subtract(x1, y1, x2, y2);
* subtract(ptA, x2, y2);
* ```
*/
function subtract(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard(ptA, `a`);
	guard(ptB, `b`);
	const pt = {
		x: ptA.x - ptB.x,
		y: ptA.y - ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) - (ptB.z ?? 0);
	return Object.freeze(pt);
}

//#endregion
//#region ../packages/geometry/src/point/empty.ts
/**
* An empty point of `{ x: 0, y: 0 }`.
*
* Use `isEmpty` to check if a point is empty.
* Use `Empty3d` to get an empty point with `z`.
*/
const Empty = {
	x: 0,
	y: 0
};
/**
* Returns { x:1, y:1 }
*/
const Unit = {
	x: 1,
	y: 1
};

//#endregion
//#region ../packages/geometry/src/point/point-type.ts
/**
* Placeholder point: `{ x: NaN, y: NaN }`
* Use `isPlaceholder` to check if a point is a placeholder.
* Use `Placeholder3d` get a point with `z` property.
*/
const Placeholder = Object.freeze({
	x: Number.NaN,
	y: Number.NaN
});
/**
* Placeholder point: `{x: NaN, y:NaN, z:NaN }`
* Use `isPlaceholder` to check if a point is a placeholder.
* Use `Placeholder` to get a point without `z` property.
*/
const Placeholder3d = Object.freeze({
	x: Number.NaN,
	y: Number.NaN,
	z: Number.NaN
});

//#endregion
//#region ../packages/geometry/src/point/angle.ts
/**
* Returns the angle in radians between `a` and `b`.
*
* Eg if `a` is the origin, and `b` is another point,
* in degrees one would get 0 to -180 when `b` was above `a`.
*  -180 would be `b` in line with `a`.
* Same for under `a`.
*
* Providing a third point `c` gives the interior angle, where `b` is the middle point.
* 
* See also {@link angleRadianCircle} which returns coordinates on 0..Math.Pi*2
* range. This avoids negative numbers.
* @param a
* @param b
* @param c
* @returns
*/
const angleRadian = (a, b, c) => {
	guard(a, `a`);
	if (b === void 0) return Math.atan2(a.y, a.x);
	guard(b, `b`);
	if (c === void 0) return Math.atan2(b.y - a.y, b.x - a.x);
	guard(c, `c`);
	return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};

//#endregion
//#region ../packages/geometry/src/point/sum.ts
/**
* Returns a Point with the x,y,z values of two points added.
* 
* `z` parameter is used, if present. Uses a default value of 0 for 'z' when adding a 2D point with a 3D one.
*
* Examples:
*
* ```js
* sum(ptA, ptB);
* sum(x1, y1, x2, y2);
* sum(ptA, x2, y2);
* ```
*/
function sum(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard(ptA, `a`);
	guard(ptB, `b`);
	const pt = {
		x: ptA.x + ptB.x,
		y: ptA.y + ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) + (ptB.z ?? 0);
	return Object.freeze(pt);
}

//#endregion
//#region ../packages/geometry/src/point/multiply.ts
/**
* Returns a Point with the x,y,z values of two points multiply (a/b).
* 
* `z` parameter is used, if present. Uses a default value of 0 for 'z' when multiplying a 2D point with a 3D one.
*
* Examples:
*
* ```js
* multiply(ptA, ptB);
* multiply(x1, y1, x2, y2);
* multiply(ptA, x2, y2);
* ```
*/
function multiply(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard(ptA, `a`);
	guard(ptB, `b`);
	const pt = {
		x: ptA.x * ptB.x,
		y: ptA.y * ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) * (ptB.z ?? 0);
	return Object.freeze(pt);
}
/**
* Multiplies all components by `v`.
* Existing properties of `pt` are maintained.
*
* ```js
* multiplyScalar({ x:2, y:4 }, 2);
* // Yields: { x:4, y:8 }
* ```
* @param pt Point
* @param v Value to multiply by
* @returns
*/
const multiplyScalar = (pt, v) => {
	return isPoint3d(pt) ? Object.freeze({
		...pt,
		x: pt.x * v,
		y: pt.y * v,
		z: pt.z * v
	}) : Object.freeze({
		...pt,
		x: pt.x * v,
		y: pt.y * v
	});
};

//#endregion
//#region ../packages/geometry/src/point/magnitude.ts
/**
* Clamps the magnitude of a point.
* This is useful when using a Point as a vector, to limit forces.
* @param pt
* @param max Maximum magnitude (1 by default)
* @param min Minimum magnitude (0 by default)
* @returns
*/
const clampMagnitude = (pt, max = 1, min = 0) => {
	const length$2 = distance(pt);
	let ratio = 1;
	if (length$2 > max) ratio = max / length$2;
	else if (length$2 < min) ratio = min / length$2;
	return ratio === 1 ? pt : multiply(pt, ratio, ratio);
};

//#endregion
//#region ../packages/geometry/src/point/normalise.ts
const length = (ptOrX, y) => {
	if (isPoint(ptOrX)) {
		y = ptOrX.y;
		ptOrX = ptOrX.x;
	}
	if (y === void 0) throw new Error(`Expected y`);
	return Math.hypot(ptOrX, y);
};
/**
* Normalise point as a unit vector.
*
* ```js
* normalise({x:10, y:20});
* normalise(10, 20);
* ```
* @param ptOrX Point, or x value
* @param y y value if first param is x
* @returns
*/
const normalise = (ptOrX, y) => {
	const pt = getPointParameter(ptOrX, y);
	const l = length(pt);
	if (l === 0) return Empty;
	return Object.freeze({
		...pt,
		x: pt.x / l,
		y: pt.y / l
	});
};

//#endregion
//#region ../packages/geometry/src/rect/corners.ts
/**
* Returns the four corners of a rectangle as an array of Points.
*
* ```js
* import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
* const rect = { width: 100, height: 100, x: 0, y: 0};
* const pts = Rects.corners(rect);
* ```
*
* If the rectangle is not positioned, is origin can be provided.
* Order of corners: ne, nw, sw, se
* @param rect
* @param origin
* @returns
*/
const corners = (rect, origin) => {
	const r = getRectPositioned(rect, origin);
	return [
		{
			x: r.x,
			y: r.y
		},
		{
			x: r.x + r.width,
			y: r.y
		},
		{
			x: r.x + r.width,
			y: r.y + r.height
		},
		{
			x: r.x,
			y: r.y + r.height
		}
	];
};

//#endregion
//#region ../packages/geometry/src/bezier/guard.ts
const isQuadraticBezier = (path) => path.quadratic !== void 0;
const isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

//#endregion
export { Empty, Placeholder, Unit, angleRadian, clampMagnitude, corners, distance, divide, getPointParameter, guard$1 as guard, interpolate as interpolate$7, isCubicBezier, isLine, isQuadraticBezier, joinPointsToLines, length$1 as length, multiply, multiplyScalar, normalise, subtract, sum as sum$4 };
//# sourceMappingURL=guard-ClvlDzpa.js.map