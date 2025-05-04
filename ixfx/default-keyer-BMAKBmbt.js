//#region ../packages/core/src/default-keyer.ts
/**
* If values are strings, uses that as the key.
* Otherwise uses `JSON.stringify`.
* @param a
* @returns
*/
const defaultKeyer = (a) => {
	return typeof a === `string` ? a : JSON.stringify(a);
};

//#endregion
export { defaultKeyer as defaultKeyer$2 };
//# sourceMappingURL=default-keyer-BMAKBmbt.js.map