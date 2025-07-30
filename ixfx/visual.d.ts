import { ElementResizeLogic } from "@ixfx/dom";
import { SimpleEventEmitter } from "@ixfx/events";
import * as _ixfx_geometry0 from "@ixfx/geometry";
import { Angle, Arcs, Beziers, Circles, Ellipses, Grids, Lines, Paths, Points, Rects, ScaleBy, Triangles } from "@ixfx/geometry";
import { RandomSource } from "@ixfx/random";
import { Rect, RectPositioned } from "@ixfx/geometry/rect";
import * as _ixfx_geometry_grid0 from "@ixfx/geometry/grid";
import { Grid } from "@ixfx/geometry/grid";
import * as C from "colorizr";
import Colorizr from "colorizr";
import { IStackImmutable } from "@ixfx/collections/stack";

//#region packages/visual/src/colour/types.d.ts
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
type ColourSpaces = `srgb` | `hsl` | `oklch`;
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
 * * 'scalar': 0..1 range for RGB & opacity
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
/**
 * RGB in 0...255 range, including opacity.
 */
type Rgb8Bit = RgbBase & {
  unit: `8bit`;
};
/**
 * Rgb.
 * Units determine how to interperet rgb values.
 * * 'scalar': 0..1 range for RGB & opacity
 * * '8bit': 0..255 range for RGB & opacity
 */
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
type ColourInterpolator<T extends Colour> = (amount: number) => T;
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
 * l: 0..1
 * c: 0..4
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
/**
 * Options for interpolation
 */
type ColourInterpolationOpts = {
  direction: `longer` | `shorter`;
  space: ColourSpaces;
};
type ColourStepOpts = ColourInterpolationOpts & {
  /**
   * If set, determines total number of steps, including colour stops.
   * Use this _or_ `stepsBetween`.
   */
  stepsTotal?: number;
  /**
   * If set, determines number of steps between colour stops.
   * Use this _or_ `stepsTotal`.
   */
  stepsBetween?: number;
};
type ParsingOptions<T> = Partial<{
  scalar: boolean;
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
//# sourceMappingURL=types.d.ts.map
//#endregion
//#region packages/visual/src/canvas-helper.d.ts
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
  get toRelative(): _ixfx_geometry0.Scaler;
  /**
   * Returns a scaler for points based on width & height
   */
  get toAbsoluteFixed(): _ixfx_geometry0.Scaler;
  /**
   * Returns a scaler for points based on width & height
   */
  get toRelativeFixed(): _ixfx_geometry0.Scaler;
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
  get toAbsolute(): _ixfx_geometry0.Scaler;
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
    get: _ixfx_geometry_grid0.GridCellAccessor<Rgb8Bit>;
    set: _ixfx_geometry_grid0.GridCellSetter<Rgb>;
    flip: () => void;
  };
}
//# sourceMappingURL=canvas-helper.d.ts.map
//#endregion
//#region packages/visual/src/pointer-visualise.d.ts
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
//# sourceMappingURL=pointer-visualise.d.ts.map
//#endregion
//#region packages/visual/src/colour/conversion.d.ts
type ConvertDestinations = `hsl-scalar` | `hsl-absolute` | `oklch-scalar` | `oklch-absolute` | `srgb-8bit` | `srgb-scalar`;
declare function convert<T extends ConvertDestinations>(colour: Colourish, destination: T): T extends "oklch-absolute" ? OkLchAbsolute : T extends "oklch-scalar" ? OkLchScalar : T extends "srgb-8bit" ? Rgb8Bit : T extends "srgb-scalar" ? RgbScalar : T extends "hsl-scalar" ? HslScalar : T extends "hsl-absolute" ? HslAbsolute : never;
/**
 * Like {@link convert}, but result is a CSS colour string
 * @param colour
 * @param destination
 * @returns
 */
