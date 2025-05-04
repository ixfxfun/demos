import { BasicType$1 as BasicType, Interval$1 as Interval, ToString$1 as ToString } from "./types.d-CqIGEt21.js";
import { ReactiveNonInitial$2 as ReactiveNonInitial, ResolveToValue$1 as ResolveToValue } from "./resolve-core.d-CQA_4eSK.js";

//#region ../packages/core/dist/src/comparers.d.ts
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

//#endregion
//#region ../packages/core/dist/src/count.d.ts
/**
* Yields `amount` integers, counting by one from zero. If a negative amount is used,
* count decreases. If `offset` is provided, this is added to the return result.
* @example
* ```js
* const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
* const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
* for (const v of count(5, 5)) {
*  // Yields: 5, 6, 7, 8, 9
* }
* const c = [...count(5,1)]; // Yields [1,2,3,4,5]
* ```
*
* @example Used with forEach
* ```js
* // Prints `Hi` 5x
* forEach(count(5), () => // do something);
* ```
*
* If you want to accumulate return values, consider using Flow.repeat.
*
* @example Run some code every 100ms, 10 times:
* ```js
* import { interval } from 'https://unpkg.com/ixfx/dist/flow.js'
* import { count } from 'https://unpkg.com/ixfx/dist/numbers.js'
* const counter = count(10);
* for await (const v of interval(counter, { fixedIntervalMs: 100 })) {
*  // Do something
* }
* ```
* @param amount Number of integers to yield
* @param offset Added to result
*/
declare function count(amount: number, offset?: number): Generator<number, void, void>;

//#endregion
//#region ../packages/core/dist/src/continuously.d.ts
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
* @see {@link Timeout} if you want to trigger something once.
*/
declare const continuously: (callback: ContinuouslyAsyncCallback | ContinuouslySyncCallback, interval?: Interval, options?: Partial<ContinuouslyOpts>) => Continuously;

//#endregion
//#region ../packages/core/dist/src/correlate.d.ts
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
* @param similarityFn Function to compute similarity
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

//#endregion
//#region ../packages/core/dist/src/default-keyer.d.ts
/**
* If values are strings, uses that as the key.
* Otherwise uses `JSON.stringify`.
* @param a
* @returns
*/
declare const defaultKeyer: <V>(a: V) => string;

//#endregion
//#region ../packages/core/dist/src/elapsed.d.ts
type Since = () => number;

/**
* Returns elapsed time since the initial call.
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

//#endregion
//#region ../packages/core/dist/src/filters.d.ts
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

//#endregion
//#region ../packages/core/dist/src/is-equal.d.ts
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
* Returns _true_ if `a` and `b are equal based on their JSON representations.
* `path` is ignored.
* @param a
* @param b
* @param path
* @returns
*/
declare const isEqualContextString: IsEqualContext<unknown>;

//#endregion
//#region ../packages/core/dist/src/is-equal-test.d.ts
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

//#endregion
//#region ../packages/core/dist/src/is-integer.d.ts
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

//#endregion
//#region ../packages/core/dist/src/types.d.ts
type ToString$1<V> = (itemToMakeStringFor: V) => string;
type StringOrNumber = string | number | bigint;
type Primitive = string | number | bigint | boolean;
type PrimitiveOrObject = Primitive | object;
type BasicType$1 = StringOrNumber | object | boolean;
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
type Interval$1 = number | {
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

//#endregion
//#region ../packages/core/dist/src/is-primitive.d.ts
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

//#endregion
//#region ../packages/core/dist/src/iterable-compare-values-shallow.d.ts
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

//#endregion
//#region ../packages/core/dist/src/key-value.d.ts
type KeyValueSorter = (data: KeyValue[]) => KeyValue[];
type KeyValueSortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare const keyValueSorter: (sortStyle: KeyValueSortSyles) => KeyValueSorter;

//#endregion
//#region ../packages/core/dist/src/interval-type.d.ts
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
declare function intervalToMs(interval: Interval$1 | undefined, defaultNumber?: number): number;

/**
* Returns _true_ if `interval` matches the {@link Interval} type.
* @param interval
* @returns _True_ if `interval` is an {@link Interval}.
*/
declare function isInterval(interval: number | Interval$1 | undefined): interval is Interval$1;

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
declare const elapsedToHumanString: (millisOrFunction: number | (() => number) | Interval$1, rounding?: number) => string;

//#endregion
//#region ../packages/core/dist/src/to-string.d.ts
declare const isMap: (value: unknown) => value is Map<any, any>;
declare const isSet: (value: unknown) => value is Set<any>;

/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
declare const toStringDefault: <V>(itemToMakeStringFor: V) => string;
declare const defaultToString: (object: any) => string;

//#endregion
//#region ../packages/core/dist/src/track-unique.d.ts
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

//#endregion
//#region ../packages/core/dist/src/platform.d.ts
declare const runningiOS: () => boolean;

//#endregion
//#region ../packages/core/dist/src/promise-from-event.d.ts
declare const promiseFromEvent: (target: EventTarget, name: string) => Promise<any>;

//#endregion
//#region ../packages/core/dist/src/types-reactive.d.ts
type ReactiveNonInitial$1<V> = Reactive<V> & {
  last(): V | undefined;
};
type ReactiveInitial<V> = Reactive<V> & {
  last(): V;
};
type Unsubscriber = () => void;
type SignalKinds = `done` | `warn`;
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
   * Optional 'set' to write a value. Use {@link ReactiveWritable} if you want this non-optional
   * @param value
   */
  set?(value: V): void;
};

