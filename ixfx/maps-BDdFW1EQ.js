import { defaultToString$2 as defaultToString, toStringDefault$2 as toStringDefault } from "./to-string-BizpbVHG.js";

//#region ../packages/core/src/comparers.ts
/**
* Sort numbers in ascending order.
*
* ```js
* [10, 4, 5, 0].sort(numericComparer);
* // Yields: [0, 4, 5, 10]
* [10, 4, 5, 0].sort(comparerInverse(numericComparer));
* // Yields: [ 10, 5, 4, 0]
* ```
* @param x
* @param y
* @returns
*/
const numericComparer = (x, y) => {
	if (x === y) return 0;
	if (x > y) return 1;
	return -1;
};
/**
* Default sort comparer, following same sematics as Array.sort.
* Consider using {@link defaultComparer} to get more logical sorting of numbers.
*
* Note: numbers are sorted in alphabetical order, eg:
* ```js
* [ 10, 20, 5, 100 ].sort(jsComparer); // same as .sort()
* // Yields: [10, 100, 20, 5]
* ```
* 
* Returns -1 if x is less than y
* Returns 1 if x is greater than y
* Returns 0 if x is the same as y
* @param x
* @param y
* @returns
*/
const jsComparer = (x, y) => {
	if (x === void 0 && y === void 0) return 0;
	if (x === void 0) return 1;
	if (y === void 0) return -1;
	const xString = defaultToString(x);
	const yString = defaultToString(y);
	if (xString < yString) return -1;
	if (xString > yString) return 1;
	return 0;
};
/**
* Compares numbers by numeric value, otherwise uses the default
* logic of string comparison.
*
* Is an ascending sort:
* * b, a, c -> a, b, c
* * 10, 5, 100 -> 5, 10, 100
* 
* Returns -1 if x is less than y
* Returns 1 if x is greater than y
* Returns 0 if x is the same as y
* @param x
* @param y
* @see {@link comparerInverse} Inverted order
* @returns
*/
const defaultComparer = (x, y) => {
	if (typeof x === `number` && typeof y === `number`) return numericComparer(x, y);
	return jsComparer(x, y);
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
//#region ../packages/core/src/maps.ts
/**
* Adds items to a map only if their key doesn't already exist
*
* Uses provided {@link ToString} function to create keys for items. Item is only added if it doesn't already exist.
* Thus the older item wins out, versus normal `Map.set` where the newest wins.
*
*
* @example
* ```js
* import { Maps } from "https://unpkg.com/ixfx/dist/collections.js";
* const map = new Map();
* const peopleArray = [ _some people objects..._];
* Maps.addKeepingExisting(map, p => p.name, ...peopleArray);
* ```
* @param set
* @param hasher
* @param values
* @returns
*/
const addKeepingExisting = (set, hasher, ...values) => {
	const s = set === void 0 ? new Map() : new Map(set);
	for (const v of values) {
		const hashResult = hasher(v);
		if (s.has(hashResult)) continue;
		s.set(hashResult, v);
	}
	return s;
};
/**
* Returns an array of entries from a map, sorted by a property of the value
*
* ```js
* cosnt m = new Map();
* m.set(`4491`, { name: `Bob` });
* m.set(`2319`, { name: `Alice` });
* const sorted = Maps.sortByValue(m, `name`);
* ```
* @param map Map to sort
* @param property Property of value
* @param compareFunction Comparer. If unspecified, uses a default.
*/
const sortByValueProperty = (map, property, compareFunction) => {
	const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
	return [...map.entries()].sort((aE, bE) => {
		const a = aE[1];
		const b = bE[1];
		return cfn(a[property], b[property]);
	});
};
/**
* Returns _true_ if any key contains `value`, based on the provided `comparer` function. Use {@link hasKeyValue}
* if you only want to find a value under a certain key.
*
* Having a comparer function is useful to check by value rather than object reference.
* @example Finds value where name is 'samantha', regardless of other properties
* ```js
* hasAnyValue(map, {name:`samantha`}, (a, b) => a.name === b.name);
* ```
*
* Works by comparing `value` against all values contained in `map` for equality using the provided `comparer`.
*
* @param map Map to search
* @param value Value to find
* @param comparer Function that determines matching. Should return true if `a` and `b` are considered equal.
* @returns True if value is found
*/
const hasAnyValue = (map, value, comparer) => {
	const entries = [...map.entries()];
	return entries.some((kv) => comparer(kv[1], value));
};
/**
* Returns values where `predicate` returns true.
*
* If you just want the first match, use `find`
*
* @example All people over thirty
* ```js
* // for-of loop
* for (const v of filter(people, person => person.age > 30)) {
*
* }
* // If you want an array
* const overThirty = Array.from(filter(people, person => person.age > 30));
* ```
* @param map Map
* @param predicate Filtering predicate
* @returns Values that match predicate
*/
function* filter(map, predicate) {
	for (const v of map.values()) if (predicate(v)) yield v;
}
/**
* Copies data to an array
* @param map
* @returns
*/
const toArray = (map) => [...map.values()];
/**
* Returns the first found value that matches `predicate` or _undefined_.
*
* Use {@link some} if you don't care about the value, just whether it appears.
* Use {@link filter} to get all value(s) that match `predicate`.
*
* @example First person over thirty
* ```js
* const overThirty = find(people, person => person.age > 30);
* ```
* @param map Map to search
* @param predicate Function that returns true for a matching value
* @returns Found value or _undefined_
*/
const find = (map, predicate) => [...map.values()].find((v) => predicate(v));
/**
* Returns _true_ if `predicate` yields _true_ for any value in `map`.
* Use {@link find} if you want the matched value.
* ```js
* const map = new Map();
* map.set(`fruit`, `apple`);
* map.set(`colour`, `red`);
* Maps.some(map, v => v === `red`);    // true
* Maps.some(map, v => v === `orange`); // false
* ```
* @param map 
* @param predicate 
* @returns 
*/
const some = (map, predicate) => [...map.values()].some((v) => predicate(v));
/**
* Zips together an array of keys and values into an object. Requires that
* `keys` and `values` are the same length.
*
* @example
* ```js
* const o = zipKeyValue([`a`, `b`, `c`], [0, 1, 2])
* Yields: { a: 0, b: 1, c: 2}
*```
* @param keys String keys
* @param values Values
* @typeParam V Type of values
* @return Object with keys and values
*/
const zipKeyValue = (keys, values) => {
	if (keys.length !== values.length) throw new Error(`Keys and values arrays should be same length`);
	return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};
/**
* Returns a function that fetches a value from a map, or generates and sets it if not present.
* Undefined is never returned, because if `fn` yields that, an error is thrown.
*
* See {@link getOrGenerateSync} for a synchronous version.
*
* ```
* const m = getOrGenerate(new Map(), (key) => {
*  return key.toUppercase();
* });
*
* // Not contained in map, so it will run the uppercase function,
* // setting the value to the key 'hello'.
* const v = await m(`hello`);  // Yields 'HELLO'
* const v1 = await m(`hello`); // Value exists, so it is returned ('HELLO')
* ```
*
*/
const getOrGenerate = (map, fn) => async (key, args) => {
	let value = map.get(key);
	if (value !== void 0) return value;
	value = await fn(key, args);
	if (value === void 0) throw new Error(`fn returned undefined`);
	map.set(key, value);
	return value;
};

//#endregion
export { addKeepingExisting, filter as filter$2, find, getOrGenerate, hasAnyValue, isEqualContextString as isEqualContextString$2, isEqualDefault as isEqualDefault$2, isEqualValueDefault as isEqualValueDefault$2, isEqualValueIgnoreOrder as isEqualValueIgnoreOrder$2, some, sortByValueProperty, toArray as toArray$2, zipKeyValue };
//# sourceMappingURL=maps-BDdFW1EQ.js.map