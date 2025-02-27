import { R as Rect } from './RectTypes-CjvCxMc4.js';
import { C as CirclePositioned } from './CircleType-D9Xd-yDE.js';
import { P as Point } from './PointType-BDlA07rn.js';
import { L as Line } from './LineType-DkIFzpdp.js';
import { P as PolarRay } from './Types-BQZMHPmi.js';

type MarkerOpts = StrokeOpts & DrawingOpts & {
    readonly id: string;
    readonly markerWidth?: number;
    readonly markerHeight?: number;
    readonly orient?: string;
    readonly viewBox?: string;
    readonly refX?: number;
    readonly refY?: number;
};
/**
* Drawing options
*/
type DrawingOpts = {
    /**
     * Style for fill. Eg `black`.
     * @see [fill](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
     */
    readonly fillStyle?: string;
    /**
     * Opacity (0..1)
     */
    readonly opacity?: number;
    /**
     * If true, debug helpers are drawn
     */
    readonly debug?: boolean;
};
type StrokeOpts = {
    /**
     * Line cap
     * @see [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap)
     */
    readonly strokeLineCap?: `butt` | `round` | `square`;
    /**
     * Width of stroke, eg `2`
     * @see [stroke-width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width)
     */
    readonly strokeWidth?: number;
    /**
     * Stroke dash pattern, eg `5`
     * @see [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
     */
    readonly strokeDash?: string;
    /**
     * Style for lines. Eg `white`.
     * @see [stroke](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)
     */
    readonly strokeStyle?: string;
};
/**
 * Line drawing options
 */
type LineDrawingOpts = DrawingOpts & MarkerDrawingOpts & StrokeOpts;
type CircleDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
type PathDrawingOpts = DrawingOpts & StrokeOpts & MarkerDrawingOpts;
type MarkerDrawingOpts = {
    readonly markerEnd?: MarkerOpts;
    readonly markerStart?: MarkerOpts;
    readonly markerMid?: MarkerOpts;
};
/**
 * Text drawing options
 */
type TextDrawingOpts = StrokeOpts & DrawingOpts & {
    readonly anchor?: `start` | `middle` | `end`;
    readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
    readonly userSelect?: boolean;
};
/**
 * Text path drawing options
 */
type TextPathDrawingOpts = TextDrawingOpts & {
    readonly method?: `align` | `stretch`;
    readonly side?: `left` | `right`;
    readonly spacing?: `auto` | `exact`;
    readonly startOffset?: number;
    readonly textLength?: number;
};

/**
 * Applies drawing options to given SVG element.
 * Applies: fillStyle
 * @param elem Element
 * @param opts Drawing options
 */
declare const applyOpts: (elem: SVGElement, opts: DrawingOpts) => void;

/**
 * Get the bounds of an SVG element (determined by its width/height attribs)
 * @param svg
 * @returns
 */
declare const getBounds: (svg: SVGElement) => Rect;
/**
 * Set the bounds of an element, using its width/height attribs.
 * @param svg
 * @param bounds
 */
declare const setBounds: (svg: SVGElement, bounds: Rect) => void;

/**
 * Creates an element of `type` and with `id` (if specified)
 * @param type Element type, eg `circle`
 * @param id Optional id to assign to element
 * @returns Element
 */
declare const createEl: <V extends SVGElement>(type: string, id?: string) => V;
/**
 * Creates and appends a SVG element.
 *
 * ```js
 * // Create a circle
 * const circleEl = createOrResolve(parentEl, `SVGCircleElement`);
 * ```
 *
 * If `queryOrExisting` is specified, it is used as a query to find an existing element. If
 * query starts with `#`, this will be set as the element id, if created.
 *
 * ```js
 * // Creates an element with id 'myCircle' if it doesn't exist
 * const circleEl = createOrResolve(parentEl, `SVGCircleElement`, `#myCircle`);
 * ```
 * @param parent Parent element
 * @param type Type of SVG element
 * @param queryOrExisting Query, eg `#id`
 * @returns
 */
declare const createOrResolve: <V extends SVGElement>(parent: SVGElement, type: string, queryOrExisting?: string | V, suffix?: string) => V;

