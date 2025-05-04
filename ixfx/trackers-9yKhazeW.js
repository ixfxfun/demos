import { __export } from "./chunk-51aI8Tpl.js";
import { defaultComparer$2 as defaultComparer } from "./comparers-B0yM3Kxj.js";
import { SimpleEventEmitter$2 as SimpleEventEmitter } from "./simple-event-emitter-Bvk_YVow.js";
import { maxFast$2 as maxFast, minFast$2 as minFast, totalFast$2 as totalFast } from "./numeric-arrays-D35z4oke.js";
import { numberArrayCompute$2 as numberArrayCompute } from "./number-array-compute-C2T_DC6X.js";
import { TrackerBase } from "./tracker-base-D4OLYSLs.js";
import { timeout$2 as timeout } from "./timeout-BfZot_fp.js";

//#region ../packages/core/src/key-value.ts
const sorterByValueIndex = (index, reverse = false) => {
	return (values) => {
		const s = values.toSorted((a, b) => {
			return defaultComparer(a[index], b[index]);
		});
		if (reverse) return s.reverse();
		return s;
	};
};
const keyValueSorter = (sortStyle) => {
	switch (sortStyle) {
		case `value`: return sorterByValueIndex(1, false);
		case `value-reverse`: return sorterByValueIndex(1, true);
		case `key`: return sorterByValueIndex(0, false);
		case `key-reverse`: return sorterByValueIndex(0, true);
		default: throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
	}
};

//#endregion
//#region ../packages/core/src/trackers/primitive-tracker.ts
var PrimitiveTracker = class extends TrackerBase {
	values;
	timestamps;
	constructor(opts) {
		super(opts);
		this.values = [];
		this.timestamps = [];
	}
	/**
	* Reduces size of value store to `limit`. Returns
	* number of remaining items
	* @param limit
	*/
	trimStore(limit) {
		if (limit >= this.values.length) return this.values.length;
		this.values = this.values.slice(-limit);
		this.timestamps = this.timestamps.slice(-limit);
		return this.values.length;
	}
	onTrimmed(reason) {}
	get last() {
		return this.values.at(-1);
	}
	get initial() {
		return this.values.at(0);
	}
	/**
	* Returns number of recorded values (this can include the initial value)
	*/
	get size() {
		return this.values.length;
	}
	/**
	* Returns the elapsed time, in milliseconds since the instance was created
	*/
	get elapsed() {
		if (this.values.length < 0) throw new Error(`No values seen yet`);
		return Date.now() - this.timestamps[0];
	}
	onReset() {
		this.values = [];
		this.timestamps = [];
	}
	/**
	* Tracks a value
	*/
	filterData(rawValues) {
		const lastValue = rawValues.at(-1);
		const last = {
			value: lastValue,
			at: performance.now()
		};
		const values = rawValues.map((value) => ({
			at: performance.now(),
			value
		}));
		if (this.storeIntermediate) {
			this.values.push(...rawValues);
			this.timestamps.push(...values.map((v) => v.at));
		} else switch (this.values.length) {
			case 0: {
				this.values.push(last.value);
				this.timestamps.push(last.at);
				break;
			}
			case 2: {
				this.values[1] = last.value;
				this.timestamps[1] = last.at;
				break;
			}
			case 1: {
				this.values.push(last.value);
				this.timestamps.push(last.at);
				break;
			}
		}
		return values;
	}
};

