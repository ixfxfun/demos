import { __commonJS, __export, __toESM } from "./chunk-51aI8Tpl.js";
import { resultToError$2 as resultToError } from "./numbers-Dp7VYKrL.js";
import { afterMatch } from "./text-BmH3rFpl.js";
import { getErrorMessage$4 as getErrorMessage } from "./src-CjCi0sir.js";
import { clamp$2 as clamp } from "./clamp-C4PxbMDL.js";
import { round$2 as round } from "./round-Dkz221db.js";
import { Empty, guard, isPlaceholder, isPlaceholder$1 } from "./empty-j1qlaeLR.js";
import { Placeholder, getPointParameter, multiply, subtract } from "./multiply-46C_yNZY.js";
import { Empty$1, EmptyPositioned, PlaceholderPositioned } from "./placeholder-COZyJ_Ma.js";

//#region ../packages/core/src/track-unique.ts
/**
* Tracks unique object instances. Returns _true_ if value is unique.
* Alternatively: {@link unique} to track by value.
*/
const uniqueInstances = () => {
	const set = new Set();
	return (value) => {
		if (value === null) throw new TypeError(`Param 'value' cannot be null`);
		if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
		if (set.has(value)) return false;
		set.add(value);
		return true;
	};
};

//#endregion
//#region ../packages/dom/dist/src/css-angle.js
const cssAngleParse = (value) => {
	if (typeof value === `number`) return {
		value,
		unit: `deg`
	};
	value = value.toLowerCase();
	if (value.endsWith(`rad`)) return {
		value: Number.parseFloat(value.substring(0, value.length - 3)),
		unit: `rad`
	};
	if (value.endsWith(`turn`)) return {
		value: Number.parseFloat(value.substring(0, value.length - 4)),
		unit: `turn`
	};
	if (value.endsWith(`deg`)) return {
		value: Number.parseFloat(value.substring(0, value.length - 3)),
		unit: `deg`
	};
	return {
		value: Number.parseFloat(value),
		unit: `deg`
	};
};

//#endregion
//#region ../packages/dom/dist/src/resolve-el.js
/**
* Resolves either a string or HTML element to an element.
* Useful when an argument is either an HTML element or query.
*
* ```js
* resolveEl(`#someId`);
* resolveEl(someElement);
* ```
* @param domQueryOrEl
* @returns
*/
const resolveEl = (domQueryOrEl) => {
	const r = resolveElementTry(domQueryOrEl);
	if (r.success) return r.value;
	throw resultToError(r);
};
const resolveElementTry = (domQueryOrEl) => {
	if (typeof domQueryOrEl === `string`) {
		const d = document.querySelector(domQueryOrEl);
		if (d === null) {
			const error = domQueryOrEl.startsWith(`#`) ? `Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'` : `Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`;
			return {
				success: false,
				error
			};
		}
		domQueryOrEl = d;
	} else if (domQueryOrEl === null) return {
		success: false,
		error: `Param 'domQueryOrEl' is null`
	};
	else if (domQueryOrEl === void 0) return {
		success: false,
		error: `Param 'domQueryOrEl' is undefined`
	};
	const el$1 = domQueryOrEl;
	return {
		success: true,
		value: el$1
	};
};
const resolveEls = (selectors) => {
	if (selectors === void 0) return [];
	if (selectors === null) return [];
	if (Array.isArray(selectors)) return selectors;
	if (typeof selectors === `string`) {
		const elements = [...document.querySelectorAll(selectors)];
		return elements;
	}
	return [selectors];
};

//#endregion
//#region ../packages/dom/dist/src/ts-util.js
function isHtmlElement(o) {
	return typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
}

//#endregion
//#region ../packages/dom/dist/src/css-variables.js
/**
* Parses input in the form of: `['elementid-attribute', 'default-value']`.
* Eg, `['indicator-fill', 'gray']` will yield:
* ```
* { variable: `indicator-fill`, attribute: `fill`, id: `indicator`, defaultValue: `gray` }
* ```
*
* Once parsed, use {@link setFromVariables} to apply data.
*
* ```js
* // Array of arrays is treated as a set of key-value pairs
* const options = [ [`indicator-fill`, `gray`], [`backdrop-fill`, `whitesmoke`] ]
* const attrs = parseAsAttributes(options);
* Yields:
* [
*  { variable: `indicator-fill`, attribute: `fill`, id: `indicator`, defaultValue: `gray` }
*  { variable: `backdrop-fill`, attribute: `fill`, id: `backdrop`, defaultValue: `whitesmoke` }
* ]
*
* // Assign
* setFromCssVariables(document.body, attrs);
* ```
* @param options
* @returns
*/
const parseAsAttributes = (options) => {
	return options.map((opt) => {
		let defaultValue;
		if (Array.isArray(opt)) {
			defaultValue = opt[1];
			opt = opt[0];
		}
		const dash = opt.indexOf(`-`);
		if (dash < 0) throw new Error(`Simple expression expects form of: 'elementid-attribute'`);
		return {
			variable: opt,
			attribute: opt.slice(dash + 1),
			id: opt.slice(0, dash),
			defaultValue
		};
	});
};
/**
* Reads the value of a CSS variable and assign it to HTML attributes or object field.
*
* ```js
* const options = [
*  // Set the 'width' attribute to the value of --some-css-variable to all elements with class 'blah'
*  { query: `.blah`, variable: `some-css-variable`, attribute: `width` }
*
*  // Set #blah's 'size' attribute to the value of css variable '--size'
*  { id: 'blah', variable: 'size', attribute: 'size' }
*
*  // Sets someEL.blah = css variable '--hue'
*  { element: someEl, variable: `hue`, field: `blah` }
* ]
*
* setFromVariables(document.body, ...options);
* ```
*
* The first parameter is the context for which CSS variable values are fetched
* as well as for resolving query selectors. This can usually be `document.body`.
* @param context Context element which is needed for relative querying. Otherwise use document.body
* @param options Details of what to do
*/
const setFromVariables = (context, ...options) => {
	const contextEl = resolveEl(context);
	const style = window.getComputedStyle(contextEl);
	for (const opt of options) {
		const variable = afterMatch(opt.variable, `--`);
		let v = style.getPropertyValue(`--${variable}`);
		if (v === null || v.length === 0) if (opt.defaultValue === void 0) continue;
		else v = opt.defaultValue;
		let query$1;
		let els;
		if (`query` in opt && opt.query !== void 0) query$1 = opt.query;
		else if (`id` in opt && opt.id !== void 0) query$1 = `#${opt.id}`;
		else if (`object` in opt && opt.object !== void 0) els = Array.isArray(opt.object) ? opt.object : [opt.object];
		if (query$1 === void 0) {
			if (els === void 0) throw new Error(`Missing 'query', 'id' or 'object' fields`);
		} else els = [...contextEl.querySelectorAll(query$1)];
		if (els === null) continue;
		if (els === void 0) continue;
		if (opt.attribute) for (const el$1 of els) if (isHtmlElement(el$1)) el$1.setAttribute(opt.attribute, v);
		else throw new Error(`Trying to set an attribute on something not a HTML element`, el$1);
		else if (opt.field) for (const el$1 of els) if (typeof el$1 === `object`) el$1[opt.field] = v;
		else throw new Error(`Trying to set field on something that is not an object (${typeof el$1})`, el$1);
		else throw new Error(`Neither 'attribute' or 'field' to set is defined in option (${JSON.stringify(opt)})`);
	}
};
/**
* Computes the styles for `elt` (or defaults to document.body) using `fallback`
* as a set of default values.
*
* ```js
* // Fetch styles
* const styles = getWithFallback({
*  my_var: `red`
* }, element);
*
* // Access --my-var, or if it doesn't exist returns 'red'
* styles.my_var;
* ```
*
* Hyphen case (eg 'my-var') is a common way of delimiting words in CSS variables, but
* can't be (elegantly) used in object properties. Instead, use '_' in the
* object key, which is replaced with '-'.
*
* The leading '--' is not needed either.
* @param fallback
* @param elt
* @returns
*/
function getWithFallback(fallback, elt) {
	const styles = getComputedStyle(elt ?? document.body);
	const entries = Object.entries(fallback);
	const filledEntries = entries.map((entry) => {
		return [entry[0], getFromStyles(styles, entry[0], entry[1])];
	});
	return Object.fromEntries(filledEntries);
}
/**
* Sets CSS variables.
* ```js
* const vars = {
*  my_var: `red`,
*  my_size: 10
* }
*
* // Set to document.body
* setVariables(vars);
*
* // Set to an element
* setVariables(vars, elem);
*
* // Or to a CSSStyleDeclaration
* setVariables(vars, styles);
* ```
* @param vars
* @param stylesOrEl
*/
function setVariables(variables, stylesOrEl) {
	const styles = stylesOrEl === void 0 ? document.body.style : isHtmlElement(stylesOrEl) ? stylesOrEl.style : stylesOrEl;
	for (const [key, value] of Object.entries(variables)) {
		let variableName = key.replaceAll("_", "-");
		if (!variableName.startsWith(`--`)) variableName = `--` + variableName;
		styles.setProperty(variableName, value.toString());
	}
}
/**
* Returns a CSS variable from a CSS style declaration, or returning `fallback`.
* ```js
* // These will all access --my-var
* getFromStyles(getComputedStyle(element), `--my-var`, `red`);
* getFromStyles(getComputedStyle(element), `my-var`, `red`);
* getFromStyles(getComputedStyle(element), `my_var`, `red`);
* ```
* @param styles
* @param name
* @param fallback
* @returns
*/
function getFromStyles(styles, name, fallback) {
	if (!name.startsWith(`--`)) name = `--` + name;
	name = name.replaceAll(`_`, `-`);
	const v = styles.getPropertyValue(name);
	if (v.length === 0) return fallback;
	if (typeof fallback === `number`) return parseFloat(v);
	if (typeof fallback === `boolean`) {
		if (v === `true`) return true;
		else if (v === `false`) return false;
	}
	return v;
}

//#endregion
//#region ../packages/dom/dist/src/css.js
/**
* Returns the value of `getBoundingClientRect` plus the width of all the borders
* @param elOrQuery
* @returns
*/
const getBoundingClientRectWithBorder = (elOrQuery) => {
	let el$1 = resolveEl(elOrQuery);
	const size = el$1.getBoundingClientRect();
	if (el$1 instanceof SVGElement) el$1 = el$1.parentElement;
	const border = getComputedPixels(el$1, `borderTopWidth`, `borderLeftWidth`, `borderRightWidth`, `borderBottomWidth`);
	return {
		x: size.x,
		y: size.y,
		width: size.width + border.borderLeftWidth + border.borderRightWidth,
		height: size.height + border.borderTopWidth + border.borderBottomWidth
	};
};
/**
* Returns the computed measurements of CSS properties via [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
* ```js
* const v = getComputedPixels(`#some-el`, `borderTopWidth`, `borderLeftWidth`);
* v.borderTopWidth;  // number
* b.borderLeftWidth; // number
* ```
*
* Throws an error if value from `getComputedStyle` is not a string or does not end in 'px'.
* @param elOrQuery
* @param properties
* @returns
*/
const getComputedPixels = (elOrQuery, ...properties) => {
	const s = getComputedStyle(resolveEl(elOrQuery));
	const returnValue = {};
	for (const property of properties) {
		const v = s[property];
		if (typeof v === `string`) if (v.endsWith(`px`)) returnValue[property] = Number.parseFloat(v.substring(0, v.length - 2));
		else throw new Error(`Property '${String(property)}' does not end in 'px'. Value: ${v}`);
		else throw new Error(`Property '${String(property)}' is not type string. Got: ${typeof v} Value: ${v}`);
	}
	return returnValue;
};
/**
* Adds `cssClass` to element(s) if `value` is true.
* ```js
* setClass(`#someId`, true, `activated`);
* ```
* @param selectors
* @param value
* @param cssClass
* @returns
*/
const setCssClass = (selectors, value, cssClass) => {
	const elements = resolveEls(selectors);
	if (elements.length === 0) return;
	for (const element of elements) if (value) element.classList.add(cssClass);
	else element.classList.remove(cssClass);
};
/**
* Toggles a CSS class on all elements that match selector
* @param selectors
* @param cssClass
* @returns
*/
const setCssToggle = (selectors, cssClass) => {
	const elements = resolveEls(selectors);
	if (elements.length === 0) return;
	for (const element of elements) element.classList.toggle(cssClass);
};
const setCssDisplay = (selectors, value) => {
	const elements = resolveEls(selectors);
	if (elements.length === 0) return;
	for (const element of elements) element.style.display = value;
};

