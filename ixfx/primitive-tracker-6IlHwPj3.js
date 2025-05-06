import { TrackerBase } from "./tracker-base-4Fqhp-ju.js";

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
export { PrimitiveTracker };
//# sourceMappingURL=primitive-tracker-6IlHwPj3.js.map