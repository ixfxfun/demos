import { R as Rgb8Bit, a as Rgb } from './Types-H_4FI2AJ.js';
import { R as Rect, a as RectPositioned } from './RectTypes-CjvCxMc4.js';
import { G as Grid, a as GridCellAccessor, b as GridCellSetter } from './Types-Dczm1x8S.js';
import { S as ScaleBy, a as Scaler } from './Scaler-BqD8fmOQ.js';
import { S as SimpleEventEmitter } from './Events-DJgOvcWD.js';

/**
 * * width: use width of parent, set height based on original aspect ratio of element. Assumes parent has a determined width.
 * * height: use height of parent, set width based on original aspect ratio of element. Assumes parent has a determined height.
 * * both: use height & width of parent, so the element adopts the ratio of the parent. Be sure that parent has a width and height set.
 * * min: use the smallest dimension of parent
 * * max: use the largest dimension of parent
 */
type ElementResizeLogic = `width` | `height` | `both` | `none` | `min` | `max`;
/**
 * Options
 */
type ElementSizerOptions<T extends HTMLElement | SVGElement> = {
    /**
     * @defaultValue 'none'
     */
    stretch?: ElementResizeLogic;
    naturalSize?: Rect;
    /**
     * If not specified, the element's parent is used
     */
    containerEl?: HTMLElement | string;
    onSetSize: (size: Rect, el: T) => void;
};
/**
 * Consider using static methods:
 *
 * ```js
 * // Resize an <SVG> element to match viewport
 * Dom.ElementSizer.svgViewport(svg);
 *
 * // Resize canvas to match its parent
 * Dom.ElementSizer.canvasParent(canvas);
 *
 * // Resize canvas to match viewport
 * Dom.ElementSizer.canvasViewport(canvas);
 * ```
 */
declare class ElementSizer<T extends HTMLElement | SVGElement> {
    #private;
    constructor(elOrQuery: T | string, options: ElementSizerOptions<T>);
    dispose(reason?: string): void;
    static canvasParent(canvasElementOrQuery: HTMLCanvasElement | string, options: ElementSizerOptions<HTMLCanvasElement>): ElementSizer<HTMLCanvasElement>;
    static canvasViewport(canvasElementOrQuery: HTMLCanvasElement | string, options: {
        zIndex?: number;
    } & ElementSizerOptions<HTMLCanvasElement>): ElementSizer<HTMLCanvasElement>;
    /**
     * Size an SVG element to match viewport
     * @param svg
     * @returns
     */
    static svgViewport(svg: SVGElement, onSizeSet?: (size: Rect) => void): ElementSizer<SVGElement>;
    /**
     * Sets the 'natural' size of an element.
     * This can also be specified when creating ElementSizer.
     * @param size
     */
    setNaturalSize(size: Rect): void;
    get naturalSize(): Rect;
    get viewport(): RectPositioned;
    set size(size: Rect);
    get size(): Rect;
}

type CanvasEvents = {
    /**
     * Fired when canvas is resized
     */
    resize: {
        size: Rect;
        helper: CanvasHelper;
        ctx: CanvasRenderingContext2D;
    };
    /**
     * Pointerdown.
     *
     * Adds logicalX/Y to get logical pixel coordinate
     */
    pointerdown: PointerEvent & {
        physicalX: number;
        physicalY: number;
    };
    /**
   * Pointerup.
   *
   * Adds logicalX/Y to get logical pixel coordinate
   */
    pointerup: PointerEvent & {
        physicalX: number;
        physicalY: number;
    };
    /**
   * Pointermove
   *
   * Adds logicalX/Y to get logical pixel coordinate
   */
    pointermove: PointerEvent & {
        physicalX: number;
        physicalY: number;
    };
};
/**
 * CanvasHelper options
 */
type CanvasHelperOptions = Readonly<{
    /**
     * Automatic canvas resizing logic.
     */
    resizeLogic?: ElementResizeLogic;
    /**
     * By default, the helper emits pointer events from the canvas.
     * Set this to _true_ to disable.
     */
    disablePointerEvents: boolean;
    /**
     * By default the display DPI is used for scaling.
     * If this is set, this will override.
     */
    pixelZoom: number;
    /**
     * If _true_ (default) canvas is cleared when a resize happens
     */
    clearOnResize: boolean;
    /**
     * If true, it won't add any position CSS
     */
    skipCss: boolean;
    coordinateScale: ScaleBy;
    /**
     * Callback when canvas is resized
     * @param size
     * @returns
     */
    onResize?: (ctx: CanvasRenderingContext2D, size: Rect, helper: CanvasHelper) => void;
    /**
     * Logical width of canvas.
     * This is used for establishing the desired aspect ratio.
     */
    width: number;
    /**
     * Logical height of canvas.
     * This is used for establishing the desired aspect ratio.
     */
    height: number;
    /**
     * If set, the z-index for this canvas.
     * By default, fullscreen canvas will be given -1
     */
    zIndex: number;
    /**
     * Colour space to use. Defaults to sRGB.
     */
    colourSpace: PredefinedColorSpace;
    /**
     * If specified, this function be called in an animation loop.
     * @param ctx Drawing context
     * @param size Viewport size
     * @param helper CanvasHelper instance
     * @returns
     */
    draw?: (ctx: CanvasRenderingContext2D, size: Rect, helper: CanvasHelper) => void;
}>;
/**
 * A wrapper for the CANVAS element that scales the canvas for high-DPI displays
 * and helps with resizing.
 *
 * ```js
 * const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both` });
 * const { ctx, width, height } = canvas.ctx; // Get drawing context, width & height
 * ```
 *
 * Draw whenever it is resized using the 'resize' event
 * ```js
 * canvas.addEventListener(`resize`, ({ctx, size}) => {
 *  // Use ctx...
 * });
 * ```
 *
 * Or provide a function when initialising:
 * ```js
 * const onResize = (ctx, size) => {
 *  // Do drawing
 * }
 * const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both`, onResize });
 * ```
 *
 * Automatically draw at animation speeds:
 * ```js
 * const draw = () => {
 * }
 * const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both`, draw });
 * ```
 */
