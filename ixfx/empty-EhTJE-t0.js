//#region ../packages/debug/src/index.ts
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};

//#endregion
//#region ../packages/core/src/results.ts
/**
* If `result` is an error, throws it, otherwise ignored.
* @param result 
* @returns 
*/
function throwResult(result) {
	if (result.success) return true;
	if (typeof result.error === `string`) throw new Error(result.error);
	throw result.error;
}
function resultToError(result) {
	if (typeof result.error === `string`) return new Error(result.error);
	else return result.error;
}

//#endregion
//#region ../packages/geometry/src/point/guard.ts
/**
* Throws an error if point is invalid
* @param p
* @param name
*/
function guard$1(p, name = `Point`) {
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

//#endregion
//#region ../packages/geometry/src/rect/guard.ts
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
const guard = (rect, name = `rect`) => {
	if (rect === void 0) throw new Error(`{$name} undefined`);
	if (isPositioned(rect)) guard$1(rect, name);
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
	guard(rect);
	if (isPositioned(rect) && origin === void 0) return rect;
	if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
	return Object.freeze({
		...rect,
		...origin
	});
};
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

//#endregion
//#region ../packages/geometry/src/rect/empty.ts
const Empty = Object.freeze({
	width: 0,
	height: 0
});
const EmptyPositioned = Object.freeze({
	x: 0,
	y: 0,
	width: 0,
	height: 0
});

//#endregion
export { Empty as Empty$1, EmptyPositioned, getErrorMessage, getRectPositioned, guard, guard$1, guardDim, isPoint, isPoint3d, isPositioned, isRect, resultToError, throwResult };
//# sourceMappingURL=empty-EhTJE-t0.js.map