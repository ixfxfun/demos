import { Points } from '@ixfx/geometry.js';
import { clamp } from '@ixfx/numbers.js';

const settings = Object.freeze({
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
 *  size: number        // 0..1 scalar for size
 * }>} Ink
 */

/**
 * Show a droplet of ink
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {Ink} ink 
 */
export const use = (ink, canvasContext) => {
  const { position, size, hue } = ink;
  const { saturation, lightness, opacity } = settings;

  // Size brush element based on its state and the settings
  const radius = Math.floor(size * settings.maxInkSizePx);

  // Set colour based on hue and opacity
  const hsl = `hsl(${hue * 360}deg ${saturation * 100}% ${lightness * 100}% / ${opacity})`;

  canvasContext.fillStyle = hsl;
  canvasContext.beginPath();
  canvasContext.arc(position.x, position.y, radius, 0, Math.PI * 2);
  canvasContext.fill();
};

/**
 * Updates a droplet of ink
 * @param {Ink} ink
 * @param {import('./script.js').State} ambientState
 * @returns {Ink}
 */
export const update = (ink, ambientState) => {
  // We don't do anything to ink over time
  return ink;
};

/**
 * Creates a droplet of ink, based on the brush
 * @param {import('./brush.js').Brush} brush
 * @param {Points.Point} position
 * @returns {Ink}
 */
export const create = (position, brush) => {
  return {
    position,
    size: brush.size,
    hue: brush.hue
  };
};
