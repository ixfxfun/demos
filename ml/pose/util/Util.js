import { Lines, Points } from '../../../ixfx/geometry.js';
import * as MlVision from './Poses.js';

/**
 * Sorts raw `poses` by horziontal.
 * Leftmost pose will be first.
 * @param {MlVision.PoseData[]} poses 
 */
export const horizontalSort = (poses) => {
  const withCentroids = poses.map(p => ({
    ...p,
    centroid: centroid(p)
  }));
  withCentroids.sort((a, b) => a.centroid.x - b.centroid.x);
  return withCentroids;
};

/**
 * Return centroid of Pose based on landmarks
 * @param {MlVision.PoseData} pose 
 */
export const centroid = (pose) => Points.centroid(...pose.landmarks);

/**
 * Return centroid of pose based on world landmarks
 * @param {MlVision.PoseData} pose 
 * @returns 
 */
export const centroidWorld = (pose) => Points.centroid(...pose.world);

/**
 * Returns a line between two named/indexed landmarks.
 * If either of the two points are not found, _undefined_ is returned.
 * @param {MlVision.PoseData} pose 
 * @param {MlVision.PoseLandmarks|number} a 
 * @param {MlVision.PoseLandmarks|number} b 
 * @returns {Lines.Line|undefined}
 */
export const lineBetween = (pose, a, b) => {
  const ptA = MlVision.getLandmark(pose, a);
  const ptB = MlVision.getLandmark(pose, b);
  if (ptA === undefined) return;
  if (ptB === undefined) return;
  return Object.freeze({
    a: ptA,
    b: ptB
  });
};

/**
 * Returns the rough center of a pose, based on
 * the chest coordinates
 * @param {MlVision.PoseData} pose 
 */
export const roughCenter = (pose) => {
  const a = lineBetween(pose, `left_shoulder`, `right_hip`);
  const b = lineBetween(pose, `right_shoulder`, `left_hip`);
  if (a === undefined) return;
  if (b === undefined) return;

  // Get halfway of each line
  const halfA = Lines.interpolate(0.5, a);
  const halfB = Lines.interpolate(0.5, b);

  // Add them up
  const sum = Points.sum(halfA, halfB);

  // Divide to get avg
  return Points.divide(sum, 2, 2);
};
