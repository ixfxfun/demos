import { Points } from '@ixfx/geometry.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Element for our faux cursor
  cursorEl: /** @type HTMLElement */(document.querySelector(`#cursor`)),
  // How often to compute new values and update visuals
  updateInterval: 10,
  // How much to interpolate by. Makes it more or less laggy.
  interpolateAmt: 0.1
});

/**
 * Define the type for 'State'
 * @typedef {Readonly<{
 * cursor: Points.Point
 * current: Points.Point
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  cursor: { x:0, y:0 },
  current: { x:0, y:0 }
});

// Use state
function use() {
  const { current } = state;
  Util.positionFromMiddle(settings.cursorEl, current);
}

// Compute state
function update() {
  const {interpolateAmt } = settings;
  const a = state.current;
  const b = state.cursor;
  const c = Points.interpolate(interpolateAmt, a, b);
  saveState({ current: c});
}

function setup() {
  document.addEventListener(`pointermove`, (event) => {
    const cursor = {x: event.x, y: event.y};
    saveState({cursor});
  });

  // Call update() and use() every half a second
  setInterval(() => {
    update();
    use();
  }, settings.updateInterval);
}

/**
 * Saves the state
 * @param {Partial<State>} changes 
 * @returns Changed state
 */
function saveState(changes) {
  state = Object.freeze({
    ...state,
    ...changes
  });
  return state;
}
setup();
