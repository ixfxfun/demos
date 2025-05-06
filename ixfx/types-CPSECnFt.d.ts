//#region ../packages/geometry/src/grid/types.d.ts

type Grid = {
  readonly rows: number;
  readonly cols: number;
};
type GridCell = {
  readonly x: number;
  readonly y: number;
};
type GridCardinalDirection = `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
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
}; //#endregion

/**
 * Neighbour selector logic. For a given set of `neighbours` pick one to visit next.
 */
export { Grid, GridCardinalDirection, GridCellAccessor, GridCellSetter, GridReadable, GridWritable };
//# sourceMappingURL=types-CPSECnFt.d.ts.map