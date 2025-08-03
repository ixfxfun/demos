//#region ../debug/dist/src/error-message.js
/**
* Returns a string representation of an error
* @param ex
* @returns
*/
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};

//#endregion
export { getErrorMessage };
//# sourceMappingURL=error-message-B6EPesrV.js.map