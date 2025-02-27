import {
  containsDuplicateInstances
} from "./chunk-MZFSDYZE.js";
import {
  fromIterable
} from "./chunk-IXB3RQED.js";
import {
  randomElement,
  randomElementWeightedSource,
  randomIndex,
  randomPluck,
  shuffle,
  unique
} from "./chunk-YKJ5OEMO.js";
import {
  defaultComparer,
  filterAB,
  filterBetween,
  guardArray,
  guardIndex,
  minMaxAvg,
  without,
  withoutUndefined
} from "./chunk-RNGEX66F.js";
import {
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault
} from "./chunk-6UZ3OSJO.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-UC4AQMTL.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/data/arrays/index.ts
var arrays_exports = {};
__export(arrays_exports, {
  Sorted: () => SortedArray_exports,
  atWrap: () => atWrap,
  chunks: () => chunks,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  cycle: () => cycle,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  insertAt: () => insertAt,
  interleave: () => interleave,
  intersection: () => intersection,
  isContentsTheSame: () => isContentsTheSame,
  isEqual: () => isEqual,
  mergeByKey: () => mergeByKey,
  minMaxAvg: () => minMaxAvg,
  pairwise: () => pairwise,
  pairwiseReduce: () => pairwiseReduce,
  randomElement: () => randomElement,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  sortByProperty: () => sortByProperty,
  unique: () => unique,
  until: () => until,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip
});

// src/data/arrays/ArrayCycle.ts
var cycle = (options) => {
  const opts = [...options];
  let index = 0;
  const next = () => {
    index++;
    if (index === opts.length) index = 0;
    return value();
  };
  const prev = () => {
    index--;
    if (index === -1) index = opts.length - 1;
    return value();
  };
  const value = () => {
    return opts.at(index);
  };
  const select = (indexOrValue) => {
    if (typeof indexOrValue === `number`) {
      index = indexOrValue;
    } else {
      const found = opts.indexOf(indexOrValue);
      if (found === -1) throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray = () => [...opts];
  return { toArray, next, prev, get current() {
    return value();
  }, select };
};

// src/data/arrays/AtWrap.ts
var atWrap = (array, index) => {
  throwNumberTest(index, ``, `index`);
  if (!Array.isArray(array)) throw new Error(`Param 'array' is not an array`);
  index = index % array.length;
  return array.at(index);
};

// src/data/arrays/Chunks.ts
function chunks(array, size) {
  const output = [];
  for (let index = 0; index < array.length; index += size) {
    output.push(array.slice(index, index + size));
  }
  return output;
}

// src/data/arrays/Contains.ts
var contains = (haystack, needles, eq = isEqualDefault) => {
  if (!Array.isArray(haystack)) {
    throw new TypeError(`Expects haystack parameter to be an array`);
  }
  if (!Array.isArray(needles)) {
    throw new TypeError(`Expects needles parameter to be an array`);
  }
  for (const needle of needles) {
    let found = false;
    for (const element of haystack) {
      if (eq(needle, element)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};
var containsDuplicateValues = (array, keyFunction = toStringDefault) => {
  if (!Array.isArray(array)) throw new Error(`Parameter needs to be an array`);
  try {
    const _ = fromIterable(array, keyFunction);
  } catch {
    return true;
  }
  return false;
};

// src/data/arrays/EnsureLength.ts
var ensureLength = (data, length, expand = `undefined`) => {
  if (data === void 0) throw new Error(`Data undefined`);
  if (!Array.isArray(data)) throw new Error(`data is not an array`);
  if (data.length === length) return [...data];
  if (data.length > length) {
    return data.slice(0, length);
  }
  const d = [...data];
  const add = length - d.length;
  for (let index = 0; index < add; index++) {
    switch (expand) {
      case `undefined`: {
        d.push(void 0);
        break;
      }
      case `repeat`: {
        d.push(data[index % data.length]);
        break;
      }
      case `first`: {
        d.push(data[0]);
        break;
      }
      case `last`: {
        d.push(data.at(-1));
        break;
      }
    }
  }
  return d;
};

// src/data/arrays/Equality.ts
var isEqual = (arrayA, arrayB, eq = isEqualDefault) => {
  guardArray(arrayA, `arrayA`);
  guardArray(arrayB, `arrayB`);
  if (arrayA.length !== arrayB.length) return false;
  for (let indexA = 0; indexA < arrayA.length; indexA++) {
    if (!eq(arrayA[indexA], arrayB[indexA])) return false;
  }
  return true;
};
var isContentsTheSame = (array, equality) => {
  if (!Array.isArray(array)) throw new Error(`Param 'array' is not an array.`);
  if (array.length === 0) return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array[0];
  const r = array.some((v) => !eq(a, v));
  if (r) return false;
  return true;
};

// src/data/arrays/Flatten.ts
var flatten = (array) => [...array].flat();

// src/data/arrays/GroupBy.ts
var groupBy = (array, grouper) => {
  const map = /* @__PURE__ */ new Map();
  for (const a of array) {
    const key = grouper(a);
    let existing = map.get(key);
    if (!existing) {
      existing = [];
      map.set(key, existing);
    }
    existing.push(a);
  }
  return map;
};

// src/data/arrays/InsertAt.ts
var insertAt = (data, index, ...values) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`Param 'data' is not an arry`);
  }
  return [...data.slice(0, index), ...values, ...data.slice(index + 1)];
};

// src/data/arrays/Interleave.ts
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!isContentsTheSame(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    for (const array of arrays) {
      returnValue.push(array[index]);
    }
  }
  return returnValue;
};

// src/data/arrays/Intersection.ts
var intersection = (arrayA, arrayB, equality = isEqualDefault) => arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));

