import { numberTest$2 as numberTest, percentTest$2 as percentTest, resultThrow$2 as resultThrow } from "./numbers-Dp7VYKrL.js";
import { guard$2 as guard, isPoint } from "./guard-B1JeQCTa.js";

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
const getPointParameter = (aOrLine, b) => {
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
function length(aOrLine, pointB) {
	if (isPolyLine(aOrLine)) {
		const sum = aOrLine.reduce((accumulator, v) => length(v) + accumulator, 0);
		return sum;
	}
	if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
	const [a, b] = getPointParameter(aOrLine, pointB);
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
	const [a, b] = getPointParameter(aOrLine, pointBOrAllowOverflow);
	const d = length(a, b);
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
//#region ../packages/geometry/src/bezier/guard.ts
const isQuadraticBezier = (path) => path.quadratic !== void 0;
const isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

//#endregion
export { Empty, Unit, guard$1 as guard, interpolate as interpolate$7, isCubicBezier, isLine, isQuadraticBezier, length };
//# sourceMappingURL=guard-DtZLjFlb.js.map