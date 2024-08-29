import { LitElement } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { MlVision, Client } from "../../lib/index.js";
import { shortGuid } from '../../../ixfx/random.js';

// Parse query params
const params = (new URL(document.location.toString())).searchParams;

// Use 'peerId' specified as URL parameter or a random one
const peerId = params.get(`peerId`) ?? shortGuid();

// Setup
const ds = new MlVision(`#is`, {
  // Mode to run: pose, hand, objects, face
  mode: `pose`,
  // Remote id
  remote: {
    peerId
  },
  // Default camera
  camera: {
    facingMode: `user`,
  },
  pose: {
    outputSegmentationMasks: false,
    minPoseDetectionConfidence: 0.3,
    minPosePresenceConfidence: 0.4,
    minTrackingConfidence: 0.4,
    numPoses: 5,
    matcher: {
      distanceThreshold: 0.1,
      maxAgeMs: 2000,
      verbosity: `errors`
    }
  },
  // How often to run computation on image
  // Increase number to reduce CPU load, but add latency
  computeFreqMs: 100,

  // For troubleshooting, try 'info' or 'debug'
  verbosity: `errors`,
  wasmBase: `/ml/lib`,
  modelsBase: `/ml/lib/`,
  hideModelSelector: true
});

ds.init();

// Eg dump out data
// const client = new Client();
// client.addEventListener(`message`, event => {
//   const { detail } = event;
//   console.log(detail);
// })
