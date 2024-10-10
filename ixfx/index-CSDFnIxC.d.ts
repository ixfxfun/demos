import { C as CirclePositioned } from './CircleType-D9Xd-yDE.js';
import { P as Point } from './PointType-BDlA07rn.js';
import { R as Rect, a as RectPositioned } from './RectTypes-BVWwyVKg.js';
import { G as Grid, c as GridWritable, d as GridReadable, a as GridCellAccessor, b as GridCellSetter } from './Types-D_kJgplB.js';
import { R as Rgb8Bit, a as Rgb, b as Colour } from './Colour-YzEXhgtt.js';
import { a as Drawing } from './Drawing-BA-hHZOn.js';
import { S as Svg } from './Svg-D94XTP5k.js';
import { L as Line } from './LineType-DkIFzpdp.js';
import { a as RecursivePartial } from './TsUtil-CAOuGbXq.js';
import { V as Video } from './Video-W9xZZbzn.js';

declare class CanvasSource {
    #private;
    constructor(canvasElementOrQuery: HTMLCanvasElement | string, sizeBasis?: `min` | `max`);
    setLogicalSize(size: Rect): Rect;
    invalidateContext(): void;
    createFixedAbsolute(canvasCoordsRect: RectPositioned): CanvasRegion;
    toAbsPoint(pt: Point, kind?: `independent`): {
        x: number;
        y: number;
    };
    get offset(): {
        x: number;
        y: number;
    };
    toRelPoint(pt: Point, source: `screen` | `source`, kind?: `independent` | `skip`, clamped?: boolean): {
        x: number;
        y: number;
    };
    toAbsRect(rect: Rect | RectPositioned, kind?: `independent`): {
        width: number;
        height: number;
        x: number;
        y: number;
    } | {
        width: number;
        height: number;
    };
    createRelative(rect: RectPositioned, kind?: `independent`): CanvasRegion;
    clear(): void;
    get context(): CanvasRenderingContext2D;
    get sizeScaler(): {
        abs: (v: number) => number;
        rel: (v: number) => number;
    };
    get width(): number;
    get height(): number;
}
/**
 * Draws on a canvas, constrained to a specific region
 */
declare class CanvasRegion {
    #private;
    source: CanvasSource;
    /**
     * Creates, using coordinate in canvas coordinates
     */
    constructor(source: CanvasSource, regionCompute: (parent: CanvasSource) => RectPositioned);
    recomputeRegion(): void;
    /**
     * Converts a region-relative point (0..1) to an absolute
     * point, which uses region-relative coordinates.
     *
     * Eg if the region had an x,y of 100,100, `toAbsRegion({x:0,y:0})`
     * will return 0,0.
     *
     * @param rel
     * @param scaleBy
     * @returns
     */
    toAbsRegion(regionRel: Point, scaleBy?: `both`): {
        x: number;
        y: number;
    };
    applyRegionOffset(p: Point): {
        x: number;
        y: number;
    };
    drawConnectedPointsRelative(relativePoints: Array<Point>, strokeStyle: string, lineWidth?: number): void;
    drawConnectedPoints(points: Array<Point>, strokeStyle: string, lineWidth?: number): void;
    /**
     * Fills text at a relative position
     * @param text
     * @param relPos Relative, meaning 0.5,0.5 is the middle of the region
     * @param fillStyle
     * @param baseline
     * @param align
     */
    fillTextRelative(text: string, relPos: Point, fillStyle: string | undefined, font: string, baseline?: CanvasTextBaseline, align?: CanvasTextAlign): void;
    /**
     * Fills text at a region-relative position
     * @param text
     * @param point Region relative, meaning 0,0 is top-left of region
     * @param fillStyle
     * @param baseline
     * @param align
     */
    fillText(text: string, point: Point, fillStyle: string | undefined, font: string, baseline?: CanvasTextBaseline, align?: CanvasTextAlign): void;
    drawCircles(relativeCircles: Array<CirclePositioned>, fillStyle: string, strokeStyle?: string, lineWidth?: number): void;
    clear(): void;
    fill(fillStyle?: string): void;
    drawBounds(strokeStyle: string, lineWidth?: number): void;
    /**
     * Converts a  point to a region-relative one.
     * @param pt
     * @param kind
     * @returns
     */
    toRelPoint(pt: Point, source?: `screen` | `source`, kind?: `independent`, clamped?: boolean): {
        x: number;
        y: number;
    };
    absToRegionPoint(pt: Point, source: `screen`, clamped: boolean): {
        x: number;
        y: number;
    };
    get center(): Point;
    get context(): CanvasRenderingContext2D;
    set region(value: RectPositioned);
    get region(): RectPositioned;
    get width(): number;
    get height(): number;
    get x(): number;
    get y(): number;
    get dimensionMin(): number;
}