/**
 * Creates and adds an SVG path element
 * @example
 * ```js
 * const paths = [
 *  `M300,200`,
 *  `a25,25 -30 0,1 50, -25 l 50,-25`
 * ]
 * const pathEl = path(paths, parentEl);
 * ```
 * @param svgOrArray Path syntax, or array of paths. Can be empty if path data will be added later
 * @param parent SVG parent element
 * @param opts Options Drawing options
 * @returns
 */
declare const path: (svgOrArray: string | ReadonlyArray<string>, parent: SVGElement, opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement) => SVGPathElement;
declare const pathUpdate: (elem: SVGPathElement, opts?: PathDrawingOpts) => SVGPathElement;
/**
 * Updates an existing `SVGCircleElement` with potentially updated circle data and drawing options
 * @param elem Element
 * @param circle Circle
 * @param opts Drawing options
 * @returns SVGCircleElement
 */
declare const circleUpdate: (elem: SVGCircleElement, circle: CirclePositioned, opts?: CircleDrawingOpts) => SVGCircleElement;
/**
 * Creates or reuses a `SVGCircleElement`.
 *
 * To update an existing element, use `circleUpdate`
 * @param circle
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const circle: (circle: CirclePositioned, parent: SVGElement, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement) => SVGCircleElement;
/**
 * Creates or resuses a `SVGGElement` (group)
 *
 * To update an existing elemnet, use `groupUpdate`
 * @param children
 * @param parent
 * @param queryOrExisting
 * @returns
 */
declare const group: (children: ReadonlyArray<SVGElement>, parent: SVGElement, queryOrExisting?: string | SVGGElement) => SVGGElement;
declare const groupUpdate: (elem: SVGGElement, children: ReadonlyArray<SVGElement>) => SVGGElement;
/**
 * Creates or reuses a SVGLineElement.
 *
 * @param line
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const line: (line: Line, parent: SVGElement, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement) => SVGLineElement;
/**
 * Updates a SVGLineElement instance with potentially changed line and drawing data
 * @param lineEl
 * @param line
 * @param opts
 * @returns
 */
declare const lineUpdate: (lineEl: SVGLineElement, line: Line, opts?: LineDrawingOpts) => SVGLineElement;
declare const polarRayUpdate: (lineEl: SVGLineElement, ray: PolarRay, opts?: LineDrawingOpts) => SVGLineElement;
/**
 * Updates an existing SVGTextPathElement instance with text and drawing options
 * @param el
 * @param text
 * @param opts
 * @returns
 */
declare const textPathUpdate: (el: SVGTextPathElement, text?: string, opts?: TextPathDrawingOpts) => SVGTextPathElement;
/**
 * Creates or reuses a SVGTextPathElement.
 * @param pathReference
 * @param text
 * @param parent
 * @param opts
 * @param textQueryOrExisting
 * @param pathQueryOrExisting
 * @returns
 */
declare const textPath: (pathReference: string, text: string, parent: SVGElement, opts?: TextPathDrawingOpts, textQueryOrExisting?: string | SVGTextElement, pathQueryOrExisting?: string | SVGTextPathElement) => SVGTextPathElement;
/**
 * Updates an existing SVGTextElement instance with position, text and drawing options
 * @param el
 * @param pos
 * @param text
 * @param opts
 * @returns
 */
declare const textUpdate: (el: SVGTextElement, pos?: Point, text?: string, opts?: TextDrawingOpts) => SVGTextElement;
/**
 * Creates or reuses a SVGTextElement
 * @param pos Position of text
 * @param text Text
 * @param parent
 * @param opts
 * @param queryOrExisting
 * @returns
 */
declare const text: (text: string, parent: SVGElement, pos?: Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement) => SVGTextElement;
/**
 * Creates a square grid based at a center point, with cells having `spacing` height and width.
 *
 * It fits in as many cells as it can within `width` and `height`.
 *
 * Returns a SVG group, consisting of horizontal and vertical lines
 * @param parent Parent element
 * @param center Center point of grid
 * @param spacing Width/height of cells
 * @param width How wide grid should be
 * @param height How high grid should be
 * @param opts
 */
declare const grid: (parent: SVGElement, center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts) => SVGGElement;

