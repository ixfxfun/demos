import { __export } from "./chunk-51aI8Tpl.js";
import { resultIsError, resultToError } from "./numbers-C359_5A6.js";
import "./is-primitive-BDz6cwtd.js";
import "./records-XG4QHVXn.js";
import "./to-string-Dg1sJUf1.js";
import "./comparers-BtlnApnB.js";
import { isEqualContextString } from "./is-equal-edylSnsn.js";
import { findBySomeKey } from "./maps-a_ogDHUT.js";
import { compareData, getField, getPathsAndData, updateByPath } from "./pathed-4cNmhNti.js";
import { continuously } from "./continuously-CFHq8KyU.js";
import { elapsedInterval } from "./elapsed-DEWYfvwx.js";
import { afterMatch, beforeMatch, stringSegmentsWholeToEnd, stringSegmentsWholeToFirst, wildcard } from "./text-UM1t_CE6.js";
import "./is-integer-D1QCbjZ-.js";
import "./iterable-compare-values-shallow-DOeUS4hy.js";
import { intervalToMs } from "./interval-type-Y39UZyyQ.js";
import { getErrorMessage } from "./error-message-B6EPesrV.js";
import { sleep } from "./sleep-C2hKDgCi.js";
import { isAsyncIterable, isIterable, nextWithTimeout } from "./src-ibi35IYv.js";
import "./is-equal-y9du2FWU.js";
import "./unique-GmJPtLE_.js";
import "./simple-event-emitter-BWzQsKia.js";
import { timeout } from "./timeout-CUZsKULj.js";
import { DispatchList } from "./dispatch-list-Bz1mgWI4.js";
import "./queue-fns-C19iGLvT.js";
import { QueueMutable } from "./queue-mutable-Bcwm-_Hi.js";
import { init, to } from "./state-machine-BUeoIwqN.js";
import { resolveEl } from "./resolve-el-BdUlUJGi.js";
import { fromCss as fromCss$1, fromCss$1 as fromCss, toColour, toCssColour, toCssString } from "./conversion-7HnuMJUS.js";

//#region ../rx/dist/src/from/function.js
/**
* Produces a reactive from the basis of a function. `callback` is executed, with its result emitted via the returned reactive.
*
* ```js
* // Produce a random number every second
* const r = Rx.From.func(Math.random, { interval: 1000 });
* ```
*
* `callback` can be called repeatedly by providing the `interval` option to set the rate of repeat.
* Looping can be limited with `options.maximumRepeats`, or passing a signal `options.signal`
* and then activating it.
* ```js
* // Reactive that emits a random number every second, five times
* const r1 = Rx.From.func(Math.random, { interval: 1000, maximumRepeats: 5 }
* ```
*
* ```js
* // Generate a random number every second until ac.abort() is called
* const ac = new AbortController();
* const r2 = Rx.From.func(Math.random, { interval: 1000, signal: ac.signal });
* ```
*
* The third option is for `callback` to fire the provided abort function.
* ```js
* Rx.From.func((abort) => {
*  if (Math.random() > 0.5) abort('Random exit');
*  return 1;
* });
* ```
*
* By default has a laziness of 'very' meaning that `callback` is run only when there's a subscriber
* By default stream closes if `callback` throws an error. Use `options.closeOnError:'ignore'` to change.
* @param callback
* @param options
* @returns
*/
function func(callback, options = {}) {
	const maximumRepeats = options.maximumRepeats ?? Number.MAX_SAFE_INTEGER;
	const closeOnError = options.closeOnError ?? true;
	const intervalMs = options.interval ? intervalToMs(options.interval) : -1;
	let manual$1 = options.manual ?? false;
	if (options.interval === void 0 && options.manual === void 0) manual$1 = true;
	if (manual$1 && options.interval) throw new Error(`If option 'manual' is set, option 'interval' cannot be used`);
	const predelay = intervalToMs(options.predelay, 0);
	const lazy = options.lazy ?? `very`;
	const signal = options.signal;
	const internalAbort = new AbortController();
	const internalAbortCallback = (reason) => {
		internalAbort.abort(reason);
	};
	let sentResults = 0;
	let enabled = false;
	const done = (reason) => {
		events.dispose(reason);
		enabled = false;
		if (run) run.cancel();
	};
	const ping = async () => {
		if (!enabled) return false;
		if (predelay) await sleep(predelay);
		if (sentResults >= maximumRepeats) {
			done(`Maximum repeats reached ${maximumRepeats.toString()}`);
			return false;
		}
		try {
			if (signal?.aborted) {
				done(`Signal (${signal.aborted})`);
				return false;
			}
			const value = await callback(internalAbortCallback);
			sentResults++;
			events.set(value);
			return true;
		} catch (error) {
			if (closeOnError) {
				done(`Function error: ${getErrorMessage(error)}`);
				return false;
			} else {
				events.signal(`warn`, getErrorMessage(error));
				return true;
			}
		}
	};
	const run = manual$1 ? void 0 : continuously(async () => {
		const pingResult = await ping();
		if (!pingResult) return false;
		if (internalAbort.signal.aborted) {
			done(`callback function aborted (${internalAbort.signal.reason})`);
			return false;
		}
	}, intervalMs);
	const events = initLazyStream({
		lazy,
		onStart() {
			enabled = true;
			if (run) run.start();
		},
		onStop() {
			enabled = false;
			if (run) run.cancel();
		}
	});
	if (lazy === `never` && run) run.start();
	return {
		...events,
		ping
	};
}

