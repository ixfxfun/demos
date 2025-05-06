import { integerTest$2 as integerTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-D3QR_A5v.js";
import { TrackerBase } from "./tracker-base-4Fqhp-ju.js";

//#region ../packages/numbers/src/quantise.ts
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
export { ObjectTracker, quantiseEvery as quantiseEvery$2 };
//# sourceMappingURL=object-tracker-BbrrYIJz.js.map