import { __export } from "./chunk-CHLpw0oG.js";
import { afterMatch } from "./text-CJQWq2Ct.js";
import { resultToError$2 as resultToError } from "./results-BgBGoF-F.js";
import { guard$1 as guard } from "./guard-QlCPM-bu.js";
import { Empty$1 as Empty, EmptyPositioned } from "./empty-Bu6OI0Yu.js";

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
	const el = domQueryOrEl;
	return {
		success: true,
		value: el
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
//#region ../packages/dom/dist/src/css.js
/**
* Returns the value of `getBoundingClientRect` plus the width of all the borders
* @param elOrQuery
* @returns
*/
const getBoundingClientRectWithBorder = (elOrQuery) => {
	let el = resolveEl(elOrQuery);
	const size = el.getBoundingClientRect();
	if (el instanceof SVGElement) el = el.parentElement;
	const border = getComputedPixels(el, `borderTopWidth`, `borderLeftWidth`, `borderRightWidth`, `borderBottomWidth`);
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
		this.#size = Empty;
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
		const el = resolveEl(canvasElementOrQuery);
		const er = new ElementSizer(el, {
			...options,
			onSetSize(size, el$1) {
				el$1.width = size.width;
				el$1.height = size.height;
				if (options.onSetSize) options.onSetSize(size, el$1);
			}
		});
		return er;
	}
	static canvasViewport(canvasElementOrQuery, options) {
		const el = resolveEl(canvasElementOrQuery);
		el.style.position = `absolute`;
		el.style.zIndex = (options.zIndex ?? 0).toString();
		el.style.left = `0px`;
		el.style.top = `0px`;
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
		let query;
		let els;
		if (`query` in opt && opt.query !== void 0) query = opt.query;
		else if (`id` in opt && opt.id !== void 0) query = `#${opt.id}`;
		else if (`object` in opt && opt.object !== void 0) els = Array.isArray(opt.object) ? opt.object : [opt.object];
		if (query === void 0) {
			if (els === void 0) throw new Error(`Missing 'query', 'id' or 'object' fields`);
		} else els = [...contextEl.querySelectorAll(query)];
		if (els === null) continue;
		if (els === void 0) continue;
		if (opt.attribute) for (const el of els) if (isHtmlElement(el)) el.setAttribute(opt.attribute, v);
		else throw new Error(`Trying to set an attribute on something not a HTML element`, el);
		else if (opt.field) for (const el of els) if (typeof el === `object`) el[opt.field] = v;
		else throw new Error(`Trying to set field on something that is not an object (${typeof el})`, el);
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
//#region src/dom.ts
var dom_exports = {};
__export(dom_exports, {
	ElementSizer: () => ElementSizer,
	cssAngleParse: () => cssAngleParse,
	getBoundingClientRectWithBorder: () => getBoundingClientRectWithBorder,
	getComputedPixels: () => getComputedPixels,
	getFromStyles: () => getFromStyles,
	getWithFallback: () => getWithFallback,
	parseAsAttributes: () => parseAsAttributes,
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
	setVariables: () => setVariables
});

//#endregion
export { ElementSizer, cssAngleParse, dom_exports, getBoundingClientRectWithBorder, getComputedPixels, getFromStyles, getWithFallback, parseAsAttributes, resolveEl, resolveElementTry, resolveEls, setCssClass, setCssDisplay, setCssToggle, setFromVariables, setHtml, setProperty, setText, setVariables };
//# sourceMappingURL=dom-DAbB0LVX.js.map