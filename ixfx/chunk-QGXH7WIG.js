import {
  isIterable
} from "./chunk-YLRZZLGG.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
import {
  intervalToMs
} from "./chunk-2LQNQUVT.js";
import {
  throwNumberTest
} from "./chunk-CSXWZ3IC.js";

// src/rx/Util.ts
function messageIsSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal !== void 0) return true;
  return false;
}
function messageIsDoneSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal === `done`) return true;
  return false;
}
function messageHasValue(v) {
  if (v.value !== void 0) return true;
  return false;
}
var isPingable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`ping` in rx) {
    return true;
  }
  return false;
};
var hasLast = (rx) => {
  if (!isReactive(rx)) return false;
  if (`last` in rx) {
    const v = rx.last();
    if (v !== void 0) return true;
  }
  return false;
};
var isReactive = (rx) => {
  if (typeof rx !== `object`) return false;
  if (rx === null) return false;
  return `on` in rx && `onValue` in rx;
};
var isWritable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`set` in rx) return true;
  return false;
};
var isWrapped = (v) => {
  if (typeof v !== `object`) return false;
  if (!(`source` in v)) return false;
  if (!(`annotateElapsed` in v)) return false;
  return true;
};
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};
var isTriggerValue = (t) => `value` in t;
var isTriggerFunction = (t) => `fn` in t;
var isTriggerGenerator = (t) => isIterable(t);
var isTrigger = (t) => {
  if (typeof t !== `object`) return false;
  if (isTriggerValue(t)) return true;
  if (isTriggerFunction(t)) return true;
  if (isTriggerGenerator(t)) return true;
  return false;
};
function resolveTriggerValue(t) {
  if (isTriggerValue(t)) return [t.value, false];
  if (isTriggerFunction(t)) {
    const v = t.fn();
    if (v === void 0) return [void 0, true];
    return [v, false];
  }
  if (isTriggerGenerator(t)) {
    const v = t.gen.next();
    if (v.done) return [void 0, true];
    return [v.value, false];
  }
  throw new Error(`Invalid trigger. Missing 'value' or 'fn' fields`);
}

// src/flow/Sleep.ts
if (typeof window === `undefined` || !(`requestAnimationFrame` in window)) {
  if (typeof window === `undefined`) {
    globalThis.requestAnimationFrame = (callback) => {
      setTimeout(callback, 1);
    };
  }
}
var sleep = (optsOrMillis) => {
  const timeoutMs = intervalToMs(optsOrMillis, 1);
  const signal = optsOrMillis.signal;
  const value = optsOrMillis.value;
  throwNumberTest(timeoutMs, `positive`, `timeoutMs`);
  if (timeoutMs === 0) {
    return new Promise(
      (resolve2) => requestAnimationFrame((_) => {
        resolve2(value);
      })
    );
  } else {
    return new Promise((resolve2, reject) => {
      const onAbortSignal = () => {
        clearTimeout(t);
        if (signal) {
          signal.removeEventListener(`abort`, onAbortSignal);
          reject(new Error(signal.reason));
        } else {
          reject(new Error(`Cancelled`));
        }
      };
      if (signal) {
        signal.addEventListener(`abort`, onAbortSignal);
      }
      const t = setTimeout(() => {
        signal?.removeEventListener(`abort`, onAbortSignal);
        if (signal?.aborted) {
          reject(new Error(signal.reason));
          return;
        }
        resolve2(value);
      }, timeoutMs);
    });
  }
};
var sleepWhile = async (predicate, checkInterval = 100) => {
  while (predicate()) {
    await sleep(checkInterval);
  }
};

