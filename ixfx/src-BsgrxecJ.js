//#region ../packages/debug/src/index.ts
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};

//#endregion
export { getErrorMessage as getErrorMessage$2 };
//# sourceMappingURL=src-BsgrxecJ.js.map