//#endregion
//#region ../rx/dist/src/from/iterator.js
/**
* Creates a Reactive from an AsyncGenerator or Generator
* @param gen
* @returns
*/
/**
* Creates a readable reactive based on a (async)generator or iterator
* ```js
* // Generator a random value every 5 seconds
* const valuesOverTime = Flow.interval(() => Math.random(), 5000);
* // Wrap the generator
* const r = Rx.From.iterator(time);
* // Get notified when there is a new value
* r.onValue(v => {
*   console.log(v);
* });
* ```
*
* Awaiting values could potentially hang code. Thus there is a `readTimeout`, the maximum time to wait for a value from the generator. Default: 5 minutes.
* If `signal` is given, this will also cancel waiting for the value.
* @param source
*/
function iterator(source, options = {}) {
	const lazy = options.lazy ?? `very`;
	const log = options.traceLifecycle ? (message) => {
		console.log(`Rx.From.iterator ${message}`);
	} : (_) => {};
	const readIntervalMs = intervalToMs(options.readInterval, 5);
	const readTimeoutMs = intervalToMs(options.readTimeout, 300 * 1e3);
	const whenStopped = options.whenStopped ?? `continue`;
	let iterator$1;
	let ourAc;
	let sm = init({
		idle: [`wait_for_next`],
		wait_for_next: [
			`processing_result`,
			`stopping`,
			`disposed`
		],
		processing_result: [
			`queued`,
			`disposed`,
			`stopping`
		],
		queued: [
			`wait_for_next`,
			`disposed`,
			`stopping`
		],
		stopping: `idle`,
		disposed: null
	}, `idle`);
	const onExternalSignal = () => {
		log(`onExternalSignal`);
		ourAc?.abort(options.signal?.reason);
	};
	if (options.signal) options.signal.addEventListener(`abort`, onExternalSignal, { once: true });
	const read = async () => {
		log(`read. State: ${sm.value}`);
		ourAc = new AbortController();
		try {
			sm = to(sm, `wait_for_next`);
			const v = await nextWithTimeout(iterator$1, {
				signal: ourAc.signal,
				millis: readTimeoutMs
			});
			sm = to(sm, `processing_result`);
			ourAc.abort(`nextWithTimeout completed`);
			if (v.done) {
				log(`read v.done true`);
				events.dispose(`Generator complete`);
				sm = to(sm, `disposed`);
			}
			if (sm.value === `stopping`) {
				log(`read. sm.value = stopping`);
				sm = to(sm, `idle`);
				return;
			}
			if (sm.value === `disposed`) {
				log(`read. sm.value = disposed`);
				return;
			}
			events.set(v.value);
		} catch (error) {
			events.dispose(`Generator error: ${error.toString()}`);
			return;
		}
		if (sm.value === `processing_result`) {
			sm = to(sm, `queued`);
			log(`scheduling read. State: ${sm.value}`);
			setTimeout(read, readIntervalMs);
		} else sm = to(sm, `idle`);
	};
	const events = initLazyStream({
		...options,
		lazy,
		onStart() {
			log(`onStart state: ${sm.value} whenStopped: ${whenStopped}`);
			if (sm.value !== `idle`) return;
			if (sm.value === `idle` && whenStopped === `reset` || iterator$1 === void 0) iterator$1 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
			read();
		},
		onStop() {
			log(`onStop state: ${sm.value} whenStopped: ${whenStopped}`);
			sm = to(sm, `stopping`);
			if (whenStopped === `reset`) {
				log(`onStop reiniting iterator`);
				iterator$1 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
			}
		},
		onDispose(reason) {
			log(`onDispose (${reason})`);
			ourAc?.abort(`Rx.From.iterator disposed (${reason})`);
			if (options.signal) options.signal.removeEventListener(`abort`, onExternalSignal);
		}
	});
	return events;
}

//#endregion
//#region ../rx/dist/src/util.js
function messageIsSignal(message) {
	if (message.value !== void 0) return false;
	if (`signal` in message && message.signal !== void 0) return true;
	return false;
}
/**
* Returns _true_ if `v` has a non-undefined value. Note that sometimes
* _undefined_ is a legal value to pass
* @param v
* @returns
*/
function messageHasValue(v) {
	if (v.value !== void 0) return true;
	return false;
}
const hasLast = (rx) => {
	if (!isReactive(rx)) return false;
	if (`last` in rx) {
		const v = rx.last();
		if (v !== void 0) return true;
	}
	return false;
};
/**
* Returns _true_ if `rx` is a Reactive
* @param rx
* @returns
*/
const isReactive = (rx) => {
	if (typeof rx !== `object`) return false;
	if (rx === null) return false;
	return `on` in rx && `onValue` in rx;
};
const isWrapped = (v) => {
	if (typeof v !== `object`) return false;
	if (!(`source` in v)) return false;
	if (!(`annotate` in v)) return false;
	return true;
};

//#endregion
//#region ../rx/dist/src/resolve-source.js
/**
* Resolves various kinds of sources into a Reactive.
* If `source` is an iterable/generator, it gets wrapped via `generator()`.
*
* Default options:
* * generator: `{ lazy: true, interval: 5 }`
* @param source
* @returns
*/
const resolveSource = (source, options = {}) => {
	if (isReactive(source)) return source;
	const generatorOptions = options.generator ?? {
		lazy: `initial`,
		interval: 5
	};
	const functionOptions = options.function ?? { lazy: `very` };
	if (Array.isArray(source)) return iterator(source.values(), generatorOptions);
	else if (typeof source === `function`) return func(source, functionOptions);
	else if (typeof source === `object`) {
		if (isWrapped(source)) return source.source;
		if (isIterable(source) || isAsyncIterable(source)) return iterator(source, generatorOptions);
	}
	throw new TypeError(`Unable to resolve source. Supports: array, Reactive, Async/Iterable. Got type: ${typeof source}`);
};

//#endregion
//#region ../rx/dist/src/init-stream.js
/**
* Initialise a stream based on an upstream source.
* Calls initLazyStream under the hood.
*
* Options:
* * onValue: called when upstream emits a value (default: does nothing with upstream value)
* * lazy: laziness of stream (default: 'initial')
* * disposeIfSourceDone: disposes stream if upstream disposes (default: true)
* @ignore
* @param upstreamSource
* @param options
* @returns
*/
function initUpstream(upstreamSource, options) {
	const lazy = options.lazy ?? `initial`;
	const disposeIfSourceDone = options.disposeIfSourceDone ?? true;
	const onValue = options.onValue ?? ((_v) => {});
	const source = resolveSource(upstreamSource);
	let unsub;
	const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
	const onStop = () => {
		if (unsub === void 0) return;
		unsub();
		unsub = void 0;
		if (options.onStop) options.onStop();
	};
	const onStart = () => {
		if (unsub !== void 0) return;
		if (options.onStart) options.onStart();
		unsub = source.on((value) => {
			if (messageIsSignal(value)) if (value.signal === `done`) {
				onStop();
				events.signal(value.signal, value.context);
				if (disposeIfSourceDone) events.dispose(`Upstream source ${debugLabel} has completed (${value.context ?? ``})`);
			} else events.signal(value.signal, value.context);
			else if (messageHasValue(value)) onValue(value.value);
		});
	};
	const events = initLazyStream({
		...options,
		lazy,
		onStart,
		onStop
	});
	return events;
}
/**
* Initialises a lazy stream
* Consider also: {@link initLazyStreamWithInitial}
*
* @param options
* @returns
*/
function initLazyStream(options) {
	const lazy = options.lazy ?? `initial`;
	const onStop = options.onStop ?? (() => {});
	const onStart = options.onStart ?? (() => {});
	const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
	const events = initStream({
		...options,
		onFirstSubscribe() {
			if (lazy !== `never`) onStart();
		},
		onNoSubscribers() {
			if (lazy === `very`) onStop();
		}
	});
	if (lazy === `never`) onStart();
	return events;
}
/**
* Initialises a new stream.
*
* Options:
* * onFirstSubscribe: Called when there is a subscriber after there have been no subscribers.
* * onNoSubscribers: Called when there are no more subscribers. 'onFirstSubscriber' will be called next time a subscriber is added.
*
* Alternatives:
* * {@link initLazyStream} - a stream with callbacks for when there is some/none subscribers
* @ignore
* @param options
* @returns
*/
function initStream(options = {}) {
	let dispatcher;
	let disposed = false;
	let firstSubscribe = false;
	let emptySubscriptions = true;
	const onFirstSubscribe = options.onFirstSubscribe ?? void 0;
	const onNoSubscribers = options.onNoSubscribers ?? void 0;
	const debugLabel = options.debugLabel ? `[${options.debugLabel}]` : ``;
	const isEmpty = () => {
		if (dispatcher === void 0) return;
		if (!dispatcher.isEmpty) return;
		if (!emptySubscriptions) {
			emptySubscriptions = true;
			firstSubscribe = false;
			if (onNoSubscribers) onNoSubscribers();
		}
	};
	const subscribe = (handler) => {
		if (disposed) throw new Error(`Disposed, cannot subscribe ${debugLabel}`);
		if (dispatcher === void 0) dispatcher = new DispatchList();
		const id = dispatcher.add(handler);
		emptySubscriptions = false;
		if (!firstSubscribe) {
			firstSubscribe = true;
			if (onFirstSubscribe) onFirstSubscribe();
		}
		return () => {
			dispatcher?.remove(id);
			isEmpty();
		};
	};
	return {
		dispose: (reason) => {
			if (disposed) return;
			dispatcher?.notify({
				value: void 0,
				signal: `done`,
				context: `Disposed: ${reason}`
			});
			disposed = true;
			if (options.onDispose) options.onDispose(reason);
		},
		isDisposed: () => {
			return disposed;
		},
		removeAllSubscribers: () => {
			dispatcher?.clear();
			isEmpty();
		},
		set: (v) => {
			if (disposed) throw new Error(`${debugLabel} Disposed, cannot set`);
			dispatcher?.notify({ value: v });
		},
		signal: (signal, context) => {
			if (disposed) throw new Error(`${debugLabel} Disposed, cannot signal`);
			dispatcher?.notify({
				signal,
				value: void 0,
				context
			});
		},
		on: (handler) => subscribe(handler),
		onValue: (handler) => {
			const unsub = subscribe((message) => {
				if (messageHasValue(message)) handler(message.value);
			});
			return unsub;
		}
	};
}

