//#region ../geometry/dist/src/point/guard.js
/**
* Throws an error if point is invalid
* @param p
* @param name
*/
function guard(p, name = `Point`) {
	if (p === void 0) throw new Error(`'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
	if (p === null) throw new Error(`'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`);
	if (p.x === void 0) throw new Error(`'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
	if (p.y === void 0) throw new Error(`'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`);
	if (typeof p.x !== `number`) throw new TypeError(`'${name}.x' must be a number. Got ${typeof p.x}`);
	if (typeof p.y !== `number`) throw new TypeError(`'${name}.y' must be a number. Got ${typeof p.y}`);
	if (p.z !== void 0) {
		if (typeof p.z !== `number`) throw new TypeError(`${name}.z must be a number. Got: ${typeof p.z}`);
		if (Number.isNaN(p.z)) throw new Error(`'${name}.z' is NaN. Got: ${JSON.stringify(p)}`);
	}
	if (p.x === null) throw new Error(`'${name}.x' is null`);
	if (p.y === null) throw new Error(`'${name}.y' is null`);
	if (Number.isNaN(p.x)) throw new Error(`'${name}.x' is NaN`);
	if (Number.isNaN(p.y)) throw new Error(`'${name}.y' is NaN`);
}
/**
* Returns _true_ if `p` has x & y properties.
* Returns _false_ if `p` is undefined, null or does not contain properties.
* Use {@link isPoint3d} to check further check for `z`.
* @param p
* @returns
*/
function isPoint(p) {
	if (p === void 0) return false;
	if (p === null) return false;
	if (p.x === void 0) return false;
	if (p.y === void 0) return false;
	return true;
}
/**
* Returns _true_ if `p` has x, y, & z properties.
* Returns _false_ if `p` is undefined, null or does not contain properties.
* @param p
* @returns
*/
const isPoint3d = (p) => {
	if (p === void 0) return false;
	if (p === null) return false;
	if (p.x === void 0) return false;
	if (p.y === void 0) return false;
	if (p.z === void 0) return false;
	return true;
};
/**
* Returns true if point is a placeholder, where xy (and z, if present)
* are `NaN`.
*
* Use Points.Placeholder to return a placeholder point.
* @param p
* @returns
*/
const isPlaceholder$1 = (p) => {
	if (isPoint3d(p)) {
		if (!Number.isNaN(p.z)) return false;
	}
	return Number.isNaN(p.x) && Number.isNaN(p.y);
};

//#endregion
//#region ../geometry/dist/src/rect/guard.js
/**
* Throws an error if the dimensions of the rectangle are undefined, NaN or negative.
* @param d
* @param name
*/
const guardDim = (d, name = `Dimension`) => {
	if (d === void 0) throw new Error(`${name} is undefined`);
	if (Number.isNaN(d)) throw new Error(`${name} is NaN`);
	if (d < 0) throw new Error(`${name} cannot be negative`);
};
/**
* Throws an error if rectangle is missing fields or they
* are not valid.
*
* Checks:
* * `width` and `height` must be defined on `rect`
* * dimensions (w & h) must not be NaN
* * dimensions (w & h) must not be negative
*
* If `rect` has x,y, this value is checked as well.
* @param rect
* @param name
*/
const guard$1 = (rect, name = `rect`) => {
	if (rect === void 0) throw new Error(`{$name} undefined`);
	if (isPositioned(rect)) guard(rect, name);
	guardDim(rect.width, name + `.width`);
	guardDim(rect.height, name + `.height`);
};
/**
* Returns a positioned rect or if it's not possible, throws an error.
*
* If `rect` does not have a position, `origin` is used.
* If `rect` is positioned and `origin` is provided, returned result uses `origin` as x,y instead.
* ```js
* // Returns input because it's positioned
* getRectPositioned({ x:1, y:2, width:10, height:20 });
*
* // Returns { x:1, y:2, width:10, height:20 }
* getRectPositioned({ width:10, height:20 }, { x:1, y:2 });
*
* // Throws, because we have no point
* getRectPositioned({width:10,height:20})
* ```
* @param rect
* @param origin
* @returns
*/
const getRectPositioned = (rect, origin) => {
	guard$1(rect);
	if (isPositioned(rect) && origin === void 0) return rect;
	if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
	return Object.freeze({
		...rect,
		...origin
	});
};
/**
* Returns _true_ if `rect` is a placeholder, with both width and height values of NaN.
* Use Rects.Placeholder or Rects.PlaceholderPositioned to generate a placeholder.
* @param rect
* @returns
*/
const isPlaceholder = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
/**
* Returns _true_ if `rect` has position (x,y) fields.
* @param rect Point, Rect or RectPositiond
* @returns
*/
const isPositioned = (rect) => rect.x !== void 0 && rect.y !== void 0;
/**
* Returns _true_ if `rect` has width and height fields.
* @param rect
* @returns
*/
const isRect = (rect) => {
	if (rect === void 0) return false;
	if (rect.width === void 0) return false;
	if (rect.height === void 0) return false;
	return true;
};
/**
* Returns _true_ if `rect` is a positioned rectangle
* Having width, height, x and y properties.
* @param rect
* @returns
*/
const isRectPositioned = (rect) => isRect(rect) && isPositioned(rect);

//#endregion
//#region ../geometry/dist/src/point/point-type.js
/**
* Placeholder point: `{ x: NaN, y: NaN }`
* Use `isPlaceholder` to check if a point is a placeholder.
* Use `Placeholder3d` get a point with `z` property.
*/
const Placeholder = Object.freeze({
	x: NaN,
	y: NaN
});
/**
* Placeholder point: `{x: NaN, y:NaN, z:NaN }`
* Use `isPlaceholder` to check if a point is a placeholder.
* Use `Placeholder` to get a point without `z` property.
*/
const Placeholder3d = Object.freeze({
	x: NaN,
	y: NaN,
	z: NaN
});

//#endregion
//#region ../geometry/dist/src/point/get-point-parameter.js
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
//#region ../geometry/dist/src/point/subtract.js
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
//#region ../geometry/dist/src/point/empty.js
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
//#region ../geometry/dist/src/point/multiply.js
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
export { Empty, Placeholder, Unit, getPointParameter, getRectPositioned, getTwoPointParameters, guard$1 as guard, guard as guard$1, guardDim, isPlaceholder, isPlaceholder$1, isPoint, isPoint3d, isPositioned, isRect, isRectPositioned, multiply, multiplyScalar, subtract };
//# sourceMappingURL=multiply-C6BAKtKA.js.map