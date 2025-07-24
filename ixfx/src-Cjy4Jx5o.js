import { __export } from "./chunk-51aI8Tpl.js";
import { integerTest, nullUndefTest, numberTest, resultThrow, testPlainObjectOrPrimitive } from "./src-BhN8B7uk.js";

//#region packages/core/src/to-string.ts
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
/**
* Returns _true_ if `value` is a Map type
* @param value
* @returns 
*/
const isMap = (value) => toTypeString(value) === `[object Map]`;
/**
* Returns _true_ if `value` is a Set type
* @param value 
* @returns 
*/
const isSet = (value) => toTypeString(value) === `[object Set]`;
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
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
//#region packages/core/src/comparers.ts
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
//#region packages/core/src/continuously.ts
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
* @see Flow.timeout if you want to trigger something once.
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
		startedAt = NaN;
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
		startedAt = NaN;
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
//#region packages/core/src/correlate.ts
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
* @param similarityFunction Function to compute similarity
* @param lastData Old data
* @param newData New data
* @param options Options
* @returns
*/
const align = (similarityFunction, lastData, newData, options = {}) => {
	const matchThreshold = options.matchThreshold ?? 0;
	const debug = options.debug ?? false;
	const results = /* @__PURE__ */ new Map();
	const newThings = [];
	const lastMap = /* @__PURE__ */ new Map();
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
//#region packages/core/src/default-keyer.ts
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
//#region packages/core/src/elapsed.ts
/**
* Returns elapsed time since the initial call.
* 
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
//#region packages/core/src/filters.ts
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
//#region packages/core/src/text.ts
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
//#region packages/core/src/is-equal-test.ts
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
//#region packages/core/src/is-equal.ts
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
	const allKeys = /* @__PURE__ */ new Set();
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
	return toStringDefault(a) === toStringDefault(b);
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
* Returns _true_ if `a` and `b` are equal based on their JSON representations.
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
//#region packages/core/src/is-integer.ts
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
//#region packages/core/src/is-primitive.ts
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
//#region packages/core/src/iterable-compare-values-shallow.ts
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
//#region packages/core/src/key-value.ts
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
//#region packages/core/src/util/round.ts
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
//#region packages/core/src/interval-type.ts
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
function intervalToMs(interval, defaultNumber) {
	if (isInterval(interval)) {
		if (typeof interval === `number`) return interval;
		let ms = interval.millis ?? 0;
		ms += (interval.hours ?? 0) * 60 * 60 * 1e3;
		ms += (interval.mins ?? 0) * 60 * 1e3;
		ms += (interval.secs ?? 0) * 1e3;
		return ms;
	} else {
		if (typeof defaultNumber !== `undefined`) return defaultNumber;
		throw new Error(`Not a valid interval: ${JSON.stringify(interval)}`);
	}
}
/**
* Returns _true_ if `interval` matches the {@link Interval} type.
* @param interval 
* @returns _True_ if `interval` is an {@link Interval}.
*/
function isInterval(interval) {
	if (typeof interval === `undefined`) return false;
	if (interval === null) return false;
	if (typeof interval === `number`) {
		if (Number.isNaN(interval)) return false;
		if (!Number.isFinite(interval)) return false;
		return true;
	}
	if (typeof interval !== `object`) return false;
	const hasMillis = `millis` in interval;
	const hasSecs = `secs` in interval;
	const hasMins = `mins` in interval;
	const hasHours = `hours` in interval;
	if (hasMillis && !numberTest(interval.millis).success) return false;
	if (hasSecs && !numberTest(interval.secs).success) return false;
	if (hasMins && !numberTest(interval.mins).success) return false;
	if (hasHours && !numberTest(interval.hours).success) return false;
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
	let interval = 0;
	if (typeof millisOrFunction === `function`) {
		const intervalResult = millisOrFunction();
		return elapsedToHumanString(intervalResult);
	} else if (typeof millisOrFunction === `number`) interval = millisOrFunction;
	else if (typeof millisOrFunction === `object`) interval = intervalToMs(interval);
	let ms = intervalToMs(interval);
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
//#region packages/core/src/track-unique.ts
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
	const set = /* @__PURE__ */ new Set();
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
	const set = /* @__PURE__ */ new Set();
	return (value) => {
		if (value === null) throw new TypeError(`Param 'value' cannot be null`);
		if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
		if (set.has(value)) return false;
		set.add(value);
		return true;
	};
};

//#endregion
//#region packages/core/src/platform.ts
/**
* Returns _true_ if it seems like the code is running on iOS (iPad/iPhone)
* @returns 
*/
const runningiOS = () => [
	`iPad Simulator`,
	`iPhone Simulator`,
	`iPod Simulator`,
	`iPad`,
	`iPhone`,
	`iPod`
].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

//#endregion
//#region packages/core/src/promise-from-event.ts
const promiseFromEvent = (target, name) => {
	return new Promise((resolve$1) => {
		const handler = (...args) => {
			target.removeEventListener(name, handler);
			if (Array.isArray(args) && args.length === 1) resolve$1(args[0]);
			else resolve$1(args);
		};
		target.addEventListener(name, handler);
	});
};

//#endregion
//#region packages/core/src/reactive-core.ts
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
/**
* Returns _true_ if `rx` has a last value
* 
* Judged seeing if `.last()` exists on `rx`.
* @param rx Reactive
* @returns 
*/
const hasLast = (rx) => {
	if (!isReactive(rx)) return false;
	if (`last` in rx) {
		const v = rx.last();
		if (v !== void 0) return true;
	}
	return false;
};

//#endregion
//#region packages/debug/dist/src/util.js
const getOrGenerateSync = (map, fn) => (key, args) => {
	let value = map.get(key);
	if (value !== void 0) return value;
	value = fn(key, args);
	map.set(key, value);
	return value;
};

//#endregion
//#region packages/debug/dist/src/logger.js
/**
* Returns a console logging function which prefixes messages. This is
* useful for tracing messages from different components. Each prefix
* is assigned a colour, further helping to distinguish messages.
*
* Use {@link logSet} to get a bundled set.
*
* ```
* // Initialise once
* const log = logger(`a`);
* const error = logger(`a`, `error`);
* const warn = logger(`a`, `warn);
*
* // And then use
* log(`Hello`);    // console.log(`a Hello`);
* error(`Uh-oh`);  // console.error(`a Uh-oh`);
* warn(`Eek!`);    // console.warn(`a Eeek!`);
* ```
*
* Provide the `colourKey` parameter to make log messages
* be coloured the same, even though the prefix is different.
* ```js
* // Both loggers will use the same colour because they
* // share the colour key `system`
* const log = logger(`a`,`log`,`system`);
* const log2 = logger(`b`, `log`, `system`);
* ```
* @param prefix
* @param kind
* @param colourKey Optional key to colour log lines by instead of prefix
* @returns
*/
const logger = (prefix, kind = `log`, colourKey) => (m) => {
	if (m === void 0) m = `(undefined)`;
	else if (typeof m === `object`) m = JSON.stringify(m);
	const colour = colourKey ?? prefix;
	switch (kind) {
		case `log`: {
			console.log(`%c${prefix} ${m}`, `color: ${logColours(colour)}`);
			break;
		}
		case `warn`: {
			console.warn(prefix, m);
			break;
		}
		case `error`: {
			console.error(prefix, m);
			break;
		}
	}
};
/**
* Returns a bundled collection of {@link logger}s
*
* ```js
* const con = logSet(`a`);
* con.log(`Hello`);  // console.log(`a Hello`);
* con.warn(`Uh-oh`); // console.warn(`a Uh-oh`);
* con.error(`Eek!`); // console.error(`a Eek!`);
* ```
*
* By default each prefix is assigned a colour. To use
* another logic, provide the `colourKey` parameter.
*
* ```js
* // Both set of loggers will use same colour
* const con = logSet(`a`, true, `system`);
* const con2 = logSet(`b`, true, `system`);
* ```
* @param prefix Prefix for log messages
* @param verbose True by default. If false, log() messages are a no-op
* @param colourKey If specified, log messages will be coloured by this key instead of prefix (default)
* @returns
*/
const logSet = (prefix, verbose = true, colourKey) => {
	if (verbose) return {
		log: logger(prefix, `log`, colourKey),
		warn: logger(prefix, `warn`, colourKey),
		error: logger(prefix, `error`, colourKey)
	};
	return {
		log: (_) => {
			/** no-op */
		},
		warn: logger(prefix, `warn`, colourKey),
		error: logger(prefix, `error`, colourKey)
	};
};
/**
* Resolve a LogOption to a function
* @param l
* @returns
*/
const resolveLogOption = (l, defaults = {}) => {
	if (l === void 0 || typeof l === `boolean` && !l) return (_) => {
		/** no-op */
	};
	const defaultCat = defaults.category ?? ``;
	const defaultKind = defaults.kind ?? void 0;
	if (typeof l === `boolean`) return (messageOrString) => {
		const m = typeof messageOrString === `string` ? { msg: messageOrString } : messageOrString;
		const kind = m.kind ?? defaultKind;
		const category = m.category ?? defaultCat;
		let message = m.msg;
		if (category) message = `[${category}] ${message}`;
		switch (kind) {
			case `error`: {
				console.error(message);
				break;
			}
			case `warn`: {
				console.warn(message);
				break;
			}
			case `info`: {
				console.info(message);
				break;
			}
			default: console.log(message);
		}
	};
	return l;
};
let logColourCount = 0;
const logColours = getOrGenerateSync(/* @__PURE__ */ new Map(), () => {
	const hue = ++logColourCount * 137.508;
	return `hsl(${hue},50%,75%)`;
});

//#endregion
//#region packages/debug/dist/src/fps-counter.js
/**
* Calculates frames per second.
*
* Returns a function which needs to be called at the end of each frame.
*
* ```js
* const fps = fpsCounter();
*
* function loop() {
*  fps(); // Calculate fps
*  window.requestAnimationFrame(loop);
* }
*
* loop();
* ```
* @param autoDisplay If true (default), prints out the FPS to the console
* @param computeAfterFrames Calculates after this many frames. Higher numbers smoothes the value somewhat
* @returns
*/
const fpsCounter = (autoDisplay = true, computeAfterFrames = 500) => {
	let count = 0;
	let lastFps = 0;
	let countStart = performance.now();
	return () => {
		if (count++ >= computeAfterFrames) {
			const elapsed = performance.now() - countStart;
			countStart = performance.now();
			count = 0;
			lastFps = Math.floor(computeAfterFrames / elapsed * 1e3);
			if (autoDisplay) console.log(`fps: ${lastFps}`);
		}
		return lastFps;
	};
};

//#endregion
//#region packages/debug/dist/src/error-message.js
/**
* Returns a string representation of an error
* @param ex
* @returns
*/
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};

