//#region ../guards/dist/src/types.d.ts

type ResultOk<TValue> = {
  success: true;
  value: TValue;
  info?: string;
};
type ResultError<TError> = {
  success: false;
  error: TError;
  info?: string;
};
type Result<TValue, TError> = ResultOk<TValue> | ResultError<TError>;
//# sourceMappingURL=types.d.ts.map
//#endregion
export { Result };
//# sourceMappingURL=types-CePLSdIj.d.ts.map