declare const grid: (image: ImageData) => Grid;
declare const wrap: (image: ImageData) => GridWritable<Rgb8Bit> & GridReadable<Rgb8Bit>;
/**
 * Returns a function to access pixel values by x,y
 * @param image
 * @returns
 */
declare const accessor: (image: ImageData) => GridCellAccessor<Rgb8Bit>;
/**
 * Returns a function that sets pixel values
 * @param image
 * @returns
 */
declare const setter: (image: ImageData) => GridCellSetter<Rgb>;
/**
 * Yields pixels of an image row by row
 * @param image
 */
declare function byRow(image: ImageData): Generator<(Rgb8Bit | undefined)[], void, unknown>;
/**
 * Yields pixels of an image column by column
 * @param image
 */
declare function byColumn(image: ImageData): Generator<Rgb8Bit[], void, unknown>;

declare const ImageDataGrid_accessor: typeof accessor;
declare const ImageDataGrid_byColumn: typeof byColumn;
declare const ImageDataGrid_byRow: typeof byRow;
declare const ImageDataGrid_grid: typeof grid;
declare const ImageDataGrid_setter: typeof setter;
declare const ImageDataGrid_wrap: typeof wrap;
declare namespace ImageDataGrid {
  export { ImageDataGrid_accessor as accessor, ImageDataGrid_byColumn as byColumn, ImageDataGrid_byRow as byRow, ImageDataGrid_grid as grid, ImageDataGrid_setter as setter, ImageDataGrid_wrap as wrap };
}

/**
 * Options
 */
type BipolarViewOptions = Readonly<{
    width?: number;
    height?: number;
    labelPrecision?: number;
    labels?: [string, string];
    axisColour?: string;
    bgColour?: string;
    whiskerColour?: string;
    whiskerSize?: number;
    dotColour?: string;
    dotRadius?: number;
    showWhiskers?: boolean;
    showDot?: boolean;
    showLabels?: boolean;
    padding?: number;
    labelColour?: string;
    axisWidth?: number;
    asPercentages?: boolean;
    /**
     * If non-zero, will render the last X number of values with increasing opacity.
     * Default: 0
     */
    displayLastValues?: number;
    /**
     * If _true_, (default) negative y values are at the bottom.
     * If _false_  negative y values are at the top.
     */
    yAxisBottomNegative?: boolean;
    /**
     * Custom rendering for background
     */
    renderBackground?: Render;
}>;
type Render = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
/**
 * A function that plots a point on the graph
 */
type BipolarView = (x: number, y: number) => void;
/**
 * Initialises a plotter for bipolar values (-1...1)
 *
 * ```js
 * const p = BipolarView.init(`#my-canvas`);
 * // Shows the dot at 1, 0.5
 * p(1, 0.5);
 * ```
 * @param elementQuery
 * @param options
 * @returns
 */
declare const init: (elementQuery: string, options?: BipolarViewOptions) => BipolarView;

