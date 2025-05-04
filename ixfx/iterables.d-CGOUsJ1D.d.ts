import { __export } from "./chunk-Cl8Af3a2.js";
import { IsEqual$1 as IsEqual } from "./is-equal.d-atlGZibD.js";
import { Interval$1 as Interval, ToString$1 as ToString } from "./types.d-BUgZkBcs.js";
import { SleepOpts$1 as SleepOpts } from "./sleep.d-6DR5DaAH.js";
import { NumbersComputeOptions$1 as NumbersComputeOptions, NumbersComputeResult$1 as NumbersComputeResult } from "./types.d-qUNje-Gp.js";

//#region ../packages/iterables/dist/src/types.d.ts
type WithEvents = {
  addEventListener(type: string, callbackfn: any): void;
  removeEventListener(type: string, callbackfn: any): void;
};
type IteratorControllerOptions<T> = Readonly<{
  delay?: Interval;
  onValue: (value: T) => boolean | void;
  iterator: () => IterableIterator<T>;
}>;
type IteratorControllerState = `stopped` | `running` | `paused`;
type ToArrayOptions = {
  /**
   * If set `toArray` continues until reaching this many results
   */
  limit: number;
  /**
   * If set, `toArray` continues until this function returns false
   * @param count
   * @returns
   */
  while: (count: number) => boolean;
  /**
   * If set, `toArray` continues until this much time elapses.
   */
  elapsed: Interval;
};
type ForEachOptions = {
  /**
   * Interval after each iteration.
   * Only works with asynchronous forEach.
   */
  interval?: Interval;
}; //#endregion
//#region ../packages/iterables/dist/src/async.d.ts
declare namespace async_d_exports {
  export { asCallback$2 as asCallback, chunks$2 as chunks, concat$2 as concat, dropWhile$2 as dropWhile, equals$2 as equals, every$2 as every, fill$2 as fill, filter$2 as filter, find$2 as find, flatten$2 as flatten, forEach$2 as forEach, fromArray$2 as fromArray, fromIterable$2 as fromIterable, last$2 as last, map$2 as map, max$2 as max, min$2 as min, nextWithTimeout, reduce$2 as reduce, repeat$1 as repeat, slice$2 as slice, some$2 as some, toArray$2 as toArray, unique$2 as unique, uniqueByValue$2 as uniqueByValue, until$2 as until, withDelay, zip$2 as zip };
}
/**
* Yield values from `array`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
*
* @param array Array of values
* @param interval Interval (defaults: 1ms)
*/
declare function fromArray$2<V>(array: V[], interval?: Interval): AsyncGenerator<V>;

/**
* Yield values from `iterable`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
* @param iterable Iterable or AsyncIterable
* @param [interval=1] Interval to wait between yield
*/
declare function fromIterable$2<V>(iterable: Iterable<V> | AsyncIterable<V>, interval?: Interval): AsyncGenerator<V>;
declare function chunks$2<V>(it: AsyncIterable<V>, size: number): AsyncGenerator<V[], void, unknown>;
declare function concat$2<V>(...its: readonly AsyncIterable<V>[]): AsyncGenerator<Awaited<V>, void, any>;
declare function dropWhile$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;

/**
* Loops over a generator until it finishes, calling `callback`.
* Useful if you don't care about the value generator produces, just the number of loops.
*
* In this version, we do a `for await of` over `gen`, and also `await callback()`.

* ```js
* await until(count(5), () => {
* // do something 5 times
* });
* ```
*
* If you want the value from the generator, use a `for of` loop as usual.
*
* If `callback` explicitly returns _false_, the generator is aborted.
* @param it Generator to run
* @param callback Code to call for each iteration
*/
declare const until$2: (it: AsyncIterable<any> | Iterable<any>, callback: () => (void | Promise<boolean> | undefined | boolean | Promise<undefined> | Promise<void>)) => Promise<undefined>;

