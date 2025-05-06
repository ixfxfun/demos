import { __export } from "./chunk-51aI8Tpl.js";
import { IsEqual$1 as IsEqual, IsEqualContext$1 as IsEqualContext } from "./is-equal-B6tO-zUz.js";
import "./types-BDmh3f9N.js";
import "./resolve-core-BX-znrh1.js";
import { AlignOpts, ArrayItems, ArrayLengthMutationKeys, BasicType, ChangeKind, ChangeRecord, CompareChangeSet, CompareResult, Comparer, Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, DataWithId, DeepWriteable, FixedLengthArray, HasCompletion, HasCompletionRunStates, IDictionary, IWithEntries, Interval, IsEqual as IsEqual$1, IsEqualContext as IsEqualContext$1, KeyValue, KeyValueSortSyles, KeyValueSorter, OnStartCalled, Passed$1 as Passed, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction$1 as RankFunction, RankOptions$1 as RankOptions, Reactive$1 as Reactive, ReactiveInitial$1 as ReactiveInitial, ReactiveNonInitial$1 as ReactiveNonInitial, ReadonlyRemapObjectPropertyType, RecursivePartial, RecursiveReplace, RemapObjectPropertyType, RequireOnlyOne, ResolveFallbackOpts, ResolveToValue, ResolveToValueAsync, ResolveToValueSync, ResolvedObject, Rest, SignalKinds$1 as SignalKinds, Similarity, Since, SleepOpts, StringOrNumber, ToString, TrackUnique, Unsubscriber$1 as Unsubscriber, Writeable, align$1 as align, alignById$1 as alignById, compareIterableValuesShallow$1 as compareIterableValuesShallow, comparerInverse$1 as comparerInverse, continuously$2 as continuously, defaultComparer$1 as defaultComparer, defaultKeyer$1 as defaultKeyer, defaultToString$1 as defaultToString, elapsedInfinity$1 as elapsedInfinity, elapsedInterval$1 as elapsedInterval, elapsedOnce$1 as elapsedOnce, elapsedSince$1 as elapsedSince, elapsedToHumanString$1 as elapsedToHumanString, filterValue$1 as filterValue, hasLast$3 as hasLast, intervalToMs$1 as intervalToMs, isEmptyEntries$1 as isEmptyEntries, isEqualContextString$1 as isEqualContextString, isEqualDefault$1 as isEqualDefault, isEqualTrace$1 as isEqualTrace, isEqualValueDefault$1 as isEqualValueDefault, isEqualValueIgnoreOrder$1 as isEqualValueIgnoreOrder, isEqualValuePartial$1 as isEqualValuePartial, isInteger$4 as isInteger, isInterval$1 as isInterval, isMap$1 as isMap, isPrimitive$2 as isPrimitive, isPrimitiveOrObject$1 as isPrimitiveOrObject, isReactive$3 as isReactive, isSet$1 as isSet, jsComparer$1 as jsComparer, keyValueSorter$1 as keyValueSorter, numericComparer$1 as numericComparer, promiseFromEvent$1 as promiseFromEvent, resolve$1 as resolve, resolveFields$1 as resolveFields, resolveFieldsSync$1 as resolveFieldsSync, resolveSync$1 as resolveSync, resolveWithFallback$1 as resolveWithFallback, resolveWithFallbackSync$1 as resolveWithFallbackSync, runningiOS$1 as runningiOS, sleep$1 as sleep, sleepWhile$1 as sleepWhile, toStringDefault$1 as toStringDefault, toStringOrdered$1 as toStringOrdered, unique$5 as unique, uniqueInstances$1 as uniqueInstances } from "./types-compare-plRDnpX5.js";
import { Result$1 as Result } from "./types-eNZ7fzYy.js";

