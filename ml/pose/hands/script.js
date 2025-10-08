import * as Dom from '@ixfx/dom.js';
import { continuously } from '@ixfx/flow.js';
import { Poses, PosesConsumer } from "../util/Poses.js";
import * as Things from './thing.js';
import { Maps } from '@ixfx/collections.js';

const settings = Object.freeze({
  updateRateMs: 100,
  poses: new PosesConsumer({
    // Old poses are ignored after this length of time
    maxAgeMs: 1000
  }).poses,
  dataDisplay: new Dom.DataDisplay({ numbers: { leftPadding: 5, precision: 2 } }),
});

/** 
 * @typedef {{
 *  things: Maps.IMapImmutable<string, Things.Thing>
 * }} State
 */

/**
 * @type {State}
 */
let state = Object.freeze({
  things: Maps.immutable()
});


const update = () => {
  const { poses } = settings;
  let { things } = state;

  for (const pose of poses.get()) {
    let thing = things.get(pose.guid);
    if (!thing) {
      // No thing for pose
      thing = Things.create(pose);
    }

    // Update thing
    thing = Things.update(thing, state, pose);
    things = things.set(pose.guid, thing);
  }
  saveState({ things });
};

const use = () => {
  const { things } = state;

  for (const t of things.values()) {
    Things.use(t);
  }
};

function onPoseExpired(event) {
  let { things } = state;

  // Get the PoseTracker for the expired pose
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);

  // Find thing for this pose
  const t = things.get(poseTracker.guid);
  if (!t) return; // Not found

  Things.remove(t);
  things = things.delete(poseTracker.guid);
  saveState({ things });
}

function setup() {
  const { poses } = settings;
  poses.addEventListener(`expired`, onPoseExpired);

  continuously(() => {
    update();
    use();
  }, settings.updateRateMs).start();
}

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