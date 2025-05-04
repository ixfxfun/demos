import { __export } from "./chunk-CHLpw0oG.js";
import { Rect, RectPositioned } from "./rect-types.d-CMbaB-hG.js";

//#region ../packages/core/src/results.d.ts
type ResultOk<T> = {
  success: true;
  value: T;
};
type ResultError = {
  success: false;
  error: Error | string;
};
type Result<T> = ResultOk<T> | ResultError;

//#endregion
//#region ../packages/dom/dist/src/element-sizing.d.ts
/**
* * width: use width of parent, set height based on original aspect ratio of element. Assumes parent has a determined width.
* * height: use height of parent, set width based on original aspect ratio of element. Assumes parent has a determined height.
* * both: use height & width of parent, so the element adopts the ratio of the parent. Be sure that parent has a width and height set.
* * min: use the smallest dimension of parent
* * max: use the largest dimension of parent
*/
type ElementResizeLogic = `width` | `height` | `both` | `none` | `min` | `max`;

/**
* Options
*/
type ElementSizerOptions<T extends HTMLElement | SVGElement> = {
  /**
   * @defaultValue 'none'
   */
  stretch?: ElementResizeLogic;
  naturalSize?: Rect;
  /**
   * If not specified, the element's parent is used
   */
  containerEl?: HTMLElement | string;
  onSetSize: (size: Rect, el: T) => void;
};

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
declare class ElementSizer<T extends HTMLElement | SVGElement> {
  #private;
  constructor(elOrQuery: T | string, options: ElementSizerOptions<T>);
  dispose(reason?: string): void;
  static canvasParent(canvasElementOrQuery: HTMLCanvasElement | string, options: ElementSizerOptions<HTMLCanvasElement>): ElementSizer<HTMLCanvasElement>;
  static canvasViewport(canvasElementOrQuery: HTMLCanvasElement | string, options: {
    zIndex?: number;
  } & ElementSizerOptions<HTMLCanvasElement>): ElementSizer<HTMLCanvasElement>;
  /**
   * Size an SVG element to match viewport
   * @param svg
   * @returns
   */
  static svgViewport(svg: SVGElement, onSizeSet?: (size: Rect) => void): ElementSizer<SVGElement>;
  /**
   * Sets the 'natural' size of an element.
   * This can also be specified when creating ElementSizer.
   * @param size
   */
  setNaturalSize(size: Rect): void;
  get naturalSize(): Rect;
  get viewport(): RectPositioned;
  set size(size: Rect);
  get size(): Rect;
}

//#endregion
//#region ../packages/dom/dist/src/css-angle.d.ts
type CssAngle = {
  value: number;
  unit: `deg` | `rad` | `turn`;
};
declare const cssAngleParse: (value: string | number) => CssAngle;

//#endregion
//#region ../packages/dom/dist/src/css-variables.d.ts
/**
* CSS Variable
*/
type CssVariable = {
  /**
   * CSS variable to read for the value. `--` prefix is not needed
   */
  variable: string;
  /**
   * Attribute name, eg 'width' for a Canvas element.
   */
  attribute?: string;
  field?: string;
  /**
   * Optional default value
   */
  defaultValue: string | undefined;
};

/**
* CSS Variable by id
*/
type CssVariableByIdOption = CssVariable & {
  id: string;
};

/**
* CSS variable by query
*/
type CssVariableByQueryOption = CssVariable & {
  query: string;
};

/**
* CSS variable by element reference
*/
type CssVariableByObjectOption = CssVariable & {
  object: object | object[];
};

/**
* CSS variable option
*/
type CssVariableOption = CssVariable & (CssVariableByObjectOption | CssVariableByIdOption | CssVariableByQueryOption);

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
declare const parseAsAttributes: (options: (string | string[])[]) => (CssVariable & CssVariableByIdOption)[];

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
declare const setFromVariables: (context: HTMLElement | string, ...options: CssVariableOption[]) => void;

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
declare function getWithFallback<T extends Record<string, string | number>>(fallback: T, elt?: Element): T;

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
declare function setVariables<T extends Record<string, string | number>>(variables: T, stylesOrEl?: CSSStyleDeclaration | HTMLElement): void;

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
declare function getFromStyles<T extends string | number>(styles: CSSStyleDeclaration, name: string, fallback: T): T;

