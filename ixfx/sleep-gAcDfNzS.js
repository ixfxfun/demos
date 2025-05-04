import { integerTest$2 as integerTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-DtsSfeyJ.js";
import { toStringDefault$1 as toStringDefault } from "./to-string-DHD_4jl_.js";
import { intervalToMs$1 as intervalToMs } from "./interval-type-CPLNLcnX.js";
import { resolve$1 as resolve, resolveSync$1 as resolveSync } from "./resolve-core-DHdu42gT.js";
import { getErrorMessage$4 as getErrorMessage } from "./src-CjCi0sir.js";

//#region ../packages/core/dist/src/to-string.js
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isMap = (value) => toTypeString(value) === `[object Map]`;
const isSet = (value) => toTypeString(value) === `[object Set]`;
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault$1 = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
const defaultToString = (object) => {
	if (object === null) return `null`;
	if (typeof object === `boolean` || typeof object === `number`) return object.toString();
	if (typeof object === `string`) return object;
	if (typeof object === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
	return JSON.stringify(object);
};

//#endregion
//#region ../packages/core/dist/src/comparers.js
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
* Inverts the source comparer.
* @param comparer
* @returns
*/
const comparerInverse = (comparer) => {
	return (x, y) => {
		const v = comparer(x, y);
		return v * -1;
	};
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
//#region ../packages/core/dist/src/count.js
/**
* Yields `amount` integers, counting by one from zero. If a negative amount is used,
* count decreases. If `offset` is provided, this is added to the return result.
* @example
* ```js
* const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
* const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
* for (const v of count(5, 5)) {
*  // Yields: 5, 6, 7, 8, 9
* }
* const c = [...count(5,1)]; // Yields [1,2,3,4,5]
* ```
*
* @example Used with forEach
* ```js
* // Prints `Hi` 5x
* forEach(count(5), () => // do something);
* ```
*
* If you want to accumulate return values, consider using Flow.repeat.
*
* @example Run some code every 100ms, 10 times:
* ```js
* import { interval } from 'https://unpkg.com/ixfx/dist/flow.js'
* import { count } from 'https://unpkg.com/ixfx/dist/numbers.js'
* const counter = count(10);
* for await (const v of interval(counter, { fixedIntervalMs: 100 })) {
*  // Do something
* }
* ```
* @param amount Number of integers to yield
* @param offset Added to result
*/
function* count(amount, offset = 0) {
	resultThrow(integerTest(amount, ``, `amount`), integerTest(offset, ``, `offset`));
	if (amount === 0) return;
	let index = 0;
	do
		yield amount < 0 ? -index + offset : index + offset;
	while (index++ < Math.abs(amount) - 1);
}

//#endregion
//#region ../packages/core/dist/src/continuously.js
/**
* Returns a {@link Continuously} that continually executes `callback` at `interval` rate.
*
* By default, first the sleep period happens and then the callback happens.
*
* Call `start` to begin/reset loop. The looping stops when `cancel` is called, or when `callback` returns _false_.
*
* @example
* Animation loop
* ```js
* const draw = () => {
*  // Draw on canvas
* }
*
* // Run draw() synchronised with monitor refresh rate via `window.requestAnimationFrame`
* continuously(draw).start();
* ```
*
* @example
* With delay
* ```js
* const fn = () => {
*  // Runs after one minute
* }
* const c = continuously(fn, { mins: 1 } );
* c.start(); // Runs `fn` every minute
* ```
*
* @example
* Control a 'continuously'
* ```js
* c.cancel();   // Stop the loop, cancelling any up-coming calls to `fn`
* c.elapsedMs;  // How many milliseconds have elapsed since start
* c.ticks;      // How many iterations of loop since start
* c.interval;   // Get/set speed of loop. Change kicks-in at next loop.
*               // Use .start() to reset to new interval immediately
* ```
*
* Asynchronous callback functions are supported too:
* ```js
* continuously(async () => { ..});
* ```
*
* The `callback` function can receive a few arguments:
*
* ```js
* continuously( (ticks, elapsedMs) => {
*  // ticks: how many times loop has run
*  // elapsedMs:  how long since last loop
* }).start();
* ```
*
* If the callback explicitly returns _false_, the loop will be cancelled.
*
* ```js
* continuously(ticks => {
*  // Stop after 100 iterations
*  if (ticks > 100) return false;
* }).start();
* ```
*
* You can intercept the logic for calls to `start()` with `onStartCalled`. It can determine
* whether the `start()` proceeds, if the loop is cancelled, or the whole thing disposed,
* so it can't run any longer.
*
* ```js
* continuously(callback, intervalMs, {
*  onStartCalled:(ticks, elapsedMs) => {
*    // Cancel the loop after 1000ms has elapsed
*    if (elapsedMs > 1000) return `cancel`;
*  }
* }).start();
* ```
*
* To run `callback` *before* the sleep happens, set `fireBeforeWait`:
* ```js
* continuously(callback, intervalMs, { fireBeforeWait: true });
* ```
* @param callback - Function to run. If it returns _false_, loop exits.
* @param options - {@link ContinuouslyOpts ContinuouslyOpts}
* @param interval - Speed of loop (default: 0)
* @returns Instance to control looping.
* @see {@link Timeout} if you want to trigger something once.
*/
const continuously = (callback, interval, options = {}) => {
	let intervalMs = intervalToMs(interval, 0);
	resultThrow(integerTest(intervalMs, `positive`, `interval`));
	const fireBeforeWait = options.fireBeforeWait ?? false;
	const onStartCalled = options.onStartCalled;
	const signal = options.signal;
	let disposed = false;
	let runState = `idle`;
	let startCount = 0;
	let startCountTotal = 0;
	let startedAt = performance.now();
	let intervalUsed = interval ?? 0;
	let cancelled = false;
	let currentTimer;
	const deschedule = () => {
		if (currentTimer === void 0) return;
		globalThis.clearTimeout(currentTimer);
		currentTimer = void 0;
		startCount = 0;
		startedAt = Number.NaN;
	};
	const schedule = (scheduledCallback) => {
		if (intervalMs === 0) if (typeof requestAnimationFrame === `undefined`) currentTimer = globalThis.setTimeout(scheduledCallback, 0);
		else {
			currentTimer = void 0;
			requestAnimationFrame(scheduledCallback);
		}
		else currentTimer = globalThis.setTimeout(scheduledCallback, intervalMs);
	};
	const cancel = () => {
		if (cancelled) return;
		cancelled = true;
		if (runState === `idle`) return;
		runState = `idle`;
		deschedule();
	};
	const loop = async () => {
		if (signal?.aborted) runState = `idle`;
		if (runState === `idle`) return;
		runState = `running`;
		startCount++;
		startCountTotal++;
		const valueOrPromise = callback(startCount, performance.now() - startedAt);
		const value = typeof valueOrPromise === `object` ? await valueOrPromise : valueOrPromise;
		if (cancelled) return;
		runState = `scheduled`;
		if (value !== void 0 && !value) {
			cancel();
			return;
		}
		if (cancelled) return;
		schedule(loop);
	};
	const start = () => {
		if (disposed) throw new Error(`Disposed`);
		cancelled = false;
		if (onStartCalled !== void 0) {
			const doWhat = onStartCalled(startCount, performance.now() - startedAt);
			switch (doWhat) {
				case `cancel`: {
					cancel();
					return;
				}
				case `reset`: {
					reset();
					return;
				}
				case `dispose`: {
					disposed = true;
					cancel();
					return;
				}
			}
		}
		if (runState === `idle`) {
			startCount = 0;
			startedAt = performance.now();
			runState = `scheduled`;
			if (fireBeforeWait) loop();
			else schedule(loop);
		}
	};
	const reset = () => {
		if (disposed) throw new Error(`Disposed`);
		cancelled = false;
		startCount = 0;
		startedAt = Number.NaN;
		if (runState !== `idle`) cancel();
		start();
	};
	return {
		start,
		reset,
		cancel,
		get interval() {
			return intervalUsed;
		},
		get runState() {
			return runState;
		},
		get startCountTotal() {
			return startCountTotal;
		},
		get startCount() {
			return startCount;
		},
		set interval(interval$1) {
			const ms = intervalToMs(interval$1, 0);
			resultThrow(integerTest(ms, `positive`, `interval`));
			intervalMs = ms;
			intervalUsed = interval$1;
		},
		get isDisposed() {
			return disposed;
		},
		get elapsedMs() {
			return performance.now() - startedAt;
		}
	};
};

//#endregion
//#region ../packages/core/dist/src/correlate.js
const orderScore = (a, b) => {
	if (a.score > b.score) return -1;
	else if (a.score < b.score) return 1;
	return 0;
};
/**
* Attempts to align prior data with new data, based on a provided similarity function.
*
* See also `alignById` for a version which encloses parameters.
*
* ```js
* // Compare data based on x,y distance
* const fn = (a, b) => {
*  return 1-Points.distance(a, b);
* }
* const lastData = [
*  { id:`1`, x:100, y:200 }
*  ...
* ]
* const newData = [
*  { id:`2`, x:101, y:200 }
* ]
* const aligned = Correlate.align(fn, lastdata, newData, opts);
*
* // Result:
* [
*  { id:`1`, x:101, y:200 }
* ]
* ```
* @param similarityFn Function to compute similarity
* @param lastData Old data
* @param newData New data
* @param options Options
* @returns
*/
const align = (similarityFunction, lastData, newData, options = {}) => {
	const matchThreshold = options.matchThreshold ?? 0;
	const debug = options.debug ?? false;
	const results = new Map();
	const newThings = [];
	const lastMap = new Map();
	lastData?.forEach((d, index) => {
		if (typeof d === `undefined`) throw new Error(`'lastData' contains undefined (index: ${index.toString()})`);
		lastMap.set(d.id, d);
	});
	for (const newD of newData) {
		if (!lastData || lastData.length === 0) {
			if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
			newThings.push(newD);
			continue;
		}
		const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
			id: last.id,
			score: last === null ? -1 : similarityFunction(last, newD),
			last
		}));
		if (scoredLastValues.length === 0) {
			if (debug) console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
			newThings.push(newD);
			continue;
		}
		scoredLastValues.sort(orderScore);
		const top = scoredLastValues[0];
		if (top.score < matchThreshold) {
			if (debug) console.debug(`Correlate.align() new item does not reach threshold. Top score: ${top.score.toString()} id: ${newD.id}`);
			newThings.push(newD);
			continue;
		}
		if (debug && top.id !== newD.id) console.log(`Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score.toString()})`);
		results.set(top.id, {
			...newD,
			id: top.id
		});
		lastMap.delete(top.id);
	}
	newThings.forEach((t) => results.set(t.id, t));
	return Array.from(results.values());
};
/**
* Returns a function that attempts to align a series of data by its id.
* See also {@link align} for a version with no internal storage.
*
* ```js
* // Compare data based on x,y distance
* const fn = (a, b) => {
*  return 1-Points.distance(a, b);
* }
* const aligner = Correlate.alignById(fn, opts);
*
* const lastData = [
*  { id:`1`, x:100, y:200 }
*  ...
* ]
* const aligned = aligner(lastData);
*
* ```
* @param fn Function to compute similarity
* @param options Options
* @returns
*/
const alignById = (fn, options = {}) => {
	let lastData = [];
	const compute = (newData) => {
		lastData = align(fn, lastData, newData, options);
		return [...lastData];
	};
	return compute;
};

