import { __export } from "./chunk-Cl8Af3a2.js";

//#region src/lib/colorjs.js
var colorjs_exports = {};
__export(colorjs_exports, { default: () => Kr });
/**
* Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
* Original file: /npm/colorjs.io@0.5.2/dist/color.js
*
* Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
*/
function e(e$1, t$1) {
	let r$1 = e$1.length;
	Array.isArray(e$1[0]) || (e$1 = [e$1]), Array.isArray(t$1[0]) || (t$1 = t$1.map((e$2) => [e$2]));
	let a$1 = t$1[0].length, n$1 = t$1[0].map((e$2, r$2) => t$1.map((e$3) => e$3[r$2])), o$1 = e$1.map((e$2) => n$1.map((t$2) => {
		let r$2 = 0;
		if (!Array.isArray(e$2)) {
			for (let a$2 of t$2) r$2 += e$2 * a$2;
			return r$2;
		}
		for (let a$2 = 0; a$2 < e$2.length; a$2++) r$2 += e$2[a$2] * (t$2[a$2] || 0);
		return r$2;
	}));
	return 1 === r$1 && (o$1 = o$1[0]), 1 === a$1 ? o$1.map((e$2) => e$2[0]) : o$1;
}
function t(e$1) {
	return "string" === r(e$1);
}
function r(e$1) {
	return (/^\[object\s+(.*?)\]$/.exec(Object.prototype.toString.call(e$1))[1] || "").toLowerCase();
}
function a(e$1, { precision: t$1, unit: r$1 }) {
	return n(e$1) ? "none" : s(e$1, t$1) + (r$1 ?? "");
}
function n(e$1) {
	return Number.isNaN(e$1) || e$1 instanceof Number && e$1.none;
}
function o(e$1) {
	return n(e$1) ? 0 : e$1;
}
function s(e$1, t$1) {
	if (0 === e$1) return 0;
	let r$1 = ~~e$1, a$1 = 0;
	r$1 && t$1 && (a$1 = 1 + ~~Math.log10(Math.abs(r$1)));
	const n$1 = 10 ** (t$1 - a$1);
	return Math.floor(e$1 * n$1 + .5) / n$1;
}
const index = {
	deg: 1,
	grad: .9,
	rad: 180 / Math.PI,
	turn: 360
};
function c(e$1) {
	if (!e$1) return;
	e$1 = e$1.trim();
	const t$1 = /^-?[\d.]+$/, r$1 = /%|deg|g?rad|turn$/, a$1 = /\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;
	let n$1 = e$1.match(/^([a-z]+)\((.+?)\)$/i);
	if (n$1) {
		let e$2 = [];
		return n$1[2].replace(a$1, (a$2, n$2) => {
			let o$1 = n$2.match(r$1), s$1 = n$2;
			if (o$1) {
				let e$3 = o$1[0], t$2 = s$1.slice(0, -e$3.length);
				"%" === e$3 ? (s$1 = new Number(t$2 / 100), s$1.type = "<percentage>") : (s$1 = new Number(t$2 * index[e$3]), s$1.type = "<angle>", s$1.unit = e$3);
			} else t$1.test(s$1) ? (s$1 = new Number(s$1), s$1.type = "<number>") : "none" === s$1 && (s$1 = new Number(NaN), s$1.none = !0);
			a$2.startsWith("/") && (s$1 = s$1 instanceof Number ? s$1 : new Number(s$1), s$1.alpha = !0), "object" == typeof s$1 && s$1 instanceof Number && (s$1.raw = n$2), e$2.push(s$1);
		}), {
			name: n$1[1].toLowerCase(),
			rawName: n$1[1],
			rawArgs: n$1[2],
			args: e$2
		};
	}
}
function l(e$1) {
	return e$1[e$1.length - 1];
}
function u(e$1, t$1, r$1) {
	return isNaN(e$1) ? t$1 : isNaN(t$1) ? e$1 : e$1 + (t$1 - e$1) * r$1;
}
function h(e$1, t$1, r$1) {
	return (r$1 - e$1) / (t$1 - e$1);
}
function d(e$1, t$1, r$1) {
	return u(t$1[0], t$1[1], h(e$1[0], e$1[1], r$1));
}
function m(e$1) {
	return e$1.map((e$2) => e$2.split("|").map((e$3) => {
		let t$1 = (e$3 = e$3.trim()).match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
		if (t$1) {
			let e$4 = new String(t$1[1]);
			return e$4.range = [+t$1[2], +t$1[3]], e$4;
		}
		return e$3;
	}));
}
function f(e$1, t$1, r$1) {
	return Math.max(Math.min(r$1, t$1), e$1);
}
function p(e$1, t$1) {
	return Math.sign(e$1) === Math.sign(t$1) ? e$1 : -e$1;
}
function g(e$1, t$1) {
	return p(Math.abs(e$1) ** t$1, e$1);
}
function b(e$1, t$1) {
	return 0 === t$1 ? 0 : e$1 / t$1;
}
function M(e$1, t$1, r$1 = 0, a$1 = e$1.length) {
	for (; r$1 < a$1;) {
		const n$1 = r$1 + a$1 >> 1;
		e$1[n$1] < t$1 ? r$1 = n$1 + 1 : a$1 = n$1;
	}
	return r$1;
}
var w = Object.freeze({
	__proto__: null,
	bisectLeft: M,
	clamp: f,
	copySign: p,
	interpolate: u,
	interpolateInv: h,
	isNone: n,
	isString: t,
	last: l,
	mapRange: d,
	multiplyMatrices: e,
	parseCoordGrammar: m,
	parseFunction: c,
	serializeNumber: a,
	skipNone: o,
	spow: g,
	toPrecision: s,
	type: r,
	zdiv: b
});
const y = new class {
	add(e$1, t$1, r$1) {
		if ("string" == typeof arguments[0]) (Array.isArray(e$1) ? e$1 : [e$1]).forEach(function(e$2) {
			this[e$2] = this[e$2] || [], t$1 && this[e$2][r$1 ? "unshift" : "push"](t$1);
		}, this);
		else for (var e$1 in arguments[0]) this.add(e$1, arguments[0][e$1], arguments[1]);
	}
	run(e$1, t$1) {
		this[e$1] = this[e$1] || [], this[e$1].forEach(function(e$2) {
			e$2.call(t$1?.context ? t$1.context : t$1, t$1);
		});
	}
}();
var v = {
	gamut_mapping: "css",
	precision: 5,
	deltaE: "76",
	verbose: "test" !== globalThis.process.env.NODE_ENV?.toLowerCase(),
	warn: function(e$1) {
		this.verbose && globalThis.console.warn(e$1);
	}
};
const C = {
	D50: [
		.3457 / .3585,
		1,
		.2958 / .3585
	],
	D65: [
		.3127 / .329,
		1,
		.3583 / .329
	]
};
function R(e$1) {
	return Array.isArray(e$1) ? e$1 : C[e$1];
}
function _(t$1, r$1, a$1, n$1 = {}) {
	if (t$1 = R(t$1), r$1 = R(r$1), !t$1 || !r$1) throw new TypeError(`Missing white point to convert ${t$1 ? "" : "from"}${t$1 || r$1 ? "" : "/"}${r$1 ? "" : "to"}`);
	if (t$1 === r$1) return a$1;
	let o$1 = {
		W1: t$1,
		W2: r$1,
		XYZ: a$1,
		options: n$1
	};
	if (y.run("chromatic-adaptation-start", o$1), o$1.M || (o$1.W1 === C.D65 && o$1.W2 === C.D50 ? o$1.M = [
		[
			1.0479297925449969,
			.022946870601609652,
			-.05019226628920524
		],
		[
			.02962780877005599,
			.9904344267538799,
			-.017073799063418826
		],
		[
			-.009243040646204504,
			.015055191490298152,
			.7518742814281371
		]
	] : o$1.W1 === C.D50 && o$1.W2 === C.D65 && (o$1.M = [
		[
			.955473421488075,
			-.02309845494876471,
			.06325924320057072
		],
		[
			-.0283697093338637,
			1.0099953980813041,
			.021041441191917323
		],
		[
			.012314014864481998,
			-.020507649298898964,
			1.330365926242124
		]
	])), y.run("chromatic-adaptation-end", o$1), o$1.M) return e(o$1.M, o$1.XYZ);
	throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
}
const B = new Set([
	"<number>",
	"<percentage>",
	"<angle>"
]);
function N(e$1, t$1, r$1, a$1) {
	let n$1 = Object.entries(e$1.coords).map(([e$2, n$2], o$1) => {
		let s$1, index$1 = t$1.coordGrammar[o$1], c$1 = a$1[o$1], l$1 = c$1?.type;
		if (s$1 = c$1.none ? index$1.find((e$3) => B.has(e$3)) : index$1.find((e$3) => e$3 == l$1), !s$1) {
			let t$2 = n$2.name || e$2;
			throw new TypeError(`${l$1 ?? c$1.raw} not allowed for ${t$2} in ${r$1}()`);
		}
		let u$1 = s$1.range;
		"<percentage>" === l$1 && (u$1 ||= [0, 1]);
		let h$1 = n$2.range || n$2.refRange;
		return u$1 && h$1 && (a$1[o$1] = d(u$1, h$1, a$1[o$1])), s$1;
	});
	return n$1;
}
function k(e$1, { meta: t$1 } = {}) {
	let r$1 = { str: String(e$1).trim() };
	if (y.run("parse-start", r$1), r$1.color) return r$1.color;
	if (r$1.parsed = c(r$1.str), r$1.parsed) {
		let e$2 = r$1.parsed.name;
		if ("color" === e$2) {
			let e$3 = r$1.parsed.args.shift(), a$1 = e$3.startsWith("--") ? e$3.substring(2) : `--${e$3}`, n$1 = [e$3, a$1], o$1 = r$1.parsed.rawArgs.indexOf("/") > 0 ? r$1.parsed.args.pop() : 1;
			for (let a$2 of S.all) {
				let s$2 = a$2.getFormat("color");
				if (s$2 && (n$1.includes(s$2.id) || s$2.ids?.filter((e$4) => n$1.includes(e$4)).length)) {
					const n$2 = Object.keys(a$2.coords).map((e$4, t$2) => r$1.parsed.args[t$2] || 0);
					let index$2;
					return s$2.coordGrammar && (index$2 = N(a$2, s$2, "color", n$2)), t$1 && Object.assign(t$1, {
						formatId: "color",
						types: index$2
					}), s$2.id.startsWith("--") && !e$3.startsWith("--") && v.warn(`${a$2.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${s$2.id}) instead of color(${e$3}).`), e$3.startsWith("--") && !s$2.id.startsWith("--") && v.warn(`${a$2.name} is a standard space and supported in the CSS spec. Use color(${s$2.id}) instead of prefixed color(${e$3}).`), {
						spaceId: a$2.id,
						coords: n$2,
						alpha: o$1
					};
				}
			}
			let s$1 = "", index$1 = e$3 in S.registry ? e$3 : a$1;
			if (index$1 in S.registry) {
				let e$4 = S.registry[index$1].formats?.color?.id;
				e$4 && (s$1 = `Did you mean color(${e$4})?`);
			}
			throw new TypeError(`Cannot parse color(${e$3}). ` + (s$1 || "Missing a plugin?"));
		}
		for (let a$1 of S.all) {
			let n$1 = a$1.getFormat(e$2);
			if (n$1 && "function" === n$1.type) {
				let o$1 = 1;
				(n$1.lastAlpha || l(r$1.parsed.args).alpha) && (o$1 = r$1.parsed.args.pop());
				let s$1, index$1 = r$1.parsed.args;
				return n$1.coordGrammar && (s$1 = N(a$1, n$1, e$2, index$1)), t$1 && Object.assign(t$1, {
					formatId: n$1.name,
					types: s$1
				}), {
					spaceId: a$1.id,
					coords: index$1,
					alpha: o$1
				};
			}
		}
	} else for (let e$2 of S.all) for (let a$1 in e$2.formats) {
		let n$1 = e$2.formats[a$1];
		if ("custom" !== n$1.type) continue;
		if (n$1.test && !n$1.test(r$1.str)) continue;
		let o$1 = n$1.parse(r$1.str);
		if (o$1) return o$1.alpha ??= 1, t$1 && (t$1.formatId = a$1), o$1;
	}
	throw new TypeError(`Could not parse ${e$1} as a color. Missing a plugin?`);
}
function x(e$1) {
	if (Array.isArray(e$1)) return e$1.map(x);
	if (!e$1) throw new TypeError("Empty color reference");
	t(e$1) && (e$1 = k(e$1));
	let r$1 = e$1.space || e$1.spaceId;
	return r$1 instanceof S || (e$1.space = S.get(r$1)), void 0 === e$1.alpha && (e$1.alpha = 1), e$1;
}
var S = class S {
	constructor(e$1) {
		this.id = e$1.id, this.name = e$1.name, this.base = e$1.base ? S.get(e$1.base) : null, this.aliases = e$1.aliases, this.base && (this.fromBase = e$1.fromBase, this.toBase = e$1.toBase);
		let t$1 = e$1.coords ?? this.base.coords;
		for (let e$2 in t$1) "name" in t$1[e$2] || (t$1[e$2].name = e$2);
		this.coords = t$1;
		let r$1 = e$1.white ?? this.base.white ?? "D65";
		this.white = R(r$1), this.formats = e$1.formats ?? {};
		for (let e$2 in this.formats) {
			let t$2 = this.formats[e$2];
			t$2.type ||= "function", t$2.name ||= e$2;
		}
		this.formats.color?.id || (this.formats.color = {
			...this.formats.color ?? {},
			id: e$1.cssId || this.id
		}), e$1.gamutSpace ? this.gamutSpace = "self" === e$1.gamutSpace ? this : S.get(e$1.gamutSpace) : this.isPolar ? this.gamutSpace = this.base : this.gamutSpace = this, this.gamutSpace.isUnbounded && (this.inGamut = (e$2, t$2) => !0), this.referred = e$1.referred, Object.defineProperty(this, "path", {
			value: E(this).reverse(),
			writable: !1,
			enumerable: !0,
			configurable: !0
		}), y.run("colorspace-init-end", this);
	}
	inGamut(e$1, { epsilon: t$1 = 75e-6 } = {}) {
		if (!this.equals(this.gamutSpace)) return e$1 = this.to(this.gamutSpace, e$1), this.gamutSpace.inGamut(e$1, { epsilon: t$1 });
		let r$1 = Object.values(this.coords);
		return e$1.every((e$2, a$1) => {
			let n$1 = r$1[a$1];
			if ("angle" !== n$1.type && n$1.range) {
				if (Number.isNaN(e$2)) return !0;
				let [r$2, a$2] = n$1.range;
				return (void 0 === r$2 || e$2 >= r$2 - t$1) && (void 0 === a$2 || e$2 <= a$2 + t$1);
			}
			return !0;
		});
	}
	get isUnbounded() {
		return Object.values(this.coords).every((e$1) => !("range" in e$1));
	}
	get cssId() {
		return this.formats?.color?.id || this.id;
	}
	get isPolar() {
		for (let e$1 in this.coords) if ("angle" === this.coords[e$1].type) return !0;
		return !1;
	}
	getFormat(e$1) {
		if ("object" == typeof e$1) return e$1 = I(e$1, this);
		let t$1;
		return t$1 = "default" === e$1 ? Object.values(this.formats)[0] : this.formats[e$1], t$1 ? (t$1 = I(t$1, this), t$1) : null;
	}
	equals(e$1) {
		return !!e$1 && (this === e$1 || this.id === e$1 || this.id === e$1.id);
	}
	to(e$1, t$1) {
		if (1 === arguments.length) {
			const r$2 = x(e$1);
			[e$1, t$1] = [r$2.space, r$2.coords];
		}
		if (e$1 = S.get(e$1), this.equals(e$1)) return t$1;
		t$1 = t$1.map((e$2) => Number.isNaN(e$2) ? 0 : e$2);
		let r$1, a$1, n$1 = this.path, o$1 = e$1.path;
		for (let e$2 = 0; e$2 < n$1.length && n$1[e$2].equals(o$1[e$2]); e$2++) r$1 = n$1[e$2], a$1 = e$2;
		if (!r$1) throw new Error(`Cannot convert between color spaces ${this} and ${e$1}: no connection space was found`);
		for (let e$2 = n$1.length - 1; e$2 > a$1; e$2--) t$1 = n$1[e$2].toBase(t$1);
		for (let e$2 = a$1 + 1; e$2 < o$1.length; e$2++) t$1 = o$1[e$2].fromBase(t$1);
		return t$1;
	}
	from(e$1, t$1) {
		if (1 === arguments.length) {
			const r$1 = x(e$1);
			[e$1, t$1] = [r$1.space, r$1.coords];
		}
		return (e$1 = S.get(e$1)).to(this, t$1);
	}
	toString() {
		return `${this.name} (${this.id})`;
	}
	getMinCoords() {
		let e$1 = [];
		for (let t$1 in this.coords) {
			let r$1 = this.coords[t$1], a$1 = r$1.range || r$1.refRange;
			e$1.push(a$1?.min ?? 0);
		}
		return e$1;
	}
	static registry = {};
	static get all() {
		return [...new Set(Object.values(S.registry))];
	}
	static register(e$1, t$1) {
		if (1 === arguments.length && (e$1 = (t$1 = arguments[0]).id), t$1 = this.get(t$1), this.registry[e$1] && this.registry[e$1] !== t$1) throw new Error(`Duplicate color space registration: '${e$1}'`);
		if (this.registry[e$1] = t$1, 1 === arguments.length && t$1.aliases) for (let e$2 of t$1.aliases) this.register(e$2, t$1);
		return t$1;
	}
	static get(e$1, ...t$1) {
		if (!e$1 || e$1 instanceof S) return e$1;
		if ("string" === r(e$1)) {
			let t$2 = S.registry[e$1.toLowerCase()];
			if (!t$2) throw new TypeError(`No color space found with id = "${e$1}"`);
			return t$2;
		}
		if (t$1.length) return S.get(...t$1);
		throw new TypeError(`${e$1} is not a valid color space`);
	}
	static resolveCoord(e$1, t$1) {
		let a$1, n$1, o$1 = r(e$1);
		if ("string" === o$1 ? e$1.includes(".") ? [a$1, n$1] = e$1.split(".") : [a$1, n$1] = [, e$1] : Array.isArray(e$1) ? [a$1, n$1] = e$1 : (a$1 = e$1.space, n$1 = e$1.coordId), a$1 = S.get(a$1), a$1 || (a$1 = t$1), !a$1) throw new TypeError(`Cannot resolve coordinate reference ${e$1}: No color space specified and relative references are not allowed here`);
		if (o$1 = r(n$1), "number" === o$1 || "string" === o$1 && n$1 >= 0) {
			let e$2 = Object.entries(a$1.coords)[n$1];
			if (e$2) return {
				space: a$1,
				id: e$2[0],
				index: n$1,
				...e$2[1]
			};
		}
		a$1 = S.get(a$1);
		let s$1 = n$1.toLowerCase(), index$1 = 0;
		for (let e$2 in a$1.coords) {
			let t$2 = a$1.coords[e$2];
			if (e$2.toLowerCase() === s$1 || t$2.name?.toLowerCase() === s$1) return {
				space: a$1,
				id: e$2,
				index: index$1,
				...t$2
			};
			index$1++;
		}
		throw new TypeError(`No "${n$1}" coordinate found in ${a$1.name}. Its coordinates are: ${Object.keys(a$1.coords).join(", ")}`);
	}
	static DEFAULT_FORMAT = {
		type: "functions",
		name: "color"
	};
};
function E(e$1) {
	let t$1 = [e$1];
	for (let r$1 = e$1; r$1 = r$1.base;) t$1.push(r$1);
	return t$1;
}
function I(e$1, { coords: t$1 } = {}) {
	if (e$1.coords && !e$1.coordGrammar) {
		e$1.type ||= "function", e$1.name ||= "color", e$1.coordGrammar = m(e$1.coords);
		let r$1 = Object.entries(t$1).map(([t$2, r$2], a$1) => {
			let n$1 = e$1.coordGrammar[a$1][0], o$1 = r$2.range || r$2.refRange, s$1 = n$1.range, index$1 = "";
			return "<percentage>" == n$1 ? (s$1 = [0, 100], index$1 = "%") : "<angle>" == n$1 && (index$1 = "deg"), {
				fromRange: o$1,
				toRange: s$1,
				suffix: index$1
			};
		});
		e$1.serializeCoords = (e$2, t$2) => e$2.map((e$3, n$1) => {
			let { fromRange: o$1, toRange: s$1, suffix: index$1 } = r$1[n$1];
			return o$1 && s$1 && (e$3 = d(o$1, s$1, e$3)), e$3 = a(e$3, {
				precision: t$2,
				unit: index$1
			});
		});
	}
	return e$1;
}
var L = new S({
	id: "xyz-d65",
	name: "XYZ D65",
	coords: {
		x: { name: "X" },
		y: { name: "Y" },
		z: { name: "Z" }
	},
	white: "D65",
	formats: { color: { ids: ["xyz-d65", "xyz"] } },
	aliases: ["xyz"]
});
var z = class extends S {
	constructor(t$1) {
		t$1.coords || (t$1.coords = {
			r: {
				range: [0, 1],
				name: "Red"
			},
			g: {
				range: [0, 1],
				name: "Green"
			},
			b: {
				range: [0, 1],
				name: "Blue"
			}
		}), t$1.base || (t$1.base = L), t$1.toXYZ_M && t$1.fromXYZ_M && (t$1.toBase ??= (r$1) => {
			let a$1 = e(t$1.toXYZ_M, r$1);
			return this.white !== this.base.white && (a$1 = _(this.white, this.base.white, a$1)), a$1;
		}, t$1.fromBase ??= (r$1) => (r$1 = _(this.base.white, this.white, r$1), e(t$1.fromXYZ_M, r$1))), t$1.referred ??= "display", super(t$1);
	}
};
function A(e$1, t$1) {
	return e$1 = x(e$1), !t$1 || e$1.space.equals(t$1) ? e$1.coords.slice() : (t$1 = S.get(t$1)).from(e$1);
}
function P(e$1, t$1) {
	e$1 = x(e$1);
	let { space: r$1, index: a$1 } = S.resolveCoord(t$1, e$1.space);
	return A(e$1, r$1)[a$1];
}
function index_(e$1, t$1, r$1) {
	return e$1 = x(e$1), t$1 = S.get(t$1), e$1.coords = t$1.to(e$1.space, r$1), e$1;
}
function O(e$1, t$1, a$1) {
	if (e$1 = x(e$1), 2 === arguments.length && "object" === r(arguments[1])) {
		let t$2 = arguments[1];
		for (let r$1 in t$2) O(e$1, r$1, t$2[r$1]);
	} else {
		"function" == typeof a$1 && (a$1 = a$1(P(e$1, t$1)));
		let { space: r$1, index: n$1 } = S.resolveCoord(t$1, e$1.space), o$1 = A(e$1, r$1);
		o$1[n$1] = a$1, index_(e$1, r$1, o$1);
	}
	return e$1;
}
index_.returns = "color", O.returns = "color";
var $ = new S({
	id: "xyz-d50",
	name: "XYZ D50",
	white: "D50",
	base: L,
	fromBase: (e$1) => _(L.white, "D50", e$1),
	toBase: (e$1) => _("D50", L.white, e$1)
});
const q = 216 / 24389, D = 24 / 116, H = 24389 / 27;
let W = C.D50;
var T = new S({
	id: "lab",
	name: "Lab",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness"
		},
		a: { refRange: [-125, 125] },
		b: { refRange: [-125, 125] }
	},
	white: W,
	base: $,
	fromBase(e$1) {
		let t$1 = e$1.map((e$2, t$2) => e$2 / W[t$2]).map((e$2) => e$2 > q ? Math.cbrt(e$2) : (H * e$2 + 16) / 116);
		return [
			116 * t$1[1] - 16,
			500 * (t$1[0] - t$1[1]),
			200 * (t$1[1] - t$1[2])
		];
	},
	toBase(e$1) {
		let t$1 = [];
		return t$1[1] = (e$1[0] + 16) / 116, t$1[0] = e$1[1] / 500 + t$1[1], t$1[2] = t$1[1] - e$1[2] / 200, [
			t$1[0] > D ? Math.pow(t$1[0], 3) : (116 * t$1[0] - 16) / H,
			e$1[0] > 8 ? Math.pow((e$1[0] + 16) / 116, 3) : e$1[0] / H,
			t$1[2] > D ? Math.pow(t$1[2], 3) : (116 * t$1[2] - 16) / H
		].map((e$2, t$2) => e$2 * W[t$2]);
	},
	formats: { lab: { coords: [
		"<number> | <percentage>",
		"<number> | <percentage>[-1,1]",
		"<number> | <percentage>[-1,1]"
	] } }
});
function G(e$1) {
	return (e$1 % 360 + 360) % 360;
}
var X = new S({
	id: "lch",
	name: "LCH",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness"
		},
		c: {
			refRange: [0, 150],
			name: "Chroma"
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		}
	},
	base: T,
	fromBase(e$1) {
		let t$1, [r$1, a$1, n$1] = e$1;
		return t$1 = Math.abs(a$1) < .02 && Math.abs(n$1) < .02 ? NaN : 180 * Math.atan2(n$1, a$1) / Math.PI, [
			r$1,
			Math.sqrt(a$1 ** 2 + n$1 ** 2),
			G(t$1)
		];
	},
	toBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		return r$1 < 0 && (r$1 = 0), isNaN(a$1) && (a$1 = 0), [
			t$1,
			r$1 * Math.cos(a$1 * Math.PI / 180),
			r$1 * Math.sin(a$1 * Math.PI / 180)
		];
	},
	formats: { lch: { coords: [
		"<number> | <percentage>",
		"<number> | <percentage>",
		"<number> | <angle>"
	] } }
});
const Y = 25 ** 7, Z = Math.PI, F = 180 / Z, J = Z / 180;
function Q(e$1) {
	const t$1 = e$1 * e$1;
	return t$1 * t$1 * t$1 * e$1;
}
function U(e$1, t$1, { kL: r$1 = 1, kC: a$1 = 1, kH: n$1 = 1 } = {}) {
	[e$1, t$1] = x([e$1, t$1]);
	let [o$1, s$1, index__] = T.from(e$1), c$1 = X.from(T, [
		o$1,
		s$1,
		index__
	])[1], [l$1, u$1, h$1] = T.from(t$1), d$1 = X.from(T, [
		l$1,
		u$1,
		h$1
	])[1];
	c$1 < 0 && (c$1 = 0), d$1 < 0 && (d$1 = 0);
	let m$1 = Q((c$1 + d$1) / 2), f$1 = .5 * (1 - Math.sqrt(m$1 / (m$1 + Y))), p$1 = (1 + f$1) * s$1, g$1 = (1 + f$1) * u$1, b$1 = Math.sqrt(p$1 ** 2 + index__ ** 2), M$1 = Math.sqrt(g$1 ** 2 + h$1 ** 2), w$1 = 0 === p$1 && 0 === index__ ? 0 : Math.atan2(index__, p$1), y$1 = 0 === g$1 && 0 === h$1 ? 0 : Math.atan2(h$1, g$1);
	w$1 < 0 && (w$1 += 2 * Z), y$1 < 0 && (y$1 += 2 * Z), w$1 *= F, y$1 *= F;
	let C$1, R$1 = l$1 - o$1, _$1 = M$1 - b$1, B$1 = y$1 - w$1, N$1 = w$1 + y$1, k$1 = Math.abs(B$1);
	b$1 * M$1 == 0 ? C$1 = 0 : k$1 <= 180 ? C$1 = B$1 : B$1 > 180 ? C$1 = B$1 - 360 : B$1 < -180 ? C$1 = B$1 + 360 : v.warn("the unthinkable has happened");
	let S$1, E$1 = 2 * Math.sqrt(M$1 * b$1) * Math.sin(C$1 * J / 2), I$1 = (o$1 + l$1) / 2, L$1 = (b$1 + M$1) / 2, z$1 = Q(L$1);
	S$1 = b$1 * M$1 == 0 ? N$1 : k$1 <= 180 ? N$1 / 2 : N$1 < 360 ? (N$1 + 360) / 2 : (N$1 - 360) / 2;
	let A$1 = (I$1 - 50) ** 2, P$1 = 1 + .015 * A$1 / Math.sqrt(20 + A$1), index___ = 1 + .045 * L$1, O$1 = 1;
	O$1 -= .17 * Math.cos((S$1 - 30) * J), O$1 += .24 * Math.cos(2 * S$1 * J), O$1 += .32 * Math.cos((3 * S$1 + 6) * J), O$1 -= .2 * Math.cos((4 * S$1 - 63) * J);
	let $$1 = 1 + .015 * L$1 * O$1, q$1 = 30 * Math.exp(-1 * ((S$1 - 275) / 25) ** 2), D$1 = 2 * Math.sqrt(z$1 / (z$1 + Y)), H$1 = (R$1 / (r$1 * P$1)) ** 2;
	return H$1 += (_$1 / (a$1 * index___)) ** 2, H$1 += (E$1 / (n$1 * $$1)) ** 2, H$1 += -1 * Math.sin(2 * q$1 * J) * D$1 * (_$1 / (a$1 * index___)) * (E$1 / (n$1 * $$1)), Math.sqrt(H$1);
}
const K = [
	[
		.819022437996703,
		.3619062600528904,
		-.1288737815209879
	],
	[
		.0329836539323885,
		.9292868615863434,
		.0361446663506424
	],
	[
		.0481771893596242,
		.2642395317527308,
		.6335478284694309
	]
], V = [
	[
		1.2268798758459243,
		-.5578149944602171,
		.2813910456659647
	],
	[
		-.0405757452148008,
		1.112286803280317,
		-.0717110580655164
	],
	[
		-.0763729366746601,
		-.4214933324022432,
		1.5869240198367816
	]
], ee = [
	[
		.210454268309314,
		.7936177747023054,
		-.0040720430116193
	],
	[
		1.9779985324311684,
		-2.42859224204858,
		.450593709617411
	],
	[
		.0259040424655478,
		.7827717124575296,
		-.8086757549230774
	]
], te = [
	[
		1,
		.3963377773761749,
		.2158037573099136
	],
	[
		1,
		-.1055613458156586,
		-.0638541728258133
	],
	[
		1,
		-.0894841775298119,
		-1.2914855480194092
	]
];
var re = new S({
	id: "oklab",
	name: "Oklab",
	coords: {
		l: {
			refRange: [0, 1],
			name: "Lightness"
		},
		a: { refRange: [-.4, .4] },
		b: { refRange: [-.4, .4] }
	},
	white: "D65",
	base: L,
	fromBase(t$1) {
		let r$1 = e(K, t$1).map((e$1) => Math.cbrt(e$1));
		return e(ee, r$1);
	},
	toBase(t$1) {
		let r$1 = e(te, t$1).map((e$1) => e$1 ** 3);
		return e(V, r$1);
	},
	formats: { oklab: { coords: [
		"<percentage> | <number>",
		"<number> | <percentage>[-1,1]",
		"<number> | <percentage>[-1,1]"
	] } }
});
function ae(e$1, t$1) {
	[e$1, t$1] = x([e$1, t$1]);
	let [r$1, a$1, n$1] = re.from(e$1), [o$1, s$1, index__] = re.from(t$1), c$1 = r$1 - o$1, l$1 = a$1 - s$1, u$1 = n$1 - index__;
	return Math.sqrt(c$1 ** 2 + l$1 ** 2 + u$1 ** 2);
}
function ne(e$1, t$1, { epsilon: r$1 = 75e-6 } = {}) {
	e$1 = x(e$1), t$1 || (t$1 = e$1.space), t$1 = S.get(t$1);
	let a$1 = e$1.coords;
	return t$1 !== e$1.space && (a$1 = t$1.from(e$1)), t$1.inGamut(a$1, { epsilon: r$1 });
}
function oe(e$1) {
	return {
		space: e$1.space,
		coords: e$1.coords.slice(),
		alpha: e$1.alpha
	};
}
function se(e$1, t$1, r$1 = "lab") {
	let a$1 = (r$1 = S.get(r$1)).from(e$1), n$1 = r$1.from(t$1);
	return Math.sqrt(a$1.reduce((e$2, t$2, r$2) => {
		let a$2 = n$1[r$2];
		return isNaN(t$2) || isNaN(a$2) ? e$2 : e$2 + (a$2 - t$2) ** 2;
	}, 0));
}
const ie = Math.PI / 180;
var ce = new S({
	id: "xyz-abs-d65",
	cssId: "--xyz-abs-d65",
	name: "Absolute XYZ D65",
	coords: {
		x: {
			refRange: [0, 9504.7],
			name: "Xa"
		},
		y: {
			refRange: [0, 1e4],
			name: "Ya"
		},
		z: {
			refRange: [0, 10888.3],
			name: "Za"
		}
	},
	base: L,
	fromBase: (e$1) => e$1.map((e$2) => Math.max(203 * e$2, 0)),
	toBase: (e$1) => e$1.map((e$2) => Math.max(e$2 / 203, 0))
});
const le = 1.15, ue = .66, he = 2610 / 16384, de = 16384 / 2610, me = .8359375, fe = 2413 / 128, pe = 18.6875, ge = 1.7 * 2523 / 32, be = 32 / (1.7 * 2523), Me = -.56, we = 16295499532821565e-27, ye = [
	[
		.41478972,
		.579999,
		.014648
	],
	[
		-.20151,
		1.120649,
		.0531008
	],
	[
		-.0166008,
		.2648,
		.6684799
	]
], ve = [
	[
		1.9242264357876067,
		-1.0047923125953657,
		.037651404030618
	],
	[
		.35031676209499907,
		.7264811939316552,
		-.06538442294808501
	],
	[
		-.09098281098284752,
		-.3127282905230739,
		1.5227665613052603
	]
], Ce = [
	[
		.5,
		.5,
		0
	],
	[
		3.524,
		-4.066708,
		.542708
	],
	[
		.199076,
		1.096799,
		-1.295875
	]
], Re = [
	[
		1,
		.1386050432715393,
		.05804731615611886
	],
	[
		.9999999999999999,
		-.1386050432715393,
		-.05804731615611886
	],
	[
		.9999999999999998,
		-.09601924202631895,
		-.8118918960560388
	]
];
var _e = new S({
	id: "jzazbz",
	name: "Jzazbz",
	coords: {
		jz: {
			refRange: [0, 1],
			name: "Jz"
		},
		az: { refRange: [-.5, .5] },
		bz: { refRange: [-.5, .5] }
	},
	base: ce,
	fromBase(t$1) {
		let [r$1, a$1, n$1] = t$1, o$1 = e(ye, [
			le * r$1 - (le - 1) * n$1,
			ue * a$1 - (ue - 1) * r$1,
			n$1
		]).map(function(e$1) {
			return ((me + fe * (e$1 / 1e4) ** he) / (1 + pe * (e$1 / 1e4) ** he)) ** ge;
		}), [s$1, index__, c$1] = e(Ce, o$1);
		return [
			(1 + Me) * s$1 / (1 + Me * s$1) - we,
			index__,
			c$1
		];
	},
	toBase(t$1) {
		let [r$1, a$1, n$1] = t$1, o$1 = e(Re, [
			(r$1 + we) / (1 + Me - Me * (r$1 + we)),
			a$1,
			n$1
		]).map(function(e$1) {
			return 1e4 * ((me - e$1 ** be) / (pe * e$1 ** be - fe)) ** de;
		}), [s$1, index__, c$1] = e(ve, o$1), l$1 = (s$1 + (le - 1) * c$1) / le;
		return [
			l$1,
			(index__ + (ue - 1) * l$1) / ue,
			c$1
		];
	},
	formats: { color: { coords: [
		"<number> | <percentage>",
		"<number> | <percentage>[-1,1]",
		"<number> | <percentage>[-1,1]"
	] } }
}), Be = new S({
	id: "jzczhz",
	name: "JzCzHz",
	coords: {
		jz: {
			refRange: [0, 1],
			name: "Jz"
		},
		cz: {
			refRange: [0, 1],
			name: "Chroma"
		},
		hz: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		}
	},
	base: _e,
	fromBase(e$1) {
		let t$1, [r$1, a$1, n$1] = e$1;
		const o$1 = 2e-4;
		return t$1 = Math.abs(a$1) < o$1 && Math.abs(n$1) < o$1 ? NaN : 180 * Math.atan2(n$1, a$1) / Math.PI, [
			r$1,
			Math.sqrt(a$1 ** 2 + n$1 ** 2),
			G(t$1)
		];
	},
	toBase: (e$1) => [
		e$1[0],
		e$1[1] * Math.cos(e$1[2] * Math.PI / 180),
		e$1[1] * Math.sin(e$1[2] * Math.PI / 180)
	]
});
const Ne = .8359375, ke = 2413 / 128, xe = 18.6875, Se = 2610 / 16384, Ee = 2523 / 32, Ie = 16384 / 2610, Le = 32 / 2523, ze = [
	[
		.3592832590121217,
		.6976051147779502,
		-.035891593232029
	],
	[
		-.1920808463704993,
		1.100476797037432,
		.0753748658519118
	],
	[
		.0070797844607479,
		.0748396662186362,
		.8433265453898765
	]
], Ae = [
	[
		.5,
		.5,
		0
	],
	[
		6610 / 4096,
		-13613 / 4096,
		7003 / 4096
	],
	[
		17933 / 4096,
		-17390 / 4096,
		-543 / 4096
	]
], Pe = [
	[
		.9999999999999998,
		.0086090370379328,
		.111029625003026
	],
	[
		.9999999999999998,
		-.0086090370379328,
		-.1110296250030259
	],
	[
		.9999999999999998,
		.5600313357106791,
		-.3206271749873188
	]
], je = [
	[
		2.0701522183894223,
		-1.3263473389671563,
		.2066510476294053
	],
	[
		.3647385209748072,
		.6805660249472273,
		-.0453045459220347
	],
	[
		-.0497472075358123,
		-.0492609666966131,
		1.1880659249923042
	]
];
var Oe = new S({
	id: "ictcp",
	name: "ICTCP",
	coords: {
		i: {
			refRange: [0, 1],
			name: "I"
		},
		ct: {
			refRange: [-.5, .5],
			name: "CT"
		},
		cp: {
			refRange: [-.5, .5],
			name: "CP"
		}
	},
	base: ce,
	fromBase: (t$1) => function(t$2) {
		let r$1 = t$2.map(function(e$1) {
			return ((Ne + ke * (e$1 / 1e4) ** Se) / (1 + xe * (e$1 / 1e4) ** Se)) ** Ee;
		});
		return e(Ae, r$1);
	}(e(ze, t$1)),
	toBase(t$1) {
		let r$1 = function(t$2) {
			let r$2 = e(Pe, t$2), a$1 = r$2.map(function(e$1) {
				return 1e4 * (Math.max(e$1 ** Le - Ne, 0) / (ke - xe * e$1 ** Le)) ** Ie;
			});
			return a$1;
		}(t$1);
		return e(je, r$1);
	}
});
const $e = C.D65, qe = 1 / .42, De = 2 * Math.PI, He = [
	[
		.401288,
		.650173,
		-.051461
	],
	[
		-.250268,
		1.204414,
		.045854
	],
	[
		-.002079,
		.048952,
		.953127
	]
], We = [
	[
		1.8620678550872327,
		-1.0112546305316843,
		.14918677544445175
	],
	[
		.38752654323613717,
		.6214474419314753,
		-.008973985167612518
	],
	[
		-.015841498849333856,
		-.03412293802851557,
		1.0499644368778496
	]
], Te = [
	[
		460,
		451,
		288
	],
	[
		460,
		-891,
		-261
	],
	[
		460,
		-220,
		-6300
	]
], Ge = {
	dark: [
		.8,
		.525,
		.8
	],
	dim: [
		.9,
		.59,
		.9
	],
	average: [
		1,
		.69,
		1
	]
}, Xe = {
	h: [
		20.14,
		90,
		164.25,
		237.53,
		380.14
	],
	e: [
		.8,
		.7,
		1,
		1.2,
		.8
	],
	H: [
		0,
		100,
		200,
		300,
		400
	]
}, Ye = 180 / Math.PI, Ze = Math.PI / 180;
function Fe(e$1, t$1) {
	const r$1 = e$1.map((e$2) => {
		const r$2 = g(t$1 * Math.abs(e$2) * .01, .42);
		return 400 * p(r$2, e$2) / (r$2 + 27.13);
	});
	return r$1;
}
function Je(t$1, r$1, a$1, n$1, o$1) {
	const s$1 = {};
	s$1.discounting = o$1, s$1.refWhite = t$1, s$1.surround = n$1;
	const index__ = t$1.map((e$1) => 100 * e$1);
	s$1.la = r$1, s$1.yb = a$1;
	const c$1 = index__[1], l$1 = e(He, index__), h$1 = (n$1 = Ge[s$1.surround])[0];
	s$1.c = n$1[1], s$1.nc = n$1[2];
	const d$1 = (1 / (5 * s$1.la + 1)) ** 4;
	s$1.fl = d$1 * s$1.la + .1 * (1 - d$1) * (1 - d$1) * Math.cbrt(5 * s$1.la), s$1.flRoot = s$1.fl ** .25, s$1.n = s$1.yb / c$1, s$1.z = 1.48 + Math.sqrt(s$1.n), s$1.nbb = .725 * s$1.n ** -.2, s$1.ncb = s$1.nbb;
	const m$1 = o$1 ? 1 : Math.max(Math.min(h$1 * (1 - 1 / 3.6 * Math.exp((-s$1.la - 42) / 92)), 1), 0);
	s$1.dRgb = l$1.map((e$1) => u(1, c$1 / e$1, m$1)), s$1.dRgbInv = s$1.dRgb.map((e$1) => 1 / e$1);
	const f$1 = l$1.map((e$1, t$2) => e$1 * s$1.dRgb[t$2]), p$1 = Fe(f$1, s$1.fl);
	return s$1.aW = s$1.nbb * (2 * p$1[0] + p$1[1] + .05 * p$1[2]), s$1;
}
const Qe = Je($e, 64 / Math.PI * .2, 20, "average", !1);
function Ue(t$1, r$1) {
	if (!(void 0 !== t$1.J ^ void 0 !== t$1.Q)) throw new Error("Conversion requires one and only one: 'J' or 'Q'");
	if (!(void 0 !== t$1.C ^ void 0 !== t$1.M ^ void 0 !== t$1.s)) throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");
	if (!(void 0 !== t$1.h ^ void 0 !== t$1.H)) throw new Error("Conversion requires one and only one: 'h' or 'H'");
	if (0 === t$1.J || 0 === t$1.Q) return [
		0,
		0,
		0
	];
	let a$1 = 0;
	a$1 = void 0 !== t$1.h ? G(t$1.h) * Ze : function(e$1) {
		let t$2 = (e$1 % 400 + 400) % 400;
		const r$2 = Math.floor(.01 * t$2);
		t$2 %= 100;
		const [a$2, n$2] = Xe.h.slice(r$2, r$2 + 2), [o$2, s$2] = Xe.e.slice(r$2, r$2 + 2);
		return G((t$2 * (s$2 * a$2 - o$2 * n$2) - 100 * a$2 * s$2) / (t$2 * (s$2 - o$2) - 100 * s$2));
	}(t$1.H) * Ze;
	const n$1 = Math.cos(a$1), o$1 = Math.sin(a$1);
	let s$1 = 0;
	void 0 !== t$1.J ? s$1 = .1 * g(t$1.J, .5) : void 0 !== t$1.Q && (s$1 = .25 * r$1.c * t$1.Q / ((r$1.aW + 4) * r$1.flRoot));
	let index__ = 0;
	void 0 !== t$1.C ? index__ = t$1.C / s$1 : void 0 !== t$1.M ? index__ = t$1.M / r$1.flRoot / s$1 : void 0 !== t$1.s && (index__ = 4e-4 * t$1.s ** 2 * (r$1.aW + 4) / r$1.c);
	const c$1 = g(index__ * Math.pow(1.64 - Math.pow(.29, r$1.n), -.73), 10 / 9), l$1 = .25 * (Math.cos(a$1 + 2) + 3.8), u$1 = r$1.aW * g(s$1, 2 / r$1.c / r$1.z), h$1 = 5e4 / 13 * r$1.nc * r$1.ncb * l$1, d$1 = u$1 / r$1.nbb, m$1 = 23 * (d$1 + .305) * b(c$1, 23 * h$1 + c$1 * (11 * n$1 + 108 * o$1)), f$1 = function(e$1, t$2) {
		const r$2 = 100 / t$2 * 2588.068098016295;
		return e$1.map((e$2) => {
			const t$3 = Math.abs(e$2);
			return p(r$2 * g(t$3 / (400 - t$3), qe), e$2);
		});
	}(e(Te, [
		d$1,
		m$1 * n$1,
		m$1 * o$1
	]).map((e$1) => 1 * e$1 / 1403), r$1.fl);
	return e(We, f$1.map((e$1, t$2) => e$1 * r$1.dRgbInv[t$2])).map((e$1) => e$1 / 100);
}
function Ke(t$1, r$1) {
	const a$1 = t$1.map((e$1) => 100 * e$1), n$1 = Fe(e(He, a$1).map((e$1, t$2) => e$1 * r$1.dRgb[t$2]), r$1.fl), o$1 = n$1[0] + (-12 * n$1[1] + n$1[2]) / 11, s$1 = (n$1[0] + n$1[1] - 2 * n$1[2]) / 9, index__ = (Math.atan2(s$1, o$1) % De + De) % De, c$1 = .25 * (Math.cos(index__ + 2) + 3.8), l$1 = g(5e4 / 13 * r$1.nc * r$1.ncb * b(c$1 * Math.sqrt(o$1 ** 2 + s$1 ** 2), n$1[0] + n$1[1] + 1.05 * n$1[2] + .305), .9) * Math.pow(1.64 - Math.pow(.29, r$1.n), .73), u$1 = g(r$1.nbb * (2 * n$1[0] + n$1[1] + .05 * n$1[2]) / r$1.aW, .5 * r$1.c * r$1.z), h$1 = 100 * g(u$1, 2), d$1 = 4 / r$1.c * u$1 * (r$1.aW + 4) * r$1.flRoot, m$1 = l$1 * u$1, f$1 = m$1 * r$1.flRoot, p$1 = G(index__ * Ye), w$1 = function(e$1) {
		let t$2 = G(e$1);
		t$2 <= Xe.h[0] && (t$2 += 360);
		const r$2 = M(Xe.h, t$2) - 1, [a$2, n$2] = Xe.h.slice(r$2, r$2 + 2), [o$2, s$2] = Xe.e.slice(r$2, r$2 + 2), index__$1 = (t$2 - a$2) / o$2;
		return Xe.H[r$2] + 100 * index__$1 / (index__$1 + (n$2 - t$2) / s$2);
	}(p$1);
	return {
		J: h$1,
		C: m$1,
		h: p$1,
		s: 50 * g(r$1.c * l$1 / (r$1.aW + 4), .5),
		Q: d$1,
		M: f$1,
		H: w$1
	};
}
var Ve = new S({
	id: "cam16-jmh",
	cssId: "--cam16-jmh",
	name: "CAM16-JMh",
	coords: {
		j: {
			refRange: [0, 100],
			name: "J"
		},
		m: {
			refRange: [0, 105],
			name: "Colorfulness"
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		}
	},
	base: L,
	fromBase(e$1) {
		const t$1 = Ke(e$1, Qe);
		return [
			t$1.J,
			t$1.M,
			t$1.h
		];
	},
	toBase: (e$1) => Ue({
		J: e$1[0],
		M: e$1[1],
		h: e$1[2]
	}, Qe)
});
const et = C.D65, tt = 216 / 24389, rt = 24389 / 27;
function at(e$1) {
	return e$1 > 8 ? Math.pow((e$1 + 16) / 116, 3) : e$1 / rt;
}
function nt(e$1, t$1) {
	const r$1 = 116 * ((a$1 = e$1[1]) > tt ? Math.cbrt(a$1) : (rt * a$1 + 16) / 116) - 16;
	var a$1;
	if (0 === r$1) return [
		0,
		0,
		0
	];
	const n$1 = Ke(e$1, ot);
	return [
		G(n$1.h),
		n$1.C,
		r$1
	];
}
const ot = Je(et, 200 / Math.PI * at(50), 100 * at(50), "average", !1);
var st = new S({
	id: "hct",
	name: "HCT",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		},
		c: {
			refRange: [0, 145],
			name: "Colorfulness"
		},
		t: {
			refRange: [0, 100],
			name: "Tone"
		}
	},
	base: L,
	fromBase: (e$1) => nt(e$1),
	toBase: (e$1) => function(e$2, t$1) {
		let [r$1, a$1, n$1] = e$2, o$1 = [], s$1 = 0;
		if (0 === n$1) return [
			0,
			0,
			0
		];
		let index__ = at(n$1);
		s$1 = n$1 > 0 ? .00379058511492914 * n$1 ** 2 + .608983189401032 * n$1 + .9155088574762233 : 9514440756550361e-21 * n$1 ** 2 + .08693057439788597 * n$1 - 21.928975842194614;
		let c$1 = 0, l$1 = Infinity;
		for (; c$1 <= 15;) {
			o$1 = Ue({
				J: s$1,
				C: a$1,
				h: r$1
			}, t$1);
			const e$3 = Math.abs(o$1[1] - index__);
			if (e$3 < l$1) {
				if (e$3 <= 2e-12) return o$1;
				l$1 = e$3;
			}
			s$1 -= (o$1[1] - index__) * s$1 / (2 * o$1[1]), c$1 += 1;
		}
		return Ue({
			J: s$1,
			C: a$1,
			h: r$1
		}, t$1);
	}(e$1, ot),
	formats: { color: {
		id: "--hct",
		coords: [
			"<number> | <angle>",
			"<percentage> | <number>",
			"<percentage> | <number>"
		]
	} }
});
const it = Math.PI / 180, ct = [
	1,
	.007,
	.0228
];
function lt(e$1) {
	e$1[1] < 0 && (e$1 = st.fromBase(st.toBase(e$1)));
	const t$1 = Math.log(Math.max(1 + ct[2] * e$1[1] * ot.flRoot, 1)) / ct[2], r$1 = e$1[0] * it, a$1 = t$1 * Math.cos(r$1), n$1 = t$1 * Math.sin(r$1);
	return [
		e$1[2],
		a$1,
		n$1
	];
}
var ut = {
	deltaE76: function(e$1, t$1) {
		return se(e$1, t$1, "lab");
	},
	deltaECMC: function(e$1, t$1, { l: r$1 = 2, c: a$1 = 1 } = {}) {
		[e$1, t$1] = x([e$1, t$1]);
		let [n$1, o$1, s$1] = T.from(e$1), [, index__, c$1] = X.from(T, [
			n$1,
			o$1,
			s$1
		]), [l$1, u$1, h$1] = T.from(t$1), d$1 = X.from(T, [
			l$1,
			u$1,
			h$1
		])[1];
		index__ < 0 && (index__ = 0), d$1 < 0 && (d$1 = 0);
		let m$1 = n$1 - l$1, f$1 = index__ - d$1, p$1 = (o$1 - u$1) ** 2 + (s$1 - h$1) ** 2 - f$1 ** 2, g$1 = .511;
		n$1 >= 16 && (g$1 = .040975 * n$1 / (1 + .01765 * n$1));
		let b$1, M$1 = .0638 * index__ / (1 + .0131 * index__) + .638;
		Number.isNaN(c$1) && (c$1 = 0), b$1 = c$1 >= 164 && c$1 <= 345 ? .56 + Math.abs(.2 * Math.cos((c$1 + 168) * ie)) : .36 + Math.abs(.4 * Math.cos((c$1 + 35) * ie));
		let w$1 = Math.pow(index__, 4), y$1 = Math.sqrt(w$1 / (w$1 + 1900)), v$1 = (m$1 / (r$1 * g$1)) ** 2;
		return v$1 += (f$1 / (a$1 * M$1)) ** 2, v$1 += p$1 / (M$1 * (y$1 * b$1 + 1 - y$1)) ** 2, Math.sqrt(v$1);
	},
	deltaE2000: U,
	deltaEJz: function(e$1, t$1) {
		[e$1, t$1] = x([e$1, t$1]);
		let [r$1, a$1, n$1] = Be.from(e$1), [o$1, s$1, index__] = Be.from(t$1), c$1 = r$1 - o$1, l$1 = a$1 - s$1;
		Number.isNaN(n$1) && Number.isNaN(index__) ? (n$1 = 0, index__ = 0) : Number.isNaN(n$1) ? n$1 = index__ : Number.isNaN(index__) && (index__ = n$1);
		let u$1 = n$1 - index__, h$1 = 2 * Math.sqrt(a$1 * s$1) * Math.sin(u$1 / 2 * (Math.PI / 180));
		return Math.sqrt(c$1 ** 2 + l$1 ** 2 + h$1 ** 2);
	},
	deltaEITP: function(e$1, t$1) {
		[e$1, t$1] = x([e$1, t$1]);
		let [r$1, a$1, n$1] = Oe.from(e$1), [o$1, s$1, index__] = Oe.from(t$1);
		return 720 * Math.sqrt((r$1 - o$1) ** 2 + .25 * (a$1 - s$1) ** 2 + (n$1 - index__) ** 2);
	},
	deltaEOK: ae,
	deltaEHCT: function(e$1, t$1) {
		[e$1, t$1] = x([e$1, t$1]);
		let [r$1, a$1, n$1] = lt(st.from(e$1)), [o$1, s$1, index__] = lt(st.from(t$1));
		return Math.sqrt((r$1 - o$1) ** 2 + (a$1 - s$1) ** 2 + (n$1 - index__) ** 2);
	}
};
const ht = {
	hct: {
		method: "hct.c",
		jnd: 2,
		deltaEMethod: "hct",
		blackWhiteClamp: {}
	},
	"hct-tonal": {
		method: "hct.c",
		jnd: 0,
		deltaEMethod: "hct",
		blackWhiteClamp: {
			channel: "hct.t",
			min: 0,
			max: 100
		}
	}
};
function dt(e$1, { method: r$1 = v.gamut_mapping, space: a$1, deltaEMethod: o$1 = "", jnd: s$1 = 2, blackWhiteClamp: index__ = {} } = {}) {
	if (e$1 = x(e$1), t(arguments[1]) ? a$1 = arguments[1] : a$1 || (a$1 = e$1.space), ne(e$1, a$1 = S.get(a$1), { epsilon: 0 })) return e$1;
	let c$1;
	if ("css" === r$1) c$1 = function(e$2, { space: t$1 } = {}) {
		const r$2 = .02, a$2 = 1e-4;
		e$2 = x(e$2), t$1 || (t$1 = e$2.space);
		t$1 = S.get(t$1);
		const n$1 = S.get("oklch");
		if (t$1.isUnbounded) return ft(e$2, t$1);
		const o$2 = ft(e$2, n$1);
		let s$2 = o$2.coords[0];
		if (s$2 >= 1) {
			const r$3 = ft(mt.WHITE, t$1);
			return r$3.alpha = e$2.alpha, ft(r$3, t$1);
		}
		if (s$2 <= 0) {
			const r$3 = ft(mt.BLACK, t$1);
			return r$3.alpha = e$2.alpha, ft(r$3, t$1);
		}
		if (ne(o$2, t$1, { epsilon: 0 })) return ft(o$2, t$1);
		function index___(e$3) {
			const r$3 = ft(e$3, t$1), a$3 = Object.values(t$1.coords);
			return r$3.coords = r$3.coords.map((e$4, t$2) => {
				if ("range" in a$3[t$2]) {
					const [r$4, n$2] = a$3[t$2].range;
					return f(r$4, e$4, n$2);
				}
				return e$4;
			}), r$3;
		}
		let c$2 = 0, l$1 = o$2.coords[1], u$1 = !0, h$1 = oe(o$2), d$1 = index___(h$1), m$1 = ae(d$1, h$1);
		if (m$1 < r$2) return d$1;
		for (; l$1 - c$2 > a$2;) {
			const e$3 = (c$2 + l$1) / 2;
			if (h$1.coords[1] = e$3, u$1 && ne(h$1, t$1, { epsilon: 0 })) c$2 = e$3;
			else if (d$1 = index___(h$1), m$1 = ae(d$1, h$1), m$1 < r$2) {
				if (r$2 - m$1 < a$2) break;
				u$1 = !1, c$2 = e$3;
			} else l$1 = e$3;
		}
		return d$1;
	}(e$1, { space: a$1 });
	else {
		if ("clip" === r$1 || ne(e$1, a$1)) c$1 = ft(e$1, a$1);
		else {
			Object.prototype.hasOwnProperty.call(ht, r$1) && ({method: r$1, jnd: s$1, deltaEMethod: o$1, blackWhiteClamp: index__} = ht[r$1]);
			let t$1 = U;
			if ("" !== o$1) {
				for (let e$2 in ut) if ("deltae" + o$1.toLowerCase() === e$2.toLowerCase()) {
					t$1 = ut[e$2];
					break;
				}
			}
			let l$1 = dt(ft(e$1, a$1), {
				method: "clip",
				space: a$1
			});
			if (t$1(e$1, l$1) > s$1) {
				if (3 === Object.keys(index__).length) {
					let t$2 = S.resolveCoord(index__.channel), r$2 = P(ft(e$1, t$2.space), t$2.id);
					if (n(r$2) && (r$2 = 0), r$2 >= index__.max) return ft({
						space: "xyz-d65",
						coords: C.D65
					}, e$1.space);
					if (r$2 <= index__.min) return ft({
						space: "xyz-d65",
						coords: [
							0,
							0,
							0
						]
					}, e$1.space);
				}
				let o$2 = S.resolveCoord(r$1), l$2 = o$2.space, u$1 = o$2.id, h$1 = ft(e$1, l$2);
				h$1.coords.forEach((e$2, t$2) => {
					n(e$2) && (h$1.coords[t$2] = 0);
				});
				let d$1 = (o$2.range || o$2.refRange)[0], m$1 = function(e$2) {
					const t$2 = e$2 ? Math.floor(Math.log10(Math.abs(e$2))) : 0;
					return Math.max(parseFloat("1e" + (t$2 - 2)), 1e-6);
				}(s$1), f$1 = d$1, p$1 = P(h$1, u$1);
				for (; p$1 - f$1 > m$1;) {
					let e$2 = oe(h$1);
					e$2 = dt(e$2, {
						space: a$1,
						method: "clip"
					}), t$1(h$1, e$2) - s$1 < m$1 ? f$1 = P(h$1, u$1) : p$1 = P(h$1, u$1), O(h$1, u$1, (f$1 + p$1) / 2);
				}
				c$1 = ft(h$1, a$1);
			} else c$1 = l$1;
		}
		if ("clip" === r$1 || !ne(c$1, a$1, { epsilon: 0 })) {
			let e$2 = Object.values(a$1.coords).map((e$3) => e$3.range || []);
			c$1.coords = c$1.coords.map((t$1, r$2) => {
				let [a$2, n$1] = e$2[r$2];
				return void 0 !== a$2 && (t$1 = Math.max(a$2, t$1)), void 0 !== n$1 && (t$1 = Math.min(t$1, n$1)), t$1;
			});
		}
	}
	return a$1 !== e$1.space && (c$1 = ft(c$1, e$1.space)), e$1.coords = c$1.coords, e$1;
}
dt.returns = "color";
const mt = {
	WHITE: {
		space: re,
		coords: [
			1,
			0,
			0
		]
	},
	BLACK: {
		space: re,
		coords: [
			0,
			0,
			0
		]
	}
};
function ft(e$1, t$1, { inGamut: r$1 } = {}) {
	e$1 = x(e$1);
	let a$1 = (t$1 = S.get(t$1)).from(e$1), n$1 = {
		space: t$1,
		coords: a$1,
		alpha: e$1.alpha
	};
	return r$1 && (n$1 = dt(n$1, !0 === r$1 ? void 0 : r$1)), n$1;
}
function pt(e$1, { precision: t$1 = v.precision, format: r$1 = "default", inGamut: n$1 = !0,...o$1 } = {}) {
	let s$1, index__ = r$1;
	r$1 = (e$1 = x(e$1)).space.getFormat(r$1) ?? e$1.space.getFormat("default") ?? S.DEFAULT_FORMAT;
	let c$1 = e$1.coords.slice();
	if (n$1 ||= r$1.toGamut, n$1 && !ne(e$1) && (c$1 = dt(oe(e$1), !0 === n$1 ? void 0 : n$1).coords), "custom" === r$1.type) {
		if (o$1.precision = t$1, !r$1.serialize) throw new TypeError(`format ${index__} can only be used to parse colors, not for serialization`);
		s$1 = r$1.serialize(c$1, e$1.alpha, o$1);
	} else {
		let n$2 = r$1.name || "color";
		r$1.serializeCoords ? c$1 = r$1.serializeCoords(c$1, t$1) : null !== t$1 && (c$1 = c$1.map((e$2) => a(e$2, { precision: t$1 })));
		let o$2 = [...c$1];
		if ("color" === n$2) {
			let t$2 = r$1.id || r$1.ids?.[0] || e$1.space.id;
			o$2.unshift(t$2);
		}
		let index__$1 = e$1.alpha;
		null !== t$1 && (index__$1 = a(index__$1, { precision: t$1 }));
		let l$1 = e$1.alpha >= 1 || r$1.noAlpha ? "" : `${r$1.commas ? "," : " /"} ${index__$1}`;
		s$1 = `${n$2}(${o$2.join(r$1.commas ? ", " : " ")}${l$1})`;
	}
	return s$1;
}
ft.returns = "color";
var gt = new z({
	id: "rec2020-linear",
	cssId: "--rec2020-linear",
	name: "Linear REC.2020",
	white: "D65",
	toXYZ_M: [
		[
			.6369580483012914,
			.14461690358620832,
			.1688809751641721
		],
		[
			.2627002120112671,
			.6779980715188708,
			.05930171646986196
		],
		[
			0,
			.028072693049087428,
			1.060985057710791
		]
	],
	fromXYZ_M: [
		[
			1.716651187971268,
			-.355670783776392,
			-.25336628137366
		],
		[
			-.666684351832489,
			1.616481236634939,
			.0157685458139111
		],
		[
			.017639857445311,
			-.042770613257809,
			.942103121235474
		]
	]
});
const bt = 1.09929682680944, Mt = .018053968510807;
var wt = new z({
	id: "rec2020",
	name: "REC.2020",
	base: gt,
	toBase: (e$1) => e$1.map(function(e$2) {
		return e$2 < 4.5 * Mt ? e$2 / 4.5 : Math.pow((e$2 + bt - 1) / bt, 1 / .45);
	}),
	fromBase: (e$1) => e$1.map(function(e$2) {
		return e$2 >= Mt ? bt * Math.pow(e$2, .45) - (bt - 1) : 4.5 * e$2;
	})
});
var yt = new z({
	id: "p3-linear",
	cssId: "--display-p3-linear",
	name: "Linear P3",
	white: "D65",
	toXYZ_M: [
		[
			.4865709486482162,
			.26566769316909306,
			.1982172852343625
		],
		[
			.2289745640697488,
			.6917385218365064,
			.079286914093745
		],
		[
			0,
			.04511338185890264,
			1.043944368900976
		]
	],
	fromXYZ_M: [
		[
			2.493496911941425,
			-.9313836179191239,
			-.40271078445071684
		],
		[
			-.8294889695615747,
			1.7626640603183463,
			.023624685841943577
		],
		[
			.03584583024378447,
			-.07617238926804182,
			.9568845240076872
		]
	]
});
const vt = [
	[
		3.2409699419045226,
		-1.537383177570094,
		-.4986107602930034
	],
	[
		-.9692436362808796,
		1.8759675015077202,
		.04155505740717559
	],
	[
		.05563007969699366,
		-.20397695888897652,
		1.0569715142428786
	]
];
var Ct = new z({
	id: "srgb-linear",
	name: "Linear sRGB",
	white: "D65",
	toXYZ_M: [
		[
			.41239079926595934,
			.357584339383878,
			.1804807884018343
		],
		[
			.21263900587151027,
			.715168678767756,
			.07219231536073371
		],
		[
			.01933081871559182,
			.11919477979462598,
			.9505321522496607
		]
	],
	fromXYZ_M: vt
}), Rt = {
	aliceblue: [
		240 / 255,
		248 / 255,
		1
	],
	antiquewhite: [
		250 / 255,
		235 / 255,
		215 / 255
	],
	aqua: [
		0,
		1,
		1
	],
	aquamarine: [
		127 / 255,
		1,
		212 / 255
	],
	azure: [
		240 / 255,
		1,
		1
	],
	beige: [
		245 / 255,
		245 / 255,
		220 / 255
	],
	bisque: [
		1,
		228 / 255,
		196 / 255
	],
	black: [
		0,
		0,
		0
	],
	blanchedalmond: [
		1,
		235 / 255,
		205 / 255
	],
	blue: [
		0,
		0,
		1
	],
	blueviolet: [
		138 / 255,
		43 / 255,
		226 / 255
	],
	brown: [
		165 / 255,
		42 / 255,
		42 / 255
	],
	burlywood: [
		222 / 255,
		184 / 255,
		135 / 255
	],
	cadetblue: [
		95 / 255,
		158 / 255,
		160 / 255
	],
	chartreuse: [
		127 / 255,
		1,
		0
	],
	chocolate: [
		210 / 255,
		105 / 255,
		30 / 255
	],
	coral: [
		1,
		127 / 255,
		80 / 255
	],
	cornflowerblue: [
		100 / 255,
		149 / 255,
		237 / 255
	],
	cornsilk: [
		1,
		248 / 255,
		220 / 255
	],
	crimson: [
		220 / 255,
		20 / 255,
		60 / 255
	],
	cyan: [
		0,
		1,
		1
	],
	darkblue: [
		0,
		0,
		139 / 255
	],
	darkcyan: [
		0,
		139 / 255,
		139 / 255
	],
	darkgoldenrod: [
		184 / 255,
		134 / 255,
		11 / 255
	],
	darkgray: [
		169 / 255,
		169 / 255,
		169 / 255
	],
	darkgreen: [
		0,
		100 / 255,
		0
	],
	darkgrey: [
		169 / 255,
		169 / 255,
		169 / 255
	],
	darkkhaki: [
		189 / 255,
		183 / 255,
		107 / 255
	],
	darkmagenta: [
		139 / 255,
		0,
		139 / 255
	],
	darkolivegreen: [
		85 / 255,
		107 / 255,
		47 / 255
	],
	darkorange: [
		1,
		140 / 255,
		0
	],
	darkorchid: [
		.6,
		50 / 255,
		.8
	],
	darkred: [
		139 / 255,
		0,
		0
	],
	darksalmon: [
		233 / 255,
		150 / 255,
		122 / 255
	],
	darkseagreen: [
		143 / 255,
		188 / 255,
		143 / 255
	],
	darkslateblue: [
		72 / 255,
		61 / 255,
		139 / 255
	],
	darkslategray: [
		47 / 255,
		79 / 255,
		79 / 255
	],
	darkslategrey: [
		47 / 255,
		79 / 255,
		79 / 255
	],
	darkturquoise: [
		0,
		206 / 255,
		209 / 255
	],
	darkviolet: [
		148 / 255,
		0,
		211 / 255
	],
	deeppink: [
		1,
		20 / 255,
		147 / 255
	],
	deepskyblue: [
		0,
		191 / 255,
		1
	],
	dimgray: [
		105 / 255,
		105 / 255,
		105 / 255
	],
	dimgrey: [
		105 / 255,
		105 / 255,
		105 / 255
	],
	dodgerblue: [
		30 / 255,
		144 / 255,
		1
	],
	firebrick: [
		178 / 255,
		34 / 255,
		34 / 255
	],
	floralwhite: [
		1,
		250 / 255,
		240 / 255
	],
	forestgreen: [
		34 / 255,
		139 / 255,
		34 / 255
	],
	fuchsia: [
		1,
		0,
		1
	],
	gainsboro: [
		220 / 255,
		220 / 255,
		220 / 255
	],
	ghostwhite: [
		248 / 255,
		248 / 255,
		1
	],
	gold: [
		1,
		215 / 255,
		0
	],
	goldenrod: [
		218 / 255,
		165 / 255,
		32 / 255
	],
	gray: [
		128 / 255,
		128 / 255,
		128 / 255
	],
	green: [
		0,
		128 / 255,
		0
	],
	greenyellow: [
		173 / 255,
		1,
		47 / 255
	],
	grey: [
		128 / 255,
		128 / 255,
		128 / 255
	],
	honeydew: [
		240 / 255,
		1,
		240 / 255
	],
	hotpink: [
		1,
		105 / 255,
		180 / 255
	],
	indianred: [
		205 / 255,
		92 / 255,
		92 / 255
	],
	indigo: [
		75 / 255,
		0,
		130 / 255
	],
	ivory: [
		1,
		1,
		240 / 255
	],
	khaki: [
		240 / 255,
		230 / 255,
		140 / 255
	],
	lavender: [
		230 / 255,
		230 / 255,
		250 / 255
	],
	lavenderblush: [
		1,
		240 / 255,
		245 / 255
	],
	lawngreen: [
		124 / 255,
		252 / 255,
		0
	],
	lemonchiffon: [
		1,
		250 / 255,
		205 / 255
	],
	lightblue: [
		173 / 255,
		216 / 255,
		230 / 255
	],
	lightcoral: [
		240 / 255,
		128 / 255,
		128 / 255
	],
	lightcyan: [
		224 / 255,
		1,
		1
	],
	lightgoldenrodyellow: [
		250 / 255,
		250 / 255,
		210 / 255
	],
	lightgray: [
		211 / 255,
		211 / 255,
		211 / 255
	],
	lightgreen: [
		144 / 255,
		238 / 255,
		144 / 255
	],
	lightgrey: [
		211 / 255,
		211 / 255,
		211 / 255
	],
	lightpink: [
		1,
		182 / 255,
		193 / 255
	],
	lightsalmon: [
		1,
		160 / 255,
		122 / 255
	],
	lightseagreen: [
		32 / 255,
		178 / 255,
		170 / 255
	],
	lightskyblue: [
		135 / 255,
		206 / 255,
		250 / 255
	],
	lightslategray: [
		119 / 255,
		136 / 255,
		.6
	],
	lightslategrey: [
		119 / 255,
		136 / 255,
		.6
	],
	lightsteelblue: [
		176 / 255,
		196 / 255,
		222 / 255
	],
	lightyellow: [
		1,
		1,
		224 / 255
	],
	lime: [
		0,
		1,
		0
	],
	limegreen: [
		50 / 255,
		205 / 255,
		50 / 255
	],
	linen: [
		250 / 255,
		240 / 255,
		230 / 255
	],
	magenta: [
		1,
		0,
		1
	],
	maroon: [
		128 / 255,
		0,
		0
	],
	mediumaquamarine: [
		.4,
		205 / 255,
		170 / 255
	],
	mediumblue: [
		0,
		0,
		205 / 255
	],
	mediumorchid: [
		186 / 255,
		85 / 255,
		211 / 255
	],
	mediumpurple: [
		147 / 255,
		112 / 255,
		219 / 255
	],
	mediumseagreen: [
		60 / 255,
		179 / 255,
		113 / 255
	],
	mediumslateblue: [
		123 / 255,
		104 / 255,
		238 / 255
	],
	mediumspringgreen: [
		0,
		250 / 255,
		154 / 255
	],
	mediumturquoise: [
		72 / 255,
		209 / 255,
		.8
	],
	mediumvioletred: [
		199 / 255,
		21 / 255,
		133 / 255
	],
	midnightblue: [
		25 / 255,
		25 / 255,
		112 / 255
	],
	mintcream: [
		245 / 255,
		1,
		250 / 255
	],
	mistyrose: [
		1,
		228 / 255,
		225 / 255
	],
	moccasin: [
		1,
		228 / 255,
		181 / 255
	],
	navajowhite: [
		1,
		222 / 255,
		173 / 255
	],
	navy: [
		0,
		0,
		128 / 255
	],
	oldlace: [
		253 / 255,
		245 / 255,
		230 / 255
	],
	olive: [
		128 / 255,
		128 / 255,
		0
	],
	olivedrab: [
		107 / 255,
		142 / 255,
		35 / 255
	],
	orange: [
		1,
		165 / 255,
		0
	],
	orangered: [
		1,
		69 / 255,
		0
	],
	orchid: [
		218 / 255,
		112 / 255,
		214 / 255
	],
	palegoldenrod: [
		238 / 255,
		232 / 255,
		170 / 255
	],
	palegreen: [
		152 / 255,
		251 / 255,
		152 / 255
	],
	paleturquoise: [
		175 / 255,
		238 / 255,
		238 / 255
	],
	palevioletred: [
		219 / 255,
		112 / 255,
		147 / 255
	],
	papayawhip: [
		1,
		239 / 255,
		213 / 255
	],
	peachpuff: [
		1,
		218 / 255,
		185 / 255
	],
	peru: [
		205 / 255,
		133 / 255,
		63 / 255
	],
	pink: [
		1,
		192 / 255,
		203 / 255
	],
	plum: [
		221 / 255,
		160 / 255,
		221 / 255
	],
	powderblue: [
		176 / 255,
		224 / 255,
		230 / 255
	],
	purple: [
		128 / 255,
		0,
		128 / 255
	],
	rebeccapurple: [
		.4,
		.2,
		.6
	],
	red: [
		1,
		0,
		0
	],
	rosybrown: [
		188 / 255,
		143 / 255,
		143 / 255
	],
	royalblue: [
		65 / 255,
		105 / 255,
		225 / 255
	],
	saddlebrown: [
		139 / 255,
		69 / 255,
		19 / 255
	],
	salmon: [
		250 / 255,
		128 / 255,
		114 / 255
	],
	sandybrown: [
		244 / 255,
		164 / 255,
		96 / 255
	],
	seagreen: [
		46 / 255,
		139 / 255,
		87 / 255
	],
	seashell: [
		1,
		245 / 255,
		238 / 255
	],
	sienna: [
		160 / 255,
		82 / 255,
		45 / 255
	],
	silver: [
		192 / 255,
		192 / 255,
		192 / 255
	],
	skyblue: [
		135 / 255,
		206 / 255,
		235 / 255
	],
	slateblue: [
		106 / 255,
		90 / 255,
		205 / 255
	],
	slategray: [
		112 / 255,
		128 / 255,
		144 / 255
	],
	slategrey: [
		112 / 255,
		128 / 255,
		144 / 255
	],
	snow: [
		1,
		250 / 255,
		250 / 255
	],
	springgreen: [
		0,
		1,
		127 / 255
	],
	steelblue: [
		70 / 255,
		130 / 255,
		180 / 255
	],
	tan: [
		210 / 255,
		180 / 255,
		140 / 255
	],
	teal: [
		0,
		128 / 255,
		128 / 255
	],
	thistle: [
		216 / 255,
		191 / 255,
		216 / 255
	],
	tomato: [
		1,
		99 / 255,
		71 / 255
	],
	turquoise: [
		64 / 255,
		224 / 255,
		208 / 255
	],
	violet: [
		238 / 255,
		130 / 255,
		238 / 255
	],
	wheat: [
		245 / 255,
		222 / 255,
		179 / 255
	],
	white: [
		1,
		1,
		1
	],
	whitesmoke: [
		245 / 255,
		245 / 255,
		245 / 255
	],
	yellow: [
		1,
		1,
		0
	],
	yellowgreen: [
		154 / 255,
		205 / 255,
		50 / 255
	]
};
let _t = Array(3).fill("<percentage> | <number>[0, 255]"), Bt = Array(3).fill("<number>[0, 255]");
var Nt = new z({
	id: "srgb",
	name: "sRGB",
	base: Ct,
	fromBase: (e$1) => e$1.map((e$2) => {
		let t$1 = e$2 < 0 ? -1 : 1, r$1 = e$2 * t$1;
		return r$1 > .0031308 ? t$1 * (1.055 * r$1 ** (1 / 2.4) - .055) : 12.92 * e$2;
	}),
	toBase: (e$1) => e$1.map((e$2) => {
		let t$1 = e$2 < 0 ? -1 : 1, r$1 = e$2 * t$1;
		return r$1 <= .04045 ? e$2 / 12.92 : t$1 * ((r$1 + .055) / 1.055) ** 2.4;
	}),
	formats: {
		rgb: { coords: _t },
		rgb_number: {
			name: "rgb",
			commas: !0,
			coords: Bt,
			noAlpha: !0
		},
		color: {},
		rgba: {
			coords: _t,
			commas: !0,
			lastAlpha: !0
		},
		rgba_number: {
			name: "rgba",
			commas: !0,
			coords: Bt
		},
		hex: {
			type: "custom",
			toGamut: !0,
			test: (e$1) => /^#([a-f0-9]{3,4}){1,2}$/i.test(e$1),
			parse(e$1) {
				e$1.length <= 5 && (e$1 = e$1.replace(/[a-f0-9]/gi, "$&$&"));
				let t$1 = [];
				return e$1.replace(/[a-f0-9]{2}/gi, (e$2) => {
					t$1.push(parseInt(e$2, 16) / 255);
				}), {
					spaceId: "srgb",
					coords: t$1.slice(0, 3),
					alpha: t$1.slice(3)[0]
				};
			},
			serialize: (e$1, t$1, { collapse: r$1 = !0 } = {}) => {
				t$1 < 1 && e$1.push(t$1), e$1 = e$1.map((e$2) => Math.round(255 * e$2));
				let a$1 = r$1 && e$1.every((e$2) => e$2 % 17 == 0), n$1 = e$1.map((e$2) => a$1 ? (e$2 / 17).toString(16) : e$2.toString(16).padStart(2, "0")).join("");
				return "#" + n$1;
			}
		},
		keyword: {
			type: "custom",
			test: (e$1) => /^[a-z]+$/i.test(e$1),
			parse(e$1) {
				let t$1 = {
					spaceId: "srgb",
					coords: null,
					alpha: 1
				};
				if ("transparent" === (e$1 = e$1.toLowerCase()) ? (t$1.coords = Rt.black, t$1.alpha = 0) : t$1.coords = Rt[e$1], t$1.coords) return t$1;
			}
		}
	}
}), kt = new z({
	id: "p3",
	cssId: "display-p3",
	name: "P3",
	base: yt,
	fromBase: Nt.fromBase,
	toBase: Nt.toBase
});
let xt;
if (v.display_space = Nt, "undefined" != typeof CSS && CSS.supports) for (let e$1 of [
	T,
	wt,
	kt
]) {
	let t$1 = e$1.getMinCoords(), r$1 = pt({
		space: e$1,
		coords: t$1,
		alpha: 1
	});
	if (CSS.supports("color", r$1)) {
		v.display_space = e$1;
		break;
	}
}
function St(e$1) {
	return P(e$1, [L, "y"]);
}
function Et(e$1, t$1) {
	O(e$1, [L, "y"], t$1);
}
var It = Object.freeze({
	__proto__: null,
	getLuminance: St,
	register: function(e$1) {
		Object.defineProperty(e$1.prototype, "luminance", {
			get() {
				return St(this);
			},
			set(e$2) {
				Et(this, e$2);
			}
		});
	},
	setLuminance: Et
});
function Lt(e$1) {
	return e$1 >= .022 ? e$1 : e$1 + (.022 - e$1) ** 1.414;
}
function zt(e$1) {
	let t$1 = e$1 < 0 ? -1 : 1, r$1 = Math.abs(e$1);
	return t$1 * Math.pow(r$1, 2.4);
}
const At = 216 / 24389, Pt = 24 / 116, jt = 24389 / 27;
let Ot = C.D65;
var $t = new S({
	id: "lab-d65",
	name: "Lab D65",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness"
		},
		a: { refRange: [-125, 125] },
		b: { refRange: [-125, 125] }
	},
	white: Ot,
	base: L,
	fromBase(e$1) {
		let t$1 = e$1.map((e$2, t$2) => e$2 / Ot[t$2]).map((e$2) => e$2 > At ? Math.cbrt(e$2) : (jt * e$2 + 16) / 116);
		return [
			116 * t$1[1] - 16,
			500 * (t$1[0] - t$1[1]),
			200 * (t$1[1] - t$1[2])
		];
	},
	toBase(e$1) {
		let t$1 = [];
		return t$1[1] = (e$1[0] + 16) / 116, t$1[0] = e$1[1] / 500 + t$1[1], t$1[2] = t$1[1] - e$1[2] / 200, [
			t$1[0] > Pt ? Math.pow(t$1[0], 3) : (116 * t$1[0] - 16) / jt,
			e$1[0] > 8 ? Math.pow((e$1[0] + 16) / 116, 3) : e$1[0] / jt,
			t$1[2] > Pt ? Math.pow(t$1[2], 3) : (116 * t$1[2] - 16) / jt
		].map((e$2, t$2) => e$2 * Ot[t$2]);
	},
	formats: { "lab-d65": { coords: [
		"<number> | <percentage>",
		"<number> | <percentage>[-1,1]",
		"<number> | <percentage>[-1,1]"
	] } }
});
const qt = .5 * Math.pow(5, .5) + .5;
var Dt = Object.freeze({
	__proto__: null,
	contrastAPCA: function(e$1, t$1) {
		let r$1, a$1, n$1, o$1, s$1, index__;
		t$1 = x(t$1), e$1 = x(e$1), t$1 = ft(t$1, "srgb"), [o$1, s$1, index__] = t$1.coords;
		let c$1 = .2126729 * zt(o$1) + .7151522 * zt(s$1) + .072175 * zt(index__);
		e$1 = ft(e$1, "srgb"), [o$1, s$1, index__] = e$1.coords;
		let l$1 = .2126729 * zt(o$1) + .7151522 * zt(s$1) + .072175 * zt(index__), u$1 = Lt(c$1), h$1 = Lt(l$1), d$1 = h$1 > u$1;
		return Math.abs(h$1 - u$1) < 5e-4 ? a$1 = 0 : d$1 ? (r$1 = h$1 ** .56 - u$1 ** .57, a$1 = 1.14 * r$1) : (r$1 = h$1 ** .65 - u$1 ** .62, a$1 = 1.14 * r$1), n$1 = Math.abs(a$1) < .1 ? 0 : a$1 > 0 ? a$1 - .027 : a$1 + .027, 100 * n$1;
	},
	contrastDeltaPhi: function(e$1, t$1) {
		e$1 = x(e$1), t$1 = x(t$1);
		let r$1 = P(e$1, [$t, "l"]), a$1 = P(t$1, [$t, "l"]), n$1 = Math.abs(Math.pow(r$1, qt) - Math.pow(a$1, qt)), o$1 = Math.pow(n$1, 1 / qt) * Math.SQRT2 - 40;
		return o$1 < 7.5 ? 0 : o$1;
	},
	contrastLstar: function(e$1, t$1) {
		e$1 = x(e$1), t$1 = x(t$1);
		let r$1 = P(e$1, [T, "l"]), a$1 = P(t$1, [T, "l"]);
		return Math.abs(r$1 - a$1);
	},
	contrastMichelson: function(e$1, t$1) {
		e$1 = x(e$1), t$1 = x(t$1);
		let r$1 = Math.max(St(e$1), 0), a$1 = Math.max(St(t$1), 0);
		a$1 > r$1 && ([r$1, a$1] = [a$1, r$1]);
		let n$1 = r$1 + a$1;
		return 0 === n$1 ? 0 : (r$1 - a$1) / n$1;
	},
	contrastWCAG21: function(e$1, t$1) {
		e$1 = x(e$1), t$1 = x(t$1);
		let r$1 = Math.max(St(e$1), 0), a$1 = Math.max(St(t$1), 0);
		return a$1 > r$1 && ([r$1, a$1] = [a$1, r$1]), (r$1 + .05) / (a$1 + .05);
	},
	contrastWeber: function(e$1, t$1) {
		e$1 = x(e$1), t$1 = x(t$1);
		let r$1 = Math.max(St(e$1), 0), a$1 = Math.max(St(t$1), 0);
		return a$1 > r$1 && ([r$1, a$1] = [a$1, r$1]), 0 === a$1 ? 5e4 : (r$1 - a$1) / a$1;
	}
});
function Ht(e$1) {
	let [t$1, r$1, a$1] = A(e$1, L), n$1 = t$1 + 15 * r$1 + 3 * a$1;
	return [4 * t$1 / n$1, 9 * r$1 / n$1];
}
function Wt(e$1) {
	let [t$1, r$1, a$1] = A(e$1, L), n$1 = t$1 + r$1 + a$1;
	return [t$1 / n$1, r$1 / n$1];
}
var Tt = Object.freeze({
	__proto__: null,
	register: function(e$1) {
		Object.defineProperty(e$1.prototype, "uv", { get() {
			return Ht(this);
		} }), Object.defineProperty(e$1.prototype, "xy", { get() {
			return Wt(this);
		} });
	},
	uv: Ht,
	xy: Wt
});
function Gt(e$1, r$1, a$1 = {}) {
	t(a$1) && (a$1 = { method: a$1 });
	let { method: n$1 = v.deltaE,...o$1 } = a$1;
	for (let t$1 in ut) if ("deltae" + n$1.toLowerCase() === t$1.toLowerCase()) return ut[t$1](e$1, r$1, o$1);
	throw new TypeError(`Unknown deltaE method: ${n$1}`);
}
var Xt = Object.freeze({
	__proto__: null,
	darken: function(e$1, t$1 = .25) {
		return O(e$1, [S.get("oklch", "lch"), "l"], (e$2) => e$2 * (1 - t$1));
	},
	lighten: function(e$1, t$1 = .25) {
		return O(e$1, [S.get("oklch", "lch"), "l"], (e$2) => e$2 * (1 + t$1));
	}
});
function Yt(e$1, t$1, a$1 = .5, n$1 = {}) {
	return [e$1, t$1] = [x(e$1), x(t$1)], "object" === r(a$1) && ([a$1, n$1] = [.5, a$1]), Ft(e$1, t$1, n$1)(a$1);
}
function Zt(e$1, t$1, r$1 = {}) {
	let a$1;
	Jt(e$1) && ([a$1, r$1] = [e$1, t$1], [e$1, t$1] = a$1.rangeArgs.colors);
	let { maxDeltaE: n$1, deltaEMethod: o$1, steps: s$1 = 2, maxSteps: index__ = 1e3,...c$1 } = r$1;
	a$1 || ([e$1, t$1] = [x(e$1), x(t$1)], a$1 = Ft(e$1, t$1, c$1));
	let l$1 = Gt(e$1, t$1), u$1 = n$1 > 0 ? Math.max(s$1, Math.ceil(l$1 / n$1) + 1) : s$1, h$1 = [];
	if (void 0 !== index__ && (u$1 = Math.min(u$1, index__)), 1 === u$1) h$1 = [{
		p: .5,
		color: a$1(.5)
	}];
	else {
		let e$2 = 1 / (u$1 - 1);
		h$1 = Array.from({ length: u$1 }, (t$2, r$2) => {
			let n$2 = r$2 * e$2;
			return {
				p: n$2,
				color: a$1(n$2)
			};
		});
	}
	if (n$1 > 0) {
		let e$2 = h$1.reduce((e$3, t$2, r$2) => {
			if (0 === r$2) return 0;
			let a$2 = Gt(t$2.color, h$1[r$2 - 1].color, o$1);
			return Math.max(e$3, a$2);
		}, 0);
		for (; e$2 > n$1;) {
			e$2 = 0;
			for (let t$2 = 1; t$2 < h$1.length && h$1.length < index__; t$2++) {
				let r$2 = h$1[t$2 - 1], n$2 = h$1[t$2], o$2 = (n$2.p + r$2.p) / 2, s$2 = a$1(o$2);
				e$2 = Math.max(e$2, Gt(s$2, r$2.color), Gt(s$2, n$2.color)), h$1.splice(t$2, 0, {
					p: o$2,
					color: a$1(o$2)
				}), t$2++;
			}
		}
	}
	return h$1 = h$1.map((e$2) => e$2.color), h$1;
}
function Ft(e$1, t$1, r$1 = {}) {
	if (Jt(e$1)) {
		let [r$2, a$2] = [e$1, t$1];
		return Ft(...r$2.rangeArgs.colors, {
			...r$2.rangeArgs.options,
			...a$2
		});
	}
	let { space: a$1, outputSpace: n$1, progression: o$1, premultiplied: s$1 } = r$1;
	e$1 = x(e$1), t$1 = x(t$1), e$1 = oe(e$1), t$1 = oe(t$1);
	let index__ = {
		colors: [e$1, t$1],
		options: r$1
	};
	if (a$1 = a$1 ? S.get(a$1) : S.registry[v.interpolationSpace] || e$1.space, n$1 = n$1 ? S.get(n$1) : a$1, e$1 = ft(e$1, a$1), t$1 = ft(t$1, a$1), e$1 = dt(e$1), t$1 = dt(t$1), a$1.coords.h && "angle" === a$1.coords.h.type) {
		let n$2 = r$1.hue = r$1.hue || "shorter", o$2 = [a$1, "h"], [s$2, index___] = [P(e$1, o$2), P(t$1, o$2)];
		isNaN(s$2) && !isNaN(index___) ? s$2 = index___ : isNaN(index___) && !isNaN(s$2) && (index___ = s$2), [s$2, index___] = function(e$2, t$2) {
			if ("raw" === e$2) return t$2;
			let [r$2, a$2] = t$2.map(G), n$3 = a$2 - r$2;
			return "increasing" === e$2 ? n$3 < 0 && (a$2 += 360) : "decreasing" === e$2 ? n$3 > 0 && (r$2 += 360) : "longer" === e$2 ? -180 < n$3 && n$3 < 180 && (n$3 > 0 ? r$2 += 360 : a$2 += 360) : "shorter" === e$2 && (n$3 > 180 ? r$2 += 360 : n$3 < -180 && (a$2 += 360)), [r$2, a$2];
		}(n$2, [s$2, index___]), O(e$1, o$2, s$2), O(t$1, o$2, index___);
	}
	return s$1 && (e$1.coords = e$1.coords.map((t$2) => t$2 * e$1.alpha), t$1.coords = t$1.coords.map((e$2) => e$2 * t$1.alpha)), Object.assign((r$2) => {
		r$2 = o$1 ? o$1(r$2) : r$2;
		let index___ = e$1.coords.map((e$2, a$2) => u(e$2, t$1.coords[a$2], r$2)), c$1 = u(e$1.alpha, t$1.alpha, r$2), l$1 = {
			space: a$1,
			coords: index___,
			alpha: c$1
		};
		return s$1 && (l$1.coords = l$1.coords.map((e$2) => e$2 / c$1)), n$1 !== a$1 && (l$1 = ft(l$1, n$1)), l$1;
	}, { rangeArgs: index__ });
}
function Jt(e$1) {
	return "function" === r(e$1) && !!e$1.rangeArgs;
}
v.interpolationSpace = "lab";
var Qt = Object.freeze({
	__proto__: null,
	isRange: Jt,
	mix: Yt,
	range: Ft,
	register: function(e$1) {
		e$1.defineFunction("mix", Yt, { returns: "color" }), e$1.defineFunction("range", Ft, { returns: "function<color>" }), e$1.defineFunction("steps", Zt, { returns: "array<color>" });
	},
	steps: Zt
}), Ut = new S({
	id: "hsl",
	name: "HSL",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		},
		s: {
			range: [0, 100],
			name: "Saturation"
		},
		l: {
			range: [0, 100],
			name: "Lightness"
		}
	},
	base: Nt,
	fromBase: (e$1) => {
		let t$1 = Math.max(...e$1), r$1 = Math.min(...e$1), [a$1, n$1, o$1] = e$1, [s$1, index__, c$1] = [
			NaN,
			0,
			(r$1 + t$1) / 2
		], l$1 = t$1 - r$1;
		if (0 !== l$1) {
			switch (index__ = 0 === c$1 || 1 === c$1 ? 0 : (t$1 - c$1) / Math.min(c$1, 1 - c$1), t$1) {
				case a$1:
					s$1 = (n$1 - o$1) / l$1 + (n$1 < o$1 ? 6 : 0);
					break;
				case n$1:
					s$1 = (o$1 - a$1) / l$1 + 2;
					break;
				case o$1: s$1 = (a$1 - n$1) / l$1 + 4;
			}
			s$1 *= 60;
		}
		return index__ < 0 && (s$1 += 180, index__ = Math.abs(index__)), s$1 >= 360 && (s$1 -= 360), [
			s$1,
			100 * index__,
			100 * c$1
		];
	},
	toBase: (e$1) => {
		let [t$1, r$1, a$1] = e$1;
		function n$1(e$2) {
			let n$2 = (e$2 + t$1 / 30) % 12, o$1 = r$1 * Math.min(a$1, 1 - a$1);
			return a$1 - o$1 * Math.max(-1, Math.min(n$2 - 3, 9 - n$2, 1));
		}
		return t$1 %= 360, t$1 < 0 && (t$1 += 360), r$1 /= 100, a$1 /= 100, [
			n$1(0),
			n$1(8),
			n$1(4)
		];
	},
	formats: {
		hsl: { coords: [
			"<number> | <angle>",
			"<percentage>",
			"<percentage>"
		] },
		hsla: {
			coords: [
				"<number> | <angle>",
				"<percentage>",
				"<percentage>"
			],
			commas: !0,
			lastAlpha: !0
		}
	}
}), Kt = new S({
	id: "hsv",
	name: "HSV",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		},
		s: {
			range: [0, 100],
			name: "Saturation"
		},
		v: {
			range: [0, 100],
			name: "Value"
		}
	},
	base: Ut,
	fromBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		r$1 /= 100, a$1 /= 100;
		let n$1 = a$1 + r$1 * Math.min(a$1, 1 - a$1);
		return [
			t$1,
			0 === n$1 ? 0 : 200 * (1 - a$1 / n$1),
			100 * n$1
		];
	},
	toBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		r$1 /= 100, a$1 /= 100;
		let n$1 = a$1 * (1 - r$1 / 2);
		return [
			t$1,
			0 === n$1 || 1 === n$1 ? 0 : (a$1 - n$1) / Math.min(n$1, 1 - n$1) * 100,
			100 * n$1
		];
	},
	formats: { color: {
		id: "--hsv",
		coords: [
			"<number> | <angle>",
			"<percentage> | <number>",
			"<percentage> | <number>"
		]
	} }
}), Vt = new S({
	id: "hwb",
	name: "HWB",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		},
		w: {
			range: [0, 100],
			name: "Whiteness"
		},
		b: {
			range: [0, 100],
			name: "Blackness"
		}
	},
	base: Kt,
	fromBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		return [
			t$1,
			a$1 * (100 - r$1) / 100,
			100 - a$1
		];
	},
	toBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		r$1 /= 100, a$1 /= 100;
		let n$1 = r$1 + a$1;
		if (n$1 >= 1) return [
			t$1,
			0,
			100 * (r$1 / n$1)
		];
		let o$1 = 1 - a$1;
		return [
			t$1,
			100 * (0 === o$1 ? 0 : 1 - r$1 / o$1),
			100 * o$1
		];
	},
	formats: { hwb: { coords: [
		"<number> | <angle>",
		"<percentage> | <number>",
		"<percentage> | <number>"
	] } }
});
var er = new z({
	id: "a98rgb-linear",
	cssId: "--a98-rgb-linear",
	name: "Linear Adobe® 98 RGB compatible",
	white: "D65",
	toXYZ_M: [
		[
			.5766690429101305,
			.1855582379065463,
			.1882286462349947
		],
		[
			.29734497525053605,
			.6273635662554661,
			.07529145849399788
		],
		[
			.02703136138641234,
			.07068885253582723,
			.9913375368376388
		]
	],
	fromXYZ_M: [
		[
			2.0415879038107465,
			-.5650069742788596,
			-.34473135077832956
		],
		[
			-.9692436362808795,
			1.8759675015077202,
			.04155505740717557
		],
		[
			.013444280632031142,
			-.11836239223101838,
			1.0151749943912054
		]
	]
}), tr = new z({
	id: "a98rgb",
	cssId: "a98-rgb",
	name: "Adobe® 98 RGB compatible",
	base: er,
	toBase: (e$1) => e$1.map((e$2) => Math.pow(Math.abs(e$2), 563 / 256) * Math.sign(e$2)),
	fromBase: (e$1) => e$1.map((e$2) => Math.pow(Math.abs(e$2), 256 / 563) * Math.sign(e$2))
});
var rr = new z({
	id: "prophoto-linear",
	cssId: "--prophoto-rgb-linear",
	name: "Linear ProPhoto",
	white: "D50",
	base: $,
	toXYZ_M: [
		[
			.7977666449006423,
			.13518129740053308,
			.0313477341283922
		],
		[
			.2880748288194013,
			.711835234241873,
			8993693872564e-17
		],
		[
			0,
			0,
			.8251046025104602
		]
	],
	fromXYZ_M: [
		[
			1.3457868816471583,
			-.25557208737979464,
			-.05110186497554526
		],
		[
			-.5446307051249019,
			1.5082477428451468,
			.02052744743642139
		],
		[
			0,
			0,
			1.2119675456389452
		]
	]
});
const ar = 1 / 512;
var nr = new z({
	id: "prophoto",
	cssId: "prophoto-rgb",
	name: "ProPhoto",
	base: rr,
	toBase: (e$1) => e$1.map((e$2) => e$2 < .03125 ? e$2 / 16 : e$2 ** 1.8),
	fromBase: (e$1) => e$1.map((e$2) => e$2 >= ar ? e$2 ** (1 / 1.8) : 16 * e$2)
}), or = new S({
	id: "oklch",
	name: "Oklch",
	coords: {
		l: {
			refRange: [0, 1],
			name: "Lightness"
		},
		c: {
			refRange: [0, .4],
			name: "Chroma"
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		}
	},
	white: "D65",
	base: re,
	fromBase(e$1) {
		let t$1, [r$1, a$1, n$1] = e$1;
		const o$1 = 2e-4;
		return t$1 = Math.abs(a$1) < o$1 && Math.abs(n$1) < o$1 ? NaN : 180 * Math.atan2(n$1, a$1) / Math.PI, [
			r$1,
			Math.sqrt(a$1 ** 2 + n$1 ** 2),
			G(t$1)
		];
	},
	toBase(e$1) {
		let t$1, r$1, [a$1, n$1, o$1] = e$1;
		return isNaN(o$1) ? (t$1 = 0, r$1 = 0) : (t$1 = n$1 * Math.cos(o$1 * Math.PI / 180), r$1 = n$1 * Math.sin(o$1 * Math.PI / 180)), [
			a$1,
			t$1,
			r$1
		];
	},
	formats: { oklch: { coords: [
		"<percentage> | <number>",
		"<number> | <percentage>[0,1]",
		"<number> | <angle>"
	] } }
});
let sr = C.D65;
const ir = 216 / 24389, cr = 24389 / 27, [lr, ur] = Ht({
	space: L,
	coords: sr
});
var hr = new S({
	id: "luv",
	name: "Luv",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness"
		},
		u: { refRange: [-215, 215] },
		v: { refRange: [-215, 215] }
	},
	white: sr,
	base: L,
	fromBase(e$1) {
		let t$1 = [
			o(e$1[0]),
			o(e$1[1]),
			o(e$1[2])
		], r$1 = t$1[1], [a$1, n$1] = Ht({
			space: L,
			coords: t$1
		});
		if (!Number.isFinite(a$1) || !Number.isFinite(n$1)) return [
			0,
			0,
			0
		];
		let s$1 = r$1 <= ir ? cr * r$1 : 116 * Math.cbrt(r$1) - 16;
		return [
			s$1,
			13 * s$1 * (a$1 - lr),
			13 * s$1 * (n$1 - ur)
		];
	},
	toBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		if (0 === t$1 || n(t$1)) return [
			0,
			0,
			0
		];
		r$1 = o(r$1), a$1 = o(a$1);
		let s$1 = r$1 / (13 * t$1) + lr, index__ = a$1 / (13 * t$1) + ur, c$1 = t$1 <= 8 ? t$1 / cr : Math.pow((t$1 + 16) / 116, 3);
		return [
			c$1 * (9 * s$1 / (4 * index__)),
			c$1,
			c$1 * ((12 - 3 * s$1 - 20 * index__) / (4 * index__))
		];
	},
	formats: { color: {
		id: "--luv",
		coords: [
			"<number> | <percentage>",
			"<number> | <percentage>[-1,1]",
			"<number> | <percentage>[-1,1]"
		]
	} }
}), dr = new S({
	id: "lchuv",
	name: "LChuv",
	coords: {
		l: {
			refRange: [0, 100],
			name: "Lightness"
		},
		c: {
			refRange: [0, 220],
			name: "Chroma"
		},
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		}
	},
	base: hr,
	fromBase(e$1) {
		let t$1, [r$1, a$1, n$1] = e$1;
		return t$1 = Math.abs(a$1) < .02 && Math.abs(n$1) < .02 ? NaN : 180 * Math.atan2(n$1, a$1) / Math.PI, [
			r$1,
			Math.sqrt(a$1 ** 2 + n$1 ** 2),
			G(t$1)
		];
	},
	toBase(e$1) {
		let [t$1, r$1, a$1] = e$1;
		return r$1 < 0 && (r$1 = 0), isNaN(a$1) && (a$1 = 0), [
			t$1,
			r$1 * Math.cos(a$1 * Math.PI / 180),
			r$1 * Math.sin(a$1 * Math.PI / 180)
		];
	},
	formats: { color: {
		id: "--lchuv",
		coords: [
			"<number> | <percentage>",
			"<number> | <percentage>",
			"<number> | <angle>"
		]
	} }
});
const mr = 216 / 24389, fr = 24389 / 27, pr = vt[0][0], gr = vt[0][1], br = vt[0][2], Mr = vt[1][0], wr = vt[1][1], yr = vt[1][2], vr = vt[2][0], Cr = vt[2][1], Rr = vt[2][2];
function _r(e$1, t$1, r$1) {
	const a$1 = t$1 / (Math.sin(r$1) - e$1 * Math.cos(r$1));
	return a$1 < 0 ? Infinity : a$1;
}
function Br(e$1) {
	const t$1 = Math.pow(e$1 + 16, 3) / 1560896, r$1 = t$1 > mr ? t$1 : e$1 / fr, a$1 = r$1 * (284517 * pr - 94839 * br), n$1 = r$1 * (838422 * br + 769860 * gr + 731718 * pr), o$1 = r$1 * (632260 * br - 126452 * gr), s$1 = r$1 * (284517 * Mr - 94839 * yr), index__ = r$1 * (838422 * yr + 769860 * wr + 731718 * Mr), c$1 = r$1 * (632260 * yr - 126452 * wr), l$1 = r$1 * (284517 * vr - 94839 * Rr), u$1 = r$1 * (838422 * Rr + 769860 * Cr + 731718 * vr), h$1 = r$1 * (632260 * Rr - 126452 * Cr);
	return {
		r0s: a$1 / o$1,
		r0i: n$1 * e$1 / o$1,
		r1s: a$1 / (o$1 + 126452),
		r1i: (n$1 - 769860) * e$1 / (o$1 + 126452),
		g0s: s$1 / c$1,
		g0i: index__ * e$1 / c$1,
		g1s: s$1 / (c$1 + 126452),
		g1i: (index__ - 769860) * e$1 / (c$1 + 126452),
		b0s: l$1 / h$1,
		b0i: u$1 * e$1 / h$1,
		b1s: l$1 / (h$1 + 126452),
		b1i: (u$1 - 769860) * e$1 / (h$1 + 126452)
	};
}
function Nr(e$1, t$1) {
	const r$1 = t$1 / 360 * Math.PI * 2, a$1 = _r(e$1.r0s, e$1.r0i, r$1), n$1 = _r(e$1.r1s, e$1.r1i, r$1), o$1 = _r(e$1.g0s, e$1.g0i, r$1), s$1 = _r(e$1.g1s, e$1.g1i, r$1), index__ = _r(e$1.b0s, e$1.b0i, r$1), c$1 = _r(e$1.b1s, e$1.b1i, r$1);
	return Math.min(a$1, n$1, o$1, s$1, index__, c$1);
}
var kr = new S({
	id: "hsluv",
	name: "HSLuv",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		},
		s: {
			range: [0, 100],
			name: "Saturation"
		},
		l: {
			range: [0, 100],
			name: "Lightness"
		}
	},
	base: dr,
	gamutSpace: Nt,
	fromBase(e$1) {
		let t$1, [r$1, a$1, n$1] = [
			o(e$1[0]),
			o(e$1[1]),
			o(e$1[2])
		];
		if (r$1 > 99.9999999) t$1 = 0, r$1 = 100;
		else if (r$1 < 1e-8) t$1 = 0, r$1 = 0;
		else t$1 = a$1 / Nr(Br(r$1), n$1) * 100;
		return [
			n$1,
			t$1,
			r$1
		];
	},
	toBase(e$1) {
		let t$1, [r$1, a$1, n$1] = [
			o(e$1[0]),
			o(e$1[1]),
			o(e$1[2])
		];
		if (n$1 > 99.9999999) n$1 = 100, t$1 = 0;
		else if (n$1 < 1e-8) n$1 = 0, t$1 = 0;
		else t$1 = Nr(Br(n$1), r$1) / 100 * a$1;
		return [
			n$1,
			t$1,
			r$1
		];
	},
	formats: { color: {
		id: "--hsluv",
		coords: [
			"<number> | <angle>",
			"<percentage> | <number>",
			"<percentage> | <number>"
		]
	} }
});
function xr(e$1, t$1) {
	return Math.abs(t$1) / Math.sqrt(Math.pow(e$1, 2) + 1);
}
function Sr(e$1) {
	let t$1 = xr(e$1.r0s, e$1.r0i), r$1 = xr(e$1.r1s, e$1.r1i), a$1 = xr(e$1.g0s, e$1.g0i), n$1 = xr(e$1.g1s, e$1.g1i), o$1 = xr(e$1.b0s, e$1.b0i), s$1 = xr(e$1.b1s, e$1.b1i);
	return Math.min(t$1, r$1, a$1, n$1, o$1, s$1);
}
vt[0][0], vt[0][1], vt[0][2], vt[1][0], vt[1][1], vt[1][2], vt[2][0], vt[2][1], vt[2][2];
var Er = new S({
	id: "hpluv",
	name: "HPLuv",
	coords: {
		h: {
			refRange: [0, 360],
			type: "angle",
			name: "Hue"
		},
		s: {
			range: [0, 100],
			name: "Saturation"
		},
		l: {
			range: [0, 100],
			name: "Lightness"
		}
	},
	base: dr,
	gamutSpace: "self",
	fromBase(e$1) {
		let t$1, [r$1, a$1, n$1] = [
			o(e$1[0]),
			o(e$1[1]),
			o(e$1[2])
		];
		if (r$1 > 99.9999999) t$1 = 0, r$1 = 100;
		else if (r$1 < 1e-8) t$1 = 0, r$1 = 0;
		else t$1 = a$1 / Sr(Br(r$1)) * 100;
		return [
			n$1,
			t$1,
			r$1
		];
	},
	toBase(e$1) {
		let t$1, [r$1, a$1, n$1] = [
			o(e$1[0]),
			o(e$1[1]),
			o(e$1[2])
		];
		if (n$1 > 99.9999999) n$1 = 100, t$1 = 0;
		else if (n$1 < 1e-8) n$1 = 0, t$1 = 0;
		else t$1 = Sr(Br(n$1)) / 100 * a$1;
		return [
			n$1,
			t$1,
			r$1
		];
	},
	formats: { color: {
		id: "--hpluv",
		coords: [
			"<number> | <angle>",
			"<percentage> | <number>",
			"<percentage> | <number>"
		]
	} }
});
const Ir = 2610 / 16384, Lr = 16384 / 2610, zr = 32 / 2523, Ar = .8359375, Pr = 2413 / 128, jr = 18.6875;
var Or = new z({
	id: "rec2100pq",
	cssId: "rec2100-pq",
	name: "REC.2100-PQ",
	base: gt,
	toBase: (e$1) => e$1.map(function(e$2) {
		return 1e4 * (Math.max(e$2 ** zr - Ar, 0) / (Pr - jr * e$2 ** zr)) ** Lr / 203;
	}),
	fromBase: (e$1) => e$1.map(function(e$2) {
		let t$1 = Math.max(203 * e$2 / 1e4, 0);
		return ((Ar + Pr * t$1 ** Ir) / (1 + jr * t$1 ** Ir)) ** 78.84375;
	})
});
const $r = .17883277, qr = .28466892, Dr = .55991073, Hr = 3.7743;
var Wr = new z({
	id: "rec2100hlg",
	cssId: "rec2100-hlg",
	name: "REC.2100-HLG",
	referred: "scene",
	base: gt,
	toBase: (e$1) => e$1.map(function(e$2) {
		return e$2 <= .5 ? e$2 ** 2 / 3 * Hr : (Math.exp((e$2 - Dr) / $r) + qr) / 12 * Hr;
	}),
	fromBase: (e$1) => e$1.map(function(e$2) {
		return (e$2 /= Hr) <= 1 / 12 ? Math.sqrt(3 * e$2) : $r * Math.log(12 * e$2 - qr) + Dr;
	})
});
const Tr = {};
function Gr({ id: e$1, toCone_M: t$1, fromCone_M: r$1 }) {
	Tr[e$1] = arguments[0];
}
function Xr(t$1, r$1, a$1 = "Bradford") {
	let n$1 = Tr[a$1], [o$1, s$1, index__] = e(n$1.toCone_M, t$1), [c$1, l$1, u$1] = e(n$1.toCone_M, r$1), h$1 = e([
		[
			c$1 / o$1,
			0,
			0
		],
		[
			0,
			l$1 / s$1,
			0
		],
		[
			0,
			0,
			u$1 / index__
		]
	], n$1.toCone_M);
	return e(n$1.fromCone_M, h$1);
}
y.add("chromatic-adaptation-start", (e$1) => {
	e$1.options.method && (e$1.M = Xr(e$1.W1, e$1.W2, e$1.options.method));
}), y.add("chromatic-adaptation-end", (e$1) => {
	e$1.M || (e$1.M = Xr(e$1.W1, e$1.W2, e$1.options.method));
}), Gr({
	id: "von Kries",
	toCone_M: [
		[
			.40024,
			.7076,
			-.08081
		],
		[
			-.2263,
			1.16532,
			.0457
		],
		[
			0,
			0,
			.91822
		]
	],
	fromCone_M: [
		[
			1.8599363874558397,
			-1.1293816185800916,
			.21989740959619328
		],
		[
			.3611914362417676,
			.6388124632850422,
			-6370596838649899e-21
		],
		[
			0,
			0,
			1.0890636230968613
		]
	]
}), Gr({
	id: "Bradford",
	toCone_M: [
		[
			.8951,
			.2664,
			-.1614
		],
		[
			-.7502,
			1.7135,
			.0367
		],
		[
			.0389,
			-.0685,
			1.0296
		]
	],
	fromCone_M: [
		[
			.9869929054667121,
			-.14705425642099013,
			.15996265166373122
		],
		[
			.4323052697233945,
			.5183602715367774,
			.049291228212855594
		],
		[
			-.00852866457517732,
			.04004282165408486,
			.96848669578755
		]
	]
}), Gr({
	id: "CAT02",
	toCone_M: [
		[
			.7328,
			.4296,
			-.1624
		],
		[
			-.7036,
			1.6975,
			.0061
		],
		[
			.003,
			.0136,
			.9834
		]
	],
	fromCone_M: [
		[
			1.0961238208355142,
			-.27886900021828726,
			.18274517938277307
		],
		[
			.4543690419753592,
			.4735331543074117,
			.07209780371722911
		],
		[
			-.009627608738429355,
			-.00569803121611342,
			1.0153256399545427
		]
	]
}), Gr({
	id: "CAT16",
	toCone_M: [
		[
			.401288,
			.650173,
			-.051461
		],
		[
			-.250268,
			1.204414,
			.045854
		],
		[
			-.002079,
			.048952,
			.953127
		]
	],
	fromCone_M: [
		[
			1.862067855087233,
			-1.0112546305316845,
			.14918677544445172
		],
		[
			.3875265432361372,
			.6214474419314753,
			-.008973985167612521
		],
		[
			-.01584149884933386,
			-.03412293802851557,
			1.0499644368778496
		]
	]
}), Object.assign(C, {
	A: [
		1.0985,
		1,
		.35585
	],
	C: [
		.98074,
		1,
		1.18232
	],
	D55: [
		.95682,
		1,
		.92149
	],
	D75: [
		.94972,
		1,
		1.22638
	],
	E: [
		1,
		1,
		1
	],
	F2: [
		.99186,
		1,
		.67393
	],
	F7: [
		.95041,
		1,
		1.08747
	],
	F11: [
		1.00962,
		1,
		.6435
	]
}), C.ACES = [
	.32168 / .33767,
	1,
	.34065 / .33767
];
var Yr = new z({
	id: "acescg",
	cssId: "--acescg",
	name: "ACEScg",
	coords: {
		r: {
			range: [0, 65504],
			name: "Red"
		},
		g: {
			range: [0, 65504],
			name: "Green"
		},
		b: {
			range: [0, 65504],
			name: "Blue"
		}
	},
	referred: "scene",
	white: C.ACES,
	toXYZ_M: [
		[
			.6624541811085053,
			.13400420645643313,
			.1561876870049078
		],
		[
			.27222871678091454,
			.6740817658111484,
			.05368951740793705
		],
		[
			-.005574649490394108,
			.004060733528982826,
			1.0103391003129971
		]
	],
	fromXYZ_M: [
		[
			1.6410233796943257,
			-.32480329418479,
			-.23642469523761225
		],
		[
			-.6636628587229829,
			1.6153315916573379,
			.016756347685530137
		],
		[
			.011721894328375376,
			-.008284441996237409,
			.9883948585390215
		]
	]
});
const Zr = 2 ** -16, Fr = -.35828683, Jr = (Math.log2(65504) + 9.72) / 17.52;
var Qr = new z({
	id: "acescc",
	cssId: "--acescc",
	name: "ACEScc",
	coords: {
		r: {
			range: [Fr, Jr],
			name: "Red"
		},
		g: {
			range: [Fr, Jr],
			name: "Green"
		},
		b: {
			range: [Fr, Jr],
			name: "Blue"
		}
	},
	referred: "scene",
	base: Yr,
	toBase: (e$1) => e$1.map(function(e$2) {
		return e$2 <= -.3013698630136986 ? 2 * (2 ** (17.52 * e$2 - 9.72) - Zr) : e$2 < Jr ? 2 ** (17.52 * e$2 - 9.72) : 65504;
	}),
	fromBase: (e$1) => e$1.map(function(e$2) {
		return e$2 <= 0 ? (Math.log2(Zr) + 9.72) / 17.52 : e$2 < Zr ? (Math.log2(Zr + .5 * e$2) + 9.72) / 17.52 : (Math.log2(e$2) + 9.72) / 17.52;
	})
}), Ur = Object.freeze({
	__proto__: null,
	A98RGB: tr,
	A98RGB_Linear: er,
	ACEScc: Qr,
	ACEScg: Yr,
	CAM16_JMh: Ve,
	HCT: st,
	HPLuv: Er,
	HSL: Ut,
	HSLuv: kr,
	HSV: Kt,
	HWB: Vt,
	ICTCP: Oe,
	JzCzHz: Be,
	Jzazbz: _e,
	LCH: X,
	LCHuv: dr,
	Lab: T,
	Lab_D65: $t,
	Luv: hr,
	OKLCH: or,
	OKLab: re,
	P3: kt,
	P3_Linear: yt,
	ProPhoto: nr,
	ProPhoto_Linear: rr,
	REC_2020: wt,
	REC_2020_Linear: gt,
	REC_2100_HLG: Wr,
	REC_2100_PQ: Or,
	XYZ_ABS_D65: ce,
	XYZ_D50: $,
	XYZ_D65: L,
	sRGB: Nt,
	sRGB_Linear: Ct
});
var Kr = class Kr {
	constructor(...e$1) {
		let t$1, r$1, a$1, n$1;
		1 === e$1.length && (t$1 = x(e$1[0])), t$1 ? (r$1 = t$1.space || t$1.spaceId, a$1 = t$1.coords, n$1 = t$1.alpha) : [r$1, a$1, n$1] = e$1, Object.defineProperty(this, "space", {
			value: S.get(r$1),
			writable: !1,
			enumerable: !0,
			configurable: !0
		}), this.coords = a$1 ? a$1.slice() : [
			0,
			0,
			0
		], this.alpha = n$1 > 1 || void 0 === n$1 ? 1 : n$1 < 0 ? 0 : n$1;
		for (let e$2 = 0; e$2 < this.coords.length; e$2++) "NaN" === this.coords[e$2] && (this.coords[e$2] = NaN);
		for (let e$2 in this.space.coords) Object.defineProperty(this, e$2, {
			get: () => this.get(e$2),
			set: (t$2) => this.set(e$2, t$2)
		});
	}
	get spaceId() {
		return this.space.id;
	}
	clone() {
		return new Kr(this.space, this.coords, this.alpha);
	}
	toJSON() {
		return {
			spaceId: this.spaceId,
			coords: this.coords,
			alpha: this.alpha
		};
	}
	display(...e$1) {
		let t$1 = function(e$2, { space: t$2 = v.display_space,...r$1 } = {}) {
			let a$1 = pt(e$2, r$1);
			if ("undefined" == typeof CSS || CSS.supports("color", a$1) || !v.display_space) a$1 = new String(a$1), a$1.color = e$2;
			else {
				let s$1 = e$2;
				if ((e$2.coords.some(n) || n(e$2.alpha)) && !(xt ??= CSS.supports("color", "hsl(none 50% 50%)")) && (s$1 = oe(e$2), s$1.coords = s$1.coords.map(o), s$1.alpha = o(s$1.alpha), a$1 = pt(s$1, r$1), CSS.supports("color", a$1))) return a$1 = new String(a$1), a$1.color = s$1, a$1;
				s$1 = ft(s$1, t$2), a$1 = new String(pt(s$1, r$1)), a$1.color = s$1;
			}
			return a$1;
		}(this, ...e$1);
		return t$1.color = new Kr(t$1.color), t$1;
	}
	static get(e$1, ...t$1) {
		return e$1 instanceof Kr ? e$1 : new Kr(e$1, ...t$1);
	}
	static defineFunction(e$1, t$1, r$1 = t$1) {
		let { instance: a$1 = !0, returns: n$1 } = r$1, o$1 = function(...e$2) {
			let r$2 = t$1(...e$2);
			if ("color" === n$1) r$2 = Kr.get(r$2);
			else if ("function<color>" === n$1) {
				let e$3 = r$2;
				r$2 = function(...t$2) {
					let r$3 = e$3(...t$2);
					return Kr.get(r$3);
				}, Object.assign(r$2, e$3);
			} else "array<color>" === n$1 && (r$2 = r$2.map((e$3) => Kr.get(e$3)));
			return r$2;
		};
		e$1 in Kr || (Kr[e$1] = o$1), a$1 && (Kr.prototype[e$1] = function(...e$2) {
			return o$1(this, ...e$2);
		});
	}
	static defineFunctions(e$1) {
		for (let t$1 in e$1) Kr.defineFunction(t$1, e$1[t$1], e$1[t$1]);
	}
	static extend(e$1) {
		if (e$1.register) e$1.register(Kr);
		else for (let t$1 in e$1) Kr.defineFunction(t$1, e$1[t$1]);
	}
};
Kr.defineFunctions({
	get: P,
	getAll: A,
	set: O,
	setAll: index_,
	to: ft,
	equals: function(e$1, t$1) {
		return e$1 = x(e$1), t$1 = x(t$1), e$1.space === t$1.space && e$1.alpha === t$1.alpha && e$1.coords.every((e$2, r$1) => e$2 === t$1.coords[r$1]);
	},
	inGamut: ne,
	toGamut: dt,
	distance: se,
	toString: pt
}), Object.assign(Kr, {
	util: w,
	hooks: y,
	WHITES: C,
	Space: S,
	spaces: S.registry,
	parse: k,
	defaults: v
});
for (let e$1 of Object.keys(Ur)) S.register(Ur[e$1]);
for (let e$1 in S.registry) Vr(e$1, S.registry[e$1]);
function Vr(e$1, t$1) {
	let r$1 = e$1.replace(/-/g, "_");
	Object.defineProperty(Kr.prototype, r$1, {
		get() {
			let r$2 = this.getAll(e$1);
			return "undefined" == typeof Proxy ? r$2 : new Proxy(r$2, {
				has: (e$2, r$3) => {
					try {
						return S.resolveCoord([t$1, r$3]), !0;
					} catch (e$3) {}
					return Reflect.has(e$2, r$3);
				},
				get: (e$2, r$3, a$1) => {
					if (r$3 && "symbol" != typeof r$3 && !(r$3 in e$2)) {
						let { index: a$2 } = S.resolveCoord([t$1, r$3]);
						if (a$2 >= 0) return e$2[a$2];
					}
					return Reflect.get(e$2, r$3, a$1);
				},
				set: (r$3, a$1, n$1, o$1) => {
					if (a$1 && "symbol" != typeof a$1 && !(a$1 in r$3) || a$1 >= 0) {
						let { index: o$2 } = S.resolveCoord([t$1, a$1]);
						if (o$2 >= 0) return r$3[o$2] = n$1, this.setAll(e$1, r$3), !0;
					}
					return Reflect.set(r$3, a$1, n$1, o$1);
				}
			});
		},
		set(t$2) {
			this.setAll(e$1, t$2);
		},
		configurable: !0,
		enumerable: !0
	});
}
y.add("colorspace-init-end", (e$1) => {
	Vr(e$1.id, e$1), e$1.aliases?.forEach((t$1) => {
		Vr(t$1, e$1);
	});
}), Kr.extend(ut), Kr.extend({ deltaE: Gt }), Object.assign(Kr, { deltaEMethods: ut }), Kr.extend(Xt), Kr.extend({ contrast: function(e$1, r$1, a$1 = {}) {
	t(a$1) && (a$1 = { algorithm: a$1 });
	let { algorithm: n$1,...o$1 } = a$1;
	if (!n$1) {
		let e$2 = Object.keys(Dt).map((e$3) => e$3.replace(/^contrast/, "")).join(", ");
		throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${e$2}`);
	}
	e$1 = x(e$1), r$1 = x(r$1);
	for (let t$1 in Dt) if ("contrast" + n$1.toLowerCase() === t$1.toLowerCase()) return Dt[t$1](e$1, r$1, o$1);
	throw new TypeError(`Unknown contrast algorithm: ${n$1}`);
} }), Kr.extend(Tt), Kr.extend(It), Kr.extend(Qt), Kr.extend(Dt);

//#endregion
export { colorjs_exports };
//# sourceMappingURL=colorjs-DjdMu2PK.js.map