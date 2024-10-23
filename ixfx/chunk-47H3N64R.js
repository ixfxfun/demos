import {
  round
} from "./chunk-4LY3IBHN.js";
import {
  isEqualDefault
} from "./chunk-6UZ3OSJO.js";
import {
  numberTest
} from "./chunk-Z5OJDQCF.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/Events.ts
var Events_exports = {};
__export(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter,
  eventRace: () => eventRace
});

// src/DefaultKeyer.ts
var defaultKeyer = (a) => {
  return typeof a === `string` ? a : JSON.stringify(a);
};

// src/collections/map/MapMultiFns.ts
var firstEntryByValue = (map, value, isEqual = isEqualDefault) => {
  for (const e of map.entries()) {
    const val = e[1];
    for (const subValue of val) {
      if (isEqual(subValue, value)) return e;
    }
  }
};

// src/collections/map/MapOfSimpleBase.ts
var MapOfSimpleBase = class {
  /**
   * Constructor
   * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
   * @param valueEq Compare values. By default uses JS logic for equality
   */
  constructor(groupBy = defaultKeyer, valueEq = isEqualDefault, initial = []) {
    this.groupBy = groupBy;
    this.valueEq = valueEq;
    this.map = new Map(initial);
  }
  /**
   * Returns _true_ if `key` exists
   * @param key
   * @returns
   */
  has(key) {
    return this.map.has(key);
  }
  /**
   * Returns _true_ if `value` exists under `key`.
   * @param key Key
   * @param value Value to seek under `key`
   * @returns _True_ if `value` exists under `key`.
   */
  hasKeyValue(key, value) {
    const values = this.map.get(key);
    if (!values) return false;
    for (const v of values) {
      if (this.valueEq(v, value)) return true;
    }
    return false;
  }
  /**
   * Debug dump of contents
   * @returns
   */
  debugString() {
    let r = ``;
    const keys = [...this.map.keys()];
    keys.every((k) => {
      const v = this.map.get(k);
      if (v === void 0) return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  /**
   * Return number of values stored under `key`.
   * Returns 0 if `key` is not found.
   * @param key
   * @returns
   */
  count(key) {
    const values = this.map.get(key);
    if (!values) return 0;
    return values.length;
  }
  /**
  * Returns first key that contains `value`
  * @param value 
  * @param eq 
  * @returns 
  */
  firstKeyByValue(value, eq = isEqualDefault) {
    const entry = firstEntryByValue(this, value, eq);
    if (entry) return entry[0];
  }
  /**
   * Iterate over all entries
   */
  *entriesFlat() {
    for (const key of this.map.keys()) {
      for (const value of this.map.get(key)) {
        yield [key, value];
      }
    }
  }
  /**
   * Iterate over keys and array of values for that key
   */
  *entries() {
    for (const [k, v] of this.map.entries()) {
      yield [k, [...v]];
    }
  }
  /**
   * Get all values under `key`
   * @param key
   * @returns
   */
  *get(key) {
    const m = this.map.get(key);
    if (!m) return;
    yield* m.values();
  }
  /**
   * Iterate over all keys
   */
  *keys() {
    yield* this.map.keys();
  }
  /**
   * Iterate over all values (regardless of key).
   * Use {@link values} to iterate over a set of values per key
   */
  *valuesFlat() {
    for (const entries of this.map) {
      yield* entries[1];
    }
  }
  /**
   * Yields the values for each key in sequence, returning an array.
   * Use {@link valuesFlat} to iterate over all keys regardless of key.
   */
  *values() {
    for (const entries of this.map) {
      yield entries[1];
    }
  }
  /**
   * Iterate over keys and length of values stored under keys
   */
  *keysAndCounts() {
    for (const entries of this.map) {
      yield [entries[0], entries[1].length];
    }
  }
  /**
   * Returns the count of keys.
   */
  get lengthKeys() {
    return this.map.size;
  }
  /**
  * _True_ if empty
  */
  get isEmpty() {
    return this.map.size === 0;
  }
};

// src/collections/map/MapOfSimpleMutable.ts
var MapOfSimpleMutable = class extends MapOfSimpleBase {
  addKeyedValues(key, ...values) {
    const existing = this.map.get(key);
    if (existing === void 0) {
      this.map.set(key, values);
    } else {
      this.map.set(key, [...existing, ...values]);
    }
  }
  /**
   * Set `values` to `key`.
   * Previous data stored under `key` is thrown away.
   * @param key 
   * @param values 
   */
  setValues(key, values) {
    this.map.set(key, values);
  }
  /**
   * Adds a value, automatically extracting a key via the
   * `groupBy` function assigned in the constructor options.
   * @param values Adds several values
   */
  addValue(...values) {
    for (const v of values) {
      const key = this.groupBy(v);
      this.addKeyedValues(key, v);
    }
  }
  /**
   * Delete `value` under a particular `key`
   * @param key
   * @param value
   * @returns _True_ if `value` was found under `key`
   */
  deleteKeyValue(key, value) {
    const existing = this.map.get(key);
    if (existing === void 0) return false;
    const without = existing.filter((existingValue) => !this.valueEq(existingValue, value));
    this.map.set(key, without);
    return without.length < existing.length;
  }
  /**
   * Deletes `value` regardless of key.
   *
   * Uses the constructor-defined equality function.
   * @param value Value to delete
   * @returns
   */
  deleteByValue(value) {
    let del = false;
    const entries = [...this.map.entries()];
    for (const keyEntries of entries) {
      for (const values of keyEntries[1]) {
        if (this.valueEq(values, value)) {
          del = true;
          this.deleteKeyValue(keyEntries[0], value);
        }
      }
    }
    return del;
  }
  /**
   * Deletes all values under `key`,
   * @param key
   * @returns _True_ if `key` was found and values stored
   */
  delete(key) {
    const values = this.map.get(key);
    if (!values) return false;
    if (values.length === 0) return false;
    this.map.delete(key);
    return true;
  }
  /**
   * Clear contents
   */
  clear() {
    this.map.clear();
  }
};
var ofSimpleMutable = (groupBy = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimpleMutable(groupBy, valueEq);

// src/flow/IntervalType.ts
function intervalToMs(interval, defaultNumber) {
  if (isInterval(interval)) {
    if (typeof interval === `number`) return interval;
    let ms = interval.millis ?? 0;
    ms += (interval.hours ?? 0) * 60 * 60 * 1e3;
    ms += (interval.mins ?? 0) * 60 * 1e3;
    ms += (interval.secs ?? 0) * 1e3;
    return ms;
  } else {
    if (typeof defaultNumber !== `undefined`) return defaultNumber;
    throw new Error(`Not a valid interval: ${interval}`);
  }
}
function isInterval(interval) {
  if (interval === void 0) return false;
  if (interval === null) return false;
  if (typeof interval === `number`) {
    if (Number.isNaN(interval)) return false;
    if (!Number.isFinite(interval)) return false;
    return true;
  } else if (typeof interval !== `object`) return false;
  const hasMillis = `millis` in interval;
  const hasSecs = `secs` in interval;
  const hasMins = `mins` in interval;
  const hasHours = `hours` in interval;
  if (hasMillis && !numberTest(interval.millis)[0]) return false;
  if (hasSecs && !numberTest(interval.secs)[0]) return false;
  if (hasMins && !numberTest(interval.mins)[0]) return false;
  if (hasHours && !numberTest(interval.hours)[0]) return false;
  if (hasMillis || hasSecs || hasHours || hasMins) return true;
  return false;
}
var elapsedToHumanString = (millisOrFunction, rounding = 2) => {
  let interval = {} = 0;
  if (typeof millisOrFunction === `function`) {
    const intervalResult = millisOrFunction();
    return elapsedToHumanString(intervalResult);
  } else if (typeof millisOrFunction === `number`) {
    interval = millisOrFunction;
  } else if (typeof millisOrFunction === `object`) {
    interval = intervalToMs(interval);
  }
  let ms = intervalToMs(interval);
  if (typeof ms === `undefined`) return `(undefined)`;
  if (ms < 1e3) return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120) return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60) return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

// src/Events.ts
var eventRace = (target, eventNames, options = {}) => {
  const intervalMs = intervalToMs(options.timeout, 60 * 1e3);
  const signal = options.signal;
  let triggered = false;
  let disposed = false;
  let timeout;
  const promise = new Promise((resolve, reject) => {
    const onEvent = (event) => {
      if (`type` in event) {
        if (eventNames.includes(event.type)) {
          triggered = true;
          resolve(event);
          dispose();
        } else {
          console.warn(`eventRace: Got event '${event.type}' that is not in race list`);
        }
      } else {
        console.warn(`eventRace: Event data does not have expected 'type' field`);
        console.log(event);
      }
    };
    for (const name of eventNames) {
      target.addEventListener(name, onEvent);
    }
    const dispose = () => {
      if (disposed) return;
      if (timeout !== void 0) clearTimeout(timeout);
      timeout = void 0;
      disposed = true;
      for (const name of eventNames) {
        target.removeEventListener(name, onEvent);
      }
    };
    timeout = setTimeout(() => {
      if (triggered || disposed) return;
      dispose();
      reject(new Error(`eventRace: Events not fired within interval. Events: ${JSON.stringify(eventNames)} Interval: ${intervalMs}`));
    }, intervalMs);
    signal?.addEventListener(`abort`, () => {
      if (triggered || disposed) return;
      dispose();
      reject(new Error(`Abort signal received ${signal.reason}`));
    });
  });
  return promise;
};
var SimpleEventEmitter = class {
  #listeners = ofSimpleMutable();
  #disposed = false;
  dispose() {
    if (this.#disposed) return;
    this.clearEventListeners();
  }
  get isDisposed() {
    return this.#disposed;
  }
  /**
   * Fire event
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  fireEvent(type, args) {
    if (this.#disposed) throw new Error(`Disposed`);
    const listeners = this.#listeners.get(type);
    for (const l of listeners) {
      l(args, this);
    }
  }
  /**
   * Adds event listener.
   * 
   * @throws Error if emitter is disposed
   * @typeParam K - Events
   * @param name Event name
   * @param listener Event handler
   */
  addEventListener(name, listener) {
    if (this.#disposed) throw new Error(`Disposed`);
    this.#listeners.addKeyedValues(
      name,
      listener
    );
  }
  /**
   * Remove event listener
   *
   * @param listener
   */
  removeEventListener(type, listener) {
    if (this.#disposed) return;
    this.#listeners.deleteKeyValue(
      type,
      listener
    );
  }
  /**
   * Clear all event listeners
   * @private
   */
  clearEventListeners() {
    if (this.#disposed) return;
    this.#listeners.clear();
  }
};

export {
  intervalToMs,
  isInterval,
  elapsedToHumanString,
  defaultKeyer,
  MapOfSimpleMutable,
  ofSimpleMutable,
  eventRace,
  SimpleEventEmitter,
  Events_exports
};
//# sourceMappingURL=chunk-47H3N64R.js.map