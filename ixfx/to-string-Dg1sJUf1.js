//#region ../core/dist/src/records/circular.js
const removeCircularReferences = (value, replaceWith = null, seen = /* @__PURE__ */ new WeakSet(), path = ``) => {
	if (value === null) return value;
	if (typeof value !== `object`) throw new TypeError(`Param 'value' must be an object. Got type: ${typeof value}`);
	seen.add(value);
	const entries = Object.entries(value);
	for (const entry of entries) {
		if (entry[1] === null) continue;
		if (typeof entry[1] !== `object`) continue;
		if (seen.has(entry[1])) {
			entry[1] = replaceWith;
			continue;
		}
		entry[1] = removeCircularReferences(entry[1], replaceWith, seen, `${entry[0]}.`);
	}
	return Object.fromEntries(entries);
};

//#endregion
//#region ../core/dist/src/to-string.js
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
/**
* Returns _true_ if `value` is a Map type
* @param value
* @returns
*/
const isMap = (value) => toTypeString(value) === `[object Map]`;
/**
* Returns _true_ if `value` is a Set type
* @param value
* @returns
*/
const isSet = (value) => toTypeString(value) === `[object Set]`;
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
/**
* Converts a value to string form.
* For simple objects, .toString() is used, other JSON.stringify is used.
* It is meant for creating debugging output or 'hash' versions of objects, and does
* not necessarily maintain full fidelity of the input
* @param value
* @returns
*/
const defaultToString = (value) => {
	if (value === null) return `null`;
	if (typeof value === `boolean` || typeof value === `number`) return value.toString();
	if (typeof value === `string`) return value;
	if (typeof value === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
	try {
		const s = JSON.stringify(value);
		return s;
	} catch (error) {
		if (typeof value === `object`) return JSON.stringify(removeCircularReferences(value, `(circular)`));
		else throw error;
	}
};

//#endregion
export { defaultToString, isMap, isSet, toStringDefault };
//# sourceMappingURL=to-string-Dg1sJUf1.js.map