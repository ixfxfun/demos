type MinMaxAvgTotal = {
    /**
     * Smallest value in array
     */
    readonly min: number;
    /**
     * Total of all items
     */
    readonly total: number;
    /**
     * Largest value in array
     */
    readonly max: number;
    /**
     * Average value in array
     */
    readonly avg: number;
};
type MinMaxAvgOpts = {
    /**
     * Start index, inclusive
     */
    readonly startIndex?: number;
    /**
     * End index, exclusive
     */
    readonly endIndex?: number;
};
type NumberScaler = (v: number) => number;
type NumberScalerTwoWay = {
    out: NumberScaler;
    in: NumberScaler;
};

export type { MinMaxAvgOpts as M, NumberScaler as N, MinMaxAvgTotal as a, NumberScalerTwoWay as b };
