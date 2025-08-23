//#region ../arrays/src/cycle.d.ts
/**
 * Returns a function that cycles through the contents of an array. By default starts at index 0.
 *
 * ```js
 * const c = arrayCycle([`apples`, `oranges`, `pears`]);
 * c.current; // `apples`
 * c.next();  // `oranges`
 * c.next();  // `pears`
 * c.next();  // `apples`
 * c.prev();  // `pears`
 * ```
 *
 * You can select an item by index or value:
 * ```
 * c.select(1); // `oranges`
 * c.select(`pears`); // `pears`
 * ```
 *
 * Other features:
 * ```js
 * c.current;   // Current value
 * c.toArray(); // Copy of array being cycled over
 * ```
 *
 * Additional info:
 * * Selecting by value uses === semantics.
 * * Works with a copy of input array
 * @param options Array to cycle over
 * @returns
 */
declare const cycle: <T>(options: readonly T[] | T[]) => {
  toArray: () => T[];
  next: () => T;
  prev: () => T;
  readonly current: T;
  select: (indexOrValue: number | T) => void;
};
//# sourceMappingURL=cycle.d.ts.map
//#endregion
//#region ../arrays/src/at-wrap.d.ts
/**
 * Similar to Javascript's in-built Array.at function, but allows offsets
 * to wrap.
 *
 * @remarks
 * ```js
 * const test = [1,2,3,4,5,6];
 * atWrap(0);   // 1
 * atWrap(-1);  // 6
 * atWrap(-6);  // 1
 * ```
 *
 * These values would return _undefined_ using Array.at since its beyond
 * the length of the array
 * ```js
 * atWrap(6);   // 1
 * atWrap(-7);  // 6
 * ```
 * @param array Array
 * @param index Index
 * @returns
 */
declare const atWrap: <V>(array: V[], index: number) => V;
//# sourceMappingURL=at-wrap.d.ts.map
//#endregion
//#region ../arrays/src/chunks.d.ts
/**
 * Return `array` broken up into chunks of `size` values
 *
 * ```js
 * chunks([1,2,3,4,5,6,7,8,9,10], 3);
 * // Yields: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 * ```
 * @param array
 * @param size
 * @returns
 */
declare function chunks<V>(array: readonly V[], size: number): V[][];
//# sourceMappingURL=chunks.d.ts.map

//#endregion
//#region ../arrays/src/contains.d.ts
/**
 * Returns _true_ if all value in `needles` is contained in `haystack`.
 *
 * ```js
 * const a = ['apples','oranges','pears','mandarins'];
 * const b = ['pears', 'apples'];
 * contains(a, b); // True
 *
 * const c = ['pears', 'bananas'];
 * contains(a, b); // False ('bananas' does not exist in a)
 * ```
 *
 * If `needles` is empty, `contains` will return true.
 * @param haystack Array to search
 * @param needles Things to look for
 * @param eq
 */
declare const contains: <V>(haystack: ArrayLike<V>, needles: ArrayLike<V>, eq?: (a: V, b: V) => boolean) => boolean;
/**
 * Returns _true_ if array contains duplicate values.
 *
 * ```js
 * containsDuplicateValues(['a','b','a']); // True
 * containsDuplicateValues([
 *  { name: 'Apple' },
 *  { name: 'Apple' }
 * ]); // True
 * ```
 *
 * Uses JSON.toString() by default to compare values.
 *
 * See also:
 * * {@link unique}: Get unique set of values in an array
 * * {@link containsDuplicateInstances}: Compare based on reference, rather than value
 * * {@link containsDuplicateValues}: Returns _true_ if every item in array is the same
 * @param data Array to examine
 * @param keyFunction Function to generate key string for object, uses JSON.stringify by default.
 * @returns
 */
declare const containsDuplicateValues: <V>(data: Iterable<V>, keyFunction?: (itemToMakeStringFor: V) => string) => boolean;
/**
 * Returns _true_ if array contains duplicate instances based on `===` equality checking
 * Use {@link containsDuplicateValues} if you'd rather compare by value.
 * @param array
 * @returns
 */
