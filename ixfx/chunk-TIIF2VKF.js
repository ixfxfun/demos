import {
  guard,
  guardNonZeroPoint,
  isEmpty,
  isNaN,
  isNull,
  isPlaceholder,
  isPoint,
  isPoint3d,
  parseRgbObject,
  resolve as resolve2,
  scale,
  toHex,
  toHsl,
  toRgb
} from "./chunk-MXBHIKA7.js";
import {
  StackMutable,
  depthFirst,
  isPrimitive,
  map
} from "./chunk-TYALAIXN.js";
import {
  average,
  dotProduct,
  weight
} from "./chunk-NGZXMICH.js";
import {
  NumberMap,
  immutable
} from "./chunk-XFNQJV53.js";
import {
  DispatchList,
  continuously,
  hasLast,
  isPingable,
  isReactive,
  isTrigger,
  isTriggerFunction,
  isTriggerGenerator,
  isTriggerValue,
  isWrapped,
  isWritable,
  messageHasValue,
  messageIsDoneSignal,
  messageIsSignal,
  opify,
  rateMinimum,
  resolve,
  resolveSync,
  resolveTriggerValue,
  resolveWithFallback,
  resolveWithFallbackSync,
  sleep,
  timeout
} from "./chunk-4GOV2D4X.js";
import {
  StateMachine_exports,
  Stopwatch_exports,
  elapsedMillisecondsAbsolute,
  elapsedTicksAbsolute,
  ofTotal,
  ofTotalTicks,
  relative,
  timerWithFunction
} from "./chunk-QKQKTBVV.js";
import {
  clamp
} from "./chunk-I2PHDNRW.js";
import {
  QueueMutable,
  isAsyncIterable,
  isIterable
} from "./chunk-67VZAFWN.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
import {
  getOrGenerate,
  getOrGenerateSync,
  logSet
} from "./chunk-N6YIY4CM.js";
import {
  SimpleEventEmitter,
  intervalToMs
} from "./chunk-XGQNP3YG.js";
import {
  resolveEl,
  resolveEls
} from "./chunk-ZNCB3DZ2.js";
import {
  arrays_exports,
  insertAt,
  remove,
  zip
} from "./chunk-Q444COJ6.js";
import {
  addKeepingExisting,
  addObject,
  deleteByValue,
  filter,
  find,
  firstEntryByPredicate,
  firstEntryByValue,
  fromIterable,
  fromObject,
  getClosestIntegerKey,
  getFromKeys,
  hasAnyValue,
  hasKeyValue,
  mapToArray,
  mapToObjectTransform,
  mergeByKey,
  some,
  sortByValue,
  sortByValueProperty,
  toArray,
  toObject,
  transformMap,
  zipKeyValue
} from "./chunk-UXBT5HQE.js";
import {
  shuffle
} from "./chunk-7HPQVR47.js";
import {
  isInteger,
  throwResult
} from "./chunk-BDIBLBFS.js";
import {
  afterMatch,
  beforeMatch,
  wildcard
} from "./chunk-PJHYZUYG.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  isPlainObjectOrPrimitive,
  throwFunctionTest,
  throwStringTest
} from "./chunk-27HWJFP3.js";
import {
  changedDataFields,
  compareArrays,
  compareData,
  compareKeys,
  maxScore,
  min
} from "./chunk-54PXOMGL.js";
import {
  round
} from "./chunk-OTGZJTOP.js";
import {
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault
} from "./chunk-6UZ3OSJO.js";
import {
  numberTest,
  throwIntegerTest,
  throwNumberTest,
  throwPercentTest
} from "./chunk-BLACMGG6.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/rx/index.ts
var rx_exports = {};
__export(rx_exports, {
  Dom: () => Dom_exports,
  From: () => sources_exports,
  Ops: () => Ops,
  Sinks: () => Sinks,
  annotate: () => annotate,
  annotateWithOp: () => annotateWithOp,
  average: () => average3,
  chunk: () => chunk,
  cloneFromFields: () => cloneFromFields,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  computeWithPrevious: () => computeWithPrevious,
  count: () => count,
  debounce: () => debounce,
  drop: () => drop,
  elapsed: () => elapsed,
  field: () => field,
  filter: () => filter3,
  hasLast: () => hasLast,
  interpolate: () => interpolate4,
  isPingable: () => isPingable,
  isReactive: () => isReactive,
  isTrigger: () => isTrigger,
  isTriggerFunction: () => isTriggerFunction,
  isTriggerGenerator: () => isTriggerGenerator,
  isTriggerValue: () => isTriggerValue,
  isWrapped: () => isWrapped,
  isWritable: () => isWritable,
  manual: () => manual,
  max: () => max4,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  min: () => min5,
  opify: () => opify,
  pipe: () => pipe,
  prepare: () => prepare,
  rank: () => rank2,
  resolveSource: () => resolveSource,
  resolveTriggerValue: () => resolveTriggerValue,
  run: () => run,
  setHtmlText: () => setHtmlText,
  singleFromArray: () => singleFromArray,
  split: () => split,
  splitLabelled: () => splitLabelled,
  sum: () => sum3,
  switcher: () => switcher,
  symbol: () => symbol,
  syncToArray: () => syncToArray,
  syncToObject: () => syncToObject,
  takeNextValue: () => takeNextValue,
  tally: () => tally2,
  tapOps: () => tapOps,
  tapProcess: () => tapProcess,
  tapStream: () => tapStream,
  throttle: () => throttle,
  timeoutPing: () => timeoutPing,
  timeoutValue: () => timeoutValue,
  to: () => to,
  toArray: () => toArray4,
  toArrayOrThrow: () => toArrayOrThrow,
  toGenerator: () => toGenerator,
  transform: () => transform,
  valueToPing: () => valueToPing,
  withValue: () => withValue,
  wrap: () => wrap3,
  writable: () => writable
});

// src/rx/sources/Function.ts
function func(callback, options = {}) {
  const maximumRepeats = options.maximumRepeats ?? Number.MAX_SAFE_INTEGER;
  const closeOnError = options.closeOnError ?? true;
  const intervalMs = options.interval ? intervalToMs(options.interval) : -1;
  let manual2 = options.manual ?? false;
  if (options.interval === void 0 && options.manual === void 0) manual2 = true;
  if (manual2 && options.interval) throw new Error(`If option 'manual' is set, option 'interval' cannot be used`);
  const predelay = intervalToMs(options.predelay, 0);
  const lazy = options.lazy ?? `very`;
  const signal = options.signal;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let sentResults = 0;
  let enabled = false;
  const done = (reason) => {
    events.dispose(reason);
    enabled = false;
    if (run2) run2.cancel();
  };
  const ping = async () => {
    if (!enabled) return false;
    if (predelay) await sleep(predelay);
    if (sentResults >= maximumRepeats) {
      done(`Maximum repeats reached ${maximumRepeats.toString()}`);
      return false;
    }
    try {
      if (signal?.aborted) {
        done(`Signal (${signal.aborted})`);
        return false;
      }
      const value = await callback(internalAbortCallback);
      sentResults++;
      events.set(value);
      return true;
    } catch (error) {
      if (closeOnError) {
        done(`Function error: ${getErrorMessage(error)}`);
        return false;
      } else {
        events.signal(`warn`, getErrorMessage(error));
        return true;
      }
    }
  };
  const run2 = manual2 ? void 0 : continuously(async () => {
    const pingResult = await ping();
    if (!pingResult) return false;
    if (internalAbort.signal.aborted) {
      done(`callback function aborted (${internalAbort.signal.reason})`);
      return false;
    }
  }, intervalMs);
  const events = initLazyStream({
    lazy,
    onStart() {
      enabled = true;
      if (run2) run2.start();
    },
    onStop() {
      enabled = false;
      if (run2) run2.cancel();
    }
  });
  if (lazy === `never` && run2) run2.start();
  return { ...events, ping };
}

