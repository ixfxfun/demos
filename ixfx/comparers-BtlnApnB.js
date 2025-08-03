import { defaultToString } from "./to-string-Dg1sJUf1.js";

//#region ../core/dist/src/comparers.js
/**
* Sort numbers in ascending order.
*
* ```js
* [10, 4, 5, 0].sort(numericComparer);
* // Yields: [0, 4, 5, 10]
* [10, 4, 5, 0].sort(comparerInverse(numericComparer));
* // Yields: [ 10, 5, 4, 0]
* ```
*
* Returns:
* * 0: values are equal
* * negative: `a` should be before `b`
* * positive: `a` should come after `b`
* @param a
* @param b
* @returns
*/
const numericComparer = (a, b) => {
	if (a === b) return 0;
	if (a > b) return 1;
	return -1;
};
/**
* Default sort comparer, following same sematics as Array.sort.
* Consider using {@link defaultComparer} to get more logical sorting of numbers.
*
* Note: numbers are sorted in alphabetical order, eg:
* ```js
* [ 10, 20, 5, 100 ].sort(jsComparer); // same as .sort()
* // Yields: [10, 100, 20, 5]
* ```
*
* Returns -1 if x is less than y
* Returns 1 if x is greater than y
* Returns 0 if x is the same as y
* @param x
* @param y
* @returns
*/
const jsComparer = (x, y) => {
	if (x === void 0 && y === void 0) return 0;
	if (x === void 0) return 1;
	if (y === void 0) return -1;
	const xString = defaultToString(x);
	const yString = defaultToString(y);
	if (xString < yString) return -1;
	if (xString > yString) return 1;
	return 0;
};
/**
* Inverts the source comparer.
* @param comparer
* @returns
*/
const comparerInverse = (comparer) => {
	return (x, y) => {
		const v = comparer(x, y);
		return v * -1;
	};
};
/**
* Compares numbers by numeric value, otherwise uses the default
* logic of string comparison.
*
* Is an ascending sort:
* * b, a, c -> a, b, c
* * 10, 5, 100 -> 5, 10, 100
*
* Returns -1 if x is less than y
* Returns 1 if x is greater than y
* Returns 0 if x is the same as y
* @param x
* @param y
* @see {@link comparerInverse} Inverted order
* @returns
*/
const defaultComparer = (x, y) => {
	if (typeof x === `number` && typeof y === `number`) return numericComparer(x, y);
	return jsComparer(x, y);
};

//#endregion
export { comparerInverse, defaultComparer, jsComparer, numericComparer };
//# sourceMappingURL=comparers-BtlnApnB.js.map