//#endregion
//#region ../rx/dist/src/from/object.js
/**
* Creates a Reactive wrapper with the shape of the input object.
*
* Changing the wrapped object directly does not update the Reactive.
* Instead, to update values use:
* * `set()`, 'resets' the whole object
* * `update()` changes a particular field
*
* Consider using {@link From.objectProxy} to return a object with properties that can be
* set in the usual way yet is also Reactive.
*
* ```js
* const o = Rx.From.object({ name: `bob`, level: 2 });
* o.onValue(changed => {
* });
* o.set({ name: `mary`, level: 3 });
*
* // `onValue` will get called, with `changed` having a value of:
* // { name: `mary`, level: 3 }
* ```
*
* Use `last()` to get the most recently set value.
*
* `onDiff` subscribes to a rough diff of the object.
*
* ```js
* const o = Rx.From.object({ name: `bob`, level: 2 });
* o.onDiff(diffValue => {
*  const diff = diffValue.value;
* })
* o.set({ name: `mary`, level: 3 });
*
* // onDiff would fire with `diff` of:
* [
*  { path: `name`, previous: `bob`, value: `mary` },
*  { path: `level`, previous: 2, value: 3 }
* ]
* ```
*
* You can also listen to updates on a field via `onField`.
* ```js
* o.onField(`name`, value => {
*  // Called whenever the 'name' field is updated
* });
* ```
* @param initialValue  Initial value
* @param options Options
* @returns
*/
function object(initialValue, options = {}) {
	const eq = options.eq ?? isEqualContextString;
	const setEvent = initStream();
	const diffEvent = initStream();
	const fieldChangeEvents = [];
	let value = initialValue;
	let disposed = false;
	const set = (v) => {
		const diff = [...compareData(value ?? {}, v, {
			...options,
			includeMissingFromA: true
		})];
		if (diff.length === 0) return;
		value = v;
		setEvent.set(v);
		diffEvent.set(diff);
	};
	const fireFieldUpdate = (field, value$1) => {
		for (const [matcher, pattern, list] of fieldChangeEvents) if (matcher(field)) list.notify({
			fieldName: field,
			pattern,
			value: value$1
		});
	};
	const updateCompareOptions = {
		asPartial: true,
		includeParents: true
	};
	const update = (toMerge) => {
		if (value === void 0) {
			value = toMerge;
			setEvent.set(value);
			for (const [k, v] of Object.entries(toMerge)) fireFieldUpdate(k, v);
			return value;
		} else {
			const diff = [...compareData(value, toMerge, updateCompareOptions)];
			if (diff.length === 0) return value;
			value = {
				...value,
				...toMerge
			};
			setEvent.set(value);
			diffEvent.set(diff);
			for (const d of diff) fireFieldUpdate(d.path, d.value);
			return value;
		}
	};
	const updateField = (path, valueForField) => {
		if (value === void 0) throw new Error(`Cannot update value when it has not already been set`);
		const existing = getField(value, path);
		if (resultIsError(existing)) throw resultToError(existing);
		if (eq(existing.value, valueForField, path)) return;
		let diff = [...compareData(existing.value, valueForField, {
			...options,
			includeMissingFromA: true
		})];
		diff = diff.map((d) => {
			if (d.path.length > 0) return {
				...d,
				path: path + `.` + d.path
			};
			return {
				...d,
				path
			};
		});
		const o = updateByPath(value, path, valueForField, true);
		value = o;
		setEvent.set(o);
		diffEvent.set(diff);
		fireFieldUpdate(path, valueForField);
	};
	const dispose = (reason) => {
		if (disposed) return;
		diffEvent.dispose(reason);
		setEvent.dispose(reason);
		disposed = true;
	};
	return {
		dispose,
		isDisposed() {
			return disposed;
		},
		updateField,
		last: () => value,
		on: setEvent.on,
		onValue: setEvent.onValue,
		onDiff: diffEvent.onValue,
		onField(fieldPattern, handler) {
			const matcher = wildcard(fieldPattern);
			const listeners = new DispatchList();
			fieldChangeEvents.push([
				matcher,
				fieldPattern,
				listeners
			]);
			const id = listeners.add(handler);
			return () => listeners.remove(id);
		},
		set,
		update
	};
}

//#endregion
//#region ../rx/dist/src/to-readable.js
/***
* Returns a read-only version of `stream`
*/
const toReadable = (stream) => ({
	on: stream.on,
	dispose: stream.dispose,
	isDisposed: stream.isDisposed,
	onValue: stream.onValue
});

