import { Result } from "@ixfx/guards";

//#region packages/core/src/comparers.d.ts
type CompareResult = number;
type Comparer<V> = (a: V, b: V) => CompareResult;
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
declare const numericComparer: (x: number, y: number) => CompareResult;
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
declare const jsComparer: (x: any, y: any) => CompareResult;
/**
 * Inverts the source comparer.
 * @param comparer
 * @returns
 */
declare const comparerInverse: <V>(comparer: Comparer<V>) => Comparer<V>;
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
declare const defaultComparer: (x: any, y: any) => CompareResult;
//# sourceMappingURL=comparers.d.ts.map
//#endregion
//#region packages/core/src/continuously.d.ts
type HasCompletionRunStates = `idle` | `scheduled` | `running`;
type HasCompletion = {
  /**
   * Gets the current run state
   * idle: not yet started or completed with no future run scheduled
   * scheduled: waiting to run
   * running: currently executing its callback
   */
  get runState(): HasCompletionRunStates;
  /**
   * Returns the number of times the scheduled function
   * has been executed.
   *
   * This number will be reset in some conditions.
   * For example `continuously` resets it when the loop stops.
   *
   * Use {@link startCountTotal} to track total number.
   */
  get startCount(): number;
  /**
   * Total number of times scheduled function has been
   * executed.
   */
  get startCountTotal(): number;
};
/**
 * Runs a function continuously, returned by {@link continuously}
 */
type Continuously = HasCompletion & {
  /**
   * Starts loop. If already running, does nothing
   */
  start(): void;
  /**
   * (Re-)starts the loop. If an existing iteration has been
   * scheduled, this is cancelled and started again.
   *
   * This can be useful when adjusting the interval
   */
  reset(): void;
  /**
   * How many milliseconds since loop was started after being stopped.
   */
  get elapsedMs(): number;
  /**
   * If disposed, the continuously instance won't be re-startable
   */
  get isDisposed(): boolean;
  /**
   * Stops loop. It can be restarted using .start()
   */
  cancel(): void;
  /**
   * Sets the interval speed of loop. Change will take effect on next loop. For it to kick
   * in earlier, call .reset() after changing the value.
   */
  set interval(interval: Interval);
  /**
   * Gets the current interval, ie. speed of loop.
   */
  get interval(): Interval;
};
type ContinuouslySyncCallback = (
/**
 * Number of times loop
 * Ticks is reset when loop exits.
 */
ticks?: number,
/**
 * Elapsed milliseconds.
 * Reset when loop exits
 */
elapsedMs?: number) => boolean | void;
type ContinuouslyAsyncCallback = (
/**
 * Number of times loop has run
 * Reset when loop exits.
 */
ticks?: number,
/**
 * Elapsed milliseconds.
 * Reset when loop exits.
 */
elapsedMs?: number) => Promise<boolean | void>;
type OnStartCalled = `continue` | `cancel` | `reset` | `dispose`;
/**
 * Options for {@link continuously}
 */
