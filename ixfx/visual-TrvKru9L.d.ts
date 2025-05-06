import { __export } from "./chunk-51aI8Tpl.js";
import { SimpleEventEmitter$3 as SimpleEventEmitter } from "./simple-event-emitter-DCUgt8T8.js";
import { Point } from "./point-type-aLgOjGpR.js";
import { Rect, RectPositioned } from "./rect-types-Bp6n9fMD.js";
import { Grid, GridCellAccessor, GridCellSetter, GridReadable, GridWritable } from "./types-CPSECnFt.js";
import { RandomSource$1 as RandomSource } from "./types-BiW1XnrM.js";
import { Path } from "./path-type-2sSqIxFK.js";

//#region ../packages/collections/src/stack/IStack.d.ts
/**
* Stack (immutable)
*
* @example Overview
* ```js
* stack.push(item); // Return a new stack with item(s) added
* stack.pop();      // Return a new stack with top-most item removed (ie. newest)
* stack.peek;       // Return what is at the top of the stack or undefined if empty
* stack.isEmpty;
* stack.isFull;
* stack.length;     // How many items in stack
* stack.data;       // Get the underlying array
* ```
*
* @example
* ```js
* let sanga = new Stack();
* sanga = sanga.push(`bread`, `tomato`, `cheese`);
* sanga.peek;  // `cheese`
* sanga = sanga.pop(); // removes `cheese`
* sanga.peek;  // `tomato`
* const sangaAlt = sanga.push(`lettuce`, `cheese`); // sanga stays [`bread`, `tomato`], while sangaAlt is [`bread`, `tomato`, `lettuce`, `cheese`]
* ```
*
* Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
* @class Stack
* @typeParam V - Type of stored items
*/
/**
 * Stack (immutable)
 *
 * @example Overview
 * ```js
 * stack.push(item); // Return a new stack with item(s) added
 * stack.pop();      // Return a new stack with top-most item removed (ie. newest)
 * stack.peek;       // Return what is at the top of the stack or undefined if empty
 * stack.isEmpty;
 * stack.isFull;
 * stack.length;     // How many items in stack
 * stack.data;       // Get the underlying array
 * ```
 *
 * @example
 * ```js
 * let sanga = new Stack();
 * sanga = sanga.push(`bread`, `tomato`, `cheese`);
 * sanga.peek;  // `cheese`
 * sanga = sanga.pop(); // removes `cheese`
 * sanga.peek;  // `tomato`
 * const sangaAlt = sanga.push(`lettuce`, `cheese`); // sanga stays [`bread`, `tomato`], while sangaAlt is [`bread`, `tomato`, `lettuce`, `cheese`]
 * ```
 *
 * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
 * @class Stack
 * @typeParam V - Type of stored items
 */
interface IStack<V> {
  /**
   * Enumerates stack from bottom-to-top
   *
   */
  forEach(fn: (v: V) => void): void;
  /**
   * Enumerates stack from top-to-bottom
   * @param fn
   */
  forEachFromTop(fn: (v: V) => void): void;
  get data(): readonly V[];
  /**
   * _True_ if stack is empty
   */
  get isEmpty(): boolean;
  /**
   * _True_ if stack is at its capacity. _False_ if not, or if there is no capacity.
   */
  get isFull(): boolean;
  /**
   * Get the item at the top of the stack without removing it (like `pop` would do)
   * @returns Item at the top of the stack, or _undefined_ if empty.
   */
  get peek(): V | undefined;
  /**
   * Number of items in stack
   */
  get length(): number;
} //#endregion
//#region ../packages/collections/src/stack/IStackImmutable.d.ts

//# sourceMappingURL=IStack.d.ts.map
interface IStackImmutable<V> extends IStack<V> {
  push(...toAdd: ReadonlyArray<V>): IStackImmutable<V>;
  pop(): IStackImmutable<V>;
}

//#endregion
//#region ../packages/geometry/src/line/line-type.d.ts
//# sourceMappingURL=IStackImmutable.d.ts.map
/**
 * A line, which consists of an `a` and `b` {@link Point}.
 */
type Line = {
  readonly a: Point;
  readonly b: Point;
};

//#endregion
//#region ../packages/geometry/src/circle/circle-type.d.ts
/**
 * A PolyLine, consisting of more than one line.
 */
/**
 * A circle
 */
type Circle = {
  readonly radius: number;
};
/**
 * A {@link Circle} with position
 */
type CirclePositioned = Point & Circle;

//#endregion
//#region ../packages/geometry/src/triangle/triangle-type.d.ts
type Triangle = {
  readonly a: Point;
  readonly b: Point;
  readonly c: Point;
};

//#endregion
//#region ../packages/geometry/src/polar/types.d.ts
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

//#endregion
//#region ../packages/geometry/src/bezier/bezier-type.d.ts
type QuadraticBezier = {
  readonly a: Point;
  readonly b: Point;
  readonly quadratic: Point;
};
type CubicBezier = {
  readonly a: Point;
  readonly b: Point;
  readonly cubic1: Point;
  readonly cubic2: Point;
};

