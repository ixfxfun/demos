import { __export } from "./chunk-51aI8Tpl.js";

//#region ../packages/guards/dist/src/types.d.ts
type NumberGuardRange =
/**
 * No range checking
 */
`` | `finite`
/**
 * Can be any number, except zero
 */ | `nonZero` | `positive` | `negative`
/**
 * Must be above zero
 */ | `aboveZero` | `belowZero` | `percentage` | `bipolar`;
type ResultOk<TValue> = {
  success: true;
  value: TValue;
};
type ResultError<TError> = {
  success: false;
  error: TError;
};
type ResultOrFunction = Result<any, any> | (() => undefined | Result<any, any>);
type Result<TValue, TError> = ResultOk<TValue> | ResultError<TError>; //#endregion
//#region ../packages/guards/dist/src/arrays.d.ts
/**
* Throws an error if parameter is not an array
* @param value
* @param parameterName
*/
declare const arrayTest: (value: unknown, parameterName?: string) => Result<any[], string>;

/**
* Throws if `index` is an invalid array index for `array`, and if
* `array` itself is not a valid array.
* @param array
* @param index
*/
declare const arrayIndexTest: <V>(array: ArrayLike<V>, index: number, name?: string) => Result<ArrayLike<V>, string>;

/**
* Returns true if parameter is an array of strings
* @param value
* @returns
*/
declare const arrayStringsTest: (value: unknown) => Result<string[], string>;

//#endregion
//#region ../packages/guards/dist/src/empty.d.ts
declare const nullUndefTest: <TValue>(value: TValue, parameterName?: string) => Result<TValue, string>;
declare const isDefined: <T>(argument: T | undefined) => argument is T;

//#endregion
//#region ../packages/guards/dist/src/function.d.ts
declare const isFunction: (object: unknown) => object is (...args: any[]) => any;
declare const functionTest: (value: unknown, parameterName?: string) => Result<Function, string>;

//#endregion
//#region ../packages/guards/dist/src/numbers.d.ts
/**
* Returns true if `x` is a power of two
* @param x
* @returns True if `x` is a power of two
*/
declare const isPowerOfTwo: (x: number) => boolean;

/**
* Returns `fallback` if `v` is NaN, otherwise returns `v`.
*
* Throws if `v` is not a number type.
* @param v
* @param fallback
* @returns
*/
declare const ifNaN: (v: number, fallback: number) => number;

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
declare const integerParse: (value: string | number | null, range?: NumberGuardRange, defaultValue?: number) => number;

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
declare const numberTest: (value?: unknown, range?: NumberGuardRange, parameterName?: string) => Result<number, string>;

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
declare const percentTest: (value: number, parameterName?: string) => Result<number, string>;

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
declare const integerTest: (value: number | undefined, range?: NumberGuardRange, parameterName?: string) => Result<number, string>;
declare const integerArrayTest: (numbers: Iterable<number>) => Result<Iterable<number>, string>;

/**
* Returns _true_ if `value` is an integer in number or string form
* @param value
* @returns
*/
declare const isInteger: (value: number | string) => boolean;
declare const numberInclusiveRangeTest: (value: number | undefined, min: number, max: number, parameterName?: string) => Result<number, string>;

//#endregion
//#region ../packages/guards/dist/src/object.d.ts
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
declare const testPlainObject: (value: unknown) => Result<object, string>;

/**
* Tests if `value` is primitive value (bigint,number,string or boolean) or plain object
* @param value
* @returns
*/
declare const testPlainObjectOrPrimitive: (value: unknown) => Result<object | bigint | number | string | boolean, string>;

//#endregion
//#region ../packages/guards/dist/src/range.d.ts
type ExpectedOpts = {
  minInclusive?: number;
  maxInclusive?: number;
  minExclusive?: number;
  maxExclusive?: number;
};
declare const rangeIntegerTest: (v: Iterable<number>, expected: ExpectedOpts) => Result<Iterable<number>, string>;

/**
* Inclusive range 4-6 = 4, 5, 6
* Exclusive range 4-6 = 5
*
* @param numbers
* @param expected
* @returns
*/
declare const rangeTest: (numbers: Iterable<number>, expected: ExpectedOpts) => Result<Iterable<number>, string>;

//#endregion
//#region ../packages/guards/dist/src/result.d.ts
declare const getErrorMessage: (ex: unknown) => string;

/**
* If `result` is an error, throws it, otherwise ignored.
* @param result
* @returns
*/
declare function resultThrow(...results: ResultOrFunction[]): boolean;
declare function resultThrowSingle<TValue>(result: Result<TValue, any>): result is ResultOk<TValue>;

