import { a as CanvasEvents, C as CanvasHelper, b as CanvasHelperOpts, E as ElementResizeLogic, c as ElementSizer, d as ElementSizerOptions } from './CanvasHelper-DRKEq2x4.js';
import { I as Interval } from './IntervalType-B4PbUkjV.js';
import { k as Reactive } from './Types-BSFDJiXm.js';
import { P as Point, a as Point3d } from './PointType-BDlA07rn.js';
import { a as RectPositioned } from './RectTypes-BVWwyVKg.js';
import { F as Forms } from './Forms-BnDy_H4r.js';
import { e as GridCardinalDirection } from './Types-D_kJgplB.js';

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
type QueryOrElements = string | Array<Element> | Array<HTMLElement> | HTMLElement | Element;
declare const resolveEls: (selectors: QueryOrElements) => Array<HTMLElement>;

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
declare const parseAsAttributes: (options: Array<string | Array<string>>) => Array<CssVariable & CssVariableByIdOption>;
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
declare const setFromVariables: (context: HTMLElement | string, ...options: Array<CssVariableOption>) => void;
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
declare function setVariables<T extends Record<string, string | number>>(vars: T, stylesOrEl?: CSSStyleDeclaration | HTMLElement): void;
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

type CssVariables_CssVariable = CssVariable;
type CssVariables_CssVariableByIdOption = CssVariableByIdOption;
type CssVariables_CssVariableByObjectOption = CssVariableByObjectOption;
type CssVariables_CssVariableByQueryOption = CssVariableByQueryOption;
type CssVariables_CssVariableOption = CssVariableOption;
declare const CssVariables_getFromStyles: typeof getFromStyles;
declare const CssVariables_getWithFallback: typeof getWithFallback;
declare const CssVariables_parseAsAttributes: typeof parseAsAttributes;
declare const CssVariables_setFromVariables: typeof setFromVariables;
declare const CssVariables_setVariables: typeof setVariables;
declare namespace CssVariables {
  export { type CssVariables_CssVariable as CssVariable, type CssVariables_CssVariableByIdOption as CssVariableByIdOption, type CssVariables_CssVariableByObjectOption as CssVariableByObjectOption, type CssVariables_CssVariableByQueryOption as CssVariableByQueryOption, type CssVariables_CssVariableOption as CssVariableOption, CssVariables_getFromStyles as getFromStyles, CssVariables_getWithFallback as getWithFallback, CssVariables_parseAsAttributes as parseAsAttributes, CssVariables_setFromVariables as setFromVariables, CssVariables_setVariables as setVariables };
}

type NumberFormattingOptions = Readonly<{
    precision?: number;
    roundNumbers?: number;
    leftPadding?: number;
}>;
type FormattingOptions = Readonly<{
    numbers: NumberFormattingOptions;
}>;
type DataTableOpts = FormattingOptions & {
    readonly formatter?: DataFormatter;
    readonly objectsAsTables?: boolean;
    readonly idPrefix?: string;
};
type DataTable<V> = {
    update(data: V): void;
    remove(): boolean;
};
/**
 * Creates a table of data points for each object in the map
 * ```
 * const t = DataTable.fromList(parentEl, map);
 * t.update(newMap);
 * ```
 */
declare const fromList: (parentOrQuery: HTMLElement | string, data: Map<string, object>) => DataTable<Map<string, object>>;
/**
 * Format data. Return _undefined_ to signal that
 * data was not handled.
 */
type DataFormatter = (data: object, path: string) => string | undefined;
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
declare const fromObject: (parentOrQuery: HTMLElement | string, data?: object, opts?: Partial<DataTableOpts>) => DataTable<object>;

type DataTable$1_DataFormatter = DataFormatter;
type DataTable$1_DataTable<V> = DataTable<V>;
type DataTable$1_DataTableOpts = DataTableOpts;
type DataTable$1_FormattingOptions = FormattingOptions;
type DataTable$1_NumberFormattingOptions = NumberFormattingOptions;
declare const DataTable$1_fromList: typeof fromList;
declare const DataTable$1_fromObject: typeof fromObject;
declare namespace DataTable$1 {
  export { type DataTable$1_DataFormatter as DataFormatter, type DataTable$1_DataTable as DataTable, type DataTable$1_DataTableOpts as DataTableOpts, type DataTable$1_FormattingOptions as FormattingOptions, type DataTable$1_NumberFormattingOptions as NumberFormattingOptions, DataTable$1_fromList as fromList, DataTable$1_fromObject as fromObject };
}