//#endregion
//#region ../packages/geometry/src/ellipse.d.ts
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

//#endregion
//#region ../packages/geometry/src/angles.d.ts

type Angle = {
  value: number;
  unit: `deg` | `rad` | `turn` | `grad`;
}; //#endregion
//#region ../packages/geometry/src/scaler.d.ts

/**
 * Parses CSS-style angle strings. By default assumes degrees.
 *
 * ```js
 * angleParse(`100`);     // { value: 100, unit: `deg` }
 * angleParse(100);       // { value: 100, unit: `deg` }
 * angleParse(`100deg`);   // { value: 100, unit: `deg` }
 *
 * // More exotic units:
 * angleParse(`100rad`);  // { value: 100, unit: `rad` }
 * angleParse(`100turn`); // { value: 100, unit: `turn` }
 * angleParse(`100grad`); // { value: 100, unit: `grad` }
 * ```
 *
 * Once parsed in this format, use {@link angleConvert} to convert to
 * a different unit.
 * @param value
 * @returns
 */
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

type ScaleBy = `both` | `min` | `max` | `width` | `height`;

//#endregion
//#region ../packages/geometry/src/arc/arc-type.d.ts
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

//#endregion
//#region ../packages/dom/src/element-sizing.d.ts
//# sourceMappingURL=arc-type.d.ts.map
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
/**
 * Options
 */
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
 * If the input object has r,g&b properties, it will return a fully-
 * formed Rgb type with `unit` and `space` properties.
 *
 * If it lacks these basic three properties or they are out of range,
 *  _undefined_ is returned.
 *
 * If RGB values are less than 1 assumes unit:scalar. Otherwise unit:8bit.
 * If RGB values exceed 255, _undefined_ returned.
 * @param v
 * @returns
 */
declare const tryParseObjectToRgb: (v: any) => Rgb | undefined;
declare const tryParseObjectToHsl: (v: any) => Hsl | undefined;
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
//# sourceMappingURL=types.d.ts.map
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

//#endregion
//#region ../packages/visual/dist/src/pointer-visualise.d.ts
//# sourceMappingURL=canvas-helper.d.ts.map
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
//#region ../packages/visual/dist/src/colour/conversion.d.ts
//# sourceMappingURL=pointer-visualise.d.ts.map
declare const toCssColour: (colour: any) => string;
declare const convert: (colour: string, destination: "hex" | "hsl" | "oklab" | "oklch" | "srgb" | `rgb`) => string;
declare const guard$2: (colour: Colour) => void;
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
//#region ../packages/visual/dist/src/colour/css-colours.d.ts
//# sourceMappingURL=conversion.d.ts.map
/**
 * Converts from some kind of colour that is legal in CSS
 *
 * Handles: hex format, CSS variables, colour names
 * to an object
 * @param colour
 * @returns
 */
declare const fromCssColour: (colour: string) => Colour;
declare const cssDefinedHexColours: {
  aliceblue: string;
  antiquewhite: string;
  aqua: string;
  aquamarine: string;
  azure: string;
  beige: string;
  bisque: string;
  black: string;
  blanchedalmond: string;
  blue: string;
  blueviolet: string;
  brown: string;
  burlywood: string;
  cadetblue: string;
  chartreuse: string;
  chocolate: string;
  coral: string;
  cornflowerblue: string;
  cornsilk: string;
  crimson: string;
  cyan: string;
  darkblue: string;
  darkcyan: string;
  darkgoldenrod: string;
  darkgray: string;
  darkgreen: string;
  darkkhaki: string;
  darkmagenta: string;
  darkolivegreen: string;
  darkorange: string;
  darkorchid: string;
  darkred: string;
  darksalmon: string;
  darkseagreen: string;
  darkslateblue: string;
  darkslategray: string;
  darkturquoise: string;
  darkviolet: string;
  deeppink: string;
  deepskyblue: string;
  dimgray: string;
  dodgerblue: string;
  firebrick: string;
  floralwhite: string;
  forestgreen: string;
  fuchsia: string;
  gainsboro: string;
  ghostwhite: string;
  gold: string;
  goldenrod: string;
  gray: string;
  green: string;
  greenyellow: string;
  honeydew: string;
  hotpink: string;
  indianred: string;
  indigo: string;
  ivory: string;
  khaki: string;
  lavender: string;
  lavenderblush: string;
  lawngreen: string;
  lemonchiffon: string;
  lightblue: string;
  lightcoral: string;
  lightcyan: string;
  lightgoldenrodyellow: string;
  lightgray: string;
  lightgreen: string;
  lightpink: string;
  lightsalmon: string;
  lightseagreen: string;
  lightskyblue: string;
  lightslategray: string;
  lightsteelblue: string;
  lightyellow: string;
  lime: string;
  limegreen: string;
  linen: string;
  magenta: string;
  maroon: string;
  mediumaquamarine: string;
  mediumblue: string;
  mediumorchid: string;
  mediumpurple: string;
  mediumseagreen: string;
  mediumslateblue: string;
  mediumspringgreen: string;
  mediumturquoise: string;
  mediumvioletred: string;
  midnightblue: string;
  mintcream: string;
  mistyrose: string;
  moccasin: string;
  navajowhite: string;
  navy: string;
  oldlace: string;
  olive: string;
  olivedrab: string;
  orange: string;
  orangered: string;
  orchid: string;
  palegoldenrod: string;
  palegreen: string;
  paleturquoise: string;
  palevioletred: string;
  papayawhip: string;
  peachpuff: string;
  peru: string;
  pink: string;
  plum: string;
  powderblue: string;
  purple: string;
  rebeccapurple: string;
  red: string;
  rosybrown: string;
  royalblue: string;
  saddlebrown: string;
  salmon: string;
  sandybrown: string;
  seagreen: string;
  seashell: string;
  sienna: string;
  silver: string;
  skyblue: string;
  slateblue: string;
  slategray: string;
  snow: string;
  springgreen: string;
  steelblue: string;
  tan: string;
  teal: string;
  thistle: string;
  tomato: string;
  turquoise: string;
  violet: string;
  wheat: string;
  white: string;
  whitesmoke: string;
  yellow: string;
  yellowgreen: string;
  transparent: string;
};

