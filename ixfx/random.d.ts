//#region packages/random/src/types.d.ts
/**
 * A random source.
 *
 * Predefined sources: Math.random, {@link gaussianSource}, {@link weightedSource}
 */
type RandomSource = () => number;
type WeightedOptions = RandomNumberOptions & Readonly<{
  easingFunction: (v: number) => number;
  easing?: string;
}>;
type StringOptions = Readonly<{
  length: number;
  source?: RandomSource;
}>;
type RandomOptions = Readonly<{
  source?: RandomSource;
}>;
type RandomNumberOptions = RandomOptions & Readonly<{
  max?: number;
  min?: number;
}>;
/**
 * Options for generating a random boolean
 */
type RandomBooleanOptions = RandomOptions & Readonly<{
  /**
   * If a random value is above threshold, _true_ is returned,
   * otherwise _false_.
   * Defaults to 0.5
   */
  threshold?: number;
}>;
type GenerateRandomOptions = RandomNumberOptions & Readonly<{
  /**
   * If true, number range is looped
   */
  loop?: boolean;
}>;
//# sourceMappingURL=types.d.ts.map
//#endregion
//#region packages/random/src/arrays.d.ts
/**
 * Returns a random array index.
 *
 * ```js
 * const v = [`blue`, `red`, `orange`];
 * randomIndex(v); // Yields 0, 1 or 2
 * ```
 *
 * Use {@link randomElement} if you want a value from `array`, not index.
 *
 * @param array Array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomIndex: <V>(array: ArrayLike<V>, rand?: RandomSource) => number;
/**
 * Removes a random item from an array, returning both the item and the new array as a result.
 * Does not modify the original array unless `mutate` parameter is true.
 *
 * @example Without changing source
 * ```js
 * const data = [100, 20, 40];
 * const {value, array} = randomPluck(data);
 * // value: 20, array: [100, 40], data: [100, 20, 40];
 * ```
 *
 * @example Mutating source
 * ```js
 * const data = [100, 20, 40];
 * const {value} = randomPluck(data, true);
 * // value: 20, data: [100, 40];
 * ```
 *
 * @typeParam V - Type of items in array
 * @param array Array to pluck item from
 * @param mutate If _true_, changes input array. _False_ by default.
 * @param rand Random generatr. `Math.random` by default.
 * @return Returns an object `{value:V|undefined, array:V[]}`
 *
 */
declare const randomPluck: <V>(array: readonly V[] | V[], mutate?: boolean, rand?: RandomSource) => {
  readonly value: V | undefined;
  readonly array: V[];
};
/**
 * Returns random element.
 *
 * ```js
 * const v = [`blue`, `red`, `orange`];
 * randomElement(v); // Yields `blue`, `red` or `orange`
 * ```
 *
 * Use {@link randomIndex} if you want a random index within `array`.
 *
 * @param array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomElement: <V>(array: ArrayLike<V>, rand?: RandomSource) => V;
/**
 * Selects a random array index, biased by the provided `weightings`.
 *
 * In the below example, `a` will be picked 20% of the time, `b` 50% and so on.
 * ```js
 * const data =    [  `a`,  `b`,  `c`,  `d` ]
 * const weights = [ 0.2,  0.5,  0.1,  0.2 ]
 * ```
 * @param array
 * @param weightings
 * @param randomSource
 */
declare const randomElementWeightedSource: <V>(array: ArrayLike<V>, weightings: number[], randomSource?: RandomSource) => () => V;
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * const d = [1, 2, 3, 4];
 * const s = shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 * @param dataToShuffle
 * @param rand Random generator. `Math.random` by default.
 * @returns Copy with items moved around randomly
 * @typeParam V - Type of array items
 */
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: RandomSource) => V[];
//# sourceMappingURL=arrays.d.ts.map
//#endregion
//#region packages/random/src/chance.d.ts
/**
 * Chance of returning `a` or `b`, based on threshold `p`.
 *
 * `p` sets the threshold for picking `b`. The higher the value (up to 1),
 * the more likely `b` will be picked.
 *
 * ```js
 * // 50% of the time it will return 100, 50% 110
 * chance(0.5, 100, 110);
 * // 90% of the time it will yield 110, 10% it will yield 100
 * chance(0.9, 100, 110);
 * ```
 *
 * @param p Threshold to choose option B (value or function)
 * @param a Value or function for option A
 * @param b Value or function for option B
 * @param randomSource Source of random numbers
 * @returns
 */
