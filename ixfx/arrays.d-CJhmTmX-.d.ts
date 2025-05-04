import { __export } from "./chunk-51aI8Tpl.js";

//#region ../packages/arrays/dist/src/array-cycle.d.ts
/**
* Cycle through the contents of an array. By default starts at index 0.
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

//#endregion
//#region ../packages/arrays/dist/src/at-wrap.d.ts
declare const atWrap: <V>(array: V[], index: number) => V;

//#endregion
//#region ../packages/arrays/dist/src/chunks.d.ts
/**
* Return `arr` broken up into chunks of `size`
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

//#endregion
//#region ../packages/arrays/dist/src/contains.d.ts
/**
* Returns _true_ if contents of `needles` is contained by `haystack`.
* ```js
* const a = ['apples','oranges','pears','mandarins'];
* const b = ['pears', 'apples'];
* contains(a, b); // True
*
* const c = ['pears', 'bananas'];
* contains(a, b); // False ('bananas' does not exist in a)
* ```
* @param haystack
* @param needles
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
* * {@link containsDuplicateInstances}: Compare based on reference, rather than value
* * {@link unique} Get unique set of values in an array
* @param array Array to examine
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

//#endregion
//#region ../packages/arrays/dist/src/ensure-length.d.ts
/**
* Returns a copy of `data` with specified length.
* If the input array is too long, it is truncated.
*
* If the input array is too short, it will be expanded based on the `expand` strategy:
*  - 'undefined': fill with `undefined`
*  - 'repeat': repeat array elements, starting from position 0
*  - 'first': repeat with first element from `data`
*  - 'last': repeat with last element from `data`
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* Arrays.ensureLength([1,2,3], 2); // [1,2]
* Arrays.ensureLength([1,2,3], 5, `undefined`); // [1,2,3,undefined,undefined]
* Arrays.ensureLength([1,2,3], 5, `repeat`);    // [1,2,3,1,2]
* Arrays.ensureLength([1,2,3], 5, `first`);     // [1,2,3,1,1]
* Arrays.ensureLength([1,2,3], 5, `last`);      // [1,2,3,3,3]
* ```
* @param data Input array to expand
* @param length Desired length
* @param expand Expand strategy
* @typeParam V Type of array
*/
declare const ensureLength: <V>(data: ReadonlyArray<V> | Array<V>, length: number, expand?: `undefined` | `repeat` | `first` | `last`) => Array<V>;

//#endregion
//#region ../packages/arrays/dist/src/util/is-equal.d.ts
/**
* Function that returns true if `a` and `b` are considered equal
*/
type IsEqual<T> = (a: T, b: T) => boolean;

//#endregion
//#region ../packages/arrays/dist/src/equality.d.ts
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
* Returns _true_ if all values in the array are the same
*
* Uses value-based equality checking by default.
*
* @example Uses default equality function:
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* const a1 = [ 10, 10, 10 ];
* Arrays.isContentsTheSame(a1); // True
*
* const a2 = [ { name:`Jane` }, { name:`John` } ];
* Arrays.isContentsTheSame(a2); // True, even though object references are different
* ```
*
* If we want to compare by value for objects that aren't readily
* converted to JSON, you need to provide a function:
*
* ```js
* Arrays.isContentsTheSame(someArray, (a, b) => {
*  return (a.eventType === b.eventType);
* });
* ```
*
* Returns _true_ if `array` is empty.
* @param array Array
* @param equality Equality checker. Uses string-conversion checking by default
* @returns
*/
declare const isContentsTheSame: <V>(array: readonly V[] | V[], equality?: IsEqual<V>) => boolean;

//#endregion
//#region ../packages/arrays/dist/src/filter.d.ts
declare const withoutUndefined: <V>(data: readonly V[] | V[]) => V[];

/**
* Returns two separate arrays of everything that `filter` returns _true_,
* and everything it returns _false_ on. The in-built Array.filter() in
* constrast only returns things that `filter` returns _true_ for.
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
* import { filterBetween } from 'https://unpkg.com/ixfx/dist/data.js';
*
* // Return 'registered' people between and including array indexes 5-10
* const filtered = [...filterBetween(people, person => person.registered, 5, 10)];
* ```
* @param array Array to filter
* @param predicate Filter function
* @param startIndex Start index (defaults to 0)
* @param endIndex End index (by default runs until end)
*/
declare function filterBetween<V>(array: readonly V[] | V[], predicate: (value: V, index: number, array: readonly V[] | V[]) => boolean, startIndex?: number, endIndex?: number): Generator<V>;