declare const containsDuplicateInstances: <V>(array: V[] | readonly V[]) => boolean;
//# sourceMappingURL=contains.d.ts.map
//#endregion
//#region ../arrays/src/ensure-length.d.ts
declare function ensureLength<V>(data: readonly V[] | V[], length: number, expand: `repeat` | `first` | `last`): (V)[];
declare function ensureLength<V>(data: readonly V[] | V[], length: number, expand?: `undefined`): (V | undefined)[];
//# sourceMappingURL=ensure-length.d.ts.map
//#endregion
//#region ../arrays/src/util/is-equal.d.ts
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
/**
 * Default comparer function is equiv to checking `a === b`.
 * Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
 */

//#endregion
//#region ../arrays/src/equality.d.ts
/**
 * Returns _true_ if the two arrays have the same items at same indexes.
 *
 * Returns _false_ if arrays are of different length.
 * By default uses === semantics for equality checking.
 *
 * ```js
 * isEqual([ 1, 2, 3], [ 1, 2, 3 ]); // true
 * isEqual([ 1, 2, 3], [ 3, 2, 1 ]); // false
 * ```
 *
 * Compare by value
 * ```js
 * isEqual(a, b, isEqualValueDefault);
 * ```
 *
 * Custom compare, eg based on `name` field:
 * ```js
 * isEqual(a, b, (compareA, compareB) => compareA.name === compareB.name);
 * ```
 * @param arrayA
 * @param arrayB
 * @param equality Function to compare values
 */
declare const isEqual: <V>(arrayA: V[], arrayB: V[], equality?: (a: V, b: V) => boolean) => boolean;
/**
 * Returns _true_ if all values in the array are the same. Uses value-based equality checking by default.
 *
 * @example Using default equality function
 * ```js
 * const a1 = [ 10, 10, 10 ];
 * containsIdenticalValues(a1); // True
 *
 * const a2 = [ { name:`Jane` }, { name:`John` } ];
 * containsIdenticalValues(a2); // True, even though object references are different
 * ```
 *
 * If we want to compare by value for objects that aren't readily
 * converted to JSON, you need to provide a function:
 *
 * ```js
 * containsIdenticalValues(someArray, (a, b) => {
 *  return (a.eventType === b.eventType);
 * });
 * ```
 *
 * Returns _true_ if `array` is empty.
 * @param array Array
 * @param equality Equality checker. Uses string-conversion checking by default
 * @returns
 */
declare const containsIdenticalValues: <V>(array: readonly V[] | V[], equality?: IsEqual<V>) => boolean;
//# sourceMappingURL=equality.d.ts.map
//#endregion
//#region ../arrays/src/filter.d.ts
/**
 * Returns two separate arrays of everything that `filter` returns _true_,
 * and everything it returns _false_ on.
 *
 * Same idea as the in-built Array.filter, but that only returns values for one case.
 *
 * ```js
 * const [ matching, nonMatching ] = filterAB(data, v => v.enabled);
 * // `matching` is a list of items from `data` where .enabled is true
 * // `nonMatching` is a list of items from `data` where .enabled is false
 * ```
 * @param data Array of data to filter
 * @param filter Function which returns _true_ to add items to the A list, or _false_ for items to add to the B list
 * @returns Array of two elements. The first is items that match `filter`, the second is items that do not.
 */
declare const filterAB: <V>(data: readonly V[], filter: (a: V) => boolean) => [a: V[], b: V[]];
/**
 * Yields elements from `array` that match a given `predicate`, and moreover are between
 * the given `startIndex` (inclusive) and `endIndex` (exclusive).
 *
 * While this can be done with in the in-built `array.filter` function, it will
 * needlessly iterate through the whole array. It also avoids another alternative
 * of slicing the array before using `filter`.
 *
 * ```js
 * // Return 'registered' people between and including array indexes 5-10
 * const filtered = [...filterBetween(people, person => person.registered, 5, 10)];
 * ```
 * @param array Array to filter
 * @param predicate Filter function
 * @param startIndex Start index (defaults to 0)
 * @param endIndex End index (by default runs until end)
 */