declare const Elements_circle: typeof circle;
declare const Elements_circleUpdate: typeof circleUpdate;
declare const Elements_grid: typeof grid;
declare const Elements_group: typeof group;
declare const Elements_groupUpdate: typeof groupUpdate;
declare const Elements_line: typeof line;
declare const Elements_lineUpdate: typeof lineUpdate;
declare const Elements_path: typeof path;
declare const Elements_pathUpdate: typeof pathUpdate;
declare const Elements_polarRayUpdate: typeof polarRayUpdate;
declare const Elements_text: typeof text;
declare const Elements_textPath: typeof textPath;
declare const Elements_textPathUpdate: typeof textPathUpdate;
declare const Elements_textUpdate: typeof textUpdate;
declare namespace Elements {
  export { Elements_circle as circle, Elements_circleUpdate as circleUpdate, Elements_grid as grid, Elements_group as group, Elements_groupUpdate as groupUpdate, Elements_line as line, Elements_lineUpdate as lineUpdate, Elements_path as path, Elements_pathUpdate as pathUpdate, Elements_polarRayUpdate as polarRayUpdate, Elements_text as text, Elements_textPath as textPath, Elements_textPathUpdate as textPathUpdate, Elements_textUpdate as textUpdate };
}

/**
 * Returns a Line type from an SVGLineElement
 * @param el SVG Line Element
 * @returns
 */
declare const lineFromSvgLine: (el: SVGLineElement) => Line;
declare const polarRayFromSvgLine: (el: SVGLineElement, origin: Point) => PolarRay;

/**
 * Helper to make SVG elements with a common parent.
 *
 * Create with {@link makeHelper}.
 */
type SvgHelper = {
    remove(queryOrExisting: string | SVGElement): void;
    /**
     * Creates a text element
     * @param text Text
     * @param pos Position
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    text(text: string, pos: Point, opts?: TextDrawingOpts, queryOrExisting?: string | SVGTextElement): SVGTextElement;
    /**
     * Creates text on a path
     * @param pathReference Reference to path element
     * @param text Text
     * @param opts Drawing options
     * @param textQueryOrExisting DOM query to look up existing element, or the element instance
     * @param pathQueryOrExisting DOM query to look up existing element, or the element instance
     */
    textPath(pathReference: string, text: string, opts?: TextDrawingOpts, textQueryOrExisting?: string | SVGTextElement, pathQueryOrExisting?: string | SVGTextPathElement): SVGTextPathElement;
    /**
     * Creates a line
     * @param line Line
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    line(line: Line, opts?: LineDrawingOpts, queryOrExisting?: string | SVGLineElement): SVGLineElement;
    /**
     * Creates a circle
     * @param circle Circle
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    circle(circle: CirclePositioned, opts?: CircleDrawingOpts, queryOrExisting?: string | SVGCircleElement): SVGCircleElement;
    /**
     * Creates a path
     * @param svgString Path description, or empty string
     * @param opts Drawing options
     * @param queryOrExisting DOM query to look up existing element, or the element instance
     */
    path(svgString: string | ReadonlyArray<string>, opts?: PathDrawingOpts, queryOrExisting?: string | SVGPathElement): SVGPathElement;
    /**
     * Creates a grid of horizontal and vertical lines inside of a group
     * @param center Grid origin
     * @param spacing Cell size
     * @param width Width of grid
     * @param height Height of grid
     * @param opts Drawing options
     */
    grid(center: Point, spacing: number, width: number, height: number, opts?: LineDrawingOpts): SVGGElement;
    /**
     * Returns an element if it exists in parent
     * @param selectors Eg `#path`
     */
    query<V extends SVGElement>(selectors: string): V | null;
    /**
     * Gets/sets the width of the parent
     */
    get width(): number;
    set width(width: number);
    /**
     * Gets the parent
     */
    get parent(): SVGElement;
    /**
     * Gets/sets the height of the parent
     */
    get height(): number;
    set height(height: number);
    /**
     * Deletes all child elements
     */
    clear(): void;
};
/**
 * Creates a {@link SvgHelper} for the creating and management of SVG elements.
 * @param parent
 * @param parentOpts
 * @returns
 */
declare const makeHelper: (parent: SVGElement, parentOpts?: DrawingOpts & StrokeOpts) => SvgHelper;

