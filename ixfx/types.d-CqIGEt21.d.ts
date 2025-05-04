//#region ../packages/core/src/types.d.ts
type ToString<V> = (itemToMakeStringFor: V) => string;
type StringOrNumber = string | number | bigint;
type Primitive = string | number | bigint | boolean;
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
type IWithEntries<K, V> = {
  entries(): IterableIterator<readonly [K, V]>;
}; /**
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
}; //#endregion
export { BasicType as BasicType$1, IWithEntries as IWithEntries$1, Interval as Interval$1, KeyValue as KeyValue$1, Primitive as Primitive$1, RankFunction as RankFunction$2, RankOptions as RankOptions$2, ToString as ToString$1 };
//# sourceMappingURL=types.d-CqIGEt21.d.ts.map