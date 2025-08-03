//#region ../core/dist/src/elapsed.js
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
export { elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince };
//# sourceMappingURL=elapsed-DEWYfvwx.js.map