type BipolarView$1_BipolarView = BipolarView;
type BipolarView$1_BipolarViewOptions = BipolarViewOptions;
type BipolarView$1_Render = Render;
declare const BipolarView$1_init: typeof init;
declare namespace BipolarView$1 {
  export { type BipolarView$1_BipolarView as BipolarView, type BipolarView$1_BipolarViewOptions as BipolarViewOptions, type BipolarView$1_Render as Render, BipolarView$1_init as init };
}

/**
 * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
 *
 */
type Palette = {
    setElementBase(el: Element): void;
    has(key: string): boolean;
    /**
     * Returns a colour by name.
     *
     * If the colour is not found:
     *  1. Try to use a CSS variable `--key`, or
     *  2. The next fallback colour is used (array cycles)
     *
     * @param key
     * @param fallback
     * @returns
     */
    get(key: string, fallback?: string): string;
    /**
     * Gets a colour by key, adding and returning fallback if not present
     * @param key Key of colour
     * @param fallback Fallback colour if key is not found
     */
    getOrAdd(key: string, fallback?: string): string;
    /**
     * Adds a colour with a given key
     *
     * @param key
     * @param value
     */
    add(key: string, value: string): void;
    alias(from: string, to: string): void;
};
declare const create: (fallbacks?: readonly string[]) => Palette;

type Palette$1_Palette = Palette;
declare const Palette$1_create: typeof create;
declare namespace Palette$1 {
  export { type Palette$1_Palette as Palette, Palette$1_create as create };
}

type TextStyle = {
    font: string;
    colour: string;
    size: string;
};
type LineStyle = {
    colour: string;
    width: number;
};
type GridStyle = LineStyle & {
    increments: number;
    major: number;
};
type ShowOptions = {
    axes: boolean;
    axisValues: boolean;
    grid: boolean;
    whiskers: boolean;
};
type SeriesMeta = {
    colour: string;
    lineWidth: number;
    dotRadius: number;
};

type PointMinMax = {
    min: Point;
    max: Point;
    width: number;
    height: number;
    minDim: number;
    maxDim: number;
};
type PlotPoint = Point & {
    fillStyle?: string;
    radius?: number;
};
type CartesianScaler = (pt: Point) => Point;
type CartesianDataRange = {
    /**
     * Converts a data value to relative value (0..1)
     */
    absDataToRelative: CartesianScaler;
    /**
     * Converts a relative value to element-based coordinates
     * (ie 0,0 is top-left of CANVAS)
     */
    relDataToCanvas: CartesianScaler;
    canvasToRelData: CartesianScaler;
    /**
     * Converts canvas coordinate to relative
     */
    regionSpaceToRelative: CartesianScaler;
    /**
     * Converts relative coordinate to value
     */
    relDataToAbs: CartesianScaler;
    range: PointMinMax;
};
type CartesianPlotOptions = {
    clear: `region` | `canvas`;
    onInvalidated: () => void;
    /**
   * Margin around whole plot area. Use
   * to avoid dots being cut off by edge of canvas
   */
    visualPadding: number;
    show: Partial<ShowOptions>;
    /**
     * If 'auto' (default), range of plot is based on data.
     * Otherwise specify the range, eg:
     * `{ min: {x:-1,y:-1}, {x:1,y:1}}`
     *
     */
    range: `auto` | {
        min: Point;
        max: Point;
    };
    /**
     * Gridline setting
     */
    grid: Partial<GridStyle>;
    /**
     * Drawing settings for axis (if 'showAxes' is enabled)
     */
    axisStyle: LineStyle;
    /**
     * How values are drawn. Default: 'dot'
     */
    valueStyle: `dot` | ``;
    /**
     * How values are connected. Default: '' (no connecting)
     * Values are connected in order of dataset.
     */
    connectStyle: `` | `line`;
    textStyle: TextStyle;
    whiskerLength: number;
};
declare const computeMinMax: (mm: Array<Point>) => PointMinMax;
declare const relativeCompute: (minMax: PointMinMax) => ((point: Point) => Point) | ((point: Point) => {
    x: number;
    y: number;
});
declare const absoluteCompute: (minMax: PointMinMax) => (point: Point) => {
    x: number;
    y: number;
};
type AxisMark = Point & {
    major: boolean;
};
declare const computeAxisMark: (mm: PointMinMax, increments: number, major: number) => {
    x: Array<AxisMark>;
    y: Array<AxisMark>;
};

