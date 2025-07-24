import { __export } from "./chunk-51aI8Tpl.js";
import { integerTest, resultThrow } from "./src-BhN8B7uk.js";
import { numberArrayCompute } from "./src-Cyp-w-xE.js";
import { compareIterableValuesShallow, intervalToMs, sleep, toStringDefault } from "./src-Cjy4Jx5o.js";

//#region packages/core/dist/src/text.js
/**
* Returns chunks of `source`, broken up by `delimiter` (default '.').
*
* Whittles down from whole string to last token.
*
* If `delimiter` is not found, no results are yielded.
*
* ```js
* stringSegmentsWholeToEnd(`a.b.c.d`);
* // Yields:
* // `a.b.c.d`
* // `b.c.d`
* // `c.d`
* // `d`
* ```
* @param source
* @param delimiter
*/
function* stringSegmentsWholeToEnd(source, delimiter = `.`) {
	while (source.length > 0) {
		yield source;
		const trimmed = afterMatch(source, delimiter);
		if (trimmed === source) break;
		source = trimmed;
	}
}
/**
* Returns chunks of `source`, broken up by `delimiter` (default '.').
*
* We start with whole string and whittle down to starting token.
*
* If `delimiter` is not found, no results are yielded.
*
* ```js
* stringSegmentsWholeToFirst(`a.b.c.d`);
* // Yields:
* // `a.b.c.d`
* // `a.b.c`,
* // `a.b`,
* // `a`,
* ```
* @param source
* @param delimiter
*/
function* stringSegmentsWholeToFirst(source, delimiter = `.`) {
	while (source.length > 0) {
		yield source;
		const b = beforeMatch(source, delimiter, {
			ifNoMatch: `original`,
			fromEnd: true
		});
		if (b === source) break;
		source = b;
	}
}
/**
* Given a long string, abbreviates it with ...
* ```js
* abbreviate(`This is something`, 7); // `This is...`
* ```
*
* If `source` is under `maxLength` the original is returned.
* @param source
* @param maxLength Maximum length. Defaults to 20
* @returns
*/
const abbreviate = (source, maxLength = 15) => {
	resultThrow(integerTest(maxLength, `aboveZero`, `maxLength`));
	if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
	if (source.length > maxLength && source.length > 3) {
		if (maxLength > 15) {
			const chunk = Math.round((maxLength - 2) / 2);
			return source.slice(0, chunk) + `...` + source.slice(-chunk);
		}
		return source.slice(0, maxLength) + `...`;
	}
	return source;
};
/**
* Uses JSON.toString() on `source`, but abbreviates result.
* @param source Object to stringify
* @param maxLength Default 20
* @returns
*/
const toStringAbbreviate = (source, maxLength = 20) => {
	if (source === void 0) return `(undefined)`;
	if (source === null) return `(null)`;
	return abbreviate(JSON.stringify(source), maxLength);
};
/**
* Returns first position of the given character code, or -1 if not found.
* @param source Source string
* @param code Code to seek
* @param start Start index, 0 by default
* @param end End index (inclusive), source.length-1 by default
* @returns Found position, or -1 if not found
*/
const indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
	for (let index = start; index <= end; index++) if (source.codePointAt(index) === code) return index;
	return -1;
};
/**
* Returns `source` with a given number of characters removed from start position.
*
* ```js
* // Remove three characters starting at position 1
* omitChars(`hello there`, 1, 3); // ie. removes 'ell'
* // Yields: `ho there`
* ```
* @param source
* @param removeStart Start point to remove
* @param removeLength Number of characters to remove
* @returns
*/
const omitChars = (source, removeStart, removeLength) => source.slice(0, removeStart) + source.slice(removeStart + removeLength);
/**
* Splits a string into `length`-size chunks.
*
* If `length` is greater than the length of `source`, a single element array is returned with source.
* The final array element may be smaller if we ran out of characters.
*
* ```js
* splitByLength(`hello there`, 2);
* // Yields:
* // [`he`, `ll`, `o `, `th`, `er`, `e`]
* ```
* @param source Source string
* @param length Length of each chunk
* @returns
*/
const splitByLength = (source, length) => {
	resultThrow(integerTest(length, `aboveZero`, `length`));
	if (source === null) throw new Error(`source parameter null`);
	if (typeof source !== `string`) throw new TypeError(`source parameter not a string`);
	const chunks$3 = Math.ceil(source.length / length);
	const returnValue = [];
	let start = 0;
	for (let c = 0; c < chunks$3; c++) {
		returnValue.push(source.slice(start, start + length));
		start += length;
	}
	return returnValue;
};
/**
* Returns all the text in `source` that precedes (and does not include) `match`. If not found, `source` is returned.
*
* See also: {@link beforeMatch}, {@link beforeAfterMatch}.
*
* ```js
* afterMatch(`Hello. There`, `.`); // ' There'
* afterMatch(`Hello, there', `,`); // 'Hello, there'
* ```
*
* If `source` is _undefined_, an error is thrown.
* @param source
* @param match
* @param options
* @returns
*/
const beforeMatch = (source, match, options = {}) => {
	const ba = beforeAfterMatch(source, match, options);
	return ba[0];
};
/**
* Returns all the text in `source` that follows `match`. If not found, `source` is returned.
*
* See also: {@link beforeMatch}, {@link beforeAfterMatch}.
*
* ```js
* afterMatch(`Hello. There`, `.`); // ' There'
* afterMatch(`Hello, there', `,`); // 'Hello, there'
* ```
*
* If `source` is _undefined_, an error is thrown.
* @param source
* @param match
* @param options
* @returns
*/
const afterMatch = (source, match, options = {}) => {
	const ba = beforeAfterMatch(source, match, options);
	return ba[1];
};
/**
* Returns the text that is before and after `match`.
*
* See also: {@link beforeMatch}, {@link afterMatch}.
*
* If `match` is at the end of start of `source`, after or before might be an empty string.
* @param source
* @param match
* @param options
* @returns
*/
const beforeAfterMatch = (source, match, options = {}) => {
	if (source === void 0) throw new Error(`Param 'source' is undefined`);
	let fallback = options.fallback;
	const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
	if (ifNoMatch === `original`) fallback = source;
	if (ifNoMatch === `fallback` && fallback === void 0) throw new Error(`Fallback must be provided`);
	const startPos = options.startPos ?? void 0;
	const fromEnd = options.fromEnd ?? false;
	const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
	if (m < 0 && ifNoMatch === `throw`) throw new Error(`Match '${match}' not found in source.`);
	if (m < 0 && ifNoMatch === `original`) return [source, source];
	if (m < 0 && ifNoMatch === `fallback`) return [fallback, fallback];
	return [source.slice(0, m), source.slice(Math.max(0, m + match.length))];
};
/**
* Simple wilcard matching. Use '*' in `pattern` to denote any number of characters.
* ```js
* // Must start with 'cat'
* wildcard(`cat*`,`caterpillar`); // true
* // Must end with 'cat'
* wildcat(`*cat`, `bobcat`);  // true
* // 'cat' anywhere in string
* wildcard(`*cat*`, `see cat run`); // true
* ```
* @param pattern
* @returns
*/
const wildcard = (pattern) => {
	const escapeRegex = (value) => value.replaceAll(/([!$()*+./:=?[\\\]^{|}])/g, `\\$1`);
	pattern = pattern.split(`*`).map((m) => escapeRegex(m)).join(`.*`);
	pattern = `^` + pattern + `$`;
	const regex = new RegExp(pattern);
	return (value) => {
		return regex.test(value);
	};
};

