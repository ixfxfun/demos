import { integerTest$2 as integerTest, numberInclusiveRangeTest$2 as numberInclusiveRangeTest, resultsCollate$2 as resultsCollate } from "./numbers-D3QR_A5v.js";

//#region ../packages/guards/src/arrays.ts
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
export { arrayIndexTest as arrayIndexTest$2, arrayTest as arrayTest$2 };
//# sourceMappingURL=arrays-D1QkwjZy.js.map