declare class DataSet<TValue, TSeriesMeta> {
    #private;
    lastChange: number;
    constructor();
    get metaCount(): number;
    clear(): void;
    set(series: string, data: Array<TValue>): void;
    deleteBySeries(series: string): boolean;
    setMeta(series: string, meta: TSeriesMeta): void;
    hasMeta(series: string): boolean;
    getMeta(series: string): TSeriesMeta | undefined;
    getValues(): Generator<TValue, void, any>;
    getEntries(): Generator<[key: string, value: TValue[]], void, any>;
    getSeries(): Generator<readonly TValue[], void, any>;
    add(value: TValue, series?: string): void;
}

type InsertOptions = (InsertOptionsViewport | InsertOptionsParent) & {
    region?: RectPositioned;
};
type InsertOptionsViewport = {
    fill: `viewport`;
};
type InsertOptionsParent = {
    fill?: `parent`;
    parent: HTMLElement | string;
};
declare const insert: (insertOptions: InsertOptions, options?: RecursivePartial<CartesianPlotOptions>) => CartesianCanvasPlot;
/**
 * Simple plotting of cartesian values.
 *
 * Create a plot that fills screen
 * ```js
 * const p = Plot.insert({fill`viewport});
 * const dataSet = p.dataSet;
 *
 * // Add data
 * ds.add({ x: 1, y: 2 });
 *
 * // Draw
 * p.draw();
 * ```
 *
 * Create a plot that fills a container
 * ```js
 * const p = Plot.insert({parent:`#someel`});
 * ```
 *
 * Add data using the created data set
 * ```js
 *
 * // Add a value to the `alpha` series
 * p.dataSet.add({x:1,y:1}, `alpha`);
 * ```
 *
 * Set default series formatting
 * ```js
 * p.setMeta(`default`, {
 *  colour: `hsl(50,100%,50%)`,
 *  lineWidth: 10
 * });
 * ```
 *
 * Series can have metadata associated with it in the DataSet
 * ```js
 * // Use 'pink' by default for the series 'alpha'
 * p.setMeta(`alpha`, { colour: `pink` });
 * ``
 *
 */
declare class CartesianCanvasPlot {
    #private;
    actualDataRange: RectPositioned;
    visibleRange: RectPositioned;
    show: ShowOptions;
    whiskerLength: number;
    axisRounder: (v: number) => number;
    onInvalidated: undefined | (() => void);
    /**
     * List of lines to draw after drawing everything else.
     * Lines are given in value-coordinate space
     */
    overlayLines: Array<Line & LineStyle>;
    constructor(cr: CanvasRegion, data: DataSet<PlotPoint, SeriesMeta>, options?: RecursivePartial<CartesianPlotOptions>);
    getCurrentRange(): CartesianDataRange;
    invalidateRange(): void;
    /**
     * Positions an element at the viewport location of `data` point.
     * Ensure the element has `position:absolute` set.
     * @param data
     * @param elementToPosition
     * @param by
     */
    positionElementAt(data: Point, elementToPosition: HTMLElement | string, by?: `middle` | `top-left`, relativeToQuery?: HTMLElement | string): void;
    /**
     * When range is auto, returns the range of the data
     * Otherwise returns the user-provided range.
     * @returns
     */
    getDataRange(): PointMinMax;
    valueToScreenSpace(dataPoint: Point): {
        x: number;
        y: number;
    };
    valueToRegionSpace(dataValue: Point, debug?: boolean): {
        x: number;
        y: number;
        z?: number;
    };
    /**
     * Converts a point in pixel coordinates to a value.
     * Useful for converting from user input coordinates.
     * @param point
     * @returns
     */
    pointToValue(point: Point, _source: `screen`): Point;
    getDefaultMeta(): SeriesMeta;
    draw(): void;
    /**
     * Draws a line in value-coordinate space
     * @param line
     * @param colour
     * @param width
     */
    drawLine(line: Line, colour: string, width: number): void;
    setMeta(series: string, meta: Partial<SeriesMeta>): void;
    get dataSet(): DataSet<PlotPoint, SeriesMeta>;
    get canvasRegion(): CanvasRegion;
    get canvasSource(): CanvasSource;
}

