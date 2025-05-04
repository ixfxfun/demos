import { __export } from "./chunk-Cl8Af3a2.js";
import { integerTest$2 as integerTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-Dp7VYKrL.js";
import { isEqualValueDefault$3 as isEqualValueDefault } from "./is-equal-BPJfRUyY.js";
import { scaler$4 as scaler } from "./scale-FJkQipXZ.js";
import { interpolate$6 as interpolate } from "./interpolate-C13taifW.js";

//#region ../packages/arrays/src/equality.ts
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
const isContentsTheSame = (array$1, equality) => {
	if (!Array.isArray(array$1)) throw new Error(`Param 'array' is not an array.`);
	if (array$1.length === 0) return true;
	const eq = equality ?? isEqualValueDefault;
	const a = array$1[0];
	const r = array$1.some((v) => !eq(a, v));
	if (r) return false;
	return true;
};

//#endregion
//#region ../packages/arrays/src/zip.ts
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
const zip = (...arrays) => {
	if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
	const lengths = arrays.map((a) => a.length);
	if (!isContentsTheSame(lengths)) throw new Error(`Arrays must be of same length`);
	const returnValue = [];
	const length = lengths[0];
	for (let index = 0; index < length; index++) returnValue.push(arrays.map((a) => a[index]));
	return returnValue;
};

//#endregion
//#region ../packages/numbers/dist/src/apply-to-values.js
/**
* Apples `fn` to every key of `obj` which is numeric.
* ```js
* const o = {
*  name: 'john',
*  x: 10,
*  y: 20
* };
* const o2 = applyToValues(o, (v) => v * 2);
*
* // Yields: { name: 'john', x: 20, y: 40 }
* ```
* @param object
* @param apply
* @returns
*/
const applyToValues = (object, apply) => {
	const o = { ...object };
	for (const [key, value] of Object.entries(object)) if (typeof value === `number`) o[key] = apply(value);
	else o[key] = value;
	return o;
};

//#endregion
//#region ../packages/numbers/dist/src/numeric-arrays.js
/**
* Applies a function `fn` to the elements of an array, weighting them based on their relative position.
*
* ```js
* // Six items
* weight([1,1,1,1,1,1], Modulation.gaussian());
*
* // Yields:
* // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
* ```
*
* `fn` is expected to map (0..1) => (0..1), such as an easing function. The input to the
* `fn` is the relative position of an element. Thus the first element will be 0, the middle 0.5 and so on.
* The output of `fn` is then multiplied by the original value.
*
* In the below example (which is also the default if `fn` is not specified), the relative position is
* how values are weighted:
*
* ```js
* weight([1,1,1,1,1,1], (relativePos) => relativePos);
* // Yields:
* // [0, 0.2, 0.4, 0.6, 0.8, 1]
* ```
*
* Throws TypeError if `data` is not an array or for any element not a number.
* @param data Array of numbers
* @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
*/
const weight = (data, fn) => {
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is expected to be an array. Got type: ${typeof data}`);
	const weightingFunction = fn ?? ((x) => x);
	return data.map((value, index) => {
		if (typeof value !== `number`) throw new TypeError(`Param 'data' contains non-number at index: '${index}'. Type: '${typeof value}' value: '${value}'`);
		const relativePos = index / (data.length - 1);
		const weightForPosition = weightingFunction(relativePos);
		if (typeof weightForPosition !== `number`) throw new TypeError(`Weighting function returned type '${typeof weightForPosition}' rather than number for input: '${relativePos}'`);
		const finalResult = value * weightForPosition;
		return finalResult;
	});
};
/**
* Returns an array of all valid numbers from `data`
*
* @param data
* @returns
*/
const validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
/**
* Returns the dot product of arbitrary-sized arrays. Assumed they are of the same length.
* @param values
* @returns
*/
const dotProduct = (values) => {
	let r = 0;
	const length = values[0].length;
	for (let index = 0; index < length; index++) {
		let t = 0;
		for (const [p, value] of values.entries()) if (p === 0) t = value[index];
		else t *= value[index];
		r += t;
	}
	return r;
};
/**
* Calculates the average of all numbers in an array.
* Array items which aren't a valid number are ignored and do not factor into averaging.
*
* Use {@link minMaxAvg} if you want min, max and total as well.
*
* @example
* ```js
* import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
*
* // Average of a list
* const avg = Numbers.average([1, 1.4, 0.9, 0.1]);
*
* // Average of a variable
* const data = [100,200];
* Numbers.average(data);
* ```
*
* @see {@link averageWeighted} To weight items based on position in array
* @param data Data to average.
* @returns Average of array
*/
const average = (data) => {
	if (data === void 0) throw new Error(`data parameter is undefined`);
	const valid = validNumbers(data);
	const total$1 = valid.reduce((accumulator, v) => accumulator + v, 0);
	return total$1 / valid.length;
};
/**
* Returns the minimum number out of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
* Numbers.min([10, 20, 0]); // Yields 0
* ```
* @param data
* @returns Minimum number
*/
const min = (data) => Math.min(...validNumbers(data));
/**
* Returns the index of the largest value.
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
* const v = [ 10, 40, 5 ];
* Numbers.maxIndex(v); // Yields 1
* ```
* @param data Array of numbers
* @returns Index of largest value
*/
const maxIndex = (data) => data.reduce((bestIndex, value, index, array$1) => value > array$1[bestIndex] ? index : bestIndex, 0);
/**
* Returns the index of the smallest value.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/Numbers.js';
* const v = [ 10, 40, 5 ];
* Numbers.minIndex(v); // Yields 2
* ```
* @param data Array of numbers
* @returns Index of smallest value
*/
const minIndex = (...data) => data.reduce((bestIndex, value, index, array$1) => value < array$1[bestIndex] ? index : bestIndex, 0);
/**
* Returns the maximum number out of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
* Numbers.max(100, 200, 50); // 200
* ```
* @param data List of numbers
* @returns Maximum number
*/
const max = (data) => Math.max(...validNumbers(data));
/**
* Returns the total of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
* Numbers.total([1, 2, 3]); // 6
* ```
* @param data Array of numbers
* @returns Total
*/
const total = (data) => data.reduce((previous, current) => {
	if (typeof current !== `number`) return previous;
	if (Number.isNaN(current)) return previous;
	if (!Number.isFinite(current)) return previous;
	return previous + current;
}, 0);
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
* Numbers.maxFast([ 10, 0, 4 ]); // 10
* ```
* @param data
* @returns Maximum
*/
const maxFast = (data) => {
	let m = Number.MIN_SAFE_INTEGER;
	for (const datum of data) m = Math.max(m, datum);
	return m;
};
/**
* Returns the total of `data` without pre-filtering for speed.
*
* For most uses, {@link total} should suffice.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
* Numbers.totalFast([ 10, 0, 4 ]); // 14
* ```
* @param data
* @returns Maximum
*/
const totalFast = (data) => {
	let m = 0;
	for (const datum of data) m += datum;
	return m;
};
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* import { Numbers } from 'https://unpkg.com/ixfx/dist/numbers.js';
* Numbers.minFast([ 10, 0, 100 ]); // 0
* ```
* @param data
* @returns Maximum
*/
const minFast = (data) => {
	let m = Number.MIN_SAFE_INTEGER;
	for (const datum of data) m = Math.min(m, datum);
	return m;
};

//#endregion
//#region ../packages/numbers/dist/src/average-weighted.js
/**
* Computes an average of an array with a set of weights applied.
*
* Weights can be provided as an array, expected to be on 0..1 scale, with indexes
* matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
*
* ```js
* // All items weighted evenly
* averageWeighted([1,2,3], [1,1,1]); // 2
*
* // First item has full weight, second half, third quarter
* averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
*
* // With reversed weighting of [0.25,0.5,1] value is 2.42
* ```
*
* A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
*
* ```js
* averageWeighted[1,2,3], Random.gaussian()); // 2.0
* ```
*
* This is the same as:
*
* ```js
* const data = [1,2,3];
* const w = weight(data, Random.gaussian());
* const avg = averageWeighted(data, w); // 2.0
* ```
* @param data Data to average
* @param weightings Array of weightings that match up to data array, or an easing function
* @see {@link average} Compute averages without weighting.
*/
const averageWeighted = (data, weightings) => {
	if (typeof weightings === `function`) weightings = weight(data, weightings);
	const ww = zip(data, weightings);
	const [totalV, totalW] = ww.reduce((accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]], [0, 0]);
	return totalV / totalW;
};

//#endregion
//#region ../packages/numbers/dist/src/clamp.js
/**
* Clamps a value between min and max (both inclusive)
* Defaults to a 0-1 range, useful for percentages.
*
* @example Usage
* ```js
* // 0.5 - just fine, within default of 0 to 1
* clamp(0.5);
* // 1 - above default max of 1
* clamp(1.5);
* // 0 - below range
* clamp(-50, 0, 100);
* // 50 - within range
* clamp(50, 0, 50);
* ```
*
* For clamping integer ranges, consider {@link clampIndex }
* For clamping `{ x, y }` points, consider {@link Geometry.Points.clamp | Geometry.Points.clamp}.
* For clamping bipolar values: {@link Bipolar.clamp}
* @param value Value to clamp
* @param min value (inclusive)
* @param max value (inclusive)
* @returns Clamped value
*/
const clamp$1 = (value, min$1 = 0, max$1 = 1) => {
	if (Number.isNaN(value)) throw new Error(`Param 'value' is NaN`);
	if (Number.isNaN(min$1)) throw new Error(`Param 'min' is NaN`);
	if (Number.isNaN(max$1)) throw new Error(`Param 'max' is NaN`);
	if (value < min$1) return min$1;
	if (value > max$1) return max$1;
	return value;
};
/**
* Returns a function that clamps values.
*
* ```js
* const c = clamper(0,100);
* c(50);   // 50
* c(101); // 100
* c(-5);  // 0
* ```
* @param min Minimum value. Default: 0
* @param max Maximum value. Default: 1
*/
const clamper = (min$1 = 0, max$1 = 1) => {
	if (Number.isNaN(min$1)) throw new Error(`Param 'min' is NaN`);
	if (Number.isNaN(max$1)) throw new Error(`Param 'max' is NaN`);
	return (v) => {
		if (v > max$1) return max$1;
		if (v < min$1) return min$1;
		return v;
	};
};
/**
* Clamps integer `v` between 0 (inclusive) and array length or length (exclusive).
* Returns value then will always be at least zero, and a valid array index.
*
* @example Usage
* ```js
* // Array of length 4
* const myArray = [`a`, `b`, `c`, `d`];
* clampIndex(0, myArray);    // 0
* clampIndex(5, 3); // 2
* ```
*
* Throws an error if `v` is not an integer.
*
* For some data it makes sense that data might 'wrap around' if it exceeds the
* range. For example rotation angle. Consider using {@link wrap} for this.
*
* @param v Value to clamp (must be an interger)
* @param arrayOrLength Array, or length of bounds (must be an integer)
* @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
*/
const clampIndex = (v, arrayOrLength) => {
	if (!Number.isInteger(v)) throw new TypeError(`v parameter must be an integer (${v})`);
	const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
	if (!Number.isInteger(length)) throw new TypeError(`length parameter must be an integer (${length}, ${typeof length})`);
	v = Math.round(v);
	if (v < 0) return 0;
	if (v >= length) return length - 1;
	return v;
};

//#endregion
//#region ../packages/numbers/dist/src/difference.js
/**
* Returns the difference from the `initial` value. Defaults to absolute difference.
* ```js
* const rel = differenceFromFixed(100);
* rel(100); // 0
* rel(150); // 50
* rel(50);  // 50
* ```
*
* 'numerical' gives sign:
* ```js
* const rel = differenceFromFixed(100, `numerical`);
* rel(100); // 0
* rel(150); // 50
* rel(50); // -50
* ```
*
* 'relative' gives proportion to initial
* ```js
* const rel = differenceFromFixed(100, `relative`);
* rel(100); // 0
* rel(150); // 0.5
* rel(10);  // 0.90
* ```
*
* Using 'relativeSigned', we get negative relative result
* when value is below the initial value.
*
* Use {@link differenceFromLast} to compare against the last value,
* rather than the same fixed value.
* @param {number} initial Value to compare against
* @returns Difference from initial value
*/
const differenceFromFixed = (initial, kind = `absolute`) => (value) => differenceFrom(kind, value, initial);
/**
* Returns a function which yields difference compared to last value.
*
* If no initial value is provided, the first difference will be returned as 0.
*
* Difference can be returned in various formats:
* * 'absolute': numerical difference, without sign
* * 'numerical': numerical difference, with sign, so you can see if difference is higher or lower
* * 'relative': difference divided by last value, giving a proportional difference. Unsigned.
* * 'relativeSigned': as above, but with sign
*
* Use {@link differenceFromFixed} to compare against a fixed value instead of the last value.
*
* ```js
* let d = differenceFromLast(`absolute`);
* d(10); // 0
* d(11); // 1
* d(10); // 1
* ```
*
* ```js
* let d = differenceFromLast(`numerical`);
* d(10); // 0
* d(11); // 1
* d(10); // -1
* ```
*
* ```js
* let d = differenceFromLast(`relative`);
* d(10); // 0
* d(11); // 0.1
* d(10); // 0.1
* ```
* ```js
* let d = differenceFromLast(`relativeSigned`);
* d(10); // 0
* d(11); // 0.1
* d(10); // -0.1
* ```
*
* An initial value can be provided, eg:
* ```js
* let d = differenceFromLast(`absolute`, 10);
* d(11); // 1
* ```
* @param kind Kind of output value
* @param initialValue Optional initial value
* @returns
*/
const differenceFromLast = (kind = `absolute`, initialValue = Number.NaN) => {
	let lastValue = initialValue;
	return (value) => {
		const x = differenceFrom(kind, value, lastValue);
		lastValue = value;
		return x;
	};
};
const differenceFrom = (kind = `absolute`, value, from) => {
	if (Number.isNaN(from)) return 0;
	const d = value - from;
	let r = 0;
	if (kind === `absolute`) r = Math.abs(d);
	else if (kind === `numerical`) r = d;
	else if (kind === `relative`) r = Math.abs(d / from);
	else if (kind === `relativeSigned`) r = d / from;
	else throw new TypeError(`Unknown kind: '${kind}' Expected: 'absolute', 'relative', 'relativeSigned' or 'numerical'`);
	return r;
};

//#endregion
//#region ../packages/numbers/dist/src/guard.js
/**
* Returns true if `possibleNumber` is a number and not NaN
* @param possibleNumber
* @returns
*/
const isValid = (possibleNumber) => {
	if (typeof possibleNumber !== `number`) return false;
	if (Number.isNaN(possibleNumber)) return false;
	return true;
};

//#endregion
//#region ../packages/numbers/dist/src/filter.js
/**
* Filters an iterator of values, only yielding
* those that are valid numbers
*
* ```js
* import * as Numbers from 'https://unpkg.com/ixfx/dist/numbers.js';
*
* const data = [true, 10, '5', { x: 5 }];
* for (const n of Numbers.filterIterable(data)) {
*  // 5
* }
* ```
* @param it
*/
function* filterIterable(it) {
	for (const v of it) if (isValid(v)) yield v;
}
/**
* Returns a function that yields _true_ if a value
* is at least `threshold`
* ```js
* const t = thresholdAtLeast(50);
* t(50); // true
* t(0);  // false
* t(55); // true
* ```
* @param threshold
* @returns
*/
const thresholdAtLeast = (threshold) => {
	return (v) => {
		return v >= threshold;
	};
};
/**
* Returns a function that yields _true_
* if a number is at least _min_ and no greater than _max_
*
* ```js
* const t = rangeInclusive(50, 100);
* t(40); // false
* t(50); // true
* t(60); // true
* t(100); // true
* t(101);  // false
* ```
* @param min
* @param max
* @returns
*/
const rangeInclusive = (min$1, max$1) => {
	return (v) => {
		return v >= min$1 && v <= max$1;
	};
};

//#endregion
//#region ../packages/numbers/dist/src/flip.js
/**
* Flips a percentage-scale number: `1 - v`.
*
* The utility of this function is that it sanity-checks
* that `v` is in 0..1 scale.
*
* ```js
* flip(1);   // 0
* flip(0.5); // 0.5
* flip(0);   // 1
* ```
* @param v
* @returns
*/
const flip = (v) => {
	if (typeof v === `function`) v = v();
	resultThrow(numberTest(v, `percentage`, `v`));
	return 1 - v;
};

//#endregion
//#region ../packages/numbers/dist/src/round.js
/**
* Rounds a number.
*
* If one parameter is given, it's the decimal places,
* and a rounding function is returned:
* ```js
* import { round } from 'https://unpkg.com/ixfx/dist/numbers.js';
* const r = round(2);
* r(10.12355); // 10.12
* ```
*
* If two parameters are given, the first is decimal places,
* the second the value to round.
* ```js
* round(2, 10.12355); // 10.12
* ```
* @param decimalPlaces
* @returns
*/
function round(a, b, roundUp) {
	resultThrow(integerTest(a, `positive`, `decimalPlaces`));
	const up = typeof b === `boolean` ? b : roundUp ?? false;
	let rounder;
	if (a === 0) rounder = Math.round;
	else {
		const p = Math.pow(10, a);
		if (up) rounder = (v) => Math.ceil(v * p) / p;
		else rounder = (v) => Math.floor(v * p) / p;
	}
	if (typeof b === `number`) return rounder(b);
	return rounder;
}

//#endregion
//#region ../packages/numbers/dist/src/is-approx.js
/**
* Checks if a value is within range of a base value
*
* ```js
* // Check if 101 is within 10% of 100
* isApprox(0.1, 100, 101);
*
* // Gets a function to compare some value of 10% range to 100
* const c = isApprox(0.1,100);
* c(101);
*
* // Gets a function to compare some base value and value to 10% range
* const c = isApprox(0.1);
* c(100, 101);
* ```
*
* Throws an error if range or base values are NaN.
* If value being checked is NaN or infinity, _false_ is returned.
* @param rangePercent
* @param baseValue
* @param v
* @returns
*/
function isApprox(rangePercent, baseValue, v) {
	resultThrow(numberTest(rangePercent, `percentage`, `rangePercent`));
	const range = Math.floor(rangePercent * 100);
	const test = (base, value) => {
		try {
			if (typeof value !== `number`) return false;
			if (Number.isNaN(value)) return false;
			if (!Number.isFinite(value)) return false;
			const diff = Math.abs(value - base);
			const relative = base === 0 ? Math.floor(diff * 100) : Math.floor(diff / base * 100);
			return relative <= range;
		} catch {
			return false;
		}
	};
	if (baseValue === void 0) return test;
	resultThrow(numberTest(baseValue, ``, `baseValue`));
	if (v === void 0) return (value) => test(baseValue, value);
	else return test(baseValue, v);
}
const isCloseTo = (a, b, precision = 3) => {
	const aa = a.toPrecision(precision);
	const bb = b.toPrecision(precision);
	if (aa !== bb) return [false, `A is not close enough to B. A: ${a} B: ${b} Precision: ${precision}`];
	else return [true];
};

//#endregion
//#region ../packages/numbers/dist/src/bipolar.js
var bipolar_exports = {};
__export(bipolar_exports, {
	clamp: () => clamp,
	fromScalar: () => fromScalar,
	immutable: () => immutable,
	scale: () => scale$1,
	scaleUnclamped: () => scaleUnclamped,
	toScalar: () => toScalar,
	towardZero: () => towardZero
});
/**
* Wrapper for bipolar-based values. Immutable.
* All functions will clamp to keep it in legal range.
*
* ```js
* let v = immutable(); // Starts with 0 by default
* v = v.add(0.1);      // v.value is 0.1
* v = v.inverse();     // v.value is -0.1
* v = v.multiply(0.2); // v.value is -0.02
*
* v = immutable(1);
* v = v.towardZero(0.1); // 0.9
* v = v.interpolate(0.1, 1);
* ```
*
* Wrapped values can be coerced into number:
* ```js
* const v = immutable(1);
* const x = +v+10;
* // x = 11
* ```
* @param startingValueOrBipolar Initial numeric value or BipolarWrapper instance
* @returns
*/
const immutable = (startingValueOrBipolar = 0) => {
	if (typeof startingValueOrBipolar === `undefined`) throw new Error(`Start value is undefined`);
	const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
	if (startingValue > 1) throw new Error(`Start value cannot be larger than 1`);
	if (startingValue < -1) throw new Error(`Start value cannot be smaller than -1`);
	if (Number.isNaN(startingValue)) throw new Error(`Start value is NaN`);
	const v = startingValue;
	return {
		[Symbol.toPrimitive](hint) {
			if (hint === `number`) return v;
			else if (hint === `string`) return v.toString();
			return true;
		},
		value: v,
		towardZero: (amt) => {
			return immutable(towardZero(v, amt));
		},
		add: (amt) => {
			return immutable(clamp(v + amt));
		},
		multiply: (amt) => {
			return immutable(clamp(v * amt));
		},
		inverse: () => {
			return immutable(-v);
		},
		interpolate: (amt, b) => {
			return immutable(clamp(interpolate(amt, v, b)));
		},
		asScalar: () => {
			return toScalar(v);
		}
	};
};
/**
* Converts bipolar value to a scalar
* ```js
* import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
* Bipolar.toScalar(-1); // 0.0
* Bipolar.toScalar( 0); // 0.5
* Bipolar.toScalar( 1); // 1.0
* ```
*
* Throws an error if `bipolarValue` is not a number or NaN
* @param bipolarValue Value to convert to scalar
* @returns Scalar value on 0..1 range.
*/
const toScalar = (bipolarValue) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Expected v to be a number. Got: ${typeof bipolarValue}`);
	if (Number.isNaN(bipolarValue)) throw new Error(`Parameter is NaN`);
	return (bipolarValue + 1) / 2;
};
/**
* Makes a scalar into a bipolar value.
*
* That is, input range is 0..1, output range is -1...1
*
* ```js
* import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
* Bipolar.fromScalar(1);   // 1
* Bipolar.fromScalar(0);   // -1
* Bipolar.fromScalar(0.5); // 0
* ```
*
* Throws an error if `scalarValue` is not on 0..1 scale.
* @param scalarValue Scalar value to convert
* @returns Bipolar value on -1..1 scale
*/
const fromScalar = (scalarValue) => {
	resultThrow(numberTest(scalarValue, `percentage`, `v`));
	return scalarValue * 2 - 1;
};
/**
* Scale & clamp resulting number to bipolar range (-1..1)
* ```js
* import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
*
* // Scale 100 on 0..100 scale
* Bipolar.scale(100, 0, 100); // 1
* Bipolar.scale(50, 0, 100);  // 0
* Bipolar.scale(0, 0, 100);   // -1
* ```
*
* Return value is clamped.
* @param inputValue Value to scale
* @param inMin Minimum of scale
* @param inMax Maximum of scale
* @returns Bipolar value on -1..1 scale
*/
const scale$1 = (inputValue, inMin, inMax) => {
	return clamp(scaler(inMin, inMax, -1, 1)(inputValue));
};
/**
* Scale a number to bipolar range (-1..1). Not clamped to scale.
*
* ```js
* import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
*
* // Scale 100 on 0..100 scale
* Bipolar.scale(100, 0, 100); // 1
* Bipolar.scale(50, 0, 100);  // 0
* Bipolar.scale(0, 0, 100);   // -1
* ```
*
* @param inputValue Value to scale
* @param inMin Minimum of scale
* @param inMax Maximum of scale
* @returns Bipolar value on -1..1 scale
*/
const scaleUnclamped = (inputValue, inMin, inMax) => {
	return scaler(inMin, inMax, -1, 1)(inputValue);
};
/**
* Clamp a bipolar value
* ```js
* import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
* Bipolar.clamp(-1);   // -1
* Bipolar.clamp(-1.1); // -1
* ```
*
* Throws an error if `bipolarValue` is not a number or NaN.
* @param bipolarValue Value to clamp
* @returns Clamped value on -1..1 scale
*/
const clamp = (bipolarValue) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Param 'bipolarValue' must be a number. Got: ${typeof bipolarValue}`);
	if (Number.isNaN(bipolarValue)) throw new Error(`Param 'bipolarValue' is NaN`);
	if (bipolarValue > 1) return 1;
	if (bipolarValue < -1) return -1;
	return bipolarValue;
};
/**
* Pushes a bipolar value toward zero by `amount`.
* Return value is clamped on bipolar range of -1..1
*
* ```js
* import { Bipolar } from 'https://unpkg.com/ixfx/dist/data.js';
* Bipolar.towardZero(-1, 0.1); // -0.9
* Bipolar.towardZero( 1, 0.1); //  0.9
* Bipolar.towardZero( 0, 0.1); //  0.0
* Bipolar.towardZero( 1, 1.1); //  0.0
* ```
*
* If `amount` is greater than 1, 0 is returned.
* Throws an error if `bipolarValue` or `amount` are not numbers.
* Throws an error if `amount` is below zero.
* @param bipolarValue Bipolar value to nudge toward zero
* @param amount Amount to nudge by
* @returns Bipolar value -1...1
*/
const towardZero = (bipolarValue, amount) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Parameter 'v' must be a number. Got: ${typeof bipolarValue}`);
	if (typeof amount !== `number`) throw new Error(`Parameter 'amt' must be a number. Got: ${typeof amount}`);
	if (amount < 0) throw new Error(`Parameter 'amt' must be positive`);
	if (bipolarValue < 0) {
		bipolarValue += amount;
		if (bipolarValue > 0) bipolarValue = 0;
	} else if (bipolarValue > 0) {
		bipolarValue -= amount;
		if (bipolarValue < 0) bipolarValue = 0;
	}
	return bipolarValue;
};