//#region ../packages/core/dist/src/records/compare.d.ts
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
declare const compareObjectKeys: (a: object, b: object) => {
  shared: string[];
  isSame: boolean;
  a: string[];
  b: string[];
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
declare const changedObjectDataFields: (a: object, b: object) => Record<string, unknown> | object[];
/**
 * Produces a {@link CompareChangeSet} between two arrays.
 *
 * @param a Earlier array to compare
 * @param b Later array to compare
 * @param eq Equality comparison for values
 * @returns Change set.
 */
declare const compareArrays: <TValue>(a: TValue[], b: TValue[], eq?: IsEqual<TValue>) => CompareChangeSet<number>;
/**
 * Compares A to B. Assumes they are simple objects, essentially key-value pairs, where the
 * values are primitive values or other simple objects. It also works with arrays.
 *
 * Uses === equality semantics by default.
 * @param a
 * @param b
 */
declare const compareObjectData: <T>(a: object | null, b: object | null, assumeSameShape?: boolean, eq?: IsEqual<T>) => CompareChangeSet<string>;

//#endregion
//#region ../packages/core/dist/src/records/clone-from-fields.d.ts
//# sourceMappingURL=compare.d.ts.map
declare const cloneFromFields: <T extends object>(source: T) => T;

//#endregion
//#region ../packages/core/dist/src/records/map-object.d.ts
//# sourceMappingURL=clone-from-fields.d.ts.map

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
declare const mapObjectShallow: <TSource extends Record<string, any>, TFieldValue>(object: TSource, mapFunction: (args: MapObjectArgs) => TFieldValue) => RemapObjectPropertyType<TSource, TFieldValue>;
type MapObjectArgs = {
  field: string;
  path: string;
  value: any;
  index: number;
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
declare function mapObjectByObject(data: object, mapper: Record<string, (value: any, context: any) => any>): {
  [k: string]: any;
};

//#endregion
//#region ../packages/core/dist/src/records/traverse.d.ts
//# sourceMappingURL=map-object.d.ts.map
type RecordEntry = Readonly<{
  name: string;
  sourceValue: any;
  nodeValue: any;
}>;
type RecordEntryWithAncestors = Readonly<{
  name: string;
  sourceValue: any;
  nodeValue: any;
  ancestors: string[];
}>;
type RecordEntryStatic = Readonly<{
  name: string;
  value: any;
  ancestors: string[];
}>;
/**
 * Options for parsing a path
 */
type PathOpts = {
  /**
   * Separator for path, eg '.'
   */
  readonly separator?: string;
};
type RecordChildrenOptions = Readonly<{
  /**
   * If set, only uses leaves or branches. 'none' means there is no filter.
   */
  filter: `none` | `leaves` | `branches`;
  /**
   * Default name to use. This is necessary in some cases, eg a root object.
   */
  name: string;
}>;
/**
 * Helper function to get a 'friendly' string representation of an array of {@link RecordEntry}.
 * @param entries
 * @returns
 */
declare function prettyPrintEntries(entries: readonly RecordEntry[]): string;
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
declare const recordEntryPrettyPrint: (node: object, indent?: number, options?: Partial<RecordChildrenOptions>) => string;
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
declare function recordChildren<T extends object>(node: T, options?: Partial<RecordChildrenOptions>): IterableIterator<RecordEntry>;
declare function recordEntriesDepthFirst<T extends object>(node: T, options?: Partial<RecordChildrenOptions>, ancestors?: string[]): IterableIterator<RecordEntryWithAncestors>;
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
declare function getRecordEntryByPath<T extends object>(path: string, node: T, options?: PathOpts): RecordEntry;
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
declare function traceRecordEntryByPath<T extends object>(path: string, node: T, options?: PathOpts): Iterable<RecordEntryWithAncestors>;

//#endregion
//#region ../packages/core/dist/src/records/merge.d.ts
//# sourceMappingURL=traverse.d.ts.map
type OptionalPropertyNames<T> = { [K in keyof T]-?: ({} extends Record<K, T[K]> ? K : never) }[keyof T];
type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };
type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
type SpreadTwo<L, R> = Id<Pick<L, Exclude<keyof L, keyof R>> & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>>;
type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R] ? SpreadTwo<L, Spread<R>> : unknown;
declare function mergeObjects<A extends object[]>(...a: [...A]): Spread<A>;

//#endregion
//#region ../packages/core/dist/src/records/keys-to-numbers.d.ts
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
declare const keysToNumbers: <T>(object: Record<string | number | symbol, T>, onInvalidKey?: `throw` | `ignore` | `keep`) => Record<number, T>;