/**
* This generator will repeat another generator up until some condition. This is the version
* that can handle async generators.
*
* For example, {@link count} will count from 0..number and then finish:
* ```js
* for (const v of count(5)) {
*  // v: 0, 1, 2, 3, 4
* }
* ```
*
* But what if we want to repeat the count? We have to provide a function to create the generator,
* rather than using the generator directly, since it's "one time use"
* ```js
* for await (const v of repeat(() => count(5))) {
*  // v: 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, ...
*  // warning: never ends
* }
* ```
*
* Limiting the number of repeats can be done by passing in extra parameters
* ```js
* repeat(generator, { count: 5} ); // Iterate over `generator` five times
* ```
*
* ```js
* const ac = new AbortController();
* repeat(generator, { signal: ac.signal }); // Pass in signal
* ...
* ac.abort(); // Trigger signal at some point
* ```
* @param genCreator
* @param repeatsOrSignal
*/
declare const repeat$1: <T>(genCreator: () => Iterable<T> | AsyncIterable<T>, repeatsOrSignal: number | AbortSignal) => AsyncGenerator<T>;

/**
* Returns true if items in two iterables are equal, as
* determined by the `equality` function.
* Order matters. It compares items at the same 'step' of each iterable.
* @param it1
* @param it2
* @param equality
* @returns
*/
declare function equals$2<V>(it1: AsyncIterable<V>, it2: AsyncIterable<V>, equality?: IsEqual<V>): Promise<boolean | undefined>;
declare function every$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function fill$2<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<Awaited<V>, void, unknown>;

/**
* Filters an iterable, only yielding items which match `f`.
*
* ```js
* filter([1, 2, 3, 4], e => e % 2 == 0);
* returns [2, 4]
* ```
* @param it
* @param f
*/
declare function filter$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): AsyncGenerator<Awaited<V>, void, unknown>;
declare function find$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<V | undefined>;
declare function flatten$2<V>(it: AsyncIterable<V>): AsyncGenerator<any, void, unknown>;

/**
* Iterates over an async iterable or array, calling `fn` for each value, with optional
* interval between each loop. If the async `fn` returns _false_, iterator cancels.
*
* ```
* import { forEach } from "https://unpkg.com/ixfx/dist/flow.js"
* // Prints items from array every second
* await forEach([0,1,2,3], i => console.log(i), 1000);
* ```
*
* ```
* // Retry up to five times, with 5 seconds between each attempt
* await forEach(count(5), i=> {
*  try {
*    await doSomething();
*    return false; // Succeeded, exit early
*  } catch (ex) {
*    console.log(ex);
*    return true; // Keep trying
*  }
* }, 5000);
* ```
* @param iterator Iterable thing to loop over
* @param fn Function to invoke on each item. If it returns _false_ loop ends.
* @param options Options
* @typeParam V Type of iterable
*/
declare const forEach$2: <T>(iterator: AsyncIterable<T> | T[], fn: (v?: T) => Promise<boolean> | Promise<void> | boolean | void, options?: Partial<ForEachOptions>) => Promise<void>;

/**
* Returns last value from an iterable, or _undefined_
* if no values are generated
* @param it
*/
declare function last$2<V>(it: AsyncIterable<V>, opts?: Partial<{
  abort: AbortSignal;
}>): Promise<V | undefined>;

/**
* Maps an iterable through function `f`
* ```js
* // For every input value, multiply it by itself
* map([1, 2, 3], e => e*e)
* // Yields: 1, 4, 9
* ```
*
* It can also be used to transform types:
* ```js
* map([1, 2, 3], e => { value: e });
* // Yields: { value: 1 }, { value: 2 }, { value: 3 }
* ```
* @param it
* @param f
*/
declare function map$2<V, X>(it: AsyncIterable<V>, f: (v: V) => X): AsyncGenerator<Awaited<X>, void, unknown>;
declare function max$2<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<Awaited<V>, void, unknown>;

