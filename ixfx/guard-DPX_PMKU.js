import { numberTest, percentTest, resultThrow } from "./numbers-C359_5A6.js";
import { Empty, getPointParameter, getRectPositioned, getTwoPointParameters, guard$1 as guard, isPoint, isPoint3d, multiply } from "./multiply-C6BAKtKA.js";

//#region ../geometry/dist/src/rect/corners.js
/**
* Returns the four corners of a rectangle as an array of Points.
*
* ```js
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
//#region ../geometry/dist/src/point/sum.js
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
//#region ../geometry/dist/src/point/distance.js
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
//#region ../geometry/dist/src/line/from-points.js
/**
* Returns a line from two points
*
* ```js
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
//#region ../geometry/dist/src/line/join-points-to-lines.js
/**
* Returns an array of lines that connects provided points. Note that line is not closed.
*
* Eg, if points a,b,c are provided, two lines are provided: a->b and b->c.
*
* ```js
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
//#region ../geometry/dist/src/line/guard.js
/**
* Returns true if `p` is a valid line, containing `a` and `b` Points.
* ```js
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
const guard$2 = (line, name = `line`) => {
	if (line === void 0) throw new Error(`${name} undefined`);
	if (line.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`);
	if (line.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`);
};

//#endregion
//#region ../geometry/dist/src/line/get-points-parameter.js
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
//#region ../geometry/dist/src/line/length.js
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
//#region ../geometry/dist/src/pi.js
const piPi = Math.PI * 2;

//#endregion
//#region ../geometry/dist/src/point/angle.js
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
//#region ../geometry/dist/src/point/divider.js
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
//#region ../geometry/dist/src/line/interpolate.js
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
//#region ../geometry/dist/src/point/magnitude.js
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
//#region ../geometry/dist/src/point/normalise.js
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
//#region ../geometry/dist/src/polar/guard.js
/**
* Returns true if `p` seems to be a {@link Polar.Coord} (ie has both distance & angleRadian fields)
* @param p
* @returns True if `p` seems to be a PolarCoord
*/
const isPolarCoord = (p) => {
	if (p.distance === void 0) return false;
	if (p.angleRadian === void 0) return false;
	return true;
};

//#endregion
//#region ../geometry/dist/src/angles.js
function degreeToRadian(angleInDegrees) {
	return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
function degreeToGradian(angleInDegrees) {
	return angleInDegrees * 1.111111;
}
/**
* Returns the gradian value converted to degrees.
* By default it wraps, so any value 360 or greater wraps around.
* @param angleInGradians
* @param wrap
* @returns
*/
function gradianToDegree(angleInGradians, wrap = true) {
	if (wrap) return angleInGradians * .9 % 360;
	return angleInGradians * .9;
}
function radianToGradian(angleInRadians) {
	return angleInRadians * 63.6619772368;
}
function gradianToRadian(angleInGradian) {
	return angleInGradian * .0157079633;
}
function radianToDegree(angleInRadians) {
	return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
/**
* Parses CSS-style angle strings. By default assumes degrees.
*
* ```js
* angleParse(`100`);     // { value: 100, unit: `deg` }
* angleParse(100);       // { value: 100, unit: `deg` }
* angleParse(`100deg`);   // { value: 100, unit: `deg` }
*
* // More exotic units:
* angleParse(`100rad`);  // { value: 100, unit: `rad` }
* angleParse(`100turn`); // { value: 100, unit: `turn` }
* angleParse(`100grad`); // { value: 100, unit: `grad` }
* ```
*
* Once parsed in this format, use {@link angleConvert} to convert to
* a different unit.
* @param value
* @returns
*/
const angleParse = (value) => {
	if (isAngle(value)) return value;
	if (typeof value === `number`) return {
		value,
		unit: `deg`
	};
	value = value.toLowerCase();
	let unit = `deg`;
	let numberValue = NaN;
	if (value.endsWith(`grad`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 4));
		unit = `grad`;
	} else if (value.endsWith(`rad`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 3));
		unit = `rad`;
	} else if (value.endsWith(`turn`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 4));
		unit = `turn`;
	} else if (value.endsWith(`deg`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 3));
		unit = `deg`;
	} else numberValue = Number.parseFloat(value);
	if (Number.isNaN(numberValue)) throw new Error(`Invalid angle (bad value?)`);
	if (unit.length === 0) throw new Error(`Invalid angle (no unit)`);
	return {
		value: numberValue,
		unit
	};
};
const isAngle = (v) => {
	if (typeof v !== `object`) return false;
	if (`unit` in v && `value` in v) {
		if (typeof v.unit !== `string`) return false;
		if (typeof v.value !== `number`) return false;
		return true;
	}
	return false;
};
/**
* Converts an angle to another representation.
* Input value is assumed degrees unless it's an {@link Angle} type of has the unit.
*
* These are all identical inputs: 100, `100`, `100deg`
* ```js
* angleConvert(100, `rad`); // Converts 100deg to radians
* ```
*
* Other units can be used for string input: `2turn`, `1grad`, `2rad`.
* ```js
* angleConvert(`2rad`, `deg`); // Converts 2radians to degrees
* ```
*
* Can also use an object input:
* ```js
* angleConvert({ value: 10, unit: `deg`}, `rad`);
* ```
* @param angleOrDegrees
* @param destination
* @returns
*/
const angleConvert = (angleOrDegrees, destination) => {
	const angle = typeof angleOrDegrees === `object` ? angleOrDegrees : angleParse(angleOrDegrees);
	switch (destination) {
		case `deg`:
			if (angle.unit === `deg`) return angle;
			if (angle.unit === `rad`) return {
				value: radianToDegree(angle.value),
				unit: `deg`
			};
			if (angle.unit === `grad`) return {
				value: gradianToDegree(angle.value),
				unit: `deg`
			};
			if (angle.unit === `turn`) return {
				value: turnToDegree(angle.value),
				unit: `deg`
			};
			throw new Error(`Unknown unit: ${angle.unit}`);
		case `grad`:
			if (angle.unit === `deg`) return {
				value: degreeToGradian(angle.value),
				unit: `grad`
			};
			if (angle.unit === `rad`) return {
				value: radianToGradian(angle.value),
				unit: `grad`
			};
			if (angle.unit === `grad`) return angle;
			if (angle.unit === `turn`) return {
				value: radianToGradian(turnToRadian(angle.value)),
				unit: `grad`
			};
			throw new Error(`Unknown unit: ${angle.unit}`);
		case `rad`:
			if (angle.unit === `deg`) return {
				value: degreeToRadian(angle.value),
				unit: `rad`
			};
			if (angle.unit === `rad`) return angle;
			if (angle.unit === `grad`) return {
				value: gradianToRadian(angle.value),
				unit: `rad`
			};
			if (angle.unit === `turn`) return {
				value: radianToGradian(turnToRadian(angle.value)),
				unit: `grad`
			};
			throw new Error(`Unknown unit: ${angle.unit}`);
		case `turn`:
			if (angle.unit === `deg`) return {
				value: degreeToTurn(angle.value),
				unit: `turn`
			};
			if (angle.unit === `rad`) return {
				value: radianToTurn(angle.value),
				unit: `turn`
			};
			if (angle.unit === `grad`) return {
				value: radianToTurn(gradianToRadian(angle.value)),
				unit: `turn`
			};
			if (angle.unit === `turn`) return angle;
			throw new Error(`Unknown unit: ${angle.unit}`);
		default: throw new Error(`Destination unit unknown ('${destination}). Expects: deg, grad, rad or turn`);
	}
};
/**
* Converts 'turns' to degrees. By defaults wraps the value, so
* turn value of 1 or 2 equal 0deg instead of 360 or 720deg.
* @param turns
* @param wrap
* @returns
*/
const turnToDegree = (turns, wrap = true) => {
	if (wrap) return turns * 360 % 360;
	return turns * 360;
};
const turnToRadian = (turns) => turns * piPi;
const degreeToTurn = (degrees) => degrees / 360;
const radianToTurn = (radians) => radians / piPi;

