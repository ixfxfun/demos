import * as Random from '@ixfx/random.js';

const settings = Object.freeze({
  el: /** @type HTMLElement */(document.querySelector(`#random`)),
  updateInterval: 500
});

/**
 * Define the type for 'State'
 * @typedef {Readonly<{
 * randomValue: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  randomValue: 0
});

// Use state
function use() {
  const { el } = settings;
  let { randomValue } = state;
  el.innerText = randomValue.toFixed(2);
}

// Compute state
function update() {
  // Compute
  const randomValue = Random.float();

  // At the end, save state
  saveState({
    randomValue
  });
}

function setup() {
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
