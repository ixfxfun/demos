import * as Brush from './brush.js';
import * as Ink from './ink.js';
import { filterAB } from '@ixfx/arrays.js';
import { CanvasHelper } from '@ixfx/visual.js';

const settings = Object.freeze({
  canvas: new CanvasHelper(`#canvas`, { resizeLogic: `both` }),
  fillColour: `hsl(0deg 0% 100% / 0.01)`
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
  const { canvas, fillColour } = settings;
  let { brush, ink } = state;
  const canvasContext = canvas.ctx;

  // Fade out canvas
  canvasContext.fillStyle = fillColour;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Use ink
  ink.forEach(i => Ink.use(i, canvasContext));

  // Use brush
  Brush.use(brush);

};

const update = () => {
  let { brush, ink } = state;

  // Update brush
  brush = Brush.update(brush, state);

  // Update all the droplets
  ink = ink.map(i => Ink.update(i, state));

  // Update our state
  saveState({ brush, ink });
};


/**
 * Pointer is pressed
 * @param {PointerEvent} event 
 */
function onPointerDown(event) {
  let { brush } = state;

  const positionAbsolute = { x: event.x, y: event.y };

  // Update brush
  brush = {
    ...brush,
    active: true,
    positionAbsolute
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

  const positions = events.map(event => ({ x: event.x, y: event.y }));

  // Update brush with current position
  brush = {
    ...brush,
    positionAbsolute: positions[positions.length - 1] // Use last position as current
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

  const loop = () => {
    update();
    use();

    // Now that queued ink has been painted, we can clear it
    saveState({ ink: [] });
    requestAnimationFrame(loop);
  };
  loop();
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