declare function filterBetween<V>(array: readonly V[] | V[], predicate: (value: V, index: number, array: readonly V[] | V[]) => boolean, startIndex?: number, endIndex?: number): Generator<V>;
//# sourceMappingURL=filter.d.ts.map
//#endregion
//#region ../arrays/src/flatten.d.ts
/**
 * Returns a 'flattened' copy of array, un-nesting arrays one level
 * ```js
 * flatten([1, [2, 3], [[4]] ]);
 * // Yields: [ 1, 2, 3, [4]];
 * ```
 * @param array
 * @returns
 */
declare const flatten: (array: ReadonlyArray<any> | Array<any>) => Array<any>;
//# sourceMappingURL=flatten.d.ts.map

//#endregion
//#region ../arrays/src/for-each.d.ts
/**
 * Returns the array.map() output, or a value if `array`
 * is not an array or empty.
 *
 * ```js
 * mapWithEmptyFallback([1,2,3], v => v+2, 100); // Yields: [3,4,5]
 * mapWithEmptyFallback([], v=>v+2, 100); // Yields: [100]
 * mapWithEmptyFallback({}, v=>v+2, [100]); // Yields: [100]
 * ```
 *
 * If the fallback value is an array, it is returned as an
 * array if needed. If it's a single value, it is wrapped as an array.
 * @param array Array of values
 * @param fn Function to use for mapping values
 * @param fallback Fallback single value or array of values
 * @returns
 */
declare const mapWithEmptyFallback: <TValue, TReturn>(array: TValue[], fn: (value: TValue) => TReturn, fallback: TReturn | TReturn[]) => TReturn[];
//# sourceMappingURL=for-each.d.ts.map
//#endregion
//#region ../arrays/src/frequency.d.ts
/**
 * Computes the frequency of values by a grouping function.
 *
 * ```js
 * const data = [1,2,3,4,5,6,7,8,9,10];
 * // Returns 'odd' or 'even' for an input value
 *
 * const groupBy = v => v % 2 === 0 ? `even`:`odd`;
 *
 * const data = frequencyByGroup(groupBy, data);
 * // Yields map with:
 * //  key: 'even', value: 5
 * //  key: 'odd', value: 5
 * @param groupBy
 * @param data
 * @returns
 */
declare const frequencyByGroup: <TValue, TGroup extends string | number>(groupBy: ((value: TValue) => TGroup), data: TValue[]) => Map<TGroup, number>;
//# sourceMappingURL=frequency.d.ts.map

//#endregion
//#region ../arrays/src/group-by.d.ts
/**
 * Groups data by a function `grouper`, returning data as a map with string
 * keys and array values. Multiple values can be assigned to the same group.
 *
 * `grouper` must yield a string designated group for a given item.
 *
 * @example
 * ```js
 * const data = [
 *  { age: 39, city: `London` },
 *  { age: 14, city: `Copenhagen` },
 *  { age: 23, city: `Stockholm` },
 *  { age: 56, city: `London` }
 * ];
 *
 * // Whatever the function returns will be the designated group
 * // for an item
 * const map = Arrays.groupBy(data, item => item.city);
 * ```
 *
 * This yields a Map with keys London, Stockholm and Copenhagen, and the corresponding values.
 *
 * ```
 * London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
 * Stockhom: [{ age: 23, city: `Stockholm` }]
 * Copenhagen: [{ age: 14, city: `Copenhagen` }]
 * ```
 * @param array Array to group
 * @param grouper Function that returns a key for a given item
 * @typeParam K Type of key to group by. Typically string.
 * @typeParam V Type of values
 * @returns Map
 */
declare const groupBy: <K, V>(array: Iterable<V>, grouper: (item: V) => K) => Map<K, V[]>;
//# sourceMappingURL=group-by.d.ts.map
//#endregion
//#region ../arrays/src/unique.d.ts
/**
 * Combines the values of one or more arrays, removing duplicates.
 * ```js
 * const v = Arrays.uniqueDeep([ [1, 2, 3, 4], [ 3, 4, 5, 6] ]);
 * // [ 1, 2, 3, 4, 5, 6]
 * ```
 *
 * A single array can be provided as well:
 * ```js
 * const v = Arrays.uniqueDeep([ 1, 2, 3, 1, 2, 3 ]);
 * // [ 1, 2, 3 ]
 * ```
 *
 * By default uses Javascript's default equality checking
 *
 * See also:
 * * {@link intersection}: Overlap between two arrays
 * * Iterables.additionalValues: Yield values from an iterable not present in the other
 * * {@link containsDuplicateValues}: Returns true if array contains duplicates
 * @param arrays
 * @param comparer
 * @returns
 */
