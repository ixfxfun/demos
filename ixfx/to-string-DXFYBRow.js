//#region ../packages/core/src/to-string.ts
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);

//#endregion
export { toStringDefault as toStringDefault$2 };
//# sourceMappingURL=to-string-DXFYBRow.js.map