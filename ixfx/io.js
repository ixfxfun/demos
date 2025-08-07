import { __export } from "./chunk-51aI8Tpl.js";
import { integerTest, isPowerOfTwo, numberTest, resultThrow } from "./src-CadJtgeN.js";
import "./records-Cn6hYPY7.js";
import "./is-primitive-eBwrK4Yg.js";
import { intervalToMs } from "./interval-type-CYct6719.js";
import { continuously } from "./basic-TkGxs8ni.js";
import { SimpleEventEmitter, indexOfCharCode, omitChars, splitByLength } from "./src-CHxoOwyb.js";
import "./key-value-xMXxsVY5.js";
import "./dist-Xk39SmDr.js";
import { getErrorMessage } from "./resolve-core-BwRmfzav.js";
import { max, maxFast, numberArrayCompute } from "./src-8IiDfq42.js";
import { QueueMutable, StateMachineWithEvents, eventRace, init, retryFunction, retryTask, to, waitFor } from "./src-DyRMnxm7.js";
import { resolveEl } from "./src-Ccqm6HvP.js";
import "./src-DlaqNVaT.js";
import { number, shortGuid, string } from "./bezier-CZvpytLt.js";
import { manualCapture } from "./src-rxiODRnd.js";

//#region ../io/src/codec.ts
/**
* Handles utf-8 text encoding/decoding
*/
var Codec = class {
	enc = new TextEncoder();
	dec = new TextDecoder(`utf-8`);
	/**
	* Convert string to Uint8Array buffer
	* @param text
	* @returns
	*/
	toBuffer(text) {
		return this.enc.encode(text);
	}
	/**
	* Returns a string from a provided buffer
	* @param buffer
	* @returns
	*/
	fromBuffer(buffer) {
		return this.dec.decode(buffer);
	}
};

//#endregion
//#region ../io/src/string-receive-buffer.ts
/**
* Receives text
*/
var StringReceiveBuffer = class {
	buffer = ``;
	stream;
	constructor(onData, separator = `\n`) {
		this.onData = onData;
		this.separator = separator;
	}
	async close() {
		const s = this.stream;
		if (!s) return;
		await s.abort();
		await s.close();
	}
	clear() {
		this.buffer = ``;
	}
	writable() {
		if (this.stream === void 0) this.stream = this.createWritable();
		return this.stream;
	}
	createWritable() {
		const b = this;
		return new WritableStream({
			write(chunk) {
				b.add(chunk);
			},
			close() {
				b.clear();
			}
		});
	}
	addImpl(string_) {
		const pos = string_.indexOf(this.separator);
		if (pos < 0) {
			this.buffer += string_;
			return ``;
		}
		const part = string_.substring(0, pos);
		try {
			this.onData(this.buffer + part);
			string_ = string_.substring(part.length + this.separator.length);
		} catch (ex) {
			console.warn(ex);
		}
		this.buffer = ``;
		return string_;
	}
	add(string_) {
		while (string_.length > 0) string_ = this.addImpl(string_);
	}
};

//#endregion
//#region ../io/src/string-write-buffer.ts
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
var StringWriteBuffer = class {
	paused = false;
	queue = new QueueMutable();
	writer;
	stream;
	closed = false;
	chunkSize;
	/**
	* Constructor
	* @param dataHandler Calback to 'send' data onwards
	* @param opts Options
	*/
	constructor(dataHandler, opts = {}) {
		this.dataHandler = dataHandler;
		this.chunkSize = opts.chunkSize ?? -1;
		this.writer = continuously(async () => {
			await this.onWrite();
		}, opts.interval ?? 10);
	}
	/**
	* Close writer (async)
	*/
	async close() {
		if (this.closed) return;
		const w = this.stream?.getWriter();
		w?.releaseLock();
		await w?.close();
		this.closed = true;
	}
	/**
	* Clear queued data.
	*
	* Throws an error if {@link close} has been called.
	*/
	clear() {
		if (this.closed) throw new Error(`Buffer closed`);
		this.queue = new QueueMutable();
	}
	/**
	* Gets the buffer as a writable stream.
	*
	* Do not close stream directly, use .close on this class instead.
	*
	* Throws an error if .close() has been called.
	* @returns Underlying stream
	*/
	writable() {
		if (this.closed) throw new Error(`Buffer closed`);
		if (this.stream === void 0) this.stream = this.createWritable();
		return this.stream;
	}
	createWritable() {
		const b = this;
		return new WritableStream({
			write(chunk) {
				b.add(chunk);
			},
			close() {
				b.clear();
			}
		});
	}
	/**
	* Run in a `continunously` loop to process queued data
	* @returns _False_ if queue is empty and loop should stop. _True_ if it shoud continue.
	*/
	async onWrite() {
		if (this.queue.isEmpty) return false;
		if (this.paused) {
			console.warn(`WriteBuffer.onWrite: paused...`);
			return true;
		}
		const s = this.queue.dequeue();
		if (s === void 0) return false;
		await this.dataHandler(s);
		return true;
	}
	/**
	* Returns _true_ if {@link close} has been called.
	*/
	get isClosed() {
		return this.closed;
	}
	/**
	* Adds some queued data to send.
	* Longer strings are automatically chunked up according to the buffer's settings.
	*
	* Throws an error if {@link close} has been called.
	* @param stringToQueue
	*/
	add(stringToQueue) {
		if (this.closed) throw new Error(`Buffer closed`);
		if (this.chunkSize > 0) this.queue.enqueue(...splitByLength(stringToQueue, this.chunkSize));
		else this.queue.enqueue(stringToQueue);
		this.writer.start();
	}
};

//#endregion
//#region ../io/src/generic-state-transitions.ts
const genericStateTransitionsInstance = Object.freeze({
	ready: `connecting`,
	connecting: [`connected`, `closed`],
	connected: [`closed`],
	closed: `connecting`
});