declare const uniqueDeep: <V>(arrays: V[][] | V[] | readonly V[] | readonly (readonly V[])[], comparer?: (a: V, b: V) => boolean) => V[];
/**
 * Combines the values of one or more arrays, removing duplicates.
 * Compares based on a string representation of object. Uses a Set
 * to avoid unnecessary comparisons, perhaps faster than `uniqueDeep`.
 *
 * ```js
 * const v = Arrays.unique([ [1, 2, 3, 4], [ 3, 4, 5, 6] ]);
 * // [ 1, 2, 3, 4, 5, 6]
 * ```
 *
 * A single array can be provided as well:
 * ```js
 * const v = Arrays.unique([ 1, 2, 3, 1, 2, 3 ]);
 * // [ 1, 2, 3 ]
 * ```
 *
 * By default uses JSON.toString() to compare values.
 *
 * See also:
 * * {@link intersection}: Overlap between two arrays
 * * Iterables.additionalValues: Yield values from an iterable not present in the other
 * * {@link containsDuplicateValues}: Returns true if array contains duplicates
 * @param arrays Array (or array of arrays) to examine
 * @param toString Function to convert values to a string for comparison purposes. By default uses JSON formatting.
 * @returns
 */
declare const unique: <V>(arrays: V[][] | V[] | readonly V[] | readonly (readonly V[])[], toString?: <V_1>(itemToMakeStringFor: V_1) => string) => V[];
//# sourceMappingURL=unique.d.ts.map
//#endregion
//#region ../arrays/src/insert-at.d.ts
/**
 * Inserts `values` at position `index`, shuffling remaining
 * items further down and returning changed result.
 *
 * Does not modify the input array.
 *
 * ```js
 * const data = [ 1, 2, 3 ]
 *
 * // Inserts 20,30,40 at index 1
 * Arrays.insertAt(data, 1, 20, 30, 40);
 *
 * // Yields: 1, 20, 30, 40, 2, 3
 * ```
 * @param data
 * @param index
 * @param values
 * @returns
 */
declare const insertAt: <V>(data: readonly V[] | V[], index: number, ...values: V[]) => V[];
//# sourceMappingURL=insert-at.d.ts.map
//#endregion
//#region ../arrays/src/interleave.d.ts
/**
 * Returns an interleaving of two or more arrays. All arrays must be the same length.
 *
 * ```js
 * const a = [`a`, `b`, `c`];
 * const b = [`1`, `2`, `3`];
 * const c = Arrays.interleave(a, b);
 * // Yields:
 * // [`a`, `1`, `b`, `2`, `c`, `3`]
 * ```
 * @param arrays
 * @returns
 */
declare const interleave: <V>(...arrays: readonly (readonly V[])[] | V[][]) => V[];
//# sourceMappingURL=interleave.d.ts.map
//#endregion
//#region ../arrays/src/intersection.d.ts
/**
 * Returns the _intersection_ of two arrays: the elements that are in common.
 *
 * ```js
 * intersection([1, 2, 3], [2, 4, 6]);
// returns [2]
 * ```
 * See also:
 * * {@link unique}: Unique set of items amongst one or more arrays
 * @param arrayA
 * @param arrayB
 * @param equality
 * @returns
 */
declare const intersection: <V>(arrayA: readonly V[] | V[], arrayB: readonly V[] | V[], equality?: IsEqual<V>) => V[];
//# sourceMappingURL=intersection.d.ts.map
//#endregion
//#region ../arrays/src/types.d.ts
/**
 * Returns a result of a merged into b.
 * B is always the 'newer' data that takes
 * precedence.
 */