declare const chance: <T>(p: number | (() => number), a: T | (() => T), b: T | (() => T), randomSource?: RandomSource) => T;
//# sourceMappingURL=chance.d.ts.map
//#endregion
//#region packages/random/src/float-source.d.ts
/**
 * Source for random bipolar values
 * ```js
 * const r = bipolarSource();
 * r(); // Produce random value on -1...1 scale
 * ```
 *
 * Options can be provided, for example
 * ```js
 * // -0.5 to 0.5 range
 * bipolarSource({ max: 0.5 });
 * ```
 *
 *
 * @param maxOrOptions Maximum value (number) or options for random generation
 * @returns
 */
declare const bipolarSource: (maxOrOptions?: number | RandomNumberOptions) => RandomSource;
/**
 * Returns a random bipolar value
 * ```js
 * const r = bipolar(); // -1...1 random
 * ```
 *
 * Options can be provided, eg.
 * ```js
 * bipolar({ max: 0.5 }); // -0.5..0.5 random
 * ```
 *
 * Use {@link bipolarSource} if you want to generate random
 * values with same settings repeatedly.
 * @param maxOrOptions
 * @returns
 */
declare const bipolar: (maxOrOptions?: number | RandomNumberOptions) => number;
/**
 * Returns a function that produces random float values.
 * Use {@link float} to produce a valued directly.
 *
 * Random float between `max` (exclusive) and 0 (inclusive). Max is 1 if unspecified.
 *
 *
 * ```js
 * // Random number between 0..1 (but not including 1)
 * // (this would be identical to Math.random())
 * const r = floatSource();
 * r(); // Execute to produce random value
 *
 * // Random float between 0..100 (but not including 100)
 * const v = floatSource(100)();
 * ```
 *
 * Options can be used:
 * ```js
 * // Random float between 20..40 (possibly including 20, but always lower than 40)
 * const r = floatSource({ min: 20, max: 40 });
 * ```
 * @param maxOrOptions Maximum value (exclusive) or options
 * @returns Random number
 */
declare const floatSource: (maxOrOptions?: (number | RandomNumberOptions)) => RandomSource;
/**
 * Returns a random float between `max` (exclusive) and 0 (inclusive).
 *
 * Max is 1 if unspecified.
 * Use {@link floatSource} to get a function that produces values. This is used internally.
 *
 * ```js
 * // Random number between 0..1 (but not including 1)
 * // (this would be identical to Math.random())
 * const v = float();
 * // Random float between 0..100 (but not including 100)
 * const v = float(100);
 * ```
 *
 * Options can be used:
 * ```js
 * // Random float between 20..40 (possibly including 20, but always lower than 40)
 * const v = float({ min: 20, max: 40 });
 * ```
 * @param maxOrOptions Maximum value (exclusive) or options
 * @returns Random number
 */
declare const float: (maxOrOptions?: (number | RandomNumberOptions)) => number;
//# sourceMappingURL=float-source.d.ts.map
//#endregion
//#region packages/random/src/gaussian.d.ts
/**
 * Returns a random number with gaussian (ie. bell-curved) distribution
 *
 * @example Random number between 0..1 with gaussian distribution
 * ```js
 * gaussian();
 * ```
 *
 * @example Distribution can be skewed
 * ```js
 * gaussian(10);
 * ```
 *
 * Use {@link gaussianSource} if you want a function with skew value baked-in.
 * @param skew Skew factor. Defaults to 1, no skewing. Above 1 will skew to left, below 1 will skew to right
 * @returns
 */
declare const gaussian: (skew?: number) => number;
/**
 * Returns a function that generates a gaussian-distributed random number
 * @example
 * Random number between 0..1 with gaussian distribution
 * ```js
 * // Create function
 * const r = gaussianSource();
 *
 * // Generate random value
 * r();
 * ```
 *
 * @example
 * Pass the random number generator elsewhere
 * ```js
 * const r = gaussianSource(10);
 *
 * // Randomise array with gaussian distribution
 * Arrays.shuffle(r);
 * ```
 *
 * If you want to fit a value to a gaussian curve, see Modulation.gaussian instead.
 * @param skew
 * @returns
 */
