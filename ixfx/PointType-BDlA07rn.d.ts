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
declare const Placeholder: Readonly<{
    x: number;
    y: number;
}>;
/**
 * Placeholder point: `{x: NaN, y:NaN, z:NaN }`
 * Use `isPlaceholder` to check if a point is a placeholder.
 * Use `Placeholder` to get a point without `z` property.
 */
declare const Placeholder3d: Readonly<{
    x: number;
    y: number;
    z: number;
}>;

export { type Point as P, type Point3d as a, Placeholder as b, Placeholder3d as c };
