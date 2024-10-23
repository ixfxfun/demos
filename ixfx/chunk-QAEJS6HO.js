// src/numbers/Clamp.ts
var clamp = (value, min = 0, max = 1) => {
  if (Number.isNaN(value)) throw new Error(`Param 'value' is NaN`);
  if (Number.isNaN(min)) throw new Error(`Param 'min' is NaN`);
  if (Number.isNaN(max)) throw new Error(`Param 'max' is NaN`);
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
var clamper = (min = 0, max = 1) => {
  if (Number.isNaN(min)) throw new Error(`Param 'min' is NaN`);
  if (Number.isNaN(max)) throw new Error(`Param 'max' is NaN`);
  return (v) => {
    if (v > max) return max;
    if (v < min) return min;
    return v;
  };
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) {
    throw new TypeError(`v parameter must be an integer (${v})`);
  }
  const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length)) {
    throw new TypeError(
      `length parameter must be an integer (${length}, ${typeof length})`
    );
  }
  v = Math.round(v);
  if (v < 0) return 0;
  if (v >= length) return length - 1;
  return v;
};

export {
  clamp,
  clamper,
  clampIndex
};
//# sourceMappingURL=chunk-QAEJS6HO.js.map