type index$1_AxisMark = AxisMark;
type index$1_CartesianCanvasPlot = CartesianCanvasPlot;
declare const index$1_CartesianCanvasPlot: typeof CartesianCanvasPlot;
type index$1_CartesianDataRange = CartesianDataRange;
type index$1_CartesianPlotOptions = CartesianPlotOptions;
type index$1_CartesianScaler = CartesianScaler;
type index$1_DataSet<TValue, TSeriesMeta> = DataSet<TValue, TSeriesMeta>;
declare const index$1_DataSet: typeof DataSet;
type index$1_GridStyle = GridStyle;
type index$1_InsertOptions = InsertOptions;
type index$1_InsertOptionsParent = InsertOptionsParent;
type index$1_InsertOptionsViewport = InsertOptionsViewport;
type index$1_LineStyle = LineStyle;
type index$1_PlotPoint = PlotPoint;
type index$1_PointMinMax = PointMinMax;
type index$1_SeriesMeta = SeriesMeta;
type index$1_ShowOptions = ShowOptions;
type index$1_TextStyle = TextStyle;
declare const index$1_absoluteCompute: typeof absoluteCompute;
declare const index$1_computeAxisMark: typeof computeAxisMark;
declare const index$1_computeMinMax: typeof computeMinMax;
declare const index$1_insert: typeof insert;
declare const index$1_relativeCompute: typeof relativeCompute;
declare namespace index$1 {
  export { type index$1_AxisMark as AxisMark, index$1_CartesianCanvasPlot as CartesianCanvasPlot, type index$1_CartesianDataRange as CartesianDataRange, type index$1_CartesianPlotOptions as CartesianPlotOptions, type index$1_CartesianScaler as CartesianScaler, index$1_DataSet as DataSet, type index$1_GridStyle as GridStyle, type index$1_InsertOptions as InsertOptions, type index$1_InsertOptionsParent as InsertOptionsParent, type index$1_InsertOptionsViewport as InsertOptionsViewport, type index$1_LineStyle as LineStyle, type index$1_PlotPoint as PlotPoint, type index$1_PointMinMax as PointMinMax, type index$1_SeriesMeta as SeriesMeta, type index$1_ShowOptions as ShowOptions, type index$1_TextStyle as TextStyle, index$1_absoluteCompute as absoluteCompute, index$1_computeAxisMark as computeAxisMark, index$1_computeMinMax as computeMinMax, index$1_insert as insert, index$1_relativeCompute as relativeCompute };
}

type Measurement = {
    actual: Rect;
    ref: Box;
    children: Array<Measurement | undefined>;
};
type Layout = {
    actual: Point;
    ref: Box;
    children: Array<Layout | undefined>;
};
type PxUnit = {
    value: number;
    type: `px`;
};
type PcUnit = {
    value: number;
    type: `pc`;
};
type BoxUnit = PxUnit | PcUnit;
type BoxRect = {
    x?: BoxUnit;
    y?: BoxUnit;
    width?: BoxUnit;
    height?: BoxUnit;
};
declare const boxUnitFromPx: (v: number) => PxUnit;
declare const boxRectFromPx: (x: number, y: number, width: number, height: number) => BoxRect;
declare const boxRectFromRectPx: (r: RectPositioned) => BoxRect;
declare class BaseState {
    bounds: RectPositioned;
    pass: number;
    constructor(bounds: RectPositioned);
    resolveToPx(u: BoxUnit | undefined, maxValue: number, defaultValue?: number): number | undefined;
    resolveBox(box: BoxRect | undefined): Rect | RectPositioned | undefined;
}
declare class MeasureState extends BaseState {
    measurements: Map<string, Measurement>;
    constructor(bounds: RectPositioned);
    getActualSize(id: string): Rect | undefined;
    whatIsMeasured(): Array<string>;
}
declare class LayoutState extends BaseState {
    layouts: Map<string, Layout>;
    constructor(bounds: RectPositioned);
}
/**
 * Box
 */
