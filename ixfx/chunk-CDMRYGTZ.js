import {
  clamp
} from "./chunk-I2PHDNRW.js";
import {
  throwNumberTest
} from "./chunk-BLACMGG6.js";

// src/numbers/Scale.ts
var scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
var scaler = (inMin, inMax, outMin, outMax, easing) => {
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a = easing(a);
    return a * (oMax - oMin) + oMin;
  };
};
var scaleClamped = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0) outMax = 1;
  if (outMin === void 0) outMin = 0;
  if (inMin === inMax) return outMax;
  const x = scale(v, inMin, inMax, outMin, outMax, easing);
  return clamp(x, outMin, outMax);
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  throwNumberTest(percentage, `percentage`, `v`);
  throwNumberTest(outMin, `percentage`, `outMin`);
  throwNumberTest(outMax, `percentage`, `outMax`);
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => scalerPercent(outMin, outMax)(v);
var scalerPercent = (outMin, outMax) => {
  return (v) => {
    throwNumberTest(v, `percentage`, `v`);
    return scale(v, 0, 1, outMin, outMax);
  };
};

// src/geometry/point/Guard.ts
var isNull = (p) => {
  if (isPoint3d(p)) {
    if (p.z !== null) return false;
  }
  return p.x === null && p.y === null;
};
var isNaN = (p) => {
  if (isPoint3d(p)) {
    if (!Number.isNaN(p.z)) return false;
  }
  return Number.isNaN(p.x) || Number.isNaN(p.y);
};
function guard(p, name = `Point`) {
  if (p === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p === null) {
    throw new Error(
      `'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p.x === void 0) {
    throw new Error(
      `'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p.y === void 0) {
    throw new Error(
      `'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (typeof p.x !== `number`) {
    throw new TypeError(`'${name}.x' must be a number. Got ${typeof p.x}`);
  }
  if (typeof p.y !== `number`) {
    throw new TypeError(`'${name}.y' must be a number. Got ${typeof p.y}`);
  }
  if (p.z !== void 0) {
    if (typeof p.z !== `number`) throw new TypeError(`${name}.z must be a number. Got: ${typeof p.z}`);
    if (Number.isNaN(p.z)) throw new Error(`'${name}.z' is NaN`);
  }
  if (p.x === null) throw new Error(`'${name}.x' is null`);
  if (p.y === null) throw new Error(`'${name}.y' is null`);
  if (Number.isNaN(p.x)) throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p.y)) throw new Error(`'${name}.y' is NaN`);
}
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard(pt, name);
  throwNumberTest(pt.x, `nonZero`, `${name}.x`);
  throwNumberTest(pt.y, `nonZero`, `${name}.y`);
  if (typeof pt.z !== `undefined`) {
    throwNumberTest(pt.z, `nonZero`, `${name}.z`);
  }
  return true;
};
function isPoint(p) {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  return true;
}
var isPoint3d = (p) => {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  if (p.z === void 0) return false;
  return true;
};
var isEmpty = (p) => {
  if (isPoint3d(p)) {
    if (p.z !== 0) return false;
  }
  return p.x === 0 && p.y === 0;
};
var isPlaceholder = (p) => {
  if (isPoint3d(p)) {
    if (!Number.isNaN(p.z)) return false;
  }
  return Number.isNaN(p.x) && Number.isNaN(p.y);
};

export {
  isNull,
  isNaN,
  guard,
  guardNonZeroPoint,
  isPoint,
  isPoint3d,
  isEmpty,
  isPlaceholder,
  scale,
  scaler,
  scaleClamped,
  scalePercentages,
  scalePercent,
  scalerPercent
};
//# sourceMappingURL=chunk-CDMRYGTZ.js.map