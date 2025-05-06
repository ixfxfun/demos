//#region ../packages/guards/src/result.ts
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
	if (typeof result.error === `string`) throw new Error(result.error);
	if (result.error instanceof Error) throw result.error;
	return new Error(JSON.stringify(result.error));
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
//#region ../packages/guards/src/numbers.ts
/**
* Returns true if `x` is a power of two
* @param x
* @returns True if `x` is a power of two
*/
const isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
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
export { integerTest as integerTest$2, isPowerOfTwo as isPowerOfTwo$2, numberInclusiveRangeTest as numberInclusiveRangeTest$2, numberTest as numberTest$2, percentTest as percentTest$2, resultIsError as resultIsError$2, resultThrow as resultThrow$2, resultToError as resultToError$2, resultsCollate as resultsCollate$2 };
//# sourceMappingURL=numbers-D3QR_A5v.js.map