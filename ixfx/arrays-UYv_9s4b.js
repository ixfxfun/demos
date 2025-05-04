import { throwFromResult, throwIntegerTest } from "./numbers-BSDDLVnO.js";

//#region ../packages/guards/src/arrays.ts
/**
* Throws an error if parameter is not an array
* @param value
* @param parameterName
*/
const arrayTest = (value, parameterName = `?`) => {
	if (!Array.isArray(value)) return [false, `Parameter '${parameterName}' is expected to be an array'`];
	return [true];
};
const throwArrayTest = (value, parameterName = `?`) => {
	throwFromResult(arrayTest(value, parameterName));
};
/**
* Throws an error if `array` parameter is not a valid array
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
* Arrays.guardArray(someVariable);
* ```
* @private
* @param array
* @param name
*/
const guardArray = (array, name = `?`) => {
	if (array === void 0) throw new TypeError(`Param '${name}' is undefined. Expected array.`);
	if (array === null) throw new TypeError(`Param '${name}' is null. Expected array.`);
	if (!Array.isArray(array)) throw new TypeError(`Param '${name}' not an array as expected`);
};
/**
* Throws if `index` is an invalid array index for `array`, and if
* `array` itself is not a valid array.
* @param array
* @param index
*/
const guardIndex = (array, index, name = `index`) => {
	guardArray(array);
	throwIntegerTest(index, `positive`, name);
	if (index > array.length - 1) throw new Error(`'${name}' ${index} beyond array max of ${array.length - 1}`);
};

//#endregion
export { guardArray, guardIndex, throwArrayTest };
//# sourceMappingURL=arrays-UYv_9s4b.js.map