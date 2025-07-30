import { numberTest, resultThrow } from "./src-C3Fpyyz5.js";
import { defaultToString, intervalToMs } from "./interval-type-CEZs43zj.js";

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
*
* Returns:
* * 0: values are equal
* * negative: `a` should be before `b`
* * positive: `a` should come after `b`
* @param a
* @param b
* @returns
*/
const numericComparer = (a, b) => {
	if (a === b) return 0;
	if (a > b) return 1;
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
//#region packages/core/dist/src/elapsed.js
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
//#region packages/core/dist/src/promise-from-event.js
const promiseFromEvent = (target, name) => {
	return new Promise((resolve) => {
		const handler = (...args) => {
			target.removeEventListener(name, handler);
			if (Array.isArray(args) && args.length === 1) resolve(args[0]);
			else resolve(args);
		};
		target.addEventListener(name, handler);
	});
};

//#endregion
//#region packages/core/dist/src/sleep.js
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
	if (timeoutMs === 0) return new Promise((resolve) => requestAnimationFrame((_) => {
		resolve(value);
	}));
	else return new Promise((resolve, reject) => {
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
			resolve(value);
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
//#region packages/process/dist/src/basic.js
/**
* Outputs the current largest-seen value
* @returns
*/
const max = () => {
	let max$1 = Number.MIN_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			max$1 = Math.max(subValue, max$1);
		}
		return max$1;
	};
	return compute;
};
/**
* Outputs the current smallest-seen value
* @returns
*/
const min = () => {
	let min$1 = Number.MAX_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			min$1 = Math.min(subValue, min$1);
		}
		return min$1;
	};
	return compute;
};
/**
* Returns a sum of values
* @returns
*/
const sum = () => {
	let t = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			t += subValue;
		}
		return t;
	};
	return compute;
};
/**
* Returns the current average of input values
* @returns
*/
const average = () => {
	let total = 0;
	let tally$1 = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			tally$1++;
			total += subValue;
		}
		return total / tally$1;
	};
	return compute;
};
/**
* Returns the tally (ie number of) values
* @param countArrayItems
* @returns
*/
const tally = (countArrayItems) => {
	let t = 0;
	const compute = (value) => {
		if (countArrayItems) if (Array.isArray(value)) t += value.length;
		else t++;
		else t++;
		return t;
	};
	return compute;
};
/**
* Returns the 'best' value seen so far as determined by a ranking function.
* This is similar to min/max but usable for objects.
* @param r
* @param options
* @returns
*/
function rank(r, options = {}) {
	const includeType = options.includeType;
	const emitEqualRanked = options.emitEqualRanked ?? false;
	const emitRepeatHighest = options.emitRepeatHighest ?? false;
	let best;
	return (value) => {
		if (includeType && typeof value !== includeType) return;
		if (best === void 0) {
			best = value;
			return best;
		} else {
			const result = r(value, best);
			if (result == `a`) {
				best = value;
				return best;
			} else if (result === `eq` && emitEqualRanked) return best;
			else if (emitRepeatHighest) return best;
		}
	};
}

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
const addValue = (map, hasher, collisionPolicy, ...values) => {
	const m = map === void 0 ? /* @__PURE__ */ new Map() : new Map(map);
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
const sortByValueProperty = (map, property, compareFunction) => {
	const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
	return [...map.entries()].sort((aE, bE) => {
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
const hasAnyValue = (map, value, comparer) => {
	const entries = [...map.entries()];
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
function* filterValues(map, predicate) {
	for (const v of map.values()) if (predicate(v)) yield v;
}
/**
* Copies data to an array
* @param map
* @returns
*/
const toArray = (map) => [...map.values()];
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
const findValue = (map, predicate) => [...map.values()].find((v) => predicate(v));
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
const some = (map, predicate) => [...map.values()].some((v) => predicate(v));
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
const getOrGenerate = (map, fn) => async (key, args) => {
	let value = map.get(key);
	if (value !== void 0) return value;
	value = await fn(key, args);
	if (value === void 0) throw new Error(`fn returned undefined`);
	map.set(key, value);
	return value;
};

//#endregion
export { addValue, average, comparerInverse, defaultComparer, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, filterValues, findBySomeKey, findValue, getOrGenerate, hasAnyValue, jsComparer, max, min, numericComparer, promiseFromEvent, rank, sleep, sleepWhile, some, sortByValueProperty, sum, tally, toArray, zipKeyValue };
//# sourceMappingURL=maps-C72wxMfj.js.map