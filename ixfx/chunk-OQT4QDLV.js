import {
  fromNumbers as fromNumbers2,
  fromPoints
} from "./chunk-RZE4OHS2.js";
import {
  linearSpace
} from "./chunk-4DV6BRLR.js";
import {
  mutable
} from "./chunk-K3YF5PK2.js";
import {
  Empty,
  Polar_exports,
  angleRadian,
  bbox,
  bezier_exports,
  center,
  circleCircle,
  circleRect,
  clampMagnitude,
  clampMagnitude2,
  degreeArc,
  degreeToRadian,
  degreesSum,
  distance,
  distanceCenter,
  distanceFromCenter,
  distanceFromExterior,
  distanceFromExterior2,
  divide,
  dotProduct,
  dotProduct2,
  fromCartesian,
  fromNumbers,
  fromTopLeft,
  getPointParameter,
  getPointParameter2,
  getRectPositioned,
  guard as guard2,
  guard2 as guard3,
  guard3 as guard4,
  guardDim,
  guardPositioned,
  guardPositioned2,
  interpolate,
  intersectionLine,
  intersections,
  intersectsPoint,
  isCircle,
  isCirclePositioned,
  isEmpty as isEmpty2,
  isEqual,
  isEqual2,
  isIntersecting,
  isLine,
  isNaN,
  isPlaceholder as isPlaceholder2,
  isPolarCoord,
  isPolyLine,
  isPositioned,
  isPositioned2,
  isQuadraticBezier,
  isRect,
  isRectPositioned,
  length,
  maxFromCorners,
  multiply,
  multiplyScalar,
  normalise,
  normalise2,
  normaliseByRect,
  point_exports,
  project,
  radianArc,
  radianInvert,
  radianToDegree,
  radiansFromAxisX,
  radiansSum,
  reduce2 as reduce,
  rotate,
  subtract,
  sum2 as sum,
  toCartesian,
  toPoint,
  toString,
  toString2
} from "./chunk-B77CGYDG.js";
import {
  guard,
  isEmpty,
  isPlaceholder,
  isPoint,
  isPoint3d,
  scale,
  toRgb8bit
} from "./chunk-W4IV5LHQ.js";
import {
  minFast,
  minIndex
} from "./chunk-YG33FJI6.js";
import {
  clampIndex
} from "./chunk-QAEJS6HO.js";
import {
  sortByNumericProperty
} from "./chunk-WW6MBUMP.js";
import {
  zipKeyValue
} from "./chunk-52QDRU24.js";
import {
  randomElement
} from "./chunk-GIV6V6A3.js";
import {
  defaultRandom
} from "./chunk-5VWJ6TUI.js";
import {
  throwIntegerTest,
  throwNumberTest
} from "./chunk-Z5OJDQCF.js";
import {
  __export
} from "./chunk-L5EJU35C.js";

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => arc_exports,
  Beziers: () => bezier_exports,
  Circles: () => circle_exports,
  Compound: () => CompoundPath_exports,
  Convolve2d: () => Convolve2d_exports,
  CurveSimplification: () => CurveSimplification_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => grid_exports,
  Layouts: () => Layout_exports,
  Lines: () => line_exports,
  Paths: () => path_exports,
  Points: () => point_exports,
  Polar: () => Polar_exports,
  QuadTree: () => QuadTree_exports,
  Rects: () => rect_exports,
  Scaler: () => Scaler_exports,
  Shapes: () => shape_exports,
  SurfacePoints: () => SurfacePoints_exports,
  Triangles: () => triangle_exports,
  Vectors: () => Vector_exports,
  Waypoints: () => Waypoint_exports,
  degreeArc: () => degreeArc,
  degreeToRadian: () => degreeToRadian,
  degreesSum: () => degreesSum,
  radianArc: () => radianArc,
  radianInvert: () => radianInvert,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX,
  radiansSum: () => radiansSum
});

// src/geometry/Waypoint.ts
var Waypoint_exports = {};
__export(Waypoint_exports, {
  fromPoints: () => fromPoints2,
  init: () => init
});

// src/geometry/line/JoinPointsToLines.ts
var joinPointsToLines = (...points) => {
  const lines = [];
  let start = points[0];
  for (let index = 1; index < points.length; index++) {
    lines.push(fromPoints(start, points[index]));
    start = points[index];
  }
  return lines;
};

// src/geometry/line/Angles.ts
var directionVector = (line) => ({
  x: line.b.x - line.a.x,
  y: line.b.y - line.a.y
});
var directionVectorNormalised = (line) => {
  const l = length(line);
  const v = directionVector(line);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var parallel = (line, distance3) => {
  const dv = directionVector(line);
  const dvn = directionVectorNormalised(line);
  const a = {
    x: line.a.x - dvn.y * distance3,
    y: line.a.y + dvn.x * distance3
  };
  return {
    a,
    b: {
      x: a.x + dv.x,
      y: a.y + dv.y
    }
  };
};
var perpendicularPoint = (line, distance3, amount = 0) => {
  const origin = interpolate(amount, line);
  const dvn = directionVectorNormalised(line);
  return {
    x: origin.x - dvn.y * distance3,
    y: origin.y + dvn.x * distance3
  };
};

// src/geometry/line/Midpoint.ts
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointParameter2(aOrLine, pointB);
  return interpolate(0.5, a, b);
};

// src/geometry/line/index.ts
var line_exports = {};
__export(line_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder,
  angleRadian: () => angleRadian2,
  apply: () => apply,
  asPoints: () => asPoints,
  bbox: () => bbox2,
  distance: () => distance2,
  distanceSingleLine: () => distanceSingleLine,
  divide: () => divide2,
  extendFromA: () => extendFromA,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers2,
  fromPivot: () => fromPivot,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointParameter: () => getPointParameter2,
  guard: () => guard4,
  interpolate: () => interpolate,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual3,
  isLine: () => isLine,
  isPlaceholder: () => isPlaceholder3,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length,
  midpoint: () => midpoint,
  multiply: () => multiply2,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect2,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  pointAtX: () => pointAtX,
  pointsOf: () => pointsOf,
  relativePosition: () => relativePosition,
  rotate: () => rotate2,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract2,
  sum: () => sum2,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString3,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange
});

// src/geometry/line/Nearest.ts
var nearest = (line, point2) => {
  const n = (line2) => {
    const { a, b } = line2;
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: point2.x - a.x, y: point2.y - a.y };
    const length4 = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    const t = Math.min(1, Math.max(0, dot / length4));
    dot = (b.x - a.x) * (point2.y - a.y) - (b.y - a.y) * (point2.x - a.x);
    return { x: a.x + atob.x * t, y: a.y + atob.y * t };
  };
  if (Array.isArray(line)) {
    const pts = line.map((l) => n(l));
    const dists = pts.map((p) => distance(p, point2));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n(line));
  }
};

// src/geometry/line/DistanceSingleLine.ts
var distanceSingleLine = (line, point2) => {
  guard4(line, `line`);
  guard(point2, `point`);
  if (length(line) === 0) {
    return length(line.a, point2);
  }
  const near = nearest(line, point2);
  return length(near, point2);
};

// src/geometry/line/Bbox.ts
var bbox2 = (line) => bbox(line.a, line.b);

// src/geometry/line/Divide.ts
var divide2 = (line, point2) => Object.freeze({
  ...line,
  a: divide(line.a, point2),
  b: divide(line.b, point2)
});

// src/geometry/line/FromFlatArray.ts
var fromFlatArray = (array) => {
  if (!Array.isArray(array)) throw new Error(`arr parameter is not an array`);
  if (array.length !== 4) throw new Error(`array is expected to have length four`);
  return fromNumbers2(array[0], array[1], array[2], array[3]);
};

// src/geometry/line/FromPivot.ts
var fromPivot = (origin = { x: 0.5, y: 0.5 }, length4 = 1, angleRadian3 = 0, balance = 0.5) => {
  const left = length4 * balance;
  const right = length4 * (1 - balance);
  const a = toCartesian(left, radianInvert(angleRadian3), origin);
  const b = toCartesian(right, angleRadian3, origin);
  return Object.freeze({
    a,
    b
  });
};

// src/geometry/line/FromPointsToPath.ts
var fromPointsToPath = (a, b) => toPath(fromPoints(a, b));

// src/geometry/line/IsEqual.ts
var isEqual3 = (a, b) => isEqual(a.a, b.a) && isEqual(a.b, b.b);

// src/geometry/line/Multiply.ts
var multiply2 = (line, point2) => Object.freeze({
  ...line,
  a: multiply(line.a, point2),
  b: multiply(line.b, point2)
});

// src/geometry/line/RelativePosition.ts
var relativePosition = (line, pt) => {
  const fromStart = distance(line.a, pt);
  const total = length(line);
  return fromStart / total;
};

// src/geometry/line/Rotate.ts
var rotate2 = (line, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return line;
  if (origin === void 0) origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate(origin, line.a, line.b);
  }
  return Object.freeze({
    ...line,
    a: rotate(line.a, amountRadian, origin),
    b: rotate(line.b, amountRadian, origin)
  });
};

// src/geometry/line/Subtract.ts
var subtract2 = (line, point2) => Object.freeze({
  ...line,
  a: subtract(line.a, point2),
  b: subtract(line.b, point2)
});

// src/geometry/line/Sum.ts
var sum2 = (line, point2) => Object.freeze({
  ...line,
  a: sum(line.a, point2),
  b: sum(line.b, point2)
});

