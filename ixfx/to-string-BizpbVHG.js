//#region ../packages/core/src/to-string.ts
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
const defaultToString = (object) => {
	if (object === null) return `null`;
	if (typeof object === `boolean` || typeof object === `number`) return object.toString();
	if (typeof object === `string`) return object;
	if (typeof object === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
	return JSON.stringify(object);
};

//#endregion
export { defaultToString as defaultToString$2, toStringDefault as toStringDefault$2 };
//# sourceMappingURL=to-string-BizpbVHG.js.map