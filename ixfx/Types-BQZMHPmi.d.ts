import { P as Point } from './PointType-BDlA07rn.js';

/**
 * A polar ray is a line in polar coordinates
 * It consists of an angle (in radians) with a given offset and length.
 */
type PolarRay = Readonly<{
    /**
     * Angle of ray
     */
    angleRadian: number;
    /**
     * Starting point of a ray, defined as an
     * offset from the polar origin.
     */
    offset: number;
    /**
     * Length of ray
     */
    length: number;
    origin?: Point;
}>;
type PolarRayWithOrigin = PolarRay & Readonly<{
    origin: Point;
}>;
/**
 * Polar coordinate, made up of a distance and angle in radians.
 * Most computations involving PolarCoord require an `origin` as well.
 */
type Coord = {
    readonly distance: number;
    readonly angleRadian: number;
};

export type { Coord as C, PolarRay as P, PolarRayWithOrigin as a };