type ContinuouslyOpts = Readonly<{
  /**
   * Abort signal to exit loop
   */
  signal: AbortSignal;
  /**
   * If _true_, callback runs before waiting period.
   * @defaultValue false
   */
  fireBeforeWait: boolean;
  /**
   * Called whenever .start() is invoked.
   * If this function returns:
   *  - `continue`: the loop starts if it hasn't started yet, or continues if already started
   *  - `cancel`: loop stops, but can be re-started if .start() is called again
   *  - `dispose`: loop stops and will throw an error if .start() is attempted to be called
   *  - `reset`: loop resets (ie. existing scheduled task is cancelled)
   *
   */
  onStartCalled: (
  /**
   * Number of times loop has run
   * Reset when loop is exits.
   */
  ticks?: number,
  /**
   * Elapsed milliseconds.
   * Reset when loop is exits.
   */
  elapsedMs?: number) => OnStartCalled;
}>;
/**
 * Returns a {@link Continuously} that continually executes `callback` at `interval` rate.
 *
 * By default, first the sleep period happens and then the callback happens.
 *
 * Call `start` to begin/reset loop. The looping stops when `cancel` is called, or when `callback` returns _false_.
 *
 * @example
 * Animation loop
 * ```js
 * const draw = () => {
 *  // Draw on canvas
 * }
 *
 * // Run draw() synchronised with monitor refresh rate via `window.requestAnimationFrame`
 * continuously(draw).start();
 * ```
 *
 * @example
 * With delay
 * ```js
 * const fn = () => {
 *  // Runs after one minute
 * }
 * const c = continuously(fn, { mins: 1 } );
 * c.start(); // Runs `fn` every minute
 * ```
 *
 * @example
 * Control a 'continuously'
 * ```js
 * c.cancel();   // Stop the loop, cancelling any up-coming calls to `fn`
 * c.elapsedMs;  // How many milliseconds have elapsed since start
 * c.ticks;      // How many iterations of loop since start
 * c.interval;   // Get/set speed of loop. Change kicks-in at next loop.
 *               // Use .start() to reset to new interval immediately
 * ```
 *
 * Asynchronous callback functions are supported too:
 * ```js
 * continuously(async () => { ..});
 * ```
 *
 * The `callback` function can receive a few arguments:
 *
 * ```js
 * continuously( (ticks, elapsedMs) => {
 *  // ticks: how many times loop has run
 *  // elapsedMs:  how long since last loop
 * }).start();
 * ```
 *
 * If the callback explicitly returns _false_, the loop will be cancelled.
 *
 * ```js
 * continuously(ticks => {
 *  // Stop after 100 iterations
 *  if (ticks > 100) return false;
 * }).start();
 * ```
 *
 * You can intercept the logic for calls to `start()` with `onStartCalled`. It can determine
 * whether the `start()` proceeds, if the loop is cancelled, or the whole thing disposed,
 * so it can't run any longer.
 *
 * ```js
 * continuously(callback, intervalMs, {
 *  onStartCalled:(ticks, elapsedMs) => {
 *    // Cancel the loop after 1000ms has elapsed
 *    if (elapsedMs > 1000) return `cancel`;
 *  }
 * }).start();
 * ```
 *
 * To run `callback` *before* the sleep happens, set `fireBeforeWait`:
 * ```js
 * continuously(callback, intervalMs, { fireBeforeWait: true });
 * ```
 * @param callback - Function to run. If it returns _false_, loop exits.
 * @param options - {@link ContinuouslyOpts ContinuouslyOpts}
 * @param interval - Speed of loop (default: 0)
 * @returns Instance to control looping.
 * @see Flow.timeout if you want to trigger something once.
 */
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, interval?: Interval, options?: Partial<ContinuouslyOpts>) => Continuously;
//# sourceMappingURL=continuously.d.ts.map
//#endregion
//#region packages/core/src/correlate.d.ts
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
//#region packages/core/src/default-keyer.d.ts
/**
 * If values are strings, uses that as the key.
 * Otherwise uses `JSON.stringify`.
 * @param a
 * @returns
 */
declare const defaultKeyer: <V>(a: V) => string;
//# sourceMappingURL=default-keyer.d.ts.map
//#endregion
//#region packages/core/src/elapsed.d.ts
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
//#region packages/core/src/filters.d.ts
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
//#region packages/core/src/is-equal.d.ts
/**
 * Function that returns true if `a` and `b` are considered equal
 */
type IsEqual<T> = (a: T, b: T) => boolean;
/**
 * If input is a string, it is returned.
 * Otherwise, it returns the result of JSON.stringify() with fields ordered.
 *
 * This allows for more consistent comparisons when object field orders are different but values the same.
 * @param itemToMakeStringFor
 * @returns
 */
declare const toStringOrdered: (itemToMakeStringFor: unknown) => string;
/**
 * Default comparer function is equiv to checking `a === b`.
 * Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
 */
declare const isEqualDefault: <T>(a: T, b: T) => boolean;
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
declare const isEqualValueDefault: <T>(a: T, b: T) => boolean;
/**
 * Returns _true_ if `a` contains the values of `b`. `a` may contain other values, but we
 * only check against what is in `b`. `a` and `b` must both be simple objects.
 *
 * ```js
 * const obj = {
 *  name: `Elle`,
 *  size: 100,
 *  colour: {
 *    red: 0.5,
 *    green: 0.1,
 *    blue: 0.2
 *  }
 * }
 *
 * isEqualValuePartial(obj, { name: `Elle` }); // true
 * isEqualValuePartial(obj, { name: { colour: red: { 0.5, green: 0.1  }} }); // true
 *
 * isEqualValuePartial(obj, { name: `Ellen` });     // false
 * isEqualValuePartial(obj, { lastname: `Elle` });  // false
 * ```
 * @param a
 * @param b
 * @param fieldComparer
 * @returns
 */
