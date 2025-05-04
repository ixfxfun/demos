import { isEqualDefault$2 as isEqualDefault } from "./is-equal-CuJQbSdk.js";

//#region ../packages/core/src/iterable-compare-values-shallow.ts
/**
* Compares the values of two iterables, returning a list
* of items they have in common and those unique in `a` or `b`.
* Ignores ordering of values, and is NOT recursive.
*
* ```js
* const a = ['apples', 'oranges', 'pears' ]
* const b = ['pears', 'kiwis', 'bananas' ];
*
* const r = compareValuesShallow(a, b);
* r.shared;  // [ 'pears' ]
* r.a;       // [ 'apples', 'oranges' ]
* r.b;       // [ 'kiwis', 'bananas' ]
* ```
* 
* By default uses === semantics for comparison.
* @param a
* @param b
* @param eq
* @returns
*/
const compareIterableValuesShallow = (a, b, eq = isEqualDefault) => {
	const shared = [];
	const aUnique = [];
	const bUnique = [];
	for (const elementOfA of a) {
		let seenInB = false;
		for (const elementOfB of b) if (eq(elementOfA, elementOfB)) {
			seenInB = true;
			break;
		}
		if (seenInB) shared.push(elementOfA);
		else aUnique.push(elementOfA);
	}
	for (const elementOfB of b) {
		let seenInA = false;
		for (const elementOfA of a) if (eq(elementOfB, elementOfA)) seenInA = true;
		if (!seenInA) bUnique.push(elementOfB);
	}
	const isSame = aUnique.length === 0 && bUnique.length === 0;
	return {
		shared,
		isSame,
		a: aUnique,
		b: bUnique
	};
};

//#endregion
export { compareIterableValuesShallow as compareIterableValuesShallow$2 };
//# sourceMappingURL=iterable-compare-values-shallow-DVwcbvdw.js.map