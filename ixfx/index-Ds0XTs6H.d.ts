import { N as NumberScaler } from './Types-D1-qcE-Y.js';
import { C as CirclePositioned } from './CircleType-D9Xd-yDE.js';
import { P as Point } from './PointType-BDlA07rn.js';
import { a as RectPositioned, R as Rect } from './RectTypes-CjvCxMc4.js';
import { G as Grid, d as GridWritable, e as GridReadable, a as GridCellAccessor, b as GridCellSetter } from './Types-Dczm1x8S.js';
import { H as Hsl, C as Colourish, b as HslAbsolute, c as HslRelative, d as ColourInterpolationOpts, O as OkLch, a as Rgb, e as RgbRelative, R as Rgb8Bit, f as RgbBase, S as Spaces } from './Types-H_4FI2AJ.js';
import { a as Drawing } from './Drawing-P-NUHo6u.js';
import { i as index$3 } from './index-B-VaY0fT.js';
import { L as Line } from './LineType-DkIFzpdp.js';
import { a as RecursivePartial } from './TsUtil-D3MueCxS.js';
import { g as goldenAngleColour, r as randomHue } from './Generate-Bu82Jk21.js';
import Color, { ColorConstructor } from 'colorjs.io';
import { R as Result } from './Results-ByWkmocN.js';
import { V as Video } from './Video-W9xZZbzn.js';

declare const hslToColorJs: (hsl: Hsl) => ColorConstructor;
declare const isHsl: (p: Colourish) => p is Hsl;
declare const hslToString: (hsl: Hsl) => string;
/**
 * Returns hue in 0..360, saturation, lightness and opacity in 0..100 scale
 * @param hsl
 * @param safe
 * @returns
 */
declare const hslToAbsolute: (hsl: Hsl, safe: boolean) => HslAbsolute;
/**
 * Returns a Colorjs 'Color' object based on relative hue, saturation, lightness
 * and opacity.
 * @param h Hue (0..1)
 * @param s Saturation (0..1) Default: 1
 * @param l Lightness (0..1) Default: 0.5
 * @param opacity Opacity (0..1) Default: 1
 * @returns
 */
declare const hslFromRelativeValues: (h?: number, s?: number, l?: number, opacity?: number) => HslRelative;
declare const hslFromAbsoluteValues: (h: number, s: number, l: number, opacity?: number, safe?: boolean) => HslRelative;
declare const hslToRelative: (hsl: Hsl, safe?: boolean) => HslRelative;
/**
 * Parses colour to `{ h, s, l }`, each field being on 0..1 scale.
 *
 * Note that some colours will return NaN for h,s or l. This is because they have
 * indeterminate hue. For example white, black and transparent. By default hue of 0 is used
 * in these cases.
 * @param colour
 * @returns
 */
declare const toHsl: (colour: Colourish, safe?: boolean) => HslRelative;

/**
 * Returns a function to interpolate between colours
 * ```js
 * import { Colour } from 'https://unpkg.com/ixfx/dist/visual.js'
 * const i = interpolator([`orange`, `yellow`, `red`]);
 *
 * // Get a random colour on the above spectrum
 * i(Math.random());
 * ```
 *
 * Results will vary depending on the colour space used, play with the options.
 * When using a hue-based colour space, the `hue` option sets the logic for how hue values wrap.
 *
 * ```js
 * interpolator([`orange`, `yellow`, `red`], { space: `hsl`, hue: `longer })
 * ```
 * @param colours Colours to interpolate between
 * @param opts Options for interpolation
 * @returns
 */
declare const interpolator: (colours: Array<Colourish>, opts?: Partial<ColourInterpolationOpts>) => (amt: number) => Color;
/**
 * Returns a CSS `linear-gradient` with stops corresponding to the given list of `colours`.
 * ```js
 * element.style.background = Colour.cssLinearGradient(['red','green','blue']);
 * ```
 * @param colours
 * @returns
 */
