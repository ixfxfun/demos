//#region ../random/dist/src/guid.js
/**
* Generates a six-digit roughly unique id
* ```js
* const id = shortGuid();
* ```
* @param options Options.
* @returns
*/
const shortGuid = (options = {}) => {
	const source = options.source ?? Math.random;
	const firstPart = Math.trunc(source() * 46656);
	const secondPart = Math.trunc(source() * 46656);
	const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
	const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
	return firstPartString + secondPartString;
};

//#endregion
export { shortGuid };
//# sourceMappingURL=guid-DI4_KKcE.js.map