//#endregion
//#region ../packages/numbers/dist/src/wrap.js
/**
* Wraps an integer number within a specified range, defaulting to degrees (0-360). Use {@link wrap} for floating-point wrapping.
*
* This is useful for calculations involving degree angles and hue, which wrap from 0-360.
* Eg: to add 200 to 200, we don't want 400, but 40.
*
* ```js
* const v = wrapInteger(200+200, 0, 360); // 40
* ```
*
* Or if we minus 100 from 10, we don't want -90 but 270
* ```js
* const v = wrapInteger(10-100, 0, 360); // 270
* ```
*
* `wrapInteger` uses 0-360 as a default range, so both of these
* examples could just as well be:
*
* ```js
* wrapInteger(200+200);  // 40
* wrapInteger(10-100);  // 270
* ```
*
* Non-zero starting points can be used. A range of 20-70:
* ```js
* const v = wrapInteger(-20, 20, 70); // 50
* ```
*
* Note that the minimum value is inclusive, while the maximum is _exclusive_.
* So with the default range of 0-360, 360 is never reached:
*
* ```js
* wrapInteger(360); // 0
* wrapInteger(361); // 1
* ```
*
* If you just want to lock values to a range without wrapping, consider {@link clamp}.
*
* @param v Value to wrap
* @param min Integer minimum of range (default: 0). Inclusive
* @param max Integer maximum of range (default: 360). Exlusive
* @returns
*/
const wrapInteger = (v, min$1 = 0, max$1 = 360) => {
	resultThrow(integerTest(v, void 0, `v`), integerTest(min$1, void 0, `min`), integerTest(max$1, void 0, `max`));
	if (v === min$1) return min$1;
	if (v === max$1) return min$1;
	if (v > 0 && v < min$1) v += min$1;
	v -= min$1;
	max$1 -= min$1;
	v = v % max$1;
	if (v < 0) v = max$1 - Math.abs(v) + min$1;
	return v + min$1;
};
/**
* Wraps floating point numbers to be within a range (default: 0..1). Use {@link wrapInteger} if you want to wrap integer values.
*
* This logic makes sense for some things like rotation angle.
*
* If you just want to lock values to a range without wrapping, consider {@link clamp}.
*
* ```js
* wrap(1.2);   // 0.2
* wrap(2);     // 1.0
* wrap(-0.2); // 0.8
* ```
*
* A range can be provided too:
* ```js
* wrap(30, 20, 50);  	 // 30
* wrap(60, 20, 50);    //  30
* ```
* @param v
* @param min
* @param max
* @returns
*/
const wrap = (v, min$1 = 0, max$1 = 1) => {
	resultThrow(numberTest(v, ``, `min`), numberTest(min$1, ``, `min`), numberTest(max$1, ``, `max`));
	if (v === min$1) return min$1;
	if (v === max$1) return min$1;
	while (v <= min$1 || v >= max$1) {
		if (v === max$1) break;
		if (v === min$1) break;
		if (v > max$1) v = min$1 + (v - max$1);
		else if (v < min$1) v = max$1 - (min$1 - v);
	}
	return v;
};
/**
* Performs a calculation within a wrapping number range. This is a lower-level function.
* See also: {@link wrapInteger} for simple wrapping within a range.
*
* `min` and `max` define the start and end of the valid range, inclusive. Eg for hue degrees it'd be 0, 360.
* `a` and `b` is the range you want to work in.
*
* For example, let's say you want to get the middle point between a hue of 30 and a hue of 330 (ie warmer colours):
* ```js
* wrapRange(0,360, (distance) => {
*  // for a:0 and b:330, distance would be 90 from 30 degrees to 330 (via zero)
*  return distance * 0.5; // eg return middle point
* }, 30, 330);
* ```
*
* The return value of the callback should be in the range of 0-distance. `wrapRange` will subsequently
* conform it to the `min` and `max` range before it's returned to the caller.
*
* @param a Output start (eg. 60)
* @param b Output end (eg 300)
* @param min Range start (eg 0)
* @param max Range end (eg 360)
* @param fn Returns a computed value from 0 to `distance`.
* @returns
*/
const wrapRange = (min$1, max$1, fn, a, b) => {
	let r = 0;
	const distF = Math.abs(b - a);
	const distFwrap = Math.abs(max$1 - a + b);
	const distBWrap = Math.abs(a + (360 - b));
	const distMin = Math.min(distF, distFwrap, distBWrap);
	if (distMin === distBWrap) r = a - fn(distMin);
	else if (distMin === distFwrap) r = a + fn(distMin);
	else if (a > b) r = a - fn(distMin);
	else r = a + fn(distMin);
	return wrapInteger(r, min$1, max$1);
};