/**
* Returns the minimum seen of an iterable as it changes.
* Streaming result: works with endless iterables.
*
* Note that `gt` function returns true if A is _greater_ than B, even
* though we're looking for the minimum.
*
* ```js
* // Rank objects based on 'v' value
* const rank = (a,b) => a.v > b.v;
* min([
*  {i:0,v:1},
*  {i:1,v:9},
*  {i:2,v:-2}
* ], rank);
* // Yields: {i:2, v:1}, {i:2,v:-2}
* ```
* @param it Iterable
* @param gt Should return _true_ if `a` is greater than `b`.
* @returns
*/
declare function min$2<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<Awaited<V>, Awaited<V> | undefined, unknown>;
declare function reduce$2<V>(it: AsyncIterable<V>, f: (accumulator: V, current: V) => V, start: V): Promise<V>;

/**
* Calls `callback` whenever the async generator produces a value.
*
* When using `asCallback`, call it with `await` to let generator
* run its course before continuing:
* ```js
* await asCallback(tick({ interval:1000, loops:5 }), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints after 5 seconds
* ```
*
* Or if you skip the `await`, code continues and callback will still run:
* ```js
* asCallback(tick({ interval: 1000, loops: 5}), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints immediately
* ```
* @param input
* @param callback
*/
declare function asCallback$2<V>(input: AsyncIterable<V>, callback: (v: V) => unknown, onDone?: () => void): Promise<void>;
declare function slice$2<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<Awaited<V>, void, unknown>;

/**
* Enumerates over an input iterable, with a delay between items.
* @param it
* @param delay
*/
declare function withDelay<V>(it: Iterable<V>, delay: Interval): AsyncGenerator<Awaited<V>, void, unknown>;

/***
* Returns the next IteratorResult,
* throwing an error if it does not happen
* within `interval` (default: 1s)
*/
declare function nextWithTimeout<V>(it: AsyncIterableIterator<V> | IterableIterator<V>, options: SleepOpts<any>): Promise<IteratorResult<V, any>>;
declare function some$2<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;

/**
* Returns an array of values from an iterator.
*
* ```js
* const data = await toArray(adsrIterable(opts, 10));
* ```
*
* Note: If the iterator is infinite, be sure to provide limits via the options.
* ```js
* // Return maximum five items
* const data = await toArray(iterable, { limit: 5 });
* // Return results for a maximum of 5 seconds
* const data = await toArray(iterable, { elapsed: 5000 });
* ```
* Note that limits are ORed, `toArray` will finish if either of them is true.
*
* @param it Asynchronous iterable
* @param options Options when converting to array
* @returns
*/
declare function toArray$2<V>(it: AsyncIterable<V>, options?: Partial<ToArrayOptions>): Promise<V[]>;
declare function unique$2<V>(iterable: AsyncIterable<V> | AsyncIterable<V>[]): AsyncGenerator<Awaited<V>, void, unknown>;
declare function uniqueByValue$2<T>(input: AsyncIterable<T>, toString?: (value: T) => string, seen?: Set<string>): AsyncGenerator<T>;

/**
* Returns unique items from iterables, given a particular key function
* ```js
* unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
* Yields:  [{i:0,v:2},{i:1,v:3}]
* @param it
* @param f
*/
/**
* Combine same-positioned items from several iterables
* ```js
* zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
* Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
* ```
* @param its
* @returns
*/
declare function zip$2<V>(...its: readonly AsyncIterable<V>[]): AsyncGenerator<V[], void, unknown>;

//#endregion
//#region ../packages/iterables/dist/src/sync/slice.d.ts
declare function slice$1<V>(it: Iterable<V>, start?: number, end?: number): Generator<V, void, unknown>;

//#endregion
//#region ../packages/iterables/dist/src/sync/reduce.d.ts
declare function reduce$1<V>(it: Iterable<V>, f: (accumulator: V, current: V) => V, start: V): V;

