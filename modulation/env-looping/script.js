import { Envelopes } from '@ixfx/modulation.js';

const settings = Object.freeze({
  sampleRateMs: 5,
  // Create the envelope
  envelope: new Envelopes.Adsr({
    attackBend: 1,
    attackDuration: 1000,
    releaseLevel: 0,
    releaseDuration: 1000,
    sustainLevel: 1,
    shouldLoop: true
  })
});

/**
 * @typedef {{
 * envelopeValue: number
 * }} State
 */

/** @type State */
let state = Object.freeze({
  envelopeValue: 0
});

const update = () => {
  let { envelope } = settings;

  // Read value from envelope and set it to state
  let envelopeValue = envelope.value;

  // Set value to 0 if envelope has not been started
  if (Number.isNaN(envelopeValue)) envelopeValue = 0;

  use(saveState({
    envelopeValue
  }));
  window.requestAnimationFrame(update);
};

/**
 * Apply the state to visual properties etc...
 * @param {State} state
 */
const use = (state) => {
  const { envelopeValue } = state;
  console.log(envelopeValue);
};

function setup() {
  update();

  // Trigger envelope
  settings.envelope.trigger();
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