// src/iterables/IterableAsync.ts
var IterableAsync_exports = {};
__export(IterableAsync_exports, {
  asCallback: () => asCallback,
  chunks: () => chunks,
  concat: () => concat,
  dropWhile: () => dropWhile,
  equals: () => equals,
  every: () => every,
  fill: () => fill,
  filter: () => filter2,
  find: () => find2,
  flatten: () => flatten,
  forEach: () => forEach,
  fromArray: () => fromArray,
  fromIterable: () => fromIterable2,
  map: () => map2,
  max: () => max,
  min: () => min2,
  nextWithTimeout: () => nextWithTimeout,
  reduce: () => reduce,
  repeat: () => repeat,
  slice: () => slice,
  some: () => some2,
  toArray: () => toArray2,
  unique: () => unique,
  uniqueByValue: () => uniqueByValue,
  until: () => until,
  withDelay: () => withDelay,
  zip: () => zip2
});
async function* fromArray(array3, interval = 1) {
  for (const v of array3) {
    yield v;
    await sleep(interval);
  }
}
async function* fromIterable2(iterable, interval = 1) {
  for await (const v of iterable) {
    yield v;
    await sleep(interval);
  }
}
async function* chunks(it, size) {
  let buffer = [];
  for await (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
}
async function* concat(...its) {
  for await (const it of its) yield* it;
}
async function* dropWhile(it, f) {
  for await (const v of it) {
    if (!f(v)) {
      yield v;
    }
  }
}
var until = async (it, callback) => {
  for await (const _ of it) {
    const value = await callback();
    if (typeof value === `boolean` && !value) break;
  }
};
var repeat = async function* (genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count2 = repeats;
  while (true) {
    for await (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count2--;
      if (count2 === 0) break;
    }
    if (signal?.aborted) break;
  }
};
async function equals(it1, it2, equality) {
  const iit1 = it1[Symbol.asyncIterator]();
  const iit2 = it2[Symbol.asyncIterator]();
  while (true) {
    const index1 = await iit1.next();
    const index2 = await iit2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
async function every(it, f) {
  for await (const v of it) {
    const result = await f(v);
    if (!result) return false;
  }
  return true;
}
async function* fill(it, v) {
  for await (const _ of it) yield v;
}
async function* filter2(it, f) {
  for await (const v of it) {
    if (!await f(v)) continue;
    yield v;
  }
}
async function find2(it, f) {
  for await (const v of it) {
    if (await f(v)) return v;
  }
}
async function* flatten(it) {
  for await (const v of it) {
    if (typeof v === `object`) {
      if (Array.isArray(v)) {
        for (const vv of v) yield vv;
      } else if (isAsyncIterable(v)) {
        for await (const vv of v) {
          yield vv;
        }
      } else if (isIterable(v)) {
        for (const vv of v) {
          yield vv;
        }
      }
    } else {
      yield v;
    }
  }
}
var forEach = async function(iterator2, fn, options = {}) {
  const interval = options.interval;
  if (Array.isArray(iterator2)) {
    for (const x of iterator2) {
      const r = await fn(x);
      if (typeof r === `boolean` && !r) break;
      if (interval) await sleep(interval);
    }
  } else {
    for await (const x of iterator2) {
      const r = await fn(x);
      if (typeof r === `boolean` && !r) break;
      if (interval) await sleep(interval);
    }
  }
};
async function* map2(it, f) {
  for await (const v of it) {
    yield f(v);
  }
}
async function* max(it, gt = (a, b) => a > b) {
  let max5;
  for await (const v of it) {
    if (max5 === void 0) {
      max5 = v;
      yield max5;
      continue;
    }
    if (gt(v, max5)) {
      max5 = v;
      yield v;
    }
  }
}
async function* min2(it, gt = (a, b) => a > b) {
  let min6;
  for await (const v of it) {
    if (min6 === void 0) {
      min6 = v;
      yield min6;
      continue;
    }
    if (gt(min6, v)) {
      min6 = v;
      yield v;
    }
  }
  return min6;
}
async function reduce(it, f, start) {
  for await (const v of it) start = f(start, v);
  return start;
}
async function asCallback(input, callback, onDone) {
  for await (const value of input) {
    callback(value);
  }
  if (onDone) onDone();
}
async function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.asyncIterator]();
  if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
  for (; start > 0; start--, end--) await iit.next();
  for await (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}
async function* withDelay(it, delay) {
  for (const v of it) {
    await sleep(delay);
    yield v;
  }
}
async function nextWithTimeout(it, options) {
  const ms = intervalToMs(options, 1e3);
  const value = await Promise.race([
    (async () => {
      await sleep({ millis: ms, signal: options.signal });
      return void 0;
    })(),
    (async () => {
      return await it.next();
    })()
  ]);
  if (value === void 0) throw new Error(`Timeout`);
  return value;
}
async function some2(it, f) {
  for await (const v of it) {
    if (await f(v)) return true;
  }
  return false;
}
async function toArray2(it, options = {}) {
  const result = [];
  const iterator2 = it[Symbol.asyncIterator]();
  const started = Date.now();
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const whileFunc = options.while;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  while (result.length < maxItems && Date.now() - started < maxElapsed) {
    if (whileFunc) {
      if (!whileFunc(result.length)) break;
    }
    const r = await iterator2.next();
    if (r.done) break;
    result.push(r.value);
  }
  return result;
}
async function* unique(iterable) {
  const buffer = [];
  const itera = Array.isArray(iterable) ? iterable : [iterable];
  for await (const it of itera) {
    for await (const v of it) {
      if (buffer.includes(v)) continue;
      buffer.push(v);
      yield v;
    }
  }
}
async function* uniqueByValue(input, toString3 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for await (const v of input) {
    const key = toString3(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
async function* zip2(...its) {
  const iits = its.map((it) => it[Symbol.asyncIterator]());
  while (true) {
    const vs = await Promise.all(iits.map((it) => it.next()));
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}

// src/rx/sources/Iterator.ts
function iterator(source, options = {}) {
  const lazy = options.lazy ?? `very`;
  const log = options.traceLifecycle ? (message) => {
    console.log(`Rx.From.iterator ${message}`);
  } : (_) => {
  };
  const readIntervalMs = intervalToMs(options.readInterval, 5);
  const readTimeoutMs = intervalToMs(options.readTimeout, 5 * 60 * 1e3);
  const whenStopped = options.whenStopped ?? `continue`;
  let iterator2;
  let ourAc;
  let sm = StateMachine_exports.init({
    idle: [`wait_for_next`],
    wait_for_next: [`processing_result`, `stopping`, `disposed`],
    processing_result: [`queued`, `disposed`, `stopping`],
    queued: [`wait_for_next`, `disposed`, `stopping`],
    stopping: `idle`,
    // eslint-disable-next-line unicorn/no-null
    disposed: null
  }, `idle`);
  const onExternalSignal = () => {
    log(`onExternalSignal`);
    ourAc?.abort(options.signal?.reason);
  };
  if (options.signal) {
    options.signal.addEventListener(`abort`, onExternalSignal, { once: true });
  }
  ;
  const read = async () => {
    log(`read. State: ${sm.value}`);
    ourAc = new AbortController();
    try {
      sm = StateMachine_exports.to(sm, `wait_for_next`);
      const v = await nextWithTimeout(iterator2, { signal: ourAc.signal, millis: readTimeoutMs });
      sm = StateMachine_exports.to(sm, `processing_result`);
      ourAc?.abort(`nextWithTimeout completed`);
      if (v.done) {
        log(`read v.done true`);
        events.dispose(`Generator complete`);
        sm = StateMachine_exports.to(sm, `disposed`);
      }
      if (sm.value === `stopping`) {
        log(`read. sm.value = stopping`);
        sm = StateMachine_exports.to(sm, `idle`);
        return;
      }
      if (sm.value === `disposed`) {
        log(`read. sm.value = disposed`);
        return;
      }
      events.set(v.value);
    } catch (error) {
      events.dispose(`Generator error: ${error.toString()}`);
      return;
    }
    if (sm.value === `processing_result`) {
      sm = StateMachine_exports.to(sm, `queued`);
      log(`scheduling read. State: ${sm.value}`);
      setTimeout(read, readIntervalMs);
    } else {
      sm = StateMachine_exports.to(sm, `idle`);
    }
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      log(`onStart state: ${sm.value} whenStopped: ${whenStopped}`);
      if (sm.value !== `idle`) return;
      if (sm.value === `idle` && whenStopped === `reset` || iterator2 === void 0) {
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
      void read();
    },
    onStop() {
      log(`onStop state: ${sm.value} whenStopped: ${whenStopped}`);
      sm = StateMachine_exports.to(sm, `stopping`);
      if (whenStopped === `reset`) {
        log(`onStop reiniting iterator`);
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
    },
    onDispose(reason) {
      log(`onDispose (${reason})`);
      ourAc?.abort(`Rx.From.iterator disposed (${reason})`);
      if (options.signal) options.signal.removeEventListener(`abort`, onExternalSignal);
    }
  });
  return events;
}

// src/rx/ResolveSource.ts
var resolveSource = (source, options = {}) => {
  if (isReactive(source)) return source;
  const generatorOptions = options.generator ?? { lazy: `initial`, interval: 5 };
  const functionOptions = options.function ?? { lazy: `very` };
  if (Array.isArray(source)) {
    return iterator(source.values(), generatorOptions);
  } else if (typeof source === `function`) {
    return func(source, functionOptions);
  } else if (typeof source === `object`) {
    if (isWrapped(source)) {
      return source.source;
    }
    if (isIterable(source) || isAsyncIterable(source)) {
      return iterator(source, generatorOptions);
    }
  }
  throw new TypeError(`Unable to resolve source. Supports: array, Reactive, Async/Iterable. Got type: ${typeof source}`);
};

// src/rx/Cache.ts
function cache(r, initialValue) {
  let lastValue = initialValue;
  r.onValue((value) => {
    lastValue = value;
  });
  return {
    ...r,
    last() {
      return lastValue;
    },
    resetCachedValue() {
      lastValue = void 0;
    }
  };
}

// src/rx/InitStream.ts
function initUpstream(upstreamSource, options) {
  const lazy = options.lazy ?? `initial`;
  const disposeIfSourceDone = options.disposeIfSourceDone ?? true;
  const onValue = options.onValue ?? ((_v) => {
  });
  const source = resolveSource(upstreamSource);
  let unsub;
  const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
  const onStop = () => {
    if (unsub === void 0) return;
    unsub();
    unsub = void 0;
    if (options.onStop) options.onStop();
  };
  const onStart = () => {
    if (unsub !== void 0) return;
    if (options.onStart) options.onStart();
    unsub = source.on((value) => {
      if (messageIsSignal(value)) {
        if (value.signal === `done`) {
          onStop();
          events.signal(value.signal, value.context);
          if (disposeIfSourceDone) events.dispose(`Upstream source ${debugLabel} has completed (${value.context ?? ``})`);
        } else {
          events.signal(value.signal, value.context);
        }
      } else if (messageHasValue(value)) {
        onValue(value.value);
      }
    });
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart,
    onStop
  });
  return events;
}
function initLazyStream(options) {
  const lazy = options.lazy ?? `initial`;
  const onStop = options.onStop ?? (() => {
  });
  const onStart = options.onStart ?? (() => {
  });
  const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
  const events = initStream({
    ...options,
    onFirstSubscribe() {
      if (lazy !== `never`) {
        onStart();
      }
    },
    onNoSubscribers() {
      if (lazy === `very`) {
        onStop();
      }
    }
  });
  if (lazy === `never`) onStart();
  return events;
}
function initStream(options = {}) {
  let dispatcher;
  let disposed = false;
  let firstSubscribe = false;
  let emptySubscriptions = true;
  const onFirstSubscribe = options.onFirstSubscribe ?? void 0;
  const onNoSubscribers = options.onNoSubscribers ?? void 0;
  const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
  const isEmpty3 = () => {
    if (dispatcher === void 0) return;
    if (!dispatcher.isEmpty) return;
    if (!emptySubscriptions) {
      emptySubscriptions = true;
      firstSubscribe = false;
      if (onNoSubscribers) onNoSubscribers();
    }
  };
  const subscribe = (handler) => {
    if (disposed) throw new Error(`Disposed, cannot subscribe ${debugLabel}`);
    if (dispatcher === void 0) dispatcher = new DispatchList();
    const id = dispatcher.add(handler);
    emptySubscriptions = false;
    if (!firstSubscribe) {
      firstSubscribe = true;
      if (onFirstSubscribe) onFirstSubscribe();
    }
    return () => {
      dispatcher?.remove(id);
      isEmpty3();
    };
  };
  return {
    dispose: (reason) => {
      if (disposed) return;
      dispatcher?.notify({ value: void 0, signal: `done`, context: `Disposed: ${reason}` });
      disposed = true;
      if (options.onDispose) options.onDispose(reason);
    },
    isDisposed: () => {
      return disposed;
    },
    removeAllSubscribers: () => {
      dispatcher?.clear();
      isEmpty3();
    },
    set: (v) => {
      if (disposed) throw new Error(`${debugLabel} Disposed, cannot set`);
      dispatcher?.notify({ value: v });
    },
    // through: (pass: Passed<V>) => {
    //   if (disposed) throw new Error(`Disposed, cannot through`);
    //   dispatcher?.notify(pass)
    // },
    signal: (signal, context) => {
      if (disposed) throw new Error(`${debugLabel} Disposed, cannot signal`);
      dispatcher?.notify({ signal, value: void 0, context });
    },
    on: (handler) => subscribe(handler),
    onValue: (handler) => {
      const unsub = subscribe((message) => {
        if (messageHasValue(message)) {
          handler(message.value);
        }
      });
      return unsub;
    }
  };
}

// src/dom/SetProperty.ts
function setText(selectors, value) {
  return setProperty(`textContent`, selectors, value);
}
function setHtml(selectors, value) {
  return setProperty(`innerHTML`, selectors, value);
}
function setProperty(property, selectors, value) {
  let elements2 = [];
  const set = (v) => {
    const typ = typeof v;
    const vv = typ === `string` || typ === `number` || typ === `boolean` ? v : JSON.stringify(v);
    if (elements2.length === 0) {
      elements2 = resolveEls(selectors);
    }
    for (const element of elements2) {
      element[property] = vv;
    }
    return vv;
  };
  return value === void 0 ? set : set(value);
}

// src/rx/sinks/Dom.ts
var setHtmlText = (rxOrSource, optionsOrElementOrQuery) => {
  let el;
  let options;
  if (typeof optionsOrElementOrQuery === `string`) {
    options = { query: optionsOrElementOrQuery };
  }
  if (typeof optionsOrElementOrQuery === `object`) {
    if (`nodeName` in optionsOrElementOrQuery) {
      options = { el: optionsOrElementOrQuery };
    } else {
      options = optionsOrElementOrQuery;
    }
  }
  if (options === void 0) throw new TypeError(`Missing element as second parameter or option`);
  if (`el` in options) {
    el = options.el;
  } else if (`query` in options) {
    el = document.querySelector(options.query);
  } else {
    throw new TypeError(`Options does not include 'el' or 'query' fields`);
  }
  if (el === null || el === void 0) throw new Error(`Element could not be resolved.`);
  const stream = resolveSource(rxOrSource);
  const setter = setProperty(options.asHtml ? `innerHTML` : `textContent`, el);
  const off = stream.onValue((value) => {
    setter(value);
  });
  return off;
};

// src/rx/ToReadable.ts
var toReadable = (stream) => ({
  on: stream.on,
  dispose: stream.dispose,
  isDisposed: stream.isDisposed,
  onValue: stream.onValue
});

// src/rx/ops/Annotate.ts
function annotate(input, annotator, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const annotation = annotator(value);
      upstream.set({ value, annotation });
    }
  });
  return toReadable(upstream);
}
function annotateWithOp(input, annotatorOp) {
  const inputStream = resolveSource(input);
  const stream = annotatorOp(inputStream);
  const synced = syncToObject({
    value: inputStream,
    annotation: stream
  });
  return synced;
}

// src/rx/ops/Chunk.ts
function chunk(source, options = {}) {
  const queue = new QueueMutable();
  const quantity = options.quantity ?? 0;
  const returnRemainder = options.returnRemainder ?? true;
  const upstreamOpts = {
    ...options,
    onStop() {
      if (returnRemainder && !queue.isEmpty) {
        const data = queue.toArray();
        queue.clear();
        upstream.set(data);
      }
    },
    onValue(value) {
      queue.enqueue(value);
      if (quantity > 0 && queue.length >= quantity) {
        send();
      }
      if (timer !== void 0 && timer.runState === `idle`) {
        timer.start();
      }
    }
  };
  const upstream = initUpstream(source, upstreamOpts);
  const send = () => {
    if (queue.isEmpty) return;
    if (timer !== void 0) timer.start();
    const data = queue.toArray();
    queue.clear();
    setTimeout(() => upstream.set(data));
  };
  const timer = options.elapsed ? timeout(send, options.elapsed) : void 0;
  return toReadable(upstream);
}

// src/rx/ops/Transform.ts
function transform(input, transformer, options = {}) {
  const traceInput = options.traceInput ?? false;
  const traceOutput = options.traceOutput ?? false;
  const upstream = initUpstream(input, {
    lazy: `initial`,
    ...options,
    onValue(value) {
      const t2 = transformer(value);
      if (traceInput && traceOutput) {
        console.log(`Rx.Ops.transform input: ${JSON.stringify(value)} output: ${JSON.stringify(t2)}`);
      } else if (traceInput) {
        console.log(`Rx.Ops.transform input: ${JSON.stringify(value)}`);
      } else if (traceOutput) {
        console.log(`Rx.Ops.transform output: ${JSON.stringify(t2)}`);
      }
      upstream.set(t2);
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/CloneFromFields.ts
var cloneFromFields = (source) => {
  return transform(source, (v) => {
    const entries = [];
    for (const field2 in v) {
      const value = v[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return Object.fromEntries(entries);
  });
};

// src/rx/ops/CombineLatestToArray.ts
function combineLatestToArray(reactiveSources, options = {}) {
  const event2 = initStream();
  const onSourceDone = options.onSourceDone ?? `break`;
  const data = [];
  const sources = reactiveSources.map((source) => resolveSource(source));
  const noop = () => {
  };
  const sourceOff = sources.map((_) => noop);
  const doneSources = sources.map((_) => false);
  const unsub = () => {
    for (const v of sourceOff) {
      v();
    }
  };
  for (const [index, v] of sources.entries()) {
    data[index] = void 0;
    sourceOff[index] = v.on((message) => {
      if (messageIsDoneSignal(message)) {
        doneSources[index] = true;
        sourceOff[index]();
        sourceOff[index] = noop;
        if (onSourceDone === `break`) {
          unsub();
          event2.dispose(`Source has completed and 'break' is set`);
          return;
        }
        if (!doneSources.includes(false)) {
          unsub();
          event2.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        data[index] = message.value;
        event2.set([...data]);
      }
    });
  }
  return {
    dispose: event2.dispose,
    isDisposed: event2.isDisposed,
    on: event2.on,
    onValue: event2.onValue
  };
}

// src/data/Pathed.ts
var Pathed_exports = {};
__export(Pathed_exports, {
  applyChanges: () => applyChanges,
  compareData: () => compareData2,
  getField: () => getField,
  getPaths: () => getPaths,
  getPathsAndData: () => getPathsAndData,
  updateByPath: () => updateByPath
});

// src/data/Util.ts
var isEmptyEntries = (value) => [...Object.entries(value)].length === 0;
var isEqualContextString = (a, b, _path) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

// src/data/Pathed.ts
var getEntries = (target, deepProbe) => {
  if (target === void 0) throw new Error(`Param 'target' is undefined`);
  if (target === null) throw new Error(`Param 'target' is null`);
  if (typeof target !== `object`) throw new Error(`Param 'target' is not an object (got: ${typeof target})`);
  if (deepProbe) {
    const entries = [];
    for (const field2 in target) {
      const value = target[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return entries;
  } else {
    return Object.entries(target);
  }
};
function* compareData2(a, b, options = {}) {
  if (a === void 0) {
    yield {
      path: options.pathPrefix ?? ``,
      value: b,
      state: `added`
    };
    return;
  }
  if (b === void 0) {
    yield { path: options.pathPrefix ?? ``, previous: a, value: void 0, state: `removed` };
    return;
  }
  const asPartial = options.asPartial ?? false;
  const undefinedValueMeansRemoved = options.undefinedValueMeansRemoved ?? false;
  const pathPrefix = options.pathPrefix ?? ``;
  const deepEntries = options.deepEntries ?? false;
  const eq = options.eq ?? isEqualContextString;
  const includeMissingFromA = options.includeMissingFromA ?? false;
  const includeParents = options.includeParents ?? false;
  if (isPrimitive(a) && isPrimitive(b)) {
    if (a !== b) yield { path: pathPrefix, value: b, previous: a, state: `change` };
    return;
  }
  if (isPrimitive(b)) {
    yield { path: pathPrefix, value: b, previous: a, state: `change` };
    return;
  }
  const entriesA = getEntries(a, deepEntries);
  const entriesAKeys = /* @__PURE__ */ new Set();
  for (const [key, valueA] of entriesA) {
    entriesAKeys.add(key);
    const keyOfAInB = key in b;
    const valueOfKeyInB = b[key];
    if (typeof valueA === `object` && valueA !== null) {
      if (keyOfAInB) {
        if (valueOfKeyInB === void 0) {
          throw new Error(`Pathed.compareData Value for key ${key} is undefined`);
        } else {
          const sub = [...compareData2(valueA, valueOfKeyInB, {
            ...options,
            pathPrefix: pathPrefix + key + `.`
          })];
          if (sub.length > 0) {
            for (const s of sub) yield s;
            if (includeParents) {
              yield { path: pathPrefix + key, value: b[key], previous: valueA, state: `change` };
            }
          }
        }
      } else {
        if (asPartial) continue;
        yield { path: pathPrefix + key, value: void 0, previous: valueA, state: `removed` };
      }
    } else {
      const subPath = pathPrefix + key;
      if (keyOfAInB) {
        if (valueOfKeyInB === void 0 && undefinedValueMeansRemoved) {
          yield { path: subPath, previous: valueA, value: void 0, state: `removed` };
        } else {
          if (!eq(valueA, valueOfKeyInB, subPath)) {
            yield { path: subPath, previous: valueA, value: valueOfKeyInB, state: `change` };
          }
        }
      } else {
        if (asPartial) continue;
        yield { path: subPath, previous: valueA, value: void 0, state: `removed` };
      }
    }
  }
  if (includeMissingFromA) {
    const entriesB = getEntries(b, deepEntries);
    for (const [key, valueB] of entriesB) {
      if (entriesAKeys.has(key)) continue;
      yield { path: pathPrefix + key, previous: void 0, value: valueB, state: `added` };
    }
  }
}
var applyChanges = (source, changes) => {
  for (const change of changes) {
    source = updateByPath(source, change.path, change.value);
  }
  return source;
};
var updateByPath = (target, path, value, allowShapeChange = false) => {
  if (path === void 0) throw new Error(`Parameter 'path' is undefined`);
  if (typeof path !== `string`) throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
  if (target === void 0) throw new Error(`Parameter 'target' is undefined`);
  if (target === null) throw new Error(`Parameter 'target' is null`);
  const split2 = path.split(`.`);
  const r = updateByPathImpl(target, split2, value, allowShapeChange);
  return r;
};
var updateByPathImpl = (o, split2, value, allowShapeChange) => {
  if (split2.length === 0) {
    if (allowShapeChange) return value;
    if (Array.isArray(o) && !Array.isArray(value)) throw new Error(`Expected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
    if (!Array.isArray(o) && Array.isArray(value)) throw new Error(`Unexpected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
    if (typeof o !== typeof value) throw new Error(`Cannot reassign object type. (${typeof o} -> ${typeof value}). Set allowShapeChange=true to ignore.`);
    if (typeof o === `object` && !Array.isArray(o)) {
      const c = compareKeys(o, value);
      if (c.a.length > 0) {
        throw new Error(`New value is missing key(s): ${c.a.join(`,`)}`);
      }
      if (c.b.length > 0) {
        throw new Error(`New value cannot add new key(s): ${c.b.join(`,`)}`);
      }
    }
    return value;
  }
  const start = split2.shift();
  if (!start) return value;
  const isInt = isInteger(start);
  if (isInt && Array.isArray(o)) {
    const index = Number.parseInt(start);
    if (index >= o.length && !allowShapeChange) throw new Error(`Array index ${index.toString()} is outside of the existing length of ${o.length.toString()}. Use allowShapeChange=true to permit this.`);
    const copy = [...o];
    copy[index] = updateByPathImpl(copy[index], split2, value, allowShapeChange);
    return copy;
  } else if (start in o) {
    const copy = { ...o };
    copy[start] = updateByPathImpl(copy[start], split2, value, allowShapeChange);
    return copy;
  } else {
    throw new Error(`Path ${start} not found in data`);
  }
};
var getField = (object2, path) => {
  if (typeof path !== `string`) throw new Error(`Param 'path' ought to be a string. Got: '${typeof path}'`);
  if (path.length === 0) throw new Error(`Param string 'path' is empty`);
  if (object2 === void 0) throw new Error(`Param 'object' is undefined`);
  if (object2 === null) throw new Error(`Param 'object' is null`);
  const split2 = path.split(`.`);
  const v = getFieldImpl(object2, split2);
  return v;
};
var getFieldImpl = (object2, split2) => {
  if (object2 === void 0) throw new Error(`Param 'object' is undefined`);
  if (split2.length === 0) throw new Error(`Path has run out`);
  const start = split2.shift();
  if (!start) throw new Error(`Unexpected empty split path`);
  const isInt = isInteger(start);
  if (isInt && Array.isArray(object2)) {
    const index = Number.parseInt(start);
    if (typeof object2[index] === `undefined`) {
      return { success: false, error: `Index '${index}' does not exist. Length: ${object2.length}` };
    }
    if (split2.length === 0) {
      return { value: object2[index], success: true };
    } else {
      return getFieldImpl(object2[index], split2);
    }
  } else if (typeof object2 === `object` && start in object2) {
    if (split2.length === 0) {
      return { value: object2[start], success: true };
    } else {
      return getFieldImpl(object2[start], split2);
    }
  } else {
    return { success: false, error: `Path '${start}' not found` };
  }
};
function* getPaths(object2, onlyLeaves = false) {
  if (object2 === void 0 || object2 === null) return;
  const iter = depthFirst(object2);
  for (const c of iter) {
    if (c.nodeValue === void 0 && onlyLeaves) continue;
    let path = c.name;
    if (c.ancestors.length > 0) path = c.ancestors.join(`.`) + `.` + path;
    yield path;
  }
}
function* getPathsAndData(o, onlyLeaves = false, maxDepth = Number.MAX_SAFE_INTEGER, prefix = ``) {
  if (o === null) return;
  if (o === void 0) return;
  yield* getPathsAndDataImpl(o, prefix, onlyLeaves, maxDepth);
}
function* getPathsAndDataImpl(o, prefix, onlyLeaves = false, maxDepth) {
  if (maxDepth <= 0) return;
  if (typeof o !== `object`) return;
  for (const entries of Object.entries(o)) {
    const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
    const value = entries[1];
    const leaf = typeof value !== `object`;
    if (onlyLeaves && leaf || !onlyLeaves) {
      yield { path: sub, value };
    }
    yield* getPathsAndDataImpl(value, sub, onlyLeaves, maxDepth - 1);
  }
}

// src/rx/sources/Object.ts
function object(initialValue, options = {}) {
  const eq = options.eq ?? isEqualContextString;
  const setEvent = initStream();
  const diffEvent = initStream();
  const fieldChangeEvents = [];
  let value = initialValue;
  let disposed = false;
  const set = (v) => {
    const diff = [...compareData2(value ?? {}, v, { ...options, includeMissingFromA: true })];
    if (diff.length === 0) return;
    value = v;
    setEvent.set(v);
    diffEvent.set(diff);
  };
  const fireFieldUpdate = (field2, value2) => {
    for (const [matcher, pattern, list] of fieldChangeEvents) {
      if (matcher(field2)) {
        list.notify({ fieldName: field2, pattern, value: value2 });
      }
    }
  };
  const updateCompareOptions = {
    asPartial: true,
    includeParents: true
  };
  const update = (toMerge) => {
    if (value === void 0) {
      value = toMerge;
      setEvent.set(value);
      for (const [k, v] of Object.entries(toMerge)) {
        fireFieldUpdate(k, v);
      }
      return value;
    } else {
      const diff = [...compareData2(value, toMerge, updateCompareOptions)];
      if (diff.length === 0) return value;
      value = {
        ...value,
        ...toMerge
      };
      setEvent.set(value);
      diffEvent.set(diff);
      for (const d of diff) {
        fireFieldUpdate(d.path, d.value);
      }
      return value;
    }
  };
  const updateField = (path, valueForField) => {
    if (value === void 0) throw new Error(`Cannot update value when it has not already been set`);
    const existing = getField(value, path);
    throwResult(existing);
    if (eq(existing.value, valueForField, path)) {
      return;
    }
    let diff = [...compareData2(existing.value, valueForField, { ...options, includeMissingFromA: true })];
    diff = diff.map((d) => {
      if (d.path.length > 0) return { ...d, path: path + `.` + d.path };
      return { ...d, path };
    });
    const o = updateByPath(value, path, valueForField, true);
    value = o;
    setEvent.set(o);
    diffEvent.set(diff);
    fireFieldUpdate(path, valueForField);
  };
  const dispose = (reason) => {
    if (disposed) return;
    diffEvent.dispose(reason);
    setEvent.dispose(reason);
    disposed = true;
  };
  return {
    dispose,
    isDisposed() {
      return disposed;
    },
    /**
     * Update a field.
     * Exception is thrown if field does not exist
     */
    updateField,
    last: () => value,
    on: setEvent.on,
    onValue: setEvent.onValue,
    onDiff: diffEvent.onValue,
    onField(fieldPattern, handler) {
      const matcher = wildcard(fieldPattern);
      const listeners = new DispatchList();
      fieldChangeEvents.push([matcher, fieldPattern, listeners]);
      const id = listeners.add(handler);
      return () => listeners.remove(id);
    },
    /**
     * Set the whole object
     */
    set,
    /**
     * Update the object with a partial set of fields and values
     */
    update
  };
}

// src/rx/ops/CombineLatestToObject.ts
function combineLatestToObject(reactiveSources, options = {}) {
  const disposeSources = options.disposeSources ?? true;
  const event2 = object(void 0);
  const onSourceDone = options.onSourceDone ?? `break`;
  const emitInitial = options.emitInitial ?? true;
  let emitInitialDone = false;
  const states = /* @__PURE__ */ new Map();
  for (const [key, source] of Object.entries(reactiveSources)) {
    const initialData = `last` in source ? source.last() : void 0;
    const s = {
      source: resolveSource(source),
      done: false,
      data: initialData,
      off: () => {
      }
    };
    states.set(key, s);
  }
  const sources = Object.fromEntries(Object.entries(states).map((entry) => [entry[0], entry[1].source]));
  const someUnfinished = () => some(states, (v) => !v.done);
  const unsub = () => {
    for (const state of states.values()) state.off();
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) {
      const d = state.data;
      if (d !== void 0) {
        r[key] = state.data;
      }
    }
    return r;
  };
  const trigger = () => {
    emitInitialDone = true;
    const d = getData();
    event2.set(d);
  };
  const wireUpState = (state) => {
    state.off = state.source.on((message) => {
      if (messageIsDoneSignal(message)) {
        state.done = true;
        state.off();
        state.off = () => {
        };
        if (onSourceDone === `break`) {
          unsub();
          event2.dispose(`Source has completed and 'break' is behaviour`);
          return;
        }
        if (!someUnfinished()) {
          unsub();
          event2.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        state.data = message.value;
        trigger();
      }
    });
  };
  for (const state of states.values()) {
    wireUpState(state);
  }
  if (!emitInitialDone && emitInitial) {
    trigger();
  }
  return {
    ...event2,
    hasSource(field2) {
      return states.has(field2);
    },
    replaceSource(field2, source) {
      const state = states.get(field2);
      if (state === void 0) throw new Error(`Field does not exist: '${field2}'`);
      state.off();
      const s = resolveSource(source);
      state.source = s;
      wireUpState(state);
    },
    setWith(data) {
      let written = {};
      for (const [key, value] of Object.entries(data)) {
        const state = states.get(key);
        if (state !== void 0) {
          if (isWritable(state.source)) {
            state.source.set(value);
            written[key] = value;
          }
          state.data = value;
        }
      }
      return written;
    },
    sources,
    last() {
      return getData();
    },
    dispose(reason) {
      unsub();
      event2.dispose(reason);
      if (disposeSources) {
        for (const v of states.values()) {
          v.source.dispose(`Part of disposed mergeToObject`);
        }
      }
    }
  };
}

// src/rx/ops/ComputeWithPrevious.ts
function computeWithPrevious(input, fn) {
  let previousValue;
  let currentValue;
  if (hasLast(input)) {
    currentValue = previousValue = input.last();
  }
  const trigger = () => {
    if (previousValue === void 0 && currentValue !== void 0) {
      previousValue = currentValue;
      upstream.set(previousValue);
    } else if (previousValue !== void 0 && currentValue !== void 0) {
      const vv = fn(previousValue, currentValue);
      previousValue = vv;
      upstream.set(vv);
    }
  };
  const upstream = initUpstream(input, {
    lazy: "very",
    debugLabel: `computeWithPrevious`,
    onValue(value) {
      currentValue = value;
      trigger();
    }
  });
  if (currentValue) trigger();
  return {
    ...toReadable(upstream),
    ping: () => {
      if (currentValue !== void 0) trigger();
    }
  };
}

// src/rx/ops/Debounce.ts
function debounce(source, options = {}) {
  const elapsed2 = intervalToMs(options.elapsed, 50);
  let lastValue;
  const timer = timeout(() => {
    const v = lastValue;
    if (v) {
      upstream.set(v);
      lastValue = void 0;
    }
  }, elapsed2);
  const upstream = initUpstream(source, {
    ...options,
    onValue(value) {
      lastValue = value;
      timer.start();
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Elapsed.ts
var elapsed = (input) => {
  let last = 0;
  return transform(input, (_ignored) => {
    const elapsed2 = last === 0 ? 0 : Date.now() - last;
    last = Date.now();
    return elapsed2;
  });
};

// src/rx/ops/Field.ts
function field(fieldSource, fieldName, options = {}) {
  const fallbackFieldValue = options.fallbackFieldValue;
  const fallbackObject = options.fallbackObject;
  const upstream = initUpstream(fieldSource, {
    disposeIfSourceDone: true,
    ...options,
    onValue(value) {
      let v;
      if (fieldName in value) {
        v = value[fieldName];
      } else if (fallbackObject && fieldName in fallbackObject) {
        v = fallbackObject[fieldName];
      }
      if (v === void 0) {
        v = fallbackFieldValue;
      }
      if (v !== void 0) {
        upstream.set(v);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Filter.ts
function filter3(input, predicate, options) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      if (predicate(value)) {
        upstream.set(value);
      }
    }
  });
  return toReadable(upstream);
}
function drop(input, predicate, options) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      if (!predicate(value)) {
        upstream.set(value);
      }
    }
  });
  return toReadable(upstream);
}

// src/numbers/Wrap.ts
var wrapInteger = (v, min6 = 0, max5 = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min6, void 0, `min`);
  throwIntegerTest(max5, void 0, `max`);
  if (v === min6) return min6;
  if (v === max5) return min6;
  if (v > 0 && v < min6) v += min6;
  v -= min6;
  max5 -= min6;
  v = v % max5;
  if (v < 0) v = max5 - Math.abs(v) + min6;
  return v + min6;
};
var wrap = (v, min6 = 0, max5 = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min6, ``, `min`);
  throwNumberTest(max5, ``, `max`);
  if (v === min6) return min6;
  if (v === max5) return min6;
  while (v <= min6 || v >= max5) {
    if (v === max5) break;
    if (v === min6) break;
    if (v > max5) {
      v = min6 + (v - max5);
    } else if (v < min6) {
      v = max5 - (min6 - v);
    }
  }
  return v;
};
var wrapRange = (min6, max5, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max5 - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min6, max5);
};

// src/modulation/easing/index.ts
var easing_exports = {};
__export(easing_exports, {
  Named: () => EasingsNamed_exports,
  create: () => create2,
  get: () => get,
  getEasingNames: () => getEasingNames,
  line: () => line,
  tickEasing: () => tickEasing,
  ticks: () => ticks2,
  time: () => time2,
  timeEasing: () => timeEasing
});

// src/modulation/easing/EasingsNamed.ts
var EasingsNamed_exports = {};
__export(EasingsNamed_exports, {
  arch: () => arch,
  backIn: () => backIn,
  backInOut: () => backInOut,
  backOut: () => backOut,
  bell: () => bell,
  bounceIn: () => bounceIn,
  bounceInOut: () => bounceInOut,
  bounceOut: () => bounceOut,
  circIn: () => circIn,
  circInOut: () => circInOut,
  circOut: () => circOut,
  cubicIn: () => cubicIn,
  cubicOut: () => cubicOut,
  elasticIn: () => elasticIn,
  elasticInOut: () => elasticInOut,
  elasticOut: () => elasticOut,
  expoIn: () => expoIn,
  expoInOut: () => expoInOut,
  expoOut: () => expoOut,
  quadIn: () => quadIn,
  quadInOut: () => quadInOut,
  quadOut: () => quadOut,
  quartIn: () => quartIn,
  quartOut: () => quartOut,
  quintIn: () => quintIn,
  quintInOut: () => quintInOut,
  quintOut: () => quintOut,
  sineIn: () => sineIn,
  sineInOut: () => sineInOut,
  sineOut: () => sineOut,
  smootherstep: () => smootherstep,
  smoothstep: () => smoothstep
});

// src/modulation/Gaussian.ts
var pow = Math.pow;
var gaussianA = 1 / Math.sqrt(2 * Math.PI);
var gaussian = (standardDeviation = 0.4) => {
  const mean = 0.5;
  return (t2) => {
    const f = gaussianA / standardDeviation;
    let p = -2.5;
    let c = (t2 - mean) / standardDeviation;
    c *= c;
    p *= c;
    const v = f * pow(Math.E, p);
    if (v > 1) return 1;
    if (v < 0) return 0;
    return v;
  };
};

// src/modulation/easing/EasingsNamed.ts
var sqrt = Math.sqrt;
var pow2 = Math.pow;
var cos = Math.cos;
var pi = Math.PI;
var sin = Math.sin;
var bounceOut = (x) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var quintIn = (x) => x * x * x * x * x;
var quintOut = (x) => 1 - pow2(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var smoothstep = (x) => x * x * (3 - 2 * x);
var smootherstep = (x) => (x * (x * 6 - 15) + 10) * x * x * x;
var sineIn = (x) => 1 - cos(x * pi / 2);
var sineOut = (x) => sin(x * pi / 2);
var quadIn = (x) => x * x;
var quadOut = (x) => 1 - (1 - x) * (1 - x);
var sineInOut = (x) => -(cos(pi * x) - 1) / 2;
var quadInOut = (x) => x < 0.5 ? 2 * x * x : 1 - pow2(-2 * x + 2, 2) / 2;
var cubicIn = (x) => x * x * x;
var cubicOut = (x) => 1 - pow2(1 - x, 3);
var quartIn = (x) => x * x * x * x;
var quartOut = (x) => 1 - pow2(1 - x, 4);
var expoIn = (x) => x === 0 ? 0 : pow2(2, 10 * x - 10);
var expoOut = (x) => x === 1 ? 1 : 1 - pow2(2, -10 * x);
var quintInOut = (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow2(-2 * x + 2, 5) / 2;
var expoInOut = (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow2(2, 20 * x - 10) / 2 : (2 - pow2(2, -20 * x + 10)) / 2;
var circIn = (x) => 1 - sqrt(1 - pow2(x, 2));
var circOut = (x) => sqrt(1 - pow2(x - 1, 2));
var backIn = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};
var backOut = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * pow2(x - 1, 3) + c1 * pow2(x - 1, 2);
};
var circInOut = (x) => x < 0.5 ? (1 - sqrt(1 - pow2(2 * x, 2))) / 2 : (sqrt(1 - pow2(-2 * x + 2, 2)) + 1) / 2;
var backInOut = (x) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5 ? pow2(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow2(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
var elasticIn = (x) => {
  const c4 = 2 * pi / 3;
  return x === 0 ? 0 : x === 1 ? 1 : -pow2(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
};
var elasticOut = (x) => {
  const c4 = 2 * pi / 3;
  return x === 0 ? 0 : x === 1 ? 1 : pow2(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
};
var bounceIn = (x) => 1 - bounceOut(1 - x);
var bell = gaussian();
var elasticInOut = (x) => {
  const c5 = 2 * pi / 4.5;
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow2(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow2(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
};
var bounceInOut = (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;

// src/geometry/point/index.ts
var point_exports = {};
__export(point_exports, {
  Empty: () => Empty,
  Empty3d: () => Empty3d,
  Placeholder: () => Placeholder,
  Placeholder3d: () => Placeholder3d,
  Unit: () => Unit,
  Unit3d: () => Unit3d,
  abs: () => abs,
  angleRadian: () => angleRadian,
  angleRadianCircle: () => angleRadianCircle,
  apply: () => apply,
  averager: () => averager,
  bbox: () => bbox,
  centroid: () => centroid,
  clamp: () => clamp2,
  clampMagnitude: () => clampMagnitude,
  compare: () => compare,
  compareByX: () => compareByX,
  compareByY: () => compareByY,
  compareByZ: () => compareByZ,
  convexHull: () => convexHull,
  distance: () => distance,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide,
  divider: () => divider,
  dotProduct: () => dotProduct2,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers,
  fromString: () => fromString,
  getPointParameter: () => getPointParameter,
  getTwoPointParameters: () => getTwoPointParameters,
  guard: () => guard,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate2,
  invert: () => invert,
  isEmpty: () => isEmpty,
  isEqual: () => isEqual,
  isNaN: () => isNaN,
  isNull: () => isNull,
  isPlaceholder: () => isPlaceholder,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  leftmost: () => leftmost,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  normalise: () => normalise,
  normaliseByRect: () => normaliseByRect,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  progressBetween: () => progressBetween,
  project: () => project,
  quantiseEvery: () => quantiseEvery2,
  random: () => random,
  random3d: () => random3d,
  reduce: () => reduce2,
  relation: () => relation,
  rightmost: () => rightmost,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  round: () => round2,
  subtract: () => subtract,
  sum: () => sum,
  to2d: () => to2d,
  to3d: () => to3d,
  toArray: () => toArray3,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString2,
  withinRange: () => withinRange,
  wrap: () => wrap2
});

// src/geometry/point/Abs.ts
function abs(pt) {
  if (isPoint3d(pt)) {
    return Object.freeze({
      ...pt,
      x: Math.abs(pt.x),
      y: Math.abs(pt.y),
      z: Math.abs(pt.z)
    });
  } else if (isPoint(pt)) {
    return Object.freeze({
      ...pt,
      x: Math.abs(pt.x),
      y: Math.abs(pt.y)
    });
  } else throw new TypeError(`Param 'pt' is not a point`);
}

// src/geometry/point/Angle.ts
var angleRadian = (a, b, c) => {
  guard(a, `a`);
  if (b === void 0) {
    return Math.atan2(a.y, a.x);
  }
  guard(b, `b`);
  if (c === void 0) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }
  guard(c, `c`);
  return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};
var angleRadianCircle = (a, b, c) => {
  const angle = angleRadian(a, b, c);
  if (angle < 0) return angle + piPi;
  return angle;
};

// src/geometry/point/Apply.ts
function apply(pt, fn) {
  guard(pt, `pt`);
  if (isPoint3d(pt)) {
    return Object.freeze({
      ...pt,
      x: fn(pt.x, `x`),
      y: fn(pt.y, `y`),
      z: fn(pt.z, `z`)
    });
  }
  return Object.freeze({
    ...pt,
    x: fn(pt.x, `x`),
    y: fn(pt.y, `y`)
  });
}

// src/numbers/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`) weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce(
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
};

// src/numbers/MovingAverage.ts
var PiPi = Math.PI * 2;
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average4 = 0;
  let count2 = 0;
  return (v) => {
    const r = numberTest(v, ``, `v`);
    if (r[0] && v !== void 0) {
      count2++;
      average4 = average4 + (v - average4) / Math.min(count2, scaling);
    }
    return average4;
  };
};
var movingAverageTimed = (options) => {
  const average4 = movingAverageLight();
  const rm = rateMinimum({
    ...options,
    whatToCall: (distance3) => {
      average4(distance3);
    },
    fallback() {
      return options.default ?? 0;
    }
  });
  return (v) => {
    rm(v);
    return average4();
  };
};
var movingAverage = (samples = 100, weighter) => {
  const q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  return (v) => {
    const r = numberTest(v);
    if (r[0] && v !== void 0) {
      q.enqueue(v);
    }
    return weighter === void 0 ? average(q.data) : averageWeighted(q.data, weighter);
  };
};
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor2, value, previous) => {
  return smoothingFactor2 * value + (1 - smoothingFactor2) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value, timestamp) => {
    if (timestamp === void 0) timestamp = performance.now();
    const timeDelta = timestamp - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp;
    return smoothed;
  };
  return compute;
};

// src/geometry/point/Averager.ts
function averager(kind, opts) {
  let x;
  let y;
  let z;
  switch (kind) {
    case `moving-average-light`:
      const scaling = opts.scaling ?? 3;
      x = movingAverageLight(scaling);
      y = movingAverageLight(scaling);
      z = movingAverageLight(scaling);
      break;
    default:
      throw new Error(`Unknown averaging kind '${kind}'. Expected: 'moving-average-light'`);
  }
  return (point) => {
    let ax = x(point.x);
    let ay = y(point.y);
    if (isPoint3d(point)) {
      let az = z(point.z);
      return Object.freeze({
        x: ax,
        y: ay,
        z: az
      });
    } else {
      return Object.freeze({
        x: ax,
        y: ay
      });
    }
  };
}

// src/geometry/point/FindMinimum.ts
var findMinimum = (comparer, ...points) => {
  if (points.length === 0) throw new Error(`No points provided`);
  let min6 = points[0];
  for (const p of points) {
    min6 = comparer(min6, p);
  }
  return min6;
};

// src/geometry/rect/Max.ts
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y) {
    throw new Error(`topLeft.y greater than bottomRight.y`);
  }
  if (topLeft.y > bottomLeft.y) {
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  }
  const w1 = topRight.x - topLeft.x;
  const w2 = bottomRight.x - bottomLeft.x;
  const h1 = Math.abs(bottomLeft.y - topLeft.y);
  const h2 = Math.abs(bottomRight.y - topRight.y);
  return {
    x: Math.min(topLeft.x, bottomLeft.x),
    y: Math.min(topRight.y, topLeft.y),
    width: Math.max(w1, w2),
    height: Math.max(h1, h2)
  };
};

// src/geometry/point/Bbox.ts
var bbox = (...points) => {
  const leftMost = findMinimum((a, b) => {
    return a.x < b.x ? a : b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    return a.x > b.x ? a : b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    return a.y < b.y ? a : b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    return a.y > b.y ? a : b;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};

// src/geometry/point/Centroid.ts
var centroid = (...points) => {
  if (!Array.isArray(points)) throw new Error(`Expected list of points`);
  const sum4 = points.reduce(
    (previous, p) => {
      if (p === void 0) return previous;
      if (Array.isArray(p)) {
        throw new TypeError(
          `'points' list contains an array. Did you mean: centroid(...myPoints)?`
        );
      }
      if (!isPoint(p)) {
        throw new Error(
          `'points' contains something which is not a point: ${JSON.stringify(
            p
          )}`
        );
      }
      return {
        x: previous.x + p.x,
        y: previous.y + p.y
      };
    },
    { x: 0, y: 0 }
  );
  return Object.freeze({
    x: sum4.x / points.length,
    y: sum4.y / points.length
  });
};

// src/geometry/point/Clamp.ts
function clamp2(a, min6 = 0, max5 = 1) {
  if (isPoint3d(a)) {
    return Object.freeze({
      x: clamp(a.x, min6, max5),
      y: clamp(a.y, min6, max5),
      z: clamp(a.z, min6, max5)
    });
  } else {
    return Object.freeze({
      x: clamp(a.x, min6, max5),
      y: clamp(a.y, min6, max5)
    });
  }
}

// src/geometry/point/Compare.ts
var compare = (a, b) => {
  if (a.x < b.x && a.y < b.y) return -2;
  if (a.x > b.x && a.y > b.y) return 2;
  if (a.x < b.x || a.y < b.y) return -1;
  if (a.x > b.x || a.y > b.y) return 1;
  if (a.x === b.x && a.x === b.y) return 0;
  return Number.NaN;
};
var compareByX = (a, b) => {
  if (a.x === b.x) return 0;
  if (a.x < b.x) return -1;
  return 1;
};
var compareByY = (a, b) => {
  if (a.y === b.y) return 0;
  if (a.y < b.y) return -1;
  return 1;
};
var compareByZ = (a, b) => {
  if (a.z === b.z) return 0;
  if (a.z < b.z) return -1;
  return 1;
};

// src/geometry/point/IsEqual.ts
var isEqual = (...p) => {
  if (p === void 0) throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2) return true;
  for (let index = 1; index < p.length; index++) {
    if (p[index].x !== p[0].x) return false;
    if (p[index].y !== p[0].y) return false;
  }
  return true;
};

// src/geometry/point/ConvexHull.ts
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1) return sorted;
  const x = (points) => {
    const v = [];
    for (const p of points) {
      while (v.length >= 2) {
        const q = v.at(-1);
        const r = v.at(-2);
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) {
          v.pop();
        } else break;
      }
      v.push(p);
    }
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual(lower[0], upper[0])) {
    return upper;
  }
  return [...upper, ...lower];
};

// src/geometry/point/GetPointParameter.ts
function getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6) {
  if (isPoint3d(a1) && isPoint3d(ab2)) return [a1, ab2];
  if (isPoint(a1) && isPoint(ab2)) return [a1, ab2];
  if (isPoint3d(a1)) {
    const b2 = {
      x: ab2,
      y: ab3,
      z: ab4
    };
    if (!isPoint3d(b2)) throw new Error(`Expected x, y & z parameters`);
    return [a1, b2];
  }
  if (isPoint(a1)) {
    const b2 = {
      x: ab2,
      y: ab3
    };
    if (!isPoint(b2)) throw new Error(`Expected x & y parameters`);
    return [a1, b2];
  }
  if (typeof ab5 !== `undefined` && typeof ab4 !== `undefined`) {
    const a2 = {
      x: a1,
      y: ab2,
      z: ab3
    };
    const b2 = {
      x: ab4,
      y: ab5,
      z: ab6
    };
    if (!isPoint3d(a2)) throw new Error(`Expected x,y,z for first point`);
    if (!isPoint3d(b2)) throw new Error(`Expected x,y,z for second point`);
    return [a2, b2];
  }
  const a = {
    x: a1,
    y: ab2
  };
  const b = {
    x: ab3,
    y: ab4
  };
  if (!isPoint(a)) throw new Error(`Expected x,y for first point`);
  if (!isPoint(b)) throw new Error(`Expected x,y for second point`);
  return [a, b];
}
function getPointParameter(a, b, c) {
  if (a === void 0) return { x: 0, y: 0 };
  if (Array.isArray(a)) {
    if (a.length === 0) return Object.freeze({ x: 0, y: 0 });
    if (a.length === 1) return Object.freeze({ x: a[0], y: 0 });
    if (a.length === 2) return Object.freeze({ x: a[0], y: a[1] });
    if (a.length === 3) return Object.freeze({ x: a[0], y: a[1], z: a[2] });
    throw new Error(
      `Expected array to be 1-3 elements in length. Got ${a.length}.`
    );
  }
  if (isPoint(a)) {
    return a;
  } else if (typeof a !== `number` || typeof b !== `number`) {
    throw new TypeError(
      `Expected point or x,y as parameters. Got: a: ${JSON.stringify(
        a
      )} b: ${JSON.stringify(b)}`
    );
  }
  if (typeof c === `number`) {
    return Object.freeze({ x: a, y: b, z: c });
  }
  return Object.freeze({ x: a, y: b });
}

// src/geometry/point/Distance.ts
function distance(a, xOrB, y, z) {
  const pt = getPointParameter(xOrB, y, z);
  guard(pt, `b`);
  guard(a, `a`);
  return isPoint3d(pt) && isPoint3d(a) ? Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z) : Math.hypot(pt.x - a.x, pt.y - a.y);
}

// src/geometry/circle/Guard.ts
var guard2 = (circle, parameterName = `circle`) => {
  if (isCirclePositioned(circle)) {
    guard(circle, `circle`);
  }
  if (Number.isNaN(circle.radius)) throw new Error(`${parameterName}.radius is NaN`);
  if (circle.radius <= 0) throw new Error(`${parameterName}.radius must be greater than zero`);
};
var guardPositioned = (circle, parameterName = `circle`) => {
  if (!isCirclePositioned(circle)) throw new Error(`Expected a positioned circle with x,y`);
  guard2(circle, parameterName);
};
var isNaN2 = (a) => {
  if (Number.isNaN(a.radius)) return true;
  if (isCirclePositioned(a)) {
    if (Number.isNaN(a.x)) return true;
    if (Number.isNaN(a.y)) return true;
  }
  return false;
};
var isPositioned = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned(p);

// src/geometry/circle/DistanceCenter.ts
var distanceCenter = (a, b) => {
  guardPositioned(a, `a`);
  if (isCirclePositioned(b)) {
    guardPositioned(b, `b`);
  }
  return distance(a, b);
};

// src/geometry/circle/DistanceFromExterior.ts
var distanceFromExterior = (a, b) => {
  guardPositioned(a, `a`);
  if (isCirclePositioned(b)) {
    return Math.max(0, distanceCenter(a, b) - a.radius - b.radius);
  } else if (isPoint(b)) {
    const distribution = distance(a, b);
    if (distribution < a.radius) return 0;
    return distribution;
  } else throw new Error(`Second parameter invalid type`);
};

// src/geometry/rect/Guard.ts
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0) throw new Error(`${name} is undefined`);
  if (Number.isNaN(d)) throw new Error(`${name} is NaN`);
  if (d < 0) throw new Error(`${name} cannot be negative`);
};
var guard3 = (rect, name = `rect`) => {
  if (rect === void 0) throw new Error(`{$name} undefined`);
  if (isPositioned2(rect)) guard(rect, name);
  guardDim(rect.width, name + `.width`);
  guardDim(rect.height, name + `.height`);
};
var getRectPositioned = (rect, origin) => {
  guard3(rect);
  if (isPositioned2(rect) && origin === void 0) {
    return rect;
  }
  if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
  return Object.freeze({ ...rect, ...origin });
};
var guardPositioned2 = (rect, name = `rect`) => {
  if (!isPositioned2(rect)) throw new Error(`Expected ${name} to have x,y`);
  guard3(rect, name);
};
var isEmpty2 = (rect) => rect.width === 0 && rect.height === 0;
var isPlaceholder2 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
var isPositioned2 = (rect) => rect.x !== void 0 && rect.y !== void 0;
var isRect = (rect) => {
  if (rect === void 0) return false;
  if (rect.width === void 0) return false;
  if (rect.height === void 0) return false;
  return true;
};
var isRectPositioned = (rect) => isRect(rect) && isPositioned2(rect);

// src/geometry/circle/IsEqual.ts
var isEqual2 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (isCirclePositioned(a) && isCirclePositioned(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
    return true;
  } else if (!isCirclePositioned(a) && !isCirclePositioned(b)) {
  } else return false;
  return false;
};

// src/geometry/point/Sum.ts
function sum(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard(ptA, `a`);
  guard(ptB, `b`);
  let pt = {
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) {
    pt.z = (ptA.z ?? 0) + (ptB.z ?? 0);
  }
  ;
  return Object.freeze(pt);
}

// src/geometry/point/Subtract.ts
function subtract(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard(ptA, `a`);
  guard(ptB, `b`);
  let pt = {
    x: ptA.x - ptB.x,
    y: ptA.y - ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) {
    pt.z = (ptA.z ?? 0) - (ptB.z ?? 0);
  }
  ;
  return Object.freeze(pt);
}

// src/geometry/circle/Intersections.ts
var intersectionLine = (circle, line2) => {
  const v1 = {
    x: line2.b.x - line2.a.x,
    y: line2.b.y - line2.a.y
  };
  const v2 = {
    x: line2.a.x - circle.x,
    y: line2.a.y - circle.y
  };
  const b = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
  if (Number.isNaN(d)) return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const returnValue = [];
  if (u1 <= 1 && u1 >= 0) {
    returnValue.push({
      x: line2.a.x + v1.x * u1,
      y: line2.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    returnValue.push({
      x: line2.a.x + v1.x * u2,
      y: line2.a.y + v1.y * u2
    });
  }
  return returnValue;
};
var intersections = (a, b) => {
  const vector = subtract(b, a);
  const centerD = Math.hypot(vector.y, vector.x);
  if (centerD > a.radius + b.radius) return [];
  if (centerD < Math.abs(a.radius - b.radius)) return [];
  if (isEqual2(a, b)) return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid2 = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    sum(centroid2, intersection),
    subtract(centroid2, intersection)
  ];
};

// src/geometry/Intersects.ts
var circleRect = (a, b) => {
  const deltaX = a.x - Math.max(b.x, Math.min(a.x, b.x + b.width));
  const deltaY = a.y - Math.max(b.y, Math.min(a.y, b.y + b.height));
  return deltaX * deltaX + deltaY * deltaY < a.radius * a.radius;
};
var circleCircle = (a, b) => intersections(a, b).length === 2;

// src/geometry/rect/Intersects.ts
function intersectsPoint(rect, a, b) {
  guard3(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0) throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
  }
  if (isPositioned2(rect)) {
    if (x - rect.x > rect.width || x < rect.x) return false;
    if (y - rect.y > rect.height || y < rect.y) return false;
  } else {
    if (x > rect.width || x < 0) return false;
    if (y > rect.height || y < 0) return false;
  }
  return true;
}
var isIntersecting = (a, b) => {
  if (!isRectPositioned(a)) {
    throw new Error(`a parameter should be RectPositioned`);
  }
  if (isCirclePositioned(b)) {
    return circleRect(b, a);
  } else if (isPoint(b)) {
    return intersectsPoint(a, b);
  }
  throw new Error(`Unknown shape for b: ${JSON.stringify(b)}`);
};

// src/geometry/rect/Center.ts
var center = (rect, origin) => {
  guard3(rect);
  if (origin === void 0 && isPoint(rect)) origin = rect;
  else if (origin === void 0) origin = { x: 0, y: 0 };
  const r = getRectPositioned(rect, origin);
  return Object.freeze({
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  });
};

// src/geometry/point/PointType.ts
var Placeholder = Object.freeze({ x: Number.NaN, y: Number.NaN });
var Placeholder3d = Object.freeze({ x: Number.NaN, y: Number.NaN, z: Number.NaN });

// src/geometry/rect/Distance.ts
var distanceFromExterior2 = (rect, pt) => {
  guardPositioned2(rect, `rect`);
  guard(pt, `pt`);
  if (intersectsPoint(rect, pt)) return 0;
  const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
  const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
  return Math.hypot(dx, dy);
};
var distanceFromCenter = (rect, pt) => distance(center(rect), pt);

// src/geometry/point/DistanceToCenter.ts
var distanceToCenter = (a, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a);
  }
  if (isPoint(shape)) return distance(a, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/DistanceToExterior.ts
var distanceToExterior = (a, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a);
  }
  if (isPoint(shape)) return distance(a, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/Divider.ts
function divide(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard(ptA, `a`);
  guard(ptB, `b`);
  if (ptB.x === 0) throw new TypeError("Cannot divide by zero (b.x is 0)");
  if (ptB.y === 0) throw new TypeError("Cannot divide by zero (b.y is 0)");
  let pt = {
    x: ptA.x / ptB.x,
    y: ptA.y / ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) {
    if (ptB.z === 0) throw new TypeError("Cannot divide by zero (b.z is 0)");
    pt.z = (ptA.z ?? 0) / (ptB.z ?? 0);
  }
  ;
  return Object.freeze(pt);
}
function divider(a, b, c) {
  const divisor = getPointParameter(a, b, c);
  guardNonZeroPoint(divisor, `divisor`);
  return (aa, bb, cc) => {
    const dividend = getPointParameter(aa, bb, cc);
    return typeof dividend.z === `undefined` ? Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y
    }) : Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y,
      z: dividend.z / (divisor.z ?? 1)
    });
  };
}

// src/geometry/point/ToArray.ts
var toArray3 = (p) => [p.x, p.y];

// src/geometry/point/DotProduct.ts
var dotProduct2 = (...pts) => {
  const a = pts.map((p) => toArray3(p));
  return dotProduct(a);
};

// src/geometry/point/Empty.ts
var Empty = { x: 0, y: 0 };
var Unit = { x: 1, y: 1 };
var Empty3d = { x: 0, y: 0, z: 0 };
var Unit3d = { x: 1, y: 1, z: 1 };

// src/geometry/point/From.ts
function from(xOrArray, y, z) {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length === 3) {
      return Object.freeze({
        x: xOrArray[0],
        y: xOrArray[1],
        z: xOrArray[2]
      });
    } else if (xOrArray.length === 2) {
      return Object.freeze({
        x: xOrArray[0],
        y: xOrArray[1]
      });
    } else {
      throw new Error(`Expected array of length two or three, got ${xOrArray.length}`);
    }
  } else {
    if (xOrArray === void 0) throw new Error(`Requires an array of [x,y] or x,y parameters at least`);
    else if (Number.isNaN(xOrArray)) throw new Error(`x is NaN`);
    if (y === void 0) throw new Error(`Param 'y' is missing`);
    else if (Number.isNaN(y)) throw new Error(`y is NaN`);
    if (z === void 0) {
      return Object.freeze({ x: xOrArray, y });
    } else {
      return Object.freeze({ x: xOrArray, y, z });
    }
  }
}
var fromString = (str) => {
  if (typeof str !== `string`) throw new TypeError(`Param 'str' ought to be a string. Got: ${typeof str}`);
  const comma = str.indexOf(`,`);
  const x = Number.parseFloat(str.substring(0, comma));
  const nextComma = str.indexOf(",", comma + 1);
  if (nextComma > 0) {
    const y = Number.parseFloat(str.substring(comma + 1, nextComma - comma + 2));
    const z = Number.parseFloat(str.substring(nextComma + 1));
    return { x, y, z };
  } else {
    const y = Number.parseFloat(str.substring(comma + 1));
    return { x, y };
  }
};
var fromNumbers = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    for (const coord of coords) {
      if (!(coord.length % 2 === 0)) {
        throw new Error(`coords array should be even-numbered`);
      }
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    }
  } else {
    if (coords.length % 2 !== 0) {
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    }
    for (let index = 0; index < coords.length; index += 2) {
      pts.push(
        Object.freeze({ x: coords[index], y: coords[index + 1] })
      );
    }
  }
  return pts;
};