//#endregion
//#region ../packages/iterables/dist/src/sync.d.ts
declare namespace sync_d_exports {
  export { asCallback$1 as asCallback, chunks$1 as chunks, chunksOverlapping, concat$1 as concat, dropWhile$1 as dropWhile, equals$1 as equals, every$1 as every, fill$1 as fill, filter$1 as filter, find$1 as find, first, flatten$1 as flatten, forEach$1 as forEach, fromArray$1 as fromArray, fromIterable$1 as fromIterable, last$1 as last, map$1 as map, max$1 as max, min$1 as min, next, reduce$1 as reduce, repeat, slice$1 as slice, some$1 as some, toArray$1 as toArray, unique$1 as unique, uniqueByValue$1 as uniqueByValue, until$1 as until, yieldNumber, zip$1 as zip };
}
declare function uniqueByValue$1<T>(input: Iterable<T>, toString?: ToString<T>, seen?: Set<string>): Generator<T>;

/**
* Calls `callback` whenever the generator produces a value.
*
* When using `asCallback`, call it with `await` to let generator
* run its course before continuing:
* ```js
* await asCallback(tick({ interval:1000, loops:5 }), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints after 5 seconds
* ```
*
* Or if you skip the `await`, code continues and callback will still run:
* ```js
* asCallback(tick({ interval: 1000, loops: 5}), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints immediately
* ```
* @param input
* @param callback
*/
declare function asCallback$1<V>(input: Iterable<V>, callback: (v: V) => unknown, onDone?: () => void): void;

/**
* Returns a function that yields a value from a generator.
* ```js
* const spring = yieldNumber(Oscillators.spring());
*
* spring(); // latest value
* ```
*
* Instead of:
* ```js
* const spring = Oscillators.spring();
*
* spring.next().value
* ```
*
* A `defaultValue` can be provided if the source generator returns undefined:
* ```js
* const spring = yieldNumber(Oscillators.spring(), 0);
* spring(); // Returns 0 if the generator returns undefined
* ```
* @param generator
* @param defaultValue
* @returns
*/
declare function yieldNumber(generator: Generator<number>, defaultValue?: number): () => number | undefined;

/**
* Return first value from an iterable, or _undefined_ if
* no values are generated
* @param it
* @returns
*/
declare function first<V>(it: Iterable<V>): V | undefined;

/**
* Returns last value from an iterable, or _undefined_
* if no values are generated
* @param it
*/
declare function last$1<V>(it: Iterable<V>): V | undefined;

/**
* Yields chunks of the iterable `it` such that the end of a chunk is the
* start of the next chunk.
*
* Eg, with the input [1,2,3,4,5] and a size of 2, we would get back
* [1,2], [2,3], [3,4], [4,5].
*
*
* @param it
* @param size
* @returns
*/
declare function chunksOverlapping<V>(it: Iterable<V>, size: number): Generator<V[], void, unknown>;
declare function chunks$1<V>(it: Iterable<V>, size: number): Generator<V[], void, unknown>;
declare function concat$1<V>(...its: readonly Iterable<V>[]): Generator<V, void, any>;
declare function dropWhile$1<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;

/**
* Loops over a generator until it finishes, calling `callback`.
* Useful if you don't care about the value generator produces, just the number of loops.
*
* ```js
* until(count(5), () => {
* // do something 5 times
* });
* ```
*
* If you want the value from the generator, use a `for of` loop as usual.
* If `callback` explicitly returns _false_, the generator is aborted.
* @param it Generator to run
* @param callback Code to call for each iteration
*/
declare const until$1: (it: Iterable<any>, callback: () => (void | boolean | never)) => void;
declare const next: <T>(it: Generator<T>) => () => T | undefined;

