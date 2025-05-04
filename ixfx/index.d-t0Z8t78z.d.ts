import { __export } from "./chunk-Cl8Af3a2.js";
import { HasCompletion$1 as HasCompletion } from "./continuously.d-C9cM_pH3.js";
import { Interval$1 as Interval } from "./types.d-BUgZkBcs.js";
import { Point } from "./point-type.d-DNIvmHt0.js";

//#region ../packages/modulation/dist/src/types.d.ts
type ModSettableOptions = {
  /**
   * Starting absolute value of source.
   */
  startAt: number;
  /**
   * Starting relative value of source (eg 0.5 for 50%)
   */
  startAtRelative: number;
  /**
   * If set, determines how many cycles. By default unlimited.
   * Use 1 for example for a one-shot wave.
   */
  cycleLimit: number;
};
type ModSettableFeedback = {
  /**
   * If set, resets absolute position of clock
   */
  resetAt: number;
  /**
   * If set, resets relative position of clock
   */
  resetAtRelative: number;
};
type ModSettable = (feedback?: Partial<ModSettableFeedback>) => number; /**
                                                                        * A mod source returns numbers on a 0..1 scale.
                                                                        * Usually invoked just a function, some sources also support
                                                                        * 'feedback' allowing source to be adjusted dynamically.
                                                                        *
                                                                        * See Modulation.Sources for more.
                                                                        */

type ModSource = (feedback?: any) => number; /**
                                             * A function that modulates `v`.
                                             *
                                             * Example modulators:
                                             * * {@link wave}: Generate different wave shapes
                                             * * Raw access to waves: {@link arcShape}, {@link sineShape},{@link sineBipolarShape}, {@link triangleShape}, {@link squareShape}
                                             * * {@link Easings}: Easing functions
                                             * * {@link springShape}: Spring
                                             */

type ModulationFunction = (v: number) => number;
type ModulatorTimed = HasCompletion & {
  /**
   * Computes the current value of the easing
   *
   * @returns {number}
   */
  compute(): number;
  /**
   * Reset the easing
   */
  reset(): void;
  /**
   * Returns true if the easing is complete
   *
   * @returns {boolean}
   */
  get isDone(): boolean;
};
type SpringOptions = Partial<{
  /**
   * How much 'weight' the spring has.
   * Favour adjusting 'damping' or 'stiffness' before changing mass.
   * Default: 1
   */
  readonly mass: number;
  /**
   * Absorbs the energy, acting as a kind of friction. Helps
   * to avoid oscillations where the spring doesn't 'end'
   * Default: 10
   */
  readonly damping: number;
  /**
   * How bouncy the spring is
   * Default: 100
   */
  readonly stiffness: number;
  /**
   * Default: false
   */
  readonly soft: boolean;
  /**
   * Default: 0.1
   */
  readonly velocity: number;
  /**
   * How many iterations to wait for spring settling. Longer values may be
   * needed if it seems the spring gets prematurely cut off.
   * Default: 10
   */
  readonly countdown: number;
}>; //#endregion
//#region ../packages/modulation/dist/src/easing/easings-named.d.ts
declare namespace easings_named_d_exports {
  export { arch, backIn, backInOut, backOut, bell, bounceIn, bounceInOut, bounceOut, circIn, circInOut, circOut, cubicIn, cubicOut, elasticIn, elasticInOut, elasticOut, expoIn, expoInOut, expoOut, quadIn, quadInOut, quadOut, quartIn, quartOut, quintIn, quintInOut, quintOut, sineIn, sineInOut, sineOut, smootherstep, smoothstep };
}
declare const bounceOut: (x: number) => number;
declare const quintIn: (x: number) => number;
declare const quintOut: (x: number) => number;
declare const arch: (x: number) => number;
declare const smoothstep: (x: number) => number;
declare const smootherstep: (x: number) => number;
declare const sineIn: (x: number) => number;
declare const sineOut: (x: number) => number;
declare const quadIn: (x: number) => number;
declare const quadOut: (x: number) => number;
declare const sineInOut: (x: number) => number;
declare const quadInOut: (x: number) => number;
declare const cubicIn: (x: number) => number;
declare const cubicOut: (x: number) => number;
declare const quartIn: (x: number) => number;
declare const quartOut: (x: number) => number;
declare const expoIn: (x: number) => number;
declare const expoOut: (x: number) => number;
declare const quintInOut: (x: number) => number;
declare const expoInOut: (x: number) => number;
declare const circIn: (x: number) => number;
declare const circOut: (x: number) => number;
declare const backIn: (x: number) => number;
declare const backOut: (x: number) => number;
declare const circInOut: (x: number) => number;
declare const backInOut: (x: number) => number;
declare const elasticIn: (x: number) => number;
declare const elasticOut: (x: number) => number;
declare const bounceIn: (x: number) => number;
declare const bell: (t: number) => number;
declare const elasticInOut: (x: number) => number;
declare const bounceInOut: (x: number) => number;

//#endregion
//#region ../packages/modulation/dist/src/easing/line.d.ts
/**
* Interpolates points along a line.
* By default it's a straight line, so use `bend` to make a non-linear curve.
* @param bend -1...1. -1 will pull line up, 1 will push it down.
* @returns
*/
declare const line: (bend?: number, warp?: number) => (value: number) => Point;

//#endregion
//#region ../packages/modulation/dist/src/easing/types.d.ts
/**
* Easing name
*/
type EasingName = keyof typeof easings_named_d_exports;
type EasingOptions = (EasingTickOptions | EasingTimeOptions) & {
  name?: EasingName;
  fn?: ModulationFunction;
};
type EasingTimeOptions = {
  duration: Interval;
};
type EasingTickOptions = {
  ticks: number;
};

//#endregion
//#region ../packages/modulation/dist/src/easing/index.d.ts
declare namespace index_d_exports {
  export { EasingName, EasingOptions, EasingTickOptions, EasingTimeOptions, easings_named_d_exports as Named, create, get, getEasingNames, line, tickEasing, ticks, time, timeEasing };
}
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
declare const create: (options: EasingOptions) => () => number;

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
declare const timeEasing: (nameOrFunction: EasingName | ((v: number) => number), duration: Interval) => ModulatorTimed;

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
declare const time: (nameOrFunction: EasingName | ((v: number) => number), duration: Interval) => () => number;

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
declare const ticks: (nameOrFunction: EasingName | ((v: number) => number), totalTicks: number) => () => number;

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
declare const tickEasing: (nameOrFunction: EasingName | ((v: number) => number), durationTicks: number) => ModulatorTimed;

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
declare const get: (easingName: EasingName) => ModulationFunction;

/**
* Iterate over available easings.
* @private
* @returns Returns list of available easing names
*/
declare function getEasingNames(): Iterable<string>;

//#endregion
export { EasingName, EasingOptions, EasingTickOptions, EasingTimeOptions, ModSettable, ModSettableFeedback, ModSettableOptions, ModSource, ModulationFunction, ModulatorTimed, SpringOptions, create as create$3, easings_named_d_exports, get as get$1, getEasingNames as getEasingNames$1, index_d_exports as index_d_exports$22, line as line$1, tickEasing as tickEasing$1, ticks as ticks$3, time as time$3, timeEasing as timeEasing$1 };
//# sourceMappingURL=index.d-t0Z8t78z.d.ts.map