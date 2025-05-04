//#region ../packages/core/src/results.ts
/**
* If `result` is an error, throws it, otherwise ignored.
* @param result 
* @returns 
*/
function throwResult(result) {
	if (result.success) return true;
	if (typeof result.error === `string`) throw new Error(result.error);
	throw result.error;
}
function resultToError(result) {
	if (typeof result.error === `string`) return new Error(result.error);
	else return result.error;
}

//#endregion
export { resultToError as resultToError$1, throwResult as throwResult$1 };
//# sourceMappingURL=results-CYb8QUaj.js.map