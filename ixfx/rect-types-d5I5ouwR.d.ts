//#region ../geometry/dist/src/point/point-type.d.ts
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
};
/**
 * Placeholder point: `{ x: NaN, y: NaN }`
 * Use `isPlaceholder` to check if a point is a placeholder.
 * Use `Placeholder3d` get a point with `z` property.
 */
//#endregion
//#region ../geometry/dist/src/rect/rect-types.d.ts

type Rect = {
  readonly width: number;
  readonly height: number;
};
type RectPositioned = Point & Rect;
//#endregion
export { Point, Point3d, Rect, RectPositioned };
//# sourceMappingURL=rect-types-d5I5ouwR.d.ts.map