declare abstract class Box {
    /** Rectangle Box occupies in canvas/etc */
    canvasRegion: RectPositioned;
    private _desiredRect;
    protected _measuredSize: Rect | undefined;
    protected _layoutPosition: Point | undefined;
    protected children: Array<Box>;
    protected readonly _parent: Box | undefined;
    private _idMap;
    debugLayout: boolean;
    private _visible;
    protected _ready: boolean;
    takesSpaceWhenInvisible: boolean;
    protected _needsMeasuring: boolean;
    protected _needsLayoutX: boolean;
    protected _needsDrawing: boolean;
    debugHue: number;
    readonly id: string;
    /**
     * Constructor.
     *
     * If `parent` is provided, `parent.onChildAdded(this)` is called.
     * @param parent parent box
     * @param id id of this box
     */
    constructor(parent: Box | undefined, id: string);
    /**
     * Returns _true_ if `box` is a child
     * @param box
     * @returns
     */
    hasChild(box: Box): boolean;
    /**
     * Sends a message to all child boxes.
     *
     * This first calls `onNotify` on this instance,
     * before calling `notify()` on each child.
     * @param message
     * @param source
     */
    notify(message: string, source: Box): void;
    getChildren(): Generator<never, ArrayIterator<[number, Box]>, unknown>;
    /**
     * Handles a received message
     * @param _message
     * @param _source
     */
    protected onNotify(_message: string, _source: Box): void;
    /**
     * Notification a child box has been added
     *
     * Throws if
     * - child has parent as its own child
     * - child is same as this
     * - child is already child of this
     * @param child
     */
    protected onChildAdded(child: Box): void;
    /**
     * Sets `_ready` to `ready`. If `includeChildren` is _true_,
     * `setReady` is called on each child
     * @param ready
     * @param includeChildren
     */
    setReady(ready: boolean, includeChildren?: boolean): void;
    /**
     * Gets visible state
     */
    get visible(): boolean;
    /**
     * Sets visible state
     */
    set visible(v: boolean);
    /**
     * Gets the box's desired region, or _undefined_
     */
    get desiredRegion(): BoxRect | undefined;
    /**
     * Sets the box's desired region.
     * Calls `onLayoutNeeded()`
     */
    set desiredRegion(v: BoxRect | undefined);
    /**
     * Calls `notifyChildLayoutNeeded`
     */
    layoutInvalidated(reason: string): void;
    drawingInvalidated(_reason: string): void;
    /**
     * Called from a child, notifying us that
     * its layout has changed
     * @returns
     */
    private notifyChildLayoutNeeded;
    /**
     * Returns the root box
     */
    get root(): Box;
    /**
     * Prepare for measuring
     */
    protected measurePreflight(): void;
    /**
     * Applies actual size, returning _true_ if size is different than before
     *
     * 1. Sets `_needsLayout` to _false_.
     * 2. Sets `visual` to `m`
     * 3. Calls `measureApply` on each child
     * 4. If there's a change or `force`, sets `needsDrawing` to _true_, and notifies root of `measureApplied`
     * @param m Measurement for box
     * @returns
     */
    protected measureApply(m: Measurement): boolean;
    protected layoutApply(l: Layout): boolean;
    /**
     * Debug log from this box context
     * @param m
     */
    debugLog(m: any): void;
    layoutStart(measureState: MeasureState, layoutState: LayoutState, force: boolean, parent?: Layout): Layout | undefined;
    protected layoutSelf(measureState: MeasureState, layoutState: LayoutState, _parent?: Layout): Point | undefined;
    /**
     * Start of measuring
     * 1. Keeps track of measurements in `opts.measurements`
     * 2. If this box takes space
     * 2.1. Measure itself if needed
     * 2.2. Use size
     * 2. Calls `measureStart` on each child
     * @param opts Options
     * @param force Force measurement
     * @param parent Parent's measurement
     * @returns Measurement
     */
    measureStart(opts: MeasureState, force: boolean, parent?: Measurement): Measurement | undefined;
    /**
     * Measure the box
     * 1. Uses desired rectangle, if possible
     * 2. Otherwise uses parent's size
     * @param opts Measure state
     * @param parent Parent size
     * @returns
     */
    protected measureSelf(opts: MeasureState, parent?: Measurement): Rect | string;
    /**
     * Gets initial state for a run of measurements & layout.
     *
     * Called when update() is called
     * @param context
     */
    protected abstract updateBegin(context: any): [MeasureState, LayoutState];
    protected abstract updateComplete(measureChanged: boolean, layoutChanged: boolean): void;
    /**
     * Update has completed
     * @param state
     * @param force
     */
    /**
     * Update
     * 1. Calls `this.updateBegin()` to initialise measurement state
     * 2. In a loop, run `measureStart()` and then `measureApply` if possible
     * 3. Call `updateDone` when finished
     * @param force Force update
     * @returns
     */
    update(context: object, force?: boolean): void;
}
/**
 * Canvas measure state
 */
