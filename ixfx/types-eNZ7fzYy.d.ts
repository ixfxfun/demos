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

//# sourceMappingURL=types.d.ts.map
export { Result as Result$1 };
//# sourceMappingURL=types-eNZ7fzYy.d.ts.map