//#endregion
//#region ../packages/core/dist/src/default-keyer.js
/**
* If values are strings, uses that as the key.
* Otherwise uses `JSON.stringify`.
* @param a
* @returns
*/
const defaultKeyer = (a) => {
	return typeof a === `string` ? a : JSON.stringify(a);
};

//#endregion
//#region ../packages/core/dist/src/elapsed.js
/**
* Returns elapsed time since the initial call.
* ```js
* // Record start
* const elapsed = elapsedSince();
*
* // Get elapsed time in millis
* // since Elapsed.since()
* elapsed(); // Yields number
* ```
*
* If you want to initialise a stopwatch, but not yet start it, consider:
* ```js
* // Init
* let state = {
*  clicked: Stopwatch.infinity()
* };
*
* state.click(); // Returns a giant value
*
* // Later, when click happens:
* state = { click: elapsedSince() }
* ```
*
* See also:
* * {@link elapsedOnce} if you want to measure a single period, and stop it.
* * {@link elapsedInterval} time _between_ calls
* @returns
*/
const elapsedSince = () => {
	const start = performance.now();
	return () => {
		return performance.now() - start;
	};
};
/**
* Returns the interval between the start and each subsequent call.
*
* ```js
* const interval = elapsedInterval();
* interval(); // Time from elapsedInterval()
* interval(); // Time since last interval() call
* ```
*
* See also:
* * {@link elapsedSince}: time since first call
* * {@link elapsedOnce}: time between two events
* @returns
*/
const elapsedInterval = () => {
	let start = performance.now();
	return () => {
		const now = performance.now();
		const x = now - start;
		start = now;
		return x;
	};
};
/**
* Returns elapsed time since initial call, however
* unlike {@link elapsedSince}, timer stops when first invoked.
*
* ```js
* const elapsed = elapsedOnce();
* // ...do stuff
* elapsed(); // Yields time since elapsedOnce() was called
* // ...do more stuff
* elapsed(); // Is still the same number as above
* ```
*
* See also:
* * {@link elapsedSince}: elapsed time
* * {@link elapsedInterval}: time _between_ calls
* @returns
*/
const elapsedOnce = () => {
	const start = Date.now();
	let stoppedAt = 0;
	return () => {
		if (stoppedAt === 0) stoppedAt = Date.now() - start;
		return stoppedAt;
	};
};
/**
* Returns a function that reports an 'infinite' elapsed time.
* this can be useful as an initialiser for `elapsedSince` et al.
*
* ```js
* // Init clicked to be an infinite time
* let clicked = elapsedInfinity();
*
* document.addEventListener('click', () => {
*  // Now that click has happened, we can assign it properly
*  clicked = Stopwatch.since();
* });
* ```
* @returns
*/
const elapsedInfinity = () => {
	return () => {
		return Number.POSITIVE_INFINITY;
	};
};

