import * as MlVision from './Poses.js';
import { PoseTracker } from './PoseTracker.js';
/**
 * @typedef {Readonly<{
 * maxAgeMs:number
 * resetAfterSamples:number
 * sampleLimit:number
 * storeIntermediate:boolean
 * }>} PosesTrackerOptions
 */

/**
 * Tracks several poses (ie. bodies)
 * 
 * Events:
 * - expired: Tracked pose has not been seen for a while
 * - added: A new pose id
 */
export class PosesTracker {
  /** 
   * PoseTrackers, keyed by 'sender-pose.id'
   * @type Map<string,PoseTracker> */
  #data = new Map();

  /** @type PosesTrackerOptions */
  #options;

  events = new EventTarget();

  /**
   * Constructor
   * @param {Partial<PosesTrackerOptions>} options 
   */
  constructor(options = {}) {
    this.#options = {
      maxAgeMs: 10_000,
      resetAfterSamples: 0,
      sampleLimit: 100,
      storeIntermediate: false,
      ...options
    };
    setInterval(() => {
      // Delete expired poses
      const expired = [...this.#data.entries()].filter(entry => entry[1].elapsed > this.#options.maxAgeMs);
      for (const entry of expired) {
        this.#data.delete(entry[0]);
        this.events.dispatchEvent(new CustomEvent(`expired`, { detail: entry[1] }));
      }
    }, 1000);
  }


