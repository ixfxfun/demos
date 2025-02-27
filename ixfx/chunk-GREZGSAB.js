import {
  Drawing_exports,
  ElementSizer,
  makeHelper
} from "./chunk-YPR6SHJS.js";
import {
  ImageDataGrid_exports,
  multiplyScalar,
  rect_exports,
  scaler
} from "./chunk-GEOIJMHU.js";
import {
  cloneFromFields,
  guard3 as guard
} from "./chunk-TSP6MRBQ.js";
import {
  SimpleEventEmitter
} from "./chunk-72EKR3DZ.js";
import {
  resolveEl
} from "./chunk-ICXKAKPN.js";

// src/dom/CanvasHelper.ts
var CanvasHelper = class extends SimpleEventEmitter {
  #scaler;
  #scalerSize;
  #viewport = rect_exports.EmptyPositioned;
  #logicalSize = rect_exports.Empty;
  #ctx;
  #drawHelper;
  #resizer;
  #disposed = false;
  constructor(domQueryOrEl, opts = {}) {
    super();
    if (!domQueryOrEl) throw new Error(`Param 'domQueryOrEl' is null or undefined`);
    this.el = resolveEl(domQueryOrEl);
    if (this.el.nodeName !== `CANVAS`) {
      throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
    }
    const size = this.el.getBoundingClientRect();
    this.opts = {
      resizeLogic: opts.resizeLogic ?? `none`,
      disablePointerEvents: opts.disablePointerEvents ?? false,
      pixelZoom: opts.pixelZoom ?? (window.devicePixelRatio || 1),
      height: opts.height ?? size.height,
      width: opts.width ?? size.width,
      zIndex: opts.zIndex ?? -1,
      coordinateScale: opts.coordinateScale ?? `both`,
      onResize: opts.onResize,
      clearOnResize: opts.clearOnResize ?? true,
      draw: opts.draw,
      skipCss: opts.skipCss ?? false,
      colourSpace: `srgb`
    };
    this.#scaler = scaler(`both`);
    this.#scalerSize = scaler(`both`, size);
    this.#init();
  }
  getRectangle() {
    return {
      x: 0,
      y: 0,
      ...this.#logicalSize
    };
  }
  dispose(reason) {
    if (this.#disposed) return;
    this.#disposed = true;
    if (this.#resizer) {
      this.#resizer.dispose(`CanvasHelper disposing ${reason}`.trim());
      this.#resizer = void 0;
    }
  }
  #getContext(reset = false) {
    if (this.#ctx === void 0 || reset) {
      const ratio = this.ratio;
      const c = this.el.getContext(`2d`);
      if (c === null) throw new Error(`Could not create drawing context`);
      this.#ctx = c;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.scale(ratio, ratio);
    }
    return this.#ctx;
  }
  /**
   * Gets the drawable area of the canvas.
   * This accounts for scaling due to high-DPI displays etc.
   * @returns 
   */
  getPhysicalSize() {
    return {
      width: this.width * this.ratio,
      height: this.height * this.ratio
    };
  }
  /**
   * Creates a drawing helper for the canvas.
   * If one is already created it is reused.
   */
  getDrawHelper() {
    if (!this.#drawHelper) {
      this.#drawHelper = makeHelper(this.#getContext(), {
        width: this.width,
        height: this.height
      });
    }
  }
  setLogicalSize(logicalSize) {
    guard(logicalSize, `logicalSize`);
    const logicalSizeInteger = rect_exports.applyFields((v) => Math.floor(v), logicalSize);
    const ratio = this.opts.pixelZoom;
    this.#scaler = scaler(this.opts.coordinateScale, logicalSize);
    this.#scalerSize = scaler(`both`, logicalSize);
    const pixelScaled = multiplyScalar(logicalSize, ratio);
    this.el.width = pixelScaled.width;
    this.el.height = pixelScaled.height;
    this.el.style.width = logicalSizeInteger.width.toString() + `px`;
    this.el.style.height = logicalSizeInteger.height.toString() + `px`;
    this.#getContext(true);
    if (this.opts.clearOnResize) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.#logicalSize = logicalSizeInteger;
    const r = this.opts.onResize;
    if (r) {
      setTimeout(() => {
        r(this.ctx, this.size, this);
      }, 100);
    }
    this.fireEvent(`resize`, { ctx: this.ctx, size: this.#logicalSize, helper: this });
  }
  #init() {
    const d = this.opts.draw;
    if (d) {
      const sched = () => {
        d(this.ctx, this.#logicalSize, this);
        requestAnimationFrame(sched);
      };
      setTimeout(() => {
        sched();
      }, 100);
    }
    if (!this.opts.disablePointerEvents) {
      this.#handleEvents();
    }
    const resizeLogic = this.opts.resizeLogic ?? `none`;
    if (resizeLogic === `none`) {
      this.setLogicalSize({ width: this.opts.width, height: this.opts.height });
    } else {
      const resizerOptions = {
        onSetSize: (size) => {
          if (rect_exports.isEqual(this.#logicalSize, size)) return;
          this.setLogicalSize(size);
        },
        naturalSize: { width: this.opts.width, height: this.opts.height },
        stretch: this.opts.resizeLogic ?? `none`
      };
      this.#resizer = new ElementSizer(this.el, resizerOptions);
    }
    this.#getContext();
  }
  #handleEvents() {
    const handlePointerEvent = (event) => {
      const { offsetX, offsetY } = event;
      const physicalX = offsetX * this.ratio;
      const physicalY = offsetY * this.ratio;
      event = cloneFromFields(event);
      const eventData = {
        physicalX,
        physicalY,
        ...event
      };
      switch (event.type) {
        case `pointerup`: {
          {
            this.fireEvent(`pointerup`, eventData);
            break;
          }
          ;
        }
        case `pointermove`: {
          {
            this.fireEvent(`pointermove`, eventData);
            break;
          }
          ;
        }
        case `pointerdown`: {
          {
            this.fireEvent(`pointerup`, eventData);
            break;
          }
          ;
        }
      }
      ;
    };
    this.el.addEventListener(`pointermove`, handlePointerEvent);
    this.el.addEventListener(`pointerdown`, handlePointerEvent);
    this.el.addEventListener(`pointerup`, handlePointerEvent);
  }
  /**
   * Clears the canvas.
   * 
   * Shortcut for:
   * `ctx.clearRect(0, 0, this.width, this.height)`
   */
  clear() {
    if (!this.#ctx) return;
    this.#ctx.clearRect(0, 0, this.width, this.height);
  }
  /**
   * Fills the canvas with a given colour.
   * 
   * Shortcut for:
   * ```js
      * ctx.fillStyle = ``;
   * ctx.fillRect(0, 0, this.width, this.height);
   * ```
   * @param colour Colour
   */
  fill(colour) {
    if (!this.#ctx) return;
    if (colour) this.#ctx.fillStyle = colour;
    this.#ctx.fillRect(0, 0, this.width, this.height);
  }
  /**
   * Gets the drawing context
   */
  get ctx() {
    if (this.#ctx === void 0) throw new Error(`Context not available`);
    return this.#getContext();
  }
  get viewport() {
    return this.#viewport;
  }
  /**
   * Gets the logical width of the canvas
   * See also: {@link height}, {@link size}
   */
  get width() {
    return this.#logicalSize.width;
  }
  /**
   * Gets the logical height of the canvas
   * See also: {@link width}, {@link size}
   */
  get height() {
    return this.#logicalSize.height;
  }
  /**
   * Gets the logical size of the canvas
   * See also: {@link width}, {@link height}
   */
  get size() {
    return this.#logicalSize;
  }
  /**
   * Gets the current scaling ratio being used
   * to compensate for high-DPI display
   */
  get ratio() {
    return window.devicePixelRatio || 1;
  }
  /**
   * Returns the width or height, whichever is smallest
   */
  get dimensionMin() {
    return Math.min(this.width, this.height);
  }
  /**
   * Returns the width or height, whichever is largest
   */
  get dimensionMax() {
    return Math.max(this.width, this.height);
  }
  drawBounds(strokeStyle = `green`) {
    const ctx = this.#getContext();
    Drawing_exports.rect(
      ctx,
      { x: 0, y: 0, width: this.width, height: this.height },
      { crossed: true, strokeStyle, strokeWidth: 1 }
    );
    Drawing_exports.rect(ctx, this.#viewport, { crossed: true, strokeStyle: `silver`, strokeWidth: 3 });
  }
  /**
   * Returns a Scaler that converts from absolute
   * to relative coordinates.
   * This is based on the canvas size.
   * 
   * ```js
      * // Assuming a canvas of 800x500
   * toRelative({ x: 800, y: 600 });  // { x: 1,   y: 1 }
   * toRelative({ x: 0, y: 0 });   // { x: 0,   y: 0 }
   * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
   * ```
   */
  get toRelative() {
    return this.#scaler.rel;
  }
  /**
   * Returns a scaler for points based on width & height
   */
  get toAbsoluteFixed() {
    return this.#scalerSize.abs;
  }
  /**
   * Returns a scaler for points based on width & height
   */
  get toRelativeFixed() {
    return this.#scalerSize.rel;
  }
  get logicalCenter() {
    return {
      x: this.#logicalSize.width / 2,
      y: this.#logicalSize.height / 2
    };
  }
  /**
  * Returns a Scaler that converts from relative to absolute
  * coordinates.
  * This is based on the canvas size.
  * 
  * ```js
  * // Assuming a canvas of 800x600
  * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
  * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
  * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
  * ```
  */
  get toAbsolute() {
    return this.#scaler.abs;
  }
  /**
   * Gets the center coordinate of the canvas
   */
  get center() {
    return { x: this.width / 2, y: this.height / 2 };
  }
  /**
   * Gets the image data for the canvas.
   * Uses the 'physical' canvas size. Eg. A logical size of 400x400 might be
   * 536x536 with a high-DPI display.
   * @returns 
   */
  getImageData() {
    const size = this.getPhysicalSize();
    const data = this.ctx.getImageData(0, 0, size.width, size.height, { colorSpace: this.opts.colourSpace });
    if (!data) throw new Error(`Could not get image data from context`);
    return data;
  }
  /**
   * Returns the canvas frame data as a writable grid.
   * When editing, make as many edits as needed before calling
   * `flip`, which writes buffer back to the canvas.
   * ```js
      * const g = helper.getWritableBuffer();
   * // Get {r,g,b,opacity} of pixel 10,10
   * const pixel = g.get({ x: 10, y: 10 });
   * 
   * // Set a colour to pixel 10,10
   * g.set({ r: 0.5, g: 1, b: 0, opacity: 0 }, { x: 10, y: 10 });
   * 
   * // Write buffer to canvas
   * g.flip();
   * ```
   * 
   * Uses 'physical' size of canvas. Eg with a high-DPI screen, this will
   * mean a higher number of rows and columns compared to the logical size.
   * @returns
   */
  getWritableBuffer() {
    const ctx = this.ctx;
    const data = this.getImageData();
    const grid = ImageDataGrid_exports.grid(data);
    const get = ImageDataGrid_exports.accessor(data);
    const set = ImageDataGrid_exports.setter(data);
    const flip = () => {
      ctx.putImageData(data, 0, 0);
    };
    return { grid, get, set, flip };
  }
};

export {
  CanvasHelper
};
//# sourceMappingURL=chunk-GREZGSAB.js.map