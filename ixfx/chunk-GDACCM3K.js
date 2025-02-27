import {
  count,
  float,
  floatSource
} from "./chunk-AJPKVRVS.js";
import {
  shortGuid
} from "./chunk-B5XDBTUM.js";
import {
  get,
  randomHue
} from "./chunk-TSP6MRBQ.js";
import {
  clamp
} from "./chunk-4OK6CU6W.js";
import {
  randomElement,
  randomIndex,
  shuffle,
  weightedIndex
} from "./chunk-YKJ5OEMO.js";
import {
  defaultRandom,
  string
} from "./chunk-PSWPSMIG.js";
import {
  integerTest,
  numberTest,
  throwFromResult,
  throwNumberTest
} from "./chunk-UC4AQMTL.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/random/index.ts
var random_exports = {};
__export(random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  calculateNonZero: () => calculateNonZero,
  chance: () => chance,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian,
  gaussianSource: () => gaussianSource,
  hue: () => randomHue,
  integer: () => integer,
  integerSource: () => integerSource,
  integerUniqueGen: () => integerUniqueGen,
  mersenneTwister: () => mersenneTwister,
  minutesMs: () => minutesMs,
  minutesMsSource: () => minutesMsSource,
  secondsMs: () => secondsMs,
  secondsMsSource: () => secondsMsSource,
  shortGuid: () => shortGuid,
  string: () => string,
  weighted: () => weighted,
  weightedIndex: () => weightedIndex,
  weightedInteger: () => weightedInteger,
  weightedIntegerSource: () => weightedIntegerSource,
  weightedSource: () => weightedSource
});

// src/random/Chance.ts
var chance = (p, a, b, randomSource) => {
  const source = randomSource ?? Math.random;
  const resolve = (x) => {
    if (typeof x === `function`) return x();
    return x;
  };
  const pp = resolve(p);
  throwNumberTest(pp, `percentage`, `p`);
  if (source() <= pp) {
    return resolve(b);
  } else {
    return resolve(a);
  }
};

// src/random/NonZero.ts
var calculateNonZero = (source = Math.random) => {
  let v = 0;
  while (v === 0) {
    v = source();
  }
  return v;
};

// src/random/Gaussian.ts
var gaussian = (skew = 1) => gaussianSource(skew)();
var gaussianSource = (skew = 1) => {
  const min = 0;
  const max = 1;
  const compute = () => {
    const u = calculateNonZero();
    const v = calculateNonZero();
    let result = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    result = result / 10 + 0.5;
    if (result > 1 || result < 0) {
      result = compute();
    } else {
      result = Math.pow(result, skew);
      result *= max - min;
      result += min;
    }
    return result;
  };
  return compute;
};

// src/random/Integer.ts
var integerSource = (maxOrOptions) => {
  if (typeof maxOrOptions === `undefined`) {
    throw new TypeError(`maxOrOptions is undefined`);
  }
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = Math.floor(options.max);
  let min = Math.floor(options.min ?? 0);
  if (!options.min && max < 0) {
    max = 1;
    min = options.max;
  }
  const randomSource = options.source ?? Math.random;
  if (min > max) {
    throw new Error(`Min value is greater than max (min: ${min} max: ${max})`);
  }
  throwFromResult(numberTest(min, ``, `min`));
  throwFromResult(numberTest(max, ``, `max`));
  if (max === min) {
    throw new Error(`Max and min values cannot be the same (${max})`);
  }
  const amt = Math.abs(max - min);
  return () => Math.floor(randomSource() * amt) + min;
};
var integer = (maxOrOptions) => integerSource(maxOrOptions)();
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min = options.min ?? 0;
  const max = options.max;
  const source = options.source ?? Math.random;
  const loop = options.loop ?? false;
  throwFromResult(integerTest(min, ``, `min`));
  throwFromResult(integerTest(max, ``, `max`));
  if (min > max) {
    throw new Error(`Min value is greater than max. Min: ${min} Max: ${max}`);
  }
  const origRange = [...count(max - min, min)];
  let numberRange = shuffle(origRange);
  let index = 0;
  while (true) {
    if (index === numberRange.length) {
      if (loop) numberRange = shuffle(origRange, source);
      else return;
    }
    yield numberRange[index++];
  }
}