// src/geometry/line/ToString.ts
function toString3(a, b) {
  if (isLine(a)) {
    guard4(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0) throw new Error(`Expect second point if first is a point`);
  return toString2(a) + `-` + toString2(b);
}

// src/geometry/line/index.ts
var Empty2 = Object.freeze({
  a: Object.freeze({ x: 0, y: 0 }),
  b: Object.freeze({ x: 0, y: 0 })
});
var Placeholder = Object.freeze({
  a: Object.freeze({ x: Number.NaN, y: Number.NaN }),
  b: Object.freeze({ x: Number.NaN, y: Number.NaN })
});
var isEmpty3 = (l) => isEmpty(l.a) && isEmpty(l.b);
var isPlaceholder3 = (l) => isPlaceholder(l.a) && isPlaceholder(l.b);
var apply = (line, fn) => Object.freeze(
  {
    ...line,
    a: fn(line.a),
    b: fn(line.b)
  }
);
var angleRadian2 = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var normaliseByRect2 = (line, width, height4) => Object.freeze({
  ...line,
  a: normaliseByRect(line.a, width, height4),
  b: normaliseByRect(line.b, width, height4)
});
var withinRange = (line, point2, maxRange) => {
  const calculatedDistance = distance2(line, point2);
  return calculatedDistance <= maxRange;
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b parameter required`);
  }
  if (b === void 0) {
    throw new TypeError(`Second point missing`);
  } else {
    return (b.y - a.y) / (b.x - a.x);
  }
};
var scaleFromMidpoint = (line, factor) => {
  const a = interpolate(factor / 2, line);
  const b = interpolate(0.5 + factor / 2, line);
  return { a, b };
};
var pointAtX = (line, x) => {
  const y = line.a.y + (x - line.a.x) * slope(line);
  return Object.freeze({ x, y });
};
var extendFromA = (line, distance3) => {
  const calculatedLength = length(line);
  return Object.freeze({
    ...line,
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / calculatedLength * distance3,
      y: line.b.y + (line.b.y - line.a.y) / calculatedLength * distance3
    })
  });
};
function* pointsOf(line) {
  const { a, b } = line;
  let x0 = Math.floor(a.x);
  let y0 = Math.floor(a.y);
  const x1 = Math.floor(b.x);
  const y1 = Math.floor(b.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield { x: x0, y: y0 };
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}
var distance2 = (line, point2) => {
  if (Array.isArray(line)) {
    const distances = line.map((l) => distanceSingleLine(l, point2));
    return minFast(distances);
  } else {
    return distanceSingleLine(line, point2);
  }
};
var toFlatArray = (a, b) => {
  if (isLine(a)) {
    return [a.a.x, a.a.y, a.b.x, a.b.y];
  } else if (isPoint(a) && isPoint(b)) {
    return [a.x, a.y, b.x, b.y];
  } else {
    throw new Error(`Expected single line parameter, or a and b points`);
  }
};
function* asPoints(lines) {
  for (const l of lines) {
    yield l.a;
    yield l.b;
  }
}
var toSvgString = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];

// src/geometry/line/ToPath.ts
var toPath = (line) => {
  const { a, b } = line;
  return Object.freeze({
    ...line,
    length: () => length(a, b),
    interpolate: (amount) => interpolate(amount, a, b),
    relativePosition: (point2) => relativePosition(line, point2),
    bbox: () => bbox2(line),
    toString: () => toString3(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate2(line, amountRadian, origin)),
    nearest: (point2) => nearest(line, point2),
    sum: (point2) => toPath(sum2(line, point2)),
    divide: (point2) => toPath(divide2(line, point2)),
    multiply: (point2) => toPath(multiply2(line, point2)),
    subtract: (point2) => toPath(subtract2(line, point2)),
    midpoint: () => midpoint(a, b),
    distanceToPoint: (point2) => distanceSingleLine(line, point2),
    parallel: (distance3) => parallel(line, distance3),
    perpendicularPoint: (distance3, amount) => perpendicularPoint(line, distance3, amount),
    slope: () => slope(line),
    withinRange: (point2, maxRange) => withinRange(line, point2, maxRange),
    isEqual: (otherLine) => isEqual3(line, otherLine),
    apply: (fn) => toPath(apply(line, fn)),
    kind: `line`
  });
};

// src/geometry/Waypoint.ts
var fromPoints2 = (waypoints, opts = {}) => {
  const lines = joinPointsToLines(...waypoints);
  return init(
    lines.map((l) => toPath(l)),
    opts
  );
};
var init = (paths, opts = {}) => {
  const maxDistanceFromLine = opts.maxDistanceFromLine ?? 0.1;
  const checkUnordered = (pt) => {
    const results = paths.map((p, index) => {
      const nearest3 = p.nearest(pt);
      const distance3 = distance(pt, nearest3);
      const positionRelative = p.relativePosition(nearest3, maxDistanceFromLine);
      ;
      return { positionRelative, path: p, index, nearest: nearest3, distance: distance3, rank: Number.MAX_SAFE_INTEGER };
    });
    const filtered = results.filter((v) => v.distance <= maxDistanceFromLine);
    const sorted = sortByNumericProperty(filtered, `distance`);
    for (let rank = 0; rank < sorted.length; rank++) {
      sorted[rank].rank = rank;
    }
    return sorted;
  };
  return checkUnordered;
};

// src/geometry/Layout.ts
var Layout_exports = {};
__export(Layout_exports, {
  CirclePacking: () => CirclePacking_exports
});

// src/geometry/CirclePacking.ts
var CirclePacking_exports = {};
__export(CirclePacking_exports, {
  random: () => random2
});

// src/geometry/shape/index.ts
var shape_exports = {};
__export(shape_exports, {
  arrow: () => arrow,
  center: () => center3,
  isIntersecting: () => isIntersecting3,
  randomPoint: () => randomPoint3,
  starburst: () => starburst
});

// src/geometry/rect/Corners.ts
var corners = (rect, origin) => {
  const r = getRectPositioned(rect, origin);
  return [
    { x: r.x, y: r.y },
    { x: r.x + r.width, y: r.y },
    { x: r.x + r.width, y: r.y + r.height },
    { x: r.x, y: r.y + r.height }
  ];
};

// src/geometry/circle/IsContainedBy.ts
var isContainedBy = (a, b, c) => {
  const d = distanceCenter(a, b);
  if (isCircle(b)) {
    return d < Math.abs(a.radius - b.radius);
  } else if (isPoint(b)) {
    if (c === void 0) {
      return d <= a.radius;
    } else {
      return d < Math.abs(a.radius - c);
    }
  } else throw new Error(`b parameter is expected to be CirclePositioned or Point`);
};

// src/geometry/circle/Intersecting.ts
var isIntersecting2 = (a, b, c) => {
  if (isEqual(a, b)) return true;
  if (isContainedBy(a, b, c)) return true;
  if (isCircle(b)) {
    return circleCircle(a, b);
  } else if (isRectPositioned(b)) {
    return circleRect(a, b);
  } else if (isPoint(b) && c !== void 0) {
    return circleCircle(a, { ...b, radius: c });
  }
  return false;
};

// src/geometry/circle/Random.ts
var piPi = Math.PI * 2;
var randomPoint = (within, opts = {}) => {
  const offset2 = isCirclePositioned(within) ? within : { x: 0, y: 0 };
  const strategy = opts.strategy ?? `uniform`;
  const margin = opts.margin ?? 0;
  const radius = within.radius - margin;
  const rand = opts.randomSource ?? Math.random;
  switch (strategy) {
    case `naive`: {
      return sum(offset2, toCartesian(rand() * radius, rand() * piPi));
    }
    case `uniform`: {
      return sum(offset2, toCartesian(Math.sqrt(rand()) * radius, rand() * piPi));
    }
    default: {
      throw new Error(`Unknown strategy '${strategy}'. Expects 'uniform' or 'naive'`);
    }
  }
};

// src/geometry/circle/Center.ts
var center2 = (circle) => {
  return isCirclePositioned(circle) ? Object.freeze({ x: circle.x, y: circle.y }) : Object.freeze({ x: circle.radius, y: circle.radius });
};

// src/geometry/rect/Random.ts
var random = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando(),
    width: rando(),
    height: rando()
  });
};
var randomPoint2 = (within, options = {}) => {
  const rand = options.randomSource ?? defaultRandom;
  const margin = options.margin ?? { x: 0, y: 0 };
  const x = rand() * (within.width - margin.x - margin.x);
  const y = rand() * (within.height - margin.y - margin.y);
  const pos = { x: x + margin.x, y: y + margin.y };
  return isPositioned2(within) ? sum(pos, within) : Object.freeze(pos);
};

// src/geometry/shape/index.ts
var isIntersecting3 = (a, b) => {
  if (isCirclePositioned(a)) {
    return isIntersecting2(a, b);
  } else if (isRectPositioned(a)) {
    return isIntersecting(a, b);
  }
  throw new Error(
    `a or b are unknown shapes. a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`
  );
};
var randomPoint3 = (shape, opts = {}) => {
  if (isCirclePositioned(shape)) {
    return randomPoint(shape, opts);
  } else if (isRectPositioned(shape)) {
    return randomPoint2(shape, opts);
  }
  throw new Error(`Unknown shape. Only CirclePositioned and RectPositioned are supported.`);
};
var center3 = (shape) => {
  if (shape === void 0) {
    return Object.freeze({ x: 0.5, y: 0.5 });
  } else if (isRect(shape)) {
    return center(shape);
  } else if (triangle_exports.isTriangle(shape)) {
    return triangle_exports.centroid(shape);
  } else if (isCircle(shape)) {
    return center2(shape);
  } else {
    throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
};
var starburst = (outerRadius, points = 5, innerRadius, origin = point_exports.Empty, opts) => {
  throwIntegerTest(points, `positive`, `points`);
  const angle = Math.PI * 2 / points;
  const angleHalf = angle / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0) innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let index = 0; index < points; index++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (index + 1 < points) pts.push(right);
    a += angle;
  }
  return pts;
};
var arrow = (origin, from, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian3 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from === `tip`) {
    tri = triangle_exports.equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = corners(
      fromTopLeft(
        { x: tri.a.x - tailLength, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
  } else if (from === `middle`) {
    const midX = tailLength + arrowSize / 2;
    const midY = tailThickness / 2;
    tri = triangle_exports.equilateralFromVertex(
      {
        x: origin.x + arrowSize * 1.2,
        y: origin.y
      },
      arrowSize,
      triAngle
    );
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x - midX, y: origin.y - midY },
        tailLength + arrowSize,
        tailThickness
      )
    );
  } else {
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
    tri = triangle_exports.equilateralFromVertex(
      { x: origin.x + tailLength + arrowSize * 0.7, y: origin.y },
      arrowSize,
      triAngle
    );
  }
  const arrow2 = point_exports.rotate(
    [
      tailPoints[0],
      tailPoints[1],
      tri.a,
      tri.b,
      tri.c,
      tailPoints[2],
      tailPoints[3]
    ],
    angleRadian3,
    origin
  );
  return arrow2;
};

// src/geometry/CirclePacking.ts
var random2 = (circles, container, opts = {}) => {
  if (!Array.isArray(circles)) throw new Error(`Parameter 'circles' is not an array`);
  const attempts = opts.attempts ?? 2e3;
  const sorted = sortByNumericProperty(circles, `radius`);
  const positionedCircles = [];
  const willHit = (b, radius) => positionedCircles.some((v) => isIntersecting2(v, b, radius));
  while (sorted.length > 0) {
    const circle = sorted.pop();
    if (!circle) break;
    const randomPointOpts = { ...opts, margin: { x: circle.radius, y: circle.radius } };
    for (let index = 0; index < attempts; index++) {
      const position = randomPoint3(container, randomPointOpts);
      if (!willHit(position, circle.radius)) {
        positionedCircles.push(Object.freeze({ ...circle, ...position }));
        break;
      }
    }
  }
  return positionedCircles;
};

// src/geometry/circle/index.ts
var circle_exports = {};
__export(circle_exports, {
  area: () => area,
  bbox: () => bbox3,
  center: () => center2,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter,
  distanceFromExterior: () => distanceFromExterior,
  exteriorIntegerPoints: () => exteriorIntegerPoints,
  guard: () => guard2,
  guardPositioned: () => guardPositioned,
  interiorIntegerPoints: () => interiorIntegerPoints,
  interpolate: () => interpolate2,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEqual: () => isEqual2,
  isIntersecting: () => isIntersecting2,
  isNaN: () => isNaN,
  isPositioned: () => isPositioned,
  length: () => length2,
  multiplyScalar: () => multiplyScalar2,
  nearest: () => nearest2,
  pointOnPerimeter: () => pointOnPerimeter,
  randomPoint: () => randomPoint,
  toPath: () => toPath2,
  toPositioned: () => toPositioned,
  toSvg: () => toSvg
});

// src/geometry/circle/Area.ts
var area = (circle) => {
  guard2(circle);
  return Math.PI * circle.radius * circle.radius;
};

// src/geometry/rect/FromCenter.ts
var fromCenter = (origin, width, height4) => {
  guard(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height4, `height`);
  const halfW = width / 2;
  const halfH = height4 / 2;
  return {
    x: origin.x - halfW,
    y: origin.y - halfH,
    width,
    height: height4
  };
};

// src/geometry/circle/Bbox.ts
var bbox3 = (circle) => {
  return isCirclePositioned(circle) ? fromCenter(circle, circle.radius * 2, circle.radius * 2) : { width: circle.radius * 2, height: circle.radius * 2, x: 0, y: 0 };
};

// src/geometry/circle/ExteriorPoints.ts
function* exteriorIntegerPoints(circle) {
  const { x, y, radius } = circle;
  let xx = radius;
  let yy = 0;
  let radiusError = 1 - x;
  while (xx >= yy) {
    yield { x: xx + x, y: yy + y };
    yield { x: yy + x, y: xx + y };
    yield { x: -xx + x, y: yy + y };
    yield { x: -yy + x, y: xx + y };
    yield { x: -xx + x, y: -yy + y };
    yield { x: -yy + x, y: -xx + y };
    yield { x: xx + x, y: -yy + y };
    yield { x: yy + x, y: -xx + y };
    yy++;
    if (radiusError < 0) {
      radiusError += 2 * yy + 1;
    } else {
      xx--;
      radiusError += 2 * (yy - xx + 1);
    }
  }
}

// src/geometry/circle/InteriorPoints.ts
function* interiorIntegerPoints(circle) {
  const xMin = circle.x - circle.radius;
  const xMax = circle.x + circle.radius;
  const yMin = circle.y - circle.radius;
  const yMax = circle.y + circle.radius;
  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      const r = Math.abs(distance(circle, x, y));
      if (r <= circle.radius) yield { x, y };
    }
  }
}

// src/geometry/circle/Perimeter.ts
var piPi2 = Math.PI * 2;
var nearest2 = (circle, point2) => {
  const n = (a) => {
    const l = Math.sqrt(Math.pow(point2.x - a.x, 2) + Math.pow(point2.y - a.y, 2));
    const x = a.x + a.radius * ((point2.x - a.x) / l);
    const y = a.y + a.radius * ((point2.y - a.y) / l);
    return { x, y };
  };
  if (Array.isArray(circle)) {
    const pts = circle.map((l) => n(l));
    const dists = pts.map((p) => distance(p, point2));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n(circle));
  }
};
var pointOnPerimeter = (circle, angleRadian3, origin) => {
  if (origin === void 0) {
    origin = isCirclePositioned(circle) ? circle : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(-angleRadian3) * circle.radius + origin.x,
    y: Math.sin(-angleRadian3) * circle.radius + origin.y
  };
};
var circumference = (circle) => {
  guard2(circle);
  return piPi2 * circle.radius;
};
var length2 = (circle) => circumference(circle);

// src/geometry/circle/Interpolate.ts
var piPi3 = Math.PI * 2;
var interpolate2 = (circle, t) => pointOnPerimeter(circle, t * piPi3);

// src/geometry/circle/Multiply.ts
function multiplyScalar2(a, value) {
  if (isCirclePositioned(a)) {
    const pt = multiplyScalar(a, value);
    return Object.freeze({
      ...a,
      ...pt,
      radius: a.radius * value
    });
  } else {
    return Object.freeze({
      ...a,
      radius: a.radius * value
    });
  }
}

// src/geometry/circle/Svg.ts
var toSvg = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) {
      return toSvgFull(a.radius, origin, sweep);
    }
    if (isCirclePositioned(a)) {
      return toSvgFull(a.radius, a, sweep);
    } else throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin === void 0) {
      throw new Error(`origin parameter needed`);
    } else {
      return toSvgFull(a, origin, sweep);
    }
  }
};
var toSvgFull = (radius, origin, sweep) => {
  const { x, y } = origin;
  const s = sweep ? `1` : `0`;
  return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`
`);
};

// src/geometry/circle/ToPath.ts
var toPath2 = (circle) => {
  guard2(circle);
  return {
    ...circle,
    nearest: (point2) => nearest2(circle, point2),
    /**
     * Returns a relative (0.0-1.0) point on a circle. 0=3 o'clock, 0.25=6 o'clock, 0.5=9 o'clock, 0.75=12 o'clock etc.
     * @param {t} Relative (0.0-1.0) point
     * @returns {Point} X,y
     */
    interpolate: (t) => interpolate2(circle, t),
    bbox: () => bbox3(circle),
    length: () => circumference(circle),
    toSvgString: (sweep = true) => toSvg(circle, sweep),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `circular`
  };
};

// src/geometry/circle/ToPositioned.ts
var toPositioned = (circle, defaultPositionOrX, y) => {
  if (isCirclePositioned(circle)) return circle;
  const pt = getPointParameter(defaultPositionOrX, y);
  return Object.freeze({
    ...circle,
    ...pt
  });
};

// src/geometry/rect/index.ts
var rect_exports = {};
__export(rect_exports, {
  Empty: () => Empty3,
  EmptyPositioned: () => EmptyPositioned,
  Placeholder: () => Placeholder2,
  PlaceholderPositioned: () => PlaceholderPositioned,
  applyDim: () => applyDim,
  applyFields: () => applyFields,
  applyMerge: () => applyMerge,
  applyScalar: () => applyScalar,
  area: () => area2,
  cardinal: () => cardinal,
  center: () => center,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior2,
  divide: () => divide3,
  divideDim: () => divideDim,
  divideScalar: () => divideScalar,
  dividerByLargestDimension: () => dividerByLargestDimension,
  edges: () => edges,
  encompass: () => encompass,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromNumbers: () => fromNumbers3,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  getRectPositioned: () => getRectPositioned,
  getRectPositionedParameter: () => getRectPositionedParameter,
  guard: () => guard3,
  guardDim: () => guardDim,
  guardPositioned: () => guardPositioned2,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty2,
  isEqual: () => isEqual4,
  isEqualSize: () => isEqualSize,
  isIntersecting: () => isIntersecting,
  isPlaceholder: () => isPlaceholder2,
  isPositioned: () => isPositioned2,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply3,
  multiplyDim: () => multiplyDim,
  multiplyScalar: () => multiplyScalar3,
  nearestInternal: () => nearestInternal,
  random: () => random,
  randomPoint: () => randomPoint2,
  subtract: () => subtract3,
  subtractOffset: () => subtractOffset,
  sum: () => sum3,
  sumOffset: () => sumOffset,
  toArray: () => toArray
});

// src/geometry/rect/Area.ts
var area2 = (rect) => {
  guard3(rect);
  return rect.height * rect.width;
};

// src/geometry/rect/Apply.ts
function applyFields(op, rectOrWidth, heightValue) {
  let width = typeof rectOrWidth === `number` ? rectOrWidth : rectOrWidth.width;
  let height4 = typeof rectOrWidth === `number` ? heightValue : rectOrWidth.height;
  if (width === void 0) throw new Error(`Param 'width' undefined`);
  if (height4 === void 0) throw new Error(`Param 'height' undefined`);
  width = op(width, `width`);
  height4 = op(height4, `height`);
  if (typeof rectOrWidth === `object`) {
    if (isPositioned2(rectOrWidth)) {
      const x = op(rectOrWidth.x, `x`);
      const y = op(rectOrWidth.y, `y`);
      return { ...rectOrWidth, width, height: height4, x, y };
    } else {
      return {
        ...rectOrWidth,
        width,
        height: height4
      };
    }
  }
  return { width, height: height4 };
}
function applyMerge(op, a, b, c) {
  guard3(a, `a`);
  if (isRect(b)) {
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: op(a.x, b.width),
      y: op(a.y, b.height),
      width: op(a.width, b.width),
      height: op(a.height, b.height)
    }) : Object.freeze({
      ...a,
      width: op(a.width, b.width),
      height: op(a.height, b.height)
    });
  } else {
    if (typeof b !== `number`) {
      throw new TypeError(
        `Expected second parameter of type Rect or number. Got ${JSON.stringify(
          b
        )}`
      );
    }
    if (typeof c !== `number`) throw new Error(`Expected third param as height. Got ${JSON.stringify(c)}`);
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: op(a.x, b),
      y: op(a.y, c),
      width: op(a.width, b),
      height: op(a.height, c)
    }) : Object.freeze({
      ...a,
      width: op(a.width, b),
      height: op(a.height, c)
    });
  }
}
function applyScalar(op, rect, parameter) {
  return isPositioned2(rect) ? Object.freeze({
    ...rect,
    x: op(rect.x, parameter),
    y: op(rect.y, parameter),
    width: op(rect.width, parameter),
    height: op(rect.height, parameter)
  }) : Object.freeze({
    ...rect,
    width: op(rect.width, parameter),
    height: op(rect.height, parameter)
  });
}
function applyDim(op, rect, parameter) {
  return Object.freeze({
    ...rect,
    width: op(rect.width, parameter),
    height: op(rect.height, parameter)
  });
}

// src/geometry/rect/Cardinal.ts
var cardinal = (rect, card) => {
  const { x, y, width, height: height4 } = rect;
  switch (card) {
    case `nw`: {
      return Object.freeze({ x, y });
    }
    case `n`: {
      return Object.freeze({
        x: x + width / 2,
        y
      });
    }
    case `ne`: {
      return Object.freeze({
        x: x + width,
        y
      });
    }
    case `sw`: {
      return Object.freeze({ x, y: y + height4 });
    }
    case `s`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4
      });
    }
    case `se`: {
      return Object.freeze({
        x: x + width,
        y: y + height4
      });
    }
    case `w`: {
      return Object.freeze({ x, y: y + height4 / 2 });
    }
    case `e`: {
      return Object.freeze({ x: x + width, y: y + height4 / 2 });
    }
    case `center`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4 / 2
      });
    }
    default: {
      throw new Error(`Unknown direction: ${card}`);
    }
  }
};

// src/geometry/rect/Divide.ts
var divideOp = (a, b) => a / b;
function divide3(a, b, c) {
  return applyMerge(divideOp, a, b, c);
}
function divideScalar(rect, amount) {
  return applyScalar(divideOp, rect, amount);
}
function divideDim(rect, amount) {
  return applyDim(divideOp, rect, amount);
}

// src/geometry/rect/Edges.ts
var edges = (rect, origin) => {
  const c = corners(rect, origin);
  return joinPointsToLines(...c, c[0]);
};
var getEdgeX = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.x + rect.width : rect.width;
    }
  }
};
var getEdgeY = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.y + rect.height : rect.height;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.y : 0;
    }
  }
};

// src/geometry/rect/Empty.ts
var Empty3 = Object.freeze({ width: 0, height: 0 });
var EmptyPositioned = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

// src/geometry/rect/Encompass.ts
var encompass = (rect, ...points) => {
  const x = points.map((p) => p.x);
  const y = points.map((p) => p.y);
  let minX = Math.min(...x, rect.x);
  let minY = Math.min(...y, rect.y);
  let maxX = Math.max(...x, rect.x + rect.width);
  let maxY = Math.max(...y, rect.y + rect.height);
  let rectW = Math.max(rect.width, maxX - minX);
  let rectH = Math.max(rect.height, maxY - minY);
  return Object.freeze({
    ...rect,
    x: minX,
    y: minY,
    width: rectW,
    height: rectH
  });
};

// src/geometry/rect/FromElement.ts
var fromElement = (el) => ({
  width: el.clientWidth,
  height: el.clientHeight
});

// src/geometry/rect/FromNumbers.ts
function fromNumbers3(xOrWidth, yOrHeight, width, height4) {
  if (width === void 0 || height4 === void 0) {
    if (typeof xOrWidth !== `number`) throw new Error(`width is not an number`);
    if (typeof yOrHeight !== `number`) {
      throw new TypeError(`height is not an number`);
    }
    return Object.freeze({ width: xOrWidth, height: yOrHeight });
  }
  if (typeof xOrWidth !== `number`) throw new Error(`x is not an number`);
  if (typeof yOrHeight !== `number`) throw new Error(`y is not an number`);
  if (typeof width !== `number`) throw new Error(`width is not an number`);
  if (typeof height4 !== `number`) throw new Error(`height is not an number`);
  return Object.freeze({ x: xOrWidth, y: yOrHeight, width, height: height4 });
}

// src/geometry/rect/GetRectPositionedParameter.ts
function getRectPositionedParameter(a, b, c, d) {
  if (typeof a === `number`) {
    if (typeof b === `number`) {
      if (typeof c === `number` && typeof d === `number`) {
        return { x: a, y: b, width: c, height: d };
      } else if (isRect(c)) {
        return { x: a, y: b, width: c.width, height: c.height };
      } else {
        throw new TypeError(`If params 'a' & 'b' are numbers, expect following parameters to be x,y or Rect`);
      }
    } else {
      throw new TypeError(`If parameter 'a' is a number, expect following parameters to be: y,w,h`);
    }
  } else if (isRectPositioned(a)) {
    return a;
  } else if (isRect(a)) {
    if (typeof b === `number` && typeof c === `number`) {
      return { width: a.width, height: a.height, x: b, y: c };
    } else if (isPoint(b)) {
      return { width: a.width, height: a.height, x: b.x, y: b.y };
    } else {
      throw new TypeError(`If param 'a' is a Rect, expects following parameters to be x,y`);
    }
  } else if (isPoint(a)) {
    if (typeof b === `number` && typeof c === `number`) {
      return { x: a.x, y: a.y, width: b, height: c };
    } else if (isRect(b)) {
      return { x: a.x, y: a.y, width: b.width, height: b.height };
    } else {
      throw new TypeError(`If parameter 'a' is a Point, expect following params to be: Rect or width,height`);
    }
  }
  throw new TypeError(`Expect a first parameter to be x,RectPositioned,Rect or Point`);
}

// src/geometry/rect/IsEqual.ts
var isEqualSize = (a, b) => {
  if (a === void 0) throw new Error(`a undefined`);
  if (b === void 0) throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
var isEqual4 = (a, b) => {
  if (isPositioned2(a) && isPositioned2(b)) {
    if (!isEqual(a, b)) return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned2(a) && !isPositioned2(b)) {
    return a.width === b.width && a.height === b.height;
  } else {
    return false;
  }
};

// src/geometry/rect/Lengths.ts
var lengths = (rect) => {
  guardPositioned2(rect, `rect`);
  return edges(rect).map((l) => length(l));
};

// src/geometry/rect/Multiply.ts
var multiplyOp = (a, b) => a * b;
function multiply3(a, b, c) {
  return applyMerge(multiplyOp, a, b, c);
}
function multiplyScalar3(rect, amount) {
  return applyScalar(multiplyOp, rect, amount);
}
function multiplyDim(rect, amount) {
  return applyDim(multiplyOp, rect, amount);
}

// src/geometry/rect/Nearest.ts
var nearestInternal = (rect, p) => {
  let { x, y } = p;
  if (x < rect.x) x = rect.x;
  else if (x > rect.x + rect.width) x = rect.x + rect.width;
  if (y < rect.y) y = rect.y;
  else if (y > rect.y + rect.height) y = rect.y + rect.height;
  return Object.freeze({ ...p, x, y });
};

// src/geometry/rect/Placeholder.ts
var Placeholder2 = Object.freeze({
  width: Number.NaN,
  height: Number.NaN
});
var PlaceholderPositioned = Object.freeze({
  x: Number.NaN,
  y: Number.NaN,
  width: Number.NaN,
  height: Number.NaN
});

// src/geometry/rect/NormaliseByRect.ts
var dividerByLargestDimension = (rect) => {
  const largest = Math.max(rect.width, rect.height);
  return (value) => {
    if (typeof value === `number`) {
      return value / largest;
    } else if (isPoint3d(value)) {
      return Object.freeze({
        ...value,
        x: value.x / largest,
        y: value.y / largest,
        z: value.x / largest
      });
    } else if (isPoint(value)) {
      return Object.freeze({
        ...value,
        x: value.x / largest,
        y: value.y / largest
      });
    } else throw new Error(`Param 'value' is neither number nor Point`);
  };
};

// src/geometry/rect/Subtract.ts
var subtractOp = (a, b) => a - b;
function subtract3(a, b, c) {
  return applyMerge(subtractOp, a, b, c);
}
function subtractOffset(a, b) {
  let x = 0;
  let y = 0;
  if (isPositioned2(a)) {
    x = a.x;
    y = a.y;
  }
  let xB = 0;
  let yB = 0;
  if (isPositioned2(b)) {
    xB = b.x;
    yB = b.y;
  }
  return Object.freeze({
    ...a,
    x: x - xB,
    y: y - yB,
    width: a.width - b.width,
    height: a.height - b.height
  });
}

// src/geometry/rect/Sum.ts
var sumOp = (a, b) => a + b;
function sum3(a, b, c) {
  return applyMerge(sumOp, a, b, c);
}
function sumOffset(a, b) {
  let x = 0;
  let y = 0;
  if (isPositioned2(a)) {
    x = a.x;
    y = a.y;
  }
  let xB = 0;
  let yB = 0;
  if (isPositioned2(b)) {
    xB = b.x;
    yB = b.y;
  }
  return Object.freeze({
    ...a,
    x: x + xB,
    y: y + yB,
    width: a.width + b.width,
    height: a.height + b.height
  });
}

// src/geometry/rect/ToArray.ts
function toArray(rect) {
  if (isPositioned2(rect)) {
    return [rect.x, rect.y, rect.width, rect.height];
  } else if (isRect(rect)) {
    return [rect.width, rect.height];
  } else {
    throw new Error(
      `Param 'rect' is not a rectangle. Got: ${JSON.stringify(rect)}`
    );
  }
}

// src/geometry/path/index.ts
var path_exports = {};
__export(path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});
var getStart = function(path) {
  if (isQuadraticBezier(path)) return path.a;
  else if (isLine(path)) return path.a;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
var getEnd = function(path) {
  if (isQuadraticBezier(path)) return path.b;
  else if (isLine(path)) return path.b;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};

// src/geometry/grid/index.ts
var grid_exports = {};
__export(grid_exports, {
  Array1d: () => Array1d_exports,
  Array2d: () => Array2d_exports,
  As: () => As_exports,
  By: () => enumerators_exports,
  Visit: () => visitors_exports,
  allDirections: () => allDirections,
  applyBounds: () => applyBounds,
  asRectangles: () => asRectangles,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellFromIndex: () => cellFromIndex,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  guardGrid: () => guardGrid,
  indexFromCell: () => indexFromCell,
  inside: () => inside,
  isCell: () => isCell,
  isEqual: () => isEqual5,
  neighbourList: () => neighbourList,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  randomNeighbour: () => randomNeighbour,
  rectangleForCell: () => rectangleForCell,
  simpleLine: () => simpleLine,
  toArray2d: () => toArray2d,
  values: () => values
});

// src/geometry/grid/Inside.ts
var inside = (grid2, cell) => {
  if (cell.x < 0 || cell.y < 0) return false;
  if (cell.x >= grid2.cols || cell.y >= grid2.rows) return false;
  return true;
};

// src/geometry/grid/Guards.ts
var isCell = (cell) => {
  if (cell === void 0) return false;
  return `x` in cell && `y` in cell;
};
var guardCell = (cell, parameterName = `Param`, grid2) => {
  if (cell === void 0) {
    throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
  }
  if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
  if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
  if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
  if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
  if (!Number.isInteger(cell.x)) {
    throw new TypeError(parameterName + `.x is non-integer`);
  }
  if (!Number.isInteger(cell.y)) {
    throw new TypeError(parameterName + `.y is non-integer`);
  }
  if (grid2 !== void 0 && !inside(grid2, cell)) {
    throw new Error(
      `${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid2.cols}, ${grid2.rows}`
    );
  }
};
var guardGrid = (grid2, parameterName = `Param`) => {
  if (grid2 === void 0) {
    throw new Error(`${parameterName} is undefined. Expecting grid.`);
  }
  if (!(`rows` in grid2)) throw new Error(`${parameterName}.rows is undefined`);
  if (!(`cols` in grid2)) throw new Error(`${parameterName}.cols is undefined`);
  if (!Number.isInteger(grid2.rows)) {
    throw new TypeError(`${parameterName}.rows is not an integer`);
  }
  if (!Number.isInteger(grid2.cols)) {
    throw new TypeError(`${parameterName}.cols is not an integer`);
  }
};

// src/geometry/grid/ApplyBounds.ts
var applyBounds = function(grid2, cell, wrap4 = `undefined`) {
  guardGrid(grid2, `grid`);
  guardCell(cell, `cell`);
  let x = cell.x;
  let y = cell.y;
  switch (wrap4) {
    case `wrap`: {
      x = x % grid2.cols;
      y = y % grid2.rows;
      if (x < 0) x = grid2.cols + x;
      else if (x >= grid2.cols) {
        x -= grid2.cols;
      }
      if (y < 0) y = grid2.rows + y;
      else if (y >= grid2.rows) {
        y -= grid2.rows;
      }
      x = Math.abs(x);
      y = Math.abs(y);
      break;
    }
    case `stop`: {
      x = clampIndex(x, grid2.cols);
      y = clampIndex(y, grid2.rows);
      break;
    }
    case `undefined`: {
      if (x < 0 || y < 0) return;
      if (x >= grid2.cols || y >= grid2.rows) return;
      break;
    }
    case `unbounded`: {
      break;
    }
    default: {
      throw new Error(`Unknown BoundsLogic '${wrap4}'. Expected: wrap, stop, undefined or unbounded`);
    }
  }
  return Object.freeze({ x, y });
};

// src/geometry/grid/Array1d.ts
var Array1d_exports = {};
__export(Array1d_exports, {
  access: () => access,
  createArray: () => createArray,
  createMutable: () => createMutable,
  set: () => set,
  setMutate: () => setMutate,
  wrap: () => wrap,
  wrapMutable: () => wrapMutable
});
var access = (array, cols) => {
  const grid2 = gridFromArrayDimensions(array, cols);
  const fn = (cell, wrap4 = `undefined`) => accessWithGrid(grid2, array, cell, wrap4);
  return fn;
};
var accessWithGrid = (grid2, array, cell, wrap4) => {
  const index = indexFromCell(grid2, cell, wrap4);
  if (index === void 0) return void 0;
  return array[index];
};
var setMutate = (array, cols) => {
  const grid2 = gridFromArrayDimensions(array, cols);
  return (value, cell, wrap4 = `undefined`) => setMutateWithGrid(grid2, array, value, cell, wrap4);
};
var setMutateWithGrid = (grid2, array, value, cell, wrap4) => {
  const index = indexFromCell(grid2, cell, wrap4);
  if (index === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid2.cols} rows: ${grid2.rows}`);
  array[index] = value;
  return array;
};
var set = (array, cols) => {
  const grid2 = gridFromArrayDimensions(array, cols);
  return (value, cell, wrap4) => setWithGrid(grid2, array, value, cell, wrap4);
};
var setWithGrid = (grid2, array, value, cell, wrap4) => {
  const index = indexFromCell(grid2, cell, wrap4);
  if (index === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid2.cols} rows: ${grid2.rows}`);
  let copy = [...array];
  copy[index] = value;
  array = copy;
  return copy;
};
var gridFromArrayDimensions = (array, cols) => {
  const grid2 = { cols, rows: Math.ceil(array.length / cols) };
  return grid2;
};
var wrapMutable = (array, cols) => {
  const grid2 = gridFromArrayDimensions(array, cols);
  return {
    ...grid2,
    get: access(array, cols),
    set: setMutate(array, cols),
    get array() {
      return array;
    }
  };
};
var wrap = (array, cols) => {
  const grid2 = gridFromArrayDimensions(array, cols);
  return {
    ...grid2,
    get: (cell, boundsLogic = `undefined`) => accessWithGrid(grid2, array, cell, boundsLogic),
    set: (value, cell, boundsLogic = `undefined`) => {
      array = setWithGrid(grid2, array, value, cell, boundsLogic);
      return wrap(array, cols);
    },
    get array() {
      return array;
    }
  };
};
var createArray = (initialValue, rowsOrGrid, columns2) => {
  const rows2 = typeof rowsOrGrid === `number` ? rowsOrGrid : rowsOrGrid.rows;
  const cols = typeof rowsOrGrid === `object` ? rowsOrGrid.cols : columns2;
  if (!cols) throw new Error(`Parameter 'columns' missing`);
  throwIntegerTest(rows2, `aboveZero`, `rows`);
  throwIntegerTest(cols, `aboveZero`, `cols`);
  let t = [];
  let total = rows2 * cols;
  for (let i = 0; i < total; i++) {
    t[i] = initialValue;
  }
  return t;
};
var createMutable = (initialValue, rowsOrGrid, columns2) => {
  const rows2 = typeof rowsOrGrid === `number` ? rowsOrGrid : rowsOrGrid.rows;
  const cols = typeof rowsOrGrid === `object` ? rowsOrGrid.cols : columns2;
  if (!cols) throw new Error(`Parameter 'columns' missing`);
  const arr = createArray(initialValue, rows2, cols);
  return wrapMutable(arr, cols);
};

// src/geometry/grid/Array2d.ts
var Array2d_exports = {};
__export(Array2d_exports, {
  access: () => access2,
  create: () => create,
  set: () => set2,
  setMutate: () => setMutate2,
  wrap: () => wrap2,
  wrapMutable: () => wrapMutable2
});
var create = (array) => {
  let colLen = NaN;
  for (const row of array) {
    if (Number.isNaN(colLen)) {
      colLen = row.length;
    } else {
      if (colLen !== row.length) throw new Error(`Array does not have uniform column length`);
    }
  }
  return { rows: array.length, cols: colLen };
};
var setMutate2 = (array) => {
  const grid2 = create(array);
  return (value, cell, wrap4 = `undefined`) => setMutateWithGrid2(grid2, array, value, cell, wrap4);
};
var setMutateWithGrid2 = (grid2, array, value, cell, bounds) => {
  let boundCell = applyBounds(grid2, cell, bounds);
  if (boundCell === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid2.cols} rows: ${grid2.rows}`);
  array[boundCell.y][boundCell.x] = value;
  return array;
};
var access2 = (array) => {
  const grid2 = create(array);
  const fn = (cell, wrap4 = `undefined`) => accessWithGrid2(grid2, array, cell, wrap4);
  return fn;
};
var accessWithGrid2 = (grid2, array, cell, wrap4) => {
  let boundCell = applyBounds(grid2, cell, wrap4);
  if (boundCell === void 0) return void 0;
  return array[boundCell.y][boundCell.x];
};
var wrapMutable2 = (array) => {
  const grid2 = create(array);
  return {
    ...grid2,
    get: access2(array),
    set: setMutate2(array),
    get array() {
      return array;
    }
  };
};
var set2 = (array) => {
  const grid2 = create(array);
  return (value, cell, wrap4) => setWithGrid2(grid2, array, value, cell, wrap4);
};
var setWithGrid2 = (grid2, array, value, cell, wrap4) => {
  let boundCell = applyBounds(grid2, cell, wrap4);
  if (boundCell === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid cols: ${grid2.cols} rows: ${grid2.rows}`);
  let copyWhole = [...array];
  let copyRow = [...copyWhole[boundCell.y]];
  copyRow[boundCell.x] = value;
  copyWhole[boundCell.y] = copyRow;
  array = copyWhole;
  return copyWhole;
};
var wrap2 = (array) => {
  const grid2 = create(array);
  return {
    ...grid2,
    get: (cell, boundsLogic = `undefined`) => accessWithGrid2(grid2, array, cell, boundsLogic),
    set: (value, cell, boundsLogic = `undefined`) => {
      array = setWithGrid2(grid2, array, value, cell, boundsLogic);
      return wrap2(array);
    },
    get array() {
      return array;
    }
  };
};

// src/geometry/grid/As.ts
var As_exports = {};
__export(As_exports, {
  columns: () => columns,
  rows: () => rows
});

// src/geometry/grid/Values.ts
function* values(grid2, iter) {
  for (const d of iter) {
    if (Array.isArray(d)) {
      yield d.map((v) => grid2.get(v, `undefined`));
    } else {
      yield grid2.get(d, `undefined`);
    }
  }
}

// src/geometry/grid/enumerators/Cells.ts
function* cells(grid2, start, wrap4 = true) {
  if (!start) start = { x: 0, y: 0 };
  guardGrid(grid2, `grid`);
  guardCell(start, `start`, grid2);
  let { x, y } = start;
  let canMove = true;
  do {
    yield { x, y };
    x++;
    if (x === grid2.cols) {
      y++;
      x = 0;
    }
    if (y === grid2.rows) {
      if (wrap4) {
        y = 0;
        x = 0;
      } else {
        canMove = false;
      }
    }
    if (x === start.x && y === start.y) canMove = false;
  } while (canMove);
}
function* cellValues(grid2, start, wrap4 = true) {
  yield* values(grid2, cells(grid2, start, wrap4));
}
function* cellsAndValues(grid2, start, wrap4 = true) {
  for (const cell of cells(grid2, start, wrap4)) {
    yield { cell, value: grid2.get(cell) };
  }
}

// src/geometry/grid/As.ts
var rows = function* (grid2, start) {
  if (!start) start = { x: 0, y: 0 };
  let row = start.y;
  let rowCells = [];
  for (const c of cells(grid2, start)) {
    if (c.y === row) {
      rowCells.push(c);
    } else {
      yield rowCells;
      rowCells = [c];
      row = c.y;
    }
  }
  if (rowCells.length > 0) yield rowCells;
};
function* columns(grid2, start) {
  if (!start) start = { x: 0, y: 0 };
  for (let x = start.x; x < grid2.cols; x++) {
    let colCells = [];
    for (let y = start.y; y < grid2.rows; y++) {
      colCells.push({ x, y });
    }
    yield colCells;
  }
}

// src/geometry/grid/Offset.ts
var offset = function(grid2, start, vector, bounds = `undefined`) {
  return applyBounds(grid2, {
    x: start.x + vector.x,
    y: start.y + vector.y
  }, bounds);
};

// src/geometry/grid/Directions.ts
var allDirections = Object.freeze([
  `n`,
  `ne`,
  `nw`,
  `e`,
  `s`,
  `se`,
  `sw`,
  `w`
]);
var crossDirections = Object.freeze([
  `n`,
  `e`,
  `s`,
  `w`
]);
var offsetCardinals = (grid2, start, steps, bounds = `stop`) => {
  guardGrid(grid2, `grid`);
  guardCell(start, `start`);
  throwIntegerTest(steps, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells2 = directions.map(
    (d, index) => offset(grid2, start, vectors[index], bounds)
  );
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal2, multiplier = 1) => {
  let v;
  switch (cardinal2) {
    case `n`: {
      v = { x: 0, y: -1 * multiplier };
      break;
    }
    case `ne`: {
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    }
    case `e`: {
      v = { x: 1 * multiplier, y: 0 };
      break;
    }
    case `se`: {
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `s`: {
      v = { x: 0, y: 1 * multiplier };
      break;
    }
    case `sw`: {
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `w`: {
      v = { x: -1 * multiplier, y: 0 };
      break;
    }
    case `nw`: {
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    }
    default: {
      v = { x: 0, y: 0 };
    }
  }
  return Object.freeze(v);
};

// src/geometry/grid/enumerators/index.ts
var enumerators_exports = {};
__export(enumerators_exports, {
  cellValues: () => cellValues,
  cells: () => cells,
  cellsAndValues: () => cellsAndValues
});

// src/geometry/grid/Geometry.ts
var getLine = (start, end) => {
  guardCell(start);
  guardCell(end);
  let startX = start.x;
  let startY = start.y;
  const dx = Math.abs(end.x - startX);
  const dy = Math.abs(end.y - startY);
  const sx = startX < end.x ? 1 : -1;
  const sy = startY < end.y ? 1 : -1;
  let error = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y) break;
    const error2 = 2 * error;
    if (error2 > -dy) {
      error -= dy;
      startX += sx;
    }
    if (error2 < dx) {
      error += dx;
      startY += sy;
    }
  }
  return cells2;
};
var simpleLine = function(start, end, endInclusive = false) {
  const cells2 = [];
  if (start.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start.y; y < lastY; y++) {
      cells2.push({ x: start.x, y });
    }
  } else if (start.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start.x; x < lastX; x++) {
      cells2.push({ x, y: start.y });
    }
  } else {
    throw new Error(
      `Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`
    );
  }
  return cells2;
};

// src/geometry/grid/Indexing.ts
var indexFromCell = (grid2, cell, wrap4) => {
  guardGrid(grid2, `grid`);
  if (cell.x < 0) {
    switch (wrap4) {
      case `stop`: {
        cell = { ...cell, x: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = offset(grid2, { x: 0, y: cell.y }, { x: cell.x, y: 0 }, `wrap`);
        break;
      }
    }
  }
  if (cell.y < 0) {
    switch (wrap4) {
      case `stop`: {
        cell = { ...cell, y: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: grid2.rows + cell.y };
        break;
      }
    }
  }
  if (cell.x >= grid2.cols) {
    switch (wrap4) {
      case `stop`: {
        cell = { ...cell, x: grid2.cols - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, x: cell.x % grid2.cols };
        break;
      }
    }
  }
  if (cell.y >= grid2.rows) {
    switch (wrap4) {
      case `stop`: {
        cell = { ...cell, y: grid2.rows - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: cell.y % grid2.rows };
        break;
      }
    }
  }
  const index = cell.y * grid2.cols + cell.x;
  return index;
};
var cellFromIndex = (colsOrGrid, index) => {
  let cols = 0;
  cols = typeof colsOrGrid === `number` ? colsOrGrid : colsOrGrid.cols;
  throwIntegerTest(cols, `aboveZero`, `colsOrGrid`);
  return {
    x: index % cols,
    y: Math.floor(index / cols)
  };
};

// src/geometry/grid/IsEqual.ts
var isEqual5 = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  if (`rows` in a && `cols` in a) {
    if (`rows` in b && `cols` in b) {
      if (a.rows !== b.rows || a.cols !== b.cols) return false;
    } else return false;
  }
  if (`size` in a) {
    if (`size` in b) {
      if (a.size !== b.size) return false;
    } else return false;
  }
  return true;
};
var cellEquals = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  return a.x === b.x && a.y === b.y;
};

// src/geometry/grid/Neighbour.ts
var randomNeighbour = (nbos) => randomElement(nbos);
var isNeighbour = (n) => {
  if (n === void 0) return false;
  if (n[1] === void 0) return false;
  return true;
};
var neighbourList = (grid2, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid2, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter((n) => isNeighbour(n));
};
var neighbours = (grid2, cell, bounds = `undefined`, directions) => {
  const directories = directions ?? allDirections;
  const points = directories.map(
    (c) => offset(grid2, cell, getVectorFromCardinal(c), bounds)
  );
  return zipKeyValue(directories, points);
};

// src/geometry/grid/ToArray.ts
var toArray2d = (grid2, initialValue) => {
  const returnValue = [];
  for (let row = 0; row < grid2.rows; row++) {
    returnValue[row] = Array.from({ length: grid2.cols });
    if (initialValue) {
      for (let col = 0; col < grid2.cols; col++) {
        returnValue[row][col] = initialValue;
      }
    }
  }
  return returnValue;
};

// src/geometry/grid/ToString.ts
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;

// src/geometry/grid/Visual.ts
function* asRectangles(grid2) {
  for (const c of cells(grid2)) {
    yield rectangleForCell(grid2, c);
  }
}
var cellAtPoint = (grid2, position) => {
  const size = grid2.size;
  throwNumberTest(size, `positive`, `grid.size`);
  if (position.x < 0 || position.y < 0) return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid2.cols) return;
  if (y >= grid2.rows) return;
  return { x, y };
};
var rectangleForCell = (grid2, cell) => {
  guardCell(cell);
  const size = grid2.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = fromTopLeft({ x, y }, size, size);
  return r;
};
var cellMiddle = (grid2, cell) => {
  guardCell(cell);
  const size = grid2.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};

// src/geometry/grid/visitors/index.ts
var visitors_exports = {};
__export(visitors_exports, {
  breadthLogic: () => breadthLogic,
  columnLogic: () => columnLogic,
  create: () => create2,
  depthLogic: () => depthLogic,
  neighboursLogic: () => neighboursLogic,
  randomContiguousLogic: () => randomContiguousLogic,
  randomLogic: () => randomLogic,
  rowLogic: () => rowLogic,
  stepper: () => stepper,
  visitByNeighbours: () => visitByNeighbours,
  withLogic: () => withLogic
});

// src/geometry/grid/visitors/Breadth.ts
var breadthLogic = () => {
  return {
    select: (nbos) => nbos[0]
  };
};

// src/geometry/grid/visitors/CellNeighbours.ts
var neighboursLogic = () => {
  return {
    select: (neighbours2) => {
      return neighbours2.at(0);
    },
    getNeighbours: (grid2, cell) => {
      return neighbourList(grid2, cell, allDirections, `undefined`);
    }
  };
};

// src/geometry/grid/visitors/Columns.ts
var columnLogic = (opts = {}) => {
  const reversed = opts.reversed ?? false;
  return {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
    getNeighbours: (grid2, cell) => {
      if (reversed) {
        if (cell.y > 0) {
          cell = { x: cell.x, y: cell.y - 1 };
        } else {
          if (cell.x === 0) {
            cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
          } else {
            cell = { x: cell.x - 1, y: grid2.rows - 1 };
          }
        }
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: cell.x, y: cell.y + 1 };
        } else {
          if (cell.x < grid2.cols - 1) {
            cell = { x: cell.x + 1, y: 0 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `n` : `s`, cell]];
    }
  };
};

// src/geometry/grid/visitors/Depth.ts
var depthLogic = () => {
  return {
    select: (nbos) => nbos.at(-1)
  };
};

// src/geometry/grid/visitors/Random.ts
var randomLogic = () => {
  return {
    getNeighbours: (grid2, cell) => {
      const t = [];
      for (const c of cells(grid2, cell)) {
        t.push([`n`, c]);
      }
      return t;
    },
    select: randomNeighbour
  };
};

// src/geometry/grid/visitors/RandomContiguous.ts
var randomContiguousLogic = () => {
  return {
    select: randomNeighbour
  };
};

// src/geometry/grid/visitors/Rows.ts
var rowLogic = (opts = {}) => {
  const reversed = opts.reversed ?? false;
  return {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`)),
    getNeighbours: (grid2, cell) => {
      if (reversed) {
        if (cell.x > 0) {
          cell = { x: cell.x - 1, y: cell.y };
        } else {
          if (cell.y > 0) {
            cell = { x: grid2.cols - 1, y: cell.y - 1 };
          } else {
            cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
          }
        }
      } else {
        if (cell.x < grid2.rows - 1) {
          cell = { x: cell.x + 1, y: cell.y };
        } else {
          if (cell.y < grid2.rows - 1) {
            cell = { x: 0, y: cell.y + 1 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `w` : `e`, cell]];
    }
  };
};