//#endregion
//#region ../packages/numbers/dist/src/pi-pi.js
const piPi = Math.PI * 2;

//#endregion
//#region ../packages/numbers/dist/src/interpolate.js
/**
* Interpolates between `a` and `b` by `amount`. Aka `lerp`.
*
* [ixfx Guide on Interpolation](https://ixfx.fun/data/interpolation/overview/)
*
* @example Get the halfway point between 30 and 60
* ```js
* interpolate(0.5, 30, 60);
* ```
*
* See also {@link interpolatorStepped} and {@link interpolatorInterval} for functions
* which help to manage progression from A->B over steps or interval.
*
* Usually interpolation amount is on a 0...1 scale, inclusive. What is the interpolation result
* if this scale is exceeded? By default it is clamped to 0..1, so the return value is always between `a` and `b` (inclusive).
*
* Alternatively, set the `limits` option to process `amount`:
* * 'wrap': wrap amount, eg 1.5 is the same as 0.5, 2 is the same as 1
* * 'ignore': allow exceeding values. eg 1.5 will yield b*1.5.
* * 'clamp': default behaviour of clamping interpolation amount to 0..1
*
* Interpolation can be non-linear using 'easing' option or 'transform' funciton.
* ```js
* interpolate(0.1, 0, 100, { easing: `quadIn` });
* ```
* To interpolate certain types: {@link Visual.Colour.interpolator | Visual.Colour.interpolator }, {@link Geometry.Points.interpolate | Points.interpolate}.
*
* There are a few variations when calling `interpolate`, depending on what parameters are fixed.
* * `interpolate(amount)`: returns a function that needs a & b
* * `interpolate(a, b)`:  returns a function that needs the interpolation amount
*/
function interpolate$1(pos1, pos2, pos3, pos4) {
	let amountProcess;
	let limits = `clamp`;
	const handleAmount = (amount) => {
		if (amountProcess) amount = amountProcess(amount);
		if (limits === void 0 || limits === `clamp`) amount = clamp$1(amount);
		else if (limits === `wrap`) {
			if (amount > 1) amount = amount % 1;
			else if (amount < 0) amount = 1 + amount % 1;
		}
		return amount;
	};
	const doTheEase = (_amt, _a, _b) => {
		resultThrow(numberTest(_a, ``, `a`), numberTest(_b, ``, `b`), numberTest(_amt, ``, `amount`));
		_amt = handleAmount(_amt);
		return (1 - _amt) * _a + _amt * _b;
	};
	const readOpts = (o = {}) => {
		if (o.transform) {
			if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
			amountProcess = o.transform;
		}
		limits = o.limits ?? `clamp`;
	};
	const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
	if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
	if (typeof pos2 === `number`) {
		let a;
		let b;
		if (pos3 === void 0 || typeof pos3 === `object`) {
			a = pos1;
			b = pos2;
			readOpts(pos3);
			return (amount) => doTheEase(amount, a, b);
		} else if (typeof pos3 === `number`) {
			a = pos2;
			b = pos3;
			readOpts(pos4);
			return doTheEase(pos1, a, b);
		} else throw new Error(`Values for 'a' and 'b' not defined`);
	} else if (pos2 === void 0 || typeof pos2 === `object`) {
		const amount = handleAmount(pos1);
		readOpts(pos2);
		resultThrow(numberTest(amount, ``, `amount`));
		return (aValue, bValue) => rawEase(amount, aValue, bValue);
	}
}
/**
* Returns a function that interpolates from A to B.
* It steps through the interpolation with each call to the returned function.
* This means that the `incrementAmount` will hinge on the rate
* at which the function is called. Alternatively, consider {@link interpolatorInterval}
* which steps on the basis of clock time.
*
* ```js
* // Interpolate from 0..1 by 0.01
* const v = interpolatorStepped(0.01, 100, 200);
* v(); // Each call returns a value closer to target
* // Eg: 100, 110, 120, 130 ...
* ```
*
* Under the hood, it calls `interpolate` with an amount that
* increases by `incrementAmount` each time.
*
* When calling `v()` to step the interpolator, you can also pass
* in new B and A values. Note that the order is swapped: the B (target) is provided first, and
* then optionally A.
*
* ```js
* const v = interpolatorStepped(0.1, 100, 200); // Interpolate 100->200
* v(300, 200); // Retarget to 200->300 and return result
* v(150); // Retarget 200->150 and return result
* ```
*
* This allows you to maintain the current interpolation progress.
* @param incrementAmount Amount to increment by
* @param a Start value. Default: 0
* @param b End value. Default: 1
* @param startInterpolationAt Starting interpolation amount. Default: 0
* @param options Options for interpolation
* @returns
*/
const interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0, options) => {
	let amount = startInterpolationAt;
	return (retargetB, retargetA) => {
		if (retargetB !== void 0) b = retargetB;
		if (retargetA !== void 0) a = retargetA;
		if (amount >= 1) return b;
		const value = interpolate$1(amount, a, b, options);
		amount += incrementAmount;
		return value;
	};
};
/**
* Interpolate between angles `a` and `b` by `amount`. Angles are in radians.
*
* ```js
* import { interpolateAngle } from 'https://unpkg.com/ixfx/dist/data.js';
* interpolateAngle(0.5, Math.PI, Math.PI/2);
* ```
* @param amount
* @param aRadians Start angle (radian)
* @param bRadians End angle (radian)
* @returns
*/
const interpolateAngle = (amount, aRadians, bRadians, options) => {
	const t = wrap(bRadians - aRadians, 0, piPi);
	return interpolate$1(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t), options);
};