//#endregion
//#region ../node_modules/.pnpm/json5@2.2.3/node_modules/json5/dist/index.js
var require_dist = __commonJS({ "../node_modules/.pnpm/json5@2.2.3/node_modules/json5/dist/index.js"(exports, module) {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
	})(exports, function() {
		"use strict";
		function createCommonjsModule(fn, module$1) {
			return module$1 = { exports: {} }, fn(module$1, module$1.exports), module$1.exports;
		}
		var _global = createCommonjsModule(function(module$1) {
			var global = module$1.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
			if (typeof __g == "number") __g = global;
		});
		var _core = createCommonjsModule(function(module$1) {
			var core = module$1.exports = { version: "2.6.5" };
			if (typeof __e == "number") __e = core;
		});
		var _core_1 = _core.version;
		var _isObject = function(it) {
			return typeof it === "object" ? it !== null : typeof it === "function";
		};
		var _anObject = function(it) {
			if (!_isObject(it)) throw TypeError(it + " is not an object!");
			return it;
		};
		var _fails = function(exec) {
			try {
				return !!exec();
			} catch (e) {
				return true;
			}
		};
		var _descriptors = !_fails(function() {
			return Object.defineProperty({}, "a", { get: function() {
				return 7;
			} }).a != 7;
		});
		var document$1 = _global.document;
		var is = _isObject(document$1) && _isObject(document$1.createElement);
		var _domCreate = function(it) {
			return is ? document$1.createElement(it) : {};
		};
		var _ie8DomDefine = !_descriptors && !_fails(function() {
			return Object.defineProperty(_domCreate("div"), "a", { get: function() {
				return 7;
			} }).a != 7;
		});
		var _toPrimitive = function(it, S) {
			if (!_isObject(it)) return it;
			var fn, val;
			if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) return val;
			if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) return val;
			if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) return val;
			throw TypeError("Can't convert object to primitive value");
		};
		var dP = Object.defineProperty;
		var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
			_anObject(O);
			P = _toPrimitive(P, true);
			_anObject(Attributes);
			if (_ie8DomDefine) try {
				return dP(O, P, Attributes);
			} catch (e) {}
			if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
			if ("value" in Attributes) O[P] = Attributes.value;
			return O;
		};
		var _objectDp = { f };
		var _propertyDesc = function(bitmap, value) {
			return {
				enumerable: !(bitmap & 1),
				configurable: !(bitmap & 2),
				writable: !(bitmap & 4),
				value
			};
		};
		var _hide = _descriptors ? function(object, key$1, value) {
			return _objectDp.f(object, key$1, _propertyDesc(1, value));
		} : function(object, key$1, value) {
			object[key$1] = value;
			return object;
		};
		var hasOwnProperty = {}.hasOwnProperty;
		var _has = function(it, key$1) {
			return hasOwnProperty.call(it, key$1);
		};
		var id = 0;
		var px = Math.random();
		var _uid = function(key$1) {
			return "Symbol(".concat(key$1 === void 0 ? "" : key$1, ")_", (++id + px).toString(36));
		};
		var _library = false;
		var _shared = createCommonjsModule(function(module$1) {
			var SHARED = "__core-js_shared__";
			var store = _global[SHARED] || (_global[SHARED] = {});
			(module$1.exports = function(key$1, value) {
				return store[key$1] || (store[key$1] = value !== void 0 ? value : {});
			})("versions", []).push({
				version: _core.version,
				mode: _library ? "pure" : "global",
				copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
			});
		});
		var _functionToString = _shared("native-function-to-string", Function.toString);
		var _redefine = createCommonjsModule(function(module$1) {
			var SRC = _uid("src");
			var TO_STRING = "toString";
			var TPL = ("" + _functionToString).split(TO_STRING);
			_core.inspectSource = function(it) {
				return _functionToString.call(it);
			};
			(module$1.exports = function(O, key$1, val, safe) {
				var isFunction = typeof val == "function";
				if (isFunction) _has(val, "name") || _hide(val, "name", key$1);
				if (O[key$1] === val) return;
				if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key$1] ? "" + O[key$1] : TPL.join(String(key$1)));
				if (O === _global) O[key$1] = val;
				else if (!safe) {
					delete O[key$1];
					_hide(O, key$1, val);
				} else if (O[key$1]) O[key$1] = val;
				else _hide(O, key$1, val);
			})(Function.prototype, TO_STRING, function toString() {
				return typeof this == "function" && this[SRC] || _functionToString.call(this);
			});
		});
		var _aFunction = function(it) {
			if (typeof it != "function") throw TypeError(it + " is not a function!");
			return it;
		};
		var _ctx = function(fn, that, length) {
			_aFunction(fn);
			if (that === void 0) return fn;
			switch (length) {
				case 1: return function(a) {
					return fn.call(that, a);
				};
				case 2: return function(a, b) {
					return fn.call(that, a, b);
				};
				case 3: return function(a, b, c$1) {
					return fn.call(that, a, b, c$1);
				};
			}
			return function() {
				return fn.apply(that, arguments);
			};
		};
		var PROTOTYPE = "prototype";
		var $export = function(type, name, source$1) {
			var IS_FORCED = type & $export.F;
			var IS_GLOBAL = type & $export.G;
			var IS_STATIC = type & $export.S;
			var IS_PROTO = type & $export.P;
			var IS_BIND = type & $export.B;
			var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
			var exports$1 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
			var expProto = exports$1[PROTOTYPE] || (exports$1[PROTOTYPE] = {});
			var key$1, own, out, exp;
			if (IS_GLOBAL) source$1 = name;
			for (key$1 in source$1) {
				own = !IS_FORCED && target && target[key$1] !== void 0;
				out = (own ? target : source$1)[key$1];
				exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
				if (target) _redefine(target, key$1, out, type & $export.U);
				if (exports$1[key$1] != out) _hide(exports$1, key$1, exp);
				if (IS_PROTO && expProto[key$1] != out) expProto[key$1] = out;
			}
		};
		_global.core = _core;
		$export.F = 1;
		$export.G = 2;
		$export.S = 4;
		$export.P = 8;
		$export.B = 16;
		$export.W = 32;
		$export.U = 64;
		$export.R = 128;
		var _export = $export;
		var ceil = Math.ceil;
		var floor = Math.floor;
		var _toInteger = function(it) {
			return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
		};
		var _defined = function(it) {
			if (it == void 0) throw TypeError("Can't call method on  " + it);
			return it;
		};
		var _stringAt = function(TO_STRING) {
			return function(that, pos$1) {
				var s = String(_defined(that));
				var i = _toInteger(pos$1);
				var l = s.length;
				var a, b;
				if (i < 0 || i >= l) return TO_STRING ? "" : void 0;
				a = s.charCodeAt(i);
				return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
			};
		};
		var $at = _stringAt(false);
		_export(_export.P, "String", { codePointAt: function codePointAt$1(pos$1) {
			return $at(this, pos$1);
		} });
		var codePointAt = _core.String.codePointAt;
		var max = Math.max;
		var min = Math.min;
		var _toAbsoluteIndex = function(index, length) {
			index = _toInteger(index);
			return index < 0 ? max(index + length, 0) : min(index, length);
		};
		var fromCharCode = String.fromCharCode;
		var $fromCodePoint = String.fromCodePoint;
		_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", { fromCodePoint: function fromCodePoint$1(x) {
			var arguments$1 = arguments;
			var res = [];
			var aLen = arguments.length;
			var i = 0;
			var code;
			while (aLen > i) {
				code = +arguments$1[i++];
				if (_toAbsoluteIndex(code, 1114111) !== code) throw RangeError(code + " is not a valid code point");
				res.push(code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320));
			}
			return res.join("");
		} });
		var fromCodePoint = _core.String.fromCodePoint;
		var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
		var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
		var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
		var unicode = {
			Space_Separator,
			ID_Start,
			ID_Continue
		};
		var util = {
			isSpaceSeparator: function isSpaceSeparator(c$1) {
				return typeof c$1 === "string" && unicode.Space_Separator.test(c$1);
			},
			isIdStartChar: function isIdStartChar(c$1) {
				return typeof c$1 === "string" && (c$1 >= "a" && c$1 <= "z" || c$1 >= "A" && c$1 <= "Z" || c$1 === "$" || c$1 === "_" || unicode.ID_Start.test(c$1));
			},
			isIdContinueChar: function isIdContinueChar(c$1) {
				return typeof c$1 === "string" && (c$1 >= "a" && c$1 <= "z" || c$1 >= "A" && c$1 <= "Z" || c$1 >= "0" && c$1 <= "9" || c$1 === "$" || c$1 === "_" || c$1 === "‌" || c$1 === "‍" || unicode.ID_Continue.test(c$1));
			},
			isDigit: function isDigit(c$1) {
				return typeof c$1 === "string" && /[0-9]/.test(c$1);
			},
			isHexDigit: function isHexDigit(c$1) {
				return typeof c$1 === "string" && /[0-9A-Fa-f]/.test(c$1);
			}
		};
		var source;
		var parseState;
		var stack;
		var pos;
		var line;
		var column;
		var token;
		var key;
		var root;
		var parse = function parse$1(text, reviver) {
			source = String(text);
			parseState = "start";
			stack = [];
			pos = 0;
			line = 1;
			column = 0;
			token = void 0;
			key = void 0;
			root = void 0;
			do {
				token = lex();
				parseStates[parseState]();
			} while (token.type !== "eof");
			if (typeof reviver === "function") return internalize({ "": root }, "", reviver);
			return root;
		};
		function internalize(holder, name, reviver) {
			var value = holder[name];
			if (value != null && typeof value === "object") if (Array.isArray(value)) for (var i = 0; i < value.length; i++) {
				var key$1 = String(i);
				var replacement = internalize(value, key$1, reviver);
				if (replacement === void 0) delete value[key$1];
				else Object.defineProperty(value, key$1, {
					value: replacement,
					writable: true,
					enumerable: true,
					configurable: true
				});
			}
			else for (var key$1$1 in value) {
				var replacement$1 = internalize(value, key$1$1, reviver);
				if (replacement$1 === void 0) delete value[key$1$1];
				else Object.defineProperty(value, key$1$1, {
					value: replacement$1,
					writable: true,
					enumerable: true,
					configurable: true
				});
			}
			return reviver.call(holder, name, value);
		}
		var lexState;
		var buffer;
		var doubleQuote;
		var sign;
		var c;
		function lex() {
			lexState = "default";
			buffer = "";
			doubleQuote = false;
			sign = 1;
			for (;;) {
				c = peek();
				var token$1 = lexStates[lexState]();
				if (token$1) return token$1;
			}
		}
		function peek() {
			if (source[pos]) return String.fromCodePoint(source.codePointAt(pos));
		}
		function read() {
			var c$1 = peek();
			if (c$1 === "\n") {
				line++;
				column = 0;
			} else if (c$1) column += c$1.length;
			else column++;
			if (c$1) pos += c$1.length;
			return c$1;
		}
		var lexStates = {
			default: function default$1() {
				switch (c) {
					case "	":
					case "\v":
					case "\f":
					case " ":
					case "\xA0":
					case "﻿":
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						read();
						return;
					case "/":
						read();
						lexState = "comment";
						return;
					case void 0:
						read();
						return newToken("eof");
				}
				if (util.isSpaceSeparator(c)) {
					read();
					return;
				}
				return lexStates[parseState]();
			},
			comment: function comment() {
				switch (c) {
					case "*":
						read();
						lexState = "multiLineComment";
						return;
					case "/":
						read();
						lexState = "singleLineComment";
						return;
				}
				throw invalidChar(read());
			},
			multiLineComment: function multiLineComment() {
				switch (c) {
					case "*":
						read();
						lexState = "multiLineCommentAsterisk";
						return;
					case void 0: throw invalidChar(read());
				}
				read();
			},
			multiLineCommentAsterisk: function multiLineCommentAsterisk() {
				switch (c) {
					case "*":
						read();
						return;
					case "/":
						read();
						lexState = "default";
						return;
					case void 0: throw invalidChar(read());
				}
				read();
				lexState = "multiLineComment";
			},
			singleLineComment: function singleLineComment() {
				switch (c) {
					case "\n":
					case "\r":
					case "\u2028":
					case "\u2029":
						read();
						lexState = "default";
						return;
					case void 0:
						read();
						return newToken("eof");
				}
				read();
			},
			value: function value() {
				switch (c) {
					case "{":
					case "[": return newToken("punctuator", read());
					case "n":
						read();
						literal("ull");
						return newToken("null", null);
					case "t":
						read();
						literal("rue");
						return newToken("boolean", true);
					case "f":
						read();
						literal("alse");
						return newToken("boolean", false);
					case "-":
					case "+":
						if (read() === "-") sign = -1;
						lexState = "sign";
						return;
					case ".":
						buffer = read();
						lexState = "decimalPointLeading";
						return;
					case "0":
						buffer = read();
						lexState = "zero";
						return;
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						buffer = read();
						lexState = "decimalInteger";
						return;
					case "I":
						read();
						literal("nfinity");
						return newToken("numeric", Infinity);
					case "N":
						read();
						literal("aN");
						return newToken("numeric", NaN);
					case "\"":
					case "'":
						doubleQuote = read() === "\"";
						buffer = "";
						lexState = "string";
						return;
				}
				throw invalidChar(read());
			},
			identifierNameStartEscape: function identifierNameStartEscape() {
				if (c !== "u") throw invalidChar(read());
				read();
				var u = unicodeEscape();
				switch (u) {
					case "$":
					case "_": break;
					default:
						if (!util.isIdStartChar(u)) throw invalidIdentifier();
						break;
				}
				buffer += u;
				lexState = "identifierName";
			},
			identifierName: function identifierName() {
				switch (c) {
					case "$":
					case "_":
					case "‌":
					case "‍":
						buffer += read();
						return;
					case "\\":
						read();
						lexState = "identifierNameEscape";
						return;
				}
				if (util.isIdContinueChar(c)) {
					buffer += read();
					return;
				}
				return newToken("identifier", buffer);
			},
			identifierNameEscape: function identifierNameEscape() {
				if (c !== "u") throw invalidChar(read());
				read();
				var u = unicodeEscape();
				switch (u) {
					case "$":
					case "_":
					case "‌":
					case "‍": break;
					default:
						if (!util.isIdContinueChar(u)) throw invalidIdentifier();
						break;
				}
				buffer += u;
				lexState = "identifierName";
			},
			sign: function sign$1() {
				switch (c) {
					case ".":
						buffer = read();
						lexState = "decimalPointLeading";
						return;
					case "0":
						buffer = read();
						lexState = "zero";
						return;
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						buffer = read();
						lexState = "decimalInteger";
						return;
					case "I":
						read();
						literal("nfinity");
						return newToken("numeric", sign * Infinity);
					case "N":
						read();
						literal("aN");
						return newToken("numeric", NaN);
				}
				throw invalidChar(read());
			},
			zero: function zero() {
				switch (c) {
					case ".":
						buffer += read();
						lexState = "decimalPoint";
						return;
					case "e":
					case "E":
						buffer += read();
						lexState = "decimalExponent";
						return;
					case "x":
					case "X":
						buffer += read();
						lexState = "hexadecimal";
						return;
				}
				return newToken("numeric", sign * 0);
			},
			decimalInteger: function decimalInteger() {
				switch (c) {
					case ".":
						buffer += read();
						lexState = "decimalPoint";
						return;
					case "e":
					case "E":
						buffer += read();
						lexState = "decimalExponent";
						return;
				}
				if (util.isDigit(c)) {
					buffer += read();
					return;
				}
				return newToken("numeric", sign * Number(buffer));
			},
			decimalPointLeading: function decimalPointLeading() {
				if (util.isDigit(c)) {
					buffer += read();
					lexState = "decimalFraction";
					return;
				}
				throw invalidChar(read());
			},
			decimalPoint: function decimalPoint() {
				switch (c) {
					case "e":
					case "E":
						buffer += read();
						lexState = "decimalExponent";
						return;
				}
				if (util.isDigit(c)) {
					buffer += read();
					lexState = "decimalFraction";
					return;
				}
				return newToken("numeric", sign * Number(buffer));
			},
			decimalFraction: function decimalFraction() {
				switch (c) {
					case "e":
					case "E":
						buffer += read();
						lexState = "decimalExponent";
						return;
				}
				if (util.isDigit(c)) {
					buffer += read();
					return;
				}
				return newToken("numeric", sign * Number(buffer));
			},
			decimalExponent: function decimalExponent() {
				switch (c) {
					case "+":
					case "-":
						buffer += read();
						lexState = "decimalExponentSign";
						return;
				}
				if (util.isDigit(c)) {
					buffer += read();
					lexState = "decimalExponentInteger";
					return;
				}
				throw invalidChar(read());
			},
			decimalExponentSign: function decimalExponentSign() {
				if (util.isDigit(c)) {
					buffer += read();
					lexState = "decimalExponentInteger";
					return;
				}
				throw invalidChar(read());
			},
			decimalExponentInteger: function decimalExponentInteger() {
				if (util.isDigit(c)) {
					buffer += read();
					return;
				}
				return newToken("numeric", sign * Number(buffer));
			},
			hexadecimal: function hexadecimal() {
				if (util.isHexDigit(c)) {
					buffer += read();
					lexState = "hexadecimalInteger";
					return;
				}
				throw invalidChar(read());
			},
			hexadecimalInteger: function hexadecimalInteger() {
				if (util.isHexDigit(c)) {
					buffer += read();
					return;
				}
				return newToken("numeric", sign * Number(buffer));
			},
			string: function string() {
				switch (c) {
					case "\\":
						read();
						buffer += escape();
						return;
					case "\"":
						if (doubleQuote) {
							read();
							return newToken("string", buffer);
						}
						buffer += read();
						return;
					case "'":
						if (!doubleQuote) {
							read();
							return newToken("string", buffer);
						}
						buffer += read();
						return;
					case "\n":
					case "\r": throw invalidChar(read());
					case "\u2028":
					case "\u2029":
						separatorChar(c);
						break;
					case void 0: throw invalidChar(read());
				}
				buffer += read();
			},
			start: function start() {
				switch (c) {
					case "{":
					case "[": return newToken("punctuator", read());
				}
				lexState = "value";
			},
			beforePropertyName: function beforePropertyName() {
				switch (c) {
					case "$":
					case "_":
						buffer = read();
						lexState = "identifierName";
						return;
					case "\\":
						read();
						lexState = "identifierNameStartEscape";
						return;
					case "}": return newToken("punctuator", read());
					case "\"":
					case "'":
						doubleQuote = read() === "\"";
						lexState = "string";
						return;
				}
				if (util.isIdStartChar(c)) {
					buffer += read();
					lexState = "identifierName";
					return;
				}
				throw invalidChar(read());
			},
			afterPropertyName: function afterPropertyName() {
				if (c === ":") return newToken("punctuator", read());
				throw invalidChar(read());
			},
			beforePropertyValue: function beforePropertyValue() {
				lexState = "value";
			},
			afterPropertyValue: function afterPropertyValue() {
				switch (c) {
					case ",":
					case "}": return newToken("punctuator", read());
				}
				throw invalidChar(read());
			},
			beforeArrayValue: function beforeArrayValue() {
				if (c === "]") return newToken("punctuator", read());
				lexState = "value";
			},
			afterArrayValue: function afterArrayValue() {
				switch (c) {
					case ",":
					case "]": return newToken("punctuator", read());
				}
				throw invalidChar(read());
			},
			end: function end() {
				throw invalidChar(read());
			}
		};
		function newToken(type, value) {
			return {
				type,
				value,
				line,
				column
			};
		}
		function literal(s) {
			for (var i = 0, list = s; i < list.length; i += 1) {
				var c$1 = list[i];
				var p = peek();
				if (p !== c$1) throw invalidChar(read());
				read();
			}
		}
		function escape() {
			var c$1 = peek();
			switch (c$1) {
				case "b":
					read();
					return "\b";
				case "f":
					read();
					return "\f";
				case "n":
					read();
					return "\n";
				case "r":
					read();
					return "\r";
				case "t":
					read();
					return "	";
				case "v":
					read();
					return "\v";
				case "0":
					read();
					if (util.isDigit(peek())) throw invalidChar(read());
					return "\0";
				case "x":
					read();
					return hexEscape();
				case "u":
					read();
					return unicodeEscape();
				case "\n":
				case "\u2028":
				case "\u2029":
					read();
					return "";
				case "\r":
					read();
					if (peek() === "\n") read();
					return "";
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": throw invalidChar(read());
				case void 0: throw invalidChar(read());
			}
			return read();
		}
		function hexEscape() {
			var buffer$1 = "";
			var c$1 = peek();
			if (!util.isHexDigit(c$1)) throw invalidChar(read());
			buffer$1 += read();
			c$1 = peek();
			if (!util.isHexDigit(c$1)) throw invalidChar(read());
			buffer$1 += read();
			return String.fromCodePoint(parseInt(buffer$1, 16));
		}
		function unicodeEscape() {
			var buffer$1 = "";
			var count = 4;
			while (count-- > 0) {
				var c$1 = peek();
				if (!util.isHexDigit(c$1)) throw invalidChar(read());
				buffer$1 += read();
			}
			return String.fromCodePoint(parseInt(buffer$1, 16));
		}
		var parseStates = {
			start: function start() {
				if (token.type === "eof") throw invalidEOF();
				push();
			},
			beforePropertyName: function beforePropertyName() {
				switch (token.type) {
					case "identifier":
					case "string":
						key = token.value;
						parseState = "afterPropertyName";
						return;
					case "punctuator":
						pop();
						return;
					case "eof": throw invalidEOF();
				}
			},
			afterPropertyName: function afterPropertyName() {
				if (token.type === "eof") throw invalidEOF();
				parseState = "beforePropertyValue";
			},
			beforePropertyValue: function beforePropertyValue() {
				if (token.type === "eof") throw invalidEOF();
				push();
			},
			beforeArrayValue: function beforeArrayValue() {
				if (token.type === "eof") throw invalidEOF();
				if (token.type === "punctuator" && token.value === "]") {
					pop();
					return;
				}
				push();
			},
			afterPropertyValue: function afterPropertyValue() {
				if (token.type === "eof") throw invalidEOF();
				switch (token.value) {
					case ",":
						parseState = "beforePropertyName";
						return;
					case "}": pop();
				}
			},
			afterArrayValue: function afterArrayValue() {
				if (token.type === "eof") throw invalidEOF();
				switch (token.value) {
					case ",":
						parseState = "beforeArrayValue";
						return;
					case "]": pop();
				}
			},
			end: function end() {}
		};
		function push() {
			var value;
			switch (token.type) {
				case "punctuator":
					switch (token.value) {
						case "{":
							value = {};
							break;
						case "[":
							value = [];
							break;
					}
					break;
				case "null":
				case "boolean":
				case "numeric":
				case "string":
					value = token.value;
					break;
			}
			if (root === void 0) root = value;
			else {
				var parent = stack[stack.length - 1];
				if (Array.isArray(parent)) parent.push(value);
				else Object.defineProperty(parent, key, {
					value,
					writable: true,
					enumerable: true,
					configurable: true
				});
			}
			if (value !== null && typeof value === "object") {
				stack.push(value);
				if (Array.isArray(value)) parseState = "beforeArrayValue";
				else parseState = "beforePropertyName";
			} else {
				var current = stack[stack.length - 1];
				if (current == null) parseState = "end";
				else if (Array.isArray(current)) parseState = "afterArrayValue";
				else parseState = "afterPropertyValue";
			}
		}
		function pop() {
			stack.pop();
			var current = stack[stack.length - 1];
			if (current == null) parseState = "end";
			else if (Array.isArray(current)) parseState = "afterArrayValue";
			else parseState = "afterPropertyValue";
		}
		function invalidChar(c$1) {
			if (c$1 === void 0) return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
			return syntaxError("JSON5: invalid character '" + formatChar(c$1) + "' at " + line + ":" + column);
		}
		function invalidEOF() {
			return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
		}
		function invalidIdentifier() {
			column -= 5;
			return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
		}
		function separatorChar(c$1) {
			console.warn("JSON5: '" + formatChar(c$1) + "' in strings is not valid ECMAScript; consider escaping");
		}
		function formatChar(c$1) {
			var replacements = {
				"'": "\\'",
				"\"": "\\\"",
				"\\": "\\\\",
				"\b": "\\b",
				"\f": "\\f",
				"\n": "\\n",
				"\r": "\\r",
				"	": "\\t",
				"\v": "\\v",
				"\0": "\\0",
				"\u2028": "\\u2028",
				"\u2029": "\\u2029"
			};
			if (replacements[c$1]) return replacements[c$1];
			if (c$1 < " ") {
				var hexString = c$1.charCodeAt(0).toString(16);
				return "\\x" + ("00" + hexString).substring(hexString.length);
			}
			return c$1;
		}
		function syntaxError(message) {
			var err = new SyntaxError(message);
			err.lineNumber = line;
			err.columnNumber = column;
			return err;
		}
		var stringify = function stringify$1(value, replacer, space) {
			var stack$1 = [];
			var indent = "";
			var propertyList;
			var replacerFunc;
			var gap = "";
			var quote;
			if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
				space = replacer.space;
				quote = replacer.quote;
				replacer = replacer.replacer;
			}
			if (typeof replacer === "function") replacerFunc = replacer;
			else if (Array.isArray(replacer)) {
				propertyList = [];
				for (var i = 0, list = replacer; i < list.length; i += 1) {
					var v = list[i];
					var item = void 0;
					if (typeof v === "string") item = v;
					else if (typeof v === "number" || v instanceof String || v instanceof Number) item = String(v);
					if (item !== void 0 && propertyList.indexOf(item) < 0) propertyList.push(item);
				}
			}
			if (space instanceof Number) space = Number(space);
			else if (space instanceof String) space = String(space);
			if (typeof space === "number") {
				if (space > 0) {
					space = Math.min(10, Math.floor(space));
					gap = "          ".substr(0, space);
				}
			} else if (typeof space === "string") gap = space.substr(0, 10);
			return serializeProperty("", { "": value });
			function serializeProperty(key$1, holder) {
				var value$1 = holder[key$1];
				if (value$1 != null) {
					if (typeof value$1.toJSON5 === "function") value$1 = value$1.toJSON5(key$1);
					else if (typeof value$1.toJSON === "function") value$1 = value$1.toJSON(key$1);
				}
				if (replacerFunc) value$1 = replacerFunc.call(holder, key$1, value$1);
				if (value$1 instanceof Number) value$1 = Number(value$1);
				else if (value$1 instanceof String) value$1 = String(value$1);
				else if (value$1 instanceof Boolean) value$1 = value$1.valueOf();
				switch (value$1) {
					case null: return "null";
					case true: return "true";
					case false: return "false";
				}
				if (typeof value$1 === "string") return quoteString(value$1, false);
				if (typeof value$1 === "number") return String(value$1);
				if (typeof value$1 === "object") return Array.isArray(value$1) ? serializeArray(value$1) : serializeObject(value$1);
				return void 0;
			}
			function quoteString(value$1) {
				var quotes = {
					"'": .1,
					"\"": .2
				};
				var replacements = {
					"'": "\\'",
					"\"": "\\\"",
					"\\": "\\\\",
					"\b": "\\b",
					"\f": "\\f",
					"\n": "\\n",
					"\r": "\\r",
					"	": "\\t",
					"\v": "\\v",
					"\0": "\\0",
					"\u2028": "\\u2028",
					"\u2029": "\\u2029"
				};
				var product = "";
				for (var i$1 = 0; i$1 < value$1.length; i$1++) {
					var c$1 = value$1[i$1];
					switch (c$1) {
						case "'":
						case "\"":
							quotes[c$1]++;
							product += c$1;
							continue;
						case "\0": if (util.isDigit(value$1[i$1 + 1])) {
							product += "\\x00";
							continue;
						}
					}
					if (replacements[c$1]) {
						product += replacements[c$1];
						continue;
					}
					if (c$1 < " ") {
						var hexString = c$1.charCodeAt(0).toString(16);
						product += "\\x" + ("00" + hexString).substring(hexString.length);
						continue;
					}
					product += c$1;
				}
				var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
					return quotes[a] < quotes[b] ? a : b;
				});
				product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
				return quoteChar + product + quoteChar;
			}
			function serializeObject(value$1) {
				if (stack$1.indexOf(value$1) >= 0) throw TypeError("Converting circular structure to JSON5");
				stack$1.push(value$1);
				var stepback = indent;
				indent = indent + gap;
				var keys = propertyList || Object.keys(value$1);
				var partial = [];
				for (var i$1 = 0, list$1 = keys; i$1 < list$1.length; i$1 += 1) {
					var key$1 = list$1[i$1];
					var propertyString = serializeProperty(key$1, value$1);
					if (propertyString !== void 0) {
						var member = serializeKey(key$1) + ":";
						if (gap !== "") member += " ";
						member += propertyString;
						partial.push(member);
					}
				}
				var final;
				if (partial.length === 0) final = "{}";
				else {
					var properties;
					if (gap === "") {
						properties = partial.join(",");
						final = "{" + properties + "}";
					} else {
						var separator = ",\n" + indent;
						properties = partial.join(separator);
						final = "{\n" + indent + properties + ",\n" + stepback + "}";
					}
				}
				stack$1.pop();
				indent = stepback;
				return final;
			}
			function serializeKey(key$1) {
				if (key$1.length === 0) return quoteString(key$1, true);
				var firstChar = String.fromCodePoint(key$1.codePointAt(0));
				if (!util.isIdStartChar(firstChar)) return quoteString(key$1, true);
				for (var i$1 = firstChar.length; i$1 < key$1.length; i$1++) if (!util.isIdContinueChar(String.fromCodePoint(key$1.codePointAt(i$1)))) return quoteString(key$1, true);
				return key$1;
			}
			function serializeArray(value$1) {
				if (stack$1.indexOf(value$1) >= 0) throw TypeError("Converting circular structure to JSON5");
				stack$1.push(value$1);
				var stepback = indent;
				indent = indent + gap;
				var partial = [];
				for (var i$1 = 0; i$1 < value$1.length; i$1++) {
					var propertyString = serializeProperty(String(i$1), value$1);
					partial.push(propertyString !== void 0 ? propertyString : "null");
				}
				var final;
				if (partial.length === 0) final = "[]";
				else if (gap === "") {
					var properties = partial.join(",");
					final = "[" + properties + "]";
				} else {
					var separator = ",\n" + indent;
					var properties$1 = partial.join(separator);
					final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
				}
				stack$1.pop();
				indent = stepback;
				return final;
			}
		};
		var JSON5 = {
			parse,
			stringify
		};
		var lib = JSON5;
		var es5 = lib;
		return es5;
	});
} });
var import_dist = __toESM(require_dist(), 1);

