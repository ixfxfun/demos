//#region ../packages/core/src/maps.d.ts

type GetOrGenerate<K, V, Z> = (key: K, args?: Z) => Promise<V>; //#endregion
//#region ../packages/core/src/trackers/tracker-base.d.ts
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
type TrimReason = `reset` | `resize`; //#endregion
//#region ../packages/core/src/trackers/tracked-value.d.ts
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
* export class TrackedPointMap extends TrackedValueMap<Points.Point> {
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
  seen(id: string, ...values: Array<V>): Promise<TResult>;
  /**
   * Creates or returns a TrackedValue instance for `id`.
   * @param id
   * @param values
   * @returns
   */
  protected getTrackedValue(id: string, ...values: Array<V>): Promise<T>;
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
} //#endregion
export { TimestampedObject, TrackedValueMap as TrackedValueMap$1, TrackedValueOpts, TrackerBase as TrackerBase$1, TrimReason };
//# sourceMappingURL=tracked-value.d-DDXx3Hck.d.ts.map