// src/geometry/grid/visitors/Visitor.ts
function* visitByNeighbours(logic, grid2, opts = {}) {
  guardGrid(grid2, `grid`);
  const start = opts.start ?? { x: 0, y: 0 };
  guardCell(start, `opts.start`, grid2);
  const v = opts.visited ?? mutable(cellKeyString);
  const possibleNeighbours = logic.getNeighbours ?? ((g, c) => neighbourList(g, c, crossDirections, `undefined`));
  let cellQueue = [start];
  let moveQueue = [];
  let current = void 0;
  while (cellQueue.length > 0) {
    if (current === void 0) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid2, current).filter(
        (step) => {
          if (step[1] === void 0) return false;
          return !v.has(step[1]);
        }
      );
      if (nextSteps.length === 0) {
        if (current !== void 0) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        for (const n of nextSteps) {
          if (n === void 0) continue;
          if (n[1] === void 0) continue;
          moveQueue.push(n);
        }
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = void 0;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
}

// src/geometry/grid/visitors/Step.ts
var stepper = (grid2, createVisitor, start = { x: 0, y: 0 }, resolution = 1) => {
  guardGrid(grid2, `grid`);
  guardCell(start, `start`);
  throwIntegerTest(resolution, ``, `resolution`);
  const steps = [];
  let count = 0;
  let position = 0;
  for (const c of createVisitor(grid2, { start, boundsWrap: `undefined` })) {
    count++;
    if (count % resolution !== 0) continue;
    steps.push(c);
  }
  return (step, fromStart = false) => {
    throwIntegerTest(step, ``, `step`);
    if (fromStart) position = step;
    else position += step;
    return steps.at(position % steps.length);
  };
};

// src/geometry/grid/visitors/index.ts
var create2 = (type, opts = {}) => {
  switch (type) {
    case `random-contiguous`:
      return withLogic(randomContiguousLogic(), opts);
    case `random`:
      return withLogic(randomLogic(), opts);
    case `depth`:
      return withLogic(depthLogic(), opts);
    case `breadth`:
      return withLogic(breadthLogic(), opts);
    case `neighbours`:
      return withLogic(neighboursLogic(), opts);
    case `row`:
      return withLogic(rowLogic(opts), opts);
    case `column`:
      return withLogic(columnLogic(opts), opts);
    default:
      throw new TypeError(`Param 'type' unknown. Value: ${type}`);
  }
};
var withLogic = (logic, options = {}) => {
  return (grid2, optionsOverride = {}) => {
    return visitByNeighbours(logic, grid2, { ...options, ...optionsOverride });
  };
};

// src/geometry/path/CompoundPath.ts
var CompoundPath_exports = {};
__export(CompoundPath_exports, {
  bbox: () => bbox4,
  computeDimensions: () => computeDimensions,
  distanceToPoint: () => distanceToPoint,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate3,
  relativePosition: () => relativePosition2,
  setSegment: () => setSegment,
  toString: () => toString4,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path) => {
  const existing = [...compoundPath.segments];
  existing[index] = path;
  return fromPaths(...existing);
};
var interpolate3 = (paths, t, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  const expected = t * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (const [index, element] of l.entries()) {
    if (soFar + element >= expected) {
      const relative = expected - soFar;
      let amt = relative / element;
      if (amt > 1) amt = 1;
      return paths[index].interpolate(amt);
    } else soFar += element;
  }
  return { x: 0, y: 0 };
};
var distanceToPoint = (paths, point2) => {
  if (paths.length === 0) return 0;
  let distances = paths.map((p, index) => ({ path: p, index, distance: p.distanceToPoint(point2) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length === 0) throw new Error(`Could not look up distances`);
  return distances[0].distance;
};
var relativePosition2 = (paths, point2, intersectionThreshold, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  let distances = paths.map((p, index) => ({ path: p, index, distance: p.distanceToPoint(point2) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length < 0) throw new Error(`Point does not intersect with path`);
  const d = distances[0];
  if (d.distance > intersectionThreshold) throw new Error(`Point does not intersect with path. Minimum distance: ${d.distance}, threshold: ${intersectionThreshold}`);
  const relativePositionOnPath = d.path.relativePosition(point2, intersectionThreshold);
  let accumulated = 0;
  for (let index = 0; index < d.index; index++) {
    accumulated += dimensions.lengths[index];
  }
  accumulated += dimensions.lengths[d.index] * relativePositionOnPath;
  const accumulatedRel = accumulated / dimensions.totalLength;
  console.log(`acc: ${accumulated} rel: ${accumulatedRel} on path: ${relativePositionOnPath} path: ${d.index}`);
  return accumulatedRel;
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths3 = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (const length4 of lengths3) {
    totalLength += length4;
  }
  for (const width of widths) {
    totalWidth += width;
  }
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox4 = (paths) => {
  const boxes = paths.map((p) => p.bbox());
  const corners3 = boxes.flatMap((b) => corners(b));
  return bbox(...corners3);
};
var toString4 = (paths) => paths.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = getEnd(paths[0]);
  for (let index = 1; index < paths.length; index++) {
    const start = getStart(paths[index]);
    if (!isEqual(start, lastPos)) throw new Error(`Path index ${index} does not start at prior path end. Start: ${start.x},${start.y} expected: ${lastPos.x},${lastPos.y}`);
    lastPos = getEnd(paths[index]);
  }
};
var toSvgString2 = (paths) => paths.flatMap((p) => p.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    interpolate: (t, useWidth = false) => interpolate3(paths, t, useWidth, dims),
    relativePosition: (point2, intersectionThreshold) => relativePosition2(paths, point2, intersectionThreshold, dims),
    distanceToPoint: (point2) => distanceToPoint(paths, point2),
    bbox: () => bbox4(paths),
    toString: () => toString4(paths),
    toSvgString: () => toSvgString2(paths),
    kind: `compound`
  });
};

// src/geometry/Ellipse.ts
var Ellipse_exports = {};
__export(Ellipse_exports, {
  fromDegrees: () => fromDegrees
});
var fromDegrees = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});

// src/geometry/CurveSimplification.ts
var CurveSimplification_exports = {};
__export(CurveSimplification_exports, {
  rdpPerpendicularDistance: () => rdpPerpendicularDistance,
  rdpShortestDistance: () => rdpShortestDistance
});
var rdpShortestDistance = (points, epsilon = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) {
    return points;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = distanceFromPointToLine(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpShortestDistance(l1, epsilon);
    const r2 = rdpShortestDistance(l2, epsilon);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
var rdpPerpendicularDistance = (points, epsilon = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) {
    return points;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = findPerpendicularDistance(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpPerpendicularDistance(l1, epsilon);
    const r2 = rdpPerpendicularDistance(l2, epsilon);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
function findPerpendicularDistance(p, p1, p2) {
  let result;
  let slope2;
  let intercept;
  if (p1.x == p2.x) {
    result = Math.abs(p.x - p1.x);
  } else {
    slope2 = (p2.y - p1.y) / (p2.x - p1.x);
    intercept = p1.y - slope2 * p1.x;
    result = Math.abs(slope2 * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope2, 2) + 1);
  }
  return result;
}
var distanceFromPointToLine = (p, index, index_) => {
  const lineLength = distance(index, index_);
  if (lineLength == 0) {
    return distance(p, index);
  }
  const t = ((p.x - index.x) * (index_.x - index.x) + (p.y - index.y) * (index_.y - index.y)) / lineLength;
  if (t < 0) {
    return distance(p, index);
  }
  if (t > 1) {
    return distance(p, index_);
  }
  return distance(p, { x: index.x + t * (index_.x - index.x), y: index.y + t * (index_.y - index.y) });
};

// src/geometry/QuadTree.ts
var QuadTree_exports = {};
__export(QuadTree_exports, {
  Direction: () => Direction,
  QuadTreeNode: () => QuadTreeNode,
  quadTree: () => quadTree
});
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["Nw"] = 0] = "Nw";
  Direction2[Direction2["Ne"] = 1] = "Ne";
  Direction2[Direction2["Sw"] = 2] = "Sw";
  Direction2[Direction2["Se"] = 3] = "Se";
  return Direction2;
})(Direction || {});
var quadTree = (bounds, initialData = [], opts = {}) => {
  const o = {
    maxItems: opts.maxItems ?? 4,
    maxLevels: opts.maxLevels ?? 4
  };
  const n = new QuadTreeNode(void 0, bounds, 0, o);
  for (const d of initialData) {
    n.add(d);
  }
  return n;
};
var QuadTreeNode = class _QuadTreeNode {
  /**
   * Constructor
   * @param boundary
   * @param level
   * @param opts
   */
  constructor(parent, boundary, level, opts) {
    this.boundary = boundary;
    this.level = level;
    this.opts = opts;
    this.#parent = parent;
  }
  #items = [];
  #children = [];
  #parent;
  getLengthChildren() {
    return this.#children.length;
  }
  *parents() {
    let n = this;
    while (n.#parent !== void 0) {
      yield n.#parent;
      n = n.#parent;
    }
  }
  getParent() {
    return this.#parent;
  }
  /**
   * Iterates over immediate children
   */
  *children() {
    for (const c of this.#children) {
      yield c;
    }
  }
  /**
   * Array of QuadTreeItem
   * @returns
   */
  getValue() {
    return this.#items;
  }
  getIdentity() {
    return this;
  }
  /**
   * Get a descendant node in a given direction
   * @param d
   * @returns
   */
  direction(d) {
    return this.#children[d];
  }
  /**
   * Add an item to the quadtree
   * @param p
   * @returns False if item is outside of boundary, True if item was added
   */
  add(p) {
    if (!isIntersecting3(this.boundary, p)) return false;
    if (this.#children.length > 0) {
      for (const d of this.#children) d.add(p);
      return true;
    }
    this.#items.push(p);
    if (this.#items.length > this.opts.maxItems && this.level < this.opts.maxLevels) {
      if (this.#children.length === 0) {
        this.#subdivide();
      }
      for (const item of this.#items) {
        for (const d of this.#children) d.add(item);
      }
      this.#items = [];
    }
    return true;
  }
  /**
   * Returns true if point is inside node's boundary
   * @param p
   * @returns
   */
  couldHold(p) {
    return intersectsPoint(this.boundary, p);
  }
  #subdivide() {
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    const x = this.boundary.x;
    const y = this.boundary.y;
    const coords = fromNumbers(x + w, y, x, y, x, y + h, x + w, y + h);
    const rects = coords.map((p) => fromTopLeft(p, w, h));
    this.#children = rects.map(
      (r) => new _QuadTreeNode(this, r, this.level + 1, this.opts)
    );
  }
};

// src/geometry/Scaler.ts
var Scaler_exports = {};
__export(Scaler_exports, {
  scaler: () => scaler
});
var scaler = (scaleBy = `both`, defaultRect) => {
  const defaultBounds = defaultRect ?? Placeholder2;
  let sw = 1;
  let sh = 1;
  let s = { x: 1, y: 1 };
  const computeScale = () => {
    switch (scaleBy) {
      case `height`: {
        return { x: sh, y: sh };
      }
      case `width`: {
        return { x: sw, y: sw };
      }
      case `min`: {
        return { x: Math.min(sw, sh), y: Math.min(sw, sh) };
      }
      case `max`: {
        return { x: Math.max(sw, sh), y: Math.max(sw, sh) };
      }
      default: {
        return { x: sw, y: sh };
      }
    }
  };
  const normalise4 = (a, b, c, d) => {
    let inX = Number.NaN;
    let inY = Number.NaN;
    let outW = defaultBounds.width;
    let outH = defaultBounds.height;
    if (typeof a === `number`) {
      inX = a;
      if (typeof b === `number`) {
        inY = b;
        if (c === void 0) return [inX, inY, outW, outH];
        if (isRect(c)) {
          outW = c.width;
          outH = c.height;
        } else if (typeof c === `number`) {
          outW = c;
          if (typeof d === `number`) {
            outH = d;
          } else {
            throw new TypeError(`Missing final height value`);
          }
        } else throw new Error(`Missing valid output range`);
      } else if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else {
        throw new Error(
          `Expected input y or output Rect to follow first number parameter`
        );
      }
    } else if (isPoint(a)) {
      inX = a.x;
      inY = a.y;
      if (b === void 0) return [inX, inY, outW, outH];
      if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else if (typeof b === `number`) {
        outW = b;
        if (typeof c === `number`) {
          outH = c;
        } else {
          throw new TypeError(
            `Expected height as third parameter after Point and output width`
          );
        }
      } else {
        throw new TypeError(
          `Expected Rect or width as second parameter when first parameter is a Point`
        );
      }
    } else {
      throw new Error(`Expected input Point or x value as first parameter`);
    }
    return [inX, inY, outW, outH];
  };
  const scaleAbs = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(true, ...n);
  };
  const scaleRel = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(false, ...n);
  };
  const scaleNormalised = (abs, x, y, w, h) => {
    if (Number.isNaN(w)) throw new Error(`Output width range missing`);
    if (Number.isNaN(h)) throw new Error(`Output height range missing`);
    if (w !== sw || h !== sh) {
      sw = w;
      sh = h;
      s = computeScale();
    }
    return abs ? {
      x: x * s.x,
      y: y * s.y
    } : {
      x: x / s.x,
      y: y / s.y
    };
  };
  return {
    computeScale,
    rel: scaleRel,
    abs: scaleAbs,
    width: defaultBounds.width,
    height: defaultBounds.height
  };
};

