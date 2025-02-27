import {
  throwIntegerTest
} from "./chunk-UC4AQMTL.js";

// src/numbers/Round.ts
function round(a, b, roundUp) {
  throwIntegerTest(a, `positive`, `decimalPlaces`);
  let up = typeof b === `boolean` ? b : roundUp ?? false;
  let rounder;
  if (a === 0) {
    rounder = Math.round;
  } else {
    const p = Math.pow(10, a);
    if (up) {
      rounder = (v) => Math.ceil(v * p) / p;
    } else {
      rounder = (v) => Math.floor(v * p) / p;
    }
  }
  if (typeof b === `number`) return rounder(b);
  return rounder;
}

export {
  round
};
//# sourceMappingURL=chunk-3UVU2F72.js.map