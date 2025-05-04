import { __export } from "./chunk-51aI8Tpl.js";

//#region ../packages/guards/dist/src/result.js
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};
/**
* If `result` is an error, throws it, otherwise ignored.
* @param result
* @returns
*/
function resultThrow(...results) {
	for (const r of results) {
		const rr = typeof r === `object` ? r : r();
		if (rr === void 0) continue;
		if (rr.success) continue;
		throw resultToError(rr);
	}
	return true;
}
function resultThrowSingle(result) {
	if (result.success) return true;
	throw resultToError(result);
}
/**
* Returns the first failed result, or _undefined_ if there are no fails
* @param results
* @returns
*/
const resultFirstFail_ = (...results) => {
	for (const r of results) {
		const rr = typeof r === `object` ? r : r();
		if (rr === void 0) continue;
		if (!rr.success) return rr;
	}
};
/**
* Returns _true_ if `result` is an error
* @param result
* @returns
*/
function resultIsError(result) {
	if (typeof result !== `object`) return false;
	return !result.success;
}
/**
* Returns _true_ if `result` is OK and has a value
* @param result
* @returns
*/
function resultIsOk(result) {
	if (typeof result !== `object`) return false;
	return result.success;
}
/**
* Gets the result as an Error
* @param result
* @returns
*/
function resultToError(result) {
	if (typeof result.error === `string`) throw new Error(result.error);
	if (result.error instanceof Error) throw result.error;
	return new Error(JSON.stringify(result.error));
}
/**
* Unwraps the result, returning its value if OK.
* If not, an exception is thrown.
* @param result
* @returns
*/
function resultToValue(result) {
	if (resultIsOk(result)) return result.value;
	throw resultToError(result);
}
/**
* Returns the error as a string.
* @param result
* @returns
*/
function resultErrorToString(result) {
	if (result.error instanceof Error) return getErrorMessage(result.error);
	if (typeof result.error === `string`) return result.error;
	return JSON.stringify(result.error);
}
/**
* Throws an error if any result is a failure.
* Error message will be the combined from all errors.
* @param results
* @returns
*/
const throwIfFailed = (...results) => {
	const failed = results.filter((r) => resultIsError(r));
	if (failed.length === 0) return;
	const messages = failed.map((f) => resultErrorToString(f));
	throw new Error(messages.join(`, `));
};
/**
* Returns first failed result or final value.
* @param results
* @returns
*/
const resultsCollate = (...results) => {
	let rr;
	for (const r of results) {
		rr = typeof r === `object` ? r : r();
		if (rr === void 0) continue;
		if (!rr.success) return rr;
	}
	if (!rr) throw new Error(`No results`);
	return rr;
};
/**
* If `result` is an error, calls `callback`, passing the error.
* Otherwise does nothing
* @param result
* @param callback
*/
const resultWithFail = (result, callback) => {
	if (resultIsError(result)) callback(result);
};