//#endregion
//#region ../packages/visual/dist/src/colour/generate.d.ts
//# sourceMappingURL=css-colours.d.ts.map
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
//#region ../packages/visual/dist/src/colour/hsl.d.ts
//# sourceMappingURL=generate.d.ts.map
declare namespace hsl_d_exports {
  export { fromCssAbsolute, fromCssScalar, fromHexString$1 as fromHexString, generateScalar, guard$1 as guard, toAbsolute, toCssString$1 as toCssString, toScalar$1 as toScalar, withOpacity$2 as withOpacity };
}
/**
 * Scales the opacity value of an input HSL value
 * ```js
 * withOpacity()
 * ```
 * @param value
 * @param fn
 * @returns
 */
declare const withOpacity$2: <T extends Hsl>(value: T, fn: (opacityScalar: number, value: T) => number) => T;
declare const fromHexString$1: (hexString: string) => HslAbsolute;
declare const fromCssAbsolute: (value: string, options?: ParsingOptions<HslAbsolute>) => HslAbsolute;
declare const fromCssScalar: (value: string, options?: ParsingOptions<HslAbsolute>) => HslScalar;
declare const toCssString$1: (hsl: Hsl) => string;
declare const toAbsolute: (hsl: Hsl) => HslAbsolute;
/**
 * Generates a {@link HslScalar} value.
 *
 * ```js
 * generateScaler(10); // 10deg, default to full saturation, half lightness and full opacity
 *
 * // Generate HSL value from radian angle and 50% saturation
 * generateScalar(`10rad`, 0.5);
 *
 * // Generate from numeric CSS variable
 * generateScalar(`--hue`);
 * ```
 * @param absoluteHslOrVariable Hue angle or CSS variable
 * @param saturation
 * @param lightness
 * @param opacity
 */
declare const generateScalar: (absoluteHslOrVariable: string | number | Angle, saturation?: number, lightness?: number, opacity?: number) => HslScalar;
declare const toScalar$1: (hsl: Hsl) => HslScalar;
declare const guard$1: (hsl: Hsl) => void;

//#endregion
//#region ../packages/visual/dist/src/colour/math.d.ts
//# sourceMappingURL=hsl.d.ts.map
declare function multiplyOpacity(colourish: string, amount: number): string;
declare function withOpacity$1(colourish: string, fn: (scalarOpacity: number) => number): string;
declare function withOpacity$1(colourish: Hsl, fn: (scalarOpacity: number) => number): Hsl;
declare function withOpacity$1(colourish: Rgb, fn: (scalarOpacity: number) => number): Rgb;

//#endregion
//#region ../packages/visual/dist/src/colour/srgb.d.ts
//# sourceMappingURL=math.d.ts.map
declare namespace srgb_d_exports {
  export { fromCss8bit, fromHexString, guard, to8bit, toCssString, toScalar, withOpacity };
}
declare const withOpacity: <T extends Rgb>(value: T, fn: (opacityScalar: number, value: T) => number) => T;
declare const fromHexString: (hexString: string) => Rgb8Bit;
declare const fromCss8bit: (value: string, options?: ParsingOptions<Rgb8Bit>) => Rgb8Bit;
declare const toCssString: (rgb: Rgb) => string;
declare const to8bit: (rgb: Rgb) => Rgb8Bit;
declare const toScalar: (rgb: Rgb) => RgbScalar;
declare const guard: (rgb: Rgb) => void;

