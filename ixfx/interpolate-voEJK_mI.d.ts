//#region ../packages/numbers/src/interpolate.d.ts
/**
 * Interpolation options.
 *
 * Limit: What to do if interpolation amount exceeds 0..1 range
 * * clamp: lock to A & B (inclusive) Default.
 * * wrap: wrap from end to start again
 * * ignore: allow return values outside of A..B range
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
type BasicInterpolateOptions = {
  limits: `clamp` | `wrap` | `ignore`;
  transform: (v: number) => number;
}; //#endregion
/**
 * Returns an interpolation function with a fixed interpolation amount. This
 * function will need the A and B values to interpolate between (ie start and end)
 *
 * Interpolation amount is usually 0..1, where 0 will return the A value, 1 will return the B value, 0.5 will be halfway between the two etc.
 *
 * ```js
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
export { BasicInterpolateOptions as BasicInterpolateOptions$1 };
//# sourceMappingURL=interpolate-voEJK_mI.d.ts.map