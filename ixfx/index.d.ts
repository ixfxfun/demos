import { ChangeKind, ChangeRecord, CompareChangeSet, index_d_exports, pathed_d_exports } from "./pathed-DGKJECMt.js";
import { ReadonlyRemapObjectPropertyType, RecursivePartial, RecursiveReplace, RecursiveWriteable, RemapObjectPropertyType, RequireOnlyOne, Rest, Writeable } from "./ts-utility-CuIIcLBC.js";
import { IsEqual, IsEqualContext, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, toStringOrdered } from "./is-equal-aUE7iVHd.js";
import { BasicType, IDictionary, IWithEntries, Interval, KeyValue, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction, RankOptions, StringOrNumber, ToString } from "./types-BEAJ_GOH.js";
import { maps_d_exports } from "./maps-DpHdi7xH.js";
import "./types-CePLSdIj.js";
import { CompareResult, Comparer, comparerInverse, defaultComparer, jsComparer, numericComparer } from "./comparers-CnRxdsEs.js";
import { Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, HasCompletion, HasCompletionRunStates, OnStartCalled, continuously } from "./continuously-xAy8Jw7t.js";
import { KeyValueSortSyles, KeyValueSorter, keyValueSorter } from "./key-value-C5-ymAG2.js";
import { Passed, Reactive, ReactiveInitial, ReactiveNonInitial, ResolveFallbackOpts, ResolveToValue, ResolveToValueAsync, ResolveToValueSync, SignalKinds, Unsubscriber, resolve, resolveSync, resolveWithFallback, resolveWithFallbackSync } from "./resolve-core-p1htK_C7.js";
import { SleepOpts, sleep, sleepWhile } from "./sleep-h6i9m9g1.js";

//#region ../core/dist/src/trackers/index.d.ts
//#endregion
//#region ../core/dist/src/correlate.d.ts
/**
 * Returns the similarity of `a` and `b` to each other,
 * where higher similarity should be a higher number.
 * @param a
 * @param b
 */
type Similarity<V> = (a: V, b: V) => number;
/**
 * Options for alignmnent
 */
type AlignOpts = {
  /**
   * If the similarity score is above this threshold,
   * consider them the same
   */
  readonly matchThreshold?: number;
  /**
   * If true, additional console messages are printed during
   * execution.
   */
  readonly debug?: boolean;
};
/**
 * Some data with an id property.
 */