//#endregion
//#region ../packages/visual/dist/src/colour/index.d.ts
//# sourceMappingURL=srgb.d.ts.map
declare namespace index_d_exports$1 {
  export { Colour, Colourish, Hsl, HslAbsolute, HslBase, HslScalar, hsl_d_exports as HslSpace, LchBase, OkLch, OkLchAbsolute, OkLchBase, OkLchScalar, ParsingOptions, Rgb, Rgb8Bit, RgbBase, RgbScalar, srgb_d_exports as SrgbSpace, convert, cssDefinedHexColours, fromCssColour, goldenAngleColour, guard$2 as guard, isColourish, isHsl, isLch, isRgb, multiplyOpacity, randomHue, toColour, toCssColour, toStringFirst, tryParseObjectToHsl, tryParseObjectToRgb, withOpacity$1 as withOpacity };
}
declare namespace image_data_grid_d_exports {
  export { accessor, byColumn, byRow, grid$1 as grid, setter, wrap };
}
/**
 * Returns a {@link Grids.Grid} based on the provided `image`
 * @param image ImageData
 * @returns Grid
 */
declare const grid$1: (image: ImageData) => Grid;
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
//# sourceMappingURL=image-data-grid.d.ts.map
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
//#region ../packages/visual/dist/src/drawing.d.ts
//# sourceMappingURL=video.d.ts.map
declare namespace drawing_d_exports {
  export { CanvasContextQuery, ConnectedPointsOptions, DotOpts, DrawingHelper, DrawingOpts$1 as DrawingOpts, DrawingStack, HorizAlign, LineOpts, RectOpts, StackOp, VertAlign, arc, bezier, circle$1 as circle, connectedPoints, copyToImg, dot, drawingStack, ellipse, getContext, line$1 as line, lineThroughPoints, makeHelper$1 as makeHelper, paths, pointLabels, rect, textBlock, textBlockAligned, textHeight, textRect, textWidth, translatePoint, triangle };
}
type CanvasContextQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
/**
 * Gets a 2d drawing context from canvas element or query, or throws an error
 * @param canvasElementContextOrQuery Canvas element reference or DOM query
 * @returns Drawing context.
 */
declare const getContext: (canvasElementContextOrQuery: CanvasContextQuery) => CanvasRenderingContext2D;
type DrawingHelper = ReturnType<typeof makeHelper$1>;
/**
 * Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
 * @param ctxOrCanvasEl Drawing context or canvs element reference
 * @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
 * @returns
 */
declare const makeHelper$1: (ctxOrCanvasEl: CanvasContextQuery, canvasBounds?: Rect) => {
  ctx: CanvasRenderingContext2D;
  paths(pathsToDraw: Path[] | readonly Path[], opts?: DrawingOpts$1): void;
  line(lineToDraw: Line | Line[], opts?: DrawingOpts$1): void;
  rect(rectsToDraw: Rect | Rect[] | RectPositioned | RectPositioned[], opts?: RectOpts): void;
  bezier(bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$1): void;
  connectedPoints(pointsToDraw: Point[], opts?: DrawingOpts$1 & Partial<ConnectedPointsOptions>): void;
  pointLabels(pointsToDraw: Point[], opts?: DrawingOpts$1): void;
  dot(dotPosition: Point | Point[], opts?: DotOpts): void;
  circle(circlesToDraw: CirclePositioned | CirclePositioned[], opts: DrawingOpts$1): void;
  arc(arcsToDraw: ArcPositioned | ArcPositioned[], opts: DrawingOpts$1): void;
  textBlock(lines: string[], opts: DrawingOpts$1 & {
    anchor: Point;
    anchorPadding?: number;
    bounds?: RectPositioned;
  }): void;
};
/**
 * Drawing options
 */
type DrawingOpts$1 = {
  /**
   * Stroke style
   */
  readonly strokeStyle?: string;
  /**
   * Fill style
   */
  readonly fillStyle?: string;
  /**
   * If true, diagnostic helpers will be drawn
   */
  readonly debug?: boolean;
};
type LineOpts = {
  readonly lineWidth?: number;
  readonly lineCap?: CanvasLineCap;
  readonly lineJoin?: CanvasLineJoin;
};
/**
 * Draws one or more arcs.
 * @param ctx
 * @param arcs
 * @param opts
 */
declare const arc: (ctx: CanvasRenderingContext2D, arcs: ArcPositioned | readonly ArcPositioned[], opts?: DrawingOpts$1) => void;
/**
 * A drawing stack operation
 */
type StackOp = (ctx: CanvasRenderingContext2D) => void;
/**
 * A drawing stack (immutable)
 */
type DrawingStack = {
  /**
   * Push a new drawing op
   * @param ops Operation to add
   * @returns stack with added op
   */
  push(...ops: readonly StackOp[]): DrawingStack;
  /**
   * Pops an operatiomn
   * @returns Drawing stack with item popped
   */
  pop(): DrawingStack;
  /**
   * Applies drawing stack
   */
  apply(): DrawingStack;
};
/**
 * Creates and returns an immutable drawing stack for a context
 * @param ctx Context
 * @param stk Initial stack operations
 * @returns
 */
declare const drawingStack: (ctx: CanvasRenderingContext2D, stk?: IStackImmutable<StackOp>) => DrawingStack;
/**
 * Draws a curved line through a set of points
 * @param ctx
 * @param points
 * @param opts
 */
