import { Point } from "./point-type.d-DNIvmHt0.js";
import { RectPositioned } from "./rect-types.d-L6DK8DSN.js";

//#region ../packages/geometry/src/path/path-type.d.ts
type Path = {
  /**
   * Length of path
   */
  length(): number;
  /**
   * Returns a point at a relative (0.0-1.0) position along the path
   *
   * Inverse of {@link relativePosition}.
   * @param {number} t Relative position (0.0-1.0)
   * @returns {Point} Point
   */
  interpolate(t: number): Point;
  /**
   * Returns relative position of `point` along path.
   * If `pt` is same as start, result will be 0, if it's the same as end, it will be 1.
   *
   * Inverse of {@link interpolate}.
   * @param point
   * @param intersectionThreshold
   */
  relativePosition(point: Point, intersectionThreshold: number): number;
  /**
   * Gets smallest box that encloses path
   */
  bbox(): RectPositioned;
  /**
   * Returns the nearest point on path to `point`
   * @param point
   */
  nearest(point: Point): Point;
  /**
   * Distance from start of path to this point.
   * If path is closed (eg. a circle) it may have some arbitary 'start' point
   * @param point
   */
  distanceToPoint(point: Point): number;
  /**
   * Returns a string representation of pth values
   */
  toString(): string;
  /**
   * Returns an array of SVG segments that can render path
   */
  toSvgString(): ReadonlyArray<string>;
  /**
   * Well-known path kind
   */
  readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
}; //#endregion
export { Path };
//# sourceMappingURL=path-type.d-BCybKGJ7.d.ts.map