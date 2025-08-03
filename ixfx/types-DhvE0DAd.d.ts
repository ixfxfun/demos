//#region ../numbers/dist/src/types.d.ts
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
}>;
//#endregion
export { NumbersComputeOptions, NumbersComputeResult };
//# sourceMappingURL=types-DhvE0DAd.d.ts.map