declare const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: readonly Point[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more circles. Will draw outline/fill depending on
 * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
 *
 * ```js
 * // Draw a circle with radius of 10 at 0,0
 * circle(ctx, {radius:10});
 *
 * // Draw a circle of radius 10 at 100,100
 * circle(ctx, {radius: 10, x: 100, y: 100});
 *
 * // Draw two blue outlined circles
 * circle(ctx, [ {radius: 5}, {radius: 10} ], {strokeStyle:`blue`});
 * ```
 * @param ctx Drawing context
 * @param circlesToDraw Circle(s) to draw
 * @param opts Drawing options
 */
declare const circle$1: (ctx: CanvasRenderingContext2D, circlesToDraw: CirclePositioned | readonly CirclePositioned[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more ellipses. Will draw outline/fill depending on
 * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
 * @param ctx
 * @param ellipsesToDraw
 * @param opts
 */
declare const ellipse: (ctx: CanvasRenderingContext2D, ellipsesToDraw: EllipsePositioned | readonly EllipsePositioned[], opts?: DrawingOpts$1) => void;
/**
 * Draws one or more paths.
 * supported paths are quadratic beziers and lines.
 * @param ctx
 * @param pathsToDraw
 * @param opts
 */
declare const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Path[] | Path, opts?: {
  readonly strokeStyle?: string;
  readonly debug?: boolean;
}) => void;
type ConnectedPointsOptions = {
  readonly lineWidth: number;
  readonly loop: boolean;
  readonly fillStyle: string;
  readonly strokeStyle: string;
};
/**
 * Draws a line between all the given points.
 * If a fillStyle is specified, it will be filled.
 *
 * See also:
 * * {@link line}: Draw one or more lines
 *
 * @param ctx
 * @param pts
 */
declare const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: Partial<ConnectedPointsOptions>) => void;
/**
 * Draws labels for a set of points
 * @param ctx
 * @param pts Points to draw
 * @param opts
 * @param labels Labels for points
 */
declare const pointLabels: (ctx: CanvasRenderingContext2D, pts: readonly Point[], opts?: {
  readonly fillStyle?: string;
}, labels?: readonly string[]) => void;
/**
 * Returns `point` with the canvas's translation matrix applied
 * @param ctx
 * @param point
 * @returns
 */
declare const translatePoint: (ctx: CanvasRenderingContext2D, point: Point) => Point;
/**
 * Creates a new HTML IMG element with a snapshot of the
 * canvas. Element will need to be inserted into the document.
 *
 * ```
 * const myCanvas = document.getElementById('someCanvas');
 * const el = copyToImg(myCanvas);
 * document.getElementById('images').appendChild(el);
 * ```
 * @param canvasEl
 * @returns
 */
declare const copyToImg: (canvasEl: HTMLCanvasElement) => HTMLImageElement;
type DotOpts = DrawingOpts$1 & {
  readonly radius?: number;
  readonly stroke?: boolean;
  readonly filled?: boolean;
  readonly strokeWidth?: number;
};
/**
 * Draws filled circle(s) at provided point(s)
 * @param ctx
 * @param pos
 * @param opts
 */
declare const dot: (ctx: CanvasRenderingContext2D, pos: Point | (Point | CirclePositioned)[] | CirclePositioned, opts?: DotOpts) => void;
/**
 * Draws a cubic or quadratic bezier
 * @param ctx
 * @param bezierToDraw
 * @param opts
 */
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: QuadraticBezier | CubicBezier, opts?: DrawingOpts$1) => void;
/**
 * Draws one or more lines.
 *
 * Each line is drawn independently, ie it's not assumed lines are connected.
 *
 * See also:
 * * {@link connectedPoints}: Draw a series of connected points
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const line$1: (ctx: CanvasRenderingContext2D, toDraw: Line | readonly Line[], opts?: LineOpts & DrawingOpts$1) => void;
/**
 * Draws one or more triangles
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const triangle: (ctx: CanvasRenderingContext2D, toDraw: Triangle | readonly Triangle[], opts?: DrawingOpts$1 & {
  readonly filled?: boolean;
}) => void;
type RectOpts = DrawingOpts$1 & Readonly<Partial<{
  stroke: boolean;
  filled: boolean;
  strokeWidth: number;
  /**
   * If true, diagonals are drawn
   */
  crossed: boolean;
}>>;
/**
 * Draws one or more rectangles.
 *
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: Rect | Rect[] | RectPositioned | RectPositioned[], opts?: RectOpts) => void;
/**
 * Returns the width of `text`. Rounds number up to nearest multiple if provided. If
 * text is empty or undefined, 0 is returned.
 * @param ctx
 * @param text
 * @param widthMultiple
 * @returns
 */
declare const textWidth: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => number;
declare const textRect: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => Rect;
declare const textHeight: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number) => number;
/**
 * Draws a block of text. Each array item is considered a line.
 * @param ctx
 * @param lines
 * @param opts
 */
declare const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts$1 & {
  readonly anchor: Point;
  readonly align?: `top` | `center`;
  readonly anchorPadding?: number;
  readonly bounds?: RectPositioned;
}) => void;
type HorizAlign = `left` | `right` | `center`;
type VertAlign = `top` | `center` | `bottom`;
/**
 * Draws an aligned text block
 */
