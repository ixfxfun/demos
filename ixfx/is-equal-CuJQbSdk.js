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
//#region ../packages/core/src/is-equal.ts
/**
* If input is a string, it is returned.
* Otherwise, it returns the result of JSON.stringify() with fields ordered.
* 
* This allows for more consistent comparisons when object field orders are different but values the same.
* @param itemToMakeStringFor 
* @returns 
*/
const toStringOrdered = (itemToMakeStringFor) => {
	if (typeof itemToMakeStringFor === `string`) return itemToMakeStringFor;
	const allKeys = new Set();
	JSON.stringify(itemToMakeStringFor, (key, value) => (allKeys.add(key), value));
	return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
/**
* Default comparer function is equiv to checking `a === b`.
* Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
*/
const isEqualDefault = (a, b) => a === b;
/**
* Comparer returns true if string representation of `a` and `b` are equal.
* Use {@link isEqualDefault} to compare using === semantics
* Uses `toStringDefault` to generate a string representation (via `JSON.stringify`).
* 
* Returns _false_ if the ordering of fields is different, even though values are identical:
* ```js
* isEqualValueDefault({ a: 10, b: 20}, { b: 20, a: 10 }); // false
* ```
* 
* Use {@link isEqualValueIgnoreOrder} to ignore order (with an overhead of additional processing).
* ```js
* isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
* ```
* 
* Use {@link isEqualValuePartial} to partially match `b` against `a`.
* @returns True if the contents of `a` and `b` are equal
*/
const isEqualValueDefault = (a, b) => {
	if (a === b) return true;
	return toStringDefault(a) === toStringDefault(b);
};
/**
* Comparer returns true if string representation of `a` and `b` are equal, regardless of field ordering.
* Uses `toStringOrdered` to generate a string representation (via JSON.stringify`).
* 
* ```js
* isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
* isEqualValue({ a: 10, b: 20}, { b: 20, a: 10 }); // false, fields are different order
* ```
* 
* There is an overhead to ordering fields. Use {@link isEqualValueDefault} if it's not possible that field ordering will change.
* @returns True if the contents of `a` and `b` are equal
* @typeParam T - Type of objects being compared
*/
const isEqualValueIgnoreOrder = (a, b) => {
	if (a === b) return true;
	return toStringOrdered(a) === toStringOrdered(b);
};
/**
* Returns _true_ if `a` and `b are equal based on their JSON representations.
* `path` is ignored.
* @param a 
* @param b 
* @param path 
* @returns 
*/
const isEqualContextString = (a, b, _path) => {
	return JSON.stringify(a) === JSON.stringify(b);
};

//#endregion
export { defaultToString as defaultToString$2, isEqualContextString as isEqualContextString$2, isEqualDefault as isEqualDefault$2, isEqualValueDefault as isEqualValueDefault$2, isEqualValueIgnoreOrder as isEqualValueIgnoreOrder$2, toStringDefault as toStringDefault$2 };
//# sourceMappingURL=is-equal-CuJQbSdk.js.map