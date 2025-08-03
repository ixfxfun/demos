import { integerTest, numberInclusiveRangeTest, resultsCollate } from "./numbers-C359_5A6.js";

//#region ../guards/dist/src/arrays.js
/**
* Throws an error if parameter is not an array
* @param value
* @param parameterName
*/
const arrayTest = (value, parameterName = `?`) => {
	if (!Array.isArray(value)) return {
		success: false,
		error: `Parameter '${parameterName}' is expected to be an array'`
	};
	return {
		success: true,
		value
	};
};
/**
* Throws if `index` is an invalid array index for `array`, and if
* `array` itself is not a valid array.
* @param array
* @param index
*/
const arrayIndexTest = (array, index, name = `index`) => {
	return resultsCollate(arrayTest(array), integerTest(index, `positive`, name), numberInclusiveRangeTest(index, 0, array.length - 1, name));
};

//#endregion
export { arrayIndexTest, arrayTest };
//# sourceMappingURL=arrays-yH_qBmt0.js.map