//#endregion
//#region ../packages/numbers/dist/src/linear-space.js
/**
* Generates a `step`-length series of values between `start` and `end` (inclusive).
* Each value will be equally spaced.
*
* ```js
* for (const v of linearSpace(1, 5, 6)) {
*  // Yields: [ 1, 1.8, 2.6, 3.4, 4.2, 5 ]
* }
* ```
*
* Numbers can be produced from large to small as well
* ```js
* const values = [...linearSpace(10, 5, 3)];
* // Yields: [10, 7.5, 5]
* ```
* @param start Start number (inclusive)
* @param end  End number (inclusive)
* @param steps How many steps to make from start -> end
* @param precision Number of decimal points to round to
*/
function* linearSpace(start, end, steps, precision) {
	resultThrow(numberTest(start, ``, `start`), numberTest(end, ``, `end`), numberTest(steps, ``, `steps`));
	const r = precision ? round(precision) : (v) => v;
	const step = (end - start) / (steps - 1);
	resultThrow(numberTest(step, ``, `step`));
	if (!Number.isFinite(step)) throw new TypeError(`Calculated step value is infinite`);
	for (let index = 0; index < steps; index++) {
		const v = start + step * index;
		yield r(v);
	}
}

//#endregion
//#region ../packages/numbers/dist/src/util/queue-mutable.js
var BasicQueueMutable = class {
	#store = [];
	enqueue(data) {
		this.#store.push(data);
	}
	dequeue() {
		return this.#store.shift();
	}
	get data() {
		return this.#store;
	}
	get size() {
		return this.#store.length;
	}
};

