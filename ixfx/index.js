import "./numbers-C359_5A6.js";
import { isPrimitive, isPrimitiveOrObject } from "./is-primitive-BDz6cwtd.js";
import { records_exports } from "./records-XG4QHVXn.js";
import { defaultToString, isMap, isSet, toStringDefault } from "./to-string-Dg1sJUf1.js";
import { comparerInverse, defaultComparer, jsComparer, numericComparer } from "./comparers-BtlnApnB.js";
import { isEmptyEntries, isEqualContextString, isEqualDefault, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, toStringOrdered } from "./is-equal-edylSnsn.js";
import { maps_exports } from "./maps-a_ogDHUT.js";
import { pathed_exports } from "./pathed-4cNmhNti.js";
import { continuously } from "./continuously-CFHq8KyU.js";
import { defaultKeyer } from "./default-keyer-CnxB2rd_.js";
import { elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince } from "./elapsed-DEWYfvwx.js";
import { toStringAbbreviate } from "./text-UM1t_CE6.js";
import { isInteger } from "./is-integer-D1QCbjZ-.js";
import { compareIterableValuesShallow } from "./iterable-compare-values-shallow-DOeUS4hy.js";
import { keyValueSorter } from "./key-value-DKJIoES-.js";
import { elapsedToHumanString, intervalToMs, isInterval } from "./interval-type-Y39UZyyQ.js";
import { unique, uniqueInstances } from "./track-unique-y44MYbQM.js";
import { promiseFromEvent } from "./promise-from-event--N3r1LR5.js";
import { hasLast, isReactive, resolve, resolveSync, resolveWithFallback, resolveWithFallbackSync } from "./resolve-core-cAVLLopl.js";
import "./error-message-B6EPesrV.js";
import { sleep, sleepWhile } from "./sleep-C2hKDgCi.js";

//#region ../core/dist/src/trackers/index.js
var trackers_exports = {};

//#endregion
//#region ../core/dist/src/correlate.js
const orderScore = (a, b) => {
	if (a.score > b.score) return -1;
	else if (a.score < b.score) return 1;
	return 0;
};
/**
* Attempts to align prior data with new data, based on a provided similarity function.
*
* See also `alignById` for a version which encloses parameters.
*
* ```js
* // Compare data based on x,y distance
* const fn = (a, b) => {
*  return 1-Points.distance(a, b);
* }
* const lastData = [
*  { id:`1`, x:100, y:200 }
*  ...
* ]
* const newData = [
*  { id:`2`, x:101, y:200 }
* ]
* const aligned = Correlate.align(fn, lastdata, newData, opts);
*
* // Result:
* [
*  { id:`1`, x:101, y:200 }
* ]
* ```
* @param similarityFunction Function to compute similarity
* @param lastData Old data
* @param newData New data
* @param options Options
* @returns
*/
const align = (similarityFunction, lastData, newData, options = {}) => {
	const matchThreshold = options.matchThreshold ?? 0;
	const debug = options.debug ?? false;
	const results = /* @__PURE__ */ new Map();
	const newThings = [];
	const lastMap = /* @__PURE__ */ new Map();
	lastData?.forEach((d, index) => {
		if (typeof d === `undefined`) throw new Error(`'lastData' contains undefined (index: ${index.toString()})`);
		lastMap.set(d.id, d);
	});
	for (const newD of newData) {
		if (!lastData || lastData.length === 0) {
			if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
			newThings.push(newD);
			continue;
		}
		const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
			id: last.id,
			score: last === null ? -1 : similarityFunction(last, newD),
			last
		}));
		if (scoredLastValues.length === 0) {
			if (debug) console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
			newThings.push(newD);
			continue;
		}
		scoredLastValues.sort(orderScore);
		const top = scoredLastValues[0];
		if (top.score < matchThreshold) {
			if (debug) console.debug(`Correlate.align() new item does not reach threshold. Top score: ${top.score.toString()} id: ${newD.id}`);
			newThings.push(newD);
			continue;
		}
		if (debug && top.id !== newD.id) console.log(`Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score.toString()})`);
		results.set(top.id, {
			...newD,
			id: top.id
		});
		lastMap.delete(top.id);
	}
	newThings.forEach((t) => results.set(t.id, t));
	return Array.from(results.values());
};
/**
* Returns a function that attempts to align a series of data by its id.
* See also {@link align} for a version with no internal storage.
*
* ```js
* // Compare data based on x,y distance
* const fn = (a, b) => {
*  return 1-Points.distance(a, b);
* }
* const aligner = Correlate.alignById(fn, opts);
*
* const lastData = [
*  { id:`1`, x:100, y:200 }
*  ...
* ]
* const aligned = aligner(lastData);
*
* ```
* @param fn Function to compute similarity
* @param options Options
* @returns
*/
const alignById = (fn, options = {}) => {
	let lastData = [];
	const compute = (newData) => {
		lastData = align(fn, lastData, newData, options);
		return [...lastData];
	};
	return compute;
};

