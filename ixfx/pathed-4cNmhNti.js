import { __export } from "./chunk-51aI8Tpl.js";
import { isPrimitive } from "./is-primitive-BDz6cwtd.js";
import { compareObjectKeys, recordEntriesDepthFirst, testPlainObjectOrPrimitive } from "./records-XG4QHVXn.js";
import { isEqualContextString } from "./is-equal-edylSnsn.js";
import { isInteger } from "./is-integer-D1QCbjZ-.js";

//#region ../core/dist/src/pathed.js
var pathed_exports = {};
__export(pathed_exports, {
	applyChanges: () => applyChanges,
	compareData: () => compareData,
	getField: () => getField,
	getPaths: () => getPaths,
	getPathsAndData: () => getPathsAndData,
	updateByPath: () => updateByPath
});
/**
* Get the entries for `target`.
*
* 'deep probe' uses alternative means to get entries of object, since `Object.entries`
* can fail for some objects.
* @param target Object to get entries from
* @param deepProbe If true
* @returns
*/
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
	const skipInstances = options.skipInstances ?? /* @__PURE__ */ new WeakSet();
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
	const entriesAKeys = /* @__PURE__ */ new Set();
	for (const [key, valueA] of entriesA) {
		entriesAKeys.add(key);
		const keyOfAInB = key in b;
		const valueOfKeyInB = b[key];
		if (typeof valueA === `object` && valueA !== null) {
			if (skipInstances.has(valueA)) continue;
			skipInstances.add(valueA);
			if (keyOfAInB) if (valueOfKeyInB === void 0) throw new Error(`Pathed.compareData Value for key ${key} is undefined`);
			else {
				const sub = [...compareData(valueA, valueOfKeyInB, {
					...options,
					skipInstances,
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
		} else {
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
*
* ```js
* getField({ name: { first: `Thom`, last: `Yorke` }}, `name.first`); // { value: `Thom`  success: true }
* getField({ colours: [`red`, `green`, `blue` ]}, `colours.1`);      // { value: `green` success: true }
* ```
*
* Returns an error result with more details, eg `{ success: false, error: 'Path could not be found' }`
*
* Throws if:
* * `path` is not a string or empty
* * `object` is _undefined_ or null
* @param object Object to query
* @param path Path
* @param separator Separator of chunks of path. Defaults to '.'
* @returns
*/
const getField = (object, path, separator = `.`) => {
	if (typeof path !== `string`) throw new Error(`Param 'path' ought to be a string. Got: '${typeof path}'`);
	if (path.length === 0) throw new Error(`Param string 'path' is empty`);
	if (object === void 0) throw new Error(`Param 'object' is undefined`);
	if (object === null) throw new Error(`Param 'object' is null`);
	const split = path.split(separator);
	const v = getFieldImpl(object, split, path);
	return v;
};
const getFieldImpl = (object, split, position) => {
	if (object === void 0) return {
		success: false,
		error: `Param 'object' is undefined. Position: ${position}`
	};
	if (split.length === 0) return {
		success: false,
		error: `Path has been exhausted. position: ${position}`
	};
	const start = split.shift();
	if (!start) return {
		success: false,
		error: `Unexpected empty split path. Position: ${position}`
	};
	const isInt = isInteger(start);
	if (isInt && Array.isArray(object)) {
		const index = Number.parseInt(start);
		if (typeof object[index] === `undefined`) return {
			success: false,
			error: `Index '${index}' does not exist. Length: ${object.length}. Position: ${position}`
		};
		if (split.length === 0) return {
			value: object[index],
			success: true
		};
		else return getFieldImpl(object[index], split, split.join(`.`));
	} else if (typeof object === `object` && start in object) if (split.length === 0) return {
		value: object[start],
		success: true
	};
	else return getFieldImpl(object[start], split, split.join(`.`));
	else return {
		success: false,
		error: `Path '${start}' not found. Position: ${position}`
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
export { compareData, getField, getPathsAndData, pathed_exports, updateByPath };
//# sourceMappingURL=pathed-4cNmhNti.js.map