import { __export } from "./chunk-51aI8Tpl.js";
import { Continuously$1 as Continuously } from "./continuously-CIxAo5ve.js";
import { IsEqual$1 as IsEqual } from "./is-equal-B6tO-zUz.js";
import { Interval$1 as Interval } from "./types-BDmh3f9N.js";
import { ISimpleEventEmitter$1 as ISimpleEventEmitter, SimpleEventEmitter$3 as SimpleEventEmitter } from "./simple-event-emitter-DCUgt8T8.js";
import { Point } from "./point-type-aLgOjGpR.js";
import { Rect } from "./rect-types-Bp6n9fMD.js";

//#region ../packages/collections/src/queue/iqueue-mutable.d.ts
type QueueMutableEvents<V> = {
  /**
   * Data has been added
   * * added: data attempted to be added. Note: not all of it may have been accepted into queue
   * * finalData: actual state of queue
   */
  enqueue: {
    added: readonly V[];
    finalData: readonly V[];
  };
  /**
   * Single item dequeued.
   * When dequeing the 'removed' event also fires
   */
  dequeue: {
    removed: V;
    finalData: readonly V[];
  };
  /**
   * One or more items removed due to dequeuing, clearing or removeWhere called
   */
  removed: {
    removed: readonly V[];
    finalData: readonly V[];
  };
};
/**
 * Queue (mutable). See also {@link IQueueImmutable} for the immutable version.
 *
 * Queues are useful if you want to treat 'older' or 'newer'
 * items differently. _Enqueing_ adds items at the back of the queue, while
 * _dequeing_ removes items from the front (ie. the oldest).
 *
 * ```js
 * const q = queue();       // Create
 * q.enqueue(`a`, `b`);     // Add two strings
 * const front = q.dequeue();  // `a` is at the front of queue (oldest)
 * ```
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = queue({capacity: 5, discardPolicy: `newer`});
 * ```
 *
 */
interface IQueueMutable<V> {
  /**
   * Dequeues (removes oldest item / item at front of queue)
   *
   * Use {@link peek} to look at the item at front of queue without removing it.
   * @returns Item, or undefined if queue is empty
   */
  readonly dequeue: () => V | undefined;
  /**
   * Enqueues (adds items to back of queue).
   * If a capacity is set, not all items might be added.
   * @returns How many items were added
   */
  readonly enqueue: (...toAdd: readonly V[]) => number;
  /**
  * Returns a copy of data in queue as an array
  */
  toArray(): readonly V[];
  /**
   * Returns front of queue (oldest item), or _undefined_ if queue is empty
   */
  get peek(): V | undefined;
  /**
   * Number of items in queue
   */
  get length(): number;
  /**
   * Is queue full? Returns _false_ if no capacity has been set
   */
  get isFull(): boolean;
  /**
  * Returns true if queue is empty
  */
  get isEmpty(): boolean;
  /**
   * Removes values that match `predicate`.
   *
   * ```js
   * // Eg queue of strings, compare by value
   * queue.removeWhere(v => v === `someValue`);
   *
   * // Eg queue of objects, compare by reference
   * queue.removeWhere(v => v === someTarget);
   *
   * // Eg use ixfx function to compare value of objects, regardless of key ordering
   * queue.removeWhere(v => isEqualValueIgnoreOrder(v, someTarget));
   * ```
   * @param predicate
   * @returns Returns number of items removed.
   */
  removeWhere(predicate: (item: V) => boolean): number;
  /**
   * Returns the item at given rank (0 being front of queue)
   * @param index
   */
  at(index: number): V;
  /**
   * Clears the queue
   */
  clear(): void;
} //#endregion
//#region ../packages/collections/src/queue/queue-types.d.ts

//# sourceMappingURL=iqueue-mutable.d.ts.map
type QueueDiscardPolicy = `older` | `newer` | `additions`;
/**
 * Queue options.
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = Queues.mutable({capacity: 5, discardPolicy: `newer`});
 * ```
 */
type QueueOpts<V> = {
  readonly eq?: IsEqual<V>;
  /**
   * @private
   */
  readonly debug?: boolean;
  /**
   * Capcity limit
   */
  readonly capacity?: number;
  /**
   * Default is `additions`, meaning new items are discarded.
   *
   * `older`: Removes items front of the queue (ie older items are discarded)
   *
   * `newer`: Remove from rear of queue to make space for new items (ie newer items are discarded)
   *
   * `additions`: Only adds new items that there are room for (ie. brand new items are discarded)
   *
   */
  readonly discardPolicy?: QueueDiscardPolicy;
};

//#endregion
//#region ../packages/collections/src/queue/queue-mutable.d.ts
//# sourceMappingURL=queue-types.d.ts.map

/**
 * Mutable queue that fires events when manipulated.
 *
 * Queues are useful if you want to treat 'older' or 'newer'
 * items differently. _Enqueing_ adds items at the back of the queue, while
 * _dequeing_ removes items from the front (ie. the oldest).
 *
 * ```js
 * const q = Queues.mutable();       // Create
 * q.enqueue(`a`, `b`);     // Add two strings
 * const front = q.dequeue();  // `a` is at the front of queue (oldest)
 * ```
 *
 * @example Cap size to 5 items, throwing away newest items already in queue.
 * ```js
 * const q = Queues.mutable({capacity: 5, discardPolicy: `newer`});
 * ```
 *
 * Events can be used to monitor data flows.
 * * 'enqueue': fires when item(s) are added
 * * 'dequeue': fires when an item is dequeued from front
 * * 'removed': fires when an item is dequeued, queue is cleared or .removeWhere is used to trim queue
 *
 * Each of the event handlers return the state of the queue as the 'finalData'
 * field.
 *
 * ```js
 * q.addEventListener(`enqueue`, e => {
 *  // e.added, e.finalData
 * });
 * q.addEventListener(`removed`, e => {
 *  // e.removed, e.finalData
 * });
 * q.addEventListener(`dequeue`, e=> {
 *  // e.removed, e.finalData
 * })
 * ```
 * @typeParam V - Data type of items
 */
