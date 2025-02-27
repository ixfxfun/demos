type HslRelative = {
    h: number;
    s: number;
    l: number;
    opacity: number;
    space?: `hsl`;
    unit: `relative`;
};
type HslAbsolute = {
    h: number;
    s: number;
    l: number;
    opacity: number;
    space?: `hsl`;
    unit: `absolute`;
};
/**
 * HSL value.
 * By default assumes relative coordinates (0..1) for each field.
 * Use 'absolute' unit for hue:0...360, all other fields on 0..100 scale.
 */
type Hsl = HslRelative | HslAbsolute;
/**
 * Rgb.
 * Units determine how to interperet rgb values.
 * * 'relative': 0..1 range
 * * '8bit': 0..255 range for RGB & opacity
 */
type RgbBase = {
    r: number;
    g: number;
    b: number;
    opacity?: number;
    space?: `srgb`;
};
type RgbRelative = RgbBase & {
    unit: `relative`;
};
/**
 * RGB in 0...255 range, including opacity.
 */
type Rgb8Bit = RgbBase & {
    unit: `8bit`;
};
type Rgb = RgbRelative | Rgb8Bit;
type Spaces = `hsl` | `hsluv` | `rgb` | `srgb` | `lch` | `oklch` | `oklab` | `okhsl` | `p3` | `lab` | `hcl` | `cubehelix`;
type OkLch = {
    l: number;
    c: number;
    h: number;
    opacity: number;
    space: `oklch`;
};
/**
 * A representation of colour. Eg: `blue`, `rgb(255,0,0)`, `hsl(20,100%,50%)`
 */
type Colourish = Hsl | OkLch | Rgb | string;
/**
 * Options for interpolation
 */
type ColourInterpolationOpts = {
    space: Spaces;
    hue: `longer` | `shorter` | `increasing` | `decreasing` | `raw`;
};

export type { Colourish as C, Hsl as H, OkLch as O, Rgb8Bit as R, Spaces as S, Rgb as a, HslAbsolute as b, HslRelative as c, ColourInterpolationOpts as d, RgbRelative as e, RgbBase as f };
