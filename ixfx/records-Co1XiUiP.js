import { isEqualContextString$1 as isEqualContextString, isEqualDefault$1 as isEqualDefault } from "./is-equal-BFoCXXFK.js";
import { isPrimitive$1 as isPrimitive } from "./is-primitive-QGYuLaC0.js";
import { compareIterableValuesShallow$1 as compareIterableValuesShallow } from "./iterable-compare-values-shallow-Cq3qgsrp.js";
import { resultToError$1 as resultToError } from "./results-DiT62oOj.js";

//#region ../packages/guards/src/object.ts
/**
* Tests_if `value` is a plain object
* 
* ```js
* isPlainObject(`text`); // false
* isPlainObject(document); // false
* isPlainObject({ hello: `there` }); // true
* ```
* @param value 
* @returns 
*/
const testPlainObject = (value) => {
	if (typeof value !== `object` || value === null) return {
		success: false,
		error: `Value is null or not object type`
	};
	const prototype = Object.getPrototypeOf(value);
	const t = (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
	if (t) return {
		success: true,
		value
	};
	return {
		success: false,
		error: `Fancy object`
	};
};
/**
* Tests if `value` is primitive value (bigint,number,string or boolean) or plain object
* @param value 
* @returns 
*/
const testPlainObjectOrPrimitive = (value) => {
	const t = typeof value;
	if (t === `symbol`) return {
		success: false,
		error: `Symbol type`
	};
	if (t === `function`) return {
		success: false,
		error: `Function type`
	};
	if (t === `bigint`) return {
		success: true,
		value
	};
	if (t === `number`) return {
		success: true,
		value
	};
	if (t === `string`) return {
		success: true,
		value
	};
	if (t === `boolean`) return {
		success: true,
		value
	};
	return testPlainObject(value);
};

//#endregion
//#region ../packages/core/src/is-integer.ts
/**
* Returns _true_ if `value` is an integer. Parses string input, but
* all other data types return _false_.
* 
* ```js
* isInteger(1);      // true
* isInteger(1.1);    // false
* isInteger(`1`);    // true
* isInteger(`1.1`);  // false
* isInteger(true);   // false
* isInteger(false);  // false
* ```
* 
* Returns _false_ for _undefined_, NaN, booleans and infinite numbers.
* @param value 
* @returns 
*/
const isInteger = (value) => {
	if (value === void 0) return false;
	if (typeof value === `string`) {
		const v = Number.parseInt(value);
		if (Number.isNaN(v)) return false;
		if (v.toString() === value.toString()) return true;
		return false;
	}
	if (typeof value === `number`) {
		if (Number.isNaN(value)) return false;
		if (!Number.isFinite(value)) return false;
		if (Math.round(value) === value) return true;
		return false;
	}
	return false;
};

//#endregion
//#region ../packages/dom/src/resolve-el.ts
/**
* Resolves either a string or HTML element to an element.
* Useful when an argument is either an HTML element or query.
*
* ```js
* resolveEl(`#someId`);
* resolveEl(someElement);
* ```
* @param domQueryOrEl
* @returns
*/
const resolveEl = (domQueryOrEl) => {
	const r = resolveElementTry(domQueryOrEl);
	if (r.success) return r.value;
	throw resultToError(r);
};
const resolveElementTry = (domQueryOrEl) => {
	if (typeof domQueryOrEl === `string`) {
		const d = document.querySelector(domQueryOrEl);
		if (d === null) {
			const error = domQueryOrEl.startsWith(`#`) ? `Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'` : `Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`;
			return {
				success: false,
				error
			};
		}
		domQueryOrEl = d;
	} else if (domQueryOrEl === null) return {
		success: false,
		error: `Param 'domQueryOrEl' is null`
	};
	else if (domQueryOrEl === void 0) return {
		success: false,
		error: `Param 'domQueryOrEl' is undefined`
	};
	const el = domQueryOrEl;
	return {
		success: true,
		value: el
	};
};
const resolveEls = (selectors) => {
	if (selectors === void 0) return [];
	if (selectors === null) return [];
	if (Array.isArray(selectors)) return selectors;
	if (typeof selectors === `string`) {
		const elements = [...document.querySelectorAll(selectors)];
		return elements;
	}
	return [selectors];
};

//#endregion
//#region ../packages/core/src/records/compare.ts
/**
* Compares the keys of two objects, returning a set of those in
* common, and those in either A or B exclusively.
* ```js
* const a = { colour: `red`, intensity: 5 };
* const b = { colour: `pink`, size: 10 };
* const c = compareObjectKeys(a, b);
* // c.shared = [ `colour` ]
* // c.a = [ `intensity` ]
* // c.b = [ `size`  ]
* ```
* @param a 
* @param b 
* @returns 
*/
const compareObjectKeys = (a, b) => {
	const c = compareIterableValuesShallow(Object.keys(a), Object.keys(b));
	return c;
};
/**
* Produces a {@link CompareChangeSet} between two arrays.
* 
* @param a Earlier array to compare
* @param b Later array to compare
* @param eq Equality comparison for values
* @returns Change set.
*/
const compareArrays = (a, b, eq = isEqualDefault) => {
	if (!Array.isArray(a)) throw new Error(`Param 'a' is not an array`);
	if (!Array.isArray(b)) throw new Error(`Param 'b' is not an array`);
	const c = compareObjectData(a, b, false, eq);
	if (!c.isArray) throw new Error(`Change set does not have arrays as parameters`);
	const convert = (key) => {
		if (key.startsWith(`_`)) return Number.parseInt(key.slice(1));
		else throw new Error(`Unexpected key '${key}'`);
	};
	const cc = {
		...c,
		added: mapObjectKeys(c.added, convert),
		changed: mapObjectKeys(c.changed, convert),
		removed: c.removed.map((v) => convert(v)),
		summary: c.summary.map((value) => {
			return [
				value[0],
				convert(value[1]),
				value[2]
			];
		})
	};
	return cc;
};
/**
* Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the 
* values are primitive values or other simple objects. It also works with arrays.
* 
* Uses === equality semantics by default.
* @param a 
* @param b 
*/
const compareObjectData = (a, b, assumeSameShape = false, eq = isEqualDefault) => {
	a ??= {};
	b ??= {};
	const entriesA = Object.entries(a);
	const entriesB = Object.entries(b);
	const scannedKeys = new Set();
	const changed = {};
	const added = {};
	const children = {};
	const removed = [];
	const isArray = Array.isArray(a);
	const summary = new Array();
	let hasChanged = false;
	for (const entry of entriesA) {
		const outputKey = isArray ? `_${entry[0]}` : entry[0];
		const aValue = entry[1];
		const bValue = b[entry[0]];
		scannedKeys.add(entry[0]);
		if (bValue === void 0) {
			hasChanged = true;
			if (assumeSameShape && !isArray) {
				changed[outputKey] = bValue;
				summary.push([
					`mutate`,
					outputKey,
					bValue
				]);
			} else {
				removed.push(outputKey);
				summary.push([
					`del`,
					outputKey,
					aValue
				]);
			}
			continue;
		}
		if (typeof aValue === `object`) {
			const r = compareObjectData(aValue, bValue, assumeSameShape, eq);
			if (r.hasChanged) hasChanged = true;
			children[outputKey] = r;
			const childSummary = r.summary.map((sum) => {
				return [
					sum[0],
					outputKey + `.` + sum[1],
					sum[2]
				];
			});
			summary.push(...childSummary);
		} else if (!eq(aValue, bValue)) {
			changed[outputKey] = bValue;
			hasChanged = true;
			summary.push([
				`mutate`,
				outputKey,
				bValue
			]);
		}
	}
	if (!assumeSameShape || isArray) for (const entry of entriesB) {
		const key = isArray ? `_${entry[0]}` : entry[0];
		if (scannedKeys.has(entry[0])) continue;
		added[key] = entry[1];
		hasChanged = true;
		summary.push([
			`add`,
			key,
			entry[1]
		]);
	}
	return {
		changed,
		added,
		removed,
		children,
		hasChanged,
		isArray,
		summary
	};
};

//#endregion
//#region ../packages/core/src/records/clone-from-fields.ts
const cloneFromFields = (source) => {
	const entries = [];
	for (const field in source) {
		const value = source[field];
		if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
	}
	return Object.fromEntries(entries);
};

//#endregion
//#region ../packages/core/src/records/map-object.ts
/**
* Maps the top-level properties of an object through a map function.
* That is, run each of the values of an object through a function,
* setting the result onto the same key structure as original.
* 
* It is NOT recursive.
*
* The mapping function gets a single args object, consisting of `{ value, field, index }`,
* where 'value' is the value of the field, 'field' the name, and 'index' a numeric count.
* @example Double the value of all fields
* ```js
* const rect = { width: 100, height: 250 };
* const doubled = mapObjectShallow(rect, args => {
*  return args.value*2;
* });
* // Yields: { width: 200, height: 500 }
* ```
*
* Since the map callback gets the name of the property, it can do context-dependent things.
* ```js
* const rect = { width: 100, height: 250, colour: 'red' }
* const doubled = mapObjectShallow(rect, args => {
*  if (args.field === 'width') return args.value*3;
*  else if (typeof args.value === 'number') return args.value*2;
*  return args.value;
* });
* // Yields: { width: 300, height: 500, colour: 'red' }
* ```
* In addition to bulk processing, it allows remapping of property types.
*
* In terms of type-safety, the mapped properties are assumed to have the
* same type.
*
* ```js
* const o = {
*  x: 10,
*  y: 20,
*  width: 200,
*  height: 200
* }
*
* // Make each property use an averager instead
* const oAvg = mapObjectShallow(o, args => {
*  return movingAverage(10);
* });
*
* // Instead of { x:number, y:number... }, we now have { x:movingAverage(), y:movingAverage()... }
* // Add a value to the averager
* oAvg.x.add(20);
* ```
*/
const mapObjectShallow = (object, mapFunction) => {
	const entries = Object.entries(object);
	const mapped = entries.map(([sourceField, sourceFieldValue], index) => [sourceField, mapFunction({
		value: sourceFieldValue,
		field: sourceField,
		index,
		path: sourceField
	})]);
	return Object.fromEntries(mapped);
};

//#endregion
//#region ../packages/core/src/records/pathed.ts
const getEntries = (target, deepProbe) => {
	if (target === void 0) throw new Error(`Param 'target' is undefined`);
	if (target === null) throw new Error(`Param 'target' is null`);
	if (typeof target !== `object`) throw new Error(`Param 'target' is not an object (got: ${typeof target})`);
	if (deepProbe) {
		const entries = [];
		for (const field in target) {
			const value = target[field];
			if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
		}
		return entries;
	} else return Object.entries(target);
};
/**
* Scans object, producing a list of changed fields where B's value (newer) differs from A (older).
* 
* Options:
* - `deepEntries` (_false_): If _false_ Object.entries are used to scan the object. However this won't work for some objects, eg event args, thus _true_ is needed.
* - `eq` (JSON.stringify): By-value comparison function
* - `includeMissingFromA` (_false): If _true_ includes fields present on B but missing on A.
* - `asPartial` (_false): If _true_, treats B as a partial update to B. This means that things missing from B are not considered removals.
* @param a 'Old' value
* @param b 'New' value
* @param options Options for comparison
* @returns 
*/
function* compareData(a, b, options = {}) {
	if (typeof a === `undefined`) {
		yield {
			path: options.pathPrefix ?? ``,
			value: b,
			state: `added`
		};
		return;
	}
	if (typeof b === `undefined`) {
		yield {
			path: options.pathPrefix ?? ``,
			previous: a,
			value: void 0,
			state: `removed`
		};
		return;
	}
	const asPartial = options.asPartial ?? false;
	const undefinedValueMeansRemoved = options.undefinedValueMeansRemoved ?? false;
	const pathPrefix = options.pathPrefix ?? ``;
	const deepEntries = options.deepEntries ?? false;
	const eq = options.eq ?? isEqualContextString;
	const includeMissingFromA = options.includeMissingFromA ?? false;
	const includeParents = options.includeParents ?? false;
	if (isPrimitive(a) && isPrimitive(b)) {
		if (a !== b) yield {
			path: pathPrefix,
			value: b,
			previous: a,
			state: `change`
		};
		return;
	}
	if (isPrimitive(b)) {
		yield {
			path: pathPrefix,
			value: b,
			previous: a,
			state: `change`
		};
		return;
	}
	const entriesA = getEntries(a, deepEntries);
	const entriesAKeys = new Set();
	for (const [key, valueA] of entriesA) {
		entriesAKeys.add(key);
		const keyOfAInB = key in b;
		const valueOfKeyInB = b[key];
		if (typeof valueA === `object` && valueA !== null) if (keyOfAInB) if (valueOfKeyInB === void 0) throw new Error(`Pathed.compareData Value for key ${key} is undefined`);
		else {
			const sub = [...compareData(valueA, valueOfKeyInB, {
				...options,
				pathPrefix: pathPrefix + key + `.`
			})];
			if (sub.length > 0) {
				for (const s of sub) yield s;
				if (includeParents) yield {
					path: pathPrefix + key,
					value: b[key],
					previous: valueA,
					state: `change`
				};
			}
		}
		else {
			if (asPartial) continue;
			yield {
				path: pathPrefix + key,
				value: void 0,
				previous: valueA,
				state: `removed`
			};
		}
		else {
			const subPath = pathPrefix + key;
			if (keyOfAInB) {
				if (valueOfKeyInB === void 0 && undefinedValueMeansRemoved) yield {
					path: subPath,
					previous: valueA,
					value: void 0,
					state: `removed`
				};
				else if (!eq(valueA, valueOfKeyInB, subPath)) yield {
					path: subPath,
					previous: valueA,
					value: valueOfKeyInB,
					state: `change`
				};
			} else {
				if (asPartial) continue;
				yield {
					path: subPath,
					previous: valueA,
					value: void 0,
					state: `removed`
				};
			}
		}
	}
	if (includeMissingFromA) {
		const entriesB = getEntries(b, deepEntries);
		for (const [key, valueB] of entriesB) {
			if (entriesAKeys.has(key)) continue;
			yield {
				path: pathPrefix + key,
				previous: void 0,
				value: valueB,
				state: `added`
			};
		}
	}
}
/**
* Returns a copy of `target` object with a specified path changed to `value`.
* 
* ```js
* const a = {
*  message: `Hello`,
*  position: { x: 10, y: 20 }
* }
* 
* const a1 = updateByPath(a, `message`, `new message`);
* // a1 = { message: `new message`, position: { x: 10, y: 20 }}
* const a2 = updateByPath(a, `position.x`, 20);
* // a2 = { message: `hello`, position: { x: 20, y: 20 }}
* ```
* 
* Paths can also be array indexes:
* ```js
* updateByPath([`a`,`b`,`c`], 2, `d`);
* // Yields: [ `a`, `b`, `d` ]
* ```
* 
* By default, only existing array indexes can be updated. Use the `allowShapeChange` parameter 
* to allow setting arbitrary indexes.
* ```js
* // Throws because array index 3 is undefined
* updateByPath([ `a`, `b`, `c` ], `3`, `d`);
* 
* // With allowShapeChange flag
* updateByPath([ `a`, `b`, `c` ], `3`, `d`, true);
* // Returns: [ `a`, `b`, `c`, `d` ]
* ```
* 
* Throws an error if:
* * `path` cannot be resolved (eg. `position.z` in the above example)
* * `value` applied to `target` results in the object having a different shape (eg missing a field, field
* changing type, or array index out of bounds). Use `allowShapeChange` to suppress this error.
* * Path is undefined or not a string
* * Target is undefined/null
* @param target Object to update
* @param path Path to set value
* @param value Value to set
* @param allowShapeChange By default _false_, throwing an error if an update change the shape of the original object.
* @returns 
*/
const updateByPath = (target, path, value, allowShapeChange = false) => {
	if (path === void 0) throw new Error(`Parameter 'path' is undefined`);
	if (typeof path !== `string`) throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
	if (target === void 0) throw new Error(`Parameter 'target' is undefined`);
	if (target === null) throw new Error(`Parameter 'target' is null`);
	const split = path.split(`.`);
	const r = updateByPathImpl(target, split, value, allowShapeChange);
	return r;
};
const updateByPathImpl = (o, split, value, allowShapeChange) => {
	if (split.length === 0) {
		if (allowShapeChange) return value;
		if (Array.isArray(o) && !Array.isArray(value)) throw new Error(`Expected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
		if (!Array.isArray(o) && Array.isArray(value)) throw new Error(`Unexpected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
		if (typeof o !== typeof value) throw new Error(`Cannot reassign object type. (${typeof o} -> ${typeof value}). Set allowShapeChange=true to ignore.`);
		if (typeof o === `object` && !Array.isArray(o)) {
			const c = compareObjectKeys(o, value);
			if (c.a.length > 0) throw new Error(`New value is missing key(s): ${c.a.join(`,`)}`);
			if (c.b.length > 0) throw new Error(`New value cannot add new key(s): ${c.b.join(`,`)}`);
		}
		return value;
	}
	const start = split.shift();
	if (!start) return value;
	const isInt = isInteger(start);
	if (isInt && Array.isArray(o)) {
		const index = Number.parseInt(start);
		if (index >= o.length && !allowShapeChange) throw new Error(`Array index ${index.toString()} is outside of the existing length of ${o.length.toString()}. Use allowShapeChange=true to permit this.`);
		const copy = [...o];
		copy[index] = updateByPathImpl(copy[index], split, value, allowShapeChange);
		return copy;
	} else if (start in o) {
		const copy = { ...o };
		copy[start] = updateByPathImpl(copy[start], split, value, allowShapeChange);
		return copy;
	} else throw new Error(`Path ${start} not found in data`);
};
/**
* Gets the data at `path` in `object`. Assumes '.' separates each segment of path.
* ```js
* getField({ name: { first: `Thom`, last: `Yorke` }}, `name.first`); // 'Thom'
* getField({ colours: [`red`, `green`, `blue` ]}, `colours.1`); // `green`
* ```
* 
* Returns _undefined_ if path could not be resolved.
* 
* Throws if:
* * `path` is not a string or empty
* * `object` is _undefined_ or null
* @param object 
* @param path 
* @returns 
*/
const getField = (object, path) => {
	if (typeof path !== `string`) throw new Error(`Param 'path' ought to be a string. Got: '${typeof path}'`);
	if (path.length === 0) throw new Error(`Param string 'path' is empty`);
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (object === null) throw new Error(`Param 'object' is null`);
	const split = path.split(`.`);
	const v = getFieldImpl(object, split);
	return v;
};
const getFieldImpl = (object, split) => {
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (split.length === 0) throw new Error(`Path has run out`);
	const start = split.shift();
	if (!start) throw new Error(`Unexpected empty split path`);
	const isInt = isInteger(start);
	if (isInt && Array.isArray(object)) {
		const index = Number.parseInt(start);
		if (typeof object[index] === `undefined`) return {
			success: false,
			error: `Index '${index}' does not exist. Length: ${object.length}`
		};
		if (split.length === 0) return {
			value: object[index],
			success: true
		};
		else return getFieldImpl(object[index], split);
	} else if (typeof object === `object` && start in object) if (split.length === 0) return {
		value: object[start],
		success: true
	};
	else return getFieldImpl(object[start], split);
	else return {
		success: false,
		error: `Path '${start}' not found`
	};
};
/**
* Returns a representation of the object as a set of paths and data.
* ```js
* const o = { name: `hello`, size: 20, colour: { r:200, g:100, b:40 } }
* const pd = [...getPathsAndData(o)];
* // Yields:
* // [ 
* // { path: `name`, value: `hello` },
* // { path: `size`, value: `20` },
* // { path: `colour.r`, value: `200` },
* // { path: `colour.g`, value: `100` },
* // { path: `colour.b`, value: `40` }
* //]
* ```
* @param o Object to get paths and data for
* @param maxDepth Set maximum recursion depth. By default unlimited.
* @param prefix Manually set a path prefix if it's necessary
* @returns 
*/
function* getPathsAndData(o, onlyLeaves = false, maxDepth = Number.MAX_SAFE_INTEGER, prefix = ``) {
	if (o === null) return;
	if (o === void 0) return;
	yield* getPathsAndDataImpl(o, prefix, onlyLeaves, maxDepth);
}
function* getPathsAndDataImpl(o, prefix, onlyLeaves = false, maxDepth) {
	if (maxDepth <= 0) return;
	if (typeof o !== `object`) return;
	for (const entries of Object.entries(o)) {
		const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
		const value = entries[1];
		const leaf = typeof value !== `object`;
		if (onlyLeaves && leaf || !onlyLeaves) yield {
			path: sub,
			value
		};
		yield* getPathsAndDataImpl(value, sub, onlyLeaves, maxDepth - 1);
	}
}

//#endregion
//#region ../packages/core/src/records/index.ts
/**
* Maps the keys of an object, returning a transformed object.
* ```js
* const input = {
*  hello: `there`,
*  chap: `chappie`
* }
* 
* mapObjectKeys(input, key => key.toUppercase());
* 
* // Yields: { HELLO: `there`, CHAP: `chappie` }
* ```
* @param object 
* @param mapFunction 
* @returns 
*/
const mapObjectKeys = (object, mapFunction) => {
	const destinationObject = {};
	for (const entries of Object.entries(object)) {
		const key = mapFunction(entries[0]);
		destinationObject[key] = entries[1];
	}
	return destinationObject;
};

//#endregion
export { cloneFromFields as cloneFromFields$2, compareArrays, compareData, getField, getPathsAndData, mapObjectShallow, resolveEl as resolveEl$2, resolveEls as resolveEls$2, testPlainObjectOrPrimitive as testPlainObjectOrPrimitive$2, updateByPath };
//# sourceMappingURL=records-Co1XiUiP.js.map