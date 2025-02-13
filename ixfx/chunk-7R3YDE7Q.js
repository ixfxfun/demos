import {
  chain_exports,
  combineLatestToArray
} from "./chunk-DUN3IDMT.js";
import {
  IterableAsync_exports,
  asCallback as asCallback2,
  chunks as chunks2,
  concat as concat2,
  dropWhile as dropWhile2,
  equals as equals2,
  every as every2,
  fill as fill2,
  filter as filter2,
  find as find2,
  flatten as flatten2,
  forEach as forEach2,
  fromArray as fromArray2,
  fromIterable as fromIterable2,
  map as map2,
  max2,
  min2,
  reduce as reduce2,
  slice as slice2,
  some as some2,
  toArray as toArray2,
  unique as unique2,
  uniqueByValue as uniqueByValue2,
  until as until2,
  zip as zip2
} from "./chunk-ISBRBAGP.js";
import {
  IterableSync_exports,
  asCallback,
  chunks,
  concat,
  dropWhile,
  equals,
  every,
  fill,
  filter,
  find,
  flatten,
  forEach,
  fromArray,
  fromIterable,
  map,
  max,
  min,
  reduce,
  some,
  toArray,
  unique,
  uniqueByValue,
  until,
  zip
} from "./chunk-5A4BEECK.js";
import {
  continuously
} from "./chunk-JVQJ6FSV.js";
import {
  fromEvent,
  isAsyncIterable,
  isIterable
} from "./chunk-QKVQQVXM.js";
import {
  intervalToMs
} from "./chunk-CM43JQ7N.js";
import {
  slice
} from "./chunk-RDWM2Z63.js";
import {
  toStringDefault
} from "./chunk-6UZ3OSJO.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/iterables/index.ts
var iterables_exports = {};
__export(iterables_exports, {
  Async: () => IterableAsync_exports,
  Chains: () => chain_exports,
  Sync: () => IterableSync_exports,
  asCallback: () => asCallback3,
  chunks: () => chunks3,
  combineLatestToArray: () => combineLatestToArray2,
  concat: () => concat3,
  dropWhile: () => dropWhile3,
  equals: () => equals3,
  every: () => every3,
  fill: () => fill3,
  filter: () => filter3,
  find: () => find3,
  flatten: () => flatten3,
  forEach: () => forEach3,
  fromArray: () => fromArray3,
  fromEvent: () => fromEvent,
  fromFunction: () => fromFunction,
  fromFunctionAwaited: () => fromFunctionAwaited,
  fromIterable: () => fromIterable3,
  isAsyncIterable: () => isAsyncIterable,
  isIterable: () => isIterable,
  iteratorController: () => iteratorController,
  map: () => map3,
  max: () => max3,
  min: () => min3,
  reduce: () => reduce3,
  slice: () => slice3,
  some: () => some3,
  toArray: () => toArray3,
  unique: () => unique3,
  uniqueByValue: () => uniqueByValue3,
  until: () => until3,
  zip: () => zip3
});

// src/iterables/Controller.ts
var iteratorController = (options) => {
  const delayMs = intervalToMs(options.delay, 10);
  let gen;
  const onValue = options.onValue;
  let state = `stopped`;
  let loop = continuously(async () => {
    if (gen) {
      const r = await gen.next();
      if (r.done) {
        state = `stopped`;
        return false;
      }
      const r2 = onValue(r.value);
      if (typeof r2 === `boolean`) {
        if (!r2) {
          state = `stopped`;
        }
        return r2;
      }
      return true;
    } else {
      state = `stopped`;
      return false;
    }
  }, delayMs);
  const cancel = () => {
    if (state === `stopped`) return;
    gen = void 0;
    loop.cancel();
    state = `stopped`;
  };
  const pause = () => {
    if (state === `paused`) return;
    loop.cancel();
    state = `paused`;
  };
  const start = () => {
    if (state === `running`) return;
    if (!gen) {
      remake();
    }
    state = `running`;
    loop.start();
  };
  const remake = () => {
    if (options.iterator) {
      gen = options.iterator();
    } else {
      throw new Error(`No source iterator`);
    }
  };
  const restart = () => {
    remake();
    start();
  };
  return {
    start,
    cancel,
    restart,
    pause,
    get state() {
      return state;
    }
  };
};