//#endregion
//#region ../packages/dom/dist/src/data-table.js
const padding = (v, options) => {
	if (options.leftPadding) {
		if (v.length < options.leftPadding) return "&nbsp;".repeat(options.leftPadding - v.length) + v;
	}
	return v;
};
const convertNumber = (v, o) => {
	v = o.roundNumbers !== void 0 ? round(o.roundNumbers, v) : v;
	let asString = o.precision !== void 0 ? v.toFixed(o.precision) : v.toString();
	asString = padding(asString.toString(), o);
	return asString;
};
const toHtmlSimple = (v, options) => {
	if (v === null) return `(null)`;
	if (v === void 0) return `(undefined)`;
	if (typeof v === `boolean`) return v ? `true` : `false`;
	if (typeof v === `string`) return `"${v}"`;
	if (typeof v === `number`) return convertNumber(v, options.numbers);
	if (typeof v === `object`) return toTableSimple(v, options);
	return import_dist.default.stringify(v);
};
const toTableSimple = (v, options) => {
	let html = `<div style="display:grid; grid-template-columns: repeat(2, 1fr)">`;
	for (const entry of Object.entries(v)) {
		const value = toHtmlSimple(entry[1], options);
		html += `<div class="label" style="display:table-cell">${entry[0]}</div>
      <div class="data" style="display:table-cell">${value}</div>`;
	}
	html += `</div>`;
	return html;
};
/**
* Creates a table of data points for each object in the map
* ```
* const t = DataTable.fromList(parentEl, map);
* t.update(newMap);
* ```
*/
const fromList = (parentOrQuery, data) => {
	const parent = resolveEl(parentOrQuery);
	let container = document.createElement(`DIV`);
	parent.append(container);
	const options = {
		numbers: {},
		objectsAsTables: true
	};
	const remove = () => {
		if (!container) return false;
		container.remove();
		container = void 0;
		return true;
	};
	const update = (data$1) => {
		const seenTables = new Set();
		for (const [key, value] of data$1) {
			const tKey = `table-${key}`;
			seenTables.add(tKey);
			let t = parent.querySelector(`#${tKey}`);
			if (t === null) {
				t = document.createElement(`table`);
				if (!t) throw new Error(`Could not create table element`);
				t.id = tKey;
				parent.append(t);
			}
			updateElement(t, value, options);
		}
		const tables = Array.from(parent.querySelectorAll(`table`));
		for (const t of tables) if (!seenTables.has(t.id)) t.remove();
	};
	if (data) update(data);
	return {
		update,
		remove
	};
};
/**
* Updates the given table element so each entry in the map is a
* row in the table.
*
* Rows are keyed by the map key. Rows with keys not found in the map are deleted.
* @param t Table
* @param data Map of data
* @param options Options
* @returns
*/
const updateElement = (t, data, options) => {
	const numberFormatting = options.numbers ?? {};
	const idPrefix = options.idPrefix ?? ``;
	const objectsAsTables = options.objectsAsTables ?? false;
	if (data === void 0) {
		t.innerHTML = ``;
		return;
	}
	const seenRows = new Set();
	for (const [key, value] of Object.entries(data)) {
		const domKey = `${idPrefix}-row-${key}`;
		seenRows.add(domKey);
		let rowEl = t.querySelector(`tr[data-key='${domKey}']`);
		if (rowEl === null) {
			rowEl = document.createElement(`tr`);
			t.append(rowEl);
			rowEl.setAttribute(`data-key`, domKey);
			const keyEl = document.createElement(`td`);
			keyEl.textContent = key;
			keyEl.classList.add(`label`);
			rowEl.append(keyEl);
		}
		let valEl = rowEl.querySelector(`td[data-key='${domKey}-val']`);
		if (valEl === null) {
			valEl = document.createElement(`td`);
			valEl.classList.add(`data`);
			valEl.setAttribute(`data-key`, `${domKey}-val`);
			rowEl.append(valEl);
		}
		let valueHTML;
		if (options.formatter) valueHTML = options.formatter(value, key);
		if (valueHTML === void 0) if (typeof value === `object`) valueHTML = objectsAsTables ? toTableSimple(value, options) : import_dist.default.stringify(value);
		else if (typeof value === `number`) valueHTML = convertNumber(value, numberFormatting);
		else if (typeof value === `boolean`) valueHTML = value ? `true` : `false`;
		else if (typeof value === `string`) valueHTML = `"${value}"`;
		else valueHTML = JSON.stringify(value);
		valEl.innerHTML = valueHTML;
	}
	const rows = Array.from(t.querySelectorAll(`tr`));
	for (const r of rows) {
		const key = r.getAttribute(`data-key`);
		if (!seenRows.has(key)) r.remove();
	}
};
/**
* Creates a HTML table where each row is a key-value pair from `data`.
* First column is the key, second column data.
*
* ```js
* const dt = fromObject(`#hostDiv`);
* ```
*
* `dt` is a function to call when you want to update data:
*
* ```js
* dt({
*  name: `Blerg`,
*  height: 120
* });
* ```
*/
const fromObject = (parentOrQuery, data, opts = {}) => {
	const parent = resolveEl(parentOrQuery);
	const idPrefix = opts.idPrefix ?? Math.floor(Math.random() * 1e3).toString();
	const options = {
		numbers: {},
		objectsAsTables: true,
		idPrefix: ``,
		...opts
	};
	let t = document.createElement(`table`);
	parent.append(t);
	const remove = () => {
		if (!t) return false;
		t.remove();
		t = void 0;
		return true;
	};
	if (data) updateElement(t, data, options);
	const update = (d) => {
		if (!t) throw new Error(`Table disposed`);
		updateElement(t, d, {
			...options,
			idPrefix
		});
	};
	return {
		remove,
		update
	};
};