// src/geometry/line/Guard.ts
var isLine = (p) => {
  if (p === void 0) return false;
  if (p.a === void 0) return false;
  if (p.b === void 0) return false;
  if (!isPoint(p.a)) return false;
  if (!isPoint(p.b)) return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p)) return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var guard5 = (line2, name = `line`) => {
  if (line2 === void 0) throw new Error(`${name} undefined`);
  if (line2.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line2)}`);
  if (line2.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line2)}`);
};

// src/geometry/line/GetPointsParameter.ts
var getPointParameter2 = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard(a, `a`);
  guard(a, `b`);
  return [a, b];
};

// src/geometry/line/Length.ts
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum4 = aOrLine.reduce((accumulator, v) => length(v) + accumulator, 0);
    return sum4;
  }
  if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
  const [a, b] = getPointParameter2(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}

// src/geometry/line/Interpolate.ts
function interpolate(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow) throwPercentTest(amount, `amount`);
  else throwNumberTest(amount, ``, `amount`);
  const [a, b] = getPointParameter2(aOrLine, pointBOrAllowOverflow);
  const d = length(a, b);
  const d2 = d * (1 - amount);
  if (d === 0 && d2 === 0) return Object.freeze({ ...b });
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({
    ...b,
    x,
    y
  });
}

// src/geometry/point/Interpolate.ts
var interpolate2 = (amount, a, b, allowOverflow = false) => interpolate(amount, a, b, allowOverflow);

// src/geometry/point/Invert.ts
var invert = (pt, what = `both`) => {
  switch (what) {
    case `both`: {
      return isPoint3d(pt) ? Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1,
        z: pt.z * -1
      }) : Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1
      });
    }
    case `x`: {
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    }
    case `y`: {
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    }
    case `z`: {
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          z: pt.z * -1
        });
      } else throw new Error(`pt parameter is missing z`);
    }
    default: {
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
    }
  }
};

// src/geometry/point/Multiply.ts
function multiply(a1, ab2, ab3, ab4, ab5, ab6) {
  const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
  guard(ptA, `a`);
  guard(ptB, `b`);
  let pt = {
    x: ptA.x * ptB.x,
    y: ptA.y * ptB.y
  };
  if (isPoint3d(ptA) || isPoint3d(ptB)) {
    pt.z = (ptA.z ?? 0) * (ptB.z ?? 0);
  }
  ;
  return Object.freeze(pt);
}
var multiplyScalar = (pt, v) => {
  return isPoint3d(pt) ? Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v,
    z: pt.z * v
  }) : Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v
  });
};

// src/geometry/point/Magnitude.ts
var clampMagnitude = (pt, max5 = 1, min6 = 0) => {
  const length3 = distance(pt);
  let ratio = 1;
  if (length3 > max5) {
    ratio = max5 / length3;
  } else if (length3 < min6) {
    ratio = min6 / length3;
  }
  return ratio === 1 ? pt : multiply(pt, ratio, ratio);
};

// src/geometry/point/Most.ts
var leftmost = (...points) => findMinimum((a, b) => a.x <= b.x ? a : b, ...points);
var rightmost = (...points) => findMinimum((a, b) => a.x >= b.x ? a : b, ...points);

// src/geometry/point/Normalise.ts
var length2 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0) throw new Error(`Expected y`);
  return Math.hypot(ptOrX, y);
};
var normalise = (ptOrX, y) => {
  const pt = getPointParameter(ptOrX, y);
  const l = length2(pt);
  if (l === 0) return Empty;
  return Object.freeze({
    ...pt,
    x: pt.x / l,
    y: pt.y / l
  });
};

// src/geometry/point/NormaliseByRect.ts
function normaliseByRect(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) {
      throwNumberTest(b, `positive`, `width`);
      throwNumberTest(c, `positive`, `height`);
    } else {
      if (!isRect(b)) {
        throw new Error(`Expected second parameter to be a rect`);
      }
      c = b.height;
      b = b.width;
    }
    return Object.freeze({
      x: a.x / b,
      y: a.y / c
    });
  } else {
    throwNumberTest(a, `positive`, `x`);
    if (typeof b !== `number`) {
      throw new TypeError(`Expecting second parameter to be a number (width)`);
    }
    if (typeof c !== `number`) {
      throw new TypeError(`Expecting third parameter to be a number (height)`);
    }
    throwNumberTest(b, `positive`, `y`);
    throwNumberTest(c, `positive`, `width`);
    if (d === void 0) throw new Error(`Expected height parameter`);
    throwNumberTest(d, `positive`, `height`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}

// src/geometry/point/Pipeline.ts
var pipelineApply = (point, ...pipelineFns) => pipeline(...pipelineFns)(point);
var pipeline = (...pipeline2) => (pt) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  pipeline2.reduce((previous, current) => current(previous), pt)
);

// src/geometry/point/ProgressBetween.ts
var progressBetween = (position, waypointA, waypointB) => {
  const a = subtract(position, waypointA);
  const b = subtract(waypointB, waypointA);
  return isPoint3d(a) && isPoint3d(b) ? (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z) : (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
};

// src/geometry/point/Project.ts
var project = (origin, distance3, angle) => {
  const x = Math.cos(angle) * distance3 + origin.x;
  const y = Math.sin(angle) * distance3 + origin.y;
  return { x, y };
};

// src/numbers/Quantise.ts
var quantiseEvery = (v, every2, middleRoundsUp = true) => {
  const everyStr = every2.toString();
  const decimal = everyStr.indexOf(`.`);
  let multiplier = 1;
  if (decimal >= 0) {
    let d = everyStr.substring(decimal + 1).length;
    multiplier = 10 * d;
    every2 = Math.floor(multiplier * every2);
    v = v * multiplier;
  }
  throwNumberTest(v, ``, `v`);
  throwIntegerTest(every2, ``, `every`);
  let div = v / every2;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5) div++;
  const vv = every2 * div / multiplier;
  return vv;
};

// src/geometry/point/Quantise.ts
function quantiseEvery2(pt, snap, middleRoundsUp = true) {
  guard(pt, `pt`);
  guard(snap, `snap`);
  if (isPoint3d(pt)) {
    if (!isPoint3d(snap)) throw new TypeError(`Param 'snap' is missing 'z' field`);
    return Object.freeze({
      x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
      y: quantiseEvery(pt.y, snap.y, middleRoundsUp),
      z: quantiseEvery(pt.z, snap.z, middleRoundsUp)
    });
  }
  return Object.freeze({
    x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
    y: quantiseEvery(pt.y, snap.y, middleRoundsUp)
  });
}

// src/geometry/point/Random.ts
var random = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando()
  });
};
var random3d = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando(),
    z: rando()
  });
};

// src/geometry/point/Reduce.ts
var reduce2 = (pts, fn, initial) => {
  if (initial === void 0) initial = { x: 0, y: 0 };
  let accumulator = initial;
  for (const p of pts) {
    accumulator = fn(p, accumulator);
  }
  ;
  return accumulator;
};

