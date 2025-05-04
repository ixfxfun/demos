//#region ../packages/numbers/src/numeric-arrays.ts
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
* import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
* const v = [ 10, 40, 5 ];
* Numbers.minIndex(v); // Yields 2
* ```
* @param data Array of numbers
* @returns Index of smallest value
*/
const minIndex = (...data) => data.reduce((bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex, 0);
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
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
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
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
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
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
export { dotProduct as dotProduct$2, maxFast as maxFast$2, minFast as minFast$2, minIndex as minIndex$2, totalFast as totalFast$2 };
//# sourceMappingURL=numeric-arrays-l1_6mL8N.js.map