declare class QueueMutable<V> extends SimpleEventEmitter<QueueMutableEvents<V>> implements IQueueMutable<V> {
  readonly options: QueueOpts<V>;
  data: readonly V[];
  eq: IsEqual<V>;
  constructor(opts?: QueueOpts<V>, data?: readonly V[]);
  clear(): void;
  /**
   * Called when all data is cleared
   */
  protected onClear(): void;
  at(index: number): V;
  enqueue(...toAdd: readonly V[]): number;
  protected onEnqueue(result: readonly V[], attemptedToAdd: readonly V[]): void;
  dequeue(): V | undefined;
  protected onRemoved(removed: readonly V[], finalData: readonly V[]): void;
  /**
   * Removes values that match `predicate`.
   * @param predicate
   * @returns Returns number of items removed.
   */
  removeWhere(predicate: (item: V) => boolean): number;
  /**
  * Return a copy of the array
  * @returns
  */
  toArray(): V[];
  get isEmpty(): boolean;
  get isFull(): boolean;
  get length(): number;
  get peek(): V | undefined;
}

//#endregion
//#region ../packages/flow/src/state-machine/types.d.ts
/**
 * Creates a new QueueMutable
 * @param options
 * @param startingItems
 * @returns
 */
type TransitionCondition<V extends Transitions> = {
  readonly hasPriorState: readonly StateNames<V>[];
  readonly isInState: StateNames<V>;
};
type StateTargetStrict<V extends Transitions> = {
  readonly state: StateNames<V> | null;
  readonly preconditions?: readonly TransitionCondition<V>[];
};
/**
 * Possible state transitions, or _null_ if final state.
 */
type StateTarget<V extends Transitions> = string | string[] | readonly string[] | null | StateTargetStrict<V>;
/**
 * Maps state to allowable next states
 */
type Transitions = {
  readonly [key: string]: StateTarget<Transitions>;
};
/**
 * List of possible states
 */
type StateNames<V extends Transitions> = keyof V & string;

//#endregion
//#region ../packages/flow/src/state-machine/with-events.d.ts
type StateChangeEvent<V extends Transitions> = {
  readonly newState: StateNames<V>;
  readonly priorState: StateNames<V>;
};
type StopEvent<V extends Transitions> = {
  readonly state: StateNames<V>;
};
type StateMachineEventMap<V extends Transitions> = {
  readonly change: StateChangeEvent<V>;
  readonly stop: StopEvent<V>;
};
type StateMachineWithEventsOptions<V extends Transitions> = {
  readonly debug?: boolean;
  readonly initial?: StateNames<V>;
};
/**
 * A state machine that fires events when state changes.
 *
 * ```js
 * const transitions = StateMachine.fromList(`a`, `b`, `c`);
 * const m = new StateMachineWithEvents(transitions);
 * m.addEventListener(`change`, event => {
 *  console.log(`${event.priorState} -> ${event.newState}`);
 * });
 * m.addEventListener(`stop`, event => {
 *  console.log(`State machine has reached final state`);
 * });
 * ```
 */
declare class StateMachineWithEvents<V extends Transitions> extends SimpleEventEmitter<StateMachineEventMap<V>> {
  #private;
  /**
   * Create a state machine with initial state, description and options
   * @param m Machine description
   * @param opts Options for machine (defaults to `{debug:false}`)
   */
  constructor(m: V, opts?: StateMachineWithEventsOptions<V>);
  /**
   * Return a list of possible states from current state.
   *
   * If list is empty, no states are possible. Otherwise lists
   * possible states, including 'null' for terminal
   */
  get statesPossible(): readonly (StateNames<V> | null)[];
  /**
   * Return a list of all defined states
   */
  get statesDefined(): readonly StateNames<V>[];
  /**
   * Moves to the next state if possible. If multiple states are possible, it will use the first.
   * If machine is finalised, no error is thrown and null is returned.
   *
   * @returns {(string|null)} Returns new state, or null if machine is finalised
   */
  next(): string | null;
  /**
   * Returns _true_ if state machine is in its final state
   *
   * @returns
   */
  get isDone(): boolean;
  /**
   * Resets machine to initial state
   */
  reset(): void;
  /**
   * Throws if it's not valid to transition to `newState`
   * @param newState
   * @returns
   */
  validateTransition(newState: StateNames<V>): void;
  /**
   * Returns _true_ if `newState` is valid transition from current state.
   * Use {@link validateTransition} if you want an explanation for the _false_ results.
   * @param newState
   * @returns
   */
  isValid(newState: StateNames<V>): boolean;
  /**
   * Gets or sets state. Throws an error if an invalid transition is attempted.
   * Use `isValid()` to check validity without changing.
   *
   * If `newState` is the same as current state, the request is ignored silently.
   */
  set state(newState: StateNames<V>);
  get state(): string;
  /**
   * Returns timestamp when state was last changed.
   * See also `elapsed`
   */
  get changedAt(): number;
  /**
   * Returns milliseconds elapsed since last state change.
   * See also `changedAt`
   */
  get elapsed(): number;
}

//#endregion
//#region ../packages/io/dist/src/codec.d.ts
//# sourceMappingURL=with-events.d.ts.map
/**
 * Handles utf-8 text encoding/decoding
 */
declare class Codec {
  enc: TextEncoder;
  dec: TextDecoder;
  /**
   * Convert string to Uint8Array buffer
   * @param text
   * @returns
   */
  toBuffer(text: string): Uint8Array<ArrayBufferLike>;
  /**
   * Returns a string from a provided buffer
   * @param buffer
   * @returns
   */
  fromBuffer(buffer: AllowSharedBufferSource): string;
}

//#endregion
//#region ../packages/io/dist/src/string-receive-buffer.d.ts
//# sourceMappingURL=codec.d.ts.map
/**
 * Receives text
 */
declare class StringReceiveBuffer {
  private onData;
  separator: string;
  buffer: string;
  stream: WritableStream<string> | undefined;
  constructor(onData: (data: string) => void, separator?: string);
  close(): Promise<void>;
  clear(): void;
  writable(): WritableStream<string>;
  private createWritable;
  addImpl(string_: string): string;
  add(string_: string): void;
}