// src/geometry/point/Relation.ts
var relation = (a, b) => {
  const start = getPointParameter(a, b);
  let totalX = 0;
  let totalY = 0;
  let count2 = 0;
  let lastUpdate = performance.now();
  let lastPoint = start;
  const update = (aa, bb) => {
    const p = getPointParameter(aa, bb);
    totalX += p.x;
    totalY += p.y;
    count2++;
    const distanceFromStart = distance(p, start);
    const distanceFromLast = distance(p, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p;
    return Object.freeze({
      angle: angleRadian(p, start),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid(p, start),
      average: {
        x: totalX / count2,
        y: totalY / count2
      }
    });
  };
  return update;
};

// src/geometry/Polar.ts
var Polar_exports = {};
__export(Polar_exports, {
  clampMagnitude: () => clampMagnitude2,
  divide: () => divide2,
  dotProduct: () => dotProduct3,
  fromCartesian: () => fromCartesian,
  guard: () => guard6,
  invert: () => invert2,
  isAntiParallel: () => isAntiParallel,
  isOpposite: () => isOpposite,
  isParallel: () => isParallel,
  isPolarCoord: () => isPolarCoord,
  multiply: () => multiply2,
  normalise: () => normalise2,
  rotate: () => rotate,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian,
  toPoint: () => toPoint,
  toString: () => toString
});

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Arrays: () => arrays_exports,
  Correlate: () => Correlate_exports,
  Maps: () => maps_exports,
  Pathed: () => Pathed_exports,
  Pool: () => Pool_exports,
  Process: () => Process_exports,
  changedDataFields: () => changedDataFields,
  compareArrays: () => compareArrays,
  compareData: () => compareData,
  compareKeys: () => compareKeys,
  isEmptyEntries: () => isEmptyEntries,
  isEqualContextString: () => isEqualContextString,
  keysToNumbers: () => keysToNumbers,
  mapObjectByObject: () => mapObjectByObject,
  mapObjectShallow: () => mapObjectShallow,
  piPi: () => piPi2,
  resolve: () => resolve,
  resolveFields: () => resolveFields,
  resolveFieldsSync: () => resolveFieldsSync,
  resolveSync: () => resolveSync,
  resolveWithFallback: () => resolveWithFallback,
  resolveWithFallbackSync: () => resolveWithFallbackSync
});

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score) return -1;
  else if (a.score < b.score) return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, options = {}) => {
  const matchThreshold = options.matchThreshold ?? 0;
  const debug = options.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
      id: last.id,
      score: last === null ? -1 : similarityFn(last, newD),
      last
    }));
    if (scoredLastValues.length === 0) {
      if (debug) {
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      }
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug) {
        console.debug(
          `Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`
        );
      }
      newThings.push(newD);
      continue;
    }
    if (debug && top.id !== newD.id) {
      console.log(
        `Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`
      );
    }
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t2) => results.set(t2.id, t2));
  return Array.from(results.values());
};
var alignById = (fn, options = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, options);
    return [...lastData];
  };
  return compute;
};

// src/data/KeysToNumbers.ts
var keysToNumbers = (object2, onInvalidKey = `throw`) => {
  const returnObject = {};
  for (const entry of Object.entries(object2)) {
    const asNumber = Number.parseInt(entry[0]);
    if (Number.isNaN(asNumber)) {
      switch (onInvalidKey) {
        case `throw`: {
          throw new TypeError(`Cannot convert key '${entry[0]}' to an integer`);
        }
        case `ignore`: {
          continue;
        }
        case `keep`: {
          returnObject[entry[0]] = entry[1];
          continue;
        }
        default: {
          throw new Error(`Param 'onInvalidKey' should be: 'throw', 'ignore' or 'keep'.`);
        }
      }
    }
    returnObject[asNumber] = entry[1];
  }
  return returnObject;
};

