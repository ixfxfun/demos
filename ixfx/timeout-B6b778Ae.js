import { integerTest$2 as integerTest, resultThrow$2 as resultThrow } from "./numbers-DtsSfeyJ.js";
import { intervalToMs$2 as intervalToMs } from "./interval-type-D9Lr5rVJ.js";

//#region ../packages/flow/src/timeout.ts
/**
* Returns a {@link Timeout} that can be triggered, cancelled and reset. Use {@link continuously} for interval-
* based loops.
*
* Once `start()` is called, `callback` will be scheduled to execute after `interval`.
* If `start()` is called again, the waiting period will be reset to `interval`.
*
* @example Essential functionality
* ```js
* const fn = () => {
*  console.log(`Executed`);
* };
* const t = timeout(fn, 60*1000);
* t.start();   // After 1 minute `fn` will run, printing to the console
* ```
*
* @example Control execution functionality
* ```
* t.cancel();  // Cancel it from running
* t.start();   // Schedule again after 1 minute
* t.start(30*1000); // Cancel that, and now scheduled after 30s
* 
* // Get the current state of timeout
* t.runState;    // "idle", "scheduled" or "running"
* ```
*
* Callback function receives any additional parameters passed in from start. This can be useful for passing through event data:
*
* @example
* ```js
* const t = timeout( (elapsedMs, ...args) => {
*  // args contains event data
* }, 1000);
* el.addEventListener(`click`, t.start);
* ```
*
* Asynchronous callbacks can be used as well:
* ```js
* timeout(async () => {...}, 100);
* ```
*
* If you don't expect to need to control the timeout, consider using {@link delay},
* which can run a given function after a specified delay.
* @param callback
* @param interval
* @returns {@link Timeout}
*/
const timeout = (callback, interval) => {
	if (callback === void 0) throw new Error(`callback parameter is undefined`);
	const intervalMs = intervalToMs(interval);
	resultThrow(integerTest(intervalMs, `aboveZero`, `interval`));
	let timer;
	let startedAt = 0;
	let startCount = 0;
	let startCountTotal = 0;
	let state = `idle`;
	const clear = () => {
		startedAt = 0;
		globalThis.clearTimeout(timer);
		state = `idle`;
	};
	const start = async (altInterval = interval, args) => {
		const p = new Promise((resolve, reject) => {
			startedAt = performance.now();
			const altTimeoutMs = intervalToMs(altInterval);
			const it = integerTest(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
			if (!it[0]) {
				reject(new Error(it[1]));
				return;
			}
			switch (state) {
				case `scheduled`: {
					cancel();
					break;
				}
				case `running`: break;
			}
			state = `scheduled`;
			timer = globalThis.setTimeout(async () => {
				if (state !== `scheduled`) {
					console.warn(`Timeout skipping execution since state is not 'scheduled'`);
					clear();
					return;
				}
				const args_ = args ?? [];
				startCount++;
				startCountTotal++;
				state = `running`;
				await callback(performance.now() - startedAt, ...args_);
				state = `idle`;
				clear();
				resolve();
			}, altTimeoutMs);
		});
		return p;
	};
	const cancel = () => {
		if (state === `idle`) return;
		clear();
	};
	return {
		start,
		cancel,
		get runState() {
			return state;
		},
		get startCount() {
			return startCount;
		},
		get startCountTotal() {
			return startCountTotal;
		}
	};
};

//#endregion
export { timeout as timeout$2 };
//# sourceMappingURL=timeout-B6b778Ae.js.map