import { __export } from "./chunk-Cl8Af3a2.js";
import { resultThrow$2 as resultThrow } from "./numbers-Dp7VYKrL.js";
import { stringTest$2 as stringTest } from "./string-DqK_2HRh.js";
import { intervalToMs$2 as intervalToMs } from "./interval-type-ClgeI-0m.js";
import { clamp$2 as clamp } from "./clamp-BOARHdp2.js";
import { scale$2 as scale } from "./scale-CVf5ebky.js";
import { guard$2 as guard, guardDim } from "./guard-Bfaw8dgv.js";
import { Empty, Unit, interpolate$7 as interpolate, isCubicBezier, isQuadraticBezier } from "./guard-Cj5WJcAi.js";
import { Bezier } from "./bezier-CYltapF4.js";

//#region ../packages/guards/src/function.ts
const functionTest = (value, parameterName = `?`) => {
	if (value === void 0) return {
		success: false,
		error: `Param '${parameterName}' is undefined. Expected: function.`
	};
	if (value === null) return {
		success: false,
		error: `Param '${parameterName}' is null. Expected: function.`
	};
	if (typeof value !== `function`) return {
		success: false,
		error: `Param '${parameterName}' is type '${typeof value}'. Expected: function`
	};
	return {
		success: true,
		value
	};
};

//#endregion
//#region ../packages/geometry/src/point/interpolate.ts
/**
* Returns a relative point between two points
* ```js
* interpolate(0.5, a, b); // Halfway point between a and b
* ```
*
* Alias for Lines.interpolate(amount, a, b);
*
* @param amount Relative amount, 0-1
* @param a
* @param b
* @param allowOverflow If true, length of line can be exceeded for `amount` of below 0 and above `1`.
* @returns {@link Point}
*/
const interpolate$1 = (amount, a, b, allowOverflow = false) => interpolate(amount, a, b, allowOverflow);

//#endregion
//#region ../packages/geometry/src/rect/from-top-left.ts
/**
* Creates a rectangle from its top-left coordinate, a width and height.
*
* ```js
* import { Rects } from "https://unpkg.com/ixfx/dist/geometry.js";
*
* // Rectangle at 50,50 with width of 100, height of 200.
* const rect = Rects.fromTopLeft({ x: 50, y:50 }, 100, 200);
* ```
* @param origin
* @param width
* @param height
* @returns
*/
const fromTopLeft = (origin, width, height) => {
	guardDim(width, `width`);
	guardDim(height, `height`);
	guard(origin, `origin`);
	return {
		x: origin.x,
		y: origin.y,
		width,
		height
	};
};