//#endregion
//#region ../packages/numbers/dist/src/moving-average.js
const PiPi = Math.PI * 2;
/**
* A moving average calculator (exponential weighted moving average) which does not keep track of
* previous samples. Less accurate, but uses less system resources.
*
* The `scaling` parameter determines smoothing. A value of `1` means that
* the latest value is used as the average - that is, no smoothing. Higher numbers
* introduce progressively more smoothing by weighting the accumulated prior average more heavily.
*
* ```
* const ma = movingAverageLight(); // default scaling of 3
* ma(50);  // 50
* ma(100); // 75
* ma(75);  // 75
* ma(0);   // 50
* ```
*
* Note that the final average of 50 is pretty far from the last value of 0. To make it more responsive,
* we could use a lower scaling factor: `movingAverageLight(2)`. This yields a final average of `37.5` instead.
*
* @param scaling Scaling factor. 1 is no smoothing. Default: 3
* @returns Function that adds to average.
*/
const movingAverageLight = (scaling = 3) => {
	resultThrow(numberTest(scaling, `aboveZero`, `scaling`));
	let average$1 = 0;
	let count = 0;
	return (v) => {
		const r = numberTest(v, ``, `v`);
		if (r.success && v !== void 0) {
			count++;
			average$1 = average$1 + (v - average$1) / Math.min(count, scaling);
		}
		return average$1;
	};
};
/**
* Creates a moving average for a set number of `samples`.
* It returns a function which in turn yields an average value.
*
* Moving average are useful for computing the average over a recent set of numbers.
* A lower number of samples produces a computed value that is lower-latency yet more jittery.
* A higher number of samples produces a smoother computed value which takes longer to respond to
* changes in data.
*
* Sample size is considered with respect to the level of latency/smoothness trade-off, and also
* the rate at which new data is added to the moving average.
*
*
* ```js
* const ma = movingAverage(10);
* ma(10); // 10
* ma(5);  // 7.5
* ```
*
* A weighting function can be provided to shape how the average is
* calculated - eg privileging the most recent data over older data.
* It uses `Arrays.averageWeighted` under the hood.
*
* ```js
* import { movingAverage } from 'https://unpkg.com/ixfx/dist/data.js';
* import { gaussian } from 'https://unpkg.com/ixfx/dist/modulation.js';
*
* // Give more weight to data in middle of sampling window
* const ma = movingAverage(100, gaussian());
* ```
*
* Because it keeps track of `samples` previous data, there is a memory impact. A lighter version is {@link movingAverageLight} which does not keep a buffer of prior data, but can't be as easily fine-tuned.
* @param samples Number of samples to compute average from
* @param weighter Optional weighting function
* @returns
*/
const movingAverage = (samples = 100, weighter) => {
	const q = new BasicQueueMutable();
	return (v) => {
		const r = numberTest(v);
		if (r.success && v !== void 0) {
			q.enqueue(v);
			while (q.size > samples) q.dequeue();
		}
		return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
	};
};
const smoothingFactor = (timeDelta, cutoff) => {
	const r = PiPi * cutoff * timeDelta;
	return r / (r + 1);
};
const exponentialSmoothing = (smoothingFactor$1, value, previous) => {
	return smoothingFactor$1 * value + (1 - smoothingFactor$1) * previous;
};
/**
* Noise filtering
*
* Algorithm: https://gery.casiez.net/1euro/
*
* Based on [Jaan Tollander de Balsch's implementation](https://jaantollander.com/post/noise-filtering-using-one-euro-filter/)
* @param cutoffMin Default: 1
* @param speedCoefficient Default: 0
* @param cutoffDefault Default: 1
*/
const noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
	let previousValue = 0;
	let derivativeLast = 0;
	let timestampLast = 0;
	const compute = (value, timestamp) => {
		timestamp ??= performance.now();
		const timeDelta = timestamp - timestampLast;
		const s = smoothingFactor(timeDelta, cutoffDefault);
		const valueDelta = (value - previousValue) / timeDelta;
		const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
		const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
		const a = smoothingFactor(timeDelta, cutoff);
		const smoothed = exponentialSmoothing(a, value, previousValue);
		previousValue = smoothed;
		derivativeLast = derivative;
		timestampLast = timestamp;
		return smoothed;
	};
	return compute;
};

