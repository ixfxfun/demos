//#region ../packages/guards/src/throw-from-result.ts
const throwFromResult = (test) => {
	if (test[0]) return false;
	else throw new Error(test[1]);
};

//#endregion
//#region ../packages/guards/src/numbers.ts
/**
* Checks if `t` is not a number or within specified range.
* Returns `[false, reason:string]` if invalid or `[true]` if valid.
* Use {@link throwNumberTest} to throw an error rather than return result.
* 
* Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
*
* * (empty, default): must be a number type and not NaN.
* * finite: must be a number, not NaN and not infinite
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* * bipolar: can be -1 to 1, inclusive
* @param value Value to check
* @param parameterName Name of parameter (for more helpful exception messages)
* @param range Range to enforce
* @returns
*/
const numberTest = (value, range = ``, parameterName = `?`) => {
	if (value === null) return [false, `Parameter '${parameterName}' is null`];
	if (typeof value === `undefined`) return [false, `Parameter '${parameterName}' is undefined`];
	if (Number.isNaN(value)) return [false, `Parameter '${parameterName}' is NaN`];
	if (typeof value !== `number`) return [false, `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`];
	switch (range) {
		case `finite`: {
			if (!Number.isFinite(value)) return [false, `Parameter '${parameterName} must be finite (Got: ${value})`];
			break;
		}
		case `positive`: {
			if (value < 0) return [false, `Parameter '${parameterName}' must be at least zero (${value})`];
			break;
		}
		case `negative`: {
			if (value > 0) return [false, `Parameter '${parameterName}' must be zero or lower (${value})`];
			break;
		}
		case `aboveZero`: {
			if (value <= 0) return [false, `Parameter '${parameterName}' must be above zero (${value})`];
			break;
		}
		case `belowZero`: {
			if (value >= 0) return [false, `Parameter '${parameterName}' must be below zero (${value})`];
			break;
		}
		case `percentage`: {
			if (value > 1 || value < 0) return [false, `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`];
			break;
		}
		case `nonZero`: {
			if (value === 0) return [false, `Parameter '${parameterName}' must non-zero. (${value})`];
			break;
		}
		case `bipolar`: {
			if (value > 1 || value < -1) return [false, `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`];
			break;
		}
	}
	return [true];
};
/**
* Checks if `t` is not a number or within specified range.
* Throws if invalid. Use {@link numberTest} to test without throwing.
*
* * (empty, default): must be a number type and not NaN.
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* * bipolar: can be -1 to 1, inclusive
* 
* Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
* @param value Value to test
* @param range Range
* @param parameterName Name of parameter 
*/
const throwNumberTest = (value, range = ``, parameterName = `?`) => {
	throwFromResult(numberTest(value, range, parameterName));
};
/**
* Returns test of `value` being in the range of 0-1.
* Equiv to `number(value, `percentage`);`
*
* This is the same as calling ```number(t, `percentage`)```
* @param value Value to check
* @param parameterName Param name for customising exception message
* @returns
*/
const percentTest = (value, parameterName = `?`) => numberTest(value, `percentage`, parameterName);
const throwPercentTest = (value, parameterName = `?`) => {
	throwFromResult(percentTest(value, parameterName));
};
/**
* Checks if `value` an integer and meets additional criteria.
* See {@link numberTest} for guard details, or use that if integer checking is not required.
*
* Note:
* * `bipolar` will mean -1, 0 or 1.
* * positive: must be at least zero
* * negative: must be zero or lower
* * aboveZero: must be above zero
* * belowZero: must be below zero
* * percentage: must be within 0-1, inclusive
* * nonZero: can be anything except zero
* @param value Value to check
* @param parameterName Param name for customising exception message
* @param range Guard specifier.
*/
const integerTest = (value, range = ``, parameterName = `?`) => {
	const r = numberTest(value, range, parameterName);
	if (!r[0]) return r;
	if (!Number.isInteger(value)) return [false, `Param '${parameterName}' is not an integer`];
	return [true];
};
const throwIntegerTest = (value, range = ``, parameterName = `?`) => {
	throwFromResult(integerTest(value, range, parameterName));
};
const numberInclusiveRangeTest = (value, min, max, parameterName = `?`) => {
	if (typeof value !== `number`) return [false, `Param '${parameterName}' is not a number type. Got type: '${typeof value}' value: '${JSON.stringify(value)}'`];
	if (Number.isNaN(value)) return [false, `Param '${parameterName}' is not within range ${min}-${max}. Got: NaN`];
	if (Number.isFinite(value)) {
		if (value < min) return [false, `Param '${parameterName}' is below range ${min}-${max}. Got: ${value}`];
		else if (value > max) return [false, `Param '${parameterName}' is above range ${min}-${max}. Got: ${value}`];
		return [true];
	} else return [false, `Param '${parameterName}' is not within range ${min}-${max}. Got: infinite`];
};