/**
* Returns true if items in two iterables are equal, as
* determined by the `equality` function.
* @param it1
* @param it2
* @param equality
* @returns
*/
declare function equals$1<V>(it1: IterableIterator<V>, it2: IterableIterator<V>, equality?: IsEqual<V>): boolean | undefined;
declare function every$1<V>(it: Iterable<V>, f: (v: V) => boolean): boolean;
declare function fill$1<V>(it: Iterable<V>, v: V): Generator<V, void, unknown>;

/**
* Iterates over `iterator` (iterable/array), calling `fn` for each value.
* If `fn` returns _false_, iterator cancels.
*
* Over the default JS `forEach` function, this one allows you to exit the
* iteration early.
*
* @example
* ```js
* import { Sync } from "https://unpkg.com/ixfx/dist/iterables.js"
* Sync.forEach(count(5), () => console.log(`Hi`));  // Prints `Hi` 5x
* Sync.forEach(count(5), i => console.log(i));      // Prints 0 1 2 3 4
* Sync.forEach([0,1,2,3,4], i => console.log(i));   // Prints 0 1 2 3 4
* ```
*
* Use {@link forEach} if you want to use an async `iterator` and async `fn`.
*
* Alternatives:
* * {@link Flow.repeat}/{@link Flow.repeatSync}: if you want to call something a given number of times and get the result
* @param iterator Iterable or array
* @typeParam T Type of iterable's values
* @param fn Function to call for each item. If function returns _false_, iteration cancels
*/
declare function forEach$1<T>(iterator: Iterable<T> | T[], fn: (v: T) => boolean | void): void;

/**
* ```js
* filter([1, 2, 3, 4], e => e % 2 == 0);
* returns [2, 4]
* ```
* @param it
* @param f
*/
declare function filter$1<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V, void, unknown>;
declare function find$1<V>(it: Iterable<V>, f: (v: V) => boolean): V | undefined;
declare function flatten$1<V>(it: Iterable<V>): Generator<any, void, unknown>;

/**
* Maps an iterable of type `V` to type `X`.
* ```js
* map([1, 2, 3], e => e*e)
* returns [1, 4, 9]
* ```
* @param it
* @param f
*/
declare function map$1<V, X>(it: Iterable<V>, f: (v: V) => X): Generator<X, void, unknown>;
declare function max$1<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V>;
declare function min$1<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V, void, unknown>;
declare function some$1<V>(it: Iterable<V>, f: (v: V) => boolean): boolean;
declare function repeat<T>(genCreator: () => Iterable<T>, repeatsOrSignal: number | AbortSignal): Generator<T>;
declare function unique$1<V>(iterable: Iterable<V> | Iterable<V>[]): Generator<V, void, unknown>;

/**
* Combine same-positioned items from several iterables
* ```js
* zip( [1, 2, 3], [4, 5, 6], [7, 8, 9] );
* Yields: [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
* ```
* @param its
* @returns
*/
declare function zip$1<V>(...its: readonly Iterable<V>[]): Generator<V[], void, unknown>;
declare function fromIterable$1<T>(iterable: Iterable<T>): Generator<T, void, unknown>;

/**
* Returns an array of values from an iterator.
*
* ```js
* const data = await toArray(adsrIterable(opts, 10));
* ```
*
* Note: If the iterator is infinite, be sure to provide a limit via the options or the function
* will never return.
*
* @param it Asynchronous iterable
* @param options Options when converting to array.
* @returns
*/
declare function toArray$1<V>(it: Iterable<V>, options?: Partial<ToArrayOptions>): V[];

/**
* Yield values from `array`, one at a time.
* Use `interval` to add time between each item.
* The first item is yielded without delay.
* @param array Array of values
*/
declare function fromArray$1<V>(array: V[]): Generator<V>;

//#endregion
//#region ../packages/iterables/dist/src/compare-values.d.ts
/**
* Returns the 'max' of some iterable using the provided scoring function.
* It only yields a value when iterator finishes.
* @param iterable
* @param scorer
* @returns
*/
declare const maxScore: <V>(iterable: Iterable<V>, scorer: (v: V) => number) => V | undefined;

