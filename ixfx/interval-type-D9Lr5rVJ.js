import { integerTest$2 as integerTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-DtsSfeyJ.js";

//#region ../packages/core/src/util/round.ts
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
//#region ../packages/core/src/interval-type.ts
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
export { elapsedToHumanString as elapsedToHumanString$2, intervalToMs as intervalToMs$2 };
//# sourceMappingURL=interval-type-D9Lr5rVJ.js.map