import { numberTest, resultThrow } from "./numbers-C359_5A6.js";
import { clamper } from "./clamp-BXRKKkSg.js";

//#region ../numbers/dist/src/scale.js
/**
* Scales `v` from an input range to an output range (aka `map`)
*
* For example, if a sensor's useful range is 100-500, scale it to a percentage:
*
* ```js
*
* scale(sensorReading, 100, 500, 0, 1);
* ```
*
* `scale` defaults to a percentage-range output, so you can get away with:
* ```js
* scale(sensorReading, 100, 500);
* ```
*
* If `v` is outside of the input range, it will likewise be outside of the output range.
* Use {@link scaleClamped} to clip value to range.
*
* If inMin and inMax are equal, outMax will be returned.
*
* An easing function can be provided for non-linear scaling. In this case
* the input value is 'pre scaled' using the function before it is applied to the
* output range.
*
* ```js
* scale(sensorReading, 100, 500, 0, 1, Easings.gaussian());
* ```
* @param v Value to scale
* @param inMin Input minimum
* @param inMax Input maximum
* @param outMin Output minimum. If not specified, 0
* @param outMax Output maximum. If not specified, 1
* @param easing Easing function
* @returns Scaled value
*/
const scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
/**
* Returns a scaling function
* @param inMin Input minimum
* @param inMax Input maximum
* @param outMin Output minimum. If not specified, 0
* @param outMax Output maximum. If not specified, 1
* @param easing Easing function
* @param clamped If true, value is clamped. Default: false
* @returns
*/
const scaler = (inMin, inMax, outMin, outMax, easing, clamped) => {
	resultThrow(numberTest(inMin, `finite`, `inMin`), numberTest(inMax, `finite`, `inMax`));
	const oMax = outMax ?? 1;
	const oMin = outMin ?? 0;
	const clampFunction = clamped ? clamper(outMin, outMax) : void 0;
	return (v) => {
		if (inMin === inMax) return oMax;
		let a = (v - inMin) / (inMax - inMin);
		if (easing !== void 0) a = easing(a);
		const x = a * (oMax - oMin) + oMin;
		if (clampFunction) return clampFunction(x);
		return x;
	};
};
/**
* Returns a two-way scaler
* ```js
* // Input range 0..100, output range 0..1
* const s = scalerTwoWay(0,100,0,1);
*
* // Scale from input to output
* s.out(50); // 0.5
*
* // Scale from output range to input
* s.in(1); // 100
* ```
* @param inMin
* @param inMax
* @param outMin
* @param outMax
* @returns
*/
const scalerTwoWay = (inMin, inMax, outMin = 0, outMax = 1, clamped = false, easing) => {
	const toOut = scaler(inMin, inMax, outMin, outMax, easing, clamped);
	const toIn = scaler(outMin, outMax, inMin, inMax, easing, clamped);
	return {
		out: toOut,
		in: toIn
	};
};

//#endregion
export { scale, scaler, scalerTwoWay };
//# sourceMappingURL=scale-DHjtm9T-.js.map