type DataDisplayOptions = FormattingOptions & {
    theme?: `dark` | `light`;
};
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
declare class DataDisplay {
    dataTable: DataTable<object>;
    /**
     * Constructor
     * @param options Options
     */
    constructor(options?: Partial<DataDisplayOptions>);
    update(data: object): void;
}

/**
 * Returns an Reactive for window resize. Default 100ms debounce.
 * @param elapsed
 * @returns
 */
declare const windowResize: (elapsed?: Interval) => Reactive<{
    innerWidth: number;
    innerHeight: number;
}>;
/**
 * Observe when document's class changes
 *
 * ```js
 * const c = themeChangeObservable();
 * c.on(msg => {
 *  // do something...
 * });
 * ```
 * @returns
 */
declare const themeChange: () => Reactive<MutationRecord[]>;
/**
 * Observe when element resizes. Specify `interval` to debounce, uses 100ms by default.
 *
 * ```
 * const o = resizeObservable(myEl, 500);
 * o.subscribe(() => {
 *  // called 500ms after last resize
 * });
 * ```
 * @param elem
 * @param interval Tiemout before event gets triggered
 * @returns
 */
declare const resizeObservable: (elem: Readonly<Element>, interval?: Interval) => Reactive<ResizeObserverEntry[]>;

declare const DomRx_resizeObservable: typeof resizeObservable;
declare const DomRx_themeChange: typeof themeChange;
declare const DomRx_windowResize: typeof windowResize;
declare namespace DomRx {
  export { DomRx_resizeObservable as resizeObservable, DomRx_themeChange as themeChange, DomRx_windowResize as windowResize };
}

/**
 * State of drag
 */
type DragState = Readonly<{
    /**
     * Optional data, if this was given during drag start
     */
    token?: object;
    /**
     * Initial pointer position in viewport coordinates
     */
    initial: Point;
    /**
     * Delta of movement from initial position
     */
    delta: Point;
    /**
     * Viewport-relative current position
     */
    viewport: Point;
}>;
/**
 * Return data for `start` function
 */
type DragStart = Readonly<{
    /**
     * If _true_, drag start is allowed
     */
    allow: boolean;
    /**
     * Optional data to associate with drag
     */
    token?: object;
}>;
/**
 * Return data for `progress` function
 */
type DragProgress = Readonly<{
    /**
     * If true, aborts drag operation
     */
    abort?: boolean;
    /**
     * If returned, this will be viewport coordinates
     * to snap the drag to
     */
    viewport?: Point;
}>;
type DragListener = Readonly<{
    start?: () => DragStart;
    progress?: (state: DragState) => DragProgress;
    abort?: (reason: string, state: DragState) => void;
    success?: (state: DragState) => void;
}>;
type DragOptions = {
    autoTranslate: boolean;
    /**
     * If true, it's not necessary to select item first
     */
    quickDrag: boolean;
    fence: HTMLElement | string;
    fenceViewport: RectPositioned;
};
declare const draggable: (elemOrQuery: SVGElement | HTMLElement | string, listener: DragListener, options?: Partial<DragOptions>) => () => void;

type DragDrop_DragListener = DragListener;
type DragDrop_DragOptions = DragOptions;
type DragDrop_DragProgress = DragProgress;
type DragDrop_DragStart = DragStart;
type DragDrop_DragState = DragState;
declare const DragDrop_draggable: typeof draggable;
declare namespace DragDrop {
  export { type DragDrop_DragListener as DragListener, type DragDrop_DragOptions as DragOptions, type DragDrop_DragProgress as DragProgress, type DragDrop_DragStart as DragStart, type DragDrop_DragState as DragState, DragDrop_draggable as draggable };
}