/**
* Returns an array with value(s) omitted. If value is not found, result will be a copy of input.
* Value checking is completed via the provided `comparer` function.
* By default checking whether `a === b`. To compare based on value, use the `isEqualValueDefault` comparer.
*
* @example
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* const data = [100, 20, 40];
* const filtered = Arrays.without(data, 20); // [100, 40]
* ```
*
* @example Using value-based comparison
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* const data = [{name: `Alice`}, {name:`Sam`}];
*
* // This wouldn't work as expected, because the default comparer uses instance,
* // not value:
* Arrays.without(data, {name: `Alice`});
*
* // So instead we can use a value comparer:
* Arrays.without(data, {name:`Alice`}, isEqualValueDefault);
* ```
*
* @example Use a function
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* const data = [{name: `Alice`}, {name:`Sam`}];
* Arrays.without(data, {name:`ALICE`}, (a, b) => {
*  return (a.name.toLowerCase() === b.name.toLowerCase());
* });
* ```
*
* Consider {@link remove} to remove an item by index.
*
* @typeParam V - Type of array items
* @param sourceArray Source array
* @param toRemove Value(s) to remove
* @param comparer Comparison function. If not provided `Util.isEqualDefault` is used, which compares using `===`
* @return Copy of array without value.
*/
declare const without: <V>(sourceArray: readonly V[] | V[], toRemove: V | V[], comparer?: IsEqual<V>) => V[];

//#endregion
//#region ../packages/arrays/dist/src/flatten.d.ts
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

//#endregion
//#region ../packages/arrays/dist/src/frequency.d.ts
/**
* Computes the frequency of values by a grouping function.
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

//#endregion
//#region ../packages/arrays/dist/src/group-by.d.ts
/**
* Groups data by a function `grouper`, returning data as a map with string
* keys and array values. Multiple values can be assigned to the same group.
*
* `grouper` must yield a string designated group for a given item.
*
* @example
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
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

//#endregion
//#region ../packages/arrays/dist/src/unique.d.ts
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
* * {@link additionalValues}: Yield values from an iterable not present in the other
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
* * {@link additionalValues}: Yield values from an iterable not present in the other
* * {@link containsDuplicateValues}: Returns true if array contains duplicates
* @param arrays
* @param comparer
* @returns
*/
declare const unique: <V>(arrays: V[][] | V[] | readonly V[] | readonly (readonly V[])[], toString?: <V_1>(itemToMakeStringFor: V_1) => string) => V[];

//#endregion
//#region ../packages/arrays/dist/src/insert-at.d.ts
/**
* Inserts `values` at position `index`, shuffling remaining
* items further down.
* @param data
* @param index
* @param values
* @returns
*/
declare const insertAt: <V>(data: readonly V[] | V[], index: number, ...values: V[]) => V[];

//#endregion
//#region ../packages/arrays/dist/src/interleave.d.ts
/**
* Returns an interleaving of two or more arrays. All arrays must be the same length.
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
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

//#endregion
//#region ../packages/arrays/dist/src/intersection.d.ts
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

//#endregion
//#region ../packages/arrays/dist/src/types.d.ts
/**
* Returns a result of a merged into b.
* B is always the 'newer' data that takes
* precedence.
*/
type MergeReconcile<V> = (a: V, b: V) => V;