declare class CanvasHelper extends SimpleEventEmitter<CanvasEvents> {
    #private;
    readonly el: HTMLCanvasElement;
    readonly opts: CanvasHelperOptions;
    constructor(domQueryOrEl: Readonly<string | HTMLCanvasElement | undefined | null>, opts?: Partial<CanvasHelperOptions>);
    getRectangle(): RectPositioned;
    dispose(reason?: string): void;
    /**
     * Gets the drawable area of the canvas.
     * This accounts for scaling due to high-DPI displays etc.
     * @returns
     */
    getPhysicalSize(): {
        width: number;
        height: number;
    };
    /**
     * Creates a drawing helper for the canvas.
     * If one is already created it is reused.
     */
    getDrawHelper(): void;
    setLogicalSize(logicalSize: Rect): void;
    /**
     * Clears the canvas.
     *
     * Shortcut for:
     * `ctx.clearRect(0, 0, this.width, this.height)`
     */
    clear(): void;
    /**
     * Fills the canvas with a given colour.
     *
     * Shortcut for:
     * ```js
        * ctx.fillStyle = ``;
     * ctx.fillRect(0, 0, this.width, this.height);
     * ```
     * @param colour Colour
     */
    fill(colour?: string): void;
    /**
     * Gets the drawing context
     */
    get ctx(): CanvasRenderingContext2D;
    get viewport(): RectPositioned;
    /**
     * Gets the logical width of the canvas
     * See also: {@link height}, {@link size}
     */
    get width(): number;
    /**
     * Gets the logical height of the canvas
     * See also: {@link width}, {@link size}
     */
    get height(): number;
    /**
     * Gets the logical size of the canvas
     * See also: {@link width}, {@link height}
     */
    get size(): Rect;
    /**
     * Gets the current scaling ratio being used
     * to compensate for high-DPI display
     */
    get ratio(): number;
    /**
     * Returns the width or height, whichever is smallest
     */
    get dimensionMin(): number;
    /**
     * Returns the width or height, whichever is largest
     */
    get dimensionMax(): number;
    drawBounds(strokeStyle?: string): void;
    /**
     * Returns a Scaler that converts from absolute
     * to relative coordinates.
     * This is based on the canvas size.
     *
     * ```js
        * // Assuming a canvas of 800x500
     * toRelative({ x: 800, y: 600 });  // { x: 1,   y: 1 }
     * toRelative({ x: 0, y: 0 });   // { x: 0,   y: 0 }
     * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
     * ```
     */
    get toRelative(): Scaler;
    /**
     * Returns a scaler for points based on width & height
     */
    get toAbsoluteFixed(): Scaler;
    /**
     * Returns a scaler for points based on width & height
     */
    get toRelativeFixed(): Scaler;
    get logicalCenter(): {
        x: number;
        y: number;
    };
    /**
   * Returns a Scaler that converts from relative to absolute
   * coordinates.
   * This is based on the canvas size.
   *
   * ```js
   * // Assuming a canvas of 800x600
   * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
   * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
   * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
   * ```
   */
    get toAbsolute(): Scaler;
    /**
     * Gets the center coordinate of the canvas
     */
    get center(): {
        x: number;
        y: number;
    };
    /**
     * Gets the image data for the canvas.
     * Uses the 'physical' canvas size. Eg. A logical size of 400x400 might be
     * 536x536 with a high-DPI display.
     * @returns
     */
    getImageData(): ImageData;
    /**
     * Returns the canvas frame data as a writable grid.
     * When editing, make as many edits as needed before calling
     * `flip`, which writes buffer back to the canvas.
     * ```js
        * const g = helper.getWritableBuffer();
     * // Get {r,g,b,opacity} of pixel 10,10
     * const pixel = g.get({ x: 10, y: 10 });
     *
     * // Set a colour to pixel 10,10
     * g.set({ r: 0.5, g: 1, b: 0, opacity: 0 }, { x: 10, y: 10 });
     *
     * // Write buffer to canvas
     * g.flip();
     * ```
     *
     * Uses 'physical' size of canvas. Eg with a high-DPI screen, this will
     * mean a higher number of rows and columns compared to the logical size.
     * @returns
     */
    getWritableBuffer(): {
        grid: Grid;
        get: GridCellAccessor<Rgb8Bit>;
        set: GridCellSetter<Rgb>;
        flip: () => void;
    };
}

export { CanvasHelper as C, type ElementResizeLogic as E, type CanvasEvents as a, type CanvasHelperOptions as b, ElementSizer as c, type ElementSizerOptions as d };
