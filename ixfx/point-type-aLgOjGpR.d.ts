//#region ../packages/geometry/src/point/point-type.d.ts
/**
 * A point, consisting of x, y and maybe z fields.
 */
type Point = {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
};
type Point3d = Point & {
  readonly z: number;
}; //#endregion

/**
 * Placeholder point: `{ x: NaN, y: NaN }`
 * Use `isPlaceholder` to check if a point is a placeholder.
 * Use `Placeholder3d` get a point with `z` property.
 */
export { Point, Point3d };
//# sourceMappingURL=point-type-aLgOjGpR.d.ts.map