import { P as Point } from './PointType-BDlA07rn.js';
import { P as Path } from './PathType-9cjB2t-Y.js';

type Triangle = {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
};

/**
 * Arc, defined by radius, start and end point in radians and direction
 */
type Arc = {
    /**
     * Radius of arc
     */
    readonly radius: number;
    /**
     * Start radian
     */
    readonly startRadian: number;
    /**
     * End radian
     */
    readonly endRadian: number;
    /**
     * If true, arc runs in clockwise direction
     */
    readonly clockwise: boolean;
};
/**
 * An {@link Geometry.Arcs.Arc} that also has a center position, given in x, y
 */
type ArcPositioned = Point & Arc;

type QuadraticBezier = {
    readonly a: Point;
    readonly b: Point;
    readonly quadratic: Point;
};
type QuadraticBezierPath = Path & QuadraticBezier;
type CubicBezier = {
    readonly a: Point;
    readonly b: Point;
    readonly cubic1: Point;
    readonly cubic2: Point;
};
type CubicBezierPath = Path & CubicBezier;

/**
 * An ellipse
 */
type Ellipse = {
    readonly radiusX: number;
    readonly radiusY: number;
    /**
     * Rotation, in radians
     */
    readonly rotation?: number;
    readonly startAngle?: number;
    readonly endAngle?: number;
};
/**
 * A {@link Ellipse} with position
 */
type EllipsePositioned = Point & Ellipse;
declare const fromDegrees: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
type EllipticalPath = Ellipse & Path & {
    readonly kind: `elliptical`;
};

type Ellipse$1_Ellipse = Ellipse;
type Ellipse$1_EllipsePositioned = EllipsePositioned;
type Ellipse$1_EllipticalPath = EllipticalPath;
declare const Ellipse$1_fromDegrees: typeof fromDegrees;
declare namespace Ellipse$1 {
  export { type Ellipse$1_Ellipse as Ellipse, type Ellipse$1_EllipsePositioned as EllipsePositioned, type Ellipse$1_EllipticalPath as EllipticalPath, Ellipse$1_fromDegrees as fromDegrees };
}

export { type ArcPositioned as A, type CubicBezier as C, type EllipsePositioned as E, type QuadraticBezier as Q, type Triangle as T, type CubicBezierPath as a, type QuadraticBezierPath as b, type Arc as c, Ellipse$1 as d };