type MergeReconcile<V> = (a: V, b: V) => V;
//#endregion
//#region ../arrays/src/merge-by-key.d.ts
/**
 * Merges arrays left to right, using the provided
 * `reconcile` function to choose a winner when keys overlap.
 *
 * There's also Core.Maps.mergeByKey if the input data is in Map form.
 *
 * For example, if we have the array A:
 * [`A-1`, `A-2`, `A-3`]
 *
 * And array B:
 * [`B-1`, `B-2`, `B-4`]
 *
 * And with the key function:
 * ```js
 * // Make a key for value based on last char
 * const keyFn = (v) => v.substr(-1, 1);
 * ```
 *
 * If they are merged with the reconile function:
 * ```js
 * const reconcile = (a, b) => b.replace(`-`, `!`);
 * const output = mergeByKey(keyFn, reconcile, arrayA, arrayB);
 * ```
 *
 * The final result will be:
 *
 * [`B!1`, `B!2`, `A-3`, `B-4`]
 *
 * In this toy example, it's obvious how the reconciler transforms
 * data where the keys overlap. For the keys that do not overlap -
 * 3 and 4 in this example - they are copied unaltered.
 *
 * A practical use for `mergeByKey` has been in smoothing keypoints
 * from a TensorFlow pose. In this case, we want to smooth new keypoints
 * with older keypoints. But if a keypoint is not present, for it to be
 * passed through.
 *
 * @param keyFunction Function to generate a unique key for data
 * @param reconcile Returns value to decide 'winner' when keys conflict.
 * @param arrays Arrays of data to merge
 */
declare const mergeByKey: <V>(keyFunction: (value: V) => string, reconcile: MergeReconcile<V>, ...arrays: readonly (readonly V[])[]) => V[];
//# sourceMappingURL=merge-by-key.d.ts.map
//#endregion
//#region ../arrays/src/pairwise.d.ts
/**
 * Yields pairs made up of overlapping items from the input array.
 *
 * Throws an error if there are less than two entries.
 *
 * ```js
 * pairwise([1, 2, 3, 4, 5]);
 * Yields:
 * [ [1,2], [2,3], [3,4], [4,5] ]
 * ```
 * @param values
 */
declare function pairwise<T>(values: T[]): Generator<T[], void, unknown>;
/**
 * Reduces in a pairwise fashion.
 *
 * Eg, if we have input array of [1, 2, 3, 4, 5], the
 * `reducer` fn will run with 1,2 as parameters, then 2,3, then 3,4 etc.
 * ```js
 * const values = [1, 2, 3, 4, 5]
 * reducePairwise(values, (acc, a, b) => {
 *  return acc + (b - a);
 * }, 0);
 * ```
 *
 * If input array has less than two elements, the initial value is returned.
 *
 * ```js
 * const reducer = (acc:string, a:string, b:string) => acc + `[${a}-${b}]`;
 * const result = reducePairwise(`a b c d e f g`.split(` `), reducer, `!`);
 * Yields: `![a-b][b-c][c-d][d-e][e-f][f-g]`
 * ```
 * @param array
 * @param reducer
 * @param initial
 * @returns
 */
declare const pairwiseReduce: <V, X>(array: readonly V[], reducer: (accumulator: X, a: V, b: V) => X, initial: X) => X;
//# sourceMappingURL=pairwise.d.ts.map
//#endregion
//#region ../arrays/src/random.d.ts
/**
 * Returns a shuffled copy of the input array.
 * @example
 * ```js
 * const d = [1, 2, 3, 4];
 * const s = shuffle(d);
 * // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
 * ```
 *
 * It can be useful to randomly access each item from an array exactly once:
 * ```js
 * for (const value of shuffle(inputArray)) {
 *  // Do something with the value...
 * }
 * ```
 * @param dataToShuffle Input array
 * @param rand Random generator. `Math.random` by default.
 * @returns Copy with items moved around randomly
 * @typeParam V - Type of array items
 */
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: () => number) => V[];
/**
 * Returns a random element of an array
 *
 * ```js
 * const v = [`blue`, `red`, `orange`];
 * randomElement(v); // Yields `blue`, `red` or `orange`
 * ```
 *
 * Note that repeated calls might yield the same value
 * multiple times. If you want to random unique values, consider using {@link shuffle}.
 *
 * See also:
 * * {@link randomIndex} if you want a random index rather than value.
 *
 * @param array
 * @param rand Random generator. `Math.random` by default.
 * @returns
 */
