import { Points } from '@ixfx/geometry.js';

/**
 * Position an element from its middle
 * @param {HTMLElement} element 
 * @param {Points.Point} absolutePosition 
 */
export const positionFromMiddle = (element, absolutePosition) => {
  if (!element) throw new Error(`Element undefined`);

  const thingRect = element.getBoundingClientRect();
  const offsetPos = Points.subtract(absolutePosition, thingRect.width / 2, thingRect.height / 2);

  // Apply via CSS
  element.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};

/**
 * Make `x` and `y` relative with respect to window dimensions
 * @param {number} x
 * @param {number} y
 * @returns {{x:number,y:number}}  
 */
export const relativePoint = (x, y) => {
  return {
    x: x / window.innerWidth,
    y: y / window.innerHeight
  };
};

/**
 * Returns a relative point from a PointerEvent input, using its x/y
 * @param {PointerEvent} event 
 */
export const relativePointFromEvent = (event) => {
  return relativePoint(event.x, event.y);
};

