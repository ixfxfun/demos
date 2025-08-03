import { toStringDefault } from "./is-equal-y9du2FWU.js";

//#region ../arrays/dist/src/unique.js
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
const unique = (arrays, toString = toStringDefault) => {
	const matching = /* @__PURE__ */ new Set();
	const t = [];
	const flattened = arrays.flat(10);
	for (const a of flattened) {
		const stringRepresentation = toString(a);
		if (matching.has(stringRepresentation)) continue;
		matching.add(stringRepresentation);
		t.push(a);
	}
	return t;
};

//#endregion
export { unique };
//# sourceMappingURL=unique-GmJPtLE_.js.map