import { __export } from "./chunk-51aI8Tpl.js";
import { numberInclusiveRangeTest, numberTest, percentTest, resultErrorToString, resultThrow } from "./numbers-C359_5A6.js";
import { arrayTest } from "./arrays-yH_qBmt0.js";
import "./is-primitive-BDz6cwtd.js";
import { cloneFromFields } from "./records-XG4QHVXn.js";
import "./to-string-Dg1sJUf1.js";
import "./comparers-BtlnApnB.js";
import { isEqualDefault } from "./is-equal-edylSnsn.js";
import "./maps-a_ogDHUT.js";
import { continuously } from "./continuously-CFHq8KyU.js";
import { defaultKeyer } from "./default-keyer-CnxB2rd_.js";
import "./iterable-compare-values-shallow-DOeUS4hy.js";
import { intervalToMs } from "./interval-type-Y39UZyyQ.js";
import { SimpleEventEmitter } from "./simple-event-emitter-BWzQsKia.js";
import { clamp, clampIndex } from "./clamp-BXRKKkSg.js";
import { round } from "./round-DuQ_VRis.js";
import "./wrap-CbW4pe4i.js";
import { interpolate } from "./interpolate-BoOK0bgP.js";
import { scaler, scalerTwoWay } from "./scale-DHjtm9T-.js";
import { ObjectTracker, TrackedValueMap, quantiseEvery } from "./tracked-value-BgYnLxEF.js";
import { Placeholder, getPointParameter, getRectPositioned, guard, guard$1, isPoint, isPositioned, isRect, isRectPositioned, subtract } from "./multiply-C6BAKtKA.js";
import { angleConvert, angleParse, angleRadian, corners, distance, fromPoints, guard as guard$2, isCubicBezier, isLine, isQuadraticBezier, joinPointsToLines, length, toCartesian } from "./guard-DPX_PMKU.js";
import { Empty, EmptyPositioned, Placeholder as Placeholder$1, PlaceholderPositioned } from "./placeholder-DiSgOrWJ.js";
import "./tracker-base-DcT12hen.js";
import { dequeue, enqueue, isEmpty, isFull, peek } from "./queue-fns-C19iGLvT.js";
import { resolveEl, resolveElementTry } from "./resolve-el-BdUlUJGi.js";
import { convert, hex2hsl, hex2oklch, hex2rgb, hsl2rgb, index_default, oklab2rgb, rgb2hsl, rgb2oklch, toColour, toCssColour, withOpacity as withOpacity$1, withOpacity$1 as withOpacity$2, withOpacity$2 as withOpacity } from "./conversion-7HnuMJUS.js";

//#region ../arrays/dist/src/pairwise.js
/**
* Yields pairs made up of overlapping items from the input array.
*
* Throws an error if there are less than two entries.
*
* ```js
* pairwise([1, 2, 3, 4, 5]);
* Yields:
* [ [1,2], [2,3], [3,4], [4,5] ]
* ```
* @param values
*/
function* pairwise(values) {
	resultThrow(arrayTest(values, `values`));
	if (values.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values.length}`);
	for (let index = 1; index < values.length; index++) yield [values[index - 1], values[index]];
}

//#endregion
//#region ../numbers/dist/src/bipolar.js
/**
* Clamp a bipolar value
* ```js
* Bipolar.clamp(-1);   // -1
* Bipolar.clamp(-1.1); // -1
* ```
*
* Throws an error if `bipolarValue` is not a number or NaN.
* @param bipolarValue Value to clamp
* @returns Clamped value on -1..1 scale
*/
const clamp$1 = (bipolarValue) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Param 'bipolarValue' must be a number. Got: ${typeof bipolarValue}`);
	if (Number.isNaN(bipolarValue)) throw new Error(`Param 'bipolarValue' is NaN`);
	if (bipolarValue > 1) return 1;
	if (bipolarValue < -1) return -1;
	return bipolarValue;
};

//#endregion
//#region ../geometry/dist/src/rect/apply.js
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
//#region ../geometry/dist/src/rect/center.js
/**
* Returns the center of a rectangle as a {@link Point}.
*  If the rectangle lacks a position and `origin` parameter is not provided, 0,0 is used instead.
*
* ```js
* const p = Rects.center({x:10, y:20, width:100, height:50});
* const p2 = Rects.center({width: 100, height: 50}); // Assumes 0,0 for rect x,y
* ```
* @param rect Rectangle
* @param origin Optional origin. Overrides `rect` position if available. If no position is available 0,0 is used by default.
* @returns
*/
const center = (rect$1, origin) => {
	guard(rect$1);
	if (origin === void 0 && isPoint(rect$1)) origin = rect$1;
	else if (origin === void 0) origin = {
		x: 0,
		y: 0
	};
	const r = getRectPositioned(rect$1, origin);
	return Object.freeze({
		x: origin.x + rect$1.width / 2,
		y: origin.y + rect$1.height / 2
	});
};

//#endregion
//#region ../geometry/dist/src/point/is-equal.js
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
const isEqual = (...p) => {
	if (p === void 0) throw new Error(`parameter 'p' is undefined`);
	if (p.length < 2) return true;
	for (let index = 1; index < p.length; index++) {
		if (p[index].x !== p[0].x) return false;
		if (p[index].y !== p[0].y) return false;
	}
	return true;
};

