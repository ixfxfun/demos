import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { E as EasingName } from './index-CVS-IuSd.js';

declare const piPi: number;
/**
 * Interpolation options.
 *
 * Limit: What to do if interpolation amount exceeds 0..1 range
 * * clamp: lock to A & B (inclusive) Default.
 * * wrap: wrap from end to start again
 * * ignore: allow return values outside of A..B range
 *
 * Easing: name of easing function for non-linear interpolation
 *
 * Transform: name of function to transform `amount` prior to interpolate. This is useful for creating non-linear interpolation results.
 *
 * For example:
 * ```js
 * // Divide interpolation amount in half
 * const interpolatorInterval({ mins: 1 }, 10, 100, {
 *  transform: (amount) => amount * Math.random()
 * });
 * ```
 * In the above example, the results would get more random over time.
 * `interpolatorInterval` will still step through the interpolation range of 0..1 in an orderly fashion, but we're transforming that range using a custom function before producing the result.
 *
 */
type InterpolateOptions = {
    limits: `clamp` | `wrap` | `ignore`;
    easing: EasingName;
    transform: (v: number) => number;
};
/**
 * Returns an interpolation function with a fixed interpolation amount. This
 * function will need the A and B values to interpolate between (ie start and end)
 *
 * Interpolation amount is usually 0..1, where 0 will return the A value, 1 will return the B value, 0.5 will be halfway between the two etc.
 *
 * ```js
 * import { interpolate } from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * // Create function
 * const fn = interpolate(0.1);
 *
 * // Later, use to interpolate between a and b
 * fn(50, 100); // 10% of 50..100 range
 * ```
 *
 * This is useful if you have a fixed interpolation amount, but varying A and B values.
 * @param amount Interpolation value (0..1 usually)
 * @param options Options
 */
declare function interpolate(amount: number, options?: Partial<InterpolateOptions>): (a: number, b: number) => number;
/**
 * Interpolates between `a` and `b` by `amount`.
 *
 * Interpolation amount is usually 0..1, where 0 will return the A value, 1 will return the B value, 0.5 will be halfway between the two etc.
 *
 * ```js
 * import { interpolate } from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * // Get the value at 10% of range between 50-100
 * const fn = interpolate(0.1, 50, 100);
 * ```
 *
 * This is useful if you have dynamic interpolation amount as well as A & B values.
 * Consider using `interpolate(amount)` if you have a fixed interpolation amount.
 * @param amount Interpolation value (0..1 usually)
 * @param a Starting value (corresponding to an interpolation of 0)
 * @param b End value (corresponding to an interpolation value of 1)
 * @param options Options
 */
declare function interpolate(amount: number, a: number, b: number, options?: Partial<InterpolateOptions>): number;
/**
 * Returns an interpolation function with a fixed A and B values.
 * The returned function requires an interpolation amount. This is usually 0..1, where 0 will return the A value, 1 will return the B value, 0.5 will be halfway between the two etc.
 *
 * ```js
 * import { interpolate } from 'https://unpkg.com/ixfx/dist/numbers.js';
 *
 * // Create function to interpolate between 50..100
 * const fn = interpolate(50, 100);
 *
 * // Later, use to interpolate
 * fn(0.1); // 10% of 50..100 range
 * ```
 * @param a Starting value (corresponding to an interpolation of 0)
 * @param b End value (corresponding to an interpolation value of 1)
 * @param options Options
 */
declare function interpolate(a: number, b: number, options?: Partial<InterpolateOptions>): (amount: number) => number;
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
declare const interpolatorStepped: (incrementAmount: number, a?: number, b?: number, startInterpolationAt?: number, options?: Partial<InterpolateOptions>) => (retargetB?: number, retargetA?: number) => number;
/**
 * Interpolates between A->B over `duration`.
 * Given the same A & B values, steps will be larger if it's a longer
 * duration, and shorter if it's a smaller duration.
 *
 * A function is returned, which when invoked yields a value between A..B.
 *
 * Alternatively to step through by the same amount regardless
 * of time, use {@link interpolatorStepped}.
 *
 * ```js
 * // Interpolate from 0..1 over one minute
 * const v = interpolatorInterval({mins:1});
 * v(); // Compute current value
 * ```
 *
 * Use start and end points:
 * ```js
 * // Interpolate from 100-200 over 10 seconds
 * const v = interpolatorInterval({secs:10}, 100, 200);
 * v(); // Compute current value
 * ```
 * @param duration Duration for interpolation
 * @param a Start point
 * @param b End point
 * @param options Options for interpolation
 * @returns
 */
declare const interpolatorInterval: (duration: Interval, a?: number, b?: number, options?: Partial<InterpolateOptions>) => (retargetB?: number, retargetA?: number) => number;
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
declare const interpolateAngle: (amount: number, aRadians: number, bRadians: number, options?: Partial<InterpolateOptions>) => number;

export { type InterpolateOptions as I, interpolateAngle as a, interpolatorInterval as b, interpolatorStepped as c, interpolate as i, piPi as p };