/**
* Returns the 'min' of some iterable using the provided scoring function.
* It only yields a value when iterator finishes.
* @param iterable
* @param scorer
* @returns
*/
declare const minScore: <V>(iterable: Iterable<V>, scorer: (v: V) => number) => V | undefined;

/**
* Returns _true_ if all values in iterables are equal, regardless
* of their position. Uses === equality semantics by default.
*
* Is NOT recursive.
*
* @example Default equality checking
* ```js
* const a = ['apples','oranges','pears'];
* const b = ['pears','oranges','apples'];
* hasEqualValues(a, b); // True
* ```
*
* @example Custom equality checking
* ```js
* const a = [ { name: 'John' }];
* const b = [ { name: 'John' }];
* // False, since object identies are different
* hasEqualValues(a, b);
* // True, since now we're comparing by value
* hasEqualValues(a, b, (aa,bb) => aa.name === bb.name);
* ```
* @param arrays
* @param eq
*/
declare const hasEqualValuesShallow: <V>(iterableA: Iterable<V>, iterableB: Iterable<V>, eq?: IsEqual<V>) => boolean;

//#endregion
//#region ../packages/iterables/dist/src/from-event.d.ts
declare const fromEvent: <V>(eventSource: WithEvents, eventType: string) => AsyncIterator<any>;

//#endregion
//#region ../packages/iterables/dist/src/guard.d.ts
declare const isAsyncIterable: (v: any) => v is AsyncIterable<any>;
declare const isIterable: (v: any) => v is Iterable<any>;

//#endregion
//#region ../packages/iterables/dist/src/numbers-compute.d.ts
/**
* Returns the min, max, avg and total of the array or iterable.
* Any values that are invalid are silently skipped over.
*
* ```js
* const v = [ 10, 2, 4.2, 99 ];
* const mma = numbersCompute(v);
* // Yields: { min: 2, max: 99, total: 115.2, avg: 28.8 }
* ```
*
* Use {@link Numbers.average}, {@link Numbers.max}, {@link Numbers.min} or {@link Numbers.total} if you only need one of these.
*
* A start and end range can be provided if the calculation should be restricted to a part
* of the input array. By default the whole array is used.
*
* It's also possible to use an iterable as input.
* ```js
* numbersCompute(count(5,1)); // Averages 1,2,3,4,5
* ```
*
* Returns `NaN` if the input data is empty.
* @param data
* @param options Allows restriction of range that is examined
* @returns `{min, max, avg, total}`
*/
declare const numbersCompute: (data: readonly number[] | number[] | Iterable<number>, options?: NumbersComputeOptions) => NumbersComputeResult;
declare function computeAverage(data: Iterable<number>, options?: NumbersComputeOptions): number;

//#endregion
//#region ../packages/iterables/dist/src/index.d.ts
declare function min<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<V>;
declare function min<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V>;
declare function max<V>(it: AsyncIterable<V>, gt?: (a: V, b: V) => boolean): AsyncGenerator<V>;
declare function max<V>(it: Iterable<V>, gt?: (a: V, b: V) => boolean): Generator<V>;
declare function dropWhile<V>(it: AsyncIterable<V>, f: (v: V) => boolean): AsyncGenerator<V>;
declare function dropWhile<V>(it: Iterable<V>, f: (v: V) => boolean): Generator<V>;
declare function until(it: AsyncIterable<any>, f: () => Promise<boolean> | Promise<undefined>): Promise<undefined>;
declare function until(it: Iterable<any>, f: () => boolean | never): void;
declare function until(it: Iterable<any>, f: () => Promise<boolean>): Promise<undefined>;
declare function chunks<V>(it: Iterable<V>, size: number): Generator<V[]>;
declare function chunks<V>(it: AsyncIterable<V>, size: number): AsyncGenerator<V[]>;
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): AsyncGenerator<V>;
declare function filter<V>(it: AsyncIterable<V>, f: (v: V) => boolean): Generator<V>;
declare function fill<V>(it: AsyncIterable<V>, v: V): AsyncGenerator<V>;
declare function fill<V>(it: Iterable<V>, v: V): Generator<V>;
declare function concat<V>(...its: Iterable<V>[]): Generator<V>;
declare function concat<V>(...its: AsyncIterable<V>[]): AsyncGenerator<V>;
declare function find<V>(it: V[] | Iterable<V>, f: (v: V) => boolean): V | undefined;
declare function find<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<V | undefined>;

