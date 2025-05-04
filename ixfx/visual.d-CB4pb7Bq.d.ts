import { __export } from "./chunk-Cl8Af3a2.js";
import { SimpleEventEmitter$3 as SimpleEventEmitter } from "./simple-event-emitter.d-oDdRM2kA.js";
import { Point, Rect, RectPositioned } from "./rect-types.d-LhfXfEN-.js";
import { RandomSource$1 as RandomSource } from "./types.d-Bc_9AnZ6.js";

//#region ../packages/geometry/src/grid/types.d.ts
type Grid = {
  readonly rows: number;
  readonly cols: number;
};
type GridCell = {
  readonly x: number;
  readonly y: number;
}; /**
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
`wrap`; /**
        * A function that returns a value (or _undefined_) based on a _cell_
        *
        * Implementations:
        * * {@link Array1d.access}: For accessing a single-dimension array as a grid
        * * {@link Array2d.access}: For accessing a two-dimension array as a grid
        *
        */

type GridCellAccessor<TValue> = (cell: GridCell, wrap?: GridBoundsLogic) => TValue | undefined; /**
                                                                                                * A function that sets the value of a cell.
                                                                                                */

type GridCellSetter<TValue> = (value: TValue, cell: GridCell, wrap?: GridBoundsLogic) => void; /**
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
//#region ../packages/geometry/src/scaler.d.ts
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
type ScaleBy = `both` | `min` | `max` | `width` | `height`;

//#endregion
//#region ../node_modules/.pnpm/colorizr@3.0.7/node_modules/colorizr/dist/index.d.ts
type Alpha = number;
interface HSL {
  h: number;
  s: number;
  l: number;
  alpha?: Alpha;
}
interface RGB {
  r: number;
  g: number;
  b: number;
  alpha?: Alpha;
}

//#endregion
//#region ../packages/dom/src/element-sizing.d.ts
/**
* * width: use width of parent, set height based on original aspect ratio of element. Assumes parent has a determined width.
* * height: use height of parent, set width based on original aspect ratio of element. Assumes parent has a determined height.
* * both: use height & width of parent, so the element adopts the ratio of the parent. Be sure that parent has a width and height set.
* * min: use the smallest dimension of parent
* * max: use the largest dimension of parent
*/
type ElementResizeLogic = `width` | `height` | `both` | `none` | `min` | `max`;

//#endregion
//#region ../packages/visual/dist/src/colour/types.d.ts
type HslBase = {
  /**
   * Hue
   */
  h: number;
  /**
   * Saturation
   */
  s: number;
  /**
   * Lightness
   */
  l: number;
  /**
   * Opacity
   */
  opacity?: number;
  space?: `hsl`;
};
declare const isHsl: (v: any) => v is Hsl;

/**
* Scalar values use 0..1 for each field
*/
type HslScalar = HslBase & {
  unit: `scalar`;
};

/**
* Absolute values use hue:0..360, all other fields 0..100
*/
type HslAbsolute = HslBase & {
  unit: `absolute`;
};

/**
* HSL value.
* By default assumes scalar coordinates (0..1) for each field.
* Use 'absolute' unit for hue:0...360, all other fields on 0..100 scale.
*/
type Hsl = HslScalar | HslAbsolute;

/**
* Rgb.
* Units determine how to interperet rgb values.
* * 'relative': 0..1 range for RGB & opacity
* * '8bit': 0..255 range for RGB & opacity
*/
type RgbBase = {
  r: number;
  g: number;
  b: number;
  opacity?: number;
  space?: `srgb`;
};
type RgbScalar = RgbBase & {
  unit: `scalar`;
};
declare const isRgb: (v: any) => v is Rgb;

/**
* RGB in 0...255 range, including opacity.
*/
type Rgb8Bit = RgbBase & {
  unit: `8bit`;
};
type Rgb = RgbScalar | Rgb8Bit;
type LchBase = {
  /**
   * Lightness/perceived brightnes
   */
  l: number;
  /**
   * Chroma ('amount of colour')
   */
  c: number;
  /**
   * Hue
   */
  h: number;
  /**
   * Opacity on 0..1 scale
   */
  opacity?: number;
  space: `lch` | `oklch`;
};
declare const isLch: (v: any) => v is OkLch;
type OkLchBase = LchBase & {
  space: `oklch`;
};