//#endregion
//#region ../packages/dom/dist/src/data-display.js
/**
* Creates a simple display for data. Designed to show ixfx state data
*
* ```js
* // Create once
* const display = new DataDisplay();
*
* // Call .update to show state
* display.update(state);
* ```
*/
var DataDisplay = class {
	dataTable;
	/**
	* Constructor
	* @param options Options
	*/
	constructor(options = {}) {
		const theme = options.theme ?? `dark`;
		const existing = document.querySelector(`#ixfx-data-display`);
		if (existing !== null) throw new Error(`DataDisplay already loaded on this page`);
		const container = document.createElement(`div`);
		container.id = `ixfx-data-display`;
		container.classList.add(`theme-${theme}`);
		const css = document.createElement(`style`);
		css.textContent = `
    #ixfx-data-display {
      background: white;
      color: black;
      border: 2px solid hsl(0deg 0.61% 90%);
      border-radius: 4px;
      z-index: 1000;
      opacity: 40%;
      padding: 1em;
      font-family: monospace;
      position: fixed;
      right: 1em;
      top: 1em;
    }
    #ixfx-data-display.theme-dark {
      background: black;
      color: white;
      border: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display:hover {
      opacity: 100%;
    }
    #ixfx-data-display table {
      border-collapse: collapse;
    }
    #ixfx-data-display tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 90%);
    }
    #ixfx-data-display.dark tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display td {
      padding-bottom: 0.4em;
      padding-top: 0.4em;
    }
    #ixfx-data-display .label {
      color: hsl(0deg 0.61% 60%);
      text-align: right;
      padding-right: 0.5em;
    }
    #ixfx-data-display.theme-dark .label {
      color: gray;
    }
    `;
		container.style.display = `inline-block`;
		document.body.append(css);
		document.body.append(container);
		this.dataTable = fromObject(container, void 0, {
			objectsAsTables: true,
			...options
		});
	}
	update(data) {
		this.dataTable.update(data);
	}
};