//#endregion
//#region ../geometry/dist/src/rect/is-equal.js
/**
* Returns _true_ if two rectangles have identical values.
* Both rectangles must be positioned or not.
*
* ```js
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
const isEqual$1 = (a, b) => {
	if (isPositioned(a) && isPositioned(b)) {
		if (!isEqual(a, b)) return false;
		return a.width === b.width && a.height === b.height;
	} else if (!isPositioned(a) && !isPositioned(b)) return a.width === b.width && a.height === b.height;
	else return false;
};

//#endregion
//#region ../geometry/dist/src/rect/multiply.js
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
//#region ../geometry/dist/src/rect/subtract.js
function subtractSize(a, b, c) {
	const w = typeof b === `number` ? b : b.width;
	const h = typeof b === `number` ? c : b.height;
	if (h === void 0) throw new Error(`Expected height as third parameter`);
	const r = {
		...a,
		width: a.width - w,
		height: a.height - h
	};
	return r;
}

//#endregion
//#region ../geometry/dist/src/point/centroid.js
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
//#region ../flow/dist/src/delay.js
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
//#region ../collections/dist/src/stack/StackFns.js
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
const peek$1 = (opts, stack) => stack.at(-1);
const isEmpty$2 = (opts, stack) => stack.length === 0;
const isFull$1 = (opts, stack) => {
	if (opts.capacity) return stack.length >= opts.capacity;
	return false;
};

//#endregion
//#region ../collections/dist/src/stack/StackImmutable.js
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
		return isEmpty$2(this.opts, this.data);
	}
	get isFull() {
		return isFull$1(this.opts, this.data);
	}
	get peek() {
		return peek$1(this.opts, this.data);
	}
	get length() {
		return this.data.length;
	}
};

//#endregion
//#region ../collections/dist/src/queue/queue-immutable.js
var QueueImmutable = class QueueImmutable {
	opts;
	#data;
	/**
	* Creates an instance of Queue.
	* @param {QueueOpts} opts Options foor queue
	* @param {V[]} data Initial data. Index 0 is front of queue
	*/
	constructor(opts = {}, data = []) {
		if (opts === void 0) throw new Error(`opts parameter undefined`);
		this.opts = opts;
		this.#data = data;
	}
	forEach(fn) {
		for (let index = this.#data.length - 1; index >= 0; index--) fn(this.#data[index]);
	}
	forEachFromFront(fn) {
		this.#data.forEach((item) => {
			fn(item);
		});
	}
	enqueue(...toAdd) {
		return new QueueImmutable(this.opts, enqueue(this.opts, this.#data, ...toAdd));
	}
	dequeue() {
		return new QueueImmutable(this.opts, dequeue(this.opts, this.#data));
	}
	get isEmpty() {
		return isEmpty(this.opts, this.#data);
	}
	get isFull() {
		return isFull(this.opts, this.#data);
	}
	get length() {
		return this.#data.length;
	}
	get peek() {
		return peek(this.opts, this.#data);
	}
	toArray() {
		return [...this.#data];
	}
};

//#endregion
//#region ../collections/dist/src/map/map-multi-fns.js
/**
* Finds first entry by iterable value. Expects a map with an iterable as values.
*
* ```js
* const map = new Map();
* map.set('hello', ['a', 'b', 'c']);
* map.set('there', ['d', 'e', 'f']);
*
* const entry = firstEntryByValue(map, 'e');
* // Entry is: ['there', ['d', 'e', 'f']]
* ```
*
* An alternative is {@link firstEntry} to search by predicate function.
* @param map Map to search
* @param value Value to seek
* @param isEqual Filter function which checks equality. Uses JS comparer by default.
* @returns Entry, or _undefined_ if `value` not found.
*/
const firstEntryByValue = (map, value, isEqual$2 = isEqualDefault) => {
	for (const e of map.entries()) {
		const value_ = e[1];
		for (const subValue of value_) if (isEqual$2(subValue, value)) return e;
	}
};

//#endregion
//#region ../collections/dist/src/map/map-of-simple-base.js
var MapOfSimpleBase = class {
	map;
	groupBy;
	valueEq;
	/**
	* Constructor
	* @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
	* @param valueEq Compare values. By default uses JS logic for equality
	*/
	constructor(groupBy = defaultKeyer, valueEq = isEqualDefault, initial = []) {
		this.groupBy = groupBy;
		this.valueEq = valueEq;
		this.map = new Map(initial);
	}
	/**
	* Returns _true_ if `key` exists
	* @param key
	* @returns
	*/
	has(key) {
		return this.map.has(key);
	}
	/**
	* Returns _true_ if `value` exists under `key`.
	* @param key Key
	* @param value Value to seek under `key`
	* @returns _True_ if `value` exists under `key`.
	*/
	hasKeyValue(key, value) {
		const values = this.map.get(key);
		if (!values) return false;
		for (const v of values) if (this.valueEq(v, value)) return true;
		return false;
	}
	/**
	* Debug dump of contents
	* @returns
	*/
	debugString() {
		let r = ``;
		const keys = [...this.map.keys()];
		keys.every((k) => {
			const v = this.map.get(k);
			if (v === void 0) return;
			r += k + ` (${v.length}) = ${JSON.stringify(v)}\r\n`;
		});
		return r;
	}
	/**
	* Return number of values stored under `key`.
	* Returns 0 if `key` is not found.
	* @param key
	* @returns
	*/
	count(key) {
		const values = this.map.get(key);
		if (!values) return 0;
		return values.length;
	}
	/**
	* Returns first key that contains `value`
	* @param value
	* @param eq
	* @returns
	*/
	firstKeyByValue(value, eq = isEqualDefault) {
		const entry = firstEntryByValue(this, value, eq);
		if (entry) return entry[0];
	}
	/**
	* Iterate over all entries
	*/
	*entriesFlat() {
		for (const key of this.map.keys()) for (const value of this.map.get(key)) yield [key, value];
	}
	/**
	* Iterate over keys and array of values for that key
	*/
	*entries() {
		for (const [k, v] of this.map.entries()) yield [k, [...v]];
	}
	/**
	* Get all values under `key`
	* @param key
	* @returns
	*/
	*get(key) {
		const m = this.map.get(key);
		if (!m) return;
		yield* m.values();
	}
	/**
	* Iterate over all keys
	*/
	*keys() {
		yield* this.map.keys();
	}
	/**
	* Iterate over all values (regardless of key).
	* Use {@link values} to iterate over a set of values per key
	*/
	*valuesFlat() {
		for (const entries of this.map) yield* entries[1];
	}
	/**
	* Yields the values for each key in sequence, returning an array.
	* Use {@link valuesFlat} to iterate over all keys regardless of key.
	*/
	*values() {
		for (const entries of this.map) yield entries[1];
	}
	/**
	* Iterate over keys and length of values stored under keys
	*/
	*keysAndCounts() {
		for (const entries of this.map) yield [entries[0], entries[1].length];
	}
	/**
	* Returns the count of keys.
	*/
	get lengthKeys() {
		return this.map.size;
	}
	/**
	* _True_ if empty
	*/
	get isEmpty() {
		return this.map.size === 0;
	}
};

//#endregion
//#region ../collections/dist/src/map/map-of-simple-mutable.js
/**
* A simple mutable map of arrays, without events. It can store multiple values
* under the same key.
*
* For a fancier approaches, consider ofArrayMutable, ofCircularMutable or ofSetMutable.
*
* @example
* ```js
* const m = mapOfSimpleMutable();
* m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
* m.delete(`hello`);       // Deletes everything under `hello`
*
* const hellos = m.get(`hello`); // Get list of items under `hello`
* ```
*
* Constructor takes a `groupBy` parameter, which yields a string key for a value. This is the
* basis by which values are keyed when using `addValues`.
*
* Constructor takes a `valueEq` parameter, which compares values. This is used when checking
* if a value exists under a key, for example.
* @typeParam V - Type of items
*/
var MapOfSimpleMutable = class extends MapOfSimpleBase {
	addKeyedValues(key, ...values) {
		const existing = this.map.get(key);
		if (existing === void 0) this.map.set(key, values);
		else this.map.set(key, [...existing, ...values]);
	}
	/**
	* Set `values` to `key`.
	* Previous data stored under `key` is thrown away.
	* @param key
	* @param values
	*/
	setValues(key, values) {
		this.map.set(key, values);
	}
	/**
	* Adds a value, automatically extracting a key via the
	* `groupBy` function assigned in the constructor options.
	* @param values Adds several values
	*/
	addValue(...values) {
		for (const v of values) {
			const key = this.groupBy(v);
			this.addKeyedValues(key, v);
		}
	}
	/**
	* Delete `value` under a particular `key`
	* @param key
	* @param value
	* @returns _True_ if `value` was found under `key`
	*/
	deleteKeyValue(key, value) {
		const existing = this.map.get(key);
		if (existing === void 0) return false;
		const without = existing.filter((existingValue) => !this.valueEq(existingValue, value));
		this.map.set(key, without);
		return without.length < existing.length;
	}
	/**
	* Deletes `value` regardless of key.
	*
	* Uses the constructor-defined equality function.
	* @param value Value to delete
	* @returns
	*/
	deleteByValue(value) {
		let del = false;
		const entries = [...this.map.entries()];
		for (const keyEntries of entries) for (const values of keyEntries[1]) if (this.valueEq(values, value)) {
			del = true;
			this.deleteKeyValue(keyEntries[0], value);
		}
		return del;
	}
	/**
	* Deletes all values under `key`,
	* @param key
	* @returns _True_ if `key` was found and values stored
	*/
	delete(key) {
		const values = this.map.get(key);
		if (!values) return false;
		if (values.length === 0) return false;
		this.map.delete(key);
		return true;
	}
	/**
	* Clear contents
	*/
	clear() {
		this.map.clear();
	}
};

//#endregion
//#region ../geometry/dist/src/polar/ray.js
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
//#region ../geometry/dist/src/vector.js
const EmptyCartesian = Object.freeze({
	x: 0,
	y: 0
});
const piPi$1 = Math.PI * 2;
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
	if (angleNormalisation === `unipolar` && direction < 0) direction += piPi$1;
	else if (angleNormalisation === `bipolar`) {
		if (direction > pi) direction -= piPi$1;
		else if (direction <= -pi) direction += piPi$1;
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
//#region ../geometry/dist/src/line/from-numbers.js
/**
* Returns a line from a basis of coordinates (x1, y1, x2, y2)
*
* ```js
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
//#region ../geometry/dist/src/line/index.js
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
		x: NaN,
		y: NaN
	}),
	b: Object.freeze({
		x: NaN,
		y: NaN
	})
});

//#endregion
//#region ../geometry/dist/src/point/relation.js
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
* of prior points, you may want to use {@link PointsTracker}
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
//#region ../geometry/dist/src/point/point-tracker.js
/**
* A tracked point. Mutable. Useful for monitoring how
* it changes over time. Eg. when a pointerdown event happens, to record the start position and then
* track the pointer as it moves until pointerup.
*
* See also
* * [Playground](https://clinth.github.io/ixfx-play/data/point-tracker/index.html)
* * {@link PointsTracker}: Track several points, useful for multi-touch.
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
//#region ../geometry/dist/src/grid/inside.js
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
//#region ../geometry/dist/src/grid/guards.js
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
//#region ../geometry/dist/src/grid/apply-bounds.js
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
//#region ../geometry/dist/src/grid/enumerators/cells.js
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
//#region ../geometry/dist/src/grid/as.js
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
//#region ../geometry/dist/src/grid/offset.js
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
//#region ../geometry/dist/src/grid/indexing.js
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
//#region ../geometry/dist/src/triangle/guard.js
/**
* Throws an exception if the triangle is invalid
* @param t
* @param name
*/
const guard$7 = (t, name = `t`) => {
	if (t === void 0) throw new Error(`{$name} undefined`);
	guard$1(t.a, name + `.a`);
	guard$1(t.b, name + `.b`);
	guard$1(t.c, name + `.c`);
};

//#endregion
//#region ../geometry/dist/src/scaler.js
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
const scaler$1 = (scaleBy = `both`, defaultRect) => {
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
		let inX = NaN;
		let inY = NaN;
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
//#region ../geometry/dist/src/triangle/corners.js
/**
* Returns the corners (vertices) of the triangle as an array of points
* @param t
* @returns Array of length three
*/
const corners$1 = (t) => {
	guard$7(t);
	return [
		t.a,
		t.b,
		t.c
	];
};

//#endregion
//#region ../dom/dist/src/css.js
/**
* Returns the computed measurements of CSS properties via [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
*
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
//#region ../dom/dist/src/internal/debounce.js
const debounce = (callback, interval) => {
	let timer;
	const ms = intervalToMs(interval, 100);
	return () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
};

//#endregion
//#region ../dom/dist/src/element-sizing.js
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
	#onSizeChanging;
	#el;
	#containerEl;
	#disposed = false;
	#resizeObservable;
	#sizeDebounce = () => ({});
	constructor(elOrQuery, options) {
		this.#el = resolveEl(elOrQuery);
		this.#containerEl = options.containerEl ? resolveEl(options.containerEl) : this.#el.parentElement;
		this.#stretch = options.stretch ?? `none`;
		this.#onSizeChanging = options.onSizeChanging;
		this.#size = Empty;
		const onSizeDone = options.onSizeDone;
		if (typeof onSizeDone !== `undefined`) this.#sizeDebounce = debounce(() => {
			onSizeDone(this.size, this.#el);
		}, options.debounceTimeout);
		let naturalSize = options.naturalSize;
		naturalSize ??= this.#el.getBoundingClientRect();
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
			onSizeChanging(size, el$1) {
				el$1.width = size.width;
				el$1.height = size.height;
				if (options.onSizeChanging) options.onSizeChanging(size, el$1);
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
			onSizeChanging(size) {
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
		this.#onSizeChanging(size, this.#el);
		this.#sizeDebounce();
	}
	get size() {
		return this.#size;
	}
};

//#endregion
//#region ../visual/dist/src/colour/math.js
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
	return withOpacity$7(colourish, (o) => clamp(o * amount));
}
/**
* Does a computation with the opacity of a colour, returning colour.
*
* Passes operation to `HslSpace` or `SrgbSpace` depending on space of `colourish`.
* @param colourish Colour
* @param fn Function that takes original opacity as input and returns output opacity
*/
function withOpacity$7(colourish, fn) {
	const colour = toColour(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity(colour, fn);
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

//#endregion
//#region ../visual/src/drawing.ts
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
	stk ??= new StackImmutable();
	const push$1 = (...ops) => {
		stk ??= new StackImmutable();
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
//#region ../visual/src/colour/guards.ts
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
//#region ../visual/src/colour/utility.ts
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
//#region ../visual/src/colour/hsl.ts
var hsl_exports = {};
__export(hsl_exports, {
	absolute: () => absolute$1,
	changeLightness: () => changeLightness$1,
	fromCss: () => fromCss$2,
	fromHexString: () => fromHexString$2,
	generateScalar: () => generateScalar$1,
	guard: () => guard$6,
	interpolator: () => interpolator$3,
	parseCssHslFunction: () => parseCssHslFunction,
	scalar: () => scalar,
	toAbsolute: () => toAbsolute$1,
	toCssString: () => toCssString,
	toLibraryRgb: () => toLibraryRgb,
	toScalar: () => toScalar$2,
	withOpacity: () => withOpacity$6
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
const withOpacity$6 = (value, fn) => {
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
	guard$6(hsl);
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
	guard$6(hsl);
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
const guard$6 = (hsl) => {
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
	guard$6(hsl);
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
	guard$6(hsl);
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
//#region ../visual/src/colour/oklch.ts
var oklch_exports = {};
__export(oklch_exports, {
	OKLCH_CHROMA_MAX: () => OKLCH_CHROMA_MAX,
	absolute: () => absolute,
	fromCss: () => fromCss$1,
	fromHexString: () => fromHexString$1,
	fromLibrary: () => fromLibrary$1,
	generateScalar: () => generateScalar,
	guard: () => guard$5,
	interpolator: () => interpolator$2,
	scalar: () => scalar$2,
	toAbsolute: () => toAbsolute,
	toCssString: () => toCssString$2,
	toScalar: () => toScalar$1,
	withOpacity: () => withOpacity$5
});
const OKLCH_CHROMA_MAX = .4;
const guard$5 = (lch) => {
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
	guard$5(lchOrString);
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
	guard$5(lch);
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
	guard$5(lch);
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
const withOpacity$5 = (value, fn) => {
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
	guard$5(lch);
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
	guard$5(lch);
	return lch;
};

//#endregion
//#region ../visual/src/colour/css-colours.ts
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
//#region ../visual/src/colour/srgb.ts
var srgb_exports = {};
__export(srgb_exports, {
	changeLightness: () => changeLightness,
	eightBit: () => eightBit,
	fromCss: () => fromCss,
	fromHexString: () => fromHexString,
	guard: () => guard$4,
	interpolator: () => interpolator$1,
	lightness: () => lightness,
	parseCssRgbFunction: () => parseCssRgbFunction,
	scalar: () => scalar$1,
	to8bit: () => to8bit,
	toCssString: () => toCssString$1,
	toLibraryHsl: () => toLibraryHsl,
	toScalar: () => toScalar,
	withOpacity: () => withOpacity$4
});
const withOpacity$4 = (value, fn) => {
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
	guard$4(rgb);
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
	guard$4(rgbOrString);
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
	guard$4(rgbOrString);
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
	guard$4(rgb);
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
	guard$4(rgb);
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
//#region ../visual/src/image-data-grid.ts
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
* Returns a {@link @ixfx/geometry/Grids.Grid} based on the provided `image`
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
//#region ../visual/src/canvas-helper.ts
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
			onResizing: opts.onResizing,
			onResized: opts.onResized,
			clearOnResize: opts.clearOnResize ?? true,
			draw: opts.draw,
			skipCss: opts.skipCss ?? false,
			colourSpace: `srgb`
		};
		this.#scaler = scaler$1(`both`);
		this.#scalerSize = scaler$1(`both`, size);
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
		guard(logicalSize, `logicalSize`);
		const logicalSizeInteger = applyFields((v) => Math.floor(v), logicalSize);
		const ratio = this.opts.pixelZoom;
		this.#scaler = scaler$1(this.opts.coordinateScale, logicalSize);
		this.#scalerSize = scaler$1(`both`, logicalSize);
		const pixelScaled = multiplyScalar(logicalSize, ratio);
		this.el.width = pixelScaled.width;
		this.el.height = pixelScaled.height;
		this.el.style.width = logicalSizeInteger.width.toString() + `px`;
		this.el.style.height = logicalSizeInteger.height.toString() + `px`;
		this.#getContext(true);
		if (this.opts.clearOnResize) this.ctx.clearRect(0, 0, this.width, this.height);
		this.#logicalSize = logicalSizeInteger;
		if (this.opts.onResizing) this.opts.onResizing(this.ctx, this.size, this);
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
				onSizeChanging: (size) => {
					if (isEqual$1(this.#logicalSize, size)) return;
					this.setLogicalSize(size);
				},
				onSizeDone: (size, el) => {
					this.#onResizeDone(size);
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
	#onResizeDone(size) {
		if (this.opts.onResized) this.opts.onResized(this.ctx, this.size, this);
		this.fireEvent(`resized`, {
			ctx: this.ctx,
			size: this.#logicalSize,
			helper: this
		});
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
//#region ../visual/src/svg/apply.ts
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
//#region ../visual/src/svg/bounds.ts
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
//#region ../visual/src/svg/create.ts
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
//#region ../visual/src/colour/generate.ts
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
//#region ../visual/src/colour/math.ts
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
function multiplyOpacity(colourish, amount) {
	return withOpacity$3(colourish, (o) => clamp(o * amount));
}
/**
* Does a computation with the opacity of a colour, returning colour.
* 
* Passes operation to `HslSpace` or `SrgbSpace` depending on space of `colourish`.
* @param colourish Colour
* @param fn Function that takes original opacity as input and returns output opacity
*/
function withOpacity$3(colourish, fn) {
	const colour = toColour$1(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity$6(colour, fn);
			break;
		case `srgb`:
			result = withOpacity$4(colour, fn);
			break;
		case `oklch`:
			result = withOpacity$5(colour, fn);
			break;
		default: throw new Error(`Unknown space: '${colour.space}'. Expected hsl, srgb, oklch`);
	}
	if (!result) throw new Error(`Is colour in correct form?`);
	if (typeof colourish === `string`) return toCssColour$1(result);
	return result;
}
function setOpacity(colourish, opacity) {
	const colour = toColour$1(colourish);
	colour.opacity = opacity;
	if (typeof colourish === `string`) return toCssColour$1(colour);
	return colour;
}

//#endregion
//#region ../visual/src/colour/interpolate.ts
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
	const c = colours.map((c$1) => toCssColour$1(c$1));
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
	return (amount) => toCssColour$1(inter(amount));
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
	return steps.flat().map((c) => toCssColour$1(c));
};
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
//#region ../visual/src/colour/index.ts
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
	guard: () => guard$3,
	interpolator: () => interpolator,
	isColourish: () => isColourish,
	isHsl: () => isHsl,
	isOkLch: () => isOkLch,
	isRgb: () => isRgb,
	multiplyOpacity: () => multiplyOpacity,
	randomHue: () => randomHue,
	resolveCss: () => resolveCss,
	rgbToHsl: () => rgbToHsl,
	scale: () => scale,
	setOpacity: () => setOpacity,
	toColour: () => toColour$1,
	toCssColour: () => toCssColour$1,
	toLibraryColour: () => toLibraryColour,
	toStringFirst: () => toStringFirst,
	tryParseObjectToHsl: () => tryParseObjectToHsl,
	tryParseObjectToRgb: () => tryParseObjectToRgb,
	withOpacity: () => withOpacity$3
});

//#endregion
//#region ../visual/src/colour/conversion.ts
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
	return convert$1(toCssColour$1(colour), destination);
}
/**
* Like {@link convert}, but result is a CSS colour string
* @param colour 
* @param destination 
* @returns 
*/
function convertToString(colour, destination) {
	const c = convert$1(colour, destination);
	return toCssColour$1(c);
}
function convertScalar(colour, destination) {
	if (destination === `oklch`) return convert$1(colour, `oklch-scalar`);
	if (destination === `srgb`) return convert$1(colour, `srgb-scalar`);
	if (destination === `hsl`) return convert$1(colour, `hsl-scalar`);
	throw new Error(`Unknown destination: '${destination}'`);
}
const toCssColour$1 = (colour) => {
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
	const asCss = toCssColour$1(colour);
	return new index_default(asCss);
};
const guard$3 = (colour) => {
	switch (colour.space) {
		case `hsl`:
			guard$6(colour);
			break;
		case `srgb`:
			guard$4(colour);
			break;
		case `oklch`:
			guard$5(colour);
			break;
		default: throw new Error(`Unsupported colour space: '${colour.space}'`);
	}
};
const toColour$1 = (colourish) => {
	if (!isColourish(colourish)) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc. Got: ${JSON.stringify(colourish)}`);
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
//#region ../visual/src/svg/stroke.ts
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
//#region ../visual/src/svg/markers.ts
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
//#region ../visual/src/svg/path.ts
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
//#region ../visual/src/svg/elements.ts
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
const grid = (parent, center$1, spacing, width, height, opts = {}) => {
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
//#region ../visual/src/svg/geometry.ts
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
//#region ../visual/src/svg/remove.ts
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
//#region ../visual/src/svg/helper.ts
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
		grid: (center$1, spacing, width, height, opts) => grid(parent, center$1, spacing, width, height, opts),
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
//#region ../visual/src/svg/index.ts
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
//#region ../visual/src/pointer-visualise.ts
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
//#region ../visual/src/named-colour-palette.ts
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
//#region ../visual/src/video.ts
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
//#region ../visual/src/plot/bipolar-view.ts
var bipolar_view_exports = {};
__export(bipolar_view_exports, { init: () => init });
function getNumericAttribute(el, name, defaultValue) {
	const a = el.getAttribute(name);
	if (a === null) return defaultValue;
	return Number.parseInt(a);
}
/**
* Initialises a plotter for bipolar values (-1...1)
* 
* ```js
* const p = BipolarView.init(`#my-canvas`);
* // Shows the dot at 1, 0.5
* p(1, 0.5);
* ```
* @param elementQuery 
* @param options 
* @returns 
*/
const init = (elementQuery, options = {}) => {
	const element = document.querySelector(elementQuery);
	if (!element) throw new Error(`Element query could not be found (${elementQuery})`);
	const labels = options.labels ?? [`x`, `y`];
	const labelPrecision = options.labelPrecision ?? 2;
	const asPercentages = options.asPercentages ?? false;
	const displayLastValues = options.displayLastValues ?? 0;
	const showWhiskers = options.showWhiskers ?? true;
	const showDot = options.showDot ?? true;
	const showLabels = options.showLabels ?? true;
	const yAxisBottomNegative = options.yAxisBottomNegative ?? true;
	const axisColour = toStringFirst(options.axisColour, `silver`);
	const bgColour = toStringFirst(options.bgColour, `white`);
	const whiskerColour = toStringFirst(options.whiskerColour, `black`);
	const dotColour = toStringFirst(options.dotColour, options.whiskerColour, `black`);
	const labelColour = toStringFirst(options.labelColour, options.axisColour, `silver`);
	const axisWidth = options.axisWidth ?? 1 * window.devicePixelRatio;
	const dotRadius = options.dotRadius ?? 5 * window.devicePixelRatio;
	const pad = options.padding ?? 10 * window.devicePixelRatio;
	const whiskerSize = options.whiskerSize ?? 5 * window.devicePixelRatio;
	const width = options.width ?? getNumericAttribute(element, `width`, 200) * window.devicePixelRatio;
	const height = options.height ?? getNumericAttribute(element, `height`, 200) * window.devicePixelRatio;
	let lastValues;
	if (displayLastValues > 0) lastValues = new QueueImmutable({
		capacity: displayLastValues,
		discardPolicy: `older`
	});
	element.width = width;
	element.height = height;
	element.style.width = `${width / window.devicePixelRatio}px`;
	element.style.height = `${height / window.devicePixelRatio}px`;
	const midY = height / 2;
	const midX = width / 2;
	const ctx = element.getContext(`2d`);
	if (!ctx) throw new Error(`Could not create drawing context`);
	if (window.devicePixelRatio >= 2) ctx.font = `20px sans-serif`;
	const percentageFormat = (v) => `${Math.round(v * 100)}%`;
	const fixedFormat = (v) => v.toFixed(labelPrecision);
	const valueFormat = asPercentages ? percentageFormat : fixedFormat;
	if (showLabels) {
		labels[0] = labels[0] + `:`;
		labels[1] = labels[1] + `:`;
	} else {
		labels[0] = ``;
		labels[1] = ``;
	}
	const renderBackground = options.renderBackground ?? ((ctx$1, width$1, height$1) => {
		if (options.bgColour === `transparent`) ctx$1.clearRect(0, 0, width$1, height$1);
		else {
			ctx$1.fillStyle = bgColour;
			ctx$1.fillRect(0, 0, width$1, height$1);
		}
	});
	return (x, y) => {
		x = clamp$1(x);
		y = clamp$1(y);
		renderBackground(ctx, width, height);
		ctx.fillStyle = labelColour;
		ctx.textBaseline = `top`;
		ctx.save();
		ctx.translate(midX, midY);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText((labels[1] + ` ` + valueFormat(y)).trim(), -midX + pad, 1);
		ctx.restore();
		ctx.fillText((labels[0] + ` ` + valueFormat(x)).trim(), pad, midX + 2);
		if (!yAxisBottomNegative) y *= -1;
		ctx.strokeStyle = axisColour;
		ctx.lineWidth = axisWidth;
		ctx.beginPath();
		ctx.moveTo(pad, midY);
		ctx.lineTo(width - pad, midY);
		ctx.moveTo(midX, pad);
		ctx.lineTo(midX, height - pad);
		ctx.stroke();
		ctx.closePath();
		const yy = (height - pad - pad) / 2 * -y;
		const xx = (width - pad - pad) / 2 * x;
		const dotPos = {
			x: xx,
			y: yy,
			radius: dotRadius
		};
		if (lastValues) lastValues = lastValues.enqueue(dotPos);
		ctx.save();
		ctx.translate(midX, midY);
		if (showDot) if (lastValues) {
			const opacityStep = 1 / lastValues.length;
			let opacity = 1;
			lastValues.forEach((d) => {
				const colour = multiplyOpacity(dotColour, opacity);
				circle$1(ctx, d, { fillStyle: colour });
				opacity -= opacityStep;
			});
		} else circle$1(ctx, dotPos, { fillStyle: dotColour });
		if (showWhiskers) {
			ctx.strokeStyle = whiskerColour;
			ctx.beginPath();
			ctx.moveTo(0, yy - whiskerSize);
			ctx.lineTo(0, yy + whiskerSize);
			ctx.moveTo(xx - whiskerSize, 0);
			ctx.lineTo(xx + whiskerSize, 0);
			ctx.stroke();
			ctx.closePath();
		}
		ctx.restore();
	};
};

//#endregion
//#region ../visual/src/plot/cartesian.ts
const computeMinMax = (mm) => {
	const x = mm.map((m) => m.x);
	const y = mm.map((m) => m.y);
	const minX = Math.min(...x);
	const maxX = Math.max(...x);
	const minY = Math.min(...y);
	const maxY = Math.max(...y);
	const width = maxX - minX;
	const height = maxY - minY;
	return {
		min: {
			x: minX,
			y: minY
		},
		max: {
			x: maxX,
			y: maxY
		},
		width,
		height,
		minDim: Math.min(width, height),
		maxDim: Math.max(width, height)
	};
};
const relativeCompute = (minMax) => {
	if (!Number.isFinite(minMax.height)) return (point) => point;
	const xScale = scaler(minMax.min.x, minMax.max.x);
	const yScale = scaler(minMax.min.y, minMax.max.y);
	return (point) => ({
		x: xScale(point.x),
		y: yScale(point.y)
	});
};
const absoluteCompute = (minMax) => {
	const xScale = scaler(0, 1, minMax.min.x, minMax.max.x);
	const yScale = scaler(0, 1, minMax.min.y, minMax.max.y);
	return (point) => ({
		x: xScale(point.x),
		y: yScale(point.y)
	});
};
const computeAxisMark = (mm, increments, major) => {
	const xValues = [];
	let count = 0;
	for (let x = mm.min.x; x < mm.max.x; x += increments) {
		const isMajor = count % major === 0;
		xValues.push({
			x,
			y: 0,
			major: isMajor
		});
		count++;
	}
	count = 0;
	const yValues = [];
	for (let y = mm.min.y; y < mm.max.y; y += increments) {
		const isMajor = count % major === 0;
		yValues.push({
			x: 0,
			y,
			major: isMajor
		});
		count++;
	}
	return {
		x: xValues,
		y: yValues
	};
};

//#endregion
//#region ../visual/src/plot/DataSet.ts
var DataSet = class {
	#data;
	#meta;
	lastChange;
	constructor() {
		this.lastChange = performance.now();
		this.#data = new MapOfSimpleMutable();
		this.#meta = /* @__PURE__ */ new Map();
	}
	get metaCount() {
		return this.#meta.size;
	}
	clear() {
		this.#data.clear();
		this.lastChange = performance.now();
	}
	set(series, data) {
		this.#data.setValues(series, data);
	}
	deleteBySeries(series) {
		const changed = this.#data.delete(series);
		if (changed) this.lastChange = performance.now();
		return changed;
	}
	setMeta(series, meta) {
		this.#meta.set(series, meta);
	}
	hasMeta(series) {
		return this.#meta.has(series);
	}
	getMeta(series) {
		return this.#meta.get(series);
	}
	*getValues() {
		yield* this.#data.valuesFlat();
	}
	*getEntries() {
		yield* this.#data.entries();
	}
	*getSeries() {
		yield* this.#data.values();
	}
	add(value, series = `default`) {
		this.#data.addKeyedValues(series, value);
		this.lastChange = performance.now();
	}
};

//#endregion
//#region ../visual/src/pi-pi.ts
const piPi = Math.PI * 2;

//#endregion
//#region ../visual/src/canvas-region.ts
var CanvasSource = class {
	#canvasEl;
	#ctx;
	#sizeBasis;
	#sizeScaler;
	#logicalSize;
	#pixelScaling;
	#regions = [];
	constructor(canvasElementOrQuery, sizeBasis = `min`) {
		this.#canvasEl = resolveEl(canvasElementOrQuery);
		this.#sizeBasis = sizeBasis;
		this.#pixelScaling = window.devicePixelRatio || 1;
		this.#sizeScaler = this.#createSizeScaler();
		this.#logicalSize = this.setLogicalSize({
			width: this.#canvasEl.width,
			height: this.#canvasEl.height
		});
	}
	setLogicalSize(size) {
		this.#logicalSize = size;
		const el = this.#canvasEl;
		el.width = size.width * this.#pixelScaling;
		el.height = size.height * this.#pixelScaling;
		el.style.width = `${size.width.toString()}px`;
		el.style.height = `${size.height.toString()}px`;
		this.#sizeScaler = this.#createSizeScaler();
		this.invalidateContext();
		return size;
	}
	#createSizeScaler() {
		let inMax = 1;
		switch (this.#sizeBasis) {
			case `min`:
				inMax = Math.min(this.#canvasEl.width, this.#canvasEl.height);
				break;
			case `max`:
				inMax = Math.max(this.#canvasEl.width, this.#canvasEl.height);
				break;
		}
		const s = scalerTwoWay(0, inMax, 0, 1);
		return {
			abs: s.in,
			rel: s.out
		};
	}
	invalidateContext() {
		this.#ctx = void 0;
	}
	#add(region) {
		if (!region) throw new Error(`Param 'region' is undefined/null`);
		if (this.#regions.includes(region)) throw new Error(`Region already exists`);
		this.#regions.push(region);
		return region;
	}
	toAbsPoint(pt, kind = `independent`) {
		let { x, y } = pt;
		switch (kind) {
			case `independent`:
				x *= this.width;
				y *= this.height;
		}
		return {
			x,
			y
		};
	}
	get offset() {
		const b = this.#canvasEl.getBoundingClientRect();
		return {
			x: b.left,
			y: b.top
		};
	}
	toRelPoint(pt, source, kind = `independent`, clamped = true) {
		let { x, y } = pt;
		if (source === `screen`) {
			const b = this.#canvasEl.getBoundingClientRect();
			x -= b.x;
			y -= b.y;
		}
		switch (kind) {
			case `independent`:
				x /= this.width;
				y /= this.height;
				break;
			case `skip`: break;
		}
		if (clamped) {
			x = clamp(x);
			y = clamp(y);
		}
		return {
			x,
			y
		};
	}
	toAbsRect(rect$1, kind = `independent`) {
		let { width, height } = rect$1;
		switch (kind) {
			case `independent`:
				width *= this.width;
				height *= this.height;
				if (isRectPositioned(rect$1)) return {
					...this.toAbsPoint(rect$1),
					width,
					height
				};
		}
		return {
			width,
			height
		};
	}
	/**
	* Creates a region
	* 
	* Absolute positioned. Uses source coordinates which don't change
	* ```js
	* source.createRegion({ 
	*  absPositioned: { x: 0, y: 0, width: 100, height: 100} 
	* });
	* ```
	* 
	* Relative positioned. Uses coordiantes relative to source dimensions.
	* Updated if source changes.
	* ```js
	* source.createRegion({
	*  relativePositioned: { x: 0, y:0, width: 1, height: 0.5 },
	*  scale: `independent`
	* });
	* ```
	* 
	* Relative sized. Uses size relative to source dimension. By default centers.
	* ```js
	* source.createRegion({
	*  relativeSize: { width: 0.5, height: 0.5 }
	*  position: `center`
	* })
	* ```
	* @param spec 
	* @returns 
	*/
	createRegion(spec) {
		const marginPx = spec.marginPx ?? 0;
		const marginPx2 = marginPx * 2;
		if (`absPositioned` in spec) {
			const rect$1 = subtractSize(spec.absPositioned, marginPx, marginPx);
			return this.#add(new CanvasRegion(this, () => rect$1));
		}
		if (`relativePositioned` in spec) {
			let compute;
			const rect$1 = spec.relativePositioned;
			switch (spec.scale) {
				case `independent`:
					compute = (source) => ({
						x: rect$1.x * source.width + marginPx,
						y: rect$1.y * source.height + marginPx,
						width: rect$1.width * source.width - marginPx2,
						height: rect$1.height * source.height - marginPx2
					});
					break;
				default: throw new Error(`Param 'kind' unknown (${spec.scale})`);
			}
			return this.#add(new CanvasRegion(this, compute));
		}
		if (`relativeSize` in spec) {
			let compute;
			const rect$1 = spec.relativeSize;
			const position = spec.position;
			switch (spec.scale) {
				case `independent`:
					compute = (source) => {
						const width = rect$1.width * source.width - marginPx2;
						const height = rect$1.height * source.height - marginPx2;
						let x = source.width / 2 - width / 2;
						let y = source.height / 2 - height / 2;
						switch (position) {
							case `n`:
								y = 0;
								break;
							case `s`:
								y = source.height - height;
								break;
							default:
						}
						x += marginPx;
						y += marginPx;
						return {
							width,
							height,
							x,
							y
						};
					};
					break;
				default: throw new Error(`Param 'kind' unknown (${spec.scale})`);
			}
			return this.#add(new CanvasRegion(this, compute));
		}
		if (`match` in spec) {
			const result = resolveElementTry(spec.match);
			if (!result.success) throw new Error(`Could not resolve match element. ${resultErrorToString(result)}`);
			const compute = (_source) => {
				const bounds = result.value.getBoundingClientRect();
				return {
					x: bounds.x + marginPx,
					y: bounds.y + marginPx,
					width: bounds.width - marginPx2,
					height: bounds.height - marginPx2
				};
			};
			return this.#add(new CanvasRegion(this, compute));
		}
		throw new Error(`Spec doesn't seem valid`);
	}
	clear() {
		const c = this.context;
		c.clearRect(0, 0, this.width, this.height);
	}
	get context() {
		if (this.#ctx) return this.#ctx;
		const c = this.#canvasEl.getContext(`2d`);
		if (!c) throw new Error(`Could not create 2d context`);
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.scale(this.#pixelScaling, this.#pixelScaling);
		this.#ctx = c;
		for (const r of this.#regions) r.recomputeRegion();
		return this.#ctx;
	}
	get sizeScaler() {
		return this.#sizeScaler;
	}
	get width() {
		return this.#logicalSize.width;
	}
	get height() {
		return this.#logicalSize.height;
	}
};
/**
* Draws on a canvas, constrained to a specific region
*/
var CanvasRegion = class {
	source;
	#regionCompute;
	#r;
	/**
	* Creates, using coordinate in canvas coordinates
	*/
	constructor(source, regionCompute) {
		this.source = source;
		this.#regionCompute = regionCompute;
		this.#r = regionCompute(source);
	}
	/**
	* Calls the original `regionCompute` function passed in to the constructor
	* to recompute the absolute region
	*/
	recomputeRegion() {
		this.#r = this.#regionCompute(this.source);
	}
	/**
	* Converts a region-relative point (0..1) to an absolute
	* point, which uses region-relative coordinates.
	* 
	* Eg if the region had an x,y of 100,100, `toAbsRegion({x:0,y:0})`
	* will return 0,0.
	*
	* @param regionRel 
	* @param scaleBy 
	* @returns 
	*/
	toAbsRegion(regionRel, scaleBy = `both`) {
		switch (scaleBy) {
			case `both`: return {
				x: regionRel.x * this.#r.width,
				y: regionRel.y * this.#r.height
			};
		}
	}
	/**
	* Returns a copy of `p` offset by the region's x & y
	* @param p 
	* @returns 
	*/
	applyRegionOffset(p) {
		return {
			x: p.x + this.#r.x,
			y: p.y + this.#r.y
		};
	}
	/**
	* Draws a line from a series of points.
	* Assumes region-relative, % coordinates (ie 0..1 scale)
	* @param relativePoints Points to connect, in region-relative coordinates
	* @param strokeStyle Stroke style
	* @param lineWidth Line with
	*/
	drawConnectedPointsRelative(relativePoints, strokeStyle, lineWidth = 1) {
		const points = relativePoints.map((p) => this.toAbsRegion(p));
		this.drawConnectedPoints(points, strokeStyle, lineWidth);
	}
	/**
	* Draws connected points in absolute coordinates,
	* however with 0,0 being the top-left of the region.
	* 
	* Thus, this will apply the region offset before drawing.
	* @param points Points to draw
	* @param strokeStyle Stroke style
	* @param lineWidth Line width
	*/
	drawConnectedPoints(points, strokeStyle, lineWidth = 1) {
		const c = this.context;
		c.save();
		c.translate(this.#r.x, this.#r.y);
		c.beginPath();
		c.strokeStyle = strokeStyle;
		c.lineWidth = lineWidth;
		for (let index = 0; index < points.length; index++) if (index === 0) c.moveTo(points[index].x, points[index].y);
		else c.lineTo(points[index].x, points[index].y);
		c.stroke();
		c.restore();
	}
	/**
	* Fills text at a relative position
	* @param text 
	* @param relPos Relative, meaning 0.5,0.5 is the middle of the region
	* @param fillStyle 
	* @param baseline 
	* @param align 
	*/
	fillTextRelative(text$1, relPos, fillStyle = `black`, font, baseline = `alphabetic`, align = `start`) {
		const point = this.toAbsRegion(relPos);
		this.fillTextRelative(text$1, point, fillStyle, font, baseline, align);
	}
	/**
	* Fills text at a region-relative position
	* @param text 
	* @param point Region relative, meaning 0,0 is top-left of region
	* @param fillStyle 
	* @param baseline 
	* @param align 
	*/
	fillText(text$1, point, fillStyle = `black`, font, baseline = `alphabetic`, align = `start`) {
		const c = this.context;
		c.save();
		c.translate(this.#r.x, this.#r.y);
		if (font.length > 0) c.font = font;
		c.textBaseline = baseline;
		c.textAlign = align;
		c.fillStyle = fillStyle;
		c.fillText(text$1, point.x, point.y);
		c.restore();
	}
	drawCircles(relativeCircles, fillStyle, strokeStyle = ``, lineWidth = 1) {
		const circles = relativeCircles.map((c$1) => {
			return {
				...this.toAbsRegion(c$1),
				radius: this.source.sizeScaler.abs(c$1.radius)
			};
		});
		const c = this.context;
		c.save();
		c.translate(this.#r.x, this.#r.y);
		c.fillStyle = fillStyle;
		c.strokeStyle = strokeStyle;
		c.lineWidth = lineWidth;
		for (const circle$2 of circles) {
			c.beginPath();
			c.arc(circle$2.x, circle$2.y, circle$2.radius, 0, piPi);
			c.closePath();
			if (fillStyle.length > 0) c.fill();
			if (strokeStyle.length > 0) c.stroke();
		}
		c.restore();
	}
	clear() {
		const c = this.context;
		c.clearRect(this.#r.x, this.#r.y, this.#r.width, this.#r.height);
	}
	fill(fillStyle = `white`) {
		const c = this.context;
		c.fillStyle = fillStyle;
		c.fillRect(this.#r.x, this.#r.y, this.#r.width, this.#r.height);
	}
	drawBounds(strokeStyle, lineWidth = 1) {
		this.drawConnectedPointsRelative([
			{
				x: 0,
				y: 0
			},
			{
				x: 1,
				y: 0
			},
			{
				x: 1,
				y: 1
			},
			{
				x: 0,
				y: 1
			},
			{
				x: 0,
				y: 0
			}
		], strokeStyle, lineWidth);
		this.drawConnectedPointsRelative([{
			x: 0,
			y: 1
		}, {
			x: 1,
			y: 0
		}], strokeStyle, lineWidth);
		this.drawConnectedPointsRelative([{
			x: 0,
			y: 0
		}, {
			x: 1,
			y: 1
		}], strokeStyle, lineWidth);
	}
	/**
	* Converts a  point to a region-relative one.
	* @param pt 
	* @param kind 
	* @returns 
	*/
	toRelPoint(pt, source = `screen`, kind = `independent`, clamped = true) {
		pt = this.source.toRelPoint(pt, source, `skip`, false);
		let { x, y } = pt;
		x -= this.x;
		y -= this.y;
		switch (kind) {
			case `independent`:
				x /= this.width;
				y /= this.height;
		}
		if (clamped) {
			x = clamp(x);
			y = clamp(y);
		}
		return {
			x,
			y
		};
	}
	absToRegionPoint(pt, source, clamped) {
		if (source === `screen`) pt = subtract(pt, this.source.offset);
		let { x, y } = pt;
		x -= this.x;
		y -= this.y;
		if (clamped) {
			if (x < 0) x = 0;
			if (y < 0) y = 0;
			if (x > this.width + this.x) x = this.x + this.width;
			if (y > this.height + this.y) y = this.y + this.height;
		}
		return {
			x,
			y
		};
	}
	get center() {
		return center(this.#r);
	}
	get context() {
		return this.source.context;
	}
	set region(value) {
		this.#r = value;
	}
	get region() {
		return this.#r;
	}
	get width() {
		return this.#r.width;
	}
	get height() {
		return this.#r.height;
	}
	get x() {
		return this.#r.x;
	}
	get y() {
		return this.#r.y;
	}
	get dimensionMin() {
		return Math.min(this.#r.width, this.#r.height);
	}
};

//#endregion
//#region ../visual/src/plot/cartesian-canvas-plot.ts
const insert = (insertOptions, options = {}) => {
	const parentEl = insertOptions.parent === void 0 ? document.body : resolveEl(insertOptions.parent);
	const canvasEl = document.createElement(`canvas`);
	parentEl.prepend(canvasEl);
	const ds = new DataSet();
	const source = new CanvasSource(canvasEl, `min`);
	const spec = insertOptions.region ?? { relativePositioned: {
		x: 0,
		y: 0,
		width: 1,
		height: 1
	} };
	const region = source.createRegion(spec);
	const p = new CartesianCanvasPlot(region, ds, options);
	if (insertOptions.canvasResizeTo === `viewport`) ElementSizer.canvasViewport(canvasEl, { onSizeChanging: (size, _el) => {
		source.setLogicalSize(size);
		p.invalidateRange();
		p.draw();
	} });
	else ElementSizer.canvasParent(canvasEl, { onSizeChanging: (size, _el) => {
		source.setLogicalSize(size);
		p.invalidateRange();
		p.draw();
	} });
	return p;
};
/**
* Simple plotting of cartesian values.
* 
* Create a plot that fills screen
* ```js
* const p = Plot.insert({fill`viewport});
* const dataSet = p.dataSet;
* 
* // Add data
* ds.add({ x: 1, y: 2 });
* 
* // Draw
* p.draw();
* ```
*
* Create a plot that fills a container
* ```js
* const p = Plot.insert({parent:`#someel`});
* ```
* 
* Add data using the created data set
* ```js
* 
* // Add a value to the `alpha` series
* p.dataSet.add({x:1,y:1}, `alpha`);
* ```
* 
* Set default series formatting
* ```js
* p.setMeta(`default`, {
*  colour: `hsl(50,100%,50%)`,
*  lineWidth: 10
* });
* ```
* 
* Series can have metadata associated with it in the DataSet
* ```js
* // Use 'pink' by default for the series 'alpha'
* p.setMeta(`alpha`, { colour: `pink` });
* ``
* 
*/
var CartesianCanvasPlot = class {
	#data;
	#lastDataChange;
	#canvasRegion;
	actualDataRange = EmptyPositioned;
	visibleRange = PlaceholderPositioned;
	show;
	whiskerLength;
	axisRounder = round(1, true);
	onInvalidated;
	/**
	* List of lines to draw after drawing everything else.
	* Lines are given in value-coordinate space
	*/
	overlayLines = [];
	#grid;
	#rangeMode;
	#currentRange;
	#axisStyle;
	#valueStyle;
	#connectStyle;
	#rangeManual;
	#textStyle;
	#visualPadding;
	#visualClear;
	constructor(cr, data, options = {}) {
		if (!data) throw new TypeError(`Param 'data' is undefined`);
		if (typeof data !== `object`) throw new TypeError(`Param 'data' is not an object. Got: ${typeof data}`);
		this.onInvalidated = options.onInvalidated;
		this.#data = data;
		this.#canvasRegion = cr;
		this.#lastDataChange = 0;
		this.#visualClear = options.clear ?? `region`;
		this.#rangeMode = options.range ?? `auto`;
		this.#valueStyle = options.valueStyle ?? `dot`;
		this.#connectStyle = options.connectStyle ?? ``;
		this.whiskerLength = options.whiskerLength ?? 5;
		this.#visualPadding = options.visualPadding ?? 20;
		this.show = {
			axes: true,
			axisValues: true,
			grid: true,
			whiskers: true,
			...options.show
		};
		this.#axisStyle = {
			colour: `black`,
			width: 2,
			...options.axisStyle
		};
		this.#textStyle = {
			colour: `black`,
			size: `1em`,
			font: `system-ui`,
			...options.textStyle
		};
		this.#grid = {
			increments: .1,
			major: 5,
			colour: `whitesmoke`,
			width: 1,
			...options.grid
		};
	}
	getCurrentRange() {
		if (this.#data.lastChange === this.#lastDataChange && this.#currentRange) return this.#currentRange;
		this.#lastDataChange = this.#data.lastChange;
		const r = this.#createRange();
		this.#currentRange = r;
		if (this.onInvalidated) this.onInvalidated();
		return r;
	}
	invalidateRange() {
		this.#currentRange = void 0;
	}
	#createRange() {
		const range = this.getDataRange();
		const absDataToRelative = relativeCompute(range);
		const relDataToAbs = absoluteCompute(range);
		const cr = this.#canvasRegion;
		const padding = this.#visualPadding;
		let xOffset = cr.x + padding;
		let yOffset = cr.y + padding;
		const allowedHeight = cr.height - padding * 2;
		const allowedWidth = cr.width - padding * 2;
		const dimensionMin = Math.min(allowedHeight, allowedWidth);
		if (allowedWidth >= allowedHeight) xOffset += allowedWidth / 2 - dimensionMin / 2;
		else yOffset += allowedHeight / 2 - dimensionMin / 2;
		const relDataToCanvas = (pt) => {
			let { x, y } = pt;
			if (x === Number.NEGATIVE_INFINITY) x = 0;
			else if (x === Number.POSITIVE_INFINITY) x = 1;
			if (y === Number.NEGATIVE_INFINITY) y = 0;
			else if (y === Number.POSITIVE_INFINITY) y = 1;
			x = x * dimensionMin;
			y = (1 - y) * dimensionMin;
			x += xOffset;
			y += yOffset;
			return {
				x,
				y
			};
		};
		const canvasToRelData = (pt) => {
			let { x, y } = pt;
			x -= xOffset;
			y -= yOffset;
			x = x / dimensionMin;
			y = 1 - y / dimensionMin;
			return {
				x,
				y
			};
		};
		const regionSpaceToRelative = (pt) => {
			let { x, y } = pt;
			x = x - cr.x + this.#visualPadding;
			y = dimensionMin + this.#visualPadding - y;
			x /= dimensionMin;
			y = y / dimensionMin;
			return {
				x,
				y
			};
		};
		return {
			absDataToRelative,
			relDataToCanvas,
			canvasToRelData,
			regionSpaceToRelative,
			relDataToAbs,
			range
		};
	}
	/**
	* Positions an element at the viewport location of `data` point.
	* Ensure the element has `position:absolute` set.
	* @param data 
	* @param elementToPosition 
	* @param by 
	*/
	positionElementAt(data, elementToPosition, by = `middle`, relativeToQuery) {
		const el = resolveEl(elementToPosition);
		let { x, y } = this.valueToScreenSpace(data);
		if (by === `middle`) {
			const bounds = el.getBoundingClientRect();
			x -= bounds.width / 2;
			y -= bounds.height / 2;
		} else if (by === `top-left`) {} else throw new Error(`Param 'by' expected to be 'middle' or 'top-left'.`);
		if (relativeToQuery) {
			const relativeTo = resolveEl(relativeToQuery);
			const bounds = relativeTo.getBoundingClientRect();
			x -= bounds.x;
			y -= bounds.y;
		}
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;
	}
	/**
	* When range is auto, returns the range of the data
	* Otherwise returns the user-provided range.
	* @returns 
	*/
	getDataRange() {
		if (this.#rangeMode === `auto`) return computeMinMax([...this.#data.getValues()]);
		else {
			if (!this.#rangeManual) this.#rangeManual = computeMinMax([this.#rangeMode.max, this.#rangeMode.min]);
			return this.#rangeManual;
		}
	}
	valueToScreenSpace(dataPoint) {
		const region = this.valueToRegionSpace(dataPoint);
		const offset$1 = this.canvasSource.offset;
		const scr = {
			x: region.x + offset$1.x,
			y: region.y + offset$1.y
		};
		return scr;
	}
	valueToRegionSpace(dataValue, debug = false) {
		const ds = this.getCurrentRange();
		const rel = ds.absDataToRelative(dataValue);
		const region = ds.relDataToCanvas(rel);
		if (debug) console.log(`orig: ${dataValue.x}x${dataValue.y} rel: ${rel.x}x${rel.y} region: ${region.x}x${region.y}`);
		return {
			...dataValue,
			x: region.x,
			y: region.y
		};
	}
	/**
	* Converts a point in pixel coordinates to a value.
	* Useful for converting from user input coordinates.
	* @param point 
	* @returns 
	*/
	pointToValue(point, _source) {
		const ds = this.getCurrentRange();
		const canvasPoint = subtract(point, this.canvasSource.offset);
		const v = ds.canvasToRelData(canvasPoint);
		return ds.relDataToAbs(v);
	}
	/**
	* Compute canvas-relative coordinates based on two points in value space
	* @param valueA 
	* @param valueB 
	*/
	#valueLineToCanvasSpace(valueA, valueB, debug = false) {
		valueA = this.valueToRegionSpace(valueA, debug);
		valueB = this.valueToRegionSpace(valueB, debug);
		return {
			a: valueA,
			b: valueB
		};
	}
	getDefaultMeta() {
		return {
			colour: goldenAngleColour(this.#data.metaCount),
			lineWidth: 2,
			dotRadius: 5
		};
	}
	draw() {
		if (this.#visualClear === `region`) this.#canvasRegion.clear();
		else this.canvasSource.clear();
		this.#useGrid();
		if (this.show.axes) this.#drawAxes();
		for (const [k, v] of this.#data.getEntries()) {
			let meta = this.#data.getMeta(k);
			if (!meta) {
				meta = this.getDefaultMeta();
				this.#data.setMeta(k, meta);
			}
			this.#drawSeries(k, v, meta);
		}
		for (const line$2 of this.overlayLines) this.drawLine(line$2, line$2.colour, line$2.width);
	}
	/**
	* Draws a line in value-coordinate space
	* @param line 
	* @param colour 
	* @param width 
	*/
	drawLine(line$2, colour, width) {
		const l = this.#valueLineToCanvasSpace(line$2.a, line$2.b);
		this.#drawLineCanvasSpace(l, colour, width);
	}
	setMeta(series, meta) {
		this.#data.setMeta(series, {
			...this.getDefaultMeta(),
			...meta
		});
	}
	#drawAxes() {
		const { colour, width } = this.#axisStyle;
		const yAxis = this.#valueLineToCanvasSpace({
			x: 0,
			y: Number.NEGATIVE_INFINITY
		}, {
			x: 0,
			y: Number.POSITIVE_INFINITY
		}, false);
		const xAxis = this.#valueLineToCanvasSpace({
			x: Number.NEGATIVE_INFINITY,
			y: 0
		}, {
			x: Number.POSITIVE_INFINITY,
			y: 0
		}, false);
		this.#drawLineCanvasSpace(xAxis, colour, width, false);
		this.#drawLineCanvasSpace(yAxis, colour, width, false);
	}
	#drawYAxisValues(yPoints) {
		const ctx = this.#canvasRegion.context;
		ctx.font = this.#textStyle.size + ` ` + this.#textStyle.font;
		ctx.fillStyle = this.#textStyle.colour;
		ctx.textBaseline = `middle`;
		for (const p of yPoints) {
			if (p.x === 0 && p.y === 0) continue;
			const reg = this.valueToRegionSpace(p, false);
			const value = this.axisRounder(p.y);
			const label = value.toString();
			const measure = ctx.measureText(label);
			const x = reg.x - measure.width - this.whiskerLength / 2 - 5;
			const y = reg.y;
			ctx.fillText(label, x, y);
		}
	}
	#drawXAxisValues(xPoints) {
		const ctx = this.#canvasRegion.context;
		ctx.font = this.#textStyle.size + ` ` + this.#textStyle.font;
		ctx.fillStyle = this.#textStyle.colour;
		ctx.textBaseline = `top`;
		for (const p of xPoints) {
			const reg = this.valueToRegionSpace(p, false);
			const value = this.axisRounder(p.x);
			const label = value.toString();
			const measure = ctx.measureText(label);
			const x = reg.x - measure.width / 2;
			const y = reg.y + measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + this.whiskerLength / 2;
			ctx.fillText(label, x, y);
		}
	}
	#drawWhisker(p, vertical) {
		const whiskerHalfLength = this.whiskerLength / 2;
		const v = vertical ? {
			x: p.x,
			y: 0
		} : {
			y: p.y,
			x: 0
		};
		const reg = this.valueToRegionSpace(v, false);
		const line$2 = vertical ? {
			a: {
				x: reg.x,
				y: reg.y - whiskerHalfLength
			},
			b: {
				x: reg.x,
				y: reg.y + whiskerHalfLength
			}
		} : {
			a: {
				y: reg.y,
				x: reg.x - whiskerHalfLength
			},
			b: {
				y: reg.y,
				x: reg.x + whiskerHalfLength
			}
		};
		this.#drawLineCanvasSpace(line$2, this.#axisStyle.colour, this.#axisStyle.width, false);
	}
	#drawGridline(p, vertical) {
		const line$2 = vertical ? this.#valueLineToCanvasSpace({
			x: p.x,
			y: Number.NEGATIVE_INFINITY
		}, {
			x: p.x,
			y: Number.POSITIVE_INFINITY
		}) : this.#valueLineToCanvasSpace({
			y: p.y,
			x: Number.NEGATIVE_INFINITY
		}, {
			y: p.y,
			x: Number.POSITIVE_INFINITY
		}, false);
		this.#drawLineCanvasSpace(line$2, this.#grid.colour, p.major ? this.#grid.width * 2 : this.#grid.width);
	}
	#useGrid() {
		const g = this.#grid;
		const showGrid = this.show.grid;
		const showWhiskers = this.show.whiskers;
		const showValues = this.show.axisValues;
		const mm = this.getCurrentRange().range;
		const { increments, major } = g;
		const axisMarks = computeAxisMark(mm, increments, major);
		for (const p of axisMarks.x) {
			if (showGrid) this.#drawGridline(p, true);
			if (showWhiskers && p.major) this.#drawWhisker(p, true);
		}
		for (const p of axisMarks.y) {
			if (showGrid) this.#drawGridline(p, false);
			if (showWhiskers && p.major) this.#drawWhisker(p, false);
		}
		if (showValues) {
			this.#drawXAxisValues(axisMarks.x.filter((p) => p.major));
			this.#drawYAxisValues(axisMarks.y.filter((p) => p.major));
		}
	}
	#drawSeries(name, series, meta) {
		if (this.#connectStyle === `line`) this.#drawConnected(series, meta.colour, meta.lineWidth);
		if (this.#valueStyle === `dot`) for (const v of series) this.#drawDot(v, meta.colour, meta.dotRadius);
	}
	#drawConnected(dots, colour, width) {
		const ctx = this.#canvasRegion.context;
		ctx.beginPath();
		for (const [index, dot_] of dots.entries()) {
			const dot$1 = this.valueToRegionSpace(dot_, false);
			if (index === 0) ctx.moveTo(dot$1.x, dot$1.y);
			ctx.lineTo(dot$1.x, dot$1.y);
		}
		ctx.strokeStyle = toCssColour$1(colour);
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.closePath();
	}
	#drawDot(originalDot, fallbackColour, fallbackRadius) {
		const colour = toCssColour$1(originalDot.fillStyle ?? fallbackColour);
		const pos = this.valueToRegionSpace(originalDot);
		const radius = originalDot.radius ?? fallbackRadius;
		this.#canvasRegion.drawCircles([{
			...pos,
			radius
		}], colour);
	}
	#drawLineCanvasSpace(line$2, colour, width, debug = false) {
		if (debug) console.log(line$2);
		const ctx = this.#canvasRegion.context;
		colour = toCssColour$1(colour);
		ctx.beginPath();
		ctx.moveTo(line$2.a.x, line$2.a.y);
		ctx.lineTo(line$2.b.x, line$2.b.y);
		ctx.strokeStyle = toCssColour$1(colour);
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.closePath();
	}
	get dataSet() {
		return this.#data;
	}
	get canvasRegion() {
		return this.#canvasRegion;
	}
	get canvasSource() {
		return this.#canvasRegion.source;
	}
};

//#endregion
//#region ../visual/src/plot/index.ts
var plot_exports = {};
__export(plot_exports, {
	BipolarView: () => bipolar_view_exports,
	CartesianCanvasPlot: () => CartesianCanvasPlot,
	DataSet: () => DataSet,
	absoluteCompute: () => absoluteCompute,
	computeAxisMark: () => computeAxisMark,
	computeMinMax: () => computeMinMax,
	insert: () => insert,
	relativeCompute: () => relativeCompute
});

//#endregion
//#region ../visual/src/index.ts
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
export { CanvasHelper, colour_exports as Colour, drawing_exports as Drawing, image_data_grid_exports as ImageDataGrid, plot_exports as Plot, svg_exports as Svg, video_exports as Video, pointerVisualise };
//# sourceMappingURL=visual.js.map