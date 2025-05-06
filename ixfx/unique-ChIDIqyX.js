import { toStringDefault$3 as toStringDefault } from "./is-equal-DWRSOMvL.js";

//#region ../packages/core/src/elapsed.ts
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
//#region ../packages/arrays/src/unique.ts
/**
* Combines the values of one or more arrays, removing duplicates.
* Compares based on a string representation of object. Uses a Set
* to avoid unnecessary comparisons, perhaps faster than `uniqueDeep`.
* 
* ```js
* const v = Arrays.unique([ [1, 2, 3, 4], [ 3, 4, 5, 6] ]);
* // [ 1, 2, 3, 4, 5, 6]
* ```
*
* A single array can be provided as well:
* ```js
* const v = Arrays.unique([ 1, 2, 3, 1, 2, 3 ]);
* // [ 1, 2, 3 ]
* ```
* 
* By default uses JSON.toString() to compare values.
* 
* See also:
* * {@link intersection}: Overlap between two arrays
* * {@link additionalValues}: Yield values from an iterable not present in the other
* * {@link containsDuplicateValues}: Returns true if array contains duplicates
* @param arrays
* @param comparer
* @returns
*/
const unique = (arrays, toString = toStringDefault) => {
	const matching = new Set();
	const t = [];
	const flattened = arrays.flat(10);
	for (const a of flattened) {
		const stringRepresentation = toString(a);
		if (matching.has(stringRepresentation)) continue;
		matching.add(stringRepresentation);
		t.push(a);
	}
	return t;
};

//#endregion
export { elapsedInfinity as elapsedInfinity$2, elapsedInterval as elapsedInterval$2, elapsedSince as elapsedSince$2, unique as unique$6 };
//# sourceMappingURL=unique-ChIDIqyX.js.map