//#endregion
//#region ../rx/dist/src/from/event.js
/**
* Subscribes to an event, emitting data
*
* @example Print x,y position of mouse as it moves
* ```js
* const r = Rx.From.event(document, `pointermove`);
* r.onValue(event => {
*  const { x, y } = event;
* });
* ```
*
* If `options.lazy` is _true_ (default: _false_), event will only be subscribed to when the stream
* itself has a subscriber.
*
* `options.debugFiring` and `options.debugLifecycle` can be turned on to troubleshoot behaviour
* of the stream if necessary.
* @param targetOrQuery Event emitter, HTML element or string. If a string, it will be queryed as a selector.
* @param name Event name
* @param options Options
* @returns
*/
function event(targetOrQuery, name, initialValue, options = {}) {
	let target;
	if (typeof targetOrQuery === `string`) {
		target = document.querySelector(targetOrQuery);
		if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
	} else target = targetOrQuery;
	if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
	const debugLifecycle = options.debugLifecycle ?? false;
	const debugFiring = options.debugFiring ?? false;
	const diff = options.diff ?? false;
	const lazy = options.lazy ?? false;
	if (initialValue === void 0) initialValue = {};
	const rxObject = object(initialValue, { deepEntries: true });
	let eventAdded = false;
	let disposed = false;
	const callback = (args) => {
		if (debugFiring) console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
		rxObject.set(args);
	};
	const remove = () => {
		if (!eventAdded) return;
		eventAdded = false;
		target.removeEventListener(name, callback);
		if (debugLifecycle) console.log(`Rx.From.event remove '${name}'`);
	};
	const add = () => {
		if (eventAdded) return;
		eventAdded = true;
		target.addEventListener(name, callback);
		if (debugLifecycle) console.log(`Rx.From.event add '${name}'`);
	};
	if (!lazy) add();
	return {
		last: () => {
			if (lazy) add();
			return rxObject.last();
		},
		dispose: (reason) => {
			if (disposed) return;
			disposed = true;
			remove();
			rxObject.dispose(reason);
		},
		isDisposed() {
			return disposed;
		},
		on: (handler) => {
			if (lazy) add();
			return rxObject.on(handler);
		},
		onValue: (handler) => {
			if (lazy) add();
			return rxObject.onValue(handler);
		}
	};
}
/**
* Emits a value whenever event happens.
* Data emitted is `{ sinceLast, total }`, where 'sinceLast'
* is milliseconds since last event and 'total' is total number of
* times event has been fired.
* @param targetOrQuery
* @param name
* @param options
* @returns
*/
function eventTrigger(targetOrQuery, name, options = {}) {
	let target;
	if (typeof targetOrQuery === `string`) {
		target = document.querySelector(targetOrQuery);
		if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
	} else target = targetOrQuery;
	if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
	const debugLifecycle = options.debugLifecycle ?? false;
	const debugFiring = options.debugFiring ?? false;
	const fireInitial = options.fireInitial ?? false;
	let count = 0;
	const elapsed = elapsedInterval();
	const stream = initLazyStream({
		lazy: options.lazy ?? `very`,
		onStart() {
			target.addEventListener(name, callback);
			if (debugLifecycle) console.log(`Rx.From.eventTrigger add '${name}'`);
			if (fireInitial && count === 0) {
				if (debugLifecycle || debugFiring) console.log(`Rx.From.eventTrigger: firing initial`);
				callback();
			}
		},
		onStop() {
			target.removeEventListener(name, callback);
			if (debugLifecycle) console.log(`Rx.From.eventTrigger remove '${name}'`);
		}
	});
	const callback = (_args) => {
		if (debugFiring) console.log(`Rx.From.eventTrigger '${name}' triggered'`);
		stream.set({
			sinceLast: elapsed(),
			total: ++count
		});
	};
	return stream;
}

//#endregion
//#region ../rx/dist/src/ops/transform.js
/**
* Transforms values from `source` using the `transformer` function.
* @param transformer
* @returns
*/
function transform(input, transformer, options = {}) {
	const traceInput = options.traceInput ?? false;
	const traceOutput = options.traceOutput ?? false;
	const upstream = initUpstream(input, {
		lazy: `initial`,
		...options,
		onValue(value) {
			const t = transformer(value);
			if (traceInput && traceOutput) console.log(`Rx.Ops.transform input: ${JSON.stringify(value)} output: ${JSON.stringify(t)}`);
			else if (traceInput) console.log(`Rx.Ops.transform input: ${JSON.stringify(value)}`);
			else if (traceOutput) console.log(`Rx.Ops.transform output: ${JSON.stringify(t)}`);
			upstream.set(t);
		}
	});
	return toReadable(upstream);
}

//#endregion
//#region ../rx/dist/src/reactives/debounce.js
/**
* Debounce waits for `elapsed` time after the last received value before emitting it.
*
* If a flurry of values are received that are within the interval, it won't emit anything. But then
* as soon as there is a gap in the messages that meets the interval, the last received value is sent out.
*
* `debounce` always emits with at least `elapsed` as a delay after a value received. While {@link throttle} potentially
* sends immediately, if it's outside of the elapsed period.
*
* This is a subtly different logic to {@link throttle}. `throttle` more eagerly sends the first value, potentially
* not sending later values. `debouce` however will send later values, potentially ignoring earlier ones.
* @param source
* @param options
* @returns
*/
function debounce$1(source, options = {}) {
	const elapsed = intervalToMs(options.elapsed, 50);
	let lastValue;
	const timer = timeout(() => {
		const v = lastValue;
		if (v) {
			upstream.set(v);
			lastValue = void 0;
		}
	}, elapsed);
	const upstream = initUpstream(source, {
		...options,
		onValue(value) {
			lastValue = value;
			timer.start();
		}
	});
	return toReadable(upstream);
}

//#endregion
//#region ../rx/dist/src/ops/debounce.js
function debounce(options) {
	return (source) => {
		return debounce$1(source, options);
	};
}

//#endregion
//#region ../rx/dist/src/index.js
/**
* Initialises a reactive that pipes values to listeners directly.
* @returns
*/
function manual(options = {}) {
	const events = initStream(options);
	return {
		dispose: events.dispose,
		isDisposed: events.isDisposed,
		set(value) {
			events.set(value);
		},
		on: events.on,
		onValue: events.onValue
	};
}

//#endregion
//#region ../rx/dist/src/from/observable.js
/**
* Creates a RxJs style observable
* ```js
* const o = observable(stream => {
*  // Code to run for initialisation when we go from idle to at least one subscriber
*  // Won't run again for additional subscribers, but WILL run again if we lose
*  // all subscribers and then get one
*
*  // To send a value:
*  stream.set(someValue);
*
*   // Optional: return function to call when all subscribers are removed
*   return () => {
*     // Code to run when all subscribers are removed
*   }
* });
* ```
*
* For example:
* ```js
* const xy = observable<(stream => {
*  // Send x,y coords from PointerEvent
*  const send = (event) => {
*    stream.set({ x: event.x, y: event.y });
*  }
*  window.addEventListener(`pointermove`, send);
*  return () => {
*    // Unsubscribe
*    window.removeEventListener(`pointermove`, send);
*  }
* });
*
* xy.onValue(value => {
*  console.log(value);
* });
* ```
* @param init
* @returns
*/
function observable(init$1) {
	const ow = observableWritable(init$1);
	return {
		dispose: ow.dispose,
		isDisposed: ow.isDisposed,
		on: ow.on,
		onValue: ow.onValue
	};
}
/**
* As {@link observable}, but returns a Reactive that allows writing
* @param init
* @returns
*/
function observableWritable(init$1) {
	let onCleanup = () => {};
	const ow = manual({
		onFirstSubscribe() {
			onCleanup = init$1(ow);
		},
		onNoSubscribers() {
			if (onCleanup) onCleanup();
		}
	});
	return {
		...ow,
		onValue: (callback) => {
			return ow.on((message) => {
				if (messageHasValue(message)) callback(message.value);
			});
		}
	};
}