// src/iterables/index.ts
function combineLatestToArray2(sources, options = {}) {
  return combineLatestToArray(sources, options);
}
function min3(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? min2(it, gt) : min(it, gt);
}
function max3(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? max2(it, gt) : max(it, gt);
}
function dropWhile3(it, f) {
  return isAsyncIterable(it) ? dropWhile2(it, f) : dropWhile(it, f);
}
function until3(it, callback) {
  if (isAsyncIterable(it)) {
    return until2(it, callback);
  } else {
    until(it, callback);
  }
}
function chunks3(it, size) {
  return isAsyncIterable(it) ? chunks2(it, size) : chunks(it, size);
}
function filter3(it, f) {
  return isAsyncIterable(it) ? filter2(it, f) : filter(it, f);
}
function fill3(it, v) {
  return isAsyncIterable(it) ? fill2(it, v) : fill(it, v);
}
function concat3(...its) {
  return isAsyncIterable(its[0]) ? concat2(...its) : concat(...its);
}
function find3(it, f) {
  return isAsyncIterable(it) ? find2(it, f) : find(it, f);
}
function forEach3(it, fn, options = {}) {
  if (isAsyncIterable(it)) {
    return forEach2(it, fn, options);
  } else {
    forEach(it, fn);
  }
}
function map3(it, f) {
  return isAsyncIterable(it) ? map2(it, f) : map(it, f);
}
function fromArray3(array, interval) {
  return interval === void 0 ? fromArray(array) : fromArray2(array, interval);
}
function flatten3(it) {
  return isAsyncIterable(it) ? flatten2(it) : flatten(it);
}
function some3(it, f) {
  return isAsyncIterable(it) ? some2(it, f) : some(it, f);
}
function reduce3(it, f, start) {
  return isAsyncIterable(it) ? reduce2(it, f, start) : reduce(it, f, start);
}
function slice3(it, start = 0, end = Number.POSITIVE_INFINITY) {
  return isAsyncIterable(it) ? slice2(it, start, end) : slice(it, end);
}
function unique3(iterable) {
  if (Array.isArray(iterable)) {
    if (iterable.length === 0) return fromArray([]);
    return isAsyncIterable(iterable[0]) ? unique2(iterable) : unique(iterable);
  } else if (isAsyncIterable(iterable)) {
    return unique2(iterable);
  } else {
    return unique(iterable);
  }
}
function* uniqueByValue3(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  return isAsyncIterable(input) ? uniqueByValue2(input, toString, seen) : uniqueByValue(input, toString, seen);
}
function toArray3(it, options = {}) {
  return isAsyncIterable(it) ? toArray2(it, options) : toArray(it, options);
}
function every3(it, f) {
  return isAsyncIterable(it) ? every2(it, f) : every(it, f);
}
function equals3(it1, it2, equality) {
  const as = isAsyncIterable(it1) && isAsyncIterable(it2);
  return as ? equals2(it1, it2, equality) : equals(it1, it2, equality);
}
function zip3(...its) {
  if (its.length === 0) return fromArray([]);
  return isAsyncIterable(its[0]) ? zip2(...its) : zip(...its);
}
function fromIterable3(iterable, interval) {
  if (isAsyncIterable(iterable) || interval !== void 0) return fromIterable2(iterable, interval);
  return fromIterable(iterable);
}
function* fromFunction(callback) {
  while (true) {
    const v = callback();
    yield v;
  }
}
async function* fromFunctionAwaited(callback) {
  while (true) {
    const v = await callback();
    yield v;
  }
}
function asCallback3(input, callback, onDone) {
  if (isAsyncIterable(input)) {
    return asCallback2(input, callback);
  } else {
    return asCallback(input, callback);
  }
}

export {
  iteratorController,
  combineLatestToArray2 as combineLatestToArray,
  min3 as min,
  max3 as max,
  dropWhile3 as dropWhile,
  until3 as until,
  chunks3 as chunks,
  filter3 as filter,
  fill3 as fill,
  concat3 as concat,
  find3 as find,
  forEach3 as forEach,
  map3 as map,
  fromArray3 as fromArray,
  flatten3 as flatten,
  some3 as some,
  reduce3 as reduce,
  slice3 as slice,
  unique3 as unique,
  uniqueByValue3 as uniqueByValue,
  toArray3 as toArray,
  every3 as every,
  equals3 as equals,
  zip3 as zip,
  fromIterable3 as fromIterable,
  fromFunction,
  fromFunctionAwaited,
  asCallback3 as asCallback,
  iterables_exports
};
//# sourceMappingURL=chunk-7R3YDE7Q.js.map