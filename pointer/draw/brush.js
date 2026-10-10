import { Points } from '@ixfx/geometry.js';
import * as Util from './util.js';

const settings = Object.freeze({
  maxBrushSizePx: 100
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point  // relative position
 *  hue: number             // relative hue (0..1)
 *  el: HTMLElement         // element to show brush
 *  active: boolean         // whether or not user is drawing
 *  size: number            // scalar for size
 * }>} Brush
 */

/**
 * Update the drawing brush
 * @param {Brush} brush 
 */
export const use = (brush) => {
  const { el, position, active, size } = brush;

  // Toggle CSS class depending on whether brush is active or not
  if (brush.active) {
    el.classList.add(`active`);
  } else {
    el.classList.remove(`active`);
  }

  // Size brush element based on its state and the settings
  const sizePx = Math.floor(size * settings.maxBrushSizePx);
  el.style.width = `${sizePx}px`;
  el.style.height = `${sizePx}px`;

  // Reposition element, based on its size
  Util.positionFromMiddle(el, position);
};


/**
 * Updates the Brush
 * @param {Brush} brush
 * @param {import('./script.js').State} ambientState
 * @returns {Brush}
 */
export const update = (brush, ambientState) => {
  // In this demo, our brush doesn't change over time
  return brush;
};

/**
 * Creates a new brush
 * @returns {Brush}
 */
export const create = () => {
  const element = document.createElement(`div`);
  element.classList.add(`brush`);
  document.body.append(element);
  return {
    position: { x: 0.5, y: 0.5 },
    hue: Math.random(),
    el: element,
    size: 0.5,
    active: false
  };
};
