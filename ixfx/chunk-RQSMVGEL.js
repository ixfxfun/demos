import {
  round
} from "./chunk-OTGZJTOP.js";
import {
  throwNumberTest
} from "./chunk-BLACMGG6.js";

// src/numbers/LinearSpace.ts
function* linearSpace(start, end, steps, precision) {
  throwNumberTest(start, ``, `start`);
  throwNumberTest(end, ``, `end`);
  throwNumberTest(steps, ``, `steps`);
  const r = precision ? round(precision) : (v) => v;
  const step = (end - start) / (steps - 1);
  throwNumberTest(step, ``, `step`);
  if (!Number.isFinite(step)) {
    throw new TypeError(`Calculated step value is infinite`);
  }
  for (let index = 0; index < steps; index++) {
    const v = start + step * index;
    yield r(v);
  }
}

export {
  linearSpace
};
//# sourceMappingURL=chunk-RQSMVGEL.js.map