declare const el: (selectors: QueryOrElements) => {
    text: (value: any) => string;
    html: (value: any) => string;
    cssDisplay: (value: string) => void;
    cssClass: (value: boolean, cssClass: string) => void;
    cssToggle: (cssClass: string) => void;
    el: () => HTMLElement;
    els: () => HTMLElement[];
};
declare const elRequery: (selectors: string) => void;

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
declare const defaultErrorHandler: () => {
    show: (ex: Error | string | Event) => void;
    hide: () => void;
};

type LogOpts = {
    readonly reverse?: boolean;
    readonly capacity?: number;
    readonly timestamp?: boolean;
    readonly collapseDuplicates?: boolean;
    readonly monospaced?: boolean;
    readonly minIntervalMs?: number;
    readonly css?: string;
};
type Log = {
    clear(): void;
    error(messageOrError: unknown): void;
    log(message?: string | object | number): HTMLElement | undefined;
    warn(message?: string | object | number): HTMLElement | undefined;
    append(el: HTMLElement): void;
    dispose(): void;
    readonly isEmpty: boolean;
};
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
declare const log: (domQueryOrElement: HTMLElement | string, opts?: LogOpts) => Log;

type InlineConsoleOptions = LogOpts;
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
declare const inlineConsole: (options?: InlineConsoleOptions) => void;

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

type ElementQueryOptions = {
    /**
     * If true, elements are only returned once, even if that match several queries
     */
    ensureUnique: boolean;
};
/**
 * Async iterator over DOM query strings
 * ```js
 * query(`div`); // all DIVs
 * query([`.class`, `.and-other-class`]); // All things with these two classes
 * ```
 * @param queryOrElement
 * @returns
 */
declare function query(queryOrElement: string | HTMLElement | Array<string | HTMLElement> | AsyncGenerator<string | HTMLElement>, options?: Partial<ElementQueryOptions>): AsyncGenerator<HTMLElement>;

declare function setText(selectors: QueryOrElements): (value: any) => string;
declare function setText(selectors: QueryOrElements, value?: any): string;
declare function setHtml(selectors: QueryOrElements): (value: any) => string;
declare function setHtml(selectors: QueryOrElements, value?: any): string;
declare function setProperty(property: string, selectors: QueryOrElements): (value: any) => string;
declare function setProperty(property: string, selectors: QueryOrElements, value: any): string;

type Panel<TNotifyArgs> = {
    mount: (parentEl: HTMLElement) => void;
    dismount: () => void;
    id: string;
    label: string;
    /**
     * Panel gets a notification
     * @param name
     * @param args
     * @returns
     */
    notify?: (name: string, args: TNotifyArgs) => void;
};
declare const tabSet: <TNotifyArgs>(options: {
    panels: Panel<TNotifyArgs>[];
    parent: HTMLElement | string;
    preselectId?: string;
    onPanelChanging?: (priorPanel: Panel<TNotifyArgs> | undefined, newPanel: Panel<TNotifyArgs> | undefined) => boolean | void;
    onPanelChange?: (priorPanel: Panel<TNotifyArgs> | undefined, newPanel: Panel<TNotifyArgs> | undefined) => void;
}) => {
    select: (id: string) => void;
    panels: Panel<TNotifyArgs>[];
    hostEl: HTMLElement;
    tabSetEl: HTMLElement;
    notify: (name: string, args: TNotifyArgs) => void;
};