//#endregion
//#region ../packages/core/dist/src/records/pathed.d.ts
//# sourceMappingURL=keys-to-numbers.d.ts.map
type PathData<V> = {
  path: string;
  value: V;
};
type PathDataChange<V> = PathData<V> & {
  previous?: V;
  state: `change` | `added` | `removed`;
};
type CompareDataOptions<V> = {
  /**
   * If _true_, it treats the B value as a partial
   * version of B. Only the things present in B are compared.
   * Omissions from B are not treated as removed keys.
   */
  asPartial: boolean;
  /**
   * If _true_ (default), if a value is undefined,
   * it signals that the key itself is removed.
   */
  undefinedValueMeansRemoved: boolean;
  pathPrefix: string;
  /**
   * Comparison function for values. By default uses
   * JSON.stringify() to compare by value.
   */
  eq: IsEqualContext<V>;
  /**
   * If true, inherited fields are also compared.
   * This is necessary for events, for example.
   *
   * Only plain-object values are used, the other keys are ignored.
   */
  deepEntries: boolean;
  /**
   * If _true_, includes fields that are present in B, but missing in A.
   * _False_ by default.
   */
  includeMissingFromA: boolean;
  /**
   * If _true_, emits a change under the path of a parent if its child has changed.
   * If _false_ (default) only changed keys are emitted.
   *
   * Eg if data is:
   * `{ colour: { h:0.5, s: 0.3, l: 0.5 }}`
   * and we compare with:
   * `{ colour: { h:1, s: 0.3, l: 0.5 }}`
   *
   * By default only 'colour.h' is emitted. If _true_ is set, 'colour' and 'colour.h' is emitted.
   */
  includeParents: boolean;
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
declare function compareData<V extends Record<string, any>>(a: V, b: Partial<V>, options?: Partial<CompareDataOptions<V>>): Generator<PathDataChange<any>>;
/**
 * Returns a copy of `source` with `changes` applied.
 * @param source
 * @param changes
 */
declare const applyChanges: <V extends Record<string, any>>(source: V, changes: PathDataChange<any>[]) => V;
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
declare const updateByPath: <V extends Record<string, any>>(target: V, path: string, value: any, allowShapeChange?: boolean) => V;
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
declare const getField: <V>(object: Record<string, any>, path: string) => Result<V, any>;
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
declare function getPaths(object: object | null, onlyLeaves?: boolean): Generator<string>;
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
declare function getPathsAndData(o: object, onlyLeaves?: boolean, maxDepth?: number, prefix?: string): Generator<PathData<any>>;

//#endregion
//#region ../packages/core/dist/src/records/index.d.ts
//# sourceMappingURL=pathed.d.ts.map
declare namespace index_d_exports {
  export { ChangeKind, ChangeRecord, CompareChangeSet, CompareDataOptions, MapObjectArgs, PathData, PathDataChange, PathOpts, RecordChildrenOptions, RecordEntry, RecordEntryStatic, RecordEntryWithAncestors, Spread, applyChanges, changedObjectDataFields, cloneFromFields, compareArrays, compareData, compareObjectData, compareObjectKeys, getField, getPaths, getPathsAndData, getRecordEntryByPath, keysToNumbers, mapObjectByObject, mapObjectKeys, mapObjectShallow, mergeObjects, prettyPrintEntries, recordChildren, recordEntriesDepthFirst, recordEntryPrettyPrint, traceRecordEntryByPath, updateByPath };
}
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
declare const mapObjectKeys: <TKeySource extends string | number | symbol, TKeyDestination extends string | number | symbol>(object: Record<TKeySource, unknown>, mapFunction: (key: TKeySource) => TKeyDestination) => Record<TKeyDestination, unknown>;

//#endregion
//#region ../packages/core/dist/src/maps.d.ts
//# sourceMappingURL=index.d.ts.map

type GetOrGenerate<K, V, Z> = (key: K, args?: Z) => Promise<V>;

//#endregion
//#region ../packages/core/dist/src/trackers/tracker-base.d.ts
/**
 * @inheritDoc getOrGenerate
 * @param map
 * @param fn
 * @returns
 */
/**
 * Base tracker class
 */
declare abstract class TrackerBase<V, SeenResultType> {
  /**
   * @ignore
   */
  seenCount: number;
  /**
   * @ignore
   */
  protected storeIntermediate: boolean;
  /**
   * @ignore
   */
  protected resetAfterSamples: number;
  /**
   * @ignore
   */
  protected sampleLimit: number;
  readonly id: string;
  protected debug: boolean;
  constructor(opts?: TrackedValueOpts);
  /**
   * Reset tracker
   */
  reset(): void;
  /**
   * Adds a value, returning computed result.
   *
   * At this point, we check if the buffer is larger than `resetAfterSamples`. If so, `reset()` is called.
   * If not, we check `sampleLimit`. If the buffer is twice as large as sample limit, `trimStore()` is
   * called to take it down to sample limit, and `onTrimmed()` is called.
   * @param p
   * @returns
   */
  seen(...p: Array<V>): SeenResultType;
  /**
   * @ignore
   * @param p
   */
  abstract filterData(p: Array<V>): Array<Timestamped>;
  abstract get last(): V | undefined;
  /**
   * Returns the initial value, or undefined
   */
  abstract get initial(): V | undefined;
  /**
   * Returns the elapsed milliseconds since the initial value
   */
  abstract get elapsed(): number;
  /**
   * @ignore
   */
  abstract computeResults(_p: Array<Timestamped>): SeenResultType;
  /**
   * @ignore
   */
  abstract onReset(): void;
  /**
   * Notification that buffer has been trimmed
   */
  abstract onTrimmed(reason: TrimReason): void;
  abstract trimStore(limit: number): number;
}
type TrimReason = `reset` | `resize`;

//#endregion
//#region ../packages/core/dist/src/trackers/tracked-value.d.ts
//# sourceMappingURL=tracker-base.d.ts.map
type Timestamped = {
  readonly at: number;
};
type TimestampedObject<V> = V & Timestamped;
/**
 * Options
 */
type TrackedValueOpts = {
  readonly id?: string;
  /**
   * If true, intermediate points are stored. False by default
   */
  readonly storeIntermediate?: boolean;
  /**
   * If above zero, tracker will reset after this many samples
   */
  readonly resetAfterSamples?: number;
  /**
   * If above zero, there will be a limit to intermediate values kept.
   *
   * When the seen values is twice `sampleLimit`, the stored values will be trimmed down
   * to `sampleLimit`. We only do this when the values are double the size so that
   * the collections do not need to be trimmed repeatedly whilst we are at the limit.
   *
   * Automatically implies storeIntermediate
   */
  readonly sampleLimit?: number;
  /**
   * If _true_, prints debug info
   */
  readonly debug?: boolean;
};
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
declare class TrackedValueMap<V, T extends TrackerBase<V, TResult>, TResult> {
  store: Map<string, T>;
  gog: GetOrGenerate<string, T, V>;
  constructor(creator: (key: string, start: V | undefined) => T);
  /**
   * Number of named values being tracked
   */
  get size(): number;
  /**
   * Returns _true_ if `id` is stored
   * @param id
   * @returns
   */
  has(id: string): boolean;
  /**
   * For a given id, note that we have seen one or more values.
   * @param id Id
   * @param values Values(s)
   * @returns Information about start to last value
   */
  seen(id: string, ...values: V[]): Promise<TResult>;
  /**
   * Creates or returns a TrackedValue instance for `id`.
   * @param id
   * @param values
   * @returns
   */
  protected getTrackedValue(id: string, ...values: V[]): Promise<T>;
  /**
   * Remove a tracked value by id.
   * Use {@link reset} to clear them all.
   * @param id
   */
  delete(id: string): void;
  /**
   * Remove all tracked values.
   * Use {@link delete} to remove a single value by id.
   */
  reset(): void;
  /**
   * Enumerate ids
   */
  ids(): Generator<string, void, unknown>;
  /**
   * Enumerate tracked values
   */
  tracked(): Generator<T, void, unknown>;
  /**
   * Iterates TrackedValues ordered with oldest first
   * @returns
   */
  trackedByAge(): Generator<T, void, unknown>;
  /**
   * Iterates underlying values, ordered by age (oldest first)
   * First the named values are sorted by their `elapsed` value, and then
   * we return the last value for that group.
   */
  valuesByAge(): Generator<V | undefined, void, unknown>;
  /**
   * Enumerate last received values
   *
   * @example Calculate centroid of latest-received values
   * ```js
   * const pointers = pointTracker();
   * const c = Points.centroid(...Array.from(pointers.lastPoints()));
   * ```
   */
  last(): Generator<V | undefined, void, unknown>;
  /**
   * Enumerate starting values
   */
  initialValues(): Generator<V | undefined, void, unknown>;
  /**
   * Returns a tracked value by id, or undefined if not found
   * @param id
   * @returns
   */
  get(id: string): TrackerBase<V, TResult> | undefined;
}

//#endregion
//#region ../packages/core/dist/src/trackers/object-tracker.d.ts
//# sourceMappingURL=tracked-value.d.ts.map
/**
 * A tracked value of type `V`.
 */
declare abstract class ObjectTracker<V extends object, SeenResultType> extends TrackerBase<V, SeenResultType> {
  values: Array<TimestampedObject<V>>;
  constructor(opts?: TrackedValueOpts);
  onTrimmed(reason: TrimReason): void;
  /**
   * Reduces size of value store to `limit`.
   * Returns number of remaining items
   * @param limit
   */
  trimStore(limit: number): number;
  /**
   * Allows sub-classes to be notified when a reset happens
   * @ignore
   */
  onReset(): void;
  /**
   * Tracks a value
   * @ignore
   */
  filterData(p: Array<V> | Array<TimestampedObject<V>>): Array<TimestampedObject<V>>;
  /**
   * Last seen value. If no values have been added, it will return the initial value
   */
  get last(): TimestampedObject<V>;
  /**
   * Returns the oldest value in the buffer
   */
  get initial(): TimestampedObject<V> | undefined;
  /**
   * Returns number of recorded values (includes the initial value in the count)
   */
  get size(): number;
  /**
   * Returns the elapsed time, in milliseconds since the initial value
   */
  get elapsed(): number;
}

//#endregion
//#region ../packages/core/dist/src/trackers/primitive-tracker.d.ts
//# sourceMappingURL=object-tracker.d.ts.map
type TimestampedPrimitive<V extends number | string> = {
  at: number;
  value: V;
};
declare abstract class PrimitiveTracker<V extends number | string, TResult> extends TrackerBase<V, TResult> {
  values: V[];
  timestamps: number[];
  constructor(opts?: TrackedValueOpts);
  /**
   * Reduces size of value store to `limit`. Returns
   * number of remaining items
   * @param limit
   */
  trimStore(limit: number): number;
  onTrimmed(reason: TrimReason): void;
  get last(): V | undefined;
  get initial(): V | undefined;
  /**
   * Returns number of recorded values (this can include the initial value)
   */
  get size(): number;
  /**
   * Returns the elapsed time, in milliseconds since the instance was created
   */
  get elapsed(): number;
  onReset(): void;
  /**
   * Tracks a value
   */
  filterData(rawValues: V[]): TimestampedPrimitive<V>[];
}

//#endregion
//#region ../packages/core/dist/src/trackers/index.d.ts
//# sourceMappingURL=primitive-tracker.d.ts.map
declare namespace index_d_exports$1 {
  export { ObjectTracker, PrimitiveTracker, Timestamped, TimestampedObject, TimestampedPrimitive, TrackedValueMap, TrackedValueOpts, TrackerBase, TrimReason };
}
//#endregion
export { AlignOpts, ArrayItems, ArrayLengthMutationKeys, BasicType, ChangeKind, ChangeRecord, CompareChangeSet, CompareResult, Comparer, Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, DataWithId, DeepWriteable, FixedLengthArray, HasCompletion, HasCompletionRunStates, IDictionary, IWithEntries, Interval, IsEqual$1 as IsEqual, IsEqualContext$1 as IsEqualContext, KeyValue, KeyValueSortSyles, KeyValueSorter, OnStartCalled, Passed, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction, RankOptions, Reactive, ReactiveInitial, ReactiveNonInitial, ReadonlyRemapObjectPropertyType, index_d_exports as Records, RecursivePartial, RecursiveReplace, RemapObjectPropertyType, RequireOnlyOne, ResolveFallbackOpts, ResolveToValue, ResolveToValueAsync, ResolveToValueSync, ResolvedObject, Rest, SignalKinds, Similarity, Since, SleepOpts, StringOrNumber, ToString, TrackUnique, index_d_exports$1 as Trackers, Unsubscriber, Writeable, align, alignById, compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast, intervalToMs, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered, unique, uniqueInstances };
//# sourceMappingURL=core.d.ts.map