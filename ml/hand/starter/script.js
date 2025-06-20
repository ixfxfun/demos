// @ts-ignore
import { Remote } from "https://unpkg.com/@clinth/remote@latest/dist/index.mjs";
import * as Dom from '@ixfx/dom.js';
import * as MpVision from '../../lib/client/index.js';
import * as Hands from '../hands.js';

const settings = Object.freeze({
  updateRateMs: 100, // How quickly to call update()
  remote: new Remote(),
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
  thingEl: /** @type HTMLElement */(document.querySelector(`#thing`))
});


/**
 * @typedef {Readonly<{
 *  blah:number
 * }>} State
 */

/** @type State */
let state = {
  blah: 0
};

/**
 * Runs periodically, computing something
 * new from latest pose data
 */
const update = () => {
  // Debug display, eg: 
  // settings.dataDisplay.update({ field1, field2 );
};

/**
 * Uses state
 */
function use() {
  // Do something...
  const { blah } = state;
}

/**
 * Called with data from MediaPipe
 * @param {MpVision.HandLandmarkerResult} hands 
 */
const updateFromHands = (hands) => {
  if (!hands || hands.landmarks.length === 0) {
    // No data... do something special?
    return;
  }

  // Eg get data for first hand
  const hand = Hands.getHand(0, hands);

};


/**
 * Setup and run main loop 
 */
function setup() {
  const { updateRateMs, remote } = settings;

  remote.onData = onReceivedPoses;

  // Update at updateRateMs
  const updateLoop = () => {
    update();
    use();
    setTimeout(updateLoop, updateRateMs);
  };
  updateLoop();

};
setup();


/**
 * Called when we have pose data via Remote.
 * Hand data is saved to state.
 * @param {*} packet 
 */
function onReceivedPoses(packet) {
  const { data } = packet;
  const handsData = /** @type MpVision.HandLandmarkerResult */(JSON.parse(data));

  if (Array.isArray(handsData)) {
    console.warn(`Unexpectedly getting an array of data. Is the sender set to 'face'?`);
    return;
  }

  if (!(`handedness` in handsData)) {
    console.warn(`Did not find 'handedness' property as expected. Is the sender set to 'hand'?`);
    return;
  }
  updateFromHands(handsData);
};

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
