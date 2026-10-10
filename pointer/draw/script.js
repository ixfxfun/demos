import * as Brush from './brush.js';
import * as Ink from './ink.js';
import * as Util from './util.js';
import { filterAB } from '@ixfx/arrays.js';

const settings = Object.freeze({
  updateRateMs: 1
});

/** 
 * @typedef {{
 *  ink:Ink.Ink[]
 *  brush: Brush.Brush
 * }} State
 */

/** @type {State} */
let state = Object.freeze({
  ink: [],
  brush: Brush.create()
});


const use = () => {
  let { brush, ink } = state;

  // Use ink
  ink.forEach(i => Ink.use(i));

  // Use brush
  Brush.use(brush);

};

const update = () => {
  let { brush, ink } = state;

  // Update brush
  brush = Brush.update(brush, state);

  // Update all the droplets
  ink = ink.map(i => Ink.update(i, state));

  // Filter ink droplets into two: those that are still 'alive', and those that are 'dead'
  // This is based on whether their .age property has reached 1.
  const [ alive, dead ] = filterAB(ink, (i => i.age < 1));

  // Remove droplets deemed dead
  dead.forEach(deadInk => Ink.destroy(deadInk));

  // Update our state
  saveState({ brush, ink: alive });
};


/**
 * Pointer is pressed
 * @param {PointerEvent} event 
 */
function onPointerDown(event) {
  let { brush } = state;

  // Relative point cursor position
  const position = Util.relativePoint(event.x, event.y);

  // Update brush
  brush = {
    ...brush,
    active: true,
    position
  };

  // Save brush to state
  saveState({ brush });
}

/**
 * Pointer is up or has left the window. Deactivate the brush
 * @param {PointerEvent} event 
 */
function onPointerUp(event) {
  let { brush } = state;
  brush = {
    ...brush,
    active: false
  };
  saveState({ brush });
}

/**
 * Pointer has moved.
 * This will fire if we're dragging or not
 * @param {PointerEvent} event 
 */
function onPointerMove(event) {
  let { brush, ink } = state;

  // For one move event, sometimes there's actually
  // data on how the pointer moved. This is useful
  // for higher-resolution drawing.
  const events = event.getCoalescedEvents();

  const positions = events.map(event => Util.relativePointFromEvent(event));

  // Update brush with current position
  brush = {
    ...brush,
    position: positions[positions.length - 1] // Use last position as current
  };

  // Add ink droplets
  const newInk = positions.map(position => Ink.create(position, brush));

  // Add up all the ink
  ink = [ ...ink, ...newInk ];

  // Save it to state
  saveState({ brush, ink });
}

function setup() {
  document.addEventListener(`pointerdown`, onPointerDown);
  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerup`, onPointerUp);

  setInterval(() => {
    update();
    use();
  }, settings.updateRateMs);
}

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