//#endregion
//#region ../packages/geometry/src/rect/cardinal.ts
/**
* Returns a point on cardinal direction, or 'center' for the middle.
*
* ```js
* cardinal({x: 10, y:10, width:100, height: 20}, 'center');
* ```
* @param rect Rectangle
* @param card Cardinal direction or 'center'
* @returns Point
*/
const cardinal = (rect, card) => {
	const { x, y, width, height } = rect;
	switch (card) {
		case `nw`: return Object.freeze({
			x,
			y
		});
		case `n`: return Object.freeze({
			x: x + width / 2,
			y
		});
		case `ne`: return Object.freeze({
			x: x + width,
			y
		});
		case `sw`: return Object.freeze({
			x,
			y: y + height
		});
		case `s`: return Object.freeze({
			x: x + width / 2,
			y: y + height
		});
		case `se`: return Object.freeze({
			x: x + width,
			y: y + height
		});
		case `w`: return Object.freeze({
			x,
			y: y + height / 2
		});
		case `e`: return Object.freeze({
			x: x + width,
			y: y + height / 2
		});
		case `center`: return Object.freeze({
			x: x + width / 2,
			y: y + height / 2
		});
		default: throw new Error(`Unknown direction: ${card}`);
	}
};

//#endregion
//#region ../packages/random/src/guid.ts
/**
* Generates a short roughly unique id
* ```js
* const id = shortGuid();
* ```
* @param options Options.
* @returns
*/
const shortGuid = (options = {}) => {
	const source = options.source ?? Math.random;
	const firstPart = Math.trunc(source() * 46656);
	const secondPart = Math.trunc(source() * 46656);
	const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
	const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
	return firstPartString + secondPartString;
};

//#endregion
//#region ../packages/dom/dist/src/drag-drop.js
const draggable = (elemOrQuery, listener, options = {}) => {
	const elem = resolveEl(elemOrQuery);
	/**
	* Viewport location at drag start
	*/
	let initialPointerPosition = Placeholder;
	let token;
	const autoTranslate = options.autoTranslate ?? false;
	const quickDrag = options.quickDrag ?? false;
	const fence = options.fence ? resolveEl(options.fence) : void 0;
	const fenceViewport = options.fenceViewport;
	let fenceOffset = PlaceholderPositioned;
	const relativePosition = window.getComputedStyle(elem).position === `relative`;
	const onParentClick = () => {
		const selected = elem.classList.contains(`drag-sel`);
		if (selected) elem.classList.remove(`drag-sel`);
	};
	const onElementClick = (event) => {
		const selected = elem.classList.contains(`drag-sel`);
		if (selected) elem.classList.remove(`drag-sel`);
		else elem.classList.add(`drag-sel`);
		event.stopPropagation();
	};
	elem.ownerDocument.addEventListener(`click`, onParentClick);
	elem.addEventListener(`click`, onElementClick);
	const dragCleanup = () => {
		elem.classList.remove(`drag-progress`);
		elem.ownerDocument.removeEventListener(`pointermove`, onPointerMove);
		elem.ownerDocument.removeEventListener(`pointerup`, onPointerUp);
		elem.ownerDocument.removeEventListener(`pointercancel`, onDragCancel);
	};
	const dispose = () => {
		if (elem.classList.contains(`drag-progress`)) onDragCancel(void 0, `dispose`);
		else dragCleanup();
		elem.ownerDocument.removeEventListener(`click`, onParentClick);
		elem.removeEventListener(`click`, onElementClick);
	};
	const validateOffsetAndPoint = (offset, x, y) => {
		if (!isPlaceholder(fenceOffset)) {
			offset = {
				x: clamp(offset.x, fenceOffset.x, fenceOffset.width),
				y: clamp(offset.y, fenceOffset.y, fenceOffset.height)
			};
			if (fenceViewport) {
				x = clamp(x, fenceViewport.x, fenceViewport.x + fenceViewport.width);
				y = clamp(y, fenceViewport.y, fenceViewport.y + fenceViewport.height);
			}
		}
		return [offset, {
			x,
			y
		}];
	};
	let lastMoveOffset = Empty;
	const onPointerMove = (moveEvent) => {
		moveEvent.preventDefault();
		moveEvent.stopPropagation();
		const { x, y } = moveEvent;
		let offset = isPlaceholder$1(initialPointerPosition) ? {
			x: moveEvent.offsetX,
			y: moveEvent.offsetY
		} : {
			x: x - initialPointerPosition.x,
			y: y - initialPointerPosition.y
		};
		const r = validateOffsetAndPoint(offset, x, y);
		offset = r[0];
		const state = {
			delta: offset,
			initial: initialPointerPosition,
			token,
			viewport: r[1]
		};
		if (typeof listener.progress !== `undefined`) {
			const p = listener.progress(state);
			if (p.abort) {
				onDragCancel(void 0, `discontinued`);
				return;
			}
			if (p.viewport) offset = {
				x: p.viewport.x - initialPointerPosition.x,
				y: p.viewport.y - initialPointerPosition.y
			};
		}
		lastMoveOffset = offset;
		if (autoTranslate) {
			const offsetX = offset.x;
			const offsetY = offset.y;
			elem.style.translate = `${offsetX}px ${offsetY}px`;
		}
	};
	const onPointerUp = (upEvent) => {
		const bounds = elem.getBoundingClientRect();
		dragCleanup();
		const { x, y } = upEvent;
		const r = validateOffsetAndPoint(lastMoveOffset, x, y);
		const state = {
			initial: initialPointerPosition,
			token,
			delta: r[0],
			viewport: r[1]
		};
		if (autoTranslate) {
			elem.style.translate = `none`;
			if (relativePosition) {
				const parent = elem.parentElement?.getBoundingClientRect();
				elem.style.left = `${bounds.x - parent.left}px`;
				elem.style.top = `${bounds.y - parent.top}px`;
			} else {
				elem.style.left = `${bounds.x}px`;
				elem.style.top = `${bounds.y}px`;
			}
		}
		if (typeof listener.success !== `undefined`) listener.success(state);
	};
	const onDragCancel = (event, reason = `pointercancel`) => {
		dragCleanup();
		let viewport = Placeholder;
		if (event && `x` in event && `y` in event) viewport = {
			x: event.x,
			y: event.y
		};
		const state = {
			token,
			initial: initialPointerPosition,
			delta: {
				x: -1,
				y: -1
			},
			viewport
		};
		if (typeof listener.abort !== `undefined`) listener.abort(reason, state);
	};
	elem.addEventListener(`pointerdown`, (event) => {
		const selected = elem.classList.contains(`drag-sel`);
		if (!selected && !quickDrag) return;
		const event_ = event;
		initialPointerPosition = {
			x: event_.x,
			y: event_.y
		};
		const s = typeof listener.start === `undefined` ? {
			allow: true,
			token
		} : listener.start();
		if (!s.allow) return;
		token = s.token;
		if (fence) {
			const fenceBounds = fence.getBoundingClientRect();
			fenceOffset = {
				x: fenceBounds.x - initialPointerPosition.x,
				y: fenceBounds.y - initialPointerPosition.y,
				width: fenceBounds.x + fenceBounds.width - initialPointerPosition.x,
				height: fenceBounds.y + fenceBounds.height - initialPointerPosition.y
			};
		} else if (fenceViewport) fenceOffset = {
			x: fenceViewport.x - initialPointerPosition.x,
			y: fenceViewport.y - initialPointerPosition.y,
			width: fenceViewport.width + fenceViewport.x - initialPointerPosition.x,
			height: fenceViewport.height + fenceViewport.y - initialPointerPosition.y
		};
		elem.classList.add(`drag-progress`);
		elem.ownerDocument.addEventListener(`pointermove`, onPointerMove);
		elem.ownerDocument.addEventListener(`pointerup`, onPointerUp);
		elem.ownerDocument.addEventListener(`pointercancel`, onDragCancel);
	});
	return dispose;
};

//#endregion
//#region ../packages/dom/dist/src/set-property.js
function setText(selectors, value) {
	return setProperty(`textContent`, selectors, value);
}
function setHtml(selectors, value) {
	return setProperty(`innerHTML`, selectors, value);
}
function setProperty(property, selectors, value) {
	let elements = [];
	const set = (v) => {
		const typ = typeof v;
		const vv = typ === `string` || typ === `number` || typ === `boolean` ? v : JSON.stringify(v);
		if (elements.length === 0) elements = resolveEls(selectors);
		for (const element of elements) element[property] = vv;
		return vv;
	};
	return value === void 0 ? set : set(value);
}

//#endregion
//#region ../packages/dom/dist/src/el.js
const el = (selectors) => {
	const elements = resolveEls(selectors);
	const text = setText(elements);
	const html = setHtml(elements);
	return {
		text,
		html,
		cssDisplay: (value) => {
			setCssDisplay(elements, value);
		},
		cssClass: (value, cssClass) => {
			setCssClass(elements, value, cssClass);
		},
		cssToggle: (cssClass) => {
			setCssToggle(elements, cssClass);
		},
		el: () => elements[0],
		els: () => elements
	};
};
const elRequery = (selectors) => {};

//#endregion
//#region ../packages/dom/dist/src/element-sizing.js
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
var ElementSizer = class ElementSizer {
	#stretch;
	#size;
	#naturalSize;
	#naturalRatio;
	#viewport;
	#onSetSize;
	#el;
	#containerEl;
	#disposed = false;
	#resizeObservable;
	constructor(elOrQuery, options) {
		this.#el = resolveEl(elOrQuery);
		this.#containerEl = options.containerEl ? resolveEl(options.containerEl) : this.#el.parentElement;
		this.#stretch = options.stretch ?? `none`;
		this.#onSetSize = options.onSetSize;
		this.#size = Empty$1;
		let naturalSize = options.naturalSize;
		if (naturalSize === void 0) naturalSize = this.#el.getBoundingClientRect();
		this.#naturalRatio = 1;
		this.#naturalSize = naturalSize;
		this.setNaturalSize(naturalSize);
		this.#viewport = EmptyPositioned;
		if (this.#containerEl === document.body) this.#byViewport();
		else this.#byContainer();
	}
	dispose(reason) {
		if (this.#disposed) return;
		this.#disposed = true;
		if (this.#resizeObservable) {
			this.#resizeObservable.disconnect();
			this.#resizeObservable = void 0;
		}
	}
	static canvasParent(canvasElementOrQuery, options) {
		const el$1 = resolveEl(canvasElementOrQuery);
		const er = new ElementSizer(el$1, {
			...options,
			onSetSize(size, el$2) {
				el$2.width = size.width;
				el$2.height = size.height;
				if (options.onSetSize) options.onSetSize(size, el$2);
			}
		});
		return er;
	}
	static canvasViewport(canvasElementOrQuery, options) {
		const el$1 = resolveEl(canvasElementOrQuery);
		el$1.style.position = `absolute`;
		el$1.style.zIndex = (options.zIndex ?? 0).toString();
		el$1.style.left = `0px`;
		el$1.style.top = `0px`;
		const opts = {
			...options,
			containerEl: document.body
		};
		return this.canvasParent(canvasElementOrQuery, opts);
	}
	/**
	* Size an SVG element to match viewport
	* @param svg
	* @returns
	*/
	static svgViewport(svg, onSizeSet) {
		const er = new ElementSizer(svg, {
			containerEl: document.body,
			stretch: `both`,
			onSetSize(size) {
				svg.setAttribute(`width`, size.width.toString());
				svg.setAttribute(`height`, size.height.toString());
				if (onSizeSet) onSizeSet(size);
			}
		});
		return er;
	}
	#byContainer() {
		const c = this.#containerEl;
		if (!c) throw new Error(`No container element`);
		const r = new ResizeObserver((entries) => {
			this.#onParentResize(entries);
		});
		r.observe(c);
		const current = this.#computeSizeBasedOnParent(c.getBoundingClientRect());
		this.size = current;
		this.#resizeObservable = r;
	}
	#byViewport() {
		const r = new ResizeObserver((entries) => {
			this.#onViewportResize();
		});
		r.observe(document.documentElement);
		this.#resizeObservable = r;
		this.#onViewportResize();
	}
	#onViewportResize() {
		this.size = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.#viewport = {
			x: 0,
			y: 0,
			...this.size
		};
	}
	/**
	* Sets the 'natural' size of an element.
	* This can also be specified when creating ElementSizer.
	* @param size
	*/
	setNaturalSize(size) {
		this.#naturalSize = size;
		this.#naturalRatio = size.width / size.height;
	}
	get naturalSize() {
		return this.#naturalSize;
	}
	get viewport() {
		return this.#viewport;
	}
	#computeSizeBasedOnParent(parentSize) {
		let { width, height } = parentSize;
		let stretch = this.#stretch;
		if (stretch === `min`) stretch = width < height ? `width` : `height`;
		else if (stretch === `max`) stretch = width > height ? `width` : `height`;
		if (stretch === `width`) height = width / this.#naturalRatio;
		else if (stretch === `height`) width = height * this.#naturalRatio;
		if (this.#el instanceof HTMLElement) {
			const b = getComputedPixels(this.#el, `borderTopWidth`, `borderLeftWidth`, `borderRightWidth`, `borderBottomWidth`);
			width -= b.borderLeftWidth + b.borderRightWidth;
			height -= b.borderTopWidth + b.borderBottomWidth;
		}
		return {
			width,
			height
		};
	}
	#onParentResize(args) {
		const box = args[0].contentBoxSize[0];
		const parentSize = {
			width: box.inlineSize,
			height: box.blockSize
		};
		this.size = this.#computeSizeBasedOnParent(parentSize);
		this.#viewport = {
			x: 0,
			y: 0,
			width: parentSize.width,
			height: parentSize.height
		};
	}
	set size(size) {
		guard(size, `size`);
		this.#size = size;
		this.#onSetSize(size, this.#el);
	}
	get size() {
		return this.#size;
	}
};

