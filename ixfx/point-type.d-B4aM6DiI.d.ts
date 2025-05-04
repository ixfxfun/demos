//#region ../packages/geometry/src/point/point-type.d.ts
/**
* A point, consisting of x, y and maybe z fields.
*/type Point = {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
};
type Point3d = Point & {
  readonly z: number;
}; //#endregion
export { Point, Point3d };
//# sourceMappingURL=point-type.d-B4aM6DiI.d.ts.map