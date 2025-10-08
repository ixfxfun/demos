
import { Points, radianToDegree } from "@ixfx/geometry.js";
import { Poses } from "../util/Poses.js";

const settings = Object.freeze({
  containerEl: /** @type HTMLElement */(document.querySelector(`#things`))
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  pose: Poses.PoseTracker
 *  element: HTMLElement
 *  wristDistance: number
 *  wristZ: number
 *  indexAngleL: number
 *  indexAngleR: number
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { pose, element, wristDistance, wristZ, indexAngleL, indexAngleR } = thing;
  element.innerHTML = `
  <h2>Between hands</h2>
  <div>Distance: ${wristDistance.toFixed(2)}</div>
  <div>Z difference: ${wristZ.toFixed(2)}</div>
  <h2>Same hand/arm</h2>
  <div>Angle left: ${indexAngleL.toFixed(2)}</div>
  <div>Angle right: ${indexAngleR.toFixed(2)}</div>
  `;
};

/**
 * Updates a thing based on its own data as well as 'ambient state'
 * of the sketch.
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @param {Poses.PoseTracker} pose
 * @returns {Thing}
 */
export const update = (thing, ambientState, pose) => {
  const wristL = pose.landmarkValue(`left_wrist`);
  const wristR = pose.landmarkValue(`right_wrist`);

  const elbowL = pose.landmarkValue(`left_elbow`);
  const elbowR = pose.landmarkValue(`right_elbow`);

  const indexL = pose.landmarkValue(`left_index`);
  const indexR = pose.landmarkValue(`right_index`);

  const wristDistance = Points.distance(wristL, wristR);
  const wristZ = wristL.z - wristR.z;

  const indexAngleL = radianToDegree(Points.angleRadian(elbowL, indexL));
  const indexAngleR = radianToDegree(Points.angleRadian(elbowR, indexR));

  return {
    ...thing,
    wristDistance,
    wristZ,
    indexAngleL, indexAngleR
  };
};

/**
 * Removes a thing, deleting its associated DOM element
 * @param {Thing} thing 
 */
export const remove = (thing) => {
  const element = thing.element;
  element.remove();
};

/**
 * Creates a new thing
 * @param {Poses.PoseTracker} pose
 * @returns {Thing}
 */
export const create = (pose) => {
  const { containerEl } = settings;
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  containerEl.append(element);

  return {
    element,
    pose: pose,
    indexAngleL: 0,
    indexAngleR: 0,
    wristDistance: 0,
    wristZ: 0
  };
};