import {
  toStringAbbreviate
} from "./chunk-PSWPSMIG.js";
import {
  resultErrorToString,
  resultToError,
  resultToValue,
  throwResult
} from "./chunk-QVTHCRNR.js";
import {
  guards_exports
} from "./chunk-WYMJKVGY.js";
import {
  mapKeys
} from "./chunk-HOGLR6UM.js";
import {
  defaultToString,
  isEqualDefault,
  isEqualValueDefault,
  isEqualValueIgnoreOrder,
  isEqualValuePartial,
  isMap,
  isSet,
  toStringDefault,
  toStringOrdered
} from "./chunk-6UZ3OSJO.js";
import {
  throwIntegerTest
} from "./chunk-UC4AQMTL.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/util/index.ts
var util_exports = {};
__export(util_exports, {
  Guards: () => guards_exports,
  comparerInverse: () => comparerInverse,
  defaultComparer: () => defaultComparer,
  defaultToString: () => defaultToString,
  getSorter: () => getSorter,
  isEqualDefault: () => isEqualDefault,
  isEqualTrace: () => isEqualTrace,
  isEqualValueDefault: () => isEqualValueDefault,
  isEqualValueIgnoreOrder: () => isEqualValueIgnoreOrder,
  isEqualValuePartial: () => isEqualValuePartial,
  isInteger: () => isInteger,
  isMap: () => isMap,
  isPrimitive: () => isPrimitive,
  isPrimitiveOrObject: () => isPrimitiveOrObject,
  isSet: () => isSet,
  jsComparer: () => jsComparer,
  mapKeys: () => mapKeys,
  minMaxAvg: () => minMaxAvg2,
  numericComparer: () => numericComparer,
  resultErrorToString: () => resultErrorToString,
  resultToError: () => resultToError,
  resultToValue: () => resultToValue,
  runningiOS: () => runningiOS,
  throwResult: () => throwResult,
  toStringDefault: () => toStringDefault,
  toStringOrdered: () => toStringOrdered
});

// src/util/Comparers.ts
var numericComparer = (x, y) => {
  if (x === y) return 0;
  if (x > y) return 1;
  return -1;
};
var jsComparer = (x, y) => {
  if (x === void 0 && y === void 0) return 0;
  if (x === void 0) return 1;
  if (y === void 0) return -1;
  const xString = defaultToString(x);
  const yString = defaultToString(y);
  if (xString < yString) return -1;
  if (xString > yString) return 1;
  return 0;
};
var comparerInverse = (comparer) => {
  return (x, y) => {
    const v = comparer(x, y);
    return v * -1;
  };
};
var defaultComparer = (x, y) => {
  if (typeof x === `number` && typeof y === `number`) {
    return numericComparer(x, y);
  }
  return jsComparer(x, y);
};

// src/util/IsEqualTrace.ts
var isEqualTrace = (eq) => {
  return (a, b) => {
    const result = eq(a, b);
    console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a)} b: ${toStringAbbreviate(b)}`);
    return result;
  };
};

// src/util/IsInteger.ts
var isInteger = (value) => {
  if (value === void 0) return false;
  if (typeof value === `string`) {
    const v = Number.parseInt(value);
    if (Number.isNaN(v)) return false;
    if (v.toString() === value.toString()) return true;
    return false;
  }
  if (typeof value === `number`) {
    if (Number.isNaN(value)) return false;
    if (!Number.isFinite(value)) return false;
    if (Math.round(value) === value) return true;
    return false;
  }
  return false;
};

// src/util/IsPrimitive.ts
function isPrimitive(value) {
  if (typeof value === `number`) return true;
  if (typeof value === `string`) return true;
  if (typeof value === `bigint`) return true;
  if (typeof value === `boolean`) return true;
  return false;
}
function isPrimitiveOrObject(value) {
  if (isPrimitive(value)) return true;
  if (typeof value === `object`) return true;
  return false;
}

// src/util/Platform.ts
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || // iPad on iOS 13 detection
navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

// src/iterables/sync/Slice.ts
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  if (end < start) throw new Error(`Param 'end' should be more than 'start'`);
  for (; start > 0; start--, end--) iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

// src/data/arrays/GuardArray.ts
var guardArray = (array, name = `?`) => {
  if (array === void 0) {
    throw new TypeError(`Param '${name}' is undefined. Expected array.`);
  }
  if (array === null) {
    throw new TypeError(`Param '${name}' is null. Expected array.`);
  }
  if (!Array.isArray(array)) {
    throw new TypeError(`Param '${name}' not an array as expected`);
  }
};

// src/data/arrays/GuardIndex.ts
var guardIndex = (array, index, name = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name);
  if (index > array.length - 1) {
    throw new Error(
      `'${name}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};

// src/data/arrays/Filter.ts
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var filterAB = (data, filter) => {
  const a = [];
  const b = [];
  for (const datum of data) {
    if (filter(datum)) a.push(datum);
    else b.push(datum);
  }
  return [a, b];
};
function* filterBetween(array, predicate, startIndex, endIndex) {
  guardArray(array);
  if (typeof startIndex === `undefined`) startIndex = 0;
  if (typeof endIndex === `undefined`) endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array)) yield array[index];
  }
}
var without = (sourceArray, toRemove, comparer = isEqualDefault) => {
  if (Array.isArray(toRemove)) {
    const returnArray = [];
    for (const source of sourceArray) {
      if (!toRemove.some((v) => comparer(source, v))) {
        returnArray.push(source);
      }
    }
    return returnArray;
  } else {
    return sourceArray.filter((v) => !comparer(v, toRemove));
  }
};

// src/numbers/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0) throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total2 = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total2 += v;
        samples++;
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
      return {
        avg: total2 / samples,
        total: total2,
        max,
        min
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers = [...filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  )];
  const total = validNumbers.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

// src/util/KeyValue.ts
var sorterByValueIndex = (index, reverse = false) => {
  return (values) => {
    const s = values.toSorted((a, b) => {
      return defaultComparer(a[index], b[index]);
    });
    if (reverse) return s.reverse();
    return s;
  };
};
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`: {
      return sorterByValueIndex(1, false);
    }
    case `value-reverse`: {
      return sorterByValueIndex(1, true);
    }
    case `key`: {
      return sorterByValueIndex(0, false);
    }
    case `key-reverse`: {
      return sorterByValueIndex(0, true);
    }
    default: {
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
    }
  }
};
var minMaxAvg2 = (entries, conversionFunction) => {
  const converter = conversionFunction ?? ((v) => v[1]);
  const values = entries.map((entry) => converter(entry));
  return minMaxAvg(values);
};

export {
  numericComparer,
  jsComparer,
  comparerInverse,
  defaultComparer,
  isEqualTrace,
  isInteger,
  isPrimitive,
  isPrimitiveOrObject,
  runningiOS,
  slice,
  guardArray,
  guardIndex,
  withoutUndefined,
  filterAB,
  filterBetween,
  without,
  minMaxAvg,
  getSorter,
  minMaxAvg2,
  util_exports
};
//# sourceMappingURL=chunk-RNGEX66F.js.map