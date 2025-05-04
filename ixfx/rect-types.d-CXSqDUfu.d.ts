//#region ../packages/geometry/src/point/point-type.d.ts
/**
* A point, consisting of x, y and maybe z fields.
*/type Point = {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
}; //#endregion
//#region ../packages/geometry/src/rect/rect-types.d.ts

type Rect = {
  readonly width: number;
  readonly height: number;
};
type RectPositioned = Point & Rect; //#endregion
export { Point, Rect, RectPositioned };
//# sourceMappingURL=rect-types.d-CXSqDUfu.d.ts.map