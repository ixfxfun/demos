type ResultOk<T> = {
    success: true;
    value: T;
};
type ResultError = {
    success: false;
    error: Error | string;
};
type Result<T> = ResultOk<T> | ResultError;
/**
 * If `result` is an error, throws it, otherwise ignored.
 * @param result
 * @returns
 */
declare function throwResult<T>(result: Result<T>): result is ResultOk<T>;
declare function resultToError(result: ResultError): Error;
declare function resultToValue<T>(result: Result<T>): T;
declare function resultErrorToString(result: ResultError): string;

export { type Result as R, type ResultError as a, type ResultOk as b, resultToError as c, resultToValue as d, resultErrorToString as r, throwResult as t };
