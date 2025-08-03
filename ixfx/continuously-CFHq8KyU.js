import { integerTest, resultThrow } from "./numbers-C359_5A6.js";
import { intervalToMs } from "./interval-type-Y39UZyyQ.js";

//#region ../core/dist/src/continuously.js
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
const continuously = (callback, interval = 0, options = {}) => {
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
export { continuously };
//# sourceMappingURL=continuously-CFHq8KyU.js.map