//#endregion
//#region packages/iterables/dist/src/guard.js
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
//#region packages/iterables/dist/src/sync/slice.js
function* slice$2(it, start = 0, end = Number.POSITIVE_INFINITY) {
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
//#region packages/iterables/dist/src/sync/reduce.js
function reduce$2(it, f, start) {
	for (const v of it) start = f(start, v);
	return start;
}

//#endregion
//#region packages/iterables/dist/src/sync.js
var sync_exports = {};
__export(sync_exports, {
	asCallback: () => asCallback$2,
	chunks: () => chunks$2,
	chunksOverlapping: () => chunksOverlapping,
	concat: () => concat$2,
	dropWhile: () => dropWhile$2,
	equals: () => equals$2,
	every: () => every$2,
	fill: () => fill$2,
	filter: () => filter$2,
	find: () => find$2,
	first: () => first,
	flatten: () => flatten$2,
	forEach: () => forEach$2,
	fromArray: () => fromArray$2,
	fromIterable: () => fromIterable$2,
	last: () => last$2,
	map: () => map$2,
	max: () => max$2,
	min: () => min$2,
	next: () => next,
	reduce: () => reduce$2,
	repeat: () => repeat$1,
	slice: () => slice$2,
	some: () => some$3,
	toArray: () => toArray$3,
	unique: () => unique$2,
	uniqueByValue: () => uniqueByValue$2,
	until: () => until$2,
	yieldNumber: () => yieldNumber,
	zip: () => zip$2
});
function* uniqueByValue$2(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
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
function asCallback$2(input, callback, onDone) {
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
function last$2(it) {
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
function* chunks$2(it, size) {
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
function* concat$2(...its) {
	for (const it of its) yield* it;
}
function* dropWhile$2(it, f) {
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
const until$2 = (it, callback) => {
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
function equals$2(it1, it2, equality) {
	while (true) {
		const index1 = it1.next(), index2 = it2.next();
		if (equality !== void 0) {
			if (!equality(index1.value, index2.value)) return false;
		} else if (index1.value !== index2.value) return false;
		if (index1.done ?? index2.done) return index1.done && index2.done;
	}
}
function every$2(it, f) {
	for (const v of it) {
		const result = f(v);
		if (!result) return false;
	}
	return true;
}
function* fill$2(it, v) {
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
* * {@link @ixfx/flow.repeat}/{@link @ixfx/flow.repeatSync}: if you want to call something a given number of times and get the result
* @param iterator Iterable or array
* @typeParam T Type of iterable's values
* @param fn Function to call for each item. If function returns _false_, iteration cancels
*/
function forEach$2(iterator, fn) {
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
function* filter$2(it, f) {
	for (const v of it) {
		if (!f(v)) continue;
		yield v;
	}
}
function find$2(it, f) {
	for (const v of it) if (f(v)) return v;
}
function* flatten$2(it) {
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
function* map$2(it, f) {
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
function some$3(it, f) {
	for (const v of it) if (f(v)) return true;
	return false;
}
function* repeat$1(genCreator, repeatsOrSignal) {
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
function* unique$2(iterable) {
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
function* zip$2(...its) {
	const iits = its.map((it) => it[Symbol.iterator]());
	while (true) {
		const vs = iits.map((it) => it.next());
		if (vs.some((v) => v.done)) return;
		yield vs.map((v) => v.value);
	}
}
function* fromIterable$2(iterable) {
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
function toArray$3(it, options = {}) {
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
function* fromArray$2(array) {
	for (const v of array) yield v;
}

//#endregion
//#region packages/events/dist/src/map-of.js
var MapOfSimple = class {
	#store = /* @__PURE__ */ new Map();
	/**
	* Gets a copy of the underlying array storing values at `key`, or an empty array if
	* key does not exist
	* @param key
	* @returns
	*/
	get(key) {
		const arr = this.#store.get(key);
		if (!arr) return [];
		return [...arr];
	}
	/**
	* Returns the number of values stored under `key`
	* @param key
	* @returns
	*/
	size(key) {
		const arr = this.#store.get(key);
		if (!arr) return 0;
		return arr.length;
	}
	/**
	* Iterate over all values contained under `key`
	* @param key
	* @returns
	*/
	*iterateKey(key) {
		const arr = this.#store.get(key);
		if (!arr) return;
		yield* arr.values();
	}
	/**
	* Iterate all values, regardless of key
	*/
	*iterateValues() {
		for (const key of this.#store.keys()) yield* this.iterateKey(key);
	}
	/**
	* Iterate all keys
	*/
	*iterateKeys() {
		yield* this.#store.keys();
	}
	addKeyedValues(key, ...values) {
		let arr = this.#store.get(key);
		if (!arr) {
			arr = [];
			this.#store.set(key, arr);
		}
		arr.push(...values);
	}
	deleteKeyValue(key, value) {
		const arr = this.#store.get(key);
		if (!arr) return false;
		const arrCopy = arr.filter((v) => v !== value);
		if (arrCopy.length === arr.length) return false;
		this.#store.set(key, arrCopy);
		return true;
	}
	clear() {
		this.#store.clear();
	}
};

//#endregion
//#region packages/events/dist/src/simple-event-emitter.js
var SimpleEventEmitter = class {
	#listeners = new MapOfSimple();
	#disposed = false;
	dispose() {
		if (this.#disposed) return;
		this.clearEventListeners();
	}
	get isDisposed() {
		return this.#disposed;
	}
	/**
	* Fire event
	* @param type Type of event
	* @param args Arguments for event
	* @returns
	*/
	fireEvent(type, args) {
		if (this.#disposed) throw new Error(`Disposed`);
		for (const l of this.#listeners.iterateKey(type)) l(args, this);
	}
	/**
	* Adds event listener.
	*
	* @throws Error if emitter is disposed
	* @typeParam K - Events
	* @param name Event name
	* @param listener Event handler
	*/
	addEventListener(name, listener) {
		if (this.#disposed) throw new Error(`Disposed`);
		this.#listeners.addKeyedValues(name, listener);
	}
	/**
	* Remove event listener
	*
	* @param listener
	*/
	removeEventListener(type, listener) {
		if (this.#disposed) return;
		this.#listeners.deleteKeyValue(type, listener);
	}
	/**
	* Clear all event listeners
	* @private
	*/
	clearEventListeners() {
		if (this.#disposed) return;
		this.#listeners.clear();
	}
};

//#endregion
//#region packages/events/dist/src/index.js
var src_exports$1 = {};
__export(src_exports$1, { SimpleEventEmitter: () => SimpleEventEmitter });

//#endregion
//#region packages/iterables/dist/src/async.js
var async_exports = {};
__export(async_exports, {
	asCallback: () => asCallback$1,
	chunks: () => chunks$1,
	concat: () => concat$1,
	dropWhile: () => dropWhile$1,
	equals: () => equals$1,
	every: () => every$1,
	fill: () => fill$1,
	filter: () => filter$1,
	find: () => find$1,
	flatten: () => flatten$1,
	forEach: () => forEach$1,
	fromArray: () => fromArray$1,
	fromIterable: () => fromIterable$1,
	last: () => last$1,
	map: () => map$1,
	max: () => max$1,
	min: () => min$1,
	nextWithTimeout: () => nextWithTimeout,
	reduce: () => reduce$1,
	repeat: () => repeat,
	slice: () => slice$1,
	some: () => some$2,
	toArray: () => toArray$2,
	unique: () => unique$1,
	uniqueByValue: () => uniqueByValue$1,
	until: () => until$1,
	withDelay: () => withDelay,
	zip: () => zip$1
});
/**
* Yield values from `array`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
*
* @param array Array of values
* @param interval Interval (defaults: 1ms)
*/
async function* fromArray$1(array, interval = 1) {
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
async function* fromIterable$1(iterable, interval = 1) {
	for await (const v of iterable) {
		yield v;
		await sleep(interval);
	}
}
async function* chunks$1(it, size) {
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
async function* concat$1(...its) {
	for await (const it of its) yield* it;
}
async function* dropWhile$1(it, f) {
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
const until$1 = async (it, callback) => {
	for await (const _ of it) {
		const value = await callback();
		if (typeof value === `boolean` && !value) break;
	}
};
/**
* This generator will repeat another generator up until some condition. This is the version
* that can handle async generators.
*
* For example, {@link @ixfx/numbers.count} will count from 0..number and then finish:
* ```js
* import { count } from '@ixfx/numbers'
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
const repeat = async function* (genCreator, repeatsOrSignal) {
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
async function equals$1(it1, it2, equality) {
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
async function every$1(it, f) {
	for await (const v of it) {
		const result = await f(v);
		if (!result) return false;
	}
	return true;
}
async function* fill$1(it, v) {
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
async function* filter$1(it, f) {
	for await (const v of it) {
		if (!await f(v)) continue;
		yield v;
	}
}
async function find$1(it, f) {
	for await (const v of it) if (await f(v)) return v;
}
async function* flatten$1(it) {
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
const forEach$1 = async function(iterator, fn, options = {}) {
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
async function last$1(it, opts = {}) {
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
async function* map$1(it, f) {
	for await (const v of it) yield f(v);
}
async function* max$1(it, gt = ((a, b) => a > b)) {
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
async function reduce$1(it, f, start) {
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
async function asCallback$1(input, callback, onDone) {
	for await (const value of input) callback(value);
	if (onDone) onDone();
}
async function* slice$1(it, start = 0, end = Number.POSITIVE_INFINITY) {
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
async function* unique$1(iterable) {
	const buffer = [];
	const itera = Array.isArray(iterable) ? iterable : [iterable];
	for await (const it of itera) for await (const v of it) {
		if (buffer.includes(v)) continue;
		buffer.push(v);
		yield v;
	}
}
async function* uniqueByValue$1(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
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
async function* zip$1(...its) {
	const iits = its.map((it) => it[Symbol.asyncIterator]());
	while (true) {
		const vs = await Promise.all(iits.map((it) => it.next()));
		if (vs.some((v) => v.done)) return;
		yield vs.map((v) => v.value);
	}
}

//#endregion
//#region packages/iterables/dist/src/compare-values.js
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
* hasEqualValuesShallow(a, b); // True
* ```
*
* @example Custom equality checking
* ```js
* const a = [ { name: 'John' }];
* const b = [ { name: 'John' }];
* // False, since object identies are different
* hasEqualValuesShallow(a, b);
* // True, since now we're comparing by value
* hasEqualValuesShallow(a, b, (aa,bb) => aa.name === bb.name);
* ```
* @param iterableA First iterable to check
* @param iterableB Iterable to compare against
* @param eq Equality function, uses === by default
*/
const hasEqualValuesShallow = (iterableA, iterableB, eq) => {
	const returnValue = compareIterableValuesShallow(iterableA, iterableB, eq);
	return returnValue.a.length === 0 && returnValue.b.length === 0;
};

//#endregion
//#region packages/iterables/dist/src/from-event.js
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
//#region packages/iterables/dist/src/numbers-compute.js
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
* Use {@link @ixfx/numbers.average}, {@link @ixfx/numbers.max}, {@link @ixfx/numbers.min} or {@link @ixfx/numers.total} if you only need one of these.
*
* A start and end range can be provided if the calculation should be restricted to a part
* of the input array. By default the whole array is used.
*
* It's also possible to use an iterable as input.
* ```js
* import { count } from '@ixfx/numbers';
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
			if (nonNumbers === `nan`) v = NaN;
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
			if (nonNumbers === `nan`) d = NaN;
			if (nonNumbers === `ignore`) continue;
		}
		total += d;
		count++;
	}
	return total / count;
}

//#endregion
//#region packages/iterables/dist/src/index.js
var src_exports = {};
__export(src_exports, {
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
	some: () => some$1,
	toArray: () => toArray$1,
	unique: () => unique,
	uniqueByValue: () => uniqueByValue,
	until: () => until,
	zip: () => zip
});
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
	return isAsyncIterable(it) ? dropWhile$1(it, f) : dropWhile$2(it, f);
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
	if (isAsyncIterable(it)) return until$1(it, callback);
	else until$2(it, callback);
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
	return isAsyncIterable(it) ? chunks$1(it, size) : chunks$2(it, size);
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
	return isAsyncIterable(it) ? filter$1(it, f) : filter$2(it, f);
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
	return isAsyncIterable(it) ? fill$1(it, v) : fill$2(it, v);
}
/**
* Return concatenation of iterators.
*
* Non-streaming: If one of the input iterables is endless, the other ones won't
* be processed.
* @param its
*/
function concat(...its) {
	return isAsyncIterable(its[0]) ? concat$1(...its) : concat$2(...its);
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
	return isAsyncIterable(it) ? find$1(it, f) : find$2(it, f);
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
	if (isAsyncIterable(it)) return forEach$1(it, fn, options);
	else forEach$2(it, fn);
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
	return isAsyncIterable(it) ? map$1(it, f) : map$2(it, f);
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
	return interval === void 0 ? fromArray$2(array) : fromArray$1(array, interval);
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
	return isAsyncIterable(it) ? flatten$1(it) : flatten$2(it);
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
function some$1(it, f) {
	return isAsyncIterable(it) ? some$2(it, f) : some$3(it, f);
}
/**
* Returns the last item of an iterable, or _undefined_ if it yields no results.
* @param it
* @returns
*/
function last(it) {
	return isAsyncIterable(it) ? last$1(it) : last$2(it);
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
	return isAsyncIterable(it) ? reduce$1(it, f, start) : reduce$2(it, f, start);
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
	return isAsyncIterable(it) ? slice$1(it, start, end) : slice$2(it, start, end);
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
		if (iterable.length === 0) return fromArray$2([]);
		return isAsyncIterable(iterable[0]) ? unique$1(iterable) : unique$2(iterable);
	} else if (isAsyncIterable(iterable)) return unique$1(iterable);
	else return unique$2(iterable);
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
function* uniqueByValue(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
	return isAsyncIterable(input) ? uniqueByValue$1(input, toString, seen) : uniqueByValue$2(input, toString, seen);
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
function toArray$1(it, options = {}) {
	return isAsyncIterable(it) ? toArray$2(it, options) : toArray$3(it, options);
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
	return isAsyncIterable(it) ? every$1(it, f) : every$2(it, f);
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
	return as ? equals$1(it1, it2, equality) : equals$2(it1, it2, equality);
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
	if (its.length === 0) return fromArray$2([]);
	return isAsyncIterable(its[0]) ? zip$1(...its) : zip$2(...its);
}
/**
* Yield values from `iterable`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
* @param iterable Iterable or AsyncIterable
* @param [interval=1] Interval to wait between yield
*/
function fromIterable(iterable, interval) {
	if (isAsyncIterable(iterable) || interval !== void 0) return fromIterable$1(iterable, interval);
	return fromIterable$2(iterable);
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
	if (isAsyncIterable(input)) return asCallback$1(input, callback);
	else {
		asCallback$2(input, callback);
		return;
	}
}

//#endregion
//#region packages/core/dist/src/to-string.js
/**
* Converts a value to string form.
* For simple objects, .toString() is used, other JSON.stringify is used.
* It is meant for creating debugging output or 'hash' versions of objects, and does
* not necessarily maintain full fidelity of the input
* @param value
* @returns
*/
const defaultToString = (value) => {
	if (value === null) return `null`;
	if (typeof value === `boolean` || typeof value === `number`) return value.toString();
	if (typeof value === `string`) return value;
	if (typeof value === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
	return JSON.stringify(value);
};

//#endregion
//#region packages/core/dist/src/comparers.js
/**
* Sort numbers in ascending order.
*
* ```js
* [10, 4, 5, 0].sort(numericComparer);
* // Yields: [0, 4, 5, 10]
* [10, 4, 5, 0].sort(comparerInverse(numericComparer));
* // Yields: [ 10, 5, 4, 0]
* ```
* @param x
* @param y
* @returns
*/
const numericComparer = (x, y) => {
	if (x === y) return 0;
	if (x > y) return 1;
	return -1;
};
/**
* Default sort comparer, following same sematics as Array.sort.
* Consider using {@link defaultComparer} to get more logical sorting of numbers.
*
* Note: numbers are sorted in alphabetical order, eg:
* ```js
* [ 10, 20, 5, 100 ].sort(jsComparer); // same as .sort()
* // Yields: [10, 100, 20, 5]
* ```
*
* Returns -1 if x is less than y
* Returns 1 if x is greater than y
* Returns 0 if x is the same as y
* @param x
* @param y
* @returns
*/
const jsComparer = (x, y) => {
	if (x === void 0 && y === void 0) return 0;
	if (x === void 0) return 1;
	if (y === void 0) return -1;
	const xString = defaultToString(x);
	const yString = defaultToString(y);
	if (xString < yString) return -1;
	if (xString > yString) return 1;
	return 0;
};
/**
* Compares numbers by numeric value, otherwise uses the default
* logic of string comparison.
*
* Is an ascending sort:
* * b, a, c -> a, b, c
* * 10, 5, 100 -> 5, 10, 100
*
* Returns -1 if x is less than y
* Returns 1 if x is greater than y
* Returns 0 if x is the same as y
* @param x
* @param y
* @see {@link comparerInverse} Inverted order
* @returns
*/
const defaultComparer = (x, y) => {
	if (typeof x === `number` && typeof y === `number`) return numericComparer(x, y);
	return jsComparer(x, y);
};

//#endregion
//#region packages/core/dist/src/maps.js
/**
* Returns the first value in `data` that matches a key from `keys`.
* ```js
* // Iterate, yielding: `a.b.c.d`, `b.c.d`, `c.d`, `d`
* const keys = Text.segmentsFromEnd(`a.b.c.d`);
* // Gets first value that matches a key (starting from most precise)
* const value = findBySomeKey(data, keys);
* ```
* @param data
* @param keys
* @returns
*/
const findBySomeKey = (data, keys) => {
	for (const key of keys) if (data.has(key)) return data.get(key);
};
/**
* Adds values to a map, returning a new, modified copy and leaving the original
* intact.
*
* Use {@link addValueMutate} for a mutable
* @param map Map to start with, or _undefined_ to automatically create a map
* @param hasher Function to create keys for values
* @param collisionPolicy What to do if a key already exists
* @param values Values to add
* @returns A new map containing values
*/
const addValue = (map$3, hasher, collisionPolicy, ...values) => {
	const m = map$3 === void 0 ? /* @__PURE__ */ new Map() : new Map(map$3);
	for (const v of values) {
		const hashResult = hasher(v);
		if (collisionPolicy !== `overwrite`) {
			if (m.has(hashResult)) {
				if (collisionPolicy === `throw`) throw new Error(`Key '${hashResult}' already in map`);
				if (collisionPolicy === `skip`) continue;
			}
		}
		m.set(hashResult, v);
	}
	return m;
};
/**
* Returns an array of entries from a map, sorted by a property of the value
*
* ```js
* const m = new Map();
* m.set(`4491`, { name: `Bob` });
* m.set(`2319`, { name: `Alice` });
* const sorted = sortByValueProperty(m, `name`);
* ```
* @param map Map to sort
* @param property Property of value
* @param compareFunction Comparer. If unspecified, uses a default.
*/
const sortByValueProperty = (map$3, property, compareFunction) => {
	const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
	return [...map$3.entries()].sort((aE, bE) => {
		const a = aE[1];
		const b = bE[1];
		return cfn(a[property], b[property]);
	});
};
/**
* Returns _true_ if any key contains `value`, based on the provided `comparer` function. Use {@link hasKeyValue}
* if you only want to find a value under a certain key.
*
* Having a comparer function is useful to check by value rather than object reference.
* @example Finds value where name is 'samantha', regardless of other properties
* ```js
* hasAnyValue(map, {name:`samantha`}, (a, b) => a.name === b.name);
* ```
*
* Works by comparing `value` against all values contained in `map` for equality using the provided `comparer`.
*
* @param map Map to search
* @param value Value to find
* @param comparer Function that determines matching. Should return true if `a` and `b` are considered equal.
* @returns True if value is found
*/
const hasAnyValue = (map$3, value, comparer) => {
	const entries = [...map$3.entries()];
	return entries.some((kv) => comparer(kv[1], value));
};
/**
* Returns values where `predicate` returns true.
*
* If you just want the first match, use `find`
*
* @example All people over thirty
* ```js
* // for-of loop
* for (const v of filterValues(people, person => person.age > 30)) {
*
* }
* // If you want an array
* const overThirty = Array.from(filterValues(people, person => person.age > 30));
* ```
* @param map Map
* @param predicate Filtering predicate
* @returns Values that match predicate
*/
function* filterValues(map$3, predicate) {
	for (const v of map$3.values()) if (predicate(v)) yield v;
}
/**
* Copies data to an array
* @param map
* @returns
*/
const toArray = (map$3) => [...map$3.values()];
/**
* Returns the first found value that matches `predicate` or _undefined_.
* To get an entry see {@link findEntryByPredicate}
*
* Use {@link some} if you don't care about the value, just whether it appears.
* Use {@link filter} to get all value(s) that match `predicate`.
*
* @example First person over thirty
* ```js
* const overThirty = findValue(people, person => person.age > 30);
* ```
* @param map Map to search
* @param predicate Function that returns true for a matching value
* @returns Found value or _undefined_
*/
const findValue = (map$3, predicate) => [...map$3.values()].find((v) => predicate(v));
/**
* Returns _true_ if `predicate` yields _true_ for any value in `map`.
* Use {@link find} if you want the matched value.
* ```js
* const map = new Map();
* map.set(`fruit`, `apple`);
* map.set(`colour`, `red`);
* Maps.some(map, v => v === `red`);    // true
* Maps.some(map, v => v === `orange`); // false
* ```
* @param map
* @param predicate
* @returns
*/
const some = (map$3, predicate) => [...map$3.values()].some((v) => predicate(v));
/**
* Zips together an array of keys and values into an object. Requires that
* `keys` and `values` are the same length.
*
* @example
* ```js
* const o = zipKeyValue([`a`, `b`, `c`], [0, 1, 2])
* Yields: { a: 0, b: 1, c: 2}
*```
* @param keys String keys
* @param values Values
* @typeParam V Type of values
* @return Object with keys and values
*/
const zipKeyValue = (keys, values) => {
	if (keys.length !== values.length) throw new Error(`Keys and values arrays should be same length`);
	return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};
/**
* Returns a function that fetches a value from a map, or generates and sets it if not present.
* Undefined is never returned, because if `fn` yields that, an error is thrown.
*
* See {@link getOrGenerateSync} for a synchronous version.
*
* ```
* const m = getOrGenerate(new Map(), (key) => {
*  return key.toUppercase();
* });
*
* // Not contained in map, so it will run the uppercase function,
* // setting the value to the key 'hello'.
* const v = await m(`hello`);  // Yields 'HELLO'
* const v1 = await m(`hello`); // Value exists, so it is returned ('HELLO')
* ```
*
*/
const getOrGenerate = (map$3, fn) => async (key, args) => {
	let value = map$3.get(key);
	if (value !== void 0) return value;
	value = await fn(key, args);
	if (value === void 0) throw new Error(`fn returned undefined`);
	map$3.set(key, value);
	return value;
};

//#endregion
export { SimpleEventEmitter, addValue, afterMatch, beforeMatch, filterValues, findBySomeKey, findValue, getOrGenerate, hasAnyValue, indexOfCharCode, isAsyncIterable, isIterable, last, last$2 as last$1, map$2 as map, max, min, nextWithTimeout, omitChars, some, sortByValueProperty, splitByLength, src_exports, src_exports$1, stringSegmentsWholeToEnd, stringSegmentsWholeToFirst, toArray, toStringAbbreviate, wildcard, zipKeyValue };
//# sourceMappingURL=maps-CyRBIIF3.js.map