//#endregion
//#region ../packages/core/dist/src/filters.js
/**
* Returns `v` if `predicate` returns _true_,
* alternatively returning `skipValue`.
*
* ```js
* // Return true if value is less than 10
* const p = v => v < 10;
*
* filterValue(5, p, 0);   // 5
* filterValue(20, p, 0);  // 0
* ```
* @param v Value to test
* @param predicate Predicate
* @param skipValue Value to return if predicate returns false
* @returns Input value if predicate is _true_, or `skipValue` if not.
*/
const filterValue = (v, predicate, skipValue) => {
	if (predicate(v)) return v;
	return skipValue;
};

//#endregion
//#region ../packages/core/dist/src/text.js
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

//#endregion
//#region ../packages/core/dist/src/is-equal-test.js
/**
* Wraps the `eq` function, tracing the input data result
* ```js
* // Init trace
* const traceEq = isEqualTrace(isEqualValueDefault);
* // Use it in some function that takes IsEqual<T>
* compare(a, b, eq);
* ```
* @param eq
* @returns
*/
const isEqualTrace = (eq) => {
	return (a, b) => {
		const result = eq(a, b);
		console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a)} b: ${toStringAbbreviate(b)}`);
		return result;
	};
};

//#endregion
//#region ../packages/core/dist/src/is-equal.js
/**
* If input is a string, it is returned.
* Otherwise, it returns the result of JSON.stringify() with fields ordered.
*
* This allows for more consistent comparisons when object field orders are different but values the same.
* @param itemToMakeStringFor
* @returns
*/
const toStringOrdered = (itemToMakeStringFor) => {
	if (typeof itemToMakeStringFor === `string`) return itemToMakeStringFor;
	const allKeys = new Set();
	JSON.stringify(itemToMakeStringFor, (key, value) => (allKeys.add(key), value));
	return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
/**
* Default comparer function is equiv to checking `a === b`.
* Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
*/
const isEqualDefault = (a, b) => a === b;
/**
* Comparer returns true if string representation of `a` and `b` are equal.
* Use {@link isEqualDefault} to compare using === semantics
* Uses `toStringDefault` to generate a string representation (via `JSON.stringify`).
*
* Returns _false_ if the ordering of fields is different, even though values are identical:
* ```js
* isEqualValueDefault({ a: 10, b: 20}, { b: 20, a: 10 }); // false
* ```
*
* Use {@link isEqualValueIgnoreOrder} to ignore order (with an overhead of additional processing).
* ```js
* isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
* ```
*
* Use {@link isEqualValuePartial} to partially match `b` against `a`.
* @returns True if the contents of `a` and `b` are equal
*/
const isEqualValueDefault = (a, b) => {
	if (a === b) return true;
	return toStringDefault$1(a) === toStringDefault$1(b);
};
/**
* Returns _true_ if `a` contains the values of `b`. `a` may contain other values, but we
* only check against what is in `b`. `a` and `b` must both be simple objects.
*
* ```js
* const obj = {
*  name: `Elle`,
*  size: 100,
*  colour: {
*    red: 0.5,
*    green: 0.1,
*    blue: 0.2
*  }
* }
*
* isEqualValuePartial(obj, { name: `Elle` }); // true
* isEqualValuePartial(obj, { name: { colour: red: { 0.5, green: 0.1  }} }); // true
*
* isEqualValuePartial(obj, { name: `Ellen` });     // false
* isEqualValuePartial(obj, { lastname: `Elle` });  // false
* ```
* @param a
* @param b
* @param fieldComparer
* @returns
*/
const isEqualValuePartial = (a, b, fieldComparer) => {
	if (typeof a !== `object`) throw new Error(`Param 'a' expected to be object`);
	if (typeof b !== `object`) throw new Error(`Param 'b' expected to be object`);
	if (Object.is(a, b)) return true;
	const comparer = fieldComparer ?? isEqualValuePartial;
	for (const entryB of Object.entries(b)) {
		const valueOnAKeyFromB = a[entryB[0]];
		const valueB = entryB[1];
		if (typeof valueOnAKeyFromB === `object` && typeof valueB === `object`) {
			if (!comparer(valueOnAKeyFromB, valueB)) return false;
		} else if (valueOnAKeyFromB !== valueB) return false;
	}
	return true;
};
/**
* Comparer returns true if string representation of `a` and `b` are equal, regardless of field ordering.
* Uses `toStringOrdered` to generate a string representation (via JSON.stringify`).
*
* ```js
* isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
* isEqualValue({ a: 10, b: 20}, { b: 20, a: 10 }); // false, fields are different order
* ```
*
* There is an overhead to ordering fields. Use {@link isEqualValueDefault} if it's not possible that field ordering will change.
* @returns True if the contents of `a` and `b` are equal
* @typeParam T - Type of objects being compared
*/
const isEqualValueIgnoreOrder = (a, b) => {
	if (a === b) return true;
	return toStringOrdered(a) === toStringOrdered(b);
};
/**
* Returns _true_ if Object.entries() is empty for `value`
* @param value
* @returns
*/
const isEmptyEntries = (value) => [...Object.entries(value)].length === 0;
/**
* Returns _true_ if `a` and `b are equal based on their JSON representations.
* `path` is ignored.
* @param a
* @param b
* @param path
* @returns
*/
const isEqualContextString = (a, b, _path) => {
	return JSON.stringify(a) === JSON.stringify(b);
};

