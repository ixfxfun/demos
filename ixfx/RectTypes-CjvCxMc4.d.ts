import { P as Point, a as Point3d } from './PointType-BDlA07rn.js';

/**
 * Rectangle as array: `[width, height]`
 */
type RectArray = readonly [width: number, height: number];
/**
 * Positioned rectangle as array: `[x, y, width, height]`
 */
type RectPositionedArray = readonly [
    x: number,
    y: number,
    width: number,
    height: number
];
type Rect = {
    readonly width: number;
    readonly height: number;
};
type Rect3d = Rect & {
    readonly depth: number;
};
type RectPositioned = Point & Rect;
type Rect3dPositioned = Point3d & Rect3d;

export type { Rect as R, RectPositioned as a, Rect3dPositioned as b, RectArray as c, RectPositionedArray as d, Rect3d as e };
