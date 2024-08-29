import { PointTracker, TrackedPointMap, points as pointsTracker } from '../../../ixfx/trackers.js';
import { Points } from '../../../ixfx/geometry.js';
import * as MlVision from './Poses.js';

/**
 * Tracks landmarks over time for a single pose (ie. body).
 * 
 * It's important to call .seen() with pose data.
 */
export class PoseTracker {
  #fromId;
  #poseId;
  #guid;
  #seen = 0;
  /** @type import('../../../ixfx/geometry.js').RectPositioned|undefined */
  #box;

  /** @type MlVision.PoseData */
  #data;
  /** @type TrackedPointMap */
  points;
  /** @type number */
  #hue;

  /**
   * Creates a PoseTracker
   * @param {string} fromId Data source for pose (ie device)
   * @param {string} poseId Id of pose from TFjs
   * @param {import('../../../ixfx/trackers.js').TrackedValueOpts} options 
   */
  constructor(fromId, poseId, options) {
    this.#poseId = poseId;
    this.#fromId = fromId;
    this.#guid = fromId + `-` + poseId;
    this.#hue = Math.random() * 360;
    this.points = pointsTracker({ id: poseId, ...options });
  }

  /**
   * Reset stored data for the tracker
   */
  reset() {
    this.points.reset();
  }

  /**
   * Returns a [PointTracker](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark
   * 
   * ```js
   * // Eg. get tracker for the 'nose' landmark
   * const nose = pose.landmark(`nose`);
   * 
   * // Get the angle of nose movement since the start
   * const a = nose.angleFromStart();
   * 
   * // Get the distance of nose since start
   * const d = nose.distanceFromStart();
   * ```
   * @param {*} name 
   * @returns 
   */
  landmark(name) {
    const d = /** @type PointTracker */(this.points.get(name));
    return d;
  }

  /**
   * Returns the last position for a given landmark.
   * ```js
   * const pos = pose.landmarkValue(`nose`); // { x, y }
   * ```
   * 
   * Throws an error if `name` does not exist.
   * @param {string} name 
   * @returns 
   */
  landmarkValue(name) {
    const t = this.points.get(name);
    if (t === undefined) throw new Error(`Point '${name}' is not tracked`);
    const pt = t.last;
    if (pt === undefined) throw new Error(`No data for point '${name}'`);
    return pt;
  }

  /**
   * Update this pose with new information
   * @param {MlVision.PoseData} pose 
   */
  async seen(pose) {
    this.#seen = Date.now();
    this.#data = pose;

    for (let i = 0; i < pose.landmarks.length; i++) {
      const lm = pose.landmarks[i];
      const name = MlVision.getPoseLandmarkNameByIndex(i);
      await this.points.seen(name, lm);
    }
  }

  /**
   * Returns all the [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) (ie. landmark) for this pose.
   * 
   * ```js
   * for (const pt of pose.getPointTrackers()) {
   *  // Do something with 'pt' (which tracks one individual landmark)
   * }
   * ```
   */
  *getPointTrackers() {
    yield* this.points.store.values();
  }

  /**
   * Returns the raw landmarks
   * 
   * ```js
   * for (const kp of pose.getRawValues()) {
   *  // { x, y, z?, score, name }
   * }
   * ```
   * @returns {Generator<import('../../../ixfx/geometry.js').Point>}
   */
  *getRawValues() {
    for (const v of this.points.store.values()) {
      yield v.last;
    }
  }

  /**
   * Returns the centroid of all the pose points
   * ```js
   * pose.centroid; // { x, y }
   * ```
   */
  get centroid() {
    return MlVision.centroid(this.#data);
  }

  /**
   * Returns height of bounding box
   */
  get height() {
    return this.box.height;
  }

  /**
   * Return width of bounding box
   */
  get width() {
    return this.box.width;
  }


  /**
   * Gets the bounding box of the pose, computed by 'landmarks'.
   * ```js
   * pose.box; // { x, y, width, height }
   * ````
   */
  get box() {
    if (this.#box) return this.#box;
    this.#box = Points.bbox(...this.#data.landmarks);
    return this.#box;
  }

  /**
   * Returns the id of the sender
   */
  get peerId() {
    return this.#fromId;
  }

  /**
   * Returns the middle of the pose bounding box
   * ```js
   * pose.middle; // { x, y }
   * ```
   * @returns 
   */
  get middle() {
    const box = this.box;
    if (box) {
      return {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2
      };
    }
    return { x: 0, y: 0 };
  }

  /**
   * Returns the randomly-assigned hue (0..360)
   */
  get hue() {
    return this.#hue;
  }

  /**
   * Returns a CSS colour: hsl() based on
   * the randomly-assigned hue
   */
  get hsl() {
    return `hsl(${this.#hue}, 70%, 50%)`;
  }

  /**
   * Returns the globally unique id of this pose
   * (fromId-poseId)
   */
  get guid() {
    return this.#guid;
  }

  /**
   * Returns the original pose id from TFjs
   * Warning: this may not be unique if there are multiple senders
   */
  get poseId() {
    return this.#poseId;
  }
  /**
   * Returns the id of the sender of this pose
   */
  get fromId() {
    return this.#fromId;
  }


  /**
   * Returns how long since pose was updated
   */
  get elapsed() {
    return Date.now() - this.#seen;
  }

  /**
   * Returns the last pose data in raw format
   */
  get last() {
    return this.#data;
  }
}