//#endregion
//#region ../packages/dom/dist/src/error-handler.js
/**
* Creates an error handler to show errors on-screen.
* This is useful when testing on mobile devices that lack access to the console.
*
* ```js
* const e = defaultErrorHandler();
* ```
*
* Manual control:
* ```js
* const e = defaultErrorHandler();
* e.show(someError);
* e.hide();
* ```
* @returns
*/
const defaultErrorHandler = () => {
	let enabled = true;
	const container = document.createElement(`div`);
	container.style.color = `black`;
	container.style.border = `2px solid red`;
	container.style.backgroundColor = `hsl(0, 80%, 90%)`;
	container.style.padding = `1em`;
	container.style.display = `none`;
	container.style.top = `1em`;
	container.style.left = `1em`;
	container.style.position = `absolute`;
	container.style.fontFamily = `monospace`;
	const messageElement = document.createElement(`div`);
	messageElement.style.maxWidth = `50vw`;
	messageElement.style.maxHeight = `50vh`;
	messageElement.style.overflowY = `scroll`;
	container.innerHTML = `<h1>Error</h1>`;
	container.append(messageElement);
	const styleButton = (b) => {
		b.style.padding = `0.3em`;
		b.style.marginTop = `1em`;
	};
	const buttonClose = document.createElement(`button`);
	buttonClose.textContent = `Close`;
	buttonClose.addEventListener(`click`, () => {
		hide();
	});
	const buttonStop = document.createElement(`button`);
	buttonStop.textContent = `Stop displaying errors`;
	buttonStop.addEventListener(`click`, () => {
		enabled = false;
		hide();
	});
	styleButton(buttonClose);
	styleButton(buttonStop);
	container.append(buttonClose);
	container.append(buttonStop);
	document.body.append(container);
	const show = (ex) => {
		container.style.display = `inline`;
		messageElement.innerHTML += ex.stack ? `<pre>${ex.stack}</pre>` : `<p>${getErrorMessage(ex)}</p>`;
	};
	const hide = () => {
		container.style.display = `none`;
	};
	window.onerror = (message, url, lineNo, colNo, error) => {
		if (enabled) if (error) {
			console.log(error);
			show(error);
		} else {
			console.log(message);
			show(message);
		}
	};
	window.addEventListener(`unhandledrejection`, (event) => {
		console.log(event.reason);
		if (enabled) show(event.reason);
	});
	return {
		show,
		hide
	};
};

//#endregion
//#region ../packages/dom/dist/src/forms.js
var forms_exports = {};
__export(forms_exports, {
	button: () => button,
	buttonCreate: () => buttonCreate,
	checkbox: () => checkbox,
	numeric: () => numeric,
	select: () => select,
	textAreaKeyboard: () => textAreaKeyboard
});
/**
* Adds tab and shift+tab to TEXTAREA
* @param el
*/
const textAreaKeyboard = (el$1) => {
	el$1.addEventListener(`keydown`, (event) => {
		const elementValue = el$1.value;
		const start = el$1.selectionStart;
		const end = el$1.selectionEnd;
		if (event.key === `Tab` && event.shiftKey) {
			if (el$1.value.substring(start - 2, start) === `  `) el$1.value = elementValue.slice(0, Math.max(0, start - 2)) + elementValue.slice(Math.max(0, end));
			el$1.selectionStart = el$1.selectionEnd = start - 2;
			event.preventDefault();
			return false;
		} else if (event.key === `Tab`) {
			el$1.value = elementValue.slice(0, Math.max(0, start)) + `  ` + elementValue.slice(Math.max(0, end));
			el$1.selectionStart = el$1.selectionEnd = start + 2;
			event.preventDefault();
			return false;
		}
	});
};
/**
* Quick access to <input type="checkbox"> value.
* Provide a checkbox by string id or object reference. If a callback is
* supplied, it will be called when the checkbox changes value.
*
* ```
* const opt = checkbox(`#chkMate`);
* opt.checked; // Gets/sets
*
* const opt = checkbox(document.getElementById(`#chkMate`), newVal => {
*  if (newVal) ...
* });
* ```
* @param {(string | HTMLInputElement)} domIdOrEl
* @param {(currentVal:boolean) => void} [onChanged]
* @returns
*/
const checkbox = (domIdOrEl, onChanged) => {
	const el$1 = resolveEl(domIdOrEl);
	if (onChanged) el$1.addEventListener(`change`, () => {
		onChanged(el$1.checked);
	});
	return {
		get checked() {
			return el$1.checked;
		},
		set checked(value) {
			el$1.checked = value;
		}
	};
};
/**
* Numeric INPUT
*
* ```
* const el = numeric(`#num`, (currentValue) => {
*  // Called when input changes
* })
* ```
*
* Get/set value
* ```
* el.value = 10;
* ```
* @param domIdOrEl
* @param onChanged
* @param live If true, event handler fires based on `input` event, rather than `change`
* @returns
*/
const numeric = (domIdOrEl, onChanged, live) => {
	const el$1 = resolveEl(domIdOrEl);
	const eventName = live ? `change` : `input`;
	if (onChanged) el$1.addEventListener(eventName, () => {
		onChanged(Number.parseInt(el$1.value));
	});
	return {
		get value() {
			return Number.parseInt(el$1.value);
		},
		set value(value) {
			el$1.value = value.toString();
		}
	};
};
/**
* Button
*
* ```
* const b = button(`#myButton`, () => {
*  console.log(`Button clicked`);
* });
* ```
*
* ```
* b.click(); // Call the click handler
* b.disabled = true / false;
* ```
* @param domQueryOrEl Query string or element instance
* @param onClickHandler Callback when button is clicked
* @returns
*/
const button = (domQueryOrEl, onClickHandler) => {
	const el$1 = resolveEl(domQueryOrEl);
	const addEvent = () => {
		if (onClickHandler) el$1.addEventListener(`click`, onClickHandler);
	};
	const removeEvent = () => {
		if (onClickHandler) el$1.removeEventListener(`click`, onClickHandler);
	};
	addEvent();
	return {
		get title() {
			return el$1.textContent;
		},
		set title(value) {
			el$1.textContent = value;
		},
		dispose(deleteElement = false) {
			removeEvent();
			if (deleteElement) el$1.remove();
		},
		onClick(handler) {
			removeEvent();
			onClickHandler = handler;
			addEvent();
		},
		click() {
			if (onClickHandler) onClickHandler();
		},
		set disabled(value) {
			el$1.disabled = value;
		},
		get el() {
			return el$1;
		}
	};
};
/**
* Creates a BUTTON element, wrapping it via {@link button} and returning it.
* ```js
* const b = buttonCreate(`Stop`, () => console.log(`Stop`));
* someParent.addNode(b.el);
* ```
* @param title
* @param onClick
* @returns
*/
const buttonCreate = (title, onClick) => {
	const el$1 = document.createElement(`button`);
	const w = button(el$1, onClick);
	w.title = title;
	return w;
};
/**
* SELECT element.
*
* Handle changes in value:
* ```
* const mySelect = select(`#mySelect`, (newValue) => {
*  console.log(`Value is now ${newValue}`);
* });
* ```
*
* Enable/disable:
* ```
* mySelect.disabled = true / false;
* ```
*
* Get currently selected index or value:
* ```
* mySelect.value / mySelect.index
* ```
*
* Is the currently selected value a placeholder?
* ```
* mySelect.isSelectedPlaceholder
* ```
*
* Set list of options
* ```
* // Adds options, preselecting `opt2`.
* mySelect.setOpts([`opt1`, `opt2 ...], `opt2`);
* ```
*
* Select an element
* ```
* mySelect.select(1); // Select second item
* mySelect.select(1, true); // If true is added, change handler fires as well
* ```
* @param domQueryOrEl Query (eg `#id`) or element
* @param onChanged Callback when a selection is made
* @param options Options
* @return
*/
const select = (domQueryOrEl, onChanged, options = {}) => {
	const el$1 = resolveEl(domQueryOrEl);
	const { placeholderOpt, shouldAddChoosePlaceholder = false, autoSelectAfterChoice = -1 } = options;
	const change = () => {
		if (onChanged !== void 0) onChanged(el$1.value);
		if (autoSelectAfterChoice >= 0) el$1.selectedIndex = autoSelectAfterChoice;
	};
	if (onChanged) el$1.addEventListener(`change`, (_event) => {
		change();
	});
	return {
		set disabled(value) {
			el$1.disabled = value;
		},
		get value() {
			return el$1.value;
		},
		get index() {
			return el$1.selectedIndex;
		},
		get isSelectedPlaceholder() {
			return (shouldAddChoosePlaceholder || options.placeholderOpt !== void 0) && el$1.selectedIndex === 0;
		},
		setOpts(opts, preSelect) {
			el$1.options.length = 0;
			if (shouldAddChoosePlaceholder) opts = [`-- Choose --`, ...opts];
			else if (placeholderOpt !== void 0) opts = [placeholderOpt, ...opts];
			let toSelect = 0;
			for (const [index, o] of opts.entries()) {
				const optEl = document.createElement(`option`);
				optEl.value = o;
				optEl.innerHTML = o;
				if (preSelect !== void 0 && o === preSelect) toSelect = index;
				el$1.options.add(optEl);
			}
			el$1.selectedIndex = toSelect;
		},
		select(index = 0, trigger = false) {
			el$1.selectedIndex = index;
			if (trigger && onChanged) change();
		}
	};
};

//#endregion
//#region ../packages/dom/dist/src/shadow-dom.js
const addShadowCss = (parentEl, styles) => {
	const styleEl = document.createElement(`style`);
	styleEl.textContent = styles;
	let shadowRoot;
	if (parentEl.shadowRoot) {
		shadowRoot = parentEl.shadowRoot;
		shadowRoot.innerHTML = ``;
	} else shadowRoot = parentEl.attachShadow({ mode: `open` });
	shadowRoot.append(styleEl);
	return shadowRoot;
};