declare const cssLinearGradient: (colours: Array<Colourish>) => string;
/**
 * Produces a stepped scale of colours.
 *
 * Return result is an array of Color.js 'Colour' objects.
 * ```js
 * import { Colour } from 'ixfx/visual'
 * const steps = Colour.scale(['red','green'], 10);
 * for (const step of steps) {
 *  // Get a 'hsla(...)' string representation of colour
 *  // This can be used with the canvas, setting DOM properties etc.
 *  const css = Colour.toString(step);
 * }
 * ```
 *
 * {@link cssLinearGradient} can produce a smooth gradient in CSS on the basis
 * of the stepped colours.
 * @param colours
 * @param numberOfSteps
 * @param opts
 * @returns
 */
declare const scale: (colours: Array<Colourish>, numberOfSteps: number, opts?: Partial<ColourInterpolationOpts>) => Color[];

/**
 * Returns a variation of colour with its opacity multiplied by `amt`.
 * Value will be clamped to 0..1
 *
 * ```js
 * // Return a colour string for blue that is 50% opaque
 * multiplyOpacity(`blue`, 0.5);
 * // eg: `rgba(0,0,255,0.5)`
 *
 * // Returns a colour string that is 50% more opaque
 * multiplyOpacity(`hsla(200,100%,50%,50%`, 0.5);
 * // eg: `hsla(200,100%,50%,25%)`
 * ```
 *
 * [Named colours](https://html-color-codes.info/color-names/)
 * @param colour A valid CSS colour
 * @param amt Amount to multiply opacity by
 * @returns String representation of colour
 */
declare const multiplyOpacity: (colour: Colourish, amt: number) => string;
declare const multiplySaturation: (colour: Colourish, amt: number) => string;

declare const oklchToColorJs: (lch: OkLch) => ColorConstructor;
declare const isOklch: (p: Colourish) => p is OkLch;

declare const resolveCss: (colour: string, fallback?: string) => string;
/**
 * Gets a CSS variable.
 * ```
 * // Fetch --accent variable, or use `yellow` if not found.
 * getCssVariable(`accent`, `yellow`);
 * ```
 * @param name Name of variable. Leading '--' is unnecessary
 * @param fallbackColour Fallback colour if not found
 * @param root  Element to search variable from
 * @returns Colour or fallback.
 */
declare const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement) => string;

declare const structuredToColorJsConstructor: (colour: Colourish) => ColorConstructor;
declare const structuredToColorJs: (colour: Colourish) => Color;

declare const isRgb: (p: Colourish) => p is Rgb;
declare const rgbToColorJs: (rgb: Rgb) => ColorConstructor;
/**
 * Parses colour to `{ r, g, b }` where each field is on 0..1 scale.
 * `opacity` field is added if opacity is not 1.
 * [Named colours](https://html-color-codes.info/color-names/)
 * @param colour
 * @returns
 */
declare const toRgb: (colour: Colourish) => RgbRelative;
/**
 * Converts a relative RGB value to RGB & opacity values on 0.255 scale.
 * By default values are clamped so they don't exceed scale.
 * @param rgb
 * @param clamped
 * @returns
 */
declare const toRgb8bit: (rgb: Rgb, clamped?: boolean) => Rgb8Bit;
declare const toRgbRelative: (rgb: Rgb, clamped?: boolean) => RgbRelative;
/**
 * Ensures `rgb` uses 0..255 scale for r,g & b values.
 * If `rgb` is already in 8-bit scale (ie it has unit:'8bit')
 * it is returned.
 * @param rgb
 * @returns
 */
/**
 * Tries to parse an object in forms:
 * `{r,g,b}`, `{red,green,blue}`.
 * Uses 'opacity', 'space' and 'unit' fields where available.
 *
 * If 'units' is not specified, it tries to guess if it's relative (0..1) or
 * 8-bit (0..255).
 *
 * Normalises to an Rgb structure if it can, or returns an error.
 * @param p
 * @returns
 */
declare const parseRgbObject: (p: any) => Result<Rgb>;

/**
 * Returns a colour in hex format `#000000`.
 * ```js
 * canvas.fillStyle = Colour.toHex(`blue`);
 * canvas.fillStyle = Colour.toHex({ h:0.5, s:0.1, l:1 });
 * canvas.fillStyle = Colour.toHex({ r: 1, g: 0.3, b: 0 });
 * ```
 *
 * Input colour can be a human-friendly colour name ("blue"), a HSL
 * colour (eg. "hsl(0, 50%, 50%)")", an object {h,s,l} or {r,g,b}.
 * '#' is included in the return string.
 *
 * Transparent colour is returned as #00000000
 * @param colour
 * @returns Hex format, including #
 */