//#endregion
//#region ../packages/core/dist/src/reactive-core.d.ts
/**
* Returns _true_ if `rx` is a Reactive
* @param rx
* @returns
*/
declare const isReactive: <V>(rx: object) => rx is Reactive<V>;
declare const hasLast: <V>(rx: object) => rx is ReactiveInitial<V>;

//#endregion
//#region ../packages/core/dist/src/resolve-core.d.ts
/**
* Something that can resolve to a value
*/
type ResolveToValueSync<V> = BasicType | ReactiveNonInitial$1<V> | Generator<V> | IterableIterator<V> | ((args: any) => V);
type ResolveToValueAsync<V> = AsyncGenerator<V> | AsyncIterableIterator<V> | Promise<V> | ((args: any) => Promise<V>);
type ResolveToValue$1<V> = ResolveToValueAsync<V> | ResolveToValueSync<V>;

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
declare function resolve<V extends BasicType>(r: ResolveToValue$1<V>, ...args: any): Promise<V>;
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
declare function resolveWithFallback<T extends BasicType>(p: ResolveToValue$1<T>, fallback: ResolveFallbackOpts<T>, ...args: any): Promise<T>;
declare function resolveWithFallbackSync<T extends BasicType>(p: ResolveToValueSync<T>, fallback: ResolveFallbackOpts<T>, ...args: any): T;
type ResolveFallbackOpts<T> = {
  value: T;
  overrideWithLast?: boolean;
};

//#endregion
//#region ../packages/core/dist/src/resolve-fields.d.ts
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
* It also works with generators
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
declare function resolveFieldsSync<T extends Record<string, ResolveToValue<any>>>(object: T): ResolvedObject<T>;

/**
* Returns a function that resolves `object`.
*
* Use {@link resolveFields} to resolve an object directly.
* @param object
* @returns
*/

//#endregion
//#region ../packages/core/dist/src/results.d.ts
type ResultOk<T> = {
  success: true;
  value: T;
};
type ResultError = {
  success: false;
  error: Error | string;
};
type Result<T> = ResultOk<T> | ResultError;

/**
* If `result` is an error, throws it, otherwise ignored.
* @param result
* @returns
*/
declare function throwResult<T>(result: Result<T>): result is ResultOk<T>;
declare function resultToError(result: ResultError): Error;
declare function resultToValue<T>(result: Result<T>): T;
declare function resultErrorToString(result: ResultError): string;

