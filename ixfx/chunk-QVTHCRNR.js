import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";

// src/util/Results.ts
function throwResult(result) {
  if (result.success) return true;
  if (typeof result.error === `string`) throw new Error(result.error);
  throw result.error;
}
function resultToError(result) {
  if (typeof result.error === `string`) return new Error(result.error);
  else return result.error;
}
function resultToValue(result) {
  if (result.success) return result.value;
  else throw resultToError(result);
}
function resultErrorToString(result) {
  if (typeof result.error === `string`) return result.error;
  else return getErrorMessage(result.error);
}

export {
  throwResult,
  resultToError,
  resultToValue,
  resultErrorToString
};
//# sourceMappingURL=chunk-QVTHCRNR.js.map