import { __export } from "./chunk-Cl8Af3a2.js";

//#region ../packages/events/dist/src/race.js
/**
* Subscribes to events on `target`, returning the event data
* from the first event that fires.
*
* By default waits a maximum of 1 minute.
*
* Automatically unsubscribes on success or failure (ie. timeout)
*
* ```js
* // Event will be data from either event, whichever fires first
* // Exception is thrown if neither fires within 1 second
* const event = await eventRace(document.body, [`pointermove`, `pointerdown`], { timeout: 1000 });
* ```
* @param target Event source
* @param eventNames Event name(s)
* @param options Options
* @returns
*/
const eventRace = (target, eventNames, options = {}) => {
	const intervalMs = options.timeoutMs ?? 601e3;
	const signal = options.signal;
	let triggered = false;
	let disposed = false;
	let timeout;
	const promise = new Promise((resolve, reject) => {
		const onEvent = (event) => {
			if (`type` in event) if (eventNames.includes(event.type)) {
				triggered = true;
				resolve(event);
				dispose();
			} else console.warn(`eventRace: Got event '${event.type}' that is not in race list`);
			else {
				console.warn(`eventRace: Event data does not have expected 'type' field`);
				console.log(event);
			}
		};
		for (const name of eventNames) target.addEventListener(name, onEvent);
		const dispose = () => {
			if (disposed) return;
			if (timeout !== void 0) clearTimeout(timeout);
			timeout = void 0;
			disposed = true;
			for (const name of eventNames) target.removeEventListener(name, onEvent);
		};
		timeout = setTimeout(() => {
			if (triggered || disposed) return;
			dispose();
			reject(new Error(`eventRace: Events not fired within interval. Events: ${JSON.stringify(eventNames)} Interval: ${intervalMs}`));
		}, intervalMs);
		signal?.addEventListener(`abort`, () => {
			if (triggered || disposed) return;
			dispose();
			reject(new Error(`Abort signal received ${signal.reason}`));
		});
	});
	return promise;
};

//#endregion
//#region ../packages/events/dist/src/map-of.js
var MapOfSimple = class {
	#store = new Map();
	/**
	* Gets a copy of the underlying array storing values at `key`, or an empty array if
	* key does not exist
	* @param key
	* @returns
	*/
	get(key) {
		const arr = this.#store.get(key);
		if (!arr) return [];
		return [...arr];
	}
	/**
	* Returns the number of values stored under `key`
	* @param key
	* @returns
	*/
	size(key) {
		const arr = this.#store.get(key);
		if (!arr) return 0;
		return arr.length;
	}
	/**
	* Iterate over all values contained under `key`
	* @param key
	* @returns
	*/
	*iterateKey(key) {
		const arr = this.#store.get(key);
		if (!arr) return;
		yield* arr.values();
	}
	/**
	* Iterate all values, regardless of key
	*/
	*iterateValues() {
		for (const key of this.#store.keys()) yield* this.iterateKey(key);
	}
	/**
	* Iterate all keys
	*/
	*iterateKeys() {
		yield* this.#store.keys();
	}
	addKeyedValues(key, ...values) {
		let arr = this.#store.get(key);
		if (!arr) {
			arr = [];
			this.#store.set(key, arr);
		}
		arr.push(...values);
	}
	deleteKeyValue(key, value) {
		const arr = this.#store.get(key);
		if (!arr) return false;
		const arrCopy = arr.filter((v) => v !== value);
		if (arrCopy.length === arr.length) return false;
		this.#store.set(key, arrCopy);
		return true;
	}
	clear() {
		this.#store.clear();
	}
};

//#endregion
//#region ../packages/events/dist/src/simple-event-emitter.js
var SimpleEventEmitter = class {
	#listeners = new MapOfSimple();
	#disposed = false;
	dispose() {
		if (this.#disposed) return;
		this.clearEventListeners();
	}
	get isDisposed() {
		return this.#disposed;
	}
	/**
	* Fire event
	* @param type Type of event
	* @param args Arguments for event
	* @returns
	*/
	fireEvent(type, args) {
		if (this.#disposed) throw new Error(`Disposed`);
		for (const l of this.#listeners.iterateKey(type)) l(args, this);
	}
	/**
	* Adds event listener.
	*
	* @throws Error if emitter is disposed
	* @typeParam K - Events
	* @param name Event name
	* @param listener Event handler
	*/
	addEventListener(name, listener) {
		if (this.#disposed) throw new Error(`Disposed`);
		this.#listeners.addKeyedValues(name, listener);
	}
	/**
	* Remove event listener
	*
	* @param listener
	*/
	removeEventListener(type, listener) {
		if (this.#disposed) return;
		this.#listeners.deleteKeyValue(type, listener);
	}
	/**
	* Clear all event listeners
	* @private
	*/
	clearEventListeners() {
		if (this.#disposed) return;
		this.#listeners.clear();
	}
};

//#endregion
//#region src/events.ts
var events_exports = {};
__export(events_exports, {
	SimpleEventEmitter: () => SimpleEventEmitter,
	eventRace: () => eventRace
});

//#endregion
export { SimpleEventEmitter, eventRace, events_exports };
//# sourceMappingURL=events-DKUBV1tI.js.map