// src/data/arrays/MergeByKey.ts
var mergeByKey = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0) continue;
      const mk = keyFunction(mv);
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return [...result.values()];
};

// src/data/arrays/Pairwise.ts
function* pairwise(values) {
  guardArray(values, `values`);
  if (values.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values.length}`);
  for (let index = 1; index < values.length; index++) {
    yield [values[index - 1], values[index]];
  }
}
var pairwiseReduce = (array, reducer, initial) => {
  guardArray(array, `arr`);
  if (array.length < 2) return initial;
  for (let index = 0; index < array.length - 1; index++) {
    initial = reducer(initial, array[index], array[index + 1]);
  }
  return initial;
};

// src/data/arrays/Remove.ts
var remove = (data, index) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`'data' parameter should be an array`);
  }
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};

// src/data/arrays/Sample.ts
var sample = (array, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array.length * amount;
    subsampleSteps = Math.round(array.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  throwIntegerTest(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array.length - 1) {
    throw new Error(`Subsample steps exceeds array length`);
  }
  const r = [];
  for (let index = subsampleSteps - 1; index < array.length; index += subsampleSteps) {
    r.push(array[index]);
  }
  return r;
};

// src/data/arrays/Sort.ts
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});
var sortByProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});

// src/data/arrays/Until.ts
function* until(data, predicate, initial) {
  let total = initial;
  for (const datum of data) {
    const [stop, accumulator] = predicate(datum, total);
    if (stop) break;
    total = accumulator;
    yield datum;
  }
}

// src/data/arrays/Zip.ts
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!isContentsTheSame(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    returnValue.push(arrays.map((a) => a[index]));
  }
  return returnValue;
};

// src/data/arrays/SortedArray.ts
var SortedArray_exports = {};
__export(SortedArray_exports, {
  indexOf: () => indexOf,
  insert: () => insert,
  insertionIndex: () => insertionIndex,
  merge: () => merge,
  remove: () => remove2,
  sort: () => sort,
  wrapSorted: () => wrapSorted,
  wrapUnsorted: () => wrapUnsorted
});
var wrapUnsorted = (unsortedData, comparer = defaultComparer) => wrapSorted(unsortedData.toSorted(comparer));
var wrapSorted = (sortedData, comparer = defaultComparer) => {
  const store = [...sortedData];
  return {
    /**
     * Returns index of an item, or -1 if not found
     * @param sought Item to find
     * @param start 
     * @param end 
     * @returns 
     */
    indexOf: (sought, start = 0, end = store.length) => {
      return indexOf(store, sought, start, end, comparer);
    },
    insertionIndex: (toInsert) => {
      return insertionIndex(store, toInsert, 0, store.length, comparer);
    },
    /**
     * Inserts an item, returning a new wrapper
     * @param toInsert 
     * @returns 
     */
    insert: (toInsert) => {
      return wrapSorted(insert(store, toInsert, comparer), comparer);
    },
    /**
     * Removes an item, returning a new wrapper
     * @param toRemove 
     * @returns 
     */
    remove: (toRemove) => {
      return wrapSorted(remove2(store, toRemove, comparer));
    },
    /**
     * Gets item at a specified offset
     * @param offset 
     * @returns 
     */
    at: (offset) => {
      return store.at(offset);
    },
    /**
     * Gets length
     */
    get length() {
      return store.length;
    },
    /**
     * Gets underlying data.
     * Be careful not to mutate. Use `toArray` to get a copy
     * that can be modified.
     */
    get data() {
      return store;
    },
    /**
     * Returns a copy of data which is safe to modify.
     * @returns 
     */
    toArray: () => {
      return [...store];
    }
  };
};
var indexOf = (data, sought, start = 0, end = data.length, comparer = defaultComparer) => {
  if (end <= start) return -1;
  const mid = Math.floor((start + end) / 2);
  const result = comparer(data[mid], sought);
  if (result === 0) return mid;
  if (result > 0) {
    return indexOf(data, sought, start, mid - 1, comparer);
  }
  return indexOf(data, sought, mid + 1, end, comparer);
};
var insertionIndex = (data, toInsert, start = 0, end = data.length, comparer = defaultComparer) => {
  const mid = Math.floor((start + end) / 2);
  const result = comparer(data[mid], toInsert);
  if (result === 0) return mid + 1;
  if (result > 0) {
    if (start === end) return start;
    if (start + 1 === end) return start;
    return insertionIndex(data, toInsert, start, mid - 1, comparer);
  }
  return insertionIndex(data, toInsert, mid + 1, end, comparer);
};
var insert = (sortedArray, toInsert, comparer = defaultComparer) => {
  const index = insertionIndex(sortedArray, toInsert, 0, sortedArray.length, comparer);
  const pre = sortedArray.slice(0, index);
  const post = sortedArray.slice(index);
  return [...pre, toInsert, ...post];
};
var remove2 = (data, toRemove, comparer = defaultComparer) => {
  const index = indexOf(data, toRemove, 0, data.length, comparer);
  if (index === -1) return data;
  const pre = data.slice(0, index);
  const post = data.slice(index + 1);
  return [...pre, ...post];
};
var merge = (a, b, comparer = defaultComparer) => {
  const t = [];
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex + bIndex < a.length + b.length) {
    const aItem = a[aIndex];
    const bItem = b[bIndex];
    const comp = comparer(aItem, bItem);
    if (aItem === void 0) {
      t.push(bItem);
      bIndex++;
    } else if (bItem === void 0) {
      t.push(aItem);
      aIndex++;
    } else if (comp < 0) {
      t.push(aItem);
      aIndex++;
    } else {
      t.push(bItem);
      bIndex++;
    }
  }
  return t;
};
var sortMerge = (data, comparer = defaultComparer) => {
  if (data.length <= 1) return [...data];
  const mIndex = Math.floor(data.length / 2);
  const a = data.slice(0, mIndex);
  const b = data.slice(mIndex);
  return merge(sortMerge(a, comparer), sortMerge(b, comparer), comparer);
};
var sort = (data, algo = `default`, comparer = defaultComparer) => {
  switch (algo) {
    case `merge`:
      return sortMerge(data, comparer);
    case "default":
      return data.toSorted(comparer);
  }
};

export {
  cycle,
  atWrap,
  chunks,
  contains,
  containsDuplicateValues,
  ensureLength,
  isEqual,
  isContentsTheSame,
  flatten,
  groupBy,
  insertAt,
  interleave,
  intersection,
  mergeByKey,
  pairwise,
  pairwiseReduce,
  remove,
  sample,
  sortByNumericProperty,
  sortByProperty,
  until,
  zip,
  SortedArray_exports,
  arrays_exports
};
//# sourceMappingURL=chunk-CVHSZDTH.js.map