declare class CanvasMeasureState extends MeasureState {
    readonly ctx: CanvasRenderingContext2D;
    constructor(bounds: RectPositioned, ctx: CanvasRenderingContext2D);
}
declare class CanvasLayoutState extends LayoutState {
    readonly ctx: CanvasRenderingContext2D;
    constructor(bounds: RectPositioned, ctx: CanvasRenderingContext2D);
}
/**
 * A Box that exists on a HTMLCanvasElement
 */
declare class CanvasBox extends Box {
    bounds: RectPositioned | undefined;
    constructor(parent: CanvasBox | undefined, id: string, bounds?: RectPositioned);
    static fromCanvas(canvasElement: HTMLCanvasElement): CanvasBox;
    /**
     * Called if this is the parent Box
     */
    addEventHandlers(element: HTMLElement): void;
    protected onClick(_p: Point): void;
    /**
     * Click event has happened on canvas
     * 1. If it's within our range, call `onClick` and pass to all children via `notifyClick`
     * @param p
     * @returns
     */
    private notifyClick;
    /**
     * Pointer has left
     * 1. Pass notification to all children via `notifyPointerLeave`
     */
    private notifyPointerLeave;
    /**
     * Pointer has moved
     * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
     * @param p
     * @returns
     */
    private notifyPointerMove;
    /**
     * Handler when pointer has left
     */
    protected onPointerLeave(): void;
    /**
     * Handler when pointer moves within our region
     * @param _p
     */
    protected onPointerMove(_p: Point): void;
    /**
     * Performs recalculations and drawing as necessary
     * If nothing needs to happen, function returns.
     * @param context
     * @param force Force update
     */
    update(context: CanvasRenderingContext2D, force?: boolean): void;
    getBounds(): RectPositioned | undefined;
    unsetBounds(): void;
    /**
     * Update begins.
     * @returns MeasureState
     */
    protected updateBegin(context: CanvasRenderingContext2D): [MeasureState, LayoutState];
    protected updateComplete(_measureChanged: boolean, _layoutChanged: boolean): void;
    protected measureApply(m: Measurement): boolean;
    protected layoutApply(l: Layout): boolean;
    draw(ctx: CanvasRenderingContext2D, force?: boolean): void;
    /**
     * Draw this object
     * @param _ctx
     */
    protected drawSelf(_ctx: CanvasRenderingContext2D): void;
}