//#endregion
//#region ../packages/core/dist/src/is-integer.js
/**
* Returns _true_ if `value` is an integer. Parses string input, but
* all other data types return _false_.
*
* ```js
* isInteger(1);      // true
* isInteger(1.1);    // false
* isInteger(`1`);    // true
* isInteger(`1.1`);  // false
* isInteger(true);   // false
* isInteger(false);  // false
* ```
*
* Returns _false_ for _undefined_, NaN, booleans and infinite numbers.
* @param value
* @returns
*/
const isInteger = (value) => {
	if (value === void 0) return false;
	if (typeof value === `string`) {
		const v = Number.parseInt(value);
		if (Number.isNaN(v)) return false;
		if (v.toString() === value.toString()) return true;
		return false;
	}
	if (typeof value === `number`) {
		if (Number.isNaN(value)) return false;
		if (!Number.isFinite(value)) return false;
		if (Math.round(value) === value) return true;
		return false;
	}
	return false;
};

//#endregion
//#region ../packages/core/dist/src/is-primitive.js
/**
* Returns _true_ if `value` is number, string, bigint or boolean.
* Returns _false_ if `value` is an object, null, undefined
*
* Use {@link isPrimitiveOrObject} to also return true if `value` is an object.
* @param value Value to check
* @returns _True_ if value is number, string, bigint or boolean.
*/
function isPrimitive(value) {
	if (typeof value === `number`) return true;
	if (typeof value === `string`) return true;
	if (typeof value === `bigint`) return true;
	if (typeof value === `boolean`) return true;
	return false;
}
/**
* Returns _true_ if `value` is number, string, bigint, boolean or an object
*
* Use {@link isPrimitive} to not include objects.
* @param value
* @returns
*/
function isPrimitiveOrObject(value) {
	if (isPrimitive(value)) return true;
	if (typeof value === `object`) return true;
	return false;
}

