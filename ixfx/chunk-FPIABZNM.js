import {
  intervalToMs
} from "./chunk-FR2SM4SP.js";
import {
  integerTest,
  throwIntegerTest
} from "./chunk-BLACMGG6.js";

// src/flow/Timeout.ts
var timeout = (callback, interval) => {
  if (callback === void 0) {
    throw new Error(`callback parameter is undefined`);
  }
  const intervalMs = intervalToMs(interval);
  throwIntegerTest(intervalMs, `aboveZero`, `interval`);
  let timer;
  let startedAt = 0;
  let startCount = 0;
  let startCountTotal = 0;
  let state = `idle`;
  const clear = () => {
    startedAt = 0;
    globalThis.clearTimeout(timer);
    state = `idle`;
  };
  const start = async (altInterval = interval, args) => {
    const p = new Promise((resolve, reject) => {
      startedAt = performance.now();
      const altTimeoutMs = intervalToMs(altInterval);
      const it = integerTest(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
      if (!it[0]) {
        reject(new Error(it[1]));
        return;
      }
      switch (state) {
        case `scheduled`: {
          cancel();
          break;
        }
        case `running`: {
          break;
        }
      }
      state = `scheduled`;
      timer = globalThis.setTimeout(async () => {
        if (state !== `scheduled`) {
          console.warn(`Timeout skipping execution since state is not 'scheduled'`);
          clear();
          return;
        }
        const args_ = args ?? [];
        startCount++;
        startCountTotal++;
        state = `running`;
        await callback(performance.now() - startedAt, ...args_);
        state = `idle`;
        clear();
        resolve();
      }, altTimeoutMs);
    });
    return p;
  };
  const cancel = () => {
    if (state === `idle`) return;
    clear();
  };
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    start,
    cancel,
    get runState() {
      return state;
    },
    get startCount() {
      return startCount;
    },
    get startCountTotal() {
      return startCountTotal;
    }
  };
};

export {
  timeout
};
//# sourceMappingURL=chunk-FPIABZNM.js.map