//#endregion
//#region ../io/src/ble-device.ts
var BleDevice = class extends SimpleEventEmitter {
	states;
	codec;
	rx;
	tx;
	gatt;
	verboseLogging = false;
	rxBuffer;
	txBuffer;
	constructor(device, config) {
		super();
		this.device = device;
		this.config = config;
		this.verboseLogging = config.debug;
		this.txBuffer = new StringWriteBuffer(async (data) => {
			await this.writeInternal(data);
		}, config);
		this.rxBuffer = new StringReceiveBuffer((line) => {
			this.fireEvent(`data`, { data: line });
		});
		this.codec = new Codec();
		this.states = new StateMachineWithEvents(genericStateTransitionsInstance, { initial: `ready` });
		this.states.addEventListener(`change`, (event) => {
			this.fireEvent(`change`, event);
			this.verbose(`${event.priorState} -> ${event.newState}`);
			if (event.priorState === `connected`) {
				this.rxBuffer.clear();
				this.txBuffer.clear();
			}
		});
		device.addEventListener(`gattserverdisconnected`, () => {
			if (this.isClosed) return;
			this.verbose(`GATT server disconnected`);
			this.states.state = `closed`;
		});
		this.verbose(`ctor ${device.name} ${device.id}`);
	}
	get isConnected() {
		return this.states.state === `connected`;
	}
	get isClosed() {
		return this.states.state === `closed`;
	}
	write(txt) {
		if (this.states.state !== `connected`) throw new Error(`Cannot write while state is ${this.states.state}`);
		this.txBuffer.add(txt);
	}
	async writeInternal(txt) {
		this.verbose(`writeInternal ${txt}`);
		const tx = this.tx;
		if (tx === void 0) throw new Error(`Unexpectedly without tx characteristic`);
		try {
			await tx.writeValue(this.codec.toBuffer(txt));
		} catch (error) {
			this.warn(error);
		}
	}
	disconnect() {
		if (this.states.state !== `connected`) return;
		this.gatt?.disconnect();
	}
	async connect() {
		const attempts = this.config.connectAttempts ?? 3;
		this.states.state = `connecting`;
		this.verbose(`connect`);
		const gatt = this.device.gatt;
		if (gatt === void 0) throw new Error(`Gatt not available on device`);
		await retryFunction(async () => {
			this.verbose(`connect.retry`);
			const server = await gatt.connect();
			this.verbose(`Getting primary service`);
			const service = await server.getPrimaryService(this.config.service);
			this.verbose(`Getting characteristics`);
			const rx = await service.getCharacteristic(this.config.rxGattCharacteristic);
			const tx = await service.getCharacteristic(this.config.txGattCharacteristic);
			rx.addEventListener(`characteristicvaluechanged`, (event) => {
				this.onRx(event);
			});
			this.rx = rx;
			this.tx = tx;
			this.gatt = gatt;
			this.states.state = `connected`;
			await rx.startNotifications();
			return true;
		}, {
			limitAttempts: attempts,
			startAt: 200
		});
	}
	onRx(event) {
		const rx = this.rx;
		if (rx === void 0) return;
		const view = event.target.value;
		if (view === void 0) return;
		let text = this.codec.fromBuffer(view.buffer);
		const plzStop = indexOfCharCode(text, 19);
		const plzStart = indexOfCharCode(text, 17);
		if (plzStart && plzStop < plzStart) {
			this.verbose(`Tx plz start`);
			text = omitChars(text, plzStart, 1);
			this.txBuffer.paused = false;
		}
		if (plzStop && plzStop > plzStart) {
			this.verbose(`Tx plz stop`);
			text = omitChars(text, plzStop, 1);
			this.txBuffer.paused = true;
		}
		this.rxBuffer.add(text);
	}
	verbose(m) {
		if (this.verboseLogging) console.info(this.config.name, m);
	}
	log(m) {
		console.log(this.config.name, m);
	}
	warn(m) {
		console.warn(this.config.name, m);
	}
};