//#endregion
//#region ../packages/dom/dist/src/resolve-el.d.ts
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
declare const resolveEl: <V extends Element>(domQueryOrEl: string | V | null | undefined) => V;
declare const resolveElementTry: <V extends Element>(domQueryOrEl: string | V | null | undefined) => Result<V>;
type QueryOrElements = string | Element[] | HTMLElement[] | HTMLElement | Element;
declare const resolveEls: (selectors: QueryOrElements) => HTMLElement[];

//#endregion
//#region ../packages/dom/dist/src/css.d.ts
type ComputedPixelsMap<T extends readonly (keyof CSSStyleDeclaration)[]> = Record<T[number], number>;

/**
* Returns the value of `getBoundingClientRect` plus the width of all the borders
* @param elOrQuery
* @returns
*/
declare const getBoundingClientRectWithBorder: (elOrQuery: SVGElement | HTMLElement | string) => RectPositioned;

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
declare const getComputedPixels: <T extends readonly (keyof CSSStyleDeclaration)[]>(elOrQuery: HTMLElement | string, ...properties: T) => ComputedPixelsMap<T>;

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
declare const setCssClass: (selectors: QueryOrElements, value: boolean, cssClass: string) => void;

/**
* Toggles a CSS class on all elements that match selector
* @param selectors
* @param cssClass
* @returns
*/
declare const setCssToggle: (selectors: QueryOrElements, cssClass: string) => void;
declare const setCssDisplay: (selectors: QueryOrElements, value: string) => void;

//#endregion
//#region ../packages/dom/dist/src/set-property.d.ts
declare function setText(selectors: QueryOrElements): (value: any) => string;
declare function setText(selectors: QueryOrElements, value?: any): string;
declare function setHtml(selectors: QueryOrElements): (value: any) => string;
declare function setHtml(selectors: QueryOrElements, value?: any): string;
declare function setProperty(property: string, selectors: QueryOrElements): (value: any) => string;
declare function setProperty(property: string, selectors: QueryOrElements, value: any): string;

//#endregion
//#region src/dom.d.ts
declare namespace dom_d_exports {
  export { CssAngle, CssVariable, CssVariableByIdOption, CssVariableByObjectOption, CssVariableByQueryOption, CssVariableOption, ElementResizeLogic, ElementSizer, ElementSizerOptions, QueryOrElements, cssAngleParse, getBoundingClientRectWithBorder, getComputedPixels, getFromStyles, getWithFallback, parseAsAttributes, resolveEl, resolveElementTry, resolveEls, setCssClass, setCssDisplay, setCssToggle, setFromVariables, setHtml, setProperty, setText, setVariables };
}
//#endregion
export { CssAngle, CssVariable, CssVariableByIdOption, CssVariableByObjectOption, CssVariableByQueryOption, CssVariableOption, ElementResizeLogic, ElementSizer as ElementSizer$1, ElementSizerOptions, QueryOrElements, cssAngleParse as cssAngleParse$1, dom_d_exports, getBoundingClientRectWithBorder as getBoundingClientRectWithBorder$1, getComputedPixels as getComputedPixels$1, getFromStyles as getFromStyles$1, getWithFallback as getWithFallback$1, parseAsAttributes as parseAsAttributes$1, resolveEl as resolveEl$1, resolveElementTry as resolveElementTry$1, resolveEls as resolveEls$1, setCssClass as setCssClass$1, setCssDisplay as setCssDisplay$1, setCssToggle as setCssToggle$1, setFromVariables as setFromVariables$1, setHtml as setHtml$1, setProperty as setProperty$1, setText as setText$1, setVariables as setVariables$1 };
//# sourceMappingURL=dom.d-G46S0G63.d.ts.map