declare const gaussianSource: (skew?: number) => RandomSource;
//# sourceMappingURL=gaussian.d.ts.map
//#endregion
//#region packages/random/src/guid.d.ts
/**
 * Generates a short roughly unique id
 * ```js
 * const id = shortGuid();
 * ```
 * @param options Options.
 * @returns
 */
declare const shortGuid: (options?: Readonly<{
  source?: RandomSource;
}>) => string;
//# sourceMappingURL=guid.d.ts.map

//#endregion
//#region packages/random/src/integer.d.ts
/**
 * Returns a function that produces a random integer between `max` (exclusive) and 0 (inclusive)
 * Use {@link integer} if you want a random number directly.
 *
 * Invoke directly:
 * ```js
 * integerSource(10)();  // Random number 0-9
 * ```
 *
 * Or keep a reference to re-compute:
 * ```js
 * const r = integerSource(10);
 * r(); // Produce a random integer
 * ```
 *
 * If a negative value is given, this is assumed to be the
 * minimum (inclusive), with 0 as the max (inclusive)
 * ```js
 * integerSource(-5)();  // Random number from -5 to 0
 * ```
 *
 * Specify options for a custom minimum or source of random:
 * ```js
 * integerSource({ max: 5,  min: 10 })();  // Random number 4-10
 * integerSource({ max: -5, min: -10 })(); // Random number from -10 to -6
 * integerSource({ max: 10, source: Math.random })(); // Random number between 0-9, with custom source of random
 * ```
 *
 * Throws an error if max & min are equal
 * @param maxOrOptions Max value (exclusive), or set of options
 * @returns Random integer
 */
declare const integerSource: (maxOrOptions: number | RandomNumberOptions) => RandomSource;
/**
 * Returns a random integer between `max` (exclusive) and 0 (inclusive)
 * Use {@link integerSource} to return a function instead.
 *
 * ```js
 * integer(10);  // Random number 0,1..9
 * ```
 *
 * If a negative value is given, this is assumed to be the
 * minimum (inclusive), with 0 as the max (inclusive)
 * ```js
 * integer(-5);  // Random number -5,-4,...0
 * ```
 *
 * Specify options for a custom minimum or source of random:
 * ```js
 * integer({ max: 5,  min: 10 });  // Random number 4-10
 * integer({ max: -5, min: -10 }); // Random number from -10 to -6
 * integer({ max: 10, source: Math.random }); // Random number between 0-9, with custom source of random
 * ```
 *
 * Throws an error if max & min are equal
 * @param maxOrOptions Max value (exclusive), or set of options
 * @returns Random integer
 */
declare const integer: (maxOrOptions: number | RandomNumberOptions) => number;
/**
 * Returns a generator over random unique integers, up to
 * but not including the given max value.
 *
 * @example 0..9 range
 * ```js
 * const rand = [ ...integerUniqueGen(10) ];
 * // eg: [2, 9, 6, 0, 8, 7, 3, 4, 5, 1]
 * ```
 *
 * @example Options can be provided:
 * ```js
 * // 5..9 range
 * const rand = [ ...integerUniqueGen({ min: 5, max: 10 })];
 * ```
 *
 * Range can be looped. Once the initial random walk through the number
 * range completes, it starts again in a new random way.
 *
 * ```js
 * for (const r of integerUniqueGen({ max: 10, loop: true })) {
 *  // Warning: loops forever
 * }
 * ```
 *
 * Behind the scenes, an array of numbers is created that captures the range, this is then
 * shuffled on the first run, and again whenever the iterator loops, if that's allowed.
 *
 * As a consequence, large ranges will consume larger amounts of memory.
 * @param maxOrOptions
 * @returns
 */
declare function integerUniqueGen(maxOrOptions: number | GenerateRandomOptions): IterableIterator<number>;
//# sourceMappingURL=integer.d.ts.map
//#endregion
//#region packages/random/src/non-zero.d.ts
/**
 * Keeps generating a random number until
 * it's not 0
 * @param source Random number generator
 * @returns Non-zero number
 */
declare const calculateNonZero: (source?: RandomSource) => number;
//# sourceMappingURL=non-zero.d.ts.map