/**
* Oklch colour expressed in 0..1 scalar values for LCH & opacity
*/
type OkLchScalar = OkLchBase & {
  unit: `scalar`;
};

/**
* Oklch colour expressed with:
* l: 0..100
* c: 0..100
* h: 0..360 degrees
* opacity: 0..1
*/
type OkLchAbsolute = OkLchBase & {
  unit: `absolute`;
};
type OkLch = OkLchAbsolute | OkLchScalar;
type Colour = {
  opacity?: number;
} & (Hsl | OkLch | Rgb);

/**
* A representation of colour. Eg: `blue`, `rgb(255,0,0)`, `hsl(20,100%,50%)`
*/
type Colourish = Colour | string;
declare const isColourish: (v: any) => v is Colourish;

/**
* Options for interpolation
*/
type ParsingOptions<T> = Partial<{
  ensureSafe: boolean;
  /**
   * Value to use if input is invalid
   */
  fallbackString: string;
  /**
   * Fallback colour to use if value cannot be parsed
   */
  fallbackColour: T;
}>;

//#endregion
//#region ../packages/visual/dist/src/canvas-helper.d.ts
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
} //#endregion
//#region ../packages/visual/dist/src/pointer-visualise.d.ts
type Opts = {
  readonly touchRadius?: number;
  readonly mouseRadius?: number;
  readonly trace?: boolean;
  readonly hue?: number;
};

/**
* Visualises pointer events within a given element.
*
* ```js
* // Show pointer events for whole document
* pointerVis(document);
* ```
*
* Note you may need to set the following CSS properties on the target element:
*
* ```css
* touch-action: none;
* user-select: none;
* overscroll-behavior: none;
* ```
*
* Options
* * touchRadius/mouseRadius: size of circle for these kinds of pointer events
* * trace: if true, intermediate events are captured and displayed
* @param elOrQuery Element to monitor
* @param options Options
*/
declare const pointerVisualise: (elOrQuery: HTMLElement | string, options?: Opts) => void;

//#endregion
//#region ../packages/visual/dist/src/colour/generate.d.ts
/**
* Returns a full HSL colour string (eg `hsl(20,50%,75%)`) based on a index.
* It's useful for generating perceptually different shades as the index increments.
*
* ```
* el.style.backgroundColor = goldenAgeColour(10);
* ```
*
* Saturation and lightness can be specified, as numeric ranges of 0-1.
*
* @param saturation Saturation (0-1), defaults to 0.5
* @param lightness Lightness (0-1), defaults to 0.75
* @param alpha Opacity (0-1), defaults to 1.0
* @returns HSL colour string eg `hsl(20,50%,75%)`
*/
declare const goldenAngleColour: (index: number, saturation?: number, lightness?: number, alpha?: number) => string;

/**
* Returns a random hue component (0..359)
* ```
* // Generate hue
* const h =randomHue(); // 0-359
*
* // Generate hue and assign as part of a HSL string
* el.style.backgroundColor = `hsl(${randomHue(), 50%, 75%})`;
* ```
* @param rand
* @returns
*/
declare const randomHue: (rand?: RandomSource) => number;

//#endregion
//#region ../packages/visual/dist/src/colour/conversion.d.ts
declare const toCssColour: (colour: any) => string;
declare const fromCssColour: (colour: string) => Colour;
declare const guard: (colour: Colour) => void;
declare const toColour: (colourish: any) => Colour;

/**
* Returns a CSS-ready string
* representation.
* ```js
* element.style.backgroundColor = resolveToString(`red`);
* ```
*
* Tries each parameter in turn, returning the value
* for the first that resolves. This can be useful for
* having fallback values.
*
* ```js
* // Try a CSS variable, a object property or finally fallback to red.
* element.style.backgroundColor = toStringFirst('--some-var', opts.background, `red`);
* ```
* @param colours Array of colours to resolve
* @returns
*/
declare const toStringFirst: (...colours: (Colourish | undefined)[]) => string;