//#endregion
//#region ../geometry/dist/src/polar/conversions.js
/**
* Converts to Cartesian coordinate from polar.
*
* ```js
*
* const origin = { x: 50, y: 50}; // Polar origin
* // Yields: { x, y }
* const polar = Polar.toCartesian({ distance: 10, angleRadian: 0 }, origin);
* ```
*
* Distance and angle can be provided as numbers intead:
*
* ```
* // Yields: { x, y }
* const polar = Polar.toCartesian(10, 0, origin);
* ```
*
* @param a
* @param b
* @param c
* @returns
*/
const toCartesian = (a, b, c) => {
	if (isPolarCoord(a)) {
		if (typeof b === `undefined`) b = Empty;
		if (isPoint(b)) return polarToCartesian(a.distance, a.angleRadian, b);
		throw new Error(`Expecting (Coord, Point). Second parameter is not a point`);
	} else if (typeof a === `object`) throw new TypeError(`First param is an object, but not a Coord: ${JSON.stringify(a)}`);
	else if (typeof a === `number` && typeof b === `number`) {
		if (c === void 0) c = Empty;
		if (!isPoint(c)) throw new Error(`Expecting (number, number, Point). Point param wrong type`);
		return polarToCartesian(a, b, c);
	} else throw new TypeError(`Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(a)}`);
};
/**
* Converts a polar coordinate to Cartesian
* @param distance Distance
* @param angleRadians Angle in radians
* @param origin Origin, or 0,0 by default.
* @returns
*/
const polarToCartesian = (distance$1, angleRadians, origin = Empty) => {
	guard(origin);
	return Object.freeze({
		x: origin.x + distance$1 * Math.cos(angleRadians),
		y: origin.y + distance$1 * Math.sin(angleRadians)
	});
};

//#endregion
//#region ../geometry/dist/src/bezier/guard.js
const isQuadraticBezier = (path) => path.quadratic !== void 0;
const isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

//#endregion
export { angleConvert, angleParse, angleRadian, clampMagnitude, corners, distance, divide, fromPoints, guard$2 as guard, interpolate, isCubicBezier, isLine, isQuadraticBezier, joinPointsToLines, length$1 as length, normalise, sum, toCartesian };
//# sourceMappingURL=guard-DPX_PMKU.js.map