//#endregion
//#region ../ui/src/rx/browser-resize.ts
/**
* Observe when element resizes. Specify `interval` to debounce, uses 100ms by default.
*
* ```
* const o = resizeObservable(myEl, 500);
* o.subscribe(() => {
*  // called 500ms after last resize
* });
* ```
* @param elem
* @param interval Tiemout before event gets triggered
* @returns
*/
const browserResizeObservable = (elem, interval) => {
	if (elem === null) throw new Error(`Param 'elem' is null. Expected element to observe`);
	if (elem === void 0) throw new Error(`Param 'elem' is undefined. Expected element to observe`);
	const m = observable((stream) => {
		const ro = new ResizeObserver((entries) => {
			stream.set(entries);
		});
		ro.observe(elem);
		return () => {
			ro.unobserve(elem);
		};
	});
	return debounce({ elapsed: interval ?? 100 })(m);
};
/**
* Returns an Reactive for window resize. Default 100ms debounce.
* @param elapsed
* @returns
*/
const windowResize = (elapsed) => debounce({ elapsed: elapsed ?? 100 })(event(window, `resize`, {
	innerWidth: 0,
	innerHeight: 0
}));

//#endregion
//#region ../ui/src/rx/browser-theme-change.ts
/**
* Observe when a class changes on a target element, by default the document.
* Useful for tracking theme changes.
*
* ```js
* const c = cssClassChange();
* c.on(msg => {
*  // some class has changed on the document
* });
* ```
*/
const cssClassChange = (target = document.documentElement) => {
	const m = observable((stream) => {
		const ro = new MutationObserver((entries) => {
			stream.set(entries);
		});
		const opts = {
			attributeFilter: [`class`],
			attributes: true
		};
		ro.observe(target, opts);
		return () => {
			ro.disconnect();
		};
	});
	return m;
};

//#endregion
//#region ../ui/src/rx/colour.ts
function colour(initialValue) {
	let value = initialValue;
	const events = initStream();
	const set = (v) => {
		value = v;
		events.set(v);
	};
	return {
		dispose: events.dispose,
		isDisposed: events.isDisposed,
		last: () => value,
		on: events.on,
		onValue: events.onValue,
		set,
		setHsl: (hsl) => {
			set(hsl);
		}
	};
}

//#endregion
//#region ../ui/src/rx/dom-source.ts
/**
* Reactive getting/setting of values to a HTML INPUT element.
* 
* Options:
* - relative: if _true_, values are 0..1 (default: false)
* - inverted: if _true_, values are 1..0 (default: false)
* 
* If element is missing a 'type' attribute, this will be set to 'range'.
* @param targetOrQuery 
* @param options 
* @returns 
*/
function domNumberInputValue(targetOrQuery, options = {}) {
	const input = domInputValue(targetOrQuery, options);
	const el = input.el;
	const relative = options.relative ?? false;
	const inverted = options.inverted ?? false;
	const rx = transform(input, (v) => {
		return Number.parseFloat(v);
	});
	if (relative) {
		el.max = inverted ? "0" : "1";
		el.min = inverted ? "1" : "0";
		if (!el.hasAttribute(`step`)) el.step = "0.1";
	}
	if (el.getAttribute(`type`) === null) el.type = `range`;
	const set = (value) => {
		input.set(value.toString());
	};
	return {
		...rx,
		last() {
			return Number.parseFloat(input.last());
		},
		set
	};
}
function domHslInputValue(targetOrQuery, options = {}) {
	const input = domInputValue(targetOrQuery, {
		...options,
		upstreamFilter: (value) => {
			return typeof value === `object` ? toCssColour(value) : value;
		}
	});
	const rx = transform(input, (v) => {
		return fromCss(v, {
			scalar: true,
			ensureSafe: true
		});
	});
	return {
		...rx,
		last() {
			return fromCss(input.last(), {
				scalar: true,
				ensureSafe: true
			});
		},
		set(value) {
			input.set(toCssString(value));
		}
	};
}
/**
* A stream of values when the a HTMLInputElement changes. Eg a <input type="range">
* ```js
* const r = Rx.From.domInputValue(`#myEl`);
* r.onValue(value => {
*  // value will be string
* });
* ```
* 
* Options:
* * emitInitialValue: If _true_ emits the HTML value of element (default: false)
* * attributeName: If set, this is the HTML attribute value is set to when writing to stream (default: 'value')
* * fieldName: If set, this is the DOM object field set when writing to stream (default: 'value')
* * when: 'changed'|'changing' when values are emitted. (default: 'changed')
* * fallbackValue:  Fallback value to use if field/attribute cannot be read (default: '')
* @param targetOrQuery 
* @param options 
* @returns 
*/
function domInputValue(targetOrQuery, options = {}) {
	const target = typeof targetOrQuery === `string` ? document.querySelector(targetOrQuery) : targetOrQuery;
	if (target === null && typeof targetOrQuery === `string`) throw new Error(`Element query could not be resolved '${targetOrQuery}'`);
	if (target === null) throw new Error(`targetOrQuery is null`);
	const el = resolveEl(targetOrQuery);
	const when = options.when ?? `changed`;
	const eventName = when === `changed` ? `change` : `input`;
	const emitInitialValue = options.emitInitialValue ?? false;
	const fallbackValue = options.fallbackValue ?? ``;
	const upstreamSource = options.upstreamSource;
	let upstreamSourceUnsub = () => {};
	let attribName = options.attributeName;
	let fieldName = options.fieldName;
	if (fieldName === void 0 && attribName === void 0) attribName = fieldName = `value`;
	const readValue = () => {
		let value;
		if (attribName) value = el.getAttribute(attribName);
		if (fieldName) value = el[fieldName];
		if (value === void 0 || value === null) value = fallbackValue;
		return value;
	};
	const setValue = (value) => {
		if (attribName) el.setAttribute(attribName, value);
		if (fieldName) el[fieldName] = value;
	};
	const setUpstream = (v) => {
		v = options.upstreamFilter ? options.upstreamFilter(v) : v;
		setValue(v);
	};
	if (upstreamSource) {
		upstreamSourceUnsub = upstreamSource.onValue(setUpstream);
		if (hasLast(upstreamSource)) setUpstream(upstreamSource.last());
	}
	const rxEvents = eventTrigger(el, eventName, {
		fireInitial: emitInitialValue,
		debugFiring: options.debugFiring ?? false,
		debugLifecycle: options.debugLifecycle ?? false
	});
	const rxValues = transform(rxEvents, (_trigger) => readValue());
	return {
		...rxValues,
		el,
		last() {
			return readValue();
		},
		set(value) {
			setValue(value);
		},
		dispose(reason) {
			upstreamSourceUnsub();
			rxValues.dispose(reason);
			rxEvents.dispose(reason);
		}
	};
}
/**
* Listens for data changes from elements within a HTML form element.
* Input elements must have a 'name' attribute.
* 
* Simple usage:
* ```js
* const rx = Rx.From.domForm(`#my-form`);
* rx.onValue(value => {
*  // Object containing values from form
* });
* 
* rx.last(); // Read current values of form
* ```
* 
* UI can be updated
* ```js
* // Set using an object of key-value pairs
* rx.set({
*  size: 'large'
* });
* 
* // Or set a single name-value pair
* rx.setNamedValue(`size`, `large`);
* ```
* 
* If an 'upstream' reactive is provided, this is used to set initial values of the UI, overriding
* whatever may be in the HTML. Upstream changes modify UI elements, but UI changes do not modify the upstream
* source.
* 
* ```js
* // Create a reactive object
* const obj = Rx.From.object({
*  when: `2024-10-03`,
*  size: 12,
*  checked: true
* });
* 
* // Use this as initial values for a HTML form
* // (assuming appropriate INPUT/SELECT elements exist)
* const rx = Rx.From.domForm(`form`, { 
*  upstreamSource: obj
* });
* 
* // Listen for changes in the UI
* rx.onValue(value => {
*  
* });
* ```
* @param formElOrQuery 
* @param options 
* @returns 
*/
function domForm(formElOrQuery, options = {}) {
	const formEl = resolveEl(formElOrQuery);
	const when = options.when ?? `changed`;
	const eventName = when === `changed` ? `change` : `input`;
	const emitInitialValue = options.emitInitialValue ?? false;
	const upstreamSource = options.upstreamSource;
	const typeHints = /* @__PURE__ */ new Map();
	let upstreamSourceUnsub = () => {};
	const readValue = () => {
		const fd = new FormData(formEl);
		const entries = [];
		for (const [k, v] of fd.entries()) {
			const vString = v.toString();
			let typeHint = typeHints.get(k);
			if (!typeHint) {
				const el = getFormElement(k, vString);
				if (el) {
					if (el.type === `range` || el.type === `number`) typeHint = `number`;
					else if (el.type === `color`) typeHint = `colour`;
					else if (el.type === `checkbox` && (v === `true` || v === `on`)) typeHint = `boolean`;
					else typeHint = `string`;
					typeHints.set(k, typeHint);
				}
			}
			if (typeHint === `number`) entries.push([k, Number.parseFloat(vString)]);
			else if (typeHint === `boolean`) {
				const vBool = vString === `true` ? true : false;
				entries.push([k, vBool]);
			} else if (typeHint === `colour`) {
				const vRgb = toCssColour(vString);
				entries.push([k, fromCss$1(vRgb, { scalar: false })]);
			} else entries.push([k, v.toString()]);
		}
		for (const el of formEl.querySelectorAll(`input[type="checkbox"]`)) if (!el.checked && el.value === `true`) entries.push([el.name, false]);
		const asObject = Object.fromEntries(entries);
		return asObject;
	};
	const getFormElement = (name, value) => {
		const el = formEl.querySelector(`[name="${name}"]`);
		if (!el) {
			console.warn(`Form does not contain an element with name="${name}"`);
			return;
		}
		if (el.type === `radio`) {
			const radioEl = formEl.querySelector(`[name="${name}"][value="${value}"]`);
			if (!radioEl) {
				console.warn(`Form does not contain radio option for name=${name} value=${value}`);
				return;
			}
			return radioEl;
		}
		return el;
	};
	const setNamedValue = (name, value) => {
		const el = getFormElement(name, value);
		if (!el) return;
		if (el.nodeName === `INPUT` || el.nodeName === `SELECT`) {
			if (el.type === `color`) {
				if (typeof value === `object`) value = toCssColour(value);
			} else if (el.type === `checkbox`) if (typeof value === `boolean`) {
				el.checked = value;
				return;
			} else console.warn(`Rx.Sources.domForm: Trying to set non boolean type to a checkbox. Name: ${name} Value: ${value} (${typeof value})`);
			else if (el.type === `radio`) {
				el.checked = true;
				return;
			}
			el.value = value;
		}
	};
	const setFromUpstream = (value) => {
		for (const [name, v] of Object.entries(value)) {
			let hint = typeHints.get(name);
			if (!hint) {
				hint = typeof v;
				if (hint === `object`) {
					const rgb = toColour(v);
					hint = `colour`;
				}
				typeHints.set(name, hint);
			}
			const valueFiltered = options.upstreamFilter ? options.upstreamFilter(name, v) : v;
			setNamedValue(name, valueFiltered);
		}
	};
	if (upstreamSource) {
		upstreamSourceUnsub = upstreamSource.onValue(setFromUpstream);
		if (hasLast(upstreamSource)) setFromUpstream(upstreamSource.last());
	}
	const rxEvents = eventTrigger(formEl, eventName, {
		fireInitial: emitInitialValue,
		debugFiring: options.debugFiring ?? false,
		debugLifecycle: options.debugLifecycle ?? false
	});
	const rxValues = transform(rxEvents, (_trigger) => readValue());
	return {
		...rxValues,
		el: formEl,
		last() {
			return readValue();
		},
		set: setFromUpstream,
		setNamedValue,
		dispose(reason) {
			upstreamSourceUnsub();
			rxValues.dispose(reason);
			rxEvents.dispose(reason);
		}
	};
}

