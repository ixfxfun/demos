import { throwNumberTest } from "./numbers-BSDDLVnO.js";
import { clamp$2 as clamp } from "./clamp-Dz6ciLlE.js";
import { wrap$4 as wrap } from "./scale-DCLEEQNP.js";

//#region ../packages/numbers/src/pi-pi.ts
const piPi = Math.PI * 2;

//#endregion
//#region ../packages/numbers/src/interpolate.ts
/**
* Interpolates between `a` and `b` by `amount`. Aka `lerp`.
*
* [ixfx Guide on Interpolation](https://ixfx.fun/data/interpolation/overview/)
*
* @example Get the halfway point between 30 and 60
* ```js
* interpolate(0.5, 30, 60);
* ```
*
* See also {@link interpolatorStepped} and {@link interpolatorInterval} for functions
* which help to manage progression from A->B over steps or interval.
* 
* Usually interpolation amount is on a 0...1 scale, inclusive. What is the interpolation result
* if this scale is exceeded? By default it is clamped to 0..1, so the return value is always between `a` and `b` (inclusive).
* 
* Alternatively, set the `limits` option to process `amount`:
* * 'wrap': wrap amount, eg 1.5 is the same as 0.5, 2 is the same as 1
* * 'ignore': allow exceeding values. eg 1.5 will yield b*1.5.
* * 'clamp': default behaviour of clamping interpolation amount to 0..1
* 
* Interpolation can be non-linear using 'easing' option or 'transform' funciton.
* ```js
* interpolate(0.1, 0, 100, { easing: `quadIn` });
* ```
* To interpolate certain types: {@link Visual.Colour.interpolator | Visual.Colour.interpolator }, {@link Geometry.Points.interpolate | Points.interpolate}.
* 
* There are a few variations when calling `interpolate`, depending on what parameters are fixed.
* * `interpolate(amount)`: returns a function that needs a & b 
* * `interpolate(a, b)`:  returns a function that needs the interpolation amount
*/
function interpolate(pos1, pos2, pos3, pos4) {
	let amountProcess;
	let limits = `clamp`;
	const handleAmount = (amount) => {
		if (amountProcess) amount = amountProcess(amount);
		if (limits === void 0 || limits === `clamp`) amount = clamp(amount);
		else if (limits === `wrap`) {
			if (amount > 1) amount = amount % 1;
			else if (amount < 0) amount = 1 + amount % 1;
		}
		return amount;
	};
	const doTheEase = (_amt, _a, _b) => {
		throwNumberTest(_a, ``, `a`);
		throwNumberTest(_b, ``, `b`);
		throwNumberTest(_amt, ``, `amount`);
		_amt = handleAmount(_amt);
		return (1 - _amt) * _a + _amt * _b;
	};
	const readOpts = (o = {}) => {
		if (o.transform) {
			if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
			amountProcess = o.transform;
		}
		limits = o.limits ?? `clamp`;
	};
	const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
	if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
	if (typeof pos2 === `number`) {
		let a;
		let b;
		if (pos3 === void 0 || typeof pos3 === `object`) {
			a = pos1;
			b = pos2;
			readOpts(pos3);
			return (amount) => doTheEase(amount, a, b);
		} else if (typeof pos3 === `number`) {
			a = pos2;
			b = pos3;
			readOpts(pos4);
			return doTheEase(pos1, a, b);
		} else throw new Error(`Values for 'a' and 'b' not defined`);
	} else if (pos2 === void 0 || typeof pos2 === `object`) {
		const amount = handleAmount(pos1);
		readOpts(pos2);
		throwNumberTest(amount, ``, `amount`);
		return (aValue, bValue) => rawEase(amount, aValue, bValue);
	}
}
/**
* Interpolate between angles `a` and `b` by `amount`. Angles are in radians.
*
* ```js
* import { interpolateAngle } from 'https://unpkg.com/ixfx/dist/data.js';
* interpolateAngle(0.5, Math.PI, Math.PI/2);
* ```
* @param amount
* @param aRadians Start angle (radian)
* @param bRadians End angle (radian)
* @returns
*/
const interpolateAngle = (amount, aRadians, bRadians, options) => {
	const t = wrap(bRadians - aRadians, 0, piPi);
	return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t), options);
};

//#endregion
export { interpolate as interpolate$6, interpolateAngle as interpolateAngle$4 };
//# sourceMappingURL=interpolate-CTwhqCyQ.js.map