declare const toHex: (colour: Colourish) => string;
/**
 * Returns a colour in the best-possible CSS colour form.
 * The return value can be used setting colours in the canvas or DOM manipulations.
 * @param colour
 */
declare const toString: (colour: Colourish) => string;
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
declare const toStringFirst: (...colours: Array<Colourish | undefined>) => string;

declare const index$2_ColourInterpolationOpts: typeof ColourInterpolationOpts;
declare const index$2_Colourish: typeof Colourish;
declare const index$2_Hsl: typeof Hsl;
declare const index$2_HslAbsolute: typeof HslAbsolute;
declare const index$2_HslRelative: typeof HslRelative;
declare const index$2_OkLch: typeof OkLch;
declare const index$2_Rgb: typeof Rgb;
declare const index$2_Rgb8Bit: typeof Rgb8Bit;
declare const index$2_RgbBase: typeof RgbBase;
declare const index$2_RgbRelative: typeof RgbRelative;
declare const index$2_Spaces: typeof Spaces;
declare const index$2_cssLinearGradient: typeof cssLinearGradient;
declare const index$2_getCssVariable: typeof getCssVariable;
declare const index$2_goldenAngleColour: typeof goldenAngleColour;
declare const index$2_hslFromAbsoluteValues: typeof hslFromAbsoluteValues;
declare const index$2_hslFromRelativeValues: typeof hslFromRelativeValues;
declare const index$2_hslToAbsolute: typeof hslToAbsolute;
declare const index$2_hslToColorJs: typeof hslToColorJs;
declare const index$2_hslToRelative: typeof hslToRelative;
declare const index$2_hslToString: typeof hslToString;
declare const index$2_interpolator: typeof interpolator;
declare const index$2_isHsl: typeof isHsl;
declare const index$2_isOklch: typeof isOklch;
declare const index$2_isRgb: typeof isRgb;
declare const index$2_multiplyOpacity: typeof multiplyOpacity;
declare const index$2_multiplySaturation: typeof multiplySaturation;
declare const index$2_oklchToColorJs: typeof oklchToColorJs;
declare const index$2_parseRgbObject: typeof parseRgbObject;
declare const index$2_randomHue: typeof randomHue;
declare const index$2_resolveCss: typeof resolveCss;
declare const index$2_rgbToColorJs: typeof rgbToColorJs;
declare const index$2_scale: typeof scale;
declare const index$2_structuredToColorJs: typeof structuredToColorJs;
declare const index$2_structuredToColorJsConstructor: typeof structuredToColorJsConstructor;
declare const index$2_toHex: typeof toHex;
declare const index$2_toHsl: typeof toHsl;
declare const index$2_toRgb: typeof toRgb;
declare const index$2_toRgb8bit: typeof toRgb8bit;
declare const index$2_toRgbRelative: typeof toRgbRelative;
declare const index$2_toString: typeof toString;
declare const index$2_toStringFirst: typeof toStringFirst;
declare namespace index$2 {
  export { index$2_ColourInterpolationOpts as ColourInterpolationOpts, index$2_Colourish as Colourish, index$2_Hsl as Hsl, index$2_HslAbsolute as HslAbsolute, index$2_HslRelative as HslRelative, index$2_OkLch as OkLch, index$2_Rgb as Rgb, index$2_Rgb8Bit as Rgb8Bit, index$2_RgbBase as RgbBase, index$2_RgbRelative as RgbRelative, index$2_Spaces as Spaces, index$2_cssLinearGradient as cssLinearGradient, index$2_getCssVariable as getCssVariable, index$2_goldenAngleColour as goldenAngleColour, index$2_hslFromAbsoluteValues as hslFromAbsoluteValues, index$2_hslFromRelativeValues as hslFromRelativeValues, index$2_hslToAbsolute as hslToAbsolute, index$2_hslToColorJs as hslToColorJs, index$2_hslToRelative as hslToRelative, index$2_hslToString as hslToString, index$2_interpolator as interpolator, index$2_isHsl as isHsl, index$2_isOklch as isOklch, index$2_isRgb as isRgb, index$2_multiplyOpacity as multiplyOpacity, index$2_multiplySaturation as multiplySaturation, index$2_oklchToColorJs as oklchToColorJs, index$2_parseRgbObject as parseRgbObject, index$2_randomHue as randomHue, index$2_resolveCss as resolveCss, index$2_rgbToColorJs as rgbToColorJs, index$2_scale as scale, index$2_structuredToColorJs as structuredToColorJs, index$2_structuredToColorJsConstructor as structuredToColorJsConstructor, index$2_toHex as toHex, index$2_toHsl as toHsl, index$2_toRgb as toRgb, index$2_toRgb8bit as toRgb8bit, index$2_toRgbRelative as toRgbRelative, index$2_toString as toString, index$2_toStringFirst as toStringFirst };
}