declare function convertToString(colour: Colourish, destination: ConvertDestinations): string;
declare function convertScalar<T extends ColourSpaces>(colour: Colourish, destination: T): T extends "oklch" ? OkLchScalar : T extends "hsl" ? HslScalar : T extends "srgb" ? RgbScalar : never;
declare const toCssColour: (colour: Colourish | object) => string;
declare const toLibraryColour: (colour: Colourish) => Colorizr;
declare const guard$3: (colour: Colour) => void;
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
declare function rgbToHsl(rgb: Rgb, scalarResult: true): HslScalar;
declare function rgbToHsl(rgb: Rgb, scalarResult: false): HslAbsolute;
//# sourceMappingURL=conversion.d.ts.map
//#endregion
//#region packages/visual/src/colour/css-colours.d.ts
/**
 * Converts from some kind of colour that is legal in CSS
 * into a structured Colour type.
 *
 * Handles: hex format, CSS variables, colour names
 * ```js
 * fromCssColour(`#ffffff`);
 * fromCssColour(`blue`);
 * fromCssColour(`--some-variable`);
 * fromCssColour(`hsl(50, 50%, 50%)`);
 * fromCssColour(`rgb(50, 100, 100)`);
 * ```
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
//# sourceMappingURL=css-colours.d.ts.map
//#endregion
//#region packages/visual/src/colour/generate.d.ts
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
//# sourceMappingURL=generate.d.ts.map
//#endregion
//#region packages/visual/src/colour/math.d.ts
/**
 * Multiplies the opacity of a colour by `amount`, returning a computed CSS colour.
 *
 * ```js
 * multiplyOpacity(`red`, 0.5); // Returns a colour string
 * ```
 *
 * For example, to half the opacity, use `amount: 0.5`.
 * Clamps the result to ensure it's between 0..1
 * @param colourish
 * @param amount
 * @returns
 */
declare function multiplyOpacity(colourish: string, amount: number): string;
/**
 * Does a computation with the opacity of a colour, returning colour string
 * @param colourish Colour
 * @param fn Function that takes original opacity as input and returns output opacity
 */
declare function withOpacity$3(colourish: string, fn: (scalarOpacity: number) => number): string;
/**
 * Does a computation with the opacity of a colour in a HSL structure
 * @param hsl Colour
 * @param fn Function that takes original opacity as input and returns output opacity
 */
declare function withOpacity$3(hsl: Hsl, fn: (scalarOpacity: number) => number): Hsl;
/**
 * Does a computation with the opacity of a colour in a RGB structure
 * @param colourish Colour
 * @param fn Function that takes original opacity as input and returns output opacity
 */
declare function withOpacity$3(rgb: Rgb, fn: (scalarOpacity: number) => number): Rgb;
//# sourceMappingURL=math.d.ts.map
//#endregion
//#region packages/visual/src/colour/interpolate.d.ts
/**
 * Returns a CSS `linear-gradient` with stops corresponding to the given list of `colours`.
 * ```js
 * element.style.background = Colour.cssLinearGradient(['red','green','blue']);
 * ```
 * @param colours
 * @returns
 */
declare const cssLinearGradient: (colours: Colourish[]) => string;
/**
 * Returns a function that interpolates between two colours. Returns string colour values.
 * ```js
 * const i = interpolator(`blue`, `red`);
 * i(0.5); // Get the colour at 50%, as a string.
 * ```
 *
 * To work with structured colour values, use one of the space's `interpolate` functions.
 * @param colourA
 * @param colourB
 * @param options
 * @returns
 */
declare const interpolator$3: (colourA: Colourish, colourB: Colourish, options?: Partial<ColourInterpolationOpts>) => (amount: number) => string;
/**
 * Produces a stepped scale of colours.
 *
 * ```js
 * // A scale of from red to green, with three colours in-between
 * const steps = Colour.scale([ `red`, `green` ], { stepsBetween: 3 });
 * for (const step of steps) {
 *  // A CSS colour string
 * }
 * ```
 *
 * {@link cssLinearGradient} can produce a smooth gradient in CSS on the basis
 * of the stepped colours.
 * @param colours
 * @param opts
 * @returns
 */
