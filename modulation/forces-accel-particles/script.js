/**
 * An extention of `velocity` with arbitrary number of things
 * being moved.
 */
import { Points, Rects } from '@ixfx/geometry.js';
import { Forces } from '@ixfx/modulation.js';
import { continuously } from '@ixfx/core.js';
import { PointTracker } from '@ixfx/geometry.js';
import * as Util from './util.js';
import * as Thing from './thing.js';

// Define settings
const settings = Object.freeze({
  thingsCount: 5,
});

/**
 * @typedef {Readonly<{
 *  things: Thing.Thing[]
 *  pointerMovement: PointTracker
 *  window: Rects.Rect
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  things: [], // things we'll be moving
  // Track the pointer movementX,movementY
  pointerMovement: new PointTracker(),
  // Record size of window
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  }
});

// Update state of world
const update = () => {
  // Update all the things
  saveState({ things: state.things.map(t => Thing.update(t)) });
};

/**
 * Position thing based on state
 */
const use = () => {
  for (const t of state.things) {
    // Get element for thing
    const thingElement = Thing.getOrCreateElement(t);
    if (thingElement === null) continue;

    // Move the element
    Util.moveElement(thingElement, t.position);
  }
};


const setup = () => {
  continuously(() => {
    update();
    use();
  }).start();

  // Update our tracking of window size if there's a resize
  window.addEventListener(`resize`, () => {
    saveState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  });

  // On pointerup, assign a new velocity based on accumulated movement
  window.addEventListener(`pointerup`, (event) => {
    const { pointerMovement } = state;

    // Get the last data from the pointTracker
    const nfo = pointerMovement.lastResult;

    // If we have some info
    if (nfo !== undefined) {
      // Normalise the average movement, and divide to reduce the speed
      const avg = Points.divide(Points.normalise(nfo.fromInitial.average), 500, 500);

      // For debug purposes, show velocity x,y on screen
      const labelElement = document.querySelector(`#velocity`);
      if (labelElement) labelElement.innerHTML = `accel x: ${avg.x}<br />accel y: ${avg.y}`;

      // Apply pointer movement as acceleration to all things
      const things = /** @type import('./thing.js').Thing[] */(state.things.map(t => Forces.apply(t, Forces.accelerationForce(avg, `dampen`))
      ));
      saveState({ things });
    }

    // Reset pointTracker
    pointerMovement.reset();
  });

  document.addEventListener(`pointermove`, (event) => {
    const { pointerMovement } = state;

    // Exit if no there's no press
    if (event.buttons === 0) return;

    // Track the movement amount
    pointerMovement.seen({ x: event.movementX, y: event.movementY });
  });

  // Create things
  const thingsNew = [];
  for (let index = 0; index < settings.thingsCount; index++) {
    thingsNew.push(Thing.create());
  }
  saveState({ things: thingsNew });
};
setup();

/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}