// src/data/MapObject.ts
var mapObjectShallow = (object2, mapFunction) => {
  const entries = Object.entries(object2);
  const mapped = entries.map(([sourceField, sourceFieldValue], index) => [
    sourceField,
    mapFunction({ value: sourceFieldValue, field: sourceField, index, path: sourceField })
  ]);
  return Object.fromEntries(mapped);
};
function mapObjectByObject(data, mapper) {
  const entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    if (e[0] in mapper) {
      const m = mapper[e[0]];
      e[1] = typeof m === `object` ? mapObjectByObject(e[1], m) : m(e[1], data);
    }
  }
  return Object.fromEntries(entries);
}

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create
});
var PoolUser = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param key User key
   * @param resource Resource being used
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  /**
   * Returns a human readable debug string
   * @returns
   */
  toString() {
    if (this.isDisposed) return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
   * Resets countdown for instance expiry.
   * Throws an error if instance is disposed.
   */
  keepAlive() {
    if (this._state === `disposed`) throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
   * @internal
   * @param reason
   * @returns
   */
  _dispose(reason, data) {
    if (this._state === `disposed`) return;
    const resource = this.resource;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  /**
   * Release this instance
   * @param reason
   */
  release(reason) {
    if (this.isDisposed) throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`, data);
  }
  // #region Properties
  get data() {
    if (this.isDisposed) throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
   * Returns true if this instance has expired.
   * Expiry counts if elapsed time is greater than `userExpireAfterMs`
   */
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  /**
   * Returns elapsed time since last 'update'
   */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
   * Returns true if instance is neither disposed nor expired
   */
  get isValid() {
    if (this.isDisposed || this.isExpired) return false;
    if (this.resource.isDisposed) return false;
    return true;
  }
  // #endregion
};
var Resource = class {
  /**
   * Constructor.
   * @param pool Pool
   * @param data Data
   */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0) throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
   * Gets data associated with resource.
   * Throws an error if disposed
   */
  get data() {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
   * Changes the data associated with this resource.
   * Throws an error if disposed or `data` is undefined.
   * @param data
   */
  updateData(data) {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
   * Returns a human-readable debug string for resource
   * @returns
   */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
   * Assigns a user to this resource.
   * @internal
   * @param user
   */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing) throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Releases a user from this resource
   * @internal
   * @param user
   */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Returns true if resource can have additional users allocated
   */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
   * Returns number of uses of the resource
   */
  get usersCount() {
    return this.#users.length;
  }
  /**
   * Returns true if automatic expiry is enabled, and that interval
   * has elapsed since the users list has changed for this resource
   */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0) return false;
    if (this.#users.length > 0) return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
   * Disposes the resource.
   * If it is already disposed, it does nothing.
   * @param reason
   * @returns
   */
  dispose(reason) {
    if (this.#state === `disposed`) return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) {
      u._dispose(`resource-${reason}`, data);
    }
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource) this.pool.freeResource(data);
  }
};
var Pool = class {
  /**
   * Constructor.
   *
   * By default, no capacity limit, one user per resource
   * @param options Pool options
   */
  constructor(options = {}) {
    this.capacity = options.capacity ?? -1;
    this.fullPolicy = options.fullPolicy ?? `error`;
    this.capacityPerResource = options.capacityPerResource ?? 1;
    this.userExpireAfterMs = options.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = options.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = options.generate;
    this.freeResource = options.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, options.debug ?? false);
    const timer = Math.max(
      this.userExpireAfterMs,
      this.resourcesWithoutUserExpireAfterMs
    );
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  /**
   * Returns a debug string of Pool state
   * @returns
   */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa < bb) return 1;
      return -1;
    });
  }
  /**
   * Returns resources sorted with least used first
   * @returns
   */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount) return 0;
      if (a.usersCount < b.usersCount) return -1;
      return 1;
    });
  }
  /**
   * Adds a shared resource to the pool
   * @throws Error if the capacity limit is reached or resource is null
   * @param resource
   * @returns
   */
  addResource(resource) {
    if (resource === void 0) {
      throw new Error(`Cannot add undefined resource`);
    }
    if (resource === null) throw new TypeError(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) {
      throw new Error(
        `Capacity limit (${this.capacity}) reached. Cannot add more.`
      );
    }
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi4 = new Resource(this, resource);
    this._resources.push(pi4);
    return pi4;
  }
  /**
   * Performs maintenance, removing disposed/expired resources & users.
   * This is called automatically when using a resource.
   */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const resource of nuke) {
        resource.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(
          `Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`
        );
        userKeysToRemove.push(key);
        user._dispose(`invalid`, user.data);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(
        `End: resource len: ${this._resources.length} users: ${this.usersLength}`
      );
    }
  }
  /**
   * Iterate over resources in the pool.
   * To iterate over the data associated with each resource, use
   * `values`.
   */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r;
    }
  }
  /**
   * Iterate over resource values in the pool.
   * to iterate over the resources, use `resources`.
   *
   * Note that values may be returned even though there is no
   * active user.
   */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r.data;
    }
  }
  /**
   * Unassociate a key with a pool item
   * @param userKey
   */
  release(userKey, reason) {
    const pi4 = this._users.get(userKey);
    if (!pi4) return;
    pi4.release(reason ?? `Pool.release`);
  }
  /**
   * @internal
   * @param user
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _release(user) {
    this._users.delete(user.key);
  }
  /**
   * @internal
   * @param resource
   * @param _
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
   * Returns true if a given `userKey` is in use.
   * @param userKey
   * @returns
   */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
   * @internal
   * @param key
   * @param resource
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
   * Allocates a resource for `userKey`
   * @internal
   * @param userKey
   * @returns
   */
  #allocateResource(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
   * Return the number of users
   */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
   * 'Uses' a resource, returning the value
   * @param userKey
   * @returns
   */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
   * Gets a pool item based on a 'user' key.
   * 
   * The same key should return the same pool item,
   * for as long as it still exists.
   * 
   * If a 'user' already has a resource, it will 'keep alive' their use.
   * If a 'user' does not already have resource
   *  - if there is capacity, a resource is allocated to user
   *  - if pool is full
   *    - fullPolicy = 'error': an error is thrown
   *    - fullPolicy = 'evictOldestUser': evicts an older user
   *    - Throw error
   * @param userKey
   * @throws Error If all resources are used and fullPolicy = 'error'
   * @returns
   */
  use(userKey) {
    const pi4 = this._users.get(userKey);
    if (pi4) {
      pi4.keepAlive();
      return pi4;
    }
    this.maintain();
    const match = this.#allocateResource(userKey);
    if (match) return match;
    if (this.fullPolicy === `error`) {
      throw new Error(
        `Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`
      );
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this.#allocateResource(userKey);
        if (match2) return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (options = {}) => new Pool(options);

// src/data/Process.ts
var Process_exports = {};
__export(Process_exports, {
  CancelError: () => CancelError,
  average: () => average2,
  cancelIfUndefined: () => cancelIfUndefined,
  flow: () => flow,
  ifNotUndefined: () => ifNotUndefined,
  ifUndefined: () => ifUndefined,
  max: () => max2,
  min: () => min3,
  rank: () => rank,
  seenLastToUndefined: () => seenLastToUndefined,
  seenToUndefined: () => seenToUndefined,
  seenToUndefinedByKey: () => seenToUndefinedByKey,
  sum: () => sum2,
  tally: () => tally
});

// src/data/BasicProcessors.ts
var max2 = () => {
  let max5 = Number.MIN_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      max5 = Math.max(subValue, max5);
    }
    return max5;
  };
  return compute;
};
var min3 = () => {
  let min6 = Number.MAX_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      min6 = Math.min(subValue, min6);
    }
    return min6;
  };
  return compute;
};
var sum2 = () => {
  let t2 = 0;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) continue;
      t2 += subValue;
    }
    return t2;
  };
  return compute;
};
var average2 = () => {
  let total = 0;
  let tally3 = 0;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) continue;
      tally3++;
      total += subValue;
    }
    return total / tally3;
  };
  return compute;
};
var tally = (countArrayItems) => {
  let t2 = 0;
  const compute = (value) => {
    if (countArrayItems) {
      if (Array.isArray(value)) t2 += value.length;
      else t2++;
    } else {
      t2++;
    }
    return t2;
  };
  return compute;
};
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  let best;
  return (value) => {
    if (includeType && typeof value !== includeType) return;
    if (best === void 0) {
      best = value;
      return best;
    } else {
      const result = r(value, best);
      if (result == `a`) {
        best = value;
        return best;
      } else if (result === `eq` && emitEqualRanked) {
        return best;
      } else if (emitRepeatHighest) {
        return best;
      }
    }
  };
}

// src/data/Process.ts
function flow(...processors) {
  return (value) => {
    let v = value;
    for (const p of processors) {
      try {
        v = p(v);
      } catch (err) {
        if (err instanceof CancelError) {
          break;
        } else {
          throw err;
        }
      }
    }
    return v;
  };
}
function seenLastToUndefined(eq) {
  if (eq === void 0) eq = isEqualDefault;
  let lastValue;
  return (value) => {
    if (value !== lastValue) {
      lastValue = value;
      return value;
    }
    return void 0;
  };
}
function seenToUndefined(eq) {
  let seen = [];
  if (eq === void 0) eq = isEqualDefault;
  return (value) => {
    if (value === void 0) return;
    for (const s of seen) {
      if (eq(s, value)) return;
    }
    seen.push(value);
    return value;
  };
}
function seenToUndefinedByKey(toString3) {
  let seen = /* @__PURE__ */ new Set();
  if (toString3 === void 0) toString3 = toStringDefault;
  return (value) => {
    if (value === void 0) return;
    const key = toString3(value);
    if (seen.has(key)) return;
    seen.add(key);
    return value;
  };
}
function ifNotUndefined(fn) {
  return (value) => {
    if (value === void 0) return value;
    const v = fn(value);
    return v;
  };
}
var CancelError = class extends Error {
  constructor(message) {
    super(message);
    this.name = `CancelError`;
  }
};
function cancelIfUndefined() {
  return (value) => {
    if (value === void 0) throw new CancelError(`cancel`);
    return value;
  };
}
function ifUndefined(fn) {
  return (value) => {
    if (value === void 0) return fn();
    else return value;
  };
}

// src/data/ResolveFields.ts
async function resolveFields(object2) {
  const resolvers = [];
  const keys = [];
  for (const entry of Object.entries(object2)) {
    const resolvable = entry[1];
    resolvers.push(resolve(resolvable));
    keys.push(entry[0]);
  }
  const results = await Promise.all(resolvers);
  const entries = zip(keys, results);
  return Object.fromEntries(entries);
}
function resolveFieldsSync(object2) {
  const entries = [];
  for (const entry of Object.entries(object2)) {
    const resolvable = entry[1];
    const value = resolveSync(resolvable);
    entries.push([entry[0], value]);
  }
  return Object.fromEntries(entries);
}

// src/data/maps/index.ts
var maps_exports = {};
__export(maps_exports, {
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  filter: () => filter,
  find: () => find,
  firstEntryByPredicate: () => firstEntryByPredicate,
  firstEntryByValue: () => firstEntryByValue,
  fromIterable: () => fromIterable,
  fromObject: () => fromObject,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getFromKeys: () => getFromKeys,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey,
  some: () => some,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/data/index.ts
var piPi2 = Math.PI * 2;

// src/geometry/Angles.ts
function degreeToRadian(angleInDegrees) {
  return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
function radianInvert(angleInRadians) {
  return (angleInRadians + Math.PI) % (2 * Math.PI);
}
function radianToDegree(angleInRadians) {
  return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
var radiansFromAxisX = (point) => Math.atan2(point.x, point.y);
var radiansSum = (start, amount, clockwise = true) => {
  if (clockwise) {
    const x = start - amount;
    if (x < 0) {
      return piPi2 + x;
    }
    return x;
  } else {
    let x = start + amount;
    if (x >= piPi2) x = x % piPi2;
    return x;
  }
};
var degreesSum = (start, amount, clockwise = true) => radianToDegree(radiansSum(degreeToRadian(start), degreeToRadian(amount), clockwise));
var radianArc = (start, end, clockwise = true) => {
  let s = start;
  if (end < s) {
    s = 0;
    end = piPi2 - start + end;
  }
  let d = end - s;
  if (clockwise) d = piPi2 - d;
  if (d >= piPi2) return d % piPi2;
  return d;
};
var degreeArc = (start, end, clockwise = true) => radianToDegree(radianArc(degreeToRadian(start), degreeToRadian(end), clockwise));

// src/geometry/Polar.ts
var EmptyCartesian = Object.freeze({ x: 0, y: 0 });
var isPolarCoord = (p) => {
  if (p.distance === void 0) return false;
  if (p.angleRadian === void 0) return false;
  return true;
};
var fromCartesian = (point, origin) => {
  point = subtract(point, origin);
  const angle = Math.atan2(point.y, point.x);
  return Object.freeze({
    ...point,
    angleRadian: angle,
    distance: Math.hypot(point.x, point.y)
  });
};
var toCartesian = (a, b, c) => {
  if (isPolarCoord(a)) {
    if (b === void 0) b = Empty;
    if (isPoint(b)) {
      return polarToCartesian(a.distance, a.angleRadian, b);
    }
    throw new Error(
      `Expecting (Coord, Point). Second parameter is not a point`
    );
  } else if (typeof a === `object`) {
    throw new TypeError(
      `First param is an object, but not a Coord: ${JSON.stringify(a)}`
    );
  } else {
    if (typeof a === `number` && typeof b === `number`) {
      if (c === void 0) c = Empty;
      if (!isPoint(c)) {
        throw new Error(
          `Expecting (number, number, Point). Point param wrong type`
        );
      }
      return polarToCartesian(a, b, c);
    } else {
      throw new TypeError(
        `Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(
          a
        )}`
      );
    }
  }
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a = smoothness * step++;
    yield {
      distance: zoom * a,
      angleRadian: a,
      step
    };
  }
}
var rotate = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var normalise2 = (c) => {
  if (c.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c,
    distance: 1
  });
};
var guard6 = (p, name = `Point`) => {
  if (p === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p === null) {
    throw new Error(
      `'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p.angleRadian === void 0) {
    throw new Error(
      `'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p.distance === void 0) {
    throw new Error(
      `'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (typeof p.angleRadian !== `number`) {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `'${name}.angleRadian' must be a number. Got ${p.angleRadian}`
    );
  }
  if (typeof p.distance !== `number`) {
    throw new TypeError(`'${name}.distance' must be a number. Got ${p.distance}`);
  }
  if (p.angleRadian === null) throw new Error(`'${name}.angleRadian' is null`);
  if (p.distance === null) throw new Error(`'${name}.distance' is null`);
  if (Number.isNaN(p.angleRadian)) {
    throw new TypeError(`'${name}.angleRadian' is NaN`);
  }
  if (Number.isNaN(p.distance)) throw new Error(`'${name}.distance' is NaN`);
};
var dotProduct3 = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  return a.distance * b.distance * Math.cos(b.angleRadian - a.angleRadian);
};
var invert2 = (p) => {
  guard6(p, `c`);
  return Object.freeze({
    ...p,
    angleRadian: p.angleRadian - Math.PI
  });
};
var isOpposite = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  if (a.distance !== b.distance) return false;
  return a.angleRadian === -b.angleRadian;
};
var isParallel = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  return a.angleRadian === b.angleRadian;
};
var isAntiParallel = (a, b) => {
  guard6(a, `a`);
  guard6(b, `b`);
  return a.angleRadian === -b.angleRadian;
};
var rotateDegrees = (c, amountDeg) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});
var spiralRaw = (step, smoothness, zoom) => {
  const a = smoothness * step;
  return Object.freeze({
    distance: zoom * a,
    angleRadian: a
  });
};
var multiply2 = (v, amt) => {
  guard6(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance * amt
  });
};
var divide2 = (v, amt) => {
  guard6(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance / amt
  });
};
var clampMagnitude2 = (v, max5 = 1, min6 = 0) => {
  let mag = v.distance;
  if (mag > max5) mag = max5;
  if (mag < min6) mag = min6;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var polarToCartesian = (distance3, angleRadians, origin = Empty) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance3 * Math.cos(angleRadians),
    y: origin.y + distance3 * Math.sin(angleRadians)
  });
};
var toString = (p, digits) => {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  const angleDeg = radianToDegree(p.angleRadian);
  const d = digits ? p.distance.toFixed(digits) : p.distance;
  const a = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d},${a})`;
};
var toPoint = (v, origin = EmptyCartesian) => {
  guard6(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};

// src/geometry/point/Rotate.ts
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0) origin = { x: 0, y: 0 };
  guard(origin, `origin`);
  throwNumberTest(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0) return pt;
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  for (const [index, p] of ptAr.entries()) guard(p, `pt[${index}]`);
  const asPolar = ptAr.map((p) => fromCartesian(p, origin));
  const rotated = asPolar.map((p) => rotate(p, amountRadian));
  const asCartesisan = rotated.map((p) => toCartesian(p, origin));
  return arrayInput ? asCartesisan : asCartesisan[0];
}

// src/geometry/point/RotatePointArray.ts
var rotatePointArray = (v, amountRadian) => {
  const mat = [
    [Math.cos(amountRadian), -Math.sin(amountRadian)],
    [Math.sin(amountRadian), Math.cos(amountRadian)]
  ];
  const result = [];
  for (const [index, element] of v.entries()) {
    result[index] = [
      mat[0][0] * element[0] + mat[0][1] * element[1],
      mat[1][0] * element[0] + mat[1][1] * element[1]
    ];
  }
  return result;
};

// src/geometry/point/Round.ts
var round2 = (ptOrX, yOrDigits, digits) => {
  const pt = getPointParameter(ptOrX, yOrDigits);
  digits = digits ?? yOrDigits;
  digits = digits ?? 2;
  return Object.freeze({
    ...pt,
    x: round(digits, pt.x),
    y: round(digits, pt.y)
  });
};

// src/geometry/point/To.ts
var toIntegerValues = (pt, rounder = Math.round) => {
  guard(pt, `pt`);
  return Object.freeze({
    x: rounder(pt.x),
    y: rounder(pt.y)
  });
};
var to2d = (pt) => {
  guard(pt, `pt`);
  let copy = {
    ...pt
  };
  delete copy.z;
  return Object.freeze(copy);
};
var to3d = (pt, z = 0) => {
  guard(pt, `pt`);
  return Object.freeze({
    ...pt,
    z
  });
};
function toString2(p, digits) {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  guard(p, `pt`);
  const x = digits ? p.x.toFixed(digits) : p.x;
  const y = digits ? p.y.toFixed(digits) : p.y;
  if (p.z === void 0) {
    return `(${x},${y})`;
  } else {
    const z = digits ? p.z.toFixed(digits) : p.z;
    return `(${x},${y},${z})`;
  }
}

// src/geometry/point/WithinRange.ts
var withinRange = (a, b, maxRange) => {
  guard(a, `a`);
  guard(b, `b`);
  if (typeof maxRange === `number`) {
    throwNumberTest(maxRange, `positive`, `maxRange`);
    maxRange = { x: maxRange, y: maxRange };
  } else {
    guard(maxRange, `maxRange`);
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};

// src/geometry/point/Wrap.ts
var wrap2 = (pt, ptMax, ptMin) => {
  if (ptMax === void 0) ptMax = { x: 1, y: 1 };
  if (ptMin === void 0) ptMin = { x: 0, y: 0 };
  guard(pt, `pt`);
  guard(ptMax, `ptMax`);
  guard(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap(pt.x, ptMin.x, ptMax.x),
    y: wrap(pt.y, ptMin.y, ptMax.y)
  });
};

// src/geometry/bezier/index.ts
var bezier_exports = {};
__export(bezier_exports, {
  cubic: () => cubic,
  interpolator: () => interpolator,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticBend: () => quadraticBend,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath
});

// node_modules/bezier-js/src/utils.js
var { abs: abs2, cos: cos2, sin: sin2, acos, atan2, sqrt: sqrt2, pow: pow3 } = Math;
function crt(v) {
  return v < 0 ? -pow3(-v, 1 / 3) : pow3(v, 1 / 3);
}
var pi2 = Math.PI;
var tau = 2 * pi2;
var quart = pi2 / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = { x: 0, y: 0, z: 0 };
var utils = {
  // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(t2, derivativeFn) {
    const d = derivativeFn(t2);
    let l = d.x * d.x + d.y * d.y;
    if (typeof d.z !== "undefined") {
      l += d.z * d.z;
    }
    return sqrt2(l);
  },
  compute: function(t2, points, _3d) {
    if (t2 === 0) {
      points[0].t = 0;
      return points[0];
    }
    const order = points.length - 1;
    if (t2 === 1) {
      points[order].t = 1;
      return points[order];
    }
    const mt = 1 - t2;
    let p = points;
    if (order === 0) {
      points[0].t = t2;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p[0].x + t2 * p[1].x,
        y: mt * p[0].y + t2 * p[1].y,
        t: t2
      };
      if (_3d) {
        ret.z = mt * p[0].z + t2 * p[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t2 * t2, a, b, c, d = 0;
      if (order === 2) {
        p = [p[0], p[1], p[2], ZERO];
        a = mt2;
        b = mt * t2 * 2;
        c = t22;
      } else if (order === 3) {
        a = mt2 * mt;
        b = mt2 * t2 * 3;
        c = mt * t22 * 3;
        d = t2 * t22;
      }
      const ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
        t: t2
      };
      if (_3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      }
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t2,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t2
        };
        if (typeof dCpts[i].z !== "undefined") {
          dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t2;
        }
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t2;
    return dCpts[0];
  },
  computeWithRatios: function(t2, points, ratios, _3d) {
    const mt = 1 - t2, r = ratios, p = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
    f1 *= mt;
    f2 *= t2;
    if (p.length === 2) {
      d = f1 + f2;
      return {
        x: (f1 * p[0].x + f2 * p[1].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t2 * t2;
    if (p.length === 3) {
      d = f1 + f2 + f3;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t2 * t2 * t2;
    if (p.length === 4) {
      d = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
        t: t2
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
      const list = [];
      for (let j = 0, dpt; j < c; j++) {
        dpt = {
          x: c * (p[j + 1].x - p[j].x),
          y: c * (p[j + 1].y - p[j].y)
        };
        if (_3d) {
          dpt.z = c * (p[j + 1].z - p[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p = list;
    }
    return dpoints;
  },
  between: function(v, m, M) {
    return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
  },
  approximately: function(a, b, precision) {
    return abs2(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum4 = 0;
    for (let i = 0, t2; i < len; i++) {
      t2 = z * utils.Tvalues[i] + z;
      sum4 += utils.Cvalues[i] * utils.arcfn(t2, derivativeFn);
    }
    return z * sum4;
  },
  map: function(v, ds, de, ts, te) {
    const d1 = de - ds, d2 = te - ts, v2 = v - ds, r = v2 / d1;
    return ts + d2 * r;
  },
  lerp: function(r, v1, v2) {
    const ret = {
      x: v1.x + r * (v2.x - v1.x),
      y: v1.y + r * (v2.y - v1.y)
    };
    if (v1.z !== void 0 && v2.z !== void 0) {
      ret.z = v1.z + r * (v2.z - v1.z);
    }
    return ret;
  },
  pointToString: function(p) {
    let s = p.x + "/" + p.y;
    if (typeof p.z !== "undefined") {
      s += "/" + p.z;
    }
    return s;
  },
  pointsToString: function(points) {
    return "[" + points.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot);
  },
  // round as string, to avoid rounding errors
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt2(dx * dx + dy * dy);
  },
  closest: function(LUT, point) {
    let mdist = pow3(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t2, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const bottom = pow3(t2, n) + pow3(1 - t2, n), top = bottom - 1;
    return abs2(top / bottom);
  },
  projectionratio: function(t2, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const top = pow3(1 - t2, n), bottom = pow3(t2, n) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d == 0) {
      return false;
    }
    return { x: nx / d, y: ny / d };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(
      p1.x,
      p1.y,
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2,
      p2.x,
      p2.y
    );
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox2 = s.bbox();
      if (mx > bbox2.x.min) mx = bbox2.x.min;
      if (my > bbox2.y.min) my = bbox2.y.min;
      if (MX < bbox2.x.max) MX = bbox2.x.max;
      if (MY < bbox2.y.max) MY = bbox2.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox2)) return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual) return;
      a2.forEach(function(l2) {
        if (l2.virtual) return;
        const iss = l1.intersects(l2, curveIntersectionThreshold);
        if (iss.length > 0) {
          iss.c1 = l1;
          iss.c2 = l2;
          iss.s1 = s1;
          iss.s2 = s2;
          intersections2.push(iss);
        }
      });
    });
    return intersections2;
  },
  makeshape: function(forward, back, curveIntersectionThreshold) {
    const bpl = back.points.length;
    const fpl = forward.points.length;
    const start = utils.makeline(back.points[bpl - 1], forward.points[0]);
    const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
    const shape = {
      startcap: start,
      forward,
      back,
      endcap: end,
      bbox: utils.findbbox([start, forward, back, end])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(
        shape,
        shape.bbox,
        s2,
        s2.bbox,
        curveIntersectionThreshold
      );
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list) return { min: 0, max: 0 };
    let min6 = nMax, max5 = nMin, t2, c;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t2 = list[i];
      c = curve.get(t2);
      if (c[d] < min6) {
        min6 = c[d];
      }
      if (c[d] > max5) {
        max5 = c[d];
      }
    }
    return { min: min6, mid: (min6 + max5) / 2, max: max5, size: max5 - min6 };
  },
  align: function(points, line2) {
    const tx = line2.p1.x, ty = line2.p1.y, a = -atan2(line2.p2.y - ty, line2.p2.x - tx), d = function(v) {
      return {
        x: (v.x - tx) * cos2(a) - (v.y - ty) * sin2(a),
        y: (v.x - tx) * sin2(a) + (v.y - ty) * cos2(a)
      };
    };
    return points.map(d);
  },
  roots: function(points, line2) {
    line2 = line2 || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points.length - 1;
    const aligned = utils.align(points, line2);
    const reduce3 = function(t2) {
      return 0 <= t2 && t2 <= 1;
    };
    if (order === 2) {
      const a2 = aligned[0].y, b2 = aligned[1].y, c2 = aligned[2].y, d2 = a2 - 2 * b2 + c2;
      if (d2 !== 0) {
        const m1 = -sqrt2(b2 * b2 - a2 * c2), m2 = -a2 + b2, v12 = -(m1 + m2) / d2, v2 = -(-m1 + m2) / d2;
        return [v12, v2].filter(reduce3);
      } else if (b2 !== c2 && d2 === 0) {
        return [(2 * b2 - c2) / (2 * b2 - 2 * c2)].filter(reduce3);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
    if (utils.approximately(d, 0)) {
      if (utils.approximately(a, 0)) {
        if (utils.approximately(b, 0)) {
          return [];
        }
        return [-c / b].filter(reduce3);
      }
      const q3 = sqrt2(b * b - 4 * a * c), a2 = 2 * a;
      return [(q3 - b) / a2, (-b - q3) / a2].filter(reduce3);
    }
    a /= d;
    b /= d;
    c /= d;
    const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p / 3, mp33 = mp3 * mp3 * mp3, r = sqrt2(mp33), t2 = -q / (2 * r), cosphi = t2 < -1 ? -1 : t2 > 1 ? 1 : t2, phi = acos(cosphi), crtr = crt(r), t1 = 2 * crtr;
      x1 = t1 * cos2(phi / 3) - a / 3;
      x2 = t1 * cos2((phi + tau) / 3) - a / 3;
      x3 = t1 * cos2((phi + 2 * tau) / 3) - a / 3;
      return [x1, x2, x3].filter(reduce3);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce3);
    } else {
      const sd = sqrt2(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce3);
    }
  },
  droots: function(p) {
    if (p.length === 3) {
      const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
      if (d !== 0) {
        const m1 = -sqrt2(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
        return [v1, v2];
      } else if (b !== c && d === 0) {
        return [(2 * b - c) / (2 * (b - c))];
      }
      return [];
    }
    if (p.length === 2) {
      const a = p[0], b = p[1];
      if (a !== b) {
        return [a / (a - b)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t2, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d = utils.compute(t2, d1);
    const dd = utils.compute(t2, d2);
    const qdsum = d.x * d.x + d.y * d.y;
    if (_3d) {
      num = sqrt2(
        pow3(d.y * dd.z - dd.y * d.z, 2) + pow3(d.z * dd.x - dd.z * d.x, 2) + pow3(d.x * dd.y - dd.x * d.y, 2)
      );
      dnm = pow3(qdsum + d.z * d.z, 3 / 2);
    } else {
      num = d.x * dd.y - d.y * dd.x;
      dnm = pow3(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) {
      return { k: 0, r: 0 };
    }
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t2 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t2 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs2(nk - k) + abs2(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points) {
    if (points.length < 4) return [];
    const p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t2 = -v3 / v2;
        if (0 <= t2 && t2 <= 1) return [t2];
      }
      return [];
    }
    const d2 = 2 * v1;
    if (utils.approximately(d2, 0)) return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0) return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t2, d; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t2 = b2[dim].mid;
      d = (b1[dim].size + b2[dim].size) / 2;
      if (abs2(l - t2) >= d) return false;
    }
    return true;
  },
  expandbox: function(bbox2, _bbox) {
    if (_bbox.x.min < bbox2.x.min) {
      bbox2.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox2.y.min) {
      bbox2.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox2.z.min) {
      bbox2.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox2.x.max) {
      bbox2.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox2.y.max) {
      bbox2.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox2.z.max) {
      bbox2.z.max = _bbox.z.max;
    }
    bbox2.x.mid = (bbox2.x.min + bbox2.x.max) / 2;
    bbox2.y.mid = (bbox2.y.min + bbox2.y.max) / 2;
    if (bbox2.z) {
      bbox2.z.mid = (bbox2.z.min + bbox2.z.max) / 2;
    }
    bbox2.x.size = bbox2.x.max - bbox2.x.min;
    bbox2.y.size = bbox2.y.max - bbox2.y.min;
    if (bbox2.z) {
      bbox2.z.size = bbox2.z.max - bbox2.z.min;
    }
  },
  pairiteration: function(c1, c2, curveIntersectionThreshold) {
    const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c1.split(0.5), cc2 = c2.split(0.5), pairs = [
      { left: cc1.left, right: cc2.left },
      { left: cc1.left, right: cc2.right },
      { left: cc1.right, right: cc2.right },
      { left: cc1.right, right: cc2.left }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0) return results;
    pairs.forEach(function(pair) {
      results = results.concat(
        utils.pairiteration(pair.left, pair.right, threshold)
      );
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos2(quart) - dy1 * sin2(quart), dy1p = dx1 * sin2(quart) + dy1 * cos2(quart), dx2p = dx2 * cos2(quart) - dy2 * sin2(quart), dy2p = dx2 * sin2(quart) + dy2 * cos2(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
    let s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
    if (s < e) {
      if (s > m || m > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m && m < s) {
        _ = e;
        e = s;
        s = _;
      } else {
        e += tau;
      }
    }
    arc.s = s;
    arc.e = e;
    arc.r = r;
    return arc;
  },
  numberSort: function(a, b) {
    return a - b;
  }
};

// node_modules/bezier-js/src/poly-bezier.js
var PolyBezier = class _PolyBezier {
  constructor(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(curve) {
      return utils.pointsToString(curve.points);
    }).join(", ") + "]";
  }
  addCurve(curve) {
    this.curves.push(curve);
    this._3d = this._3d || curve._3d;
  }
  length() {
    return this.curves.map(function(v) {
      return v.length();
    }).reduce(function(a, b) {
      return a + b;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c = this.curves;
    var bbox2 = c[0].bbox();
    for (var i = 1; i < c.length; i++) {
      utils.expandbox(bbox2, c[i].bbox());
    }
    return bbox2;
  }
  offset(d) {
    const offset = [];
    this.curves.forEach(function(v) {
      offset.push(...v.offset(d));
    });
    return new _PolyBezier(offset);
  }
};

// node_modules/bezier-js/src/bezier.js
var { abs: abs3, min: min4, max: max3, cos: cos3, sin: sin3, acos: acos2, sqrt: sqrt3 } = Math;
var pi3 = Math.PI;
var Bezier = class _Bezier {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point2) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point2[d] !== "undefined") {
            newargs.push(point2[d]);
          }
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point.z = args[idx + 2];
      }
      points.push(point);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d) dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, { p1: points[0], p2: points[order] });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t2, p) => t2 + abs3(p.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t2) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    if (t2 === 0) {
      return new _Bezier(p2, p2, p3);
    }
    if (t2 === 1) {
      return new _Bezier(p1, p2, p2);
    }
    const abc = _Bezier.getABC(2, p1, p2, p3, t2);
    return new _Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B, E, t2, d1) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    const abc = _Bezier.getABC(3, S, B, E, t2);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B, abc.C);
    }
    const d2 = d1 * (1 - t2) / t2;
    const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B.x - bx1, y: B.y - by1 }, e2 = { x: B.x + bx2, y: B.y + by2 }, A = abc.A, v1 = { x: A.x + (e1.x - A.x) / (1 - t2), y: A.y + (e1.y - A.y) / (1 - t2) }, v2 = { x: A.x + (e2.x - A.x) / t2, y: A.y + (e2.y - A.y) / t2 }, nc1 = { x: S.x + (v1.x - S.x) / t2, y: S.y + (v1.y - S.y) / t2 }, nc2 = {
      x: E.x + (v2.x - E.x) / (1 - t2),
      y: E.y + (v2.y - E.y) / (1 - t2)
    };
    return new _Bezier(S, nc1, nc2, E);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return _Bezier.getUtils();
  }
  static get PolyBezier() {
    return PolyBezier;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return utils.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d) return false;
    const p = this.points, x = p[0].x, y = p[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last = p.length; i < last; i++) {
      s.push(p[i].x);
      s.push(p[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) {
      throw new Error("incorrect number of ratio values");
    }
    this.ratios = ratios;
    this._lut = [];
  }
  verify() {
    const print = this.coordDigest();
    if (print !== this._print) {
      this._print = print;
      this.update();
    }
  }
  coordDigest() {
    return this.points.map(function(c, pos) {
      return "" + pos + c.x + c.y + (c.z ? c.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points = this.points;
    const angle = utils.angle(points[0], points[this.order], points[1]);
    this.clockwise = angle > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S, B, E, t2 = 0.5) {
    const u = utils.projectionratio(t2, order), um = 1 - u, C = {
      x: u * S.x + um * E.x,
      y: u * S.y + um * E.y
    }, s = utils.abcratio(t2, order), A = {
      x: B.x + (B.x - C.x) / s,
      y: B.y + (B.y - C.y) / s
    };
    return { A, B, C, S, E };
  }
  getABC(t2, B) {
    B = B || this.get(t2);
    let S = this.points[0];
    let E = this.points[this.order];
    return _Bezier.getABC(this.order, S, B, E, t2);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps + 1) {
      return this._lut;
    }
    this._lut = [];
    steps++;
    this._lut = [];
    for (let i = 0, p, t2; i < steps; i++) {
      t2 = i / (steps - 1);
      p = this.compute(t2);
      p.t = t2;
      this._lut.push(p);
    }
    return this._lut;
  }
  on(point, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t2 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point) < error) {
        hits.push(c);
        t2 += i / lut.length;
      }
    }
    if (!hits.length) return false;
    return t /= hits.length;
  }
  project(point) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t3 = t1, ft = t3, p;
    mdist += 1;
    for (let d; t3 < t2 + step; t3 += step) {
      p = this.compute(t3);
      d = utils.dist(point, p);
      if (d < mdist) {
        mdist = d;
        ft = t3;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.compute(ft);
    p.t = ft;
    p.d = mdist;
    return p;
  }
  get(t2) {
    return this.compute(t2);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t2) {
    if (this.ratios) {
      return utils.computeWithRatios(t2, this.points, this.ratios, this._3d);
    }
    return utils.compute(t2, this.points, this._3d, this.ratios);
  }
  raise() {
    const p = this.points, np = [p[0]], k = p.length;
    for (let i = 1, pi4, pim; i < k; i++) {
      pi4 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi4.x + i / k * pim.x,
        y: (k - i) / k * pi4.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new _Bezier(np);
  }
  derivative(t2) {
    return utils.compute(t2, this.dpoints[0], this._3d);
  }
  dderivative(t2) {
    return utils.compute(t2, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new _Bezier(utils.align(p, { p1: p[0], p2: p[p.length - 1] }));
  }
  curvature(t2) {
    return utils.curvature(t2, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t2) {
    return this._3d ? this.__normal3(t2) : this.__normal2(t2);
  }
  __normal2(t2) {
    const d = this.derivative(t2);
    const q = sqrt3(d.x * d.x + d.y * d.y);
    return { t: t2, x: -d.y / q, y: d.x / q };
  }
  __normal3(t2) {
    const r1 = this.derivative(t2), r2 = this.derivative(t2 + 0.01), q1 = sqrt3(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt3(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m = sqrt3(c.x * c.x + c.y * c.y + c.z * c.z);
    c.x /= m;
    c.y /= m;
    c.z /= m;
    const R = [
      c.x * c.x,
      c.x * c.y - c.z,
      c.x * c.z + c.y,
      c.x * c.y + c.z,
      c.y * c.y,
      c.y * c.z - c.x,
      c.x * c.z - c.y,
      c.y * c.z + c.x,
      c.z * c.z
    ];
    const n = {
      t: t2,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n;
  }
  hull(t2) {
    let p = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p[0];
    q[idx++] = p[1];
    q[idx++] = p[2];
    if (this.order === 3) {
      q[idx++] = p[3];
    }
    while (p.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p.length - 1; i < l; i++) {
        pt = utils.lerp(t2, p[i], p[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p = _p;
    }
    return q;
  }
  split(t1, t2) {
    if (t1 === 0 && !!t2) {
      return this.split(t2).left;
    }
    if (t2 === 1) {
      return this.split(t1).right;
    }
    const q = this.hull(t1);
    const result = {
      left: this.order === 2 ? new _Bezier([q[0], q[3], q[5]]) : new _Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new _Bezier([q[5], q[4], q[2]]) : new _Bezier([q[9], q[8], q[6], q[3]]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t2) {
      return result;
    }
    t2 = utils.map(t2, t1, 1, 0, 1);
    return result.right.split(t2).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(
      function(dim) {
        let mfn = function(v) {
          return v[dim];
        };
        let p = this.dpoints[0].map(mfn);
        result[dim] = utils.droots(p);
        if (this.order === 3) {
          p = this.dpoints[1].map(mfn);
          result[dim] = result[dim].concat(utils.droots(p));
        }
        result[dim] = result[dim].filter(function(t2) {
          return t2 >= 0 && t2 <= 1;
        });
        roots = roots.concat(result[dim].sort(utils.numberSort));
      }.bind(this)
    );
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(
      function(d) {
        result[d] = utils.getminmax(this, d, extrema[d]);
      }.bind(this)
    );
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t2, d) {
    if (typeof d !== "undefined") {
      const c = this.get(t2), n = this.normal(t2);
      const ret = {
        c,
        n,
        x: c.x + n.x * d,
        y: c.y + n.y * d
      };
      if (this._3d) {
        ret.z = c.z + n.z * d;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p) {
        const ret = {
          x: p.x + t2 * nv.x,
          y: p.y + t2 * nv.y
        };
        if (p.z && nv.z) {
          ret.z = p.z + t2 * nv.z;
        }
        return ret;
      });
      return [new _Bezier(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) {
        return s.offset(t2)[0];
      }
      return s.scale(t2);
    });
  }
  simple() {
    if (this.order === 3) {
      const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
      const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs3(acos2(s)) < pi3 / 3;
  }
  reduce() {
    let i, t1 = 0, t2 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema);
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1);
    }
    for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
      t2 = extrema[i];
      segment = this.split(t1, t2);
      segment._t1 = t1;
      segment._t2 = t2;
      pass1.push(segment);
      t1 = t2;
    }
    pass1.forEach(function(p1) {
      t1 = 0;
      t2 = 0;
      while (t2 <= 1) {
        for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
          segment = p1.split(t1, t2);
          if (!segment.simple()) {
            t2 -= step;
            if (abs3(t1 - t2) < step) {
              return [];
            }
            segment = p1.split(t1, t2);
            segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
            segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
            pass2.push(segment);
            t1 = t2;
            break;
          }
        }
      }
      if (t1 < 1) {
        segment = p1.split(t1, 1);
        segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
        segment._t2 = p1._t2;
        pass2.push(segment);
      }
    });
    return pass2;
  }
  translate(v, d1, d2) {
    d2 = typeof d2 === "number" ? d2 : d1;
    const o = this.order;
    let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new _Bezier(
      this.points.map((p, i) => ({
        x: p.x + v.x * d[i],
        y: p.y + v.y * d[i]
      }))
    );
  }
  scale(d) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d === "function") {
      distanceFn = d;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) {
      return this.translate(
        this.normal(0),
        distanceFn ? distanceFn(0) : d,
        distanceFn ? distanceFn(1) : d
      );
    }
    const r1 = distanceFn ? distanceFn(0) : d;
    const r2 = distanceFn ? distanceFn(1) : d;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t2) {
      const p = np[t2 * order] = utils.copy(points[t2 * order]);
      p.x += (t2 ? r2 : r1) * v[t2].n.x;
      p.y += (t2 ? r2 : r1) * v[t2].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t2) => {
        if (order === 2 && !!t2) return;
        const p = np[t2 * order];
        const d2 = this.derivative(t2);
        const p2 = { x: p.x + d2.x, y: p.y + d2.y };
        np[t2 + 1] = utils.lli4(p, p2, o, points[t2 + 1]);
      });
      return new _Bezier(np);
    }
    [0, 1].forEach(function(t2) {
      if (order === 2 && !!t2) return;
      var p = points[t2 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t2 + 1) / order) : d;
      if (distanceFn && !clockwise) rc = -rc;
      var m = sqrt3(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t2 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new _Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n = this.normal(0);
      const start = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start.x + n.x * d1, y: start.y + n.y * d1 };
      e = { x: end.x + n.x * d3, y: end.y + n.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start.x - n.x * d2, y: start.y - n.y * d2 };
      e = { x: end.x - n.x * d4, y: end.y - n.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new _Bezier(fline), le2, new _Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d = e - s;
        return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(
          segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen))
        );
        bcurves.push(
          segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen))
        );
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p = s.points;
      if (p[3]) {
        s.points = [p[3], p[2], p[1], p[0]];
      } else {
        s.points = [p[2], p[1], p[0]];
      }
      return s;
    }).reverse();
    const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
    return new PolyBezier(segments);
  }
  outlineshapes(d1, d2, curveIntersectionThreshold) {
    d2 = d2 || d1;
    const outline = this.outline(d1, d2).curves;
    const shapes = [];
    for (let i = 1, len = outline.length; i < len / 2; i++) {
      const shape = utils.makeshape(
        outline[i],
        outline[len - i],
        curveIntersectionThreshold
      );
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve) return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof _Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(
      this.reduce(),
      curve,
      curveIntersectionThreshold
    );
  }
  lineIntersects(line2) {
    const mx = min4(line2.p1.x, line2.p2.x), my = min4(line2.p1.y, line2.p2.y), MX = max3(line2.p1.x, line2.p2.x), MY = max3(line2.p1.y, line2.p2.y);
    return utils.roots(this.points, line2).filter((t2) => {
      var p = this.get(t2);
      return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
    });
  }
  selfintersects(curveIntersectionThreshold) {
    const reduced = this.reduce(), len = reduced.length - 2, results = [];
    for (let i = 0, result, left, right; i < len; i++) {
      left = reduced.slice(i, i + 1);
      right = reduced.slice(i + 2);
      result = this.curveintersects(left, right, curveIntersectionThreshold);
      results.push(...result);
    }
    return results;
  }
  curveintersects(c1, c2, curveIntersectionThreshold) {
    const pairs = [];
    c1.forEach(function(l) {
      c2.forEach(function(r) {
        if (l.overlaps(r)) {
          pairs.push({ left: l, right: r });
        }
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(
        pair.left,
        pair.right,
        curveIntersectionThreshold
      );
      if (result.length > 0) {
        intersections2 = intersections2.concat(result);
      }
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
    return abs3(d1 - ref) + abs3(d2 - ref);
  }
  _iterate(errorThreshold, circles) {
    let t_s = 0, t_e = 1, safety;
    do {
      safety = 0;
      t_e = 1;
      let np1 = this.get(t_s), np2, np3, arc, prev_arc;
      let curr_good = false, prev_good = false, done;
      let t_m = t_e, prev_e = 1, step = 0;
      do {
        prev_good = curr_good;
        prev_arc = arc;
        t_m = (t_s + t_e) / 2;
        step++;
        np2 = this.get(t_m);
        np3 = this.get(t_e);
        arc = utils.getccenter(np1, np2, np3);
        arc.interval = {
          start: t_s,
          end: t_e
        };
        let error = this._error(arc, np1, t_s, t_e);
        curr_good = error <= errorThreshold;
        done = prev_good && !curr_good;
        if (!done) prev_e = t_e;
        if (curr_good) {
          if (t_e >= 1) {
            arc.interval.end = prev_e = 1;
            prev_arc = arc;
            if (t_e > 1) {
              let d = {
                x: arc.x + arc.r * cos3(arc.e),
                y: arc.y + arc.r * sin3(arc.e)
              };
              arc.e += utils.angle({ x: arc.x, y: arc.y }, d, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else {
          t_e = t_m;
        }
      } while (!done && safety++ < 100);
      if (safety >= 100) {
        break;
      }
      prev_arc = prev_arc ? prev_arc : arc;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};

// src/geometry/rect/FromTopLeft.ts
var fromTopLeft = (origin, width, height) => {
  guardDim(width, `width`);
  guardDim(height, `height`);
  guard(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height };
};

// src/geometry/bezier/Guard.ts
var isQuadraticBezier = (path) => path.quadratic !== void 0;
var isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

// src/geometry/bezier/index.ts
var quadraticBend = (a, b, bend = 0) => quadraticSimple(a, b, bend);
var quadraticSimple = (start, end, bend = 0) => {
  if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
  if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
  const middle = interpolate(0.5, start, end);
  let target = middle;
  if (end.y < start.y) {
    target = bend > 0 ? { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y) };
  }
  const handle = interpolate(Math.abs(bend), middle, target);
  return quadratic(start, end, handle);
};
var interpolator = (q) => {
  const bzr = isCubicBezier(q) ? new Bezier(q.a.x, q.a.y, q.cubic1.x, q.cubic1.y, q.cubic2.x, q.cubic2.y, q.b.x, q.b.y) : new Bezier(q.a, q.quadratic, q.b);
  return (amount) => bzr.compute(amount);
};
var quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) {
    return cubicToPath(cubicOrQuadratic);
  } else if (isQuadraticBezier(cubicOrQuadratic)) {
    return quadratictoPath(cubicOrQuadratic);
  } else {
    throw new Error(`Unknown bezier type`);
  }
};
var cubic = (start, end, cubic1, cubic2) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic2) => {
  const { a, cubic1, cubic2: cubic22, b } = cubic2;
  const bzr = new Bezier(a, cubic1, cubic22, b);
  return Object.freeze({
    ...cubic2,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    toSvgString: () => [`brrup`],
    kind: `bezier/cubic`
  });
};
var quadratic = (start, end, handle) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  quadratic: Object.freeze(handle)
});
var quadratictoPath = (quadraticBezier) => {
  const { a, b, quadratic: quadratic2 } = quadraticBezier;
  const bzr = new Bezier(a, quadratic2, b);
  return Object.freeze({
    ...quadraticBezier,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/modulation/easing/Line.ts
var line = (bend = 0, warp = 0) => {
  const max5 = 1;
  const cubicB = {
    x: scale(bend, -1, 1, 0, max5),
    y: scale(bend, -1, 1, max5, 0)
  };
  let cubicA = interpolate2(Math.abs(bend), Empty, cubicB);
  if (bend !== 0 && warp > 0) {
    if (bend > 0) {
      cubicA = interpolate2(warp, cubicA, { x: 0, y: cubicB.x * 2 });
    } else {
      cubicA = interpolate2(warp, cubicA, { x: cubicB.y * 2, y: 0 });
    }
  }
  const bzr = cubic(
    Empty,
    Unit,
    cubicA,
    cubicB
  );
  const inter = interpolator(bzr);
  return (value) => inter(value);
};

// src/modulation/ModulatorTimed.ts
var time = (fn, duration) => {
  throwFunctionTest(fn, `fn`);
  let relative2;
  return () => {
    if (relative2 === void 0) relative2 = ofTotal(duration, { clampValue: true });
    return fn(relative2());
  };
};
var timeModulator = (fn, duration) => {
  throwFunctionTest(fn, `fn`);
  const timer = elapsedMillisecondsAbsolute();
  const durationMs = intervalToMs(duration);
  if (durationMs === void 0) throw new Error(`Param 'duration' not provided`);
  const relativeTimer = relative(
    durationMs,
    {
      timer,
      clampValue: true
    }
  );
  return timerWithFunction(fn, relativeTimer);
};
var ticks = (fn, totalTicks) => {
  throwFunctionTest(fn, `fn`);
  let relative2;
  return () => {
    if (relative2 === void 0) relative2 = ofTotalTicks(totalTicks, { clampValue: true });
    return fn(relative2());
  };
};
var tickModulator = (fn, durationTicks) => {
  throwFunctionTest(fn, `fn`);
  const timer = elapsedTicksAbsolute();
  const relativeTimer = relative(
    durationTicks,
    {
      timer,
      clampValue: true
    }
  );
  return timerWithFunction(fn, relativeTimer);
};

// src/modulation/easing/index.ts
var create2 = (options) => {
  let name = resolveEasingName(options.name ?? `quintIn`);
  const fn = name ?? options.fn;
  if (!fn) throw new Error(`Either 'name' or 'fn' must be set`);
  if (`duration` in options) {
    return time2(fn, options.duration);
  } else if (`ticks` in options) {
    return ticks2(fn, options.ticks);
  } else {
    throw new Error(`Expected 'duration' or 'ticks' in options`);
  }
};
var timeEasing = (nameOrFunction, duration) => {
  const fn = resolveEasingName(nameOrFunction);
  return timeModulator(fn, duration);
};
var time2 = (nameOrFunction, duration) => {
  const fn = resolveEasingName(nameOrFunction);
  return time(fn, duration);
};
var ticks2 = (nameOrFunction, totalTicks) => {
  const fn = resolveEasingName(nameOrFunction);
  return ticks(fn, totalTicks);
};
var tickEasing = (nameOrFunction, durationTicks) => {
  const fn = resolveEasingName(nameOrFunction);
  return tickModulator(fn, durationTicks);
};
var resolveEasingName = (nameOrFunction) => {
  const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
  if (fn === void 0) {
    const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: '${nameOrFunction}'`) : new Error(`Easing function not found`);
    throw error;
  }
  return fn;
};
var easingsMap;
var get = function(easingName) {
  throwStringTest(easingName, `non-empty`, `easingName`);
  const found = cacheEasings().get(easingName.toLowerCase());
  if (found === void 0) throw new Error(`Easing not found: '${easingName}'`);
  return found;
};
function cacheEasings() {
  if (easingsMap === void 0) {
    easingsMap = /* @__PURE__ */ new Map();
    for (const [k, v] of Object.entries(EasingsNamed_exports)) {
      easingsMap.set(k.toLowerCase(), v);
    }
    return easingsMap;
  } else return easingsMap;
}
function* getEasingNames() {
  const map3 = cacheEasings();
  yield* map3.keys();
}