//#endregion
//#region packages/random/src/seeded.d.ts
/**
 * Reproducible random values using the Merseene Twister algorithm.
 * With the same seed value, it produces the same series of random values.
 *
 * ```js
 * // Seed with a value of 100
 * const r = mersenneTwister(100);
 * r.float();         // 0..1
 * ```
 *
 * Integer values can also be produced. First parameter
 * is the maximum value (exclusive), the optional second
 * parameter is the minimum value (inclusive).
 * ```js
 * r.integer(10);     // 0..9
 * r.integer(10, 5);  // 5..9
 *
 * // Eg random array index:
 * r.integer(someArray.length);
 * ```
 *
 * Adapted from George MacKerron's implementation. MIT License.
 * https://github.com/jawj/mtwist/
 * @param seed Seed value 0..4294967295. Default: random seed.
 */
declare function mersenneTwister(seed?: number | undefined): {
  integer: (maxExclusive: number, minInclusive?: number) => number;
  float: () => number;
};
//# sourceMappingURL=seeded.d.ts.map
//#endregion
//#region packages/random/src/string.d.ts
/**
 * Returns a string of random letters and numbers of a given `length`.
 *
 * ```js
 * string();  // Random string of length 5
 * string(4); // eg. `4afd`
 * ```
 * @param lengthOrOptions Length of random string, or options.
 * @returns Random string
 */
declare const string: (lengthOrOptions?: number | StringOptions) => string;
//# sourceMappingURL=string.d.ts.map

//#endregion
//#region packages/random/src/time.d.ts
/**
 * Returns a random number of minutes, with a unit of milliseconds.
 *
 * Max value is exclusive, defaulting to 5.
 * Use {@link minutesMs} to get a value directly, or {@link minutesMsSource} to return a function.
 *
 * @example Random value from 0 to one milli less than 5 * 60 * 1000
 * ```js
 * // Create function that returns value
 * const f = minutesMsSource(5);
 *
 * f(); // Generate value
 * ```
 *
 * @example Specified options:
 * ```js
 * // Random time between one minute and 5 minutes
 * const f = minutesMsSource({ max: 5, min: 1 });
 * f();
 * ```
 *
 * @remarks
 * It's a very minor function, but can make
 * code a little more literate:
 * ```js
 * // Random timeout of up to 5 mins
 * setTimeout(() => { ... }, minutesMsSource(5));
 * ```
 * @param maxMinutesOrOptions
 * @see {@link minutesMs}
 * @returns Function that produces a random value
 */
declare const minutesMsSource: (maxMinutesOrOptions: number | RandomNumberOptions) => RandomSource;
/**
 * Return a random time value in milliseconds, using minute values to set range.
 *
 * @example Random value from 0 to one milli less than 5 * 60 * 1000
 * ```js
 * // Random value from 0 to one milli less than 5*60*1000
 * minuteMs(5);
 * ```
 *
 * @example Specified options:
 * ```js
 * // Random time between one minute and 5 minutes
 * minuteMs({ max: 5, min: 1 });
 * ```
 * @inheritDoc minutesMsSource
 *
 * @param maxMinutesOrOptions
 * @see {@link minutesMsSource}
 * @returns Milliseconds
 */
declare const minutesMs: (maxMinutesOrOptions: number | RandomNumberOptions) => number;
/**
 * Returns function which produces a random number of seconds, with a unit of milliseconds.
 *
 * Maximum value is exclusive, defaulting to 5
 * Use {@link secondsMs} to return a random value directly, or {@link secondsMsSource} to return a function.
 *
 * @example Random milliseconds between 0..4999
 * ```js
 * // Create function
 * const f = secondsMsSource(5000);
 * // Produce a value
 * const value = f();
 * ```
 *
 * @example Options can be provided
 * ```js
 * // Random milliseconds between 1000-4999
 * const value = secondsMsSource({ max:5, min:1 })();
 * // Note the extra () at the end to execute the function
 * ```
 *
 * @remarks
 * It's a very minor function, but can make
 * code a little more literate:
 * ```js
 * // Random timeout of up to 5 seconds
 * setTimeout(() => { ...}, secondsMsSource(5));
 * ```
 * @param maxSecondsOrOptions Maximum seconds, or options.
 * @returns Milliseconds
 */
