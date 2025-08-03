import { resultThrow } from "./numbers-C359_5A6.js";
import { arrayTest } from "./arrays-yH_qBmt0.js";

//#region ../arrays/dist/src/random.js
/**
* Returns a shuffled copy of the input array.
* @example
* ```js
* const d = [1, 2, 3, 4];
* const s = shuffle(d);
* // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
* ```
*
* It can be useful to randomly access each item from an array exactly once:
* ```js
* for (const value of shuffle(inputArray)) {
*  // Do something with the value...
* }
* ```
* @param dataToShuffle Input array
* @param rand Random generator. `Math.random` by default.
* @returns Copy with items moved around randomly
* @typeParam V - Type of array items
*/
const shuffle = (dataToShuffle, rand = Math.random) => {
	resultThrow(arrayTest(dataToShuffle, `dataToShuffle`));
	const array = [...dataToShuffle];
	for (let index = array.length - 1; index > 0; index--) {
		const index_ = Math.floor(rand() * (index + 1));
		[array[index], array[index_]] = [array[index_], array[index]];
	}
	return array;
};
/**
* Returns a random element of an array
*
* ```js
* const v = [`blue`, `red`, `orange`];
* randomElement(v); // Yields `blue`, `red` or `orange`
* ```
*
* Note that repeated calls might yield the same value
* multiple times. If you want to random unique values, consider using {@link shuffle}.
*
* See also:
* * {@link randomIndex} if you want a random index rather than value.
*
* @param array
* @param rand Random generator. `Math.random` by default.
* @returns
*/
const randomElement = (array, rand = Math.random) => {
	resultThrow(arrayTest(array, `array`));
	return array[Math.floor(rand() * array.length)];
};

//#endregion
export { randomElement, shuffle };
//# sourceMappingURL=random-DXqMnVbO.js.map