// src/random/Seeded.ts
function mersenneTwister(seed) {
  if (!seed) seed = Math.random() * 4294967295;
  let mt = new Array(624);
  mt[0] = seed >>> 0;
  const n1 = 1812433253;
  for (let mti2 = 1; mti2 < 624; mti2++) {
    const n2 = mt[mti2 - 1] ^ mt[mti2 - 1] >>> 30;
    mt[mti2] = ((n1 & 4294901760) * n2 >>> 0) + ((n1 & 65535) * n2 >>> 0) + mti2 >>> 0;
  }
  let mti = 624;
  const randomUint32 = () => {
    let y;
    if (mti >= 624) {
      for (let i = 0; i < 227; i++) {
        y = (mt[i] & 2147483648 | mt[i + 1] & 2147483647) >>> 0;
        mt[i] = (mt[i + 397] ^ y >>> 1 ^ (y & 1 ? 2567483615 : 0)) >>> 0;
      }
      for (let i = 227; i < 623; i++) {
        y = (mt[i] & 2147483648 | mt[i + 1] & 2147483647) >>> 0;
        mt[i] = (mt[i - 227] ^ y >>> 1 ^ (y & 1 ? 2567483615 : 0)) >>> 0;
      }
      y = (mt[623] & 2147483648 | mt[0] & 2147483647) >>> 0;
      mt[623] = (mt[396] ^ y >>> 1 ^ (y & 1 ? 2567483615 : 0)) >>> 0;
      mti = 0;
    }
    y = mt[mti++];
    y = (y ^ y >>> 11) >>> 0;
    y = (y ^ y << 7 & 2636928640) >>> 0;
    y = (y ^ y << 15 & 4022730752) >>> 0;
    y = (y ^ y >>> 18) >>> 0;
    return y;
  };
  const float2 = () => randomUint32() / 4294967296;
  const integer2 = (maxExclusive, minInclusive = 0) => {
    if (maxExclusive < 1) throw new Error("Upper bound must be greater than or equal to 1");
    if (maxExclusive > 4294967296) throw new Error("Upper bound must not be greater than 4294967296");
    if (maxExclusive === 1) return 0;
    let range = maxExclusive - minInclusive;
    const bitsNeeded = Math.ceil(Math.log2(range)), bitMask = (1 << bitsNeeded) - 1;
    while (true) {
      const int = randomUint32() & bitMask;
      if (int < range) return minInclusive + int;
    }
  };
  return { integer: integer2, float: float2 };
}

// src/random/Time.ts
var minutesMsSource = (maxMinutesOrOptions) => {
  const options = typeof maxMinutesOrOptions === `number` ? { max: maxMinutesOrOptions } : maxMinutesOrOptions;
  const min = (options.min ?? 0) * 60 * 1e3;
  const max = options.max * 60 * 1e3;
  return integerSource({ ...options, max, min });
};
var minutesMs = (maxMinutesOrOptions) => minutesMsSource(maxMinutesOrOptions)();
var secondsMsSource = (maxSecondsOrOptions) => {
  const options = typeof maxSecondsOrOptions === `number` ? { max: maxSecondsOrOptions } : maxSecondsOrOptions;
  const min = (options.min ?? 0) * 1e3;
  const max = options.max * 1e3;
  return () => integer({ ...options, max, min });
};
var secondsMs = (maxSecondsOrOptions) => secondsMsSource(maxSecondsOrOptions)();

// src/random/Weighted.ts
var weighted = (easingNameOrOptions = `quadIn`) => weightedSource(easingNameOrOptions)();
var weightedSource = (easingNameOrOptions = `quadIn`) => {
  const options = typeof easingNameOrOptions === `string` ? { easing: easingNameOrOptions } : easingNameOrOptions;
  const source = options.source ?? defaultRandom;
  const easingName = options.easing ?? `quadIn`;
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing function '${easingName}' not found.`);
  }
  const compute = () => {
    const r = source();
    return easingFunction(r);
  };
  return compute;
};

// src/random/WeightedInteger.ts
var weightedIntegerSource = (maxOrOptions) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const source = options.source ?? defaultRandom;
  const max = options.max;
  const min = options.min ?? 0;
  const easingName = options.easing ?? `quadIn`;
  if (typeof max === `undefined`) throw new Error(`max field is undefined`);
  if (typeof easingName !== `string`) {
    throw new TypeError(`easing field expected to be string`);
  }
  throwNumberTest(max);
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing '${easingName}' not found`);
  }
  throwNumberTest(min);
  if (max <= min) throw new Error(`Max should be greater than min`);
  const compute = () => {
    const r = clamp(easingFunction(source()));
    return Math.floor(r * (max - min)) + min;
  };
  return compute;
};
var weightedInteger = (maxOrOptions) => weightedIntegerSource(maxOrOptions)();

export {
  chance,
  calculateNonZero,
  gaussian,
  gaussianSource,
  integerSource,
  integer,
  integerUniqueGen,
  mersenneTwister,
  minutesMsSource,
  minutesMs,
  secondsMsSource,
  secondsMs,
  weighted,
  weightedSource,
  weightedIntegerSource,
  weightedInteger,
  random_exports
};
//# sourceMappingURL=chunk-GDACCM3K.js.map