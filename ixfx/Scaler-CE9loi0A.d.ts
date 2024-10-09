import { I as ISetMutable } from './ISetMutable-hVNWApH3.js';
import { P as Point } from './PointType-BDlA07rn.js';
import { R as Rect } from './RectTypes-BVWwyVKg.js';

type GridVisual = Grid & {
    readonly size: number;
};
type Grid = {
    readonly rows: number;
    readonly cols: number;
};
type GridCell = {
    readonly x: number;
    readonly y: number;
};
type GridNeighbours = {
    readonly n: GridCell | undefined;
    readonly e: GridCell | undefined;
    readonly s: GridCell | undefined;
    readonly w: GridCell | undefined;
    readonly ne: GridCell | undefined;
    readonly nw: GridCell | undefined;
    readonly se: GridCell | undefined;
    readonly sw: GridCell | undefined;
};
type GridCardinalDirection = `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
type GridCardinalDirectionOptional = GridCardinalDirection | ``;
type GridArray1d<T> = GridReadable<T> & GridWritable<T> & {
    array: T[];
};
/**
 * Bounds logic
 * * Unbounded: attempts to read beyond limits
 * * Undefined: returns _undefined_ when reading beyond limits
 * * Stop: returns cell value at edge of limits
 * * Wrap: Wrap-around cell positions
 *
 */
type GridBoundsLogic = 
/**
 * Unbounded: attempts to read beyond limits
 */
`unbounded` | 
/**
 * Undefined: returns _undefined_ when reading beyond limits
 */
`undefined` | 
/**
 * Stop: returns cell value at edge of limits
 */
`stop` | 
/**
 * Wrap-around cell positions
 */
`wrap`;
/**
 * Logic to select the next cell based on a list of neighbours
 */
type GridNeighbourSelectionLogic = {
    /**
     * Returns neighbours for a given cell in a grid
     */
    readonly getNeighbours?: GridIdentifyNeighbours;
    /**
     * Select a neighbour from given list
     */
    readonly select: GridNeighbourSelector;
};
type GridVisitorOpts = Readonly<{
    start: GridCell;
    visited: ISetMutable<GridCell>;
    reversed: boolean;
    debug: boolean;
    boundsWrap: GridBoundsLogic;
}>;
type GridCreateVisitor = (grid: Grid, opts?: Partial<GridVisitorOpts>) => Generator<GridCell>;
type GridCellAndValue<T> = {
    cell: GridCell;
    value: T | undefined;
};
type GridNeighbourMaybe = readonly [keyof GridNeighbours, GridCell | undefined];
type GridNeighbour = readonly [keyof GridNeighbours, GridCell];
/**
 * A function that returns a value (or _undefined_) based on a _cell_
 *
 * Implementations:
 * * {@link Array1d.access}: For accessing a single-dimension array as a grid
 * * {@link Array2d.access}: For accessing a two-dimension array as a grid
 *
 */
type GridCellAccessor<TValue> = (cell: GridCell, wrap?: GridBoundsLogic) => TValue | undefined;
/**
 * A function that sets the value of a cell.
 */
type GridCellSetter<TValue> = (value: TValue, cell: GridCell, wrap?: GridBoundsLogic) => void;
/**
 * Shape of a grid and a function to read values from it, based on
 * cell location
 */
type GridReadable<T> = Grid & {
    get: GridCellAccessor<T>;
};
type GridWritable<T> = Grid & {
    set: GridCellSetter<T>;
};
/**
 * Neighbour selector logic. For a given set of `neighbours` pick one to visit next.
 */
type GridNeighbourSelector = (neighbours: ReadonlyArray<GridNeighbour>) => GridNeighbour | undefined;
/**
 * Identify neighbours logic. For a given `grid` and `origin`, return a list of neighbours
 */
type GridIdentifyNeighbours = (grid: Grid, origin: GridCell) => ReadonlyArray<GridNeighbour>;

/**
 * A scale function that takes an input value to scale.
 * Input can be in the form of `{ x, y }` or two number parameters.
 *
 * ```js
 * scale(10, 20);
 * scale({ x:10, y:20 });
 * ```
 *
 * Output range can be specified as a `{ width, height }` or two number parameters.
 * If omitted, the default range
 * is used.
 *
 * ```js
 * // Scale 10,20 with range w:800 h:600
 * scale(10, 20, 800, 600);
 * scale({x:10, y:20}, 800, 600);
 * scale({x:10, y:20}, {width: 800, height: 600});
 * ```
 */
type Scaler = (a: number | Point, b?: number | Rect, c?: number | Rect, d?: number) => Point;
/**
 * A scaler than can convert to a from an output range
 */
type ScalerCombined = {
    /**
     * Relative to absolute coordinates
     */
    readonly abs: Scaler;
    /**
     * Absolute to relative coordintes
     */
    readonly rel: Scaler;
    readonly width: number;
    readonly height: number;
    computeScale(): Point;
};
type ScaleBy = `both` | `min` | `max` | `width` | `height`;
/**
 * Returns a set of scaler functions, to convert to and from ranges.
 *
 * ```js
 * const scaler = Scaler.scaler(`both`, {width:window.innerWidth, height:window.innerHeight});
 * // Assuming screen of 800x400...
 * scaler.abs(400,200);          // Yields { x:0.5, y:0.5 }
 * scaler.abs({ x:400, y:200 }); // Yields { x:0.5, y:0.5 }
 *
 * scaler.rel(0.5, 0.5);         // Yields: { x:400, y:200 }
 * scaler.rel({ x:0.5, y:0.5 }); // Yields: { x:400, y:200 }
 * ```
 *
 * If no default range is provided, it must be given each time the scale function is used.
 *
 * ```js
 * const scaler = Scaler.scaler(`both`);
 *
 * scaler.abs(400, 200, 800, 400);
 * scaler.abs(400, 200, { width: 800, height: 400 });
 * scaler.abs({ x:400, y: 200}, { width: 800, height: 400 });
 * scaler.abs({ x:400, y: 200}, 800, 400);
 * // All are the same, yielding { x:0.5, y:0.5 }
 *
 * scaler.abs(400, 200); // Throws an exception because there is no scale
 * ```
 * @param scaleBy Dimension to scale by
 * @param defaultRect Default range
 * @returns
 */
declare const scaler: (scaleBy?: ScaleBy, defaultRect?: Rect) => ScalerCombined;

type Scaler$1_ScaleBy = ScaleBy;
type Scaler$1_Scaler = Scaler;
type Scaler$1_ScalerCombined = ScalerCombined;
declare const Scaler$1_scaler: typeof scaler;
declare namespace Scaler$1 {
  export { type Scaler$1_ScaleBy as ScaleBy, type Scaler$1_Scaler as Scaler, type Scaler$1_ScalerCombined as ScalerCombined, Scaler$1_scaler as scaler };
}

export { type Grid as G, type ScaleBy as S, type Scaler as a, type GridCellAccessor as b, type GridCellSetter as c, type GridWritable as d, type GridReadable as e, type GridCardinalDirection as f, type GridCell as g, type GridBoundsLogic as h, type GridArray1d as i, type GridNeighbours as j, type GridCardinalDirectionOptional as k, type GridCellAndValue as l, type GridVisual as m, type GridNeighbour as n, type GridNeighbourSelectionLogic as o, type GridVisitorOpts as p, type GridCreateVisitor as q, type GridIdentifyNeighbours as r, type GridNeighbourMaybe as s, type GridNeighbourSelector as t, Scaler$1 as u };