//#endregion
//#region ../packages/dom/dist/src/log.js
/**
* Allows writing to a DOM element in console.log style. Element grows in size, so use
* something like `overflow-y: scroll` on its parent
*
* ```
* const l = log(`#dataStream`); // Assumes HTML element with id `dataStream` exists
* l.log(`Hi`);
* l.log(); // Displays a horizontal rule
*
* const l = log(document.getElementById(`dataStream`), {
*  timestamp: true,
*  truncateEntries: 20
* });
* l.log(`Hi`);
* l.error(`Some error`); // Adds class `error` to line
* ```
*
* For logging high-throughput streams:
* ```
* // Silently drop log if it was less than 5ms since the last
* const l = log(`#dataStream`, { minIntervalMs: 5 });
*
* // Only the last 100 entries are kept
* const l = log(`#dataStream`, { capacity: 100 });
* ```
*
* @param domQueryOrElement Element or id of element
* @param opts
*/
const log = (domQueryOrElement, opts = {}) => {
	const { capacity = 0, monospaced = true, timestamp = false, collapseDuplicates = true, css = `` } = opts;
	let added = 0;
	let lastLog;
	let lastLogRepeats = 0;
	const parentElement = resolveEl(domQueryOrElement);
	const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
	const shadowRoot = addShadowCss(parentElement, `
  .log {
    font-family: ${fontFamily};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
    word-break: break-word;
  }
  ${css}
  `);
	const el$1 = document.createElement(`div`);
	el$1.className = `log`;
	shadowRoot.append(el$1);
	const error = (messageOrError) => {
		const line = document.createElement(`div`);
		if (typeof messageOrError === `string`) line.innerHTML = messageOrError;
		else if (messageOrError instanceof Error) {
			const stack = messageOrError.stack;
			line.innerHTML = stack === void 0 ? messageOrError.toString() : stack.toString();
		} else line.innerHTML = messageOrError;
		line.classList.add(`error`);
		append(line);
		lastLog = void 0;
		lastLogRepeats = 0;
	};
	let lastLogTime = 0;
	const warn = (whatToLog = ``) => {
		const element = log$1(whatToLog);
		if (!element) return element;
		element.classList.add(`warning`);
		return element;
	};
	const log$1 = (whatToLog = ``) => {
		let message;
		const interval = window.performance.now() - lastLogTime;
		if (opts.minIntervalMs && interval < opts.minIntervalMs) return;
		lastLogTime = window.performance.now();
		if (typeof whatToLog === `object`) message = JSON.stringify(whatToLog);
		else if (whatToLog === void 0) message = `(undefined)`;
		else if (whatToLog === null) message = `(null)`;
		else if (typeof whatToLog === `number`) {
			if (Number.isNaN(message)) message = `(NaN)`;
			message = whatToLog.toString();
		} else message = whatToLog;
		if (message.length === 0) {
			const rule = document.createElement(`hr`);
			lastLog = void 0;
			append(rule);
		} else if (message === lastLog && collapseDuplicates) {
			const lastElement = el$1.firstElementChild;
			let lastBadge = lastElement.querySelector(`.badge`);
			if (lastBadge === null) {
				lastBadge = document.createElement(`div`);
				lastBadge.className = `badge`;
				lastElement.insertAdjacentElement(`beforeend`, lastBadge);
			}
			if (lastElement !== null) lastBadge.textContent = (++lastLogRepeats).toString();
			return lastElement;
		} else {
			const line = document.createElement(`div`);
			line.textContent = message;
			append(line);
			lastLog = message;
			return line;
		}
	};
	const append = (line) => {
		if (timestamp) {
			const wrapper = document.createElement(`div`);
			const timestamp$1 = document.createElement(`div`);
			timestamp$1.className = `timestamp`;
			timestamp$1.textContent = new Date().toLocaleTimeString();
			wrapper.append(timestamp$1, line);
			line.classList.add(`msg`);
			wrapper.classList.add(`line`);
			line = wrapper;
		} else line.classList.add(`line`, `msg`);
		if (opts.reverse) el$1.append(line);
		else el$1.insertBefore(line, el$1.firstChild);
		if (capacity > 0 && ++added > capacity * 2) while (added > capacity) {
			el$1.lastChild?.remove();
			added--;
		}
		if (opts.reverse) el$1.scrollTop = el$1.scrollHeight;
		lastLogRepeats = 0;
	};
	const clear$1 = () => {
		el$1.innerHTML = ``;
		lastLog = void 0;
		lastLogRepeats = 0;
		added = 0;
	};
	const dispose = () => {
		el$1.remove();
	};
	return {
		error,
		log: log$1,
		warn,
		append,
		clear: clear$1,
		dispose,
		get isEmpty() {
			return added === 0;
		}
	};
};

//#endregion
//#region ../packages/dom/dist/src/inline-console.js
/**
* Adds an inline console to the page. A DIV is added to display log messages.
*
* Captures all console.log, console.warn and console.error calls, as well as unhandled exceptions.
*
* ```js
* // Adds the DIV and intercepts console logs
* inlineConsole();
*
* console.log(`Hello`); // message is displayed in the inline console
* ```
* @param options
*/
const inlineConsole = (options = {}) => {
	const original = {
		log: console.log,
		error: console.error,
		warn: console.warn
	};
	const witholdCss = options.witholdCss ?? false;
	const insertIntoEl = options.insertIntoEl;
	let logElement;
	if (insertIntoEl) logElement = resolveEl(insertIntoEl);
	else {
		logElement = document.createElement(`DIV`);
		logElement.id = `ixfx-log`;
		document.body.prepend(logElement);
	}
	if (!witholdCss) {
		logElement.style.position = `fixed`;
		logElement.style.left = `0px`;
		logElement.style.top = `0px`;
		logElement.style.pointerEvents = `none`;
		logElement.style.display = `none`;
	}
	const logger = log(logElement, options);
	const visibility = (show) => {
		logElement.style.display = show ? `block` : `none`;
	};
	console.error = (message, ...optionalParameters) => {
		logger.error(message);
		if (optionalParameters.length > 0) logger.error(optionalParameters);
		original.error(message, ...optionalParameters);
		visibility(true);
	};
	console.warn = (message, ...optionalParameters) => {
		logger.warn(message);
		if (optionalParameters.length > 0) logger.warn(optionalParameters);
		visibility(true);
	};
	console.log = (message, ...optionalParameters) => {
		logger.log(message);
		if (optionalParameters.length > 0) logger.log(optionalParameters);
		original.log(message, ...optionalParameters);
		visibility(true);
	};
	window.onerror = (event, source, lineno, _colno, error) => {
		const abbreviatedSource = source === void 0 ? `` : afterMatch(source, `/`, { fromEnd: true });
		const eventString = getErrorMessage(error);
		logger.error(eventString + ` (${abbreviatedSource}:${lineno})`);
		visibility(true);
	};
	window.addEventListener("unhandledrejection", function(e) {
		logger.error(e.reason);
		visibility(true);
	});
};

//#endregion
//#region ../packages/dom/dist/src/query.js
/**
* Async iterator over DOM query strings
* ```js
* query(`div`); // all DIVs
* query([`.class`, `.and-other-class`]); // All things with these two classes
* ```
* @param queryOrElement
* @returns
*/
async function* query(queryOrElement, options = {}) {
	if (typeof queryOrElement === `string`) return query([queryOrElement], options);
	else if (typeof queryOrElement === `object` && `nodeName` in queryOrElement) return query([queryOrElement], options);
	const ensureUnique = options ?? false;
	const isUnique = ensureUnique ? uniqueInstances() : (_) => true;
	if (Array.isArray(queryOrElement)) {
		for (const item of queryOrElement) if (typeof item === `string`) for (const element of document.querySelectorAll(item)) {
			const elementProper = element;
			if (isUnique(elementProper)) yield elementProper;
		}
		else if (isUnique(item)) yield item;
	} else for await (const item of queryOrElement) if (typeof item === `string`) {
		for (const element of document.querySelectorAll(item)) if (isUnique(element)) yield element;
	} else if (isUnique(item)) yield item;
}

//#endregion
//#region ../packages/dom/dist/src/tabbed-panel.js
const tabSet = (options) => {
	const panels = options.panels;
	const preselectId = options.preselectId ?? panels[0].id;
	const guid = `tabset-${shortGuid()}`;
	const parentEl = resolveEl(options.parent);
	const switcher = `
  <div class="ixfx-tabset" id="${guid}">
    <fieldset class="ixfx-tabset-controls">
    ${panels.map((p) => {
		const panelId = `${guid}-${p.id}-select`;
		return `<input type="radio" name="${guid}-tabs" id="${panelId}" data-tabset="${p.id}"><label for="${panelId}">${p.label}</label>`;
	}).join(``)}
    </fieldset>
    <div class="ixfx-tabset-host" id="${guid}-host"></div>
  </div>
  `;
	parentEl.innerHTML = switcher;
	const hostEl = document.getElementById(`${guid}-host`);
	const tabSetEl = document.getElementById(guid);
	tabSetEl.querySelector(`fieldset`)?.addEventListener(`change`, (event) => {
		const el$1 = event.target;
		select$1(el$1.getAttribute(`data-tabset`));
	});
	let currentPanel;
	const select$1 = (id) => {
		const newPanel = panels.find((p) => p.id === id);
		const priorPanel = currentPanel;
		if (options.onPanelChanging) {
			const allow = options.onPanelChanging(priorPanel, newPanel);
			if (typeof allow === `boolean` && !allow) return;
		}
		if (priorPanel) priorPanel.dismount();
		currentPanel = newPanel;
		if (newPanel) {
			newPanel.mount(hostEl);
			const domId = `#${guid}-${id}-select`;
			const inputEl = tabSetEl.querySelector(domId);
			if (inputEl) inputEl.checked = true;
			else console.warn(`Could not find INPUT element for panel id: ${id} (${domId})`);
		}
		if (options.onPanelChange) options.onPanelChange(priorPanel, newPanel);
	};
	select$1(preselectId);
	let warned = false;
	const notify = (name, args) => {
		if (!currentPanel) return;
		if (currentPanel.notify) currentPanel.notify(name, args);
		else if (!warned) {
			warned = true;
			console.warn(`TabbedPanel.notify dropping notification '${name}'. Panel implementation is missing 'notify' function`);
		}
	};
	return {
		select: select$1,
		panels,
		hostEl,
		tabSetEl,
		notify
	};
};

