import { numberTest } from "./numbers-BSDDLVnO.js";

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

//#endregion
export { intervalToMs as intervalToMs$2 };
//# sourceMappingURL=interval-type-CiSB_YRT.js.map