//#endregion
//#region ../packages/geometry/src/bezier/index.ts
/**
* Returns a new quadratic bezier with specified bend amount
*
* @param {QuadraticBezier} b Curve
* @param {number} [bend=0] Bend amount, from -1 to 1
* @returns {QuadraticBezier}
*/
/**
* Creates a simple quadratic bezier with a specified amount of 'bend'.
* Bend of -1 will pull curve down, 1 will pull curve up. 0 is no curve.
* 
* Use {@link interpolator} to calculate a point along the curve.
* @param {Point} start Start of curve
* @param {Point} end End of curve
* @param {number} [bend=0] Bend amount, -1 to 1
* @returns {QuadraticBezier}
*/
const quadraticSimple = (start, end, bend = 0) => {
	if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
	if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
	const middle = interpolate(.5, start, end);
	let target = middle;
	if (end.y < start.y) target = bend > 0 ? {
		x: Math.min(start.x, end.x),
		y: Math.min(start.y, end.y)
	} : {
		x: Math.max(start.x, end.x),
		y: Math.max(start.y, end.y)
	};
	else target = bend > 0 ? {
		x: Math.max(start.x, end.x),
		y: Math.min(start.y, end.y)
	} : {
		x: Math.min(start.x, end.x),
		y: Math.max(start.y, end.y)
	};
	const handle = interpolate(Math.abs(bend), middle, target);
	return quadratic(start, end, handle);
};
/**
* Returns a relative point on a simple quadratic 
* @param start Start
* @param end  End
* @param bend Bend (-1 to 1)
* @param amt Amount
* @returns Point
*/
/**
* Interpolate cubic or quadratic bezier
* ```js
* const i = interpolator(myBezier);
* 
* // Get point at 50%
* i(0.5); // { x, y }
* ```
* @param q 
* @returns 
*/
const interpolator = (q) => {
	const bzr = isCubicBezier(q) ? new Bezier(q.a.x, q.a.y, q.cubic1.x, q.cubic1.y, q.cubic2.x, q.cubic2.y, q.b.x, q.b.y) : new Bezier(q.a, q.quadratic, q.b);
	return (amount) => bzr.compute(amount);
};
const quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
const toPath = (cubicOrQuadratic) => {
	if (isCubicBezier(cubicOrQuadratic)) return cubicToPath(cubicOrQuadratic);
	else if (isQuadraticBezier(cubicOrQuadratic)) return quadratictoPath(cubicOrQuadratic);
	else throw new Error(`Unknown bezier type`);
};
const cubic = (start, end, cubic1, cubic2) => ({
	a: Object.freeze(start),
	b: Object.freeze(end),
	cubic1: Object.freeze(cubic1),
	cubic2: Object.freeze(cubic2)
});
const cubicToPath = (cubic$1) => {
	const { a, cubic1, cubic2, b } = cubic$1;
	const bzr = new Bezier(a, cubic1, cubic2, b);
	return Object.freeze({
		...cubic$1,
		length: () => bzr.length(),
		interpolate: (t) => bzr.compute(t),
		nearest: (_) => {
			throw new Error(`not implemented`);
		},
		bbox: () => {
			const { x, y } = bzr.bbox();
			const xSize = x.size;
			const ySize = y.size;
			if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
			if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
			return fromTopLeft({
				x: x.min,
				y: y.min
			}, xSize, ySize);
		},
		relativePosition: (_point, _intersectionThreshold) => {
			throw new Error(`Not implemented`);
		},
		distanceToPoint: (_point) => {
			throw new Error(`Not implemented`);
		},
		toSvgString: () => [`brrup`],
		kind: `bezier/cubic`
	});
};
const quadratic = (start, end, handle) => ({
	a: Object.freeze(start),
	b: Object.freeze(end),
	quadratic: Object.freeze(handle)
});
const quadratictoPath = (quadraticBezier) => {
	const { a, b, quadratic: quadratic$1 } = quadraticBezier;
	const bzr = new Bezier(a, quadratic$1, b);
	return Object.freeze({
		...quadraticBezier,
		length: () => bzr.length(),
		interpolate: (t) => bzr.compute(t),
		nearest: (_) => {
			throw new Error(`not implemented`);
		},
		bbox: () => {
			const { x, y } = bzr.bbox();
			const xSize = x.size;
			const ySize = y.size;
			if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
			if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
			return fromTopLeft({
				x: x.min,
				y: y.min
			}, xSize, ySize);
		},
		distanceToPoint: (_point) => {
			throw new Error(`Not implemented`);
		},
		relativePosition: (_point, _intersectionThreshold) => {
			throw new Error(`Not implemented`);
		},
		toString: () => bzr.toString(),
		toSvgString: () => quadraticToSvgString(a, b, quadratic$1),
		kind: `bezier/quadratic`
	});
};