// src/numbers/Interpolate.ts
var piPi = Math.PI * 2;
function interpolate3(pos1, pos2, pos3, pos4) {
  let amountProcess;
  let limits = `clamp`;
  const handleAmount = (amount) => {
    if (amountProcess) amount = amountProcess(amount);
    if (limits === void 0 || limits === `clamp`) {
      amount = clamp(amount);
    } else if (limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    return amount;
  };
  const doTheEase = (_amt, _a, _b) => {
    throwNumberTest(_a, ``, `a`);
    throwNumberTest(_b, ``, `b`);
    throwNumberTest(_amt, ``, `amount`);
    _amt = handleAmount(_amt);
    return (1 - _amt) * _a + _amt * _b;
  };
  const readOpts = (o = {}) => {
    if (o.easing) {
      const easingFn = get(o.easing);
      if (!easingFn) throw new Error(`Easing function '${o.easing}' not found`);
      amountProcess = easingFn;
    } else if (o.transform) {
      if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
      amountProcess = o.transform;
    }
    limits = o.limits ?? `clamp`;
  };
  const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
  if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
  if (typeof pos2 === `number`) {
    let a;
    let b;
    if (pos3 === void 0 || typeof pos3 === `object`) {
      a = pos1;
      b = pos2;
      readOpts(pos3);
      return (amount) => doTheEase(amount, a, b);
    } else if (typeof pos3 === `number`) {
      a = pos2;
      b = pos3;
      readOpts(pos4);
      return doTheEase(pos1, a, b);
    } else {
      throw new Error(`Values for 'a' and 'b' not defined`);
    }
  } else if (pos2 === void 0 || typeof pos2 === `object`) {
    let amount = handleAmount(pos1);
    readOpts(pos2);
    throwNumberTest(amount, ``, `amount`);
    return (aValue, bValue) => rawEase(amount, aValue, bValue);
  }
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0, options) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate3(amount, a, b, options);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1, options) => {
  const durationProgression = ofTotal(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate3(amount, a, b, options);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians, options) => {
  const t2 = wrap(bRadians - aRadians, 0, piPi);
  return interpolate3(amount, aRadians, aRadians + (t2 > Math.PI ? t2 - piPi : t2), options);
};

// src/rx/ops/Interpolate.ts
function interpolate4(input, options = {}) {
  const amount = options.amount ?? 0.1;
  const snapAt = options.snapAt ?? 0.99;
  const i = interpolate3(amount, options);
  return computeWithPrevious(input, (previous, target) => {
    const v = i(previous, target);
    if (target > previous) {
      if (v / target >= snapAt) return target;
    }
    return v;
  });
}

// src/rx/ops/Math.ts
function max4(input, options) {
  const p = max2();
  return process(p, `max`, input, options);
}
function min5(input, options) {
  const p = min3();
  return process(p, `min`, input, options);
}
function average3(input, options) {
  const p = average2();
  return process(p, `average`, input, options);
}
function sum3(input, options) {
  const p = sum2();
  return process(p, `sum`, input, options);
}
function tally2(input, options = {}) {
  const countArrayItems = options.countArrayItems ?? true;
  const p = tally(countArrayItems);
  return process(p, `tally`, input, options);
}
function rank2(input, rank3, options) {
  const p = rank(rank3, options);
  return process(p, `rank`, input, options);
}
function process(processor, annotationField, input, options = {}) {
  const annotate2 = options.annotate;
  let previous;
  const skipUndefined = options.skipUndefined ?? true;
  const skipIdentical = options.skipIdentical ?? true;
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const x = processor(value);
      if (x === void 0 && skipUndefined) return;
      if (skipIdentical && x === previous) return;
      previous = x;
      if (annotate2) {
        const ret = { value };
        ret[annotationField] = x;
        upstream.set(ret);
      } else {
        upstream.set(x);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Pipe.ts
var pipe = (...streams) => {
  const event2 = initStream();
  const unsubs = [];
  const performDispose = (reason) => {
    for (const s of streams) {
      if (!s.isDisposed) s.dispose(reason);
    }
    for (const s of unsubs) {
      s();
    }
    event2.dispose(reason);
  };
  for (let index = 0; index < streams.length; index++) {
    unsubs.push(streams[index].on((message) => {
      const isLast = index === streams.length - 1;
      if (messageHasValue(message)) {
        if (isLast) {
          event2.set(message.value);
        } else {
          streams[index + 1].set(message.value);
        }
      } else if (messageIsDoneSignal(message)) {
        performDispose(`Upstream disposed`);
      }
    }));
  }
  return {
    on: event2.on,
    onValue: event2.onValue,
    dispose(reason) {
      performDispose(reason);
    },
    isDisposed() {
      return event2.isDisposed();
    }
  };
};

// src/rx/ops/SingleFromArray.ts
function singleFromArray(source, options = {}) {
  const order = options.order ?? `default`;
  if (!options.at && !options.predicate) throw new Error(`Options must have 'predicate' or 'at' fields`);
  let preprocess = (values) => values;
  if (order === `random`) preprocess = shuffle;
  else if (typeof order === `function`) preprocess = (values) => values.toSorted(order);
  const upstream = initUpstream(source, {
    onValue(values) {
      values = preprocess(values);
      if (options.predicate) {
        for (const v of values) {
          if (options.predicate(v)) {
            upstream.set(v);
          }
        }
      } else if (options.at) {
        upstream.set(values.at(options.at));
      }
    }
  });
  return upstream;
}

// src/rx/ops/Split.ts
var split = (rxOrSource, options = {}) => {
  const quantity = options.quantity ?? 2;
  const outputs = [];
  const source = resolveSource(rxOrSource);
  for (let index = 0; index < quantity; index++) {
    outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: `initial` }));
  }
  return outputs;
};
var splitLabelled = (rxOrSource, labels) => {
  const source = resolveSource(rxOrSource);
  const t2 = {};
  for (const label of labels) {
    t2[label] = initUpstream(source, { lazy: `initial`, disposeIfSourceDone: true });
  }
  return t2;
};

// src/rx/ops/Switcher.ts
var switcher = (reactiveOrSource, cases, options = {}) => {
  const match = options.match ?? `first`;
  const source = resolveSource(reactiveOrSource);
  let disposed = false;
  const t2 = {};
  for (const label of Object.keys(cases)) {
    t2[label] = initStream();
  }
  const performDispose = () => {
    if (disposed) return;
    unsub();
    disposed = true;
    for (const stream of Object.values(t2)) {
      stream.dispose(`switcher source dispose`);
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      for (const [lbl, pred] of Object.entries(cases)) {
        if (pred(message.value)) {
          t2[lbl].set(message.value);
          if (match === `first`) break;
        }
      }
    } else if (messageIsDoneSignal(message)) {
      performDispose();
    }
  });
  return t2;
};

// src/rx/ops/SyncToArray.ts
function syncToArray(reactiveSources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const maximumWait = intervalToMs(options.maximumWait, 2e3);
  let watchdog;
  const data = [];
  const states = reactiveSources.map((source) => ({
    finalData: void 0,
    done: false,
    source: resolveSource(source),
    unsub: () => {
    }
  }));
  const unsubscribe = () => {
    for (const s of states) {
      s.unsub();
      s.unsub = () => {
      };
    }
  };
  const isDataSetComplete = () => {
    for (let index = 0; index < data.length; index++) {
      if (onSourceDone === `allow` && states[index].done) continue;
      if (data[index] === void 0) return false;
    }
    return true;
  };
  const hasIncompleteSource = () => states.some((s) => !s.done);
  const resetDataSet = () => {
    for (let index = 0; index < data.length; index++) {
      if (finalValue === `last` && states[index].done) continue;
      data[index] = void 0;
    }
  };
  const onWatchdog = () => {
    done(`Sync timeout exceeded (${maximumWait.toString()})`);
  };
  const done = (reason) => {
    if (watchdog) clearTimeout(watchdog);
    unsubscribe();
    event2.dispose(reason);
  };
  const init = () => {
    watchdog = setTimeout(onWatchdog, maximumWait);
    for (const [index, state] of states.entries()) {
      data[index] = void 0;
      state.unsub = state.source.on((valueChanged) => {
        if (messageIsSignal(valueChanged)) {
          if (valueChanged.signal === `done`) {
            state.finalData = data[index];
            state.unsub();
            state.done = true;
            state.unsub = () => {
            };
            if (finalValue === `undefined`) data[index] = void 0;
            if (onSourceDone === `break`) {
              done(`Source '${index.toString()}' done, and onSourceDone:'break' is set`);
              return;
            }
            if (!hasIncompleteSource()) {
              done(`All sources done`);
              return;
            }
          }
          return;
        }
        data[index] = valueChanged.value;
        if (isDataSetComplete()) {
          event2.set([...data]);
          resetDataSet();
          if (watchdog) clearTimeout(watchdog);
          watchdog = setTimeout(onWatchdog, maximumWait);
        }
      });
    }
  };
  const event2 = initStream({
    onFirstSubscribe() {
      unsubscribe();
      init();
    },
    onNoSubscribers() {
      if (watchdog) clearTimeout(watchdog);
      unsubscribe();
    }
  });
  return {
    dispose: event2.dispose,
    isDisposed: event2.isDisposed,
    on: event2.on,
    onValue: event2.onValue
  };
}

// src/rx/ops/SyncToObject.ts
function syncToObject(reactiveSources, options = {}) {
  const keys = Object.keys(reactiveSources);
  const values = Object.values(reactiveSources);
  const s = syncToArray(values, options);
  const st = transform(s, (streamValues) => {
    return zipKeyValue(keys, streamValues);
  });
  return st;
}

// src/rx/ops/Tap.ts
function tapProcess(input, ...processors) {
  const inputStream = resolveSource(input);
  const chain = flow(...processors);
  inputStream.onValue((value) => {
    chain(value);
  });
  return inputStream;
}
function tapStream(input, diverged) {
  const inputStream = resolveSource(input);
  inputStream.onValue((value) => {
    diverged.set(value);
  });
  return inputStream;
}
var tapOps = (input, ...ops) => {
  for (const op of ops) {
    input = op(input);
  }
  return input;
};

// src/rx/ops/Throttle.ts
function throttle(throttleSource, options = {}) {
  const elapsed2 = intervalToMs(options.elapsed, 0);
  let lastFire = performance.now();
  let lastValue;
  const upstream = initUpstream(throttleSource, {
    ...options,
    onValue(value) {
      lastValue = value;
      trigger();
    }
  });
  const trigger = () => {
    const now = performance.now();
    if (elapsed2 > 0 && now - lastFire > elapsed2) {
      lastFire = now;
      if (lastValue !== void 0) {
        upstream.set(lastValue);
      }
    }
  };
  return toReadable(upstream);
}

// src/rx/ops/TimeoutValue.ts
function timeoutValue(source, options) {
  let timer;
  const immediate = options.immediate ?? true;
  const repeat2 = options.repeat ?? false;
  const timeoutMs = intervalToMs(options.interval, 1e3);
  if (!isTrigger(options)) {
    throw new Error(`Param 'options' does not contain trigger 'value' or 'fn' fields`);
  }
  const sendFallback = () => {
    const [value, done] = resolveTriggerValue(options);
    if (done) {
      events.dispose(`Trigger completed`);
    } else {
      if (events.isDisposed()) return;
      events.set(value);
      if (repeat2) {
        timer = setTimeout(sendFallback, timeoutMs);
      }
    }
  };
  const events = initUpstream(source, {
    disposeIfSourceDone: true,
    // Received a value from upstream source
    onValue(v) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(sendFallback, timeoutMs);
      events.set(v);
    },
    onDispose() {
      if (timer) clearTimeout(timer);
    }
  });
  if (immediate && !timer) {
    timer = setTimeout(sendFallback, timeoutMs);
  }
  return events;
}

// src/rx/ops/TimeoutPing.ts
function timeoutPing(source, options) {
  let timer;
  const rx = resolveSource(source);
  const abort = options.abort;
  const timeoutMs = intervalToMs(options, 1e3);
  const sendPing = () => {
    if (abort?.aborted || rx.isDisposed()) {
      off();
      return;
    }
    if (isPingable(rx)) rx.ping();
    timer = setTimeout(sendPing, timeoutMs);
  };
  const cancel = () => {
    if (timer) clearTimeout(timer);
  };
  const off = rx.on((msg) => {
    if (messageHasValue(msg)) {
      cancel();
      timer = setTimeout(sendPing, timeoutMs);
    } else if (messageIsDoneSignal(msg)) {
      off();
      cancel();
    }
  });
  timer = setTimeout(sendPing, timeoutMs);
  return rx;
}

// src/rx/ops/ValueToPing.ts
function valueToPing(source, target, options = {}) {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const sourceRx = resolveSource(source);
  const gate = options.gate ?? ((value) => true);
  let upstreamOff;
  let downstreamOff;
  if (signal) {
    signal.addEventListener(`abort`, () => {
      done(`Abort signal ${signal.reason}`);
    }, { once: true });
  }
  const events = initStream({
    onFirstSubscribe() {
      if (lazy !== `never` && upstreamOff === void 0) start();
    },
    onNoSubscribers() {
      if (lazy === `very` && upstreamOff !== void 0) {
        upstreamOff();
        upstreamOff = void 0;
      }
    }
  });
  const start = () => {
    upstreamOff = sourceRx.on((message) => {
      if (messageIsDoneSignal(message)) {
        done(`Upstream closed`);
      } else if (messageIsSignal(message)) {
        events.signal(message.signal);
      } else if (messageHasValue(message)) {
        if (gate(message.value)) {
          target.ping();
        }
      }
    });
    downstreamOff = target.on((message) => {
      if (messageIsDoneSignal(message)) {
        done(`Downstream closed`);
      } else if (messageIsSignal(message)) {
        events.signal(message.signal, message.context);
      } else if (messageHasValue(message)) {
        events.set(message.value);
      }
    });
  };
  const done = (reason) => {
    events.dispose(reason);
    if (upstreamOff) upstreamOff();
    if (downstreamOff) downstreamOff();
  };
  if (lazy === `never`) start();
  return events;
}

// src/rx/ops/WithValue.ts
function withValue(input, options) {
  let lastValue = options.initial;
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      lastValue = value;
      upstream.set(value);
    }
  });
  const readable = toReadable(upstream);
  return {
    ...readable,
    last() {
      return lastValue;
    }
  };
}

// src/collections/graphs/DirectedGraph.ts
var DirectedGraph_exports = {};
__export(DirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  areAdjacent: () => areAdjacent,
  bfs: () => bfs,
  clone: () => clone,
  connect: () => connect,
  connectTo: () => connectTo,
  connectWithEdges: () => connectWithEdges,
  createVertex: () => createVertex,
  dfs: () => dfs,
  disconnect: () => disconnect,
  distance: () => distance2,
  distanceDefault: () => distanceDefault,
  dumpGraph: () => dumpGraph,
  edges: () => edges,
  get: () => get2,
  getCycles: () => getCycles,
  getOrCreate: () => getOrCreate,
  getOrFail: () => getOrFail,
  graph: () => graph,
  graphFromVertices: () => graphFromVertices,
  hasKey: () => hasKey,
  hasNoOuts: () => hasNoOuts,
  hasOnlyOuts: () => hasOnlyOuts,
  hasOut: () => hasOut,
  isAcyclic: () => isAcyclic,
  pathDijkstra: () => pathDijkstra,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  topologicalSort: () => topologicalSort,
  transitiveReduction: () => transitiveReduction,
  updateGraphVertex: () => updateGraphVertex,
  vertexHasOut: () => vertexHasOut,
  vertices: () => vertices
});

// src/collections/queue/PriorityMutable.ts
var PriorityMutable = class extends QueueMutable {
  constructor(opts = {}) {
    if (opts.eq === void 0) {
      opts = {
        ...opts,
        eq: (a, b) => {
          return isEqualDefault(a.item, b.item);
        }
      };
    }
    super(opts);
  }
  /**
   * Adds an item with a given priority
   * @param item Item
   * @param priority Priority (higher numeric value means higher priority)
   */
  enqueueWithPriority(item, priority2) {
    throwNumberTest(priority2, `positive`);
    super.enqueue({ item, priority: priority2 });
  }
  changePriority(item, priority2, addIfMissing = false, eq) {
    if (item === void 0) throw new Error(`Item cannot be undefined`);
    let toDelete;
    for (const d of this.data) {
      if (eq) {
        if (eq(d.item, item)) {
          toDelete = d;
          break;
        }
      } else {
        if (this.eq(d, { item, priority: 0 })) {
          toDelete = d;
          break;
        }
      }
    }
    if (toDelete === void 0 && !addIfMissing) throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
    if (toDelete !== void 0) {
      this.removeWhere((item2) => toDelete === item2);
    }
    this.enqueueWithPriority(item, priority2);
  }
  dequeueMax() {
    const m = maxScore(this.data, (v) => v.priority);
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  dequeueMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  peekMax() {
    const m = maxScore(this.data, (v) => v.priority);
    if (m === void 0) return;
    return m.item;
  }
  peekMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0) return;
    return m.item;
  }
};
function priority(opts = {}) {
  return new PriorityMutable(opts);
}

// src/collections/Table.ts
var Table = class {
  constructor() {
    this.rows = [];
    this.rowLabels = [];
    this.colLabels = [];
  }
  labelColumns(...labels) {
    this.colLabels = labels;
  }
  labelColumn(columnNumber, label) {
    this.colLabels[columnNumber] = label;
  }
  getColumnLabelIndex(label) {
    for (const [index, l] of this.colLabels.entries()) {
      if (l === label) return index;
    }
  }
  print() {
    console.table([...this.rowsWithLabelsObject()]);
  }
  *rowsWithLabelsArray() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsArray(index);
      yield labelledRow;
    }
  }
  /**
   * Return a copy of table as nested array
   * ```js
   * const t = new Table();
   * // add stuff
   * // ...
   * const m = t.asArray();
   * for (const row of m) {
   *  for (const colValue of row) {
   *    // iterate over all column values for this row
   *  }
   * }
   * ```
   * 
   * Alternative: get value at row Y and column X
   * ```js
   * const value = m[y][x];
   * ```
   * @returns 
   */
  asArray() {
    const r = [];
    for (const row of this.rows) {
      if (row === void 0) r.push([]);
      else r.push([...row]);
    }
    return r;
  }
  /**
   * Return the number of rows
   */
  get rowCount() {
    return this.rows.length;
  }
  /**
   * Return the maximum number of columns in any row
   */
  get columnCount() {
    const lengths = this.rows.map((row) => row.length);
    return Math.max(...lengths);
  }
  *rowsWithLabelsObject() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsObject(index);
      yield labelledRow;
    }
  }
  labelRows(...labels) {
    this.rowLabels = labels;
  }
  appendRow(...data) {
    this.rows.push(data);
  }
  getRowWithLabelsArray(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0) return void 0;
    return row.map((value, index) => [this.colLabels.at(index), value]);
  }
  /**
   * Return a row of objects. Keys use the column labels.
   * 
   * ```js
   * const row = table.getRowWithLabelsObject(10);
   * // eg:
   * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
   * ```
   * @param rowNumber 
   * @returns 
   */
  getRowWithLabelsObject(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0) return void 0;
    const object2 = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object2[label] = row[index];
    }
    return object2;
  }
  /**
   * Gets or creates a row at `rowNumber`.
   * @param rowNumber 
   * @returns 
   */
  getOrCreateRow(rowNumber) {
    let row = this.rows.at(rowNumber);
    if (row === void 0) {
      row = [];
      this.rows[rowNumber] = row;
    }
    return row;
  }
  /**
   * Gets the values at `rowNumber`
   * @param rowNumber 
   * @returns 
   */
  row(rowNumber) {
    return this.rows.at(rowNumber);
  }
  /**
   * Set the value of row,column to `value`
   * @param rowNumber 
   * @param columnNumber 
   * @param value 
   */
  set(rowNumber, columnNumber, value) {
    const row = this.getOrCreateRow(rowNumber);
    row[columnNumber] = value;
  }
  get(rowNumber, column) {
    const row = this.getOrCreateRow(rowNumber);
    const index = typeof column === `number` ? column : this.getColumnLabelIndex(column);
    if (index === void 0) throw new Error(`Column not found: ${column}`);
    return row[index];
  }
  /**
   * For a given row number, set all the columns to `value`.
   * `cols` gives the number of columns to set
   * @param rowNumber 
   * @param cols 
   * @param value 
   */
  setRow(rowNumber, cols, value) {
    const row = this.getOrCreateRow(rowNumber);
    for (let columnNumber = 0; columnNumber < cols; columnNumber++) {
      row[columnNumber] = value;
    }
  }
};