// src/geometry/Convolve2d.ts
var Convolve2d_exports = {};
__export(Convolve2d_exports, {
  boxBlurKernel: () => boxBlurKernel,
  convolve: () => convolve,
  convolveCell: () => convolveCell,
  convolveImage: () => convolveImage,
  edgeDetectionKernel: () => edgeDetectionKernel,
  gaussianBlur3Kernel: () => gaussianBlur3Kernel,
  gaussianBlur5Kernel: () => gaussianBlur5Kernel,
  identityKernel: () => identityKernel,
  kernel2dToArray: () => kernel2dToArray,
  multiply: () => multiply4,
  rgbReducer: () => rgbReducer,
  sharpenKernel: () => sharpenKernel,
  unsharpMasking5Kernel: () => unsharpMasking5Kernel
});

// src/visual/ImageDataGrid.ts
var ImageDataGrid_exports = {};
__export(ImageDataGrid_exports, {
  accessor: () => accessor,
  byColumn: () => byColumn,
  byRow: () => byRow,
  grid: () => grid,
  setter: () => setter,
  wrap: () => wrap3
});
var grid = (image) => {
  const g = { rows: image.width, cols: image.height };
  return g;
};
var wrap3 = (image) => {
  return {
    ...grid(image),
    get: accessor(image),
    set: setter(image)
  };
};
var accessor = (image) => {
  const g = grid(image);
  const data = image.data;
  const fn = (cell, bounds = `undefined`) => {
    const index = indexFromCell(g, cell, bounds);
    if (index === void 0) return;
    const pxIndex = index * 4;
    return {
      r: data[pxIndex],
      g: data[pxIndex + 1],
      b: data[pxIndex + 2],
      opacity: data[pxIndex + 3],
      unit: `8bit`,
      space: `srgb`
    };
  };
  return fn;
};
var setter = (image) => {
  const g = grid(image);
  const data = image.data;
  const fn = (value, cell, bounds = `undefined`) => {
    const index = indexFromCell(g, cell, bounds);
    if (index === void 0) throw new Error(`Cell out of range. ${cell.x},${cell.y}`);
    const pixel = toRgb8bit(value);
    const pxIndex = index * 4;
    data[pxIndex] = pixel.r;
    data[pxIndex + 1] = pixel.g;
    data[pxIndex + 2] = pixel.b;
    data[pxIndex + 3] = pixel.opacity ?? 255;
  };
  return fn;
};
function* byRow(image) {
  const a = accessor(image);
  const g = grid(image);
  const v = As_exports.rows(g, { x: 0, y: 0 });
  for (const row of v) {
    const pixels = row.map((p) => a(p, `undefined`));
    yield pixels;
  }
}
function* byColumn(image) {
  const a = accessor(image);
  const g = grid(image);
  for (let x = 0; x < g.cols; x++) {
    const col = [];
    for (let y = 0; y < g.rows; y++) {
      const p = a({ x, y }, `undefined`);
      if (p) col.push(p);
    }
    yield col;
  }
}