//#endregion
//#region ../packages/core/dist/src/iterable-compare-values-shallow.js
/**
* Compares the values of two iterables, returning a list
* of items they have in common and those unique in `a` or `b`.
* Ignores ordering of values, and is NOT recursive.
*
* ```js
* const a = ['apples', 'oranges', 'pears' ]
* const b = ['pears', 'kiwis', 'bananas' ];
*
* const r = compareValuesShallow(a, b);
* r.shared;  // [ 'pears' ]
* r.a;       // [ 'apples', 'oranges' ]
* r.b;       // [ 'kiwis', 'bananas' ]
* ```
*
* By default uses === semantics for comparison.
* @param a
* @param b
* @param eq
* @returns
*/
const compareIterableValuesShallow = (a, b, eq = isEqualDefault) => {
	const shared = [];
	const aUnique = [];
	const bUnique = [];
	for (const elementOfA of a) {
		let seenInB = false;
		for (const elementOfB of b) if (eq(elementOfA, elementOfB)) {
			seenInB = true;
			break;
		}
		if (seenInB) shared.push(elementOfA);
		else aUnique.push(elementOfA);
	}
	for (const elementOfB of b) {
		let seenInA = false;
		for (const elementOfA of a) if (eq(elementOfB, elementOfA)) seenInA = true;
		if (!seenInA) bUnique.push(elementOfB);
	}
	const isSame = aUnique.length === 0 && bUnique.length === 0;
	return {
		shared,
		isSame,
		a: aUnique,
		b: bUnique
	};
};

//#endregion
//#region ../packages/core/dist/src/key-value.js
const sorterByValueIndex = (index, reverse = false) => {
	return (values) => {
		const s = values.toSorted((a, b) => {
			return defaultComparer(a[index], b[index]);
		});
		if (reverse) return s.reverse();
		return s;
	};
};
const keyValueSorter = (sortStyle) => {
	switch (sortStyle) {
		case `value`: return sorterByValueIndex(1, false);
		case `value-reverse`: return sorterByValueIndex(1, true);
		case `key`: return sorterByValueIndex(0, false);
		case `key-reverse`: return sorterByValueIndex(0, true);
		default: throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
	}
};

//#endregion
//#region ../packages/core/dist/src/util/round.js
/**
* Rounds a number.
*
* If one parameter is given, it's the decimal places,
* and a rounding function is returned:
* ```js
* import { round } from 'https://unpkg.com/ixfx/dist/numbers.js';
* const r = round(2);
* r(10.12355); // 10.12
* ```
*
* If two parameters are given, the first is decimal places,
* the second the value to round.
* ```js
* round(2, 10.12355); // 10.12
* ```
* @param decimalPlaces
* @returns
*/
function round(a, b, roundUp) {
	resultThrow(integerTest(a, `positive`, `decimalPlaces`));
	const up = typeof b === `boolean` ? b : roundUp ?? false;
	let rounder;
	if (a === 0) rounder = Math.round;
	else {
		const p = Math.pow(10, a);
		if (up) rounder = (v) => Math.ceil(v * p) / p;
		else rounder = (v) => Math.floor(v * p) / p;
	}
	if (typeof b === `number`) return rounder(b);
	return rounder;
}