// src/collections/graphs/DirectedGraph.ts
var createVertex = (id) => {
  return {
    id,
    out: []
  };
};
function hasKey(graph2, key) {
  throwGraphTest(graph2);
  return graph2.vertices.has(key);
}
function get2(graph2, key) {
  throwGraphTest(graph2);
  throwStringTest(key, `non-empty`, `key`);
  return graph2.vertices.get(key);
}
function toAdjacencyMatrix(graph2) {
  throwGraphTest(graph2);
  const v = [...graph2.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      if (ii.out.some((o) => o.id === jj.id)) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph = (graph2) => {
  const lines = debugGraphToArray(graph2);
  return lines.join(`
`);
};
var debugGraphToArray = (graph2) => {
  const r = [];
  const vertices2 = `vertices` in graph2 ? graph2.vertices.values() : graph2;
  for (const v of vertices2) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line2) => ` ${line2}`));
  }
  return r;
};
var distance2 = (graph2, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function* edges(graph2) {
  throwGraphTest(graph2);
  const vertices2 = [...graph2.vertices.values()];
  for (const vertex of vertices2) {
    for (const edge of vertex.out) {
      yield edge;
    }
  }
}
function* vertices(graph2) {
  throwGraphTest(graph2);
  const vertices2 = [...graph2.vertices.values()];
  for (const vertex of vertices2) {
    yield vertex;
  }
}
function testGraph(g, paramName = `graph`) {
  if (g === void 0) return [false, `Param '${paramName}' is undefined. Expected Graph`];
  if (g === null) return [false, `Param '${paramName}' is null. Expected Graph`];
  if (typeof g === `object`) {
    if (!(`vertices` in g)) return [false, `Param '${paramName}.vertices' does not exist. Is it a Graph type?`];
  } else {
    return [false, `Param '${paramName} is type '${typeof g}'. Expected an object Graph`];
  }
  return [true];
}
function throwGraphTest(g, paramName = `graph`) {
  const r = testGraph(g, paramName);
  if (r[0]) return;
  throw new Error(r[1]);
}
function* adjacentVertices(graph2, context) {
  throwGraphTest(graph2);
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph2.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph2.vertices.get(edge.id);
    if (edgeV === void 0) throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0) return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph2, vertex) => {
  throwGraphTest(graph2);
  const context = typeof vertex === `string` ? graph2.vertices.get(vertex) : vertex;
  if (context === void 0) return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph2, vertex, ...outIdOrVertex) => {
  throwGraphTest(graph2);
  const context = resolveVertex(graph2, vertex);
  const outs = outIdOrVertex.map((o) => resolveVertex(graph2, o));
  if (outs.length !== context.out.length) {
    return false;
  }
  for (const out of outs) {
    if (!hasOut(graph2, context, out)) {
      return false;
    }
  }
  return true;
};
var hasOut = (graph2, vertex, outIdOrVertex) => {
  throwGraphTest(graph2);
  const context = resolveVertex(graph2, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate = (graph2, id) => {
  throwGraphTest(graph2);
  const v = graph2.vertices.get(id);
  if (v !== void 0) return { graph: graph2, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph2, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph2, id) => {
  throwGraphTest(graph2);
  const v = graph2.vertices.get(id);
  if (v === void 0) throw new Error(`Vertex '${id}' not found in graph`);
  return v;
};
var updateGraphVertex = (graph2, vertex) => {
  throwGraphTest(graph2);
  const gr = {
    ...graph2,
    vertices: graph2.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph2, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function disconnect(graph2, from2, to2) {
  throwGraphTest(graph2);
  const fromV = resolveVertex(graph2, from2);
  const toV = resolveVertex(graph2, to2);
  return hasOut(graph2, fromV, toV) ? updateGraphVertex(graph2, {
    ...fromV,
    out: fromV.out.filter((t2) => t2.id !== toV.id)
  }) : graph2;
}
function connectTo(graph2, from2, to2, weight2) {
  throwGraphTest(graph2);
  const fromResult = getOrCreate(graph2, from2);
  graph2 = fromResult.graph;
  const toResult = getOrCreate(graph2, to2);
  graph2 = toResult.graph;
  const edge = {
    id: to2,
    weight: weight2
  };
  if (!hasOut(graph2, fromResult.vertex, toResult.vertex)) {
    graph2 = updateGraphVertex(graph2, {
      ...fromResult.vertex,
      // Add new edge to list of edges for this node
      out: [...fromResult.vertex.out, edge]
    });
  }
  return { graph: graph2, edge };
}
function connect(graph2, options) {
  const result = connectWithEdges(graph2, options);
  return result.graph;
}
function connectWithEdges(graph2, options) {
  throwGraphTest(graph2);
  const { to: to2, weight: weight2, from: from2 } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to2) ? to2 : [to2];
  let edges2 = [];
  for (const toSingle of toList) {
    const result = connectTo(graph2, from2, toSingle, weight2);
    graph2 = result.graph;
    edges2.push(result.edge);
  }
  if (!bidi) return { graph: graph2, edges: edges2 };
  for (const toSingle of toList) {
    const result = connectTo(graph2, toSingle, from2, weight2);
    graph2 = result.graph;
    edges2.push(result.edge);
  }
  return { graph: graph2, edges: edges2 };
}
var debugDumpVertex = (v) => {
  const r = [
    v.id
  ];
  const stringForEdge = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge(edge)}`);
  }
  if (v.out.length === 0) r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph2, a, b) {
  throwGraphTest(graph2);
  if (hasOut(graph2, a, b.id)) return true;
  if (hasOut(graph2, b, a.id)) return true;
}
function resolveVertex(graph2, idOrVertex) {
  throwGraphTest(graph2);
  if (idOrVertex === void 0) throw new Error(`Param 'idOrVertex' is undefined. Expected string or Vertex`);
  const v = typeof idOrVertex === `string` ? graph2.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph2, startIdOrVertex, targetIdOrVertex) {
  throwGraphTest(graph2);
  const start = resolveVertex(graph2, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph2, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v) return;
    for (const edge of adjacentVertices(graph2, v)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph2, edge.id));
      }
    }
  }
}
function* dfs(graph2, startIdOrVertex) {
  throwGraphTest(graph2);
  const source = resolveVertex(graph2, startIdOrVertex);
  const s = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s.push(source);
  while (!s.isEmpty) {
    const v = s.pop();
    if (v === void 0) continue;
    if (!seen.has(v.id)) {
      seen.add(v.id);
      yield v;
      for (const edge of v.out) {
        const destination = graph2.vertices.get(edge.id);
        if (destination) {
          s.push(destination);
        }
      }
    }
  }
}
var pathDijkstra = (graph2, sourceOrId) => {
  throwGraphTest(graph2);
  const source = typeof sourceOrId === `string` ? graph2.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0) throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices2 = [...graph2.vertices.values()];
  for (const v of vertices2) {
    if (v.id !== source.id) {
      distances.set(v.id, Number.MAX_SAFE_INTEGER);
      previous.set(v.id, null);
    }
    pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u = pq.dequeueMin();
    if (u === void 0) throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph2.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance2(graph2, neighbour);
      if (alt < distances.get(neighbour.id)) {
        distances.set(neighbour.id, alt);
        previous.set(neighbour.id, vertexU);
        pq.changePriority(neighbour.id, alt, true);
      }
    }
  }
  const pathTo = (id) => {
    const path = [];
    while (true) {
      if (id === source.id) break;
      const v = previous.get(id);
      if (v === void 0 || v === null) throw new Error(`Id not present: ${id}`);
      path.push({ id, weight: distances.get(id) });
      id = v.id;
    }
    return path;
  };
  return {
    distances,
    previous,
    pathTo
  };
};
var clone = (graph2) => {
  throwGraphTest(graph2);
  const g = {
    vertices: immutable([...graph2.vertices.entries()])
  };
  return g;
};
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable()
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
};
function isAcyclic(graph2) {
  throwGraphTest(graph2);
  const cycles = getCycles(graph2);
  return cycles.length === 0;
}
function topologicalSort(graph2) {
  throwGraphTest(graph2);
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph2)) {
    indegrees.add(edge.id, 1);
  }
  const queue = new QueueMutable();
  let vertexCount = 0;
  for (const vertex of vertices(graph2)) {
    if (indegrees.get(vertex.id) === 0) {
      queue.enqueue(vertex);
    }
    vertexCount++;
  }
  const topOrder = [];
  while (!queue.isEmpty) {
    const u = queue.dequeue();
    topOrder.push(u);
    for (const neighbour of u.out) {
      const result = indegrees.subtract(neighbour.id, 1);
      if (result === 0) {
        queue.enqueue(graph2.vertices.get(neighbour.id));
      }
    }
  }
  if (topOrder.length !== vertexCount) {
    throw new Error(`Graph contains cycles`);
  }
  return graphFromVertices(topOrder);
}
function graphFromVertices(vertices2) {
  const keyValues = map(vertices2, (f) => {
    return [f.id, f];
  });
  const m = immutable([...keyValues]);
  return {
    vertices: m
  };
}
function getCycles(graph2) {
  throwGraphTest(graph2);
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph2.vertices.values()) {
    vertices2.set(v.id, {
      ...v,
      lowlink: Number.NaN,
      index: Number.NaN,
      onStack: false
    });
  }
  const strongConnect = (vertex) => {
    vertex.index = index;
    vertex.lowlink = index;
    index++;
    stack.push(vertex);
    vertex.onStack = true;
    for (const edge of vertex.out) {
      const edgeV = vertices2.get(edge.id);
      if (Number.isNaN(edgeV.index)) {
        strongConnect(edgeV);
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      } else if (edgeV.onStack) {
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      }
    }
    if (vertex.lowlink === vertex.index) {
      const stronglyConnected = [];
      let w;
      while (vertex !== w) {
        w = stack.pop();
        w.onStack = false;
        stronglyConnected.push({ id: w.id, out: w.out });
      }
      if (stronglyConnected.length > 1)
        scc.push(stronglyConnected);
    }
  };
  for (const v of vertices2.values()) {
    if (Number.isNaN(v.index)) {
      strongConnect(v);
    }
  }
  return scc;
}
function transitiveReduction(graph2) {
  throwGraphTest(graph2);
  for (const u of vertices(graph2)) {
    for (const v of adjacentVertices(graph2, u)) {
      for (const v1 of dfs(graph2, v)) {
        if (v.id === v1.id) continue;
        if (hasOut(graph2, u, v1)) {
          const g = disconnect(graph2, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph2;
}

// src/rx/Graph.ts
function prepare(_rx) {
  let g = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initStream();
  const process2 = (o, path) => {
    for (const [key, value] of Object.entries(o)) {
      const subPath = path + `.` + key;
      g = connect(g, {
        from: path,
        to: subPath
      });
      if (isReactive(value)) {
        nodes.set(subPath, { value, type: `rx` });
        value.on((v) => {
          console.log(`Rx.prepare value: ${JSON.stringify(v)} path: ${subPath}`);
        });
      } else {
        const valueType = typeof value;
        if (valueType === `bigint` || valueType === `boolean` || valueType === `number` || valueType === `string`) {
          nodes.set(subPath, { type: `primitive`, value });
        } else if (valueType === `object`) {
          process2(value, subPath);
        } else if (valueType === `function`) {
          console.log(`Rx.process - not handling functions`);
        }
      }
    }
  };
  const returnValue = {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dispose: events.dispose,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    isDisposed: events.isDisposed,
    graph: g,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: events.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onValue: events.onValue
  };
  return returnValue;
}

// src/rx/Types.ts
var symbol = Symbol(`Rx`);

// src/rx/ToArray.ts
async function toArray4(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = intervalToMs(options.maximumWait, 10 * 1e3);
  const underThreshold = options.underThreshold ?? `partial`;
  const read = [];
  const rx = resolveSource(source);
  const promise = new Promise((resolve3, reject) => {
    const done = () => {
      clearTimeout(maxWait);
      unsub();
      if (read.length < limit && underThreshold === `throw`) {
        reject(new Error(`Threshold not reached. Wanted: ${limit} got: ${read.length}. Maximum wait: ${maximumWait}`));
        return;
      }
      if (read.length < limit && underThreshold === `fill`) {
        for (let index = 0; index < limit; index++) {
          if (read[index] === void 0) {
            read[index] = options.fillValue;
          }
        }
      }
      resolve3(read);
    };
    const maxWait = setTimeout(() => {
      done();
    }, maximumWait);
    const unsub = rx.on((message) => {
      if (messageIsDoneSignal(message)) {
        done();
      } else if (messageHasValue(message)) {
        read.push(message.value);
        if (read.length === limit) {
          done();
        }
      }
    });
  });
  return promise;
}
async function toArrayOrThrow(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = options.maximumWait ?? 5 * 1e3;
  const v = await toArray4(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v.length < options.limit) throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v.length}`);
  return v;
}

// src/rx/ToGenerator.ts
async function* toGenerator(source) {
  const s = resolveSource(source);
  let promiseResolve = (_) => {
  };
  let promiseReject = (_) => {
  };
  const promiseInit = () => new Promise((resolve3, reject) => {
    promiseResolve = resolve3;
    promiseReject = reject;
  });
  let promise = promiseInit();
  let keepRunning = true;
  s.on((message) => {
    if (messageHasValue(message)) {
      promiseResolve(message.value);
      promise = promiseInit();
    } else if (messageIsDoneSignal(message)) {
      keepRunning = false;
      promiseReject(`Source has completed`);
    }
  });
  while (keepRunning) {
    yield await promise;
  }
}

// src/rx/Wrap.ts
function wrap3(source) {
  return {
    source: resolveSource(source),
    enacts: {
      setHtmlText: (options) => {
        return setHtmlText(source, options);
      }
    },
    annotate: (transformer) => {
      const a = annotate(source, transformer);
      return wrap3(a);
    },
    annotateWithOp: (op) => {
      const a = annotateWithOp(source, op);
      return wrap3(a);
    },
    chunk: (options) => {
      const w = wrap3(chunk(source, options));
      return w;
    },
    debounce: (options = {}) => {
      return wrap3(debounce(source, options));
    },
    field: (fieldName, options = {}) => {
      const f = field(source, fieldName, options);
      return wrap3(f);
    },
    filter: (predicate, options) => {
      return wrap3(filter3(source, predicate, options));
    },
    combineLatestToArray: (sources, options = {}) => {
      const srcs = [source, ...sources];
      return wrap3(combineLatestToArray(srcs, options));
    },
    combineLatestToObject: (sources, options) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap3(combineLatestToObject(o, options));
    },
    min: (options = {}) => {
      return wrap3(min5(source, options));
    },
    max: (options = {}) => {
      return wrap3(max4(source, options));
    },
    average: (options = {}) => {
      return wrap3(average3(source, options));
    },
    sum: (options = {}) => {
      return wrap3(sum3(source, options));
    },
    tally: (options = {}) => {
      return wrap3(tally2(source, options));
    },
    split: (options = {}) => {
      const streams = split(source, options).map((v) => wrap3(v));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l = splitLabelled(source, labels);
      const m = mapObjectShallow(l, (args) => wrap3(args.value));
      return m;
    },
    switcher: (cases, options = {}) => {
      const s = switcher(source, cases, options);
      const m = mapObjectShallow(s, (args) => wrap3(args.value));
      return m;
    },
    syncToArray: (additionalSources, options = {}) => {
      const unwrapped = [source, ...additionalSources].map((v) => resolveSource(v));
      const x = syncToArray(unwrapped, options);
      return wrap3(x);
    },
    syncToObject: (sources, options = {}) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap3(syncToObject(o, options));
    },
    tapProcess: (...processors) => {
      tapProcess(source, ...processors);
      return wrap3(source);
    },
    tapStream: (divergedStream) => {
      tapStream(source, divergedStream);
      return wrap3(source);
    },
    tapOps: (source2, ...ops) => {
      tapOps(source2, ...ops);
      return wrap3(source2);
    },
    throttle: (options = {}) => {
      return wrap3(throttle(source, options));
    },
    transform: (transformer, options = {}) => {
      return wrap3(transform(source, transformer, options));
    },
    timeoutValue: (options) => {
      return wrap3(timeoutValue(source, options));
    },
    timeoutPing: (options) => {
      return wrap3(timeoutPing(source, options));
    },
    toArray: (options) => {
      return toArray4(source, options);
    },
    toArrayOrThrow: (options) => {
      return toArrayOrThrow(source, options);
    },
    onValue: (callback) => {
      const s = resolveSource(source);
      s.on((message) => {
        if (messageHasValue(message)) callback(message.value);
      });
    }
  };
}

// src/rx/Count.ts
function count(options = {}) {
  const lazy = options.lazy ?? `initial`;
  const interval = intervalToMs(options.interval, 1e3);
  const amount = options.amount ?? 1;
  const offset = options.offset ?? 0;
  let produced = 0;
  let value = offset;
  const done = (reason) => {
    events.dispose(reason);
  };
  const timer = continuously(() => {
    if (options.signal?.aborted) {
      done(`Aborted (${options.signal.reason})`);
      return false;
    }
    events.set(value);
    value += 1;
    produced++;
    if (produced >= amount) {
      done(`Limit reached`);
      return false;
    }
  }, interval);
  const events = initLazyStream({
    onStart() {
      timer.start();
    },
    onStop() {
      timer.cancel();
    },
    onDispose() {
      timer.cancel();
    },
    lazy
  });
  return events;
}

// src/rx/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  bind: () => bind,
  bindDiffUpdate: () => bindDiffUpdate,
  bindElement: () => bindElement,
  bindHtml: () => bindHtml,
  bindText: () => bindText,
  bindUpdate: () => bindUpdate,
  bindValueText: () => bindValueText,
  elements: () => elements,
  fromDomQuery: () => fromDomQuery,
  win: () => win
});

// src/text/Segments.ts
function* stringSegmentsWholeToEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
function* stringSegmentsWholeToFirst(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const b = beforeMatch(source, delimiter, { ifNoMatch: `original`, fromEnd: true });
    if (b === source) break;
    source = b;
  }
}

// src/rx/Dom.ts
function fromDomQuery(query) {
  const elements2 = [...document.querySelectorAll(query)];
  return object(elements2);
}
var bindText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `textContent` });
};
var bindValueText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `value`, attribName: `value` });
};
var bindHtml = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `innerHTML` });
};
var bindElement = (source, elOrQuery, ...binds) => {
  if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
  const el = resolveEl(elOrQuery);
  let b = [];
  if (binds.length === 0) {
    b.push({ elField: `textContent` });
  } else {
    b = [...binds];
  }
  const bb = b.map((bind2) => {
    if (`element` in bind2) return bind2;
    return { ...bind2, element: el };
  });
  return bind(source, ...bb);
};
var resolveBindUpdater = (bind2, element) => {
  const b = resolveBindUpdaterBase(bind2);
  return (value) => {
    b(value, element);
  };
};
var resolveBindUpdaterBase = (bind2) => {
  if (bind2.elField !== void 0 || bind2.cssVariable === void 0 && bind2.attribName === void 0 && bind2.cssProperty === void 0 && bind2.textContent === void 0 && bind2.htmlContent === void 0) {
    const field2 = bind2.elField ?? `textContent`;
    return (v, element) => {
      element[field2] = v;
    };
  }
  if (bind2.attribName !== void 0) {
    const attrib = bind2.attribName;
    return (v, element) => {
      element.setAttribute(attrib, v);
    };
  }
  if (bind2.textContent) {
    return (v, element) => {
      element.textContent = v;
    };
  }
  if (bind2.htmlContent) {
    return (v, element) => {
      element.innerHTML = v;
    };
  }
  if (bind2.cssVariable !== void 0) {
    let css = bind2.cssVariable;
    if (!css.startsWith(`--`)) css = `--` + css;
    return (v, element) => {
      element.style.setProperty(css, v);
    };
  }
  if (bind2.cssProperty !== void 0) {
    return (v, element) => {
      element.style[bind2.cssProperty] = v;
    };
  }
  return (_, _element) => {
  };
};
var resolveTransform = (bind2) => {
  if (!bind2.transform && !bind2.transformValue) return;
  if (bind2.transformValue) {
    if (bind2.sourceField === void 0) throw new Error(`Expects 'sourceField' to be set when 'transformValue' is set`);
    return (value) => {
      const fieldValue = value[bind2.sourceField];
      return bind2.transformValue(fieldValue);
    };
  } else if (bind2.transform) {
    if (bind2.sourceField !== void 0) throw new Error(`If 'transform' is set, 'sourceField' is ignored`);
    return (value) => bind2.transform(value);
  }
};
var bind = (source, ...bindsUnresolvedElements) => {
  const binds = bindsUnresolvedElements.map((bind2) => {
    if (bind2.element && bind2.element !== void 0) return bind2;
    if (bind2.query) return {
      ...bind2,
      element: resolveEl(bind2.query)
    };
    throw new Error(`Unable to resolve element. Missing 'element' or 'query' values on bind. ${JSON.stringify(bind2)}`);
  });
  const bindsResolved = binds.map((bind2) => ({
    update: resolveBindUpdater(bind2, bind2.element),
    transformer: resolveTransform(bind2),
    sourceField: bind2.sourceField
  }));
  const update = (value) => {
    for (const bind2 of bindsResolved) {
      if (bind2.transformer) {
        bind2.update(bind2.transformer(value));
      } else {
        const v = bind2.sourceField ? value[bind2.sourceField] : value;
        if (typeof v === `object`) {
          if (bind2.sourceField) {
            bind2.update(JSON.stringify(v));
          } else {
            bind2.update(JSON.stringify(v));
          }
        } else bind2.update(v);
      }
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      update(message.value);
    } else if (messageIsSignal(message)) {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElements) => {
      unsub();
      if (removeElements) {
        for (const bind2 of binds) {
          bind2.element.remove();
        }
      }
    }
  };
};
var bindUpdate = (source, elOrQuery, updater) => {
  const el = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el);
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      console.log(message);
      update(message.value);
    } else {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el.remove();
      }
    }
  };
};
var bindDiffUpdate = (source, elOrQuery, updater, opts = {}) => {
  if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
  const el = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el);
  };
  const unsub = source.onDiff((value) => {
    update(value);
  });
  const init = () => {
    if (hasLast(source) && opts.initial) opts.initial(source.last(), el);
  };
  init();
  return {
    refresh: () => {
      init();
    },
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el.remove();
      }
    }
  };
};
var elements = (source, options) => {
  const containerEl = options.container ? resolveEl(options.container) : document.body;
  const defaultTag = options.defaultTag ?? `div`;
  const elByField = /* @__PURE__ */ new Map();
  const binds = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(options.binds ?? {})) {
    const tagName = value.tagName ?? defaultTag;
    binds.set(key, {
      ...value,
      update: resolveBindUpdaterBase(value),
      transform: resolveTransform(value),
      tagName,
      path: key
    });
  }
  const findBind = (path) => {
    const bind2 = getFromKeys(binds, stringSegmentsWholeToEnd(path));
    if (bind2 !== void 0) return bind2;
    if (!path.includes(`.`)) return binds.get(`_root`);
  };
  function* ancestorBinds(path) {
    for (const p of stringSegmentsWholeToFirst(path)) {
      if (binds.has(p)) {
        yield binds.get(p);
      } else {
      }
    }
    if (binds.has(`_root`) && path.includes(`.`)) yield binds.get(`_root`);
  }
  const create3 = (path, value) => {
    const rootedPath = getRootedPath(path);
    console.log(`Rx.Dom.elements.create: ${path} rooted: ${rootedPath} value: ${JSON.stringify(value)}`);
    const bind2 = findBind(getRootedPath(path));
    let tagName = defaultTag;
    if (bind2?.tagName) tagName = bind2.tagName;
    const el = document.createElement(tagName);
    el.setAttribute(`data-path`, path);
    update(path, el, value);
    let parentForEl;
    for (const b of ancestorBinds(rootedPath)) {
      if (b?.nestChildren) {
        const absoluteRoot = beforeMatch(path, `.`);
        const findBy = b.path.replace(`_root`, absoluteRoot);
        parentForEl = elByField.get(findBy);
        if (parentForEl === void 0) {
        } else {
          break;
        }
      }
    }
    (parentForEl ?? containerEl).append(el);
    elByField.set(path, el);
    console.log(`Added el: ${path}`);
  };
  const update = (path, el, value) => {
    console.log(`Rx.dom.update path: ${path} value:`, value);
    const bind2 = findBind(getRootedPath(path));
    if (bind2 === void 0) {
      if (typeof value === `object`) value = JSON.stringify(value);
      el.textContent = value;
    } else {
      if (bind2.transform) value = bind2.transform(value);
      bind2.update(value, el);
    }
  };
  const changes = (changes2) => {
    const queue = new QueueMutable({}, changes2);
    let d = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d !== void 0) {
      const path = d.path;
      if (!(`previous` in d) || d.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create3(path, d.value);
        const subdata = [...getPathsAndData(d.value, false, Number.MAX_SAFE_INTEGER, path)];
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d.value === void 0) {
        const el = elByField.get(path);
        if (el === void 0) {
          console.warn(`No element to delete? ${path} `);
        } else {
          console.log(`Rx.Dom.elements.changes delete ${path}`);
          el.remove();
        }
      } else {
        const el = elByField.get(path);
        if (el === void 0) {
          console.warn(`Rx.Dom.elements.changes No element to update ? ${path} `);
          create3(path, d.value);
        } else {
          update(path, el, d.value);
        }
      }
      d = queue.dequeue();
    }
  };
  source.onDiff((value) => {
    changes(value);
  });
  if (hasLast(source)) {
    const last = source.last();
    changes([...getPathsAndData(last, false, 1)]);
  }
};
var getRootedPath = (path) => {
  const after = afterMatch(path, `.`);
  return after === path ? `_root` : `_root.` + after;
};
function win() {
  const generateRect = () => ({ width: window.innerWidth, height: window.innerHeight });
  const size = sources_exports.event(window, `resize`, {
    lazy: `very`,
    transform: () => generateRect()
  });
  const pointer = sources_exports.event(window, `pointermove`, {
    lazy: `very`,
    transform: (args) => {
      if (args === void 0) return { x: 0, y: 0 };
      const pe = args;
      return { x: pe.x, y: pe.y };
    }
  });
  const dispose = (reason = `Reactive.win.dispose`) => {
    size.dispose(reason);
    pointer.dispose(reason);
  };
  return { dispose, size, pointer };
}

// src/rx/sources/index.ts
var sources_exports = {};
__export(sources_exports, {
  array: () => array,
  arrayObject: () => arrayObject,
  arrayProxy: () => arrayProxy,
  boolean: () => boolean,
  colour: () => colour,
  derived: () => derived,
  domForm: () => domForm,
  domHslInputValue: () => domHslInputValue,
  domInputValue: () => domInputValue,
  domNumberInputValue: () => domNumberInputValue,
  event: () => event,
  eventField: () => eventField,
  eventTrigger: () => eventTrigger,
  func: () => func,
  iterator: () => iterator,
  merged: () => merged,
  mergedWithOptions: () => mergedWithOptions,
  number: () => number,
  object: () => object,
  objectProxy: () => objectProxy,
  objectProxySymbol: () => objectProxySymbol,
  observable: () => observable,
  observableWritable: () => observableWritable,
  of: () => of,
  string: () => string
});

// src/rx/sources/Array.ts
var of = (source, options = {}) => {
  if (Array.isArray(source)) {
    return array(source, options);
  } else {
  }
};
var array = (sourceArray, options = {}) => {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const whenStopped = options.whenStopped ?? `continue`;
  const debugLifecycle = options.debugLifecycle ?? false;
  const array3 = [...sourceArray];
  if (lazy !== `very` && whenStopped === `reset`) throw new Error(`whenStopped:'reset' has no effect with 'lazy:${lazy}'. Use lazy:'very' instead.`);
  const intervalMs = intervalToMs(options.interval, 5);
  let index = 0;
  let lastValue = array3[0];
  const s = initLazyStream({
    ...options,
    lazy,
    onStart() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStart`);
      c.start();
    },
    onStop() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStop. whenStopped: ${whenStopped} index: ${index}`);
      c.cancel();
      if (whenStopped === `reset`) index = 0;
    }
    // onFirstSubscribe() {
    //   if (debugLifecycle) console.log(`Rx.readFromArray:onFirstSubscribe lazy: ${ lazy } runState: '${ c.runState }'`);
    //   // Start if in lazy mode and not running
    //   if (lazy !== `never` && c.runState === `idle`) c.start();
    // },
    // onNoSubscribers() {
    //   if (debugLifecycle) console.log(`Rx.readFromArray:onNoSubscribers lazy: ${ lazy } runState: '${ c.runState }' whenStopped: '${ whenStopped }'`);
    //   if (lazy === `very`) {
    //     c.cancel();
    //     if (whenStopped === `reset`) {
    //       index = 0;
    //     }
    //   }
    // }
  });
  const c = continuously(() => {
    if (signal?.aborted) {
      s.dispose(`Signalled (${signal.reason})`);
      return false;
    }
    lastValue = array3[index];
    index++;
    s.set(lastValue);
    if (index === array3.length) {
      s.dispose(`Source array complete`);
      return false;
    }
  }, intervalMs);
  if (!lazy) c.start();
  return {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dispose: s.dispose,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    isDisposed: s.isDisposed,
    isDone() {
      return index === array3.length;
    },
    last() {
      return lastValue;
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: s.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onValue: s.onValue
  };
};

// src/rx/sources/ArrayObject.ts
function arrayObject(initialValue = [], options = {}) {
  const eq = options.eq ?? isEqualValueDefault;
  const setEvent = initStream();
  const arrayEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (replacement) => {
    const diff = compareArrays(value, replacement, eq);
    value = replacement;
    setEvent.set([...replacement]);
  };
  const setAt = (index, v) => {
    value[index] = v;
    setEvent.set([...value]);
  };
  const push = (v) => {
    value = [...value, v];
    setEvent.set([...value]);
    const cr = [`add`, value.length - 1, v];
    arrayEvent.set([cr]);
  };
  const deleteAt = (index) => {
    const valueChanged = remove(value, index);
    if (valueChanged.length === value.length) return;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const deleteWhere = (filter4) => {
    const valueChanged = value.filter((v) => !filter4(v));
    const count2 = value.length - valueChanged.length;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
    return count2;
  };
  const insertAt2 = (index, v) => {
    const valueChanged = insertAt(value, index, v);
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const dispose = (reason) => {
    if (disposed) return;
    setEvent.dispose(reason);
    disposed = true;
  };
  const r = {
    dispose,
    isDisposed() {
      return disposed;
    },
    last: () => value,
    on: setEvent.on,
    onArray: arrayEvent.on,
    onValue: setEvent.onValue,
    setAt,
    push,
    deleteAt,
    deleteWhere,
    insertAt: insertAt2,
    /**
     * Set the whole object
     */
    set
  };
  return r;
}

// src/rx/sources/Boolean.ts
function boolean(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set
  };
}

// src/rx/sources/Colour.ts
function colour(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set,
    setHsl: (hsl) => {
      set(resolve2(hsl));
    }
  };
}