//#endregion
//#region ../packages/numbers/dist/src/scale.js
/**
* Scales `v` from an input range to an output range (aka `map`)
*
* For example, if a sensor's useful range is 100-500, scale it to a percentage:
*
* ```js
* import { scale } from 'https://unpkg.com/ixfx/dist/data.js';
*
* scale(sensorReading, 100, 500, 0, 1);
* ```
*
* `scale` defaults to a percentage-range output, so you can get away with:
* ```js
* scale(sensorReading, 100, 500);
* ```
*
* If `v` is outside of the input range, it will likewise be outside of the output range.
* Use {@link scaleClamped} to clip value to range.
*
* If inMin and inMax are equal, outMax will be returned.
*
* An easing function can be provided for non-linear scaling. In this case
* the input value is 'pre scaled' using the function before it is applied to the
* output range.
*
* ```js
* scale(sensorReading, 100, 500, 0, 1, Easings.gaussian());
* ```
* @param v Value to scale
* @param inMin Input minimum
* @param inMax Input maximum
* @param outMin Output minimum. If not specified, 0
* @param outMax Output maximum. If not specified, 1
* @param easing Easing function
* @returns Scaled value
*/
const scale = (v, inMin, inMax, outMin, outMax, easing) => scaler$1(inMin, inMax, outMin, outMax, easing)(v);
/**
* Returns a scaling function
* @param inMin Input minimum
* @param inMax Input maximum
* @param outMin Output minimum. If not specified, 0
* @param outMax Output maximum. If not specified, 1
* @param easing Easing function
* @param clamped If true, value is clamped. Default: false
* @returns
*/
const scaler$1 = (inMin, inMax, outMin, outMax, easing, clamped) => {
	resultThrow(numberTest(inMin, `finite`, `inMin`), numberTest(inMax, `finite`, `inMax`));
	const oMax = outMax ?? 1;
	const oMin = outMin ?? 0;
	const clampFunction = clamped ? clamper(outMin, outMax) : void 0;
	return (v) => {
		if (inMin === inMax) return oMax;
		let a = (v - inMin) / (inMax - inMin);
		if (easing !== void 0) a = easing(a);
		const x = a * (oMax - oMin) + oMin;
		if (clampFunction) return clampFunction(x);
		return x;
	};
};
/**
* Returns a 'null' scaler that does nothing - the input value is returned as output.
* @returns
*/
const scalerNull = () => (v) => v;
/**
* As {@link scale}, but result is clamped to be
* within `outMin` and `outMax`.
*
* @param v
* @param inMin
* @param inMax
* @param outMin 1 by default
* @param outMax 0 by default d
* @param easing
* @returns
*/
const scaleClamped = (v, inMin, inMax, outMin, outMax, easing) => {
	if (typeof outMax === `undefined`) outMax = 1;
	if (typeof outMin === `undefined`) outMin = 0;
	if (inMin === inMax) return outMax;
	const x = scale(v, inMin, inMax, outMin, outMax, easing);
	return clamp$1(x, outMin, outMax);
};
/**
* Scales an input percentage to a new percentage range.
*
* If you have an input percentage (0-1), `scalePercentageOutput` maps it to an
* _output_ percentage of `outMin`-`outMax`.
*
* ```js
* import { scalePercentages } from 'https://unpkg.com/ixfx/dist/data.js';
*
* // Scales 50% to a range of 0-10%
* scalePercentages(0.5, 0, 0.10); // 0.05 - 5%
* ```
*
* An error is thrown if any parameter is outside of percentage range. This added
* safety is useful for catching bugs. Otherwise, you could just as well call
* `scale(percentage, 0, 1, outMin, outMax)`.
*
* If you want to scale some input range to percentage output range, just use `scale`:
* ```js
* import { scale } from 'https://unpkg.com/ixfx/dist/data.js';
*
* // Yields 0.5
* scale(2.5, 0, 5);
* ```
* @param percentage Input value, within percentage range
* @param outMin Output minimum, between 0-1
* @param outMax Output maximum, between 0-1
* @returns Scaled value between outMin-outMax.
*/
const scalePercentages = (percentage, outMin, outMax = 1) => {
	resultThrow(numberTest(percentage, `percentage`, `v`), numberTest(outMin, `percentage`, `outMin`), numberTest(outMax, `percentage`, `outMax`));
	return scale(percentage, 0, 1, outMin, outMax);
};
/**
* Scales an input percentage value to an output range
* If you have an input percentage (0-1), `scalePercent` maps it to an output range of `outMin`-`outMax`.
* ```js
* import { scalePercent } from 'https://unpkg.com/ixfx/dist/data.js';
* scalePercent(0.5, 10, 20); // 15
* ```
*
* @see {@link scalerPercent} Returns a function
* @param v Value to scale
* @param outMin Minimum for output
* @param outMax Maximum for output
* @returns
*/
const scalePercent = (v, outMin, outMax) => scalerPercent(outMin, outMax)(v);
/**
* Returns a function that scales an input percentage value to an output range
* @see {@link scalePercent} Calculates value
* @param outMin
* @param outMax
* @returns Function that takes a single argument
*/
const scalerPercent = (outMin, outMax) => {
	return (v) => {
		resultThrow(numberTest(v, `percentage`, `v`));
		return scale(v, 0, 1, outMin, outMax);
	};
};
/**
* Returns a two-way scaler
* ```js
* // Input range 0..100, output range 0..1
* const s = scalerTwoWay(0,100,0,1);
*
* // Scale from input to output
* s.out(50); // 0.5
*
* // Scale from output range to input
* s.in(1); // 100
* ```
* @param inMin
* @param inMax
* @param outMin
* @param outMax
* @returns
*/
const scalerTwoWay = (inMin, inMax, outMin = 0, outMax = 1, clamped = false, easing) => {
	const toOut = scaler$1(inMin, inMax, outMin, outMax, easing, clamped);
	const toIn = scaler$1(outMin, outMax, inMin, inMax, easing, clamped);
	return {
		out: toOut,
		in: toIn
	};
};