//#endregion
//#region ../packages/guards/src/arrays.ts
/**
* Throws an error if parameter is not an array
* @param value
* @param parameterName
*/
const arrayTest = (value, parameterName = `?`) => {
	if (!Array.isArray(value)) return [false, `Parameter '${parameterName}' is expected to be an array'`];
	return [true];
};
const throwArrayTest = (value, parameterName = `?`) => {
	throwFromResult(arrayTest(value, parameterName));
};
/**
* Throws an error if `array` parameter is not a valid array
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
* Arrays.guardArray(someVariable);
* ```
* @private
* @param array
* @param name
*/
const guardArray = (array, name = `?`) => {
	if (array === void 0) throw new TypeError(`Param '${name}' is undefined. Expected array.`);
	if (array === null) throw new TypeError(`Param '${name}' is null. Expected array.`);
	if (!Array.isArray(array)) throw new TypeError(`Param '${name}' not an array as expected`);
};

//#endregion
//#region ../packages/numbers/src/clamp.ts
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
const clamp = (value, min = 0, max = 1) => {
	if (Number.isNaN(value)) throw new Error(`Param 'value' is NaN`);
	if (Number.isNaN(min)) throw new Error(`Param 'min' is NaN`);
	if (Number.isNaN(max)) throw new Error(`Param 'max' is NaN`);
	if (value < min) return min;
	if (value > max) return max;
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
const clamper = (min = 0, max = 1) => {
	if (Number.isNaN(min)) throw new Error(`Param 'min' is NaN`);
	if (Number.isNaN(max)) throw new Error(`Param 'max' is NaN`);
	return (v) => {
		if (v > max) return max;
		if (v < min) return min;
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
//#region ../packages/numbers/src/scale.ts
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
const scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
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
const scaler = (inMin, inMax, outMin, outMax, easing, clamped) => {
	throwNumberTest(inMin, `finite`, `inMin`);
	throwNumberTest(inMax, `finite`, `inMax`);
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

//#endregion
//#region ../packages/core/src/maps.ts
/**
* Zips together an array of keys and values into an object. Requires that
* `keys` and `values` are the same length.
*
* @example
* ```js
* const o = zipKeyValue([`a`, `b`, `c`], [0, 1, 2])
* Yields: { a: 0, b: 1, c: 2}
*```
* @param keys String keys
* @param values Values
* @typeParam V Type of values
* @return Object with keys and values
*/
const zipKeyValue = (keys, values) => {
	if (keys.length !== values.length) throw new Error(`Keys and values arrays should be same length`);
	return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};
/**
* Returns a function that fetches a value from a map, or generates and sets it if not present.
* Undefined is never returned, because if `fn` yields that, an error is thrown.
*
* See {@link getOrGenerateSync} for a synchronous version.
*
* ```
* const m = getOrGenerate(new Map(), (key) => {
*  return key.toUppercase();
* });
*
* // Not contained in map, so it will run the uppercase function,
* // setting the value to the key 'hello'.
* const v = await m(`hello`);  // Yields 'HELLO'
* const v1 = await m(`hello`); // Value exists, so it is returned ('HELLO')
* ```
*
*/
const getOrGenerate = (map, fn) => async (key, args) => {
	let value = map.get(key);
	if (value !== void 0) return value;
	value = await fn(key, args);
	if (value === void 0) throw new Error(`fn returned undefined`);
	map.set(key, value);
	return value;
};

//#endregion
//#region ../packages/core/src/trackers/tracked-value.ts
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
var TrackedValueMap = class {
	store;
	gog;
	constructor(creator) {
		this.store = new Map();
		this.gog = getOrGenerate(this.store, creator);
	}
	/**
	* Number of named values being tracked
	*/
	get size() {
		return this.store.size;
	}
	/**
	* Returns _true_ if `id` is stored
	* @param id
	* @returns
	*/
	has(id) {
		return this.store.has(id);
	}
	/**
	* For a given id, note that we have seen one or more values.
	* @param id Id
	* @param values Values(s)
	* @returns Information about start to last value
	*/
	async seen(id, ...values) {
		const trackedValue = await this.getTrackedValue(id, ...values);
		const result = trackedValue.seen(...values);
		return result;
	}
	/**
	* Creates or returns a TrackedValue instance for `id`.
	* @param id
	* @param values
	* @returns
	*/
	async getTrackedValue(id, ...values) {
		if (id === null) throw new Error(`id parameter cannot be null`);
		if (id === void 0) throw new Error(`id parameter cannot be undefined`);
		const trackedValue = await this.gog(id, values[0]);
		return trackedValue;
	}
	/**
	* Remove a tracked value by id.
	* Use {@link reset} to clear them all.
	* @param id
	*/
	delete(id) {
		this.store.delete(id);
	}
	/**
	* Remove all tracked values.
	* Use {@link delete} to remove a single value by id.
	*/
	reset() {
		this.store = new Map();
	}
	/**
	* Enumerate ids
	*/
	*ids() {
		yield* this.store.keys();
	}
	/**
	* Enumerate tracked values
	*/
	*tracked() {
		yield* this.store.values();
	}
	/**
	* Iterates TrackedValues ordered with oldest first
	* @returns
	*/
	*trackedByAge() {
		const tp = [...this.store.values()];
		tp.sort((a, b) => {
			const aa = a.elapsed;
			const bb = b.elapsed;
			if (aa === bb) return 0;
			if (aa > bb) return -1;
			return 1;
		});
		for (const t of tp) yield t;
	}
	/**
	* Iterates underlying values, ordered by age (oldest first)
	* First the named values are sorted by their `elapsed` value, and then
	* we return the last value for that group.
	*/
	*valuesByAge() {
		for (const tb of this.trackedByAge()) yield tb.last;
	}
	/**
	* Enumerate last received values
	*
	* @example Calculate centroid of latest-received values
	* ```js
	* const pointers = pointTracker();
	* const c = Points.centroid(...Array.from(pointers.lastPoints()));
	* ```
	*/
	*last() {
		for (const p of this.store.values()) yield p.last;
	}
	/**
	* Enumerate starting values
	*/
	*initialValues() {
		for (const p of this.store.values()) yield p.initial;
	}
	/**
	* Returns a tracked value by id, or undefined if not found
	* @param id
	* @returns
	*/
	get(id) {
		return this.store.get(id);
	}
};

//#endregion
//#region ../packages/core/src/trackers/tracker-base.ts
/**
* Base tracker class
*/
var TrackerBase = class {
	/**
	* @ignore
	*/
	seenCount;
	/**
	* @ignore
	*/
	storeIntermediate;
	/**
	* @ignore
	*/
	resetAfterSamples;
	/**
	* @ignore
	*/
	sampleLimit;
	id;
	debug;
	constructor(opts = {}) {
		this.id = opts.id ?? `tracker`;
		this.debug = opts.debug ?? false;
		this.sampleLimit = opts.sampleLimit ?? -1;
		this.resetAfterSamples = opts.resetAfterSamples ?? -1;
		this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
		this.seenCount = 0;
		if (this.debug) console.log(`TrackerBase: sampleLimit: ${this.sampleLimit} resetAfter: ${this.resetAfterSamples} store: ${this.storeIntermediate}`);
	}
	/**
	* Reset tracker
	*/
	reset() {
		this.seenCount = 0;
		this.onReset();
	}
	/**
	* Adds a value, returning computed result.
	*  
	* At this point, we check if the buffer is larger than `resetAfterSamples`. If so, `reset()` is called.
	* If not, we check `sampleLimit`. If the buffer is twice as large as sample limit, `trimStore()` is
	* called to take it down to sample limit, and `onTrimmed()` is called.
	* @param p 
	* @returns 
	*/
	seen(...p) {
		if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) this.reset();
		else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
			this.seenCount = this.trimStore(this.sampleLimit);
			this.onTrimmed(`resize`);
		}
		this.seenCount += p.length;
		const t = this.filterData(p);
		return this.computeResults(t);
	}
};

//#endregion
//#region ../packages/core/src/trackers/object-tracker.ts
/**
* A tracked value of type `V`.
*/
var ObjectTracker = class extends TrackerBase {
	values;
	constructor(opts = {}) {
		super(opts);
		this.values = [];
	}
	onTrimmed(reason) {}
	/**
	* Reduces size of value store to `limit`. 
	* Returns number of remaining items
	* @param limit
	*/
	trimStore(limit) {
		if (limit >= this.values.length) return this.values.length;
		this.values = this.values.slice(-limit);
		return this.values.length;
	}
	/**
	* Allows sub-classes to be notified when a reset happens
	* @ignore
	*/
	onReset() {
		this.values = [];
	}
	/**
	* Tracks a value
	* @ignore
	*/
	filterData(p) {
		const ts = p.map((v) => `at` in v ? v : {
			...v,
			at: Date.now()
		});
		const last = ts.at(-1);
		if (this.storeIntermediate) this.values.push(...ts);
		else switch (this.values.length) {
			case 0: {
				this.values.push(last);
				break;
			}
			case 1: {
				this.values.push(last);
				break;
			}
			case 2: {
				this.values[1] = last;
				break;
			}
		}
		return ts;
	}
	/**
	* Last seen value. If no values have been added, it will return the initial value
	*/
	get last() {
		if (this.values.length === 1) return this.values[0];
		return this.values.at(-1);
	}
	/**
	* Returns the oldest value in the buffer
	*/
	get initial() {
		return this.values.at(0);
	}
	/**
	* Returns number of recorded values (includes the initial value in the count)
	*/
	get size() {
		return this.values.length;
	}
	/**
	* Returns the elapsed time, in milliseconds since the initial value
	*/
	get elapsed() {
		return Date.now() - this.values[0].at;
	}
};

//#endregion
//#region ../packages/events/src/map-of.ts
var MapOfSimple = class {
	#store = new Map();
	/**
	* Gets a copy of the underlying array storing values at `key`, or an empty array if
	* key does not exist
	* @param key 
	* @returns 
	*/
	get(key) {
		const arr = this.#store.get(key);
		if (!arr) return [];
		return [...arr];
	}
	/**
	* Returns the number of values stored under `key`
	* @param key 
	* @returns 
	*/
	size(key) {
		const arr = this.#store.get(key);
		if (!arr) return 0;
		return arr.length;
	}
	/**
	* Iterate over all values contained under `key`
	* @param key 
	* @returns 
	*/
	*iterateKey(key) {
		const arr = this.#store.get(key);
		if (!arr) return;
		yield* arr.values();
	}
	/**
	* Iterate all values, regardless of key
	*/
	*iterateValues() {
		for (const key of this.#store.keys()) yield* this.iterateKey(key);
	}
	/**
	* Iterate all keys
	*/
	*iterateKeys() {
		yield* this.#store.keys();
	}
	addKeyedValues(key, ...values) {
		let arr = this.#store.get(key);
		if (!arr) {
			arr = [];
			this.#store.set(key, arr);
		}
		arr.push(...values);
	}
	deleteKeyValue(key, value) {
		const arr = this.#store.get(key);
		if (!arr) return false;
		const arrCopy = arr.filter((v) => v !== value);
		if (arrCopy.length === arr.length) return false;
		this.#store.set(key, arrCopy);
		return true;
	}
	clear() {
		this.#store.clear();
	}
};

//#endregion
//#region ../packages/events/src/simple-event-emitter.ts
var SimpleEventEmitter = class {
	#listeners = new MapOfSimple();
	#disposed = false;
	dispose() {
		if (this.#disposed) return;
		this.clearEventListeners();
	}
	get isDisposed() {
		return this.#disposed;
	}
	/**
	* Fire event
	* @param type Type of event
	* @param args Arguments for event
	* @returns
	*/
	fireEvent(type, args) {
		if (this.#disposed) throw new Error(`Disposed`);
		for (const l of this.#listeners.iterateKey(type)) l(args, this);
	}
	/**
	* Adds event listener.
	* 
	* @throws Error if emitter is disposed
	* @typeParam K - Events
	* @param name Event name
	* @param listener Event handler
	*/
	addEventListener(name, listener) {
		if (this.#disposed) throw new Error(`Disposed`);
		this.#listeners.addKeyedValues(name, listener);
	}
	/**
	* Remove event listener
	*
	* @param listener
	*/
	removeEventListener(type, listener) {
		if (this.#disposed) return;
		this.#listeners.deleteKeyValue(type, listener);
	}
	/**
	* Clear all event listeners
	* @private
	*/
	clearEventListeners() {
		if (this.#disposed) return;
		this.#listeners.clear();
	}
};

//#endregion
export { ObjectTracker, SimpleEventEmitter, TrackedValueMap, clamp, clampIndex, guardArray, numberInclusiveRangeTest, numberTest, scale, throwArrayTest, throwFromResult, throwIntegerTest, throwNumberTest, throwPercentTest, zipKeyValue };
//# sourceMappingURL=simple-event-emitter-CCHcJXzW.js.map