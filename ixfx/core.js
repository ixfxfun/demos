import { __export } from "./chunk-51aI8Tpl.js";
import { resultThrow$2 as resultThrow } from "./numbers-D3QR_A5v.js";
import { isPrimitive$1 as isPrimitive, nullUndefTest$2 as nullUndefTest } from "./is-primitive-BnTv01xs.js";
import { isInteger$3 as isInteger, mapObjectKeys, recordEntriesDepthFirst, testPlainObjectOrPrimitive$2 as testPlainObjectOrPrimitive } from "./records-Ci2FTwQh.js";
import { isEqualContextString$2 as isEqualContextString, isEqualDefault$2 as isEqualDefault } from "./is-equal-CuJQbSdk.js";
import { compareIterableValuesShallow$2 as compareIterableValuesShallow } from "./iterable-compare-values-shallow-DVwcbvdw.js";
import "./interval-type-2J0Z5AgI.js";
import "./resolve-core-DK4rfu4C.js";
import "./src-CjCi0sir.js";
import { align, alignById, compareIterableValuesShallow as compareIterableValuesShallow$1, comparerInverse, continuously$1 as continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast$2 as hasLast, intervalToMs, isEmptyEntries, isEqualContextString as isEqualContextString$1, isEqualDefault as isEqualDefault$1, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger$2 as isInteger$1, isInterval, isMap, isPrimitive as isPrimitive$1, isPrimitiveOrObject, isReactive$2 as isReactive, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered, unique$4 as unique, uniqueInstances } from "./sleep-DGqNLDM-.js";

