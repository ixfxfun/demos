type NumberFunction = () => number;
type ValueType = string | number | boolean | object;
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

export type { NumberFunction as N, RankFunction as R, ValueType as V, RankOptions as a, RankArrayOptions as b };