//#endregion
//#region ../ui/src/rx/dom.ts
/**
* Reactive stream of array of elements that match `query`.
* @param query 
* @returns 
*/
function fromDomQuery(query) {
	const elements$1 = [...document.querySelectorAll(query)];
	return object(elements$1);
}
/**
* Updates an element's `textContent` when the source value changes.
* ```js
* bindText(source, `#blah`);
* ```
* @param elOrQuery 
* @param source 
* @param bindOpts 
*/
const bindText = (source, elOrQuery, bindOpts = {}) => {
	return bindElement(source, elOrQuery, {
		...bindOpts,
		elField: `textContent`
	});
};
/**
* Updates an element's `value` (as well as the 'value' attribute) when the source value changes.s
* @param source 
* @param elOrQuery 
* @param bindOpts 
* @returns 
*/
const bindValueText = (source, elOrQuery, bindOpts = {}) => {
	return bindElement(source, elOrQuery, {
		...bindOpts,
		elField: `value`,
		attribName: `value`
	});
};
/**
* Updates an element's `innerHTML` when the source value changes
* ```js
* bindHtml(source, `#blah`);
* ```
* 
* Uses {@link bindElement}, with `{elField:'innerHTML'}` as the options.
* @param elOrQuery
* @param source 
* @param bindOpts 
* @returns 
*/
const bindHtml = (source, elOrQuery, bindOpts = {}) => {
	return bindElement(source, elOrQuery, {
		...bindOpts,
		elField: `innerHTML`
	});
};
/**
* Shortcut to bind to an elements attribute
* @param elOrQuery
* @param source 
* @param attribute 
* @param bindOpts 
* @returns 
*/
/**
* Shortcut to bind to a CSS variable
* @param elOrQuery
* @param source 
* @param cssVariable 
* @param bindOpts 
* @returns 
*/
/**
* Creates a new HTML element, calling {@link bind} on it to update when `source` emits new values.
* 
* 
* ```js
* // Set textContent of a SPAN with values from `source`
* create(source, { tagName: `span`, parentEl: document.body })
* ```
* 
* If `parentEl` is not given in the options, the created element needs to be manually added
* ```js
* const b = create(source);
* someEl.append(b.el); // Append manually
* ```
* 
* ```
* // Set 'title' attribute based on values from `source`
* create(source, { parentEl: document.body, attribName: `title` })
* ```
* @param source 
* @param options 
* @returns 
*/
/**
* Update a DOM element's field, attribute or CSS variable when `source` produces a value.
* 
* ```js
* // Access via DOM query. Binds to 'textContent' by default
* bind(readableSource, `#someEl`);
* 
* // Set innerHTML instead
* bind(readableSource, someEl, { elField: `innerHTML` });
* 
* // An attribute
* bind(readableSource, someEl, { attribName: `width` });
* 
* // A css variable ('--' optiona)
* bind(readableSource, someEl, { cssVariable: `hue` });
* 
* // Pluck a particular field from source data.
* // Ie someEl.textContent = value.colour
* bind(readableSource, someEl, { sourceField: `colour` });
* 
* // Transform value before setting it to field
* bind(readableSource, someEl, { 
*  field: `innerHTML`, 
*  transform: (v) => `Colour: ${v.colour}`
* })
* ```
* 
* If `source` has an initial value, this is used when first bound.
* 
* Returns {@link PipeDomBinding} to control binding:
* ```js
* const bind = bind(source, `#someEl`);
* bind.remove();     // Unbind
* bind.remove(true); // Unbind and remove HTML element
* ```
* 
* If several fields need to be updated based on a new value, consider using {@link bindUpdate} instead.
* @param elOrQuery Element to update to, or query string such as '#someid'
* @param source Source of data
* @param binds Bindings
*/
const bindElement = (source, elOrQuery, ...binds) => {
	if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
	if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
	const el = resolveEl(elOrQuery);
	let b = [];
	if (binds.length === 0) b.push({ elField: `textContent` });
	else b = [...binds];
	const bb = b.map((bind$1) => {
		if (`element` in bind$1) return bind$1;
		return {
			...bind$1,
			element: el
		};
	});
	return bind(source, ...bb);
};
const resolveBindUpdater = (bind$1, element) => {
	const b = resolveBindUpdaterBase(bind$1);
	return (value) => {
		b(value, element);
	};
};
const resolveBindUpdaterBase = (bind$1) => {
	if (bind$1.elField !== void 0 || bind$1.cssVariable === void 0 && bind$1.attribName === void 0 && bind$1.cssProperty === void 0 && bind$1.textContent === void 0 && bind$1.htmlContent === void 0) {
		const field = bind$1.elField ?? `textContent`;
		return (v, element) => {
			element[field] = v;
		};
	}
	if (bind$1.attribName !== void 0) {
		const attrib = bind$1.attribName;
		return (v, element) => {
			element.setAttribute(attrib, v);
		};
	}
	if (bind$1.textContent) return (v, element) => {
		element.textContent = v;
	};
	if (bind$1.htmlContent) return (v, element) => {
		element.innerHTML = v;
	};
	if (bind$1.cssVariable !== void 0) {
		let css = bind$1.cssVariable;
		if (!css.startsWith(`--`)) css = `--` + css;
		return (v, element) => {
			element.style.setProperty(css, v);
		};
	}
	if (bind$1.cssProperty !== void 0) return (v, element) => {
		element.style[bind$1.cssProperty] = v;
	};
	return (_, _element) => {
		/** no-op */
	};
};
const resolveTransform = (bind$1) => {
	if (!bind$1.transform && !bind$1.transformValue) return;
	if (bind$1.transformValue) {
		if (bind$1.sourceField === void 0) throw new Error(`Expects 'sourceField' to be set when 'transformValue' is set`);
		return (value) => {
			const fieldValue = value[bind$1.sourceField];
			return bind$1.transformValue(fieldValue);
		};
	} else if (bind$1.transform) {
		if (bind$1.sourceField !== void 0) throw new Error(`If 'transform' is set, 'sourceField' is ignored`);
		return (value) => bind$1.transform(value);
	}
};
/**
* Binds `source` to one or more element(s). One or more bindings for the same source
* can be provided.
* 
* ```js
* bind(source, 
*  // Binds .name field of source values to textContent of #some-element
*  { query: `#some-element`, sourceField: `name` },
*  { query: `section`, }
* );
* ```
* 
* Can update
* * CSS variables
* * CSS styles
* * textContent / innerHTML
* * HTML DOM attributes and object fields
* 
* Can use a particular field on source values, or use the whole value. These can
* pass through `transformValue` or `transform` respectively.
* 
* Returns a function to unbind from source and optionally remove HTML element
* ```js
* const unbind = bind( . . . );
* unbind();     // Unbind
* unbind(true); // Unbind and remove HTML element(s)
* ```
* @param source 
* @param bindsUnresolvedElements 
* @returns 
*/
const bind = (source, ...bindsUnresolvedElements) => {
	const binds = bindsUnresolvedElements.map((bind$1) => {
		if (bind$1.element && bind$1.element !== void 0) return bind$1;
		if (bind$1.query) return {
			...bind$1,
			element: resolveEl(bind$1.query)
		};
		throw new Error(`Unable to resolve element. Missing 'element' or 'query' values on bind. ${JSON.stringify(bind$1)}`);
	});
	const bindsResolved = binds.map((bind$1) => ({
		update: resolveBindUpdater(bind$1, bind$1.element),
		transformer: resolveTransform(bind$1),
		sourceField: bind$1.sourceField
	}));
	const update = (value) => {
		for (const bind$1 of bindsResolved) if (bind$1.transformer) bind$1.update(bind$1.transformer(value));
		else {
			const v = bind$1.sourceField ? value[bind$1.sourceField] : value;
			if (typeof v === `object`) if (bind$1.sourceField) bind$1.update(JSON.stringify(v));
			else bind$1.update(JSON.stringify(v));
			else bind$1.update(v);
		}
	};
	const unsub = source.on((message) => {
		if (messageHasValue(message)) update(message.value);
		else if (messageIsSignal(message)) console.warn(message);
	});
	if (hasLast(source)) update(source.last());
	return { remove: (removeElements) => {
		unsub();
		if (removeElements) for (const bind$1 of binds) bind$1.element.remove();
	} };
};
/**
* Calls `updater` whenever `source` produces a value. Useful when several fields from a value
* are needed to update an element.
* ```js
* bindUpdate(source, `#someEl`, (v, el) => {
*  el.setAttribute(`width`, v.width);
*  el.setAttribute(`height`, v.height);
* });
* ```
* 
* Returns a {@link PipeDomBinding} to manage binding
* ```js
* const b = bindUpdate(...);
* b.remove();     // Disconnect binding
* b.remove(true); // Disconnect binding and remove element
* b.el;           // HTML element
* ```
* @param elOrQuery 
* @param source 
* @param updater 
* @returns 
*/
const bindUpdate = (source, elOrQuery, updater) => {
	const el = resolveEl(elOrQuery);
	const update = (value) => {
		updater(value, el);
	};
	const unsub = source.on((message) => {
		if (messageHasValue(message)) {
			console.log(message);
			update(message.value);
		} else console.warn(message);
	});
	if (hasLast(source)) update(source.last());
	return { remove: (removeElement) => {
		unsub();
		if (removeElement) el.remove();
	} };
};
/**
* Updates a HTML element based on diffs on an object.
* ```js
* // Wrap an object
* const o = Rx.object({ name: `Jane`, ticks: 0 });
* const b = bindDiffUpdate(`#test`, o, (diffs, el) => {
*  // el = reference to #test
* // diff = Array of Changes, 
* //  eg [ { path: `ticks`, value: 797, previous: 0 } ]
*  for (const diff of diffs) {
*    if (diff.path === `ticks`) el.textContent = `${diff.previous} -> ${diff.value}`
*  }
* })
* 
* // Eg. update field
* o.updateField(`ticks`, Math.floor(Math.random()*1000));
* ```
* 
* If `initial` is provided as an option, this will be called if `source` has an initial value. Without this, the DOM won't be updated until the first data
* update happens.
* ```js
* bindDiffUpdate(el, source, updater, { 
*  initial: (v, el) => {
*    el.innerHTML = v.name;
*  }
* })
* ```
* @param elOrQuery 
* @param source 
* @param updater 
* @param opts 
* @returns 
*/
const bindDiffUpdate = (source, elOrQuery, updater, opts = {}) => {
	if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
	if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
	const el = resolveEl(elOrQuery);
	const update = (value) => {
		updater(value, el);
	};
	const unsub = source.onDiff((value) => {
		update(value);
	});
	const init$1 = () => {
		if (hasLast(source) && opts.initial) opts.initial(source.last(), el);
	};
	init$1();
	return {
		refresh: () => {
			init$1();
		},
		remove: (removeElement) => {
			unsub();
			if (removeElement) el.remove();
		}
	};
};
/**
* Creates a new HTML element and calls `bindUpdate` so values from `source` can be used
* to update it.
* 
* 
* ```js
* // Creates a span, adding it to <body>
* const b = createUpdate(dataSource, (value, el) => {
*  el.width = value.width;
*  el.height = value.height;
* }, { 
*  tagName: `SPAN`,
*  parentEl: document.body
* })
* ```
* @param source 
* @param updater 
* @param options 
* @returns 
*/
/**
* Creates, updates & deletes elements based on pathed values from a reactive.
* 
* This means that elements are only manipulated if its associated data changes,
* and elements are not modified if there's no need to.
* @param source 
* @param options 
*/
const elements = (source, options) => {
	const containerEl = options.container ? resolveEl(options.container) : document.body;
	const defaultTag = options.defaultTag ?? `div`;
	const elByField = /* @__PURE__ */ new Map();
	const binds = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(options.binds ?? {})) {
		const tagName = value.tagName ?? defaultTag;
		binds.set(key, {
			...value,
			update: resolveBindUpdaterBase(value),
			transform: resolveTransform(value),
			tagName,
			path: key
		});
	}
	const findBind = (path) => {
		const bind$1 = findBySomeKey(binds, stringSegmentsWholeToEnd(path));
		if (bind$1 !== void 0) return bind$1;
		if (!path.includes(`.`)) return binds.get(`_root`);
	};
	function* ancestorBinds(path) {
		for (const p of stringSegmentsWholeToFirst(path)) if (binds.has(p)) yield binds.get(p);
		if (binds.has(`_root`) && path.includes(`.`)) yield binds.get(`_root`);
	}
	const create = (path, value) => {
		const rootedPath = getRootedPath(path);
		console.log(`Rx.Dom.elements.create: ${path} rooted: ${rootedPath} value: ${JSON.stringify(value)}`);
		const bind$1 = findBind(getRootedPath(path));
		let tagName = defaultTag;
		if (bind$1?.tagName) tagName = bind$1.tagName;
		const el = document.createElement(tagName);
		el.setAttribute(`data-path`, path);
		update(path, el, value);
		let parentForEl;
		for (const b of ancestorBinds(rootedPath)) if (b?.nestChildren) {
			const absoluteRoot = beforeMatch(path, `.`);
			const findBy = b.path.replace(`_root`, absoluteRoot);
			parentForEl = elByField.get(findBy);
			if (parentForEl === void 0) {} else break;
		}
		(parentForEl ?? containerEl).append(el);
		elByField.set(path, el);
		console.log(`Added el: ${path}`);
	};
	const update = (path, el, value) => {
		console.log(`Rx.dom.update path: ${path} value:`, value);
		const bind$1 = findBind(getRootedPath(path));
		if (bind$1 === void 0) {
			if (typeof value === `object`) value = JSON.stringify(value);
			el.textContent = value;
		} else {
			if (bind$1.transform) value = bind$1.transform(value);
			bind$1.update(value, el);
		}
	};
	const changes = (changes$1) => {
		const queue = new QueueMutable({}, changes$1);
		let d = queue.dequeue();
		const seenPaths = /* @__PURE__ */ new Set();
		while (d !== void 0) {
			const path = d.path;
			if (!(`previous` in d) || d.previous === void 0) {
				console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
				create(path, d.value);
				const subdata = [...getPathsAndData(d.value, false, Number.MAX_SAFE_INTEGER, path)];
				console.log(subdata);
				for (const dd of subdata) if (!seenPaths.has(dd.path)) {
					queue.enqueue(dd);
					seenPaths.add(dd.path);
				}
			} else if (d.value === void 0) {
				const el = elByField.get(path);
				if (el === void 0) console.warn(`No element to delete? ${path} `);
				else {
					console.log(`Rx.Dom.elements.changes delete ${path}`);
					el.remove();
				}
			} else {
				const el = elByField.get(path);
				if (el === void 0) {
					console.warn(`Rx.Dom.elements.changes No element to update ? ${path} `);
					create(path, d.value);
				} else update(path, el, d.value);
			}
			d = queue.dequeue();
		}
	};
	/**
	* Source has changed
	*/
	source.onDiff((value) => {
		changes(value);
	});
	if (hasLast(source)) {
		const last = source.last();
		changes([...getPathsAndData(last, false, 1)]);
	}
};
/**
* Replaces the root portion of `path` with the magic keyword `_root`
* @param path 
* @returns 
*/
const getRootedPath = (path) => {
	const after = afterMatch(path, `.`);
	return after === path ? `_root` : `_root.` + after;
};
function win() {
	const generateRect = () => ({
		width: window.innerWidth,
		height: window.innerHeight
	});
	const size = event(window, `resize`, {
		lazy: `very`,
		transform: () => generateRect()
	});
	const pointer = event(window, `pointermove`, {
		lazy: `very`,
		transform: (args) => {
			if (args === void 0) return {
				x: 0,
				y: 0
			};
			const pe = args;
			return {
				x: pe.x,
				y: pe.y
			};
		}
	});
	const dispose = (reason = `Reactive.win.dispose`) => {
		size.dispose(reason);
		pointer.dispose(reason);
	};
	return {
		dispose,
		size,
		pointer
	};
}

//#endregion
//#region ../ui/src/rx/index.ts
var rx_exports = {};
__export(rx_exports, {
	bind: () => bind,
	bindDiffUpdate: () => bindDiffUpdate,
	bindElement: () => bindElement,
	bindHtml: () => bindHtml,
	bindText: () => bindText,
	bindUpdate: () => bindUpdate,
	bindValueText: () => bindValueText,
	browserResizeObservable: () => browserResizeObservable,
	colour: () => colour,
	cssClassChange: () => cssClassChange,
	domForm: () => domForm,
	domHslInputValue: () => domHslInputValue,
	domInputValue: () => domInputValue,
	domNumberInputValue: () => domNumberInputValue,
	elements: () => elements,
	fromDomQuery: () => fromDomQuery,
	win: () => win,
	windowResize: () => windowResize
});

//#endregion
export { rx_exports as RxUi };
//# sourceMappingURL=ui.js.map