//#endregion
//#region packages/debug/dist/src/index.js
var src_exports = {};
__export(src_exports, {
	fpsCounter: () => fpsCounter,
	getErrorMessage: () => getErrorMessage,
	logColours: () => logColours,
	logSet: () => logSet,
	logger: () => logger,
	resolveLogOption: () => resolveLogOption
});

//#endregion
//#region packages/core/src/resolve-core.ts
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
async function resolve(r, ...args) {
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
/**
* For a given input `r`, attempts to 'resolve' it. See {@link resolve} for details.
* @param r 
* @param args 
* @returns 
*/
function resolveSync(r, ...args) {
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
		const r = await resolve(p, ...args);
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
		const r = resolveSync(p, ...args);
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
//#region packages/core/src/util/zip.ts
const zip = (...arrays) => {
	if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
	const lengths = arrays.map((a) => a.length);
	const returnValue = [];
	const length = lengths[0];
	for (let index = 0; index < length; index++) returnValue.push(arrays.map((a) => a[index]));
	return returnValue;
};

//#endregion
//#region packages/core/src/resolve-fields.ts
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
* It also works with generators. Probably best with those that are infinite.
* 
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
/**
* 'Resolves' all the fields of `object` in a synchronous manner.
* Uses {@link resolveSync} under-the-hood
* @param object 
* @returns 
*/
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
//#region packages/core/src/sleep.ts
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
* `Flow.delay()` and {@link sleep} are similar. `Flow.delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
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
	const timeoutMs = intervalToMs(optsOrMillis, 1);
	const signal = optsOrMillis.signal;
	const value = optsOrMillis.value;
	resultThrow(numberTest(timeoutMs, `positive`, `timeoutMs`));
	if (timeoutMs === 0) return new Promise((resolve$1) => requestAnimationFrame((_) => {
		resolve$1(value);
	}));
	else return new Promise((resolve$1, reject) => {
		const onAbortSignal = () => {
			clearTimeout(t);
			if (signal) {
				signal.removeEventListener(`abort`, onAbortSignal);
				reject(new Error(signal.reason));
			} else reject(/* @__PURE__ */ new Error(`Cancelled`));
		};
		if (signal) signal.addEventListener(`abort`, onAbortSignal);
		const t = setTimeout(() => {
			signal?.removeEventListener(`abort`, onAbortSignal);
			if (signal?.aborted) {
				reject(new Error(signal.reason));
				return;
			}
			resolve$1(value);
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
//#region packages/core/dist/src/records/compare.js
/**
* Compares the keys of two objects, returning a set of those in
* common, and those in either A or B exclusively.
* ```js
* const a = { colour: `red`, intensity: 5 };
* const b = { colour: `pink`, size: 10 };
* const c = compareObjectKeys(a, b);
* // c.shared = [ `colour` ]
* // c.a = [ `intensity` ]
* // c.b = [ `size`  ]
* ```
* @param a
* @param b
* @returns
*/
const compareObjectKeys$1 = (a, b) => {
	const c = compareIterableValuesShallow(Object.keys(a), Object.keys(b));
	return c;
};
/**
* Produces a {@link CompareChangeSet} between two arrays.
*
* @param a Earlier array to compare
* @param b Later array to compare
* @param eq Equality comparison for values
* @returns Change set.
*/
const compareArrays$1 = (a, b, eq = isEqualDefault) => {
	if (!Array.isArray(a)) throw new Error(`Param 'a' is not an array`);
	if (!Array.isArray(b)) throw new Error(`Param 'b' is not an array`);
	const c = compareObjectData$1(a, b, false, eq);
	if (!c.isArray) throw new Error(`Change set does not have arrays as parameters`);
	const convert = (key) => {
		if (key.startsWith(`_`)) return Number.parseInt(key.slice(1));
		else throw new Error(`Unexpected key '${key}'`);
	};
	const cc = {
		...c,
		added: mapObjectKeys$1(c.added, convert),
		changed: mapObjectKeys$1(c.changed, convert),
		removed: c.removed.map((v) => convert(v)),
		summary: c.summary.map((value) => {
			return [
				value[0],
				convert(value[1]),
				value[2]
			];
		})
	};
	return cc;
};
/**
* Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the
* values are primitive values or other simple objects. It also works with arrays.
*
* Uses === equality semantics by default.
* @param a
* @param b
*/
const compareObjectData$1 = (a, b, assumeSameShape = false, eq = isEqualDefault) => {
	a ??= {};
	b ??= {};
	const entriesA = Object.entries(a);
	const entriesB = Object.entries(b);
	const scannedKeys = /* @__PURE__ */ new Set();
	const changed = {};
	const added = {};
	const children = {};
	const removed = [];
	const isArray = Array.isArray(a);
	const summary = new Array();
	let hasChanged = false;
	for (const entry of entriesA) {
		const outputKey = isArray ? `_${entry[0]}` : entry[0];
		const aValue = entry[1];
		const bValue = b[entry[0]];
		scannedKeys.add(entry[0]);
		if (bValue === void 0) {
			hasChanged = true;
			if (assumeSameShape && !isArray) {
				changed[outputKey] = bValue;
				summary.push([
					`mutate`,
					outputKey,
					bValue
				]);
			} else {
				removed.push(outputKey);
				summary.push([
					`del`,
					outputKey,
					aValue
				]);
			}
			continue;
		}
		if (typeof aValue === `object`) {
			const r = compareObjectData$1(aValue, bValue, assumeSameShape, eq);
			if (r.hasChanged) hasChanged = true;
			children[outputKey] = r;
			const childSummary = r.summary.map((sum) => {
				return [
					sum[0],
					outputKey + `.` + sum[1],
					sum[2]
				];
			});
			summary.push(...childSummary);
		} else if (!eq(aValue, bValue)) {
			changed[outputKey] = bValue;
			hasChanged = true;
			summary.push([
				`mutate`,
				outputKey,
				bValue
			]);
		}
	}
	if (!assumeSameShape || isArray) for (const entry of entriesB) {
		const key = isArray ? `_${entry[0]}` : entry[0];
		if (scannedKeys.has(entry[0])) continue;
		added[key] = entry[1];
		hasChanged = true;
		summary.push([
			`add`,
			key,
			entry[1]
		]);
	}
	return {
		changed,
		added,
		removed,
		children,
		hasChanged,
		isArray,
		summary
	};
};

//#endregion
//#region packages/core/dist/src/records/clone-from-fields.js
const cloneFromFields$1 = (source) => {
	const entries = [];
	for (const field in source) {
		const value = source[field];
		if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
	}
	return Object.fromEntries(entries);
};

//#endregion
//#region packages/core/dist/src/records/map-object.js
/**
* Maps the top-level properties of an object through a map function.
* That is, run each of the values of an object through a function,
* setting the result onto the same key structure as original.
*
* It is NOT recursive.
*
* The mapping function gets a single args object, consisting of `{ value, field, index }`,
* where 'value' is the value of the field, 'field' the name, and 'index' a numeric count.
* @example Double the value of all fields
* ```js
* const rect = { width: 100, height: 250 };
* const doubled = mapObjectShallow(rect, args => {
*  return args.value*2;
* });
* // Yields: { width: 200, height: 500 }
* ```
*
* Since the map callback gets the name of the property, it can do context-dependent things.
* ```js
* const rect = { width: 100, height: 250, colour: 'red' }
* const doubled = mapObjectShallow(rect, args => {
*  if (args.field === 'width') return args.value*3;
*  else if (typeof args.value === 'number') return args.value*2;
*  return args.value;
* });
* // Yields: { width: 300, height: 500, colour: 'red' }
* ```
* In addition to bulk processing, it allows remapping of property types.
*
* In terms of type-safety, the mapped properties are assumed to have the
* same type.
*
* ```js
* const o = {
*  x: 10,
*  y: 20,
*  width: 200,
*  height: 200
* }
*
* // Make each property use an averager instead
* const oAvg = mapObjectShallow(o, args => {
*  return movingAverage(10);
* });
*
* // Instead of { x:number, y:number... }, we now have { x:movingAverage(), y:movingAverage()... }
* // Add a value to the averager
* oAvg.x.add(20);
* ```
*/
const mapObjectShallow$1 = (object, mapFunction) => {
	const entries = Object.entries(object);
	const mapped = entries.map(([sourceField, sourceFieldValue], index) => [sourceField, mapFunction({
		value: sourceFieldValue,
		field: sourceField,
		index,
		path: sourceField
	})]);
	return Object.fromEntries(mapped);
};

//#endregion
//#region packages/core/dist/src/is-primitive.js
/**
* Returns _true_ if `value` is number, string, bigint or boolean.
* Returns _false_ if `value` is an object, null, undefined
*
* Use {@link isPrimitiveOrObject} to also return true if `value` is an object.
* @param value Value to check
* @returns _True_ if value is number, string, bigint or boolean.
*/
function isPrimitive$1(value) {
	if (typeof value === `number`) return true;
	if (typeof value === `string`) return true;
	if (typeof value === `bigint`) return true;
	if (typeof value === `boolean`) return true;
	return false;
}

//#endregion
//#region packages/core/dist/src/records/traverse.js
/**
* Returns the direct children of a tree-like object as a pairing
* of node name and value. Supports basic objects, Maps and arrays.
*
* Sub-children are included as an object blob.
*
* @example Simple object
* ```js
* const o = {
*  colour: {
*    r: 0.5, g: 0.5, b: 0.5
*  }
* };
*
* const children = [ ...Trees.children(o) ];
* // Children:
* // [
* //  { name: "colour", value: { b: 0.5, g: 0.5, r: 0.5 } }
* // ]
* const subChildren = [ ...Trees.children(o.colour) ];
* // [ { name: "r", value: 0.5 }, { name: "g", value: 0.5 }, { name: "b", value: 0.5 } ]
* ```
*
* Arrays are assigned a name based on index.
* @example Arrays
* ```js
* const colours = [ { r: 1, g: 0, b: 0 }, { r: 0, g: 1, b: 0 }, { r: 0, g: 0, b: 1 } ];
* // Children:
* // [
* //  { name: "array[0]", value: {r:1,g:0,b:0} },
* //  { name: "array[1]", value: {r:0,g:1,b:0} },
* //  { name: "array[2]", value: {r:0,g:0,b:1} },
* // ]
* ```
*
* Pass in `options.name` (eg 'colours') to have names generated as 'colours[0]', etc.
* Options can also be used to filter children. By default all direct children are returned.
* @param node
* @param options
*/
function* recordChildren$1(node, options = {}) {
	resultThrow(nullUndefTest(node, `node`));
	const filter = options.filter ?? `none`;
	const filterByValue = (v) => {
		if (filter === `none`) return [true, isPrimitive$1(v)];
		else if (filter === `leaves` && isPrimitive$1(v)) return [true, true];
		else if (filter === `branches` && !isPrimitive$1(v)) return [true, false];
		return [false, isPrimitive$1(v)];
	};
	if (Array.isArray(node)) for (const [index, element] of node.entries()) {
		const f = filterByValue(element);
		if (f[0]) yield {
			name: index.toString(),
			sourceValue: element,
			nodeValue: f[1] ? element : void 0
		};
	}
	else if (typeof node === `object`) {
		const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
		for (const [name, value] of entriesIter) {
			const f = filterByValue(value);
			if (f[0]) yield {
				name,
				sourceValue: value,
				nodeValue: f[1] ? value : void 0
			};
		}
	}
}
function* recordEntriesDepthFirst(node, options = {}, ancestors = []) {
	for (const c of recordChildren$1(node, options)) {
		yield {
			...c,
			ancestors: [...ancestors]
		};
		yield* recordEntriesDepthFirst(c.sourceValue, options, [...ancestors, c.name]);
	}
}

//#endregion
//#region packages/core/dist/src/records/pathed.js
const getEntries$1 = (target, deepProbe) => {
	if (target === void 0) throw new Error(`Param 'target' is undefined`);
	if (target === null) throw new Error(`Param 'target' is null`);
	if (typeof target !== `object`) throw new Error(`Param 'target' is not an object (got: ${typeof target})`);
	if (deepProbe) {
		const entries = [];
		for (const field in target) {
			const value = target[field];
			if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
		}
		return entries;
	} else return Object.entries(target);
};
/**
* Scans object, producing a list of changed fields where B's value (newer) differs from A (older).
*
* Options:
* - `deepEntries` (_false_): If _false_ Object.entries are used to scan the object. However this won't work for some objects, eg event args, thus _true_ is needed.
* - `eq` (JSON.stringify): By-value comparison function
* - `includeMissingFromA` (_false): If _true_ includes fields present on B but missing on A.
* - `asPartial` (_false): If _true_, treats B as a partial update to B. This means that things missing from B are not considered removals.
* @param a 'Old' value
* @param b 'New' value
* @param options Options for comparison
* @returns
*/
function* compareData$1(a, b, options = {}) {
	if (typeof a === `undefined`) {
		yield {
			path: options.pathPrefix ?? ``,
			value: b,
			state: `added`
		};
		return;
	}
	if (typeof b === `undefined`) {
		yield {
			path: options.pathPrefix ?? ``,
			previous: a,
			value: void 0,
			state: `removed`
		};
		return;
	}
	const asPartial = options.asPartial ?? false;
	const undefinedValueMeansRemoved = options.undefinedValueMeansRemoved ?? false;
	const pathPrefix = options.pathPrefix ?? ``;
	const deepEntries = options.deepEntries ?? false;
	const eq = options.eq ?? isEqualContextString;
	const includeMissingFromA = options.includeMissingFromA ?? false;
	const includeParents = options.includeParents ?? false;
	if (isPrimitive(a) && isPrimitive(b)) {
		if (a !== b) yield {
			path: pathPrefix,
			value: b,
			previous: a,
			state: `change`
		};
		return;
	}
	if (isPrimitive(b)) {
		yield {
			path: pathPrefix,
			value: b,
			previous: a,
			state: `change`
		};
		return;
	}
	const entriesA = getEntries$1(a, deepEntries);
	const entriesAKeys = /* @__PURE__ */ new Set();
	for (const [key, valueA] of entriesA) {
		entriesAKeys.add(key);
		const keyOfAInB = key in b;
		const valueOfKeyInB = b[key];
		if (typeof valueA === `object` && valueA !== null) if (keyOfAInB) if (valueOfKeyInB === void 0) throw new Error(`Pathed.compareData Value for key ${key} is undefined`);
		else {
			const sub = [...compareData$1(valueA, valueOfKeyInB, {
				...options,
				pathPrefix: pathPrefix + key + `.`
			})];
			if (sub.length > 0) {
				for (const s of sub) yield s;
				if (includeParents) yield {
					path: pathPrefix + key,
					value: b[key],
					previous: valueA,
					state: `change`
				};
			}
		}
		else {
			if (asPartial) continue;
			yield {
				path: pathPrefix + key,
				value: void 0,
				previous: valueA,
				state: `removed`
			};
		}
		else {
			const subPath = pathPrefix + key;
			if (keyOfAInB) {
				if (valueOfKeyInB === void 0 && undefinedValueMeansRemoved) yield {
					path: subPath,
					previous: valueA,
					value: void 0,
					state: `removed`
				};
				else if (!eq(valueA, valueOfKeyInB, subPath)) yield {
					path: subPath,
					previous: valueA,
					value: valueOfKeyInB,
					state: `change`
				};
			} else {
				if (asPartial) continue;
				yield {
					path: subPath,
					previous: valueA,
					value: void 0,
					state: `removed`
				};
			}
		}
	}
	if (includeMissingFromA) {
		const entriesB = getEntries$1(b, deepEntries);
		for (const [key, valueB] of entriesB) {
			if (entriesAKeys.has(key)) continue;
			yield {
				path: pathPrefix + key,
				previous: void 0,
				value: valueB,
				state: `added`
			};
		}
	}
}
/**
* Returns a copy of `target` object with a specified path changed to `value`.
*
* ```js
* const a = {
*  message: `Hello`,
*  position: { x: 10, y: 20 }
* }
*
* const a1 = updateByPath(a, `message`, `new message`);
* // a1 = { message: `new message`, position: { x: 10, y: 20 }}
* const a2 = updateByPath(a, `position.x`, 20);
* // a2 = { message: `hello`, position: { x: 20, y: 20 }}
* ```
*
* Paths can also be array indexes:
* ```js
* updateByPath([`a`,`b`,`c`], 2, `d`);
* // Yields: [ `a`, `b`, `d` ]
* ```
*
* By default, only existing array indexes can be updated. Use the `allowShapeChange` parameter
* to allow setting arbitrary indexes.
* ```js
* // Throws because array index 3 is undefined
* updateByPath([ `a`, `b`, `c` ], `3`, `d`);
*
* // With allowShapeChange flag
* updateByPath([ `a`, `b`, `c` ], `3`, `d`, true);
* // Returns: [ `a`, `b`, `c`, `d` ]
* ```
*
* Throws an error if:
* * `path` cannot be resolved (eg. `position.z` in the above example)
* * `value` applied to `target` results in the object having a different shape (eg missing a field, field
* changing type, or array index out of bounds). Use `allowShapeChange` to suppress this error.
* * Path is undefined or not a string
* * Target is undefined/null
* @param target Object to update
* @param path Path to set value
* @param value Value to set
* @param allowShapeChange By default _false_, throwing an error if an update change the shape of the original object.
* @returns
*/
const updateByPath$1 = (target, path, value, allowShapeChange = false) => {
	if (path === void 0) throw new Error(`Parameter 'path' is undefined`);
	if (typeof path !== `string`) throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
	if (target === void 0) throw new Error(`Parameter 'target' is undefined`);
	if (target === null) throw new Error(`Parameter 'target' is null`);
	const split = path.split(`.`);
	const r = updateByPathImpl$1(target, split, value, allowShapeChange);
	return r;
};
const updateByPathImpl$1 = (o, split, value, allowShapeChange) => {
	if (split.length === 0) {
		if (allowShapeChange) return value;
		if (Array.isArray(o) && !Array.isArray(value)) throw new Error(`Expected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
		if (!Array.isArray(o) && Array.isArray(value)) throw new Error(`Unexpected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
		if (typeof o !== typeof value) throw new Error(`Cannot reassign object type. (${typeof o} -> ${typeof value}). Set allowShapeChange=true to ignore.`);
		if (typeof o === `object` && !Array.isArray(o)) {
			const c = compareObjectKeys$1(o, value);
			if (c.a.length > 0) throw new Error(`New value is missing key(s): ${c.a.join(`,`)}`);
			if (c.b.length > 0) throw new Error(`New value cannot add new key(s): ${c.b.join(`,`)}`);
		}
		return value;
	}
	const start = split.shift();
	if (!start) return value;
	const isInt = isInteger(start);
	if (isInt && Array.isArray(o)) {
		const index = Number.parseInt(start);
		if (index >= o.length && !allowShapeChange) throw new Error(`Array index ${index.toString()} is outside of the existing length of ${o.length.toString()}. Use allowShapeChange=true to permit this.`);
		const copy = [...o];
		copy[index] = updateByPathImpl$1(copy[index], split, value, allowShapeChange);
		return copy;
	} else if (start in o) {
		const copy = { ...o };
		copy[start] = updateByPathImpl$1(copy[start], split, value, allowShapeChange);
		return copy;
	} else throw new Error(`Path ${start} not found in data`);
};
/**
* Gets the data at `path` in `object`. Assumes '.' separates each segment of path.
* ```js
* getField({ name: { first: `Thom`, last: `Yorke` }}, `name.first`); // 'Thom'
* getField({ colours: [`red`, `green`, `blue` ]}, `colours.1`); // `green`
* ```
*
* Returns _undefined_ if path could not be resolved.
*
* Throws if:
* * `path` is not a string or empty
* * `object` is _undefined_ or null
* @param object
* @param path
* @returns
*/
const getField$1 = (object, path) => {
	if (typeof path !== `string`) throw new Error(`Param 'path' ought to be a string. Got: '${typeof path}'`);
	if (path.length === 0) throw new Error(`Param string 'path' is empty`);
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (object === null) throw new Error(`Param 'object' is null`);
	const split = path.split(`.`);
	const v = getFieldImpl$1(object, split);
	return v;
};
const getFieldImpl$1 = (object, split) => {
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (split.length === 0) throw new Error(`Path has run out`);
	const start = split.shift();
	if (!start) throw new Error(`Unexpected empty split path`);
	const isInt = isInteger(start);
	if (isInt && Array.isArray(object)) {
		const index = Number.parseInt(start);
		if (typeof object[index] === `undefined`) return {
			success: false,
			error: `Index '${index}' does not exist. Length: ${object.length}`
		};
		if (split.length === 0) return {
			value: object[index],
			success: true
		};
		else return getFieldImpl$1(object[index], split);
	} else if (typeof object === `object` && start in object) if (split.length === 0) return {
		value: object[start],
		success: true
	};
	else return getFieldImpl$1(object[start], split);
	else return {
		success: false,
		error: `Path '${start}' not found`
	};
};
/**
* Returns a representation of the object as a set of paths and data.
* ```js
* const o = { name: `hello`, size: 20, colour: { r:200, g:100, b:40 } }
* const pd = [...getPathsAndData(o)];
* // Yields:
* // [
* // { path: `name`, value: `hello` },
* // { path: `size`, value: `20` },
* // { path: `colour.r`, value: `200` },
* // { path: `colour.g`, value: `100` },
* // { path: `colour.b`, value: `40` }
* //]
* ```
* @param o Object to get paths and data for
* @param maxDepth Set maximum recursion depth. By default unlimited.
* @param prefix Manually set a path prefix if it's necessary
* @returns
*/
function* getPathsAndData$1(o, onlyLeaves = false, maxDepth = Number.MAX_SAFE_INTEGER, prefix = ``) {
	if (o === null) return;
	if (o === void 0) return;
	yield* getPathsAndDataImpl$1(o, prefix, onlyLeaves, maxDepth);
}
function* getPathsAndDataImpl$1(o, prefix, onlyLeaves = false, maxDepth) {
	if (maxDepth <= 0) return;
	if (typeof o !== `object`) return;
	for (const entries of Object.entries(o)) {
		const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
		const value = entries[1];
		const leaf = typeof value !== `object`;
		if (onlyLeaves && leaf || !onlyLeaves) yield {
			path: sub,
			value
		};
		yield* getPathsAndDataImpl$1(value, sub, onlyLeaves, maxDepth - 1);
	}
}

//#endregion
//#region packages/core/dist/src/records/index.js
/**
* Maps the keys of an object, returning a transformed object.
* ```js
* const input = {
*  hello: `there`,
*  chap: `chappie`
* }
*
* mapObjectKeys(input, key => key.toUppercase());
*
* // Yields: { HELLO: `there`, CHAP: `chappie` }
* ```
* @param object
* @param mapFunction
* @returns
*/
const mapObjectKeys$1 = (object, mapFunction) => {
	const destinationObject = {};
	for (const entries of Object.entries(object)) {
		const key = mapFunction(entries[0]);
		destinationObject[key] = entries[1];
	}
	return destinationObject;
};

//#endregion
//#region packages/core/src/records/compare.ts
/**
* Compares the keys of two objects, returning a set of those in
* common, and those in either A or B exclusively.
* ```js
* const a = { colour: `red`, intensity: 5 };
* const b = { colour: `pink`, size: 10 };
* const c = compareObjectKeys(a, b);
* // c.shared = [ `colour` ]
* // c.a = [ `intensity` ]
* // c.b = [ `size`  ]
* ```
* @param a 
* @param b 
* @returns 
*/
const compareObjectKeys = (a, b) => {
	const c = compareIterableValuesShallow(Object.keys(a), Object.keys(b));
	return c;
};
/**
* Returns the changed fields from A -> B. It's assumed that A and B have the same shape.
* ie. returns an object that only consists of fields which have changed in B compared to A.
* 
* ```js
* const a = { msg: `hi`, v: 10 };
* 
* changedDataFields(a, { msg: `hi`,   v: 10 }); // {}
* changedDataFields(a, { msg: `hi!!`, v: 10 }); // { msg: `hi!!` }
* changedDataFields(a, { msg: `hi!!` });       // { msg: `hi!!`, v: undefined }
* ```
* 
* Under the hood, we use {@link compareResultToObject}(a, b, true). If B has additional or removed fields,
* this is considered an error.
* 
* If a field is an array, the whole array is returned, rather than a diff.
* @param a 
* @param b 
*/
const changedObjectDataFields = (a, b) => {
	const r = compareObjectData(a, b, true);
	if (Object.entries(r.added).length > 0) throw new Error(`Shape of data has changed`);
	if (Object.entries(r.removed).length > 0) throw new Error(`Shape of data has changed`);
	const output = compareResultToObject(r, b);
	return output;
};
const compareResultToObject = (r, b) => {
	const output = {};
	if (r.isArray) return b;
	for (const entry of Object.entries(r.changed)) output[entry[0]] = entry[1];
	for (const entry of Object.entries(r.added)) output[entry[0]] = entry[1];
	for (const childEntry of Object.entries(r.children)) {
		const childResult = childEntry[1];
		if (childResult.hasChanged) output[childEntry[0]] = compareResultToObject(childResult, b[childEntry[0]]);
	}
	return output;
};
/**
* Produces a {@link CompareChangeSet} between two arrays.
* 
* @param a Earlier array to compare
* @param b Later array to compare
* @param eq Equality comparison for values
* @returns Change set.
*/
const compareArrays = (a, b, eq = isEqualDefault) => {
	if (!Array.isArray(a)) throw new Error(`Param 'a' is not an array`);
	if (!Array.isArray(b)) throw new Error(`Param 'b' is not an array`);
	const c = compareObjectData(a, b, false, eq);
	if (!c.isArray) throw new Error(`Change set does not have arrays as parameters`);
	const convert = (key) => {
		if (key.startsWith(`_`)) return Number.parseInt(key.slice(1));
		else throw new Error(`Unexpected key '${key}'`);
	};
	const cc = {
		...c,
		added: mapObjectKeys$1(c.added, convert),
		changed: mapObjectKeys$1(c.changed, convert),
		removed: c.removed.map((v) => convert(v)),
		summary: c.summary.map((value) => {
			return [
				value[0],
				convert(value[1]),
				value[2]
			];
		})
	};
	return cc;
};
/**
* Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the 
* values are primitive values or other simple objects. It also works with arrays.
* 
* Uses === equality semantics by default.
* @param a 
* @param b 
*/
const compareObjectData = (a, b, assumeSameShape = false, eq = isEqualDefault) => {
	a ??= {};
	b ??= {};
	const entriesA = Object.entries(a);
	const entriesB = Object.entries(b);
	const scannedKeys = /* @__PURE__ */ new Set();
	const changed = {};
	const added = {};
	const children = {};
	const removed = [];
	const isArray = Array.isArray(a);
	const summary = new Array();
	let hasChanged = false;
	for (const entry of entriesA) {
		const outputKey = isArray ? `_${entry[0]}` : entry[0];
		const aValue = entry[1];
		const bValue = b[entry[0]];
		scannedKeys.add(entry[0]);
		if (bValue === void 0) {
			hasChanged = true;
			if (assumeSameShape && !isArray) {
				changed[outputKey] = bValue;
				summary.push([
					`mutate`,
					outputKey,
					bValue
				]);
			} else {
				removed.push(outputKey);
				summary.push([
					`del`,
					outputKey,
					aValue
				]);
			}
			continue;
		}
		if (typeof aValue === `object`) {
			const r = compareObjectData(aValue, bValue, assumeSameShape, eq);
			if (r.hasChanged) hasChanged = true;
			children[outputKey] = r;
			const childSummary = r.summary.map((sum) => {
				return [
					sum[0],
					outputKey + `.` + sum[1],
					sum[2]
				];
			});
			summary.push(...childSummary);
		} else if (!eq(aValue, bValue)) {
			changed[outputKey] = bValue;
			hasChanged = true;
			summary.push([
				`mutate`,
				outputKey,
				bValue
			]);
		}
	}
	if (!assumeSameShape || isArray) for (const entry of entriesB) {
		const key = isArray ? `_${entry[0]}` : entry[0];
		if (scannedKeys.has(entry[0])) continue;
		added[key] = entry[1];
		hasChanged = true;
		summary.push([
			`add`,
			key,
			entry[1]
		]);
	}
	return {
		changed,
		added,
		removed,
		children,
		hasChanged,
		isArray,
		summary
	};
};

//#endregion
//#region packages/core/src/records/clone-from-fields.ts
const cloneFromFields = (source) => {
	const entries = [];
	for (const field in source) {
		const value = source[field];
		if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
	}
	return Object.fromEntries(entries);
};

//#endregion
//#region packages/core/src/records/map-object.ts
/**
* Maps the top-level properties of an object through a map function.
* That is, run each of the values of an object through a function,
* setting the result onto the same key structure as original.
* 
* It is NOT recursive.
*
* The mapping function gets a single args object, consisting of `{ value, field, index }`,
* where 'value' is the value of the field, 'field' the name, and 'index' a numeric count.
* @example Double the value of all fields
* ```js
* const rect = { width: 100, height: 250 };
* const doubled = mapObjectShallow(rect, args => {
*  return args.value*2;
* });
* // Yields: { width: 200, height: 500 }
* ```
*
* Since the map callback gets the name of the property, it can do context-dependent things.
* ```js
* const rect = { width: 100, height: 250, colour: 'red' }
* const doubled = mapObjectShallow(rect, args => {
*  if (args.field === 'width') return args.value*3;
*  else if (typeof args.value === 'number') return args.value*2;
*  return args.value;
* });
* // Yields: { width: 300, height: 500, colour: 'red' }
* ```
* In addition to bulk processing, it allows remapping of property types.
*
* In terms of type-safety, the mapped properties are assumed to have the
* same type.
*
* ```js
* const o = {
*  x: 10,
*  y: 20,
*  width: 200,
*  height: 200
* }
*
* // Make each property use an averager instead
* const oAvg = mapObjectShallow(o, args => {
*  return movingAverage(10);
* });
*
* // Instead of { x:number, y:number... }, we now have { x:movingAverage(), y:movingAverage()... }
* // Add a value to the averager
* oAvg.x.add(20);
* ```
*/
const mapObjectShallow = (object, mapFunction) => {
	const entries = Object.entries(object);
	const mapped = entries.map(([sourceField, sourceFieldValue], index) => [sourceField, mapFunction({
		value: sourceFieldValue,
		field: sourceField,
		index,
		path: sourceField
	})]);
	return Object.fromEntries(mapped);
};
/**
* Maps the contents of `data` using `mapper` as a structured set of map functions.
* ```js
* const a = {
*  person: {
*    size: 20
*  }
*  hello: `there`
* }
* mapObjectByObject(a, {
*  person: {
*    size: (value, context) => {
*      return value * 2
*    }
*  }
* });
* // Yields: { person: { size: 40 }, hello: `there` }
* ```
* @param data 
* @param mapper 
* @returns 
*/
function mapObjectByObject(data, mapper) {
	const entries = Object.entries(data);
	for (const entry of entries) if (entry[0] in mapper) {
		const m = mapper[entry[0]];
		entry[1] = typeof m === `object` ? mapObjectByObject(entry[1], m) : m(entry[1], data);
	}
	return Object.fromEntries(entries);
}

//#endregion
//#region packages/core/src/records/traverse.ts
/**
* Helper function to get a 'friendly' string representation of an array of {@link RecordEntry}.
* @param entries 
* @returns 
*/
function prettyPrintEntries(entries) {
	if (entries.length === 0) return `(empty)`;
	let t = ``;
	for (const [index, entry] of entries.entries()) {
		t += `  `.repeat(index);
		t += entry.name + ` = ` + JSON.stringify(entry.nodeValue) + `\n`;
	}
	return t;
}
/**
* Returns a human-friendly debug string for a tree-like structure
* ```js
* console.log(Trees.prettyPrint(obj));
* ```
* @param indent
* @param node
* @param options
* @returns
*/
const recordEntryPrettyPrint = (node, indent = 0, options = {}) => {
	resultThrow(nullUndefTest(node, `node`));
	const defaultName = options.name ?? `node`;
	const entry = getNamedRecordEntry(node, defaultName);
	const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.nodeValue)}`;
	const childrenAsArray = [...recordChildren(node, options)];
	return childrenAsArray.length > 0 ? t + `\n` + childrenAsArray.map((d) => recordEntryPrettyPrint(d.nodeValue, indent + 1, {
		...options,
		name: d.name
	})).join(`\n`) : t;
};
/**
* Returns the direct children of a tree-like object as a pairing
* of node name and value. Supports basic objects, Maps and arrays. 
* 
* Sub-children are included as an object blob.
* 
* @example Simple object
* ```js
* const o = {
*  colour: {
*    r: 0.5, g: 0.5, b: 0.5
*  }
* };
* 
* const children = [ ...Trees.children(o) ];
* // Children:
* // [
* //  { name: "colour", value: { b: 0.5, g: 0.5, r: 0.5 } }
* // ]
* const subChildren = [ ...Trees.children(o.colour) ];
* // [ { name: "r", value: 0.5 }, { name: "g", value: 0.5 }, { name: "b", value: 0.5 } ]
* ```
* 
* Arrays are assigned a name based on index.
* @example Arrays
* ```js
* const colours = [ { r: 1, g: 0, b: 0 }, { r: 0, g: 1, b: 0 }, { r: 0, g: 0, b: 1 } ];
* // Children: 
* // [
* //  { name: "array[0]", value: {r:1,g:0,b:0} },
* //  { name: "array[1]", value: {r:0,g:1,b:0} },
* //  { name: "array[2]", value: {r:0,g:0,b:1} },
* // ]
* ```
* 
* Pass in `options.name` (eg 'colours') to have names generated as 'colours[0]', etc.
* Options can also be used to filter children. By default all direct children are returned.
* @param node 
* @param options  
*/
function* recordChildren(node, options = {}) {
	resultThrow(nullUndefTest(node, `node`));
	const filter = options.filter ?? `none`;
	const filterByValue = (v) => {
		if (filter === `none`) return [true, isPrimitive(v)];
		else if (filter === `leaves` && isPrimitive(v)) return [true, true];
		else if (filter === `branches` && !isPrimitive(v)) return [true, false];
		return [false, isPrimitive(v)];
	};
	if (Array.isArray(node)) for (const [index, element] of node.entries()) {
		const f = filterByValue(element);
		if (f[0]) yield {
			name: index.toString(),
			sourceValue: element,
			nodeValue: f[1] ? element : void 0
		};
	}
	else if (typeof node === `object`) {
		const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
		for (const [name, value] of entriesIter) {
			const f = filterByValue(value);
			if (f[0]) yield {
				name,
				sourceValue: value,
				nodeValue: f[1] ? value : void 0
			};
		}
	}
}
function* recordEntriesDepthFirst$1(node, options = {}, ancestors = []) {
	for (const c of recordChildren(node, options)) {
		yield {
			...c,
			ancestors: [...ancestors]
		};
		yield* recordEntriesDepthFirst$1(c.sourceValue, options, [...ancestors, c.name]);
	}
}
/**
* Finds a given direct child by name
* @param name
* @param node
* @returns
*/
function recordEntryChildByName(name, node) {
	for (const d of recordChildren(node)) if (d.name === name) return d;
}
/**
* Returns the closest matching entry, tracing `path` in an array, Map or simple object.
* Returns an entry with _undefined_ value at the point where tracing stopped.
* Use {@link traceRecordEntryByPath} to step through all the segments.
*
* ```js
* const people = {
*  jane: {
*   address: {
*    postcode: 1000,
*    street: 'West St',
*    city: 'Blahville'
*   },
* colour: 'red'
*  }
* }
* Trees.getByPath('jane.address.postcode', people); // '.' default separator
* // ['postcode', 1000]
* Trees.getByPath('jane.address.country.state', people);
* // ['country', undefined] - since full path could not be resolved.
* ```
* @param path Path, eg `jane.address.postcode`
* @param node Node to look within
* @param options Options for parsing path. By default '.' is used as a separator
* @returns
*/
function getRecordEntryByPath(path, node, options = {}) {
	const paths = [...traceRecordEntryByPath(path, node, options)];
	if (paths.length === 0) throw new Error(`Could not trace path: ${path} `);
	return paths.at(-1);
}
/**
* Enumerates over children of `node` towards the node named in `path`.
* This is useful if you want to get the interim steps to the target node.
* 
* Use {@link getRecordEntryByPath} if you don't care about interim steps.
*
* ```js
* const people = {
*  jane: {
*   address: {
*    postcode: 1000,
*    street: 'West St',
*    city: 'Blahville'
*   },
* colour: 'red'
*  }
* }
* for (const p of Trees.traceByPath('jane.address.street', people)) {
* // { name: "jane", value: { address: { postcode: 1000,street: 'West St', city: 'Blahville' }, colour: 'red'} },
* // { name: "address", value: { postcode: 1000, street: 'West St', city: 'Blahville' } },
* // { name: "street", value: "West St" } }
* }
* ```
*
* Results stop when the path can't be followed any further.
* The last entry will have a name of the last sought path segment, and _undefined_ as its value.
* 
* @param path Path to traverse
* @param node Starting node
* @param options Options for path traversal logic
* @returns
*/
function* traceRecordEntryByPath(path, node, options = {}) {
	resultThrow(nullUndefTest(path, `path`), nullUndefTest(node, `node`));
	const separator = options.separator ?? `.`;
	const pathSplit = path.split(separator);
	const ancestors = [];
	for (const p of pathSplit) {
		const entry = recordEntryChildByName(p, node);
		if (!entry) {
			yield {
				name: p,
				sourceValue: void 0,
				nodeValue: void 0,
				ancestors
			};
			return;
		}
		node = entry.sourceValue;
		yield {
			...entry,
			ancestors: [...ancestors]
		};
		ancestors.push(p);
	}
}
/**
* Generates a name for a node.
* Uses the 'name' property if it exists, otherwise uses `defaultName`
* @param node
* @param defaultName
* @returns
*/
function getNamedRecordEntry(node, defaultName = ``) {
	if (`name` in node && `nodeValue` in node && `sourceValue` in node) return node;
	if (`name` in node) return {
		name: node.name,
		nodeValue: node,
		sourceValue: node
	};
	return {
		name: defaultName,
		nodeValue: node,
		sourceValue: node
	};
}

//#endregion
//#region packages/core/src/records/merge.ts
function mergeObjects(...a) {
	return Object.assign({}, ...a);
}

//#endregion
//#region packages/core/src/records/keys-to-numbers.ts
/**
* Returns a copy of `object` with integer numbers as keys instead of whatever it has.
* ```js
* keysToNumbers({ '1': true }); // Yields: { 1: true }
* ```
* 
* The `onInvalidKey` sets how to handle keys that cannot be converted to integers.
* * 'throw' (default): throws an exception
* * 'ignore': that key & value is ignored
* * 'keep': uses the string key instead
* 
* 
* ```js
* keysToNumber({ hello: 'there' }, `ignore`); // Yields: {  }
* keysToNumber({ hello: 'there' }, `throw`);  // Exception
* keysToNumber({ hello: 'there' }, `keep`);   // Yields: { hello: 'there' }
* ```
* 
* Floating-point numbers will be converted to integer by rounding.
* ```js
* keysToNumbers({ '2.4': 'hello' }); // Yields: { 2: 'hello' }
* ```
* @param object 
* @param onInvalidKey 
* @returns 
*/
const keysToNumbers = (object, onInvalidKey = `throw`) => {
	const returnObject = {};
	for (const entry of Object.entries(object)) {
		const asNumber = Number.parseInt(entry[0]);
		if (Number.isNaN(asNumber)) switch (onInvalidKey) {
			case `throw`: throw new TypeError(`Cannot convert key '${entry[0]}' to an integer`);
			case `ignore`: continue;
			case `keep`: {
				returnObject[entry[0]] = entry[1];
				continue;
			}
			default: throw new Error(`Param 'onInvalidKey' should be: 'throw', 'ignore' or 'keep'.`);
		}
		returnObject[asNumber] = entry[1];
	}
	return returnObject;
};

//#endregion
//#region packages/core/src/records/pathed.ts
const getEntries = (target, deepProbe) => {
	if (target === void 0) throw new Error(`Param 'target' is undefined`);
	if (target === null) throw new Error(`Param 'target' is null`);
	if (typeof target !== `object`) throw new Error(`Param 'target' is not an object (got: ${typeof target})`);
	if (deepProbe) {
		const entries = [];
		for (const field in target) {
			const value = target[field];
			if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
		}
		return entries;
	} else return Object.entries(target);
};
/**
* Scans object, producing a list of changed fields where B's value (newer) differs from A (older).
* 
* Options:
* - `deepEntries` (_false_): If _false_ Object.entries are used to scan the object. However this won't work for some objects, eg event args, thus _true_ is needed.
* - `eq` (JSON.stringify): By-value comparison function
* - `includeMissingFromA` (_false): If _true_ includes fields present on B but missing on A.
* - `asPartial` (_false): If _true_, treats B as a partial update to B. This means that things missing from B are not considered removals.
* @param a 'Old' value
* @param b 'New' value
* @param options Options for comparison
* @returns 
*/
function* compareData(a, b, options = {}) {
	if (typeof a === `undefined`) {
		yield {
			path: options.pathPrefix ?? ``,
			value: b,
			state: `added`
		};
		return;
	}
	if (typeof b === `undefined`) {
		yield {
			path: options.pathPrefix ?? ``,
			previous: a,
			value: void 0,
			state: `removed`
		};
		return;
	}
	const asPartial = options.asPartial ?? false;
	const undefinedValueMeansRemoved = options.undefinedValueMeansRemoved ?? false;
	const pathPrefix = options.pathPrefix ?? ``;
	const deepEntries = options.deepEntries ?? false;
	const eq = options.eq ?? isEqualContextString;
	const includeMissingFromA = options.includeMissingFromA ?? false;
	const includeParents = options.includeParents ?? false;
	if (isPrimitive(a) && isPrimitive(b)) {
		if (a !== b) yield {
			path: pathPrefix,
			value: b,
			previous: a,
			state: `change`
		};
		return;
	}
	if (isPrimitive(b)) {
		yield {
			path: pathPrefix,
			value: b,
			previous: a,
			state: `change`
		};
		return;
	}
	const entriesA = getEntries(a, deepEntries);
	const entriesAKeys = /* @__PURE__ */ new Set();
	for (const [key, valueA] of entriesA) {
		entriesAKeys.add(key);
		const keyOfAInB = key in b;
		const valueOfKeyInB = b[key];
		if (typeof valueA === `object` && valueA !== null) if (keyOfAInB) if (valueOfKeyInB === void 0) throw new Error(`Pathed.compareData Value for key ${key} is undefined`);
		else {
			const sub = [...compareData(valueA, valueOfKeyInB, {
				...options,
				pathPrefix: pathPrefix + key + `.`
			})];
			if (sub.length > 0) {
				for (const s of sub) yield s;
				if (includeParents) yield {
					path: pathPrefix + key,
					value: b[key],
					previous: valueA,
					state: `change`
				};
			}
		}
		else {
			if (asPartial) continue;
			yield {
				path: pathPrefix + key,
				value: void 0,
				previous: valueA,
				state: `removed`
			};
		}
		else {
			const subPath = pathPrefix + key;
			if (keyOfAInB) {
				if (valueOfKeyInB === void 0 && undefinedValueMeansRemoved) yield {
					path: subPath,
					previous: valueA,
					value: void 0,
					state: `removed`
				};
				else if (!eq(valueA, valueOfKeyInB, subPath)) yield {
					path: subPath,
					previous: valueA,
					value: valueOfKeyInB,
					state: `change`
				};
			} else {
				if (asPartial) continue;
				yield {
					path: subPath,
					previous: valueA,
					value: void 0,
					state: `removed`
				};
			}
		}
	}
	if (includeMissingFromA) {
		const entriesB = getEntries(b, deepEntries);
		for (const [key, valueB] of entriesB) {
			if (entriesAKeys.has(key)) continue;
			yield {
				path: pathPrefix + key,
				previous: void 0,
				value: valueB,
				state: `added`
			};
		}
	}
}
/**
* Returns a copy of `source` with `changes` applied.
* @param source 
* @param changes 
*/
const applyChanges = (source, changes) => {
	for (const change of changes) source = updateByPath(source, change.path, change.value);
	return source;
};
/**
* Returns a copy of `target` object with a specified path changed to `value`.
* 
* ```js
* const a = {
*  message: `Hello`,
*  position: { x: 10, y: 20 }
* }
* 
* const a1 = updateByPath(a, `message`, `new message`);
* // a1 = { message: `new message`, position: { x: 10, y: 20 }}
* const a2 = updateByPath(a, `position.x`, 20);
* // a2 = { message: `hello`, position: { x: 20, y: 20 }}
* ```
* 
* Paths can also be array indexes:
* ```js
* updateByPath([`a`,`b`,`c`], 2, `d`);
* // Yields: [ `a`, `b`, `d` ]
* ```
* 
* By default, only existing array indexes can be updated. Use the `allowShapeChange` parameter 
* to allow setting arbitrary indexes.
* ```js
* // Throws because array index 3 is undefined
* updateByPath([ `a`, `b`, `c` ], `3`, `d`);
* 
* // With allowShapeChange flag
* updateByPath([ `a`, `b`, `c` ], `3`, `d`, true);
* // Returns: [ `a`, `b`, `c`, `d` ]
* ```
* 
* Throws an error if:
* * `path` cannot be resolved (eg. `position.z` in the above example)
* * `value` applied to `target` results in the object having a different shape (eg missing a field, field
* changing type, or array index out of bounds). Use `allowShapeChange` to suppress this error.
* * Path is undefined or not a string
* * Target is undefined/null
* @param target Object to update
* @param path Path to set value
* @param value Value to set
* @param allowShapeChange By default _false_, throwing an error if an update change the shape of the original object.
* @returns 
*/
const updateByPath = (target, path, value, allowShapeChange = false) => {
	if (path === void 0) throw new Error(`Parameter 'path' is undefined`);
	if (typeof path !== `string`) throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
	if (target === void 0) throw new Error(`Parameter 'target' is undefined`);
	if (target === null) throw new Error(`Parameter 'target' is null`);
	const split = path.split(`.`);
	const r = updateByPathImpl(target, split, value, allowShapeChange);
	return r;
};
const updateByPathImpl = (o, split, value, allowShapeChange) => {
	if (split.length === 0) {
		if (allowShapeChange) return value;
		if (Array.isArray(o) && !Array.isArray(value)) throw new Error(`Expected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
		if (!Array.isArray(o) && Array.isArray(value)) throw new Error(`Unexpected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
		if (typeof o !== typeof value) throw new Error(`Cannot reassign object type. (${typeof o} -> ${typeof value}). Set allowShapeChange=true to ignore.`);
		if (typeof o === `object` && !Array.isArray(o)) {
			const c = compareObjectKeys(o, value);
			if (c.a.length > 0) throw new Error(`New value is missing key(s): ${c.a.join(`,`)}`);
			if (c.b.length > 0) throw new Error(`New value cannot add new key(s): ${c.b.join(`,`)}`);
		}
		return value;
	}
	const start = split.shift();
	if (!start) return value;
	const isInt = isInteger(start);
	if (isInt && Array.isArray(o)) {
		const index = Number.parseInt(start);
		if (index >= o.length && !allowShapeChange) throw new Error(`Array index ${index.toString()} is outside of the existing length of ${o.length.toString()}. Use allowShapeChange=true to permit this.`);
		const copy = [...o];
		copy[index] = updateByPathImpl(copy[index], split, value, allowShapeChange);
		return copy;
	} else if (start in o) {
		const copy = { ...o };
		copy[start] = updateByPathImpl(copy[start], split, value, allowShapeChange);
		return copy;
	} else throw new Error(`Path ${start} not found in data`);
};
/**
* Gets the data at `path` in `object`. Assumes '.' separates each segment of path.
* ```js
* getField({ name: { first: `Thom`, last: `Yorke` }}, `name.first`); // 'Thom'
* getField({ colours: [`red`, `green`, `blue` ]}, `colours.1`); // `green`
* ```
* 
* Returns _undefined_ if path could not be resolved.
* 
* Throws if:
* * `path` is not a string or empty
* * `object` is _undefined_ or null
* @param object 
* @param path 
* @returns 
*/
const getField = (object, path) => {
	if (typeof path !== `string`) throw new Error(`Param 'path' ought to be a string. Got: '${typeof path}'`);
	if (path.length === 0) throw new Error(`Param string 'path' is empty`);
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (object === null) throw new Error(`Param 'object' is null`);
	const split = path.split(`.`);
	const v = getFieldImpl(object, split);
	return v;
};
const getFieldImpl = (object, split) => {
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (split.length === 0) throw new Error(`Path has run out`);
	const start = split.shift();
	if (!start) throw new Error(`Unexpected empty split path`);
	const isInt = isInteger(start);
	if (isInt && Array.isArray(object)) {
		const index = Number.parseInt(start);
		if (typeof object[index] === `undefined`) return {
			success: false,
			error: `Index '${index}' does not exist. Length: ${object.length}`
		};
		if (split.length === 0) return {
			value: object[index],
			success: true
		};
		else return getFieldImpl(object[index], split);
	} else if (typeof object === `object` && start in object) if (split.length === 0) return {
		value: object[start],
		success: true
	};
	else return getFieldImpl(object[start], split);
	else return {
		success: false,
		error: `Path '${start}' not found`
	};
};
/**
* Iterates 'paths' for all the fields on `o`
* ```
* const d = {
*  accel: { x: 1, y: 2, z: 3 },
*  gyro: { x: 4, y: 5, z: 6 }
* };
* const paths = [...getFieldPaths(d)];
* // Yields [ `accel`, `gyro`, `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
* ```
*
* Use {@link getField} to fetch data based on a path
*
* If object is _null_ or _undefined_, no results are returned.
* 
* If `onlyLeaves` is _true_ (default: _false_), only 'leaf' nodes are included. 
* Leaf nodes are those that contain a primitive value.
* ```js
* const paths = getFieldPaths(d, true);
* // Yields [ `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
* ```
*
* @param object Object to get paths for.
* @param onlyLeaves If true, only paths with a primitive value are returned.
* @returns
*/
function* getPaths(object, onlyLeaves = false) {
	if (object === void 0 || object === null) return;
	const iter = recordEntriesDepthFirst(object);
	for (const c of iter) {
		if (c.nodeValue === void 0 && onlyLeaves) continue;
		let path = c.name;
		if (c.ancestors.length > 0) path = c.ancestors.join(`.`) + `.` + path;
		yield path;
	}
}
/**
* Returns a representation of the object as a set of paths and data.
* ```js
* const o = { name: `hello`, size: 20, colour: { r:200, g:100, b:40 } }
* const pd = [...getPathsAndData(o)];
* // Yields:
* // [ 
* // { path: `name`, value: `hello` },
* // { path: `size`, value: `20` },
* // { path: `colour.r`, value: `200` },
* // { path: `colour.g`, value: `100` },
* // { path: `colour.b`, value: `40` }
* //]
* ```
* @param o Object to get paths and data for
* @param maxDepth Set maximum recursion depth. By default unlimited.
* @param prefix Manually set a path prefix if it's necessary
* @returns 
*/
function* getPathsAndData(o, onlyLeaves = false, maxDepth = Number.MAX_SAFE_INTEGER, prefix = ``) {
	if (o === null) return;
	if (o === void 0) return;
	yield* getPathsAndDataImpl(o, prefix, onlyLeaves, maxDepth);
}
function* getPathsAndDataImpl(o, prefix, onlyLeaves = false, maxDepth) {
	if (maxDepth <= 0) return;
	if (typeof o !== `object`) return;
	for (const entries of Object.entries(o)) {
		const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
		const value = entries[1];
		const leaf = typeof value !== `object`;
		if (onlyLeaves && leaf || !onlyLeaves) yield {
			path: sub,
			value
		};
		yield* getPathsAndDataImpl(value, sub, onlyLeaves, maxDepth - 1);
	}
}

//#endregion
//#region packages/core/src/records/index.ts
var records_exports = {};
__export(records_exports, {
	applyChanges: () => applyChanges,
	changedObjectDataFields: () => changedObjectDataFields,
	cloneFromFields: () => cloneFromFields,
	compareArrays: () => compareArrays,
	compareData: () => compareData,
	compareObjectData: () => compareObjectData,
	compareObjectKeys: () => compareObjectKeys,
	getField: () => getField,
	getPaths: () => getPaths,
	getPathsAndData: () => getPathsAndData,
	getRecordEntryByPath: () => getRecordEntryByPath,
	keysToNumbers: () => keysToNumbers,
	mapObjectByObject: () => mapObjectByObject,
	mapObjectKeys: () => mapObjectKeys,
	mapObjectShallow: () => mapObjectShallow,
	mergeObjects: () => mergeObjects,
	prettyPrintEntries: () => prettyPrintEntries,
	recordChildren: () => recordChildren,
	recordEntriesDepthFirst: () => recordEntriesDepthFirst$1,
	recordEntryPrettyPrint: () => recordEntryPrettyPrint,
	traceRecordEntryByPath: () => traceRecordEntryByPath,
	updateByPath: () => updateByPath
});
/**
* Maps the keys of an object, returning a transformed object.
* ```js
* const input = {
*  hello: `there`,
*  chap: `chappie`
* }
* 
* mapObjectKeys(input, key => key.toUppercase());
* 
* // Yields: { HELLO: `there`, CHAP: `chappie` }
* ```
* @param object 
* @param mapFunction 
* @returns 
*/
const mapObjectKeys = (object, mapFunction) => {
	const destinationObject = {};
	for (const entries of Object.entries(object)) {
		const key = mapFunction(entries[0]);
		destinationObject[key] = entries[1];
	}
	return destinationObject;
};

//#endregion
//#region packages/core/src/trackers/index.ts
var trackers_exports = {};

//#endregion
export { align, alignById, cloneFromFields$1 as cloneFromFields, compareArrays$1 as compareArrays, compareData$1 as compareData, compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, getErrorMessage, getField$1 as getField, getPathsAndData$1 as getPathsAndData, hasLast, intervalToMs, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, logSet, mapObjectShallow$1 as mapObjectShallow, numericComparer, promiseFromEvent, records_exports, resolve, resolveFields, resolveFieldsSync, resolveLogOption, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, src_exports, toStringDefault, toStringOrdered, trackers_exports, unique, uniqueInstances, updateByPath$1 as updateByPath };
//# sourceMappingURL=src-Cjy4Jx5o.js.map