declare const textBlockAligned: (ctx: CanvasRenderingContext2D, text: readonly string[] | string, opts: DrawingOpts$1 & {
  readonly bounds: RectPositioned;
  readonly horiz?: HorizAlign;
  readonly vert?: VertAlign;
}) => void;

//#endregion
//#region ../packages/visual/dist/src/svg/types.d.ts
//# sourceMappingURL=drawing.d.ts.map
type MarkerOpts = StrokeOpts & DrawingOpts & {
  readonly id: string;
  readonly markerWidth?: number;
  readonly markerHeight?: number;
  readonly orient?: string;
  readonly viewBox?: string;
  readonly refX?: number;
  readonly refY?: number;
};
/**
* Drawing options
*/
type DrawingOpts = {
  /**
   * Style for fill. Eg `black`.
   * @see [fill](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
   */
  readonly fillStyle?: string;
  /**
   * Opacity (0..1)
   */
  readonly opacity?: number;
  /**
   * If true, debug helpers are drawn
   */
  readonly debug?: boolean;
};
type StrokeOpts = {
  /**
   * Line cap
   * @see [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap)
   */
  readonly strokeLineCap?: `butt` | `round` | `square`;
  /**
   * Width of stroke, eg `2`
   * @see [stroke-width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width)
   */
  readonly strokeWidth?: number;
  /**
   * Stroke dash pattern, eg `5`
   * @see [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
   */
  readonly strokeDash?: string;
  /**
   * Style for lines. Eg `white`.
   * @see [stroke](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)
   */
  readonly strokeStyle?: string;
};
/**
 * Line drawing options
 */
type LineDrawingOpts = DrawingOpts & MarkerDrawingOpts & StrokeOpts;
type CircleDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
type PathDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
type MarkerDrawingOpts = {
  readonly markerEnd?: MarkerOpts;
  readonly markerStart?: MarkerOpts;
  readonly markerMid?: MarkerOpts;
};
/**
 * Text drawing options
 */
type TextDrawingOpts = StrokeOpts & DrawingOpts & {
  readonly anchor?: `start` | `middle` | `end`;
  readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
  readonly userSelect?: boolean;
};
/**
 * Text path drawing options
 */
type TextPathDrawingOpts = TextDrawingOpts & {
  readonly method?: `align` | `stretch`;
  readonly side?: `left` | `right`;
  readonly spacing?: `auto` | `exact`;
  readonly startOffset?: number;
  readonly textLength?: number;
};

//#endregion
//#region ../packages/visual/dist/src/svg/apply.d.ts
//# sourceMappingURL=types.d.ts.map
/**
 * Applies drawing options to given SVG element.
 * Applies: fillStyle
 * @param elem Element
 * @param opts Drawing options
 */
declare const applyOpts: (elem: SVGElement, opts: DrawingOpts) => void;

//#endregion
//#region ../packages/visual/dist/src/svg/bounds.d.ts
//# sourceMappingURL=apply.d.ts.map
/**
 * Get the bounds of an SVG element (determined by its width/height attribs)
 * @param svg
 * @returns
 */
declare const getBounds: (svg: SVGElement) => Rect;
/**
 * Set the bounds of an element, using its width/height attribs.
 * @param svg
 * @param bounds
 */
declare const setBounds: (svg: SVGElement, bounds: Rect) => void;

//#endregion
//#region ../packages/visual/dist/src/svg/create.d.ts
//# sourceMappingURL=bounds.d.ts.map
/**
 * Creates an element of `type` and with `id` (if specified)
 * @param type Element type, eg `circle`
 * @param id Optional id to assign to element
 * @returns Element
 */
declare const createEl: <V extends SVGElement>(type: string, id?: string) => V;
/**
 * Creates and appends a SVG element.
 *
 * ```js
 * // Create a circle
 * const circleEl = createOrResolve(parentEl, `SVGCircleElement`);
 * ```
 *
 * If `queryOrExisting` is specified, it is used as a query to find an existing element. If
 * query starts with `#`, this will be set as the element id, if created.
 *
 * ```js
 * // Creates an element with id 'myCircle' if it doesn't exist
 * const circleEl = createOrResolve(parentEl, `SVGCircleElement`, `#myCircle`);
 * ```
 * @param parent Parent element
 * @param type Type of SVG element
 * @param queryOrExisting Query, eg `#id`
 * @returns
 */
declare const createOrResolve: <V extends SVGElement>(parent: SVGElement, type: string, queryOrExisting?: string | V, suffix?: string) => V;

//#endregion
//#region ../packages/visual/dist/src/svg/elements.d.ts
//# sourceMappingURL=create.d.ts.map
declare namespace elements_d_exports {
  export { circle, circleUpdate, grid, group, groupUpdate, line, lineUpdate, path, pathUpdate, polarRayUpdate, text, textPath, textPathUpdate, textUpdate };
}
/**
 * Creates and adds an SVG path element
 * @example
 * ```js
 * const paths = [
 *  `M300,200`,
 *  `a25,25 -30 0,1 50, -25 l 50,-25`
 * ]
 * const pathEl = path(paths, parentEl);
 * ```
 * @param svgOrArray Path syntax, or array of paths. Can be empty if path data will be added later
 * @param parent SVG parent element
 * @param opts Options Drawing options
 * @returns
 */