//#endregion
//#region ../packages/visual/dist/src/colour/hsl.d.ts
declare const HslSpace: {
  withOpacity: <T extends Hsl>(value: T, fn: (opacityScalar: number, value: T) => number) => T;
  fromCssAbsolute: (value: string, options?: ParsingOptions<HslAbsolute>) => HslAbsolute;
  fromCssScalar: (value: string, options?: ParsingOptions<HslAbsolute>) => HslScalar;
  toCss: (hsl: Hsl) => string;
  toLibrary: (hsl: Hsl) => HSL;
  fromLibrary: (hsl: HSL, parsingOptions?: ParsingOptions<HslAbsolute>) => HslAbsolute;
  guard: (hsl: Hsl) => void;
  toScalar: (hsl: Hsl) => HslScalar;
  toAbsolute: (hsl: Hsl) => HslAbsolute;
};

//#endregion
//#region ../packages/visual/dist/src/colour/math.d.ts
declare function multiplyOpacity(colourish: string, amount: number): string;
declare function withOpacity(colourish: string, fn: (scalarOpacity: number) => number): string;
declare function withOpacity(colourish: Hsl, fn: (scalarOpacity: number) => number): Hsl;
declare function withOpacity(colourish: Rgb, fn: (scalarOpacity: number) => number): Rgb;

//#endregion
//#region ../packages/visual/dist/src/colour/srgb.d.ts
declare const SrgbSpace: {
  withOpacity: <T extends Rgb>(value: T, fn: (opacityScalar: number, value: T) => number) => T;
  toCss: (rgb: Rgb) => string;
  fromCss: (value: string) => Rgb8Bit;
  toLibrary: (rgb: Rgb) => RGB;
  fromLibrary: (rgb: RGB) => Rgb8Bit;
  guard: (rgb: Rgb) => void;
  toScalar: (rgb: Rgb) => RgbScalar;
  to8bit: (rgb: Rgb) => Rgb8Bit;
};

//#endregion
//#region ../packages/visual/dist/src/colour/index.d.ts
declare namespace index_d_exports {
  export { Colour, Colourish, Hsl, HslAbsolute, HslBase, HslScalar, HslSpace, LchBase, OkLch, OkLchAbsolute, OkLchBase, OkLchScalar, ParsingOptions, Rgb, Rgb8Bit, RgbBase, RgbScalar, SrgbSpace as RgbSpace, fromCssColour, goldenAngleColour, guard, isColourish, isHsl, isLch, isRgb, multiplyOpacity, randomHue, toColour, toCssColour, toStringFirst, withOpacity };
}
declare namespace image_data_grid_d_exports {
  export { accessor, byColumn, byRow, grid, setter, wrap };
}
/**
* Returns a {@link Grids.Grid} based on the provided `image`
* @param image ImageData
* @returns Grid
*/
declare const grid: (image: ImageData) => Grid;

/**
* Returns an object that allows get/set grid semantics on the underlying `image` data.
* Uses 8-bit sRGB values, meaning 0..255 range for red, green, blue & opacity.
*
* ```js
* // Get CANVAS element, drawing context and then image data
* const canvasEl = document.querySelector(`#my-canvas`);
* const ctx = canvasEl.getContext(`2d`);
* const imageData = ctx.getImageData();
*
* // Now that we have image data, we can wrap it:
* const asGrid = ImageDataGrid.wrap(imageData);
* asGrid.get({ x:10, y: 20 }); // Get pixel at 10,20
* asGrid.set(colour, { x:10, y: 20 }); // Set pixel value
*
* // Display changes back on the canvas
* ctx.putImageData(imageData, 0, 0)
* ```
* @param image
* @returns
*/
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

//#endregion
//#region ../packages/visual/dist/src/video.d.ts
declare namespace video_d_exports {
  export { CaptureOpts, Capturer, FramesOpts, ManualCaptureOpts, ManualCapturer, capture, frames, manualCapture };
}
type Capturer = {
  start(): void;
  cancel(): void;
  readonly canvasEl: HTMLCanvasElement;
};
type ManualCapturer = {
  capture(): ImageData;
  readonly canvasEl: HTMLCanvasElement;
  dispose(): void;
};
type CaptureOpts = {
  /**
   * Delay between reading frames.
   * Default: 0, reading as fast as possible
   */
  readonly maxIntervalMs?: number;
  /**
   * Whether to show the created capture canvas.
   * Default: false
   */
  readonly showCanvas?: boolean;
  readonly workerScript?: string;
  readonly onFrame?: (pixels: ImageData) => void;
};
type ManualCaptureOpts = {
  /**
   * If true, the intermediate canvas is shown
   * The intermediate canvas is where captures from the source are put in order
   * to get the ImageData
   */
  readonly showCanvas?: boolean;
  /**
   * If specified, this function will be called after ImageData is captured
   * from the intermediate canvs. This allows for drawing on top of the
   * captured image.
   */
  readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
  /**
   * If specified, this is the canvas captured to
   */
  readonly canvasEl?: HTMLCanvasElement;
};