/**
* Execute function `f` for each item in iterable.
* If `f` returns _false_, iteration stops.
* ```js
* forEach(iterable, v => {
*  // do something with value
* });
* ```
*
* When using an async iterable, `fn` can also be async.
* @param it Iterable or array
* @param fn Function to execute
*/
declare function forEach<T>(it: T[] | AsyncIterable<T> | Iterable<T>, fn: (v: T | undefined) => boolean | Promise<boolean> | void | Promise<void>, options?: Partial<ForEachOptions>): Promise<void> | undefined;
declare function map<V, X>(it: AsyncIterable<V>, f: (v: V) => Promise<X> | X): Generator<X>;
declare function map<V, X>(it: V[] | Iterable<V>, f: (v: V) => X): Generator<X>;
declare function fromArray<V>(array: V[], interval: Interval): AsyncGenerator<V>;
declare function fromArray<V>(array: V[]): Generator<V>;
declare function flatten<V>(it: AsyncIterable<V[] | V>): AsyncIterable<V>;
declare function flatten<V>(it: Iterable<V[] | V> | V[]): Iterable<V>;
declare function some<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function some<V>(it: Iterable<V> | V[], f: (v: V) => boolean): boolean;
declare function last<V>(it: AsyncIterable<V>): Promise<V | undefined>;
declare function last<V>(it: Iterable<V>): V;
declare function reduce<V>(it: AsyncIterable<V>, f: (accumulator: V, current: V) => V, start: V): Promise<V>;
declare function reduce<V>(it: Iterable<V> | V[], f: (accumulator: V, current: V) => V, start: V): V;
declare function slice<V>(it: AsyncIterable<V>, start?: number, end?: number): AsyncGenerator<V>;
declare function slice<V>(it: Iterable<V> | V[], start?: number, end?: number): Generator<V>;
declare function unique<V>(iterable: Iterable<V> | Iterable<V>[]): Generator<V>;
declare function unique<V>(iterable: AsyncIterable<V> | AsyncIterable<V>[]): AsyncGenerator<V>;
declare function uniqueByValue<T>(input: Iterable<T> | T[], toString: (v: T) => string, seen?: Set<string>): Generator<T>;
declare function uniqueByValue<T>(input: AsyncIterable<T>, toString: (v: T) => string, seen?: Set<string>): AsyncGenerator<T>;
declare function toArray<V>(it: AsyncIterable<V>, options?: Partial<ToArrayOptions>): Promise<V[]>;
declare function toArray<V>(it: Iterable<V>, options?: Partial<ToArrayOptions>): V[];
declare function every<V>(it: Iterable<V> | V[], f: (v: V) => boolean): boolean;
declare function every<V>(it: AsyncIterable<V>, f: (v: V) => boolean | Promise<boolean>): Promise<boolean>;
declare function equals<V>(it1: AsyncIterable<V>, it2: AsyncIterable<V>, equality?: (a: V, b: V) => boolean): Promise<boolean>;
declare function equals<V>(it1: IterableIterator<V>, it2: IterableIterator<V>, equality?: (a: V, b: V) => boolean): boolean;
declare function zip<V>(...its: readonly AsyncIterable<V>[]): Generator<V[]>;
declare function zip<V>(...its: readonly Iterable<V>[]): Generator<V>;
declare function fromIterable<V>(iterable: Iterable<V>): Generator<V>;
declare function fromIterable<V>(iterable: AsyncIterable<V> | Iterable<V>, interval: Interval): AsyncGenerator<V>;

