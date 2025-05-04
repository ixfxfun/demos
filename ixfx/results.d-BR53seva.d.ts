//#region ../packages/geometry/src/point/point-type.d.ts
/**
* A point, consisting of x, y and maybe z fields.
*/
/**
 * A point, consisting of x, y and maybe z fields.
 */
type Point = {
    readonly x: number;
    readonly y: number;
    readonly z?: number;
};

//#endregion
//#region ../packages/geometry/src/rect/rect-types.d.ts
type Rect = {
    readonly width: number;
    readonly height: number;
};
type RectPositioned = Point & Rect;

//#endregion
//#region ../packages/core/src/results.d.ts
type ResultOk<T> = {
    success: true;
    value: T;
};
type ResultError = {
    success: false;
    error: Error | string;
};
type Result<T> = ResultOk<T> | ResultError;

//#endregion
export { Point, Rect, RectPositioned, Result };
//# sourceMappingURL=results.d-BR53seva.d.ts.map