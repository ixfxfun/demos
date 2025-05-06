import { __export } from "./chunk-51aI8Tpl.js";
import { Interval$1 as Interval, KeyValue$1 as KeyValue, ToString$1 as ToString } from "./types-BDmh3f9N.js";
import { SimpleEventEmitter$3 as SimpleEventEmitter } from "./simple-event-emitter-DCUgt8T8.js";
import { TrackedValueOpts, TrackerBase$1 as TrackerBase, TrimReason } from "./tracked-value-DIHlsb7z.js";
import { NumbersComputeResult$1 as NumbersComputeResult } from "./types-CyuELPE8.js";

//#region ../packages/core/src/key-value.d.ts
type KeyValueSortSyles = `value` | `value-reverse` | `key` | `key-reverse`;

//#endregion
//#region ../packages/core/src/trackers/primitive-tracker.d.ts
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
} //#endregion
//#region ../packages/trackers/dist/src/frequency-mutable.d.ts

//# sourceMappingURL=primitive-tracker.d.ts.map
type FrequencyEventMap = {
  readonly change: {
    context: unknown;
  };
};
declare class FrequencyTracker<V> extends SimpleEventEmitter<FrequencyEventMap> {
  #private;
  /**
   * Constructor
   * @param keyString Function to key items. Uses JSON.stringify by default
   */
  constructor(keyString?: ToString<V>);
  /**
   * Clear data. Fires `change` event
   */
  clear(): void;
  /**
   * @returns Iterator over keys (ie. groups)
   */
  keys(): IterableIterator<string>;
  /**
   * @returns Iterator over frequency counts
   */
  values(): IterableIterator<number>;
  /**
   * @returns Copy of entries as an array of `[key, count]`
   */
  toArray(): [key: string, count: number][];
  /**
   * Returns a string with keys and counts, useful for debugging.
   * @returns
   */
  debugString(): string;
  /**
   *
   * @param value Value to count
   * @returns Frequency of value, or _undefined_ if it does not exist
   */
  frequencyOf(value: V | string): number | undefined;
  /**
   *
   * @param value Value to count
   * @returns Relative frequency of `value`, or _undefined_ if it does not exist
   */
  relativeFrequencyOf(value: V | string): number | undefined;
  /**
   * Returns copy of entries as an array
   * @returns Copy of entries as an array
   */
  entries(): KeyValue[];
  /**
   * Calculate min,max,avg,total & count from values
   * @returns Returns `{min,max,avg,total}`
   */
  computeValues(): NumbersComputeResult;
  /**
   * Return entries sorted
   * @param sortStyle Sorting style (default: _value_, ie. count)
   * @returns Sorted array of [key,frequency]
   */
  entriesSorted(sortStyle?: KeyValueSortSyles): readonly KeyValue[];
  /**
   * Add one or more values, firing _change_ event.
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  add(...values: V[]): void;
}
/**
 * Frequency keeps track of how many times a particular value is seen, but
 * unlike a Map it does not store the data. By default compares
 * items by value (via JSON.stringify).
 *
 * Create with {@link Trackers.frequency}.
 *
 * Fires `change` event when items are added or it is cleared.
 *
 * Overview
 * ```
 * const fh = Trackers.frequency();
 * fh.add(value); // adds a value
 * fh.clear();    // clears all data
 * fh.keys() / .values() // returns an iterator for keys and values
 * fh.toArray();  //  returns an array of data in the shape [[key,freq],[key,freq]...]
 * ```
 *
 * Usage
 * ```
 * const fh = Trackers.frequency();
 * fh.add(`apples`); // Count an occurence of `apples`
 * fh.add(`oranges)`;
 * fh.add(`apples`);
 *
 * const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
 * fhData.forEach((d) => {
 *  const [key,freq] = d;
 *  console.log(`Key '${key}' occurred ${freq} time(s).`);
 * })
 * ```
 *
 * Custom key string
 * ```
 * const fh = Trackers.frequency( person => person.name);
 * // All people with name `Samantha` will be counted in same group
 * fh.add({name:`Samantha`, city:`Brisbane`});
 * ```
 * @typeParam V - Type of items
 */
declare const frequency: <V>(keyString?: ToString<V>) => FrequencyTracker<V>; //#endregion
//#region ../packages/trackers/dist/src/number-tracker.d.ts

//# sourceMappingURL=frequency-mutable.d.ts.map
type NumberTrackerResults = {
  readonly total: number;
  readonly min: number;
  readonly max: number;
  readonly avg: number;
};
declare class NumberTracker extends PrimitiveTracker<number, NumberTrackerResults> {
  total: number;
  min: number;
  max: number;
  get avg(): number;
  /**
   * Difference between last value and initial.
   * Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
   * If either of those is missing, undefined is returned
   */
  difference(): number | undefined;
  /**
   * Relative difference between last value and initial.
   * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
   */
  relativeDifference(): number | undefined;
  onReset(): void;
  /**
   * When trimmed, recomputes to set total/min/max to be based on
   * current values.
   * @param reason
   */
  onTrimmed(reason: TrimReason): void;
  computeResults(values: TimestampedPrimitive<number>[]): NumberTrackerResults;
  getMinMaxAvg(): {
    min: number;
    max: number;
    avg: number;
  };
}
/**
 * Keeps track of the total, min, max and avg in a stream of values. By default values
 * are not stored.
 *
 * Usage:
 *
 * ```js
 * import { number } from 'https://unpkg.com/ixfx/dist/trackers.js';
 *
 * const t = number();
 * t.seen(10);
 *
 * t.avg / t.min/ t.max
 * t.initial; // initial value
 * t.size;    // number of seen values
 * t.elapsed; // milliseconds since intialisation
 * t.last;    // last value
 * ```
 *
 * To get `{ avg, min, max, total }`
 * ```
 * t.getMinMax()
 * ```
 *
 * Use `t.reset()` to clear everything.
 *
 * Trackers can automatically reset after a given number of samples
 * ```
 * // reset after 100 samples
 * const t = number({ resetAfterSamples: 100 });
 * ```
 *
 * To store values, use the `storeIntermediate` option:
 *
 * ```js
 * const t = number({ storeIntermediate: true });
 * ```
 *
 * Difference between last value and initial value:
 * ```js
 * t.relativeDifference();
 * ```
 *
 * Get raw data (if it is being stored):
 * ```js
 * t.values; // array of numbers
 * t.timestampes; // array of millisecond times, indexes correspond to t.values
 * ```
 */
declare const number: (opts?: TrackedValueOpts) => NumberTracker;

//#endregion
//#region ../packages/trackers/dist/src/interval-tracker.d.ts
//# sourceMappingURL=number-tracker.d.ts.map
/**
 * A `Tracker` that tracks interval between calls to `mark()`
 */
declare class IntervalTracker extends NumberTracker {
  lastMark: number;
  mark(): void;
}
/**
 * Returns a new {@link IntervalTracker} instance. IntervalTracker
 * records the interval between each call to `mark`.
 *
 * ```js
 * import { interval } from 'https://unpkg.com/ixfx/dist/trackers.js';
 *
 * const t = interval();
 *
 * // Call `mark` to record an interval
 * t.mark();
 * ...
 * t.mark();
 *
 * // Get average time in milliseconds between calls to `mark`
 * t.avg;
 *
 * // Longest and shortest times are available too...
 * t.min / t.max
 * ```
 *
 * Interval tracker can automatically reset after a given number of samples:
 *
 * ```
 * // Reset after 100 samples
 * const t = interval({ resetAfterSamples: 100} );
 * ```
 * @param options Options for tracker
 * @returns New interval tracker
 */
declare const interval: (options?: TrackedValueOpts) => IntervalTracker;

//#endregion
//#region ../packages/trackers/dist/src/rate-tracker.d.ts
//# sourceMappingURL=interval-tracker.d.ts.map
type RateTrackerOpts = Readonly<{
  /**
  * If above zero, tracker will reset after this many samples
  */
  resetAfterSamples?: number;
  /**
   * If set, tracker will reset after this much time
   * since last `mark()` call.
   */
  timeoutInterval?: Interval;
  /**
   * If above zero, there will be a limit to intermediate values kept.
   *
   * When the seen values is twice `sampleLimit`, the stored values will be trimmed down
   * to `sampleLimit`. We only do this when the values are double the size so that
   * the collections do not need to be trimmed repeatedly whilst we are at the limit.
   *
   * Automatically implies storeIntermediate
   */
  sampleLimit?: number;
}>;
/**
 * Tracks the rate of events.
 * It's also able to compute the min,max and average interval between events.
 *
 * @example
 * ```js
 * const clicks = Trackers.rate();
 *
 * // Mark when a click happens
 * document.addEventListener(`click`, () => clicks.mark());
 *
 * // Get details
 * clicks.perSecond; // How many clicks per second
 * clicks.perMinute; // How many clicks per minute
 * ```
 *
 * `timeoutInterval` is a useful option to make the tracker reset
 * after some period without `mark()` being called.
 *
 * Another useful option is `sampleLimit`, which sets an upper bound
 * for how many events to track. A smaller value means the results
 * will more accurately track, but it might be less smooth.
 *
 * ```js
 * // Eg reset tracker after 5 seconds of inactivity
 * const clicks = Trackers.rate({
 *  sampleLimit: 10,
 *  timeoutInterval: { secs: 5 }
 * });
 * ```
 */
declare class RateTracker {
  #private;
  constructor(opts?: Partial<RateTrackerOpts>);
  /**
   * Mark that an event has happened
   */
  mark(): void;
  /**
   * Compute {min,max,avg} for the interval _between_ events.
   * @returns
   */
  computeIntervals(): {
    min: number;
    max: number;
    avg: number;
  };
  /**
   * Returns the time period (in milliseconds) that encompasses
   * the data set. Eg, a result of 1000 means there's data that
   * covers a one second period.
   */
  get elapsed(): number;
  /**
   * Resets the tracker.
   */
  reset(): void;
  /**
   * Get the number of events per second
   */
  get perSecond(): number;
  /**
   * Get the number of events per minute
   */
  get perMinute(): number;
}
/**
 * @inheritdoc RateTracker
 * @param opts
 * @returns
 */
declare const rate: (opts?: Partial<RateTrackerOpts>) => RateTracker;

//#endregion
//#region src/trackers.d.ts
//# sourceMappingURL=rate-tracker.d.ts.map
declare namespace trackers_d_exports {
  export { FrequencyEventMap, FrequencyTracker, IntervalTracker, NumberTracker, NumberTrackerResults, RateTracker, RateTrackerOpts, frequency, interval, number, rate };
}
//#endregion
export { FrequencyEventMap, FrequencyTracker as FrequencyTracker$1, IntervalTracker as IntervalTracker$1, NumberTracker as NumberTracker$1, NumberTrackerResults, RateTracker as RateTracker$1, RateTrackerOpts, frequency as frequency$1, interval as interval$1, number as number$1, rate as rate$1, trackers_d_exports };
//# sourceMappingURL=trackers-C3Oq0mtn.d.ts.map