//#endregion
//#region ../packages/io/dist/src/string-write-buffer.d.ts
//# sourceMappingURL=string-receive-buffer.d.ts.map
type Opts$2 = {
  readonly chunkSize?: number;
  readonly interval?: Interval;
};
/**
 * Buffers a queue of strings.
 *
 * When text is queued via {@link add}, it is chopped up
 * into chunks and sent in serial to the `dataHandler` function.
 * Data is processed at a set rate, by default 10ms.
 *
 * ```js
 * const dataHandler = (data:string) => {
 *  // Do something with queued data.
 *  // eg. send to serial port
 * }
 *
 * // Create a buffer with a chunk size of 100 characters
 * const b = new StringWriteBuffer(dataHandler, { chunkSize: 100 });
 * b.add('some text'); // Write to buffer
 * // dataHandler will be called until queued data is empty
 * ```
 *
 * It's also possible to get the buffer as a WritableStream<string>:
 * ```js
 * const dataHandler = (data:string) => { ... }
 * const b = new StringWriteBuffer(dataHandler, 100);
 * const s = b.writable();
 * ```
 *
 * Other functions:
 * ```js
 * b.close(); // Close buffer
 * b.clear(); // Clear queued data, but don't close anything
 * ```
 */
declare class StringWriteBuffer {
  private dataHandler;
  paused: boolean;
  queue: QueueMutable<string>;
  writer: Continuously;
  stream: WritableStream<string> | undefined;
  closed: boolean;
  chunkSize: number;
  /**
   * Constructor
   * @param dataHandler Calback to 'send' data onwards
   * @param opts Options
   */
  constructor(dataHandler: (data: string) => Promise<void>, opts?: Opts$2);
  /**
   * Close writer (async)
   */
  close(): Promise<void>;
  /**
   * Clear queued data.
   *
   * Throws an error if {@link close} has been called.
   */
  clear(): void;
  /**
   * Gets the buffer as a writable stream.
   *
   * Do not close stream directly, use .close on this class instead.
   *
   * Throws an error if .close() has been called.
   * @returns Underlying stream
   */
  writable(): WritableStream<string>;
  private createWritable;
  /**
   * Run in a `continunously` loop to process queued data
   * @returns _False_ if queue is empty and loop should stop. _True_ if it shoud continue.
   */
  onWrite(): Promise<boolean>;
  /**
   * Returns _true_ if {@link close} has been called.
   */
  get isClosed(): boolean;
  /**
   * Adds some queued data to send.
   * Longer strings are automatically chunked up according to the buffer's settings.
   *
   * Throws an error if {@link close} has been called.
   * @param stringToQueue
   */
  add(stringToQueue: string): void;
}

//#endregion
//#region ../packages/io/dist/src/generic-state-transitions.d.ts
//# sourceMappingURL=string-write-buffer.d.ts.map
declare const genericStateTransitionsInstance: Readonly<{
  ready: "connecting";
  connecting: string[];
  connected: string[];
  closed: "connecting";
}>;

//#endregion
//#region ../packages/io/dist/src/types.d.ts
//# sourceMappingURL=generic-state-transitions.d.ts.map
type IoDataEvent = {
  readonly data: string;
};
type IoEvents<StateMachineTransitions extends Transitions> = {
  readonly data: IoDataEvent;
  readonly change: StateChangeEvent<StateMachineTransitions>;
};
type GenericStateTransitions = Readonly<typeof genericStateTransitionsInstance>;
type BleDeviceOptions = {
  readonly service: string;
  readonly rxGattCharacteristic: string;
  readonly txGattCharacteristic: string;
  readonly chunkSize: number;
  readonly name: string;
  readonly connectAttempts: number;
  readonly debug: boolean;
};
type FrameProcessorSources = `` | `camera` | `video`;

//#endregion
//#region ../packages/io/dist/src/ble-device.d.ts
//# sourceMappingURL=types.d.ts.map
declare class BleDevice extends SimpleEventEmitter<IoEvents<GenericStateTransitions>> {
  private device;
  private config;
  states: StateMachineWithEvents<GenericStateTransitions>;
  codec: Codec;
  rx: BluetoothRemoteGATTCharacteristic | undefined;
  tx: BluetoothRemoteGATTCharacteristic | undefined;
  gatt: BluetoothRemoteGATTServer | undefined;
  verboseLogging: boolean;
  rxBuffer: StringReceiveBuffer;
  txBuffer: StringWriteBuffer;
  constructor(device: BluetoothDevice, config: BleDeviceOptions);
  get isConnected(): boolean;
  get isClosed(): boolean;
  write(txt: string): void;
  private writeInternal;
  disconnect(): void;
  connect(): Promise<void>;
  private onRx;
  protected verbose(m: string): void;
  protected log(m: string): void;
  protected warn(m: unknown): void;
}

//#endregion
//#region ../packages/io/dist/src/nordic-ble-device.d.ts
//# sourceMappingURL=ble-device.d.ts.map
declare namespace nordic_ble_device_d_exports {
  export { NordicBleDevice, Opts$1 as Opts, defaultOpts };
}
declare const defaultOpts: {
  chunkSize: number;
  service: string;
  txGattCharacteristic: string;
  rxGattCharacteristic: string;
  name: string;
  connectAttempts: number;
  debug: boolean;
};
type Opts$1 = {
  readonly chunkSize?: number;
  readonly name?: string;
  readonly connectAttempts?: number;
  readonly debug?: boolean;
};
declare class NordicBleDevice extends BleDevice {
  constructor(device: BluetoothDevice, opts?: Opts$1);
}

//#endregion
//#region ../packages/io/dist/src/audio/visualiser.d.ts
//# sourceMappingURL=nordic-ble-device.d.ts.map
declare class AudioVisualiser {
  freqMaxRange: number;
  audio: AudioAnalyser;
  parent: HTMLElement;
  lastPointer: Point;
  pointerDown: boolean;
  pointerClicking: boolean;
  pointerClickDelayMs: number;
  pointerDelaying: boolean;
  waveTracker: any;
  freqTracker: any;
  el: HTMLElement;
  constructor(parentElement: HTMLElement, audio: AudioAnalyser);
  renderFreq(freq: readonly number[]): void;
  isExpanded(): boolean;
  setExpanded(value: boolean): void;
  clear(): void;
  clearCanvas(canvas: HTMLCanvasElement | null): void;
  renderWave(wave: readonly number[], bipolar?: boolean): void;
  getPointerRelativeTo(elem: HTMLElement): {
    x: number;
    y: number;
  };
  onPointer(event: MouseEvent | PointerEvent): void;
}

//#endregion
//#region ../packages/io/dist/src/audio/analyser.d.ts
//# sourceMappingURL=visualiser.d.ts.map
/**
 * Options for audio processing
 *
 * fftSize: Must be a power of 2, from 32 - 32768. Higher number means
 * more precision and higher CPU overhead
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
 *
 * smoothingTimeConstant: Range from 0-1, default is 0.8.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
 *
 * debug: If true, additonal console logging will happen
 */
