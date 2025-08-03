//#region ../core/dist/src/default-keyer.js
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
export { defaultKeyer };
//# sourceMappingURL=default-keyer-CnxB2rd_.js.map