type PointSpaces = `viewport` | `screen` | `document`;
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
declare const pointScaler: (reference?: PointSpaces) => (a: Readonly<Point | number | Array<number>>, b?: number) => Readonly<{
    x: number;
    y: number;
}>;
type ElPositionOpts = {
    readonly target?: PointSpaces;
    readonly relative?: boolean;
    readonly anchor?: GridCardinalDirection | `center`;
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
declare const positionFn: (domQueryOrEl: Readonly<string | HTMLElement>, options?: ElPositionOpts) => (() => Point);
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
declare const cardinalPosition: (domQueryOrEl: Readonly<string | HTMLElement>, anchor?: GridCardinalDirection | `center`) => Point;
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
declare const positionRelative: (domQueryOrEl: Readonly<string | HTMLElement>, target?: PointSpaces) => Point;
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
declare const viewportToSpace: (targetSpace?: PointSpaces) => (a: Readonly<Point | Array<number> | number>, b?: number) => Readonly<{
    x: number;
    y: number;
}>;
/**
 * Position element by relative coordinate. Relative to window dimensions by default
 * @param relativePos Window-relative coordinate. 0.5/0.5 is middle of window.
 */
declare const positionFromMiddle: (domQueryOrEl: string | HTMLElement, relativePos: Point, relativeTo?: `window` | `screen`) => void;
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
declare const cycleCssClass: (el: Readonly<HTMLElement>, list: ReadonlyArray<string>) => void;
/**
 * Source: https://zellwk.com/blog/translate-in-javascript
 * @param domQueryOrEl
 */
declare const getTranslation: (domQueryOrEl: Readonly<string | HTMLElement>) => Point3d;
/**
 * Creates an element after `sibling`
 * ```
 * const el = createAfter(siblingEl, `DIV`);
 * ```
 * @param sibling Element
 * @param tagName Element to create
 * @returns New element
 */
declare const createAfter: (sibling: Readonly<HTMLElement>, tagName: string) => HTMLElement;
/**
 * Creates an element inside of `parent`
 * ```
 * const newEl = createIn(parentEl, `DIV`);
 * ```
 * @param parent Parent element
 * @param tagName Tag to create
 * @returns New element
 */
declare const createIn: (parent: Readonly<HTMLElement>, tagName: string) => HTMLElement;
/**
 * Remove all child nodes from `parent`
 * @param parent
 */
declare const clear: (parent: Readonly<HTMLElement>) => void;
/**
 * Copies string representation of object to clipboard
 * @param object
 * @returns Promise
 */
declare const copyToClipboard: (object: object) => Promise<unknown>;
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
declare const insertSorted: (parent: HTMLElement, element: HTMLElement) => void;
type CreateUpdateElement<V> = (item: V, el: HTMLElement | null) => HTMLElement;
declare const reconcileChildren: <V>(parentEl: HTMLElement, list: Map<string, V>, createUpdate: CreateUpdateElement<V>) => void;
/**
 * Gets a HTML element by id, throwing an error if not found
 * @param id
 * @returns
 */
declare const byId: <V extends HTMLElement>(id: string) => HTMLElement;

declare const index_CanvasEvents: typeof CanvasEvents;
declare const index_CanvasHelper: typeof CanvasHelper;
declare const index_CanvasHelperOpts: typeof CanvasHelperOpts;
type index_CreateUpdateElement<V> = CreateUpdateElement<V>;
type index_DataDisplay = DataDisplay;
declare const index_DataDisplay: typeof DataDisplay;
type index_DataDisplayOptions = DataDisplayOptions;
declare const index_DragDrop: typeof DragDrop;
type index_ElPositionOpts = ElPositionOpts;
type index_ElementQueryOptions = ElementQueryOptions;
declare const index_ElementResizeLogic: typeof ElementResizeLogic;
declare const index_ElementSizer: typeof ElementSizer;
declare const index_ElementSizerOptions: typeof ElementSizerOptions;
declare const index_Forms: typeof Forms;
type index_InlineConsoleOptions = InlineConsoleOptions;
type index_Log = Log;
type index_LogOpts = LogOpts;
type index_Opts = Opts;
type index_Panel<TNotifyArgs> = Panel<TNotifyArgs>;
type index_PointSpaces = PointSpaces;
type index_QueryOrElements = QueryOrElements;
declare const index_byId: typeof byId;
declare const index_cardinalPosition: typeof cardinalPosition;
declare const index_clear: typeof clear;
declare const index_copyToClipboard: typeof copyToClipboard;
declare const index_createAfter: typeof createAfter;
declare const index_createIn: typeof createIn;
declare const index_cycleCssClass: typeof cycleCssClass;
declare const index_defaultErrorHandler: typeof defaultErrorHandler;
declare const index_el: typeof el;
declare const index_elRequery: typeof elRequery;
declare const index_getTranslation: typeof getTranslation;
declare const index_inlineConsole: typeof inlineConsole;
declare const index_insertSorted: typeof insertSorted;
declare const index_log: typeof log;
declare const index_pointScaler: typeof pointScaler;
declare const index_pointerVisualise: typeof pointerVisualise;
declare const index_positionFn: typeof positionFn;
declare const index_positionFromMiddle: typeof positionFromMiddle;
declare const index_positionRelative: typeof positionRelative;
declare const index_query: typeof query;
declare const index_reconcileChildren: typeof reconcileChildren;
declare const index_resolveEl: typeof resolveEl;
declare const index_resolveEls: typeof resolveEls;
declare const index_setCssClass: typeof setCssClass;
declare const index_setCssDisplay: typeof setCssDisplay;
declare const index_setCssToggle: typeof setCssToggle;
declare const index_setHtml: typeof setHtml;
declare const index_setProperty: typeof setProperty;
declare const index_setText: typeof setText;
declare const index_tabSet: typeof tabSet;
declare const index_viewportToSpace: typeof viewportToSpace;
declare namespace index {
  export { index_CanvasEvents as CanvasEvents, index_CanvasHelper as CanvasHelper, index_CanvasHelperOpts as CanvasHelperOpts, type index_CreateUpdateElement as CreateUpdateElement, index_DataDisplay as DataDisplay, type index_DataDisplayOptions as DataDisplayOptions, DataTable$1 as DataTable, index_DragDrop as DragDrop, type index_ElPositionOpts as ElPositionOpts, type index_ElementQueryOptions as ElementQueryOptions, index_ElementResizeLogic as ElementResizeLogic, index_ElementSizer as ElementSizer, index_ElementSizerOptions as ElementSizerOptions, index_Forms as Forms, type index_InlineConsoleOptions as InlineConsoleOptions, type index_Log as Log, type index_LogOpts as LogOpts, type index_Opts as Opts, type index_Panel as Panel, type index_PointSpaces as PointSpaces, type index_QueryOrElements as QueryOrElements, DomRx as Rx, CssVariables as Variables, index_byId as byId, index_cardinalPosition as cardinalPosition, index_clear as clear, index_copyToClipboard as copyToClipboard, index_createAfter as createAfter, index_createIn as createIn, index_cycleCssClass as cycleCssClass, index_defaultErrorHandler as defaultErrorHandler, index_el as el, index_elRequery as elRequery, index_getTranslation as getTranslation, index_inlineConsole as inlineConsole, index_insertSorted as insertSorted, index_log as log, index_pointScaler as pointScaler, index_pointerVisualise as pointerVisualise, index_positionFn as positionFn, index_positionFromMiddle as positionFromMiddle, index_positionRelative as positionRelative, index_query as query, index_reconcileChildren as reconcileChildren, index_resolveEl as resolveEl, index_resolveEls as resolveEls, index_setCssClass as setCssClass, index_setCssDisplay as setCssDisplay, index_setCssToggle as setCssToggle, index_setHtml as setHtml, index_setProperty as setProperty, index_setText as setText, index_tabSet as tabSet, index_viewportToSpace as viewportToSpace };
}

export { cardinalPosition as A, positionRelative as B, CssVariables as C, DataTable$1 as D, type ElementQueryOptions as E, viewportToSpace as F, positionFromMiddle as G, cycleCssClass as H, type InlineConsoleOptions as I, getTranslation as J, createAfter as K, type LogOpts as L, createIn as M, clear as N, type Opts as O, type Panel as P, type QueryOrElements as Q, copyToClipboard as R, insertSorted as S, type CreateUpdateElement as T, reconcileChildren as U, byId as V, DomRx as a, DragDrop as b, setCssToggle as c, setCssDisplay as d, type DataDisplayOptions as e, DataDisplay as f, el as g, elRequery as h, index as i, defaultErrorHandler as j, inlineConsole as k, type Log as l, log as m, resolveEls as n, setText as o, pointerVisualise as p, query as q, resolveEl as r, setCssClass as s, setHtml as t, setProperty as u, tabSet as v, type PointSpaces as w, pointScaler as x, type ElPositionOpts as y, positionFn as z };