declare const path: (svgOrArray: string | readonly string[], parent: SVGElement, opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement) => SVGPathElement;
declare const pathUpdate: (elem: SVGPathElement, opts?: PathDrawingOpts) => SVGPathElement;
/**
 * Updates an existing `SVGCircleElement` with potentially updated circle data and drawing options
 * @param elem Element
 * @param circle Circle
 * @param opts Drawing options
 * @returns SVGCircleElement
 */
declare const circleUpdate: (elem: SVGCircleElement, circle: CirclePositioned, opts?: CircleDrawingOpts) => SVGCircleElement;
/**
 * Creates or reuses a `SVGCircleElement`.
 *
 * To update an existing element, use `circleUpdate`
 * @param circle
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const circle: (circle: CirclePositioned, parent: SVGElement, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement) => SVGCircleElement;
/**
 * Creates or resuses a `SVGGElement` (group)
 *
 * To update an existing elemnet, use `groupUpdate`
 * @param children
 * @param parent
 * @param queryOrExisting
 * @returns
 */
declare const group: (children: readonly SVGElement[], parent: SVGElement, queryOrExisting?: string | SVGGElement) => SVGGElement;
declare const groupUpdate: (elem: SVGGElement, children: readonly SVGElement[]) => SVGGElement;
/**
 * Creates or reuses a SVGLineElement.
 *
 * @param line
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const line: (line: Line, parent: SVGElement, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement) => SVGLineElement;
/**
 * Updates a SVGLineElement instance with potentially changed line and drawing data
 * @param lineEl
 * @param line
 * @param opts
 * @returns
 */
declare const lineUpdate: (lineEl: SVGLineElement, line: Line, opts?: LineDrawingOpts) => SVGLineElement;
declare const polarRayUpdate: (lineEl: SVGLineElement, ray: PolarRay, opts?: LineDrawingOpts) => SVGLineElement;
/**
 * Updates an existing SVGTextPathElement instance with text and drawing options
 * @param el
 * @param text
 * @param opts
 * @returns
 */
declare const textPathUpdate: (el: SVGTextPathElement, text?: string, opts?: TextPathDrawingOpts) => SVGTextPathElement;
/**
 * Creates or reuses a SVGTextPathElement.
 * @param pathReference
 * @param text
 * @param parent
 * @param opts
 * @param textQueryOrExisting
 * @param pathQueryOrExisting
 * @returns
 */
declare const textPath: (pathReference: string, text: string, parent: SVGElement, opts?: TextPathDrawingOpts, textQueryOrExisting?: string | SVGTextElement, pathQueryOrExisting?: string | SVGTextPathElement) => SVGTextPathElement;
/**
 * Updates an existing SVGTextElement instance with position, text and drawing options
 * @param el
 * @param pos
 * @param text
 * @param opts
 * @returns
 */
declare const textUpdate: (el: SVGTextElement, pos?: Point, text?: string, opts?: TextDrawingOpts) => SVGTextElement;
/**
 * Creates or reuses a SVGTextElement
 * @param pos Position of text
 * @param text Text
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const text: (text: string, parent: SVGElement, pos?: Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement) => SVGTextElement;
/**
 * Creates a square grid based at a center point, with cells having `spacing` height and width.
 *
 * It fits in as many cells as it can within `width` and `height`.
 *
 * Returns a SVG group, consisting of horizontal and vertical lines
 * @param parent Parent element
 * @param center Center point of grid
 * @param spacing Width/height of cells
 * @param width How wide grid should be
 * @param height How high grid should be
 * @param opts
 */
declare const grid: (parent: SVGElement, center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts) => SVGGElement;

//#endregion
//#region ../packages/visual/dist/src/svg/geometry.d.ts
//# sourceMappingURL=elements.d.ts.map
/**
 * Returns a Line type from an SVGLineElement
 * @param el SVG Line Element
 * @returns
 */
declare const lineFromSvgLine: (el: SVGLineElement) => Line;
declare const polarRayFromSvgLine: (el: SVGLineElement, origin: Point) => PolarRay;

//#endregion
//#region ../packages/visual/dist/src/svg/helper.d.ts
//# sourceMappingURL=geometry.d.ts.map
/**
 * Helper to make SVG elements with a common parent.
 *
 * Create with {@link makeHelper}.
 */