//#endregion
//#region ../packages/guards/dist/src/numbers.js
/**
* Returns true if `x` is a power of two
* @param x
* @returns True if `x` is a power of two
*/
const isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
/**
* Returns `fallback` if `v` is NaN, otherwise returns `v`.
*
* Throws if `v` is not a number type.
* @param v
* @param fallback
* @returns
*/
const ifNaN = (v, fallback) => {
	if (Number.isNaN(v)) return fallback;
	if (typeof v !== `number`) throw new TypeError(`v is not a number. Got: ${typeof v}`);
	return v;
};
/**
* Parses `value` as an integer, returning it if it meets the `range` criteria.
* If not, `defaultValue` is returned.
*
* ```js
* const i = integerParse('10', 'positive');    // 10
* const i = integerParse('10.5', 'positive');  // 10
* const i = integerParse('0', 'nonZero', 100); // 100
* ```
*
* NaN is returned if criteria does not match and no default is given
* ```js
* const i = integerParse('10', 'negative');    // NaN
* ```
*
* @param value
* @param range
* @param defaultValue
* @returns
*/
const integerParse = (value, range = ``, defaultValue = Number.NaN) => {
	if (typeof value === `undefined`) return defaultValue;
	if (value === null) return defaultValue;
	try {
		const parsed = Number.parseInt(typeof value === `number` ? value.toString() : value);
		const r = integerTest(parsed, range, `parsed`);
		return r[0] ? parsed : defaultValue;
	} catch {
		return defaultValue;
	}
};
/**
* Checks if `t` is not a number or within specified range.
* Returns `[false, reason:string]` if invalid or `[true]` if valid.
* Use {@link throwNumberTest} to throw an error rather than return result.
*
* Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
*
* * (empty, default): must be a number type and not NaN.
* * finite: must be a number, not NaN and not infinite
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* * bipolar: can be -1 to 1, inclusive
* @param value Value to check
* @param parameterName Name of parameter (for more helpful exception messages)
* @param range Range to enforce
* @returns
*/
const numberTest = (value, range = ``, parameterName = `?`) => {
	if (value === null) return {
		success: false,
		error: `Parameter '${parameterName}' is null`
	};
	if (typeof value === `undefined`) return {
		success: false,
		error: `Parameter '${parameterName}' is undefined`
	};
	if (Number.isNaN(value)) return {
		success: false,
		error: `Parameter '${parameterName}' is NaN`
	};
	if (typeof value !== `number`) return {
		success: false,
		error: `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`
	};
	switch (range) {
		case `finite`: {
			if (!Number.isFinite(value)) return {
				success: false,
				error: `Parameter '${parameterName} must be finite (Got: ${value})`
			};
			break;
		}
		case `positive`: {
			if (value < 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be at least zero (${value})`
			};
			break;
		}
		case `negative`: {
			if (value > 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be zero or lower (${value})`
			};
			break;
		}
		case `aboveZero`: {
			if (value <= 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be above zero (${value})`
			};
			break;
		}
		case `belowZero`: {
			if (value >= 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be below zero (${value})`
			};
			break;
		}
		case `percentage`: {
			if (value > 1 || value < 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`
			};
			break;
		}
		case `nonZero`: {
			if (value === 0) return {
				success: false,
				error: `Parameter '${parameterName}' must non-zero. (${value})`
			};
			break;
		}
		case `bipolar`: {
			if (value > 1 || value < -1) return {
				success: false,
				error: `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`
			};
			break;
		}
	}
	return {
		success: true,
		value
	};
};
/**
* Checks if `t` is not a number or within specified range.
* Throws if invalid. Use {@link numberTest} to test without throwing.
*
* * (empty, default): must be a number type and not NaN.
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* * bipolar: can be -1 to 1, inclusive
*
* Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
* @param value Value to test
* @param range Range
* @param parameterName Name of parameter
*/
/**
* Returns test of `value` being in the range of 0-1.
* Equiv to `number(value, `percentage`);`
*
* This is the same as calling ```number(t, `percentage`)```
* @param value Value to check
* @param parameterName Param name for customising exception message
* @returns
*/
const percentTest = (value, parameterName = `?`) => numberTest(value, `percentage`, parameterName);
/**
* Checks if `value` an integer and meets additional criteria.
* See {@link numberTest} for guard details, or use that if integer checking is not required.
*
* Note:
* * `bipolar` will mean -1, 0 or 1.
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* @param value Value to check
* @param parameterName Param name for customising exception message
* @param range Guard specifier.
*/
const integerTest = (value, range = ``, parameterName = `?`) => {
	return resultsCollate(numberTest(value, range, parameterName), () => {
		if (!Number.isInteger(value)) return {
			success: false,
			error: `Param '${parameterName}' is not an integer`
		};
		return {
			success: true,
			value
		};
	});
};
const integerArrayTest = (numbers) => {
	for (const v of numbers) if (Math.abs(v) % 1 !== 0) return {
		success: false,
		error: `Value is not an integer: ${v}`
	};
	return {
		success: true,
		value: numbers
	};
};
/**
* Returns _true_ if `value` is an integer in number or string form
* @param value
* @returns
*/
const isInteger = (value) => {
	if (typeof value === `string`) value = Number.parseFloat(value);
	const r = integerTest(value);
	return r.success;
};
const numberInclusiveRangeTest = (value, min, max, parameterName = `?`) => {
	if (typeof value !== `number`) return {
		success: false,
		error: `Param '${parameterName}' is not a number type. Got type: '${typeof value}' value: '${JSON.stringify(value)}'`
	};
	if (Number.isNaN(value)) return {
		success: false,
		error: `Param '${parameterName}' is not within range ${min}-${max}. Got: NaN`
	};
	if (Number.isFinite(value)) {
		if (value < min) return {
			success: false,
			error: `Param '${parameterName}' is below range ${min}-${max}. Got: ${value}`
		};
		else if (value > max) return {
			success: false,
			error: `Param '${parameterName}' is above range ${min}-${max}. Got: ${value}`
		};
		return {
			success: true,
			value
		};
	} else return {
		success: false,
		error: `Param '${parameterName}' is not within range ${min}-${max}. Got: infinite`
	};
};

//#endregion
//#region ../packages/guards/dist/src/arrays.js
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
	return resultsCollate(arrayTest(array), integerTest(index, `positive`, name));
};
/**
* Returns true if parameter is an array of strings
* @param value
* @returns
*/
const arrayStringsTest = (value) => {
	if (!Array.isArray(value)) return {
		success: false,
		error: `Value is not an array`
	};
	if (!value.some((v) => typeof v !== `string`)) return {
		success: false,
		error: `Contains something not a string`
	};
	return {
		success: true,
		value
	};
};

//#endregion
//#region ../packages/guards/dist/src/empty.js
const nullUndefTest = (value, parameterName = `?`) => {
	if (typeof value === `undefined`) return {
		success: false,
		error: `${parameterName} param is undefined`
	};
	if (value === null) return {
		success: false,
		error: `${parameterName} param is null`
	};
	return {
		success: true,
		value
	};
};
const isDefined = (argument) => argument !== void 0;

//#endregion
//#region ../packages/guards/dist/src/function.js
const isFunction = (object) => object instanceof Function;
const functionTest = (value, parameterName = `?`) => {
	if (value === void 0) return {
		success: false,
		error: `Param '${parameterName}' is undefined. Expected: function.`
	};
	if (value === null) return {
		success: false,
		error: `Param '${parameterName}' is null. Expected: function.`
	};
	if (typeof value !== `function`) return {
		success: false,
		error: `Param '${parameterName}' is type '${typeof value}'. Expected: function`
	};
	return {
		success: true,
		value
	};
};

//#endregion
//#region ../packages/guards/dist/src/object.js
/**
* Tests_if `value` is a plain object
*
* ```js
* isPlainObject(`text`); // false
* isPlainObject(document); // false
* isPlainObject({ hello: `there` }); // true
* ```
* @param value
* @returns
*/
const testPlainObject = (value) => {
	if (typeof value !== `object` || value === null) return {
		success: false,
		error: `Value is null or not object type`
	};
	const prototype = Object.getPrototypeOf(value);
	const t = (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
	if (t) return {
		success: true,
		value
	};
	return {
		success: false,
		error: `Fancy object`
	};
};
/**
* Tests if `value` is primitive value (bigint,number,string or boolean) or plain object
* @param value
* @returns
*/
const testPlainObjectOrPrimitive = (value) => {
	const t = typeof value;
	if (t === `symbol`) return {
		success: false,
		error: `Symbol type`
	};
	if (t === `function`) return {
		success: false,
		error: `Function type`
	};
	if (t === `bigint`) return {
		success: true,
		value
	};
	if (t === `number`) return {
		success: true,
		value
	};
	if (t === `string`) return {
		success: true,
		value
	};
	if (t === `boolean`) return {
		success: true,
		value
	};
	return testPlainObject(value);
};

//#endregion
//#region ../packages/guards/dist/src/range.js
const rangeIntegerTest = (v, expected) => {
	return resultsCollate(rangeTest(v, expected), integerArrayTest(v));
};
/**
* Inclusive range 4-6 = 4, 5, 6
* Exclusive range 4-6 = 5
*
* @param numbers
* @param expected
* @returns
*/
const rangeTest = (numbers, expected) => {
	for (const v of numbers) {
		if (expected.minExclusive !== void 0) {
			if (v <= expected.minExclusive) return {
				success: false,
				error: `Value '${v}' must be higher than minExclusive: '${expected.minExclusive}'`
			};
		}
		if (expected.minInclusive !== void 0) {
			if (v < expected.minInclusive) return {
				success: false,
				error: `Value '${v}' must be equal or higher than minInclusive: '${expected.minInclusive}'`
			};
		}
		if (expected.maxExclusive !== void 0) {
			if (v >= expected.maxExclusive) return {
				success: false,
				error: `Value '${v}' must be less than maxExclusive: '${expected.maxExclusive}'`
			};
		}
		if (expected.maxInclusive !== void 0) {
			if (v > expected.maxInclusive) return {
				success: false,
				error: `Value '${v}' must be equal or less than maxInclusive: '${expected.maxInclusive}'`
			};
		}
	}
	return {
		success: true,
		value: numbers
	};
};

//#endregion
//#region ../packages/guards/dist/src/string.js
/**
* Throws an error if parameter is not an string
* @param value
* @param parameterName
*/
const stringTest = (value, range = ``, parameterName = `?`) => {
	if (typeof value !== `string`) return {
		success: false,
		error: `Param '${parameterName} is not type string. Got: ${typeof value}`
	};
	switch (range) {
		case `non-empty`:
			if (value.length === 0) return {
				success: false,
				error: `Param '${parameterName} is empty`
			};
			break;
	}
	return {
		success: true,
		value
	};
};

//#endregion
//#region src/guards.ts
var guards_exports = {};
__export(guards_exports, {
	arrayIndexTest: () => arrayIndexTest,
	arrayStringsTest: () => arrayStringsTest,
	arrayTest: () => arrayTest,
	functionTest: () => functionTest,
	getErrorMessage: () => getErrorMessage,
	ifNaN: () => ifNaN,
	integerArrayTest: () => integerArrayTest,
	integerParse: () => integerParse,
	integerTest: () => integerTest,
	isDefined: () => isDefined,
	isFunction: () => isFunction,
	isInteger: () => isInteger,
	isPowerOfTwo: () => isPowerOfTwo,
	nullUndefTest: () => nullUndefTest,
	numberInclusiveRangeTest: () => numberInclusiveRangeTest,
	numberTest: () => numberTest,
	percentTest: () => percentTest,
	rangeIntegerTest: () => rangeIntegerTest,
	rangeTest: () => rangeTest,
	resultErrorToString: () => resultErrorToString,
	resultFirstFail_: () => resultFirstFail_,
	resultIsError: () => resultIsError,
	resultIsOk: () => resultIsOk,
	resultThrow: () => resultThrow,
	resultThrowSingle: () => resultThrowSingle,
	resultToError: () => resultToError,
	resultToValue: () => resultToValue,
	resultWithFail: () => resultWithFail,
	resultsCollate: () => resultsCollate,
	stringTest: () => stringTest,
	testPlainObject: () => testPlainObject,
	testPlainObjectOrPrimitive: () => testPlainObjectOrPrimitive,
	throwIfFailed: () => throwIfFailed
});

//#endregion
export { arrayIndexTest, arrayStringsTest, arrayTest, functionTest, getErrorMessage as getErrorMessage$1, guards_exports, ifNaN, integerArrayTest, integerParse, integerTest, isDefined, isFunction, isInteger, isPowerOfTwo, nullUndefTest, numberInclusiveRangeTest, numberTest, percentTest, rangeIntegerTest, rangeTest, resultErrorToString, resultFirstFail_, resultIsError, resultIsOk, resultThrow, resultThrowSingle, resultToError, resultToValue, resultWithFail, resultsCollate, stringTest, testPlainObject, testPlainObjectOrPrimitive, throwIfFailed };
//# sourceMappingURL=guards-DmV2PlEk.js.map