/**
* Options for frames generator
*/
type FramesOpts = {
  /**
   * Max frame rate (millis per frame), or 0 for animation speed
   */
  readonly maxIntervalMs?: number;
  /**
   * False by default, created canvas will be hidden
   */
  readonly showCanvas?: boolean;
  /**
   * If provided, this canvas will be used as the buffer rather than creating one.
   */
  readonly canvasEl?: HTMLCanvasElement;
};

/**
* Generator that yields frames from a video element as [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
*
* ```js
* import { Video } from 'https://unpkg.com/ixfx/dist/visual.js'
*
* const ctx = canvasEl.getContext(`2d`);
* for await (const frame of Video.frames(videoEl)) {
*   // TODO: Some processing of pixels
*
*   // Draw image on to the visible canvas
*   ctx.putImageData(frame, 0, 0);
* }
* ```
*
* Under the hood it creates a hidden canvas where frames are drawn to. This is necessary
* to read back pixel data. An existing canvas can be used if it is passed in as an option.
*
* Options:
* * `canvasEl`: CANVAS element to use as a buffer (optional)
* * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
* * `showCanvas`: Whether buffer canvas will be shown (false by default)
* @param sourceVideoEl
* @param opts
*/
declare function frames(sourceVideoEl: HTMLVideoElement, opts?: FramesOpts): AsyncIterable<ImageData>;

/**
* Captures frames from a video element. It can send pixel data to a function or post to a worker script.
*
* @example Using a function
* ```js
* import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
*
* // Capture from a VIDEO element, handling frame data
* // imageData is ImageData type: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
* Video.capture(sourceVideoEl, {
*  onFrame(imageData => {
*    // Do something with pixels...
*  });
* });
* ```
*
* @example Using a worker
* ```js
* import {Video} from 'https://unpkg.com/ixfx/dist/visual.js'
*
* Video.capture(sourceVideoEl, {
*  workerScript: `./frameProcessor.js`
* });
* ```
*
* In frameProcessor.js:
* ```
* const process = (frame) => {
*  // ...process frame
*
*  // Send image back?
*  self.postMessage({frame});
* };
*
* self.addEventListener(`message`, evt => {
*   const {pixels, width, height} = evt.data;
*   const frame = new ImageData(new Uint8ClampedArray(pixels),
*     width, height);
*
*   // Process it
*   process(frame);
* });
* ```
*
* Options:
* * `canvasEl`: CANVAS element to use as a buffer (optional)
* * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
* * `showCanvas`: Whether buffer canvas will be shown (false by default)
* * `workerScript`: If this specified, this URL will be loaded as a Worker, and frame data will be automatically posted to it
*
* Implementation: frames are captured using a animation-speed loop to a hidden canvas. From there
* the pixel data is extracted and sent to either destination. In future the intermediate drawing to a
* canvas could be skipped if it becomes possible to get pixel data from an ImageBitmap.
* @param sourceVideoEl Source VIDEO element
* @param opts
* @returns
*/
declare const capture: (sourceVideoEl: HTMLVideoElement, opts?: CaptureOpts) => Capturer;
declare const manualCapture: (sourceVideoEl: HTMLVideoElement, opts?: ManualCaptureOpts) => ManualCapturer;

//#endregion
//#region src/visual.d.ts
declare namespace visual_d_exports {
  export { CanvasEvents, CanvasHelper, CanvasHelperOptions, index_d_exports as Colour, image_data_grid_d_exports as ImageDataGrid, Opts, video_d_exports as Video, pointerVisualise };
}
//#endregion
export { CanvasEvents, CanvasHelper as CanvasHelper$1, CanvasHelperOptions, Opts, image_data_grid_d_exports, index_d_exports, pointerVisualise as pointerVisualise$1, video_d_exports, visual_d_exports };
//# sourceMappingURL=visual.d-CB4pb7Bq.d.ts.map