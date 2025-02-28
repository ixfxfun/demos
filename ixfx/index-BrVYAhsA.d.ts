import { g as goldenAngleColour, r as randomHue } from './Generate-Bu82Jk21.js';
import { H as Hsl, C as Colourish, b as HslAbsolute, c as HslRelative, d as ColourInterpolationOpts, O as OkLch, a as Rgb, e as RgbRelative, R as Rgb8Bit, f as RgbBase, S as Spaces } from './Types-ZQdFqX9n.js';
import Color, { ColorConstructor } from 'colorjs.io';
import { R as Result } from './Results-ByWkmocN.js';

declare const hslToColorJs: (hsl: Hsl) => ColorConstructor;
declare const isHsl: (p: Colourish, validate?: boolean) => p is Hsl;
declare const hslToString: (hsl: Hsl) => string;
/**
 * Returns hue in 0..360, saturation, lightness in 0..100 scale.
 * Opacity is alwqys 0..1 scale
 * @param hsl
 * @param safe
 * @returns
 */
declare const hslToAbsolute: (hsl: Hsl, safe?: boolean) => HslAbsolute;
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
declare const interpolator: (colours: Array<Colourish>, opts?: Partial<ColourInterpolationOpts>) => (amt: number) => string;
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
 * ```js
 * const steps = Colour.scale([ `red`, `green` ], 10);
 * for (const step of steps) {
 *  // A CSS colour string
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
declare const scale: (colours: Array<Colourish>, numberOfSteps: number, opts?: Partial<ColourInterpolationOpts>) => Array<string>;

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

declare const isRgb: (p: Colourish, validate?: boolean) => p is Rgb;
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

declare const index_ColourInterpolationOpts: typeof ColourInterpolationOpts;
declare const index_Colourish: typeof Colourish;
declare const index_Hsl: typeof Hsl;
declare const index_HslAbsolute: typeof HslAbsolute;
declare const index_HslRelative: typeof HslRelative;
declare const index_OkLch: typeof OkLch;
declare const index_Rgb: typeof Rgb;
declare const index_Rgb8Bit: typeof Rgb8Bit;
declare const index_RgbBase: typeof RgbBase;
declare const index_RgbRelative: typeof RgbRelative;
declare const index_Spaces: typeof Spaces;
declare const index_cssLinearGradient: typeof cssLinearGradient;
declare const index_getCssVariable: typeof getCssVariable;
declare const index_goldenAngleColour: typeof goldenAngleColour;
declare const index_hslFromAbsoluteValues: typeof hslFromAbsoluteValues;
declare const index_hslFromRelativeValues: typeof hslFromRelativeValues;
declare const index_hslToAbsolute: typeof hslToAbsolute;
declare const index_hslToColorJs: typeof hslToColorJs;
declare const index_hslToRelative: typeof hslToRelative;
declare const index_hslToString: typeof hslToString;
declare const index_interpolator: typeof interpolator;
declare const index_isHsl: typeof isHsl;
declare const index_isOklch: typeof isOklch;
declare const index_isRgb: typeof isRgb;
declare const index_multiplyOpacity: typeof multiplyOpacity;
declare const index_multiplySaturation: typeof multiplySaturation;
declare const index_oklchToColorJs: typeof oklchToColorJs;
declare const index_parseRgbObject: typeof parseRgbObject;
declare const index_randomHue: typeof randomHue;
declare const index_resolveCss: typeof resolveCss;
declare const index_rgbToColorJs: typeof rgbToColorJs;
declare const index_scale: typeof scale;
declare const index_structuredToColorJs: typeof structuredToColorJs;
declare const index_structuredToColorJsConstructor: typeof structuredToColorJsConstructor;
declare const index_toHex: typeof toHex;
declare const index_toHsl: typeof toHsl;
declare const index_toRgb: typeof toRgb;
declare const index_toRgb8bit: typeof toRgb8bit;
declare const index_toRgbRelative: typeof toRgbRelative;
declare const index_toString: typeof toString;
declare const index_toStringFirst: typeof toStringFirst;
declare namespace index {
  export { index_ColourInterpolationOpts as ColourInterpolationOpts, index_Colourish as Colourish, index_Hsl as Hsl, index_HslAbsolute as HslAbsolute, index_HslRelative as HslRelative, index_OkLch as OkLch, index_Rgb as Rgb, index_Rgb8Bit as Rgb8Bit, index_RgbBase as RgbBase, index_RgbRelative as RgbRelative, index_Spaces as Spaces, index_cssLinearGradient as cssLinearGradient, index_getCssVariable as getCssVariable, index_goldenAngleColour as goldenAngleColour, index_hslFromAbsoluteValues as hslFromAbsoluteValues, index_hslFromRelativeValues as hslFromRelativeValues, index_hslToAbsolute as hslToAbsolute, index_hslToColorJs as hslToColorJs, index_hslToRelative as hslToRelative, index_hslToString as hslToString, index_interpolator as interpolator, index_isHsl as isHsl, index_isOklch as isOklch, index_isRgb as isRgb, index_multiplyOpacity as multiplyOpacity, index_multiplySaturation as multiplySaturation, index_oklchToColorJs as oklchToColorJs, index_parseRgbObject as parseRgbObject, index_randomHue as randomHue, index_resolveCss as resolveCss, index_rgbToColorJs as rgbToColorJs, index_scale as scale, index_structuredToColorJs as structuredToColorJs, index_structuredToColorJsConstructor as structuredToColorJsConstructor, index_toHex as toHex, index_toHsl as toHsl, index_toRgb as toRgb, index_toRgb8bit as toRgb8bit, index_toRgbRelative as toRgbRelative, index_toString as toString, index_toStringFirst as toStringFirst };
}

export { toHex as A, toString as B, toStringFirst as C, isHsl as a, hslToString as b, hslToAbsolute as c, hslFromRelativeValues as d, hslFromAbsoluteValues as e, hslToRelative as f, interpolator as g, hslToColorJs as h, index as i, cssLinearGradient as j, multiplySaturation as k, isOklch as l, multiplyOpacity as m, getCssVariable as n, oklchToColorJs as o, structuredToColorJsConstructor as p, structuredToColorJs as q, resolveCss as r, scale as s, toHsl as t, isRgb as u, rgbToColorJs as v, toRgb as w, toRgb8bit as x, toRgbRelative as y, parseRgbObject as z };