//#endregion
//#region ../core/dist/src/filters.js
/**
* Returns `v` if `predicate` returns _true_,
* alternatively returning `skipValue`.
*
* ```js
* // Return true if value is less than 10
* const p = v => v < 10;
*
* filterValue(5, p, 0);   // 5
* filterValue(20, p, 0);  // 0
* ```
* @param v Value to test
* @param predicate Predicate
* @param skipValue Value to return if predicate returns false
* @returns Input value if predicate is _true_, or `skipValue` if not.
*/
const filterValue = (v, predicate, skipValue) => {
	if (predicate(v)) return v;
	return skipValue;
};

//#endregion
//#region ../core/dist/src/is-equal-test.js
/**
* Wraps the `eq` function, tracing the input data result
* ```js
* // Init trace
* const traceEq = isEqualTrace(isEqualValueDefault);
* // Use it in some function that takes IsEqual<T>
* compare(a, b, eq);
* ```
* @param eq
* @returns
*/
const isEqualTrace = (eq) => {
	return (a, b) => {
		const result = eq(a, b);
		console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a)} b: ${toStringAbbreviate(b)}`);
		return result;
	};
};

//#endregion
//#region ../core/dist/src/platform.js
/**
* Returns _true_ if it seems like the code is running on iOS (iPad/iPhone)
* @returns
*/
const runningiOS = () => [
	`iPad Simulator`,
	`iPhone Simulator`,
	`iPod Simulator`,
	`iPad`,
	`iPhone`,
	`iPod`
].includes(navigator.platform) || navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

//#endregion
//#region ../core/dist/src/util/zip.js
const zip = (...arrays) => {
	if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
	const lengths = arrays.map((a) => a.length);
	const returnValue = [];
	const length = lengths[0];
	for (let index = 0; index < length; index++) returnValue.push(arrays.map((a) => a[index]));
	return returnValue;
};

//#endregion
//#region ../core/dist/src/resolve-fields.js
/**
* Returns a copy of `object`, with the same properties. For each property
* that has a basic value (string, number, boolean, object), the value is set
* for the return object. If the property is a function or generator, its value
* is used instead. Async functions and generators are also usable.
*
* Use {@link resolveFieldsSync} for a synchronous version.
*
* Not recursive.
*
* In the below example, the function for the property `random` is invoked.
* ```js
* const state = {
*  length: 10,
*  random: () => Math.random();
* }
* const x = resolveFields(state);
* // { length: 10, random: 0.1235 }
* ```
*
* It also works with generators. Probably best with those that are infinite.
*
* ```js
* import { count } from './numbers.js';
*
* const state = {
*  length: 10,
*  index: count(2) // Generator that yields: 0, 1 and then ends
* }
* resolveFields(state); // { length: 10, index: 0 }
* resolveFields(state); // { length: 10, index: 1 }
* // Generator finishes after counting twice:
* resolveFields(state); // { length: 10, index: undefined }
* ```
* @param object
* @returns
*/
async function resolveFields(object) {
	const resolvers = [];
	const keys = [];
	for (const entry of Object.entries(object)) {
		const resolvable = entry[1];
		resolvers.push(resolve(resolvable));
		keys.push(entry[0]);
	}
	const results = await Promise.all(resolvers);
	const entries = zip(keys, results);
	return Object.fromEntries(entries);
}
/**
* 'Resolves' all the fields of `object` in a synchronous manner.
* Uses {@link resolveSync} under-the-hood
* @param object
* @returns
*/
function resolveFieldsSync(object) {
	const entries = [];
	for (const entry of Object.entries(object)) {
		const resolvable = entry[1];
		const value = resolveSync(resolvable);
		entries.push([entry[0], value]);
	}
	return Object.fromEntries(entries);
}
/**
* Returns a function that resolves `object`.
*
* Use {@link resolveFields} to resolve an object directly.
* @param object
* @returns
*/

//#endregion
export { maps_exports as Maps, pathed_exports as Pathed, records_exports as Records, trackers_exports as Trackers, align, alignById, compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast, intervalToMs, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered, unique, uniqueInstances };
//# sourceMappingURL=index.js.map