//#endregion
//#region ../packages/dom/dist/src/utility.js
/**
* Convert an absolute point to relative, in different coordinate spaces.
*
* When calling the returned function, the input value must be in the same
* scale as the intended output scale.
*
* Viewport-relative is used by default.
*
* @example Get relative position of click in screen coordinates
* ```js
* const f = pointScaler({ to: 'screen' });
* document.addEventListener('click', evt => {
*  const screenRelative = f(evt.screenX, evt.screenY);
*  // Yields {x,y} on 0..1 scale
* });
* ```
*
* @example Get relative position of click in viewport coordinates
* ```js
* const f = pointScaler({ to: 'viewport' });
* document.addEventListener('click', evt => {
*  const viewportRelative = f(evt.clientX, evt.clientY);
*  // Yields {x,y} on 0..1 scale
* });
* ```
*
* @example Get relative position of click in document coordinates
* ```js
* const f = pointScaler({ to: 'document' });
* document.addEventListener('click', evt => {
*  const documentRelative = f(evt.pageX, evt.pageY);
*  // Yields {x,y} on 0..1 scale
* });
* ```
*
* @param reference
* @returns
*/
const pointScaler = (reference = `viewport`) => {
	switch (reference) {
		case `viewport`: return (a, b) => {
			const pt = getPointParameter(a, b);
			return Object.freeze({
				x: pt.x / window.innerWidth,
				y: pt.y / window.innerHeight
			});
		};
		case `screen`: return (a, b) => {
			const pt = getPointParameter(a, b);
			return Object.freeze({
				x: pt.x / screen.width,
				y: pt.y / screen.height
			});
		};
		case `document`: return (a, b) => {
			const pt = getPointParameter(a, b);
			return Object.freeze({
				x: pt.x / document.body.scrollWidth,
				y: pt.y / document.body.scrollHeight
			});
		};
		default: throw new Error(`Unknown 'reference' parameter: ${JSON.stringify(reference)}`);
	}
};
/**
* Returns a function which yields element position in target coordinate space with optional scaling.
* Live position is calculated when the function is invoked.
* Use {@link positionRelative} to simply get relative position of element in given coordinate space.
*
* @example Absolute position of #blah in viewport coordinate space
* ```js
* const f = positionFn('#blah');
* f(); // Yields: {x,y}
* // Or:
* positionFn('#blah')(); // Immediately invoke
* ```
*
* @example Relative position of element in viewport-space
* ```js
* const f = positionFn(evt.target, { relative: true });
* f(); // Yields: {x,y}
* ```
*
* @example Relative position of #blah in screen-space
* ```js
* const f = positionFn('#blah', { target: 'screen', relative: true });
* f(); // Yields: {x,y}
* ```
*
* By default, top-left corner (north west) is used. Other cardinal points or 'center' can be specified:
* ```js
* // Relative position by center
* positionFn('#blah', { relative: true, anchor: 'center' });
*
* // ...by bottom-right corner
* positionFn('#blah', { relative: true, anchor: 'se' });
* ```
*
* This function is useful if you have a stable DOM element and conversion target.
* If the DOM element is changing continually, consider using {@link viewportToSpace} to
* convert from viewport coordinates to target coordinates:
*
* ```js
* // Eg.1 Absolute coords in screen space
* const vpToScreen = viewportToSpace('screen');
* vpToScreen(el.getBoundingClientRect());
*
* // Eg.2 Relative coords in viewport space
* const vpRelative = pointScaler(); // Re-usable scaler. Default uses viewport
* vpRelative(el.getBoundingClientRect()); // Yields: { x,y }
*
* // Eg.3 Relative coords in screen space
* const vpToScreen = viewportToSpace('screen'); // Map viewport->screen
* const screenRelative = pointScaler('screen'); // Scale screen units
*
* // Combine into a resuable function that takes an element
* const mapAndScale = (el) => screenRelative(vpToScreen(el.getBoundingClientRect()));
*
* // Call
* mapAndScale(document.getElementById('blah')); // Yields: { x,y }
* ```
* @param domQueryOrEl
* @param options
* @returns
*/
const positionFn = (domQueryOrEl, options = {}) => {
	const targetSpace = options.target ?? `viewport`;
	const relative = options.relative ?? false;
	const anchor = options.anchor ?? `nw`;
	const el$1 = resolveEl(domQueryOrEl);
	const vpToSpace = viewportToSpace(targetSpace);
	if (relative) {
		const s = pointScaler(targetSpace);
		return () => s(vpToSpace(cardinal(el$1.getBoundingClientRect(), anchor)));
	} else return () => vpToSpace(cardinal(el$1.getBoundingClientRect(), anchor));
};
/**
* Returns a {x,y} Point on a cardinal position of element.
* ```
* // Top edge, middle horizontal position
* const pos = cardinalPosition(`#blah`, `n`);
* ```
* @param domQueryOrEl
* @param anchor
* @returns
*/
const cardinalPosition = (domQueryOrEl, anchor = `nw`) => {
	const el$1 = resolveEl(domQueryOrEl);
	return cardinal(el$1.getBoundingClientRect(), anchor);
};
/**
* Returns relative position of element in target coordinate space, or viewport by default.
* Relative means that { x:0.5, y: 0.5 } is the middle of the target space. Eg for viewport, that means its the middle of the browser window.
* ```js
* // These all yield { x, y }
* elPositionRelative('#blah');
* elPositionRelative(evt.target, 'screen');
* ```
* @param domQueryOrEl DOM query or element
* @param target Target coordinate space, or viewport by default
* @returns Point
*/
const positionRelative = (domQueryOrEl, target = `viewport`) => {
	const f = positionFn(domQueryOrEl, {
		relative: true,
		target
	});
	return f();
};
/**
* Returns a function that converts input viewport coordinate space
* to an output coordinate space.
*
* ```js
* // f() will convert from viewport to document coordinate space
* const f = viewportToSpace('document');
*
* // {x:100,y:100} is viewport coordinate space
* f(100,100); // Yields: { x, y } converted to document space
* ```
*
* Or immediately invoke for one-off use:
* ```js
* viewportToSpace('document')(100,100); // Yields: { x, y }
* ```
* @param targetSpace
* @returns
*/
const viewportToSpace = (targetSpace = `viewport`) => {
	switch (targetSpace) {
		case `screen`: return (a, b) => {
			const pt = getPointParameter(a, b);
			return Object.freeze({
				x: pt.x + window.screenX,
				y: pt.y + window.screenY
			});
		};
		case `document`: return (a, b) => {
			const pt = getPointParameter(a, b);
			return Object.freeze({
				x: pt.x + window.scrollX,
				y: pt.y + window.scrollY
			});
		};
		case `viewport`: return (a, b) => {
			const pt = getPointParameter(a, b);
			return Object.freeze({
				x: pt.x,
				y: pt.y
			});
		};
		default: throw new Error(`Unexpected target coordinate space: ${targetSpace}. Expected: viewport, document or screen`);
	}
};
/**
* Position element by relative coordinate. Relative to window dimensions by default
* @param relativePos Window-relative coordinate. 0.5/0.5 is middle of window.
*/
const positionFromMiddle = (domQueryOrEl, relativePos, relativeTo = `window`) => {
	if (!domQueryOrEl) throw new Error(`domQueryOrEl is null or undefined`);
	const el$1 = resolveEl(domQueryOrEl);
	const absPosition = multiply(relativePos, window.innerWidth, window.innerHeight);
	const thingRect = el$1.getBoundingClientRect();
	const offsetPos = subtract(absPosition, thingRect.width / 2, thingRect.height / 2);
	el$1.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};
/**
* Given an array of class class names, this will cycle between them each time
* it is called.
*
* Eg, assume `list` is: [ `a`, `b`, `c` ]
*
* If `el` already has the class `a`, the first time it is called, class `a`
* is removed, and `b` added. The next time `b` is swapped for `c`. Once again,
* `c` will swap with `a` and so on.
*
* If `el` is undefined or null, function silently returns.
* @param el Element
* @param list List of class names
* @returns
*/
const cycleCssClass = (el$1, list) => {
	if (el$1 === null || !el$1) return;
	if (!Array.isArray(list)) throw new TypeError(`List should be an array of strings`);
	for (let index = 0; index < list.length; index++) if (el$1.classList.contains(list[index])) {
		el$1.classList.remove(list[index]);
		if (index + 1 < list.length) el$1.classList.add(list[index + 1]);
		else el$1.classList.add(list[0]);
		return;
	}
	el$1.classList.add(list[0]);
};
/**
* Source: https://zellwk.com/blog/translate-in-javascript
* @param domQueryOrEl
*/
const getTranslation = (domQueryOrEl) => {
	const el$1 = resolveEl(domQueryOrEl);
	const style = window.getComputedStyle(el$1);
	const matrix = style.transform;
	if (matrix === `none` || typeof matrix === `undefined`) return {
		x: 0,
		y: 0,
		z: 0
	};
	const matrixType = matrix.includes(`3d`) ? `3d` : `2d`;
	const matrixValues = /matrix.*\((.+)\)/.exec(matrix)[1].split(`, `);
	if (matrixType === `2d`) return {
		x: Number.parseFloat(matrixValues[4]),
		y: Number.parseFloat(matrixValues[5]),
		z: 0
	};
	if (matrixType === `3d`) return {
		x: Number.parseFloat(matrixValues[12]),
		y: Number.parseFloat(matrixValues[13]),
		z: Number.parseFloat(matrixValues[14])
	};
	return {
		x: 0,
		y: 0,
		z: 0
	};
};
/**
* Creates an element after `sibling`
* ```
* const el = createAfter(siblingEl, `DIV`);
* ```
* @param sibling Element
* @param tagName Element to create
* @returns New element
*/
const createAfter = (sibling, tagName) => {
	const el$1 = document.createElement(tagName);
	sibling.parentElement?.insertBefore(el$1, sibling.nextSibling);
	return el$1;
};
/**
* Creates an element inside of `parent`
* ```
* const newEl = createIn(parentEl, `DIV`);
* ```
* @param parent Parent element
* @param tagName Tag to create
* @returns New element
*/
const createIn = (parent, tagName) => {
	const el$1 = document.createElement(tagName);
	parent.append(el$1);
	return el$1;
};
/**
* Remove all child nodes from `parent`
* @param parent
*/
const clear = (parent) => {
	let c = parent.lastElementChild;
	while (c) {
		c.remove();
		c = parent.lastElementChild;
	}
};
/**
* Copies string representation of object to clipboard
* @param object
* @returns Promise
*/
const copyToClipboard = (object) => {
	const p = new Promise((resolve, reject) => {
		const string_ = import_dist.default.stringify(object);
		navigator.clipboard.writeText(JSON.stringify(string_)).then(() => {
			resolve(true);
		}, (error) => {
			console.warn(`Could not copy to clipboard`);
			console.log(string_);
			reject(new Error(error));
		});
	});
	return p;
};
/**
* Inserts `element` into `parent` sorted according to its HTML attribute `data-sort`.
*
* Assumes:
* * Every child of `parent` and `element`, has a `data-sort` attribute. This is the basis for sorting.
* * `parent` starts off empty or pre-sorted.
* * Order of `parent`'s children is not changed (ie it always remains sorted)
* @param parent Parent to insert into
* @param element Element to insert
*/
const insertSorted = (parent, element) => {
	const elSort = element.getAttribute(`data-sort`) ?? ``;
	let elAfter;
	let elBefore;
	for (const c of parent.children) {
		const sort = c.getAttribute(`data-sort`) ?? ``;
		if (elSort >= sort) elAfter = c;
		if (elSort <= sort) elBefore = c;
		if (elAfter !== void 0 && elBefore !== void 0) break;
	}
	if (elAfter !== void 0) elAfter.insertAdjacentElement(`afterend`, element);
	else if (elBefore === void 0) parent.append(element);
	else elBefore.insertAdjacentElement(`beforebegin`, element);
};
const reconcileChildren = (parentEl, list, createUpdate) => {
	if (typeof parentEl === `undefined`) throw new Error(`Param 'parentEl' is undefined`);
	if (parentEl === null) throw new Error(`Param 'parentEl' is null`);
	const seen = new Set();
	for (const [key, value] of list) {
		const id = `c-${key}`;
		const el$1 = parentEl.querySelector(`#${id}`);
		const finalEl = createUpdate(value, el$1);
		if (el$1 !== finalEl) {
			finalEl.id = id;
			parentEl.append(finalEl);
		}
		seen.add(id);
	}
	const prune = [];
	for (const child of parentEl.children) if (!seen.has(child.id)) prune.push(child);
	for (const p of prune) p.remove();
};
/**
* Gets a HTML element by id, throwing an error if not found
* @param id
* @returns
*/
const byId = (id) => {
	const element = document.getElementById(id);
	if (element === null) throw new Error(`HTML element with id '${id}' not found`);
	return element;
};

//#endregion
//#region src/dom.ts
var dom_exports = {};
__export(dom_exports, {
	DataDisplay: () => DataDisplay,
	ElementSizer: () => ElementSizer,
	Forms: () => forms_exports,
	addShadowCss: () => addShadowCss,
	byId: () => byId,
	cardinalPosition: () => cardinalPosition,
	clear: () => clear,
	copyToClipboard: () => copyToClipboard,
	createAfter: () => createAfter,
	createIn: () => createIn,
	cssAngleParse: () => cssAngleParse,
	cycleCssClass: () => cycleCssClass,
	defaultErrorHandler: () => defaultErrorHandler,
	draggable: () => draggable,
	el: () => el,
	elRequery: () => elRequery,
	fromList: () => fromList,
	fromObject: () => fromObject,
	getBoundingClientRectWithBorder: () => getBoundingClientRectWithBorder,
	getComputedPixels: () => getComputedPixels,
	getFromStyles: () => getFromStyles,
	getTranslation: () => getTranslation,
	getWithFallback: () => getWithFallback,
	inlineConsole: () => inlineConsole,
	insertSorted: () => insertSorted,
	log: () => log,
	parseAsAttributes: () => parseAsAttributes,
	pointScaler: () => pointScaler,
	positionFn: () => positionFn,
	positionFromMiddle: () => positionFromMiddle,
	positionRelative: () => positionRelative,
	query: () => query,
	reconcileChildren: () => reconcileChildren,
	resolveEl: () => resolveEl,
	resolveElementTry: () => resolveElementTry,
	resolveEls: () => resolveEls,
	setCssClass: () => setCssClass,
	setCssDisplay: () => setCssDisplay,
	setCssToggle: () => setCssToggle,
	setFromVariables: () => setFromVariables,
	setHtml: () => setHtml,
	setProperty: () => setProperty,
	setText: () => setText,
	setVariables: () => setVariables,
	tabSet: () => tabSet,
	viewportToSpace: () => viewportToSpace
});

//#endregion
export { DataDisplay, ElementSizer, addShadowCss, byId, cardinalPosition, clear, copyToClipboard, createAfter, createIn, cssAngleParse, cycleCssClass, defaultErrorHandler, dom_exports, draggable, el, elRequery, forms_exports, fromList, fromObject, getBoundingClientRectWithBorder, getComputedPixels, getFromStyles, getTranslation, getWithFallback, inlineConsole, insertSorted, log, parseAsAttributes, pointScaler, positionFn, positionFromMiddle, positionRelative, query, reconcileChildren, resolveEl, resolveElementTry, resolveEls, setCssClass, setCssDisplay, setCssToggle, setFromVariables, setHtml, setProperty, setText, setVariables, tabSet, viewportToSpace };
//# sourceMappingURL=dom-C1hpk44r.js.map