  /**
   * Enumerates each of the PoseTrackers, sorted by age.
   * The most recent pose will be at position 0.
   * (ie. one for each body).
   * Use getRawPosesByAge() to enumerate raw pose data
   */
  *getByAge() {
    const trackers = [...this.#data.values()];
    trackers.sort((a, b) => a.elapsed - b.elapsed);
    yield* trackers.values();
  }



  /**
   * Enumerates PoseTrackers, sorting by the horizontal position.
   * Leftmost pose will be at position 0.
   */
  *getByHorizontal() {
    const trackers = [...this.#data.values()];
    trackers.sort((a, b) => a.middle.x - b.middle.x);
    yield* trackers;
  }

  /**
   * Enumerate all PoseTracker instances
   */
  *get() {
    const trackers = [...this.#data.values()];
    yield* trackers.values();
  }

  /**
   * Enumerate the last set of raw pose data for
   * each of the PoseTrackers.
   */
  *getRawPosesByAge() {
    for (const tracker of this.getByAge()) {
      yield tracker.last;
    }
  }

  *getRawPoses() {
    const values = [...this.#data.values()];
    for (const tracker of values) {
      yield tracker.last;
    }

  }

  /**
   * Get a raw landmark by name across all poses
   * 
   * @example Get the 'nose' landmark for all bodies
   * ````js
   * for (const n of poses.getRawLandmarks(`nose`)) {
   *  // Yields: { x, y, z?, score, name }
   * }
   * ```
   * @param {string} name 
   */
  *getRawLandmarks(name) {
    const index = MlVision.getPoseLandmarkIndexByName(name);
    if (index === undefined) throw new Error(`Landmark unknown: '${name}'`);
    for (const pose of this.getRawPoses()) {
      const kp = pose.landmarks[index];
      if (kp !== undefined) yield kp;
    }
  }

  /**
   * Enumerates all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) for a given landmark id.
   * 
   * eg. to get the PointTracker for 'nose' across all poses currently seen:
   * 
   * ```js
   * for (const pt of poses.getPointTrackers(`nose`)) {
   *  // do something with tracker...
   * }
   * ```
   * 
   * Throws an error if `name` is not found.
   * @param {string} name 
   */
  *getPointTrackers(name) {
    const index = MlVision.getPoseLandmarkIndexByName(name);
    if (index === undefined) throw new Error(`Landmark unknown: '${name}'`);
    for (const tracker of this.get()) {
      yield tracker.landmark(name);

    }
  }

  /**
   * Returns all [PointTrackers](https://api.ixfx.fun/classes/Trackers.PointTracker) from a particular sender
   * 
   * ```js
   * for (const pt of poses.getFromSender(`mobile`)) {
   *  // Do something with tracker...
   * }
   * ```
   * @param {string} senderId 
   */
  *getFromSender(senderId) {
    const values = [...this.#data.values()];
    for (const tracker of values) {
      if (tracker.fromId === senderId) yield tracker;
    }
  }


  /**
   * Enumerate the set of unique sender ids
   * ```js
   * for (const sender of poses.getSenderIds()) {
   *  // Do something with sender (string)
   * }
   * ```
   */
  *getSenderIds() {
    const set = new Set();
    const values = [...this.#data.values()];
    for (const entry of values) {
      set.add(entry.fromId);
    }
    yield* set.values();
  }

  /**
   * Returns the PoseTracker for this pose id.
   * 
   * ```js
   * const pose = poses.getByPoseId(`123`);
   * pose.middle; // { x, y }
   * ```
   * 
   * Warning: Pose ids are not unique if there are multiple data sources.
   * Prefer using guids.
   * 
   * @param {string} id 
   * @returns 
   */
  getByPoseId(id) {
    for (const entry of this.#data.values()) {
      if (entry.poseId === id) return entry;
    }
  }

  /**
   * Returns the last raw pose data for this pose id.
   * 
   * ```js
   * const pose = poses.getRawPoseByPoseId(`123`);
   * pose.landmark; // array of landmarks { x, y, z?, score, name }
   * pose.score; // score of this pose
   * pose.box;  // bounding box
   * ```
   * 
   * Warning: Pose ids are not unique if there are multiple data sources.
   * Prefer using guids.
   * @param {string} id 
   */
  getRawPoseByPoseId(id) {
    for (const entry of this.#data.values()) {
      if (entry.poseId === id) return entry.last;
    }
  }

  /**
   * Enumerate the set of globally-unique ids of poses
   */
  *getGuids() {
    for (const t of this.#data.values()) {
      yield t.guid;
    }
  }

  /**
   * Get the PoseTracker for unique id
   * ```js
   * const pt = poses.getByGuid(`123-123`);
   * pt.middle; // { x, y }
   * ```
   * 
   * Alternatively: {@link getRawPoseByGuid} to get raw data
   * @param {string} id 
   * @returns 
   */
  getByGuid(id) {
    return this.#data.get(id);
  }

  /**
   * Returns the raw pose data for a unique id
   * ```js
   * const pose = poses.getRawPoseByGuide(`123-123`);
   * pose.landmark; // array of { x, y, z?, score, name }
   * pose.score;     // score of pose
   * ```
   * 
   * Alternatively: {@link getByGuid} to get a tracker for pose
   * @param {string} id 
   * @returns 
   */
  getRawPoseByGuid(id) {
    return this.#data.get(id)?.last;
  }

  /**
   * Track a pose.
   * Fires `added` event if it is a new pose.
   * Returns the globally-unique id for this pose
   * @param {MlVision.PoseData} pose 
   * @param {string} from
   */
  seen(from, pose) {
    if (from === undefined) throw new Error(`Param 'from' is undefined`);
    if (pose === undefined) throw new Error(`Param 'pose' is undefined`);

    // Construct globally-unique id for this pose
    const id = (pose.poseid ?? 0).toString();
    const nsId = from + `-` + id;

    // Does it exist already?
    let tp = this.#data.get(nsId);

    // Nope, make a new PoseTracker
    if (tp === undefined) {
      tp = new PoseTracker(from, id, this.#options);
      this.#data.set(nsId, tp);
      tp.seen(pose);
      this.events.dispatchEvent(new CustomEvent(`added`, { detail: tp }));
    } else {
      // Got it, update with latest pose
      tp.seen(pose);
    }
    return nsId;
  }

  /**
   * Return number of tracked poses
   */
  get size() {
    return this.#data.size;
  }

  /**
   * Clear all data
   */
  clear() {
    this.#data.clear();
  }

}