//#endregion
//#region ../packages/flow/src/timer.ts
/**
* Returns a function that returns the percentage of timer completion.
* Starts when return function is first invoked.
*
* ```js
* import * as Flow from "https://unpkg.com/ixfx/dist/flow.js"
* const timer = Flow.ofTotal(1000);
* 
* // Call timer() to find out the completion
* timer(); // Returns 0..1
* ```
*
* Note that timer can exceed 1 (100%). To cap it:
* ```js
* Flow.ofTotal(1000, { clampValue: true });
* ```
*
* Takes an {@link Interval} for more expressive time:
* ```js
* const timer = Flow.ofTotal({ mins: 4 });
* ```
* 
* Is a simple wrapper around {@link relative}.
* @param duration
* @see {@link ofTotalTicks} - Use ticks instead of time
* @see {@link hasElapsed} - Simple _true/false_ if interval has elapsed
* @returns
*/
function ofTotal(duration, opts = {}) {
	const totalMs = intervalToMs(duration);
	if (!totalMs) throw new Error(`Param 'duration' not valid`);
	const timerOpts = {
		...opts,
		timer: elapsedMillisecondsAbsolute()
	};
	let t;
	return () => {
		t ??= relative(totalMs, timerOpts);
		return t.elapsed;
	};
}
/**
* Returns a function that returns the percentage (0..1) of timer completion.
* Uses 'ticks' as a measure. Use {@link ofTotal} if you want time-based.
*
* ```js
* import * as Flow from "https://unpkg.com/ixfx/dist/flow.js"
* const timer = Flow.ofTotalTicks(1000);
* timer(); // Returns 0..1
* ```
*
* Note that timer can exceed 1 (100%). To cap it:
* ```js
* Flow.ofTotalTicks(1000, { clampValue: true });
* ```
*
* This is a a simple wrapper around {@link relative}.
* @see {@link ofTotal}
* @see {@link hasElapsed}: Simple _true/false_ if interval has elapsed
* @param totalTicks
* @returns
*/
function ofTotalTicks(totalTicks, opts = {}) {
	const timerOpts = {
		...opts,
		timer: elapsedTicksAbsolute()
	};
	let t;
	return () => {
		t ??= relative(totalTicks, timerOpts);
		return t.elapsed;
	};
}
/**
* Returns a {@link ModulationTimer} that is always at 100%.
* Opposite: {@link timerNeverDone}.
* @returns 
*/
const timerAlwaysDone = () => ({
	elapsed: 1,
	isDone: true,
	reset() {},
	mod(amt) {}
});
/**
* Returns a {@link ModulationTimer} that is always at 0%.
* Opposite: {@link timerAlwaysDone}.
* @returns 
*/
const timerNeverDone = () => ({
	elapsed: 0,
	isDone: false,
	reset() {},
	mod() {}
});
/**
* Wraps a timer, returning a relative elapsed value based on
* a given total. ie. percentage complete toward a total value.
* This is useful because other parts of code don't need to know
* about the absolute time values, you get a nice relative completion number.
*
* If no timer is specified, a milliseconds-based timer is used.
*
* ```js
* const t = relative(1000);
* t.elapsed;   // returns % completion (0...1)
* ```
* It can also use a tick based timer
* ```js
* // Timer that is 'done' at 100 ticks
* const t = relative(100, { timer: ticksElapsedTimer() });
* ```
* 
* Additional fields/methods on the timer instance
* ```js
* t.isDone;  // _true_ if .elapsed has reached (or exceeded) 1
* t.reset(); // start from zero again
* ```
*
* Options:
* * timer: timer to use. If not specified, `elapsedMillisecondsAbsolute()` is used.
* * clampValue: if _true_, return value is clamped to 0..1 (default: _false_)
* * wrapValue: if _true_, return value wraps around continously from 0..1..0 etc. (default: _false_)
* 
* Note that `clampValue` and `wrapValue` are mutually exclusive: only one can be _true_, but both can be _false_.
* 
* With options
* ```js
* // Total duration of 1000 ticks
* const t = Timer.relative(1000, { timer: ticksElapsedTimer(); clampValue:true });
* ```
*
* If `total` is Infinity, a 'always completed; timer is returned. Use a value of `NaN` for a
* timer that always returns 0.
* @private
* @param total Total (of milliseconds or ticks, depending on timer source)
* @param options Options
* @returns Timer
*/
const relative = (total, options = {}) => {
	if (!Number.isFinite(total)) return timerAlwaysDone();
	else if (Number.isNaN(total)) return timerNeverDone();
	const clampValue = options.clampValue ?? false;
	const wrapValue = options.wrapValue ?? false;
	if (clampValue && wrapValue) throw new Error(`clampValue and wrapValue cannot both be enabled`);
	let modulationAmount = 1;
	const timer = options.timer ?? elapsedMillisecondsAbsolute();
	let lastValue = 0;
	const computeElapsed = (value) => {
		lastValue = value;
		let v = value / (total * modulationAmount);
		if (clampValue) v = clamp(v);
		else if (wrapValue && v >= 1) v = v % 1;
		return v;
	};
	return {
		mod(amt) {
			modulationAmount = amt;
		},
		get isDone() {
			return computeElapsed(lastValue) >= 1;
		},
		get elapsed() {
			return computeElapsed(timer.elapsed);
		},
		reset: () => {
			timer.reset();
		}
	};
};
/**
* A timer based on frequency: cycles per unit of time. These timers return a number from
* 0..1 indicating position with a cycle.
*
* In practice, timers are used to 'drive' something like an Oscillator.
*
* By default it uses elapsed clock time as a basis for frequency. ie., cycles per second.
*
* It returns a `ModulationTimer`, which allows for a modulation amount to be continually applied
* to the calculation of the 'position' within a cycle.
*
* @example Prints around 0/0.5 each second, as timer is half a cycle per second
* ```js
* import { frequencyTimer } from "https://unpkg.com/ixfx/dist/flow.js"
* const t = frequencyTimer(0.5);
* setInterval(() => {
*  console.log(t.elapsed);
* }, 1000);
* ```
* @param frequency Cycles
* @param options Options for timer
* @returns
*/
const frequencyTimer = (frequency, options = {}) => {
	const timer = options.timer ?? elapsedMillisecondsAbsolute();
	const cyclesPerSecond = frequency / 1e3;
	let modulationAmount = 1;
	const computeElapsed = () => {
		const v = timer.elapsed * (cyclesPerSecond * modulationAmount);
		const f = v - Math.floor(v);
		if (f < 0) throw new Error(`Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`);
		if (f > 1) throw new Error(`Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`);
		return f;
	};
	return {
		mod: (amt) => {
			modulationAmount = amt;
		},
		reset: () => {
			timer.reset();
		},
		get isDone() {
			return computeElapsed() >= 1;
		},
		get elapsed() {
			return computeElapsed();
		}
	};
};
/**
* A timer that uses clock time. Start time is from the point of invocation.
*
* ```js
* const t = elapsedMillisecondsAbsolute();
* t.reset(); // reset start
* t.elapsed; // milliseconds since start
* ```
* @returns {Timer}
* @see {ticksElapsedTimer}
*/
const elapsedMillisecondsAbsolute = () => {
	let start = performance.now();
	return {
		reset: () => {
			start = performance.now();
		},
		get elapsed() {
			return performance.now() - start;
		}
	};
};
/**
* A timer that progresses with each call to `elapsed`.
*
* The first call to elapsed will return 1.
*
* ```js
* const timer = elapsedTicksAbsolute();
* timer.reset(); // Reset to 0
* timer.elapsed; // Number of ticks (and also increment ticks)
* timer.peek;    // Number of ticks (without incrementing)
* ```
* 
* Like other {@link Timer} functions, returns with a `isDone` field,
* but this will always return _true_.
* @returns {Timer}
* @see {elapsedMillisecondsAbsolute}
*/
const elapsedTicksAbsolute = () => {
	let start = 0;
	return {
		reset: () => {
			start = 0;
		},
		get peek() {
			return start;
		},
		get elapsed() {
			return ++start;
		}
	};
};
/**
* Wraps `timer`, computing a value based on its elapsed value.
* `fn` creates this value.
* 
* ```js
* const t = timerWithFunction(v=>v/2, relativeTimer(1000));
* t.compute();
* ```
* 
* In the above case, `relativeTimer(1000)` creates a timer that goes
* from 0..1 over one second. `fn` will divide that value by 2, so
* `t.compute()` will yield values 0..0.5.
* 
* @param fn 
* @param timer 
* @returns 
*/
const timerWithFunction = (fn, timer) => {
	if (typeof fn !== `function`) throw new Error(`Param 'fn' should be a function. Got: ${typeof fn}`);
	let startCount = 1;
	return {
		get elapsed() {
			return timer.elapsed;
		},
		get isDone() {
			return timer.isDone;
		},
		get runState() {
			if (timer.isDone) return `idle`;
			return `scheduled`;
		},
		get startCount() {
			return startCount;
		},
		get startCountTotal() {
			return startCount;
		},
		compute: () => {
			const elapsed = timer.elapsed;
			return fn(elapsed);
		},
		reset: () => {
			timer.reset();
			startCount++;
		}
	};
};

