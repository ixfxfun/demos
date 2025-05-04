import { __export } from "./chunk-Cl8Af3a2.js";
import { toStringDefault$1 as toStringDefault } from "./is-equal-BLmzsdF3.js";
import { compareIterableValuesShallow$1 as compareIterableValuesShallow } from "./iterable-compare-values-shallow-meQbtcHc.js";
import { intervalToMs$1 as intervalToMs } from "./interval-type-DUJoIYAD.js";
import { sleep$1 as sleep } from "./sleep-BmqQLrRb.js";
import { numberArrayCompute$2 as numberArrayCompute } from "./number-array-compute-CpbIT3Ms.js";

//#region ../packages/iterables/dist/src/guard.js
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
//#region ../packages/iterables/dist/src/async.js
var async_exports = {};
__export(async_exports, {
	asCallback: () => asCallback$2,
	chunks: () => chunks$2,
	concat: () => concat$2,
	dropWhile: () => dropWhile$2,
	equals: () => equals$2,
	every: () => every$2,
	fill: () => fill$2,
	filter: () => filter$2,
	find: () => find$2,
	flatten: () => flatten$2,
	forEach: () => forEach$2,
	fromArray: () => fromArray$2,
	fromIterable: () => fromIterable$2,
	last: () => last$2,
	map: () => map$2,
	max: () => max$2,
	min: () => min$2,
	nextWithTimeout: () => nextWithTimeout,
	reduce: () => reduce$2,
	repeat: () => repeat$1,
	slice: () => slice$2,
	some: () => some$2,
	toArray: () => toArray$2,
	unique: () => unique$2,
	uniqueByValue: () => uniqueByValue$2,
	until: () => until$2,
	withDelay: () => withDelay,
	zip: () => zip$2
});
/**
* Yield values from `array`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
*
* @param array Array of values
* @param interval Interval (defaults: 1ms)
*/
async function* fromArray$2(array, interval = 1) {
	for (const v of array) {
		yield v;
		await sleep(interval);
	}
}
/**
* Yield values from `iterable`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
* @param iterable Iterable or AsyncIterable
* @param [interval=1] Interval to wait between yield
*/
async function* fromIterable$2(iterable, interval = 1) {
	for await (const v of iterable) {
		yield v;
		await sleep(interval);
	}
}
async function* chunks$2(it, size) {
	let buffer = [];
	for await (const v of it) {
		buffer.push(v);
		if (buffer.length === size) {
			yield buffer;
			buffer = [];
		}
	}
	if (buffer.length > 0) yield buffer;
}
async function* concat$2(...its) {
	for await (const it of its) yield* it;
}
async function* dropWhile$2(it, f) {
	for await (const v of it) if (!f(v)) yield v;
}
/**
* Loops over a generator until it finishes, calling `callback`.
* Useful if you don't care about the value generator produces, just the number of loops.
*
* In this version, we do a `for await of` over `gen`, and also `await callback()`.

* ```js
* await until(count(5), () => {
* // do something 5 times
* });
* ```
*
* If you want the value from the generator, use a `for of` loop as usual.
*
* If `callback` explicitly returns _false_, the generator is aborted.
* @param it Generator to run
* @param callback Code to call for each iteration
*/
const until$2 = async (it, callback) => {
	for await (const _ of it) {
		const value = await callback();
		if (typeof value === `boolean` && !value) break;
	}
};
/**
* This generator will repeat another generator up until some condition. This is the version
* that can handle async generators.
*
* For example, {@link count} will count from 0..number and then finish:
* ```js
* for (const v of count(5)) {
*  // v: 0, 1, 2, 3, 4
* }
* ```
*
* But what if we want to repeat the count? We have to provide a function to create the generator,
* rather than using the generator directly, since it's "one time use"
* ```js
* for await (const v of repeat(() => count(5))) {
*  // v: 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, ...
*  // warning: never ends
* }
* ```
*
* Limiting the number of repeats can be done by passing in extra parameters
* ```js
* repeat(generator, { count: 5} ); // Iterate over `generator` five times
* ```
*
* ```js
* const ac = new AbortController();
* repeat(generator, { signal: ac.signal }); // Pass in signal
* ...
* ac.abort(); // Trigger signal at some point
* ```
* @param genCreator
* @param repeatsOrSignal
*/
const repeat$1 = async function* (genCreator, repeatsOrSignal) {
	const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
	const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
	let count = repeats;
	while (true) {
		for await (const v of genCreator()) {
			yield v;
			if (signal?.aborted) break;
		}
		if (Number.isFinite(repeats)) {
			count--;
			if (count === 0) break;
		}
		if (signal?.aborted) break;
	}
};
/**
* Returns true if items in two iterables are equal, as
* determined by the `equality` function.
* Order matters. It compares items at the same 'step' of each iterable.
* @param it1
* @param it2
* @param equality
* @returns
*/
async function equals$2(it1, it2, equality) {
	const iit1 = it1[Symbol.asyncIterator]();
	const iit2 = it2[Symbol.asyncIterator]();
	while (true) {
		const index1 = await iit1.next();
		const index2 = await iit2.next();
		if (equality !== void 0) {
			if (!equality(index1.value, index2.value)) return false;
		} else if (index1.value !== index2.value) return false;
		if (index1.done ?? index2.done) return index1.done && index2.done;
	}
}
async function every$2(it, f) {
	for await (const v of it) {
		const result = await f(v);
		if (!result) return false;
	}
	return true;
}
async function* fill$2(it, v) {
	for await (const _ of it) yield v;
}
/**
* Filters an iterable, only yielding items which match `f`.
*
* ```js
* filter([1, 2, 3, 4], e => e % 2 == 0);
* returns [2, 4]
* ```
* @param it
* @param f
*/
async function* filter$2(it, f) {
	for await (const v of it) {
		if (!await f(v)) continue;
		yield v;
	}
}
async function find$2(it, f) {
	for await (const v of it) if (await f(v)) return v;
}
async function* flatten$2(it) {
	for await (const v of it) if (typeof v === `object`) {
		if (Array.isArray(v)) for (const vv of v) yield vv;
		else if (isAsyncIterable(v)) for await (const vv of v) yield vv;
		else if (isIterable(v)) for (const vv of v) yield vv;
	} else yield v;
}
/**
* Iterates over an async iterable or array, calling `fn` for each value, with optional
* interval between each loop. If the async `fn` returns _false_, iterator cancels.
*
* ```
* import { forEach } from "https://unpkg.com/ixfx/dist/flow.js"
* // Prints items from array every second
* await forEach([0,1,2,3], i => console.log(i), 1000);
* ```
*
* ```
* // Retry up to five times, with 5 seconds between each attempt
* await forEach(count(5), i=> {
*  try {
*    await doSomething();
*    return false; // Succeeded, exit early
*  } catch (ex) {
*    console.log(ex);
*    return true; // Keep trying
*  }
* }, 5000);
* ```
* @param iterator Iterable thing to loop over
* @param fn Function to invoke on each item. If it returns _false_ loop ends.
* @param options Options
* @typeParam V Type of iterable
*/
const forEach$2 = async function(iterator, fn, options = {}) {
	const interval = options.interval;
	if (Array.isArray(iterator)) for (const x of iterator) {
		const r = await fn(x);
		if (typeof r === `boolean` && !r) break;
		if (interval) await sleep(interval);
	}
	else for await (const x of iterator) {
		const r = await fn(x);
		if (typeof r === `boolean` && !r) break;
		if (interval) await sleep(interval);
	}
};
/**
* Returns last value from an iterable, or _undefined_
* if no values are generated
* @param it
*/
async function last$2(it, opts = {}) {
	const abort = opts.abort;
	let returnValue;
	for await (const value of it) {
		if (abort?.aborted) return void 0;
		returnValue = value;
	}
	return returnValue;
}
/**
* Maps an iterable through function `f`
* ```js
* // For every input value, multiply it by itself
* map([1, 2, 3], e => e*e)
* // Yields: 1, 4, 9
* ```
*
* It can also be used to transform types:
* ```js
* map([1, 2, 3], e => { value: e });
* // Yields: { value: 1 }, { value: 2 }, { value: 3 }
* ```
* @param it
* @param f
*/
async function* map$2(it, f) {
	for await (const v of it) yield f(v);
}
async function* max$2(it, gt = (a, b) => a > b) {
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
async function* min$2(it, gt = (a, b) => a > b) {
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
async function reduce$2(it, f, start) {
	for await (const v of it) start = f(start, v);
	return start;
}
/**
* Calls `callback` whenever the async generator produces a value.
*
* When using `asCallback`, call it with `await` to let generator
* run its course before continuing:
* ```js
* await asCallback(tick({ interval:1000, loops:5 }), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints after 5 seconds
* ```
*
* Or if you skip the `await`, code continues and callback will still run:
* ```js
* asCallback(tick({ interval: 1000, loops: 5}), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints immediately
* ```
* @param input
* @param callback
*/
async function asCallback$2(input, callback, onDone) {
	for await (const value of input) callback(value);
	if (onDone) onDone();
}
async function* slice$2(it, start = 0, end = Number.POSITIVE_INFINITY) {
	console.log(`Async slice start: ${start}`);
	const iit = it[Symbol.asyncIterator]();
	if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
	for (; start > 0; start--, end--) await iit.next();
	for await (const v of it) if (end-- > 0) yield v;
	else break;
}
/**
* Enumerates over an input iterable, with a delay between items.
* @param it
* @param delay
*/
async function* withDelay(it, delay) {
	for (const v of it) {
		await sleep(delay);
		yield v;
	}
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
async function some$2(it, f) {
	for await (const v of it) if (await f(v)) return true;
	return false;
}
/**
* Returns an array of values from an iterator.
*
* ```js
* const data = await toArray(adsrIterable(opts, 10));
* ```
*
* Note: If the iterator is infinite, be sure to provide limits via the options.
* ```js
* // Return maximum five items
* const data = await toArray(iterable, { limit: 5 });
* // Return results for a maximum of 5 seconds
* const data = await toArray(iterable, { elapsed: 5000 });
* ```
* Note that limits are ORed, `toArray` will finish if either of them is true.
*
* @param it Asynchronous iterable
* @param options Options when converting to array
* @returns
*/
async function toArray$2(it, options = {}) {
	const result = [];
	const iterator = it[Symbol.asyncIterator]();
	const started = Date.now();
	const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
	const whileFunction = options.while;
	const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
	while (result.length < maxItems && Date.now() - started < maxElapsed) {
		if (whileFunction) {
			if (!whileFunction(result.length)) break;
		}
		const r = await iterator.next();
		if (r.done) break;
		result.push(r.value);
	}
	return result;
}
async function* unique$2(iterable) {
	const buffer = [];
	const itera = Array.isArray(iterable) ? iterable : [iterable];
	for await (const it of itera) for await (const v of it) {
		if (buffer.includes(v)) continue;
		buffer.push(v);
		yield v;
	}
}
async function* uniqueByValue$2(input, toString = toStringDefault, seen = new Set()) {
	for await (const v of input) {
		const key = toString(v);
		if (seen.has(key)) continue;
		seen.add(key);
		yield v;
	}
}
/**
* Returns unique items from iterables, given a particular key function
* ```js
* unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
* Yields:  [{i:0,v:2},{i:1,v:3}]
* @param it
* @param f
*/
/**
* Combine same-positioned items from several iterables
* ```js
* zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
* Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
* ```
* @param its
* @returns
*/
async function* zip$2(...its) {
	const iits = its.map((it) => it[Symbol.asyncIterator]());
	while (true) {
		const vs = await Promise.all(iits.map((it) => it.next()));
		if (vs.some((v) => v.done)) return;
		yield vs.map((v) => v.value);
	}
}

//#endregion
//#region ../packages/iterables/dist/src/sync/slice.js
function* slice$1(it, start = 0, end = Number.POSITIVE_INFINITY) {
	if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
	if (start < 0) throw new Error(`Param 'start' should be at least 0`);
	let index = 0;
	for (const v of it) {
		if (index < start) {
			index++;
			continue;
		}
		if (index > end) break;
		yield v;
		index++;
	}
}

//#endregion
//#region ../packages/iterables/dist/src/sync/reduce.js
function reduce$1(it, f, start) {
	for (const v of it) start = f(start, v);
	return start;
}

//#endregion
//#region ../packages/iterables/dist/src/sync.js
var sync_exports = {};
__export(sync_exports, {
	asCallback: () => asCallback$1,
	chunks: () => chunks$1,
	chunksOverlapping: () => chunksOverlapping,
	concat: () => concat$1,
	dropWhile: () => dropWhile$1,
	equals: () => equals$1,
	every: () => every$1,
	fill: () => fill$1,
	filter: () => filter$1,
	find: () => find$1,
	first: () => first,
	flatten: () => flatten$1,
	forEach: () => forEach$1,
	fromArray: () => fromArray$1,
	fromIterable: () => fromIterable$1,
	last: () => last$1,
	map: () => map$1,
	max: () => max$1,
	min: () => min$1,
	next: () => next,
	reduce: () => reduce$1,
	repeat: () => repeat,
	slice: () => slice$1,
	some: () => some$1,
	toArray: () => toArray$1,
	unique: () => unique$1,
	uniqueByValue: () => uniqueByValue$1,
	until: () => until$1,
	yieldNumber: () => yieldNumber,
	zip: () => zip$1
});
function* uniqueByValue$1(input, toString = toStringDefault, seen = new Set()) {
	for (const v of input) {
		const key = toString(v);
		if (seen.has(key)) continue;
		seen.add(key);
		yield v;
	}
}
/**
* Calls `callback` whenever the generator produces a value.
*
* When using `asCallback`, call it with `await` to let generator
* run its course before continuing:
* ```js
* await asCallback(tick({ interval:1000, loops:5 }), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints after 5 seconds
* ```
*
* Or if you skip the `await`, code continues and callback will still run:
* ```js
* asCallback(tick({ interval: 1000, loops: 5}), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints immediately
* ```
* @param input
* @param callback
*/
function asCallback$1(input, callback, onDone) {
	for (const value of input) callback(value);
	if (onDone) onDone();
}
/**
* Returns a function that yields a value from a generator.
* ```js
* const spring = yieldNumber(Oscillators.spring());
*
* spring(); // latest value
* ```
*
* Instead of:
* ```js
* const spring = Oscillators.spring();
*
* spring.next().value
* ```
*
* A `defaultValue` can be provided if the source generator returns undefined:
* ```js
* const spring = yieldNumber(Oscillators.spring(), 0);
* spring(); // Returns 0 if the generator returns undefined
* ```
* @param generator
* @param defaultValue
* @returns
*/
function yieldNumber(generator, defaultValue) {
	return () => {
		const v = generator.next().value;
		if (v === void 0) return defaultValue;
		return v;
	};
}
/**
* Return first value from an iterable, or _undefined_ if
* no values are generated
* @param it
* @returns
*/
function first(it) {
	for (const value of it) return value;
}
/**
* Returns last value from an iterable, or _undefined_
* if no values are generated
* @param it
*/
function last$1(it) {
	let returnValue;
	for (const value of it) returnValue = value;
	return returnValue;
}
/**
* Yields chunks of the iterable `it` such that the end of a chunk is the
* start of the next chunk.
*
* Eg, with the input [1,2,3,4,5] and a size of 2, we would get back
* [1,2], [2,3], [3,4], [4,5].
*
*
* @param it
* @param size
* @returns
*/
function* chunksOverlapping(it, size) {
	if (size <= 1) throw new Error(`Size should be at least 2`);
	let buffer = [];
	for (const v of it) {
		buffer.push(v);
		if (buffer.length === size) {
			yield buffer;
			buffer = [buffer.at(-1)];
		}
	}
	if (buffer.length <= 1) return;
	if (buffer.length > 0) yield buffer;
}
function* chunks$1(it, size) {
	let buffer = [];
	for (const v of it) {
		buffer.push(v);
		if (buffer.length === size) {
			yield buffer;
			buffer = [];
		}
	}
	if (buffer.length > 0) yield buffer;
}
function* concat$1(...its) {
	for (const it of its) yield* it;
}
function* dropWhile$1(it, f) {
	for (const v of it) if (!f(v)) yield v;
}
/**
* Loops over a generator until it finishes, calling `callback`.
* Useful if you don't care about the value generator produces, just the number of loops.
*
* ```js
* until(count(5), () => {
* // do something 5 times
* });
* ```
*
* If you want the value from the generator, use a `for of` loop as usual.
* If `callback` explicitly returns _false_, the generator is aborted.
* @param it Generator to run
* @param callback Code to call for each iteration
*/
const until$1 = (it, callback) => {
	for (const _ of it) {
		const value = callback();
		if (typeof value === `boolean` && !value) break;
	}
};
const next = (it) => {
	return () => {
		const r = it.next();
		if (r.done) return;
		return r.value;
	};
};
/**
* Returns true if items in two iterables are equal, as
* determined by the `equality` function.
* @param it1
* @param it2
* @param equality
* @returns
*/
function equals$1(it1, it2, equality) {
	while (true) {
		const index1 = it1.next(), index2 = it2.next();
		if (equality !== void 0) {
			if (!equality(index1.value, index2.value)) return false;
		} else if (index1.value !== index2.value) return false;
		if (index1.done ?? index2.done) return index1.done && index2.done;
	}
}
function every$1(it, f) {
	for (const v of it) {
		const result = f(v);
		if (!result) return false;
	}
	return true;
}
function* fill$1(it, v) {
	for (const _ of it) yield v;
}
/**
* Iterates over `iterator` (iterable/array), calling `fn` for each value.
* If `fn` returns _false_, iterator cancels.
*
* Over the default JS `forEach` function, this one allows you to exit the
* iteration early.
*
* @example
* ```js
* import { Sync } from "https://unpkg.com/ixfx/dist/iterables.js"
* Sync.forEach(count(5), () => console.log(`Hi`));  // Prints `Hi` 5x
* Sync.forEach(count(5), i => console.log(i));      // Prints 0 1 2 3 4
* Sync.forEach([0,1,2,3,4], i => console.log(i));   // Prints 0 1 2 3 4
* ```
*
* Use {@link forEach} if you want to use an async `iterator` and async `fn`.
*
* Alternatives:
* * {@link Flow.repeat}/{@link Flow.repeatSync}: if you want to call something a given number of times and get the result
* @param iterator Iterable or array
* @typeParam T Type of iterable's values
* @param fn Function to call for each item. If function returns _false_, iteration cancels
*/
function forEach$1(iterator, fn) {
	for (const v of iterator) {
		const result = fn(v);
		if (typeof result === `boolean` && !result) break;
	}
}
/**
* ```js
* filter([1, 2, 3, 4], e => e % 2 == 0);
* returns [2, 4]
* ```
* @param it
* @param f
*/
function* filter$1(it, f) {
	for (const v of it) {
		if (!f(v)) continue;
		yield v;
	}
}
function find$1(it, f) {
	for (const v of it) if (f(v)) return v;
}
function* flatten$1(it) {
	for (const v of it) if (typeof v === `object`) {
		if (Array.isArray(v)) for (const vv of v) yield vv;
		else if (isIterable(v)) for (const vv of v) yield vv;
	} else yield v;
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
function* map$1(it, f) {
	for (const v of it) yield f(v);
}
function* max$1(it, gt = (a, b) => a > b) {
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
function* min$1(it, gt = (a, b) => a > b) {
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
function some$1(it, f) {
	for (const v of it) if (f(v)) return true;
	return false;
}
function* repeat(genCreator, repeatsOrSignal) {
	const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
	const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
	let count = repeats;
	while (true) {
		for (const v of genCreator()) {
			yield v;
			if (signal?.aborted) break;
		}
		if (Number.isFinite(repeats)) {
			count--;
			if (count === 0) break;
		}
		if (signal?.aborted) break;
	}
}
function* unique$1(iterable) {
	const buffer = [];
	let itera = [];
	itera = Array.isArray(iterable) ? iterable : [iterable];
	for (const it of itera) for (const v of it) {
		if (buffer.includes(v)) continue;
		buffer.push(v);
		yield v;
	}
}
/**
* Combine same-positioned items from several iterables
* ```js
* zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
* Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
* ```
* @param its
* @returns
*/
function* zip$1(...its) {
	const iits = its.map((it) => it[Symbol.iterator]());
	while (true) {
		const vs = iits.map((it) => it.next());
		if (vs.some((v) => v.done)) return;
		yield vs.map((v) => v.value);
	}
}
function* fromIterable$1(iterable) {
	for (const v of iterable) yield v;
}
/**
* Returns an array of values from an iterator.
*
* ```js
* const data = await toArray(adsrIterable(opts, 10));
* ```
*
* Note: If the iterator is infinite, be sure to provide a limit via the options or the function
* will never return.
*
* @param it Asynchronous iterable
* @param options Options when converting to array.
* @returns
*/
function toArray$1(it, options = {}) {
	const result = [];
	const started = Date.now();
	const whileFunction = options.while;
	const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
	const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
	for (const v of it) {
		if (whileFunction) {
			if (!whileFunction(result.length)) break;
		}
		if (result.length >= maxItems) break;
		if (Date.now() - started > maxElapsed) break;
		result.push(v);
	}
	return result;
}
/**
* Yield values from `array`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
* @param array Array of values
*/
function* fromArray$1(array) {
	for (const v of array) yield v;
}

//#endregion
//#region ../packages/iterables/dist/src/compare-values.js
/**
* Returns the 'max' of some iterable using the provided scoring function.
* It only yields a value when iterator finishes.
* @param iterable
* @param scorer
* @returns
*/
const maxScore = (iterable, scorer) => {
	let highestValue;
	let highestScore = Number.MIN_SAFE_INTEGER;
	for (const value of iterable) {
		const score = scorer(value);
		if (score >= highestScore) {
			highestScore = score;
			highestValue = value;
		}
	}
	return highestValue;
};
/**
* Returns the 'min' of some iterable using the provided scoring function.
* It only yields a value when iterator finishes.
* @param iterable
* @param scorer
* @returns
*/
const minScore = (iterable, scorer) => {
	let lowestValue;
	let lowestScore = Number.MAX_SAFE_INTEGER;
	for (const value of iterable) {
		const score = scorer(value);
		if (score <= lowestScore) {
			lowestScore = score;
			lowestValue = value;
		}
	}
	return lowestValue;
};
/**
* Returns _true_ if all values in iterables are equal, regardless
* of their position. Uses === equality semantics by default.
*
* Is NOT recursive.
*
* @example Default equality checking
* ```js
* const a = ['apples','oranges','pears'];
* const b = ['pears','oranges','apples'];
* hasEqualValues(a, b); // True
* ```
*
* @example Custom equality checking
* ```js
* const a = [ { name: 'John' }];
* const b = [ { name: 'John' }];
* // False, since object identies are different
* hasEqualValues(a, b);
* // True, since now we're comparing by value
* hasEqualValues(a, b, (aa,bb) => aa.name === bb.name);
* ```
* @param arrays
* @param eq
*/
const hasEqualValuesShallow = (iterableA, iterableB, eq) => {
	const returnValue = compareIterableValuesShallow(iterableA, iterableB, eq);
	return returnValue.a.length === 0 && returnValue.b.length === 0;
};

//#endregion
//#region ../packages/iterables/dist/src/from-event.js
const fromEvent = (eventSource, eventType) => {
	const pullQueue = [];
	const pushQueue = [];
	let done = false;
	const pushValue = (args) => {
		if (pullQueue.length > 0) {
			const resolver = pullQueue.shift();
			resolver(...args);
		} else pushQueue.push(args);
	};
	const pullValue = () => new Promise((resolve) => {
		if (pushQueue.length > 0) {
			const arguments_ = pushQueue.shift();
			resolve(...arguments_);
		} else pullQueue.push(resolve);
	});
	const handler = (...arguments_) => {
		pushValue(arguments_);
	};
	eventSource.addEventListener(eventType, handler);
	const r = {
		next: async () => {
			if (done) return {
				done: true,
				value: void 0
			};
			return {
				done: false,
				value: await pullValue()
			};
		},
		return: async () => {
			done = true;
			eventSource.removeEventListener(eventType, handler);
			return {
				done: true,
				value: void 0
			};
		},
		throw: async (error) => {
			done = true;
			return {
				done: true,
				value: Promise.reject(new Error(error))
			};
		}
	};
	return r;
};

//#endregion
//#region ../packages/iterables/dist/src/numbers-compute.js
/**
* Returns the min, max, avg and total of the array or iterable.
* Any values that are invalid are silently skipped over.
*
* ```js
* const v = [ 10, 2, 4.2, 99 ];
* const mma = numbersCompute(v);
* // Yields: { min: 2, max: 99, total: 115.2, avg: 28.8 }
* ```
*
* Use {@link Numbers.average}, {@link Numbers.max}, {@link Numbers.min} or {@link Numbers.total} if you only need one of these.
*
* A start and end range can be provided if the calculation should be restricted to a part
* of the input array. By default the whole array is used.
*
* It's also possible to use an iterable as input.
* ```js
* numbersCompute(count(5,1)); // Averages 1,2,3,4,5
* ```
*
* Returns `NaN` if the input data is empty.
* @param data
* @param options Allows restriction of range that is examined
* @returns `{min, max, avg, total}`
*/
const numbersCompute = (data, options = {}) => {
	if (typeof data === `undefined`) throw new Error(`Param 'data' is undefined`);
	if (Array.isArray(data)) return numberArrayCompute(data, options);
	if (isIterable(data)) return numbersComputeIterable(data, options);
	throw new Error(`Param 'data' is neither an array nor iterable`);
};
function numbersComputeIterable(data, options = {}) {
	let total = 0;
	const nonNumbers = options.nonNumbers ?? `ignore`;
	let min$3 = Number.MAX_SAFE_INTEGER;
	let max$3 = Number.MIN_SAFE_INTEGER;
	let count = 0;
	for (let v of data) {
		if (typeof v !== `number` || Number.isNaN(v)) {
			if (nonNumbers === `throw`) throw new TypeError(`Data contains something not a number. Got type '${typeof v}'`);
			if (nonNumbers === `nan`) v = Number.NaN;
			if (nonNumbers === `ignore`) continue;
		}
		total += v;
		count++;
		min$3 = Math.min(min$3, v);
		max$3 = Math.max(max$3, v);
	}
	return {
		avg: total / count,
		total,
		max: max$3,
		min: min$3,
		count
	};
}
function computeAverage(data, options = {}) {
	let count = 0;
	let total = 0;
	const nonNumbers = options.nonNumbers ?? `ignore`;
	for (let d of data) {
		if (typeof d !== `number` || Number.isNaN(d)) {
			if (nonNumbers === `throw`) throw new TypeError(`Data contains something not a number. Got type '${typeof d}'`);
			if (nonNumbers === `nan`) d = Number.NaN;
			if (nonNumbers === `ignore`) continue;
		}
		total += d;
		count++;
	}
	return total / count;
}

//#endregion
//#region ../packages/iterables/dist/src/index.js
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
	return isAsyncIterable(it) ? min$2(it, gt) : min$1(it, gt);
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
	return isAsyncIterable(it) ? max$2(it, gt) : max$1(it, gt);
}
/**
* Drops elements that do not meet the predicate `f`.
* Streaming result: works with endless iterables.
*
* ```js
* dropWhile([1, 2, 3, 4], e => e < 3);
* returns [3, 4]
* ```
* @param it
* @param f
*/
function dropWhile(it, f) {
	return isAsyncIterable(it) ? dropWhile$2(it, f) : dropWhile$1(it, f);
}
/**
* Loops over a generator until it finishes, calling `callback`.
* Useful if you don't care about the value generator produces, just the number of loops.
*
* ```js
* until(count(5), () => {
* // do something 5 times
* });
* ```
*
* If you want the value from the generator, use a `for of` loop as usual.
* If `callback` explicitly returns _false_, the generator is aborted.
*
* This does not work for infinite generators, `callback` will never be called.
* @param it Generator to run
* @param callback Code to call for each iteration
*/
function until(it, callback) {
	if (isAsyncIterable(it)) return until$2(it, callback);
	else until$1(it, callback);
}
/**
* Breaks an iterable into array chunks
*
* Streaming: works with infinite iterables.
*
* ```js
* chunks([1,2,3,4,5,6,7,8,9,10], 3);
* // Yields [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
* ```
* @param it
* @param size
*/
function chunks(it, size) {
	return isAsyncIterable(it) ? chunks$2(it, size) : chunks$1(it, size);
}
/**
* Filters an iterable, only yielding items which match `f`.
*
* ```js
* filter([1, 2, 3, 4], e => e % 2 == 0);
* returns [2, 4]
* ```
*
* When using async iterables, `f` can be async as well.
* @param it
* @param f
*/
function filter(it, f) {
	return isAsyncIterable(it) ? filter$2(it, f) : filter$1(it, f);
}
/**
* Yields `v` for each item within `it`.
*
* ```js
* fill([1, 2, 3], 0);
* // Yields: [0, 0, 0]
* ```
*
* This is like a `map` where we return a fixed value, ignoring the input.
* @param it
* @param v
*/
function fill(it, v) {
	return isAsyncIterable(it) ? fill$2(it, v) : fill$1(it, v);
}
/**
* Return concatenation of iterators.
*
* Non-streaming: If one of the input iterables is endless, the other ones won't
* be processed.
* @param its
*/
function concat(...its) {
	return isAsyncIterable(its[0]) ? concat$2(...its) : concat$1(...its);
}
/**
* Returns first item from iterable `it` that matches predicate `f`
* ```js
* find([1, 2, 3, 4], e => e > 2);
* // Yields: 3
* ```
*
* When using async iterables, `f` can be async as well.
* @param it
* @param f
* @returns
*/
function find(it, f) {
	return isAsyncIterable(it) ? find$2(it, f) : find$1(it, f);
}
/**
* Execute function `f` for each item in iterable.
* If `f` returns _false_, iteration stops.
* ```js
* forEach(iterable, v => {
*  // do something with value
* });
* ```
*
* When using an async iterable, `fn` can also be async.
* @param it Iterable or array
* @param fn Function to execute
*/
function forEach(it, fn, options = {}) {
	if (isAsyncIterable(it)) return forEach$2(it, fn, options);
	else forEach$1(it, fn);
}
/**
* Maps an iterable through function `f`
* ```js
* // For every input value, multiply it by itself
* map([1, 2, 3], e => e*e)
* // Yields: 1, 4, 9
* ```
*
* It can also be used to transform types:
* ```js
* map([1, 2, 3], e => { value: e });
* // Yields: { value: 1 }, { value: 2 }, { value: 3 }
* ```
* @param it
* @param f
*/
function map(it, f) {
	return isAsyncIterable(it) ? map$2(it, f) : map$1(it, f);
}
/**
* Yield values from `array`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
*
* @param array Array of values
* @param interval Interval (defaults: 1ms)
*/
function fromArray(array, interval) {
	return interval === void 0 ? fromArray$1(array) : fromArray$2(array, interval);
}
/**
* Returns a 'flattened' copy of array, un-nesting arrays one level.
* Streaming: works with unlimited iterables.
* ```js
* flatten([1, [2, 3], [[4]]]);
* // Yields: [1, 2, 3, [4]];
* ```
* @param it
*/
function flatten(it) {
	return isAsyncIterable(it) ? flatten$2(it) : flatten$1(it);
}
/**
* Returns true the first time `f` returns true. Useful for spotting any occurrence of
* data, and exiting quickly
* ```js
* some([1, 2, 3, 4], e => e % 3 === 0);
* // Yields: true
* ```
* @param it Iterable
* @param f Filter function
* @returns
*/
function some(it, f) {
	return isAsyncIterable(it) ? some$2(it, f) : some$1(it, f);
}
/**
* Returns the last item of an iterable, or _undefined_ if it yields no results.
* @param it
* @returns
*/
function last(it) {
	return isAsyncIterable(it) ? last$2(it) : last$1(it);
}
/**
* Reduce for iterables
* ```js
* reduce([1, 2, 3], (acc, cur) => acc + cur, 0);
* // Yields: 6
* ```
* @param it Iterable
* @param f Function
* @param start Start value
* @returns
*/
function reduce(it, f, start) {
	return isAsyncIterable(it) ? reduce$2(it, f, start) : reduce$1(it, f, start);
}
/**
* Returns a section from an iterable.
*
* 'end' is the end index, not the number of items.
*
* ```js
* // Return five items from step 10
* slice(it, 10, 15);
* ```
* @param it Iterable
* @param start Start step
* @param end Exclusive end step (or until completion)
*/
function slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
	return isAsyncIterable(it) ? slice$2(it, start, end) : slice$1(it, start, end);
}
/**
* Returns unique items from an iterable or
* array of iterables.
*
* ```js
* const data = [ 'apples', 'oranges' ]
* const data2 = [ 'oranges', 'pears' ]
* const unique = [...unique([data,data2]];
* // Yields: [ 'apples', 'oranges', 'pears' ]
* ```
*
* Uses object reference to compare values.
* Use {@link uniqueByValue} if this doesn't suffice.
* @param iterable Iterable, or array of iterables
*/
function unique(iterable) {
	if (Array.isArray(iterable)) {
		if (iterable.length === 0) return fromArray$1([]);
		return isAsyncIterable(iterable[0]) ? unique$2(iterable) : unique$1(iterable);
	} else if (isAsyncIterable(iterable)) return unique$2(iterable);
	else return unique$1(iterable);
}
/**
* Filters the `input` iterable, only yielding unique values. Use {@link unique} to compare
* by object reference instead.
*
* Streaming: Works with unbounded iterables.
*
* ```js
* const d = ['a', 'b', 'c', 'b', 'd' ];
* for (const v of uniqueByValue(d)) {
*  // Yields: 'a', 'b', 'c', 'd'
* // (extra 'b' is skipped)
* }
* ```
*
* By default, JSON.stringify is used to create a string representing value. These are added
* to a Set of strings, which is how we keep track of uniqueness. If the value is already a string it is used as-is.
*
* This allows you to have custom logic for what determines uniqueness. Eg, using a single field
* of an object as an identifier:
*
* ```js
* const people = [
*  { name: `Mary`, size: 20 }, { name: `Abdul`, size: 19 }, { name: `Mary`, size: 5 }
* ]
* for (const v of uniqueByValue(d, v=>v.name)) {
*  // Yields: { name: `Mary`, size: 20 }, { name: `Abdul`, size: 19 }
*  // Second 'Mary' is skipped because name is the same, even though size field is different.
* }
* ```
*
* If you want to keep track of the set of keys, or prime it with some existing data, provide a Set instance:
* ```js
* const unique = new Set();
* unique.add(`b`);
* const d = [`a`, `b`, `c`];
* for (const v of uniqueByValue(d, toStringDefault, unique)) {
*  // Yields: `a`, `c`
*  // `b` is skipped because it was already in set
* }
* // After completion, `unique` contains `a`, `b` and `c`.
* ```
*
* Creating your own Set is useful for tracking unique values across several calls to `uniqueByValue`.
* @param input
* @param seen
* @param toString
*/
function* uniqueByValue(input, toString = toStringDefault, seen = new Set()) {
	return isAsyncIterable(input) ? uniqueByValue$2(input, toString, seen) : uniqueByValue$1(input, toString, seen);
}
/**
* Returns an array of values from an iterator.
*
* ```js
* const data = await toArray(adsrIterable(opts, 10));
* ```
*
* Note: If the iterator is infinite, be sure to provide a `count` or the function
* will never return.
*
* @param it Asynchronous iterable
* @param count Number of items to return, by default all.
* @returns
*/
function toArray(it, options = {}) {
	return isAsyncIterable(it) ? toArray$2(it, options) : toArray$1(it, options);
}
/**
* Returns _true_ if `f` returns _true_ for
* every item in iterable.
*
* Streaming: If an infinite iterable is used, function will never return value.
* @param it
* @param f
* @returns
*/
function every(it, f) {
	return isAsyncIterable(it) ? every$2(it, f) : every$1(it, f);
}
/**
* Returns _true_ if items in two iterables are equal, as
* determined by the `equality` function.
* Order matters. It compares items at the same 'step' of each iterable.
* @param it1
* @param it2
* @param equality
* @returns
*/
function equals(it1, it2, equality) {
	const as = isAsyncIterable(it1) && isAsyncIterable(it2);
	return as ? equals$2(it1, it2, equality) : equals$1(it1, it2, equality);
}
/**
* Combine same-positioned items from several iterables
* ```js
* zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
* Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
* ```
* @param its
* @returns
*/
function zip(...its) {
	if (its.length === 0) return fromArray$1([]);
	return isAsyncIterable(its[0]) ? zip$2(...its) : zip$1(...its);
}
/**
* Yield values from `iterable`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
* @param iterable Iterable or AsyncIterable
* @param [interval=1] Interval to wait between yield
*/
function fromIterable(iterable, interval) {
	if (isAsyncIterable(iterable) || interval !== void 0) return fromIterable$2(iterable, interval);
	return fromIterable$1(iterable);
}
/**
* Access `callback` as an iterable:
* ```js
* const fn = () => Math.random();
* for (const v of fromFunction(fn)) {
*  // Generate infinite random numbers
* }
* ```
*
* Use {@link fromFunctionAwaited} to await `callback`.
* @param callback Function that generates a value
*/
function* fromFunction(callback) {
	while (true) {
		const v = callback();
		yield v;
	}
}
/**
* Access awaited `callback` as an iterable:
* ```js
* const fn = () => Math.random();
* for await (const v of fromFunctionAwaited(fn)) {
*  // Generate infinite random numbers
* }
* ```
*
* `callback` can be async, result is awaited.
* This requires the use of `for await`.
* Use {@link fromFunction} otherwise;
* @param callback
*/
async function* fromFunctionAwaited(callback) {
	while (true) {
		const v = await callback();
		yield v;
	}
}
/**
* Calls `callback` whenever the generator produces a value.
*
* When using `asCallback`, call it with `await` to let generator
* run its course before continuing:
* ```js
* await asCallback(tick({ interval:1000, loops:5 }), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints after 5 seconds
* ```
*
* Or if you skip the `await`, code continues and callback will still run:
* ```js
* asCallback(tick({ interval: 1000, loops: 5}), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints immediately
* ```
* @param input
* @param callback
*/
function asCallback(input, callback, onDone) {
	if (isAsyncIterable(input)) return asCallback$2(input, callback);
	else {
		asCallback$1(input, callback);
		return;
	}
}

//#endregion
//#region src/iterables.ts
var iterables_exports = {};
__export(iterables_exports, {
	Async: () => async_exports,
	Sync: () => sync_exports,
	asCallback: () => asCallback,
	chunks: () => chunks,
	computeAverage: () => computeAverage,
	concat: () => concat,
	dropWhile: () => dropWhile,
	equals: () => equals,
	every: () => every,
	fill: () => fill,
	filter: () => filter,
	find: () => find,
	flatten: () => flatten,
	forEach: () => forEach,
	fromArray: () => fromArray,
	fromEvent: () => fromEvent,
	fromFunction: () => fromFunction,
	fromFunctionAwaited: () => fromFunctionAwaited,
	fromIterable: () => fromIterable,
	hasEqualValuesShallow: () => hasEqualValuesShallow,
	isAsyncIterable: () => isAsyncIterable,
	isIterable: () => isIterable,
	last: () => last,
	map: () => map,
	max: () => max,
	maxScore: () => maxScore,
	min: () => min,
	minScore: () => minScore,
	numbersCompute: () => numbersCompute,
	reduce: () => reduce,
	slice: () => slice,
	some: () => some,
	toArray: () => toArray,
	unique: () => unique,
	uniqueByValue: () => uniqueByValue,
	until: () => until,
	zip: () => zip
});

//#endregion
export { asCallback, async_exports, chunks as chunks$1, computeAverage, concat, dropWhile, equals, every, fill, filter, find, flatten as flatten$1, forEach, fromArray, fromEvent, fromFunction, fromFunctionAwaited, fromIterable, hasEqualValuesShallow, isAsyncIterable, isIterable, iterables_exports, last, map, max, maxScore, min, minScore, numbersCompute, reduce, slice, some, sync_exports, toArray, unique as unique$1, uniqueByValue, until as until$1, zip as zip$1 };
//# sourceMappingURL=iterables-NUtDvHFV.js.map