//#endregion
//#region ../packages/arrays/dist/src/merge-by-key.d.ts
/**
* Merges arrays left to right, using the provided
* `reconcile` function to choose a winner when keys overlap.
*
* There's also {@link Data.Maps.mergeByKey} if the input data is in Map form.
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

//#endregion
//#region ../packages/arrays/dist/src/pairwise.d.ts
/**
* Combines values in pairwise fashion.
* Throws an error if there are less than two entries.
*
* ```js
* pairwise([1, 2, 3, 4, 5]);
* Yields:
* [[1,2],[2,3],[3,4],[4,5] ]
*
* pairwise([ 1, 2, 3, 4 ]);
* Yields:
* [1,2],[2,3],[3,4]
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

//#endregion
//#region ../packages/arrays/dist/src/random.d.ts
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
declare const shuffle: <V>(dataToShuffle: readonly V[], rand?: () => number) => V[];

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
declare const randomElement: <V>(array: ArrayLike<V>, rand?: () => number) => V;

//#endregion
//#region ../packages/arrays/dist/src/remove.d.ts
/**
* Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
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

//#endregion
//#region ../packages/arrays/dist/src/sample.d.ts
/**
* Samples values from an array. If `amount` is less or equal to 1, it's treated as a percentage to sample.
* Otherwise it's treated as every _n_th value to sample.
*
* @example
* By percentage - get half of the items
* ```
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* const list = [1,2,3,4,5,6,7,8,9,10];
* const sub = Arrays.sample(list, 0.5);
* // Yields: [2, 4, 6, 8, 10]
* ```
*
* @example
* By steps - every third value
* ```
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
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

//#endregion
//#region ../packages/arrays/dist/src/sort.d.ts
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
declare const sortByProperty: <V, K extends keyof V>(data: readonly V[] | V[], propertyName: K) => V[];

//#endregion
//#region ../packages/arrays/dist/src/until.d.ts
/**
* Yields all items in `data` for as long as `predicate` returns true.
*
* `predicate` yields arrays of `[stop:boolean, acc:A]`. The first value
* is _true_ when the iteration should stop, and the `acc` is the accumulated value.
* This allows `until` to be used to carry over some state from item to item.
*
* @example Stop when we hit an item with value of 3
* ```js
* const v = [...until([1,2,3,4,5], v => [v === 3, 0])];
* // [ 1, 2 ]
* ```
*
* @example Stop when we reach a total
* ```js
* // Stop when accumulated value reaches 6
* const v = Arrays.until[1,2,3,4,5], (v, acc) => [acc >= 7, v+acc], 0);
* // [1, 2, 3]
* ```
* @param data
* @param predicate
* @returns
*/
declare function until<V, A>(data: readonly V[] | V[], predicate: (v: V, accumulator: A) => readonly [stop: boolean, acc: A], initial: A): Generator<V>;

//#endregion
//#region ../packages/arrays/dist/src/zip.d.ts
/**
* Zip combines the elements of two or more arrays based on their index.
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
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

//#endregion
//#region src/arrays.d.ts
declare namespace arrays_d_exports {
  export { MergeReconcile, atWrap, chunks, contains, containsDuplicateInstances, containsDuplicateValues, cycle, ensureLength, filterAB, filterBetween, flatten, frequencyByGroup, groupBy, insertAt, interleave, intersection, isContentsTheSame, isEqual, mergeByKey, pairwise, pairwiseReduce, randomElement, remove, sample, shuffle, sortByNumericProperty, sortByProperty, unique, uniqueDeep, until, without, withoutUndefined, zip };
}
//#endregion
export { MergeReconcile, arrays_d_exports, atWrap as atWrap$1, chunks as chunks$2, contains as contains$1, containsDuplicateInstances as containsDuplicateInstances$1, containsDuplicateValues as containsDuplicateValues$1, cycle as cycle$1, ensureLength as ensureLength$1, filterAB as filterAB$1, filterBetween as filterBetween$1, flatten as flatten$2, frequencyByGroup as frequencyByGroup$1, groupBy as groupBy$1, insertAt as insertAt$1, interleave as interleave$1, intersection as intersection$1, isContentsTheSame as isContentsTheSame$1, isEqual as isEqual$1, mergeByKey as mergeByKey$1, pairwise as pairwise$1, pairwiseReduce as pairwiseReduce$1, randomElement as randomElement$2, remove as remove$1, sample as sample$1, shuffle as shuffle$2, sortByNumericProperty as sortByNumericProperty$1, sortByProperty as sortByProperty$1, unique as unique$2, uniqueDeep as uniqueDeep$1, until as until$2, without as without$1, withoutUndefined as withoutUndefined$1, zip as zip$2 };
//# sourceMappingURL=arrays.d-CJhmTmX-.d.ts.map