//#endregion
//#region ../io/src/nordic-ble-device.ts
var nordic_ble_device_exports = {};
__export(nordic_ble_device_exports, {
	NordicBleDevice: () => NordicBleDevice,
	defaultOpts: () => defaultOpts
});
const defaultOpts = {
	chunkSize: 20,
	service: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`,
	txGattCharacteristic: `6e400002-b5a3-f393-e0a9-e50e24dcca9e`,
	rxGattCharacteristic: `6e400003-b5a3-f393-e0a9-e50e24dcca9e`,
	name: `NordicDevice`,
	connectAttempts: 5,
	debug: false
};
var NordicBleDevice = class extends BleDevice {
	constructor(device, opts = {}) {
		super(device, {
			...defaultOpts,
			...opts
		});
	}
};

//#endregion
//#region ../io/src/audio/visualiser.ts
var AudioVisualiser = class {
	freqMaxRange = 200;
	audio;
	parent;
	lastPointer = {
		x: 0,
		y: 0
	};
	pointerDown = false;
	pointerClicking = false;
	pointerClickDelayMs = 100;
	pointerDelaying = false;
	waveTracker;
	freqTracker;
	el;
	constructor(parentElement, audio) {
		this.audio = audio;
		this.parent = parentElement;
		this.waveTracker = number();
		this.freqTracker = number();
		parentElement.innerHTML = `
    <section>
      <button id="rendererComponentToggle">🔼</button>
      <div>
        <h1>Visualiser</h1>
        <div style="display:flex; flex-wrap: wrap">
          <div class="visPanel">
            <h2>Frequency distribution</h2>
            <br />
            <canvas id="rendererComponentFreqData" height="200" width="400"></canvas>
          </div>
          <div class="visPanel">
            <h2>Waveform</h2>
            <button id="rendererComponentWaveReset">Reset</button>
            <div>
              Press and hold on wave to measure
            </div>
            <br />
            <canvas id="rendererComponentWaveData" height="200" width="400"></canvas>
          </div>
        </div>
      </div>
    </section>
    `;
		this.el = parentElement.children[0];
		document.getElementById(`rendererComponentToggle`)?.addEventListener(`click`, () => {
			this.setExpanded(!this.isExpanded());
		});
		this.el.addEventListener(`pointermove`, (e) => {
			this.onPointer(e);
		});
		this.el.addEventListener(`pointerup`, () => {
			this.pointerDelaying = false;
			this.pointerDown = false;
		});
		this.el.addEventListener(`pointerdown`, () => {
			this.pointerDelaying = true;
			setTimeout(() => {
				if (this.pointerDelaying) {
					this.pointerDelaying = false;
					this.pointerDown = true;
				}
			}, this.pointerClickDelayMs);
		});
		this.el.addEventListener(`pointerleave`, () => {
			this.pointerDelaying = false;
			this.pointerDown = false;
		});
		document.getElementById(`rendererComponentWaveReset`)?.addEventListener(`click`, () => {
			this.clear();
		});
	}
	renderFreq(freq) {
		if (!this.isExpanded()) return;
		if (!freq) return;
		const canvas = document.getElementById(`rendererComponentFreqData`);
		if (canvas === null) throw new Error(`Cannot find canvas element`);
		const g = canvas.getContext(`2d`);
		if (g === null) throw new Error(`Cannot create drawing context`);
		const bins = freq.length;
		const canvasWidth = canvas.clientWidth;
		const canvasHeight = canvas.clientHeight;
		g.clearRect(0, 0, canvasWidth, canvasHeight);
		const pointer = this.getPointerRelativeTo(canvas);
		const width = canvasWidth / bins;
		const minMax = numberArrayCompute(freq);
		for (let index = 0; index < bins; index++) {
			if (!Number.isFinite(freq[index])) continue;
			const value = freq[index] - minMax.min;
			const valueRelative = value / this.freqMaxRange;
			const height = Math.abs(canvasHeight * valueRelative);
			const offset = canvasHeight - height;
			const hue = index / bins * 360;
			const left = index * width;
			g.fillStyle = `hsl(${hue}, 100%, 50%)`;
			if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= left && pointer.x <= left + width) {
				if (this.freqTracker.id !== index.toString()) this.freqTracker = number({ id: index.toString() });
				this.freqTracker.seen(freq[index]);
				const freqMma = this.freqTracker.getMinMaxAvg();
				g.fillStyle = `black`;
				if (this.audio) g.fillText(`Frequency (${index}) at pointer: ${this.audio.getFrequencyAtIndex(index).toLocaleString(`en`)} - ${this.audio.getFrequencyAtIndex(index + 1).toLocaleString(`en`)}`, 2, 10);
				g.fillText(`Raw value: ${freq[index].toFixed(2)}`, 2, 20);
				g.fillText(`Min: ${freqMma.min.toFixed(2)}`, 2, 40);
				g.fillText(`Max: ${freqMma.max.toFixed(2)}`, 60, 40);
				g.fillText(`Avg: ${freqMma.avg.toFixed(2)}`, 120, 40);
			}
			g.fillRect(left, offset, width, height);
		}
	}
	isExpanded() {
		const contentsElement = this.el.querySelector(`div`);
		if (contentsElement === null) throw new Error(`contents div not found`);
		return contentsElement.style.display === ``;
	}
	setExpanded(value) {
		const contentsElement = this.el.querySelector(`div`);
		const button = this.el.querySelector(`button`);
		if (button === null) throw new Error(`Button element not found`);
		if (contentsElement === null) throw new Error(`Contents element not found`);
		if (value) {
			contentsElement.style.display = ``;
			button.innerText = `🔼`;
		} else {
			contentsElement.style.display = `none`;
			button.innerText = `🔽`;
		}
	}
	clear() {
		this.clearCanvas(document.getElementById(`rendererComponentFreqData`));
		this.clearCanvas(document.getElementById(`rendererComponentWaveData`));
	}
	clearCanvas(canvas) {
		if (canvas === null) throw new Error(`Canvas is null`);
		const g = canvas.getContext(`2d`);
		if (g === null) throw new Error(`Cannot create drawing context`);
		g.fillStyle = `white`;
		g.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}
	renderWave(wave, bipolar = true) {
		if (!this.isExpanded()) return;
		if (!wave) return;
		const canvas = document.getElementById(`rendererComponentWaveData`);
		if (canvas === null) throw new Error(`Cannot find wave canvas`);
		const g = canvas.getContext(`2d`);
		if (g === null) throw new Error(`Cannot create drawing context for wave`);
		const canvasWidth = canvas.clientWidth;
		const canvasHeight = canvas.clientHeight;
		const pointer = this.getPointerRelativeTo(canvas);
		const infoAreaHeight = 20;
		const infoAreaWidth = 60;
		const bins = wave.length;
		g.fillStyle = `white`;
		g.fillRect(0, 0, infoAreaWidth, infoAreaHeight);
		const width = canvasWidth / bins;
		g.fillStyle = `rgba(255, 255, 255, 0.03)`;
		g.fillRect(0, 20, canvasWidth, canvasHeight);
		g.fillStyle = `red`;
		if (bipolar) g.fillRect(0, canvasHeight / 2, canvasWidth, 1);
		else g.fillRect(0, canvasHeight - 1, canvasWidth, 1);
		g.lineWidth = 1;
		g.strokeStyle = `black`;
		g.beginPath();
		let x = 0;
		for (let index = 0; index < bins; index++) {
			const height = wave[index] * canvasHeight;
			const y = bipolar ? canvasHeight / 2 - height : canvasHeight - height;
			if (index === 0) g.moveTo(x, y);
			else g.lineTo(x, y);
			x += width;
			if (this.pointerDown) this.waveTracker.seen(wave[index]);
		}
		g.lineTo(canvasWidth, bipolar ? canvasHeight / 2 : canvasHeight);
		g.stroke();
		if (this.pointerDown) {
			const waveMma = this.waveTracker.getMinMaxAvg();
			g.fillStyle = `rgba(255,255,0,1)`;
			g.fillRect(infoAreaWidth, 0, 150, 20);
			g.fillStyle = `black`;
			g.fillText(`Min: ` + waveMma.min.toFixed(2), 60, 10);
			g.fillText(`Max: ` + waveMma.max.toFixed(2), 110, 10);
			g.fillText(`Avg: ` + waveMma.avg.toFixed(2), 160, 10);
		} else this.waveTracker.reset();
		if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= 0 && pointer.x <= canvasWidth) {
			g.fillStyle = `black`;
			g.fillText(`Level: ` + (1 - pointer.y / canvasHeight).toFixed(2), 2, 10);
		}
	}
	getPointerRelativeTo(elem) {
		const rect = elem.getBoundingClientRect();
		return {
			x: this.lastPointer.x - rect.left - window.scrollX,
			y: this.lastPointer.y - rect.top - window.scrollY
		};
	}
	onPointer(event) {
		this.lastPointer = {
			x: event.pageX,
			y: event.pageY
		};
		event.preventDefault();
	}
};

//#endregion
//#region ../io/src/audio/analyser.ts
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
const analyserBasic = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
	const freq = new Float32Array(node.frequencyBinCount);
	const wave = new Float32Array(node.fftSize);
	node.getFloatFrequencyData(freq);
	node.getFloatTimeDomainData(wave);
	onData(freq, wave, analyser);
}, opts);
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
const analyserFrequency = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
	const freq = new Float32Array(node.frequencyBinCount);
	node.getFloatFrequencyData(freq);
	onData(freq, analyser);
}, opts);
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
const analyserPeakLevel = (onData, opts = {}) => new AudioAnalyser((node, analyser) => {
	const wave = new Float32Array(node.fftSize);
	node.getFloatTimeDomainData(wave);
	onData(maxFast(wave), analyser);
}, opts);
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
var AudioAnalyser = class {
	showVis;
	fftSize;
	smoothingTimeConstant;
	#isPaused = false;
	debug;
	#initInProgress = false;
	visualiser;
	audioCtx;
	analyserNode;
	analyse;
	constructor(analyse, opts = {}) {
		this.showVis = opts.showVis ?? false;
		this.fftSize = opts.fftSize ?? 1024;
		this.debug = opts.debug ?? false;
		this.smoothingTimeConstant = opts.smoothingTimeConstant ?? .8;
		resultThrow(integerTest(this.fftSize, `positive`, `opts.fftSize`), numberTest(this.smoothingTimeConstant, `percentage`, `opts.smoothingTimeConstant`));
		if (!isPowerOfTwo(this.fftSize)) throw new Error(`fftSize must be a power of two from 32 to 32768 (${this.fftSize})`);
		if (this.fftSize < 32) throw new Error(`fftSize must be at least 32`);
		if (this.fftSize > 32768) throw new Error(`fftSize must be no greater than 32768`);
		this.analyse = analyse;
		this.paused = false;
		this.init();
		const visualiserEl = document.querySelector(`#audio-visualiser`);
		if (visualiserEl) {
			const visualiser = new AudioVisualiser(visualiserEl, this);
			visualiser.setExpanded(this.showVis);
			this.visualiser = visualiser;
		}
	}
	init() {
		if (this.#initInProgress) {
			if (this.debug) console.debug(`Init already in progress`);
			return;
		}
		this.#initInProgress = true;
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			this.onMicSuccess(stream);
		}).catch((error) => {
			this.#initInProgress = false;
			console.error(error);
		});
	}
	get paused() {
		return this.#isPaused;
	}
	set paused(v) {
		if (v === this.#isPaused) return;
		this.#isPaused = v;
		if (v) {
			if (this.debug) console.log(`Paused`);
		} else {
			if (this.debug) console.log(`Unpaused`);
			window.requestAnimationFrame(this.analyseLoop.bind(this));
		}
	}
	setup(context, stream) {
		const analyser = context.createAnalyser();
		analyser.fftSize = this.fftSize;
		analyser.smoothingTimeConstant = this.smoothingTimeConstant;
		const micSource = context.createMediaStreamSource(stream);
		micSource.connect(analyser);
		return analyser;
	}
	onMicSuccess(stream) {
		try {
			const context = new AudioContext();
			context.addEventListener(`statechange`, () => {
				if (this.debug) console.log(`Audio context state: ${context.state}`);
			});
			this.audioCtx = context;
			this.analyserNode = this.setup(context, stream);
			window.requestAnimationFrame(this.analyseLoop.bind(this));
		} catch (error) {
			this.#initInProgress = false;
			console.error(error);
		}
	}
	analyseLoop() {
		if (this.paused) {
			if (this.debug) console.log(`Paused`);
			return;
		}
		const a = this.analyserNode;
		if (a === void 0) {
			console.warn(`Analyser undefined`);
			return;
		}
		try {
			this.analyse(a, this);
		} catch (error) {
			console.error(error);
		}
		window.requestAnimationFrame(this.analyseLoop.bind(this));
	}
	/**
	* Returns the maximum FFT value within the given frequency range
	*/
	getFrequencyRangeMax(lowFreq, highFreq, freqData) {
		const samples = this.sliceByFrequency(lowFreq, highFreq, freqData);
		return max(samples);
	}
	/**
	* Returns a sub-sampling of frequency analysis data that falls between
	* `lowFreq` and `highFreq`.
	* @param lowFreq Low frequency
	* @param highFreq High frequency
	* @param freqData Full-spectrum frequency data
	* @returns Sub-sampling of analysis
	*/
	sliceByFrequency(lowFreq, highFreq, freqData) {
		const lowIndex = this.getIndexForFrequency(lowFreq);
		const highIndex = this.getIndexForFrequency(highFreq);
		const samples = freqData.slice(lowIndex, highIndex);
		return samples;
	}
	/**
	* Returns the starting frequency for a given binned frequency index.
	* @param index Array index
	* @returns Sound frequency
	*/
	getFrequencyAtIndex(index) {
		const a = this.analyserNode;
		const ctx = this.audioCtx;
		if (a === void 0) throw new Error(`Analyser not available`);
		if (ctx === void 0) throw new Error(`Audio context not available`);
		resultThrow(integerTest(index, `positive`, `index`));
		if (index > a.frequencyBinCount) throw new Error(`Index ${index} exceeds frequency bin count ${a.frequencyBinCount}`);
		return index * ctx.sampleRate / (a.frequencyBinCount * 2);
	}
	/**
	* Returns a binned array index for a given frequency
	* @param freq Sound frequency
	* @returns Array index into frequency bins
	*/
	getIndexForFrequency(freq) {
		const a = this.analyserNode;
		if (a === void 0) throw new Error(`Analyser not available`);
		const nyquist = a.context.sampleRate / 2;
		const index = Math.round(freq / nyquist * a.frequencyBinCount);
		if (index < 0) return 0;
		if (index >= a.frequencyBinCount) return a.frequencyBinCount - 1;
		return index;
	}
};

