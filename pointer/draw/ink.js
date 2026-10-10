import { Points } from '@ixfx/geometry.js';
import * as Util from './util.js';
import { clamp } from '@ixfx/numbers.js';

const settings = Object.freeze({
  ageIncrement: 0.01,
  maxInkSizePx: 100,
  saturation: 0.5,
  lightness: 0.5,
  opacity: 0.7      // Max opacity for ink
});

/**
 * Define a droplet of ink
 * @typedef {Readonly<{
 *  position: Points.Point
 *  hue: number         // 0..1 scalar for hue angle
 *  age: number         // 0..1 scalar for age of droplet
 *  size: number        // 0..1 scalar for size
 *  el: HTMLElement
 * }>} Ink
 */

/**
 * Show a droplet of ink
 * @param {Ink} ink 
 */
export const use = (ink) => {
  const { el, position, age, size, hue } = ink;
  const { saturation, lightness } = settings;

  // Fade out with age
  const opacity = (1 - age) * settings.opacity;

  // Size brush element based on its state and the settings
  const sizePx = Math.floor(size * settings.maxInkSizePx);
  el.style.width = `${sizePx}px`;
  el.style.height = `${sizePx}px`;

  // Set colour based on hue and opacity
  el.style.background = `hsl(${hue * 360}deg ${saturation * 100}% ${lightness * 100}% / ${opacity})`;

  // Position droplet
  Util.positionFromMiddle(el, position);
};

/**
 * Updates a droplet of ink
 * @param {Ink} ink
 * @param {import('./script.js').State} ambientState
 * @returns {Ink}
 */
export const update = (ink, ambientState) => {
  let { age } = ink;

  // Increase 'age' of ink droplet
  // We do this proportionally to the age: older things will age faster
  age = clamp(age + Math.max(settings.ageIncrement, age) * settings.ageIncrement);

  // We could do other things like make ink droplets drip down,
  // change their size or shape over time...

  return Object.freeze({
    ...ink,
    age
  });
};

/**
 * Creates a droplet of ink, based on the brush
 * @param {import('./brush.js').Brush} brush
 * @param {Points.Point} position
 * @returns {Ink}
 */
export const create = (position, brush) => {
  const element = document.createElement(`div`);
  element.classList.add(`ink`);
  document.body.append(element);
  return {
    position,
    size: brush.size,
    hue: brush.hue,
    el: element,
    age: 0    // Age will increase to one over time
  };
};

/**
 * Deletes an ink droplet
 * @param {Ink} ink 
 */
export const destroy = (ink) => {
  const { el } = ink;
  el.remove();
};