// src/geometry/Convolve2d.ts
var multiply4 = (kernel, scalar) => {
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  const copy = [];
  for (let row = 0; row < rows2; row++) {
    copy[row] = [];
    for (let col = 0; col < cols; col++) {
      copy[row][col] = kernel[row][col] * scalar;
    }
  }
  return copy;
};
function convolveCell(cell, kernel, source, reduce2) {
  const valuesAtKernelPos = kernel.map((o) => {
    const pos = offset(source, cell, o.cell, `stop`);
    let kernelValue;
    let sourceValue;
    if (pos) {
      sourceValue = source.get(pos, `undefined`);
      kernelValue = o.value;
    }
    return { cell: o.cell, value: sourceValue, kernel: o.value };
  });
  return reduce2(valuesAtKernelPos);
}
function* convolveImage(kernel, image) {
  const imageDataAsGrid = wrap3(image);
  yield* convolve(kernel, imageDataAsGrid, enumerators_exports.cells(imageDataAsGrid), rgbReducer);
}
function* convolve(kernel, source, visitor, reduce2, origin) {
  if (!origin) {
    const kernelRows = kernel.length;
    const kernelCols = kernel[0].length;
    origin = { x: Math.floor(kernelRows / 2), y: Math.floor(kernelCols / 2) };
  }
  const asArray = kernel2dToArray(kernel, origin);
  for (const cell of visitor) {
    const value = convolveCell(cell, asArray, source, reduce2);
    yield { cell, value };
  }
}
var kernel2dToArray = (kernel, origin) => {
  const offsets = [];
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  if (!origin) {
    origin = {
      x: Math.floor(rows2 / 2),
      y: Math.floor(cols / 2)
    };
  }
  for (let xx = 0; xx < rows2; xx++) {
    for (let yy = 0; yy < cols; yy++) {
      const v = {
        cell: { x: xx - origin.x, y: yy - origin.y },
        value: kernel[xx][yy]
      };
      offsets.push(v);
    }
  }
  return offsets;
};
var rgbReducer = (values2) => {
  let r = 0;
  let g = 0;
  let b = 0;
  let opacity = 0;
  for (const value of values2) {
    const rgb = value.value;
    const kernelValue = value.kernel;
    if (!rgb) continue;
    if (rgb.opacity === 0) continue;
    if (kernelValue === 0) continue;
    r += rgb.r * kernelValue;
    g += rgb.g * kernelValue;
    b += rgb.b * kernelValue;
    opacity += (rgb.opacity ?? 1) * kernelValue;
  }
  const result = {
    r,
    g,
    b,
    unit: `8bit`,
    space: `srgb`,
    opacity
  };
  return result;
};
var identityKernel = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];
var edgeDetectionKernel = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0]
];
var sharpenKernel = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0]
];
var boxBlurKernel = multiply4([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
], 1 / 9);
var gaussianBlur3Kernel = multiply4([
  [1, 2, 1],
  [2, 4, 2],
  [1, 2, 1]
], 1 / 16);
var gaussianBlur5Kernel = multiply4([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, 36, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], 1 / 256);
var unsharpMasking5Kernel = multiply4([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, -476, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], -1 / 256);

