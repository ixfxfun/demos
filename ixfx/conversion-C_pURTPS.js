import { numberInclusiveRangeTest$2 as numberInclusiveRangeTest, numberTest$2 as numberTest, resultThrow$2 as resultThrow } from "./numbers-Dp7VYKrL.js";

//#region ../node_modules/.pnpm/colorizr@3.0.7/node_modules/colorizr/dist/index.mjs
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name2 in all) __defProp(target, name2, {
		get: all[name2],
		enumerable: true
	});
};
function invariant(condition, message) {
	if (condition) return;
	if (message === void 0) throw new Error("invariant requires an error message argument");
	const error = !message ? new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.") : new Error(message);
	error.name = "colorizr";
	throw error;
}
var COLOR_KEYS = {
	hsl: [
		"h",
		"s",
		"l"
	],
	oklab: [
		"l",
		"a",
		"b"
	],
	oklch: [
		"l",
		"c",
		"h"
	],
	rgb: [
		"r",
		"g",
		"b"
	]
};
var COLOR_MODELS = [
	"hsl",
	"oklab",
	"oklch",
	"rgb"
];
var DEG2RAD = Math.PI / 180;
var LAB_TO_LMS = {
	l: [.3963377773761749, .2158037573099136],
	m: [-.1055613458156586, -.0638541728258133],
	s: [-.0894841775298119, -1.2914855480194092]
};
var LRGB_TO_LMS = {
	l: [
		.4122214708,
		.5363325363,
		.0514459929
	],
	m: [
		.2119034982,
		.6806995451,
		.1073969566
	],
	s: [
		.0883024619,
		.2817188376,
		.6299787005
	]
};
var LSM_TO_LAB = {
	l: [
		.2104542553,
		.793617785,
		.0040720468
	],
	a: [
		1.9779984951,
		2.428592205,
		.4505937099
	],
	b: [
		.0259040371,
		.7827717662,
		.808675766
	]
};
var LSM_TO_RGB = {
	r: [
		4.076741636075958,
		-3.307711539258063,
		.2309699031821043
	],
	g: [
		-1.2684379732850315,
		2.609757349287688,
		-.341319376002657
	],
	b: [
		-.0041960761386756,
		-.7034186179359362,
		1.7076146940746117
	]
};
var PRECISION = 5;
var RAD2DEG = 180 / Math.PI;
var MESSAGES = {
	alpha: "amount must be a number between 0 and 1",
	hueRange: "hue must be a number between 0 and 360",
	input: "input is required",
	inputHex: "input is required and must be a hex",
	inputNumber: "input is required and must be a number",
	inputString: "input is required and must be a string",
	invalid: "invalid input",
	invalidCSS: "invalid CSS string",
	left: "left is required and must be a string",
	lightnessRange: "lightness must be a number between 0 and 1",
	options: "invalid options",
	right: "right is required and must be a string",
	threshold: "threshold must be a number between 0 and 255"
};
function hasValidMatches(input) {
	return Array.isArray(input) && input.length === 6;
}
function isNumber(input) {
	return typeof input === "number" && !Number.isNaN(input);
}
function isPlainObject(input) {
	if (!input) return false;
	const { toString } = Object.prototype;
	const prototype = Object.getPrototypeOf(input);
	return toString.call(input) === "[object Object]" && (prototype === null || prototype === Object.getPrototypeOf({}));
}
function isString(input, validate = true) {
	const isValid = typeof input === "string";
	if (validate) return isValid && !!input.trim().length;
	return isValid;
}
function isHex(input) {
	if (!isString(input)) return false;
	return /^#([\da-f]{3,4}|[\da-f]{6,8})$/i.test(input);
}
function isHSL(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "h") return value >= 0 && value <= 360;
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.hsl.includes(key) && value >= 0 && value <= 100;
	});
}
function isLAB(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "l") return value >= 0 && value <= 100;
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.oklab.includes(key) && value >= -1 && value <= 1;
	});
}
function isLCH(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "l") return value >= 0 && value <= 100;
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.oklch.includes(key) && value >= 0 && value <= (key === "h" ? 360 : 1);
	});
}
function isRGB(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.rgb.includes(key) && value >= 0 && value <= 255;
	});
}
function clamp(value, min = 0, max = 100) {
	return Math.min(Math.max(value, min), max);
}
function limit(input, model, key) {
	invariant(isNumber(input), "Input is not a number");
	invariant(COLOR_MODELS.includes(model), `Invalid model${model ? `: ${model}` : ""}`);
	invariant(COLOR_KEYS[model].includes(key), `Invalid key${key ? `: ${key}` : ""}`);
	switch (model) {
		case "hsl": {
			invariant(COLOR_KEYS.hsl.includes(key), "Invalid key");
			if (["s", "l"].includes(key)) return clamp(input);
			return clamp(input, 0, 360);
		}
		case "rgb": {
			invariant(COLOR_KEYS.rgb.includes(key), "Invalid key");
			return clamp(input, 0, 255);
		}
		default: throw new Error("Invalid inputs");
	}
}
function parseInput(input, model) {
	const keys = COLOR_KEYS[model];
	const validator = {
		hsl: isHSL,
		oklab: isLAB,
		oklch: isLCH,
		rgb: isRGB
	};
	invariant(isPlainObject(input) || Array.isArray(input), MESSAGES.invalid);
	const value = Array.isArray(input) ? {
		[keys[0]]: input[0],
		[keys[1]]: input[1],
		[keys[2]]: input[2]
	} : input;
	invariant(validator[model](value), `invalid ${model} color`);
	return value;
}
function restrictValues(input, precision = PRECISION, forcePrecision = true) {
	const output = new Map(Object.entries(input));
	for (const [key, value] of output.entries()) output.set(key, round(value, precision, forcePrecision));
	return Object.fromEntries(output);
}
function round(input, precision = 2, forcePrecision = true) {
	if (!isNumber(input) || input === 0) return 0;
	if (forcePrecision) {
		const factor2 = 10 ** precision;
		return Math.round(input * factor2) / factor2;
	}
	const absInput = Math.abs(input);
	let digits = Math.abs(Math.ceil(Math.log(absInput) / Math.LN10));
	if (digits === 0) digits = 2;
	else if (digits > precision) digits = precision;
	let exponent = precision - (digits < 0 ? 0 : digits);
	if (exponent <= 1 && precision > 1) exponent = 2;
	else if (exponent > precision || exponent === 0) exponent = precision;
	const factor = 10 ** exponent;
	return Math.round(input * factor) / factor;
}
function extractAlphaFromHex(input) {
	invariant(isHex(input), MESSAGES.inputString);
	const alpha = input.substring(7, 9);
	if (!alpha) return 1;
	return round(parseInt(alpha, 16) / 255);
}
var converters_exports = {};
__export(converters_exports, {
	hex2hsl: () => hex2hsl,
	hex2oklab: () => hex2oklab,
	hex2oklch: () => hex2oklch,
	hex2rgb: () => hex2rgb,
	hsl2hex: () => hsl2hex,
	hsl2oklab: () => hsl2oklab,
	hsl2oklch: () => hsl2oklch,
	hsl2rgb: () => hsl2rgb,
	oklab2hex: () => oklab2hex,
	oklab2hsl: () => oklab2hsl,
	oklab2oklch: () => oklab2oklch,
	oklab2rgb: () => oklab2rgb,
	oklch2hex: () => oklch2hex,
	oklch2hsl: () => oklch2hsl,
	oklch2oklab: () => oklch2oklab,
	oklch2rgb: () => oklch2rgb,
	rgb2hex: () => rgb2hex,
	rgb2hsl: () => rgb2hsl,
	rgb2oklab: () => rgb2oklab,
	rgb2oklch: () => rgb2oklch
});
function formatHex(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	let color = input.replace("#", "");
	if (color.length === 3 || color.length === 4) {
		const values = [...color];
		color = "";
		values.forEach((d) => {
			color += `${d}${d}`;
		});
	}
	const hex = `#${color}`;
	invariant(isHex(hex), "invalid hex");
	return hex;
}
function hex2rgb(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	const hex = formatHex(input).slice(1);
	return {
		r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
		g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
		b: parseInt(hex.charAt(4) + hex.charAt(5), 16)
	};
}
function rgb2hsl(input) {
	const value = parseInput(input, "rgb");
	const rLimit = limit(value.r, "rgb", "r") / 255;
	const gLimit = limit(value.g, "rgb", "g") / 255;
	const bLimit = limit(value.b, "rgb", "b") / 255;
	const min = Math.min(rLimit, gLimit, bLimit);
	const max = Math.max(rLimit, gLimit, bLimit);
	const delta = max - min;
	let h = 0;
	let s;
	const l = (max + min) / 2;
	let rate;
	switch (max) {
		case rLimit:
			rate = !delta ? 0 : (gLimit - bLimit) / delta;
			h = 60 * rate;
			break;
		case gLimit:
			rate = (bLimit - rLimit) / delta;
			h = 60 * rate + 120;
			break;
		case bLimit:
			rate = (rLimit - gLimit) / delta;
			h = 60 * rate + 240;
			break;
		default: break;
	}
	if (h < 0) h = 360 + h;
	if (min === max) s = 0;
	else s = l < .5 ? delta / (2 * l) : delta / (2 - 2 * l);
	return {
		h: Math.abs(+(h % 360).toFixed(2)),
		s: +(s * 100).toFixed(2),
		l: +(l * 100).toFixed(2)
	};
}
function hex2hsl(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	return rgb2hsl(hex2rgb(input));
}
var { cbrt, sign } = Math;
function rgb2lrgb(input) {
	const abs2 = Math.abs(input);
	if (abs2 < .04045) return input / 12.92;
	return (sign(input) || 1) * ((abs2 + .055) / 1.055) ** 2.4;
}
function rgb2oklab(input, precision = PRECISION) {
	const value = parseInput(input, "rgb");
	const [lr, lg, lb] = [
		rgb2lrgb(value.r / 255),
		rgb2lrgb(value.g / 255),
		rgb2lrgb(value.b / 255)
	];
	const l = cbrt(LRGB_TO_LMS.l[0] * lr + LRGB_TO_LMS.l[1] * lg + LRGB_TO_LMS.l[2] * lb);
	const m = cbrt(LRGB_TO_LMS.m[0] * lr + LRGB_TO_LMS.m[1] * lg + LRGB_TO_LMS.m[2] * lb);
	const s = cbrt(LRGB_TO_LMS.s[0] * lr + LRGB_TO_LMS.s[1] * lg + LRGB_TO_LMS.s[2] * lb);
	const lab = {
		l: LSM_TO_LAB.l[0] * l + LSM_TO_LAB.l[1] * m - LSM_TO_LAB.l[2] * s,
		a: LSM_TO_LAB.a[0] * l - LSM_TO_LAB.a[1] * m + LSM_TO_LAB.a[2] * s,
		b: LSM_TO_LAB.b[0] * l + LSM_TO_LAB.b[1] * m - LSM_TO_LAB.b[2] * s
	};
	return restrictValues(lab, precision);
}
function hex2oklab(input, precision) {
	invariant(isHex(input), MESSAGES.inputHex);
	return rgb2oklab(hex2rgb(input), precision);
}
var { atan2, sqrt } = Math;
function oklab2oklch(input, precision) {
	const { l, a, b } = restrictValues(parseInput(input, "oklab"));
	const c = sqrt(a ** 2 + b ** 2);
	let h = (atan2(b, a) * RAD2DEG + 360) % 360;
	if (round(c * 1e4) === 0) h = 0;
	return restrictValues({
		l,
		c,
		h
	}, precision);
}
function rgb2oklch(input, precision) {
	const value = parseInput(input, "rgb");
	return oklab2oklch(rgb2oklab(value, precision), precision);
}
function hex2oklch(input, precision) {
	invariant(isHex(input), MESSAGES.inputHex);
	return rgb2oklch(hex2rgb(input), precision);
}
function hue2rgb(point, chroma2, h) {
	invariant(isNumber(point) && isNumber(chroma2) && isNumber(h), "point, chroma and h are required");
	let hue = h;
	if (hue < 0) hue += 1;
	if (hue > 1) hue -= 1;
	if (hue < 1 / 6) return round(point + (chroma2 - point) * 6 * hue, 4);
	if (hue < 1 / 2) return round(chroma2, 4);
	if (hue < 2 / 3) return round(point + (chroma2 - point) * (2 / 3 - hue) * 6, 4);
	return round(point, 4);
}
function hsl2rgb(input) {
	const value = parseInput(input, "hsl");
	const h = round(value.h) / 360;
	const s = round(value.s) / 100;
	const l = round(value.l) / 100;
	let r;
	let g;
	let b;
	let point;
	let chroma2;
	if (s === 0) {
		r = l;
		g = l;
		b = l;
	} else {
		chroma2 = l < .5 ? l * (1 + s) : l + s - l * s;
		point = 2 * l - chroma2;
		r = hue2rgb(point, chroma2, h + 1 / 3);
		g = hue2rgb(point, chroma2, h);
		b = hue2rgb(point, chroma2, h - 1 / 3);
	}
	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	};
}
function rgb2hex(input) {
	const rgb = parseInput(input, "rgb");
	return `#${Object.values(rgb).map((d) => `0${Math.floor(d).toString(16)}`.slice(-2)).join("")}`;
}
function hsl2hex(input) {
	const value = parseInput(input, "hsl");
	return rgb2hex(hsl2rgb(value));
}
function hsl2oklab(input, precision) {
	const value = parseInput(input, "hsl");
	return rgb2oklab(hsl2rgb(value), precision);
}
function hsl2oklch(input, precision) {
	const value = parseInput(input, "hsl");
	return rgb2oklch(hsl2rgb(value), precision);
}
var { abs } = Math;
function lrgb2rgb(input) {
	const absoluteNumber = abs(input);
	const sign2 = input < 0 ? -1 : 1;
	if (absoluteNumber > .0031308) return sign2 * (absoluteNumber ** (1 / 2.4) * 1.055 - .055);
	return input * 12.92;
}
function oklab2rgb(input, precision = 0) {
	const { l: L, a: A, b: B } = parseInput(input, "oklab");
	const l = (L + LAB_TO_LMS.l[0] * A + LAB_TO_LMS.l[1] * B) ** 3;
	const m = (L + LAB_TO_LMS.m[0] * A + LAB_TO_LMS.m[1] * B) ** 3;
	const s = (L + LAB_TO_LMS.s[0] * A + LAB_TO_LMS.s[1] * B) ** 3;
	const r = 255 * lrgb2rgb(LSM_TO_RGB.r[0] * l + LSM_TO_RGB.r[1] * m + LSM_TO_RGB.r[2] * s);
	const g = 255 * lrgb2rgb(LSM_TO_RGB.g[0] * l + LSM_TO_RGB.g[1] * m + LSM_TO_RGB.g[2] * s);
	const b = 255 * lrgb2rgb(LSM_TO_RGB.b[0] * l + LSM_TO_RGB.b[1] * m + LSM_TO_RGB.b[2] * s);
	return {
		r: clamp(round(r, precision), 0, 255),
		g: clamp(round(g, precision), 0, 255),
		b: clamp(round(b, precision), 0, 255)
	};
}
function oklab2hex(input) {
	const value = parseInput(input, "oklab");
	return rgb2hex(oklab2rgb(value));
}
function oklab2hsl(input) {
	const value = parseInput(input, "oklab");
	return rgb2hsl(oklab2rgb(value));
}
var { sin, cos } = Math;
function oklch2oklab(input, precision) {
	let { l, c, h } = parseInput(input, "oklch");
	if (Number.isNaN(h) || h < 0) h = 0;
	return restrictValues({
		l,
		a: c * cos(h * DEG2RAD),
		b: c * sin(h * DEG2RAD)
	}, precision);
}
function oklch2rgb(input, precision = 0) {
	const value = parseInput(input, "oklch");
	return oklab2rgb(oklch2oklab(value), precision);
}
function oklch2hex(input) {
	const value = parseInput(input, "oklch");
	return rgb2hex(oklch2rgb(value));
}
function oklch2hsl(input) {
	const value = parseInput(input, "oklch");
	return rgb2hsl(oklch2rgb(value));
}
function extractColorParts(input) {
	invariant(isString(input), MESSAGES.inputString);
	if (isHex(input)) {
		const keys2 = COLOR_KEYS.rgb;
		const { r, g, b } = hex2rgb(input);
		const alpha2 = extractAlphaFromHex(input);
		return {
			model: "rgb",
			[keys2[0]]: r,
			[keys2[1]]: g,
			[keys2[2]]: b,
			alpha: alpha2 < 1 ? alpha2 : void 0
		};
	}
	const colorRegex = /(?:(rgb|hsl|oklab|oklch)a?\s*\(\s*([\d%.-]+)\s*[ ,/]\s*([\d%.-]+)\s*[ ,/]\s*([\d%.-]+)(?:\s*[ ,/]\s*([\d%.-]+))?\s*\))/i;
	const matches = colorRegex.exec(input);
	invariant(hasValidMatches(matches), MESSAGES.invalidCSS);
	const model = matches[1];
	const keys = COLOR_KEYS[model];
	let alpha = matches[5] ? parseFloat(matches[5]) : 1;
	if (alpha > 1) alpha /= 100;
	return {
		model,
		[keys[0]]: parseFloat(matches[2]),
		[keys[1]]: parseFloat(matches[3]),
		[keys[2]]: parseFloat(matches[4]),
		alpha: alpha < 1 ? alpha : void 0
	};
}

