//#region ../numbers/dist/src/numeric-arrays.js
/**
* Returns an array of all valid numbers from `data`
*
* @param data
* @returns
*/
const validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
/**
* Returns the dot product of arbitrary-sized arrays. Assumed they are of the same length.
* @param values
* @returns
*/
const dotProduct = (values) => {
	let r = 0;
	const length = values[0].length;
	for (let index = 0; index < length; index++) {
		let t = 0;
		for (const [p, value] of values.entries()) if (p === 0) t = value[index];
		else t *= value[index];
		r += t;
	}
	return r;
};
/**
* Returns the index of the smallest value.
*
* ```js
* const v = [ 10, 40, 5 ];
* Numbers.minIndex(v); // Yields 2
* ```
* @param data Array of numbers
* @returns Index of smallest value
*/
const minIndex = (...data) => data.reduce((bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex, 0);
/**
* Returns the maximum number out of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* Numbers.max(100, 200, 50); // 200
* ```
* @param data List of numbers
* @returns Maximum number
*/
const max = (data) => Math.max(...validNumbers(data));
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* Numbers.maxFast([ 10, 0, 4 ]); // 10
* ```
* @param data
* @returns Maximum
*/
const maxFast = (data) => {
	let m = Number.MIN_SAFE_INTEGER;
	for (const datum of data) m = Math.max(m, datum);
	return m;
};
/**
* Returns the total of `data` without pre-filtering for speed.
*
* For most uses, {@link total} should suffice.
*
* ```js
* Numbers.totalFast([ 10, 0, 4 ]); // 14
* ```
* @param data
* @returns Maximum
*/
const totalFast = (data) => {
	let m = 0;
	for (const datum of data) m += datum;
	return m;
};
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* Numbers.minFast([ 10, 0, 100 ]); // 0
* ```
* @param data
* @returns Maximum
*/
const minFast = (data) => {
	let m = Number.MIN_SAFE_INTEGER;
	for (const datum of data) m = Math.min(m, datum);
	return m;
};

//#endregion
export { dotProduct, max, maxFast, minFast, minIndex, totalFast };
//# sourceMappingURL=numeric-arrays-DwffyOZ3.js.map