//#endregion
//#region ../packages/core/dist/src/sleep.d.ts
type SleepOpts<V> = Interval$1 & Partial<{
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
* {@link delay} and {@link sleep} are similar. `delay()` takes a parameter of what code to execute after the timeout, while `sleep()` just resolves after the timeout.
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
declare const sleepWhile: (predicate: () => boolean, checkInterval?: Interval$1) => Promise<void>;

//#endregion
//#region ../packages/core/dist/src/ts-utility.d.ts
/**
* Remaps `TShape` so each field has type `TFieldValue`.
* Recursive.
*/
type RecursiveReplace<TShape, TFieldValue> = { [P in keyof TShape]: TShape[P] extends (infer U)[] ? RecursiveReplace<U, TFieldValue>[] : TShape[P] extends number | string | symbol | undefined ? TFieldValue : RecursiveReplace<TShape[P], TFieldValue> };
type RecursivePartial<T> = { [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object | undefined ? RecursivePartial<T[P]> : T[P] };
type ReadonlyRemapObjectPropertyType<OriginalType, PropertyType> = { readonly [Property in keyof OriginalType]: PropertyType };
type RemapObjectPropertyType<OriginalType, PropertyType> = { [Property in keyof OriginalType]: PropertyType };
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];
type Rest<T extends any[]> = T extends [infer A, ...infer R] ? R : never;

//#endregion
//#region ../packages/core/dist/src/types-array.d.ts
type ArrayLengthMutationKeys = `splice` | `push` | `pop` | `shift` | `unshift` | number;
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never;
type FixedLengthArray<T extends Array<any>> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
  [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>;
};

//#endregion
//#region ../packages/core/dist/src/types-compare.d.ts
type ChangeKind = `mutate` | `add` | `del`;
type ChangeRecord<TKey extends string | number | symbol> = [kind: ChangeKind, path: TKey, value: unknown];

/**
* Result of {@link compareObjectData}
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
  isArray: boolean;
  /**
   * Summary of changes
   */
  summary: ChangeRecord<TKey>[];
};

//#endregion
export { AlignOpts, ArrayItems, ArrayLengthMutationKeys, BasicType$1 as BasicType, ChangeKind, ChangeRecord, CompareChangeSet, CompareResult, Comparer, Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, DataWithId, DeepWriteable, FixedLengthArray, HasCompletion, HasCompletionRunStates, IDictionary, IWithEntries, Interval$1 as Interval, IsEqual, IsEqualContext, KeyValue, KeyValueSortSyles, KeyValueSorter, OnStartCalled, Passed as Passed$1, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction as RankFunction$1, RankOptions as RankOptions$1, Reactive as Reactive$1, ReactiveInitial as ReactiveInitial$1, ReactiveNonInitial$1, ReadonlyRemapObjectPropertyType, RecursivePartial, RecursiveReplace, RemapObjectPropertyType, RequireOnlyOne, ResolveFallbackOpts, ResolveToValue$1 as ResolveToValue, ResolveToValueAsync, ResolveToValueSync, ResolvedObject, Rest, Result as Result$1, ResultError as ResultError$1, ResultOk as ResultOk$1, SignalKinds as SignalKinds$1, Similarity, Since, SleepOpts, StringOrNumber, ToString$1 as ToString, TrackUnique, Unsubscriber as Unsubscriber$1, Writeable, align as align$1, alignById as alignById$1, compareIterableValuesShallow as compareIterableValuesShallow$1, comparerInverse as comparerInverse$1, continuously as continuously$1, count as count$1, defaultComparer as defaultComparer$1, defaultKeyer as defaultKeyer$1, defaultToString as defaultToString$1, elapsedInfinity as elapsedInfinity$1, elapsedInterval as elapsedInterval$1, elapsedOnce as elapsedOnce$1, elapsedSince as elapsedSince$1, elapsedToHumanString as elapsedToHumanString$1, filterValue as filterValue$1, hasLast as hasLast$3, intervalToMs as intervalToMs$1, isEmptyEntries as isEmptyEntries$1, isEqualContextString as isEqualContextString$1, isEqualDefault as isEqualDefault$1, isEqualTrace as isEqualTrace$1, isEqualValueDefault as isEqualValueDefault$1, isEqualValueIgnoreOrder as isEqualValueIgnoreOrder$1, isEqualValuePartial as isEqualValuePartial$1, isInteger as isInteger$4, isInterval as isInterval$1, isMap as isMap$1, isPrimitive as isPrimitive$1, isPrimitiveOrObject as isPrimitiveOrObject$1, isReactive as isReactive$3, isSet as isSet$1, jsComparer as jsComparer$1, keyValueSorter as keyValueSorter$1, numericComparer as numericComparer$1, promiseFromEvent as promiseFromEvent$1, resolve as resolve$1, resolveFields as resolveFields$1, resolveFieldsSync as resolveFieldsSync$1, resolveSync as resolveSync$1, resolveWithFallback as resolveWithFallback$1, resolveWithFallbackSync as resolveWithFallbackSync$1, resultErrorToString as resultErrorToString$3, resultToError as resultToError$1, resultToValue as resultToValue$3, runningiOS as runningiOS$1, sleep as sleep$1, sleepWhile as sleepWhile$1, throwResult as throwResult$1, toStringDefault as toStringDefault$1, toStringOrdered as toStringOrdered$1, unique as unique$5, uniqueInstances as uniqueInstances$1 };
//# sourceMappingURL=types-compare.d-xS-TEvAY.d.ts.map