declare const isEqualValuePartial: (a: Record<string, unknown>, b: Record<string, unknown>, fieldComparer?: IsEqual<unknown>) => boolean;
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
declare const isEqualValueIgnoreOrder: <T>(a: T, b: T) => boolean;
/**
 * Returns _true_ if Object.entries() is empty for `value`
 * @param value
 * @returns
 */
declare const isEmptyEntries: (value: object) => boolean;
/**
 * Return _true_ if `a` and `b` ought to be considered equal
 * at a given path
 */
type IsEqualContext<V> = (a: V, b: V | undefined, path: string) => boolean;
/**
 * Returns _true_ if `a` and `b` are equal based on their JSON representations.
 * `path` is ignored.
 * @param a
 * @param b
 * @param path
 * @returns
 */
declare const isEqualContextString: IsEqualContext<unknown>;
//# sourceMappingURL=is-equal.d.ts.map
//#endregion
//#region packages/core/src/is-equal-test.d.ts
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
//#region packages/core/src/is-integer.d.ts
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
//#region packages/core/src/types.d.ts
type ToString<V> = (itemToMakeStringFor: V) => string;
type StringOrNumber = string | number | bigint;
type Primitive = string | number | bigint | boolean;
type PrimitiveOrObject = Primitive | object;
type BasicType = StringOrNumber | object | boolean;
type KeyValue = readonly [key: string, value: StringOrNumber];
/**
 * Interval types allows for more expressive coding, rather than embedding millisecond values.
 *
 * That is, we can use `{ mins: 5 }` to mean 5 minutes rather than `5*60*1000`
 * or worse, 300000, for the same value.
 *
 * @example
 * ```js
 * { hours: 1 };  // 1 hour
 * { mins: 5 };   // 5 mins
 * { secs: 5 };   // 5 secs
 * { millis: 5 }; // 5 milliseconds
 * ```
 *
 * If several fields are used, this sums their value
 * ```js
 * { secs: 2, millis: 1 }; // equal 2001 milliseconds.
 * ```
 *
 * Wherever ixfx takes an `Interval`, you can also just provide a number instead.
 * This will be taken as a millisecond value.
 *
 * @see {@link intervalToMs} to convert to milliseconds.
 * @see {@link isInterval} check whether input is an Interval type
 * @see {@link elapsedToHumanString} render interval in human-friendly form
 */
type Interval = number | {
  readonly millis?: number;
  readonly secs?: number;
  readonly hours?: number;
  readonly mins?: number;
};
type IDictionary<K, V> = {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
};
type IWithEntries<K, V> = {
  entries(): IterableIterator<readonly [K, V]>;
};
type RankArrayOptions = RankOptions & {
  /**
   * If _true_, it's only the highest _within_ an array that is considered,
   * rather than tracking the higest between arrays
   * Default: _false_
   */
  withinArrays?: boolean;
};
/**
 * A rank function that compares A and B.
 * Returns the highest value, 'a' or 'b'.
 * Returns 'eq' if values are equal
 */
type RankFunction<T> = (a: T, b: T) => `a` | `b` | `eq`;
type RankOptions = {
  /**
   * If set, only values with this JS type are included
   */
  includeType?: `string` | `number` | `object` | `boolean`;
  /**
   * If _true_, also emits values when they rank equal with current highest.
   * _false_ by default
   */
  emitEqualRanked?: boolean;
  /**
   * If _true_, emits the current highest value even if it hasn't changed.
   * This means it will match the tempo of the incoming stream.
   */
  emitRepeatHighest?: boolean;
};
//# sourceMappingURL=types.d.ts.map
//#endregion
//#region packages/core/src/is-primitive.d.ts
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
//#region packages/core/src/iterable-compare-values-shallow.d.ts
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
//#region packages/core/src/key-value.d.ts
type KeyValueSorter = (data: KeyValue[]) => KeyValue[];
type KeyValueSortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare const keyValueSorter: (sortStyle: KeyValueSortSyles) => KeyValueSorter;
//# sourceMappingURL=key-value.d.ts.map