//#endregion
//#region ../packages/numbers/dist/src/number-array-compute.js
/**
* Calculate the min, max, total, average and count of input array `data`.
* ```js
* const { total, min, max, avg, count } = numberArrayCompute([ 1, 2, 3 ]);
* ```
* @param data
* @param opts
* @returns
*/
const numberArrayCompute = (data, opts = {}) => {
	if (data.length === 0) return {
		total: Number.NaN,
		min: Number.NaN,
		max: Number.NaN,
		avg: Number.NaN,
		count: Number.NaN
	};
	const nonNumbers = opts.nonNumbers ?? `throw`;
	let total$1 = 0;
	let min$1 = Number.MAX_SAFE_INTEGER;
	let max$1 = Number.MIN_SAFE_INTEGER;
	let count = 0;
	for (let index = 0; index < data.length; index++) {
		let value = data[index];
		if (typeof value !== `number`) {
			if (nonNumbers === `ignore`) continue;
			if (nonNumbers === `throw`) throw new Error(`Param 'data' contains a non-number at index: ${index.toString()}`);
			if (nonNumbers === `nan`) value = Number.NaN;
		}
		if (Number.isNaN(value)) continue;
		min$1 = Math.min(min$1, value);
		max$1 = Math.max(max$1, value);
		total$1 += value;
		count++;
	}
	return {
		total: total$1,
		max: max$1,
		min: min$1,
		count,
		avg: total$1 / count
	};
};

