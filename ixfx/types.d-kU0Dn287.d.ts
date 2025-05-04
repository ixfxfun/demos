//#region ../packages/guards/src/types.d.ts

type ResultOk<TValue> = {
  success: true;
  value: TValue;
};
type ResultError<TError> = {
  success: false;
  error: TError;
};
type Result<TValue, TError> = ResultOk<TValue> | ResultError<TError>; //#endregion
export { Result as Result$1 };
//# sourceMappingURL=types.d-kU0Dn287.d.ts.map