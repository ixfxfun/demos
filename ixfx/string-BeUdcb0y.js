//#region ../guards/dist/src/string.js
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
export { stringTest };
//# sourceMappingURL=string-BeUdcb0y.js.map