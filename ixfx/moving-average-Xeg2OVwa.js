import { numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-DtsSfeyJ.js";

//#region ../packages/numbers/src/moving-average.ts
const PiPi = Math.PI * 2;
/**
* A moving average calculator (exponential weighted moving average) which does not keep track of
* previous samples. Less accurate, but uses less system resources.
*
* The `scaling` parameter determines smoothing. A value of `1` means that
* the latest value is used as the average - that is, no smoothing. Higher numbers
* introduce progressively more smoothing by weighting the accumulated prior average more heavily.
*
* ```
* const ma = movingAverageLight(); // default scaling of 3
* ma(50);  // 50
* ma(100); // 75
* ma(75);  // 75
* ma(0);   // 50
* ```
*
* Note that the final average of 50 is pretty far from the last value of 0. To make it more responsive,
* we could use a lower scaling factor: `movingAverageLight(2)`. This yields a final average of `37.5` instead.
*
* @param scaling Scaling factor. 1 is no smoothing. Default: 3
* @returns Function that adds to average.
*/
const movingAverageLight = (scaling = 3) => {
	resultThrow(numberTest(scaling, `aboveZero`, `scaling`));
	let average = 0;
	let count = 0;
	return (v) => {
		const r = numberTest(v, ``, `v`);
		if (r[0] && v !== void 0) {
			count++;
			average = average + (v - average) / Math.min(count, scaling);
		}
		return average;
	};
};

//#endregion
export { movingAverageLight as movingAverageLight$2 };
//# sourceMappingURL=moving-average-Xeg2OVwa.js.map