//#endregion
//#region ../packages/core/dist/src/interval-type.js
/**
* Return the millisecond value of an Interval.
*
* ```js
* intervalToMs(100); // 100
* intervalToMs({ millis: 100 }); // 100
* ```
*
* Use `defaultNumber` to return a default in the case of
* _undefined_ or invalid input.
*
* ```js
* intervalToMs(undefined);      // throws error
* intervalToMs(undefined, 100); // 100
* ```
*
* If no default is provided, an exception is thrown.
* @param interval Interval
* @param defaultNumber Default value if `interval` is _undefined_ or invalid
* @returns Milliseconds
*/
function intervalToMs$1(interval, defaultNumber) {
	if (isInterval(interval)) {
		if (typeof interval === `number`) return interval;
		let ms = interval.millis ?? 0;
		ms += (interval.hours ?? 0) * 60 * 60 * 1e3;
		ms += (interval.mins ?? 0) * 60 * 1e3;
		ms += (interval.secs ?? 0) * 1e3;
		return ms;
	} else {
		if (typeof defaultNumber !== `undefined`) return defaultNumber;
		throw new Error(`Not a valid interval: ${interval}`);
	}
}
/**
* Returns _true_ if `interval` matches the {@link Interval} type.
* @param interval
* @returns _True_ if `interval` is an {@link Interval}.
*/
function isInterval(interval) {
	if (interval === void 0) return false;
	if (interval === null) return false;
	if (typeof interval === `number`) {
		if (Number.isNaN(interval)) return false;
		if (!Number.isFinite(interval)) return false;
		return true;
	} else if (typeof interval !== `object`) return false;
	const hasMillis = `millis` in interval;
	const hasSecs = `secs` in interval;
	const hasMins = `mins` in interval;
	const hasHours = `hours` in interval;
	if (hasMillis && !numberTest(interval.millis)[0]) return false;
	if (hasSecs && !numberTest(interval.secs)[0]) return false;
	if (hasMins && !numberTest(interval.mins)[0]) return false;
	if (hasHours && !numberTest(interval.hours)[0]) return false;
	if (hasMillis || hasSecs || hasHours || hasMins) return true;
	return false;
}
/**
* Returns a human-readable representation
* of some elapsed milliseconds
*
* @example
* ```js
* elapsedToHumanString(10);      // `10ms`
* elapsedToHumanString(2000);    // `2s`
* elapsedToHumanString(65*1000); // `1mins`
* ```
* @param millisOrFunction Milliseconds as a number, {@link Interval} or function that resolve to a number
* @param rounding Rounding (default: 2)
* @returns
*/
const elapsedToHumanString = (millisOrFunction, rounding = 2) => {
	let interval = {} = 0;
	if (typeof millisOrFunction === `function`) {
		const intervalResult = millisOrFunction();
		return elapsedToHumanString(intervalResult);
	} else if (typeof millisOrFunction === `number`) interval = millisOrFunction;
	else if (typeof millisOrFunction === `object`) interval = intervalToMs$1(interval);
	let ms = intervalToMs$1(interval);
	if (typeof ms === `undefined`) return `(undefined)`;
	if (ms < 1e3) return `${round(rounding, ms)}ms`;
	ms /= 1e3;
	if (ms < 120) return `${ms.toFixed(1)}secs`;
	ms /= 60;
	if (ms < 60) return `${ms.toFixed(2)}mins`;
	ms /= 60;
	return `${ms.toFixed(2)}hrs`;
};

//#endregion
//#region ../packages/core/dist/src/track-unique.js
/**
* Tracks unique values. Returns _true_ if value is unique.
* Alternatively: {@link uniqueInstances}
*
* ```js
* const t = unique();
* t(`hello`); // true
* t(`hello`); // false
* ```
*
* Uses JSON.stringify to compare anything which is not a string.
*
* Provide a custom function to convert to string to track uniqueness
* for more complicated objects.
*
* ```js
* const t = unique(p => p.name);
* t({ name:`John`, level:2 }); // true
*
* // Since we're judging uniques by name only
* t({ name:`John`, level:3 }); // false
* ```
*
* Return function throws an error if `value` is null or undefined.
* @returns
*/
const unique = (toString = toStringDefault) => {
	const set = new Set();
	return (value) => {
		if (value === null) throw new TypeError(`Param 'value' cannot be null`);
		if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
		const asString = typeof value === `string` ? value : toString(value);
		if (set.has(asString)) return false;
		set.add(asString);
		return true;
	};
};
/**
* Tracks unique object instances. Returns _true_ if value is unique.
* Alternatively: {@link unique} to track by value.
*/
const uniqueInstances = () => {
	const set = new Set();
	return (value) => {
		if (value === null) throw new TypeError(`Param 'value' cannot be null`);
		if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
		if (set.has(value)) return false;
		set.add(value);
		return true;
	};
};

//#endregion
//#region ../packages/core/dist/src/platform.js
const runningiOS = () => [
	`iPad Simulator`,
	`iPhone Simulator`,
	`iPod Simulator`,
	`iPad`,
	`iPhone`,
	`iPod`
].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

//#endregion
//#region ../packages/core/dist/src/promise-from-event.js
const promiseFromEvent = (target, name) => {
	return new Promise((resolve$2) => {
		const handler = (...args) => {
			target.removeEventListener(name, handler);
			if (Array.isArray(args) && args.length === 1) resolve$2(args[0]);
			else resolve$2(args);
		};
		target.addEventListener(name, handler);
	});
};

