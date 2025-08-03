//#region ../guards/dist/src/result.js
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};
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
* If any of `results` is an error, throws it, otherwise ignored.
* @param results
* @returns _true_ or throws
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
* Gets the result as an Error
* @param result
* @returns
*/
function resultToError(result) {
	if (typeof result.error === `string`) throw new Error(result.error, { cause: result.info });
	if (result.error instanceof Error) throw result.error;
	return new Error(JSON.stringify(result.error), { cause: result.info });
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

//#endregion
//#region ../guards/dist/src/numbers.js
/**
* Returns true if `x` is a power of two
* @param x
* @returns True if `x` is a power of two
*/
const isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
/**
* Checks if `t` is not a number or within specified range.
* Returns `[false, reason:string]` if invalid or `[true]` if valid.
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
const numberTest = (value, range = ``, parameterName = `?`, info) => {
	if (value === null) return {
		success: false,
		error: `Parameter '${parameterName}' is null`,
		info
	};
	if (typeof value === `undefined`) return {
		success: false,
		error: `Parameter '${parameterName}' is undefined`,
		info
	};
	if (Number.isNaN(value)) return {
		success: false,
		error: `Parameter '${parameterName}' is NaN`,
		info
	};
	if (typeof value !== `number`) return {
		success: false,
		error: `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`,
		info
	};
	switch (range) {
		case `finite`: {
			if (!Number.isFinite(value)) return {
				success: false,
				error: `Parameter '${parameterName} must be finite (Got: ${value})`,
				info
			};
			break;
		}
		case `positive`: {
			if (value < 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be at least zero (${value})`,
				info
			};
			break;
		}
		case `negative`: {
			if (value > 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be zero or lower (${value})`,
				info
			};
			break;
		}
		case `aboveZero`: {
			if (value <= 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be above zero (${value})`,
				info
			};
			break;
		}
		case `belowZero`: {
			if (value >= 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be below zero (${value})`,
				info
			};
			break;
		}
		case `percentage`: {
			if (value > 1 || value < 0) return {
				success: false,
				error: `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`,
				info
			};
			break;
		}
		case `nonZero`: {
			if (value === 0) return {
				success: false,
				error: `Parameter '${parameterName}' must non-zero. (${value})`,
				info
			};
			break;
		}
		case `bipolar`: {
			if (value > 1 || value < -1) return {
				success: false,
				error: `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`,
				info
			};
			break;
		}
	}
	return {
		success: true,
		value,
		info
	};
};
/**
* Returns test of `value` being in the range of 0-1.
* Equiv to `number(value, `percentage`);`
*
* This is the same as calling ```number(t, `percentage`)```
* @param value Value to check
* @param parameterName Param name for customising exception message
* @returns
*/
const percentTest = (value, parameterName = `?`, info) => numberTest(value, `percentage`, parameterName, info);
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
export { integerTest, isPowerOfTwo, numberInclusiveRangeTest, numberTest, percentTest, resultErrorToString, resultIsError, resultThrow, resultToError, resultsCollate, throwIfFailed };
//# sourceMappingURL=numbers-C359_5A6.js.map