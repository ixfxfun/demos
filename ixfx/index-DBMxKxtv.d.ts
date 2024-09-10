import { a as MinMaxAvgTotal } from './Types-grp6zrDi.js';
import { T as ToString } from './ToString-DO94OWoh.js';
import { S as SortSyles } from './KeyValue-vMMe-ezw.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';
import { K as KeyValue } from './PrimitiveTypes-F6miV4Zn.js';
import { N as NumberTracker, T as TrackedValueOpts, a as TrackerBase, b as TimestampedObject, c as TrimReason, d as TrackedValueMap, e as NumberTrackerResults, P as PrimitiveTracker, f as Timestamped, g as TimestampedPrimitive, n as number } from './NumberTracker-MX95UoKm.js';
import { P as PointRelationResult, a as PointRelation, C as Coord } from './PointRelationTypes-Dw4GvWQq.js';
import { P as PolyLine, L as Line } from './LineType-DkIFzpdp.js';
import { P as Point, a as Point3d } from './PointType-BDlA07rn.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';

type FrequencyEventMap = {
    readonly change: {
        context: any;
    };
};
declare class FrequencyTracker<V> extends SimpleEventEmitter<FrequencyEventMap> {
    #private;
    /**
     * Constructor
     * @param keyString Function to key items. Uses JSON.stringify by default
     */
    constructor(keyString?: ToString<V> | undefined);
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
    toArray(): Array<[key: string, count: number]>;
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
     * @returns Copy of entries as an array
     */
    entries(): Array<KeyValue>;
    /**
     *
     * @returns Returns `{min,max,avg,total}`
     */
    minMaxAvg(): MinMaxAvgTotal;
    /**
     *
     * @param sortStyle Sorting style (default: _value_, ie. count)
     * @returns Sorted array of [key,frequency]
     */
    entriesSorted(sortStyle?: SortSyles): ReadonlyArray<KeyValue>;
    /**
     *
     * @param values Values to add. Fires _change_ event after adding item(s)
     */
    add(...values: Array<V>): void;
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
declare const frequency: <V>(keyString?: ToString<V> | undefined) => FrequencyTracker<V>;

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

/**
 * Information about seen points
 */
type PointTrack = PointRelationResult & {};
/**
 * Results of point tracking
 */
type PointTrackerResults = Readonly<{
    /**
     * Relation of last point to previous point
     */
    fromLast: PointTrack;
    /**
     * Relation of last point to 'initial' point.
     * This will be the oldest point in the buffer of the tracker.
     */
    fromInitial: PointTrack;
    /**
     * Relation of last point to a 'mark' point,
     * which is manually set.
     *
     * Will give _undefined_ if `.mark()` has not been called on tracker.
     */
    fromMark: PointTrack | undefined;
    values: ReadonlyArray<Point>;
}>;

/**
 * Point tracker. Create via `Trackers.point()`.
 *
 */
declare class PointTracker extends ObjectTracker<Point, PointTrackerResults> {
    initialRelation: PointRelation | undefined;
    markRelation: PointRelation | undefined;
    lastResult: PointTrackerResults | undefined;
    constructor(opts?: TrackedValueOpts);
    /**
     * Notification that buffer has been knocked down to `sampleLimit`.
     *
     * This will reset the `initialRelation`, which will use the new oldest value.
     */
    onTrimmed(reason: TrimReason): void;
    /**
     * @ignore
     */
    onReset(): void;
    /**
     * Adds a PointerEvent along with its
     * coalesced events, if available.
     * @param p
     * @returns
     */
    seenEvent(p: PointerEvent): PointTrackerResults;
    /**
     * Makes a 'mark' in the tracker, allowing you to compare values
     * to this point.
     */
    mark(): void;
    /**
     * Tracks a point, returning data on its relation to the
     * initial point and the last received point.
     *
     * Use {@link seenEvent} to track a raw `PointerEvent`.
     *
     * @param _p Point
     */
    computeResults(_p: Array<TimestampedObject<Point>>): PointTrackerResults;
    /**
     * Returns a polyline representation of stored points.
     * Returns an empty array if points were not saved, or there's only one.
     */
    get line(): PolyLine;
    /**
     * Returns a vector of the initial/last points of the tracker.
     * Returns as a polar coordinate
     */
    get vectorPolar(): Coord;
    /**
     * Returns a vector of the initial/last points of the tracker.
     * Returns as a Cartesian coordinate
     */
    get vectorCartesian(): Point;
    /**
     * Returns a line from initial point to last point.
     *
     * If there are less than two points, Lines.Empty is returned
     */
    get lineStartEnd(): Line;
    /**
     * Returns distance from latest point to initial point.
     * If there are less than two points, zero is returned.
     *
     * This is the direct distance from initial to last,
     * not the accumulated length.
     * @returns Distance
     */
    distanceFromStart(): number;
    /**
     * Difference between last point and the initial point, calculated
     * as a simple subtraction of x,y & z.
     *
     * `Points.Placeholder` is returned if there's only one point so far.
     */
    difference(): Point | Point3d;
    /**
     * Returns angle (in radians) from latest point to the initial point
     * If there are less than two points, undefined is return.
     * @returns Angle in radians
     */
    angleFromStart(): number | undefined;
    /**
     * Returns the total length of accumulated points.
     * Returns 0 if points were not saved, or there's only one
     */
    get length(): number;
    /**
   * Returns the last x coord
   */
    get x(): number;
    /**
     * Returns the last y coord
     */
    get y(): number;
    /**
     * Returns the last z coord (or _undefined_ if not available)
     */
    get z(): number | undefined;
}
/**
 * A {@link TrackedValueMap} for points. Uses {@link PointTracker} to
 * track added values.
 */
declare class TrackedPointMap extends TrackedValueMap<Point, PointTracker, PointTrackerResults> {
    constructor(opts?: TrackedValueOpts);
    /**
     * Track a PointerEvent
     * @param event
     */
    seenEvent(event: PointerEvent): Promise<Array<PointTrackerResults>>;
}
/**
 * Track several named points over time, eg a TensorFlow body pose point.
 * Call `seen()` to track a point. Mutable. If you want to compare
 * a single coordinate with a reference coordinate, {@link point} may be a better choice.
 *
 * See also:
 * * {@link Geometry.Points.relation}: Compute relation info between two points
 * * {@link Trackers.point}: Track relation between points over time
 * * [ixfx Guide to Point Tracker](https://ixfx.fun/geometry/tracking/)
 *
 * Basic usage
 * ```js
 * import { points } from 'https://unpkg.com/ixfx/dist/trackers.js';
 *
 * const pt = points();
 *
 * // Track a point under a given id
 * document.addEventListener(`pointermove`, e => {
 *  const info = await pt.seen(e.pointerId, { x: e.x, y: e.y });
 *  // Yields some info on relation of the point to initial value
 * });
 * ```
 *
 * Do something with last values for all points
 * ```js
 * const c = Points.centroid(...Array.from(pt.last()));
 * ```
 *
 * More functions...
 * ```js
 * pt.size;       // How many named points are being tracked
 * pt.delete(id); // Delete named point
 * pt.reset();    // Clear data
 * ```
 *
 * Accessing by id:
 *
 * ```js
 * pt.get(id);  // Get named point (or _undefined_)
 * pt.has(id);  // Returns true if id exists
 * ```
 *
 * Iterating over data
 *
 * ```js
 * pt.trackedByAge(); // Iterates over tracked points, sorted by age (oldest first)
 * pt.tracked(); // Tracked values
 * pt.ids();     // Iterator over ids
 *
 * // Last received value for each named point
 * pt.last();
 *
 * pt.initialValues(); // Iterator over initial values for each point
 * ```
 *
 * You can work with 'most recently updated' points:
 *
 * ```js
 * // Iterates over points, sorted by age (oldest first)
 * pt.valuesByAge();
 * ```
 *
 * Options:
 * * `id`: Id of this tracker. Optional
 * * `sampleLimit`: How many samples to store
 * * `storeIntermediate`: If _true_, all points are stored internally
 * * `resetAfterSamples`: If set above 0, it will automatically reset after the given number of samples have been seen
 * @param options
 * @returns
 */
declare const points: (options?: TrackedValueOpts) => TrackedPointMap;
/**
 * A tracked point. Create via {@link Trackers.point}. Mutable. Useful for monitoring how
 * it changes over time. Eg. when a pointerdown event happens, to record the start position and then
 * track the pointer as it moves until pointerup.
 *
 * See also
 * * [Playground](https://clinth.github.io/ixfx-play/data/point-tracker/index.html)
 * * {@link points}: Track several points, useful for multi-touch.
 * * [ixfx Guide to Point Tracker](https://ixfx.fun/geometry/tracking/)
 *
 * ```js
 * import { point } from 'https://unpkg.com/ixfx/dist/trackers.js';
 *
 * // Create a tracker on a pointerdown
 * const t = point();
 *
 * // ...and later, tell it when a point is seen (eg. pointermove)
 * const nfo = t.seen({x: evt.x, y:evt.y});
 * // nfo gives us some details on the relation between the seen point, the start, and points inbetween
 * // nfo.angle, nfo.centroid, nfo.speed etc.
 * ```
 *
 * Compute based on last seen point
 * ```js
 * t.angleFromStart();
 * t.distanceFromStart();
 * t.x / t.y
 * t.length; // Total length of accumulated points
 * t.elapsed; // Total duration since start
 * t.lastResult; // The PointSeenInfo for last seen point
 * ```
 *
 * Housekeeping
 * ```js
 * t.reset(); // Reset tracker
 * ```
 *
 * By default, the tracker only keeps track of the initial point and
 * does not store intermediate 'seen' points. To use the tracker as a buffer,
 * set `storeIntermediate` option to _true_.
 *
 * ```js
 * // Keep only the last 10 points
 * const t = point({
 *  sampleLimit: 10
 * });
 *
 * // Store all 'seen' points
 * const t = point({
 *  storeIntermediate: true
 * });
 *
 * // In this case, the whole tracker is automatically
 * // reset after 10 samples
 * const t = point({
 *  resetAfterSamples: 10
 * })
 * ```
 *
 * When using a buffer limited by `sampleLimit`, the 'initial' point will be the oldest in the
 * buffer, not actually the very first point seen.
 */
declare const point: (opts?: TrackedValueOpts) => PointTracker;

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

type index_FrequencyEventMap = FrequencyEventMap;
type index_FrequencyTracker<V> = FrequencyTracker<V>;
declare const index_FrequencyTracker: typeof FrequencyTracker;
type index_IntervalTracker = IntervalTracker;
declare const index_IntervalTracker: typeof IntervalTracker;
declare const index_NumberTracker: typeof NumberTracker;
declare const index_NumberTrackerResults: typeof NumberTrackerResults;
type index_ObjectTracker<V extends object, SeenResultType> = ObjectTracker<V, SeenResultType>;
declare const index_ObjectTracker: typeof ObjectTracker;
type index_PointTrack = PointTrack;
type index_PointTracker = PointTracker;
declare const index_PointTracker: typeof PointTracker;
type index_PointTrackerResults = PointTrackerResults;
declare const index_PrimitiveTracker: typeof PrimitiveTracker;
type index_RateTracker = RateTracker;
declare const index_RateTracker: typeof RateTracker;
type index_RateTrackerOpts = RateTrackerOpts;
declare const index_Timestamped: typeof Timestamped;
declare const index_TimestampedObject: typeof TimestampedObject;
declare const index_TimestampedPrimitive: typeof TimestampedPrimitive;
type index_TrackUnique<T> = TrackUnique<T>;
type index_TrackedPointMap = TrackedPointMap;
declare const index_TrackedPointMap: typeof TrackedPointMap;
declare const index_TrackedValueMap: typeof TrackedValueMap;
declare const index_TrackedValueOpts: typeof TrackedValueOpts;
declare const index_TrackerBase: typeof TrackerBase;
declare const index_TrimReason: typeof TrimReason;
declare const index_frequency: typeof frequency;
declare const index_interval: typeof interval;
declare const index_number: typeof number;
declare const index_point: typeof point;
declare const index_points: typeof points;
declare const index_rate: typeof rate;
declare const index_unique: typeof unique;
declare const index_uniqueInstances: typeof uniqueInstances;
declare namespace index {
  export { type index_FrequencyEventMap as FrequencyEventMap, index_FrequencyTracker as FrequencyTracker, index_IntervalTracker as IntervalTracker, index_NumberTracker as NumberTracker, index_NumberTrackerResults as NumberTrackerResults, index_ObjectTracker as ObjectTracker, type index_PointTrack as PointTrack, index_PointTracker as PointTracker, type index_PointTrackerResults as PointTrackerResults, index_PrimitiveTracker as PrimitiveTracker, index_RateTracker as RateTracker, type index_RateTrackerOpts as RateTrackerOpts, index_Timestamped as Timestamped, index_TimestampedObject as TimestampedObject, index_TimestampedPrimitive as TimestampedPrimitive, type index_TrackUnique as TrackUnique, index_TrackedPointMap as TrackedPointMap, index_TrackedValueMap as TrackedValueMap, index_TrackedValueOpts as TrackedValueOpts, index_TrackerBase as TrackerBase, index_TrimReason as TrimReason, index_frequency as frequency, index_interval as interval, index_number as number, index_point as point, index_points as points, index_rate as rate, index_unique as unique, index_uniqueInstances as uniqueInstances };
}

export { type FrequencyEventMap as F, IntervalTracker as I, ObjectTracker as O, PointTracker as P, type RateTrackerOpts as R, TrackedPointMap as T, FrequencyTracker as a, interval as b, point as c, RateTracker as d, type TrackUnique as e, frequency as f, uniqueInstances as g, type PointTrack as h, index as i, type PointTrackerResults as j, points as p, rate as r, unique as u };