//#endregion
//#region ../io/src/audio/from-audio-element.ts
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
var AudioElements = class {
	#initialised = false;
	#sources = /* @__PURE__ */ new Map();
	filterType = `lowpass`;
	constructor() {}
	init() {
		if (this.#initialised) return;
		this.#initialised = true;
		for (const element of document.querySelectorAll(`audio`)) this.#sources.set(element.id, createFromAudioElement(element, this.filterType));
	}
	/**
	* Gets a BasicAudio instance by key
	* @param key 
	* @returns BasicAudio instance, or undefined
	*/
	get(key) {
		this.init();
		return this.#sources.get(key);
	}
};
/**
* Create a BasicAudioElement instance from an <AUDIO> tag in the HTML document.
* 
* See {@link AudioElements} to automatically create sources from all <AUDIO> elements.
* @param audioElementOrQuery Element or query (eg '#some-id') 
* @param filterType Filter type. Defaults to 'lowpass'
* @returns 
*/
function createFromAudioElement(audioElementOrQuery, filterType = `lowpass`) {
	const el = resolveEl(audioElementOrQuery);
	const context = new AudioContext();
	const source = context.createMediaElementSource(el);
	const pan = context.createStereoPanner();
	const gain = context.createGain();
	const filter = context.createBiquadFilter();
	filter.type = filterType;
	source.connect(gain);
	gain.connect(pan);
	pan.connect(filter);
	filter.connect(context.destination);
	return {
		pan,
		gain,
		filter,
		id: el.id,
		ctx: context,
		el
	};
}

//#endregion
//#region ../io/src/audio/from-oscillator.ts
/**
* Initialise audio with an oscillator source
* @param oscillatorOptions
* @returns BasicAudio instance
*/
function createOscillator(oscillatorOptions = {}) {
	const context = new AudioContext();
	const oscType = oscillatorOptions.type ?? `sawtooth`;
	const oscFreq = oscillatorOptions.frequency ?? 440;
	const id = oscillatorOptions.id ?? shortGuid();
	const source = context.createOscillator();
	source.type = oscType;
	source.frequency.setValueAtTime(oscFreq, context.currentTime);
	const pan = context.createStereoPanner();
	const gain = context.createGain();
	const filter = context.createBiquadFilter();
	source.connect(gain);
	gain.connect(pan);
	pan.connect(filter);
	filter.connect(context.destination);
	return {
		pan,
		gain,
		filter,
		ctx: context,
		osc: source,
		id
	};
}

//#endregion
//#region ../io/src/audio/index.ts
var audio_exports = {};
__export(audio_exports, {
	AudioAnalyser: () => AudioAnalyser,
	AudioElements: () => AudioElements,
	AudioVisualiser: () => AudioVisualiser,
	analyserBasic: () => analyserBasic,
	analyserFrequency: () => analyserFrequency,
	analyserPeakLevel: () => analyserPeakLevel,
	createFromAudioElement: () => createFromAudioElement,
	createOscillator: () => createOscillator
});

//#endregion
//#region ../io/src/espruino-ble-device.ts
/**
* An Espruino BLE-connection
*
* See [online demos](https://demos.ixfx.fun/io/)
*
* Use the `puck` function to initialise and connect to a Puck.js.
* It must be called in a UI event handler for browser security reasons.
*
* ```js
* const e = await Espruino.puck();
* ```
*
* To connect to a particular device:
*
* ```js
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
var EspruinoBleDevice = class extends NordicBleDevice {
	evalTimeoutMs;
	evalReplyBluetooth = true;
	/**
	* Creates instance. You probably would rather use {@link puck} to create.
	* @param device
	* @param opts
	*/
	constructor(device, opts = {}) {
		super(device, opts);
		this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
	}
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
	async writeScript(code) {
		this.write(`\u0003\u0010reset();\n`);
		this.write(`\u0010${code}\n`);
	}
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
	async eval(code, opts = {}, warn) {
		const debug = opts.debug ?? false;
		const warnCallback = warn ?? ((m) => {
			this.warn(m);
		});
		return deviceEval(code, opts, this, `Bluetooth.println`, debug, warnCallback);
	}
};

