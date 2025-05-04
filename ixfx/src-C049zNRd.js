import { intervalToMs$2 as intervalToMs } from "./interval-type-ClgeI-0m.js";
import { sleep$2 as sleep } from "./sleep-BNXUegJk.js";

//#region ../packages/iterables/src/guard.ts
const isAsyncIterable = (v) => {
	if (typeof v !== `object`) return false;
	if (v === null) return false;
	return Symbol.asyncIterator in v;
};
const isIterable = (v) => {
	if (typeof v !== `object`) return false;
	if (v === null) return false;
	return Symbol.iterator in v;
};

//#endregion
//#region ../packages/iterables/src/sync.ts
/**
* Returns last value from an iterable, or _undefined_
* if no values are generated
* @param it
*/
function last$2(it) {
	let returnValue;
	for (const value of it) returnValue = value;
	return returnValue;
}
/**
* Maps an iterable of type `V` to type `X`.
* ```js
* map([1, 2, 3], e => e*e)
* returns [1, 4, 9]
* ```
* @param it
* @param f
*/
function* map(it, f) {
	for (const v of it) yield f(v);
}
function* max$2(it, gt = (a, b) => a > b) {
	let max$3;
	for (const v of it) {
		if (max$3 === void 0) {
			max$3 = v;
			yield max$3;
			continue;
		}
		if (gt(v, max$3)) {
			max$3 = v;
			yield max$3;
		}
	}
	return max$3;
}
function* min$2(it, gt = (a, b) => a > b) {
	let min$3;
	for (const v of it) {
		if (min$3 === void 0) {
			min$3 = v;
			yield min$3;
		}
		if (gt(min$3, v)) {
			min$3 = v;
			yield min$3;
		}
	}
}

//#endregion
//#region ../packages/iterables/src/async.ts
/**
* Returns last value from an iterable, or _undefined_
* if no values are generated
* @param it
*/
async function last$1(it, opts = {}) {
	const abort = opts.abort;
	let returnValue;
	for await (const value of it) {
		if (abort?.aborted) return void 0;
		returnValue = value;
	}
	return returnValue;
}
async function* max$1(it, gt = (a, b) => a > b) {
	let max$3;
	for await (const v of it) {
		if (max$3 === void 0) {
			max$3 = v;
			yield max$3;
			continue;
		}
		if (gt(v, max$3)) {
			max$3 = v;
			yield v;
		}
	}
}
/**
* Returns the minimum seen of an iterable as it changes.
* Streaming result: works with endless iterables.
* 
* Note that `gt` function returns true if A is _greater_ than B, even
* though we're looking for the minimum.
* 
* ```js
* // Rank objects based on 'v' value
* const rank = (a,b) => a.v > b.v;
* min([
*  {i:0,v:1},
*  {i:1,v:9},
*  {i:2,v:-2}
* ], rank);
* // Yields: {i:2, v:1}, {i:2,v:-2}
* ```
* @param it Iterable
* @param gt Should return _true_ if `a` is greater than `b`.
* @returns
*/
async function* min$1(it, gt = (a, b) => a > b) {
	let min$3;
	for await (const v of it) {
		if (min$3 === void 0) {
			min$3 = v;
			yield min$3;
			continue;
		}
		if (gt(min$3, v)) {
			min$3 = v;
			yield v;
		}
	}
	return min$3;
}
/***
* Returns the next IteratorResult,
* throwing an error if it does not happen
* within `interval` (default: 1s)
*/
async function nextWithTimeout(it, options) {
	const ms = intervalToMs(options, 1e3);
	const value = await Promise.race([(async () => {
		await sleep({
			millis: ms,
			signal: options.signal
		});
		return void 0;
	})(), (async () => {
		return await it.next();
	})()]);
	if (value === void 0) throw new Error(`Timeout`);
	return value;
}

//#endregion
//#region ../packages/iterables/src/index.ts
/**
* Returns a stream of minimum values.
* 
* Streaming result: works with endless iterables.
* 
* ```js
* min([
*  {i:0,v:1},
*  {i:1,v:9},
*  {i:2,v:-2}
* ], (a, b) => a.v > b.v);
* // Yields: {i:2, v:1}, {i:2,v:-2}
* ```
* @param it Iterable
* @param gt Should return _true_ if `a` is greater than `b`.
* @returns Yields minimum values
*/
function min(it, gt = (a, b) => a > b) {
	return isAsyncIterable(it) ? min$1(it, gt) : min$2(it, gt);
}
/**
* Returns the maximum value of an iterable as it changes.
* Streaming result: works with endless iterables.
* 
* ```js
* // Rank values by their 'v' field
* const rank = (a,b) => a.v > b.v;
* 
* min([
*  {i:0,v:1},
*  {i:1,v:9},
*  {i:2,v:-2}
* ], rank);
* // Yields: {i:0,v:1}, {i:1,v:9}
* ```
* @param it Iterable
* @param gt Should return _true_ if `a` is greater than `b`.
* @returns Iterable of maximum values
*/
function max(it, gt = (a, b) => a > b) {
	return isAsyncIterable(it) ? max$1(it, gt) : max$2(it, gt);
}
/**
* Returns the last item of an iterable, or _undefined_ if it yields no results.
* @param it 
* @returns 
*/
function last(it) {
	return isAsyncIterable(it) ? last$1(it) : last$2(it);
}

//#endregion
export { isAsyncIterable as isAsyncIterable$2, isIterable as isIterable$2, last as last$2, last$2 as last$3, map as map$2, max as max$8, min as min$8, nextWithTimeout };
//# sourceMappingURL=src-C049zNRd.js.map