// src/geometry/arc/index.ts
var arc_exports = {};
__export(arc_exports, {
  angularSize: () => angularSize,
  bbox: () => bbox5,
  distanceCenter: () => distanceCenter2,
  fromCircle: () => fromCircle,
  fromCircleAmount: () => fromCircleAmount,
  fromDegrees: () => fromDegrees2,
  getStartEnd: () => getStartEnd,
  guard: () => guard5,
  interpolate: () => interpolate4,
  isArc: () => isArc,
  isEqual: () => isEqual6,
  isPositioned: () => isPositioned3,
  length: () => length3,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath3,
  toSvg: () => toSvg2
});
var isArc = (p) => p.startRadian !== void 0 && p.endRadian !== void 0 && p.clockwise !== void 0;
var isPositioned3 = (p) => p.x !== void 0 && p.y !== void 0;
var piPi4 = Math.PI * 2;
function fromDegrees2(radius, startDegrees, endDegrees, clockwise, origin) {
  const a = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees),
    clockwise
  };
  if (isPoint(origin)) {
    guard(origin);
    const ap = {
      ...a,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else {
    return Object.freeze(a);
  }
}
var toLine = (arc) => fromPoints(
  point(arc, arc.startRadian),
  point(arc, arc.endRadian)
);
var getStartEnd = (arc, origin) => {
  guard5(arc);
  const start = point(arc, arc.startRadian, origin);
  const end = point(arc, arc.endRadian, origin);
  return [start, end];
};
var point = (arc, angleRadian3, origin) => {
  if (origin === void 0) {
    origin = isPositioned3(arc) ? arc : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(angleRadian3) * arc.radius + origin.x,
    y: Math.sin(angleRadian3) * arc.radius + origin.y
  };
};
var guard5 = (arc) => {
  if (arc === void 0) throw new TypeError(`Arc is undefined`);
  if (isPositioned3(arc)) {
    guard(arc, `arc`);
  }
  if (arc.radius === void 0) throw new TypeError(`Arc radius is undefined (${JSON.stringify(arc)})`);
  if (typeof arc.radius !== `number`) throw new TypeError(`Radius must be a number`);
  if (Number.isNaN(arc.radius)) throw new TypeError(`Radius is NaN`);
  if (arc.radius <= 0) throw new TypeError(`Radius must be greater than zero`);
  if (arc.startRadian === void 0) throw new TypeError(`Arc is missing 'startRadian' field`);
  if (arc.endRadian === void 0) throw new TypeError(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc.endRadian)) throw new TypeError(`Arc endRadian is NaN`);
  if (Number.isNaN(arc.startRadian)) throw new TypeError(`Arc endRadian is NaN`);
  if (arc.clockwise === void 0) throw new TypeError(`Arc is missing 'clockwise field`);
  if (arc.startRadian >= arc.endRadian) throw new TypeError(`startRadian is expected to be les than endRadian`);
};
var interpolate4 = (amount, arc, allowOverflow, origin) => {
  guard5(arc);
  const overflowOk = allowOverflow ?? false;
  if (!overflowOk) {
    if (amount < 0) throw new Error(`Param 'amount' is under zero, and overflow is not allowed`);
    if (amount > 1) throw new Error(`Param 'amount' is above 1 and overflow is not allowed`);
  }
  const span = angularSize(arc);
  const rel = span * amount;
  const angle = radiansSum(arc.startRadian, rel, arc.clockwise);
  return point(arc, angle, origin);
};
var angularSize = (arc) => radianArc(arc.startRadian, arc.endRadian, arc.clockwise);
var toPath3 = (arc) => {
  guard5(arc);
  return Object.freeze({
    ...arc,
    nearest: (point2) => {
      throw new Error(`not implemented`);
    },
    interpolate: (amount) => interpolate4(amount, arc),
    bbox: () => bbox5(arc),
    length: () => length3(arc),
    toSvgString: () => toSvg2(arc),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `arc`
  });
};
var fromCircle = (circle, startRadian, endRadian, clockwise = true) => {
  const a = Object.freeze({
    ...circle,
    endRadian,
    startRadian,
    clockwise
  });
  return a;
};
var fromCircleAmount = (circle, startRadian, sizeRadian, clockwise = true) => {
  const endRadian = radiansSum(startRadian, sizeRadian, clockwise);
  return fromCircle(circle, startRadian, endRadian);
};
var length3 = (arc) => piPi4 * arc.radius * ((arc.startRadian - arc.endRadian) / piPi4);
var bbox5 = (arc) => {
  if (isPositioned3(arc)) {
    const middle = interpolate4(0.5, arc);
    const asLine = toLine(arc);
    return bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc.radius * 2,
      height: arc.radius * 2
    };
  }
};
var toSvg2 = (a, b, c, d, e) => {
  if (isArc(a)) {
    if (isPositioned3(a)) {
      if (isPoint(b)) {
        return toSvgFull2(b, a.radius, a.startRadian, a.endRadian, c);
      } else {
        return toSvgFull2(a, a.radius, a.startRadian, a.endRadian, b);
      }
    } else {
      return isPoint(b) ? toSvgFull2(b, a.radius, a.startRadian, a.endRadian, c) : toSvgFull2({ x: 0, y: 0 }, a.radius, a.startRadian, a.endRadian);
    }
  } else {
    if (c === void 0) throw new Error(`startAngle undefined`);
    if (d === void 0) throw new Error(`endAngle undefined`);
    if (isPoint(a)) {
      if (typeof b === `number` && typeof c === `number` && typeof d === `number`) {
        return toSvgFull2(a, b, c, d, e);
      } else {
        throw new TypeError(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull2 = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`) opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start = toCartesian(radius, endRadian - 0.01, origin);
  const end = toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle) d.push(`z`);
  return d;
};
var distanceCenter2 = (a, b) => distance(a, b);
var isEqual6 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (a.endRadian !== b.endRadian) return false;
  if (a.startRadian !== b.startRadian) return false;
  if (a.clockwise !== b.clockwise) return false;
  if (isPositioned3(a) && isPositioned3(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
  } else if (!isPositioned3(a) && !isPositioned3(b)) {
  } else return false;
  return true;
};

// src/geometry/Vector.ts
var Vector_exports = {};
__export(Vector_exports, {
  clampMagnitude: () => clampMagnitude3,
  divide: () => divide4,
  dotProduct: () => dotProduct3,
  fromLineCartesian: () => fromLineCartesian,
  fromLinePolar: () => fromLinePolar,
  fromPointPolar: () => fromPointPolar,
  fromRadians: () => fromRadians,
  multiply: () => multiply5,
  normalise: () => normalise3,
  quadrantOffsetAngle: () => quadrantOffsetAngle,
  subtract: () => subtract4,
  sum: () => sum4,
  toCartesian: () => toCartesian2,
  toPolar: () => toPolar,
  toRadians: () => toRadians,
  toString: () => toString5
});
var EmptyCartesian = Object.freeze({ x: 0, y: 0 });
var piPi5 = Math.PI * 2;
var pi = Math.PI;
var fromRadians = (radians) => {
  return Object.freeze({
    x: Math.cos(radians),
    y: Math.sin(radians)
  });
};
var toRadians = (point2) => {
  return Math.atan2(point2.y, point2.x);
};
var fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian) => {
  pt = subtract(pt, origin);
  let direction = Math.atan2(pt.y, pt.x);
  if (angleNormalisation === `unipolar` && direction < 0) direction += piPi5;
  else if (angleNormalisation === `bipolar`) {
    if (direction > pi) direction -= piPi5;
    else if (direction <= -pi) direction += piPi5;
  }
  return Object.freeze({
    distance: distance(pt),
    angleRadian: direction
  });
};
var fromLineCartesian = (line) => subtract(line.b, line.a);
var fromLinePolar = (line) => {
  guard4(line, `line`);
  const pt = subtract(line.b, line.a);
  return fromPointPolar(pt);
};
var isPolar = (v) => {
  if (isPolarCoord(v)) return true;
  return false;
};
var isCartesian = (v) => {
  if (isPoint(v)) return true;
  return false;
};
var normalise3 = (v) => {
  if (isPolar(v)) {
    return normalise2(v);
  } else if (isCartesian(v)) {
    return normalise(v);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var quadrantOffsetAngle = (p) => {
  if (p.x >= 0 && p.y >= 0) return 0;
  if (p.x < 0 && p.y >= 0) return pi;
  if (p.x < 0 && p.y < 0) return pi;
  return piPi5;
};
var toPolar = (v, origin = Empty) => {
  if (isPolar(v)) {
    return v;
  } else if (isCartesian(v)) {
    return fromCartesian(v, origin);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toCartesian2 = (v) => {
  if (isPolar(v)) {
    return toPoint(v);
  } else if (isCartesian(v)) {
    return v;
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toString5 = (v, digits) => {
  if (isPolar(v)) {
    return toString(v, digits);
  } else if (isCartesian(v)) {
    return toString2(v, digits);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var dotProduct3 = (a, b) => {
  if (isPolar(a) && isPolar(b)) {
    return dotProduct2(a, b);
  } else if (isCartesian(a) && isCartesian(b)) {
    return dotProduct(a, b);
  }
  throw new Error(`Expected two polar/Cartesian vectors.`);
};
var clampMagnitude3 = (v, max = 1, min = 0) => {
  if (isPolar(v)) {
    return clampMagnitude2(v, max, min);
  } else if (isCartesian(v)) {
    return clampMagnitude(v, max, min);
  }
  throw new Error(`Expected either polar or Cartesian vector`);
};
var sum4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = sum(a, b);
  return polar ? toPolar(c) : c;
};
var subtract4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = subtract(a, b);
  return polar ? toPolar(c) : c;
};
var multiply5 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = multiply(a, b);
  return polar ? toPolar(c) : c;
};
var divide4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = divide(a, b);
  return polar ? toPolar(c) : c;
};

// src/geometry/SurfacePoints.ts
var SurfacePoints_exports = {};
__export(SurfacePoints_exports, {
  circleRings: () => circleRings,
  circleVogelSpiral: () => circleVogelSpiral,
  sphereFibonacci: () => sphereFibonacci
});
var cos = Math.cos;
var sin = Math.sin;
var asin = Math.asin;
var sqrt = Math.sqrt;
var pow = Math.pow;
var pi2 = Math.PI;
var piPi6 = Math.PI * 2;
var goldenAngle = pi2 * (3 - sqrt(5));
var goldenSection = (1 + sqrt(5)) / 2;
function* circleVogelSpiral(circle, opts = {}) {
  const maxPoints = opts.maxPoints ?? 5e3;
  const density = opts.density ?? 0.95;
  const rotationOffset = opts.rotation ?? 0;
  const c = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const max = c.radius;
  let spacing = c.radius * scale(density, 0, 1, 0.3, 0.01);
  if (opts.spacing) spacing = opts.spacing;
  let radius = 0;
  let count = 0;
  let angle = 0;
  while (count < maxPoints && radius < max) {
    radius = spacing * count ** 0.5;
    angle = rotationOffset + count * 2 * pi2 / goldenSection;
    yield Object.freeze({
      x: c.x + radius * cos(angle),
      y: c.y + radius * sin(angle)
    });
    count++;
  }
}
function* circleRings(circle, opts = {}) {
  const rings = opts.rings ?? 5;
  const c = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const ringR = 1 / rings;
  const rotationOffset = opts.rotation ?? 0;
  let ringCount = 1;
  yield Object.freeze({ x: c.x, y: c.y });
  for (let r = ringR; r <= 1; r += ringR) {
    const n = Math.round(pi2 / asin(1 / (2 * ringCount)));
    for (const theta of linearSpace(0, piPi6, n + 1)) {
      yield Object.freeze({
        x: c.x + r * cos(theta + rotationOffset) * c.radius,
        y: c.y + r * sin(theta + rotationOffset) * c.radius
      });
    }
    ringCount++;
  }
}
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
  const offset2 = 2 / samples;
  const s = sphere ?? { x: 0, y: 0, z: 0, radius: 1 };
  for (let index = 0; index < samples; index++) {
    const y = index * offset2 - 1 + offset2 / 2;
    const r = sqrt(1 - pow(y, 2));
    const a = (index + 1) % samples * goldenAngle + rotationRadians;
    const x = cos(a) * r;
    const z = sin(a) * r;
    yield Object.freeze({
      x: s.x + x * s.radius,
      y: s.y + y * s.radius,
      z: s.z + z * s.radius
    });
  }
}

// src/geometry/triangle/index.ts
var triangle_exports = {};
__export(triangle_exports, {
  Empty: () => Empty4,
  Equilateral: () => Equilateral_exports,
  Isosceles: () => Isosceles_exports,
  Placeholder: () => Placeholder3,
  Right: () => Right_exports,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply2,
  area: () => area3,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox6,
  centroid: () => centroid,
  corners: () => corners2,
  edges: () => edges2,
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints3,
  fromRadius: () => fromRadius,
  guard: () => guard6,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty4,
  isEqual: () => isEqual7,
  isEquilateral: () => isEquilateral,
  isIsosceles: () => isIsosceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder4,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter,
  rotate: () => rotate3,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray2
});

// src/geometry/triangle/Guard.ts
var guard6 = (t, name = `t`) => {
  if (t === void 0) throw new Error(`{$name} undefined`);
  guard(t.a, name + `.a`);
  guard(t.b, name + `.b`);
  guard(t.c, name + `.c`);
};

// src/geometry/triangle/Edges.ts
var edges2 = (t) => {
  guard6(t);
  return joinPointsToLines(t.a, t.b, t.c, t.a);
};

// src/geometry/triangle/Area.ts
var area3 = (t) => {
  guard6(t, `t`);
  const lengths3 = edges2(t).map((l) => length(l));
  const p = (lengths3[0] + lengths3[1] + lengths3[2]) / 2;
  return Math.sqrt(p * (p - lengths3[0]) * (p - lengths3[1]) * (p - lengths3[2]));
};

// src/geometry/triangle/Centroid.ts
var centroid = (t) => {
  guard6(t);
  const total = reduce(
    [t.a, t.b, t.c],
    (p, accumulator) => ({
      x: p.x + accumulator.x,
      y: p.y + accumulator.y
    })
  );
  const div = {
    x: total.x / 3,
    y: total.y / 3
  };
  return div;
};

// src/geometry/triangle/Perimeter.ts
var perimeter = (t) => {
  guard6(t);
  return edges2(t).reduce((accumulator, v) => accumulator + length(v), 0);
};

// src/geometry/triangle/InnerCircle.ts
var innerCircle = (t) => {
  const c = centroid(t);
  const p = perimeter(t) / 2;
  const a = area3(t);
  const radius = a / p;
  return { radius, ...c };
};

// src/geometry/triangle/OuterCircle.ts
var outerCircle = (t) => {
  const [a, b, c] = edges2(t).map((l) => length(l));
  const cent = centroid(t);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};

// src/geometry/triangle/Rotate.ts
var rotate3 = (triangle, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return triangle;
  if (origin === void 0) origin = centroid(triangle);
  return Object.freeze({
    ...triangle,
    a: rotate(triangle.a, amountRadian, origin),
    b: rotate(triangle.b, amountRadian, origin),
    c: rotate(triangle.c, amountRadian, origin)
  });
};

// src/geometry/triangle/Equilateral.ts
var Equilateral_exports = {};
__export(Equilateral_exports, {
  area: () => area4,
  centerFromA: () => centerFromA,
  centerFromB: () => centerFromB,
  centerFromC: () => centerFromC,
  circumcircle: () => circumcircle,
  fromCenter: () => fromCenter2,
  height: () => height,
  incircle: () => incircle,
  perimeter: () => perimeter2
});
var pi4over3 = Math.PI * 4 / 3;
var pi2over3 = Math.PI * 2 / 3;
var resolveLength = (t) => {
  if (typeof t === `number`) return t;
  return t.length;
};
var fromCenter2 = (t, origin, rotationRad) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t) / Math.sqrt(3);
  const rot = rotationRad ?? Math.PI * 1.5;
  const b = {
    x: r * Math.cos(rot) + origin.x,
    y: r * Math.sin(rot) + origin.y
  };
  const a = {
    x: r * Math.cos(rot + pi4over3) + origin.x,
    y: r * Math.sin(rot + pi4over3) + origin.y
  };
  const c = {
    x: r * Math.cos(rot + pi2over3) + origin.x,
    y: r * Math.sin(rot + pi2over3) + origin.y
  };
  return Object.freeze({ a, b, c });
};
var centerFromA = (t, ptA) => {
  if (!ptA) ptA = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t);
  const { radius } = incircle(t);
  return {
    x: ptA.x + r / 2,
    y: ptA.y - radius
  };
};
var centerFromB = (t, ptB) => {
  if (!ptB) ptB = Object.freeze({ x: 0, y: 0 });
  const { radius } = incircle(t);
  return {
    x: ptB.x,
    y: ptB.y + radius * 2
  };
};
var centerFromC = (t, ptC) => {
  if (!ptC) ptC = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t);
  const { radius } = incircle(t);
  return {
    x: ptC.x - r / 2,
    y: ptC.y - radius
  };
};
var height = (t) => Math.sqrt(3) / 2 * resolveLength(t);
var perimeter2 = (t) => resolveLength(t) * 3;
var area4 = (t) => Math.pow(resolveLength(t), 2) * Math.sqrt(3) / 4;
var circumcircle = (t) => ({
  radius: Math.sqrt(3) / 3 * resolveLength(t)
});
var incircle = (t) => ({
  radius: Math.sqrt(3) / 6 * resolveLength(t)
});

// src/geometry/triangle/Right.ts
var Right_exports = {};
__export(Right_exports, {
  adjacentFromHypotenuse: () => adjacentFromHypotenuse,
  adjacentFromOpposite: () => adjacentFromOpposite,
  angleAtPointA: () => angleAtPointA,
  angleAtPointB: () => angleAtPointB,
  area: () => area5,
  circumcircle: () => circumcircle2,
  fromA: () => fromA,
  fromB: () => fromB,
  fromC: () => fromC,
  height: () => height2,
  hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
  hypotenuseFromOpposite: () => hypotenuseFromOpposite,
  hypotenuseSegments: () => hypotenuseSegments,
  incircle: () => incircle2,
  medians: () => medians,
  oppositeFromAdjacent: () => oppositeFromAdjacent,
  oppositeFromHypotenuse: () => oppositeFromHypotenuse,
  perimeter: () => perimeter3,
  resolveLengths: () => resolveLengths
});
var fromA = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t);
  const seg = hypotenuseSegments(t);
  const h = height2(t);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + tt.hypotenuse, y: origin.y };
  const c = { x: origin.x + seg[1], y: origin.y - h };
  return { a, b, c };
};
var fromB = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t);
  const seg = hypotenuseSegments(t);
  const h = height2(t);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - tt.hypotenuse, y: origin.y };
  const c = { x: origin.x - seg[0], y: origin.y - h };
  return { a, b, c };
};
var fromC = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const seg = hypotenuseSegments(t);
  const h = height2(t);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - seg[1], y: origin.y + h };
  const b = { x: origin.x + seg[0], y: origin.y + h };
  return { a, b, c };
};
var resolveLengths = (t) => {
  const a = t.adjacent;
  const o = t.opposite;
  const h = t.hypotenuse;
  if (a !== void 0 && o !== void 0) {
    return {
      ...t,
      adjacent: a,
      opposite: o,
      hypotenuse: Math.hypot(a, o)
    };
  } else if (a && h) {
    return {
      ...t,
      adjacent: a,
      hypotenuse: h,
      opposite: h * h - a * a
    };
  } else if (o && h) {
    return {
      ...t,
      hypotenuse: h,
      opposite: o,
      adjacent: h * h - o * o
    };
  } else if (t.opposite && t.hypotenuse && t.adjacent) {
    return t;
  }
  throw new Error(`Missing at least two edges`);
};
var height2 = (t) => {
  const tt = resolveLengths(t);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return Math.sqrt(p * q);
};
var hypotenuseSegments = (t) => {
  const tt = resolveLengths(t);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return [p, q];
};
var perimeter3 = (t) => {
  const tt = resolveLengths(t);
  return tt.adjacent + tt.hypotenuse + tt.opposite;
};
var area5 = (t) => {
  const tt = resolveLengths(t);
  return tt.opposite * tt.adjacent / 2;
};
var angleAtPointA = (t) => {
  const tt = resolveLengths(t);
  return Math.acos(
    (tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse)
  );
};
var angleAtPointB = (t) => {
  const tt = resolveLengths(t);
  return Math.acos(
    (tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse)
  );
};
var medians = (t) => {
  const tt = resolveLengths(t);
  const b = tt.adjacent * tt.adjacent;
  const c = tt.hypotenuse * tt.hypotenuse;
  const a = tt.opposite * tt.opposite;
  return [
    Math.sqrt(2 * (b + c) - a) / 2,
    Math.sqrt(2 * (c + a) - b) / 2,
    Math.sqrt(2 * (a + b) - c) / 2
  ];
};
var circumcircle2 = (t) => {
  const tt = resolveLengths(t);
  return { radius: tt.hypotenuse / 2 };
};
var incircle2 = (t) => {
  const tt = resolveLengths(t);
  return {
    radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2
  };
};
var oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
var oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
var adjacentFromHypotenuse = (angleRadian3, hypotenuse) => Math.cos(angleRadian3) * hypotenuse;
var adjacentFromOpposite = (angleRadian3, opposite) => opposite / Math.tan(angleRadian3);
var hypotenuseFromOpposite = (angleRadian3, opposite) => opposite / Math.sin(angleRadian3);
var hypotenuseFromAdjacent = (angleRadian3, adjacent) => adjacent / Math.cos(angleRadian3);

// src/geometry/triangle/Isosceles.ts
var Isosceles_exports = {};
__export(Isosceles_exports, {
  apexAngle: () => apexAngle,
  area: () => area6,
  baseAngle: () => baseAngle,
  circumcircle: () => circumcircle3,
  fromA: () => fromA2,
  fromB: () => fromB2,
  fromC: () => fromC2,
  fromCenter: () => fromCenter3,
  height: () => height3,
  incircle: () => incircle3,
  legHeights: () => legHeights,
  medians: () => medians2,
  perimeter: () => perimeter4
});
var baseAngle = (t) => Math.acos(t.base / (2 * t.legs));
var apexAngle = (t) => {
  const aa = t.legs * t.legs;
  const cc = t.base * t.base;
  return Math.acos((2 * aa - cc) / (2 * aa));
};
var height3 = (t) => {
  const aa = t.legs * t.legs;
  const cc = t.base * t.base;
  return Math.sqrt((4 * aa - cc) / 4);
};
var legHeights = (t) => {
  const b = baseAngle(t);
  return t.base * Math.sin(b);
};
var perimeter4 = (t) => 2 * t.legs + t.base;
var area6 = (t) => {
  const h = height3(t);
  return h * t.base / 2;
};
var circumcircle3 = (t) => {
  const h = height3(t);
  const hh = h * h;
  const cc = t.base * t.base;
  return { radius: (4 * hh + cc) / (8 * h) };
};
var incircle3 = (t) => {
  const h = height3(t);
  return { radius: t.base * h / (2 * t.legs + t.base) };
};
var medians2 = (t) => {
  const aa = t.legs * t.legs;
  const cc = t.base * t.base;
  const medianAB = Math.sqrt(aa + 2 * cc) / 2;
  const medianC = Math.sqrt(4 * aa - cc) / 2;
  return [medianAB, medianAB, medianC];
};
var fromCenter3 = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t);
  const incircleR = incircle3(t).radius;
  const verticalToApex = h - incircleR;
  const a = { x: origin.x - t.base / 2, y: origin.y + incircleR };
  const b = { x: origin.x + t.base / 2, y: origin.y + incircleR };
  const c = { x: origin.x, y: origin.y - verticalToApex };
  return { a, b, c };
};
var fromA2 = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + t.base, y: origin.y };
  const c = { x: origin.x + t.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromB2 = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t.base, y: origin.y };
  const c = { x: origin.x - t.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromC2 = (t, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t.base / 2, y: origin.y + h };
  const b = { x: origin.x + t.base / 2, y: origin.y + h };
  return { a, b, c };
};

// src/geometry/triangle/index.ts
var piPi7 = Math.PI * 2;
var Empty4 = Object.freeze({
  a: { x: 0, y: 0 },
  b: { x: 0, y: 0 },
  c: { x: 0, y: 0 }
});
var Placeholder3 = Object.freeze({
  a: { x: Number.NaN, y: Number.NaN },
  b: { x: Number.NaN, y: Number.NaN },
  c: { x: Number.NaN, y: Number.NaN }
});
var isEmpty4 = (t) => isEmpty(t.a) && isEmpty(t.b) && isEmpty(t.c);
var isPlaceholder4 = (t) => isPlaceholder(t.a) && isPlaceholder(t.b) && isPlaceholder(t.c);
var apply2 = (t, fn) => Object.freeze({
  ...t,
  a: fn(t.a, `a`),
  b: fn(t.b, `b`),
  c: fn(t.c, `c`)
});
var isTriangle = (p) => {
  if (p === void 0) return false;
  const tri = p;
  if (!isPoint(tri.a)) return false;
  if (!isPoint(tri.b)) return false;
  if (!isPoint(tri.c)) return false;
  return true;
};
var isEqual7 = (a, b) => isEqual(a.a, b.a) && isEqual(a.b, b.b) && isEqual(a.c, b.c);
var corners2 = (t) => {
  guard6(t);
  return [t.a, t.b, t.c];
};
var lengths2 = (t) => {
  guard6(t);
  return [
    distance(t.a, t.b),
    distance(t.b, t.c),
    distance(t.c, t.a)
  ];
};
var angles = (t) => {
  guard6(t);
  return [
    angleRadian(t.a, t.b),
    angleRadian(t.b, t.c),
    angleRadian(t.c, t.a)
  ];
};
var anglesDegrees = (t) => {
  guard6(t);
  return radianToDegree(angles(t));
};
var isEquilateral = (t) => {
  guard6(t);
  const [a, b, c] = lengths2(t);
  return a === b && b === c;
};
var isIsosceles = (t) => {
  const [a, b, c] = lengths2(t);
  if (a === b) return true;
  if (b === c) return true;
  if (c === a) return true;
  return false;
};
var isRightAngle = (t) => angles(t).includes(Math.PI / 2);
var isOblique = (t) => !isRightAngle(t);
var isAcute = (t) => !angles(t).some((v) => v >= Math.PI / 2);
var isObtuse = (t) => angles(t).some((v) => v > Math.PI / 2);
var fromRadius = (origin, radius, opts = {}) => {
  throwNumberTest(radius, `positive`, `radius`);
  guard(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [
    initialAngleRadian,
    initialAngleRadian + piPi7 * 1 / 3,
    initialAngleRadian + piPi7 * 2 / 3
  ];
  const points = angles2.map((a) => toCartesian(radius, a, origin));
  return fromPoints3(points);
};
var rotateByVertex = (triangle, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle.a : vertex === `b` ? triangle.b : triangle.c;
  return Object.freeze({
    a: rotate(triangle.a, amountRadian, origin),
    b: rotate(triangle.b, amountRadian, origin),
    c: rotate(triangle.c, amountRadian, origin)
  });
};
var equilateralFromVertex = (origin, length4 = 10, angleRadian3 = Math.PI / 2) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const a = project(origin, length4, Math.PI - -angleRadian3 / 2);
  const c = project(origin, length4, Math.PI - angleRadian3 / 2);
  return { a, b: origin, c };
};
var toFlatArray2 = (t) => {
  guard6(t);
  return [t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords)) throw new Error(`coords expected as array`);
  if (coords.length !== 6) {
    throw new Error(
      `coords array expected with 6 elements. Got ${coords.length}`
    );
  }
  return fromPoints3(fromNumbers(...coords));
};
var fromPoints3 = (points) => {
  if (!Array.isArray(points)) throw new Error(`points expected as array`);
  if (points.length !== 3) {
    throw new Error(
      `points array expected with 3 elements. Got ${points.length}`
    );
  }
  const t = {
    a: points[0],
    b: points[1],
    c: points[2]
  };
  return t;
};
var bbox6 = (t, inflation = 0) => {
  const { a, b, c } = t;
  const xMin = Math.min(a.x, b.x, c.x) - inflation;
  const xMax = Math.max(a.x, b.x, c.x) + inflation;
  const yMin = Math.min(a.y, b.y, c.y) - inflation;
  const yMax = Math.max(a.y, b.y, c.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var barycentricCoord = (t, a, b) => {
  const pt = getPointParameter(a, b);
  const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
  const alpha = ab(pt.x, pt.y, t.b, t.c) / ab(t.a.x, t.a.y, t.b, t.c);
  const theta = ab(pt.x, pt.y, t.c, t.a) / ab(t.b.x, t.b.y, t.c, t.a);
  const gamma = ab(pt.x, pt.y, t.a, t.b) / ab(t.c.x, t.c.y, t.a, t.b);
  return {
    a: alpha,
    b: theta,
    c: gamma
  };
};
var barycentricToCartestian = (t, bc) => {
  guard6(t);
  const { a, b, c } = t;
  const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
  const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
  if (a.z && b.z && c.z) {
    const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
    return Object.freeze({ x, y, z });
  } else {
    return Object.freeze({ x, y });
  }
};
var intersectsPoint2 = (t, a, b) => {
  const box = bbox6(t);
  const pt = getPointParameter(a, b);
  if (!intersectsPoint(box, pt)) return false;
  const bc = barycentricCoord(t, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};

export {
  joinPointsToLines,
  Empty2 as Empty,
  line_exports,
  Waypoint_exports,
  corners,
  shape_exports,
  Layout_exports,
  circle_exports,
  cardinal,
  getEdgeX,
  getEdgeY,
  Empty3 as Empty2,
  EmptyPositioned,
  isEqualSize,
  multiplyScalar3 as multiplyScalar,
  Placeholder2 as Placeholder,
  PlaceholderPositioned,
  rect_exports,
  path_exports,
  grid_exports,
  CompoundPath_exports,
  Ellipse_exports,
  CurveSimplification_exports,
  QuadTree_exports,
  scaler,
  Scaler_exports,
  ImageDataGrid_exports,
  Convolve2d_exports,
  arc_exports,
  Vector_exports,
  SurfacePoints_exports,
  corners2,
  triangle_exports,
  geometry_exports
};
//# sourceMappingURL=chunk-OQT4QDLV.js.map