//#endregion
//#region packages/core/src/interval-type.d.ts
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
//#region packages/core/src/to-string.d.ts
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
//#region packages/core/src/track-unique.d.ts
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
//#region packages/core/src/platform.d.ts
/**
 * Returns _true_ if it seems like the code is running on iOS (iPad/iPhone)
 * @returns
 */
declare const runningiOS: () => boolean;
//# sourceMappingURL=platform.d.ts.map
//#endregion
//#region packages/core/src/promise-from-event.d.ts
declare const promiseFromEvent: (target: EventTarget, name: string) => Promise<any>;
//# sourceMappingURL=promise-from-event.d.ts.map

//#endregion
//#region packages/core/src/types-reactive.d.ts
/**
 * A reactive that does not have an initial value
 */
type ReactiveNonInitial<V> = Reactive<V> & {
  last(): V | undefined;
};
/**
 * A reactive with an initial value
 */
type ReactiveInitial<V> = Reactive<V> & {
  last(): V;
};
/**
 * Unsubscribes from a reactive
 */
type Unsubscriber = () => void;
/**
 * Signals
 */
type SignalKinds = `done` | `warn`;
/**
 * A message
 */
type Passed<V> = {
  value: V | undefined;
  signal?: SignalKinds;
  context?: string;
};
/**
 * A Reactive
 */
type Reactive<V> = {
  /**
   * Subscribes to a reactive. Receives
   * data as well as signals. Use `onValue` if you
   * just care about values.
   *
   * Return result unsubscribes.
   *
   * ```js
   * const unsub = someReactive.on(msg => {
   *    // Do something with msg.value
   * });
   *
   * unsub(); // Unsubscribe
   * ```
   * @param handler
   */
  on(handler: (value: Passed<V>) => void): Unsubscriber;
  /**
   * Subscribes to a reactive's values.
   * Returns a function that unsubscribes.
   * @param handler
   */
  onValue(handler: (value: V) => void): Unsubscriber;
  /**
   * Disposes the reactive, providing a reason for debug tracing
   * @param reason
   */
  dispose(reason: string): void;
  /**
   * Returns _true_ if Reactive is disposed
   */
  isDisposed(): boolean;
  /**
   * Optional 'set' to write a value.
   * @param value
   */
  set?(value: V): void;
};
//# sourceMappingURL=types-reactive.d.ts.map
//#endregion
//#region packages/core/src/reactive-core.d.ts
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
//#region packages/core/src/resolve-core.d.ts
/**
 * Something that can resolve to a value
 */
type ResolveToValueSync<V> = BasicType | ReactiveNonInitial<V> | Generator<V> | IterableIterator<V> | ((args: any) => V);
type ResolveToValueAsync<V> = AsyncGenerator<V> | AsyncIterableIterator<V> | Promise<V> | ((args: any) => Promise<V>);
type ResolveToValue<V> = ResolveToValueAsync<V> | ResolveToValueSync<V>;
/**
 * Resolves `r` to a value, where `r` is:
 * * primitive value
 * * a/sync function
 * * a/sync generator/iterator
 * * ReactiveNonInitial
 * ```js
 * await resolve(10);       // 10
 * await resolve(() => 10); // 10
 * await resole(async () => {
 *  sleep(100);
 *  return 10;
 * });                // 10
 * ```
 *
 * To resolve an object's properties, use {@link resolveFields}.
 *
 * Resolve is not recursive. So if `r` is an object, it will be returned, even
 * though its properties may be resolvable.
 * @param r
 * @param args
 * @returns
 */
declare function resolve<V extends BasicType>(r: ResolveToValue<V>, ...args: any): Promise<V>;
/**
 * For a given input `r`, attempts to 'resolve' it. See {@link resolve} for details.
 * @param r
 * @param args
 * @returns
 */
