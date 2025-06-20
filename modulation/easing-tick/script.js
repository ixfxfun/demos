import { Easings } from '@ixfx/modulation.js';
import * as Core from '@ixfx/core.js';
import * as Util from './util.js';

const settings = Object.freeze({
  // Use a manual 'Easer' so we can advanced it when we want 
  easing: Easings.tickEasing(`sineIn`, 10),
  // Thing we'll move
  thingElement: /** @type HTMLElement */(document.querySelector(`#thing`)),
});

/**
 * @typedef {Readonly<{
 *  value:number
 * }>} State
 */

/** @type State */
let state = {
  value: 0
};

/**
 * Trigger a 'tick' of the easing, manually advancing it.
 * @param {Event} event 
 * @returns 
 */
const onPointerOrKeyUp = (event) => {
  const { easing } = settings;
  event.preventDefault();

  saveState({
    value: easing.compute() // trigger a 'tick'
  });

  // Update visuals
  update();
};

/**
 * Make visual udpates based on current state
 * @param {Core.ResolvedObject<state>} computed
 * @returns 
 */
const use = (computed) => {
  // Grab relevant fields from settings & state
  const { thingElement, easing } = settings;
  const { value } = computed;

  if (easing.isDone) {
    thingElement.classList.add(`isDone`);
  }

  // Available width is width of viewport minus size of circle
  const thingElementBounds = thingElement.getBoundingClientRect();
  const width = document.body.clientWidth - thingElementBounds.width;

  thingElement.textContent = Util.percentage(value);

  // Move element
  thingElement.style.transform = `translate(${value * width}px, 0px)`;
};

async function update() {
  // Resolve functions in state
  const computed = await Core.resolveFields(state);

  // Use the computed state
  await use(computed);
}

function setup() {
  // Handle events
  document.addEventListener(`keydown`, onPointerOrKeyUp);
  document.addEventListener(`click`, onPointerOrKeyUp);

  update();
};
setup();

/**
 * Update state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}