//#endregion
//#region ../packages/trackers/dist/src/frequency-mutable.js
var FrequencyTracker = class extends SimpleEventEmitter {
	#store;
	#keyString;
	/**
	* Constructor
	* @param keyString Function to key items. Uses JSON.stringify by default
	*/
	constructor(keyString) {
		super();
		this.#store = new Map();
		if (typeof keyString === `undefined`) keyString = (a) => {
			if (a === void 0) throw new Error(`Cannot create key for undefined`);
			return typeof a === `string` ? a : JSON.stringify(a);
		};
		this.#keyString = keyString;
	}
	/**
	* Clear data. Fires `change` event
	*/
	clear() {
		this.#store.clear();
		this.fireEvent(`change`, { context: this });
	}
	/**
	* @returns Iterator over keys (ie. groups)
	*/
	keys() {
		return this.#store.keys();
	}
	/**
	* @returns Iterator over frequency counts
	*/
	values() {
		return this.#store.values();
	}
	/**
	* @returns Copy of entries as an array of `[key, count]`
	*/
	toArray() {
		return [...this.#store.entries()];
	}
	/**
	* Returns a string with keys and counts, useful for debugging.
	* @returns
	*/
	debugString() {
		let t = ``;
		for (const [key, count] of this.#store.entries()) t += `${key}: ${count.toString()}, `;
		if (t.endsWith(`, `)) return t.slice(0, Math.max(0, t.length - 2));
		return t;
	}
	/**
	*
	* @param value Value to count
	* @returns Frequency of value, or _undefined_ if it does not exist
	*/
	frequencyOf(value) {
		if (typeof value === `string`) return this.#store.get(value);
		const key = this.#keyString(value);
		return this.#store.get(key);
	}
	/**
	*
	* @param value Value to count
	* @returns Relative frequency of `value`, or _undefined_ if it does not exist
	*/
	relativeFrequencyOf(value) {
		let freq;
		if (typeof value === `string`) freq = this.#store.get(value);
		else {
			const key = this.#keyString(value);
			freq = this.#store.get(key);
		}
		if (freq === void 0) return;
		const mma = this.computeValues();
		return freq / mma.total;
	}
	/**
	* Returns copy of entries as an array
	* @returns Copy of entries as an array
	*/
	entries() {
		return [...this.#store.entries()];
	}
	/**
	* Calculate min,max,avg,total & count from values
	* @returns Returns `{min,max,avg,total}`
	*/
	computeValues() {
		const valuesAsNumbers = [...this.values()];
		return numberArrayCompute(valuesAsNumbers);
	}
	/**
	* Return entries sorted
	* @param sortStyle Sorting style (default: _value_, ie. count)
	* @returns Sorted array of [key,frequency]
	*/
	entriesSorted(sortStyle = `value`) {
		const s = keyValueSorter(sortStyle);
		return s(this.entries());
	}
	/**
	* Add one or more values, firing _change_ event.
	* @param values Values to add. Fires _change_ event after adding item(s)
	*/
	add(...values) {
		if (typeof values === `undefined`) throw new Error(`Param 'values' undefined`);
		const keys = values.map((v) => this.#keyString(v));
		for (const key of keys) {
			const score = this.#store.get(key) ?? 0;
			this.#store.set(key, score + 1);
		}
		this.fireEvent(`change`, { context: this });
	}
};
/**
* Frequency keeps track of how many times a particular value is seen, but
* unlike a Map it does not store the data. By default compares
* items by value (via JSON.stringify).
*
* Create with {@link Trackers.frequency}.
*
* Fires `change` event when items are added or it is cleared.
*
* Overview
* ```
* const fh = Trackers.frequency();
* fh.add(value); // adds a value
* fh.clear();    // clears all data
* fh.keys() / .values() // returns an iterator for keys and values
* fh.toArray();  //  returns an array of data in the shape [[key,freq],[key,freq]...]
* ```
*
* Usage
* ```
* const fh = Trackers.frequency();
* fh.add(`apples`); // Count an occurence of `apples`
* fh.add(`oranges)`;
* fh.add(`apples`);
*
* const fhData = fh.toArray(); // Expect result [[`apples`, 2], [`oranges`, 1]]
* fhData.forEach((d) => {
*  const [key,freq] = d;
*  console.log(`Key '${key}' occurred ${freq} time(s).`);
* })
* ```
*
* Custom key string
* ```
* const fh = Trackers.frequency( person => person.name);
* // All people with name `Samantha` will be counted in same group
* fh.add({name:`Samantha`, city:`Brisbane`});
* ```
* @typeParam V - Type of items
*/
const frequency = (keyString) => new FrequencyTracker(keyString);

//#endregion
//#region ../packages/trackers/dist/src/number-tracker.js
var NumberTracker = class extends PrimitiveTracker {
	total = 0;
	min = Number.MAX_SAFE_INTEGER;
	max = Number.MIN_SAFE_INTEGER;
	get avg() {
		return this.total / this.seenCount;
	}
	/**
	* Difference between last value and initial.
	* Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
	* If either of those is missing, undefined is returned
	*/
	difference() {
		if (this.last === void 0) return;
		if (this.initial === void 0) return;
		return this.last - this.initial;
	}
	/**
	* Relative difference between last value and initial.
	* Eg if last value was 10 and initial value was 5, 2 is returned (200%)
	*/
	relativeDifference() {
		if (this.last === void 0) return;
		if (this.initial === void 0) return;
		return this.last / this.initial;
	}
	onReset() {
		this.min = Number.MAX_SAFE_INTEGER;
		this.max = Number.MIN_SAFE_INTEGER;
		this.total = 0;
		super.onReset();
	}
	/**
	* When trimmed, recomputes to set total/min/max to be based on
	* current values.
	* @param reason
	*/
	onTrimmed(reason) {
		this.min = minFast(this.values);
		this.max = maxFast(this.values);
		this.total = totalFast(this.values);
	}
	computeResults(values) {
		if (values.some((v) => Number.isNaN(v))) throw new Error(`Cannot add NaN`);
		const numbers = values.map((value) => value.value);
		this.total = numbers.reduce((accumulator, v) => accumulator + v, this.total);
		this.min = Math.min(...numbers, this.min);
		this.max = Math.max(...numbers, this.max);
		const r = {
			max: this.max,
			min: this.min,
			total: this.total,
			avg: this.avg
		};
		return r;
	}
	getMinMaxAvg() {
		return {
			min: this.min,
			max: this.max,
			avg: this.avg
		};
	}
};
/**
* Keeps track of the total, min, max and avg in a stream of values. By default values
* are not stored.
*
* Usage:
*
* ```js
* import { number } from 'https://unpkg.com/ixfx/dist/trackers.js';
*
* const t = number();
* t.seen(10);
*
* t.avg / t.min/ t.max
* t.initial; // initial value
* t.size;    // number of seen values
* t.elapsed; // milliseconds since intialisation
* t.last;    // last value
* ```
*
* To get `{ avg, min, max, total }`
* ```
* t.getMinMax()
* ```
*
* Use `t.reset()` to clear everything.
*
* Trackers can automatically reset after a given number of samples
* ```
* // reset after 100 samples
* const t = number({ resetAfterSamples: 100 });
* ```
*
* To store values, use the `storeIntermediate` option:
*
* ```js
* const t = number({ storeIntermediate: true });
* ```
*
* Difference between last value and initial value:
* ```js
* t.relativeDifference();
* ```
*
* Get raw data (if it is being stored):
* ```js
* t.values; // array of numbers
* t.timestampes; // array of millisecond times, indexes correspond to t.values
* ```
*/
const number = (opts = {}) => new NumberTracker(opts);

//#endregion
//#region ../packages/trackers/dist/src/interval-tracker.js
/**
* A `Tracker` that tracks interval between calls to `mark()`
*/
var IntervalTracker = class extends NumberTracker {
	lastMark = 0;
	mark() {
		if (this.lastMark > 0) this.seen(performance.now() - this.lastMark);
		this.lastMark = performance.now();
	}
};
/**
* Returns a new {@link IntervalTracker} instance. IntervalTracker
* records the interval between each call to `mark`.
*
* ```js
* import { interval } from 'https://unpkg.com/ixfx/dist/trackers.js';
*
* const t = interval();
*
* // Call `mark` to record an interval
* t.mark();
* ...
* t.mark();
*
* // Get average time in milliseconds between calls to `mark`
* t.avg;
*
* // Longest and shortest times are available too...
* t.min / t.max
* ```
*
* Interval tracker can automatically reset after a given number of samples:
*
* ```
* // Reset after 100 samples
* const t = interval({ resetAfterSamples: 100} );
* ```
* @param options Options for tracker
* @returns New interval tracker
*/
const interval = (options) => new IntervalTracker(options);

//#endregion
//#region ../packages/trackers/dist/src/rate-tracker.js
/**
* Tracks the rate of events.
* It's also able to compute the min,max and average interval between events.
*
* @example
* ```js
* const clicks = Trackers.rate();
*
* // Mark when a click happens
* document.addEventListener(`click`, () => clicks.mark());
*
* // Get details
* clicks.perSecond; // How many clicks per second
* clicks.perMinute; // How many clicks per minute
* ```
*
* `timeoutInterval` is a useful option to make the tracker reset
* after some period without `mark()` being called.
*
* Another useful option is `sampleLimit`, which sets an upper bound
* for how many events to track. A smaller value means the results
* will more accurately track, but it might be less smooth.
*
* ```js
* // Eg reset tracker after 5 seconds of inactivity
* const clicks = Trackers.rate({
*  sampleLimit: 10,
*  timeoutInterval: { secs: 5 }
* });
* ```
*/
var RateTracker = class {
	#events = [];
	#fromTime;
	#resetAfterSamples;
	#sampleLimit;
	#resetTimer;
	constructor(opts = {}) {
		this.#resetAfterSamples = opts.resetAfterSamples ?? Number.MAX_SAFE_INTEGER;
		this.#sampleLimit = opts.sampleLimit ?? Number.MAX_SAFE_INTEGER;
		if (opts.timeoutInterval) this.#resetTimer = timeout(() => {
			this.reset();
		}, opts.timeoutInterval);
		this.#fromTime = performance.now();
	}
	/**
	* Mark that an event has happened
	*/
	mark() {
		if (this.#events.length >= this.#resetAfterSamples) this.reset();
		else if (this.#events.length >= this.#sampleLimit) {
			this.#events = this.#events.slice(1);
			this.#fromTime = this.#events[0];
		}
		this.#events.push(performance.now());
		if (this.#resetTimer) this.#resetTimer.start();
	}
	/**
	* Compute {min,max,avg} for the interval _between_ events.
	* @returns
	*/
	computeIntervals() {
		const intervals = [];
		let min = Number.MAX_SAFE_INTEGER;
		let max = Number.MIN_SAFE_INTEGER;
		let total = 0;
		let count = 0;
		let start = 0;
		for (const event of this.#events) {
			if (count > 0) {
				const index = event - start;
				min = Math.min(index, min);
				max = Math.max(index, max);
				total += index;
				intervals.push(index);
			}
			start = event;
			count++;
		}
		const avg = total / count;
		return {
			min,
			max,
			avg
		};
	}
	/**
	* Returns the time period (in milliseconds) that encompasses
	* the data set. Eg, a result of 1000 means there's data that
	* covers a one second period.
	*/
	get elapsed() {
		return performance.now() - this.#fromTime;
	}
	/**
	* Resets the tracker.
	*/
	reset() {
		this.#events = [];
		this.#fromTime = performance.now();
	}
	/**
	* Get the number of events per second
	*/
	get perSecond() {
		return this.#events.length / (this.elapsed / 1e3);
	}
	/**
	* Get the number of events per minute
	*/
	get perMinute() {
		return this.#events.length / (this.elapsed / 1e3 / 60);
	}
};
/**
* @inheritdoc RateTracker
* @param opts
* @returns
*/
const rate = (opts = {}) => new RateTracker(opts);

//#endregion
//#region src/trackers.ts
var trackers_exports = {};
__export(trackers_exports, {
	FrequencyTracker: () => FrequencyTracker,
	IntervalTracker: () => IntervalTracker,
	NumberTracker: () => NumberTracker,
	RateTracker: () => RateTracker,
	frequency: () => frequency,
	interval: () => interval,
	number: () => number,
	rate: () => rate
});

//#endregion
export { FrequencyTracker, IntervalTracker, NumberTracker, RateTracker, frequency, interval, number, rate, trackers_exports };
//# sourceMappingURL=trackers-9yKhazeW.js.map