// src/rx/sources/Derived.ts
function derived(fn, reactiveSources, options = {}) {
  const ignoreIdentical = options.ignoreIdentical ?? true;
  const eq = options.eq ?? isEqualValueDefault;
  const sources = combineLatestToObject(reactiveSources);
  const handle = (v) => {
    const last = output.last();
    const vv = fn(v);
    if (vv !== void 0) {
      if (ignoreIdentical && last !== void 0) {
        if (eq(vv, last)) return vv;
      }
      output.set(vv);
    }
    return vv;
  };
  const s = initUpstream(sources, {
    ...options,
    onValue(v) {
      handle(v);
    }
  });
  const output = cache(s, fn(sources.last()));
  return output;
}

// src/rx/sources/Event.ts
function eventField(targetOrQuery, eventName, fieldName, initialValue, options = {}) {
  const initial = {};
  initial[fieldName] = initialValue;
  const rxField = field(
    event(targetOrQuery, eventName, initial, options),
    fieldName,
    options
  );
  return rxField;
}
function event(targetOrQuery, name, initialValue, options = {}) {
  let target;
  if (typeof targetOrQuery === `string`) {
    target = document.querySelector(targetOrQuery);
    if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
  } else {
    target = targetOrQuery;
  }
  if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const lazy = options.lazy ?? false;
  if (initialValue === void 0) initialValue = {};
  const rxObject = object(initialValue, { deepEntries: true });
  let eventAdded = false;
  let disposed = false;
  const callback = (args) => {
    if (debugFiring) console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
    rxObject.set(args);
  };
  const remove2 = () => {
    if (!eventAdded) return;
    eventAdded = false;
    target.removeEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Rx.From.event remove '${name}'`);
    }
  };
  const add = () => {
    if (eventAdded) return;
    eventAdded = true;
    target.addEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Rx.From.event add '${name}'`);
    }
  };
  if (!lazy) add();
  return {
    last: () => {
      if (lazy) add();
      return rxObject.last();
    },
    dispose: (reason) => {
      if (disposed) return;
      disposed = true;
      remove2();
      rxObject.dispose(reason);
    },
    isDisposed() {
      return disposed;
    },
    on: (handler) => {
      if (lazy) add();
      return rxObject.on(handler);
    },
    onValue: (handler) => {
      if (lazy) add();
      return rxObject.onValue(handler);
    }
  };
}
function eventTrigger(targetOrQuery, name, options = {}) {
  let target;
  if (typeof targetOrQuery === `string`) {
    target = document.querySelector(targetOrQuery);
    if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
  } else {
    target = targetOrQuery;
  }
  if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const fireInitial = options.fireInitial ?? false;
  let count2 = 0;
  const elapsed2 = Stopwatch_exports.interval();
  const stream = initLazyStream({
    lazy: options.lazy ?? `very`,
    onStart() {
      target.addEventListener(name, callback);
      if (debugLifecycle) {
        console.log(`Rx.From.eventTrigger add '${name}'`);
      }
      if (fireInitial && count2 === 0) {
        if (debugLifecycle || debugFiring) console.log(`Rx.From.eventTrigger: firing initial`);
        callback();
      }
    },
    onStop() {
      target.removeEventListener(name, callback);
      if (debugLifecycle) {
        console.log(`Rx.From.eventTrigger remove '${name}'`);
      }
    }
  });
  const callback = (_args) => {
    if (debugFiring) console.log(`Rx.From.eventTrigger '${name}' triggered'`);
    stream.set({
      sinceLast: elapsed2(),
      total: ++count2
    });
  };
  return stream;
}

// src/rx/sources/Dom.ts
function domNumberInputValue(targetOrQuery, options = {}) {
  const input = domInputValue(targetOrQuery, options);
  const el = input.el;
  const relative2 = options.relative ?? false;
  const inverted = options.inverted ?? false;
  const rx = transform(input, (v) => {
    return Number.parseFloat(v);
  });
  if (relative2) {
    el.max = inverted ? "0" : "1";
    el.min = inverted ? "1" : "0";
    if (!el.hasAttribute(`step`)) {
      el.step = "0.1";
    }
  }
  if (el.getAttribute(`type`) === null) {
    el.type = `range`;
  }
  const set = (value) => {
    input.set(value.toString());
  };
  return {
    ...rx,
    last() {
      return Number.parseFloat(input.last());
    },
    set
  };
}
function domHslInputValue(targetOrQuery, options = {}) {
  const input = domInputValue(targetOrQuery, {
    ...options,
    upstreamFilter(value) {
      return typeof value === `object` ? toHex(value) : value;
    }
  });
  const rx = transform(input, (v) => {
    return toHsl(v, true);
  });
  return {
    ...rx,
    last() {
      return toHsl(input.last(), true);
    },
    set(value) {
      input.set(toHex(value));
    }
  };
}
function domInputValue(targetOrQuery, options = {}) {
  const target = typeof targetOrQuery === `string` ? document.querySelector(targetOrQuery) : targetOrQuery;
  if (target === null && typeof targetOrQuery === `string`) throw new Error(`Element query could not be resolved '${targetOrQuery}'`);
  if (target === null) throw new Error(`targetOrQuery is null`);
  const el = resolveEl(targetOrQuery);
  const when = options.when ?? `changed`;
  const eventName = when === `changed` ? `change` : `input`;
  const emitInitialValue = options.emitInitialValue ?? false;
  const fallbackValue = options.fallbackValue ?? ``;
  const upstreamSource = options.upstreamSource;
  let upstreamSourceUnsub = () => {
  };
  let attribName = options.attributeName;
  let fieldName = options.fieldName;
  if (fieldName === void 0 && attribName === void 0) {
    attribName = fieldName = `value`;
  }
  const readValue = () => {
    let value;
    if (attribName) {
      value = el.getAttribute(attribName);
    }
    if (fieldName) {
      value = el[fieldName];
    }
    if (value === void 0 || value === null) value = fallbackValue;
    return value;
  };
  const setValue = (value) => {
    if (attribName) {
      el.setAttribute(attribName, value);
    }
    if (fieldName) {
      el[fieldName] = value;
    }
  };
  const setUpstream = (v) => {
    v = options.upstreamFilter ? options.upstreamFilter(v) : v;
    setValue(v);
  };
  if (upstreamSource) {
    upstreamSourceUnsub = upstreamSource.onValue(setUpstream);
    if (hasLast(upstreamSource)) {
      setUpstream(upstreamSource.last());
    }
  }
  const rxEvents = eventTrigger(el, eventName, {
    fireInitial: emitInitialValue,
    debugFiring: options.debugFiring ?? false,
    debugLifecycle: options.debugLifecycle ?? false
  });
  const rxValues = transform(rxEvents, (_trigger) => readValue());
  return {
    ...rxValues,
    el,
    last() {
      return readValue();
    },
    set(value) {
      setValue(value);
    },
    dispose(reason) {
      upstreamSourceUnsub();
      rxValues.dispose(reason);
      rxEvents.dispose(reason);
    }
  };
}
function domForm(formElOrQuery, options = {}) {
  const formEl = resolveEl(formElOrQuery);
  const when = options.when ?? `changed`;
  const eventName = when === `changed` ? `change` : `input`;
  const emitInitialValue = options.emitInitialValue ?? false;
  const upstreamSource = options.upstreamSource;
  const typeHints = /* @__PURE__ */ new Map();
  let upstreamSourceUnsub = () => {
  };
  const readValue = () => {
    const fd = new FormData(formEl);
    const entries = [];
    for (const [k, v] of fd.entries()) {
      const vStr = v.toString();
      let typeHint = typeHints.get(k);
      if (!typeHint) {
        const el = getFormElement(k, vStr);
        if (el) {
          if (el.type === `range` || el.type === `number`) {
            typeHint = `number`;
          } else if (el.type === `color`) {
            typeHint = `colour`;
          } else if (el.type === `checkbox` && (v === `true` || v === `on`)) {
            typeHint = `boolean`;
          } else {
            typeHint = `string`;
          }
          typeHints.set(k, typeHint);
        }
      }
      if (typeHint === `number`) {
        entries.push([k, Number.parseFloat(vStr)]);
      } else if (typeHint === `boolean`) {
        const vBool = vStr === `true` ? true : false;
        entries.push([k, vBool]);
      } else if (typeHint === `colour`) {
        const vRgb = resolve2(vStr, true);
        entries.push([k, toRgb(vRgb)]);
      } else {
        entries.push([k, v.toString()]);
      }
    }
    for (const el of formEl.querySelectorAll(`input[type="checkbox"]`)) {
      if (!el.checked && el.value === `true`) {
        entries.push([el.name, false]);
      }
    }
    const asObj = Object.fromEntries(entries);
    return asObj;
  };
  const getFormElement = (name, value) => {
    const el = formEl.querySelector(`[name="${name}"]`);
    if (!el) {
      console.warn(`Form does not contain an element with name="${name}"`);
      return;
    }
    if (el.type === `radio`) {
      const radioEl = formEl.querySelector(`[name="${name}"][value="${value}"]`);
      if (!radioEl) {
        console.warn(`Form does not contain radio option for name=${name} value=${value}`);
        return;
      }
      return radioEl;
    }
    return el;
  };
  const setNamedValue = (name, value) => {
    const el = getFormElement(name, value);
    if (!el) return;
    if (el.nodeName === `INPUT` || el.nodeName === `SELECT`) {
      if (el.type === `color`) {
        if (typeof value === `object`) {
          const c = resolve2(value, true);
          value = toHex(c);
        }
      } else if (el.type === `checkbox`) {
        if (typeof value === `boolean`) {
          el.checked = value;
          return;
        } else {
          console.warn(`Rx.Sources.domForm: Trying to set non boolean type to a checkbox. Name: ${name} Value: ${value} (${typeof value})`);
        }
      } else if (el.type === `radio`) {
        el.checked = true;
        return;
      }
      el.value = value;
    }
  };
  const setFromUpstream = (value) => {
    for (const [name, v] of Object.entries(value)) {
      let hint = typeHints.get(name);
      if (!hint) {
        hint = typeof v;
        if (hint === `object`) {
          const rgb = parseRgbObject(v);
          if (rgb.success) {
            hint = `colour`;
          }
        }
        typeHints.set(name, hint);
      }
      const valueFiltered = options.upstreamFilter ? options.upstreamFilter(name, v) : v;
      setNamedValue(name, valueFiltered);
    }
  };
  if (upstreamSource) {
    upstreamSourceUnsub = upstreamSource.onValue(setFromUpstream);
    if (hasLast(upstreamSource)) {
      setFromUpstream(upstreamSource.last());
    }
  }
  const rxEvents = eventTrigger(formEl, eventName, {
    fireInitial: emitInitialValue,
    debugFiring: options.debugFiring ?? false,
    debugLifecycle: options.debugLifecycle ?? false
  });
  const rxValues = transform(rxEvents, (_trigger) => readValue());
  return {
    ...rxValues,
    el: formEl,
    last() {
      return readValue();
    },
    set: setFromUpstream,
    setNamedValue,
    dispose(reason) {
      upstreamSourceUnsub();
      rxValues.dispose(reason);
      rxEvents.dispose(reason);
    }
  };
}

// src/rx/sources/Merged.ts
function merged(...sources) {
  return mergedWithOptions(sources);
}
function mergedWithOptions(sources, options = {}) {
  let unsubs = [];
  const stream = initLazyStream({
    ...options,
    onStart() {
      for (const s of sources) {
        unsubs.push(s.onValue((v) => {
          stream.set(v);
        }));
      }
    },
    onStop() {
      for (const un of unsubs) {
        un();
      }
      unsubs = [];
    }
  });
  return stream;
}

// src/rx/sources/Number.ts
function number(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set
  };
}

// src/rx/sources/ObjectProxy.ts
var objectProxy = (target) => {
  const rx = object(target);
  const proxy = new Proxy(target, {
    set(target2, p, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      console.log(`Rx.Sources.object set. Target: ${JSON.stringify(target2)} (${typeof target2} array: ${Array.isArray(target2)}) p: ${JSON.stringify(p)} (${typeof p}) newValue: ${JSON.stringify(newValue)} recv: ${_receiver}`);
      if (isArray && p === `length`) return true;
      if (typeof p === `string`) {
        rx.updateField(p, newValue);
      }
      if (isArray && typeof p === `string`) {
        const pAsNumber = Number.parseInt(p);
        if (!Number.isNaN(pAsNumber)) {
          target2[pAsNumber] = newValue;
          return true;
        }
      }
      target2[p] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var arrayProxy = (target) => {
  const rx = arrayObject(target);
  const proxy = new Proxy(target, {
    set(target2, p, newValue, _receiver) {
      if (p === `length`) return true;
      if (typeof p !== `string`) throw new Error(`Expected numeric index, got type: ${typeof p} value: ${JSON.stringify(p)}`);
      const pAsNumber = Number.parseInt(p);
      if (!Number.isNaN(pAsNumber)) {
        rx.setAt(pAsNumber, newValue);
        target2[pAsNumber] = newValue;
        return true;
      } else {
        throw new Error(`Expected numeric index, got: '${p}'`);
      }
    }
  });
  return { proxy, rx };
};
var objectProxySymbol = (target) => {
  const { proxy, rx } = objectProxy(target);
  const p = proxy;
  p[symbol] = rx;
  return p;
};

// src/rx/sources/Observable.ts
function observable(init) {
  const ow = observableWritable(init);
  return {
    dispose: ow.dispose,
    isDisposed: ow.isDisposed,
    on: ow.on,
    onValue: ow.onValue
  };
}
function observableWritable(init) {
  let onCleanup = () => {
  };
  const ow = manual({
    onFirstSubscribe() {
      onCleanup = init(ow);
    },
    onNoSubscribers() {
      if (onCleanup) onCleanup();
    }
  });
  return {
    ...ow,
    onValue: (callback) => {
      return ow.on((message) => {
        if (messageHasValue(message)) {
          callback(message.value);
        }
      });
    }
  };
}

// src/rx/sources/String.ts
function string(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set
  };
}

// src/rx/index.ts
function run(source, ...ops) {
  let s = resolveSource(source);
  for (const op of ops) {
    s = op(s);
  }
  return s;
}
function writable(source, ...ops) {
  let s = resolveSource(source);
  const head = s;
  for (const op of ops) {
    s = op(s);
  }
  let ss = s;
  return {
    ...ss,
    set(value) {
      if (isWritable(head)) {
        head.set(value);
      } else throw new Error(`Original source is not writable`);
    }
  };
}
function manual(options = {}) {
  const events = initStream(options);
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    set(value) {
      events.set(value);
    },
    on: events.on,
    onValue: events.onValue
  };
}
var Sinks = {
  setHtmlText: (options) => {
    return (source) => {
      setHtmlText(source, options);
    };
  }
};
var Ops = {
  /**
  * Annotates values with the result of a function.
  * The input value needs to be an object.
  * 
  * For every value `input` emits, run it through `annotator`, which should
  * return the original value with additional fields.
  * 
  * Conceptually the same as `transform`, just with typing to enforce result
  * values are V & TAnnotation
  * @param annotator 
  * @returns 
  */
  annotate: (annotator) => opify(annotate, annotator),
  /**
   * Annotates the input stream using {@link ReactiveOp} as the source of annotations.
   * The output values will have the shape of `{ value: TIn, annotation: TAnnotation }`.
   * Meaning that the original value is stored under `.value`, and the annotation under `.annotation`.
   * 
   * ```js
   * // Emit values from an array
   * const r1 = Rx.run(
   *  Rx.From.array([ 1, 2, 3 ]),
   *  Rx.Ops.annotateWithOp(
   *    // Add the 'max' operator to emit the largest-seen value
   *    Rx.Ops.sum()
   *  )
   * );
   * const data = await Rx.toArray(r1);
   * // Data =  [ { value: 1, annotation: 1 }, { value: 2, annotation: 3 }, { value: 3, annotation: 6 } ]
   * ```
   * @param annotatorOp 
   * @returns 
   */
  annotateWithOp: (annotatorOp) => opify(annotateWithOp, annotatorOp),
  /**
   * Takes a stream of values and chunks them up (by quantity or time elapsed),
   * emitting them as an array.
   * @param options 
   * @returns 
   */
  chunk: (options) => {
    return (source) => {
      return chunk(source, options);
    };
  },
  cloneFromFields: () => {
    return (source) => {
      return cloneFromFields(source);
    };
  },
  /**
  * Merges values from several sources into a single source that emits values as an array.
  * @param options 
  * @returns 
  */
  combineLatestToArray: (options = {}) => {
    return (sources) => {
      return combineLatestToArray(sources, options);
    };
  },
  /**
   * Merges values from several sources into a single source that emits values as an object.
   * @param options
   * @returns 
   */
  combineLatestToObject: (options = {}) => {
    return (reactiveSources) => {
      return combineLatestToObject(reactiveSources, options);
    };
  },
  /**
  * Debounce values from the stream. It will wait until a certain time
  * has elapsed before emitting latest value.
  * 
  * Effect is that no values are emitted if input emits faster than the provided
  * timeout.
  * 
  * See also: throttle
  * @param options 
  * @returns 
  */
  debounce: (options) => {
    return (source) => {
      return debounce(source, options);
    };
  },
  elapsed: () => opify(elapsed),
  /**
   * Yields the value of a field from an input stream of values.
   * Eg if the source reactive emits `{ colour: string, size: number }`,
   * we might use `field` to pluck out the `colour` field, thus returning
   * a stream of string values.
   * @param fieldName 
   * @param options 
   * @returns 
   */
  field: (fieldName, options) => {
    return (source) => {
      return field(source, fieldName, options);
    };
  },
  /**
   * Filters the input stream, only re-emitting values that pass the predicate
   * @param predicate 
   * @returns 
   */
  filter: (predicate) => opify(filter3, predicate),
  /**
   * Every upstream value is considered the target for interpolation.
   * Output value interpolates by a given amount toward the target.
   * @param options 
   * @returns 
   */
  interpolate: (options) => opify(interpolate4, options),
  /**
  * Outputs the minimum numerical value of the stream.
  * A value is only emitted when minimum decreases.
  * @returns 
  */
  min: (options) => opify(min5, options),
  /**
   * Outputs the maxium numerical value of the stream.
   * A value is only emitted when maximum increases.
   * @returns 
   */
  max: (options) => opify(max4, options),
  sum: (options) => opify(sum3, options),
  average: (options) => opify(average3, options),
  tally: (options) => opify(tally2, options),
  rank: (rank3, options) => opify(rank2, rank3, options),
  pipe: (...streams) => {
    return (source) => {
      const resolved = resolveSource(source);
      const s = [resolved, ...streams];
      return pipe(...s);
    };
  },
  singleFromArray: (options = {}) => {
    return (source) => {
      return singleFromArray(source, options);
    };
  },
  split: (options = {}) => {
    return (source) => {
      return split(source, options);
    };
  },
  splitLabelled: (labels) => {
    return (source) => {
      return splitLabelled(source, labels);
    };
  },
  switcher: (cases, options = {}) => {
    return (source) => {
      return switcher(source, cases, options);
    };
  },
  syncToArray: (options = {}) => {
    return (reactiveSources) => {
      return syncToArray(reactiveSources, options);
    };
  },
  syncToObject: (options = {}) => {
    return (reactiveSources) => {
      return syncToObject(reactiveSources, options);
    };
  },
  tapProcess: (processor) => {
    return (source) => {
      return tapProcess(source, processor);
    };
  },
  tapStream: (divergedStream) => {
    return (source) => {
      return tapStream(source, divergedStream);
    };
  },
  tapOps: (...ops) => {
    return (source) => {
      return tapOps(source, ...ops);
    };
  },
  /**
  * Throttle values from the stream.
  * Only emits a value if some minimum time has elapsed.
  * @param options 
  * @returns 
  */
  throttle: (options) => opify(throttle, options),
  /**
   * Trigger a value if 'source' does not emit a value within an interval.
   * Trigger value can be a fixed value, result of function, or step through an iterator.
   * @param options 
   * @returns 
   */
  timeoutValue: (options) => {
    return (source) => {
      return timeoutValue(source, options);
    };
  },
  timeoutPing: (options) => {
    return (source) => {
      return timeoutPing(source, options);
    };
  },
  transform: (transformer, options = {}) => {
    return (source) => {
      return transform(source, transformer, options);
    };
  },
  /**
  * Reactive where last (or a given initial) value is available to read
  * @param opts 
  * @returns 
  */
  withValue: (opts) => {
    return opify(withValue, opts);
  }
};
async function takeNextValue(source, maximumWait = 1e3) {
  const rx = resolveSource(source);
  let off = () => {
  };
  let watchdog;
  const p = new Promise((resolve3, reject) => {
    off = rx.on((message) => {
      if (watchdog) clearTimeout(watchdog);
      if (messageHasValue(message)) {
        off();
        resolve3(message.value);
      } else {
        if (messageIsDoneSignal(message)) {
          reject(new Error(`Source closed. ${message.context ?? ``}`));
          off();
        }
      }
    });
    watchdog = setTimeout(() => {
      watchdog = void 0;
      off();
      reject(new Error(`Timeout waiting for value (${JSON.stringify(maximumWait)})`));
    }, intervalToMs(maximumWait));
  });
  return p;
}
var to = (a, b, transform2, closeBonA = false) => {
  const unsub = a.on((message) => {
    if (messageHasValue(message)) {
      const value = transform2 ? transform2(message.value) : message.value;
      b.set(value);
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        b.dispose(`Source closed (${message.context ?? ``})`);
      }
    } else {
      console.warn(`Unsupported message: ${JSON.stringify(message)}`);
    }
  });
  return unsub;
};

export {
  Correlate_exports,
  keysToNumbers,
  mapObjectShallow,
  mapObjectByObject,
  isEmptyEntries,
  isEqualContextString,
  getField,
  getPaths,
  Pathed_exports,
  Pool_exports,
  max2 as max,
  min3 as min,
  sum2 as sum,
  average2 as average,
  tally,
  rank,
  Process_exports,
  fromArray,
  fromIterable2 as fromIterable,
  chunks,
  concat,
  dropWhile,
  until,
  equals,
  every,
  fill,
  filter2 as filter,
  find2 as find,
  flatten,
  forEach,
  map2 as map,
  max as max2,
  min2,
  reduce,
  asCallback,
  slice,
  nextWithTimeout,
  some2 as some,
  toArray2 as toArray,
  unique,
  uniqueByValue,
  zip2 as zip,
  IterableAsync_exports,
  resolveSource,
  setText,
  setHtml,
  setProperty,
  setHtmlText,
  annotate,
  annotateWithOp,
  chunk,
  transform,
  cloneFromFields,
  combineLatestToArray,
  combineLatestToObject,
  computeWithPrevious,
  debounce,
  elapsed,
  field,
  filter3 as filter2,
  drop,
  wrapInteger,
  wrap,
  wrapRange,
  gaussian,
  angleRadian,
  averageWeighted,
  movingAverageLight,
  movingAverageTimed,
  movingAverage,
  noiseFilter,
  maxFromCorners,
  bbox,
  isEqual,
  getPointParameter,
  distance,
  guard2 as guard,
  guardPositioned,
  isNaN2 as isNaN,
  isPositioned,
  isCircle,
  isCirclePositioned,
  distanceCenter,
  distanceFromExterior,
  guardDim,
  guard3 as guard2,
  getRectPositioned,
  guardPositioned2,
  isEmpty2 as isEmpty,
  isPlaceholder2 as isPlaceholder,
  isPositioned2,
  isRect,
  isRectPositioned,
  isEqual2,
  sum as sum2,
  subtract,
  intersectionLine,
  intersections,
  circleRect,
  circleCircle,
  intersectsPoint,
  isIntersecting,
  center,
  Placeholder,
  distanceFromExterior2,
  distanceFromCenter,
  distanceToExterior,
  divide,
  dotProduct2 as dotProduct,
  Empty,
  fromNumbers,
  isLine,
  isPolyLine,
  guard5 as guard3,
  getPointParameter2,
  length,
  interpolate,
  multiply,
  multiplyScalar,
  clampMagnitude,
  normalise,
  normaliseByRect,
  project,
  quantiseEvery,
  reduce2,
  relation,
  degreeToRadian,
  radianInvert,
  radianToDegree,
  radiansFromAxisX,
  radiansSum,
  degreesSum,
  radianArc,
  degreeArc,
  isPolarCoord,
  fromCartesian,
  toCartesian,
  normalise2,
  dotProduct3 as dotProduct2,
  clampMagnitude2,
  toString,
  toPoint,
  Polar_exports,
  rotate2 as rotate,
  toString2,
  point_exports,
  fromTopLeft,
  isQuadraticBezier,
  isCubicBezier,
  quadraticSimple,
  toPath,
  bezier_exports,
  time,
  timeModulator,
  ticks,
  tickModulator,
  get,
  easing_exports,
  piPi,
  interpolate3 as interpolate2,
  interpolatorStepped,
  interpolatorInterval,
  interpolateAngle,
  interpolate4 as interpolate3,
  max4 as max3,
  min5 as min3,
  average3 as average2,
  sum3,
  tally2,
  rank2,
  pipe,
  singleFromArray,
  split,
  splitLabelled,
  switcher,
  syncToArray,
  syncToObject,
  tapProcess,
  tapStream,
  tapOps,
  throttle,
  timeoutValue,
  timeoutPing,
  valueToPing,
  withValue,
  PriorityMutable,
  priority,
  Table,
  DirectedGraph_exports,
  prepare,
  symbol,
  toArray4 as toArray2,
  toArrayOrThrow,
  toGenerator,
  wrap3 as wrap2,
  count,
  Dom_exports,
  sources_exports,
  run,
  writable,
  manual,
  Sinks,
  Ops,
  takeNextValue,
  to,
  rx_exports,
  resolveFields,
  resolveFieldsSync,
  maps_exports,
  piPi2,
  data_exports
};
//# sourceMappingURL=chunk-TIIF2VKF.js.map