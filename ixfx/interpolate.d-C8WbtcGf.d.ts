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
*/type BasicInterpolateOptions = {
  limits: `clamp` | `wrap` | `ignore`;
  transform: (v: number) => number;
}; //#endregion
export { BasicInterpolateOptions as BasicInterpolateOptions$1 };
//# sourceMappingURL=interpolate.d-C8WbtcGf.d.ts.map