type Opts = {
  readonly showVis?: boolean;
  /**
   * FFT size. Must be a power of 2, from 32 - 32768. Higher number means
   * more precision and higher CPU overhead
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
   */
  readonly fftSize?: number;
  /**
   * Range from 0-1, default is 0.8
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
   */
  readonly smoothingTimeConstant?: number;
  readonly debug?: boolean;
};
type DataAnalyser = (node: AnalyserNode, analyser: AudioAnalyser) => void;
/**
 * Basic audio analyser. Returns back waveform and FFT analysis. Use {@link analyserPeakLevel} if you want sound level, or {@link analyserFrequency} if you just want FFT results.
 *
 * ```js
 * const onData = (freq, wave, analyser) => {
 *  // Demo: Get FFT results just for 100Hz-1KHz.
 *  const freqSlice = analyser.sliceByFrequency(100,1000,freq);
 *
 *  // Demo: Get FFT value for a particular frequency (1KHz)
 *  const amt = freq[analyser.getIndexForFrequency(1000)];
 * }
 * analyserBasic(onData, {fftSize: 512});
 * ```
 *
 * An `Analyser` instance is returned and can be controlled:
 * ```js
 * const analyser = analyserBasic(onData);
 * analyser.paused = true;
 * ```
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 *
* @param onData Handler for data
 * @param opts Options
 * @returns Analyser instance
 */
