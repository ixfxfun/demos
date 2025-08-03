//#region ../process/dist/src/basic.js
/**
* Outputs the current largest-seen value
* @returns
*/
const max = () => {
	let max$1 = Number.MIN_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			max$1 = Math.max(subValue, max$1);
		}
		return max$1;
	};
	return compute;
};
/**
* Outputs the current smallest-seen value
* @returns
*/
const min = () => {
	let min$1 = Number.MAX_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			min$1 = Math.min(subValue, min$1);
		}
		return min$1;
	};
	return compute;
};
/**
* Returns a sum of values
* @returns
*/
const sum = () => {
	let t = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			t += subValue;
		}
		return t;
	};
	return compute;
};
/**
* Returns the current average of input values
* @returns
*/
const average = () => {
	let total = 0;
	let tally$1 = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			tally$1++;
			total += subValue;
		}
		return total / tally$1;
	};
	return compute;
};
/**
* Returns the tally (ie number of) values
* @param countArrayItems
* @returns
*/
const tally = (countArrayItems) => {
	let t = 0;
	const compute = (value) => {
		if (countArrayItems) if (Array.isArray(value)) t += value.length;
		else t++;
		else t++;
		return t;
	};
	return compute;
};
/**
* Returns the 'best' value seen so far as determined by a ranking function.
* This is similar to min/max but usable for objects.
* @param r
* @param options
* @returns
*/
function rank(r, options = {}) {
	const includeType = options.includeType;
	const emitEqualRanked = options.emitEqualRanked ?? false;
	const emitRepeatHighest = options.emitRepeatHighest ?? false;
	let best;
	return (value) => {
		if (includeType && typeof value !== includeType) return;
		if (best === void 0) {
			best = value;
			return best;
		} else {
			const result = r(value, best);
			if (result == `a`) {
				best = value;
				return best;
			} else if (result === `eq` && emitEqualRanked) return best;
			else if (emitRepeatHighest) return best;
		}
	};
}

//#endregion
export { average, max, min, rank, sum, tally };
//# sourceMappingURL=basic-Igpk8-Sv.js.map