type SvgHelper = {
  remove(queryOrExisting: string | SVGElement): void;
  /**
   * Creates a text element
   * @param text Text
   * @param pos Position
   * @param opts Drawing options
   * @param queryOrExisting DOM query to look up existing element, or the element instance
   */
  text(text: string, pos: Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement): SVGTextElement;
  /**
   * Creates text on a path
   * @param pathReference Reference to path element
   * @param text Text
   * @param opts Drawing options
   * @param textQueryOrExisting DOM query to look up existing element, or the element instance
   * @param pathQueryOrExisting DOM query to look up existing element, or the element instance
   */
  textPath(pathReference: string, text: string, opts?: TextDrawingOpts, textQueryOrExisting?: string | SVGTextElement, pathQueryOrExisting?: string | SVGTextPathElement): SVGTextPathElement;
  /**
   * Creates a line
   * @param line Line
   * @param opts Drawing options
   * @param queryOrExisting DOM query to look up existing element, or the element instance
   */
  line(line: Line, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement): SVGLineElement;
  /**
   * Creates a circle
   * @param circle Circle
   * @param opts Drawing options
   * @param queryOrExisting DOM query to look up existing element, or the element instance
   */
  circle(circle: CirclePositioned, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement): SVGCircleElement;
  /**
   * Creates a path
   * @param svgString Path description, or empty string
   * @param opts Drawing options
   * @param queryOrExisting DOM query to look up existing element, or the element instance
   */
  path(svgString: string | readonly string[], opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement): SVGPathElement;
  /**
   * Creates a grid of horizontal and vertical lines inside of a group
   * @param center Grid origin
   * @param spacing Cell size
   * @param width Width of grid
   * @param height Height of grid
   * @param opts Drawing options
   */
  grid(center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts): SVGGElement;
  /**
   * Returns an element if it exists in parent
   * @param selectors Eg `#path`
   */
  query<V extends SVGElement>(selectors: string): V | null;
  /**
   * Gets/sets the width of the parent
   */
  get width(): number;
  set width(width: number);
  /**
   * Gets the parent
   */
  get parent(): SVGElement;
  /**
   * Gets/sets the height of the parent
   */
  get height(): number;
  set height(height: number);
  /**
   * Deletes all child elements
   */
  clear(): void;
};
/**
 * Creates a {@link SvgHelper} for the creating and management of SVG elements.
 * @param parent
 * @param parentOpts
 * @returns
 */
declare const makeHelper: (parent: SVGElement, parentOpts?: DrawingOpts & StrokeOpts) => SvgHelper;

//#endregion
//#region ../packages/visual/dist/src/svg/markers.d.ts
//# sourceMappingURL=helper.d.ts.map
declare const createMarker: (id: string, opts: MarkerOpts, childCreator?: () => SVGElement) => SVGMarkerElement;
declare const markerPrebuilt: (elem: SVGElement | null, opts: MarkerOpts, _context: DrawingOpts) => string;

//#endregion
//#region ../packages/visual/dist/src/svg/path.d.ts
//# sourceMappingURL=markers.d.ts.map

/**
 * Applies path drawing options to given element
 * Applies: markerEnd, markerStart, markerMid
 * @param elem Element (presumed path)
 * @param opts Options
 */
declare const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;

//#endregion
//#region ../packages/visual/dist/src/svg/remove.d.ts
//# sourceMappingURL=path.d.ts.map
/**
 * Removes an SVG element from a parent
 * @param parent Parent
 * @param queryOrExisting Query or existing element
 * @returns
 */
declare const remove: <V extends SVGElement>(parent: SVGElement, queryOrExisting: string | V) => void;
/**
 * Removes all children of `parent`, but not `parent` itself.
 * @param parent
 */
declare const clear: (parent: SVGElement) => void;

//#endregion
//#region ../packages/visual/dist/src/svg/stroke.d.ts
//# sourceMappingURL=remove.d.ts.map
/**
 * Applies drawing options to given SVG element.
 * Applies: strokeStyle, strokeWidth, strokeDash, strokeLineCap
 * @param elem Element
 * @param opts
 */
declare const applyStrokeOpts: (elem: SVGElement, opts: StrokeOpts) => void;

//#endregion
//#region ../packages/visual/dist/src/svg/index.d.ts
//# sourceMappingURL=stroke.d.ts.map
declare namespace index_d_exports {
  export { CircleDrawingOpts, DrawingOpts, elements_d_exports as Elements, LineDrawingOpts, MarkerDrawingOpts, MarkerOpts, PathDrawingOpts, StrokeOpts, SvgHelper, TextDrawingOpts, TextPathDrawingOpts, applyOpts, applyPathOpts, applyStrokeOpts, clear, createEl, createMarker, createOrResolve, getBounds, lineFromSvgLine, makeHelper, markerPrebuilt, polarRayFromSvgLine, remove, setBounds };
}
declare namespace visual_d_exports {
  export { CanvasEvents, CanvasHelper, CanvasHelperOptions, index_d_exports$1 as Colour, drawing_d_exports as Drawing, image_data_grid_d_exports as ImageDataGrid, Opts, index_d_exports as Svg, video_d_exports as Video, pointerVisualise };
}
//#endregion
export { CanvasEvents, CanvasHelper as CanvasHelper$1, CanvasHelperOptions, Opts, drawing_d_exports, image_data_grid_d_exports, index_d_exports as index_d_exports$11, index_d_exports$1 as index_d_exports$12, pointerVisualise as pointerVisualise$1, video_d_exports, visual_d_exports };
//# sourceMappingURL=visual-TrvKru9L.d.ts.map