//#endregion
//#region ../packages/modulation/dist/src/gaussian.js
const pow$1 = Math.pow;
const gaussianA = 1 / Math.sqrt(2 * Math.PI);
/**
* Returns a roughly gaussian easing function
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const fn = Easings.gaussian();
* ```
*
* Try different positive and negative values for `stdDev` to pinch
* or flatten the bell shape.
* @param standardDeviation
* @returns
*/
const gaussian = (standardDeviation = .4) => {
	const mean = .5;
	return (t) => {
		const f = gaussianA / standardDeviation;
		let p = -2.5;
		let c = (t - mean) / standardDeviation;
		c *= c;
		p *= c;
		const v = f * pow$1(Math.E, p);
		if (v > 1) return 1;
		if (v < 0) return 0;
		return v;
	};
};

//#endregion
//#region ../packages/modulation/dist/src/easing/easings-named.js
var easings_named_exports = {};
__export(easings_named_exports, {
	arch: () => arch,
	backIn: () => backIn,
	backInOut: () => backInOut,
	backOut: () => backOut,
	bell: () => bell,
	bounceIn: () => bounceIn,
	bounceInOut: () => bounceInOut,
	bounceOut: () => bounceOut,
	circIn: () => circIn,
	circInOut: () => circInOut,
	circOut: () => circOut,
	cubicIn: () => cubicIn,
	cubicOut: () => cubicOut,
	elasticIn: () => elasticIn,
	elasticInOut: () => elasticInOut,
	elasticOut: () => elasticOut,
	expoIn: () => expoIn,
	expoInOut: () => expoInOut,
	expoOut: () => expoOut,
	quadIn: () => quadIn,
	quadInOut: () => quadInOut,
	quadOut: () => quadOut,
	quartIn: () => quartIn,
	quartOut: () => quartOut,
	quintIn: () => quintIn,
	quintInOut: () => quintInOut,
	quintOut: () => quintOut,
	sineIn: () => sineIn,
	sineInOut: () => sineInOut,
	sineOut: () => sineOut,
	smootherstep: () => smootherstep,
	smoothstep: () => smoothstep
});
const sqrt = Math.sqrt;
const pow = Math.pow;
const cos = Math.cos;
const pi = Math.PI;
const sin = Math.sin;
const bounceOut = (x) => {
	const n1 = 7.5625;
	const d1 = 2.75;
	if (x < 1 / d1) return n1 * x * x;
	else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + .75;
	else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + .9375;
	else return n1 * (x -= 2.625 / d1) * x + .984375;
};
const quintIn = (x) => x * x * x * x * x;
const quintOut = (x) => 1 - pow(1 - x, 5);
const arch = (x) => x * (1 - x) * 4;
const smoothstep = (x) => x * x * (3 - 2 * x);
const smootherstep = (x) => (x * (x * 6 - 15) + 10) * x * x * x;
const sineIn = (x) => 1 - cos(x * pi / 2);
const sineOut = (x) => sin(x * pi / 2);
const quadIn = (x) => x * x;
const quadOut = (x) => 1 - (1 - x) * (1 - x);
const sineInOut = (x) => -(cos(pi * x) - 1) / 2;
const quadInOut = (x) => x < .5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
const cubicIn = (x) => x * x * x;
const cubicOut = (x) => 1 - pow(1 - x, 3);
const quartIn = (x) => x * x * x * x;
const quartOut = (x) => 1 - pow(1 - x, 4);
const expoIn = (x) => x === 0 ? 0 : pow(2, 10 * x - 10);
const expoOut = (x) => x === 1 ? 1 : 1 - pow(2, -10 * x);
const quintInOut = (x) => x < .5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
const expoInOut = (x) => x === 0 ? 0 : x === 1 ? 1 : x < .5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
const circIn = (x) => 1 - sqrt(1 - pow(x, 2));
const circOut = (x) => sqrt(1 - pow(x - 1, 2));
const backIn = (x) => {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return c3 * x * x * x - c1 * x * x;
};
const backOut = (x) => {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
};
const circInOut = (x) => x < .5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
const backInOut = (x) => {
	const c1 = 1.70158;
	const c2 = c1 * 1.525;
	return x < .5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
const elasticIn = (x) => {
	const c4 = 2 * pi / 3;
	return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
};
const elasticOut = (x) => {
	const c4 = 2 * pi / 3;
	return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - .75) * c4) + 1;
};
const bounceIn = (x) => 1 - bounceOut(1 - x);
const bell = gaussian();
const elasticInOut = (x) => {
	const c5 = 2 * pi / 4.5;
	return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
};
const bounceInOut = (x) => x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;