declare const createMarker: (id: string, opts: MarkerOpts, childCreator?: () => SVGElement) => SVGMarkerElement;
declare const markerPrebuilt: (elem: SVGElement | null, opts: MarkerOpts, _context: DrawingOpts) => string;

/**
 * Applies path drawing options to given element
 * Applies: markerEnd, markerStart, markerMid
 * @param elem Element (presumed path)
 * @param opts Options
 */
declare const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;

/**
 * Removes an SVG element from a parent
 * @param parent Parent
 * @param queryOrExisting Query or existing element
 * @returns
 */
declare const remove: <V extends SVGElement>(parent: SVGElement, queryOrExisting: string | V) => void;
/**
 * Removes all children of `parent`, but not `parent` itself.
 * @param parent
 */
declare const clear: (parent: SVGElement) => void;

/**
 * Applies drawing options to given SVG element.
 * Applies: strokeStyle, strokeWidth, strokeDash, strokeLineCap
 * @param elem Element
 * @param opts
 */
declare const applyStrokeOpts: (elem: SVGElement, opts: StrokeOpts) => void;

type index_CircleDrawingOpts = CircleDrawingOpts;
type index_DrawingOpts = DrawingOpts;
declare const index_Elements: typeof Elements;
type index_LineDrawingOpts = LineDrawingOpts;
type index_MarkerDrawingOpts = MarkerDrawingOpts;
type index_MarkerOpts = MarkerOpts;
type index_PathDrawingOpts = PathDrawingOpts;
type index_StrokeOpts = StrokeOpts;
type index_SvgHelper = SvgHelper;
type index_TextDrawingOpts = TextDrawingOpts;
type index_TextPathDrawingOpts = TextPathDrawingOpts;
declare const index_applyOpts: typeof applyOpts;
declare const index_applyPathOpts: typeof applyPathOpts;
declare const index_applyStrokeOpts: typeof applyStrokeOpts;
declare const index_clear: typeof clear;
declare const index_createEl: typeof createEl;
declare const index_createMarker: typeof createMarker;
declare const index_createOrResolve: typeof createOrResolve;
declare const index_getBounds: typeof getBounds;
declare const index_lineFromSvgLine: typeof lineFromSvgLine;
declare const index_makeHelper: typeof makeHelper;
declare const index_markerPrebuilt: typeof markerPrebuilt;
declare const index_polarRayFromSvgLine: typeof polarRayFromSvgLine;
declare const index_remove: typeof remove;
declare const index_setBounds: typeof setBounds;
declare namespace index {
  export { type index_CircleDrawingOpts as CircleDrawingOpts, type index_DrawingOpts as DrawingOpts, index_Elements as Elements, type index_LineDrawingOpts as LineDrawingOpts, type index_MarkerDrawingOpts as MarkerDrawingOpts, type index_MarkerOpts as MarkerOpts, type index_PathDrawingOpts as PathDrawingOpts, type index_StrokeOpts as StrokeOpts, type index_SvgHelper as SvgHelper, type index_TextDrawingOpts as TextDrawingOpts, type index_TextPathDrawingOpts as TextPathDrawingOpts, index_applyOpts as applyOpts, index_applyPathOpts as applyPathOpts, index_applyStrokeOpts as applyStrokeOpts, index_clear as clear, index_createEl as createEl, index_createMarker as createMarker, index_createOrResolve as createOrResolve, index_getBounds as getBounds, index_lineFromSvgLine as lineFromSvgLine, index_makeHelper as makeHelper, index_markerPrebuilt as markerPrebuilt, index_polarRayFromSvgLine as polarRayFromSvgLine, index_remove as remove, index_setBounds as setBounds };
}

export { type CircleDrawingOpts as C, type DrawingOpts as D, Elements as E, type LineDrawingOpts as L, type MarkerOpts as M, type PathDrawingOpts as P, type SvgHelper as S, type TextDrawingOpts as T, applyOpts as a, createOrResolve as b, createEl as c, createMarker as d, markerPrebuilt as e, applyPathOpts as f, getBounds as g, clear as h, index as i, applyStrokeOpts as j, type StrokeOpts as k, lineFromSvgLine as l, makeHelper as m, type MarkerDrawingOpts as n, type TextPathDrawingOpts as o, polarRayFromSvgLine as p, remove as r, setBounds as s };
