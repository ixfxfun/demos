//#region ../packages/guards/src/throw-from-result.ts
const throwFromResult = (test) => {
	if (test[0]) return false;
	else throw new Error(test[1]);
};

//#endregion
//#region ../packages/guards/src/numbers.ts
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
	if (value === null) return [false, `Parameter '${parameterName}' is null`];
	if (typeof value === `undefined`) return [false, `Parameter '${parameterName}' is undefined`];
	if (Number.isNaN(value)) return [false, `Parameter '${parameterName}' is NaN`];
	if (typeof value !== `number`) return [false, `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`];
	switch (range) {
		case `finite`: {
			if (!Number.isFinite(value)) return [false, `Parameter '${parameterName} must be finite (Got: ${value})`];
			break;
		}
		case `positive`: {
			if (value < 0) return [false, `Parameter '${parameterName}' must be at least zero (${value})`];
			break;
		}
		case `negative`: {
			if (value > 0) return [false, `Parameter '${parameterName}' must be zero or lower (${value})`];
			break;
		}
		case `aboveZero`: {
			if (value <= 0) return [false, `Parameter '${parameterName}' must be above zero (${value})`];
			break;
		}
		case `belowZero`: {
			if (value >= 0) return [false, `Parameter '${parameterName}' must be below zero (${value})`];
			break;
		}
		case `percentage`: {
			if (value > 1 || value < 0) return [false, `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`];
			break;
		}
		case `nonZero`: {
			if (value === 0) return [false, `Parameter '${parameterName}' must non-zero. (${value})`];
			break;
		}
		case `bipolar`: {
			if (value > 1 || value < -1) return [false, `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`];
			break;
		}
	}
	return [true];
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
const throwNumberTest = (value, range = ``, parameterName = `?`) => {
	throwFromResult(numberTest(value, range, parameterName));
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
const throwPercentTest = (value, parameterName = `?`) => {
	throwFromResult(percentTest(value, parameterName));
};
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
	const r = numberTest(value, range, parameterName);
	if (!r[0]) return r;
	if (!Number.isInteger(value)) return [false, `Param '${parameterName}' is not an integer`];
	return [true];
};
const throwIntegerTest = (value, range = ``, parameterName = `?`) => {
	throwFromResult(integerTest(value, range, parameterName));
};
const numberInclusiveRangeTest = (value, min, max, parameterName = `?`) => {
	if (typeof value !== `number`) return [false, `Param '${parameterName}' is not a number type. Got type: '${typeof value}' value: '${JSON.stringify(value)}'`];
	if (Number.isNaN(value)) return [false, `Param '${parameterName}' is not within range ${min}-${max}. Got: NaN`];
	if (Number.isFinite(value)) {
		if (value < min) return [false, `Param '${parameterName}' is below range ${min}-${max}. Got: ${value}`];
		else if (value > max) return [false, `Param '${parameterName}' is above range ${min}-${max}. Got: ${value}`];
		return [true];
	} else return [false, `Param '${parameterName}' is not within range ${min}-${max}. Got: infinite`];
};
const throwNumberInclusiveRangeTest = (value, min, max, parameterName = `?`) => {
	const r = numberInclusiveRangeTest(value, min, max, parameterName);
	if (r[0]) return;
	throw new Error(r[1]);
};

//#endregion
export { integerTest, numberTest, throwFromResult, throwIntegerTest, throwNumberInclusiveRangeTest, throwNumberTest, throwPercentTest };
//# sourceMappingURL=numbers-BSDDLVnO.js.map