import {
  ifNaN,
  integerParse,
  integerTest,
  isPowerOfTwo,
  numberTest,
  percentTest,
  throwFromResult,
  throwIntegerTest,
  throwNumberTest,
  throwPercentTest
} from "./chunk-Z5OJDQCF.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/util/guards.ts
var guards_exports = {};
__export(guards_exports, {
  arrayTest: () => arrayTest,
  defined: () => defined,
  functionTest: () => functionTest,
  ifNaN: () => ifNaN,
  integerParse: () => integerParse,
  integerTest: () => integerTest,
  isFunction: () => isFunction,
  isPlainObject: () => isPlainObject,
  isPlainObjectOrPrimitive: () => isPlainObjectOrPrimitive,
  isPowerOfTwo: () => isPowerOfTwo,
  isStringArray: () => isStringArray,
  nullUndef: () => nullUndef,
  numberTest: () => numberTest,
  percentTest: () => percentTest,
  stringTest: () => stringTest,
  throwArrayTest: () => throwArrayTest,
  throwFromResult: () => throwFromResult,
  throwFunctionTest: () => throwFunctionTest,
  throwIntegerTest: () => throwIntegerTest,
  throwNullUndef: () => throwNullUndef,
  throwNumberTest: () => throwNumberTest,
  throwPercentTest: () => throwPercentTest,
  throwStringTest: () => throwStringTest
});

// src/util/GuardArrays.ts
var arrayTest = (value, parameterName = `?`) => {
  if (!Array.isArray(value)) {
    return [false, `Parameter '${parameterName}' is expected to be an array'`];
  }
  return [true];
};
var throwArrayTest = (value, parameterName = `?`) => {
  throwFromResult(arrayTest(value, parameterName));
};
var isStringArray = (value) => {
  if (!Array.isArray(value)) return false;
  return !value.some((v) => typeof v !== `string`);
};

// src/util/GuardEmpty.ts
var nullUndef = (value, parameterName = `?`) => {
  if (typeof value === `undefined`) {
    return [false, `${parameterName} param is undefined`];
  }
  if (value === null) return [false, `${parameterName} param is null`];
  return [true];
};
var throwNullUndef = (value, parameterName = `?`) => {
  const r = nullUndef(value, parameterName);
  if (r[0]) return;
  throw new Error(r[1]);
};
var defined = (argument) => argument !== void 0;

// src/util/GuardFunction.ts
var isFunction = (object) => object instanceof Function;
var functionTest = (value, parameterName = `?`) => {
  if (value === void 0) return [false, `Param '${parameterName}' is undefined. Expected: function.`];
  if (value === null) return [false, `Param '${parameterName}' is null. Expected: function.`];
  if (typeof value !== `function`) return [false, `Param '${parameterName}' is type '${typeof value}'. Expected: function`];
  return [true];
};
var throwFunctionTest = (value, parameterName = `?`) => {
  const [ok, msg] = functionTest(value, parameterName);
  if (ok) return;
  throw new TypeError(msg);
};

// src/util/GuardObject.ts
var isPlainObject = (value) => {
  if (typeof value !== `object` || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
var isPlainObjectOrPrimitive = (value) => {
  const t = typeof value;
  if (t === `symbol`) return false;
  if (t === `function`) return false;
  if (t === `bigint`) return true;
  if (t === `number`) return true;
  if (t === `string`) return true;
  if (t === `boolean`) return true;
  return isPlainObject(value);
};

// src/util/GuardString.ts
var stringTest = (value, range = ``, parameterName = `?`) => {
  if (typeof value !== `string`) return [false, `Param '${parameterName} is not type string. Got: ${typeof value}`];
  switch (range) {
    case `non-empty`:
      if (value.length === 0) return [false, `Param '${parameterName} is empty`];
      break;
  }
  return [true];
};
var throwStringTest = (value, range = ``, parameterName = `?`) => {
  throwFromResult(stringTest(value, range, parameterName));
};

export {
  arrayTest,
  throwArrayTest,
  isStringArray,
  nullUndef,
  throwNullUndef,
  defined,
  isFunction,
  functionTest,
  throwFunctionTest,
  isPlainObject,
  isPlainObjectOrPrimitive,
  stringTest,
  throwStringTest,
  guards_exports
};
//# sourceMappingURL=chunk-AKC4PULA.js.map