//#endregion
//#region ../io/src/json-device.ts
var JsonDevice = class extends SimpleEventEmitter {
	states;
	codec;
	verboseLogging = false;
	name;
	connectAttempts;
	chunkSize;
	rxBuffer;
	txBuffer;
	constructor(config = {}) {
		super();
		this.verboseLogging = config.debug ?? false;
		this.chunkSize = config.chunkSize ?? 1024;
		this.connectAttempts = config.connectAttempts ?? 3;
		this.name = config.name ?? `JsonDevice`;
		this.txBuffer = new StringWriteBuffer(async (data) => {
			await this.writeInternal(data);
		}, config);
		this.rxBuffer = new StringReceiveBuffer((line) => {
			this.fireEvent(`data`, { data: line });
		});
		this.codec = new Codec();
		this.states = new StateMachineWithEvents(genericStateTransitionsInstance, { initial: `ready` });
		this.states.addEventListener(`change`, (event) => {
			this.fireEvent(`change`, event);
			this.verbose(`${event.priorState} -> ${event.newState}`);
			if (event.priorState === `connected`) {
				this.rxBuffer.clear();
				this.txBuffer.clear();
			}
		});
	}
	get isConnected() {
		return this.states.state === `connected`;
	}
	get isClosed() {
		return this.states.state === `closed`;
	}
	write(txt) {
		if (this.states.state !== `connected`) throw new Error(`Cannot write while state is ${this.states.state}`);
		this.txBuffer.add(txt);
	}
	async close() {
		if (this.states.state !== `connected`) return;
		this.onClosed();
	}
	async connect() {
		const attempts = this.connectAttempts;
		this.states.state = `connecting`;
		await this.onPreConnect();
		await retryFunction(async () => {
			await this.onConnectAttempt();
			this.states.state = `connected`;
			return true;
		}, {
			limitAttempts: attempts,
			startAt: 200
		});
	}
	onRx(event) {
		const view = event.target.value;
		if (view === void 0) return;
		let string_ = this.codec.fromBuffer(view.buffer);
		const plzStop = indexOfCharCode(string_, 19);
		const plzStart = indexOfCharCode(string_, 17);
		if (plzStart && plzStop < plzStart) {
			this.verbose(`Tx plz start`);
			string_ = omitChars(string_, plzStart, 1);
			this.txBuffer.paused = false;
		}
		if (plzStop && plzStop > plzStart) {
			this.verbose(`Tx plz stop`);
			string_ = omitChars(string_, plzStop, 1);
			this.txBuffer.paused = true;
		}
		this.rxBuffer.add(string_);
	}
	verbose(m) {
		if (this.verboseLogging) console.info(this.name, m);
	}
	log(m) {
		console.log(this.name, m);
	}
	warn(m) {
		console.warn(this.name, m);
	}
};

//#endregion
//#region ../io/src/serial.ts
var serial_exports = {};
__export(serial_exports, { Device: () => Device });
/**
* Serial device. Assumes data is sent with new line characters (\r\n) between messages.
*
* ```
* import { Serial } from '@ixfx/io.js'
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
var Device = class extends JsonDevice {
	port;
	tx;
	abort;
	baudRate;
	constructor(config = {}) {
		super(config);
		this.config = config;
		this.abort = new AbortController();
		const eol = config.eol ?? `\r\n`;
		this.baudRate = config.baudRate ?? 9600;
		if (config.name === void 0) this.name = `Serial.Device`;
		this.rxBuffer.separator = eol;
	}
	/**
	* Writes text collected in buffer
	* @param txt
	*/
	async writeInternal(txt) {
		if (this.tx === void 0) throw new Error(`tx not ready`);
		try {
			this.tx.write(txt);
		} catch (error) {
			this.warn(error);
		}
	}
	onClosed() {
		this.tx?.releaseLock();
		this.abort.abort(`closing port`);
		this.states.state = `closed`;
	}
	onPreConnect() {
		return Promise.resolve();
	}
	async onConnectAttempt() {
		let reqOpts = { filters: [] };
		const openOpts = { baudRate: this.baudRate };
		if (this.config.filters) reqOpts = { filters: [...this.config.filters] };
		this.port = await navigator.serial.requestPort(reqOpts);
		this.port.addEventListener(`disconnect`, (_) => {
			this.close();
		});
		await this.port.open(openOpts);
		const txW = this.port.writable;
		const txText = new TextEncoderStream();
		if (txW !== null) {
			txText.readable.pipeTo(txW, { signal: this.abort.signal }).catch((error) => {
				console.log(`Serial.onConnectAttempt txText pipe:`);
				console.log(error);
			});
			this.tx = txText.writable.getWriter();
		}
		const rxR = this.port.readable;
		const rxText = new TextDecoderStream();
		if (rxR !== null) {
			rxR.pipeTo(rxText.writable, { signal: this.abort.signal }).catch((error) => {
				console.log(`Serial.onConnectAttempt rxR pipe:`);
				console.log(error);
			});
			rxText.readable.pipeTo(this.rxBuffer.writable(), { signal: this.abort.signal }).catch((error) => {
				console.log(`Serial.onConnectAttempt rxText pipe:`);
				console.log(error);
				try {
					this.port?.close();
				} catch (error$1) {
					console.log(error$1);
				}
			});
		}
	}
};

//#endregion
//#region ../io/src/espruino-serial-device.ts
var EspruinoSerialDevice = class extends Device {
	evalTimeoutMs;
	evalReplyBluetooth = false;
	constructor(opts) {
		super(opts);
		if (opts === void 0) opts = {};
		this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
	}
	async disconnect() {
		return super.close();
	}
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
	writeScript(code) {
		this.write(`\u0003\u0010reset();\n`);
		this.write(`\u0010${code}\n`);
	}
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
	async eval(code, opts = {}, warn) {
		const debug = opts.debug ?? false;
		const warner = warn ?? ((m) => {
			this.warn(m);
		});
		return deviceEval(code, opts, this, `USB.println`, debug, warner);
	}
};