//#region ../packages/core/dist/src/records/compare.js
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
* Returns the changed fields from A -> B. It's assumed that A and B have the same shape.
* ie. returns an object that only consists of fields which have changed in B compared to A.
*
* ```js
* const a = { msg: `hi`, v: 10 };
*
* changedDataFields(a, { msg: `hi`,   v: 10 }); // {}
* changedDataFields(a, { msg: `hi!!`, v: 10 }); // { msg: `hi!!` }
* changedDataFields(a, { msg: `hi!!` });       // { msg: `hi!!`, v: undefined }
* ```
*
* Under the hood, we use {@link compareObjectData}(a, b, true). If B has additional or removed fields,
* this is considered an error.
*
* If a field is an array, the whole array is returned, rather than a diff.
* @param a
* @param b
*/
const changedObjectDataFields = (a, b) => {
	const r = compareObjectData(a, b, true);
	if (Object.entries(r.added).length > 0) throw new Error(`Shape of data has changed`);
	if (Object.entries(r.removed).length > 0) throw new Error(`Shape of data has changed`);
	const output = compareResultToObject(r, b);
	return output;
};
const compareResultToObject = (r, b) => {
	const output = {};
	if (r.isArray) return b;
	for (const entry of Object.entries(r.changed)) output[entry[0]] = entry[1];
	for (const entry of Object.entries(r.added)) output[entry[0]] = entry[1];
	for (const childEntry of Object.entries(r.children)) {
		const childResult = childEntry[1];
		if (childResult.hasChanged) output[childEntry[0]] = compareResultToObject(childResult, b[childEntry[0]]);
	}
	return output;
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
//#region ../packages/core/dist/src/records/clone-from-fields.js
const cloneFromFields = (source) => {
	const entries = [];
	for (const field in source) {
		const value = source[field];
		if (testPlainObjectOrPrimitive(value)) entries.push([field, value]);
	}
	return Object.fromEntries(entries);
};

//#endregion
//#region ../packages/core/dist/src/records/map-object.js
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
/**
* Maps the contents of `data` using `mapper` as a structured set of map functions.
* ```js
* const a = {
*  person: {
*    size: 20
*  }
*  hello: `there`
* }
* mapObjectByObject(a, {
*  person: {
*    size: (value, context) => {
*      return value * 2
*    }
*  }
* });
* // Yields: { person: { size: 40 }, hello: `there` }
* ```
* @param data
* @param mapper
* @returns
*/
function mapObjectByObject(data, mapper) {
	const entries = Object.entries(data);
	for (const entry of entries) if (entry[0] in mapper) {
		const m = mapper[entry[0]];
		entry[1] = typeof m === `object` ? mapObjectByObject(entry[1], m) : m(entry[1], data);
	}
	return Object.fromEntries(entries);
}

//#endregion
//#region ../packages/core/dist/src/records/traverse.js
/**
* Helper function to get a 'friendly' string representation of an array of {@link RecordEntry}.
* @param entries
* @returns
*/
function prettyPrintEntries(entries) {
	if (entries.length === 0) return `(empty)`;
	let t = ``;
	for (const [index, entry] of entries.entries()) {
		t += `  `.repeat(index);
		t += entry.name + ` = ` + JSON.stringify(entry.nodeValue) + `\n`;
	}
	return t;
}
/**
* Returns a human-friendly debug string for a tree-like structure
* ```js
* console.log(Trees.prettyPrint(obj));
* ```
* @param indent
* @param node
* @param options
* @returns
*/
const recordEntryPrettyPrint = (node, indent = 0, options = {}) => {
	resultThrow(nullUndefTest(node, `node`));
	const defaultName = options.name ?? `node`;
	const entry = getNamedRecordEntry(node, defaultName);
	const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.nodeValue)}`;
	const childrenAsArray = [...recordChildren(node, options)];
	return childrenAsArray.length > 0 ? t + `\n` + childrenAsArray.map((d) => recordEntryPrettyPrint(d.nodeValue, indent + 1, {
		...options,
		name: d.name
	})).join(`\n`) : t;
};
/**
* Returns the direct children of a tree-like object as a pairing
* of node name and value. Supports basic objects, Maps and arrays.
*
* Sub-children are included as an object blob.
*
* @example Simple object
* ```js
* const o = {
*  colour: {
*    r: 0.5, g: 0.5, b: 0.5
*  }
* };
*
* const children = [ ...Trees.children(o) ];
* // Children:
* // [
* //  { name: "colour", value: { b: 0.5, g: 0.5, r: 0.5 } }
* // ]
* const subChildren = [ ...Trees.children(o.colour) ];
* // [ { name: "r", value: 0.5 }, { name: "g", value: 0.5 }, { name: "b", value: 0.5 } ]
* ```
*
* Arrays are assigned a name based on index.
* @example Arrays
* ```js
* const colours = [ { r: 1, g: 0, b: 0 }, { r: 0, g: 1, b: 0 }, { r: 0, g: 0, b: 1 } ];
* // Children:
* // [
* //  { name: "array[0]", value: {r:1,g:0,b:0} },
* //  { name: "array[1]", value: {r:0,g:1,b:0} },
* //  { name: "array[2]", value: {r:0,g:0,b:1} },
* // ]
* ```
*
* Pass in `options.name` (eg 'colours') to have names generated as 'colours[0]', etc.
* Options can also be used to filter children. By default all direct children are returned.
* @param node
* @param options
*/
function* recordChildren(node, options = {}) {
	resultThrow(nullUndefTest(node, `node`));
	const filter = options.filter ?? `none`;
	const filterByValue = (v) => {
		if (filter === `none`) return [true, isPrimitive$1(v)];
		else if (filter === `leaves` && isPrimitive$1(v)) return [true, true];
		else if (filter === `branches` && !isPrimitive$1(v)) return [true, false];
		return [false, isPrimitive$1(v)];
	};
	if (Array.isArray(node)) for (const [index, element] of node.entries()) {
		const f = filterByValue(element);
		if (f[0]) yield {
			name: index.toString(),
			sourceValue: element,
			nodeValue: f[1] ? element : void 0
		};
	}
	else if (typeof node === `object`) {
		const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
		for (const [name, value] of entriesIter) {
			const f = filterByValue(value);
			if (f[0]) yield {
				name,
				sourceValue: value,
				nodeValue: f[1] ? value : void 0
			};
		}
	}
}
function* recordEntriesDepthFirst$1(node, options = {}, ancestors = []) {
	for (const c of recordChildren(node, options)) {
		yield {
			...c,
			ancestors: [...ancestors]
		};
		yield* recordEntriesDepthFirst$1(c.sourceValue, options, [...ancestors, c.name]);
	}
}
/**
* Finds a given direct child by name
* @param name
* @param node
* @returns
*/
function recordEntryChildByName(name, node) {
	for (const d of recordChildren(node)) if (d.name === name) return d;
}
/**
* Returns the closest matching entry, tracing `path` in an array, Map or simple object.
* Returns an entry with _undefined_ value at the point where tracing stopped.
* Use {@link traceRecordEntryByPath} to step through all the segments.
*
* ```js
* const people = {
*  jane: {
*   address: {
*    postcode: 1000,
*    street: 'West St',
*    city: 'Blahville'
*   },
* colour: 'red'
*  }
* }
* Trees.getByPath('jane.address.postcode', people); // '.' default separator
* // ['postcode', 1000]
* Trees.getByPath('jane.address.country.state', people);
* // ['country', undefined] - since full path could not be resolved.
* ```
* @param path Path, eg `jane.address.postcode`
* @param node Node to look within
* @param options Options for parsing path. By default '.' is used as a separator
* @returns
*/
function getRecordEntryByPath(path, node, options = {}) {
	const paths = [...traceRecordEntryByPath(path, node, options)];
	if (paths.length === 0) throw new Error(`Could not trace path: ${path} `);
	return paths.at(-1);
}
/**
* Enumerates over children of `node` towards the node named in `path`.
* This is useful if you want to get the interim steps to the target node.
*
* Use {@link getRecordEntryByPath} if you don't care about interim steps.
*
* ```js
* const people = {
*  jane: {
*   address: {
*    postcode: 1000,
*    street: 'West St',
*    city: 'Blahville'
*   },
* colour: 'red'
*  }
* }
* for (const p of Trees.traceByPath('jane.address.street', people)) {
* // { name: "jane", value: { address: { postcode: 1000,street: 'West St', city: 'Blahville' }, colour: 'red'} },
* // { name: "address", value: { postcode: 1000, street: 'West St', city: 'Blahville' } },
* // { name: "street", value: "West St" } }
* }
* ```
*
* Results stop when the path can't be followed any further.
* The last entry will have a name of the last sought path segment, and _undefined_ as its value.
*
* @param path Path to traverse
* @param node Starting node
* @param options Options for path traversal logic
* @returns
*/
function* traceRecordEntryByPath(path, node, options = {}) {
	resultThrow(nullUndefTest(path, `path`), nullUndefTest(node, `node`));
	const separator = options.separator ?? `.`;
	const pathSplit = path.split(separator);
	const ancestors = [];
	for (const p of pathSplit) {
		const entry = recordEntryChildByName(p, node);
		if (!entry) {
			yield {
				name: p,
				sourceValue: void 0,
				nodeValue: void 0,
				ancestors
			};
			return;
		}
		node = entry.sourceValue;
		yield {
			...entry,
			ancestors: [...ancestors]
		};
		ancestors.push(p);
	}
}
/**
* Generates a name for a node.
* Uses the 'name' property if it exists, otherwise uses `defaultName`
* @param node
* @param defaultName
* @returns
*/
function getNamedRecordEntry(node, defaultName = ``) {
	if (`name` in node && `nodeValue` in node && `sourceValue` in node) return node;
	if (`name` in node) return {
		name: node.name,
		nodeValue: node,
		sourceValue: node
	};
	return {
		name: defaultName,
		nodeValue: node,
		sourceValue: node
	};
}

//#endregion
//#region ../packages/core/dist/src/records/merge.js
function mergeObjects(...a) {
	return Object.assign({}, ...a);
}

//#endregion
//#region ../packages/core/dist/src/records/keys-to-numbers.js
/**
* Returns a copy of `object` with integer numbers as keys instead of whatever it has.
* ```js
* keysToNumbers({ '1': true }); // Yields: { 1: true }
* ```
*
* The `onInvalidKey` sets how to handle keys that cannot be converted to integers.
* * 'throw' (default): throws an exception
* * 'ignore': that key & value is ignored
* * 'keep': uses the string key instead
*
*
* ```js
* keysToNumber({ hello: 'there' }, `ignore`); // Yields: {  }
* keysToNumber({ hello: 'there' }, `throw`);  // Exception
* keysToNumber({ hello: 'there' }, `keep`);   // Yields: { hello: 'there' }
* ```
*
* Floating-point numbers will be converted to integer by rounding.
* ```js
* keysToNumbers({ '2.4': 'hello' }); // Yields: { 2: 'hello' }
* ```
* @param object
* @param onInvalidKey
* @returns
*/
const keysToNumbers = (object, onInvalidKey = `throw`) => {
	const returnObject = {};
	for (const entry of Object.entries(object)) {
		const asNumber = Number.parseInt(entry[0]);
		if (Number.isNaN(asNumber)) switch (onInvalidKey) {
			case `throw`: throw new TypeError(`Cannot convert key '${entry[0]}' to an integer`);
			case `ignore`: continue;
			case `keep`: {
				returnObject[entry[0]] = entry[1];
				continue;
			}
			default: throw new Error(`Param 'onInvalidKey' should be: 'throw', 'ignore' or 'keep'.`);
		}
		returnObject[asNumber] = entry[1];
	}
	return returnObject;
};

//#endregion
//#region ../packages/core/dist/src/records/pathed.js
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
* Returns a copy of `source` with `changes` applied.
* @param source
* @param changes
*/
const applyChanges = (source, changes) => {
	for (const change of changes) source = updateByPath(source, change.path, change.value);
	return source;
};
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
* Iterates 'paths' for all the fields on `o`
* ```
* const d = {
*  accel: { x: 1, y: 2, z: 3 },
*  gyro: { x: 4, y: 5, z: 6 }
* };
* const paths = [...getFieldPaths(d)];
* // Yields [ `accel`, `gyro`, `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
* ```
*
* Use {@link getField} to fetch data based on a path
*
* If object is _null_ or _undefined_, no results are returned.
*
* If `onlyLeaves` is _true_ (default: _false_), only 'leaf' nodes are included.
* Leaf nodes are those that contain a primitive value.
* ```js
* const paths = getFieldPaths(d, true);
* // Yields [ `accel.x`, `accel.y`,`accel.z`,`gyro.x`,`gyro.y`,`gyro.z` ]
* ```
*
* @param object Object to get paths for.
* @param onlyLeaves If true, only paths with a primitive value are returned.
* @returns
*/
function* getPaths(object, onlyLeaves = false) {
	if (object === void 0 || object === null) return;
	const iter = recordEntriesDepthFirst(object);
	for (const c of iter) {
		if (c.nodeValue === void 0 && onlyLeaves) continue;
		let path = c.name;
		if (c.ancestors.length > 0) path = c.ancestors.join(`.`) + `.` + path;
		yield path;
	}
}
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
//#region ../packages/core/dist/src/records/index.js
var records_exports = {};
__export(records_exports, {
	applyChanges: () => applyChanges,
	changedObjectDataFields: () => changedObjectDataFields,
	cloneFromFields: () => cloneFromFields,
	compareArrays: () => compareArrays,
	compareData: () => compareData,
	compareObjectData: () => compareObjectData,
	compareObjectKeys: () => compareObjectKeys,
	getField: () => getField,
	getPaths: () => getPaths,
	getPathsAndData: () => getPathsAndData,
	getRecordEntryByPath: () => getRecordEntryByPath,
	keysToNumbers: () => keysToNumbers,
	mapObjectByObject: () => mapObjectByObject,
	mapObjectKeys: () => mapObjectKeys$1,
	mapObjectShallow: () => mapObjectShallow,
	mergeObjects: () => mergeObjects,
	prettyPrintEntries: () => prettyPrintEntries,
	recordChildren: () => recordChildren,
	recordEntriesDepthFirst: () => recordEntriesDepthFirst$1,
	recordEntryPrettyPrint: () => recordEntryPrettyPrint,
	traceRecordEntryByPath: () => traceRecordEntryByPath,
	updateByPath: () => updateByPath
});
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
const mapObjectKeys$1 = (object, mapFunction) => {
	const destinationObject = {};
	for (const entries of Object.entries(object)) {
		const key = mapFunction(entries[0]);
		destinationObject[key] = entries[1];
	}
	return destinationObject;
};

//#endregion
//#region ../packages/core/dist/src/maps.js
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
//#region ../packages/core/dist/src/trackers/tracked-value.js
/**
* Keeps track of keyed values of type `V` (eg Point). It stores occurences in type `T`, which
* must extend from `TrackerBase<V>`, eg `PointTracker`.
*
* The `creator` function passed in to the constructor is responsible for instantiating
* the appropriate `TrackerBase` sub-class.
*
* @example Sub-class
* ```js
* export class PointsTracker extends TrackedValueMap<Points.Point> {
*  constructor(opts:TrackOpts = {}) {
*   super((key, start) => {
*    if (start === undefined) throw new Error(`Requires start point`);
*    const p = new PointTracker(key, opts);
*    p.seen(start);
*    return p;
*   });
*  }
* }
* ```
*
*/
var TrackedValueMap = class {
	store;
	gog;
	constructor(creator) {
		this.store = new Map();
		this.gog = getOrGenerate(this.store, creator);
	}
	/**
	* Number of named values being tracked
	*/
	get size() {
		return this.store.size;
	}
	/**
	* Returns _true_ if `id` is stored
	* @param id
	* @returns
	*/
	has(id) {
		return this.store.has(id);
	}
	/**
	* For a given id, note that we have seen one or more values.
	* @param id Id
	* @param values Values(s)
	* @returns Information about start to last value
	*/
	async seen(id, ...values) {
		const trackedValue = await this.getTrackedValue(id, ...values);
		const result = trackedValue.seen(...values);
		return result;
	}
	/**
	* Creates or returns a TrackedValue instance for `id`.
	* @param id
	* @param values
	* @returns
	*/
	async getTrackedValue(id, ...values) {
		if (id === null) throw new Error(`id parameter cannot be null`);
		if (id === void 0) throw new Error(`id parameter cannot be undefined`);
		const trackedValue = await this.gog(id, values[0]);
		return trackedValue;
	}
	/**
	* Remove a tracked value by id.
	* Use {@link reset} to clear them all.
	* @param id
	*/
	delete(id) {
		this.store.delete(id);
	}
	/**
	* Remove all tracked values.
	* Use {@link delete} to remove a single value by id.
	*/
	reset() {
		this.store = new Map();
	}
	/**
	* Enumerate ids
	*/
	*ids() {
		yield* this.store.keys();
	}
	/**
	* Enumerate tracked values
	*/
	*tracked() {
		yield* this.store.values();
	}
	/**
	* Iterates TrackedValues ordered with oldest first
	* @returns
	*/
	*trackedByAge() {
		const tp = [...this.store.values()];
		tp.sort((a, b) => {
			const aa = a.elapsed;
			const bb = b.elapsed;
			if (aa === bb) return 0;
			if (aa > bb) return -1;
			return 1;
		});
		for (const t of tp) yield t;
	}
	/**
	* Iterates underlying values, ordered by age (oldest first)
	* First the named values are sorted by their `elapsed` value, and then
	* we return the last value for that group.
	*/
	*valuesByAge() {
		for (const tb of this.trackedByAge()) yield tb.last;
	}
	/**
	* Enumerate last received values
	*
	* @example Calculate centroid of latest-received values
	* ```js
	* const pointers = pointTracker();
	* const c = Points.centroid(...Array.from(pointers.lastPoints()));
	* ```
	*/
	*last() {
		for (const p of this.store.values()) yield p.last;
	}
	/**
	* Enumerate starting values
	*/
	*initialValues() {
		for (const p of this.store.values()) yield p.initial;
	}
	/**
	* Returns a tracked value by id, or undefined if not found
	* @param id
	* @returns
	*/
	get(id) {
		return this.store.get(id);
	}
};

//#endregion
//#region ../packages/core/dist/src/trackers/tracker-base.js
/**
* Base tracker class
*/
var TrackerBase = class {
	/**
	* @ignore
	*/
	seenCount;
	/**
	* @ignore
	*/
	storeIntermediate;
	/**
	* @ignore
	*/
	resetAfterSamples;
	/**
	* @ignore
	*/
	sampleLimit;
	id;
	debug;
	constructor(opts = {}) {
		this.id = opts.id ?? `tracker`;
		this.debug = opts.debug ?? false;
		this.sampleLimit = opts.sampleLimit ?? -1;
		this.resetAfterSamples = opts.resetAfterSamples ?? -1;
		this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
		this.seenCount = 0;
		if (this.debug) console.log(`TrackerBase: sampleLimit: ${this.sampleLimit} resetAfter: ${this.resetAfterSamples} store: ${this.storeIntermediate}`);
	}
	/**
	* Reset tracker
	*/
	reset() {
		this.seenCount = 0;
		this.onReset();
	}
	/**
	* Adds a value, returning computed result.
	*
	* At this point, we check if the buffer is larger than `resetAfterSamples`. If so, `reset()` is called.
	* If not, we check `sampleLimit`. If the buffer is twice as large as sample limit, `trimStore()` is
	* called to take it down to sample limit, and `onTrimmed()` is called.
	* @param p
	* @returns
	*/
	seen(...p) {
		if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) this.reset();
		else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
			this.seenCount = this.trimStore(this.sampleLimit);
			this.onTrimmed(`resize`);
		}
		this.seenCount += p.length;
		const t = this.filterData(p);
		return this.computeResults(t);
	}
};

//#endregion
//#region ../packages/core/dist/src/trackers/object-tracker.js
/**
* A tracked value of type `V`.
*/
var ObjectTracker = class extends TrackerBase {
	values;
	constructor(opts = {}) {
		super(opts);
		this.values = [];
	}
	onTrimmed(reason) {}
	/**
	* Reduces size of value store to `limit`.
	* Returns number of remaining items
	* @param limit
	*/
	trimStore(limit) {
		if (limit >= this.values.length) return this.values.length;
		this.values = this.values.slice(-limit);
		return this.values.length;
	}
	/**
	* Allows sub-classes to be notified when a reset happens
	* @ignore
	*/
	onReset() {
		this.values = [];
	}
	/**
	* Tracks a value
	* @ignore
	*/
	filterData(p) {
		const ts = p.map((v) => `at` in v ? v : {
			...v,
			at: Date.now()
		});
		const last = ts.at(-1);
		if (this.storeIntermediate) this.values.push(...ts);
		else switch (this.values.length) {
			case 0: {
				this.values.push(last);
				break;
			}
			case 1: {
				this.values.push(last);
				break;
			}
			case 2: {
				this.values[1] = last;
				break;
			}
		}
		return ts;
	}
	/**
	* Last seen value. If no values have been added, it will return the initial value
	*/
	get last() {
		if (this.values.length === 1) return this.values[0];
		return this.values.at(-1);
	}
	/**
	* Returns the oldest value in the buffer
	*/
	get initial() {
		return this.values.at(0);
	}
	/**
	* Returns number of recorded values (includes the initial value in the count)
	*/
	get size() {
		return this.values.length;
	}
	/**
	* Returns the elapsed time, in milliseconds since the initial value
	*/
	get elapsed() {
		return Date.now() - this.values[0].at;
	}
};

//#endregion
//#region ../packages/core/dist/src/trackers/primitive-tracker.js
var PrimitiveTracker = class extends TrackerBase {
	values;
	timestamps;
	constructor(opts) {
		super(opts);
		this.values = [];
		this.timestamps = [];
	}
	/**
	* Reduces size of value store to `limit`. Returns
	* number of remaining items
	* @param limit
	*/
	trimStore(limit) {
		if (limit >= this.values.length) return this.values.length;
		this.values = this.values.slice(-limit);
		this.timestamps = this.timestamps.slice(-limit);
		return this.values.length;
	}
	onTrimmed(reason) {}
	get last() {
		return this.values.at(-1);
	}
	get initial() {
		return this.values.at(0);
	}
	/**
	* Returns number of recorded values (this can include the initial value)
	*/
	get size() {
		return this.values.length;
	}
	/**
	* Returns the elapsed time, in milliseconds since the instance was created
	*/
	get elapsed() {
		if (this.values.length < 0) throw new Error(`No values seen yet`);
		return Date.now() - this.timestamps[0];
	}
	onReset() {
		this.values = [];
		this.timestamps = [];
	}
	/**
	* Tracks a value
	*/
	filterData(rawValues) {
		const lastValue = rawValues.at(-1);
		const last = {
			value: lastValue,
			at: performance.now()
		};
		const values = rawValues.map((value) => ({
			at: performance.now(),
			value
		}));
		if (this.storeIntermediate) {
			this.values.push(...rawValues);
			this.timestamps.push(...values.map((v) => v.at));
		} else switch (this.values.length) {
			case 0: {
				this.values.push(last.value);
				this.timestamps.push(last.at);
				break;
			}
			case 2: {
				this.values[1] = last.value;
				this.timestamps[1] = last.at;
				break;
			}
			case 1: {
				this.values.push(last.value);
				this.timestamps.push(last.at);
				break;
			}
		}
		return values;
	}
};

//#endregion
//#region ../packages/core/dist/src/trackers/index.js
var trackers_exports = {};
__export(trackers_exports, {
	ObjectTracker: () => ObjectTracker,
	PrimitiveTracker: () => PrimitiveTracker,
	TrackedValueMap: () => TrackedValueMap,
	TrackerBase: () => TrackerBase
});

//#endregion
export { records_exports as Records, trackers_exports as Trackers, align, alignById, compareIterableValuesShallow$1 as compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast, intervalToMs, isEmptyEntries, isEqualContextString$1 as isEqualContextString, isEqualDefault$1 as isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger$1 as isInteger, isInterval, isMap, isPrimitive$1 as isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered, unique, uniqueInstances };
//# sourceMappingURL=core.js.map