type CanvasRegionSpecRelativePositioned = {
    relativePositioned: RectPositioned;
    scale?: `independent`;
};
type CanvasRegionSpecAbsolutePositioned = {
    absPositioned: RectPositioned;
};
type CanvasRegionSpecRelativeSized = {
    relativeSize: Rect;
    scale?: `independent`;
    /**
     * Cardinal directions, or 'center' (default)
     */
    position: `center` | `n` | `s`;
};
type CanvasRegionSpecMatched = {
    match: HTMLElement | string;
};
type CanvasRegionSpec = {
    marginPx?: number;
} & (CanvasRegionSpecAbsolutePositioned | CanvasRegionSpecRelativePositioned | CanvasRegionSpecRelativeSized | CanvasRegionSpecMatched);
declare class CanvasSource {
    #private;
    constructor(canvasElementOrQuery: HTMLCanvasElement | string, sizeBasis?: `min` | `max`);
    setLogicalSize(size: Rect): Rect;
    invalidateContext(): void;
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
    /**
     * Creates a region
     *
     * Absolute positioned. Uses source coordinates which don't change
     * ```js
     * source.createRegion({
     *  absPositioned: { x: 0, y: 0, width: 100, height: 100}
     * });
     * ```
     *
     * Relative positioned. Uses coordiantes relative to source dimensions.
     * Updated if source changes.
     * ```js
     * source.createRegion({
     *  relativePositioned: { x: 0, y:0, width: 1, height: 0.5 },
     *  scale: `independent`
     * });
     * ```
     *
     * Relative sized. Uses size relative to source dimension. By default centers.
     * ```js
     * source.createRegion({
     *  relativeSize: { width: 0.5, height: 0.5 }
     *  position: `center`
     * })
     * ```
     * @param spec
     * @returns
     */
    createRegion(spec: CanvasRegionSpec): CanvasRegion;
    clear(): void;
    get context(): CanvasRenderingContext2D;
    get sizeScaler(): {
        abs: NumberScaler;
        rel: NumberScaler;
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
    /**
     * Calls the original `regionCompute` function passed in to the constructor
     * to recompute the absolute region
     */
    recomputeRegion(): void;
    /**
     * Converts a region-relative point (0..1) to an absolute
     * point, which uses region-relative coordinates.
     *
     * Eg if the region had an x,y of 100,100, `toAbsRegion({x:0,y:0})`
     * will return 0,0.
     *
     * @param regionRel
     * @param scaleBy
     * @returns
     */
    toAbsRegion(regionRel: Point, scaleBy?: `both`): {
        x: number;
        y: number;
    };
    /**
     * Returns a copy of `p` offset by the region's x & y
     * @param p
     * @returns
     */
    applyRegionOffset(p: Point): {
        x: number;
        y: number;
    };
    /**
     * Draws a line from a series of points.
     * Assumes region-relative, % coordinates (ie 0..1 scale)
     * @param relativePoints Points to connect, in region-relative coordinates
     * @param strokeStyle Stroke style
     * @param lineWidth Line with
     */
    drawConnectedPointsRelative(relativePoints: Array<Point>, strokeStyle: string, lineWidth?: number): void;
    /**
     * Draws connected points in absolute coordinates,
     * however with 0,0 being the top-left of the region.
     *
     * Thus, this will apply the region offset before drawing.
     * @param points Points to draw
     * @param strokeStyle Stroke style
     * @param lineWidth Line width
     */
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
 * Manage a set of named colours. Uses CSS variables as a fallback if colour is not added
 *
 */
type NamedColourPalette = {
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
declare const create: (fallbacks?: ReadonlyArray<string>) => NamedColourPalette;

type NamedColourPalette$1_NamedColourPalette = NamedColourPalette;
declare const NamedColourPalette$1_create: typeof create;
declare namespace NamedColourPalette$1 {
  export { type NamedColourPalette$1_NamedColourPalette as NamedColourPalette, NamedColourPalette$1_create as create };
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

type InsertOptions = {
    region?: CanvasRegionSpec;
    /**
     * Parent to insert CANVAS element into.
     * If undefined, it will be added to the body.
     */
    parent?: HTMLElement | string;
    /**
     * How canvas should be sized
     */
    canvasResizeTo: `parent` | `viewport`;
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
  export { type index$1_AxisMark as AxisMark, index$1_CartesianCanvasPlot as CartesianCanvasPlot, type index$1_CartesianDataRange as CartesianDataRange, type index$1_CartesianPlotOptions as CartesianPlotOptions, type index$1_CartesianScaler as CartesianScaler, index$1_DataSet as DataSet, type index$1_GridStyle as GridStyle, type index$1_InsertOptions as InsertOptions, type index$1_LineStyle as LineStyle, type index$1_PlotPoint as PlotPoint, type index$1_PointMinMax as PointMinMax, type index$1_SeriesMeta as SeriesMeta, type index$1_ShowOptions as ShowOptions, type index$1_TextStyle as TextStyle, index$1_absoluteCompute as absoluteCompute, index$1_computeAxisMark as computeAxisMark, index$1_computeMinMax as computeMinMax, index$1_insert as insert, index$1_relativeCompute as relativeCompute };
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
type index_CanvasRegionSpec = CanvasRegionSpec;
type index_CanvasRegionSpecAbsolutePositioned = CanvasRegionSpecAbsolutePositioned;
type index_CanvasRegionSpecMatched = CanvasRegionSpecMatched;
type index_CanvasRegionSpecRelativePositioned = CanvasRegionSpecRelativePositioned;
type index_CanvasRegionSpecRelativeSized = CanvasRegionSpecRelativeSized;
type index_CanvasSource = CanvasSource;
declare const index_CanvasSource: typeof CanvasSource;
type index_CartesianCanvasPlot = CartesianCanvasPlot;
declare const index_CartesianCanvasPlot: typeof CartesianCanvasPlot;
declare const index_Drawing: typeof Drawing;
declare const index_ImageDataGrid: typeof ImageDataGrid;
type index_InsertOptions = InsertOptions;
declare const index_SceneGraph: typeof SceneGraph;
declare const index_Video: typeof Video;
declare const index_insert: typeof insert;
declare namespace index {
  export { BipolarView$1 as BipolarView, index_CanvasRegion as CanvasRegion, type index_CanvasRegionSpec as CanvasRegionSpec, type index_CanvasRegionSpecAbsolutePositioned as CanvasRegionSpecAbsolutePositioned, type index_CanvasRegionSpecMatched as CanvasRegionSpecMatched, type index_CanvasRegionSpecRelativePositioned as CanvasRegionSpecRelativePositioned, type index_CanvasRegionSpecRelativeSized as CanvasRegionSpecRelativeSized, index_CanvasSource as CanvasSource, index_CartesianCanvasPlot as CartesianCanvasPlot, index$2 as Colour, index_Drawing as Drawing, index_ImageDataGrid as ImageDataGrid, type index_InsertOptions as InsertOptions, NamedColourPalette$1 as NamedColourPalette, index$1 as Plot, index_SceneGraph as SceneGraph, index$3 as Svg, index_Video as Video, index_insert as insert };
}

export { BipolarView$1 as B, type CanvasRegionSpecRelativePositioned as C, ImageDataGrid as I, NamedColourPalette$1 as N, SceneGraph as S, index$1 as a, index$2 as b, type CanvasRegionSpecAbsolutePositioned as c, type CanvasRegionSpecRelativeSized as d, type CanvasRegionSpecMatched as e, type CanvasRegionSpec as f, CanvasSource as g, CanvasRegion as h, index as i, type InsertOptions as j, insert as k, CartesianCanvasPlot as l };