declare function resolveSync<V extends BasicType>(r: ResolveToValueSync<V>, ...args: any): V;
/**
 * Resolves a value as per {@link resolve}, however
 * If an error is thrown or the resolution results in _undefined_
 * or NaN, `fallbackValue` is returned instead.
 *
 * `null` is an allowed return value.
 *
 * ```js
 * // Function returns undefined 50% of the time or 0
 * const fn = () => {
 *  if (Math.random() >= 0.5) return; // undefined
 *  return 0;
 * }
 * const r = resolveWithFallback(fn, 1);
 * const value = r(); // Always 0 or 1
 * ```
 * @param p Thing to resolve
 * @param fallback Fallback value if an error happens, undefined or NaN
 * @param args
 * @returns
 */
declare function resolveWithFallback<T extends BasicType>(p: ResolveToValue<T>, fallback: ResolveFallbackOpts<T>, ...args: any): Promise<T>;
declare function resolveWithFallbackSync<T extends BasicType>(p: ResolveToValueSync<T>, fallback: ResolveFallbackOpts<T>, ...args: any): T;
type ResolveFallbackOpts<T> = {
  value: T;
  overrideWithLast?: boolean;
};
//# sourceMappingURL=resolve-core.d.ts.map
//#endregion
//#region packages/core/src/resolve-fields.d.ts
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
//#region packages/core/src/sleep.d.ts
type SleepOpts<V> = Interval & Partial<{
  readonly signal: AbortSignal;
  readonly value: V;
}>;
/**
 * Returns after timeout period.
 *
 * @example In an async function
 * ```js
 * console.log(`Hello`);
 * await sleep(1000);
 * console.log(`There`); // Prints one second after
 * ```
 *
 * @example As a promise
 * ```js
 * console.log(`Hello`);
 * sleep({ millis: 1000 })
 *  .then(() => console.log(`There`)); // Prints one second after
 * ```
 *
 * If a timeout of 0 is given, `requestAnimationFrame` is used instead of `setTimeout`.
 *
 * `Flow.delay()` and {@link sleep} are similar. `Flow.delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
 *
 * A value can be provided, which is returned on awaking:
 * ```js
 * const v = await sleep({ seconds: 1, value: `hello`);
 * // v = `hello`
 * ```
 *
 * Provide an AbortSignal to cancel the sleep and throwing an exception
 * so code after the sleep doesn't happen.
 *
 * ```js
 * const ac = new AbortController();
 * setTimeout(() => { ac.abort(); }, 1000); // Abort after 1s
 *
 * // Sleep for 1min
 * await sleep({ minutes: 1, signal: ac.signal });
 * console.log(`Awake`); // This line doesn't get called because an exception is thrown when aborting
 * ```
 * @param optsOrMillis Milliseconds to sleep, or options
 * @return
 */
declare const sleep: <V>(optsOrMillis: SleepOpts<V>) => Promise<V | undefined>;
/**
 * Delays until `predicate` returns true.
 * Can be useful for synchronising with other async activities.
 * ```js
 * // Delay until 'count' reaches 5
 * await sleepWhile(() => count >= 5, 100);
 * ```
 * @param predicate
 * @param checkInterval
 */
declare const sleepWhile: (predicate: () => boolean, checkInterval?: Interval) => Promise<void>;
//# sourceMappingURL=sleep.d.ts.map
//#endregion
//#region packages/core/src/types-compare.d.ts
/**
 * Kind of change
 */
type ChangeKind = `mutate` | `add` | `del`;
/**
 * Change record
 */
type ChangeRecord<TKey extends string | number | symbol> = [kind: ChangeKind, path: TKey, value: unknown];
/**
 * Result of compareObjectData
 */
type CompareChangeSet<TKey extends string | number> = {
  /**
   * _True_ if there are any changes
   */
  hasChanged: boolean;
  /**
   * Results for child objects
   */
  children: Record<TKey, CompareChangeSet<string | number>>;
  /**
   * Values that have changed
   */
  changed: Record<TKey, unknown>;
  /**
   * Fields that have been added
   */
  added: Record<TKey, unknown>;
  /**
   * Fields that have been removed
   */
  removed: TKey[];
  /**
   * _True_ if value is an array
   */
  isArray: boolean;
  /**
   * Summary of changes
   */
  summary: ChangeRecord<TKey>[];
};
//# sourceMappingURL=types-compare.d.ts.map
//#endregion
//#region packages/core/src/records/compare.d.ts
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
 * Under the hood, we use {@link compareResultToObject}(a, b, true). If B has additional or removed fields,
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
//# sourceMappingURL=compare.d.ts.map
//#endregion
//#region packages/core/src/records/clone-from-fields.d.ts
declare const cloneFromFields: <T extends object>(source: T) => T;
//# sourceMappingURL=clone-from-fields.d.ts.map

