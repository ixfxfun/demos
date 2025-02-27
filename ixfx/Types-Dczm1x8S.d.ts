import { I as ISetMutable } from './ISetMutable-hVNWApH3.js';

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
    array: Array<T>;
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
 * cell location.
 *
 * These functions create a GridReadable:
 * * {@link Grids.Array1d.wrap}: wrap an array and read as a grid
 * * {@link Grids.Array1d.wrapMutable}: wrap and modify an array as a grid
 * * {@link Grids.Array2d.wrap}: wrap a two-dimensional grid
 * * {@link Grids.Array2d.wrapMutable}
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

export type { Grid as G, GridCellAccessor as a, GridCellSetter as b, GridCardinalDirection as c, GridWritable as d, GridReadable as e, GridCell as f, GridBoundsLogic as g, GridArray1d as h, GridNeighbours as i, GridCardinalDirectionOptional as j, GridCellAndValue as k, GridVisual as l, GridNeighbour as m, GridNeighbourSelectionLogic as n, GridVisitorOpts as o, GridCreateVisitor as p, GridIdentifyNeighbours as q, GridNeighbourMaybe as r, GridNeighbourSelector as s };
