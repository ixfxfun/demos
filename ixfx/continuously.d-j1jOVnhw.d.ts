//#region ../packages/core/src/continuously.d.ts
type HasCompletionRunStates = `idle` | `scheduled` | `running`;
type HasCompletion = {
  /**
   * Gets the current run state
   * idle: not yet started or completed with no future run scheduled
   * scheduled: waiting to run
   * running: currently executing its callback
   */
  get runState(): HasCompletionRunStates;
  /**
   * Returns the number of times the scheduled function
   * has been executed.
   *
   * This number will be reset in some conditions.
   * For example `continuously` resets it when the loop stops.
   *
   * Use {@link startCountTotal} to track total number.
   */
  get startCount(): number;
  /**
   * Total number of times scheduled function has been
   * executed.
   */
  get startCountTotal(): number;
}; //#endregion
export { HasCompletion as HasCompletion$1 };
//# sourceMappingURL=continuously.d-j1jOVnhw.d.ts.map