// src/data/Resolve.ts
async function resolve(r, ...args) {
  if (typeof r === `object`) {
    if (`next` in r) {
      const tag = r[Symbol.toStringTag];
      if (tag === `Generator` || tag == `Array Iterator`) {
        const v = r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else if (tag === `AsyncGenerator`) {
        const v = await r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else {
        throw new Error(`Object has 'next' prop, but does not have 'AsyncGenerator', 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
      }
    } else if (isReactive(r)) {
      if (hasLast(r)) return r.last();
      throw new Error(`Reactive does not have last value`);
    } else {
      return r;
    }
  } else if (typeof r === `function`) {
    const v = await r(args);
    return v;
  } else {
    return r;
  }
}
function resolveSync(r, ...args) {
  if (typeof r === `object`) {
    if (`next` in r) {
      const tag = r[Symbol.toStringTag];
      if (tag === `Generator` || tag == `Array Iterator`) {
        const v = r.next();
        if (`done` in v && `value` in v) return v.value;
        return v;
      } else if (tag === `AsyncGenerator`) {
        throw new Error(`resolveSync cannot work with an async generator`);
      } else {
        throw new Error(`Object has 'next' prop, but does not have 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
      }
    } else if (isReactive(r)) {
      if (hasLast(r)) return r.last();
      throw new Error(`Reactive does not have last value`);
    } else {
      return r;
    }
  } else if (typeof r === `function`) {
    return r(args);
  } else {
    return r;
  }
}
async function resolveWithFallback(p, fallback, ...args) {
  let errored = false;
  let fallbackValue = fallback.value;
  const overrideWithLast = fallback.overrideWithLast ?? false;
  if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
  try {
    const r = await resolve(p, ...args);
    if (typeof r === `undefined`) return fallbackValue;
    if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
    if (overrideWithLast) fallbackValue = r;
    return r;
  } catch (error) {
    if (!errored) {
      errored = true;
      console.warn(`resolveWithFallback swallowed an error. Additional errors not reported.`, getErrorMessage(error));
    }
    return fallbackValue;
  }
}
function resolveWithFallbackSync(p, fallback, ...args) {
  let errored = false;
  let fallbackValue = fallback.value;
  const overrideWithLast = fallback.overrideWithLast ?? false;
  if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
  try {
    const r = resolveSync(p, ...args);
    if (typeof r === `undefined`) return fallbackValue;
    if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
    if (overrideWithLast) fallbackValue = r;
    return r;
  } catch (error) {
    if (!errored) {
      errored = true;
      console.warn(`resolveWithFallbackSync swallowed an error. Additional errors not reported.`, getErrorMessage(error));
    }
    return fallbackValue;
  }
}

// src/flow/Repeat.ts
async function* repeat(produce, opts) {
  const signal = opts.signal ?? void 0;
  const delayWhen = opts.delayWhen ?? `before`;
  const count = opts.count ?? void 0;
  const allowUndefined = opts.allowUndefined ?? false;
  const minIntervalMs = opts.delayMinimum ? intervalToMs(opts.delayMinimum) : void 0;
  const whileFunc = opts.while;
  let cancelled = false;
  let sleepMs = intervalToMs(opts.delay, intervalToMs(opts.delayMinimum, 0));
  let started = performance.now();
  const doDelay = async () => {
    const elapsed = performance.now() - started;
    if (typeof minIntervalMs !== `undefined`) {
      sleepMs = Math.max(0, minIntervalMs - elapsed);
    }
    if (sleepMs) {
      await sleep({ millis: sleepMs, signal });
    }
    started = performance.now();
    if (signal?.aborted) throw new Error(`Signal aborted ${signal.reason}`);
  };
  if (Array.isArray(produce)) produce = produce.values();
  if (opts.onStart) opts.onStart();
  let errored = true;
  let loopedTimes = 0;
  try {
    while (!cancelled) {
      loopedTimes++;
      if (delayWhen === `before` || delayWhen === `both`) await doDelay();
      const result = await resolve(produce);
      if (typeof result === `undefined` && !allowUndefined) {
        cancelled = true;
      } else {
        yield result;
        if (delayWhen === `after` || delayWhen === `both`) await doDelay();
        if (count !== void 0 && loopedTimes >= count) cancelled = true;
      }
      if (whileFunc) {
        if (!whileFunc(loopedTimes)) {
          cancelled = true;
        }
      }
    }
    errored = false;
  } finally {
    cancelled = true;
    if (opts.onComplete) opts.onComplete(errored);
  }
}
function* repeatSync(produce, opts) {
  const signal = opts.signal ?? void 0;
  const count = opts.count ?? void 0;
  const allowUndefined = opts.allowUndefined ?? false;
  let cancelled = false;
  if (Array.isArray(produce)) produce = produce.values();
  if (opts.onStart) opts.onStart();
  let errored = true;
  let loopedTimes = 0;
  try {
    while (!cancelled) {
      loopedTimes++;
      const result = resolveSync(produce);
      if (typeof result === `undefined` && !allowUndefined) {
        cancelled = true;
      } else {
        yield result;
        if (count !== void 0 && loopedTimes >= count) cancelled = true;
        if (signal?.aborted) cancelled = true;
      }
    }
    errored = false;
  } finally {
    cancelled = true;
    if (opts.onComplete) opts.onComplete(errored);
  }
}

export {
  messageIsSignal,
  messageIsDoneSignal,
  messageHasValue,
  isPingable,
  hasLast,
  isReactive,
  isWritable,
  isWrapped,
  opify,
  isTriggerValue,
  isTriggerFunction,
  isTriggerGenerator,
  isTrigger,
  resolveTriggerValue,
  sleep,
  sleepWhile,
  resolve,
  resolveSync,
  resolveWithFallback,
  resolveWithFallbackSync,
  repeat,
  repeatSync
};
//# sourceMappingURL=chunk-QGXH7WIG.js.map