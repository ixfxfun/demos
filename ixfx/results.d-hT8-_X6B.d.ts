//#region ../packages/core/src/results.d.ts
type ResultOk<T> = {
  success: true;
  value: T;
};
type ResultError = {
  success: false;
  error: Error | string;
};
type Result<T> = ResultOk<T> | ResultError;

//#endregion
export { Result as Result$2 };
//# sourceMappingURL=results.d-hT8-_X6B.d.ts.map