//#endregion
//#region packages/core/src/ts-utility.d.ts
/**
 * Remaps `TShape` so each field has type `TFieldValue`.
 * Recursive.
 */
type RecursiveReplace<TShape, TFieldValue> = { [P in keyof TShape]: TShape[P] extends (infer U)[] ? RecursiveReplace<U, TFieldValue>[] : TShape[P] extends number | string | symbol | undefined ? TFieldValue : RecursiveReplace<TShape[P], TFieldValue> };
/**
 * A type where every property is partial (recursive)
 */
type RecursivePartial<T> = { [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object | undefined ? RecursivePartial<T[P]> : T[P] };
type ReadonlyRemapObjectPropertyType<OriginalType, PropertyType> = { readonly [Property in keyof OriginalType]: PropertyType };
type RemapObjectPropertyType<OriginalType, PropertyType> = { [Property in keyof OriginalType]: PropertyType };
/**
 * Removes readonly from all properties (non-recursive)
 */
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
/**
 * Removes readonly from all properties (recursive)
 */
type RecursiveWriteable<T> = { -readonly [P in keyof T]: RecursiveWriteable<T[P]> };
/**
 * Makes a type such that only one of the provided properties is required.
 * RequireOnlyOne<someType, 'prop1'|'prop2'>
 */
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];
type Rest<T extends any[]> = T extends [infer A, ...infer R] ? R : never;
//# sourceMappingURL=ts-utility.d.ts.map

//#endregion
//#region packages/core/src/records/map-object.d.ts
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
//# sourceMappingURL=map-object.d.ts.map
//#endregion
//#region packages/core/src/records/traverse.d.ts
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
//# sourceMappingURL=traverse.d.ts.map
//#endregion
//#region packages/core/src/records/merge.d.ts
type OptionalPropertyNames<T> = { [K in keyof T]-?: ({} extends Record<K, T[K]> ? K : never) }[keyof T];
type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };
type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
type SpreadTwo<L, R> = Id<Pick<L, Exclude<keyof L, keyof R>> & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>>;
type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R] ? SpreadTwo<L, Spread<R>> : unknown;
declare function mergeObjects<A extends object[]>(...a: [...A]): Spread<A>;
//#endregion
//#region packages/core/src/records/keys-to-numbers.d.ts
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
//# sourceMappingURL=keys-to-numbers.d.ts.map
//#endregion
//#region packages/core/src/records/pathed.d.ts
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
//# sourceMappingURL=index.d.ts.map
//#endregion
//#region packages/core/src/types-array.d.ts
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
export { AlignOpts, ArrayItems, ArrayLengthMutationKeys, BasicType, ChangeKind, ChangeRecord, CompareChangeSet, CompareResult, Comparer, Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, DataWithId, FixedLengthArray, HasCompletion, HasCompletionRunStates, IDictionary, IWithEntries, Interval, IsEqual, IsEqualContext, KeyValue, KeyValueSortSyles, KeyValueSorter, OnStartCalled, Passed, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction, RankOptions, Reactive, ReactiveInitial, ReactiveNonInitial, ReadonlyRemapObjectPropertyType, RecursivePartial, RecursiveReplace, RecursiveWriteable, RemapObjectPropertyType, RequireOnlyOne, ResolveFallbackOpts, ResolveToValue, ResolveToValueAsync, ResolveToValueSync, ResolvedObject, Rest, SignalKinds, Similarity, Since, SleepOpts, StringOrNumber, ToString, TrackUnique, Unsubscriber, Writeable, align, alignById, compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast, index_d_exports$1 as index_d_exports, index_d_exports as index_d_exports$1, intervalToMs, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, numericComparer, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered, unique, uniqueInstances };
//# sourceMappingURL=index-ZOxM3wdD.d.ts.map