//#endregion
//#region ../packages/visual/src/colour/srgb.ts
const withOpacity$1 = (value, fn) => {
	switch (value.unit) {
		case `8bit`: return {
			...value,
			opacity: fn((value.opacity ?? 255) / 255, value) * 255
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
};
const fromCss = (value) => {
	if (value.startsWith(`rgb`)) throw new Error(`Expecting CSS string in the form of 'rgb(...)'. Got: '${value}'`);
	const c = extractColorParts(value);
	if (c.model !== `rgb`) throw new Error(`Expecting RGB colour space. Got: ${c.model}`);
	return fromLibrary$1(c);
};
const toCss$1 = (rgb) => {
	guard$2(rgb);
	switch (rgb.unit) {
		case `8bit`: return `rgb(${rgb.r} ${rgb.b} ${rgb.g} / ${(rgb.opacity ?? 255) / 255})`;
		case `scalar`: return `rgb(${rgb.r * 100}% ${rgb.b * 100}% ${rgb.g * 100}% / ${(rgb.opacity ?? 1) * 100}%)`;
		default: throw new Error(`Unknown unit: ${rgb.unit}`);
	}
};
const toLibrary$1 = (rgb) => {
	const abs$1 = to8bit(rgb);
	return {
		r: abs$1.r,
		g: abs$1.g,
		b: abs$1.b,
		alpha: abs$1.opacity
	};
};
const fromLibrary$1 = (rgb) => {
	return {
		r: rgb.r,
		g: rgb.g,
		b: rgb.b,
		opacity: rgb.alpha ?? 255,
		unit: `8bit`,
		space: `srgb`
	};
};
const to8bit = (rgb) => {
	guard$2(rgb);
	if (rgb.unit === `8bit`) return rgb;
	return {
		r: rgb.r * 255,
		g: rgb.g * 255,
		b: rgb.b * 255,
		opacity: rgb.opacity ?? 255,
		unit: `8bit`,
		space: `srgb`
	};
};
const toScalar$1 = (rgb) => {
	guard$2(rgb);
	if (rgb.unit === `scalar`) return rgb;
	return {
		r: rgb.r / 255,
		g: rgb.g / 255,
		b: rgb.b / 255,
		opacity: (rgb.opacity ?? 1) / 255,
		unit: `scalar`,
		space: `srgb`
	};
};
const guard$2 = (rgb) => {
	const { r, g, b, opacity, space, unit } = rgb;
	if (space !== `srgb`) throw new Error(`Space is expected to be 'srgb'. Got: ${space}`);
	if (unit === `8bit`) resultThrow(numberInclusiveRangeTest(r, 0, 255, `r`), numberInclusiveRangeTest(g, 0, 255, `g`), numberInclusiveRangeTest(b, 0, 255, `b`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 255, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(r, `percentage`, `r`), numberTest(g, `percentage`, `g`), numberTest(b, `percentage`, `b`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be '8bit' or 'scalar'. Got: ${unit}`);
};
const SrgbSpace = {
	withOpacity: withOpacity$1,
	toCss: toCss$1,
	fromCss,
	toLibrary: toLibrary$1,
	fromLibrary: fromLibrary$1,
	guard: guard$2,
	toScalar: toScalar$1,
	to8bit
};

//#endregion
//#region ../packages/visual/src/colour/types.ts
const isHsl = (v) => {
	if (typeof v === `object`) {
		if (!(`h` in v && `s` in v && `l` in v)) return false;
		if (!(`unit` in v)) return false;
		if (`space` in v) {
			if (v.space !== `hsl`) return false;
		}
	}
	return false;
};
const isRgb = (v) => {
	if (typeof v === `object`) {
		if (!(`r` in v && `g` in v && `b` in v)) return false;
		if (!(`unit` in v)) return false;
		if (`space` in v) {
			if (v.space !== `srgb`) return false;
		}
	}
	return false;
};
const isLch = (v) => {
	if (typeof v === `object`) {
		if (!(`l` in v && `c` in v && `h` in v)) return false;
		if (!(`unit` in v)) return false;
		if (`space` in v) {
			if (v.space !== `lch` && v.space !== `oklch`) return false;
		}
	}
	return false;
};
const isColourish = (v) => {
	if (typeof v === `string`) return true;
	if (typeof v !== `object`) return false;
	if (isHsl(v)) return true;
	if (isLch(v)) return true;
	if (isRgb(v)) return true;
	return false;
};

//#endregion
//#region ../packages/visual/src/colour/hsl.ts
const withOpacity = (value, fn) => {
	switch (value.unit) {
		case `absolute`: return {
			...value,
			opacity: fn((value.opacity ?? 100) / 100, value) * 100
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
};
const fromCssAbsolute = (value, options = {}) => {
	if (value.startsWith(`hsl`)) if (options.fallbackString) value = options.fallbackString;
	else throw new Error(`Expecting CSS string in the form of 'hsl(...) or hsla(...)'. Got: '${value}'`);
	const c = extractColorParts(value);
	if (c.model !== `hsl`) {
		if (options.fallbackColour) return options.fallbackColour;
		throw new Error(`Expecting HSL colour space. Got: ${c.model}`);
	}
	return fromLibrary(c, options);
};
const fromCssScalar = (value, options = {}) => toScalar(fromCssAbsolute(value, options));
const toCss = (hsl) => {
	const abs$1 = toAbsolute(hsl);
	let css = `hsl(${abs$1.h}deg ${abs$1.s}% ${abs$1.l}%`;
	if (`opacity` in abs$1 && abs$1.opacity !== void 0) css += ` / ${abs$1.opacity / 100}`;
	css += ")";
	return css;
};
const toLibrary = (hsl) => {
	const abs$1 = toAbsolute(hsl);
	return {
		h: abs$1.h,
		s: abs$1.s,
		l: abs$1.l,
		alpha: abs$1.opacity
	};
};
const fromLibrary = (hsl, parsingOptions = {}) => {
	if (typeof hsl === `undefined` || hsl === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	resultThrow(numberInclusiveRangeTest(hsl.h, 0, 255, `h`), numberInclusiveRangeTest(hsl.s, 0, 255, `s`), numberInclusiveRangeTest(hsl.l, 0, 255, `l`), numberInclusiveRangeTest(hsl.alpha, 0, 100, `alpha`));
	return {
		h: hsl.h,
		s: hsl.s,
		l: hsl.l,
		opacity: hsl.alpha ?? 100,
		unit: `absolute`,
		space: `hsl`
	};
};
const toAbsolute = (hsl) => {
	guard$1(hsl);
	if (hsl.unit === `absolute`) return hsl;
	return {
		h: hsl.h * 360,
		s: hsl.s * 100,
		l: hsl.l * 100,
		opacity: hsl.opacity ?? 100,
		unit: `absolute`,
		space: `hsl`
	};
};
const toScalar = (hsl) => {
	guard$1(hsl);
	if (hsl.unit === `scalar`) return hsl;
	return {
		h: hsl.h / 360,
		s: hsl.s / 100,
		l: hsl.l / 100,
		opacity: (hsl.opacity ?? 1) / 100,
		unit: `scalar`,
		space: `hsl`
	};
};
const guard$1 = (hsl) => {
	const { h, s, l, opacity, space, unit } = hsl;
	if (space !== `hsl`) throw new Error(`Space is expected to be 'hsl'. Got: ${space}`);
	if (unit === `absolute`) resultThrow(numberTest(h, `finite`, `h`), numberInclusiveRangeTest(s, 0, 100, `s`), numberInclusiveRangeTest(l, 0, 100, `l`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 100, `s`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(h, `percentage`, `h`), numberTest(s, `percentage`, `s`), numberTest(l, `percentage`, `l`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
};
const HslSpace = {
	withOpacity,
	fromCssAbsolute,
	fromCssScalar,
	toCss,
	toLibrary,
	fromLibrary,
	guard: guard$1,
	toScalar,
	toAbsolute
};

//#endregion
//#region ../packages/visual/src/colour/css-colours.ts
const cssDefinedHexColours = {
	"aliceblue": "#f0f8ff",
	"antiquewhite": "#faebd7",
	"aqua": "#00ffff",
	"aquamarine": "#7fffd4",
	"azure": "#f0ffff",
	"beige": "#f5f5dc",
	"bisque": "#ffe4c4",
	"black": "#000000",
	"blanchedalmond": "#ffebcd",
	"blue": "#0000ff",
	"blueviolet": "#8a2be2",
	"brown": "#a52a2a",
	"burlywood": "#deb887",
	"cadetblue": "#5f9ea0",
	"chartreuse": "#7fff00",
	"chocolate": "#d2691e",
	"coral": "#ff7f50",
	"cornflowerblue": "#6495ed",
	"cornsilk": "#fff8dc",
	"crimson": "#dc143c",
	"cyan": "#00ffff",
	"darkblue": "#00008b",
	"darkcyan": "#008b8b",
	"darkgoldenrod": "#b8860b",
	"darkgray": "#a9a9a9",
	"darkgreen": "#006400",
	"darkkhaki": "#bdb76b",
	"darkmagenta": "#8b008b",
	"darkolivegreen": "#556b2f",
	"darkorange": "#ff8c00",
	"darkorchid": "#9932cc",
	"darkred": "#8b0000",
	"darksalmon": "#e9967a",
	"darkseagreen": "#8fbc8f",
	"darkslateblue": "#483d8b",
	"darkslategray": "#2f4f4f",
	"darkturquoise": "#00ced1",
	"darkviolet": "#9400d3",
	"deeppink": "#ff1493",
	"deepskyblue": "#00bfff",
	"dimgray": "#696969",
	"dodgerblue": "#1e90ff",
	"firebrick": "#b22222",
	"floralwhite": "#fffaf0",
	"forestgreen": "#228b22",
	"fuchsia": "#ff00ff",
	"gainsboro": "#dcdcdc",
	"ghostwhite": "#f8f8ff",
	"gold": "#ffd700",
	"goldenrod": "#daa520",
	"gray": "#808080",
	"green": "#008000",
	"greenyellow": "#adff2f",
	"honeydew": "#f0fff0",
	"hotpink": "#ff69b4",
	"indianred": "#cd5c5c",
	"indigo": "#4b0082",
	"ivory": "#fffff0",
	"khaki": "#f0e68c",
	"lavender": "#e6e6fa",
	"lavenderblush": "#fff0f5",
	"lawngreen": "#7cfc00",
	"lemonchiffon": "#fffacd",
	"lightblue": "#add8e6",
	"lightcoral": "#f08080",
	"lightcyan": "#e0ffff",
	"lightgoldenrodyellow": "#fafad2",
	"lightgray": "#d3d3d3",
	"lightgreen": "#90ee90",
	"lightpink": "#ffb6c1",
	"lightsalmon": "#ffa07a",
	"lightseagreen": "#20b2aa",
	"lightskyblue": "#87cefa",
	"lightslategray": "#778899",
	"lightsteelblue": "#b0c4de",
	"lightyellow": "#ffffe0",
	"lime": "#00ff00",
	"limegreen": "#32cd32",
	"linen": "#faf0e6",
	"magenta": "#ff00ff",
	"maroon": "#800000",
	"mediumaquamarine": "#66cdaa",
	"mediumblue": "#0000cd",
	"mediumorchid": "#ba55d3",
	"mediumpurple": "#9370db",
	"mediumseagreen": "#3cb371",
	"mediumslateblue": "#7b68ee",
	"mediumspringgreen": "#00fa9a",
	"mediumturquoise": "#48d1cc",
	"mediumvioletred": "#c71585",
	"midnightblue": "#191970",
	"mintcream": "#f5fffa",
	"mistyrose": "#ffe4e1",
	"moccasin": "#ffe4b5",
	"navajowhite": "#ffdead",
	"navy": "#000080",
	"oldlace": "#fdf5e6",
	"olive": "#808000",
	"olivedrab": "#6b8e23",
	"orange": "#ffa500",
	"orangered": "#ff4500",
	"orchid": "#da70d6",
	"palegoldenrod": "#eee8aa",
	"palegreen": "#98fb98",
	"paleturquoise": "#afeeee",
	"palevioletred": "#db7093",
	"papayawhip": "#ffefd5",
	"peachpuff": "#ffdab9",
	"peru": "#cd853f",
	"pink": "#ffc0cb",
	"plum": "#dda0dd",
	"powderblue": "#b0e0e6",
	"purple": "#800080",
	"rebeccapurple": "#663399",
	"red": "#ff0000",
	"rosybrown": "#bc8f8f",
	"royalblue": "#4169e1",
	"saddlebrown": "#8b4513",
	"salmon": "#fa8072",
	"sandybrown": "#f4a460",
	"seagreen": "#2e8b57",
	"seashell": "#fff5ee",
	"sienna": "#a0522d",
	"silver": "#c0c0c0",
	"skyblue": "#87ceeb",
	"slateblue": "#6a5acd",
	"slategray": "#708090",
	"snow": "#fffafa",
	"springgreen": "#00ff7f",
	"steelblue": "#4682b4",
	"tan": "#d2b48c",
	"teal": "#008080",
	"thistle": "#d8bfd8",
	"tomato": "#ff6347",
	"turquoise": "#40e0d0",
	"violet": "#ee82ee",
	"wheat": "#f5deb3",
	"white": "#ffffff",
	"whitesmoke": "#f5f5f5",
	"yellow": "#ffff00",
	"yellowgreen": "#9acd32"
};

//#endregion
//#region ../packages/visual/src/colour/conversion.ts
const hexStringToColour = (hexString) => {
	const rgb = hex2rgb(hexString);
	return SrgbSpace.fromLibrary(rgb);
};
const toCssColour = (colour) => {
	if (typeof colour === `string`) return colour;
	if (isHsl(colour)) return HslSpace.toCss(colour);
	if (isRgb(colour)) return SrgbSpace.toCss(colour);
	throw new Error(`Unknown colour format: '${JSON.stringify(colour)}'`);
};
const fromCssColour = (colour) => {
	if (colour.startsWith(`#`)) return hexStringToColour(colour);
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return hexStringToColour(cssDefinedHexColours[colour]);
	if (colour.startsWith(`--`)) {
		const fromCss$1 = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss$1.length === 0) throw new Error(`Variable missing: ${colour}`);
		if (fromCss$1.startsWith(`#`)) hexStringToColour(fromCss$1);
		if (fromCss$1.startsWith(`rgb`)) return SrgbSpace.fromCss(fromCss$1);
		if (fromCss$1.startsWith(`hsl`)) return HslSpace.fromCssScalar(fromCss$1);
		throw new Error(`CSS variable value not a hex, rgb or hsl colour function: '${fromCss$1}'`);
	}
	throw new Error(`String colour is not a hex colour nor well-defined colour name`);
};
const guard = (colour) => {
	switch (colour.space) {
		case `hsl`:
			HslSpace.guard(colour);
			break;
		case `srgb`:
			SrgbSpace.guard(colour);
			break;
		default: throw new Error(`Unknown colour space: '${colour.space}'`);
	}
};
const toColour = (colourish) => {
	if (!isColourish(colourish)) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc.`);
	let c;
	if (typeof colourish === `string`) c = fromCssColour(colourish);
	else c = colourish;
	if (c === void 0) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc.`);
	guard(c);
	return c;
};

//#endregion
export { HslSpace, SrgbSpace, extractColorParts, hex2rgb, toColour, toCssColour };
//# sourceMappingURL=conversion-C_pURTPS.js.map