type DataWithId<V> = V & {
  readonly id: string;
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
declare const align: <V>(similarityFunction: Similarity<V>, lastData: readonly DataWithId<V>[] | undefined, newData: readonly DataWithId<V>[], options?: AlignOpts) => readonly DataWithId<V>[];
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
declare const alignById: <V>(fn: Similarity<V>, options?: AlignOpts) => (newData: DataWithId<V>[]) => DataWithId<V>[];
//# sourceMappingURL=correlate.d.ts.map
//#endregion
//#region ../core/dist/src/default-keyer.d.ts
/**
 * If values are strings, uses that as the key.
 * Otherwise uses `JSON.stringify`.
 * @param a
 * @returns
 */
declare const defaultKeyer: <V>(a: V) => string;
//# sourceMappingURL=default-keyer.d.ts.map
//#endregion
//#region ../core/dist/src/elapsed.d.ts
type Since = () => number;
/**
 * Returns elapsed time since the initial call.
 *
 * ```js
 * // Record start
 * const elapsed = elapsedSince();
 *
 * // Get elapsed time in millis
 * // since Elapsed.since()
 * elapsed(); // Yields number
 * ```
 *
 * If you want to initialise a stopwatch, but not yet start it, consider:
 * ```js
 * // Init
 * let state = {
 *  clicked: Stopwatch.infinity()
 * };
 *
 * state.click(); // Returns a giant value
 *
 * // Later, when click happens:
 * state = { click: elapsedSince() }
 * ```
 *
 * See also:
 * * {@link elapsedOnce} if you want to measure a single period, and stop it.
 * * {@link elapsedInterval} time _between_ calls
 * @returns
 */
declare const elapsedSince: () => Since;
/**
 * Returns the interval between the start and each subsequent call.
 *
 * ```js
 * const interval = elapsedInterval();
 * interval(); // Time from elapsedInterval()
 * interval(); // Time since last interval() call
 * ```
 *
 * See also:
 * * {@link elapsedSince}: time since first call
 * * {@link elapsedOnce}: time between two events
 * @returns
 */
declare const elapsedInterval: () => Since;
/**
 * Returns elapsed time since initial call, however
 * unlike {@link elapsedSince}, timer stops when first invoked.
 *
 * ```js
 * const elapsed = elapsedOnce();
 * // ...do stuff
 * elapsed(); // Yields time since elapsedOnce() was called
 * // ...do more stuff
 * elapsed(); // Is still the same number as above
 * ```
 *
 * See also:
 * * {@link elapsedSince}: elapsed time
 * * {@link elapsedInterval}: time _between_ calls
 * @returns
 */
declare const elapsedOnce: () => Since;
/**
 * Returns a function that reports an 'infinite' elapsed time.
 * this can be useful as an initialiser for `elapsedSince` et al.
 *
 * ```js
 * // Init clicked to be an infinite time
 * let clicked = elapsedInfinity();
 *
 * document.addEventListener('click', () => {
 *  // Now that click has happened, we can assign it properly
 *  clicked = Stopwatch.since();
 * });
 * ```
 * @returns
 */
declare const elapsedInfinity: () => Since;
//# sourceMappingURL=elapsed.d.ts.map
//#endregion
//#region ../core/dist/src/filters.d.ts
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
declare const filterValue: <V>(v: V, predicate: (v: V) => boolean, skipValue: V | undefined) => V | undefined;
//# sourceMappingURL=filters.d.ts.map
//#endregion
//#region ../core/dist/src/is-equal-test.d.ts
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
declare const isEqualTrace: <T>(eq: IsEqual<T>) => IsEqual<T>;
//# sourceMappingURL=is-equal-test.d.ts.map

//#endregion
//#region ../core/dist/src/is-integer.d.ts
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
declare const isInteger: (value: string | number) => boolean;
//# sourceMappingURL=is-integer.d.ts.map
//#endregion
//#region ../core/dist/src/is-primitive.d.ts
/**
 * Returns _true_ if `value` is number, string, bigint or boolean.
 * Returns _false_ if `value` is an object, null, undefined
 *
 * Use {@link isPrimitiveOrObject} to also return true if `value` is an object.
 * @param value Value to check
 * @returns _True_ if value is number, string, bigint or boolean.
 */
declare function isPrimitive(value: any): value is Primitive;
/**
 * Returns _true_ if `value` is number, string, bigint, boolean or an object
 *
 * Use {@link isPrimitive} to not include objects.
 * @param value
 * @returns
 */
declare function isPrimitiveOrObject(value: any): value is PrimitiveOrObject;
//# sourceMappingURL=is-primitive.d.ts.map

//#endregion
//#region ../core/dist/src/iterable-compare-values-shallow.d.ts
/**
 * Compares the values of two iterables, returning a list
 * of items they have in common and those unique in `a` or `b`.
 * Ignores ordering of values, and is NOT recursive.
 *
 * ```js
 * const a = ['apples', 'oranges', 'pears' ]
 * const b = ['pears', 'kiwis', 'bananas' ];
 *
 * const r = compareValuesShallow(a, b);
 * r.shared;  // [ 'pears' ]
 * r.a;       // [ 'apples', 'oranges' ]
 * r.b;       // [ 'kiwis', 'bananas' ]
 * ```
 *
 * By default uses === semantics for comparison.
 * @param a
 * @param b
 * @param eq
 * @returns
 */
declare const compareIterableValuesShallow: <V>(a: Iterable<V>, b: Iterable<V>, eq?: (a: V, b: V) => boolean) => {
  shared: V[];
  isSame: boolean;
  a: V[];
  b: V[];
};
//# sourceMappingURL=iterable-compare-values-shallow.d.ts.map
//#endregion
//#region ../core/dist/src/interval-type.d.ts
/**
 * Return the millisecond value of an Interval.
 *
 * ```js
 * intervalToMs(100); // 100
 * intervalToMs({ millis: 100 }); // 100
 * ```
 *
 * Use `defaultNumber` to return a default in the case of
 * _undefined_ or invalid input.
 *
 * ```js
 * intervalToMs(undefined);      // throws error
 * intervalToMs(undefined, 100); // 100
 * ```
 *
 * If no default is provided, an exception is thrown.
 * @param interval Interval
 * @param defaultNumber Default value if `interval` is _undefined_ or invalid
 * @returns Milliseconds
 */
declare function intervalToMs(interval: Interval | undefined, defaultNumber?: number): number;
/**
 * Returns _true_ if `interval` matches the {@link Interval} type.
 * @param interval
 * @returns _True_ if `interval` is an {@link Interval}.
 */
declare function isInterval(interval: number | Interval | undefined): interval is Interval;
/**
 * Returns a human-readable representation
 * of some elapsed milliseconds
 *
 * @example
 * ```js
 * elapsedToHumanString(10);      // `10ms`
 * elapsedToHumanString(2000);    // `2s`
 * elapsedToHumanString(65*1000); // `1mins`
 * ```
 * @param millisOrFunction Milliseconds as a number, {@link Interval} or function that resolve to a number
 * @param rounding Rounding (default: 2)
 * @returns
 */
declare const elapsedToHumanString: (millisOrFunction: number | (() => number) | Interval, rounding?: number) => string;
//# sourceMappingURL=interval-type.d.ts.map
//#endregion
//#region ../core/dist/src/to-string.d.ts
/**
 * Returns _true_ if `value` is a Map type
 * @param value
 * @returns
 */
declare const isMap: (value: unknown) => value is Map<any, any>;
/**
 * Returns _true_ if `value` is a Set type
 * @param value
 * @returns
 */
declare const isSet: (value: unknown) => value is Set<any>;
/**
 * A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
 */
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
/**
 * Converts a value to string form.
 * For simple objects, .toString() is used, other JSON.stringify is used.
 * It is meant for creating debugging output or 'hash' versions of objects, and does
 * not necessarily maintain full fidelity of the input
 * @param value
 * @returns
 */
declare const defaultToString: (value: null | boolean | string | object) => string;
//# sourceMappingURL=to-string.d.ts.map
//#endregion
//#region ../core/dist/src/track-unique.d.ts
type TrackUnique<T> = (value: T) => boolean;
/**
 * Tracks unique values. Returns _true_ if value is unique.
 * Alternatively: {@link uniqueInstances}
 *
 * ```js
 * const t = unique();
 * t(`hello`); // true
 * t(`hello`); // false
 * ```
 *
 * Uses JSON.stringify to compare anything which is not a string.
 *
 * Provide a custom function to convert to string to track uniqueness
 * for more complicated objects.
 *
 * ```js
 * const t = unique(p => p.name);
 * t({ name:`John`, level:2 }); // true
 *
 * // Since we're judging uniques by name only
 * t({ name:`John`, level:3 }); // false
 * ```
 *
 * Return function throws an error if `value` is null or undefined.
 * @returns
 */
declare const unique: <T>(toString?: ToString<T>) => TrackUnique<T>;
/**
 * Tracks unique object instances. Returns _true_ if value is unique.
 * Alternatively: {@link unique} to track by value.
 */
declare const uniqueInstances: <T>() => TrackUnique<T>;
//# sourceMappingURL=track-unique.d.ts.map
//#endregion
//#region ../core/dist/src/platform.d.ts
/**
 * Returns _true_ if it seems like the code is running on iOS (iPad/iPhone)
 * @returns
 */
declare const runningiOS: () => boolean;
//# sourceMappingURL=platform.d.ts.map
//#endregion
//#region ../core/dist/src/promise-from-event.d.ts
declare const promiseFromEvent: (target: EventTarget, name: string) => Promise<any>;
//# sourceMappingURL=promise-from-event.d.ts.map

//#endregion
//#region ../core/dist/src/reactive-core.d.ts
/**
 * Returns _true_ if `rx` is a Reactive
 * @param rx
 * @returns
 */
declare const isReactive: <V>(rx: object) => rx is Reactive<V>;
/**
 * Returns _true_ if `rx` has a last value
 *
 * Judged seeing if `.last()` exists on `rx`.
 * @param rx Reactive
 * @returns
 */
declare const hasLast: <V>(rx: object) => rx is ReactiveInitial<V>;
//# sourceMappingURL=reactive-core.d.ts.map
//#endregion
//#region ../core/dist/src/resolve-fields.d.ts
/**
 * An object that can be 'resolved'.
 * @see {@link resolveFields}
 */
type ResolvedObject<T extends Record<string, ResolveToValue<any>>> = { [K in keyof T]: T[K] extends number ? number : T[K] extends string ? string : T[K] extends boolean ? boolean : T[K] extends bigint ? bigint : T[K] extends (() => Promise<any>) ? Awaited<ReturnType<T[K]>> : T[K] extends (() => any) ? ReturnType<T[K]> : T[K] extends ReactiveNonInitial<infer V> ? V : T[K] extends Generator<infer V> ? V : T[K] extends AsyncGenerator<infer V> ? V : T[K] extends IterableIterator<infer V> ? V : T[K] extends AsyncIterableIterator<infer V> ? V : T[K] extends (infer V)[] ? V : T[K] extends object ? T[K] : never };
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
declare function resolveFields<T extends Record<string, ResolveToValue<any>>>(object: T): Promise<ResolvedObject<T>>;
/**
 * 'Resolves' all the fields of `object` in a synchronous manner.
 * Uses {@link resolveSync} under-the-hood
 * @param object
 * @returns
 */
declare function resolveFieldsSync<T extends Record<string, ResolveToValue<any>>>(object: T): ResolvedObject<T>;
/**
 * Returns a function that resolves `object`.
 *
 * Use {@link resolveFields} to resolve an object directly.
 * @param object
 * @returns
 */
//# sourceMappingURL=resolve-fields.d.ts.map
//#endregion
//#region ../core/dist/src/types-array.d.ts
/**
 * Functions which modify an array
 */
type ArrayLengthMutationKeys = `splice` | `push` | `pop` | `shift` | `unshift` | number;
/**
 * Array items
 */
type ArrayItems<T extends any[]> = T extends (infer TItems)[] ? TItems : never;
/**
 * A fixed-length array
 */
type FixedLengthArray<T extends any[]> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
  [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>;
};
//# sourceMappingURL=types-array.d.ts.map

//#endregion
export { AlignOpts, ArrayItems, ArrayLengthMutationKeys, BasicType, ChangeKind, ChangeRecord, CompareChangeSet, CompareResult, Comparer, Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, DataWithId, FixedLengthArray, HasCompletion, HasCompletionRunStates, IDictionary, IWithEntries, Interval, IsEqual, IsEqualContext, KeyValue, KeyValueSortSyles, KeyValueSorter, maps_d_exports as Maps, OnStartCalled, Passed, pathed_d_exports as Pathed, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction, RankOptions, Reactive, ReactiveInitial, ReactiveNonInitial, ReadonlyRemapObjectPropertyType, index_d_exports as Records, RecursivePartial, RecursiveReplace, RecursiveWriteable, RemapObjectPropertyType, RequireOnlyOne, ResolveFallbackOpts, ResolveToValue, ResolveToValueAsync, ResolveToValueSync, ResolvedObject, Rest, SignalKinds, Similarity, Since, SleepOpts, StringOrNumber, ToString, TrackUnique, index_d_exports$1 as Trackers, Unsubscriber, Writeable, align, alignById, compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast, intervalToMs, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered, unique, uniqueInstances };
//# sourceMappingURL=index.d.ts.map