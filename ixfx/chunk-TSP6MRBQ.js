import {
  stringSegmentsWholeToEnd,
  stringSegmentsWholeToFirst
} from "./chunk-N7FO4CPW.js";
import {
  StackMutable,
  depthFirst,
  map
} from "./chunk-INARIK5E.js";
import {
  NumberMap,
  immutable
} from "./chunk-XFNQJV53.js";
import {
  average,
  dotProduct,
  weight
} from "./chunk-YG33FJI6.js";
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
} from "./chunk-NK6WZHXG.js";
import {
  QueueMutable,
  isAsyncIterable,
  isIterable
} from "./chunk-VYCNRTDD.js";
import {
  StateMachine_exports,
  Stopwatch_exports,
  clamp,
  clamper,
  elapsedMillisecondsAbsolute,
  elapsedTicksAbsolute,
  ofTotal,
  ofTotalTicks,
  relative,
  timerWithFunction
} from "./chunk-4OK6CU6W.js";
import {
  SimpleEventEmitter,
  intervalToMs
} from "./chunk-72EKR3DZ.js";
import {
  resolveEl,
  resolveEls
} from "./chunk-ICXKAKPN.js";
import {
  arrays_exports,
  insertAt,
  pairwise,
  remove,
  zip
} from "./chunk-CVHSZDTH.js";
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
} from "./chunk-IXB3RQED.js";
import {
  shuffle
} from "./chunk-YKJ5OEMO.js";
import {
  isInteger,
  isPrimitive
} from "./chunk-RNGEX66F.js";
import {
  afterMatch,
  beforeMatch,
  defaultRandom,
  wildcard
} from "./chunk-PSWPSMIG.js";
import {
  throwResult
} from "./chunk-QVTHCRNR.js";
import {
  isPlainObjectOrPrimitive,
  throwFunctionTest,
  throwStringTest
} from "./chunk-WYMJKVGY.js";
import {
  changedDataFields,
  compareArrays,
  compareData,
  compareKeys,
  maxScore,
  min
} from "./chunk-Z2SF7PPR.js";
import {
  round
} from "./chunk-3UVU2F72.js";
import {
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault
} from "./chunk-6UZ3OSJO.js";
import {
  numberInclusiveRangeTest,
  numberTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest,
  throwPercentTest
} from "./chunk-UC4AQMTL.js";
import {
  getOrGenerate,
  getOrGenerateSync,
  logSet
} from "./chunk-N6YIY4CM.js";
import {
  getErrorMessage
} from "./chunk-4IJNRUE7.js";
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
  cache: () => cache,
  chunk: () => chunk,
  cloneFromFields: () => cloneFromFields,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  computeWithPrevious: () => computeWithPrevious,
  debounce: () => debounce,
  drop: () => drop,
  elapsed: () => elapsed,
  field: () => field,
  filter: () => filter3,
  hasLast: () => hasLast,
  initLazyStream: () => initLazyStream,
  initLazyStreamWithInitial: () => initLazyStreamWithInitial,
  initStream: () => initStream,
  initUpstream: () => initUpstream,
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
  to: () => to2,
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
async function* max(it, gt = (a2, b2) => a2 > b2) {
  let max6;
  for await (const v of it) {
    if (max6 === void 0) {
      max6 = v;
      yield max6;
      continue;
    }
    if (gt(v, max6)) {
      max6 = v;
      yield v;
    }
  }
}
async function* min2(it, gt = (a2, b2) => a2 > b2) {
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
async function* uniqueByValue(input, toString5 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for await (const v of input) {
    const key = toString5(v);
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
function initLazyStreamWithInitial(options) {
  const r = initLazyStream(options);
  const c4 = cache(r, options.initialValue);
  return c4;
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
  const set2 = (v) => {
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
  return value === void 0 ? set2 : set2(value);
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
var isEqualContextString = (a2, b2, _path) => {
  return JSON.stringify(a2) === JSON.stringify(b2);
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
function* compareData2(a2, b2, options = {}) {
  if (a2 === void 0) {
    yield {
      path: options.pathPrefix ?? ``,
      value: b2,
      state: `added`
    };
    return;
  }
  if (b2 === void 0) {
    yield { path: options.pathPrefix ?? ``, previous: a2, value: void 0, state: `removed` };
    return;
  }
  const asPartial = options.asPartial ?? false;
  const undefinedValueMeansRemoved = options.undefinedValueMeansRemoved ?? false;
  const pathPrefix = options.pathPrefix ?? ``;
  const deepEntries = options.deepEntries ?? false;
  const eq = options.eq ?? isEqualContextString;
  const includeMissingFromA = options.includeMissingFromA ?? false;
  const includeParents = options.includeParents ?? false;
  if (isPrimitive(a2) && isPrimitive(b2)) {
    if (a2 !== b2) yield { path: pathPrefix, value: b2, previous: a2, state: `change` };
    return;
  }
  if (isPrimitive(b2)) {
    yield { path: pathPrefix, value: b2, previous: a2, state: `change` };
    return;
  }
  const entriesA = getEntries(a2, deepEntries);
  const entriesAKeys = /* @__PURE__ */ new Set();
  for (const [key, valueA] of entriesA) {
    entriesAKeys.add(key);
    const keyOfAInB = key in b2;
    const valueOfKeyInB = b2[key];
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
              yield { path: pathPrefix + key, value: b2[key], previous: valueA, state: `change` };
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
    const entriesB = getEntries(b2, deepEntries);
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
      const c4 = compareKeys(o, value);
      if (c4.a.length > 0) {
        throw new Error(`New value is missing key(s): ${c4.a.join(`,`)}`);
      }
      if (c4.b.length > 0) {
        throw new Error(`New value cannot add new key(s): ${c4.b.join(`,`)}`);
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
  for (const c4 of iter) {
    if (c4.nodeValue === void 0 && onlyLeaves) continue;
    let path = c4.name;
    if (c4.ancestors.length > 0) path = c4.ancestors.join(`.`) + `.` + path;
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
  const set2 = (v) => {
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
      for (const d2 of diff) {
        fireFieldUpdate(d2.path, d2.value);
      }
      return value;
    }
  };
  const updateField = (path, valueForField) => {
    if (value === void 0) throw new Error(`Cannot update value when it has not already been set`);
    const existing = getField(value, path);
    if (!throwResult(existing)) return;
    if (eq(existing.value, valueForField, path)) {
      return;
    }
    let diff = [...compareData2(existing.value, valueForField, { ...options, includeMissingFromA: true })];
    diff = diff.map((d2) => {
      if (d2.path.length > 0) return { ...d2, path: path + `.` + d2.path };
      return { ...d2, path };
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
    set: set2,
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
      const d2 = state.data;
      if (d2 !== void 0) {
        r[key] = state.data;
      }
    }
    return r;
  };
  const trigger = () => {
    emitInitialDone = true;
    const d2 = getData();
    event2.set(d2);
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
  let last2 = 0;
  return transform(input, (_ignored) => {
    const elapsed2 = last2 === 0 ? 0 : Date.now() - last2;
    last2 = Date.now();
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
var wrapInteger = (v, min6 = 0, max6 = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min6, void 0, `min`);
  throwIntegerTest(max6, void 0, `max`);
  if (v === min6) return min6;
  if (v === max6) return min6;
  if (v > 0 && v < min6) v += min6;
  v -= min6;
  max6 -= min6;
  v = v % max6;
  if (v < 0) v = max6 - Math.abs(v) + min6;
  return v + min6;
};
var wrap = (v, min6 = 0, max6 = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min6, ``, `min`);
  throwNumberTest(max6, ``, `max`);
  if (v === min6) return min6;
  if (v === max6) return min6;
  while (v <= min6 || v >= max6) {
    if (v === max6) break;
    if (v === min6) break;
    if (v > max6) {
      v = min6 + (v - max6);
    } else if (v < min6) {
      v = max6 - (min6 - v);
    }
  }
  return v;
};
var wrapRange = (min6, max6, fn, a2, b2) => {
  let r = 0;
  const distF = Math.abs(b2 - a2);
  const distFwrap = Math.abs(max6 - a2 + b2);
  const distBWrap = Math.abs(a2 + (360 - b2));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a2 - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a2 + fn(distMin);
  } else {
    if (a2 > b2) {
      r = a2 - fn(distMin);
    } else {
      r = a2 + fn(distMin);
    }
  }
  return wrapInteger(r, min6, max6);
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
    let p2 = -2.5;
    let c4 = (t2 - mean) / standardDeviation;
    c4 *= c4;
    p2 *= c4;
    const v = f * pow(Math.E, p2);
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
  const c12 = 1.70158;
  const c32 = c12 + 1;
  return c32 * x * x * x - c12 * x * x;
};
var backOut = (x) => {
  const c12 = 1.70158;
  const c32 = c12 + 1;
  return 1 + c32 * pow2(x - 1, 3) + c12 * pow2(x - 1, 2);
};
var circInOut = (x) => x < 0.5 ? (1 - sqrt(1 - pow2(2 * x, 2))) / 2 : (sqrt(1 - pow2(-2 * x + 2, 2)) + 1) / 2;
var backInOut = (x) => {
  const c12 = 1.70158;
  const c22 = c12 * 1.525;
  return x < 0.5 ? pow2(2 * x, 2) * ((c22 + 1) * 2 * x - c22) / 2 : (pow2(2 * x - 2, 2) * ((c22 + 1) * (x * 2 - 2) + c22) + 2) / 2;
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
  bbox3d: () => bbox3d,
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
  isNaN: () => isNaN2,
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
  toString: () => toString3,
  withinRange: () => withinRange,
  wrap: () => wrap2
});

// src/geometry/point/Guard.ts
var isNull = (p2) => {
  if (isPoint3d(p2)) {
    if (p2.z !== null) return false;
  }
  return p2.x === null && p2.y === null;
};
var isNaN2 = (p2) => {
  if (isPoint3d(p2)) {
    if (!Number.isNaN(p2.z)) return false;
  }
  return Number.isNaN(p2.x) || Number.isNaN(p2.y);
};
function guard(p2, name = `Point`) {
  if (p2 === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (p2 === null) {
    throw new Error(
      `'${name}' is null. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (p2.x === void 0) {
    throw new Error(
      `'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (p2.y === void 0) {
    throw new Error(
      `'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p2)}`
    );
  }
  if (typeof p2.x !== `number`) {
    throw new TypeError(`'${name}.x' must be a number. Got ${typeof p2.x}`);
  }
  if (typeof p2.y !== `number`) {
    throw new TypeError(`'${name}.y' must be a number. Got ${typeof p2.y}`);
  }
  if (p2.z !== void 0) {
    if (typeof p2.z !== `number`) throw new TypeError(`${name}.z must be a number. Got: ${typeof p2.z}`);
    if (Number.isNaN(p2.z)) throw new Error(`'${name}.z' is NaN. Got: ${JSON.stringify(p2)}`);
  }
  if (p2.x === null) throw new Error(`'${name}.x' is null`);
  if (p2.y === null) throw new Error(`'${name}.y' is null`);
  if (Number.isNaN(p2.x)) throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p2.y)) throw new Error(`'${name}.y' is NaN`);
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
function isPoint(p2) {
  if (p2 === void 0) return false;
  if (p2 === null) return false;
  if (p2.x === void 0) return false;
  if (p2.y === void 0) return false;
  return true;
}
var isPoint3d = (p2) => {
  if (p2 === void 0) return false;
  if (p2 === null) return false;
  if (p2.x === void 0) return false;
  if (p2.y === void 0) return false;
  if (p2.z === void 0) return false;
  return true;
};
var isEmpty = (p2) => {
  if (isPoint3d(p2)) {
    if (p2.z !== 0) return false;
  }
  return p2.x === 0 && p2.y === 0;
};
var isPlaceholder = (p2) => {
  if (isPoint3d(p2)) {
    if (!Number.isNaN(p2.z)) return false;
  }
  return Number.isNaN(p2.x) && Number.isNaN(p2.y);
};

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
var angleRadian = (a2, b2, c4) => {
  guard(a2, `a`);
  if (b2 === void 0) {
    return Math.atan2(a2.y, a2.x);
  }
  guard(b2, `b`);
  if (c4 === void 0) {
    return Math.atan2(b2.y - a2.y, b2.x - a2.x);
  }
  guard(c4, `c`);
  return Math.atan2(b2.y - a2.y, b2.x - a2.x) - Math.atan2(c4.y - a2.y, c4.x - a2.x);
};
var angleRadianCircle = (a2, b2, c4) => {
  const angle = angleRadian(a2, b2, c4);
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
    whatToCall: (distance4) => {
      average4(distance4);
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
    const a2 = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a2, value, previousValue);
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
function findMinimum(comparer, ...points) {
  if (points.length === 0) throw new Error(`No points provided`);
  let min6 = points[0];
  for (const p2 of points) {
    if (isPoint3d(min6) && isPoint3d(p2)) {
      min6 = comparer(min6, p2);
    } else {
      min6 = comparer(min6, p2);
    }
  }
  return min6;
}

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
  const leftMost = findMinimum((a2, b2) => {
    return a2.x < b2.x ? a2 : b2;
  }, ...points);
  const rightMost = findMinimum((a2, b2) => {
    return a2.x > b2.x ? a2 : b2;
  }, ...points);
  const topMost = findMinimum((a2, b2) => {
    return a2.y < b2.y ? a2 : b2;
  }, ...points);
  const bottomMost = findMinimum((a2, b2) => {
    return a2.y > b2.y ? a2 : b2;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};
var bbox3d = (...points) => {
  const box = bbox(...points);
  const zMin = findMinimum((a2, b2) => {
    return a2.z < b2.z ? a2 : b2;
  }, ...points);
  const zMax = findMinimum((a2, b2) => {
    return a2.z > b2.z ? a2 : b2;
  }, ...points);
  return {
    ...box,
    z: zMin.z,
    depth: zMax.z - zMin.z
  };
};

// src/geometry/point/Centroid.ts
var centroid = (...points) => {
  if (!Array.isArray(points)) throw new Error(`Expected list of points`);
  const sum4 = points.reduce(
    (previous, p2) => {
      if (p2 === void 0) return previous;
      if (Array.isArray(p2)) {
        throw new TypeError(
          `'points' list contains an array. Did you mean: centroid(...myPoints)?`
        );
      }
      if (!isPoint(p2)) {
        throw new Error(
          `'points' contains something which is not a point: ${JSON.stringify(
            p2
          )}`
        );
      }
      return {
        x: previous.x + p2.x,
        y: previous.y + p2.y
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
function clamp2(a2, min6 = 0, max6 = 1) {
  if (isPoint3d(a2)) {
    return Object.freeze({
      x: clamp(a2.x, min6, max6),
      y: clamp(a2.y, min6, max6),
      z: clamp(a2.z, min6, max6)
    });
  } else {
    return Object.freeze({
      x: clamp(a2.x, min6, max6),
      y: clamp(a2.y, min6, max6)
    });
  }
}

// src/geometry/point/Compare.ts
var compare = (a2, b2) => {
  if (a2.x < b2.x && a2.y < b2.y) return -2;
  if (a2.x > b2.x && a2.y > b2.y) return 2;
  if (a2.x < b2.x || a2.y < b2.y) return -1;
  if (a2.x > b2.x || a2.y > b2.y) return 1;
  if (a2.x === b2.x && a2.x === b2.y) return 0;
  return Number.NaN;
};
var compareByX = (a2, b2) => {
  if (a2.x === b2.x) return 0;
  if (a2.x < b2.x) return -1;
  return 1;
};
var compareByY = (a2, b2) => {
  if (a2.y === b2.y) return 0;
  if (a2.y < b2.y) return -1;
  return 1;
};
var compareByZ = (a2, b2) => {
  if (a2.z === b2.z) return 0;
  if (a2.z < b2.z) return -1;
  return 1;
};

// src/geometry/point/IsEqual.ts
var isEqual = (...p2) => {
  if (p2 === void 0) throw new Error(`parameter 'p' is undefined`);
  if (p2.length < 2) return true;
  for (let index = 1; index < p2.length; index++) {
    if (p2[index].x !== p2[0].x) return false;
    if (p2[index].y !== p2[0].y) return false;
  }
  return true;
};

// src/geometry/point/ConvexHull.ts
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1) return sorted;
  const x = (points) => {
    const v = [];
    for (const p2 of points) {
      while (v.length >= 2) {
        const q = v.at(-1);
        const r = v.at(-2);
        if ((q.x - r.x) * (p2.y - r.y) >= (q.y - r.y) * (p2.x - r.x)) {
          v.pop();
        } else break;
      }
      v.push(p2);
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
    const b3 = {
      x: ab2,
      y: ab3,
      z: ab4
    };
    if (!isPoint3d(b3)) throw new Error(`Expected x, y & z parameters`);
    return [a1, b3];
  }
  if (isPoint(a1)) {
    const b3 = {
      x: ab2,
      y: ab3
    };
    if (!isPoint(b3)) throw new Error(`Expected x & y parameters`);
    return [a1, b3];
  }
  if (typeof ab5 !== `undefined` && typeof ab4 !== `undefined`) {
    const a3 = {
      x: a1,
      y: ab2,
      z: ab3
    };
    const b3 = {
      x: ab4,
      y: ab5,
      z: ab6
    };
    if (!isPoint3d(a3)) throw new Error(`Expected x,y,z for first point`);
    if (!isPoint3d(b3)) throw new Error(`Expected x,y,z for second point`);
    return [a3, b3];
  }
  const a2 = {
    x: a1,
    y: ab2
  };
  const b2 = {
    x: ab3,
    y: ab4
  };
  if (!isPoint(a2)) throw new Error(`Expected x,y for first point`);
  if (!isPoint(b2)) throw new Error(`Expected x,y for second point`);
  return [a2, b2];
}
function getPointParameter(a2, b2, c4) {
  if (a2 === void 0) return { x: 0, y: 0 };
  if (Array.isArray(a2)) {
    if (a2.length === 0) return Object.freeze({ x: 0, y: 0 });
    if (a2.length === 1) return Object.freeze({ x: a2[0], y: 0 });
    if (a2.length === 2) return Object.freeze({ x: a2[0], y: a2[1] });
    if (a2.length === 3) return Object.freeze({ x: a2[0], y: a2[1], z: a2[2] });
    throw new Error(
      `Expected array to be 1-3 elements in length. Got ${a2.length}.`
    );
  }
  if (isPoint(a2)) {
    return a2;
  } else if (typeof a2 !== `number` || typeof b2 !== `number`) {
    throw new TypeError(
      `Expected point or x,y as parameters. Got: a: ${JSON.stringify(
        a2
      )} b: ${JSON.stringify(b2)}`
    );
  }
  if (typeof c4 === `number`) {
    return Object.freeze({ x: a2, y: b2, z: c4 });
  }
  return Object.freeze({ x: a2, y: b2 });
}

// src/geometry/point/Distance.ts
function distance(a2, xOrB, y, z) {
  const pt = getPointParameter(xOrB, y, z);
  guard(pt, `b`);
  guard(a2, `a`);
  return isPoint3d(pt) && isPoint3d(a2) ? Math.hypot(pt.x - a2.x, pt.y - a2.y, pt.z - a2.z) : Math.hypot(pt.x - a2.x, pt.y - a2.y);
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
var isNaN3 = (a2) => {
  if (Number.isNaN(a2.radius)) return true;
  if (isCirclePositioned(a2)) {
    if (Number.isNaN(a2.x)) return true;
    if (Number.isNaN(a2.y)) return true;
  }
  return false;
};
var isPositioned = (p2) => p2.x !== void 0 && p2.y !== void 0;
var isCircle = (p2) => p2.radius !== void 0;
var isCirclePositioned = (p2) => isCircle(p2) && isPositioned(p2);

// src/geometry/circle/DistanceCenter.ts
var distanceCenter = (a2, b2) => {
  guardPositioned(a2, `a`);
  if (isCirclePositioned(b2)) {
    guardPositioned(b2, `b`);
  }
  return distance(a2, b2);
};

// src/geometry/circle/DistanceFromExterior.ts
var distanceFromExterior = (a2, b2) => {
  guardPositioned(a2, `a`);
  if (isCirclePositioned(b2)) {
    return Math.max(0, distanceCenter(a2, b2) - a2.radius - b2.radius);
  } else if (isPoint(b2)) {
    const distribution = distance(a2, b2);
    if (distribution < a2.radius) return 0;
    return distribution;
  } else throw new Error(`Second parameter invalid type`);
};

// src/geometry/rect/Guard.ts
var guardDim = (d2, name = `Dimension`) => {
  if (d2 === void 0) throw new Error(`${name} is undefined`);
  if (Number.isNaN(d2)) throw new Error(`${name} is NaN`);
  if (d2 < 0) throw new Error(`${name} cannot be negative`);
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
var isEqual2 = (a2, b2) => {
  if (a2.radius !== b2.radius) return false;
  if (isCirclePositioned(a2) && isCirclePositioned(b2)) {
    if (a2.x !== b2.x) return false;
    if (a2.y !== b2.y) return false;
    if (a2.z !== b2.z) return false;
    return true;
  } else if (!isCirclePositioned(a2) && !isCirclePositioned(b2)) {
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
  const b2 = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c4 = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d2 = Math.sqrt(b2 * b2 - 2 * c4 * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
  if (Number.isNaN(d2)) return [];
  const u1 = (b2 - d2) / c4;
  const u2 = (b2 + d2) / c4;
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
var intersections = (a2, b2) => {
  const vector = subtract(b2, a2);
  const centerD = Math.hypot(vector.y, vector.x);
  if (centerD > a2.radius + b2.radius) return [];
  if (centerD < Math.abs(a2.radius - b2.radius)) return [];
  if (isEqual2(a2, b2)) return [];
  const centroidD = (a2.radius * a2.radius - b2.radius * b2.radius + centerD * centerD) / (2 * centerD);
  const centroid2 = {
    x: a2.x + vector.x * centroidD / centerD,
    y: a2.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a2.radius * a2.radius - centroidD * centroidD);
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
var circleRect = (a2, b2) => {
  const deltaX = a2.x - Math.max(b2.x, Math.min(a2.x, b2.x + b2.width));
  const deltaY = a2.y - Math.max(b2.y, Math.min(a2.y, b2.y + b2.height));
  return deltaX * deltaX + deltaY * deltaY < a2.radius * a2.radius;
};
var circleCircle = (a2, b2) => intersections(a2, b2).length === 2;

// src/geometry/rect/Intersects.ts
function intersectsPoint(rect, a2, b2) {
  guard3(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a2 === `number`) {
    if (b2 === void 0) throw new Error(`x and y coordinate needed`);
    x = a2;
    y = b2;
  } else {
    x = a2.x;
    y = a2.y;
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
var isIntersecting = (a2, b2) => {
  if (!isRectPositioned(a2)) {
    throw new Error(`a parameter should be RectPositioned`);
  }
  if (isCirclePositioned(b2)) {
    return circleRect(b2, a2);
  } else if (isPoint(b2)) {
    return intersectsPoint(a2, b2);
  }
  throw new Error(`Unknown shape for b: ${JSON.stringify(b2)}`);
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
var distanceToCenter = (a2, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a2);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a2);
  }
  if (isPoint(shape)) return distance(a2, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/DistanceToExterior.ts
var distanceToExterior = (a2, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a2);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a2);
  }
  if (isPoint(shape)) return distance(a2, shape);
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
function divider(a2, b2, c4) {
  const divisor = getPointParameter(a2, b2, c4);
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
var toArray3 = (p2) => [p2.x, p2.y];

// src/geometry/point/DotProduct.ts
var dotProduct2 = (...pts) => {
  const a2 = pts.map((p2) => toArray3(p2));
  return dotProduct(a2);
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
var isLine = (p2) => {
  if (p2 === void 0) return false;
  if (p2.a === void 0) return false;
  if (p2.b === void 0) return false;
  if (!isPoint(p2.a)) return false;
  if (!isPoint(p2.b)) return false;
  return true;
};
var isPolyLine = (p2) => {
  if (!Array.isArray(p2)) return false;
  const valid = !p2.some((v) => !isLine(v));
  return valid;
};
var guard5 = (line2, name = `line`) => {
  if (line2 === void 0) throw new Error(`${name} undefined`);
  if (line2.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line2)}`);
  if (line2.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line2)}`);
};

// src/geometry/line/GetPointsParameter.ts
var getPointParameter2 = (aOrLine, b2) => {
  let a2;
  if (isLine(aOrLine)) {
    b2 = aOrLine.b;
    a2 = aOrLine.a;
  } else {
    a2 = aOrLine;
    if (b2 === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a2)} b: ${JSON.stringify(b2)}`);
  }
  guard(a2, `a`);
  guard(a2, `b`);
  return [a2, b2];
};

// src/geometry/line/Length.ts
function length(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum4 = aOrLine.reduce((accumulator, v) => length(v) + accumulator, 0);
    return sum4;
  }
  if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
  const [a2, b2] = getPointParameter2(aOrLine, pointB);
  const x = b2.x - a2.x;
  const y = b2.y - a2.y;
  if (a2.z !== void 0 && b2.z !== void 0) {
    const z = b2.z - a2.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}

// src/geometry/line/Reverse.ts
function reverse(line2) {
  guard5(line2, `line`);
  return { a: line2.b, b: line2.a };
}

// src/geometry/line/Interpolate.ts
function interpolate(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow) throwPercentTest(amount, `amount`);
  else throwNumberTest(amount, ``, `amount`);
  const [a2, b2] = getPointParameter2(aOrLine, pointBOrAllowOverflow);
  const d2 = length(a2, b2);
  const d22 = d2 * (1 - amount);
  if (d2 === 0 && d22 === 0) return Object.freeze({ ...b2 });
  const x = b2.x - d22 * (b2.x - a2.x) / d2;
  const y = b2.y - d22 * (b2.y - a2.y) / d2;
  return Object.freeze({
    ...b2,
    x,
    y
  });
}
function pointAtDistance(line2, distance4, fromA = true) {
  if (!fromA) line2 = reverse(line2);
  const dx = line2.b.x - line2.a.x;
  const dy = line2.b.y - line2.a.y;
  const theta = Math.atan2(dy, dx);
  const xp = distance4 * Math.cos(theta);
  const yp = distance4 * Math.sin(theta);
  return { x: xp + line2.a.x, y: yp + line2.a.y };
}

// src/geometry/point/Interpolate.ts
var interpolate2 = (amount, a2, b2, allowOverflow = false) => interpolate(amount, a2, b2, allowOverflow);

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
var clampMagnitude = (pt, max6 = 1, min6 = 0) => {
  const length3 = distance(pt);
  let ratio = 1;
  if (length3 > max6) {
    ratio = max6 / length3;
  } else if (length3 < min6) {
    ratio = min6 / length3;
  }
  return ratio === 1 ? pt : multiply(pt, ratio, ratio);
};

// src/geometry/point/Most.ts
var leftmost = (...points) => findMinimum((a2, b2) => a2.x <= b2.x ? a2 : b2, ...points);
var rightmost = (...points) => findMinimum((a2, b2) => a2.x >= b2.x ? a2 : b2, ...points);

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
function normaliseByRect(a2, b2, c4, d2) {
  if (isPoint(a2)) {
    if (typeof b2 === `number` && c4 !== void 0) {
      throwNumberTest(b2, `positive`, `width`);
      throwNumberTest(c4, `positive`, `height`);
    } else {
      if (!isRect(b2)) {
        throw new Error(`Expected second parameter to be a rect`);
      }
      c4 = b2.height;
      b2 = b2.width;
    }
    return Object.freeze({
      x: a2.x / b2,
      y: a2.y / c4
    });
  } else {
    throwNumberTest(a2, `positive`, `x`);
    if (typeof b2 !== `number`) {
      throw new TypeError(`Expecting second parameter to be a number (width)`);
    }
    if (typeof c4 !== `number`) {
      throw new TypeError(`Expecting third parameter to be a number (height)`);
    }
    throwNumberTest(b2, `positive`, `y`);
    throwNumberTest(c4, `positive`, `width`);
    if (d2 === void 0) throw new Error(`Expected height parameter`);
    throwNumberTest(d2, `positive`, `height`);
    return Object.freeze({
      x: a2 / c4,
      y: b2 / d2
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
  const a2 = subtract(position, waypointA);
  const b2 = subtract(waypointB, waypointA);
  return isPoint3d(a2) && isPoint3d(b2) ? (a2.x * b2.x + a2.y * b2.y + a2.z * b2.z) / (b2.x * b2.x + b2.y * b2.y + b2.z * b2.z) : (a2.x * b2.x + a2.y * b2.y) / (b2.x * b2.x + b2.y * b2.y);
};

// src/geometry/point/Project.ts
var project = (origin, distance4, angle) => {
  const x = Math.cos(angle) * distance4 + origin.x;
  const y = Math.sin(angle) * distance4 + origin.y;
  return { x, y };
};

// src/numbers/Quantise.ts
var quantiseEvery = (v, every2, middleRoundsUp = true) => {
  const everyString = every2.toString();
  const decimal = everyString.indexOf(`.`);
  let multiplier = 1;
  if (decimal >= 0) {
    const d2 = everyString.substring(decimal + 1).length;
    multiplier = 10 * d2;
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
  for (const p2 of pts) {
    accumulator = fn(p2, accumulator);
  }
  ;
  return accumulator;
};

// src/geometry/point/Relation.ts
var relation = (a2, b2) => {
  const start = getPointParameter(a2, b2);
  let totalX = 0;
  let totalY = 0;
  let count2 = 0;
  let lastUpdate = performance.now();
  let lastPoint = start;
  const update = (aa, bb) => {
    const p2 = getPointParameter(aa, bb);
    totalX += p2.x;
    totalY += p2.y;
    count2++;
    const distanceFromStart = distance(p2, start);
    const distanceFromLast = distance(p2, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p2;
    return Object.freeze({
      angle: angleRadian(p2, start),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid(p2, start),
      average: {
        x: totalX / count2,
        y: totalY / count2
      }
    });
  };
  return update;
};

// src/geometry/polar/index.ts
var polar_exports = {};
__export(polar_exports, {
  Ray: () => Ray_exports,
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

// src/geometry/polar/Guard.ts
var isPolarCoord = (p2) => {
  if (p2.distance === void 0) return false;
  if (p2.angleRadian === void 0) return false;
  return true;
};
var guard6 = (p2, name = `Point`) => {
  if (p2 === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (p2 === null) {
    throw new Error(
      `'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (p2.angleRadian === void 0) {
    throw new Error(
      `'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (p2.distance === void 0) {
    throw new Error(
      `'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p2
      )}`
    );
  }
  if (typeof p2.angleRadian !== `number`) {
    throw new TypeError(
      `'${name}.angleRadian' must be a number. Got ${p2.angleRadian}`
    );
  }
  if (typeof p2.distance !== `number`) {
    throw new TypeError(`'${name}.distance' must be a number. Got ${p2.distance}`);
  }
  if (p2.angleRadian === null) throw new Error(`'${name}.angleRadian' is null`);
  if (p2.distance === null) throw new Error(`'${name}.distance' is null`);
  if (Number.isNaN(p2.angleRadian)) {
    throw new TypeError(`'${name}.angleRadian' is NaN`);
  }
  if (Number.isNaN(p2.distance)) throw new Error(`'${name}.distance' is NaN`);
};

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
  cloneFromFields: () => cloneFromFields2,
  compareArrays: () => compareArrays,
  compareData: () => compareData,
  compareKeys: () => compareKeys,
  filterValue: () => filterValue,
  isEmptyEntries: () => isEmptyEntries,
  isEqualContextString: () => isEqualContextString,
  keysToNumbers: () => keysToNumbers,
  mapObjectByObject: () => mapObjectByObject,
  mapObjectShallow: () => mapObjectShallow,
  mergeObjects: () => mergeObjects,
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
var orderScore = (a2, b2) => {
  if (a2.score > b2.score) return -1;
  else if (a2.score < b2.score) return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, options = {}) => {
  const matchThreshold = options.matchThreshold ?? 0;
  const debug = options.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d2, index) => {
    if (d2 === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d2.id, d2);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last2) => ({
      id: last2.id,
      score: last2 === null ? -1 : similarityFn(last2, newD),
      last: last2
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

// src/data/CloneFromFields.ts
var cloneFromFields2 = (source) => {
  const entries = [];
  for (const field2 in source) {
    const value = source[field2];
    if (isPlainObjectOrPrimitive(value)) {
      entries.push([field2, value]);
    }
  }
  return Object.fromEntries(entries);
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
      const m3 = mapper[e[0]];
      e[1] = typeof m3 === `object` ? mapObjectByObject(e[1], m3) : m3(e[1], data);
    }
  }
  return Object.fromEntries(entries);
}

// src/data/Filters.ts
var filterValue = (v, predicate, skipValue) => {
  if (predicate(v)) return v;
  return skipValue;
};

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
    return [...this._users.values()].sort((a2, b2) => {
      const aa = a2.elapsed;
      const bb = b2.elapsed;
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
    return [...this._resources].sort((a2, b2) => {
      if (a2.usersCount === b2.usersCount) return 0;
      if (a2.usersCount < b2.usersCount) return -1;
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
    for (const p2 of this._resources) {
      if (p2.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p2.data)}`);
        nuke.push(p2);
      } else if (p2.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p2.data)}`);
        nuke.push(p2);
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
  let max6 = Number.MIN_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      max6 = Math.max(subValue, max6);
    }
    return max6;
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
    for (const p2 of processors) {
      try {
        v = p2(v);
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
function seenToUndefinedByKey(toString5) {
  let seen = /* @__PURE__ */ new Set();
  if (toString5 === void 0) toString5 = toStringDefault;
  return (value) => {
    if (value === void 0) return;
    const key = toString5(value);
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

// src/data/RecordMerge.ts
function mergeObjects(...a2) {
  return Object.assign({}, ...a2);
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
    let x = start + amount;
    if (x >= piPi2) x = x % piPi2;
    return x;
  } else {
    const x = start - amount;
    if (x < 0) {
      return piPi2 + x;
    }
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
  let d2 = end - s;
  if (clockwise) d2 = piPi2 - d2;
  if (d2 >= piPi2) return d2 % piPi2;
  return d2;
};
var degreeArc = (start, end, clockwise = true) => radianToDegree(radianArc(degreeToRadian(start), degreeToRadian(end), clockwise));

// src/geometry/polar/Angles.ts
var rotate = (c4, amountRadian) => Object.freeze({
  ...c4,
  angleRadian: c4.angleRadian + amountRadian
});
var invert2 = (p2) => {
  guard6(p2, `c`);
  return Object.freeze({
    ...p2,
    angleRadian: p2.angleRadian - Math.PI
  });
};
var isOpposite = (a2, b2) => {
  guard6(a2, `a`);
  guard6(b2, `b`);
  if (a2.distance !== b2.distance) return false;
  return a2.angleRadian === -b2.angleRadian;
};
var isParallel = (a2, b2) => {
  guard6(a2, `a`);
  guard6(b2, `b`);
  return a2.angleRadian === b2.angleRadian;
};
var isAntiParallel = (a2, b2) => {
  guard6(a2, `a`);
  guard6(b2, `b`);
  return a2.angleRadian === -b2.angleRadian;
};
var rotateDegrees = (c4, amountDeg) => Object.freeze({
  ...c4,
  angleRadian: c4.angleRadian + degreeToRadian(amountDeg)
});

// src/geometry/polar/Conversions.ts
var toCartesian = (a2, b2, c4) => {
  if (isPolarCoord(a2)) {
    if (b2 === void 0) b2 = Empty;
    if (isPoint(b2)) {
      return polarToCartesian(a2.distance, a2.angleRadian, b2);
    }
    throw new Error(
      `Expecting (Coord, Point). Second parameter is not a point`
    );
  } else if (typeof a2 === `object`) {
    throw new TypeError(
      `First param is an object, but not a Coord: ${JSON.stringify(a2)}`
    );
  } else {
    if (typeof a2 === `number` && typeof b2 === `number`) {
      if (c4 === void 0) c4 = Empty;
      if (!isPoint(c4)) {
        throw new Error(
          `Expecting (number, number, Point). Point param wrong type`
        );
      }
      return polarToCartesian(a2, b2, c4);
    } else {
      throw new TypeError(
        `Expecting parameters of (number, number). Got: (${typeof a2}, ${typeof b2}, ${typeof c4}). a: ${JSON.stringify(
          a2
        )}`
      );
    }
  }
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
var polarToCartesian = (distance4, angleRadians, origin = Empty) => {
  guard(origin);
  return Object.freeze({
    x: origin.x + distance4 * Math.cos(angleRadians),
    y: origin.y + distance4 * Math.sin(angleRadians)
  });
};
var toString = (p2, digits) => {
  if (p2 === void 0) return `(undefined)`;
  if (p2 === null) return `(null)`;
  const angleDeg = radianToDegree(p2.angleRadian);
  const d2 = digits ? p2.distance.toFixed(digits) : p2.distance;
  const a2 = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d2},${a2})`;
};
var toPoint = (v, origin = Empty) => {
  guard6(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};

// src/geometry/polar/Math.ts
var normalise2 = (c4) => {
  if (c4.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c4,
    distance: 1
  });
};
var clampMagnitude2 = (v, max6 = 1, min6 = 0) => {
  let mag = v.distance;
  if (mag > max6) mag = max6;
  if (mag < min6) mag = min6;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var dotProduct3 = (a2, b2) => {
  guard6(a2, `a`);
  guard6(b2, `b`);
  return a2.distance * b2.distance * Math.cos(b2.angleRadian - a2.angleRadian);
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

// src/geometry/polar/Ray.ts
var Ray_exports = {};
__export(Ray_exports, {
  fromLine: () => fromLine,
  toCartesian: () => toCartesian2,
  toString: () => toString2
});
var toCartesian2 = (ray, origin) => {
  const o = getOrigin(ray, origin);
  const a2 = toCartesian(ray.offset, ray.angleRadian, o);
  const b2 = toCartesian(ray.offset + ray.length, ray.angleRadian, o);
  return { a: a2, b: b2 };
};
var getOrigin = (ray, origin) => {
  if (origin !== void 0) return origin;
  if (ray.origin !== void 0) return ray.origin;
  return { x: 0, y: 0 };
};
var toString2 = (ray) => {
  return `PolarRay(angle: ${ray.angleRadian} offset: ${ray.offset} len: ${ray.length})`;
};
var fromLine = (line2, origin) => {
  const o = origin ?? line2.a;
  return {
    angleRadian: angleRadian(line2.b, o),
    offset: distance(line2.a, o),
    length: distance(line2.b, line2.a),
    origin: o
  };
};

// src/geometry/polar/Spiral.ts
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a2 = smoothness * step++;
    yield {
      distance: zoom * a2,
      angleRadian: a2,
      step
    };
  }
}
var spiralRaw = (step, smoothness, zoom) => {
  const a2 = smoothness * step;
  return Object.freeze({
    distance: zoom * a2,
    angleRadian: a2
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
  for (const [index, p2] of ptAr.entries()) guard(p2, `pt[${index}]`);
  const asPolar = ptAr.map((p2) => fromCartesian(p2, origin));
  const rotated = asPolar.map((p2) => rotate(p2, amountRadian));
  const asCartesisan = rotated.map((p2) => toCartesian(p2, origin));
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
function toString3(p2, digits) {
  if (p2 === void 0) return `(undefined)`;
  if (p2 === null) return `(null)`;
  guard(p2, `pt`);
  const x = digits ? p2.x.toFixed(digits) : p2.x;
  const y = digits ? p2.y.toFixed(digits) : p2.y;
  if (p2.z === void 0) {
    return `(${x},${y})`;
  } else {
    const z = digits ? p2.z.toFixed(digits) : p2.z;
    return `(${x},${y},${z})`;
  }
}

// src/geometry/point/WithinRange.ts
var withinRange = (a2, b2, maxRange) => {
  guard(a2, `a`);
  guard(b2, `b`);
  if (typeof maxRange === `number`) {
    throwNumberTest(maxRange, `positive`, `maxRange`);
    maxRange = { x: maxRange, y: maxRange };
  } else {
    guard(maxRange, `maxRange`);
  }
  const x = Math.abs(b2.x - a2.x);
  const y = Math.abs(b2.y - a2.y);
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
    const d2 = derivativeFn(t2);
    let l = d2.x * d2.x + d2.y * d2.y;
    if (typeof d2.z !== "undefined") {
      l += d2.z * d2.z;
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
    let p2 = points;
    if (order === 0) {
      points[0].t = t2;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p2[0].x + t2 * p2[1].x,
        y: mt * p2[0].y + t2 * p2[1].y,
        t: t2
      };
      if (_3d) {
        ret.z = mt * p2[0].z + t2 * p2[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t2 * t2, a2, b2, c4, d2 = 0;
      if (order === 2) {
        p2 = [p2[0], p2[1], p2[2], ZERO];
        a2 = mt2;
        b2 = mt * t2 * 2;
        c4 = t22;
      } else if (order === 3) {
        a2 = mt2 * mt;
        b2 = mt2 * t2 * 3;
        c4 = mt * t22 * 3;
        d2 = t2 * t22;
      }
      const ret = {
        x: a2 * p2[0].x + b2 * p2[1].x + c4 * p2[2].x + d2 * p2[3].x,
        y: a2 * p2[0].y + b2 * p2[1].y + c4 * p2[2].y + d2 * p2[3].y,
        t: t2
      };
      if (_3d) {
        ret.z = a2 * p2[0].z + b2 * p2[1].z + c4 * p2[2].z + d2 * p2[3].z;
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
    const mt = 1 - t2, r = ratios, p2 = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d2;
    f1 *= mt;
    f2 *= t2;
    if (p2.length === 2) {
      d2 = f1 + f2;
      return {
        x: (f1 * p2[0].x + f2 * p2[1].x) / d2,
        y: (f1 * p2[0].y + f2 * p2[1].y) / d2,
        z: !_3d ? false : (f1 * p2[0].z + f2 * p2[1].z) / d2,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t2 * t2;
    if (p2.length === 3) {
      d2 = f1 + f2 + f3;
      return {
        x: (f1 * p2[0].x + f2 * p2[1].x + f3 * p2[2].x) / d2,
        y: (f1 * p2[0].y + f2 * p2[1].y + f3 * p2[2].y) / d2,
        z: !_3d ? false : (f1 * p2[0].z + f2 * p2[1].z + f3 * p2[2].z) / d2,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t2 * t2 * t2;
    if (p2.length === 4) {
      d2 = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p2[0].x + f2 * p2[1].x + f3 * p2[2].x + f4 * p2[3].x) / d2,
        y: (f1 * p2[0].y + f2 * p2[1].y + f3 * p2[2].y + f4 * p2[3].y) / d2,
        z: !_3d ? false : (f1 * p2[0].z + f2 * p2[1].z + f3 * p2[2].z + f4 * p2[3].z) / d2,
        t: t2
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p2 = points, d2 = p2.length, c4 = d2 - 1; d2 > 1; d2--, c4--) {
      const list = [];
      for (let j = 0, dpt; j < c4; j++) {
        dpt = {
          x: c4 * (p2[j + 1].x - p2[j].x),
          y: c4 * (p2[j + 1].y - p2[j].y)
        };
        if (_3d) {
          dpt.z = c4 * (p2[j + 1].z - p2[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p2 = list;
    }
    return dpoints;
  },
  between: function(v, m3, M) {
    return m3 <= v && v <= M || utils.approximately(v, m3) || utils.approximately(v, M);
  },
  approximately: function(a2, b2, precision) {
    return abs2(a2 - b2) <= (precision || epsilon);
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
  pointToString: function(p2) {
    let s = p2.x + "/" + p2.y;
    if (typeof p2.z !== "undefined") {
      s += "/" + p2.z;
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
  round: function(v, d2) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d2));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt2(dx * dx + dy * dy);
  },
  closest: function(LUT, point) {
    let mdist = pow3(2, 63), mpos, d2;
    LUT.forEach(function(p2, idx) {
      d2 = utils.dist(point, p2);
      if (d2 < mdist) {
        mdist = d2;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t2, n2) {
    if (n2 !== 2 && n2 !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const bottom = pow3(t2, n2) + pow3(1 - t2, n2), top = bottom - 1;
    return abs2(top / bottom);
  },
  projectionratio: function(t2, n2) {
    if (n2 !== 2 && n2 !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const top = pow3(1 - t2, n2), bottom = pow3(t2, n2) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d2 = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d2 == 0) {
      return false;
    }
    return { x: nx / d2, y: ny / d2 };
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
  getminmax: function(curve, d2, list) {
    if (!list) return { min: 0, max: 0 };
    let min6 = nMax, max6 = nMin, t2, c4;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t2 = list[i];
      c4 = curve.get(t2);
      if (c4[d2] < min6) {
        min6 = c4[d2];
      }
      if (c4[d2] > max6) {
        max6 = c4[d2];
      }
    }
    return { min: min6, mid: (min6 + max6) / 2, max: max6, size: max6 - min6 };
  },
  align: function(points, line2) {
    const tx = line2.p1.x, ty = line2.p1.y, a2 = -atan2(line2.p2.y - ty, line2.p2.x - tx), d2 = function(v) {
      return {
        x: (v.x - tx) * cos2(a2) - (v.y - ty) * sin2(a2),
        y: (v.x - tx) * sin2(a2) + (v.y - ty) * cos2(a2)
      };
    };
    return points.map(d2);
  },
  roots: function(points, line2) {
    line2 = line2 || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points.length - 1;
    const aligned = utils.align(points, line2);
    const reduce3 = function(t2) {
      return 0 <= t2 && t2 <= 1;
    };
    if (order === 2) {
      const a3 = aligned[0].y, b3 = aligned[1].y, c5 = aligned[2].y, d3 = a3 - 2 * b3 + c5;
      if (d3 !== 0) {
        const m12 = -sqrt2(b3 * b3 - a3 * c5), m22 = -a3 + b3, v12 = -(m12 + m22) / d3, v2 = -(-m12 + m22) / d3;
        return [v12, v2].filter(reduce3);
      } else if (b3 !== c5 && d3 === 0) {
        return [(2 * b3 - c5) / (2 * b3 - 2 * c5)].filter(reduce3);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d2 = -pa + 3 * pb - 3 * pc + pd, a2 = 3 * pa - 6 * pb + 3 * pc, b2 = -3 * pa + 3 * pb, c4 = pa;
    if (utils.approximately(d2, 0)) {
      if (utils.approximately(a2, 0)) {
        if (utils.approximately(b2, 0)) {
          return [];
        }
        return [-c4 / b2].filter(reduce3);
      }
      const q3 = sqrt2(b2 * b2 - 4 * a2 * c4), a22 = 2 * a2;
      return [(q3 - b2) / a22, (-b2 - q3) / a22].filter(reduce3);
    }
    a2 /= d2;
    b2 /= d2;
    c4 /= d2;
    const p2 = (3 * b2 - a2 * a2) / 3, p3 = p2 / 3, q = (2 * a2 * a2 * a2 - 9 * a2 * b2 + 27 * c4) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p2 / 3, mp33 = mp3 * mp3 * mp3, r = sqrt2(mp33), t2 = -q / (2 * r), cosphi = t2 < -1 ? -1 : t2 > 1 ? 1 : t2, phi2 = acos(cosphi), crtr = crt(r), t1 = 2 * crtr;
      x1 = t1 * cos2(phi2 / 3) - a2 / 3;
      x2 = t1 * cos2((phi2 + tau) / 3) - a2 / 3;
      x3 = t1 * cos2((phi2 + 2 * tau) / 3) - a2 / 3;
      return [x1, x2, x3].filter(reduce3);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a2 / 3;
      x2 = -u1 - a2 / 3;
      return [x1, x2].filter(reduce3);
    } else {
      const sd = sqrt2(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a2 / 3].filter(reduce3);
    }
  },
  droots: function(p2) {
    if (p2.length === 3) {
      const a2 = p2[0], b2 = p2[1], c4 = p2[2], d2 = a2 - 2 * b2 + c4;
      if (d2 !== 0) {
        const m12 = -sqrt2(b2 * b2 - a2 * c4), m22 = -a2 + b2, v1 = -(m12 + m22) / d2, v2 = -(-m12 + m22) / d2;
        return [v1, v2];
      } else if (b2 !== c4 && d2 === 0) {
        return [(2 * b2 - c4) / (2 * (b2 - c4))];
      }
      return [];
    }
    if (p2.length === 2) {
      const a2 = p2[0], b2 = p2[1];
      if (a2 !== b2) {
        return [a2 / (a2 - b2)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t2, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d3 = utils.compute(t2, d1);
    const dd = utils.compute(t2, d2);
    const qdsum = d3.x * d3.x + d3.y * d3.y;
    if (_3d) {
      num = sqrt2(
        pow3(d3.y * dd.z - dd.y * d3.z, 2) + pow3(d3.z * dd.x - dd.z * d3.x, 2) + pow3(d3.x * dd.y - dd.x * d3.y, 2)
      );
      dnm = pow3(qdsum + d3.z * d3.z, 3 / 2);
    } else {
      num = d3.x * dd.y - d3.y * dd.x;
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
    const p2 = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a2 = p2[2].x * p2[1].y, b2 = p2[3].x * p2[1].y, c4 = p2[1].x * p2[2].y, d2 = p2[3].x * p2[2].y, v1 = 18 * (-3 * a2 + 2 * b2 + 3 * c4 - d2), v2 = 18 * (3 * a2 - b2 - 3 * c4), v3 = 18 * (c4 - a2);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t2 = -v3 / v2;
        if (0 <= t2 && t2 <= 1) return [t2];
      }
      return [];
    }
    const d22 = 2 * v1;
    if (utils.approximately(d22, 0)) return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0) return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d22, -(v2 + sq) / d22].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t2, d2; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t2 = b2[dim].mid;
      d2 = (b1[dim].size + b2[dim].size) / 2;
      if (abs2(l - t2) >= d2) return false;
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
  pairiteration: function(c12, c22, curveIntersectionThreshold) {
    const c1b = c12.bbox(), c2b = c22.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c12._t1 + c12._t2) / 2 | 0) / r + "/" + (r * (c22._t1 + c22._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c12.split(0.5), cc2 = c22.split(0.5), pairs = [
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
    let s = atan2(p1.y - arc.y, p1.x - arc.x), m3 = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
    if (s < e) {
      if (s > m3 || m3 > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m3 && m3 < s) {
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
  numberSort: function(a2, b2) {
    return a2 - b2;
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
    }).reduce(function(a2, b2) {
      return a2 + b2;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c4 = this.curves;
    var bbox2 = c4[0].bbox();
    for (var i = 1; i < c4.length; i++) {
      utils.expandbox(bbox2, c4[i].bbox());
    }
    return bbox2;
  }
  offset(d2) {
    const offset = [];
    this.curves.forEach(function(v) {
      offset.push(...v.offset(d2));
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
        ["x", "y", "z"].forEach(function(d2) {
          if (typeof point2[d2] !== "undefined") {
            newargs.push(point2[d2]);
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
    this._linear = aligned.reduce((t2, p2) => t2 + abs3(p2.y), 0) < baselength / 50;
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
    const p2 = this.points, x = p2[0].x, y = p2[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last2 = p2.length; i < last2; i++) {
      s.push(p2[i].x);
      s.push(p2[i].y);
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
    return this.points.map(function(c4, pos) {
      return "" + pos + c4.x + c4.y + (c4.z ? c4.z : 0);
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
  getLUT(steps2) {
    this.verify();
    steps2 = steps2 || 100;
    if (this._lut.length === steps2 + 1) {
      return this._lut;
    }
    this._lut = [];
    steps2++;
    this._lut = [];
    for (let i = 0, p2, t2; i < steps2; i++) {
      t2 = i / (steps2 - 1);
      p2 = this.compute(t2);
      p2.t = t2;
      this._lut.push(p2);
    }
    return this._lut;
  }
  on(point, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c4, t2 = 0; i < lut.length; i++) {
      c4 = lut[i];
      if (utils.dist(c4, point) < error) {
        hits.push(c4);
        t2 += i / lut.length;
      }
    }
    if (!hits.length) return false;
    return t /= hits.length;
  }
  project(point) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t3 = t1, ft = t3, p2;
    mdist += 1;
    for (let d2; t3 < t2 + step; t3 += step) {
      p2 = this.compute(t3);
      d2 = utils.dist(point, p2);
      if (d2 < mdist) {
        mdist = d2;
        ft = t3;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p2 = this.compute(ft);
    p2.t = ft;
    p2.d = mdist;
    return p2;
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
    const p2 = this.points, np = [p2[0]], k = p2.length;
    for (let i = 1, pi4, pim; i < k; i++) {
      pi4 = p2[i];
      pim = p2[i - 1];
      np[i] = {
        x: (k - i) / k * pi4.x + i / k * pim.x,
        y: (k - i) / k * pi4.y + i / k * pim.y
      };
    }
    np[k] = p2[k - 1];
    return new _Bezier(np);
  }
  derivative(t2) {
    return utils.compute(t2, this.dpoints[0], this._3d);
  }
  dderivative(t2) {
    return utils.compute(t2, this.dpoints[1], this._3d);
  }
  align() {
    let p2 = this.points;
    return new _Bezier(utils.align(p2, { p1: p2[0], p2: p2[p2.length - 1] }));
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
    const d2 = this.derivative(t2);
    const q = sqrt3(d2.x * d2.x + d2.y * d2.y);
    return { t: t2, x: -d2.y / q, y: d2.x / q };
  }
  __normal3(t2) {
    const r1 = this.derivative(t2), r2 = this.derivative(t2 + 0.01), q1 = sqrt3(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt3(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c4 = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m3 = sqrt3(c4.x * c4.x + c4.y * c4.y + c4.z * c4.z);
    c4.x /= m3;
    c4.y /= m3;
    c4.z /= m3;
    const R = [
      c4.x * c4.x,
      c4.x * c4.y - c4.z,
      c4.x * c4.z + c4.y,
      c4.x * c4.y + c4.z,
      c4.y * c4.y,
      c4.y * c4.z - c4.x,
      c4.x * c4.z - c4.y,
      c4.y * c4.z + c4.x,
      c4.z * c4.z
    ];
    const n2 = {
      t: t2,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n2;
  }
  hull(t2) {
    let p2 = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p2[0];
    q[idx++] = p2[1];
    q[idx++] = p2[2];
    if (this.order === 3) {
      q[idx++] = p2[3];
    }
    while (p2.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p2.length - 1; i < l; i++) {
        pt = utils.lerp(t2, p2[i], p2[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p2 = _p;
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
        let p2 = this.dpoints[0].map(mfn);
        result[dim] = utils.droots(p2);
        if (this.order === 3) {
          p2 = this.dpoints[1].map(mfn);
          result[dim] = result[dim].concat(utils.droots(p2));
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
      function(d2) {
        result[d2] = utils.getminmax(this, d2, extrema[d2]);
      }.bind(this)
    );
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t2, d2) {
    if (typeof d2 !== "undefined") {
      const c4 = this.get(t2), n2 = this.normal(t2);
      const ret = {
        c: c4,
        n: n2,
        x: c4.x + n2.x * d2,
        y: c4.y + n2.y * d2
      };
      if (this._3d) {
        ret.z = c4.z + n2.z * d2;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p2) {
        const ret = {
          x: p2.x + t2 * nv.x,
          y: p2.y + t2 * nv.y
        };
        if (p2.z && nv.z) {
          ret.z = p2.z + t2 * nv.z;
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
    let d3 = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new _Bezier(
      this.points.map((p2, i) => ({
        x: p2.x + v.x * d3[i],
        y: p2.y + v.y * d3[i]
      }))
    );
  }
  scale(d2) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d2 === "function") {
      distanceFn = d2;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) {
      return this.translate(
        this.normal(0),
        distanceFn ? distanceFn(0) : d2,
        distanceFn ? distanceFn(1) : d2
      );
    }
    const r1 = distanceFn ? distanceFn(0) : d2;
    const r2 = distanceFn ? distanceFn(1) : d2;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t2) {
      const p2 = np[t2 * order] = utils.copy(points[t2 * order]);
      p2.x += (t2 ? r2 : r1) * v[t2].n.x;
      p2.y += (t2 ? r2 : r1) * v[t2].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t2) => {
        if (order === 2 && !!t2) return;
        const p2 = np[t2 * order];
        const d3 = this.derivative(t2);
        const p22 = { x: p2.x + d3.x, y: p2.y + d3.y };
        np[t2 + 1] = utils.lli4(p2, p22, o, points[t2 + 1]);
      });
      return new _Bezier(np);
    }
    [0, 1].forEach(function(t2) {
      if (order === 2 && !!t2) return;
      var p2 = points[t2 + 1];
      var ov = {
        x: p2.x - o.x,
        y: p2.y - o.y
      };
      var rc = distanceFn ? distanceFn((t2 + 1) / order) : d2;
      if (distanceFn && !clockwise) rc = -rc;
      var m3 = sqrt3(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m3;
      ov.y /= m3;
      np[t2 + 1] = {
        x: p2.x + rc * ov.x,
        y: p2.y + rc * ov.y
      };
    });
    return new _Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n2 = this.normal(0);
      const start = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start.x + n2.x * d1, y: start.y + n2.y * d1 };
      e = { x: end.x + n2.x * d3, y: end.y + n2.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start.x - n2.x * d2, y: start.y - n2.y * d2 };
      e = { x: end.x - n2.x * d4, y: end.y - n2.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new _Bezier(fline), le2, new _Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p2, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d5 = e - s;
        return utils.map(v, 0, 1, s + f1 * d5, s + f2 * d5);
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
      p2 = s.points;
      if (p2[3]) {
        s.points = [p2[3], p2[2], p2[1], p2[0]];
      } else {
        s.points = [p2[2], p2[1], p2[0]];
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
      var p2 = this.get(t2);
      return utils.between(p2.x, mx, MX) && utils.between(p2.y, my, MY);
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
  curveintersects(c12, c22, curveIntersectionThreshold) {
    const pairs = [];
    c12.forEach(function(l) {
      c22.forEach(function(r) {
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
    const q = (e - s) / 4, c12 = this.get(s + q), c22 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c12), d2 = utils.dist(pc, c22);
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
              let d2 = {
                x: arc.x + arc.r * cos3(arc.e),
                y: arc.y + arc.r * sin3(arc.e)
              };
              arc.e += utils.angle({ x: arc.x, y: arc.y }, d2, this.get(1));
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
  const { a: a2, cubic1, cubic2: cubic22, b: b2 } = cubic2;
  const bzr = new Bezier(a2, cubic1, cubic22, b2);
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
  const { a: a2, b: b2, quadratic: quadratic2 } = quadraticBezier;
  const bzr = new Bezier(a2, quadratic2, b2);
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
    toSvgString: () => quadraticToSvgString(a2, b2, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/numbers/Scale.ts
var scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
var scaler = (inMin, inMax, outMin, outMax, easing, clamped) => {
  throwNumberTest(inMin, `finite`, `inMin`);
  throwNumberTest(inMax, `finite`, `inMax`);
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  const clampFunction = clamped ? clamper(outMin, outMax) : void 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a2 = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a2 = easing(a2);
    const x = a2 * (oMax - oMin) + oMin;
    if (clampFunction) return clampFunction(x);
    return x;
  };
};
var scalerNull = () => (v) => v;
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
var scalerTwoWay = (inMin, inMax, outMin = 0, outMax = 1, clamped = false, easing) => {
  const toOut = scaler(inMin, inMax, outMin, outMax, easing, clamped);
  const toIn = scaler(outMin, outMax, inMin, inMax, easing, clamped);
  return { out: toOut, in: toIn };
};

// src/modulation/easing/Line.ts
var line = (bend = 0, warp = 0) => {
  const max6 = 1;
  const cubicB = {
    x: scale(bend, -1, 1, 0, max6),
    y: scale(bend, -1, 1, max6, 0)
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
      const easer = get(o.easing);
      if (!easer) throw new Error(`Easing function '${o.easing}' not found`);
      amountProcess = easer;
    } else if (o.transform) {
      if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
      amountProcess = o.transform;
    }
    limits = o.limits ?? `clamp`;
  };
  const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
  if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
  if (typeof pos2 === `number`) {
    let a2;
    let b2;
    if (pos3 === void 0 || typeof pos3 === `object`) {
      a2 = pos1;
      b2 = pos2;
      readOpts(pos3);
      return (amount) => doTheEase(amount, a2, b2);
    } else if (typeof pos3 === `number`) {
      a2 = pos2;
      b2 = pos3;
      readOpts(pos4);
      return doTheEase(pos1, a2, b2);
    } else {
      throw new Error(`Values for 'a' and 'b' not defined`);
    }
  } else if (pos2 === void 0 || typeof pos2 === `object`) {
    const amount = handleAmount(pos1);
    readOpts(pos2);
    throwNumberTest(amount, ``, `amount`);
    return (aValue, bValue) => rawEase(amount, aValue, bValue);
  }
}
var interpolatorStepped = (incrementAmount, a2 = 0, b2 = 1, startInterpolationAt = 0, options) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b2 = retargetB;
    if (retargetA !== void 0) a2 = retargetA;
    if (amount >= 1) return b2;
    const value = interpolate3(amount, a2, b2, options);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a2 = 0, b2 = 1, options) => {
  const durationProgression = ofTotal(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0) b2 = retargetB;
    if (retargetA !== void 0) a2 = retargetA;
    if (amount >= 1) return b2;
    const value = interpolate3(amount, a2, b2, options);
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
  const p2 = max2();
  return process(p2, `max`, input, options);
}
function min5(input, options) {
  const p2 = min3();
  return process(p2, `min`, input, options);
}
function average3(input, options) {
  const p2 = average2();
  return process(p2, `average`, input, options);
}
function sum3(input, options) {
  const p2 = sum2();
  return process(p2, `sum`, input, options);
}
function tally2(input, options = {}) {
  const countArrayItems = options.countArrayItems ?? true;
  const p2 = tally(countArrayItems);
  return process(p2, `tally`, input, options);
}
function rank2(input, rank3, options) {
  const p2 = rank(rank3, options);
  return process(p2, `rank`, input, options);
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
        eq: (a2, b2) => {
          return isEqualDefault(a2.item, b2.item);
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
    for (const d2 of this.data) {
      if (eq) {
        if (eq(d2.item, item)) {
          toDelete = d2;
          break;
        }
      } else {
        if (this.eq(d2, { item, priority: 0 })) {
          toDelete = d2;
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
    const m3 = maxScore(this.data, (v) => v.priority);
    if (m3 === void 0) return;
    this.removeWhere((item) => item === m3);
    return m3.item;
  }
  dequeueMin() {
    const m3 = min(this.data, (v) => v.priority);
    if (m3 === void 0) return;
    this.removeWhere((item) => item === m3);
    return m3.item;
  }
  peekMax() {
    const m3 = maxScore(this.data, (v) => v.priority);
    if (m3 === void 0) return;
    return m3.item;
  }
  peekMin() {
    const m3 = min(this.data, (v) => v.priority);
    if (m3 === void 0) return;
    return m3.item;
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
function testGraph(g2, paramName = `graph`) {
  if (g2 === void 0) return [false, `Param '${paramName}' is undefined. Expected Graph`];
  if (g2 === null) return [false, `Param '${paramName}' is null. Expected Graph`];
  if (typeof g2 === `object`) {
    if (!(`vertices` in g2)) return [false, `Param '${paramName}.vertices' does not exist. Is it a Graph type?`];
  } else {
    return [false, `Param '${paramName} is type '${typeof g2}'. Expected an object Graph`];
  }
  return [true];
}
function throwGraphTest(g2, paramName = `graph`) {
  const r = testGraph(g2, paramName);
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
function disconnect(graph2, from2, to3) {
  throwGraphTest(graph2);
  const fromV = resolveVertex(graph2, from2);
  const toV = resolveVertex(graph2, to3);
  return hasOut(graph2, fromV, toV) ? updateGraphVertex(graph2, {
    ...fromV,
    out: fromV.out.filter((t2) => t2.id !== toV.id)
  }) : graph2;
}
function connectTo(graph2, from2, to3, weight2) {
  throwGraphTest(graph2);
  const fromResult = getOrCreate(graph2, from2);
  graph2 = fromResult.graph;
  const toResult = getOrCreate(graph2, to3);
  graph2 = toResult.graph;
  const edge = {
    id: to3,
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
  const { to: to3, weight: weight2, from: from2 } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to3) ? to3 : [to3];
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
function areAdjacent(graph2, a2, b2) {
  throwGraphTest(graph2);
  if (hasOut(graph2, a2, b2.id)) return true;
  if (hasOut(graph2, b2, a2.id)) return true;
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
  const g2 = {
    vertices: immutable([...graph2.vertices.entries()])
  };
  return g2;
};
var graph = (...initialConnections) => {
  let g2 = {
    vertices: immutable()
  };
  for (const ic of initialConnections) {
    g2 = connect(g2, ic);
  }
  return g2;
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
  const m3 = immutable([...keyValues]);
  return {
    vertices: m3
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
          const g2 = disconnect(graph2, u, v1);
          return transitiveReduction(g2);
        }
      }
    }
  }
  return graph2;
}

// src/rx/Graph.ts
function prepare(_rx) {
  let g2 = graph();
  const nodes = /* @__PURE__ */ new Map();
  const events = initStream();
  const process2 = (o, path) => {
    for (const [key, value] of Object.entries(o)) {
      const subPath = path + `.` + key;
      g2 = connect(g2, {
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
    graph: g2,
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
  const promise = new Promise((resolve2, reject) => {
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
      resolve2(read);
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
  const promiseInit = () => new Promise((resolve2, reject) => {
    promiseResolve = resolve2;
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
      const a2 = annotate(source, transformer);
      return wrap3(a2);
    },
    annotateWithOp: (op) => {
      const a2 = annotateWithOp(source, op);
      return wrap3(a2);
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
      const m3 = mapObjectShallow(l, (args) => wrap3(args.value));
      return m3;
    },
    switcher: (cases, options = {}) => {
      const s = switcher(source, cases, options);
      const m3 = mapObjectShallow(s, (args) => wrap3(args.value));
      return m3;
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
  let b2 = [];
  if (binds.length === 0) {
    b2.push({ elField: `textContent` });
  } else {
    b2 = [...binds];
  }
  const bb = b2.map((bind2) => {
    if (`element` in bind2) return bind2;
    return { ...bind2, element: el };
  });
  return bind(source, ...bb);
};
var resolveBindUpdater = (bind2, element) => {
  const b2 = resolveBindUpdaterBase(bind2);
  return (value) => {
    b2(value, element);
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
    for (const p2 of stringSegmentsWholeToFirst(path)) {
      if (binds.has(p2)) {
        yield binds.get(p2);
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
    for (const b2 of ancestorBinds(rootedPath)) {
      if (b2?.nestChildren) {
        const absoluteRoot = beforeMatch(path, `.`);
        const findBy = b2.path.replace(`_root`, absoluteRoot);
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
    let d2 = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d2 !== void 0) {
      const path = d2.path;
      if (!(`previous` in d2) || d2.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create3(path, d2.value);
        const subdata = [...getPathsAndData(d2.value, false, Number.MAX_SAFE_INTEGER, path)];
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d2.value === void 0) {
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
          create3(path, d2.value);
        } else {
          update(path, el, d2.value);
        }
      }
      d2 = queue.dequeue();
    }
  };
  source.onDiff((value) => {
    changes(value);
  });
  if (hasLast(source)) {
    const last2 = source.last();
    changes([...getPathsAndData(last2, false, 1)]);
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
  count: () => count,
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
      c4.start();
    },
    onStop() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStop. whenStopped: ${whenStopped} index: ${index}`);
      c4.cancel();
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
  const c4 = continuously(() => {
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
  if (!lazy) c4.start();
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
  const set2 = (replacement) => {
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
    set: set2
  };
  return r;
}

// src/rx/sources/Boolean.ts
function boolean(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set2 = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set: set2
  };
}

// src/visual/colour/index.ts
var colour_exports = {};
__export(colour_exports, {
  cssLinearGradient: () => cssLinearGradient,
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  hslFromAbsoluteValues: () => hslFromAbsoluteValues,
  hslFromRelativeValues: () => hslFromRelativeValues,
  hslToAbsolute: () => hslToAbsolute,
  hslToColorJs: () => hslToColorJs,
  hslToRelative: () => hslToRelative,
  hslToString: () => hslToString,
  interpolator: () => interpolator2,
  isHsl: () => isHsl,
  isOklch: () => isOklch,
  isRgb: () => isRgb,
  multiplyOpacity: () => multiplyOpacity,
  multiplySaturation: () => multiplySaturation,
  oklchToColorJs: () => oklchToColorJs,
  parseRgbObject: () => parseRgbObject,
  randomHue: () => randomHue,
  resolveCss: () => resolveCss,
  rgbToColorJs: () => rgbToColorJs,
  scale: () => scale3,
  structuredToColorJs: () => structuredToColorJs,
  structuredToColorJsConstructor: () => structuredToColorJsConstructor,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toRgb: () => toRgb,
  toRgb8bit: () => toRgb8bit,
  toRgbRelative: () => toRgbRelative,
  toString: () => toString4,
  toStringFirst: () => toStringFirst
});

// src/visual/colour/Generate.ts
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75, alpha = 1) => {
  throwNumberTest(index, `positive`, `index`);
  throwNumberTest(saturation, `percentage`, `saturation`);
  throwNumberTest(lightness, `percentage`, `lightness`);
  throwNumberTest(alpha, `percentage`, `alpha`);
  const hue = index * 137.508;
  return alpha === 1 ? `hsl(${hue},${saturation * 100}%,${lightness * 100}%)` : `hsl(${hue},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};

// node_modules/colorjs.io/dist/color.js
function multiplyMatrices(A, B) {
  let m3 = A.length;
  if (!Array.isArray(A[0])) {
    A = [A];
  }
  if (!Array.isArray(B[0])) {
    B = B.map((x) => [x]);
  }
  let p2 = B[0].length;
  let B_cols = B[0].map((_, i) => B.map((x) => x[i]));
  let product = A.map((row) => B_cols.map((col) => {
    let ret = 0;
    if (!Array.isArray(row)) {
      for (let c4 of col) {
        ret += row * c4;
      }
      return ret;
    }
    for (let i = 0; i < row.length; i++) {
      ret += row[i] * (col[i] || 0);
    }
    return ret;
  }));
  if (m3 === 1) {
    product = product[0];
  }
  if (p2 === 1) {
    return product.map((x) => x[0]);
  }
  return product;
}
function isString(str) {
  return type(str) === "string";
}
function type(o) {
  let str = Object.prototype.toString.call(o);
  return (str.match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
}
function serializeNumber(n2, { precision, unit }) {
  if (isNone(n2)) {
    return "none";
  }
  return toPrecision(n2, precision) + (unit ?? "");
}
function isNone(n2) {
  return Number.isNaN(n2) || n2 instanceof Number && n2?.none;
}
function skipNone(n2) {
  return isNone(n2) ? 0 : n2;
}
function toPrecision(n2, precision) {
  if (n2 === 0) {
    return 0;
  }
  let integer = ~~n2;
  let digits = 0;
  if (integer && precision) {
    digits = ~~Math.log10(Math.abs(integer)) + 1;
  }
  const multiplier = 10 ** (precision - digits);
  return Math.floor(n2 * multiplier + 0.5) / multiplier;
}
var angleFactor = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
};
function parseFunction(str) {
  if (!str) {
    return;
  }
  str = str.trim();
  const isFunctionRegex = /^([a-z]+)\((.+?)\)$/i;
  const isNumberRegex = /^-?[\d.]+$/;
  const unitValueRegex = /%|deg|g?rad|turn$/;
  const singleArgument = /\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;
  let parts = str.match(isFunctionRegex);
  if (parts) {
    let args = [];
    parts[2].replace(singleArgument, ($0, rawArg) => {
      let match = rawArg.match(unitValueRegex);
      let arg = rawArg;
      if (match) {
        let unit = match[0];
        let unitlessArg = arg.slice(0, -unit.length);
        if (unit === "%") {
          arg = new Number(unitlessArg / 100);
          arg.type = "<percentage>";
        } else {
          arg = new Number(unitlessArg * angleFactor[unit]);
          arg.type = "<angle>";
          arg.unit = unit;
        }
      } else if (isNumberRegex.test(arg)) {
        arg = new Number(arg);
        arg.type = "<number>";
      } else if (arg === "none") {
        arg = new Number(NaN);
        arg.none = true;
      }
      if ($0.startsWith("/")) {
        arg = arg instanceof Number ? arg : new Number(arg);
        arg.alpha = true;
      }
      if (typeof arg === "object" && arg instanceof Number) {
        arg.raw = rawArg;
      }
      args.push(arg);
    });
    return {
      name: parts[1].toLowerCase(),
      rawName: parts[1],
      rawArgs: parts[2],
      // An argument could be (as of css-color-4):
      // a number, percentage, degrees (hue), ident (in color())
      args
    };
  }
}
function last(arr) {
  return arr[arr.length - 1];
}
function interpolate5(start, end, p2) {
  if (isNaN(start)) {
    return end;
  }
  if (isNaN(end)) {
    return start;
  }
  return start + (end - start) * p2;
}
function interpolateInv(start, end, value) {
  return (value - start) / (end - start);
}
function mapRange(from2, to3, value) {
  return interpolate5(to3[0], to3[1], interpolateInv(from2[0], from2[1], value));
}
function parseCoordGrammar(coordGrammars) {
  return coordGrammars.map((coordGrammar2) => {
    return coordGrammar2.split("|").map((type2) => {
      type2 = type2.trim();
      let range2 = type2.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
      if (range2) {
        let ret = new String(range2[1]);
        ret.range = [+range2[2], +range2[3]];
        return ret;
      }
      return type2;
    });
  });
}
function clamp3(min6, val, max6) {
  return Math.max(Math.min(max6, val), min6);
}
function copySign(to3, from2) {
  return Math.sign(to3) === Math.sign(from2) ? to3 : -to3;
}
function spow(base, exp) {
  return copySign(Math.abs(base) ** exp, base);
}
function zdiv(n2, d2) {
  return d2 === 0 ? 0 : n2 / d2;
}
function bisectLeft(arr, value, lo = 0, hi = arr.length) {
  while (lo < hi) {
    const mid = lo + hi >> 1;
    if (arr[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
var util = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  bisectLeft,
  clamp: clamp3,
  copySign,
  interpolate: interpolate5,
  interpolateInv,
  isNone,
  isString,
  last,
  mapRange,
  multiplyMatrices,
  parseCoordGrammar,
  parseFunction,
  serializeNumber,
  skipNone,
  spow,
  toPrecision,
  type,
  zdiv
});
var Hooks = class {
  add(name, callback, first) {
    if (typeof arguments[0] != "string") {
      for (var name in arguments[0]) {
        this.add(name, arguments[0][name], arguments[1]);
      }
      return;
    }
    (Array.isArray(name) ? name : [name]).forEach(function(name2) {
      this[name2] = this[name2] || [];
      if (callback) {
        this[name2][first ? "unshift" : "push"](callback);
      }
    }, this);
  }
  run(name, env) {
    this[name] = this[name] || [];
    this[name].forEach(function(callback) {
      callback.call(env && env.context ? env.context : env, env);
    });
  }
};
var hooks = new Hooks();
var defaults = {
  gamut_mapping: "css",
  precision: 5,
  deltaE: "76",
  // Default deltaE method
  verbose: globalThis?.process?.env?.NODE_ENV?.toLowerCase() !== "test",
  warn: function warn(msg) {
    if (this.verbose) {
      globalThis?.console?.warn?.(msg);
    }
  }
};
var WHITES = {
  // for compatibility, the four-digit chromaticity-derived ones everyone else uses
  D50: [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585],
  D65: [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329]
};
function getWhite(name) {
  if (Array.isArray(name)) {
    return name;
  }
  return WHITES[name];
}
function adapt$2(W1, W2, XYZ, options = {}) {
  W1 = getWhite(W1);
  W2 = getWhite(W2);
  if (!W1 || !W2) {
    throw new TypeError(`Missing white point to convert ${!W1 ? "from" : ""}${!W1 && !W2 ? "/" : ""}${!W2 ? "to" : ""}`);
  }
  if (W1 === W2) {
    return XYZ;
  }
  let env = { W1, W2, XYZ, options };
  hooks.run("chromatic-adaptation-start", env);
  if (!env.M) {
    if (env.W1 === WHITES.D65 && env.W2 === WHITES.D50) {
      env.M = [
        [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
        [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
        [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371]
      ];
    } else if (env.W1 === WHITES.D50 && env.W2 === WHITES.D65) {
      env.M = [
        [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
        [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
        [0.012314014864481998, -0.020507649298898964, 1.330365926242124]
      ];
    }
  }
  hooks.run("chromatic-adaptation-end", env);
  if (env.M) {
    return multiplyMatrices(env.M, env.XYZ);
  } else {
    throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
  }
}
var noneTypes = /* @__PURE__ */ new Set(["<number>", "<percentage>", "<angle>"]);
function coerceCoords(space, format, name, coords) {
  let types = Object.entries(space.coords).map(([id, coordMeta], i) => {
    let coordGrammar2 = format.coordGrammar[i];
    let arg = coords[i];
    let providedType = arg?.type;
    let type2;
    if (arg.none) {
      type2 = coordGrammar2.find((c4) => noneTypes.has(c4));
    } else {
      type2 = coordGrammar2.find((c4) => c4 == providedType);
    }
    if (!type2) {
      let coordName = coordMeta.name || id;
      throw new TypeError(`${providedType ?? arg.raw} not allowed for ${coordName} in ${name}()`);
    }
    let fromRange = type2.range;
    if (providedType === "<percentage>") {
      fromRange ||= [0, 1];
    }
    let toRange = coordMeta.range || coordMeta.refRange;
    if (fromRange && toRange) {
      coords[i] = mapRange(fromRange, toRange, coords[i]);
    }
    return type2;
  });
  return types;
}
function parse(str, { meta } = {}) {
  let env = { "str": String(str)?.trim() };
  hooks.run("parse-start", env);
  if (env.color) {
    return env.color;
  }
  env.parsed = parseFunction(env.str);
  if (env.parsed) {
    let name = env.parsed.name;
    if (name === "color") {
      let id = env.parsed.args.shift();
      let alternateId = id.startsWith("--") ? id.substring(2) : `--${id}`;
      let ids = [id, alternateId];
      let alpha = env.parsed.rawArgs.indexOf("/") > 0 ? env.parsed.args.pop() : 1;
      for (let space of ColorSpace.all) {
        let colorSpec = space.getFormat("color");
        if (colorSpec) {
          if (ids.includes(colorSpec.id) || colorSpec.ids?.filter((specId) => ids.includes(specId)).length) {
            const coords = Object.keys(space.coords).map((_, i) => env.parsed.args[i] || 0);
            let types;
            if (colorSpec.coordGrammar) {
              types = coerceCoords(space, colorSpec, "color", coords);
            }
            if (meta) {
              Object.assign(meta, { formatId: "color", types });
            }
            if (colorSpec.id.startsWith("--") && !id.startsWith("--")) {
              defaults.warn(`${space.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${colorSpec.id}) instead of color(${id}).`);
            }
            if (id.startsWith("--") && !colorSpec.id.startsWith("--")) {
              defaults.warn(`${space.name} is a standard space and supported in the CSS spec. Use color(${colorSpec.id}) instead of prefixed color(${id}).`);
            }
            return { spaceId: space.id, coords, alpha };
          }
        }
      }
      let didYouMean = "";
      let registryId = id in ColorSpace.registry ? id : alternateId;
      if (registryId in ColorSpace.registry) {
        let cssId = ColorSpace.registry[registryId].formats?.color?.id;
        if (cssId) {
          didYouMean = `Did you mean color(${cssId})?`;
        }
      }
      throw new TypeError(`Cannot parse color(${id}). ` + (didYouMean || "Missing a plugin?"));
    } else {
      for (let space of ColorSpace.all) {
        let format = space.getFormat(name);
        if (format && format.type === "function") {
          let alpha = 1;
          if (format.lastAlpha || last(env.parsed.args).alpha) {
            alpha = env.parsed.args.pop();
          }
          let coords = env.parsed.args;
          let types;
          if (format.coordGrammar) {
            types = coerceCoords(space, format, name, coords);
          }
          if (meta) {
            Object.assign(meta, { formatId: format.name, types });
          }
          return {
            spaceId: space.id,
            coords,
            alpha
          };
        }
      }
    }
  } else {
    for (let space of ColorSpace.all) {
      for (let formatId in space.formats) {
        let format = space.formats[formatId];
        if (format.type !== "custom") {
          continue;
        }
        if (format.test && !format.test(env.str)) {
          continue;
        }
        let color = format.parse(env.str);
        if (color) {
          color.alpha ??= 1;
          if (meta) {
            meta.formatId = formatId;
          }
          return color;
        }
      }
    }
  }
  throw new TypeError(`Could not parse ${str} as a color. Missing a plugin?`);
}
function getColor(color) {
  if (Array.isArray(color)) {
    return color.map(getColor);
  }
  if (!color) {
    throw new TypeError("Empty color reference");
  }
  if (isString(color)) {
    color = parse(color);
  }
  let space = color.space || color.spaceId;
  if (!(space instanceof ColorSpace)) {
    color.space = ColorSpace.get(space);
  }
  if (color.alpha === void 0) {
    color.alpha = 1;
  }
  return color;
}
var \u03B5$7 = 75e-6;
var ColorSpace = class _ColorSpace {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.base = options.base ? _ColorSpace.get(options.base) : null;
    this.aliases = options.aliases;
    if (this.base) {
      this.fromBase = options.fromBase;
      this.toBase = options.toBase;
    }
    let coords = options.coords ?? this.base.coords;
    for (let name in coords) {
      if (!("name" in coords[name])) {
        coords[name].name = name;
      }
    }
    this.coords = coords;
    let white2 = options.white ?? this.base.white ?? "D65";
    this.white = getWhite(white2);
    this.formats = options.formats ?? {};
    for (let name in this.formats) {
      let format = this.formats[name];
      format.type ||= "function";
      format.name ||= name;
    }
    if (!this.formats.color?.id) {
      this.formats.color = {
        ...this.formats.color ?? {},
        id: options.cssId || this.id
      };
    }
    if (options.gamutSpace) {
      this.gamutSpace = options.gamutSpace === "self" ? this : _ColorSpace.get(options.gamutSpace);
    } else {
      if (this.isPolar) {
        this.gamutSpace = this.base;
      } else {
        this.gamutSpace = this;
      }
    }
    if (this.gamutSpace.isUnbounded) {
      this.inGamut = (coords2, options2) => {
        return true;
      };
    }
    this.referred = options.referred;
    Object.defineProperty(this, "path", {
      value: getPath(this).reverse(),
      writable: false,
      enumerable: true,
      configurable: true
    });
    hooks.run("colorspace-init-end", this);
  }
  inGamut(coords, { epsilon: epsilon2 = \u03B5$7 } = {}) {
    if (!this.equals(this.gamutSpace)) {
      coords = this.to(this.gamutSpace, coords);
      return this.gamutSpace.inGamut(coords, { epsilon: epsilon2 });
    }
    let coordMeta = Object.values(this.coords);
    return coords.every((c4, i) => {
      let meta = coordMeta[i];
      if (meta.type !== "angle" && meta.range) {
        if (Number.isNaN(c4)) {
          return true;
        }
        let [min6, max6] = meta.range;
        return (min6 === void 0 || c4 >= min6 - epsilon2) && (max6 === void 0 || c4 <= max6 + epsilon2);
      }
      return true;
    });
  }
  get isUnbounded() {
    return Object.values(this.coords).every((coord) => !("range" in coord));
  }
  get cssId() {
    return this.formats?.color?.id || this.id;
  }
  get isPolar() {
    for (let id in this.coords) {
      if (this.coords[id].type === "angle") {
        return true;
      }
    }
    return false;
  }
  getFormat(format) {
    if (typeof format === "object") {
      format = processFormat(format, this);
      return format;
    }
    let ret;
    if (format === "default") {
      ret = Object.values(this.formats)[0];
    } else {
      ret = this.formats[format];
    }
    if (ret) {
      ret = processFormat(ret, this);
      return ret;
    }
    return null;
  }
  /**
   * Check if this color space is the same as another color space reference.
   * Allows proxying color space objects and comparing color spaces with ids.
   * @param {string | ColorSpace} space ColorSpace object or id to compare to
   * @returns {boolean}
   */
  equals(space) {
    if (!space) {
      return false;
    }
    return this === space || this.id === space || this.id === space.id;
  }
  to(space, coords) {
    if (arguments.length === 1) {
      const color = getColor(space);
      [space, coords] = [color.space, color.coords];
    }
    space = _ColorSpace.get(space);
    if (this.equals(space)) {
      return coords;
    }
    coords = coords.map((c4) => Number.isNaN(c4) ? 0 : c4);
    let myPath = this.path;
    let otherPath = space.path;
    let connectionSpace, connectionSpaceIndex;
    for (let i = 0; i < myPath.length; i++) {
      if (myPath[i].equals(otherPath[i])) {
        connectionSpace = myPath[i];
        connectionSpaceIndex = i;
      } else {
        break;
      }
    }
    if (!connectionSpace) {
      throw new Error(`Cannot convert between color spaces ${this} and ${space}: no connection space was found`);
    }
    for (let i = myPath.length - 1; i > connectionSpaceIndex; i--) {
      coords = myPath[i].toBase(coords);
    }
    for (let i = connectionSpaceIndex + 1; i < otherPath.length; i++) {
      coords = otherPath[i].fromBase(coords);
    }
    return coords;
  }
  from(space, coords) {
    if (arguments.length === 1) {
      const color = getColor(space);
      [space, coords] = [color.space, color.coords];
    }
    space = _ColorSpace.get(space);
    return space.to(this, coords);
  }
  toString() {
    return `${this.name} (${this.id})`;
  }
  getMinCoords() {
    let ret = [];
    for (let id in this.coords) {
      let meta = this.coords[id];
      let range2 = meta.range || meta.refRange;
      ret.push(range2?.min ?? 0);
    }
    return ret;
  }
  static registry = {};
  // Returns array of unique color spaces
  static get all() {
    return [...new Set(Object.values(_ColorSpace.registry))];
  }
  static register(id, space) {
    if (arguments.length === 1) {
      space = arguments[0];
      id = space.id;
    }
    space = this.get(space);
    if (this.registry[id] && this.registry[id] !== space) {
      throw new Error(`Duplicate color space registration: '${id}'`);
    }
    this.registry[id] = space;
    if (arguments.length === 1 && space.aliases) {
      for (let alias of space.aliases) {
        this.register(alias, space);
      }
    }
    return space;
  }
  /**
   * Lookup ColorSpace object by name
   * @param {ColorSpace | string} name
   */
  static get(space, ...alternatives) {
    if (!space || space instanceof _ColorSpace) {
      return space;
    }
    let argType = type(space);
    if (argType === "string") {
      let ret = _ColorSpace.registry[space.toLowerCase()];
      if (!ret) {
        throw new TypeError(`No color space found with id = "${space}"`);
      }
      return ret;
    }
    if (alternatives.length) {
      return _ColorSpace.get(...alternatives);
    }
    throw new TypeError(`${space} is not a valid color space`);
  }
  /**
   * Get metadata about a coordinate of a color space
   *
   * @static
   * @param {Array | string} ref
   * @param {ColorSpace | string} [workingSpace]
   * @return {Object}
   */
  static resolveCoord(ref, workingSpace) {
    let coordType = type(ref);
    let space, coord;
    if (coordType === "string") {
      if (ref.includes(".")) {
        [space, coord] = ref.split(".");
      } else {
        [space, coord] = [, ref];
      }
    } else if (Array.isArray(ref)) {
      [space, coord] = ref;
    } else {
      space = ref.space;
      coord = ref.coordId;
    }
    space = _ColorSpace.get(space);
    if (!space) {
      space = workingSpace;
    }
    if (!space) {
      throw new TypeError(`Cannot resolve coordinate reference ${ref}: No color space specified and relative references are not allowed here`);
    }
    coordType = type(coord);
    if (coordType === "number" || coordType === "string" && coord >= 0) {
      let meta = Object.entries(space.coords)[coord];
      if (meta) {
        return { space, id: meta[0], index: coord, ...meta[1] };
      }
    }
    space = _ColorSpace.get(space);
    let normalizedCoord = coord.toLowerCase();
    let i = 0;
    for (let id in space.coords) {
      let meta = space.coords[id];
      if (id.toLowerCase() === normalizedCoord || meta.name?.toLowerCase() === normalizedCoord) {
        return { space, id, index: i, ...meta };
      }
      i++;
    }
    throw new TypeError(`No "${coord}" coordinate found in ${space.name}. Its coordinates are: ${Object.keys(space.coords).join(", ")}`);
  }
  static DEFAULT_FORMAT = {
    type: "functions",
    name: "color"
  };
};
function getPath(space) {
  let ret = [space];
  for (let s = space; s = s.base; ) {
    ret.push(s);
  }
  return ret;
}
function processFormat(format, { coords } = {}) {
  if (format.coords && !format.coordGrammar) {
    format.type ||= "function";
    format.name ||= "color";
    format.coordGrammar = parseCoordGrammar(format.coords);
    let coordFormats = Object.entries(coords).map(([id, coordMeta], i) => {
      let outputType = format.coordGrammar[i][0];
      let fromRange = coordMeta.range || coordMeta.refRange;
      let toRange = outputType.range, suffix = "";
      if (outputType == "<percentage>") {
        toRange = [0, 100];
        suffix = "%";
      } else if (outputType == "<angle>") {
        suffix = "deg";
      }
      return { fromRange, toRange, suffix };
    });
    format.serializeCoords = (coords2, precision) => {
      return coords2.map((c4, i) => {
        let { fromRange, toRange, suffix } = coordFormats[i];
        if (fromRange && toRange) {
          c4 = mapRange(fromRange, toRange, c4);
        }
        c4 = serializeNumber(c4, { precision, unit: suffix });
        return c4;
      });
    };
  }
  return format;
}
var xyz_d65 = new ColorSpace({
  id: "xyz-d65",
  name: "XYZ D65",
  coords: {
    x: { name: "X" },
    y: { name: "Y" },
    z: { name: "Z" }
  },
  white: "D65",
  formats: {
    color: {
      ids: ["xyz-d65", "xyz"]
    }
  },
  aliases: ["xyz"]
});
var RGBColorSpace = class extends ColorSpace {
  /**
   * Creates a new RGB ColorSpace.
   * If coords are not specified, they will use the default RGB coords.
   * Instead of `fromBase()` and `toBase()` functions,
   * you can specify to/from XYZ matrices and have `toBase()` and `fromBase()` automatically generated.
   * @param {*} options - Same options as {@link ColorSpace} plus:
   * @param {number[][]} options.toXYZ_M - Matrix to convert to XYZ
   * @param {number[][]} options.fromXYZ_M - Matrix to convert from XYZ
   */
  constructor(options) {
    if (!options.coords) {
      options.coords = {
        r: {
          range: [0, 1],
          name: "Red"
        },
        g: {
          range: [0, 1],
          name: "Green"
        },
        b: {
          range: [0, 1],
          name: "Blue"
        }
      };
    }
    if (!options.base) {
      options.base = xyz_d65;
    }
    if (options.toXYZ_M && options.fromXYZ_M) {
      options.toBase ??= (rgb) => {
        let xyz = multiplyMatrices(options.toXYZ_M, rgb);
        if (this.white !== this.base.white) {
          xyz = adapt$2(this.white, this.base.white, xyz);
        }
        return xyz;
      };
      options.fromBase ??= (xyz) => {
        xyz = adapt$2(this.base.white, this.white, xyz);
        return multiplyMatrices(options.fromXYZ_M, xyz);
      };
    }
    options.referred ??= "display";
    super(options);
  }
};
function getAll(color, space) {
  color = getColor(color);
  if (!space || color.space.equals(space)) {
    return color.coords.slice();
  }
  space = ColorSpace.get(space);
  return space.from(color);
}
function get3(color, prop) {
  color = getColor(color);
  let { space, index } = ColorSpace.resolveCoord(prop, color.space);
  let coords = getAll(color, space);
  return coords[index];
}
function setAll(color, space, coords) {
  color = getColor(color);
  space = ColorSpace.get(space);
  color.coords = space.to(color.space, coords);
  return color;
}
setAll.returns = "color";
function set(color, prop, value) {
  color = getColor(color);
  if (arguments.length === 2 && type(arguments[1]) === "object") {
    let object2 = arguments[1];
    for (let p2 in object2) {
      set(color, p2, object2[p2]);
    }
  } else {
    if (typeof value === "function") {
      value = value(get3(color, prop));
    }
    let { space, index } = ColorSpace.resolveCoord(prop, color.space);
    let coords = getAll(color, space);
    coords[index] = value;
    setAll(color, space, coords);
  }
  return color;
}
set.returns = "color";
var XYZ_D50 = new ColorSpace({
  id: "xyz-d50",
  name: "XYZ D50",
  white: "D50",
  base: xyz_d65,
  fromBase: (coords) => adapt$2(xyz_d65.white, "D50", coords),
  toBase: (coords) => adapt$2("D50", xyz_d65.white, coords)
});
var \u03B5$6 = 216 / 24389;
var \u03B53$1 = 24 / 116;
var \u03BA$4 = 24389 / 27;
var white$4 = WHITES.D50;
var lab = new ColorSpace({
  id: "lab",
  name: "Lab",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D50, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: white$4,
  base: XYZ_D50,
  // Convert D50-adapted XYX to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(XYZ) {
    let xyz = XYZ.map((value, i) => value / white$4[i]);
    let f = xyz.map((value) => value > \u03B5$6 ? Math.cbrt(value) : (\u03BA$4 * value + 16) / 116);
    return [
      116 * f[1] - 16,
      // L
      500 * (f[0] - f[1]),
      // a
      200 * (f[1] - f[2])
      // b
    ];
  },
  // Convert Lab to D50-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(Lab) {
    let f = [];
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    let xyz = [
      f[0] > \u03B53$1 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA$4,
      Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA$4,
      f[2] > \u03B53$1 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA$4
    ];
    return xyz.map((value, i) => value * white$4[i]);
  },
  formats: {
    "lab": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function constrain(angle) {
  return (angle % 360 + 360) % 360;
}
function adjust(arc, angles) {
  if (arc === "raw") {
    return angles;
  }
  let [a1, a2] = angles.map(constrain);
  let angleDiff = a2 - a1;
  if (arc === "increasing") {
    if (angleDiff < 0) {
      a2 += 360;
    }
  } else if (arc === "decreasing") {
    if (angleDiff > 0) {
      a1 += 360;
    }
  } else if (arc === "longer") {
    if (-180 < angleDiff && angleDiff < 180) {
      if (angleDiff > 0) {
        a1 += 360;
      } else {
        a2 += 360;
      }
    }
  } else if (arc === "shorter") {
    if (angleDiff > 180) {
      a1 += 360;
    } else if (angleDiff < -180) {
      a2 += 360;
    }
  }
  return [a1, a2];
}
var lch = new ColorSpace({
  id: "lch",
  name: "LCH",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 150],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: lab,
  fromBase(Lab) {
    let [L, a2, b2] = Lab;
    let hue;
    const \u03B52 = 0.02;
    if (Math.abs(a2) < \u03B52 && Math.abs(b2) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(b2, a2) * 180 / Math.PI;
    }
    return [
      L,
      // L is still L
      Math.sqrt(a2 ** 2 + b2 ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(LCH) {
    let [Lightness, Chroma, Hue] = LCH;
    if (Chroma < 0) {
      Chroma = 0;
    }
    if (isNaN(Hue)) {
      Hue = 0;
    }
    return [
      Lightness,
      // L is still L
      Chroma * Math.cos(Hue * Math.PI / 180),
      // a
      Chroma * Math.sin(Hue * Math.PI / 180)
      // b
    ];
  },
  formats: {
    "lch": {
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
var Gfactor = 25 ** 7;
var \u03C0$1 = Math.PI;
var r2d = 180 / \u03C0$1;
var d2r$1 = \u03C0$1 / 180;
function pow7(x) {
  const x2 = x * x;
  const x7 = x2 * x2 * x2 * x;
  return x7;
}
function deltaE2000(color, sample, { kL = 1, kC = 1, kH = 1 } = {}) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = lab.from(color);
  let C1 = lch.from(lab, [L1, a1, b1])[1];
  let [L2, a2, b2] = lab.from(sample);
  let C2 = lch.from(lab, [L2, a2, b2])[1];
  if (C1 < 0) {
    C1 = 0;
  }
  if (C2 < 0) {
    C2 = 0;
  }
  let Cbar = (C1 + C2) / 2;
  let C7 = pow7(Cbar);
  let G = 0.5 * (1 - Math.sqrt(C7 / (C7 + Gfactor)));
  let adash1 = (1 + G) * a1;
  let adash2 = (1 + G) * a2;
  let Cdash1 = Math.sqrt(adash1 ** 2 + b1 ** 2);
  let Cdash2 = Math.sqrt(adash2 ** 2 + b2 ** 2);
  let h1 = adash1 === 0 && b1 === 0 ? 0 : Math.atan2(b1, adash1);
  let h2 = adash2 === 0 && b2 === 0 ? 0 : Math.atan2(b2, adash2);
  if (h1 < 0) {
    h1 += 2 * \u03C0$1;
  }
  if (h2 < 0) {
    h2 += 2 * \u03C0$1;
  }
  h1 *= r2d;
  h2 *= r2d;
  let \u0394L = L2 - L1;
  let \u0394C = Cdash2 - Cdash1;
  let hdiff = h2 - h1;
  let hsum = h1 + h2;
  let habs = Math.abs(hdiff);
  let \u0394h;
  if (Cdash1 * Cdash2 === 0) {
    \u0394h = 0;
  } else if (habs <= 180) {
    \u0394h = hdiff;
  } else if (hdiff > 180) {
    \u0394h = hdiff - 360;
  } else if (hdiff < -180) {
    \u0394h = hdiff + 360;
  } else {
    defaults.warn("the unthinkable has happened");
  }
  let \u0394H = 2 * Math.sqrt(Cdash2 * Cdash1) * Math.sin(\u0394h * d2r$1 / 2);
  let Ldash = (L1 + L2) / 2;
  let Cdash = (Cdash1 + Cdash2) / 2;
  let Cdash7 = pow7(Cdash);
  let hdash;
  if (Cdash1 * Cdash2 === 0) {
    hdash = hsum;
  } else if (habs <= 180) {
    hdash = hsum / 2;
  } else if (hsum < 360) {
    hdash = (hsum + 360) / 2;
  } else {
    hdash = (hsum - 360) / 2;
  }
  let lsq = (Ldash - 50) ** 2;
  let SL = 1 + 0.015 * lsq / Math.sqrt(20 + lsq);
  let SC = 1 + 0.045 * Cdash;
  let T = 1;
  T -= 0.17 * Math.cos((hdash - 30) * d2r$1);
  T += 0.24 * Math.cos(2 * hdash * d2r$1);
  T += 0.32 * Math.cos((3 * hdash + 6) * d2r$1);
  T -= 0.2 * Math.cos((4 * hdash - 63) * d2r$1);
  let SH = 1 + 0.015 * Cdash * T;
  let \u0394\u03B8 = 30 * Math.exp(-1 * ((hdash - 275) / 25) ** 2);
  let RC = 2 * Math.sqrt(Cdash7 / (Cdash7 + Gfactor));
  let RT = -1 * Math.sin(2 * \u0394\u03B8 * d2r$1) * RC;
  let dE = (\u0394L / (kL * SL)) ** 2;
  dE += (\u0394C / (kC * SC)) ** 2;
  dE += (\u0394H / (kH * SH)) ** 2;
  dE += RT * (\u0394C / (kC * SC)) * (\u0394H / (kH * SH));
  return Math.sqrt(dE);
}
var XYZtoLMS_M$1 = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
];
var LMStoXYZ_M$1 = [
  [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
  [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
  [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
];
var LMStoLab_M = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
];
var LabtoLMS_M = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092]
];
var OKLab = new ColorSpace({
  id: "oklab",
  name: "Oklab",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    a: {
      refRange: [-0.4, 0.4]
    },
    b: {
      refRange: [-0.4, 0.4]
    }
  },
  // Note that XYZ is relative to D65
  white: "D65",
  base: xyz_d65,
  fromBase(XYZ) {
    let LMS = multiplyMatrices(XYZtoLMS_M$1, XYZ);
    let LMSg = LMS.map((val) => Math.cbrt(val));
    return multiplyMatrices(LMStoLab_M, LMSg);
  },
  toBase(OKLab2) {
    let LMSg = multiplyMatrices(LabtoLMS_M, OKLab2);
    let LMS = LMSg.map((val) => val ** 3);
    return multiplyMatrices(LMStoXYZ_M$1, LMS);
  },
  formats: {
    "oklab": {
      coords: ["<percentage> | <number>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function deltaEOK(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = OKLab.from(color);
  let [L2, a2, b2] = OKLab.from(sample);
  let \u0394L = L1 - L2;
  let \u0394a = a1 - a2;
  let \u0394b = b1 - b2;
  return Math.sqrt(\u0394L ** 2 + \u0394a ** 2 + \u0394b ** 2);
}
var \u03B5$5 = 75e-6;
function inGamut(color, space, { epsilon: epsilon2 = \u03B5$5 } = {}) {
  color = getColor(color);
  if (!space) {
    space = color.space;
  }
  space = ColorSpace.get(space);
  let coords = color.coords;
  if (space !== color.space) {
    coords = space.from(color);
  }
  return space.inGamut(coords, { epsilon: epsilon2 });
}
function clone2(color) {
  return {
    space: color.space,
    coords: color.coords.slice(),
    alpha: color.alpha
  };
}
function distance3(color1, color2, space = "lab") {
  space = ColorSpace.get(space);
  let coords1 = space.from(color1);
  let coords2 = space.from(color2);
  return Math.sqrt(coords1.reduce((acc, c12, i) => {
    let c22 = coords2[i];
    if (isNaN(c12) || isNaN(c22)) {
      return acc;
    }
    return acc + (c22 - c12) ** 2;
  }, 0));
}
function deltaE76(color, sample) {
  return distance3(color, sample, "lab");
}
var \u03C0 = Math.PI;
var d2r = \u03C0 / 180;
function deltaECMC(color, sample, { l = 2, c: c4 = 1 } = {}) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = lab.from(color);
  let [, C1, H1] = lch.from(lab, [L1, a1, b1]);
  let [L2, a2, b2] = lab.from(sample);
  let C2 = lch.from(lab, [L2, a2, b2])[1];
  if (C1 < 0) {
    C1 = 0;
  }
  if (C2 < 0) {
    C2 = 0;
  }
  let \u0394L = L1 - L2;
  let \u0394C = C1 - C2;
  let \u0394a = a1 - a2;
  let \u0394b = b1 - b2;
  let H2 = \u0394a ** 2 + \u0394b ** 2 - \u0394C ** 2;
  let SL = 0.511;
  if (L1 >= 16) {
    SL = 0.040975 * L1 / (1 + 0.01765 * L1);
  }
  let SC = 0.0638 * C1 / (1 + 0.0131 * C1) + 0.638;
  let T;
  if (Number.isNaN(H1)) {
    H1 = 0;
  }
  if (H1 >= 164 && H1 <= 345) {
    T = 0.56 + Math.abs(0.2 * Math.cos((H1 + 168) * d2r));
  } else {
    T = 0.36 + Math.abs(0.4 * Math.cos((H1 + 35) * d2r));
  }
  let C4 = Math.pow(C1, 4);
  let F = Math.sqrt(C4 / (C4 + 1900));
  let SH = SC * (F * T + 1 - F);
  let dE = (\u0394L / (l * SL)) ** 2;
  dE += (\u0394C / (c4 * SC)) ** 2;
  dE += H2 / SH ** 2;
  return Math.sqrt(dE);
}
var Yw$1 = 203;
var XYZ_Abs_D65 = new ColorSpace({
  // Absolute CIE XYZ, with a D65 whitepoint,
  // as used in most HDR colorspaces as a starting point.
  // SDR spaces are converted per BT.2048
  // so that diffuse, media white is 203 cd/m²
  id: "xyz-abs-d65",
  cssId: "--xyz-abs-d65",
  name: "Absolute XYZ D65",
  coords: {
    x: {
      refRange: [0, 9504.7],
      name: "Xa"
    },
    y: {
      refRange: [0, 1e4],
      name: "Ya"
    },
    z: {
      refRange: [0, 10888.3],
      name: "Za"
    }
  },
  base: xyz_d65,
  fromBase(XYZ) {
    return XYZ.map((v) => Math.max(v * Yw$1, 0));
  },
  toBase(AbsXYZ) {
    return AbsXYZ.map((v) => Math.max(v / Yw$1, 0));
  }
});
var b$1 = 1.15;
var g = 0.66;
var n$1 = 2610 / 2 ** 14;
var ninv$1 = 2 ** 14 / 2610;
var c1$2 = 3424 / 2 ** 12;
var c2$2 = 2413 / 2 ** 7;
var c3$2 = 2392 / 2 ** 7;
var p = 1.7 * 2523 / 2 ** 5;
var pinv = 2 ** 5 / (1.7 * 2523);
var d = -0.56;
var d0 = 16295499532821565e-27;
var XYZtoCone_M = [
  [0.41478972, 0.579999, 0.014648],
  [-0.20151, 1.120649, 0.0531008],
  [-0.0166008, 0.2648, 0.6684799]
];
var ConetoXYZ_M = [
  [1.9242264357876067, -1.0047923125953657, 0.037651404030618],
  [0.35031676209499907, 0.7264811939316552, -0.06538442294808501],
  [-0.09098281098284752, -0.3127282905230739, 1.5227665613052603]
];
var ConetoIab_M = [
  [0.5, 0.5, 0],
  [3.524, -4.066708, 0.542708],
  [0.199076, 1.096799, -1.295875]
];
var IabtoCone_M = [
  [1, 0.1386050432715393, 0.05804731615611886],
  [0.9999999999999999, -0.1386050432715393, -0.05804731615611886],
  [0.9999999999999998, -0.09601924202631895, -0.8118918960560388]
];
var Jzazbz = new ColorSpace({
  id: "jzazbz",
  name: "Jzazbz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    az: {
      refRange: [-0.5, 0.5]
    },
    bz: {
      refRange: [-0.5, 0.5]
    }
  },
  base: XYZ_Abs_D65,
  fromBase(XYZ) {
    let [Xa, Ya, Za] = XYZ;
    let Xm = b$1 * Xa - (b$1 - 1) * Za;
    let Ym = g * Ya - (g - 1) * Xa;
    let LMS = multiplyMatrices(XYZtoCone_M, [Xm, Ym, Za]);
    let PQLMS = LMS.map(function(val) {
      let num = c1$2 + c2$2 * (val / 1e4) ** n$1;
      let denom = 1 + c3$2 * (val / 1e4) ** n$1;
      return (num / denom) ** p;
    });
    let [Iz, az, bz] = multiplyMatrices(ConetoIab_M, PQLMS);
    let Jz = (1 + d) * Iz / (1 + d * Iz) - d0;
    return [Jz, az, bz];
  },
  toBase(Jzazbz2) {
    let [Jz, az, bz] = Jzazbz2;
    let Iz = (Jz + d0) / (1 + d - d * (Jz + d0));
    let PQLMS = multiplyMatrices(IabtoCone_M, [Iz, az, bz]);
    let LMS = PQLMS.map(function(val) {
      let num = c1$2 - val ** pinv;
      let denom = c3$2 * val ** pinv - c2$2;
      let x = 1e4 * (num / denom) ** ninv$1;
      return x;
    });
    let [Xm, Ym, Za] = multiplyMatrices(ConetoXYZ_M, LMS);
    let Xa = (Xm + (b$1 - 1) * Za) / b$1;
    let Ya = (Ym + (g - 1) * Xa) / g;
    return [Xa, Ya, Za];
  },
  formats: {
    // https://drafts.csswg.org/css-color-hdr/#Jzazbz
    "color": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var jzczhz = new ColorSpace({
  id: "jzczhz",
  name: "JzCzHz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    cz: {
      refRange: [0, 1],
      name: "Chroma"
    },
    hz: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Jzazbz,
  fromBase(jzazbz) {
    let [Jz, az, bz] = jzazbz;
    let hue;
    const \u03B52 = 2e-4;
    if (Math.abs(az) < \u03B52 && Math.abs(bz) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(bz, az) * 180 / Math.PI;
    }
    return [
      Jz,
      // Jz is still Jz
      Math.sqrt(az ** 2 + bz ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(jzczhz2) {
    return [
      jzczhz2[0],
      // Jz is still Jz
      jzczhz2[1] * Math.cos(jzczhz2[2] * Math.PI / 180),
      // az
      jzczhz2[1] * Math.sin(jzczhz2[2] * Math.PI / 180)
      // bz
    ];
  }
});
function deltaEJz(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [Jz1, Cz1, Hz1] = jzczhz.from(color);
  let [Jz2, Cz2, Hz2] = jzczhz.from(sample);
  let \u0394J = Jz1 - Jz2;
  let \u0394C = Cz1 - Cz2;
  if (Number.isNaN(Hz1) && Number.isNaN(Hz2)) {
    Hz1 = 0;
    Hz2 = 0;
  } else if (Number.isNaN(Hz1)) {
    Hz1 = Hz2;
  } else if (Number.isNaN(Hz2)) {
    Hz2 = Hz1;
  }
  let \u0394h = Hz1 - Hz2;
  let \u0394H = 2 * Math.sqrt(Cz1 * Cz2) * Math.sin(\u0394h / 2 * (Math.PI / 180));
  return Math.sqrt(\u0394J ** 2 + \u0394C ** 2 + \u0394H ** 2);
}
var c1$1 = 3424 / 4096;
var c2$1 = 2413 / 128;
var c3$1 = 2392 / 128;
var m1$1 = 2610 / 16384;
var m2 = 2523 / 32;
var im1 = 16384 / 2610;
var im2 = 32 / 2523;
var XYZtoLMS_M = [
  [0.3592832590121217, 0.6976051147779502, -0.035891593232029],
  [-0.1920808463704993, 1.100476797037432, 0.0753748658519118],
  [0.0070797844607479, 0.0748396662186362, 0.8433265453898765]
];
var LMStoIPT_M = [
  [2048 / 4096, 2048 / 4096, 0],
  [6610 / 4096, -13613 / 4096, 7003 / 4096],
  [17933 / 4096, -17390 / 4096, -543 / 4096]
];
var IPTtoLMS_M = [
  [0.9999999999999998, 0.0086090370379328, 0.111029625003026],
  [0.9999999999999998, -0.0086090370379328, -0.1110296250030259],
  [0.9999999999999998, 0.5600313357106791, -0.3206271749873188]
];
var LMStoXYZ_M = [
  [2.0701522183894223, -1.3263473389671563, 0.2066510476294053],
  [0.3647385209748072, 0.6805660249472273, -0.0453045459220347],
  [-0.0497472075358123, -0.0492609666966131, 1.1880659249923042]
];
var ictcp = new ColorSpace({
  id: "ictcp",
  name: "ICTCP",
  // From BT.2100-2 page 7:
  // During production, signal values are expected to exceed the
  // range E′ = [0.0 : 1.0]. This provides processing headroom and avoids
  // signal degradation during cascaded processing. Such values of E′,
  // below 0.0 or exceeding 1.0, should not be clipped during production
  // and exchange.
  // Values below 0.0 should not be clipped in reference displays (even
  // though they represent “negative” light) to allow the black level of
  // the signal (LB) to be properly set using test signals known as “PLUGE”
  coords: {
    i: {
      refRange: [0, 1],
      // Constant luminance,
      name: "I"
    },
    ct: {
      refRange: [-0.5, 0.5],
      // Full BT.2020 gamut in range [-0.5, 0.5]
      name: "CT"
    },
    cp: {
      refRange: [-0.5, 0.5],
      name: "CP"
    }
  },
  base: XYZ_Abs_D65,
  fromBase(XYZ) {
    let LMS = multiplyMatrices(XYZtoLMS_M, XYZ);
    return LMStoICtCp(LMS);
  },
  toBase(ICtCp) {
    let LMS = ICtCptoLMS(ICtCp);
    return multiplyMatrices(LMStoXYZ_M, LMS);
  }
});
function LMStoICtCp(LMS) {
  let PQLMS = LMS.map(function(val) {
    let num = c1$1 + c2$1 * (val / 1e4) ** m1$1;
    let denom = 1 + c3$1 * (val / 1e4) ** m1$1;
    return (num / denom) ** m2;
  });
  return multiplyMatrices(LMStoIPT_M, PQLMS);
}
function ICtCptoLMS(ICtCp) {
  let PQLMS = multiplyMatrices(IPTtoLMS_M, ICtCp);
  let LMS = PQLMS.map(function(val) {
    let num = Math.max(val ** im2 - c1$1, 0);
    let denom = c2$1 - c3$1 * val ** im2;
    return 1e4 * (num / denom) ** im1;
  });
  return LMS;
}
function deltaEITP(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [I1, T1, P1] = ictcp.from(color);
  let [I2, T2, P2] = ictcp.from(sample);
  return 720 * Math.sqrt((I1 - I2) ** 2 + 0.25 * (T1 - T2) ** 2 + (P1 - P2) ** 2);
}
var white$3 = WHITES.D65;
var adaptedCoef = 0.42;
var adaptedCoefInv = 1 / adaptedCoef;
var tau2 = 2 * Math.PI;
var cat16 = [
  [0.401288, 0.650173, -0.051461],
  [-0.250268, 1.204414, 0.045854],
  [-2079e-6, 0.048952, 0.953127]
];
var cat16Inv = [
  [1.8620678550872327, -1.0112546305316843, 0.14918677544445175],
  [0.38752654323613717, 0.6214474419314753, -0.008973985167612518],
  [-0.015841498849333856, -0.03412293802851557, 1.0499644368778496]
];
var m1 = [
  [460, 451, 288],
  [460, -891, -261],
  [460, -220, -6300]
];
var surroundMap = {
  dark: [0.8, 0.525, 0.8],
  dim: [0.9, 0.59, 0.9],
  average: [1, 0.69, 1]
};
var hueQuadMap = {
  // Red, Yellow, Green, Blue, Red
  h: [20.14, 90, 164.25, 237.53, 380.14],
  e: [0.8, 0.7, 1, 1.2, 0.8],
  H: [0, 100, 200, 300, 400]
};
var rad2deg = 180 / Math.PI;
var deg2rad$1 = Math.PI / 180;
function adapt$1(coords, fl) {
  const temp = coords.map((c4) => {
    const x = spow(fl * Math.abs(c4) * 0.01, adaptedCoef);
    return 400 * copySign(x, c4) / (x + 27.13);
  });
  return temp;
}
function unadapt(adapted, fl) {
  const constant = 100 / fl * 27.13 ** adaptedCoefInv;
  return adapted.map((c4) => {
    const cabs = Math.abs(c4);
    return copySign(constant * spow(cabs / (400 - cabs), adaptedCoefInv), c4);
  });
}
function hueQuadrature(h) {
  let hp = constrain(h);
  if (hp <= hueQuadMap.h[0]) {
    hp += 360;
  }
  const i = bisectLeft(hueQuadMap.h, hp) - 1;
  const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
  const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
  const Hi = hueQuadMap.H[i];
  const t2 = (hp - hi) / ei;
  return Hi + 100 * t2 / (t2 + (hii - hp) / eii);
}
function invHueQuadrature(H) {
  let Hp = (H % 400 + 400) % 400;
  const i = Math.floor(0.01 * Hp);
  Hp = Hp % 100;
  const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
  const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
  return constrain(
    (Hp * (eii * hi - ei * hii) - 100 * hi * eii) / (Hp * (eii - ei) - 100 * eii)
  );
}
function environment(refWhite, adaptingLuminance, backgroundLuminance, surround, discounting) {
  const env = {};
  env.discounting = discounting;
  env.refWhite = refWhite;
  env.surround = surround;
  const xyzW = refWhite.map((c4) => {
    return c4 * 100;
  });
  env.la = adaptingLuminance;
  env.yb = backgroundLuminance;
  const yw = xyzW[1];
  const rgbW = multiplyMatrices(cat16, xyzW);
  surround = surroundMap[env.surround];
  const f = surround[0];
  env.c = surround[1];
  env.nc = surround[2];
  const k = 1 / (5 * env.la + 1);
  const k4 = k ** 4;
  env.fl = k4 * env.la + 0.1 * (1 - k4) * (1 - k4) * Math.cbrt(5 * env.la);
  env.flRoot = env.fl ** 0.25;
  env.n = env.yb / yw;
  env.z = 1.48 + Math.sqrt(env.n);
  env.nbb = 0.725 * env.n ** -0.2;
  env.ncb = env.nbb;
  const d2 = discounting ? 1 : Math.max(
    Math.min(f * (1 - 1 / 3.6 * Math.exp((-env.la - 42) / 92)), 1),
    0
  );
  env.dRgb = rgbW.map((c4) => {
    return interpolate5(1, yw / c4, d2);
  });
  env.dRgbInv = env.dRgb.map((c4) => {
    return 1 / c4;
  });
  const rgbCW = rgbW.map((c4, i) => {
    return c4 * env.dRgb[i];
  });
  const rgbAW = adapt$1(rgbCW, env.fl);
  env.aW = env.nbb * (2 * rgbAW[0] + rgbAW[1] + 0.05 * rgbAW[2]);
  return env;
}
var viewingConditions$1 = environment(
  white$3,
  64 / Math.PI * 0.2,
  20,
  "average",
  false
);
function fromCam16(cam162, env) {
  if (!(cam162.J !== void 0 ^ cam162.Q !== void 0)) {
    throw new Error("Conversion requires one and only one: 'J' or 'Q'");
  }
  if (!(cam162.C !== void 0 ^ cam162.M !== void 0 ^ cam162.s !== void 0)) {
    throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");
  }
  if (!(cam162.h !== void 0 ^ cam162.H !== void 0)) {
    throw new Error("Conversion requires one and only one: 'h' or 'H'");
  }
  if (cam162.J === 0 || cam162.Q === 0) {
    return [0, 0, 0];
  }
  let hRad = 0;
  if (cam162.h !== void 0) {
    hRad = constrain(cam162.h) * deg2rad$1;
  } else {
    hRad = invHueQuadrature(cam162.H) * deg2rad$1;
  }
  const cosh = Math.cos(hRad);
  const sinh = Math.sin(hRad);
  let Jroot = 0;
  if (cam162.J !== void 0) {
    Jroot = spow(cam162.J, 1 / 2) * 0.1;
  } else if (cam162.Q !== void 0) {
    Jroot = 0.25 * env.c * cam162.Q / ((env.aW + 4) * env.flRoot);
  }
  let alpha = 0;
  if (cam162.C !== void 0) {
    alpha = cam162.C / Jroot;
  } else if (cam162.M !== void 0) {
    alpha = cam162.M / env.flRoot / Jroot;
  } else if (cam162.s !== void 0) {
    alpha = 4e-4 * cam162.s ** 2 * (env.aW + 4) / env.c;
  }
  const t2 = spow(
    alpha * Math.pow(1.64 - Math.pow(0.29, env.n), -0.73),
    10 / 9
  );
  const et = 0.25 * (Math.cos(hRad + 2) + 3.8);
  const A = env.aW * spow(Jroot, 2 / env.c / env.z);
  const p1 = 5e4 / 13 * env.nc * env.ncb * et;
  const p2 = A / env.nbb;
  const r = 23 * (p2 + 0.305) * zdiv(t2, 23 * p1 + t2 * (11 * cosh + 108 * sinh));
  const a2 = r * cosh;
  const b2 = r * sinh;
  const rgb_c = unadapt(
    multiplyMatrices(m1, [p2, a2, b2]).map((c4) => {
      return c4 * 1 / 1403;
    }),
    env.fl
  );
  return multiplyMatrices(
    cat16Inv,
    rgb_c.map((c4, i) => {
      return c4 * env.dRgbInv[i];
    })
  ).map((c4) => {
    return c4 / 100;
  });
}
function toCam16(xyzd65, env) {
  const xyz100 = xyzd65.map((c4) => {
    return c4 * 100;
  });
  const rgbA = adapt$1(
    multiplyMatrices(cat16, xyz100).map((c4, i) => {
      return c4 * env.dRgb[i];
    }),
    env.fl
  );
  const a2 = rgbA[0] + (-12 * rgbA[1] + rgbA[2]) / 11;
  const b2 = (rgbA[0] + rgbA[1] - 2 * rgbA[2]) / 9;
  const hRad = (Math.atan2(b2, a2) % tau2 + tau2) % tau2;
  const et = 0.25 * (Math.cos(hRad + 2) + 3.8);
  const t2 = 5e4 / 13 * env.nc * env.ncb * zdiv(
    et * Math.sqrt(a2 ** 2 + b2 ** 2),
    rgbA[0] + rgbA[1] + 1.05 * rgbA[2] + 0.305
  );
  const alpha = spow(t2, 0.9) * Math.pow(1.64 - Math.pow(0.29, env.n), 0.73);
  const A = env.nbb * (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]);
  const Jroot = spow(A / env.aW, 0.5 * env.c * env.z);
  const J = 100 * spow(Jroot, 2);
  const Q = 4 / env.c * Jroot * (env.aW + 4) * env.flRoot;
  const C = alpha * Jroot;
  const M = C * env.flRoot;
  const h = constrain(hRad * rad2deg);
  const H = hueQuadrature(h);
  const s = 50 * spow(env.c * alpha / (env.aW + 4), 1 / 2);
  return { J, C, h, s, Q, M, H };
}
var cam16 = new ColorSpace({
  id: "cam16-jmh",
  cssId: "--cam16-jmh",
  name: "CAM16-JMh",
  coords: {
    j: {
      refRange: [0, 100],
      name: "J"
    },
    m: {
      refRange: [0, 105],
      name: "Colorfulness"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: xyz_d65,
  fromBase(xyz) {
    const cam162 = toCam16(xyz, viewingConditions$1);
    return [cam162.J, cam162.M, cam162.h];
  },
  toBase(cam162) {
    return fromCam16(
      { J: cam162[0], M: cam162[1], h: cam162[2] },
      viewingConditions$1
    );
  }
});
var white$2 = WHITES.D65;
var \u03B5$4 = 216 / 24389;
var \u03BA$3 = 24389 / 27;
function toLstar(y) {
  const fy = y > \u03B5$4 ? Math.cbrt(y) : (\u03BA$3 * y + 16) / 116;
  return 116 * fy - 16;
}
function fromLstar(lstar) {
  return lstar > 8 ? Math.pow((lstar + 16) / 116, 3) : lstar / \u03BA$3;
}
function fromHct(coords, env) {
  let [h, c4, t2] = coords;
  let xyz = [];
  let j = 0;
  if (t2 === 0) {
    return [0, 0, 0];
  }
  let y = fromLstar(t2);
  if (t2 > 0) {
    j = 0.00379058511492914 * t2 ** 2 + 0.608983189401032 * t2 + 0.9155088574762233;
  } else {
    j = 9514440756550361e-21 * t2 ** 2 + 0.08693057439788597 * t2 - 21.928975842194614;
  }
  const threshold = 2e-12;
  const max_attempts = 15;
  let attempt = 0;
  let last2 = Infinity;
  while (attempt <= max_attempts) {
    xyz = fromCam16({ J: j, C: c4, h }, env);
    const delta = Math.abs(xyz[1] - y);
    if (delta < last2) {
      if (delta <= threshold) {
        return xyz;
      }
      last2 = delta;
    }
    j = j - (xyz[1] - y) * j / (2 * xyz[1]);
    attempt += 1;
  }
  return fromCam16({ J: j, C: c4, h }, env);
}
function toHct(xyz, env) {
  const t2 = toLstar(xyz[1]);
  if (t2 === 0) {
    return [0, 0, 0];
  }
  const cam162 = toCam16(xyz, viewingConditions);
  return [constrain(cam162.h), cam162.C, t2];
}
var viewingConditions = environment(
  white$2,
  200 / Math.PI * fromLstar(50),
  fromLstar(50) * 100,
  "average",
  false
);
var hct = new ColorSpace({
  id: "hct",
  name: "HCT",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    c: {
      refRange: [0, 145],
      name: "Colorfulness"
    },
    t: {
      refRange: [0, 100],
      name: "Tone"
    }
  },
  base: xyz_d65,
  fromBase(xyz) {
    return toHct(xyz);
  },
  toBase(hct2) {
    return fromHct(hct2, viewingConditions);
  },
  formats: {
    color: {
      id: "--hct",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var deg2rad = Math.PI / 180;
var ucsCoeff = [1, 7e-3, 0.0228];
function convertUcsAb(coords) {
  if (coords[1] < 0) {
    coords = hct.fromBase(hct.toBase(coords));
  }
  const M = Math.log(Math.max(1 + ucsCoeff[2] * coords[1] * viewingConditions.flRoot, 1)) / ucsCoeff[2];
  const hrad = coords[0] * deg2rad;
  const a2 = M * Math.cos(hrad);
  const b2 = M * Math.sin(hrad);
  return [coords[2], a2, b2];
}
function deltaEHCT(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [t1, a1, b1] = convertUcsAb(hct.from(color));
  let [t2, a2, b2] = convertUcsAb(hct.from(sample));
  return Math.sqrt((t1 - t2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}
var deltaEMethods = {
  deltaE76,
  deltaECMC,
  deltaE2000,
  deltaEJz,
  deltaEITP,
  deltaEOK,
  deltaEHCT
};
function calcEpsilon(jnd) {
  const order = !jnd ? 0 : Math.floor(Math.log10(Math.abs(jnd)));
  return Math.max(parseFloat(`1e${order - 2}`), 1e-6);
}
var GMAPPRESET = {
  "hct": {
    method: "hct.c",
    jnd: 2,
    deltaEMethod: "hct",
    blackWhiteClamp: {}
  },
  "hct-tonal": {
    method: "hct.c",
    jnd: 0,
    deltaEMethod: "hct",
    blackWhiteClamp: { channel: "hct.t", min: 0, max: 100 }
  }
};
function toGamut(color, {
  method = defaults.gamut_mapping,
  space = void 0,
  deltaEMethod = "",
  jnd = 2,
  blackWhiteClamp = {}
} = {}) {
  color = getColor(color);
  if (isString(arguments[1])) {
    space = arguments[1];
  } else if (!space) {
    space = color.space;
  }
  space = ColorSpace.get(space);
  if (inGamut(color, space, { epsilon: 0 })) {
    return color;
  }
  let spaceColor;
  if (method === "css") {
    spaceColor = toGamutCSS(color, { space });
  } else {
    if (method !== "clip" && !inGamut(color, space)) {
      if (Object.prototype.hasOwnProperty.call(GMAPPRESET, method)) {
        ({ method, jnd, deltaEMethod, blackWhiteClamp } = GMAPPRESET[method]);
      }
      let de = deltaE2000;
      if (deltaEMethod !== "") {
        for (let m3 in deltaEMethods) {
          if ("deltae" + deltaEMethod.toLowerCase() === m3.toLowerCase()) {
            de = deltaEMethods[m3];
            break;
          }
        }
      }
      let clipped = toGamut(to(color, space), { method: "clip", space });
      if (de(color, clipped) > jnd) {
        if (Object.keys(blackWhiteClamp).length === 3) {
          let channelMeta = ColorSpace.resolveCoord(blackWhiteClamp.channel);
          let channel = get3(to(color, channelMeta.space), channelMeta.id);
          if (isNone(channel)) {
            channel = 0;
          }
          if (channel >= blackWhiteClamp.max) {
            return to({ space: "xyz-d65", coords: WHITES["D65"] }, color.space);
          } else if (channel <= blackWhiteClamp.min) {
            return to({ space: "xyz-d65", coords: [0, 0, 0] }, color.space);
          }
        }
        let coordMeta = ColorSpace.resolveCoord(method);
        let mapSpace = coordMeta.space;
        let coordId = coordMeta.id;
        let mappedColor = to(color, mapSpace);
        mappedColor.coords.forEach((c4, i) => {
          if (isNone(c4)) {
            mappedColor.coords[i] = 0;
          }
        });
        let bounds = coordMeta.range || coordMeta.refRange;
        let min6 = bounds[0];
        let \u03B52 = calcEpsilon(jnd);
        let low = min6;
        let high = get3(mappedColor, coordId);
        while (high - low > \u03B52) {
          let clipped2 = clone2(mappedColor);
          clipped2 = toGamut(clipped2, { space, method: "clip" });
          let deltaE2 = de(mappedColor, clipped2);
          if (deltaE2 - jnd < \u03B52) {
            low = get3(mappedColor, coordId);
          } else {
            high = get3(mappedColor, coordId);
          }
          set(mappedColor, coordId, (low + high) / 2);
        }
        spaceColor = to(mappedColor, space);
      } else {
        spaceColor = clipped;
      }
    } else {
      spaceColor = to(color, space);
    }
    if (method === "clip" || !inGamut(spaceColor, space, { epsilon: 0 })) {
      let bounds = Object.values(space.coords).map((c4) => c4.range || []);
      spaceColor.coords = spaceColor.coords.map((c4, i) => {
        let [min6, max6] = bounds[i];
        if (min6 !== void 0) {
          c4 = Math.max(min6, c4);
        }
        if (max6 !== void 0) {
          c4 = Math.min(c4, max6);
        }
        return c4;
      });
    }
  }
  if (space !== color.space) {
    spaceColor = to(spaceColor, color.space);
  }
  color.coords = spaceColor.coords;
  return color;
}
toGamut.returns = "color";
var COLORS = {
  WHITE: { space: OKLab, coords: [1, 0, 0] },
  BLACK: { space: OKLab, coords: [0, 0, 0] }
};
function toGamutCSS(origin, { space } = {}) {
  const JND = 0.02;
  const \u03B52 = 1e-4;
  origin = getColor(origin);
  if (!space) {
    space = origin.space;
  }
  space = ColorSpace.get(space);
  const oklchSpace = ColorSpace.get("oklch");
  if (space.isUnbounded) {
    return to(origin, space);
  }
  const origin_OKLCH = to(origin, oklchSpace);
  let L = origin_OKLCH.coords[0];
  if (L >= 1) {
    const white2 = to(COLORS.WHITE, space);
    white2.alpha = origin.alpha;
    return to(white2, space);
  }
  if (L <= 0) {
    const black = to(COLORS.BLACK, space);
    black.alpha = origin.alpha;
    return to(black, space);
  }
  if (inGamut(origin_OKLCH, space, { epsilon: 0 })) {
    return to(origin_OKLCH, space);
  }
  function clip(_color) {
    const destColor = to(_color, space);
    const spaceCoords = Object.values(space.coords);
    destColor.coords = destColor.coords.map((coord, index) => {
      if ("range" in spaceCoords[index]) {
        const [min7, max7] = spaceCoords[index].range;
        return clamp3(min7, coord, max7);
      }
      return coord;
    });
    return destColor;
  }
  let min6 = 0;
  let max6 = origin_OKLCH.coords[1];
  let min_inGamut = true;
  let current = clone2(origin_OKLCH);
  let clipped = clip(current);
  let E = deltaEOK(clipped, current);
  if (E < JND) {
    return clipped;
  }
  while (max6 - min6 > \u03B52) {
    const chroma = (min6 + max6) / 2;
    current.coords[1] = chroma;
    if (min_inGamut && inGamut(current, space, { epsilon: 0 })) {
      min6 = chroma;
    } else {
      clipped = clip(current);
      E = deltaEOK(clipped, current);
      if (E < JND) {
        if (JND - E < \u03B52) {
          break;
        } else {
          min_inGamut = false;
          min6 = chroma;
        }
      } else {
        max6 = chroma;
      }
    }
  }
  return clipped;
}
function to(color, space, { inGamut: inGamut2 } = {}) {
  color = getColor(color);
  space = ColorSpace.get(space);
  let coords = space.from(color);
  let ret = { space, coords, alpha: color.alpha };
  if (inGamut2) {
    ret = toGamut(ret, inGamut2 === true ? void 0 : inGamut2);
  }
  return ret;
}
to.returns = "color";
function serialize(color, {
  precision = defaults.precision,
  format = "default",
  inGamut: inGamut$1 = true,
  ...customOptions
} = {}) {
  let ret;
  color = getColor(color);
  let formatId = format;
  format = color.space.getFormat(format) ?? color.space.getFormat("default") ?? ColorSpace.DEFAULT_FORMAT;
  let coords = color.coords.slice();
  inGamut$1 ||= format.toGamut;
  if (inGamut$1 && !inGamut(color)) {
    coords = toGamut(clone2(color), inGamut$1 === true ? void 0 : inGamut$1).coords;
  }
  if (format.type === "custom") {
    customOptions.precision = precision;
    if (format.serialize) {
      ret = format.serialize(coords, color.alpha, customOptions);
    } else {
      throw new TypeError(`format ${formatId} can only be used to parse colors, not for serialization`);
    }
  } else {
    let name = format.name || "color";
    if (format.serializeCoords) {
      coords = format.serializeCoords(coords, precision);
    } else {
      if (precision !== null) {
        coords = coords.map((c4) => {
          return serializeNumber(c4, { precision });
        });
      }
    }
    let args = [...coords];
    if (name === "color") {
      let cssId = format.id || format.ids?.[0] || color.space.id;
      args.unshift(cssId);
    }
    let alpha = color.alpha;
    if (precision !== null) {
      alpha = serializeNumber(alpha, { precision });
    }
    let strAlpha = color.alpha >= 1 || format.noAlpha ? "" : `${format.commas ? "," : " /"} ${alpha}`;
    ret = `${name}(${args.join(format.commas ? ", " : " ")}${strAlpha})`;
  }
  return ret;
}
var toXYZ_M$5 = [
  [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
  [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
  [0, 0.028072693049087428, 1.060985057710791]
];
var fromXYZ_M$5 = [
  [1.716651187971268, -0.355670783776392, -0.25336628137366],
  [-0.666684351832489, 1.616481236634939, 0.0157685458139111],
  [0.017639857445311, -0.042770613257809, 0.942103121235474]
];
var REC2020Linear = new RGBColorSpace({
  id: "rec2020-linear",
  cssId: "--rec2020-linear",
  name: "Linear REC.2020",
  white: "D65",
  toXYZ_M: toXYZ_M$5,
  fromXYZ_M: fromXYZ_M$5
});
var \u03B1 = 1.09929682680944;
var \u03B2 = 0.018053968510807;
var REC2020 = new RGBColorSpace({
  id: "rec2020",
  name: "REC.2020",
  base: REC2020Linear,
  // Non-linear transfer function from Rec. ITU-R BT.2020-2 table 4
  toBase(RGB) {
    return RGB.map(function(val) {
      if (val < \u03B2 * 4.5) {
        return val / 4.5;
      }
      return Math.pow((val + \u03B1 - 1) / \u03B1, 1 / 0.45);
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      if (val >= \u03B2) {
        return \u03B1 * Math.pow(val, 0.45) - (\u03B1 - 1);
      }
      return 4.5 * val;
    });
  }
});
var toXYZ_M$4 = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976]
];
var fromXYZ_M$4 = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
];
var P3Linear = new RGBColorSpace({
  id: "p3-linear",
  cssId: "--display-p3-linear",
  name: "Linear P3",
  white: "D65",
  toXYZ_M: toXYZ_M$4,
  fromXYZ_M: fromXYZ_M$4
});
var toXYZ_M$3 = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
];
var fromXYZ_M$3 = [
  [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
  [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
  [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
];
var sRGBLinear = new RGBColorSpace({
  id: "srgb-linear",
  name: "Linear sRGB",
  white: "D65",
  toXYZ_M: toXYZ_M$3,
  fromXYZ_M: fromXYZ_M$3
});
var KEYWORDS = {
  "aliceblue": [240 / 255, 248 / 255, 1],
  "antiquewhite": [250 / 255, 235 / 255, 215 / 255],
  "aqua": [0, 1, 1],
  "aquamarine": [127 / 255, 1, 212 / 255],
  "azure": [240 / 255, 1, 1],
  "beige": [245 / 255, 245 / 255, 220 / 255],
  "bisque": [1, 228 / 255, 196 / 255],
  "black": [0, 0, 0],
  "blanchedalmond": [1, 235 / 255, 205 / 255],
  "blue": [0, 0, 1],
  "blueviolet": [138 / 255, 43 / 255, 226 / 255],
  "brown": [165 / 255, 42 / 255, 42 / 255],
  "burlywood": [222 / 255, 184 / 255, 135 / 255],
  "cadetblue": [95 / 255, 158 / 255, 160 / 255],
  "chartreuse": [127 / 255, 1, 0],
  "chocolate": [210 / 255, 105 / 255, 30 / 255],
  "coral": [1, 127 / 255, 80 / 255],
  "cornflowerblue": [100 / 255, 149 / 255, 237 / 255],
  "cornsilk": [1, 248 / 255, 220 / 255],
  "crimson": [220 / 255, 20 / 255, 60 / 255],
  "cyan": [0, 1, 1],
  "darkblue": [0, 0, 139 / 255],
  "darkcyan": [0, 139 / 255, 139 / 255],
  "darkgoldenrod": [184 / 255, 134 / 255, 11 / 255],
  "darkgray": [169 / 255, 169 / 255, 169 / 255],
  "darkgreen": [0, 100 / 255, 0],
  "darkgrey": [169 / 255, 169 / 255, 169 / 255],
  "darkkhaki": [189 / 255, 183 / 255, 107 / 255],
  "darkmagenta": [139 / 255, 0, 139 / 255],
  "darkolivegreen": [85 / 255, 107 / 255, 47 / 255],
  "darkorange": [1, 140 / 255, 0],
  "darkorchid": [153 / 255, 50 / 255, 204 / 255],
  "darkred": [139 / 255, 0, 0],
  "darksalmon": [233 / 255, 150 / 255, 122 / 255],
  "darkseagreen": [143 / 255, 188 / 255, 143 / 255],
  "darkslateblue": [72 / 255, 61 / 255, 139 / 255],
  "darkslategray": [47 / 255, 79 / 255, 79 / 255],
  "darkslategrey": [47 / 255, 79 / 255, 79 / 255],
  "darkturquoise": [0, 206 / 255, 209 / 255],
  "darkviolet": [148 / 255, 0, 211 / 255],
  "deeppink": [1, 20 / 255, 147 / 255],
  "deepskyblue": [0, 191 / 255, 1],
  "dimgray": [105 / 255, 105 / 255, 105 / 255],
  "dimgrey": [105 / 255, 105 / 255, 105 / 255],
  "dodgerblue": [30 / 255, 144 / 255, 1],
  "firebrick": [178 / 255, 34 / 255, 34 / 255],
  "floralwhite": [1, 250 / 255, 240 / 255],
  "forestgreen": [34 / 255, 139 / 255, 34 / 255],
  "fuchsia": [1, 0, 1],
  "gainsboro": [220 / 255, 220 / 255, 220 / 255],
  "ghostwhite": [248 / 255, 248 / 255, 1],
  "gold": [1, 215 / 255, 0],
  "goldenrod": [218 / 255, 165 / 255, 32 / 255],
  "gray": [128 / 255, 128 / 255, 128 / 255],
  "green": [0, 128 / 255, 0],
  "greenyellow": [173 / 255, 1, 47 / 255],
  "grey": [128 / 255, 128 / 255, 128 / 255],
  "honeydew": [240 / 255, 1, 240 / 255],
  "hotpink": [1, 105 / 255, 180 / 255],
  "indianred": [205 / 255, 92 / 255, 92 / 255],
  "indigo": [75 / 255, 0, 130 / 255],
  "ivory": [1, 1, 240 / 255],
  "khaki": [240 / 255, 230 / 255, 140 / 255],
  "lavender": [230 / 255, 230 / 255, 250 / 255],
  "lavenderblush": [1, 240 / 255, 245 / 255],
  "lawngreen": [124 / 255, 252 / 255, 0],
  "lemonchiffon": [1, 250 / 255, 205 / 255],
  "lightblue": [173 / 255, 216 / 255, 230 / 255],
  "lightcoral": [240 / 255, 128 / 255, 128 / 255],
  "lightcyan": [224 / 255, 1, 1],
  "lightgoldenrodyellow": [250 / 255, 250 / 255, 210 / 255],
  "lightgray": [211 / 255, 211 / 255, 211 / 255],
  "lightgreen": [144 / 255, 238 / 255, 144 / 255],
  "lightgrey": [211 / 255, 211 / 255, 211 / 255],
  "lightpink": [1, 182 / 255, 193 / 255],
  "lightsalmon": [1, 160 / 255, 122 / 255],
  "lightseagreen": [32 / 255, 178 / 255, 170 / 255],
  "lightskyblue": [135 / 255, 206 / 255, 250 / 255],
  "lightslategray": [119 / 255, 136 / 255, 153 / 255],
  "lightslategrey": [119 / 255, 136 / 255, 153 / 255],
  "lightsteelblue": [176 / 255, 196 / 255, 222 / 255],
  "lightyellow": [1, 1, 224 / 255],
  "lime": [0, 1, 0],
  "limegreen": [50 / 255, 205 / 255, 50 / 255],
  "linen": [250 / 255, 240 / 255, 230 / 255],
  "magenta": [1, 0, 1],
  "maroon": [128 / 255, 0, 0],
  "mediumaquamarine": [102 / 255, 205 / 255, 170 / 255],
  "mediumblue": [0, 0, 205 / 255],
  "mediumorchid": [186 / 255, 85 / 255, 211 / 255],
  "mediumpurple": [147 / 255, 112 / 255, 219 / 255],
  "mediumseagreen": [60 / 255, 179 / 255, 113 / 255],
  "mediumslateblue": [123 / 255, 104 / 255, 238 / 255],
  "mediumspringgreen": [0, 250 / 255, 154 / 255],
  "mediumturquoise": [72 / 255, 209 / 255, 204 / 255],
  "mediumvioletred": [199 / 255, 21 / 255, 133 / 255],
  "midnightblue": [25 / 255, 25 / 255, 112 / 255],
  "mintcream": [245 / 255, 1, 250 / 255],
  "mistyrose": [1, 228 / 255, 225 / 255],
  "moccasin": [1, 228 / 255, 181 / 255],
  "navajowhite": [1, 222 / 255, 173 / 255],
  "navy": [0, 0, 128 / 255],
  "oldlace": [253 / 255, 245 / 255, 230 / 255],
  "olive": [128 / 255, 128 / 255, 0],
  "olivedrab": [107 / 255, 142 / 255, 35 / 255],
  "orange": [1, 165 / 255, 0],
  "orangered": [1, 69 / 255, 0],
  "orchid": [218 / 255, 112 / 255, 214 / 255],
  "palegoldenrod": [238 / 255, 232 / 255, 170 / 255],
  "palegreen": [152 / 255, 251 / 255, 152 / 255],
  "paleturquoise": [175 / 255, 238 / 255, 238 / 255],
  "palevioletred": [219 / 255, 112 / 255, 147 / 255],
  "papayawhip": [1, 239 / 255, 213 / 255],
  "peachpuff": [1, 218 / 255, 185 / 255],
  "peru": [205 / 255, 133 / 255, 63 / 255],
  "pink": [1, 192 / 255, 203 / 255],
  "plum": [221 / 255, 160 / 255, 221 / 255],
  "powderblue": [176 / 255, 224 / 255, 230 / 255],
  "purple": [128 / 255, 0, 128 / 255],
  "rebeccapurple": [102 / 255, 51 / 255, 153 / 255],
  "red": [1, 0, 0],
  "rosybrown": [188 / 255, 143 / 255, 143 / 255],
  "royalblue": [65 / 255, 105 / 255, 225 / 255],
  "saddlebrown": [139 / 255, 69 / 255, 19 / 255],
  "salmon": [250 / 255, 128 / 255, 114 / 255],
  "sandybrown": [244 / 255, 164 / 255, 96 / 255],
  "seagreen": [46 / 255, 139 / 255, 87 / 255],
  "seashell": [1, 245 / 255, 238 / 255],
  "sienna": [160 / 255, 82 / 255, 45 / 255],
  "silver": [192 / 255, 192 / 255, 192 / 255],
  "skyblue": [135 / 255, 206 / 255, 235 / 255],
  "slateblue": [106 / 255, 90 / 255, 205 / 255],
  "slategray": [112 / 255, 128 / 255, 144 / 255],
  "slategrey": [112 / 255, 128 / 255, 144 / 255],
  "snow": [1, 250 / 255, 250 / 255],
  "springgreen": [0, 1, 127 / 255],
  "steelblue": [70 / 255, 130 / 255, 180 / 255],
  "tan": [210 / 255, 180 / 255, 140 / 255],
  "teal": [0, 128 / 255, 128 / 255],
  "thistle": [216 / 255, 191 / 255, 216 / 255],
  "tomato": [1, 99 / 255, 71 / 255],
  "turquoise": [64 / 255, 224 / 255, 208 / 255],
  "violet": [238 / 255, 130 / 255, 238 / 255],
  "wheat": [245 / 255, 222 / 255, 179 / 255],
  "white": [1, 1, 1],
  "whitesmoke": [245 / 255, 245 / 255, 245 / 255],
  "yellow": [1, 1, 0],
  "yellowgreen": [154 / 255, 205 / 255, 50 / 255]
};
var coordGrammar = Array(3).fill("<percentage> | <number>[0, 255]");
var coordGrammarNumber = Array(3).fill("<number>[0, 255]");
var sRGB = new RGBColorSpace({
  id: "srgb",
  name: "sRGB",
  base: sRGBLinear,
  fromBase: (rgb) => {
    return rgb.map((val) => {
      let sign = val < 0 ? -1 : 1;
      let abs4 = val * sign;
      if (abs4 > 31308e-7) {
        return sign * (1.055 * abs4 ** (1 / 2.4) - 0.055);
      }
      return 12.92 * val;
    });
  },
  toBase: (rgb) => {
    return rgb.map((val) => {
      let sign = val < 0 ? -1 : 1;
      let abs4 = val * sign;
      if (abs4 <= 0.04045) {
        return val / 12.92;
      }
      return sign * ((abs4 + 0.055) / 1.055) ** 2.4;
    });
  },
  formats: {
    "rgb": {
      coords: coordGrammar
    },
    "rgb_number": {
      name: "rgb",
      commas: true,
      coords: coordGrammarNumber,
      noAlpha: true
    },
    "color": {
      /* use defaults */
    },
    "rgba": {
      coords: coordGrammar,
      commas: true,
      lastAlpha: true
    },
    "rgba_number": {
      name: "rgba",
      commas: true,
      coords: coordGrammarNumber
    },
    "hex": {
      type: "custom",
      toGamut: true,
      test: (str) => /^#([a-f0-9]{3,4}){1,2}$/i.test(str),
      parse(str) {
        if (str.length <= 5) {
          str = str.replace(/[a-f0-9]/gi, "$&$&");
        }
        let rgba = [];
        str.replace(/[a-f0-9]{2}/gi, (component) => {
          rgba.push(parseInt(component, 16) / 255);
        });
        return {
          spaceId: "srgb",
          coords: rgba.slice(0, 3),
          alpha: rgba.slice(3)[0]
        };
      },
      serialize: (coords, alpha, {
        collapse = true
        // collapse to 3-4 digit hex when possible?
      } = {}) => {
        if (alpha < 1) {
          coords.push(alpha);
        }
        coords = coords.map((c4) => Math.round(c4 * 255));
        let collapsible = collapse && coords.every((c4) => c4 % 17 === 0);
        let hex = coords.map((c4) => {
          if (collapsible) {
            return (c4 / 17).toString(16);
          }
          return c4.toString(16).padStart(2, "0");
        }).join("");
        return "#" + hex;
      }
    },
    "keyword": {
      type: "custom",
      test: (str) => /^[a-z]+$/i.test(str),
      parse(str) {
        str = str.toLowerCase();
        let ret = { spaceId: "srgb", coords: null, alpha: 1 };
        if (str === "transparent") {
          ret.coords = KEYWORDS.black;
          ret.alpha = 0;
        } else {
          ret.coords = KEYWORDS[str];
        }
        if (ret.coords) {
          return ret;
        }
      }
    }
  }
});
var P3 = new RGBColorSpace({
  id: "p3",
  cssId: "display-p3",
  name: "P3",
  base: P3Linear,
  // Gamma encoding/decoding is the same as sRGB
  fromBase: sRGB.fromBase,
  toBase: sRGB.toBase
});
defaults.display_space = sRGB;
var supportsNone;
if (typeof CSS !== "undefined" && CSS.supports) {
  for (let space of [lab, REC2020, P3]) {
    let coords = space.getMinCoords();
    let color = { space, coords, alpha: 1 };
    let str = serialize(color);
    if (CSS.supports("color", str)) {
      defaults.display_space = space;
      break;
    }
  }
}
function display(color, { space = defaults.display_space, ...options } = {}) {
  let ret = serialize(color, options);
  if (typeof CSS === "undefined" || CSS.supports("color", ret) || !defaults.display_space) {
    ret = new String(ret);
    ret.color = color;
  } else {
    let fallbackColor = color;
    let hasNone = color.coords.some(isNone) || isNone(color.alpha);
    if (hasNone) {
      if (!(supportsNone ??= CSS.supports("color", "hsl(none 50% 50%)"))) {
        fallbackColor = clone2(color);
        fallbackColor.coords = fallbackColor.coords.map(skipNone);
        fallbackColor.alpha = skipNone(fallbackColor.alpha);
        ret = serialize(fallbackColor, options);
        if (CSS.supports("color", ret)) {
          ret = new String(ret);
          ret.color = fallbackColor;
          return ret;
        }
      }
    }
    fallbackColor = to(fallbackColor, space);
    ret = new String(serialize(fallbackColor, options));
    ret.color = fallbackColor;
  }
  return ret;
}
function equals2(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  return color1.space === color2.space && color1.alpha === color2.alpha && color1.coords.every((c4, i) => c4 === color2.coords[i]);
}
function getLuminance(color) {
  return get3(color, [xyz_d65, "y"]);
}
function setLuminance(color, value) {
  set(color, [xyz_d65, "y"], value);
}
function register$2(Color2) {
  Object.defineProperty(Color2.prototype, "luminance", {
    get() {
      return getLuminance(this);
    },
    set(value) {
      setLuminance(this, value);
    }
  });
}
var luminance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getLuminance,
  register: register$2,
  setLuminance
});
function contrastWCAG21(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  return (Y1 + 0.05) / (Y2 + 0.05);
}
var normBG = 0.56;
var normTXT = 0.57;
var revTXT = 0.62;
var revBG = 0.65;
var blkThrs = 0.022;
var blkClmp = 1.414;
var loClip = 0.1;
var deltaYmin = 5e-4;
var scaleBoW = 1.14;
var loBoWoffset = 0.027;
var scaleWoB = 1.14;
function fclamp(Y) {
  if (Y >= blkThrs) {
    return Y;
  }
  return Y + (blkThrs - Y) ** blkClmp;
}
function linearize(val) {
  let sign = val < 0 ? -1 : 1;
  let abs4 = Math.abs(val);
  return sign * Math.pow(abs4, 2.4);
}
function contrastAPCA(background, foreground) {
  foreground = getColor(foreground);
  background = getColor(background);
  let S;
  let C;
  let Sapc;
  let R, G, B;
  foreground = to(foreground, "srgb");
  [R, G, B] = foreground.coords;
  let lumTxt = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.072175;
  background = to(background, "srgb");
  [R, G, B] = background.coords;
  let lumBg = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.072175;
  let Ytxt = fclamp(lumTxt);
  let Ybg = fclamp(lumBg);
  let BoW = Ybg > Ytxt;
  if (Math.abs(Ybg - Ytxt) < deltaYmin) {
    C = 0;
  } else {
    if (BoW) {
      S = Ybg ** normBG - Ytxt ** normTXT;
      C = S * scaleBoW;
    } else {
      S = Ybg ** revBG - Ytxt ** revTXT;
      C = S * scaleWoB;
    }
  }
  if (Math.abs(C) < loClip) {
    Sapc = 0;
  } else if (C > 0) {
    Sapc = C - loBoWoffset;
  } else {
    Sapc = C + loBoWoffset;
  }
  return Sapc * 100;
}
function contrastMichelson(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  let denom = Y1 + Y2;
  return denom === 0 ? 0 : (Y1 - Y2) / denom;
}
var max5 = 5e4;
function contrastWeber(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  return Y2 === 0 ? max5 : (Y1 - Y2) / Y2;
}
function contrastLstar(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let L1 = get3(color1, [lab, "l"]);
  let L2 = get3(color2, [lab, "l"]);
  return Math.abs(L1 - L2);
}
var \u03B5$3 = 216 / 24389;
var \u03B53 = 24 / 116;
var \u03BA$2 = 24389 / 27;
var white$1 = WHITES.D65;
var lab_d65 = new ColorSpace({
  id: "lab-d65",
  name: "Lab D65",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D65, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: white$1,
  base: xyz_d65,
  // Convert D65-adapted XYZ to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(XYZ) {
    let xyz = XYZ.map((value, i) => value / white$1[i]);
    let f = xyz.map((value) => value > \u03B5$3 ? Math.cbrt(value) : (\u03BA$2 * value + 16) / 116);
    return [
      116 * f[1] - 16,
      // L
      500 * (f[0] - f[1]),
      // a
      200 * (f[1] - f[2])
      // b
    ];
  },
  // Convert Lab to D65-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(Lab) {
    let f = [];
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    let xyz = [
      f[0] > \u03B53 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA$2,
      Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA$2,
      f[2] > \u03B53 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA$2
    ];
    return xyz.map((value, i) => value * white$1[i]);
  },
  formats: {
    "lab-d65": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var phi = Math.pow(5, 0.5) * 0.5 + 0.5;
function contrastDeltaPhi(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Lstr1 = get3(color1, [lab_d65, "l"]);
  let Lstr2 = get3(color2, [lab_d65, "l"]);
  let deltaPhiStar = Math.abs(Math.pow(Lstr1, phi) - Math.pow(Lstr2, phi));
  let contrast2 = Math.pow(deltaPhiStar, 1 / phi) * Math.SQRT2 - 40;
  return contrast2 < 7.5 ? 0 : contrast2;
}
var contrastMethods = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  contrastAPCA,
  contrastDeltaPhi,
  contrastLstar,
  contrastMichelson,
  contrastWCAG21,
  contrastWeber
});
function contrast(background, foreground, o = {}) {
  if (isString(o)) {
    o = { algorithm: o };
  }
  let { algorithm, ...rest } = o;
  if (!algorithm) {
    let algorithms = Object.keys(contrastMethods).map((a2) => a2.replace(/^contrast/, "")).join(", ");
    throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${algorithms}`);
  }
  background = getColor(background);
  foreground = getColor(foreground);
  for (let a2 in contrastMethods) {
    if ("contrast" + algorithm.toLowerCase() === a2.toLowerCase()) {
      return contrastMethods[a2](background, foreground, rest);
    }
  }
  throw new TypeError(`Unknown contrast algorithm: ${algorithm}`);
}
function uv(color) {
  let [X, Y, Z] = getAll(color, xyz_d65);
  let denom = X + 15 * Y + 3 * Z;
  return [4 * X / denom, 9 * Y / denom];
}
function xy(color) {
  let [X, Y, Z] = getAll(color, xyz_d65);
  let sum4 = X + Y + Z;
  return [X / sum4, Y / sum4];
}
function register$1(Color2) {
  Object.defineProperty(Color2.prototype, "uv", {
    get() {
      return uv(this);
    }
  });
  Object.defineProperty(Color2.prototype, "xy", {
    get() {
      return xy(this);
    }
  });
}
var chromaticity = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  register: register$1,
  uv,
  xy
});
function deltaE(c12, c22, o = {}) {
  if (isString(o)) {
    o = { method: o };
  }
  let { method = defaults.deltaE, ...rest } = o;
  for (let m3 in deltaEMethods) {
    if ("deltae" + method.toLowerCase() === m3.toLowerCase()) {
      return deltaEMethods[m3](c12, c22, rest);
    }
  }
  throw new TypeError(`Unknown deltaE method: ${method}`);
}
function lighten(color, amount = 0.25) {
  let space = ColorSpace.get("oklch", "lch");
  let lightness = [space, "l"];
  return set(color, lightness, (l) => l * (1 + amount));
}
function darken(color, amount = 0.25) {
  let space = ColorSpace.get("oklch", "lch");
  let lightness = [space, "l"];
  return set(color, lightness, (l) => l * (1 - amount));
}
var variations = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  darken,
  lighten
});
function mix(c12, c22, p2 = 0.5, o = {}) {
  [c12, c22] = [getColor(c12), getColor(c22)];
  if (type(p2) === "object") {
    [p2, o] = [0.5, p2];
  }
  let r = range(c12, c22, o);
  return r(p2);
}
function steps(c12, c22, options = {}) {
  let colorRange;
  if (isRange(c12)) {
    [colorRange, options] = [c12, c22];
    [c12, c22] = colorRange.rangeArgs.colors;
  }
  let {
    maxDeltaE,
    deltaEMethod,
    steps: steps2 = 2,
    maxSteps = 1e3,
    ...rangeOptions
  } = options;
  if (!colorRange) {
    [c12, c22] = [getColor(c12), getColor(c22)];
    colorRange = range(c12, c22, rangeOptions);
  }
  let totalDelta = deltaE(c12, c22);
  let actualSteps = maxDeltaE > 0 ? Math.max(steps2, Math.ceil(totalDelta / maxDeltaE) + 1) : steps2;
  let ret = [];
  if (maxSteps !== void 0) {
    actualSteps = Math.min(actualSteps, maxSteps);
  }
  if (actualSteps === 1) {
    ret = [{ p: 0.5, color: colorRange(0.5) }];
  } else {
    let step = 1 / (actualSteps - 1);
    ret = Array.from({ length: actualSteps }, (_, i) => {
      let p2 = i * step;
      return { p: p2, color: colorRange(p2) };
    });
  }
  if (maxDeltaE > 0) {
    let maxDelta = ret.reduce((acc, cur, i) => {
      if (i === 0) {
        return 0;
      }
      let \u0394\u0395 = deltaE(cur.color, ret[i - 1].color, deltaEMethod);
      return Math.max(acc, \u0394\u0395);
    }, 0);
    while (maxDelta > maxDeltaE) {
      maxDelta = 0;
      for (let i = 1; i < ret.length && ret.length < maxSteps; i++) {
        let prev = ret[i - 1];
        let cur = ret[i];
        let p2 = (cur.p + prev.p) / 2;
        let color = colorRange(p2);
        maxDelta = Math.max(maxDelta, deltaE(color, prev.color), deltaE(color, cur.color));
        ret.splice(i, 0, { p: p2, color: colorRange(p2) });
        i++;
      }
    }
  }
  ret = ret.map((a2) => a2.color);
  return ret;
}
function range(color1, color2, options = {}) {
  if (isRange(color1)) {
    let [r, options2] = [color1, color2];
    return range(...r.rangeArgs.colors, { ...r.rangeArgs.options, ...options2 });
  }
  let { space, outputSpace, progression, premultiplied } = options;
  color1 = getColor(color1);
  color2 = getColor(color2);
  color1 = clone2(color1);
  color2 = clone2(color2);
  let rangeArgs = { colors: [color1, color2], options };
  if (space) {
    space = ColorSpace.get(space);
  } else {
    space = ColorSpace.registry[defaults.interpolationSpace] || color1.space;
  }
  outputSpace = outputSpace ? ColorSpace.get(outputSpace) : space;
  color1 = to(color1, space);
  color2 = to(color2, space);
  color1 = toGamut(color1);
  color2 = toGamut(color2);
  if (space.coords.h && space.coords.h.type === "angle") {
    let arc = options.hue = options.hue || "shorter";
    let hue = [space, "h"];
    let [\u03B81, \u03B82] = [get3(color1, hue), get3(color2, hue)];
    if (isNaN(\u03B81) && !isNaN(\u03B82)) {
      \u03B81 = \u03B82;
    } else if (isNaN(\u03B82) && !isNaN(\u03B81)) {
      \u03B82 = \u03B81;
    }
    [\u03B81, \u03B82] = adjust(arc, [\u03B81, \u03B82]);
    set(color1, hue, \u03B81);
    set(color2, hue, \u03B82);
  }
  if (premultiplied) {
    color1.coords = color1.coords.map((c4) => c4 * color1.alpha);
    color2.coords = color2.coords.map((c4) => c4 * color2.alpha);
  }
  return Object.assign((p2) => {
    p2 = progression ? progression(p2) : p2;
    let coords = color1.coords.map((start, i) => {
      let end = color2.coords[i];
      return interpolate5(start, end, p2);
    });
    let alpha = interpolate5(color1.alpha, color2.alpha, p2);
    let ret = { space, coords, alpha };
    if (premultiplied) {
      ret.coords = ret.coords.map((c4) => c4 / alpha);
    }
    if (outputSpace !== space) {
      ret = to(ret, outputSpace);
    }
    return ret;
  }, {
    rangeArgs
  });
}
function isRange(val) {
  return type(val) === "function" && !!val.rangeArgs;
}
defaults.interpolationSpace = "lab";
function register(Color2) {
  Color2.defineFunction("mix", mix, { returns: "color" });
  Color2.defineFunction("range", range, { returns: "function<color>" });
  Color2.defineFunction("steps", steps, { returns: "array<color>" });
}
var interpolation = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  isRange,
  mix,
  range,
  register,
  steps
});
var HSL = new ColorSpace({
  id: "hsl",
  name: "HSL",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: sRGB,
  // Adapted from https://drafts.csswg.org/css-color-4/better-rgbToHsl.js
  fromBase: (rgb) => {
    let max6 = Math.max(...rgb);
    let min6 = Math.min(...rgb);
    let [r, g2, b2] = rgb;
    let [h, s, l] = [NaN, 0, (min6 + max6) / 2];
    let d2 = max6 - min6;
    if (d2 !== 0) {
      s = l === 0 || l === 1 ? 0 : (max6 - l) / Math.min(l, 1 - l);
      switch (max6) {
        case r:
          h = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h = (b2 - r) / d2 + 2;
          break;
        case b2:
          h = (r - g2) / d2 + 4;
      }
      h = h * 60;
    }
    if (s < 0) {
      h += 180;
      s = Math.abs(s);
    }
    if (h >= 360) {
      h -= 360;
    }
    return [h, s * 100, l * 100];
  },
  // Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
  toBase: (hsl) => {
    let [h, s, l] = hsl;
    h = h % 360;
    if (h < 0) {
      h += 360;
    }
    s /= 100;
    l /= 100;
    function f(n2) {
      let k = (n2 + h / 30) % 12;
      let a2 = s * Math.min(l, 1 - l);
      return l - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    }
    return [f(0), f(8), f(4)];
  },
  formats: {
    "hsl": {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"]
    },
    "hsla": {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
      commas: true,
      lastAlpha: true
    }
  }
});
var HSV = new ColorSpace({
  id: "hsv",
  name: "HSV",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    v: {
      range: [0, 100],
      name: "Value"
    }
  },
  base: HSL,
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  fromBase(hsl) {
    let [h, s, l] = hsl;
    s /= 100;
    l /= 100;
    let v = l + s * Math.min(l, 1 - l);
    return [
      h,
      // h is the same
      v === 0 ? 0 : 200 * (1 - l / v),
      // s
      100 * v
    ];
  },
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  toBase(hsv) {
    let [h, s, v] = hsv;
    s /= 100;
    v /= 100;
    let l = v * (1 - s / 2);
    return [
      h,
      // h is the same
      l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l) * 100,
      l * 100
    ];
  },
  formats: {
    color: {
      id: "--hsv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var hwb = new ColorSpace({
  id: "hwb",
  name: "HWB",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    w: {
      range: [0, 100],
      name: "Whiteness"
    },
    b: {
      range: [0, 100],
      name: "Blackness"
    }
  },
  base: HSV,
  fromBase(hsv) {
    let [h, s, v] = hsv;
    return [h, v * (100 - s) / 100, 100 - v];
  },
  toBase(hwb2) {
    let [h, w, b2] = hwb2;
    w /= 100;
    b2 /= 100;
    let sum4 = w + b2;
    if (sum4 >= 1) {
      let gray = w / sum4;
      return [h, 0, gray * 100];
    }
    let v = 1 - b2;
    let s = v === 0 ? 0 : 1 - w / v;
    return [h, s * 100, v * 100];
  },
  formats: {
    "hwb": {
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var toXYZ_M$2 = [
  [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
  [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
  [0.02703136138641234, 0.07068885253582723, 0.9913375368376388]
];
var fromXYZ_M$2 = [
  [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
  [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
  [0.013444280632031142, -0.11836239223101838, 1.0151749943912054]
];
var A98Linear = new RGBColorSpace({
  id: "a98rgb-linear",
  cssId: "--a98-rgb-linear",
  name: "Linear Adobe\xAE 98 RGB compatible",
  white: "D65",
  toXYZ_M: toXYZ_M$2,
  fromXYZ_M: fromXYZ_M$2
});
var a98rgb = new RGBColorSpace({
  id: "a98rgb",
  cssId: "a98-rgb",
  name: "Adobe\xAE 98 RGB compatible",
  base: A98Linear,
  toBase: (RGB) => RGB.map((val) => Math.pow(Math.abs(val), 563 / 256) * Math.sign(val)),
  fromBase: (RGB) => RGB.map((val) => Math.pow(Math.abs(val), 256 / 563) * Math.sign(val))
});
var toXYZ_M$1 = [
  [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
  [0.2880748288194013, 0.711835234241873, 8993693872564e-17],
  [0, 0, 0.8251046025104602]
];
var fromXYZ_M$1 = [
  [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
  [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
  [0, 0, 1.2119675456389452]
];
var ProPhotoLinear = new RGBColorSpace({
  id: "prophoto-linear",
  cssId: "--prophoto-rgb-linear",
  name: "Linear ProPhoto",
  white: "D50",
  base: XYZ_D50,
  toXYZ_M: toXYZ_M$1,
  fromXYZ_M: fromXYZ_M$1
});
var Et = 1 / 512;
var Et2 = 16 / 512;
var prophoto = new RGBColorSpace({
  id: "prophoto",
  cssId: "prophoto-rgb",
  name: "ProPhoto",
  base: ProPhotoLinear,
  toBase(RGB) {
    return RGB.map((v) => v < Et2 ? v / 16 : v ** 1.8);
  },
  fromBase(RGB) {
    return RGB.map((v) => v >= Et ? v ** (1 / 1.8) : 16 * v);
  }
});
var oklch = new ColorSpace({
  id: "oklch",
  name: "Oklch",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    c: {
      refRange: [0, 0.4],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  white: "D65",
  base: OKLab,
  fromBase(oklab) {
    let [L, a2, b2] = oklab;
    let h;
    const \u03B52 = 2e-4;
    if (Math.abs(a2) < \u03B52 && Math.abs(b2) < \u03B52) {
      h = NaN;
    } else {
      h = Math.atan2(b2, a2) * 180 / Math.PI;
    }
    return [
      L,
      // OKLab L is still L
      Math.sqrt(a2 ** 2 + b2 ** 2),
      // Chroma
      constrain(h)
      // Hue, in degrees [0 to 360)
    ];
  },
  // Convert from polar form
  toBase(oklch2) {
    let [L, C, h] = oklch2;
    let a2, b2;
    if (isNaN(h)) {
      a2 = 0;
      b2 = 0;
    } else {
      a2 = C * Math.cos(h * Math.PI / 180);
      b2 = C * Math.sin(h * Math.PI / 180);
    }
    return [L, a2, b2];
  },
  formats: {
    "oklch": {
      coords: ["<percentage> | <number>", "<number> | <percentage>[0,1]", "<number> | <angle>"]
    }
  }
});
var white = WHITES.D65;
var \u03B5$2 = 216 / 24389;
var \u03BA$1 = 24389 / 27;
var [U_PRIME_WHITE, V_PRIME_WHITE] = uv({ space: xyz_d65, coords: white });
var Luv = new ColorSpace({
  id: "luv",
  name: "Luv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    // Reference ranges from https://facelessuser.github.io/coloraide/colors/luv/
    u: {
      refRange: [-215, 215]
    },
    v: {
      refRange: [-215, 215]
    }
  },
  white,
  base: xyz_d65,
  // Convert D65-adapted XYZ to Luv
  // https://en.wikipedia.org/wiki/CIELUV#The_forward_transformation
  fromBase(XYZ) {
    let xyz = [skipNone(XYZ[0]), skipNone(XYZ[1]), skipNone(XYZ[2])];
    let y = xyz[1];
    let [up, vp] = uv({ space: xyz_d65, coords: xyz });
    if (!Number.isFinite(up) || !Number.isFinite(vp)) {
      return [0, 0, 0];
    }
    let L = y <= \u03B5$2 ? \u03BA$1 * y : 116 * Math.cbrt(y) - 16;
    return [
      L,
      13 * L * (up - U_PRIME_WHITE),
      13 * L * (vp - V_PRIME_WHITE)
    ];
  },
  // Convert Luv to D65-adapted XYZ
  // https://en.wikipedia.org/wiki/CIELUV#The_reverse_transformation
  toBase(Luv2) {
    let [L, u, v] = Luv2;
    if (L === 0 || isNone(L)) {
      return [0, 0, 0];
    }
    u = skipNone(u);
    v = skipNone(v);
    let up = u / (13 * L) + U_PRIME_WHITE;
    let vp = v / (13 * L) + V_PRIME_WHITE;
    let y = L <= 8 ? L / \u03BA$1 : Math.pow((L + 16) / 116, 3);
    return [
      y * (9 * up / (4 * vp)),
      y,
      y * ((12 - 3 * up - 20 * vp) / (4 * vp))
    ];
  },
  formats: {
    color: {
      id: "--luv",
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var LCHuv = new ColorSpace({
  id: "lchuv",
  name: "LChuv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 220],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Luv,
  fromBase(Luv2) {
    let [L, u, v] = Luv2;
    let hue;
    const \u03B52 = 0.02;
    if (Math.abs(u) < \u03B52 && Math.abs(v) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(v, u) * 180 / Math.PI;
    }
    return [
      L,
      // L is still L
      Math.sqrt(u ** 2 + v ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(LCH) {
    let [Lightness, Chroma, Hue] = LCH;
    if (Chroma < 0) {
      Chroma = 0;
    }
    if (isNaN(Hue)) {
      Hue = 0;
    }
    return [
      Lightness,
      // L is still L
      Chroma * Math.cos(Hue * Math.PI / 180),
      // u
      Chroma * Math.sin(Hue * Math.PI / 180)
      // v
    ];
  },
  formats: {
    color: {
      id: "--lchuv",
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
var \u03B5$1 = 216 / 24389;
var \u03BA = 24389 / 27;
var m_r0 = fromXYZ_M$3[0][0];
var m_r1 = fromXYZ_M$3[0][1];
var m_r2 = fromXYZ_M$3[0][2];
var m_g0 = fromXYZ_M$3[1][0];
var m_g1 = fromXYZ_M$3[1][1];
var m_g2 = fromXYZ_M$3[1][2];
var m_b0 = fromXYZ_M$3[2][0];
var m_b1 = fromXYZ_M$3[2][1];
var m_b2 = fromXYZ_M$3[2][2];
function distanceFromOriginAngle(slope, intercept, angle) {
  const d2 = intercept / (Math.sin(angle) - slope * Math.cos(angle));
  return d2 < 0 ? Infinity : d2;
}
function calculateBoundingLines(l) {
  const sub1 = Math.pow(l + 16, 3) / 1560896;
  const sub2 = sub1 > \u03B5$1 ? sub1 : l / \u03BA;
  const s1r = sub2 * (284517 * m_r0 - 94839 * m_r2);
  const s2r = sub2 * (838422 * m_r2 + 769860 * m_r1 + 731718 * m_r0);
  const s3r = sub2 * (632260 * m_r2 - 126452 * m_r1);
  const s1g = sub2 * (284517 * m_g0 - 94839 * m_g2);
  const s2g = sub2 * (838422 * m_g2 + 769860 * m_g1 + 731718 * m_g0);
  const s3g = sub2 * (632260 * m_g2 - 126452 * m_g1);
  const s1b = sub2 * (284517 * m_b0 - 94839 * m_b2);
  const s2b = sub2 * (838422 * m_b2 + 769860 * m_b1 + 731718 * m_b0);
  const s3b = sub2 * (632260 * m_b2 - 126452 * m_b1);
  return {
    r0s: s1r / s3r,
    r0i: s2r * l / s3r,
    r1s: s1r / (s3r + 126452),
    r1i: (s2r - 769860) * l / (s3r + 126452),
    g0s: s1g / s3g,
    g0i: s2g * l / s3g,
    g1s: s1g / (s3g + 126452),
    g1i: (s2g - 769860) * l / (s3g + 126452),
    b0s: s1b / s3b,
    b0i: s2b * l / s3b,
    b1s: s1b / (s3b + 126452),
    b1i: (s2b - 769860) * l / (s3b + 126452)
  };
}
function calcMaxChromaHsluv(lines, h) {
  const hueRad = h / 360 * Math.PI * 2;
  const r0 = distanceFromOriginAngle(lines.r0s, lines.r0i, hueRad);
  const r1 = distanceFromOriginAngle(lines.r1s, lines.r1i, hueRad);
  const g0 = distanceFromOriginAngle(lines.g0s, lines.g0i, hueRad);
  const g1 = distanceFromOriginAngle(lines.g1s, lines.g1i, hueRad);
  const b0 = distanceFromOriginAngle(lines.b0s, lines.b0i, hueRad);
  const b1 = distanceFromOriginAngle(lines.b1s, lines.b1i, hueRad);
  return Math.min(r0, r1, g0, g1, b0, b1);
}
var hsluv = new ColorSpace({
  id: "hsluv",
  name: "HSLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: LCHuv,
  gamutSpace: sRGB,
  // Convert LCHuv to HSLuv
  fromBase(lch2) {
    let [l, c4, h] = [skipNone(lch2[0]), skipNone(lch2[1]), skipNone(lch2[2])];
    let s;
    if (l > 99.9999999) {
      s = 0;
      l = 100;
    } else if (l < 1e-8) {
      s = 0;
      l = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max6 = calcMaxChromaHsluv(lines, h);
      s = c4 / max6 * 100;
    }
    return [h, s, l];
  },
  // Convert HSLuv to LCHuv
  toBase(hsl) {
    let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
    let c4;
    if (l > 99.9999999) {
      l = 100;
      c4 = 0;
    } else if (l < 1e-8) {
      l = 0;
      c4 = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max6 = calcMaxChromaHsluv(lines, h);
      c4 = max6 / 100 * s;
    }
    return [l, c4, h];
  },
  formats: {
    color: {
      id: "--hsluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
fromXYZ_M$3[0][0];
fromXYZ_M$3[0][1];
fromXYZ_M$3[0][2];
fromXYZ_M$3[1][0];
fromXYZ_M$3[1][1];
fromXYZ_M$3[1][2];
fromXYZ_M$3[2][0];
fromXYZ_M$3[2][1];
fromXYZ_M$3[2][2];
function distanceFromOrigin(slope, intercept) {
  return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
}
function calcMaxChromaHpluv(lines) {
  let r0 = distanceFromOrigin(lines.r0s, lines.r0i);
  let r1 = distanceFromOrigin(lines.r1s, lines.r1i);
  let g0 = distanceFromOrigin(lines.g0s, lines.g0i);
  let g1 = distanceFromOrigin(lines.g1s, lines.g1i);
  let b0 = distanceFromOrigin(lines.b0s, lines.b0i);
  let b1 = distanceFromOrigin(lines.b1s, lines.b1i);
  return Math.min(r0, r1, g0, g1, b0, b1);
}
var hpluv = new ColorSpace({
  id: "hpluv",
  name: "HPLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: LCHuv,
  gamutSpace: "self",
  // Convert LCHuv to HPLuv
  fromBase(lch2) {
    let [l, c4, h] = [skipNone(lch2[0]), skipNone(lch2[1]), skipNone(lch2[2])];
    let s;
    if (l > 99.9999999) {
      s = 0;
      l = 100;
    } else if (l < 1e-8) {
      s = 0;
      l = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max6 = calcMaxChromaHpluv(lines);
      s = c4 / max6 * 100;
    }
    return [h, s, l];
  },
  // Convert HPLuv to LCHuv
  toBase(hsl) {
    let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
    let c4;
    if (l > 99.9999999) {
      l = 100;
      c4 = 0;
    } else if (l < 1e-8) {
      l = 0;
      c4 = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max6 = calcMaxChromaHpluv(lines);
      c4 = max6 / 100 * s;
    }
    return [l, c4, h];
  },
  formats: {
    color: {
      id: "--hpluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var Yw = 203;
var n = 2610 / 2 ** 14;
var ninv = 2 ** 14 / 2610;
var m = 2523 / 2 ** 5;
var minv = 2 ** 5 / 2523;
var c1 = 3424 / 2 ** 12;
var c2 = 2413 / 2 ** 7;
var c3 = 2392 / 2 ** 7;
var rec2100Pq = new RGBColorSpace({
  id: "rec2100pq",
  cssId: "rec2100-pq",
  name: "REC.2100-PQ",
  base: REC2020Linear,
  toBase(RGB) {
    return RGB.map(function(val) {
      let x = (Math.max(val ** minv - c1, 0) / (c2 - c3 * val ** minv)) ** ninv;
      return x * 1e4 / Yw;
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      let x = Math.max(val * Yw / 1e4, 0);
      let num = c1 + c2 * x ** n;
      let denom = 1 + c3 * x ** n;
      return (num / denom) ** m;
    });
  }
});
var a = 0.17883277;
var b = 0.28466892;
var c = 0.55991073;
var scale2 = 3.7743;
var rec2100Hlg = new RGBColorSpace({
  id: "rec2100hlg",
  cssId: "rec2100-hlg",
  name: "REC.2100-HLG",
  referred: "scene",
  base: REC2020Linear,
  toBase(RGB) {
    return RGB.map(function(val) {
      if (val <= 0.5) {
        return val ** 2 / 3 * scale2;
      }
      return (Math.exp((val - c) / a) + b) / 12 * scale2;
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      val /= scale2;
      if (val <= 1 / 12) {
        return Math.sqrt(3 * val);
      }
      return a * Math.log(12 * val - b) + c;
    });
  }
});
var CATs = {};
hooks.add("chromatic-adaptation-start", (env) => {
  if (env.options.method) {
    env.M = adapt(env.W1, env.W2, env.options.method);
  }
});
hooks.add("chromatic-adaptation-end", (env) => {
  if (!env.M) {
    env.M = adapt(env.W1, env.W2, env.options.method);
  }
});
function defineCAT({ id, toCone_M, fromCone_M }) {
  CATs[id] = arguments[0];
}
function adapt(W1, W2, id = "Bradford") {
  let method = CATs[id];
  let [\u03C1s, \u03B3s, \u03B2s] = multiplyMatrices(method.toCone_M, W1);
  let [\u03C1d, \u03B3d, \u03B2d] = multiplyMatrices(method.toCone_M, W2);
  let scale4 = [
    [\u03C1d / \u03C1s, 0, 0],
    [0, \u03B3d / \u03B3s, 0],
    [0, 0, \u03B2d / \u03B2s]
  ];
  let scaled_cone_M = multiplyMatrices(scale4, method.toCone_M);
  let adapt_M = multiplyMatrices(method.fromCone_M, scaled_cone_M);
  return adapt_M;
}
defineCAT({
  id: "von Kries",
  toCone_M: [
    [0.40024, 0.7076, -0.08081],
    [-0.2263, 1.16532, 0.0457],
    [0, 0, 0.91822]
  ],
  fromCone_M: [
    [1.8599363874558397, -1.1293816185800916, 0.21989740959619328],
    [0.3611914362417676, 0.6388124632850422, -6370596838649899e-21],
    [0, 0, 1.0890636230968613]
  ]
});
defineCAT({
  id: "Bradford",
  // Convert an array of XYZ values in the range 0.0 - 1.0
  // to cone fundamentals
  toCone_M: [
    [0.8951, 0.2664, -0.1614],
    [-0.7502, 1.7135, 0.0367],
    [0.0389, -0.0685, 1.0296]
  ],
  // and back
  fromCone_M: [
    [0.9869929054667121, -0.14705425642099013, 0.15996265166373122],
    [0.4323052697233945, 0.5183602715367774, 0.049291228212855594],
    [-0.00852866457517732, 0.04004282165408486, 0.96848669578755]
  ]
});
defineCAT({
  id: "CAT02",
  // with complete chromatic adaptation to W2, so D = 1.0
  toCone_M: [
    [0.7328, 0.4296, -0.1624],
    [-0.7036, 1.6975, 61e-4],
    [3e-3, 0.0136, 0.9834]
  ],
  fromCone_M: [
    [1.0961238208355142, -0.27886900021828726, 0.18274517938277307],
    [0.4543690419753592, 0.4735331543074117, 0.07209780371722911],
    [-0.009627608738429355, -0.00569803121611342, 1.0153256399545427]
  ]
});
defineCAT({
  id: "CAT16",
  toCone_M: [
    [0.401288, 0.650173, -0.051461],
    [-0.250268, 1.204414, 0.045854],
    [-2079e-6, 0.048952, 0.953127]
  ],
  // the extra precision is needed to avoid roundtripping errors
  fromCone_M: [
    [1.862067855087233, -1.0112546305316845, 0.14918677544445172],
    [0.3875265432361372, 0.6214474419314753, -0.008973985167612521],
    [-0.01584149884933386, -0.03412293802851557, 1.0499644368778496]
  ]
});
Object.assign(WHITES, {
  // whitepoint values from ASTM E308-01 with 10nm spacing, 1931 2 degree observer
  // all normalized to Y (luminance) = 1.00000
  // Illuminant A is a tungsten electric light, giving a very warm, orange light.
  A: [1.0985, 1, 0.35585],
  // Illuminant C was an early approximation to daylight: illuminant A with a blue filter.
  C: [0.98074, 1, 1.18232],
  // The daylight series of illuminants simulate natural daylight.
  // The color temperature (in degrees Kelvin/100) ranges from
  // cool, overcast daylight (D50) to bright, direct sunlight (D65).
  D55: [0.95682, 1, 0.92149],
  D75: [0.94972, 1, 1.22638],
  // Equal-energy illuminant, used in two-stage CAT16
  E: [1, 1, 1],
  // The F series of illuminants represent fluorescent lights
  F2: [0.99186, 1, 0.67393],
  F7: [0.95041, 1, 1.08747],
  F11: [1.00962, 1, 0.6435]
});
WHITES.ACES = [0.32168 / 0.33767, 1, (1 - 0.32168 - 0.33767) / 0.33767];
var toXYZ_M = [
  [0.6624541811085053, 0.13400420645643313, 0.1561876870049078],
  [0.27222871678091454, 0.6740817658111484, 0.05368951740793705],
  [-0.005574649490394108, 0.004060733528982826, 1.0103391003129971]
];
var fromXYZ_M = [
  [1.6410233796943257, -0.32480329418479, -0.23642469523761225],
  [-0.6636628587229829, 1.6153315916573379, 0.016756347685530137],
  [0.011721894328375376, -0.008284441996237409, 0.9883948585390215]
];
var ACEScg = new RGBColorSpace({
  id: "acescg",
  cssId: "--acescg",
  name: "ACEScg",
  // ACEScg – A scene-referred, linear-light encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescg/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  coords: {
    r: {
      range: [0, 65504],
      name: "Red"
    },
    g: {
      range: [0, 65504],
      name: "Green"
    },
    b: {
      range: [0, 65504],
      name: "Blue"
    }
  },
  referred: "scene",
  white: WHITES.ACES,
  toXYZ_M,
  fromXYZ_M
});
var \u03B5 = 2 ** -16;
var ACES_min_nonzero = -0.35828683;
var ACES_cc_max = (Math.log2(65504) + 9.72) / 17.52;
var acescc = new RGBColorSpace({
  id: "acescc",
  cssId: "--acescc",
  name: "ACEScc",
  // see S-2014-003 ACEScc – A Logarithmic Encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescc/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  // Appendix A: "Very small ACES scene referred values below 7 1/4 stops
  // below 18% middle gray are encoded as negative ACEScc values.
  // These values should be preserved per the encoding in Section 4.4
  // so that all positive ACES values are maintained."
  coords: {
    r: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Red"
    },
    g: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Green"
    },
    b: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Blue"
    }
  },
  referred: "scene",
  base: ACEScg,
  // from section 4.4.2 Decoding Function
  toBase(RGB) {
    const low = (9.72 - 15) / 17.52;
    return RGB.map(function(val) {
      if (val <= low) {
        return (2 ** (val * 17.52 - 9.72) - \u03B5) * 2;
      } else if (val < ACES_cc_max) {
        return 2 ** (val * 17.52 - 9.72);
      } else {
        return 65504;
      }
    });
  },
  // Non-linear encoding function from S-2014-003, section 4.4.1 Encoding Function
  fromBase(RGB) {
    return RGB.map(function(val) {
      if (val <= 0) {
        return (Math.log2(\u03B5) + 9.72) / 17.52;
      } else if (val < \u03B5) {
        return (Math.log2(\u03B5 + val * 0.5) + 9.72) / 17.52;
      } else {
        return (Math.log2(val) + 9.72) / 17.52;
      }
    });
  }
  // encoded media white (rgb 1,1,1) => linear  [ 222.861, 222.861, 222.861 ]
  // encoded media black (rgb 0,0,0) => linear [ 0.0011857, 0.0011857, 0.0011857]
});
var spaces = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  A98RGB: a98rgb,
  A98RGB_Linear: A98Linear,
  ACEScc: acescc,
  ACEScg,
  CAM16_JMh: cam16,
  HCT: hct,
  HPLuv: hpluv,
  HSL,
  HSLuv: hsluv,
  HSV,
  HWB: hwb,
  ICTCP: ictcp,
  JzCzHz: jzczhz,
  Jzazbz,
  LCH: lch,
  LCHuv,
  Lab: lab,
  Lab_D65: lab_d65,
  Luv,
  OKLCH: oklch,
  OKLab,
  P3,
  P3_Linear: P3Linear,
  ProPhoto: prophoto,
  ProPhoto_Linear: ProPhotoLinear,
  REC_2020: REC2020,
  REC_2020_Linear: REC2020Linear,
  REC_2100_HLG: rec2100Hlg,
  REC_2100_PQ: rec2100Pq,
  XYZ_ABS_D65: XYZ_Abs_D65,
  XYZ_D50,
  XYZ_D65: xyz_d65,
  sRGB,
  sRGB_Linear: sRGBLinear
});
var Color = class _Color {
  /**
   * Creates an instance of Color.
   * Signatures:
   * - `new Color(stringToParse)`
   * - `new Color(otherColor)`
   * - `new Color({space, coords, alpha})`
   * - `new Color(space, coords, alpha)`
   * - `new Color(spaceId, coords, alpha)`
   */
  constructor(...args) {
    let color;
    if (args.length === 1) {
      color = getColor(args[0]);
    }
    let space, coords, alpha;
    if (color) {
      space = color.space || color.spaceId;
      coords = color.coords;
      alpha = color.alpha;
    } else {
      [space, coords, alpha] = args;
    }
    Object.defineProperty(this, "space", {
      value: ColorSpace.get(space),
      writable: false,
      enumerable: true,
      configurable: true
      // see note in https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
    });
    this.coords = coords ? coords.slice() : [0, 0, 0];
    this.alpha = alpha > 1 || alpha === void 0 ? 1 : alpha < 0 ? 0 : alpha;
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i] === "NaN") {
        this.coords[i] = NaN;
      }
    }
    for (let id in this.space.coords) {
      Object.defineProperty(this, id, {
        get: () => this.get(id),
        set: (value) => this.set(id, value)
      });
    }
  }
  get spaceId() {
    return this.space.id;
  }
  clone() {
    return new _Color(this.space, this.coords, this.alpha);
  }
  toJSON() {
    return {
      spaceId: this.spaceId,
      coords: this.coords,
      alpha: this.alpha
    };
  }
  display(...args) {
    let ret = display(this, ...args);
    ret.color = new _Color(ret.color);
    return ret;
  }
  /**
   * Get a color from the argument passed
   * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
   */
  static get(color, ...args) {
    if (color instanceof _Color) {
      return color;
    }
    return new _Color(color, ...args);
  }
  static defineFunction(name, code, o = code) {
    let { instance = true, returns } = o;
    let func2 = function(...args) {
      let ret = code(...args);
      if (returns === "color") {
        ret = _Color.get(ret);
      } else if (returns === "function<color>") {
        let f = ret;
        ret = function(...args2) {
          let ret2 = f(...args2);
          return _Color.get(ret2);
        };
        Object.assign(ret, f);
      } else if (returns === "array<color>") {
        ret = ret.map((c4) => _Color.get(c4));
      }
      return ret;
    };
    if (!(name in _Color)) {
      _Color[name] = func2;
    }
    if (instance) {
      _Color.prototype[name] = function(...args) {
        return func2(this, ...args);
      };
    }
  }
  static defineFunctions(o) {
    for (let name in o) {
      _Color.defineFunction(name, o[name], o[name]);
    }
  }
  static extend(exports) {
    if (exports.register) {
      exports.register(_Color);
    } else {
      for (let name in exports) {
        _Color.defineFunction(name, exports[name]);
      }
    }
  }
};
Color.defineFunctions({
  get: get3,
  getAll,
  set,
  setAll,
  to,
  equals: equals2,
  inGamut,
  toGamut,
  distance: distance3,
  toString: serialize
});
Object.assign(Color, {
  util,
  hooks,
  WHITES,
  Space: ColorSpace,
  spaces: ColorSpace.registry,
  parse,
  // Global defaults one may want to configure
  defaults
});
for (let key of Object.keys(spaces)) {
  ColorSpace.register(spaces[key]);
}
for (let id in ColorSpace.registry) {
  addSpaceAccessors(id, ColorSpace.registry[id]);
}
hooks.add("colorspace-init-end", (space) => {
  addSpaceAccessors(space.id, space);
  space.aliases?.forEach((alias) => {
    addSpaceAccessors(alias, space);
  });
});
function addSpaceAccessors(id, space) {
  let propId = id.replace(/-/g, "_");
  Object.defineProperty(Color.prototype, propId, {
    // Convert coords to coords in another colorspace and return them
    // Source colorspace: this.spaceId
    // Target colorspace: id
    get() {
      let ret = this.getAll(id);
      if (typeof Proxy === "undefined") {
        return ret;
      }
      return new Proxy(ret, {
        has: (obj, property) => {
          try {
            ColorSpace.resolveCoord([space, property]);
            return true;
          } catch (e) {
          }
          return Reflect.has(obj, property);
        },
        get: (obj, property, receiver) => {
          if (property && typeof property !== "symbol" && !(property in obj)) {
            let { index } = ColorSpace.resolveCoord([space, property]);
            if (index >= 0) {
              return obj[index];
            }
          }
          return Reflect.get(obj, property, receiver);
        },
        set: (obj, property, value, receiver) => {
          if (property && typeof property !== "symbol" && !(property in obj) || property >= 0) {
            let { index } = ColorSpace.resolveCoord([space, property]);
            if (index >= 0) {
              obj[index] = value;
              this.setAll(id, obj);
              return true;
            }
          }
          return Reflect.set(obj, property, value, receiver);
        }
      });
    },
    // Convert coords in another colorspace to internal coords and set them
    // Target colorspace: this.spaceId
    // Source colorspace: id
    set(coords) {
      this.setAll(id, coords);
    },
    configurable: true,
    enumerable: true
  });
}
Color.extend(deltaEMethods);
Color.extend({ deltaE });
Object.assign(Color, { deltaEMethods });
Color.extend(variations);
Color.extend({ contrast });
Color.extend(chromaticity);
Color.extend(luminance);
Color.extend(interpolation);
Color.extend(contrastMethods);

// src/visual/colour/Oklch.ts
var oklchToColorJs = (lch2) => {
  throwNumberTest(lch2.l, `percentage`, `lch.l`);
  throwNumberTest(lch2.c, `percentage`, `lch.c`);
  throwNumberTest(lch2.h, `percentage`, `lch.h`);
  throwNumberTest(lch2.opacity, `percentage`, `lch.opacity`);
  return {
    alpha: lch2.opacity,
    coords: [lch2.l, lch2.c * 0.4, lch2.h * 360],
    spaceId: `oklch`
  };
};
var isOklch = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  if (p2.space !== `oklch`) return false;
  if (p2.l === void 0) return false;
  if (p2.c === void 0) return false;
  if (p2.h === void 0) return false;
  return true;
};

// src/visual/colour/ResolveCss.ts
var resolveCss = (colour2, fallback) => {
  if (typeof colour2 === `string`) {
    if (colour2.startsWith(`--`)) {
      const value = getComputedStyle(document.body).getPropertyValue(colour2);
      if (!value || value.length === 0) {
        if (!fallback) throw new Error(`Variable not found: ${colour2}`);
        return fallback;
      }
      return colour2;
    }
  }
  return colour2;
};
var getCssVariable = (name, fallbackColour = `black`, root) => {
  if (root === void 0) root = document.body;
  if (name.startsWith(`--`)) name = name.slice(2);
  const fromCss = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
  if (fromCss === void 0 || fromCss.length === 0) return fallbackColour;
  return fromCss;
};

// src/visual/colour/Rgb.ts
var relativeFromAbsolute = (r, g2, b2, opacity = 255) => {
  r = clamp(r / 255);
  g2 = clamp(g2 / 255);
  b2 = clamp(b2 / 255);
  opacity = clamp(opacity / 255);
  return {
    r,
    g: g2,
    b: b2,
    opacity,
    unit: `relative`,
    space: `srgb`
  };
};
var rgbToRelative = (rgb) => {
  if (rgb.unit === `relative`) return rgb;
  return relativeFromAbsolute(rgb.r, rgb.g, rgb.b, rgb.opacity);
};
var isRgb = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  const space = p2.space;
  if (space !== `srgb` && space !== void 0) return false;
  const pp = p2;
  if (pp.r === void 0) return false;
  if (pp.g === void 0) return false;
  if (pp.b === void 0) return false;
  return true;
};
var rgbToColorJs = (rgb) => {
  const rel = rgbToRelative(rgb);
  return {
    alpha: rel.opacity,
    coords: [rgb.r, rgb.g, rgb.b],
    spaceId: `sRGB`
  };
};
var toRgb = (colour2) => {
  if (typeof colour2 === `string` && colour2 === `transparent`) return { r: 1, g: 1, b: 1, opacity: 0, space: `srgb`, unit: `relative` };
  if (isRgb(colour2)) {
    return rgbToRelative(colour2);
  } else if (isHsl(colour2)) {
    const hslRel = hslToRelative(colour2);
    const c4 = new Color(`hsl`, [hslRel.h, hslRel.s, hslRel.l], hslRel.opacity ?? 1);
    const rgb = c4.srgb;
    return { r: rgb[0], g: rgb[1], b: rgb[2], opacity: c4.alpha, unit: `relative`, space: `srgb` };
  } else if (isOklch(colour2)) {
    const c4 = new Color(`oklch`, [colour2.l, colour2.c, colour2.h], colour2.opacity ?? 1);
    const rgb = c4.srgb;
    return { r: rgb[0], g: rgb[1], b: rgb[2], opacity: c4.alpha, unit: `relative`, space: `srgb` };
  } else {
    const c4 = new Color(resolveCss(colour2));
    const rgb = c4.srgb;
    return { r: rgb[0], g: rgb[1], b: rgb[2], opacity: c4.alpha, unit: `relative`, space: `srgb` };
  }
};
var toRgb8bit = (rgb, clamped = true) => {
  if (rgb.unit === `8bit`) return rgb;
  let r = rgb.r * 255;
  let g2 = rgb.g * 255;
  let b2 = rgb.b * 255;
  let opacity = (rgb.opacity ?? 1) * 255;
  if (clamped) {
    r = clamp(r, 0, 255);
    g2 = clamp(g2, 0, 255);
    b2 = clamp(b2, 0, 255);
    opacity = clamp(opacity, 0, 255);
  }
  return { r, g: g2, b: b2, opacity, unit: `8bit`, space: `srgb` };
};
var toRgbRelative = (rgb, clamped = true) => {
  if (rgb.unit === `relative`) return rgb;
  if (rgb.unit === `8bit`) {
    let r = rgb.r / 255;
    let g2 = rgb.g / 255;
    let b2 = rgb.b / 255;
    let opacity = (rgb.opacity ?? 255) / 255;
    if (clamped) {
      r = clamp(r);
      g2 = clamp(g2);
      b2 = clamp(b2);
      opacity = clamp(opacity);
    }
    return {
      r,
      g: g2,
      b: b2,
      opacity,
      unit: `relative`,
      space: `srgb`
    };
  } else {
    throw new Error(`Unknown unit. Expected '8bit'`);
  }
};
var parseRgbObject = (p2) => {
  if (p2 === void 0 || p2 === null) return { success: false, error: `Undefined/null` };
  if (typeof p2 !== `object`) return { success: false, error: `Not an object` };
  const space = p2.space ?? `srgb`;
  let { r, g: g2, b: b2, opacity } = p2;
  if (r !== void 0 || g2 !== void 0 || b2 !== void 0) {
  } else {
    const { red, green, blue } = p2;
    if (red !== void 0 || green !== void 0 || blue !== void 0) {
      r = red;
      g2 = green;
      b2 = blue;
    } else return { success: false, error: `Does not contain r,g,b or red,green,blue` };
  }
  let unit = p2.unit;
  if (unit === `relative`) {
    if (r > 1 || r < 0) return { success: false, error: `Relative units, but 'r' exceeds 0..1` };
    if (g2 > 1 || g2 < 0) return { success: false, error: `Relative units, but 'g' exceeds 0..1` };
    if (b2 > 1 || b2 < 0) return { success: false, error: `Relative units, but 'b' exceeds 0..1` };
    if (opacity > 1 || opacity < 0) return { success: false, error: `Relative units, but opacity exceeds 0..1` };
  } else if (unit === `8bit`) {
    if (r > 255 || r < 0) return { success: false, error: `8bit units, but r exceeds 0..255` };
    if (g2 > 255 || g2 < 0) return { success: false, error: `8bit units, but g exceeds 0..255` };
    if (b2 > 255 || b2 < 0) return { success: false, error: `8bit units, but b exceeds 0..255` };
    if (opacity > 255 || opacity < 0) return { success: false, error: `8bit units, but opacity exceeds 0..255` };
  } else if (!unit) {
    if (r > 1 || g2 > 1 || b2 > 1) {
      if (r <= 255 && g2 <= 255 && b2 <= 255) {
        unit = `8bit`;
      } else return { success: false, error: `Unknown units, outside 0..255 range` };
    } else if (r <= 1 && g2 <= 1 && b2 <= 1) {
      if (r >= 0 && g2 >= 0 && b2 >= 0) {
        unit = `relative`;
      } else return { success: false, error: `Unknown units, outside of 0..1 range` };
    } else return { success: false, error: `Unknown units for r,g,b,opacity values` };
  }
  if (opacity === void 0) {
    opacity = unit === `8bit` ? 255 : 1;
  }
  const c4 = {
    r,
    g: g2,
    b: b2,
    opacity,
    unit,
    space
  };
  return { success: true, value: c4 };
};

// src/visual/colour/Hsl.ts
var hslToColorJs = (hsl) => {
  const rel = hslToRelative(hsl);
  return {
    alpha: rel.opacity,
    coords: [rel.h, rel.s, rel.l],
    spaceId: `hsl`
  };
};
var isHsl = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  const pp = p2;
  if (pp.h === void 0) return false;
  if (pp.s === void 0) return false;
  if (pp.l === void 0) return false;
  if (pp.unit === `relative`) {
    throwNumberTest(pp.h, `percentage`, `h`);
    throwNumberTest(pp.s, `percentage`, `s`);
    throwNumberTest(pp.l, `percentage`, `l`);
    throwNumberTest(pp.opacity, `percentage`, `opacity`);
  }
  return true;
};
var hslToString = (hsl) => {
  const { h, s, l, opacity } = hslToAbsolute(hsl, true);
  return `hsl(${h}deg ${s}% ${l}% / ${opacity}%)`;
};
var hslToAbsolute = (hsl, safe) => {
  if (hsl.unit === `absolute`) return hsl;
  const h = hsl.h === null ? safe ? 0 : null : hsl.h;
  const opacity = hsl.opacity === void 0 ? 1 : hsl.opacity;
  throwNumberTest(h, `percentage`, `hsl.h`);
  throwNumberTest(hsl.s, `percentage`, `hsl.s`);
  throwNumberTest(hsl.l, `percentage`, `hsl.l`);
  throwNumberTest(opacity, `percentage`, `hsl.opacity`);
  return {
    h: h * 360,
    s: hsl.s * 100,
    l: hsl.l * 100,
    opacity: opacity * 100,
    unit: `absolute`,
    space: `hsl`
  };
};
var hslFromRelativeValues = (h = 1, s = 1, l = 0.5, opacity = 1) => {
  return {
    h,
    s,
    l,
    opacity,
    unit: `relative`,
    space: `hsl`
  };
};
var hslFromAbsoluteValues = (h, s, l, opacity = 100, safe = false) => {
  const hTest = numberInclusiveRangeTest(h, 0, 360, `h`);
  if (!hTest[0]) {
    if (safe) h = 0;
    else throwFromResult(hTest);
  }
  throwFromResult(numberInclusiveRangeTest(s, 0, 100, `s`));
  throwFromResult(numberInclusiveRangeTest(l, 0, 100, `l`));
  throwFromResult(numberInclusiveRangeTest(opacity, 0, 100, `opacity`));
  if (s > 100) throw new Error(`Param 's' expected 0..100`);
  if (l > 100) throw new Error(`Param 'l' expected 0..100`);
  h = clamp(h / 360);
  s = s / 100;
  l = l / 100;
  return {
    h,
    s,
    l,
    opacity,
    unit: `relative`,
    space: `hsl`
  };
};
var hslToRelative = (hsl, safe = true) => {
  if (hsl.unit === `relative`) return hsl;
  return hslFromAbsoluteValues(hsl.h, hsl.s, hsl.l, hsl.opacity, safe);
};
var toHsl = (colour2, safe = true) => {
  if (typeof colour2 === `string` && colour2 === `transparent`) return { h: 0, s: 0, l: 0, opacity: 0, space: `hsl`, unit: `relative` };
  if (!colour2 && !safe) throw new Error(`Param 'colour' is undefined`);
  if (isHsl(colour2)) {
    return hslToRelative(colour2);
  } else if (isRgb(colour2)) {
    const rgb = toRgbRelative(colour2);
    const c4 = new Color(`sRGB`, [rgb.r, rgb.g, rgb.b], rgb.opacity ?? 1);
    const [h, s, l] = c4.hsl.map((v) => parseFloat(v));
    return hslFromAbsoluteValues(h, s, l, parseFloat(c4.alpha), safe);
  } else if (isOklch(colour2)) {
    const c4 = new Color(`oklch`, [colour2.l, colour2.c, colour2.h], colour2.opacity ?? 1);
    const [h, s, l] = c4.hsl.map((v) => parseFloat(v));
    return hslFromAbsoluteValues(h, s, l, parseFloat(c4.alpha), safe);
  } else {
    const c4 = new Color(resolveCss(colour2));
    const [h, s, l] = c4.hsl.map((v) => parseFloat(v));
    return hslFromAbsoluteValues(h, s, l, parseFloat(c4.alpha), safe);
  }
};

// src/visual/colour/ResolveToColorJs.ts
var structuredToColorJsConstructor = (colour2) => {
  if (isHsl(colour2)) {
    return hslToColorJs(colour2);
  }
  if (isRgb(colour2)) {
    return rgbToColorJs(colour2);
  }
  if (isOklch(colour2)) {
    return oklchToColorJs(colour2);
  }
  const c4 = new Color(resolveCss(colour2));
  return {
    alpha: c4.alpha,
    coords: c4.coords,
    spaceId: c4.spaceId
  };
};
var structuredToColorJs = (colour2) => {
  const cc = structuredToColorJsConstructor(colour2);
  return new Color(cc.spaceId, cc.coords, cc.alpha);
};

// src/visual/colour/ToString.ts
var toHex = (colour2) => {
  if (typeof colour2 === `string` && colour2 === `transparent`) return `#00000000`;
  const cc = structuredToColorJsConstructor(colour2);
  const c4 = new Color(cc.spaceId, cc.coords, cc.alpha);
  return c4.to(`srgb`).toString({ format: `hex`, collapse: false });
};
var toString4 = (colour2) => {
  const c4 = structuredToColorJs(colour2);
  return c4.display();
};
var toStringFirst = (...colours) => {
  for (const colour2 of colours) {
    if (colour2 === void 0) continue;
    if (colour2 === null) continue;
    try {
      const c4 = structuredToColorJs(colour2);
      return c4.display();
    } catch (_error) {
      return colour2.toString();
    }
  }
  return `rebeccapurple`;
};

// src/visual/colour/Interpolate.ts
var interpolator2 = (colours, opts = {}) => {
  const space = opts.space ?? `lch`;
  const hue = opts.hue ?? `shorter`;
  const pieces = interpolatorInit(colours);
  const ranges = pieces.map((piece) => piece[0].range(piece[1], { space, hue }));
  return (amt) => {
    amt = clamp(amt);
    const s = scale(amt, 0, 1, 0, ranges.length);
    const index = Math.floor(s);
    const amtAdjusted = s - index;
    return ranges[index](amtAdjusted);
  };
};
var interpolatorInit = (colours) => {
  if (!Array.isArray(colours)) throw new Error(`Param 'colours' is not an array as expected. Got: ${typeof colours}`);
  if (colours.length < 2) throw new Error(`Param 'colours' should be at least two in length. Got: ${colours.length}`);
  const c4 = colours.map((colour2) => {
    const c5 = structuredToColorJsConstructor(colour2);
    return new Color(c5.spaceId, c5.coords, c5.alpha);
  });
  return [...pairwise(c4)];
};
var cssLinearGradient = (colours) => {
  const c4 = colours.map((c5) => toString4(c5));
  return `linear-gradient(to right, ${c4.join(`, `)})`;
};
var scale3 = (colours, numberOfSteps, opts = {}) => {
  const space = opts.space ?? `lch`;
  const hue = opts.hue ?? `shorter`;
  const pieces = interpolatorInit(colours);
  const stepsPerPair = Math.floor(numberOfSteps / pieces.length);
  const steps2 = pieces.map((piece) => piece[0].steps(
    piece[1],
    { space, hue, steps: stepsPerPair, outputSpace: `srgb` }
  ));
  return steps2.flat();
};

// src/visual/colour/Math.ts
var multiplyOpacity = (colour2, amt) => {
  throwNumberTest(amt, `percentage`, `amt`);
  const c4 = structuredToColorJs(colour2);
  const alpha = clamp((c4.alpha ?? 0) * amt);
  c4.alpha = alpha;
  return c4.toString();
};
var multiplySaturation = (colour2, amt) => {
  throwNumberTest(amt, `percentage`, `amt`);
  const c4 = structuredToColorJs(colour2);
  c4.s = (c4.s ?? 0) * amt;
  return c4.toString();
};

// src/rx/sources/Colour.ts
function colour(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set2 = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set: set2,
    setHsl: (hsl) => {
      set2(hsl);
    }
  };
}

// src/rx/sources/Count.ts
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

// src/rx/sources/Derived.ts
function derived(fn, reactiveSources, options = {}) {
  const ignoreIdentical = options.ignoreIdentical ?? true;
  const eq = options.eq ?? isEqualValueDefault;
  const sources = combineLatestToObject(reactiveSources);
  const handle = (v) => {
    const last2 = output.last();
    const vv = fn(v);
    if (vv !== void 0) {
      if (ignoreIdentical && last2 !== void 0) {
        if (eq(vv, last2)) return vv;
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
  const set2 = (value) => {
    input.set(value.toString());
  };
  return {
    ...rx,
    last() {
      return Number.parseFloat(input.last());
    },
    set: set2
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
      const vString = v.toString();
      let typeHint = typeHints.get(k);
      if (!typeHint) {
        const el = getFormElement(k, vString);
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
        entries.push([k, Number.parseFloat(vString)]);
      } else if (typeHint === `boolean`) {
        const vBool = vString === `true` ? true : false;
        entries.push([k, vBool]);
      } else if (typeHint === `colour`) {
        const vRgb = toString4(vString);
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
    const asObject = Object.fromEntries(entries);
    return asObject;
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
          value = toHex(value);
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
  const set2 = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set: set2
  };
}

// src/rx/sources/ObjectProxy.ts
var objectProxy = (target) => {
  const rx = object(target);
  const proxy = new Proxy(target, {
    set(target2, p2, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      if (isArray && p2 === `length`) return true;
      if (typeof p2 === `string`) {
        rx.updateField(p2, newValue);
      }
      if (isArray && typeof p2 === `string`) {
        const pAsNumber = Number.parseInt(p2);
        if (!Number.isNaN(pAsNumber)) {
          target2[pAsNumber] = newValue;
          return true;
        }
      }
      target2[p2] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var arrayProxy = (target) => {
  const rx = arrayObject(target);
  const proxy = new Proxy(target, {
    set(target2, p2, newValue, _receiver) {
      if (p2 === `length`) return true;
      if (typeof p2 !== `string`) throw new Error(`Expected numeric index, got type: ${typeof p2} value: ${JSON.stringify(p2)}`);
      const pAsNumber = Number.parseInt(p2);
      if (!Number.isNaN(pAsNumber)) {
        rx.setAt(pAsNumber, newValue);
        target2[pAsNumber] = newValue;
        return true;
      } else {
        throw new Error(`Expected numeric index, got: '${p2}'`);
      }
    }
  });
  return { proxy, rx };
};
var objectProxySymbol = (target) => {
  const { proxy, rx } = objectProxy(target);
  const p2 = proxy;
  p2[symbol] = rx;
  return p2;
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
  const set2 = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set: set2
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
  const ss = s;
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
  /**
   * Drops values from the input stream that match `predicate`
   * @param predicate If it returns _true_ value is ignored
   * @returns 
   */
  drop: (predicate) => opify(drop, predicate),
  /**
   * Every upstream value is considered the target for interpolation.
   * Output value interpolates by a given amount toward the target.
   * @returns 
   */
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
   * @param predicate If it returns _true_ value is allowed through
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
  const p2 = new Promise((resolve2, reject) => {
    off = rx.on((message) => {
      if (watchdog) clearTimeout(watchdog);
      if (messageHasValue(message)) {
        off();
        resolve2(message.value);
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
  return p2;
}
var to2 = (a2, b2, transform2, closeBonA = false) => {
  const unsub = a2.on((message) => {
    if (messageHasValue(message)) {
      const value = transform2 ? transform2(message.value) : message.value;
      b2.set(value);
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        b2.dispose(`Source closed (${message.context ?? ``})`);
      }
    } else {
    }
  });
  return unsub;
};

export {
  Correlate_exports,
  cloneFromFields2 as cloneFromFields,
  keysToNumbers,
  mapObjectShallow,
  mapObjectByObject,
  filterValue,
  isEmptyEntries,
  isEqualContextString,
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
  cache,
  initUpstream,
  initLazyStreamWithInitial,
  initLazyStream,
  initStream,
  setText,
  setHtml,
  setProperty,
  setHtmlText,
  annotate,
  annotateWithOp,
  chunk,
  transform,
  cloneFromFields as cloneFromFields2,
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
  guard,
  isPoint,
  isPoint3d,
  isEmpty,
  isPlaceholder,
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
  guard2,
  guardPositioned,
  isNaN3 as isNaN,
  isPositioned,
  isCircle,
  isCirclePositioned,
  distanceCenter,
  distanceFromExterior,
  guardDim,
  guard3,
  getRectPositioned,
  guardPositioned2,
  isEmpty2,
  isPlaceholder2,
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
  divide,
  dotProduct2 as dotProduct,
  Empty,
  fromNumbers,
  isLine,
  isPolyLine,
  guard5 as guard4,
  getPointParameter2,
  length,
  reverse,
  interpolate,
  pointAtDistance,
  multiply,
  multiplyScalar,
  clampMagnitude,
  normalise,
  normaliseByRect,
  project,
  quantiseEvery,
  reduce2,
  relation,
  isPolarCoord,
  degreeToRadian,
  radianInvert,
  radianToDegree,
  radiansFromAxisX,
  radiansSum,
  degreesSum,
  radianArc,
  degreeArc,
  toCartesian,
  fromCartesian,
  toString,
  toPoint,
  normalise2,
  clampMagnitude2,
  dotProduct3 as dotProduct2,
  toCartesian2,
  fromLine,
  polar_exports,
  rotate2 as rotate,
  toString3 as toString2,
  point_exports,
  fromTopLeft,
  isQuadraticBezier,
  isCubicBezier,
  quadraticSimple,
  toPath,
  bezier_exports,
  scale,
  scaler,
  scalerNull,
  scaleClamped,
  scalePercentages,
  scalePercent,
  scalerPercent,
  scalerTwoWay,
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
  Dom_exports,
  randomHue,
  getCssVariable,
  toRgb8bit,
  toStringFirst,
  multiplyOpacity,
  colour_exports,
  sources_exports,
  run,
  writable,
  manual,
  Sinks,
  Ops,
  takeNextValue,
  to2 as to,
  rx_exports,
  resolveFields,
  resolveFieldsSync,
  mergeObjects,
  maps_exports,
  piPi2,
  data_exports
};
//# sourceMappingURL=chunk-TSP6MRBQ.js.map