declare const randomElement: <V>(array: ArrayLike<V>, rand?: () => number) => V;
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
declare const randomIndex: <V>(array: ArrayLike<V>, rand?: () => number) => number;
//# sourceMappingURL=random.d.ts.map
//#endregion
//#region ../arrays/src/remove.d.ts
/**
 * Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
 *
 * ```js
 * const v = [ 100, 20, 50 ];
 * const vv = Arrays.remove(2);
 *
 * Yields:
 *  v: [ 100, 20, 50 ]
 * vv: [ 100, 20 ]
 * ```
 *
 * Consider {@link without} if you want to remove an item by value.
 *
 * Throws an exception if `index` is outside the range of `data` array.
 * @param data Input array
 * @param index Index to remove
 * @typeParam V Type of array
 * @returns
 */
declare const remove: <V>(data: readonly V[] | V[], index: number) => V[];
//# sourceMappingURL=remove.d.ts.map

//#endregion
//#region ../arrays/src/sample.d.ts
/**
 * Samples values from an array.
 *
 * If `amount` is less or equal to 1, it's treated as a percentage to sample.
 * Otherwise it's treated as every _n_th value to sample.
 *
 * @example
 * By percentage - get half of the items
 * ```
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * const sub = Arrays.sample(list, 0.5);
 * // Yields: [2, 4, 6, 8, 10]
 * ```
 *
 * @example
 * By steps - every third value
 * ```
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * const sub = Arrays.sample(list, 3);
 * // Yields:
 * // [3, 6, 9]
 * ```
 * @param array Array to sample
 * @param amount Amount, given as a percentage (0..1) or the number of interval (ie 3 for every third item)
 * @returns
 */
declare const sample: <V>(array: ArrayLike<V>, amount: number) => V[];
//# sourceMappingURL=sample.d.ts.map
//#endregion
//#region ../arrays/src/sort.d.ts
/**
 * Sorts an array of objects in ascending order
 * by the given property name, assuming it is a number.
 *
 * ```js
 * const data = [
 *  { size: 10, colour: `red` },
 *  { size: 20, colour: `blue` },
 *  { size: 5, colour: `pink` }
 * ];
 * const sorted = Arrays.sortByNumericProperty(data, `size`);
 *
 * Yields items ascending order:
 * [ { size: 5, colour: `pink` }, { size: 10, colour: `red` }, { size: 20, colour: `blue` } ]
 * ```
 * @param data
 * @param propertyName
 */
declare const sortByNumericProperty: <V, K extends keyof V>(data: readonly V[] | V[], propertyName: K) => V[];
/**
 * Sorts an array of objects by some named property.
 *
 * ```js
 * const data = [
 *  { size: 10, colour: `red` },
 *  { size: 20, colour: `blue` },
 *  { size: 5, colour: `pink` }
 * ];
 * sortByProperty(data, `colour`);
 *
 * Yields [
 *  { size: 20, colour: `blue` },
 *  { size: 5, colour: `pink` }
 *  { size: 10, colour: `red` },
 * ]
 * ```
 *
 * You can also provide a custom comparer that is passed property values.
 * This function should return 0 if values are equal, 1 if `a > b` and -1 if `a < b`.
 * @param data
 * @param propertyName
 * @returns
 */
declare const sortByProperty: <V, K extends keyof V>(data: readonly V[] | V[], propertyName: K, comparer?: (a: any, b: any) => number) => V[];
//# sourceMappingURL=sort.d.ts.map
//#endregion
//#region ../arrays/src/until.d.ts
/**
 * Yields all items in the input array, stopping when `predicate` returns _true_.
 *
 * @example Yield values until we hit 3
 * ```js
 * const data = [ 1, 2, 3, 4, 5 ];
 * until(data, v => v === 3)
 * // [ 1, 2 ]
 * ```
 */