/**
* Returns the first failed result, or _undefined_ if there are no fails
* @param results
* @returns
*/
declare const resultFirstFail_: <TError>(...results: ResultOrFunction[]) => ResultError<TError> | undefined;

/**
* Returns _true_ if `result` is an error
* @param result
* @returns
*/
declare function resultIsError<TValue, TError>(result: Result<TValue, TError>): result is ResultError<TError>;

/**
* Returns _true_ if `result` is OK and has a value
* @param result
* @returns
*/
declare function resultIsOk<TValue, TError>(result: Result<TValue, TError>): result is ResultOk<TValue>;

/**
* Gets the result as an Error
* @param result
* @returns
*/
declare function resultToError(result: ResultError<any>): Error;

/**
* Unwraps the result, returning its value if OK.
* If not, an exception is thrown.
* @param result
* @returns
*/
declare function resultToValue<TValue, TError>(result: Result<TValue, TError>): TValue;

/**
* Returns the error as a string.
* @param result
* @returns
*/
declare function resultErrorToString(result: ResultError<any>): string;

/**
* Throws an error if any result is a failure.
* Error message will be the combined from all errors.
* @param results
* @returns
*/
declare const throwIfFailed: (...results: Result<any, any>[]) => void;

/**
* Returns first failed result or final value.
* @param results
* @returns
*/
declare const resultsCollate: <TValue, TError>(...results: ResultOrFunction[]) => Result<TValue, TError>;

/**
* If `result` is an error, calls `callback`, passing the error.
* Otherwise does nothing
* @param result
* @param callback
*/
declare const resultWithFail: <TError>(result: Result<any, TError>, callback: (r: ResultError<TError>) => void) => void;

//#endregion
//#region ../packages/guards/dist/src/string.d.ts
type StringGuardRange = `` | `non-empty`;

/**
* Throws an error if parameter is not an string
* @param value
* @param parameterName
*/
declare const stringTest: (value: unknown, range?: StringGuardRange, parameterName?: string) => Result<string, string>;

//#endregion
//#region src/guards.d.ts
declare namespace guards_d_exports {
  export { ExpectedOpts, NumberGuardRange, Result, ResultError, ResultOk, ResultOrFunction, StringGuardRange, arrayIndexTest, arrayStringsTest, arrayTest, functionTest, getErrorMessage, ifNaN, integerArrayTest, integerParse, integerTest, isDefined, isFunction, isInteger, isPowerOfTwo, nullUndefTest, numberInclusiveRangeTest, numberTest, percentTest, rangeIntegerTest, rangeTest, resultErrorToString, resultFirstFail_, resultIsError, resultIsOk, resultThrow, resultThrowSingle, resultToError, resultToValue, resultWithFail, resultsCollate, stringTest, testPlainObject, testPlainObjectOrPrimitive, throwIfFailed };
}
//#endregion
export { ExpectedOpts, NumberGuardRange, Result, ResultError, ResultOk, ResultOrFunction, StringGuardRange, arrayIndexTest as arrayIndexTest$1, arrayStringsTest as arrayStringsTest$1, arrayTest as arrayTest$1, functionTest as functionTest$1, getErrorMessage as getErrorMessage$3, guards_d_exports, ifNaN as ifNaN$1, integerArrayTest as integerArrayTest$1, integerParse as integerParse$1, integerTest as integerTest$1, isDefined as isDefined$1, isFunction as isFunction$1, isInteger as isInteger$1, isPowerOfTwo as isPowerOfTwo$1, nullUndefTest as nullUndefTest$1, numberInclusiveRangeTest as numberInclusiveRangeTest$1, numberTest as numberTest$1, percentTest as percentTest$1, rangeIntegerTest as rangeIntegerTest$1, rangeTest as rangeTest$1, resultErrorToString as resultErrorToString$1, resultFirstFail_ as resultFirstFail_$1, resultIsError as resultIsError$1, resultIsOk as resultIsOk$1, resultThrow as resultThrow$1, resultThrowSingle as resultThrowSingle$1, resultToError as resultToError$1, resultToValue as resultToValue$1, resultWithFail as resultWithFail$1, resultsCollate as resultsCollate$1, stringTest as stringTest$1, testPlainObject as testPlainObject$1, testPlainObjectOrPrimitive as testPlainObjectOrPrimitive$1, throwIfFailed as throwIfFailed$1 };
//# sourceMappingURL=guards.d-D4oAVxTB.d.ts.map