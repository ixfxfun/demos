import {
  Bipolar_exports,
  flip
} from "./chunk-GNXMKKD5.js";
import {
  count
} from "./chunk-UTOEERYG.js";
import {
  linearSpace
} from "./chunk-RQSMVGEL.js";
import {
  averageWeighted,
  interpolate2 as interpolate,
  interpolateAngle,
  interpolatorInterval,
  interpolatorStepped,
  movingAverage,
  movingAverageLight,
  movingAverageTimed,
  noiseFilter,
  piPi,
  quantiseEvery,
  wrap,
  wrapInteger,
  wrapRange
} from "./chunk-TIIF2VKF.js";
import {
  scale,
  scaleClamped,
  scalePercent,
  scalePercentages,
  scaler,
  scalerPercent
} from "./chunk-MXBHIKA7.js";
import {
  average,
  dotProduct,
  max,
  maxFast,
  maxIndex,
  min,
  minFast,
  minIndex,
  total,
  totalFast,
  validNumbers,
  weight
} from "./chunk-NGZXMICH.js";
import {
  clamp,
  clampIndex
} from "./chunk-I2PHDNRW.js";
import {
  minMaxAvg
} from "./chunk-BDIBLBFS.js";
import {
  round
} from "./chunk-OTGZJTOP.js";
import {
  throwNumberTest
} from "./chunk-BLACMGG6.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/numbers/index.ts
var numbers_exports = {};
__export(numbers_exports, {
  Bipolar: () => Bipolar_exports,
  Normalise: () => Normalise_exports,
  applyToValues: () => applyToValues,
  average: () => average,
  averageWeighted: () => averageWeighted,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  count: () => count,
  differenceFromFixed: () => differenceFromFixed,
  differenceFromLast: () => differenceFromLast,
  dotProduct: () => dotProduct,
  filter: () => filter,
  flip: () => flip,
  interpolate: () => interpolate,
  interpolateAngle: () => interpolateAngle,
  interpolatorInterval: () => interpolatorInterval,
  interpolatorStepped: () => interpolatorStepped,
  isApprox: () => isApprox,
  isValid: () => isValid,
  linearSpace: () => linearSpace,
  max: () => max,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  min: () => min,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  piPi: () => piPi,
  proportion: () => proportion,
  quantiseEvery: () => quantiseEvery,
  round: () => round,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler,
  scalerPercent: () => scalerPercent,
  softmax: () => softmax,
  total: () => total,
  totalFast: () => totalFast,
  validNumbers: () => validNumbers,
  weight: () => weight,
  wrap: () => wrap,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/numbers/ApplyToValues.ts
var applyToValues = (object, apply) => {
  const o = { ...object };
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === `number`) {
      o[key] = apply(value);
    } else {
      o[key] = value;
    }
  }
  return o;
};

// src/numbers/Guard.ts
var isValid = (possibleNumber) => {
  if (typeof possibleNumber !== `number`) return false;
  if (Number.isNaN(possibleNumber)) return false;
  return true;
};

// src/numbers/Filter.ts
function* filter(it) {
  for (const v of it) {
    if (isValid(v)) yield v;
  }
}

// src/numbers/Generate.ts
var numericRangeRaw = function* (interval, start = 0, end, repeating = false) {
  if (interval <= 0) throw new Error(`Interval is expected to be above zero`);
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval;
    }
  } while (repeating);
};
var numericRange = function* (interval, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval, `nonZero`);
  const negativeInterval = interval < 0;
  if (end === void 0) {
  } else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  else end *= rounding;
  interval = interval * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval;
    }
  } while (repeating);
};
var numericPercent = function(interval = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval, start, end, repeating);
};

// src/numbers/IsApprox.ts
function isApprox(rangePercent, baseValue, v) {
  throwNumberTest(rangePercent, `percentage`, `rangePercent`);
  const range = Math.floor(rangePercent * 100);
  const test = (base, value) => {
    try {
      if (typeof value !== `number`) return false;
      if (Number.isNaN(value)) return false;
      if (!Number.isFinite(value)) return false;
      const diff = Math.abs(value - base);
      const relative = base === 0 ? Math.floor(diff * 100) : Math.floor(diff / base * 100);
      return relative <= range;
    } catch {
      return false;
    }
  };
  if (baseValue === void 0) return test;
  throwNumberTest(baseValue, ``, `baseValue`);
  if (v === void 0) {
    return (value) => test(baseValue, value);
  } else {
    return test(baseValue, v);
  }
}

// src/numbers/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min2 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max2 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(min2);
  throwNumberTest(max2);
  return (v) => {
    throwNumberTest(v);
    min2 = Math.min(min2, v);
    max2 = Math.max(max2, v);
    return scale(v, min2, max2);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new TypeError(`Param 'values' should be an array. Got: ${typeof values}`);
  }
  const mma = minMaxAvg(values);
  const min2 = minForced ?? mma.min;
  const max2 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min2, max2)));
};

// src/numbers/Proportion.ts
var proportion = (v, t) => {
  if (typeof v === `function`) v = v();
  if (typeof t === `function`) t = t();
  throwNumberTest(v, `percentage`, `v`);
  throwNumberTest(t, `percentage`, `t`);
  return v * t;
};

// src/numbers/Difference.ts
var differenceFromFixed = (initial, kind = `absolute`) => (value) => differenceFrom(kind, value, initial);
var differenceFromLast = (kind = `absolute`, initialValue = Number.NaN) => {
  let lastValue = initialValue;
  return (value) => {
    const x = differenceFrom(kind, value, lastValue);
    lastValue = value;
    return x;
  };
};
var differenceFrom = (kind = `absolute`, value, from) => {
  if (Number.isNaN(from)) {
    return 0;
  }
  const d = value - from;
  let r = 0;
  if (kind === `absolute`) {
    r = Math.abs(d);
  } else if (kind === `numerical`) {
    r = d;
  } else if (kind === `relative`) {
    r = Math.abs(d / from);
  } else if (kind === `relativeSigned`) {
    r = d / from;
  } else throw new TypeError(`Unknown kind: '${kind}' Expected: 'absolute', 'relative', 'relativeSigned' or 'numerical'`);
  return r;
};

// src/numbers/Softmax.ts
var softmax = (logits) => {
  const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
  const scores = logits.map((l) => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map((s) => s / denom);
};

export {
  applyToValues,
  isValid,
  filter,
  numericRangeRaw,
  numericRange,
  numericPercent,
  isApprox,
  Normalise_exports,
  proportion,
  differenceFromFixed,
  differenceFromLast,
  softmax,
  numbers_exports
};
//# sourceMappingURL=chunk-AUX6RHPJ.js.map