//#endregion
//#region ../io/src/espruino.ts
var espruino_exports = {};
__export(espruino_exports, {
	EspruinoBleDevice: () => EspruinoBleDevice,
	EspruinoSerialDevice: () => EspruinoSerialDevice,
	bangle: () => bangle,
	connectBle: () => connectBle,
	deviceEval: () => deviceEval,
	puck: () => puck,
	serial: () => serial
});
/**
* Instantiates a Puck.js. See {@link EspruinoBleDevice} for more info.
* [Online demos](https://demos.ixfx.fun/io/)
*
* If `opts.name` is specified, this will the the Bluetooth device sought.
*
* ```js
* import { Espruino } from '@ixfx/io.js'
* const e = await Espruino.puck({ name:`Puck.js a123` });
* ```
*
* If no name is specified, a list of all devices starting with `Puck.js` are shown.
*
* To get more control over filtering, pass in `opts.filter`. `opts.name` is not used as a filter in this scenario.
*
* ```js
* import { Espruino } from '@ixfx/io.js'
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
const puck = async (opts = {}) => {
	const name = opts.name ?? `Puck`;
	const debug = opts.debug ?? false;
	const device = await navigator.bluetooth.requestDevice({
		filters: getFilters(opts, `Puck.js`),
		optionalServices: [defaultOpts.service]
	});
	if (opts.debug) console.info(`Espruino.puck device name: ${device.name}`);
	const d = new EspruinoBleDevice(device, {
		name,
		debug
	});
	await d.connect();
	return d;
};
const bangle = async (opts = {}) => {
	const name = opts.name ?? `Bangle`;
	const debug = opts.debug ?? false;
	const device = await navigator.bluetooth.requestDevice({
		filters: getFilters(opts, `Bangle.js`),
		optionalServices: [defaultOpts.service]
	});
	if (opts.debug) console.info(`Espruino.bangle device name: ${device.name}`);
	const d = new EspruinoBleDevice(device, {
		name,
		debug
	});
	await d.connect();
	return d;
};
/**
* Create a serial-connected Espruino device.
*
* ```js
* import { Espruino } from '@ixfx/io.js'
* const e = await Espruio.serial();
* e.connect();
* ```
*
* Options:
* ```js
* import { Espruino } from '@ixfx/io.js'
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
const serial = async (opts = {}) => {
	const d = new EspruinoSerialDevice(opts);
	await d.connect();
	return d;
};
/**
* Returns a list of BLE scan filters, given the
* connect options.
* @param opts
* @returns
*/
const getFilters = (opts, defaultNamePrefix) => {
	const filters = [];
	if (opts.filters) filters.push(...opts.filters);
	else if (opts.name) {
		filters.push({ name: opts.name });
		console.info(`Filtering Bluetooth devices by name '${opts.name}'`);
	} else filters.push({ namePrefix: defaultNamePrefix });
	return filters;
};
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
* import { Espruino } from '@ixfx/io.js'
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
const connectBle = async (opts = {}) => {
	const device = await navigator.bluetooth.requestDevice({
		filters: getFilters(opts, `Puck.js`),
		optionalServices: [defaultOpts.service]
	});
	const d = new EspruinoBleDevice(device, {
		name: `Espruino`,
		...opts
	});
	await d.connect();
	return d;
};
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
const deviceEval = async (code, opts = {}, device, evalReplyPrefix, debug, warn) => {
	const timeoutMs = opts.timeoutMs ?? device.evalTimeoutMs;
	const assumeExclusive = opts.assumeExclusive ?? true;
	if (typeof code !== `string`) throw new TypeError(`Param 'code' should be a string. Got: ${typeof code}`);
	return new Promise((resolve, reject) => {
		const id = string(5);
		const onData = (d) => {
			try {
				let cleaned = d.data.trim();
				if (cleaned.startsWith(`>{`) && cleaned.endsWith(`}`)) cleaned = cleaned.slice(1);
				const dd = JSON.parse(cleaned);
				if (`reply` in dd) if (dd.reply === id) {
					done();
					if (`result` in dd) resolve(dd.result);
				} else warn(`Expected reply ${id}, got ${dd.reply}`);
				else warn(`Expected packet, missing 'reply' field. Got: ${d.data}`);
			} catch (error) {
				if (assumeExclusive) done(`Unexpected reply: ${d.data}. Error: ${getErrorMessage(error)}`);
				else warn(getErrorMessage(error));
			}
		};
		const onStateChange = (event) => {
			if (event.newState !== `connected`) done(`State changed to '${event.newState}', aborting`);
		};
		device.addEventListener(`data`, onData);
		device.addEventListener(`change`, onStateChange);
		const done = waitFor(timeoutMs, (reason) => {
			reject(new Error(reason));
		}, (_success) => {
			device.removeEventListener(`data`, onData);
			device.removeEventListener(`change`, onStateChange);
		});
		const source = `\u0010${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))\n`;
		if (debug) warn(source);
		device.write(source);
	});
};