//#endregion
//#region ../packages/modulation/dist/src/easing/line.js
/**
* Interpolates points along a line.
* By default it's a straight line, so use `bend` to make a non-linear curve.
* @param bend -1...1. -1 will pull line up, 1 will push it down.
* @returns
*/
const line = (bend = 0, warp = 0) => {
	const max = 1;
	const cubicB = {
		x: scale(bend, -1, 1, 0, max),
		y: scale(bend, -1, 1, max, 0)
	};
	let cubicA = interpolate$1(Math.abs(bend), Empty, cubicB);
	if (bend !== 0 && warp > 0) if (bend > 0) cubicA = interpolate$1(warp, cubicA, {
		x: 0,
		y: cubicB.x * 2
	});
	else cubicA = interpolate$1(warp, cubicA, {
		x: cubicB.y * 2,
		y: 0
	});
	const bzr = cubic(Empty, Unit, cubicA, cubicB);
	const inter = interpolator(bzr);
	return (value) => inter(value);
};

//#endregion
//#region ../packages/modulation/dist/src/modulator-timed.js
/**
* Produce values over time. When the modulate function is complete, the final
* value continues to return. Timer starts when return function is first invoked.
*
* ```js
* const fn = (t) => {
*  // 't' will be values 0..1 where 1 represents end of time period.
*  // Return some computed value based on 't'
*  return t*Math.random();
* }
* const e = Modulate.time(fn, 1000);
*
* // Keep calling e() to get the current value
* e();
* ```
* @param fn Modulate function
* @param duration Duration
* @returns
*/
const time$1 = (fn, duration) => {
	resultThrow(functionTest(fn, `fn`));
	let relative$1;
	return () => {
		if (typeof relative$1 === `undefined`) relative$1 = ofTotal(duration, { clampValue: true });
		return fn(relative$1());
	};
};
/**
* Creates an modulator based on clock time. Time
* starts being counted when modulate function is created.
*
* `timeModulator` allows you to reset and check for completion.
* Alternatively, use {@link time} which is a simple function that just returns a value.
*
* @example Time based easing
* ```
* import { timeModulator } from "https://unpkg.com/ixfx/dist/modulation.js";
* const fn = (t) => {
*  // 't' will be a value 0..1 representing time elapsed. 1 being end of period.
*  return t*Math.random();
* }
* const t = timeModulator(fn, 5*1000); // Will take 5 seconds to complete
* ...
* t.compute(); // Get current value of modulator
* t.reset();   // Reset to 0
* t.isDone;    // _True_ if finished
* ```
* @param fn Modulator
* @param duration Duration
* @returns ModulatorTimed
*/
const timeModulator = (fn, duration) => {
	resultThrow(functionTest(fn, `fn`));
	const timer = elapsedMillisecondsAbsolute();
	const durationMs = intervalToMs(duration);
	if (durationMs === void 0) throw new Error(`Param 'duration' not provided`);
	const relativeTimer = relative(durationMs, {
		timer,
		clampValue: true
	});
	return timerWithFunction(fn, relativeTimer);
};
/**
* Produce modulate values with each invocation. When the time is complete, the final
* value continues to return. Timer starts when return function is first invoked.
*
* If you need to check if a modulator is done or reset it, consider {@link tickModulator}.
*
* ```js
* const fn = (t) => {
*  // 't' will be values 0..1 representing elapsed ticks toward totwal
* }
* const e = ticks(fn, 100);
*
* // Keep calling e() to get the current value
* e();
* ```
* @param fn Function that produces 0..1 scale
* @param totalTicks Total length of ticks
* @returns
*/
const ticks$1 = (fn, totalTicks) => {
	resultThrow(functionTest(fn, `fn`));
	let relative$1;
	return () => {
		if (typeof relative$1 === `undefined`) relative$1 = ofTotalTicks(totalTicks, { clampValue: true });
		return fn(relative$1());
	};
};
/**
* Creates an modulator based on ticks.
*
* `tickModulator` allows you to reset and check for completion.
* Alternatively, use {@link ticks} which is a simple function that just returns a value.
*
* @example Tick-based modulator
* ```
* import { tickModulator } from "https://unpkg.com/ixfx/dist/modulation.js";
* const fn = (t) => {
*  // 't' will be values 0..1 based on completion
*  return Math.random() * t;
* }
* const t = tickModulator(fn, 1000);   // Will take 1000 ticks to complete
* t.compute(); // Each call to `compute` progresses the tick count
* t.reset();   // Reset to 0
* t.isDone;    // _True_ if finished
* ```
* @param fn Modulate function that returns 0..1
* @param durationTicks Duration in ticks
* @returns ModulatorTimed
*/
const tickModulator = (fn, durationTicks) => {
	resultThrow(functionTest(fn, `fn`));
	const timer = elapsedTicksAbsolute();
	const relativeTimer = relative(durationTicks, {
		timer,
		clampValue: true
	});
	return timerWithFunction(fn, relativeTimer);
};