declare const analyserBasic: (onData: (freq: Float32Array, wave: Float32Array, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
/**
 * Basic audio analyser. Returns FFT analysis. Use {@link analyserPeakLevel} if you want the sound level, or {@link analyserBasic} if you also want the waveform.
 *
 * ```js
 * const onData = (freq, analyser) => {
 *  // Demo: Print out each sound frequency (Hz) and amount of energy in that band
 *  for (let i=0;i<freq.length;i++) {
 *    const f = analyser.getFrequencyAtIndex(0);
 *    console.log(`${i}. frequency: ${f} amount: ${freq[i]}`);
 *  }
 * }
 * analyserFrequency(onData, {fftSize:512});
 * ```
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 *
 * @param onData
 * @param opts
 * @returns
 */
declare const analyserFrequency: (onData: (freq: Float32Array, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
/**
 * Basic audio analyser which reports the peak sound level.
 *
 * ```js
 * analyserPeakLevel(level => {
 *  console.log(level);
 * });
 * ```
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 * @param onData
 * @param opts
 * @returns
 */
declare const analyserPeakLevel: (onData: (level: number, analyser: AudioAnalyser) => void, opts?: Opts) => AudioAnalyser;
/**
 * Helper for doing audio analysis. It takes case of connecting the audio stream, running in a loop and pause capability.
 *
 * Provide a function which works with an [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode), and does something with the result.
 * ```js
 * const myAnalysis = (node, analyser) => {
 *  const freq = new Float32Array(node.frequencyBinCount);
 *  node.getFloatFrequencyData(freq);
 *  // Do something with frequency data...
 * }
 * const a = new Analyser(myAnalysis);
 * ```
 *
 * Helper functions provide ready-to-use Analysers:
 * * {@link analyserPeakLevel} peak decibel reading
 * * {@link analyserFrequency} FFT results
 * * {@link analyserBasic} FFT results and waveform
 *
 * Note: Browers won't allow microphone access unless the call has come from a user-interaction, eg pointerup event handler.
 *
 */
declare class AudioAnalyser {
  #private;
  showVis: boolean;
  fftSize: number;
  smoothingTimeConstant: number;
  debug: boolean;
  visualiser: AudioVisualiser | undefined;
  audioCtx: AudioContext | undefined;
  analyserNode: AnalyserNode | undefined;
  analyse: DataAnalyser;
  constructor(analyse: DataAnalyser, opts?: Opts);
  init(): void;
  get paused(): boolean;
  set paused(v: boolean);
  private setup;
  private onMicSuccess;
  private analyseLoop;
  /**
   * Returns the maximum FFT value within the given frequency range
   */
  getFrequencyRangeMax(lowFreq: number, highFreq: number, freqData: readonly number[]): number;
  /**
   * Returns a sub-sampling of frequency analysis data that falls between
   * `lowFreq` and `highFreq`.
   * @param lowFreq Low frequency
   * @param highFreq High frequency
   * @param freqData Full-spectrum frequency data
   * @returns Sub-sampling of analysis
   */
  sliceByFrequency(lowFreq: number, highFreq: number, freqData: readonly number[]): number[];
  /**
   * Returns the starting frequency for a given binned frequency index.
   * @param index Array index
   * @returns Sound frequency
   */
  getFrequencyAtIndex(index: number): number;
  /**
   * Returns a binned array index for a given frequency
   * @param freq Sound frequency
   * @returns Array index into frequency bins
   */
  getIndexForFrequency(freq: number): number;
}

//#endregion
//#region ../packages/io/dist/src/audio/types.d.ts
//# sourceMappingURL=analyser.d.ts.map
type AudioOscillatorOptions = {
  type: OscillatorType;
  frequency: number;
  id: string;
};
type BasicAudio = {
  ctx: AudioContext;
  pan: StereoPannerNode;
  gain: GainNode;
  filter: BiquadFilterNode;
  id: string;
};
type BasicAudioElement = BasicAudio & {
  el: HTMLMediaElement;
};
type BasicAudioOscillator = BasicAudio & {
  osc: OscillatorNode;
};

//#endregion
//#region ../packages/io/dist/src/audio/from-audio-element.d.ts
//# sourceMappingURL=types.d.ts.map
/**
 * Scans page for <AUDIO> elements and creates playable controllers for them.
 * It uses the element's 'id' attribute as a way of fetching one later.
 *
 * ```js
 * const ae = new AudioElements();
 * ae.init(); // Initialise
 *
 * const a = ae.get('kick'); // Get the source that had id 'kick'
 * ```
 */
declare class AudioElements {
  #private;
  filterType: BiquadFilterType;
  constructor();
  init(): void;
  /**
   * Gets a BasicAudio instance by key
   * @param key
   * @returns BasicAudio instance, or undefined
   */
  get(key: string): BasicAudioElement | undefined;
}
/**
 * Create a BasicAudioElement instance from an <AUDIO> tag in the HTML document.
 *
 * See {@link AudioElements} to automatically create sources from all <AUDIO> elements.
 * @param audioElementOrQuery Element or query (eg '#some-id')
 * @param filterType Filter type. Defaults to 'lowpass'
 * @returns
 */
declare function createFromAudioElement(audioElementOrQuery: HTMLMediaElement | string, filterType?: BiquadFilterType): BasicAudioElement;

//#endregion
//#region ../packages/io/dist/src/audio/from-oscillator.d.ts
//# sourceMappingURL=from-audio-element.d.ts.map
/**
 * Initialise audio with an oscillator source
 * @param oscillatorOptions
 * @returns BasicAudio instance
 */
declare function createOscillator(oscillatorOptions?: Partial<AudioOscillatorOptions>): BasicAudioOscillator;

//#endregion
//#region ../packages/io/dist/src/audio/index.d.ts
//# sourceMappingURL=from-oscillator.d.ts.map
declare namespace index_d_exports {
  export { AudioAnalyser, AudioElements, AudioOscillatorOptions, AudioVisualiser, BasicAudio, BasicAudioElement, BasicAudioOscillator, DataAnalyser, Opts, analyserBasic, analyserFrequency, analyserPeakLevel, createFromAudioElement, createOscillator };
}
//#endregion
//#region ../packages/io/dist/src/espruino-ble-device.d.ts
/**
 * An Espruino BLE-connection
 *
 * See [online demos](https://demos.ixfx.fun/io/)
 *
 * Use the `puck` function to initialise and connect to a Puck.js.
 * It must be called in a UI event handler for browser security reasons.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.puck();
 * ```
 *
 * To connect to a particular device:
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.puck({name:`Puck.js a123`});
 * ```
 *
 * Listen for events:
 * ```js
 * // Received something
 * e.addEventListener(`data`, d => console.log(d.data));
 * // Monitor connection state
 * e.addEventListener(`change`, c => console.log(`${d.priorState} -> ${d.newState}`));
 * ```
 *
 * Write to the device (note the \n for a new line at the end of the string). This will
 * execute the code on the Espruino.
 *
 * ```js
 * e.write(`digitalPulse(LED1,1,[10,500,10,500,10]);\n`);
 * ```
 *
 * Run some code and return result:
 * ```js
 * const result = await e.eval(`2+2\n`);
 * ```
 */
declare class EspruinoBleDevice extends NordicBleDevice {
  evalTimeoutMs: number;
  evalReplyBluetooth: boolean;
  /**
   * Creates instance. You probably would rather use {@link puck} to create.
   * @param device
   * @param opts
   */
  constructor(device: BluetoothDevice, opts?: Options);
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  writeScript(code: string): Promise<void>;
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  eval(code: string, opts?: EvalOpts, warn?: (message: string) => void): Promise<string>;
}

//#endregion
//#region ../packages/io/dist/src/json-device.d.ts
//# sourceMappingURL=espruino-ble-device.d.ts.map
/**
 * Options for JsonDevice
 */
type JsonDeviceOpts = {
  /**
   * How much data to transfer at a time
   */
  readonly chunkSize?: number;
  /**
   * Name of device. This is only used for assisting the console.log output
   */
  readonly name?: string;
  /**
   * Number of times to automatically try to reconnect
   */
  readonly connectAttempts?: number;
  /**
   * If true, additional logging will be done
   */
  readonly debug?: boolean;
};
/**
 * Data received event
 */
type JsonDataEvent = {
  /**
   * Data received
   */
  readonly data: string;
};
/**
 * Events emitted by JsonDevice
 */
type JsonDeviceEvents = {
  /**
   * Data received
   */
  readonly data: JsonDataEvent;
  /**
   * State changed
   */
  readonly change: StateChangeEvent<GenericStateTransitions>;
};
declare abstract class JsonDevice extends SimpleEventEmitter<JsonDeviceEvents> {
  states: StateMachineWithEvents<GenericStateTransitions>;
  codec: Codec;
  verboseLogging: boolean;
  name: string;
  connectAttempts: number;
  chunkSize: number;
  rxBuffer: StringReceiveBuffer;
  txBuffer: StringWriteBuffer;
  constructor(config?: JsonDeviceOpts);
  get isConnected(): boolean;
  get isClosed(): boolean;
  write(txt: string): void;
  /**
   * Writes text to output device
   * @param txt
   */
  protected abstract writeInternal(txt: string): void;
  close(): Promise<void>;
  /**
   * Must change state
   */
  abstract onClosed(): void;
  abstract onPreConnect(): Promise<void>;
  connect(): Promise<void>;
  /**
   * Should throw if did not succeed.
   */
  protected abstract onConnectAttempt(): Promise<void>;
  private onRx;
  protected verbose(m: string): void;
  protected log(m: string): void;
  protected warn(m: unknown): void;
}

//#endregion
//#region ../packages/io/dist/src/serial.d.ts
//# sourceMappingURL=json-device.d.ts.map
declare namespace serial_d_exports {
  export { Device, JsonDataEvent, JsonDeviceEvents, JsonDeviceOpts, SerialOpts };
}
type SerialOpts = JsonDeviceOpts & {
  readonly filters?: readonly SerialPortFilter[];
  readonly baudRate?: number;
  /**
   * End-of-line string sequence. \r\n by default.
   */
  readonly eol?: string;
};
/**
 * Serial device. Assumes data is sent with new line characters (\r\n) between messages.
 *
 * ```
 * import { Serial } from 'https://unpkg.com/ixfx/dist/io.js'
 * const s = new Serial.Device();
 * s.addEventListener(`change`, evt => {
 *  console.log(`State change ${evt.priorState} -> ${evt.newState}`);
 *  if (evt.newState === `connected`) {
 *    // Do something when connected...
 *  }
 * });
 *
 * // In a UI event handler...
 * s.connect();
 * ```
 *
 * Reading incoming data:
 * ```
 * // Parse incoming data as JSON
 * s.addEventListener(`data`, evt => {
 *  try {
 *    const o = JSON.parse(evt.data);
 *    // If we get this far, JSON is legit
 *  } catch (ex) {
 *  }
 * });
 * ```
 *
 * Writing to the microcontroller
 * ```
 * s.write(JSON.stringify({msg:"hello"}));
 * ```
 */
declare class Device extends JsonDevice {
  private config;
  port: SerialPort | undefined;
  tx: WritableStreamDefaultWriter<string> | undefined;
  abort: AbortController;
  baudRate: number;
  constructor(config?: SerialOpts);
  /**
   * Writes text collected in buffer
   * @param txt
   */
  protected writeInternal(txt: string): Promise<void>;
  onClosed(): void;
  onPreConnect(): Promise<void>;
  onConnectAttempt(): Promise<void>;
}

//#endregion
//#region ../packages/io/dist/src/espruino-serial-device.d.ts
type EspruinoSerialDeviceOpts = SerialOpts & {
  readonly evalTimeoutMs?: number;
};
declare class EspruinoSerialDevice extends Device {
  evalTimeoutMs: number;
  evalReplyBluetooth: boolean;
  constructor(opts?: EspruinoSerialDeviceOpts);
  disconnect(): Promise<void>;
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  writeScript(code: string): void;
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive: If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  eval(code: string, opts?: EvalOpts, warn?: (message: string) => void): Promise<string>;
}

//#endregion
//#region ../packages/io/dist/src/espruino.d.ts
//# sourceMappingURL=espruino-serial-device.d.ts.map
declare namespace espruino_d_exports {
  export { EspruinoBleDevice, EspruinoBleOpts, EspruinoDevice, EspruinoSerialDevice, EspruinoSerialDeviceOpts, EspruinoStates, EvalOpts, Events, Options, bangle, connectBle, deviceEval, puck, serial };
}
type EspruinoStates = `ready` | `connecting` | `connected` | `closed` | `closing`;
/**
 * Options for device
 */
type Options = {
  /**
   * Default milliseconds to wait before giving up on a well-formed reply. 5 seconds is the default.
   */
  readonly evalTimeoutMs?: number;
  /**
   * Name of device. Only used for printing log mesages to the console
   */
  readonly name?: string;
  /**
   * If true, additional logging information is printed
   */
  readonly debug?: boolean;
};
/**
 * Options for code evaluation
 */
type EvalOpts = {
  /**
   * Milliseconds to wait before giving up on well-formed reply. 5 seconds is the default.
   */
  readonly timeoutMs?: number;
  /**
   * If true (default), it assumes that anything received from the board
   * is a response to the eval
   */
  readonly assumeExclusive?: boolean;
  /**
   * If true, executed code is traced
   */
  readonly debug?: boolean;
};
type EspruinoBleOpts = {
  /**
   * If the name is specified, this value is used
   * for filtering Bluetooth devices
   */
  readonly name?: string;
  /**
   * If true, additional logging messages are
   * displayed on the console
   */
  readonly debug?: boolean;
  /**
   * If specified, these filtering options are used instead
   */
  readonly filters?: readonly BluetoothLEScanFilter[];
};
/**
 * Instantiates a Puck.js. See {@link EspruinoBleDevice} for more info.
 * [Online demos](https://demos.ixfx.fun/io/)
 *
 * If `opts.name` is specified, this will the the Bluetooth device sought.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.puck({ name:`Puck.js a123` });
 * ```
 *
 * If no name is specified, a list of all devices starting with `Puck.js` are shown.
 *
 * To get more control over filtering, pass in `opts.filter`. `opts.name` is not used as a filter in this scenario.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const filters = [
 *  { namePrefix: `Puck.js` },
 *  { namePrefix: `Pixl.js` },
 *  {services: [NordicDefaults.service] }
 * ]
 * const e = await Espruino.puck({ filters });
 * ```
 *
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const puck: (opts?: EspruinoBleOpts) => Promise<EspruinoBleDevice>;
declare const bangle: (opts?: EspruinoBleOpts) => Promise<EspruinoBleDevice>;
/**
 * Create a serial-connected Espruino device.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruio.serial();
 * e.connect();
 * ```
 *
 * Options:
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const e = await Espruino.serial({ debug: true, evalTimeoutMs: 1000, name: `My Pico` });
 * e.connect();
 * ```
 *
 * Listen for events:
 * ```js
 * e.addEventListener(`change`, evt => {
 *  console.log(`State change ${evt.priorState} -> ${evt.newState}`);
 *  if (evt.newState === `connected`) {
 *    // Do something when connected...
 *  }
 * });
 * ```
 *
 * Reading incoming data:
 * ```
 * // Parse incoming data as JSON
 * s.addEventListener(`data`, evt => {
 *  try {
 *    const o = JSON.parse(evt.data);
 *    // If we get this far, JSON is legit
 *  } catch (ex) {
 *  }
 * });
 * ```
 *
 * Writing to the microcontroller
 * ```
 * s.write(JSON.stringify({msg:"hello"}));
 * ```
 * @param opts
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const serial: (opts?: {
  readonly name?: string;
  readonly debug?: boolean;
  readonly evalTimeoutMs?: number;
}) => Promise<EspruinoSerialDevice>;
/**
 * Connects to a generic Espruino BLE device. See  {@link EspruinoBleDevice} for more info.
 * Use {@link puck} if you're connecting to a Puck.js
 *
 * If `opts.name` is specified, only this BLE device will be shown.
 * ```js
 * const e = await connectBle({ name: `Puck.js a123` });
 * ```
 *
 * `opts.filters` overrides and sets arbitary filters.
 *
 * ```js
 * import { Espruino } from 'https://unpkg.com/ixfx/dist/io.js'
 * const filters = [
 *  { namePrefix: `Puck.js` },
 *  { namePrefix: `Pixl.js` },
 *  {services: [NordicDefaults.service] }
 * ]
 * const e = await Espruino.connectBle({ filters });
 * ```
 *
 * @returns Returns a connected instance, or throws exception if user cancelled or could not connect.
 */
declare const connectBle: (opts?: EspruinoBleOpts) => Promise<EspruinoBleDevice>;
type Events = IoEvents<GenericStateTransitions>;
/**
 * EspruinoDevice
 *
 * This base interface is implemented by {@link EspruinoBleDevice} and {@link EspruinoSerialDevice}.
 */
type EspruinoDevice = {
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  eval(code: string, opts?: EvalOpts, warn?: (message: string) => void): Promise<string>;
  /**
   * Write some code for immediate execution. This is a lower-level
   * alternative to {@link writeScript}. Be sure to include a new line character '\n' at the end.
   * @param m Code
   */
  write(m: string): void;
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * espruino.writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  writeScript(code: string): void;
  /**
   * Disconnect
   */
  disconnect(): void;
  /**
   * Gets the current evaluation (millis)
   */
  get evalTimeoutMs(): number;
  get isConnected(): boolean;
} & ISimpleEventEmitter<Events>;
/**
 * Evaluates some code on an Espruino device.
 *
 * Options:
 * * timeoutMs: how many millis to wait before assuming code failed. If not specified, `device.evalTimeoutMs` is used as a default.
 * * assumeExlusive: assume device is not producing any other output than for our evaluation
 *
 * A random string is created to pair eval requests and responses. `code` will be run on the device, with the result
 * wrapped in JSON, and in turn wrapped in a object that is sent back.
 *
 * The actual code that gets sent to the device is then:
 * `\x10${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))\n`
 *
 * For example, it might end up being:
 * `\x10Bluetooth.println(JSON.stringify({reply: "a35gP", result: "{ 'x': '10' }" }))\n`
 *
 * @param code Code to evaluation
 * @param opts Options for evaluation
 * @param device Device to execute on
 * @param evalReplyPrefix How to send code back (eg `Bluetooth.println`, `console.log`)
 * @param debug If true, the full evaled code is printed locally to the console
 * @param warn Callback to display warnings
 * @returns
 */
declare const deviceEval: (code: string, opts: EvalOpts | undefined, device: EspruinoDevice, evalReplyPrefix: string, debug: boolean, warn: (m: string) => void) => Promise<string>;

//#endregion
//#region ../packages/io/dist/src/camera.d.ts
//# sourceMappingURL=espruino.d.ts.map
declare namespace camera_d_exports {
  export { Constraints, StartResult$1 as StartResult, dumpDevices, start$1 as start };
}
/**
 * Print available media devices to console
 *
 * ```js
 * import { Camera } from 'https://unpkg.com/ixfx/dist/io.js'
 * camera.dumpDevices(); // Will print results to console
 * ```
 * @param filterKind Defaults `videoinput`
 */
declare const dumpDevices: (filterKind?: string) => Promise<void>;
/**
 * Constraints when requesting a camera source
 */
type Constraints = {
  /**
   * Camera facing: user is front-facing, environment is a rear camera
   */
  readonly facingMode?: `user` | `environment`;
  /**
   * Maximum resolution
   */
  readonly max?: Rect;
  /**
   * Minimum resolution
   */
  readonly min?: Rect;
  /**
   * Ideal resolution
   */
  readonly ideal?: Rect;
  /**
   * If specified, will try to use this media device id
   */
  readonly deviceId?: string;
  /**
   * Number of milliseconds to wait on `getUserMedia` before giving up.
   * Defaults to 30seconds
   */
  readonly startTimeoutMs?: number;
};
/**
 * Result from starting a camera
 */
type StartResult$1 = {
  /**
   * Call dispose to stop the camera feed and remove any created resources,
   * such as a VIDEO element
   */
  readonly dispose: () => void;
  /**
   * Video element camera is connected to
   */
  readonly videoEl: HTMLVideoElement;
};
/**
 * Attempts to start a video-only stream from a camera into a hidden
 * VIDEO element for frame capture. The VIDEO element is created automatically.
 *
 *
 * ```js
 * import { Camera } from 'https://unpkg.com/ixfx/dist/io.js'
 * import { Video } from 'https://unpkg.com/ixfx/dist/visual.js'
 *
 * try {
 *  const { videoEl, dispose } = await Camera.start();
 *  for await (const frame of Video.frames(videoEl)) {
 *    // Do something with pixels...
 *  }
 * } catch (ex) {
 *  console.error(`Video could not be started`);
 * }
 * ```
 *
 * Be sure to call the dispose() function to stop the video stream and remov
 * the created VIDEO element.
 *
 * _Constraints_ can be specified to select a camera and resolution:
 * ```js
 * import { Camera } from 'https://unpkg.com/ixfx/dist/io.js'
 * import { Video } from 'https://unpkg.com/ixfx/dist/visual.js'
 *
 * try {
 *  const { videoEl, dispose } = await Camera.start({
 *    facingMode: `environment`,
 *    max: { width: 640, height: 480 }
 *  });
 *
 *  for await (const frame of Video.frames(videoEl)) {
 *    // Do something with pixels...
 *  }
 * } catch (ex) {
 *  // Can happen if user cancels camera request, for example.
 *  console.error(`Video could not be started`, ex);
 * }
 * ```
 *
 * An alternative to Video.frames is Video.capture.
 * @param constraints
 * @returns Returns `{ videoEl, dispose }`, where `videoEl` is the created VIDEO element, and `dispose` is a function for removing the element and stopping the video.
 */
declare const start$1: (constraints?: Constraints) => Promise<StartResult$1>;

//#endregion
//#region ../packages/io/dist/src/video-file.d.ts
//# sourceMappingURL=camera.d.ts.map
declare namespace video_file_d_exports {
  export { StartResult, start };
}
/**
 * Result from starting a camera
 */
type StartResult = {
  /**
   * Call dispose to stop the camera feed and remove any created resources,
   * such as a VIDEO element
   */
  readonly dispose: () => void;
  /**
   * Video element camera is connected to
   */
  readonly videoEl: HTMLVideoElement;
};
/**
 * Starts video file playback, creating a VIDEO element automatically.
 * @param file File
 * @returns StartResult
 */
declare const start: (file: File) => Promise<StartResult>;

//#endregion
//#region ../packages/visual/src/video.d.ts
//# sourceMappingURL=video-file.d.ts.map
type ManualCapturer = {
  capture(): ImageData;
  readonly canvasEl: HTMLCanvasElement;
  dispose(): void;
};

//#endregion
//#region ../packages/io/dist/src/frame-processor.d.ts
/**
 * Frame procesor options
 */
type FrameProcessorOpts = {
  /**
   * If true, capture canvas will be shown. Default: false
   */
  readonly showCanvas?: boolean;
  /**
   * If true, raw source will be shown. Default: false.
   */
  readonly showPreview?: boolean;
  /**
   * If specified, this function will be called after ImageData is captured
   * from the intermediate canvs. This allows for drawing on top of the
   * captured image.
   */
  readonly postCaptureDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
  /**
   * Default constraints to use for the camera source
   */
  readonly cameraConstraints?: Constraints;
  /**
   * If specified, this canvas will be used for capturing frames to
   */
  readonly captureCanvasEl?: HTMLCanvasElement;
};
/**
 * Frame Processor
 * Simplifies grabbing frames from a camera or video file.
 *
 * First, create:
 * ```js
 * import { FrameProcessor } from 'https://unpkg.com/ixfx/dist/io.js'
 * const fp = new FrameProcessor();
 * ```
 *
 * Then either use the camera or a video file:
 * ```js
 * fp.useCamera(constraints);
 * // or:
 * gp.useVideo(file);
 * ```
 *
 * With `useCamera`, optionally specify {@link Io.Camera.Constraints} to pick which camera and resolution.
 *
 * ```js
 * fp.getFrame(); // Gets the last frame
 * fp.dispose(); // Close down camera/file
 * ```
 *
 * See {@link FrameProcessorOpts} for details on available options.
 */
declare class FrameProcessor {
  private _source;
  private _state;
  private _teardownNeeded;
  private _cameraConstraints;
  private _cameraStartResult;
  private _videoSourceCapture;
  private _videoFile;
  private _videoStartResult;
  private _showCanvas;
  private _showPreview;
  private _postCaptureDraw;
  private _timer;
  private _captureCanvasEl?;
  /**
   * Create a new frame processor
   * @param opts
   */
  constructor(opts?: FrameProcessorOpts);
  /**
   * Hides or shows the raw source in the DOM
   * @param enabled Preview enabled
   */
  showPreview(enabled: boolean): void;
  /**
   * Shows or hides the Canvas we're capturing to
   * @param enabled
   */
  showCanvas(enabled: boolean): void;
  /**
   * Returns the current capturer instance
   * @returns
   */
  getCapturer(): ManualCapturer | undefined;
  /**
   * Grab frames from a video camera source and initialises
   * frame processor.
   *
   * If `constraints` are not specified, it will use the ones
   * provided when creating the class, or defaults.
   *
   * @param constraints Override of constraints when requesting camera access
   */
  useCamera(constraints?: Constraints): Promise<void>;
  useVideo(file: File): Promise<void>;
  /**
   * Initialises camera
   */
  private initCamera;
  private initVideo;
  private postInit;
  /**
   * Closes down connections and removes created elements.
   * Once disposed, the frame processor cannot be used
   * @returns
   */
  dispose(): void;
  private init;
  private teardown;
  /**
   * Get the last frame
   * @returns
   */
  getFrame(): ImageData | undefined;
  /**
   * Get the timestamp of the processor (elapsed time since starting)
   * @returns
   */
  getTimestamp(): number;
  private getFrameCamera;
}

//#endregion
//#region ../packages/io/dist/src/reconnecting-web-socket.d.ts
//# sourceMappingURL=frame-processor.d.ts.map
type ReconnectingWebsocket = {
  /**
   * Sends data
   * @param data
   * @returns
   */
  send: (data: string | ArrayBufferLike | ArrayBufferView | Blob) => void;
  /**
   * Closes websocket, disabling reconnection
   * @returns
   */
  close: () => void;
  /**
   * Opens websocket if it's not already connected or connecting
   * @returns
   */
  open: () => Promise<boolean>;
  /**
   * Returns _true_ if it seems the websocket is connected
   * @returns
   */
  isConnected: () => boolean;
};
type ReconnectingWebsocketStates = `connecting` | `open` | `closed`;
type ReconnectingOptions = {
  startDelay: Interval;
  maxDelay: Interval;
  limitAttempts: number;
  /**
   * How often to check the state of the
   * underlying websocket.
   *
   * Default: 5s
   */
  checkStateMs: Interval;
  /**
   * Callback when message is received
   * @param message
   * @returns
   */
  onMessage: (message: any) => void;
  onConnected: () => void;
  onDisconnected: () => void;
  onError: (error: any) => void;
};
/**
 * Maintains a web socket connection. Connects automatically.
 *
 * The essential usage is:
 * ```js
 * import { reconnectingWebsocket } from 'https://unpkg.com/ixfx/dist/io.js'
 * const ws = reconnectingWebsocket(`wss://somehost.com/ws`, {
 *  onMessage: (msg) => {
 *    // Do something with received message...
 *  }
 * }
 *
 * // Send some data
 * ws.send(JSON.stringify(someData));
 *
 * // Check state of connection
 * ws.isConnected();
 * ```
 *
 * More options can be provided to monitor state
 * ```js
 * import { reconnectingWebsocket } from 'https://unpkg.com/ixfx/dist/io.js'
 * const ws = reconnectingWebsocket(`wss://somehost.com/ws`, {
 *  onError: (err) => {
 *    console.error(err)
 *  },
 *  onMessage: (msg) => {
 *    // Received data
 *    console.log(msg);
 *  },
 *  onConnected: () => {
 *    // Connected!
 *  },
 *  onDisconnected: () => {
 *    // Disconnected :(
 *  }
 * });
 * ```
 * @param url
 * @param opts
 * @returns
 */
declare const reconnectingWebsocket: (url: string | URL, opts?: Partial<ReconnectingOptions>) => ReconnectingWebsocket;

//#endregion
//#region src/io.d.ts
//# sourceMappingURL=reconnecting-web-socket.d.ts.map
declare namespace io_d_exports {
  export { index_d_exports as Audio, BleDeviceOptions, nordic_ble_device_d_exports as Bluetooth, camera_d_exports as Camera, Codec, espruino_d_exports as Espruino, FrameProcessor, FrameProcessorOpts, FrameProcessorSources, GenericStateTransitions, IoDataEvent, IoEvents, ReconnectingOptions, ReconnectingWebsocket, ReconnectingWebsocketStates, serial_d_exports as Serial, StateChangeEvent, StringReceiveBuffer, StringWriteBuffer, Opts$2 as StringWriteBufferOpts, video_file_d_exports as VideoFile, genericStateTransitionsInstance, reconnectingWebsocket };
}
//#endregion
export { BleDeviceOptions, Codec as Codec$1, FrameProcessor as FrameProcessor$1, FrameProcessorOpts, FrameProcessorSources, GenericStateTransitions, IoDataEvent, IoEvents, Opts$2 as Opts$1, ReconnectingOptions, ReconnectingWebsocket, ReconnectingWebsocketStates, StateChangeEvent, StringReceiveBuffer as StringReceiveBuffer$1, StringWriteBuffer as StringWriteBuffer$1, camera_d_exports, espruino_d_exports, genericStateTransitionsInstance as genericStateTransitionsInstance$1, index_d_exports as index_d_exports$20, io_d_exports, nordic_ble_device_d_exports, reconnectingWebsocket as reconnectingWebsocket$1, serial_d_exports, video_file_d_exports };
//# sourceMappingURL=io-BBKQ4QNw.d.ts.map