//#endregion
//#region ../packages/numbers/dist/src/normalise.js
/**
* Normalises numbers, adjusting min/max as new values are processed.
* Normalised return values will be in the range of 0-1 (inclusive).
*
* [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* @example
* ```js
* import {Normalise} from 'https://unpkg.com/ixfx/dist/numbers.js'
* const s = Normalise.stream();
* s(2);    // 1 (because 2 is highest seen)
* s(1);    // 0 (because 1 is the lowest so far)
* s(1.5);  // 0.5 (50% of range 1-2)
* s(0.5);  // 0 (because it's the new lowest)
* ```
*
* Since normalisation is being adjusted as new min/max are encountered, it might
* be that value normalised to 1 at one time is different to what normalises to 1
* at a later time.
*
* If you already know what to expect of the number range, passing in `minDefault`
* and `maxDefault` primes the normalisation.
* ```js
* const s = Normalise.stream();
* s(5); // 1, because it's the highest seen
*
* // With priming:
* const s = Normalise.stream(0, 10);
* s(5); // 0.5, because we're expecting range 0-10
* ```
*
* If a value exceeds the default range, normalisation adjusts.
* Errors are thrown if min/max defaults are NaN or if one attempts to
* normalise NaN.
* @returns
*/
const stream = (minDefault, maxDefault) => {
	let min$1 = minDefault ?? Number.MAX_SAFE_INTEGER;
	let max$1 = maxDefault ?? Number.MIN_SAFE_INTEGER;
	resultThrow(numberTest(min$1), numberTest(max$1));
	return (v) => {
		resultThrow(numberTest(v));
		min$1 = Math.min(min$1, v);
		max$1 = Math.max(max$1, v);
		return scale(v, min$1, max$1);
	};
};
/**
* Normalises an array. By default uses the actual min/max of the array
* as the normalisation range. [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* ```js
* import {Normalise} from 'https://unpkg.com/ixfx/dist/numbers.js'
* // Yields: [0.5, 0.1, 0.0, 0.9, 1]
* Normalise.array([5,1,0,9,10]);
* ```
*
* `minForced` and/or `maxForced` can
* be provided to use an arbitrary range.
* ```js
* // Forced range 0-100
* // Yields: [0.05, 0.01, 0.0, 0.09, 0.10]
* Normalise.array([5,1,0,9,10], 0, 100);
* ```
*
* Return values are clamped to always be 0-1, inclusive.
*
* @param values Values
* @param minForced If provided, this will be min value used
* @param maxForced If provided, this will be the max value used
*/
const array = (values, minForced, maxForced) => {
	if (!Array.isArray(values)) throw new TypeError(`Param 'values' should be an array. Got: ${typeof values}`);
	const mma = numberArrayCompute(values);
	const min$1 = minForced ?? mma.min;
	const max$1 = maxForced ?? mma.max;
	return values.map((v) => clamp$1(scale(v, min$1, max$1)));
};

//#endregion
//#region ../packages/numbers/dist/src/proportion.js
/**
* Scales a percentage-scale number, ie: `v * t`.
* The utility of this function is that it sanity-checks that
*  both parameters are in the 0..1 scale.
* @param v Value
* @param t Scale amount
* @returns Scaled value
*/
const proportion = (v, t) => {
	if (typeof v === `function`) v = v();
	if (typeof t === `function`) t = t();
	resultThrow(numberTest(v, `percentage`, `v`), numberTest(t, `percentage`, `t`));
	return v * t;
};

//#endregion
//#region ../packages/numbers/dist/src/quantise.js
/**
* Rounds `v` by `every`. Middle values are rounded up by default.
*
* ```js
* quantiseEvery(11, 10);  // 10
* quantiseEvery(25, 10);  // 30
* quantiseEvery(0, 10);   // 0
* quantiseEvery(4, 10);   // 0
* quantiseEvery(100, 10); // 100
* ```
*
* Also works with decimals
* ```js
* quantiseEvery(1.123, 0.1); // 1.1
* quantiseEvery(1.21, 0.1);  // 1.2
* ```
*
* @param v Value to quantise
* @param every Number to quantise to
* @param middleRoundsUp If _true_ (default), the exact middle rounds up to next step.
* @returns
*/
const quantiseEvery = (v, every, middleRoundsUp = true) => {
	const everyString = every.toString();
	const decimal = everyString.indexOf(`.`);
	let multiplier = 1;
	if (decimal >= 0) {
		const d = everyString.substring(decimal + 1).length;
		multiplier = 10 * d;
		every = Math.floor(multiplier * every);
		v = v * multiplier;
	}
	resultThrow(numberTest(v, ``, `v`), integerTest(every, ``, `every`));
	let div = v / every;
	const divModule = div % 1;
	div = Math.floor(div);
	if (divModule === .5 && middleRoundsUp || divModule > .5) div++;
	const vv = every * div / multiplier;
	return vv;
};

//#endregion
//#region ../packages/numbers/dist/src/softmax.js
/**
* Via: https://gist.github.com/cyphunk/6c255fa05dd30e69f438a930faeb53fe
* @param logits
* @returns
*/
const softmax = (logits) => {
	const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
	const scores = logits.map((l) => Math.exp(l - maxLogit));
	const denom = scores.reduce((a, b) => a + b);
	return scores.map((s) => s / denom);
};

//#endregion
//#region src/numbers.ts
var numbers_exports = {};
__export(numbers_exports, {
	Bipolar: () => bipolar_exports,
	HelloTest: () => HelloTest,
	applyToValues: () => applyToValues,
	array: () => array,
	average: () => average,
	averageWeighted: () => averageWeighted,
	clamp: () => clamp$1,
	clampIndex: () => clampIndex,
	clamper: () => clamper,
	differenceFromFixed: () => differenceFromFixed,
	differenceFromLast: () => differenceFromLast,
	dotProduct: () => dotProduct,
	filterIterable: () => filterIterable,
	flip: () => flip,
	interpolate: () => interpolate$1,
	interpolateAngle: () => interpolateAngle,
	interpolatorStepped: () => interpolatorStepped,
	isApprox: () => isApprox,
	isCloseTo: () => isCloseTo,
	isValid: () => isValid,
	linearSpace: () => linearSpace,
	max: () => max,
	maxFast: () => maxFast,
	maxIndex: () => maxIndex,
	min: () => min,
	minFast: () => minFast,
	minIndex: () => minIndex,
	movingAverage: () => movingAverage,
	movingAverageLight: () => movingAverageLight,
	noiseFilter: () => noiseFilter,
	numberArrayCompute: () => numberArrayCompute,
	proportion: () => proportion,
	quantiseEvery: () => quantiseEvery,
	rangeInclusive: () => rangeInclusive,
	round: () => round,
	scale: () => scale,
	scaleClamped: () => scaleClamped,
	scalePercent: () => scalePercent,
	scalePercentages: () => scalePercentages,
	scaler: () => scaler$1,
	scalerNull: () => scalerNull,
	scalerPercent: () => scalerPercent,
	scalerTwoWay: () => scalerTwoWay,
	softmax: () => softmax,
	stream: () => stream,
	thresholdAtLeast: () => thresholdAtLeast,
	total: () => total,
	totalFast: () => totalFast,
	validNumbers: () => validNumbers,
	weight: () => weight,
	wrap: () => wrap,
	wrapInteger: () => wrapInteger,
	wrapRange: () => wrapRange
});
const HelloTest = () => {
	console.log(`hello test`);
};

//#endregion
export { HelloTest, applyToValues, array, average, averageWeighted, bipolar_exports, clamp$1 as clamp, clampIndex, clamper, differenceFromFixed, differenceFromLast, dotProduct, filterIterable, flip, interpolate$1, interpolateAngle as interpolateAngle$1, interpolatorStepped as interpolatorStepped$1, isApprox, isCloseTo, isValid, linearSpace, max as max$1, maxFast, maxIndex, min as min$1, minFast, minIndex, movingAverage, movingAverageLight, noiseFilter, numberArrayCompute, numbers_exports, proportion, quantiseEvery, rangeInclusive, round, scale, scaleClamped, scalePercent, scalePercentages, scaler$1, scalerNull, scalerPercent, scalerTwoWay, softmax, stream, thresholdAtLeast, total, totalFast, validNumbers, weight, wrap, wrapInteger, wrapRange };
//# sourceMappingURL=numbers-D2X0im_a.js.map