declare function until<V>(data: readonly V[] | V[], predicate: (v: V) => boolean): Generator<V>;
/**
 * Yields all items in the input array, stopping when `predicate` returns _true_.
 * This version allows a value to be 'accumulated' somehow
 *
 * @example Yield values until a total of 4
 * ```js
 * const data = [ 1, 2, 3, 4, 5 ];
 * until(data, (v, accumulated) => [accumulated >= 6, accumulated + v ]);
 * // [ 1, 2, 3 ]
 * ```
 */
declare function until<V, A>(data: readonly V[] | V[], predicate: (v: V, accumulator: A) => readonly [stop: boolean, acc: A], initial: A): Generator<V>;
//# sourceMappingURL=until.d.ts.map
//#endregion
//#region ../arrays/src/without.d.ts
/**
 * Returns a copy of an input array with _undefined_ values removed.
 * @param data
 * @returns
 */
declare const withoutUndefined: <V>(data: readonly V[] | V[]) => V[];
/**
 * Returns an array with value(s) omitted.
 *
 * If value is not found, result will be a copy of input.
 * Value checking is completed via the provided `comparer` function.
 * By default checking whether `a === b`. To compare based on value, use the `isEqualValueDefault` comparer.
 *
 * @example
 * ```js
 * const data = [100, 20, 40];
 * const filtered = without(data, 20); // [100, 40]
 * ```
 *
 * @example Using value-based comparison
 * ```js
 * const data = [{ name: `Alice` }, { name:`Sam` }];
 *
 * // This wouldn't work as expected, because the default comparer uses instance,
 * // not value:
 * without(data, { name: `Alice` });
 *
 * // So instead we can use a value comparer:
 * without(data, { name:`Alice` }, isEqualValueDefault);
 * ```
 *
 * @example Use a function
 * ```js
 * const data = [ { name: `Alice` }, { name:`Sam` }];
 * without(data, { name:`ALICE` }, (a, b) => {
 *  return (a.name.toLowerCase() === b.name.toLowerCase());
 * });
 * ```
 *
 * Consider {@link remove} to remove an item by index.
 *
 * @typeParam V - Type of array items
 * @param sourceArray Source array
 * @param toRemove Value(s) to remove
 * @param comparer Comparison function. If not provided `isEqualDefault` is used, which compares using `===`
 * @return Copy of array without value.
 */
declare const without: <V>(sourceArray: readonly V[] | V[], toRemove: V | V[], comparer?: IsEqual<V>) => V[];
//# sourceMappingURL=without.d.ts.map
//#endregion
//#region ../arrays/src/zip.d.ts
/**
 * Zip combines the elements of two or more arrays based on their index.
 *
 * ```js
 * const a = [1,2,3];
 * const b = [`red`, `blue`, `green`];
 *
 * const c = Arrays.zip(a, b);
 * // Yields:
 * // [
 * //   [1, `red`],
 * //   [2, `blue`],
 * //   [3, `green`]
 * // ]
 * ```
 *
 * Typically the arrays you zip together are all about the same logical item. Eg, in the above example
 * perhaps `a` is size and `b` is colour. So thing #1 (at array index 0) is a red thing of size 1. Before
 * zipping we'd access it by `a[0]` and `b[0]`. After zipping, we'd have c[0], which is array of [1, `red`].
 * @param arrays
 * @returns Zipped together array
 */
declare const zip: (...arrays: any[][] | readonly any[][] | readonly (readonly any[])[]) => any[];
//# sourceMappingURL=zip.d.ts.map

//#endregion
export { type IsEqual, MergeReconcile, atWrap, chunks, contains, containsDuplicateInstances, containsDuplicateValues, containsIdenticalValues, cycle, ensureLength, filterAB, filterBetween, flatten, frequencyByGroup, groupBy, insertAt, interleave, intersection, isEqual, mapWithEmptyFallback, mergeByKey, pairwise, pairwiseReduce, randomElement, randomIndex, remove, sample, shuffle, sortByNumericProperty, sortByProperty, unique, uniqueDeep, until, without, withoutUndefined, zip };
//# sourceMappingURL=arrays.d.ts.map