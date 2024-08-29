import * as Dom from '../../../ixfx/dom.js';
import * as MpVision from "../util/Poses.js";
import * as Util from './util.js';

// Will connect and receive poses for us
const poses = new MpVision.PosesConsumer();

const settings = Object.freeze({
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } })
});

/** 
 * @typedef {{
 *  yourState:number
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  yourState: 10
});


const update = () => {
  // Save it
  //const s = saveState({ stuffToSave });

  // Use it
  use(state);

  // Run in a loop
  window.requestAnimationFrame(update);
};

/**
 * Use state
 * @param {State} state 
 */
const use = (state) => {
  // get stuff from state
  // do stuff with it...
};


function setup() {
  // Automatically size canvas to viewport
  Dom.fullSizeCanvas(`#canvas`);

  // Draw loop
  window.requestAnimationFrame(update);
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