//#endregion
//#region ../packages/modulation/dist/src/easing/index.js
var easing_exports = {};
__export(easing_exports, {
	Named: () => easings_named_exports,
	create: () => create,
	get: () => get,
	getEasingNames: () => getEasingNames,
	line: () => line,
	tickEasing: () => tickEasing,
	ticks: () => ticks,
	time: () => time,
	timeEasing: () => timeEasing
});
/**
* Creates an easing function
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const e = Easings.create({ duration: 1000, name: `quadIn` });
* const e = Easings.create({ ticks: 100, name: `sineOut` });
* const e = Easings.create({
*  duration: 1000,
*  fn: (v) => {
*    // v will be 0..1 based on time
*    return Math.random() * v
*  }
* });
* ```
* @param options
* @returns
*/
const create = (options) => {
	const name = resolveEasingName(options.name ?? `quintIn`);
	const fn = name ?? options.fn;
	if (typeof fn === `undefined`) throw new Error(`Either 'name' or 'fn' must be set`);
	if (`duration` in options) return time(fn, options.duration);
	else if (`ticks` in options) return ticks(fn, options.ticks);
	else throw new Error(`Expected 'duration' or 'ticks' in options`);
};
/**
* Creates an easing based on clock time. Time
* starts being counted when easing function is created.
*
* `timeEasing` allows you to reset and check for completion.
* Alternatively, use {@link time} which is a simple function that just returns a value.
*
*
* @example Time based easing
* ```
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const t = Easings.timeEasing(`quintIn`, 5*1000); // Will take 5 seconds to complete
* ...
* t.compute(); // Get current value of easing
* t.reset();   // Reset to 0
* t.isDone;    // _True_ if finished
* ```
*
* Thisi function is just a wrapper around Modulator.timedModulator.
* @param nameOrFunction Name of easing, or an easing function
* @param duration Duration
* @returns Easing
*/
const timeEasing = (nameOrFunction, duration) => {
	const fn = resolveEasingName(nameOrFunction);
	return timeModulator(fn, duration);
};
/**
* Produce easing values over time. When the easing is complete, the final
* value continues to return. Timer starts when return function is first invoked.
*
* If you need to check if an easing is done or reset it, consider {@link timeEasing}.
*
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* // Quad-in easing over one second
* const e = Easings.time(`quadIn`, 1000);
*
* // Keep calling e() to get the current value
* e();
* ```
*
* This function is just a wrapper around Modulate.time
* @param nameOrFunction Easing name or a function that produces 0..1 scale
* @param duration Duration
* @returns
*/
const time = (nameOrFunction, duration) => {
	const fn = resolveEasingName(nameOrFunction);
	return time$1(fn, duration);
};
/**
* Produce easing values with each invocation. When the easing is complete, the final
* value continues to return. Timer starts when return function is first invoked.
*
* If you need to check if an easing is done or reset it, consider {@link tickEasing}.
*
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* // Quad-in easing over 100 ticks
* const e = Easings.ticks(`quadIn`, 100);
*
* // Keep calling e() to get the current value
* e();
* ```
*
* This is just a wrapper around Modulator.ticks
* @param nameOrFunction Easing name or a function that produces 0..1 scale
* @param totalTicks Total length of ticks
* @returns
*/
const ticks = (nameOrFunction, totalTicks) => {
	const fn = resolveEasingName(nameOrFunction);
	return ticks$1(fn, totalTicks);
};
/**
* Creates an easing based on ticks.
*
* `tickEasing` allows you to reset and check for completion.
* Alternatively, use {@link ticks} which is a simple function that just returns a value.
*
* @example Tick-based easing
* ```
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const t = Easings.tickEasing(`sineIn`, 1000);   // Will take 1000 ticks to complete
* t.compute(); // Each call to `compute` progresses the tick count
* t.reset();   // Reset to 0
* t.isDone;    // _True_ if finished
* ```
* @param nameOrFunction Name of easing, or an easing function
* @param durationTicks Duration in ticks
* @returns Easing
*/
const tickEasing = (nameOrFunction, durationTicks) => {
	const fn = resolveEasingName(nameOrFunction);
	return tickModulator(fn, durationTicks);
};
const resolveEasingName = (nameOrFunction) => {
	const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
	if (typeof fn === `undefined`) {
		const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: '${nameOrFunction}'`) : new Error(`Easing function not found`);
		throw error;
	}
	return fn;
};
/**
* Creates a new easing by name
*
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const e = Easings.create(`circInOut`, 1000, elapsedMillisecondsAbsolute);
* ```
* @param nameOrFunction Name of easing, or an easing function
* @param duration Duration (meaning depends on timer source)
* @param timerSource Timer source
* @returns
*/
let easingsMap;
/**
* Returns an easing function by name. Throws an error if
* easing is not found.
*
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const fn = Easings.get(`sineIn`);
* // Returns 'eased' transformation of 0.5
* fn(0.5);
* ```
* @param easingName eg `sineIn`
* @returns Easing function
*/
const get = function(easingName) {
	resultThrow(stringTest(easingName, `non-empty`, `easingName`));
	const found = cacheEasings().get(easingName.toLowerCase());
	if (found === void 0) throw new Error(`Easing not found: '${easingName}'`);
	return found;
};
function cacheEasings() {
	if (easingsMap === void 0) {
		easingsMap = new Map();
		for (const [k, v] of Object.entries(easings_named_exports)) easingsMap.set(k.toLowerCase(), v);
		return easingsMap;
	} else return easingsMap;
}
/**
* Iterate over available easings.
* @private
* @returns Returns list of available easing names
*/
function* getEasingNames() {
	const map = cacheEasings();
	yield* map.keys();
}

//#endregion
export { create as create$2, easing_exports, easings_named_exports, elapsedMillisecondsAbsolute as elapsedMillisecondsAbsolute$2, frequencyTimer as frequencyTimer$2, gaussian as gaussian$3, get, getEasingNames, line, ofTotal as ofTotal$2, quadraticSimple, tickEasing, tickModulator as tickModulator$1, ticks as ticks$1, ticks$1 as ticks$2, time as time$1, time$1 as time$2, timeEasing, timeModulator as timeModulator$1, toPath };
//# sourceMappingURL=easing-Cny8ZkVt.js.map