type SceneGraph_Box = Box;
declare const SceneGraph_Box: typeof Box;
type SceneGraph_BoxRect = BoxRect;
type SceneGraph_BoxUnit = BoxUnit;
type SceneGraph_CanvasBox = CanvasBox;
declare const SceneGraph_CanvasBox: typeof CanvasBox;
type SceneGraph_CanvasLayoutState = CanvasLayoutState;
declare const SceneGraph_CanvasLayoutState: typeof CanvasLayoutState;
type SceneGraph_CanvasMeasureState = CanvasMeasureState;
declare const SceneGraph_CanvasMeasureState: typeof CanvasMeasureState;
type SceneGraph_Layout = Layout;
type SceneGraph_LayoutState = LayoutState;
declare const SceneGraph_LayoutState: typeof LayoutState;
type SceneGraph_MeasureState = MeasureState;
declare const SceneGraph_MeasureState: typeof MeasureState;
type SceneGraph_Measurement = Measurement;
type SceneGraph_PcUnit = PcUnit;
type SceneGraph_PxUnit = PxUnit;
declare const SceneGraph_boxRectFromPx: typeof boxRectFromPx;
declare const SceneGraph_boxRectFromRectPx: typeof boxRectFromRectPx;
declare const SceneGraph_boxUnitFromPx: typeof boxUnitFromPx;
declare namespace SceneGraph {
  export { SceneGraph_Box as Box, type SceneGraph_BoxRect as BoxRect, type SceneGraph_BoxUnit as BoxUnit, SceneGraph_CanvasBox as CanvasBox, SceneGraph_CanvasLayoutState as CanvasLayoutState, SceneGraph_CanvasMeasureState as CanvasMeasureState, type SceneGraph_Layout as Layout, SceneGraph_LayoutState as LayoutState, SceneGraph_MeasureState as MeasureState, type SceneGraph_Measurement as Measurement, type SceneGraph_PcUnit as PcUnit, type SceneGraph_PxUnit as PxUnit, SceneGraph_boxRectFromPx as boxRectFromPx, SceneGraph_boxRectFromRectPx as boxRectFromRectPx, SceneGraph_boxUnitFromPx as boxUnitFromPx };
}

type index_CanvasRegion = CanvasRegion;
declare const index_CanvasRegion: typeof CanvasRegion;
type index_CanvasSource = CanvasSource;
declare const index_CanvasSource: typeof CanvasSource;
type index_CartesianCanvasPlot = CartesianCanvasPlot;
declare const index_CartesianCanvasPlot: typeof CartesianCanvasPlot;
declare const index_Colour: typeof Colour;
declare const index_Drawing: typeof Drawing;
declare const index_ImageDataGrid: typeof ImageDataGrid;
type index_InsertOptions = InsertOptions;
type index_InsertOptionsParent = InsertOptionsParent;
type index_InsertOptionsViewport = InsertOptionsViewport;
declare const index_SceneGraph: typeof SceneGraph;
declare const index_Svg: typeof Svg;
declare const index_Video: typeof Video;
declare const index_insert: typeof insert;
declare namespace index {
  export { BipolarView$1 as BipolarView, index_CanvasRegion as CanvasRegion, index_CanvasSource as CanvasSource, index_CartesianCanvasPlot as CartesianCanvasPlot, index_Colour as Colour, index_Drawing as Drawing, index_ImageDataGrid as ImageDataGrid, type index_InsertOptions as InsertOptions, type index_InsertOptionsParent as InsertOptionsParent, type index_InsertOptionsViewport as InsertOptionsViewport, Palette$1 as Palette, index$1 as Plot, index_SceneGraph as SceneGraph, index_Svg as Svg, index_Video as Video, index_insert as insert };
}

export { BipolarView$1 as B, CanvasSource as C, ImageDataGrid as I, Palette$1 as P, SceneGraph as S, index$1 as a, CanvasRegion as b, type InsertOptions as c, type InsertOptionsViewport as d, type InsertOptionsParent as e, insert as f, CartesianCanvasPlot as g, index as i };
