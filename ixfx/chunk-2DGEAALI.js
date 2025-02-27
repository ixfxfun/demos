import {
  guard
} from "./chunk-TSP6MRBQ.js";

// src/geometry/line/FromPoints.ts
var fromPoints = (a, b) => {
  guard(a, `a`);
  guard(b, `b`);
  a = Object.freeze({ ...a });
  b = Object.freeze({ ...b });
  return Object.freeze({
    a,
    b
  });
};

// src/geometry/line/FromNumbers.ts
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  return fromPoints(a, b);
};

export {
  fromPoints,
  fromNumbers
};
//# sourceMappingURL=chunk-2DGEAALI.js.map