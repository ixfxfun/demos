//#region ../packages/numbers/src/types.d.ts
type NumbersComputeResult = {
  /**
   * Tally of number of items
   */
  readonly count: number;
  /**
   * Smallest value in array
   */
  readonly min: number;
  /**
   * Total of all items
   */
  readonly total: number;
  /**
   * Largest value in array
   */
  readonly max: number;
  /**
   * Average value in array
   */
  readonly avg: number;
};
type NumbersComputeOptions = Readonly<{
  /**
   * Start index, inclusive
   */
  /**
   * End index, exclusive
   */
  nonNumbers?: `throw` | `ignore` | `nan`;
}>; //#endregion
export { NumbersComputeOptions as NumbersComputeOptions$1, NumbersComputeResult as NumbersComputeResult$1 };
//# sourceMappingURL=types.d-qUNje-Gp.d.ts.map