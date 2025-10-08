// @ts-ignore
import { LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { MlVision } from "../../lib/index.js";
import { shortGuid } from '@ixfx/random.js';

// Parse query params
const params = (new URL(document.location.toString())).searchParams;

// Use 'peerId' specified as URL parameter or a random one
const peerId = params.get(`peerId`) ?? shortGuid();

// Setup
const ds = new MlVision(`#is`, {
  // Mode to run: pose, hand, objects, face
  mode: `pose`,
  // How often to run computation on image
  // Increase number to reduce CPU load, but add latency
  computeFreqMs: intParamOrDefault(`freq`, 100),
  // Remote id
  remote: {
    peerId
  },
  // Default camera
  camera: {
    facingMode: `user`,
  },
  // Settings for pose detection
  pose: {
    // See: https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker#configurations_options
    outputSegmentationMasks: false,
    minPoseDetectionConfidence: floatParamOrDefault(`minPoseDetectionConfidence`, 0.5),
    minPosePresenceConfidence: floatParamOrDefault(`minPosePresenceConfidence`, 0.5),
    minTrackingConfidence: floatParamOrDefault(`minTrackingConfidence`, 0.5),
    numPoses: intParamOrDefault(`numPoses`, 5),
    // For more on models:
    // https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker#models
    modelPath: `pose_landmarker_lite.task`,
    verbosity: `errors`,
    matcher: {
      distanceThreshold: 0.1,
      maxAgeMs: 2000,
      verbosity: `errors`
    }
  },
  // For troubleshooting, try 'info' or 'debug'
  verbosity: `errors`,
  wasmBase: `/ml/lib`,
  // If you download models locally, put them in /ml/lib, use the setting '/ml/lib'
  modelsBase: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/`,
  hideModelSelector: true
});

ds.init();
ds.addEventListener(`processorstate`, event => {
  const detail = /** @type CustomEvent */(event).detail;
  if (detail === `started`) {
    updateParams();
  }
});

document.querySelector(`#options`)?.addEventListener(`change`, event => {
  const t = /** @type HTMLInputElement */(event.target);
  const v = t.valueAsNumber;
  const id = t.id;
  t.title = `Value: ${v}`;
  const pd = ds.processing.currentModelPoseDetector;
  pd[id] = v;
});

function updateParams() {
  const pd = ds.processing.currentModelPoseDetector;
  /** @type HTMLInputElement */(document.querySelector(`#numPoses`)).value = pd.numPoses.toString();
  /** @type HTMLInputElement */(document.querySelector(`#numPoses`)).title = pd.numPoses.toString();


  /** @type HTMLInputElement */(document.querySelector(`#minPoseDetectionConfidence`)).value = pd.minPoseDetectionConfidence.toString();
  /** @type HTMLInputElement */(document.querySelector(`#minPoseDetectionConfidence`)).title = pd.minPoseDetectionConfidence.toString();

  /** @type HTMLInputElement */(document.querySelector(`#minPosePresenceConfidence`)).value = pd.minPosePresenceConfidence.toString();
  /** @type HTMLInputElement */(document.querySelector(`#minPosePresenceConfidence`)).title = pd.minPosePresenceConfidence.toString();

  /** @type HTMLInputElement */(document.querySelector(`#minTrackingConfidence`)).value = pd.minTrackingConfidence.toString();
  /** @type HTMLInputElement */(document.querySelector(`#minTrackingConfidence`)).title = pd.minTrackingConfidence.toString();
}

// Eg dump out data
// const client = new Client();
// client.addEventListener(`message`, event => {
//   const { detail } = event;
//   console.log(detail);
// })

/**
 * Return an integer value from URL parameter or use a default value
 * @param {string} name 
 * @param {number} defaultValue 
 * @returns 
 */
function intParamOrDefault(name, defaultValue) {
  const p = params.get(name);
  if (p !== null) {
    const v = Number.parseInt(p);
    return v;
  }
  return defaultValue;
}

/**
 * Return an integer value from URL parameter or use a default value
 * @param {string} name 
 * @param {number} defaultValue 
 * @returns 
 */
function floatParamOrDefault(name, defaultValue) {
  const p = params.get(name);
  if (p !== null) {
    const v = Number.parseFloat(p);
    return v;
  }
  return defaultValue;
}