//#endregion
//#region ../packages/core/dist/src/reactive-core.js
/**
* Returns _true_ if `rx` is a Reactive
* @param rx
* @returns
*/
const isReactive = (rx) => {
	if (typeof rx !== `object`) return false;
	if (rx === null) return false;
	return `on` in rx && `onValue` in rx;
};
const hasLast = (rx) => {
	if (!isReactive(rx)) return false;
	if (`last` in rx) {
		const v = rx.last();
		if (v !== void 0) return true;
	}
	return false;
};

//#endregion
//#region ../packages/core/dist/src/resolve-core.js
/**
* Resolves `r` to a value, where `r` is:
* * primitive value
* * a/sync function
* * a/sync generator/iterator
* * ReactiveNonInitial
* ```js
* await resolve(10);       // 10
* await resolve(() => 10); // 10
* await resole(async () => {
*  sleep(100);
*  return 10;
* });                // 10
* ```
*
* To resolve an object's properties, use {@link resolveFields}.
*
* Resolve is not recursive. So if `r` is an object, it will be returned, even
* though its properties may be resolvable.
* @param r
* @param args
* @returns
*/
async function resolve$1(r, ...args) {
	if (typeof r === `object`) if (`next` in r) {
		const tag = r[Symbol.toStringTag];
		if (tag === `Generator` || tag == `Array Iterator`) {
			const v = r.next();
			if (`done` in v && `value` in v) return v.value;
			return v;
		} else if (tag === `AsyncGenerator`) {
			const v = await r.next();
			if (`done` in v && `value` in v) return v.value;
			return v;
		} else throw new Error(`Object has 'next' prop, but does not have 'AsyncGenerator', 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
	} else if (isReactive(r)) {
		if (hasLast(r)) return r.last();
		throw new Error(`Reactive does not have last value`);
	} else return r;
	else if (typeof r === `function`) {
		const v = await r(args);
		return v;
	} else return r;
}
function resolveSync$1(r, ...args) {
	if (typeof r === `object`) if (`next` in r) {
		const tag = r[Symbol.toStringTag];
		if (tag === `Generator` || tag == `Array Iterator`) {
			const v = r.next();
			if (`done` in v && `value` in v) return v.value;
			return v;
		} else if (tag === `AsyncGenerator`) throw new Error(`resolveSync cannot work with an async generator`);
		else throw new Error(`Object has 'next' prop, but does not have 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
	} else if (isReactive(r)) {
		if (hasLast(r)) return r.last();
		throw new Error(`Reactive does not have last value`);
	} else return r;
	else if (typeof r === `function`) return r(args);
	else return r;
}
/**
* Resolves a value as per {@link resolve}, however
* If an error is thrown or the resolution results in _undefined_
* or NaN, `fallbackValue` is returned instead.
*
* `null` is an allowed return value.
*
* ```js
* // Function returns undefined 50% of the time or 0
* const fn = () => {
*  if (Math.random() >= 0.5) return; // undefined
*  return 0;
* }
* const r = resolveWithFallback(fn, 1);
* const value = r(); // Always 0 or 1
* ```
* @param p Thing to resolve
* @param fallback Fallback value if an error happens, undefined or NaN
* @param args
* @returns
*/
async function resolveWithFallback(p, fallback, ...args) {
	let errored = false;
	let fallbackValue = fallback.value;
	const overrideWithLast = fallback.overrideWithLast ?? false;
	if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
	try {
		const r = await resolve$1(p, ...args);
		if (typeof r === `undefined`) return fallbackValue;
		if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
		if (overrideWithLast) fallbackValue = r;
		return r;
	} catch (error) {
		if (!errored) {
			errored = true;
			console.warn(`resolveWithFallback swallowed an error. Additional errors not reported.`, getErrorMessage(error));
		}
		return fallbackValue;
	}
}
function resolveWithFallbackSync(p, fallback, ...args) {
	let errored = false;
	let fallbackValue = fallback.value;
	const overrideWithLast = fallback.overrideWithLast ?? false;
	if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
	try {
		const r = resolveSync$1(p, ...args);
		if (typeof r === `undefined`) return fallbackValue;
		if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
		if (overrideWithLast) fallbackValue = r;
		return r;
	} catch (error) {
		if (!errored) {
			errored = true;
			console.warn(`resolveWithFallbackSync swallowed an error. Additional errors not reported.`, getErrorMessage(error));
		}
		return fallbackValue;
	}
}

//#endregion
//#region ../packages/core/dist/src/util/zip.js
const zip = (...arrays) => {
	if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
	const lengths = arrays.map((a) => a.length);
	const returnValue = [];
	const length = lengths[0];
	for (let index = 0; index < length; index++) returnValue.push(arrays.map((a) => a[index]));
	return returnValue;
};

//#endregion
//#region ../packages/core/dist/src/resolve-fields.js
/**
* Returns a copy of `object`, with the same properties. For each property
* that has a basic value (string, number, boolean, object), the value is set
* for the return object. If the property is a function or generator, its value
* is used instead. Async functions and generators are also usable.
*
* Use {@link resolveFieldsSync} for a synchronous version.
*
* Not recursive.
*
* In the below example, the function for the property `random` is invoked.
* ```js
* const state = {
*  length: 10,
*  random: () => Math.random();
* }
* const x = resolveFields(state);
* // { length: 10, random: 0.1235 }
* ```
*
* It also works with generators
* ```js
* import { count } from './numbers.js';
*
* const state = {
*  length: 10,
*  index: count(2) // Generator that yields: 0, 1 and then ends
* }
* resolveFields(state); // { length: 10, index: 0 }
* resolveFields(state); // { length: 10, index: 1 }
* // Generator finishes after counting twice:
* resolveFields(state); // { length: 10, index: undefined }
* ```
* @param object
* @returns
*/
async function resolveFields(object) {
	const resolvers = [];
	const keys = [];
	for (const entry of Object.entries(object)) {
		const resolvable = entry[1];
		resolvers.push(resolve(resolvable));
		keys.push(entry[0]);
	}
	const results = await Promise.all(resolvers);
	const entries = zip(keys, results);
	return Object.fromEntries(entries);
}
function resolveFieldsSync(object) {
	const entries = [];
	for (const entry of Object.entries(object)) {
		const resolvable = entry[1];
		const value = resolveSync(resolvable);
		entries.push([entry[0], value]);
	}
	return Object.fromEntries(entries);
}
/**
* Returns a function that resolves `object`.
*
* Use {@link resolveFields} to resolve an object directly.
* @param object
* @returns
*/

//#endregion
//#region ../packages/core/dist/src/results.js
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
function resultToValue(result) {
	if (result.success) return result.value;
	else throw resultToError(result);
}
function resultErrorToString(result) {
	if (typeof result.error === `string`) return result.error;
	else return getErrorMessage(result.error);
}

//#endregion
//#region ../packages/core/dist/src/sleep.js
if (typeof window === `undefined` || !(`requestAnimationFrame` in window)) {
	if (typeof window === `undefined`) globalThis.requestAnimationFrame = (callback) => {
		setTimeout(callback, 1);
	};
}
/**
* Returns after timeout period.
*
* @example In an async function
* ```js
* console.log(`Hello`);
* await sleep(1000);
* console.log(`There`); // Prints one second after
* ```
*
* @example As a promise
* ```js
* console.log(`Hello`);
* sleep({ millis: 1000 })
*  .then(() => console.log(`There`)); // Prints one second after
* ```
*
* If a timeout of 0 is given, `requestAnimationFrame` is used instead of `setTimeout`.
*
* {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
*
* A value can be provided, which is returned on awaking:
* ```js
* const v = await sleep({ seconds: 1, value: `hello`);
* // v = `hello`
* ```
*
* Provide an AbortSignal to cancel the sleep and throwing an exception
* so code after the sleep doesn't happen.
*
* ```js
* const ac = new AbortController();
* setTimeout(() => { ac.abort(); }, 1000); // Abort after 1s
*
* // Sleep for 1min
* await sleep({ minutes: 1, signal: ac.signal });
* console.log(`Awake`); // This line doesn't get called because an exception is thrown when aborting
* ```
* @param optsOrMillis Milliseconds to sleep, or options
* @return
*/
const sleep = (optsOrMillis) => {
	const timeoutMs = intervalToMs$1(optsOrMillis, 1);
	const signal = optsOrMillis.signal;
	const value = optsOrMillis.value;
	resultThrow(numberTest(timeoutMs, `positive`, `timeoutMs`));
	if (timeoutMs === 0) return new Promise((resolve$2) => requestAnimationFrame((_) => {
		resolve$2(value);
	}));
	else return new Promise((resolve$2, reject) => {
		const onAbortSignal = () => {
			clearTimeout(t);
			if (signal) {
				signal.removeEventListener(`abort`, onAbortSignal);
				reject(new Error(signal.reason));
			} else reject(new Error(`Cancelled`));
		};
		if (signal) signal.addEventListener(`abort`, onAbortSignal);
		const t = setTimeout(() => {
			signal?.removeEventListener(`abort`, onAbortSignal);
			if (signal?.aborted) {
				reject(new Error(signal.reason));
				return;
			}
			resolve$2(value);
		}, timeoutMs);
	});
};
/**
* Delays until `predicate` returns true.
* Can be useful for synchronising with other async activities.
* ```js
* // Delay until 'count' reaches 5
* await sleepWhile(() => count >= 5, 100);
* ```
* @param predicate
* @param checkInterval
*/
const sleepWhile = async (predicate, checkInterval = 100) => {
	while (predicate()) await sleep(checkInterval);
};

//#endregion
export { align, alignById, compareIterableValuesShallow, comparerInverse, continuously, count, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast as hasLast$2, intervalToMs$1 as intervalToMs, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger as isInteger$2, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive as isReactive$2, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve$1 as resolve, resolveFields, resolveFieldsSync, resolveSync$1 as resolveSync, resolveWithFallback, resolveWithFallbackSync, resultErrorToString as resultErrorToString$2, resultToError, resultToValue as resultToValue$2, runningiOS, sleep, sleepWhile, throwResult, toStringDefault$1 as toStringDefault, toStringOrdered, unique as unique$4, uniqueInstances };
//# sourceMappingURL=sleep-gAcDfNzS.js.map