declare const secondsMsSource: (maxSecondsOrOptions: number | RandomNumberOptions) => RandomSource;
/**
 * Generate random time in milliseconds, using seconds to set the bounds
 *
 * @example Random milliseconds between 0..4999
 * ```js
 * secondsMs(5000);
 * ```
 *
 * @example Options can be provided
 * ```js
 * // Random milliseconds between 1000-4999
 * secondsMs({ max:5, min:1 });
 * ```
 * @inheritDoc secondsMsSource
 * @param maxSecondsOrOptions
 * @returns
 */
declare const secondsMs: (maxSecondsOrOptions: number | RandomNumberOptions) => number;
//# sourceMappingURL=time.d.ts.map
//#endregion
//#region packages/random/src/weighted-index.d.ts
/**
* Returns a random number from 0..weightings.length, distributed by the weighting values.
*
* eg: produces 0 20% of the time, 1 50% of the time, 2 30% of the time
* ```js
* weightedIndex([0.2, 0.5, 0.3]);
* ```
* @param weightings
* @param rand
* @returns
*/
declare const weightedIndex: (weightings: Array<number>, rand?: RandomSource) => () => number;
//# sourceMappingURL=weighted-index.d.ts.map

//#endregion
//#region packages/random/src/weighted-integer.d.ts
/**
 * Random integer, weighted according to an easing function.
 * Number will be inclusive of `min` and below `max`.
 *
 * @example 0..99
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * const r = Random.weightedIntegerFn(100);
 * r(); // Produce value
 * ```
 *
 * @example 20..29
 * ```js
 * const r = Random.weightedIntegerFn({ min: 20, max: 30 });
 * r(); // Produce value
 * ```
 *
 * @example  0..99 with 'quadIn' easing
 * ```js
 * const r = Random.weightedInteger({ max: 100, easing: `quadIn` });
 * ```
 *
 * Note: result from easing function will be clamped to
 * the min/max (by default 0-1);
 *
 * @param options Options. By default { max:1, min: 0 }
 * @returns Function that produces a random weighted integer
 */
declare const weightedIntegerSource: (options: WeightedOptions) => RandomSource;
/**
 * Generate a weighted-random integer.
 *
 * @example 0..99
 * ```js
 * import * as Random from 'https://unpkg.com/ixfx/dist/random.js';
 * Random.weightedInteger(100);
 * ```
 *
 * @example 20..29
 * ```js
 * Random.weightedInteger({ min: 20, max: 30 });
 * ```
 *
 * @example  0..99 with 'quadIn' easing
 * ```js
 * Random.weightedInteger({ max: 100, easing: `quadIn` })
 * ```
 * @inheritDoc {@link weightedIntegerSource}
 * @param options Options. Default: { max: 1, min: 0 }
 * @returns Random weighted integer
 */
declare const weightedInteger: (options: WeightedOptions) => number;
//# sourceMappingURL=weighted-integer.d.ts.map
//#endregion
//#region packages/random/src/weighted.d.ts
/***
 * Returns a random number, 0..1, weighted by a given easing function.
 *
 * Use {@link weightedSource} to return a function instead.
 *
 * @see {@link weightedSource} Returns a function rather than value
 * @returns Random number (0-1)
 */
declare const weighted: (options: WeightedOptions) => number;
/***
 * Returns a random number, 0..1, weighted by a given easing function.
 *
 * Use {@link weighted} to get a value directly.
 *
 * @see {@link weighted} Returns value instead of function
 * @returns Function which returns a weighted random value
 */
declare const weightedSource: (options: WeightedOptions) => RandomSource;
//# sourceMappingURL=weighted.d.ts.map

//#endregion
export { GenerateRandomOptions, RandomBooleanOptions, RandomNumberOptions, RandomOptions, RandomSource, StringOptions, WeightedOptions, bipolar, bipolarSource, calculateNonZero, chance, float, floatSource, gaussian, gaussianSource, integer, integerSource, integerUniqueGen, mersenneTwister, minutesMs, minutesMsSource, randomElement, randomElementWeightedSource, randomIndex, randomPluck, secondsMs, secondsMsSource, shortGuid, shuffle, string, weighted, weightedIndex, weightedInteger, weightedIntegerSource, weightedSource };
//# sourceMappingURL=random.d.ts.map