//#endregion
//#region ../io/src/camera.ts
var camera_exports = {};
__export(camera_exports, {
	dumpDevices: () => dumpDevices,
	start: () => start$1
});
const startTimeoutMs = 1e4;
/**
* Print available media devices to console
* 
* ```js
* camera.dumpDevices(); // Will print results to console
* ```
* @param filterKind Defaults `videoinput`
*/
const dumpDevices = async (filterKind = `videoinput`) => {
	const devices = await navigator.mediaDevices.enumerateDevices();
	for (const d of devices) {
		if (d.kind !== filterKind) continue;
		console.log(d.label);
		console.log(` Kind: ${d.kind}`);
		console.log(` Device id: ${d.deviceId}`);
	}
};
/**
* Attempts to start a video-only stream from a camera into a hidden
* VIDEO element for frame capture. The VIDEO element is created automatically.
*
*
* ```js
* import { Camera } from '@ixfx/io.js'
* import { Video } from '@ixfx/visual.js'
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
* import { Camera } from '@ixfx/io.js'
* import { Video } from '@ixfx/visual.js'
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
const start$1 = async (constraints = {}) => {
	const videoEl = document.createElement(`VIDEO`);
	videoEl.style.display = `none`;
	videoEl.playsInline = true;
	videoEl.muted = true;
	videoEl.classList.add(`ixfx-camera`);
	document.body.append(videoEl);
	let stopVideo = () => {};
	const dispose = () => {
		try {
			stopVideo();
		} catch {}
		videoEl.remove();
	};
	try {
		const r = await startWithVideoEl$1(videoEl, constraints);
		stopVideo = r.dispose;
		return {
			videoEl,
			dispose
		};
	} catch (error) {
		console.error(error);
		dispose();
		throw error;
	}
};
/**
* Attempts to start a video-only stream from a camera into the designated VIDEO element.
* @param videoEl
* @param constraints
* @returns Result contains videoEl and dispose function
*/
const startWithVideoEl$1 = async (videoEl, constraints = {}) => {
	if (videoEl === void 0) throw new Error(`videoEl undefined`);
	if (videoEl === null) throw new Error(`videoEl null`);
	const maxResolution = constraints.max;
	const minResolution = constraints.min;
	const idealResolution = constraints.ideal;
	const c = {
		audio: false,
		video: {
			width: {},
			height: {}
		}
	};
	if (constraints.facingMode === `front`) constraints = {
		...constraints,
		facingMode: `user`
	};
	if (constraints.facingMode === `back`) constraints = {
		...constraints,
		facingMode: `environment`
	};
	if (constraints.facingMode) c.video.facingMode = constraints.facingMode;
	if (constraints.deviceId) c.video.deviceId = constraints.deviceId;
	if (idealResolution) {
		c.video.width = {
			...c.video.width,
			ideal: idealResolution.width
		};
		c.video.height = {
			...c.video.height,
			ideal: idealResolution.height
		};
	}
	if (maxResolution) {
		c.video.width = {
			...c.video.width,
			max: maxResolution.width
		};
		c.video.height = {
			...c.video.height,
			max: maxResolution.height
		};
	}
	if (minResolution) {
		c.video.width = {
			...c.video.width,
			min: minResolution.width
		};
		c.video.height = {
			...c.video.height,
			min: minResolution.height
		};
	}
	const done = waitFor(constraints.startTimeoutMs ?? startTimeoutMs, (reason) => {
		throw new Error(`Camera getUserMedia failed: ${reason}`);
	});
	try {
		const stream = await navigator.mediaDevices.getUserMedia(c);
		const dispose = () => {
			videoEl.pause();
			const t = stream.getTracks();
			for (const track of t) track.stop();
		};
		videoEl.srcObject = stream;
		done();
		const returnValue = {
			videoEl,
			dispose
		};
		const p = new Promise((resolve, reject) => {
			videoEl.addEventListener(`loadedmetadata`, () => {
				videoEl.play().then(() => {
					resolve(returnValue);
				}).catch((error) => {
					reject(error);
				});
			});
		});
		return p;
	} catch (error) {
		done(getErrorMessage(error));
		throw error;
	}
};

//#endregion
//#region ../io/src/video-file.ts
var video_file_exports = {};
__export(video_file_exports, { start: () => start });
/**
* Starts video file playback, creating a VIDEO element automatically.
* @param file File
* @returns StartResult
*/
const start = async (file) => {
	const videoEl = document.createElement(`VIDEO`);
	videoEl.style.display = `none`;
	videoEl.playsInline = true;
	videoEl.muted = true;
	videoEl.classList.add(`ixfx-video`);
	document.body.appendChild(videoEl);
	let stopVideo = () => {};
	const dispose = () => {
		try {
			stopVideo();
		} catch {}
		videoEl.remove();
	};
	try {
		const r = await startWithVideoEl(videoEl, file);
		stopVideo = r.dispose;
		return {
			videoEl,
			dispose
		};
	} catch (ex) {
		console.error(ex);
		dispose();
		throw ex;
	}
};
/**
* Starts playback of a video file in the provided VIDEO element.
* @param videoEl
* @param file
* @returns
*/
const startWithVideoEl = async (videoEl, file) => {
	if (videoEl === void 0) throw new Error(`videoEl undefined`);
	if (videoEl === null) throw new Error(`videoEl null`);
	const url = URL.createObjectURL(file);
	videoEl.src = url;
	videoEl.loop = true;
	const dispose = () => {
		videoEl.pause();
	};
	const returnValue = {
		videoEl,
		dispose
	};
	const p = new Promise((resolve, reject) => {
		videoEl.addEventListener(`loadedmetadata`, () => {
			videoEl.play().then(() => {
				resolve(returnValue);
			}).catch((ex) => {
				reject(ex);
			});
		});
	});
	return p;
};

//#endregion
//#region ../io/src/frame-processor.ts
/**
* Frame Processor
* Simplifies grabbing frames from a camera or video file.
* 
* First, create:
* ```js
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
* With `useCamera`, optionally specify {@link Camera.Constraints} to pick which camera and resolution.
* 
* ```js
* fp.getFrame(); // Gets the last frame
* fp.dispose(); // Close down camera/file
* ```
* 
* See {@link FrameProcessorOpts} for details on available options.
*/
var FrameProcessor = class {
	_source;
	_state;
	_teardownNeeded = false;
	_cameraConstraints;
	_cameraStartResult;
	_videoSourceCapture;
	_videoFile;
	_videoStartResult;
	_showCanvas;
	_showPreview;
	_postCaptureDraw;
	_timer;
	_captureCanvasEl;
	/**
	* Create a new frame processor
	* @param opts
	*/
	constructor(opts = {}) {
		this._state = `ready`;
		this._source = ``;
		this._timer = performance.now();
		this._showCanvas = opts.showCanvas ?? false;
		this._showPreview = opts.showPreview ?? false;
		this._cameraConstraints = opts.cameraConstraints ?? void 0;
		this._captureCanvasEl = opts.captureCanvasEl ?? void 0;
		this._postCaptureDraw = opts.postCaptureDraw;
	}
	/**
	* Hides or shows the raw source in the DOM
	* @param enabled Preview enabled
	*/
	showPreview(enabled) {
		if (this._state === `disposed`) throw new Error(`Disposed`);
		let el;
		switch (this._source) {
			case `camera`: {
				el = this._cameraStartResult?.videoEl;
				if (el !== void 0) el.style.display = enabled ? `block` : `none`;
				break;
			}
		}
		this._showPreview = enabled;
	}
	/**
	* Shows or hides the Canvas we're capturing to
	* @param enabled
	*/
	showCanvas(enabled) {
		if (this._state === `disposed`) throw new Error(`Disposed`);
		let el;
		if (this._source === `camera` || this._source === `video`) {
			el = this._videoSourceCapture?.canvasEl;
			if (el !== void 0) el.style.display = enabled ? `block` : `none`;
		} else throw new Error(`Source not implemented: ${this._source}`);
		this._showCanvas = enabled;
	}
	/**
	* Returns the current capturer instance
	* @returns
	*/
	getCapturer() {
		if (this._state === `disposed`) throw new Error(`Disposed`);
		if (this._source === `camera` || this._source === `video`) return this._videoSourceCapture;
		throw new Error(`Source kind not supported ${this._source}`);
	}
	/**
	* Grab frames from a video camera source and initialises
	* frame processor.
	*
	* If `constraints` are not specified, it will use the ones
	* provided when creating the class, or defaults.
	*
	* @param constraints Override of constraints when requesting camera access
	*/
	async useCamera(constraints) {
		if (this._state === `disposed`) throw new Error(`Disposed`);
		this._source = `camera`;
		if (this._teardownNeeded) this.teardown();
		if (constraints) this._cameraConstraints = constraints;
		await this.init();
	}
	async useVideo(file) {
		if (this._state === `disposed`) throw new Error(`Disposed`);
		this._source = `video`;
		if (this._teardownNeeded) this.teardown();
		this._videoFile = file;
		await this.init();
	}
	/**
	* Initialises camera
	*/
	async initCamera() {
		const r = await start$1(this._cameraConstraints);
		if (r === void 0) throw new Error(`Could not start camera`);
		this._cameraStartResult = r;
		this.postInit(r);
	}
	async initVideo() {
		if (!this._videoFile) throw new Error(`Video file not defined`);
		const r = await start(this._videoFile);
		this._videoStartResult = r;
		this.postInit(r);
	}
	async postInit(r) {
		if (this._showPreview) r.videoEl.style.display = `block`;
		this._videoSourceCapture = manualCapture(r.videoEl, {
			postCaptureDraw: this._postCaptureDraw,
			showCanvas: this._showCanvas,
			canvasEl: this._captureCanvasEl
		});
		this._teardownNeeded = true;
		this._cameraStartResult = r;
		return Promise.resolve();
	}
	/**
	* Closes down connections and removes created elements.
	* Once disposed, the frame processor cannot be used
	* @returns
	*/
	dispose() {
		if (this._state === `disposed`) return;
		this.teardown();
		this._state = `disposed`;
	}
	async init() {
		this._timer = performance.now();
		switch (this._source) {
			case `camera`: {
				await this.initCamera();
				break;
			}
			case `video`: {
				await this.initVideo();
				break;
			}
		}
		this._state = `initialised`;
	}
	teardown() {
		if (!this._teardownNeeded) return;
		if (this._source === `camera` || this._source === `video`) this._videoSourceCapture?.dispose();
		switch (this._source) {
			case `camera`: {
				this._cameraStartResult?.dispose();
				break;
			}
			case `video`: {
				this._videoStartResult?.dispose();
				break;
			}
		}
		this._teardownNeeded = false;
	}
	/**
	* Get the last frame
	* @returns
	*/
	getFrame() {
		if (this._state === `disposed`) throw new Error(`Disposed`);
		switch (this._source) {
			case `camera`: return this.getFrameCamera();
			case `video`: return this.getFrameCamera();
			default: throw new Error(`source type unhandled ${this._source}`);
		}
	}
	/**
	* Get the timestamp of the processor (elapsed time since starting)
	* @returns
	*/
	getTimestamp() {
		return performance.now() - this._timer;
	}
	getFrameCamera() {
		return this._videoSourceCapture?.capture();
	}
};

