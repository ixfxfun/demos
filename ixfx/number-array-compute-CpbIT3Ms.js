//#region ../packages/numbers/src/number-array-compute.ts
/**
* Calculate the min, max, total, average and count of input array `data`.
* ```js
* const { total, min, max, avg, count } = numberArrayCompute([ 1, 2, 3 ]);
* ```
* @param data 
* @param opts 
* @returns 
*/
const numberArrayCompute = (data, opts = {}) => {
	if (data.length === 0) return {
		total: Number.NaN,
		min: Number.NaN,
		max: Number.NaN,
		avg: Number.NaN,
		count: Number.NaN
	};
	const nonNumbers = opts.nonNumbers ?? `throw`;
	let total = 0;
	let min = Number.MAX_SAFE_INTEGER;
	let max = Number.MIN_SAFE_INTEGER;
	let count = 0;
	for (let index = 0; index < data.length; index++) {
		let value = data[index];
		if (typeof value !== `number`) {
			if (nonNumbers === `ignore`) continue;
			if (nonNumbers === `throw`) throw new Error(`Param 'data' contains a non-number at index: ${index.toString()}`);
			if (nonNumbers === `nan`) value = Number.NaN;
		}
		if (Number.isNaN(value)) continue;
		min = Math.min(min, value);
		max = Math.max(max, value);
		total += value;
		count++;
	}
	return {
		total,
		max,
		min,
		count,
		avg: total / count
	};
};

//#endregion
export { numberArrayCompute as numberArrayCompute$2 };
//# sourceMappingURL=number-array-compute-CpbIT3Ms.js.map