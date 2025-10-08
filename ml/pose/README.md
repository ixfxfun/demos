# ml/pose

We use MediaPipe (MP) for this module.
* [MediaPipe overview](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker)
* [BlazePose model card](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20BlazePose%20GHUM%203D.pdf)
* ixfx PointTracker [Guide](https://ixfx.fun/geometry/points/tracking/#pointtracker) or [API](https://api.ixfx.fun/_ixfx/geometry/PointTracker/)
* [Helper API docs](https://demos.ixfx.fun/ml/lib/client/docs/modules/Poses)

# Introdution

A _pose_ represents a single human body. A pose is made up of _landmarks_ which are defined parts of the body which get tracked. Each landmark consists of an x, y and z. The coordinates are scalars (0..1) and relative to the camera frame. That is, a landmark at `{ x: 0, y: 0}` would correspond to the top-left of the camera. Z represents closeness to the camera. It uses the hips as a reference point, with negative numbers being between hips and camera and positive values behind the hips, away from the camera.

![](landmarks.png)

Each of the landmarks has an associated name, so in code you can access `left_shoulder` rather than using its numerical index of 11.

It's important to keep in mind that that 'left' and 'right' for landmark names are with respect to the person's body _not_ how it is oriented. That is, `left_shoulder` refers to the person's left shoulder, not a shoulder that is facing left, on the left side of the camera or whatever.

All the image processing is done locally on your own computer. This keeps things private and low-latency, but does mean your CPU will get pushed. It's a good idea to keep your laptop plugged in so it runs at its best.

# Demos overview

Roughly listed in ascending complexity
* starter-canvas / starter-dom: simple starter sketches that don't do much but get you going.
* shoulders-basic: uses the height difference between left and right shoulder, drawing it using the canvas.
* hands: does some basic calculations between hand landmarks for any number of poses.
* between-basic: shows how to access poses and landmarks on a spatial basis.
* shoulders: Uses the same calculation as 'shoulders-basic', but uses the value in a fancier way, nudging a 'Thing' rather than setting the value directly.
* head: uses some of the head landmarks (mirror).
* between: computes distance between pairs of bodies.
* landmark: uses historical values per pose, per landmark.

# Architecture

A _sender_ sketch reads data from a source (webcam, video, or recorded points) and emits it via [Remote](https://github.com/clinth/remote)

This sketch probably does not need to be modified, but it is how some MediaPipe settings can be tweaked. See its README for more on that.

You can also override parameters by adding on bits to the URL. The 'between-basic' demo does this, linking to the sender like so:

```
sender/index.html?numPoses=2&minPoseDetectionConfidence=0.2&minPosePresenceConfidence=0.9
```

Parameters you can set (see the MediaPipe docs for more info)
* numPoses: default: 5
* minPoseDetectionConfidence: default 0.5
* minPosePresenceConfidence: default 0.5
* minTrackingConfidence: default 0.5
* freq: how often to process frames (milliseconds). Defaults to 100. Lower numbers improve tracking fast moving things, but increase CPU load.

In `pose/head`, we show how to embed the source in the page via an `IFRAME`. The downside of this is that with every little change in your code, the sender has to also reload - and this can be cumbersome when we are accessing media.

Instead, the idea is to open the sender sketch in a separate window and leave it running. If you minimise or cover it over with another window, the browser may suspend Javascript execution (as a battery-saving mechanism).

Tip: There are tools for Windows & Mac to make any window stay on top of all other windows.

Your sketch receives pose data from the sender, but you need to be using the same browser.

In your own sketch, you can import stuff relating via:

```js
import { Poses, PosesConsumer } from "../util/Poses.js";
```
...assuming your sketch is located at `demos/ml/pose/YOUR-SKETCH` and thus accessible via _http://localhost:3000/ml/pose/YOUR-SKETCH_

In terms of objects that you'll encounter, from top-level to low-level, we have:
* PosesConsumer -> PosesTracker -> PoseTracker -> PointTracker

* PosesConsumer: listens for pose data and updates PosesTracker
* [PosesTracker](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PosesTracker): maintain a set of poses currently observed by MediaPipe
* [PoseTracker](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PoseTracker): tracks the 'landmarks' of single pose (ie. a single human body)
* [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/): tracks the history of a single 'landmark', eg the nose, on a single body

Thus, if you want to do something with different poses, you probably want to start with the `PosesTracker`, use it to find the pose you're interested in and from there dig deeper.


## Pose ids

Pose ids are generated when MediaPipe starts tracking a body. If it loses tracking, the same human body might get assigned a new id. Ids are generated by the sender sketch. Since there could be multiple senders, we can't use the pose id to properly separate poses. Thus, we use a 'guid' (globally-unique id). This consists of the sender's id and the pose id. If the sender's id is '407-33', and the pose id is 1, the guid of that pose will be '407-33-1'.

# PoseConsumer

The `PosesConsumer` does some minor house-keeping for you.

In the demos, it's used as follows:

```js
// Import
import { Poses, PosesConsumer } from "../util/Poses.js";

// Create as part of settings
const settings = Object.freeze({
  // Forget a pose if it hasn't been updated for over 1 second
  poseConsumer: new PosesConsumer({ maxAgeMs: 1000 })
});

function setup() {
  const { poses } = settings.poseConsumer;
  // Get notified when a new pose is detected or one expires
  poses.addEventListener(`added`, onPoseAdded);
  poses.addEventListener(`expired`, onPoseExpired);
}

// A new pose is detected
function onPoseAdded(event)  {
  // Get the PoseTracker for this pose
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
}

function onPoseExpired(event)  {
  // Get the PoseTracker for the expired pose
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
}
```

`PoseConsumer` internally holds a `PosesTracker` (see next section), and does the job
of automatically updating the tracker when new pose data is received.

# PosesTracker

[`PosesTracker`](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PosesTracker) keeps track of all current poses (ie. multiple bodies). If you're using the `PosesConsumer` as described above, you can get the `PosesTracker` this way:

```js
// Get the PosesTracker instance buried in the PoseConsumer
const poses = settings.poseConsumer.poses;
```

## Listening for new/lost poses

The tracker emits events to let you know if a pose appears for the first time, or when it disappears (eg. because the body has moved out of camera frame, or we lose tracking)

```js
poses.addEventListener(`expired`, event => { 
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
  console.log(`Pose expired: ${poseTracker.guid}`);
});

poses.addEventListener(`added`, event => {
  const poseTracker = /** @type Poses.PoseTracker */(event.detail);
  console.log(`Pose added: ${poseTracker.guid}`);
});
```

## Enumerating data

Get the `PoseTracker` for each pose (ie. each body)
* Regardless of sender: `get` 
* Sorted by age: `getByAge` (position 0 is most recently updated pose)
* Sorted by score: `getByScore` (position 0 is highest-ranked score)
* From a particular sender: `getFromSender(senderId)`

Spatial
* Sorted by horizontal position `getByHorizontal` (position 0 is the left-most pose by camera frame)
* Sorted by vertical position `getByVertical` (position 0 is the highest pose, by camera frame)
* Sorted by distance  `getByDistance` (position 0 is the closest to camera)
* Sorted by by distance from point `getByDistanceFromPoint(point)`
* Closest pose to point `getClosestPoseToPoint(point)`

You can also access landmarks across all poses:
* To get the PoseTrackers: `landmarks()` or filtering: `landmarks('nose')`
* To get the Points: `landmarkValues()`
Misc
* Get sender ids: `getSenderIds`
* Get raw pose data regardless of sender: `getRawPoses` (`getRawPosesByAge` sorts by last updated)

Example

```js
// Get all PoseTrackers (ie. all visible bodies)
for (const tracker of poses.get()) {
  // Since we have the tracker, we can do low-level work with landmarks
}

// Get the raw pose data (ie all visible bodies), sorted by age
for (const pose of poses.getRawPosesByAge()) {
  pose.landmarks; // array of { x, y, z?, score, name }
}
```

## Accessing a particular pose

Since we may have multiple senders which may have overlapping pose ids, to access a pose, we need the sender's id as well as the pose id.

Use `getByGuid(guid)` to get the tracker, or `getRawPoseByGuid` to get the raw pose data.

```js
// Get the corresponding tracker
const trackerForPose = poses.getByGuid(`902-42-10`);

// Get the last raw pose data
const poseData = poses.getRawPoseByGuid(`902-42-10`);
```

If we don't have the sender id for some reason, or if you can be sure there's only one sender, you can get a pose by it's id with `getByPoseId`. This returns a `PoseTracker` instance.

```js
// Get the corresponding tracker
const trackerForPose = poses.getByPoseId(`10`);

// Get the last raw pose data
const poseData = poses.getRawPoseByPoseId(`10`);
```

# PoseTracker

The [`PoseTracker`](https://demos.ixfx.fun/ml/lib/client/docs/classes/Poses.PoseTracker) instance maintains data for a single body. A body is itself made up several 'landmarks', known points of the body with associated coordinates. The `PoseTracker` does the work of tracking the movement of each landmark over time using a `PointTracker` ([Guide](https://ixfx.fun/geometry/points/tracking/#pointtracker), [API](https://api.ixfx.fun/_ixfx/geometry/PointTracker/))

There's documentation provided by VS Code when working with the tracker. But here's an overview:

Geometry that based on all the landmarks of pose:

```js
poseTracker.box // { x, y, width, height }
poseTracker.height
poseTracker.width
poseTracker.middle // Middle of the .box rectangle

// Geometric middle point of pose (more correct than .middle)
poseTracker.centroid()
// Get centroid between shoulders
poseTracker.centroid(`left_shoulder`, `right_shoulder`);
```

Each pose has an associated id (which comes direct from MediaPipe), or a 'guid' (globally-unique id). The guid is useful if you are merging data from several different cameras.

```js
poseTracker.poseId; // string id
poseTracker.guid;   // string globally-unique id
```

If you want to do something with a particular landmark, eg the nose, you can get the underlying [PointTracker](https://api.ixfx.fun/_ixfx/geometry/PointTracker/), or the raw point value:

```js
poseTracker.landmark(`nose`) // PointTracker
poseTracker.landmarkValue(`nose`); // Point
```

You can access landmarks spatially, with reference to the camera frame. All of these functions allow you to provide a named list of landmarks, or their numeric index. If no parameter is given, all landmarks for that pose are used.

```js
// Get PointTrackers for both landmarks, but sorted by X coordinate
poseTracker.getSortedByX(`left_wrist`, `right_wrist`); // Y & Z variations available too

poseTracker.getLeftmost(); // Get whichever feature is the leftmost
poseTracker.getRightmost(`left_ankle`, `right_ankle`); // Get whichever ankle is the rightmost
poseTracker.getHighest() / getLowest(); // Uses vertical
poseTracker.getNearest() / getFurtherest(); // Uses proximity to camera frame

poseTracker.getByDistanceFromPoint(point); // Get landmarks, sorted by distance from point
poseTracker.getClosestLandmarkToPoint(point); // Get closest landmark to point

```

If you have the `PointTracker`, then you can do things like calculate the angle of movement etc.

To get `PointTrackers` or value for _all_ landmarks:
```js
poseTracker.landmarks()
poseTracker.landmarkValues()
```

You can also provide a list of indexes or named landmarks:
```js
// Get PointTrackers for right arm
for (const l of poseTracker.landmarks(...Poses.armRightIndexes)) {

}
```
To access the last raw `PoseData` from MediaPipe:
```js
poseTracker.last; // PoseData
```


# Recording

Point data is recorded to the browser's local storage. Image data is are not stored.

# Utility

A few utility functions are available when importing:
```js
import * as MoveNet from "../Poses.js";
```


Sort array of poses horizontally:
```js
const sorted = MoveNet.horizontalSort(poses);
```

Get centroid of pose (including all landmarks):
```js
const centroid = MoveNet.centroid(pose); // {x,y}
```

Return a line between two named points. If either of the points is not found, _undefined_ is returned. This is useful for using with ixfx's Line module.
```js
const line = MoveNet.lineBetween(pose, `left_shoulder`, `right_shoulder`);
// { a: { x, y }, b: { x, y } }
```

Gets the center based on the torso (between shoulders and hips). If
any of the needed points is not found, _undefined_ is returned.
```js
const c = MoveNet.roughCenter(pose); // { x, y }
```

# Troubleshooting

## https

Your code will not be able to access media devices like a camera if it's being loaded from an insecure connection.

If you're running a local server, make sure you're using http://127.0.0.1 as the address. If you're running from an online hosting service, make sure you're accessing via `https://`.
