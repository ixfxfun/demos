import { guard$1 as guard, isPoint, isPoint3d } from "./empty-j1qlaeLR.js";

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
export { Placeholder, getPointParameter, getTwoPointParameters, multiply, multiplyScalar, subtract };
//# sourceMappingURL=multiply-46C_yNZY.js.map