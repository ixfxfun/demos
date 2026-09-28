import { Points } from "@ixfx/geometry.js";

/**
 * Position an element by its middle, using absolute (pixel) coordinates.
 * 
 * The element must have the CSS 'position: absolute' set to it.
 * @param {HTMLElement} element 
 * @param {Points.Point} absolutePosition 
 */
export function positionFromMiddle(element, absolutePosition) {
  let { x, y } = absolutePosition;
  const bounds = element.getBoundingClientRect();
  x = x - bounds.width/2;
  y = y - bounds.height/2;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}