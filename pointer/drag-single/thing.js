import { Points } from '@ixfx/geometry.js';
import { clamp } from '@ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  agitationDecay: 0.99
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point
 *  positionAtDragStart: Points.Point
 *  cursorDragStart: Points.Point
 *  cursorDragNow: Points.Point
 *  dragDifference: Points.Point
 *  el: HTMLElement
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { el, position, cursorDragStart } = thing;

  if (Points.isPlaceholder(cursorDragStart)) {
    el.classList.remove(`dragging`);
  } else {
    el.classList.add(`dragging`);
  }

  // Calculate top-left pos from relative center position
  Util.positionFromMiddle(el, position);

};


/**
 * Helper function for when drag is done.
 * @param {Thing} originalThing 
 * @returns {Thing}
 */
export const onDragDone = (originalThing) => {
  return Object.freeze({
    ...originalThing,
    positionAtDragStart: Points.Placeholder,
    cursorDragNOw: Points.Placeholder,
    cursorDragStart: Points.Placeholder
  });
};

/**
 * Helper function for when drag has started done.
 * @param {Thing} originalThing 
 * @param {Points.Point} cursorRelativePosition
 * @returns {Thing}
 */
export const onDragStart = (originalThing, cursorRelativePosition) => {
  return Object.freeze({
    ...originalThing,
    positionAtDragStart: originalThing.position,
    cursorDragStart: cursorRelativePosition,
    cursorDragNow: cursorRelativePosition,
  });
};


/**
 * Updates a given thing based on state
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { cursorDragNow, cursorDragStart } = thing;
  let { position } = thing;

  let dragDifference = { x: 0, y: 0 };
  if (!Points.isPlaceholder(cursorDragStart) && !Points.isPlaceholder(cursorDragNow)) {
    // Difference between where drag was started and where pointer is at now
    dragDifference = Points.subtract(cursorDragNow, cursorDragStart);

    position = Points.sum(thing.positionAtDragStart, dragDifference);
  }

  // Return new Thing
  return Object.freeze({
    ...thing,
    dragDifference,
    position
  });
};

/**
 * Creates a new thing
 * @returns {Thing}
 */
export const create = () => {
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  document.body.append(element);

  const mass = Math.random();
  const size = mass * 100 + 100;
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;

  const position = { x: 0.5, y: 0.5 };
  return {
    cursorDragNow: Points.Placeholder,
    cursorDragStart: Points.Placeholder,
    dragDifference: Points.Placeholder,
    position: position,
    positionAtDragStart: position,
    el: element
  };
};


/**
 * Merge `changes` with `originalThing`. Works like `saveState`.
 * @param {Thing} originalThing 
 * @param {Partial<Thing>} changes 
 * @returns Thing
 */
export const saveThingState = (originalThing, changes) => {
  return Object.freeze({
    ...originalThing,
    ...changes
  });
};