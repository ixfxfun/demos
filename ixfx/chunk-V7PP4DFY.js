import {
  timeout
} from "./chunk-FPIABZNM.js";

// src/flow/RateMinimum.ts
var rateMinimum = (options) => {
  let disposed = false;
  const t = timeout(() => {
    if (disposed) return;
    t.start();
    options.whatToCall(options.fallback());
  }, options.interval);
  if (options.abort) {
    options.abort.addEventListener(`abort`, (_) => {
      disposed = true;
      t.cancel();
    });
  }
  t.start();
  return (args) => {
    if (disposed) throw new Error(`AbortSignal has been fired`);
    t.start();
    options.whatToCall(args);
  };
};

export {
  rateMinimum
};
//# sourceMappingURL=chunk-V7PP4DFY.js.map