declare const scale: (colours: Colourish[], opts?: Partial<ColourStepOpts>) => string[];
type CreateStepsOptions = Partial<{
  space: ColourSpaces;
  steps: number;
  direction: `longer` | `shorter`;
  exclusive: boolean;
}>;
declare function createSteps<T extends CreateStepsOptions>(a: Colourish | string, b: Colourish, options: T): T extends {
  space: `oklch`;
} ? OkLchScalar[] : T extends {
  space: `srgb`;
} ? RgbScalar[] : T extends {
  space: `hsl`;
} ? HslScalar[] : OkLchScalar[];
//# sourceMappingURL=interpolate.d.ts.map
declare namespace hsl_d_exports {
  export { absolute$1 as absolute, changeLightness$1 as changeLightness, fromCss$2 as fromCss, fromHexString$2 as fromHexString, generateScalar$1 as generateScalar, guard$2 as guard, interpolator$2 as interpolator, parseCssHslFunction, scalar$2 as scalar, toAbsolute$1 as toAbsolute, toCssString$2 as toCssString, toLibraryRgb, toScalar$2 as toScalar, withOpacity$2 as withOpacity };
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
/**
 * Increases or decreases lightness by this percentage, returning new colour
 *
 * Amount to change:
 * * 'fixed': a fixed amount
 * * 'delta': increase/decrease by this amount
 * * 'pdelta': proportion of current value to change by ('percentage delta')
 *
 * ```
 * const colour = { h: 0.5, s: 0.5, l: 0.5, space: `hsl`, unit: `scalar` };
 * changeLightness(colour, { pdelta: 0.1 }); // l: 0.55
 * changeLightness(colour, { delta: 0.1 });  // l: 0.6
 * changeLightness(colour, { fixed: 0.5 });  // l: 0.5
 * ```
 *
 * Keep in mind the numerical value will depend on the unit of `value`. If it's scalar,
 * lightness is 0..1 scale, otherwise 0..100 scale.
 *
 * Use negative values to decrease (does not apply to 'fixed')
 * @param value
 * @param amount
 */
declare const changeLightness$1: (value: Hsl, amount: Partial<{
  pdelta: number;
  delta: number;
  fixed: number;
}>) => Hsl;
declare function fromHexString$2<T extends ParsingOptions<Hsl>>(hexString: string, scalar: T): T extends {
  scalar: true;
} ? HslScalar : HslAbsolute;
declare function fromCss$2<T extends ParsingOptions<Hsl>>(value: string, options: T): T extends {
  scalar: true;
} ? HslScalar : HslAbsolute;
declare const toCssString$2: (hsl: Hsl) => string;
declare const toAbsolute$1: (hslOrString: Hsl | Rgb | string) => HslAbsolute;
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
declare const generateScalar$1: (absoluteHslOrVariable: string | number | Angle, saturation?: number, lightness?: number, opacity?: number) => HslScalar;
/**
 * Converts a {@link Hsl} value to scalar units, or parses a colour string
 * and converts it.
 *
 * ```js
 * toScalar({ h: 100, s: 50, l: 100, unit: `absolute` });
 * toScalar(`red`);
 * ```
 * @param hslOrString
 * @returns
 */
declare const toScalar$2: (hslOrString: Rgb | Hsl | string) => HslScalar;
declare const guard$2: (hsl: Hsl) => void;
declare const interpolator$2: (a: Hsl | string, b: Hsl | string, direction?: `longer` | `shorter`) => (amount: number) => HslScalar;
/**
 * Creates a HslScalar value from scalar (0..1) values
 * @param hue
 * @param sat
 * @param lightness
 * @param opacity
 * @returns
 */
declare function scalar$2(hue?: number, sat?: number, lightness?: number, opacity?: number): HslScalar;
declare function absolute$1(hue?: number, sat?: number, lightness?: number, opacity?: number): HslAbsolute;
/**
 * It seems Colorizr can't handle 'deg' units
 * @param value
 */
declare function parseCssHslFunction(value: string): Hsl;
/**
 * Converts a Hsl structure (or CSS string) to Colorizr's RGB format
 * @param rgb
 * @returns
 */
declare function toLibraryRgb(hsl: Hsl | string): C.RGB;
//# sourceMappingURL=hsl.d.ts.map
declare namespace oklch_d_exports {
  export { OKLCH_CHROMA_MAX, absolute, fromCss$1 as fromCss, fromHexString$1 as fromHexString, fromLibrary, generateScalar, guard$1 as guard, interpolator$1 as interpolator, scalar$1 as scalar, toAbsolute, toCssString$1 as toCssString, toScalar$1 as toScalar, withOpacity$1 as withOpacity };
}
declare const OKLCH_CHROMA_MAX = 0.4;
declare const guard$1: (lch: OkLch) => void;
declare function fromLibrary<T extends ParsingOptions<OkLch>>(lch: C.LCH, options: T): T extends {
  scalar: true;
} ? OkLchScalar : OkLchAbsolute;
declare const fromHexString$1: (hexString: string, options?: ParsingOptions<OkLch>) => OkLch;
declare function fromCss$1<T extends ParsingOptions<OkLch>>(value: string, options: T): T extends {
  scalar: true;
} ? OkLchScalar : OkLchAbsolute;
/**
 * Returns a string or {@link OkLch} value to absolute form.
 *
 * This means ranges are:
 * * lightness: 0..1
 * * chroma: 0...CHROMA_MAX (0.4)
 * * hue: 0..360
 * @param lchOrString
 * @returns
 */
declare const toAbsolute: (lchOrString: OkLch | string) => OkLchAbsolute;
declare const toScalar$1: (lchOrString: OkLch | string) => OkLchScalar;
/**
 * Returns the colour as a CSS colour string: `oklch(l c h / opacity)`.
 *
 * @param lch Colour
 * @param precision Set precision of numbers, defaults to 3
 * @returns CSS colour string
 */
declare const toCssString$1: (lch: OkLch, precision?: number) => string;
declare const generateScalar: (absoluteHslOrVariable: string | number | Angle, chroma?: number, lightness?: number, opacity?: number) => OkLchScalar;
/**
 * Scales the opacity value of an input Oklch value
 * ```js
 * withOpacity()
 * ```
 * @param value
 * @param fn
 * @returns
 */
declare const withOpacity$1: <T extends OkLch>(value: T, fn: (opacityScalar: number, value: T) => number) => T;
declare const interpolator$1: (a: OkLch | string, b: OkLch | string, direction?: `longer` | `shorter`) => (amount: number) => OkLchScalar;
declare function scalar$1(lightness?: number, chroma?: number, hue?: number, opacity?: number): OkLchScalar;
/**
 * Create an LCH colour using absolute hue
 * @param l Lightness 0..1
 * @param c Chroma 0..4
 * @param h Hue 0..360
 * @param opacity
 * @returns
 */
declare const absolute: (l: number, c: number, h: number, opacity?: number) => OkLchAbsolute;
//# sourceMappingURL=oklch.d.ts.map
declare namespace srgb_d_exports {
  export { changeLightness, eightBit, fromCss, fromHexString, guard, interpolator, lightness, parseCssRgbFunction, scalar, to8bit, toCssString, toLibraryHsl, toScalar, withOpacity };
}
declare const withOpacity: <T extends Rgb>(value: T, fn: (opacityScalar: number, value: T) => number) => T;
declare function fromHexString<T extends boolean>(hexString: string, scalar: T): T extends true ? RgbScalar : Rgb8Bit;
declare function fromCss<T extends ParsingOptions<Rgb>>(value: string, options: T): T extends {
  scalar: true;
} ? RgbScalar : Rgb8Bit;
declare const toCssString: (rgb: Rgb) => string;
declare const to8bit: (rgbOrString: Rgb | string) => Rgb8Bit;
declare const toScalar: (rgbOrString: Rgb | Hsl | string) => RgbScalar;
declare const guard: (rgb: Rgb) => void;
/**
 * Sets the lightness value.
 *
 * Amount to change:
 * * 'fixed': a fixed amount
 * * 'delta': increase/decrease by this amount
 * * 'pdelta': proportion of current value to change by ('percentage delta')
 *
 * Use negative values to decrease
 * @param value
 * @param amount
 */
declare const changeLightness: (rgb: Rgb, amount: Partial<{
  pdelta: number;
  delta: number;
  fixed: number;
}>) => Rgb;
/**
 * Returns a lightness value (0..1) for an RGB input
 *
 * Calculates lightness by converting to Oklab and using the 'L' value
 * @param rgb
 * @returns
 */
declare function lightness(rgb: Rgb): number;
/**
 * Creates a Rgb8Bit value from 8bit (0..255) values
 * @param red
 * @param green
 * @param blue
 * @param opacity
 * @returns
 */
declare function eightBit(red?: number, green?: number, blue?: number, opacity?: number): Rgb8Bit;
/**
 * Creates a RgbScalar value from scalar (0..1) values
 * @param red
 * @param green
 * @param blue
 * @param opacity
 * @returns
 */
declare function scalar(red?: number, green?: number, blue?: number, opacity?: number): RgbScalar;
/**
 * It seems Colorizr can't handle % values properly :'(
 * @param value
 */
declare function parseCssRgbFunction(value: string): Rgb;
/**
 * Interpolates colours in Srgb space. Probably
 * really ugly, use OkLch space isntead.
 *
 * ```js
 * const i = interpolator(`red`, `blue`);
 * i(0.5); // Get 50% between these colours
 * ```
 * @param colourA
 * @param colourB
 * @returns
 */
declare const interpolator: (colourA: Rgb | string, colourB: Rgb | string) => (amount: number) => RgbScalar;
/**
 * Converts a Rgb structure (or CSS string) to Colorizr's HSL format
 * @param rgb
 * @returns
 */
declare function toLibraryHsl(rgb: Rgb | string): C.HSL;
//# sourceMappingURL=srgb.d.ts.map
declare namespace index_d_exports {
  export { Colour, ColourInterpolationOpts, ColourInterpolator, ColourSpaces, ColourStepOpts, Colourish, ConvertDestinations, CreateStepsOptions, Hsl, HslAbsolute, HslBase, HslScalar, hsl_d_exports as HslSpace, LchBase, OkLch, OkLchAbsolute, OkLchBase, OkLchScalar, oklch_d_exports as OklchSpace, ParsingOptions, Rgb, Rgb8Bit, RgbBase, RgbScalar, srgb_d_exports as SrgbSpace, convert, convertScalar, convertToString, createSteps, cssDefinedHexColours, cssLinearGradient, fromCssColour, goldenAngleColour, guard$3 as guard, interpolator$3 as interpolator, multiplyOpacity, randomHue, rgbToHsl, scale, toColour, toCssColour, toLibraryColour, toStringFirst, withOpacity$3 as withOpacity };
}
declare namespace drawing_d_exports {
  export { CanvasContextQuery, ConnectedPointsOptions, DotOpts, DrawingHelper, DrawingOpts, DrawingStack, HorizAlign, LineOpts, RectOpts, StackOp, VertAlign, arc, bezier, circle, connectedPoints, copyToImg, dot, drawingStack, ellipse, getContext, line, lineThroughPoints, makeHelper, paths, pointLabels, rect, textBlock, textBlockAligned, textHeight, textRect, textWidth, translatePoint, triangle };
}
type CanvasContextQuery = null | string | CanvasRenderingContext2D | HTMLCanvasElement;
/**
 * Gets a 2d drawing context from canvas element or query, or throws an error
 * @param canvasElementContextOrQuery Canvas element reference or DOM query
 * @returns Drawing context.
 */
declare const getContext: (canvasElementContextOrQuery: CanvasContextQuery) => CanvasRenderingContext2D;
type DrawingHelper = ReturnType<typeof makeHelper>;
/**
 * Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
 * @param ctxOrCanvasEl Drawing context or canvs element reference
 * @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
 * @returns
 */
declare const makeHelper: (ctxOrCanvasEl: CanvasContextQuery, canvasBounds?: Rects.Rect) => {
  ctx: CanvasRenderingContext2D;
  paths(pathsToDraw: Paths.Path[] | readonly Paths.Path[], opts?: DrawingOpts): void;
  line(lineToDraw: Lines.Line | Lines.Line[], opts?: DrawingOpts): void;
  rect(rectsToDraw: Rects.Rect | Rects.Rect[] | Rects.RectPositioned | Rects.RectPositioned[], opts?: RectOpts): void;
  bezier(bezierToDraw: Beziers.QuadraticBezier | Beziers.CubicBezier, opts?: DrawingOpts): void;
  connectedPoints(pointsToDraw: Points.Point[], opts?: DrawingOpts & Partial<ConnectedPointsOptions>): void;
  pointLabels(pointsToDraw: Points.Point[], opts?: DrawingOpts): void;
  dot(dotPosition: Points.Point | Points.Point[], opts?: DotOpts): void;
  circle(circlesToDraw: Circles.CirclePositioned | Circles.CirclePositioned[], opts: DrawingOpts): void;
  arc(arcsToDraw: Arcs.ArcPositioned | Arcs.ArcPositioned[], opts: DrawingOpts): void;
  textBlock(lines: string[], opts: DrawingOpts & {
    anchor: Points.Point;
    anchorPadding?: number;
    bounds?: Rects.RectPositioned;
  }): void;
};
/**
 * Drawing options
 */
type DrawingOpts = {
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
declare const arc: (ctx: CanvasRenderingContext2D, arcs: Arcs.ArcPositioned | readonly Arcs.ArcPositioned[], opts?: DrawingOpts) => void;
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
declare const lineThroughPoints: (ctx: CanvasRenderingContext2D, points: readonly Points.Point[], opts?: DrawingOpts) => void;
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
declare const circle: (ctx: CanvasRenderingContext2D, circlesToDraw: Circles.CirclePositioned | readonly Circles.CirclePositioned[], opts?: DrawingOpts) => void;
/**
 * Draws one or more ellipses. Will draw outline/fill depending on
 * whether `strokeStyle` or `fillStyle` params are present in the drawing options.
 * @param ctx
 * @param ellipsesToDraw
 * @param opts
 */
declare const ellipse: (ctx: CanvasRenderingContext2D, ellipsesToDraw: Ellipses.EllipsePositioned | readonly Ellipses.EllipsePositioned[], opts?: DrawingOpts) => void;
/**
 * Draws one or more paths.
 * supported paths are quadratic beziers and lines.
 * @param ctx
 * @param pathsToDraw
 * @param opts
 */
declare const paths: (ctx: CanvasRenderingContext2D, pathsToDraw: readonly Paths.Path[] | Paths.Path, opts?: {
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
declare const connectedPoints: (ctx: CanvasRenderingContext2D, pts: readonly Points.Point[], opts?: Partial<ConnectedPointsOptions>) => void;
/**
 * Draws labels for a set of points
 * @param ctx
 * @param pts Points to draw
 * @param opts
 * @param labels Labels for points
 */
declare const pointLabels: (ctx: CanvasRenderingContext2D, pts: readonly Points.Point[], opts?: {
  readonly fillStyle?: string;
}, labels?: readonly string[]) => void;
/**
 * Returns `point` with the canvas's translation matrix applied
 * @param ctx
 * @param point
 * @returns
 */
declare const translatePoint: (ctx: CanvasRenderingContext2D, point: Points.Point) => Points.Point;
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
type DotOpts = DrawingOpts & {
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
declare const dot: (ctx: CanvasRenderingContext2D, pos: Points.Point | (Points.Point | Circles.CirclePositioned)[] | Circles.CirclePositioned, opts?: DotOpts) => void;
/**
 * Draws a cubic or quadratic bezier
 * @param ctx
 * @param bezierToDraw
 * @param opts
 */
declare const bezier: (ctx: CanvasRenderingContext2D, bezierToDraw: Beziers.QuadraticBezier | Beziers.CubicBezier, opts?: DrawingOpts) => void;
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
declare const line: (ctx: CanvasRenderingContext2D, toDraw: Lines.Line | readonly Lines.Line[], opts?: LineOpts & DrawingOpts) => void;
/**
 * Draws one or more triangles
 * @param ctx
 * @param toDraw
 * @param opts
 */
declare const triangle: (ctx: CanvasRenderingContext2D, toDraw: Triangles.Triangle | readonly Triangles.Triangle[], opts?: DrawingOpts & {
  readonly filled?: boolean;
}) => void;
type RectOpts = DrawingOpts & Readonly<Partial<{
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
declare const rect: (ctx: CanvasRenderingContext2D, toDraw: Rects.Rect | Rects.Rect[] | Rects.RectPositioned | Rects.RectPositioned[], opts?: RectOpts) => void;
/**
 * Returns the width of `text`. Rounds number up to nearest multiple if provided. If
 * text is empty or undefined, 0 is returned.
 * @param ctx
 * @param text
 * @param widthMultiple
 * @returns
 */
declare const textWidth: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => number;
declare const textRect: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number, widthMultiple?: number) => Rects.Rect;
declare const textHeight: (ctx: CanvasRenderingContext2D, text?: string | null, padding?: number) => number;
/**
 * Draws a block of text. Each array item is considered a line.
 * @param ctx
 * @param lines
 * @param opts
 */
declare const textBlock: (ctx: CanvasRenderingContext2D, lines: readonly string[], opts: DrawingOpts & {
  readonly anchor: Points.Point;
  readonly align?: `top` | `center`;
  readonly anchorPadding?: number;
  readonly bounds?: Rects.RectPositioned;
}) => void;
type HorizAlign = `left` | `right` | `center`;
type VertAlign = `top` | `center` | `bottom`;
/**
 * Draws an aligned text block
 */
declare const textBlockAligned: (ctx: CanvasRenderingContext2D, text: readonly string[] | string, opts: DrawingOpts & {
  readonly bounds: Rects.RectPositioned;
  readonly horiz?: HorizAlign;
  readonly vert?: VertAlign;
}) => void;
//# sourceMappingURL=drawing.d.ts.map
declare namespace image_data_grid_d_exports {
  export { accessor, byColumn, byRow, grid, setter, wrap };
}
/**
 * Returns a {@link @ixfx/geometry/Grids.Grid} based on the provided `image`
 * @param image ImageData
 * @returns Grid
 */
declare const grid: (image: ImageData) => Grids.Grid;
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
declare const wrap: (image: ImageData) => Grids.GridWritable<Rgb8Bit> & Grids.GridReadable<Rgb8Bit>;
/**
 * Returns a function to access pixel values by x,y
 * @param image
 * @returns
 */
declare const accessor: (image: ImageData) => Grids.GridCellAccessor<Rgb8Bit>;
/**
 * Returns a function that sets pixel values
 * @param image
 * @returns
 */
declare const setter: (image: ImageData) => Grids.GridCellSetter<Rgb>;
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
 * import { Video } from '@ixfx/visual.js'
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
//# sourceMappingURL=video.d.ts.map

//#endregion
export { CanvasEvents, CanvasHelper, CanvasHelperOptions, index_d_exports as Colour, drawing_d_exports as Drawing, image_data_grid_d_exports as ImageDataGrid, Opts, video_d_exports as Video, pointerVisualise };
//# sourceMappingURL=visual.d.ts.map