/**
* Access `callback` as an iterable:
* ```js
* const fn = () => Math.random();
* for (const v of fromFunction(fn)) {
*  // Generate infinite random numbers
* }
* ```
*
* Use {@link fromFunctionAwaited} to await `callback`.
* @param callback Function that generates a value
*/
declare function fromFunction<T>(callback: () => T): Generator<T, void, unknown>;

/**
* Access awaited `callback` as an iterable:
* ```js
* const fn = () => Math.random();
* for await (const v of fromFunctionAwaited(fn)) {
*  // Generate infinite random numbers
* }
* ```
*
* `callback` can be async, result is awaited.
* This requires the use of `for await`.
* Use {@link fromFunction} otherwise;
* @param callback
*/
declare function fromFunctionAwaited<T>(callback: () => Promise<T> | T): AsyncGenerator<Awaited<T>, void, unknown>;

/**
* Calls `callback` whenever the generator produces a value.
*
* When using `asCallback`, call it with `await` to let generator
* run its course before continuing:
* ```js
* await asCallback(tick({ interval:1000, loops:5 }), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints after 5 seconds
* ```
*
* Or if you skip the `await`, code continues and callback will still run:
* ```js
* asCallback(tick({ interval: 1000, loops: 5}), x => {
*  // Gets called 5 times, with 1000ms interval
* });
* console.log(`Hi`); // Prints immediately
* ```
* @param input
* @param callback
*/
declare function asCallback<V>(input: AsyncIterable<V> | Iterable<V>, callback: (v: V) => unknown, onDone?: () => void): Promise<void> | undefined;

//#endregion
//#region src/iterables.d.ts
declare namespace iterables_d_exports {
  export { async_d_exports as Async, ForEachOptions, IteratorControllerOptions, IteratorControllerState, sync_d_exports as Sync, ToArrayOptions, WithEvents, asCallback, chunks, computeAverage, concat, dropWhile, equals, every, fill, filter, find, flatten, forEach, fromArray, fromEvent, fromFunction, fromFunctionAwaited, fromIterable, hasEqualValuesShallow, isAsyncIterable, isIterable, last, map, max, maxScore, min, minScore, numbersCompute, reduce, slice, some, toArray, unique, uniqueByValue, until, zip };
}
//#endregion
export { ForEachOptions, IteratorControllerOptions, IteratorControllerState, ToArrayOptions as ToArrayOptions$1, WithEvents, asCallback as asCallback$1, async_d_exports, chunks as chunks$3, computeAverage as computeAverage$1, concat as concat$1, dropWhile as dropWhile$1, equals as equals$1, every as every$1, fill as fill$1, filter as filter$3, find as find$1, flatten as flatten$3, forEach as forEach$1, fromArray as fromArray$1, fromEvent as fromEvent$1, fromFunction as fromFunction$1, fromFunctionAwaited as fromFunctionAwaited$1, fromIterable as fromIterable$1, hasEqualValuesShallow as hasEqualValuesShallow$1, isAsyncIterable as isAsyncIterable$1, isIterable as isIterable$1, iterables_d_exports, last as last$1, map as map$1, max as max$7, maxScore as maxScore$1, min as min$7, minScore as minScore$1, numbersCompute as numbersCompute$1, reduce as reduce$1, slice as slice$1, some as some$1, sync_d_exports, toArray as toArray$3, unique as unique$3, uniqueByValue as uniqueByValue$1, until as until$3, zip as zip$3 };
//# sourceMappingURL=iterables.d-CGOUsJ1D.d.ts.map