//#endregion
//#region ../io/src/reconnecting-web-socket.ts
/**
* Maintains a web socket connection. Connects automatically.
* 
* The essential usage is:
* ```js
* import { reconnectingWebsocket } from '@ixfx/io.js'
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
* import { reconnectingWebsocket } from '@ixfx/io.js'
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
const reconnectingWebsocket = (url, opts = {}) => {
	const startDelayMs = intervalToMs(opts.startDelay, 2e3);
	const maxDelayMs = intervalToMs(opts.maxDelay, startDelayMs * 10);
	const checkStateMs = intervalToMs(opts.checkStateMs, 5e3);
	if (startDelayMs > maxDelayMs) throw new Error(`startDelay should be less than maxDelay`);
	if (checkStateMs < 0) throw new Error(`Param 'checkState' should be above zero`);
	let reconnect = true;
	let currentState = init({
		closed: `connecting`,
		open: `closed`,
		connecting: [`closed`, `open`]
	});
	let ws;
	const onError = (event_) => {
		if (opts.onError) opts.onError(event_);
		else {
			console.log(`rw on error`, event_);
			console.error(` error: ${event_.error}`);
			console.error(` type: ${event_.type}`);
			console.error(` error msg: ${event_.message}`);
		}
	};
	const onMessage = (message) => {
		if (opts.onMessage) opts.onMessage(message.data);
	};
	const connect = async () => {
		if (currentState.value === `connecting`) throw new Error(`Cannot connect twice`);
		currentState = to(currentState, `connecting`);
		if (ws !== void 0) {
			ws.removeEventListener(`error`, onError);
			if (opts.onMessage) ws.removeEventListener(`message`, onMessage);
			ws = void 0;
		}
		const retry = await retryTask({ async probe(_attempts) {
			try {
				const wss = new WebSocket(url);
				const r = await eventRace(wss, [`open`, `error`], { timeoutMs: 1e3 });
				return r.type === `open` ? {
					success: true,
					value: wss
				} : {
					success: false,
					error: `Could not open`
				};
			} catch (error) {
				return {
					success: false,
					error: getErrorMessage(error)
				};
			}
		} }, {
			predelayMs: startDelayMs,
			limitAttempts: opts.limitAttempts
		});
		ws = retry.value;
		let result = false;
		if (retry.success && ws) {
			if (opts.onMessage) {}
			result = true;
			currentState = to(currentState, `open`);
			if (opts.onConnected) opts.onConnected();
		} else currentState = to(currentState, `closed`);
		return result;
	};
	const send = (data) => {
		if (ws) if (ws.readyState === ws.OPEN) ws.send(data);
		else onDisconnected();
		else throw new Error(`Not connected`);
	};
	const onDisconnected = () => {
		if (currentState.value === `closed`) return;
		if (currentState.value === `open`) {
			currentState = to(currentState, `closed`);
			if (opts.onDisconnected) opts.onDisconnected();
		}
		if (reconnect && currentState.value !== `connecting`) {
			console.log(`Scheduling connect`);
			setTimeout(() => {
				connect();
			}, 100);
		}
	};
	const isConnected = () => {
		if (!ws) return false;
		return ws.readyState === ws.OPEN;
	};
	const close = () => {
		reconnect = false;
		currentState = to(currentState, `closed`);
		ws?.close();
		if (opts.onDisconnected) opts.onDisconnected();
	};
	const open = () => {
		reconnect = true;
		if (currentState.value === `open`) return Promise.resolve(true);
		if (currentState.value === `connecting`) return Promise.resolve(false);
		return connect();
	};
	connect();
	setInterval(() => {
		if (!ws) return;
		switch (ws.readyState) {
			case ws.CLOSED: {
				if (currentState.value === `open`) onDisconnected();
				break;
			}
		}
	}, checkStateMs);
	return {
		send,
		isConnected,
		close,
		open
	};
};

//#endregion
export { audio_exports as Audio, nordic_ble_device_exports as Bluetooth, camera_exports as Camera, Codec, espruino_exports as Espruino, FrameProcessor, serial_exports as Serial, StringReceiveBuffer, StringWriteBuffer, video_file_exports as VideoFile, genericStateTransitionsInstance, reconnectingWebsocket };
//# sourceMappingURL=io.js.map