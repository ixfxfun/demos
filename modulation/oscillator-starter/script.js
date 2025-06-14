import { frequencyTimer } from '@ixfx/flow.js';
import { Oscillators } from '@ixfx/modulation.js';

const settings = Object.freeze({
  osc: Oscillators.sine(frequencyTimer(0.1))
});

/**
 * @typedef {Readonly<{
 *  oscValue: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  oscValue: 0
});

const update = () => {
  const { osc } = settings;

  const v = osc.next().value; // Sample oscillator
  saveState({
    oscValue: v ?? Number.NaN
  });
};

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  const { oscValue } = state;

  // Use oscValue somehow... here's two examples:

  // 1. Display value
  const oscValueElement = /** @type  HTMLElement */(document.querySelector(`#oscValue`));
  if (oscValueElement) oscValueElement.textContent = oscValue.toFixed(2);

  // 2. Use it to offset an element
  const thing = /** @type HTMLElement */(document.querySelector(`#thing`));
  if (thing) thing.style.transform = `translate(${oscValue * 300}px, 0px)`;
};

function setup() {
  const loop = () => {
    update();
    use(state);
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};
setup();

/**
 * Update state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}