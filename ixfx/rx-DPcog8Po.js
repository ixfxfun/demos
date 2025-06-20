import { __export } from "./chunk-51aI8Tpl.js";
import { numberTest$2 as numberTest, resultIsError$2 as resultIsError, resultThrow$2 as resultThrow, resultToError$2 as resultToError } from "./numbers-D3QR_A5v.js";
import { arrayIndexTest$2 as arrayIndexTest } from "./arrays-D1QkwjZy.js";
import { compareArrays, compareData, getField, mapObjectShallow, testPlainObjectOrPrimitive$2 as testPlainObjectOrPrimitive, updateByPath } from "./records-Ci2FTwQh.js";
import { stringTest$2 as stringTest } from "./string-DqK_2HRh.js";
import { wildcard } from "./text-Bix-JqNp.js";
import { isEqualContextString$2 as isEqualContextString, isEqualValueDefault$2 as isEqualValueDefault } from "./is-equal-CuJQbSdk.js";
import { continuously } from "./continuously-COmg5gMG.js";
import { elapsedInterval$2 as elapsedInterval } from "./unique-ChIDIqyX.js";
import { intervalToMs$2 as intervalToMs } from "./interval-type-2J0Z5AgI.js";
import { getErrorMessage$4 as getErrorMessage } from "./src-CjCi0sir.js";
import { sleep$2 as sleep } from "./sleep-Cw3QZp44.js";
import { isAsyncIterable$2 as isAsyncIterable, isIterable$2 as isIterable, nextWithTimeout } from "./src-BCbSH3Qq.js";
import { shuffle$4 as shuffle } from "./random-flyLh7EB.js";
import { clamp$2 as clamp } from "./clamp-C4PxbMDL.js";
import { some$2 as some, zipKeyValue } from "./maps-CdJmBRhA.js";
import { QueueMutable$2 as QueueMutable } from "./queue-mutable-BCKFc7rH.js";
import { timeout$2 as timeout } from "./timeout-BdH9Q2AF.js";
import { DispatchList$2 as DispatchList } from "./dispatch-list-Bc-ErLTv.js";
import { init, to$2 as to } from "./state-machine-CiyBr3BG.js";
import { resolveEls$2 as resolveEls } from "./resolve-el-CWYrWSRe.js";

//#region ../packages/arrays/src/insert-at.ts
/**
* Inserts `values` at position `index`, shuffling remaining
* items further down.
* @param data 
* @param index 
* @param values 
* @returns 
*/
const insertAt = (data, index, ...values) => {
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is not an arry`);
	return [
		...data.slice(0, index),
		...values,
		...data.slice(index + 1)
	];
};

//#endregion
//#region ../packages/arrays/src/remove.ts
/**
* Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
*
* ```js
* import { Arrays } from 'https://unpkg.com/ixfx/dist/data.js';
*
* const v = [ 100, 20, 50 ];
* const vv = Arrays.remove(2);
*
* Yields:
*  v: [ 100, 20, 50 ]
* vv: [ 100, 20 ]
* ```
*
* Consider {@link without} if you want to remove an item by value.
*
* Throws an exception if `index` is outside the range of `data` array.
* @param data Input array
* @param index Index to remove
* @typeParam V Type of array
* @returns
*/
const remove = (data, index) => {
	if (!Array.isArray(data)) throw new TypeError(`'data' parameter should be an array`);
	resultThrow(arrayIndexTest(data, index, `index`));
	return [...data.slice(0, index), ...data.slice(index + 1)];
};

//#endregion
//#region ../packages/collections/src/map/map-immutable-fns.ts
/**
* Adds an array o [k,v] to the map, returning a new instance
* @param map Initial data
* @param data Data to add
* @returns New map with data added
*/
const addArray = (map, data) => {
	const x = new Map(map.entries());
	for (const d of data) {
		if (d[0] === void 0) throw new Error(`key cannot be undefined`);
		if (d[1] === void 0) throw new Error(`value cannot be undefined`);
		x.set(d[0], d[1]);
	}
	return x;
};
/**
* Adds objects to the map, returning a new instance
* @param map Initial data
* @param data Data to add
* @returns A new map with data added
*/
const addObjects = (map, data) => {
	const x = new Map(map.entries());
	for (const d of data) {
		if (d.key === void 0) throw new Error(`key cannot be undefined`);
		if (d.value === void 0) throw new Error(`value cannot be undefined`);
		x.set(d.key, d.value);
	}
	return x;
};
/**
* Adds data to a map, returning the new map.
*
* Can add items in the form of [key,value] or {key, value}.
* @example These all produce the same result
* ```js
* map.set(`hello`, `samantha`);
* map.add([`hello`, `samantha`]);
* map.add({key: `hello`, value: `samantha`})
* ```
* @param map Initial data
* @param data One or more data to add in the form of [key,value] or {key, value}
* @returns New map with data added
*/
const add = (map, ...data) => {
	if (map === void 0) throw new Error(`map parameter is undefined`);
	if (data === void 0) throw new Error(`data parameter i.s undefined`);
	if (data.length === 0) return map;
	const firstRecord = data[0];
	const isObject = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
	return isObject ? addObjects(map, data) : addArray(map, data);
};
/**
* Sets data in a copy of the initial map
* @param map Initial map
* @param key Key
* @param value Value to  set
* @returns New map with data set
*/
const set = (map, key, value) => {
	const x = new Map(map.entries());
	x.set(key, value);
	return x;
};
/**
* Delete a key from the map, returning a new map
* @param map Initial data
* @param key
* @returns New map with data deleted
*/
const del = (map, key) => {
	const x = new Map(map.entries());
	x.delete(key);
	return x;
};

//#endregion
//#region ../packages/collections/src/map/map.ts
/**
* Returns an {@link IMapImmutable}.
* Use {@link Maps.mutable} as a mutable alternatve.
*
* @example Basic usage
* ```js
* // Creating
* let m = map();
* // Add
* m = m.set("name", "sally");
* // Recall
* m.get("name");
* ```
*
* @example Enumerating
* ```js
* for (const [key, value] of map.entries()) {
*  console.log(`${key} = ${value}`);
* }
* ```
*
* @example Overview
* ```js
* // Create
* let m = map();
* // Add as array or key & value pair
* m = m.add(["name" , "sally"]);
* m = m.add({ key: "name", value: "sally" });
* // Add using the more typical set
* m = m.set("name", "sally");
* m.get("name");   // "sally";
* m.has("age");    // false
* m.has("name");   // true
* m.isEmpty;       // false
* m = m.delete("name");
* m.entries();     // Iterator of key value pairs
* ```
*
* Since it is immutable, `add()`, `delete()` and `clear()` return a new version with change.
*
* @param dataOrMap Optional initial data in the form of an array of `{ key: value }` or `[ key, value ]`
*/
const immutable = (dataOrMap) => {
	if (dataOrMap === void 0) return immutable([]);
	if (Array.isArray(dataOrMap)) return immutable(add(new Map(), ...dataOrMap));
	const data = dataOrMap;
	return {
		add: (...itemsToAdd) => {
			const s = add(data, ...itemsToAdd);
			return immutable(s);
		},
		set: (key, value) => {
			const s = set(data, key, value);
			return immutable(s);
		},
		get: (key) => data.get(key),
		delete: (key) => immutable(del(data, key)),
		clear: () => immutable(),
		has: (key) => data.has(key),
		entries: () => data.entries(),
		values: () => data.values(),
		isEmpty: () => data.size === 0
	};
};

//#endregion
//#region ../packages/collections/src/graph/directed-graph.ts
/**
* Create a vertex with given id
* @param id 
* @returns 
*/
const createVertex = (id) => {
	return {
		id,
		out: []
	};
};
function graphTest(g, parameterName = `graph`) {
	if (g === void 0) return {
		success: false,
		error: `Param '${parameterName}' is undefined. Expected Graph`
	};
	if (g === null) return {
		success: false,
		error: `Param '${parameterName}' is null. Expected Graph`
	};
	if (typeof g === `object`) {
		if (!(`vertices` in g)) return {
			success: false,
			error: `Param '${parameterName}.vertices' does not exist. Is it a Graph type?`
		};
	} else return {
		success: false,
		error: `Param '${parameterName} is type '${typeof g}'. Expected an object Graph`
	};
	return {
		success: true,
		value: g
	};
}
/**
* Returns _true_ if `vertex` has an outgoing connection to the given vertex.
* @param graph 
* @param vertex 
* @param outIdOrVertex 
* @returns 
*/
const hasOut = (graph$1, vertex, outIdOrVertex) => {
	resultThrow(graphTest(graph$1));
	const context = resolveVertex(graph$1, vertex);
	const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
	return context.out.some((edge) => edge.id === outId);
};
/**
* Gets a vertex by id, creating it if it does not exist.
* @param graph 
* @param id 
* @returns 
*/
const getOrCreate = (graph$1, id) => {
	resultThrow(graphTest(graph$1));
	const v = graph$1.vertices.get(id);
	if (v !== void 0) return {
		graph: graph$1,
		vertex: v
	};
	const vv = createVertex(id);
	const gg = updateGraphVertex(graph$1, vv);
	return {
		graph: gg,
		vertex: vv
	};
};
/**
* Updates a vertex by returning a mutated graph
* @param graph Graph
* @param vertex Newly changed vertex
* @returns 
*/
const updateGraphVertex = (graph$1, vertex) => {
	resultThrow(graphTest(graph$1));
	const gr = {
		...graph$1,
		vertices: graph$1.vertices.set(vertex.id, vertex)
	};
	return gr;
};
/**
* Make a connection between two vertices with a given weight.
* It returns the new graph as wll as the created edge.
* @param graph 
* @param from 
* @param to 
* @param weight 
* @returns 
*/
function connectTo(graph$1, from, to$2, weight) {
	resultThrow(graphTest(graph$1));
	const fromResult = getOrCreate(graph$1, from);
	graph$1 = fromResult.graph;
	const toResult = getOrCreate(graph$1, to$2);
	graph$1 = toResult.graph;
	const edge = {
		id: to$2,
		weight
	};
	if (!hasOut(graph$1, fromResult.vertex, toResult.vertex)) graph$1 = updateGraphVertex(graph$1, {
		...fromResult.vertex,
		out: [...fromResult.vertex.out, edge]
	});
	return {
		graph: graph$1,
		edge
	};
}
/**
* Connect from -> to. Same as {@link connectWithEdges}, but this version just returns the graph.
* 
* By default unidirectional, meaning a connection is made only from->to. Use `bidi` option to set a bidirection connection, adding also to->from.
* 
* Returns a result of `{ graph, edges }`, where `graph` is the new {@link DirectedGraph} and `edges`
* is an array of {@link Edge Edges}. One for unidirectional, or two for bidirectional.
* @param graph 
* @param options 
* @returns 
*/
function connect(graph$1, options) {
	if (typeof graph$1 !== `object`) throw new TypeError(`Param 'graph' is expected to be a DirectedGraph object. Got: ${typeof graph$1}`);
	if (typeof options !== `object`) throw new TypeError(`Param 'options' is expected to be ConnectOptions object. Got: ${typeof options}`);
	const result = connectWithEdges(graph$1, options);
	return result.graph;
}
/**
* Connect from -> to. Same as {@link connect} except you get back the edges as well. 
* 
* By default unidirectional, meaning a connection is made only from->to. Use `bidi` option to set a bidirection connection, adding also to->from.
* 
* Returns a result of `{ graph, edges }`, where `graph` is the new {@link DirectedGraph} and `edges`
* is an array of {@link Edge Edges}. One for unidirectional, or two for bidirectional.
* @param graph 
* @param options 
* @returns 
*/
function connectWithEdges(graph$1, options) {
	resultThrow(graphTest(graph$1));
	const { to: to$2, weight, from } = options;
	const bidi = options.bidi ?? false;
	const toList = Array.isArray(to$2) ? to$2 : [to$2];
	const edges = [];
	for (const toSingle of toList) {
		const result = connectTo(graph$1, from, toSingle, weight);
		graph$1 = result.graph;
		edges.push(result.edge);
	}
	if (!bidi) return {
		graph: graph$1,
		edges
	};
	for (const toSingle of toList) {
		const result = connectTo(graph$1, toSingle, from, weight);
		graph$1 = result.graph;
		edges.push(result.edge);
	}
	return {
		graph: graph$1,
		edges
	};
}
/**
* Resolves the id or vertex into a Vertex.
* throws an error if vertex is not found
* @param graph 
* @param idOrVertex 
* @returns 
*/
function resolveVertex(graph$1, idOrVertex) {
	resultThrow(graphTest(graph$1));
	if (idOrVertex === void 0) throw new Error(`Param 'idOrVertex' is undefined. Expected string or Vertex`);
	const v = typeof idOrVertex === `string` ? graph$1.vertices.get(idOrVertex) : idOrVertex;
	if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
	return v;
}
/**
* Create a graph
* ```js
* let g = graph();
* ```
* 
* Can optionally provide initial connections:
* ```js
* let g = graph(
*  { from: `a`, to: `b` },
*  { from: `b`, to: `c` }
* )
* ```
* @param initialConnections 
* @returns 
*/
const graph = (...initialConnections) => {
	let g = { vertices: immutable() };
	for (const ic of initialConnections) g = connect(g, ic);
	return g;
};

//#endregion
//#region ../packages/dom/src/set-property.ts
function setProperty(property, selectors, value) {
	let elements = [];
	const set$1 = (v) => {
		const typ = typeof v;
		const vv = typ === `string` || typ === `number` || typ === `boolean` ? v : JSON.stringify(v);
		if (elements.length === 0) elements = resolveEls(selectors);
		for (const element of elements) element[property] = vv;
		return vv;
	};
	return value === void 0 ? set$1 : set$1(value);
}

//#endregion
//#region ../packages/rx/dist/src/util.js
function messageIsSignal(message) {
	if (message.value !== void 0) return false;
	if (`signal` in message && message.signal !== void 0) return true;
	return false;
}
function messageIsDoneSignal(message) {
	if (message.value !== void 0) return false;
	if (`signal` in message && message.signal === `done`) return true;
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
const isPingable = (rx) => {
	if (!isReactive(rx)) return false;
	if (`ping` in rx) return true;
	return false;
};
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
/**
* Returns true if `rx` is a disposable reactive.
* @param rx
* @returns
*/
/**
* Returns _true_ if `rx` is a writable Reactive
* @param rx
* @returns
*/
const isWritable = (rx) => {
	if (!isReactive(rx)) return false;
	if (`set` in rx) return true;
	return false;
};
const isWrapped = (v) => {
	if (typeof v !== `object`) return false;
	if (!(`source` in v)) return false;
	if (!(`annotate` in v)) return false;
	return true;
};
const opify = (fn, ...args) => {
	return (source) => {
		return fn(source, ...args);
	};
};
const isTriggerValue = (t) => `value` in t;
const isTriggerFunction = (t) => `fn` in t;
const isTriggerGenerator = (t) => isIterable(t);
const isTrigger = (t) => {
	if (typeof t !== `object`) return false;
	if (isTriggerValue(t)) return true;
	if (isTriggerFunction(t)) return true;
	if (isTriggerGenerator(t)) return true;
	return false;
};
/**
* Resolves a trigger value.
*
* A trigger can be a value, a function or generator. Value triggers never complete.
* A trigger function is considered complete if it returns undefined.
* A trigger generator is considered complete if it returns done.
*
* Returns `[value, _false_]` if we have a value and trigger is not completed.
* Returns `[value, _true_]` trigger is completed
* @param t
* @returns
*/
function resolveTriggerValue(t) {
	if (isTriggerValue(t)) return [t.value, false];
	if (isTriggerFunction(t)) {
		const v = t.fn();
		if (v === void 0) return [void 0, true];
		return [v, false];
	}
	if (isTriggerGenerator(t)) {
		const v = t.gen.next();
		if (v.done) return [void 0, true];
		return [v.value, false];
	}
	throw new Error(`Invalid trigger. Missing 'value' or 'fn' fields`);
}

//#endregion
//#region ../packages/rx/dist/src/from/function.js
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
		if (run$1) run$1.cancel();
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
	const run$1 = manual$1 ? void 0 : continuously(async () => {
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
			if (run$1) run$1.start();
		},
		onStop() {
			enabled = false;
			if (run$1) run$1.cancel();
		}
	});
	if (lazy === `never` && run$1) run$1.start();
	return {
		...events,
		ping
	};
}

//#endregion
//#region ../packages/rx/dist/src/from/iterator.js
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
	const readTimeoutMs = intervalToMs(options.readTimeout, 5 * 60 * 1e3);
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
//#region ../packages/rx/dist/src/resolve-source.js
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
//#region ../packages/rx/dist/src/cache.js
/**
* Wrapes an input stream to cache values, optionally providing an initial value
* @param r
* @param initialValue
* @returns
*/
function cache(r, initialValue) {
	let lastValue = initialValue;
	r.onValue((value) => {
		lastValue = value;
	});
	return {
		...r,
		last() {
			return lastValue;
		},
		resetCachedValue() {
			lastValue = void 0;
		}
	};
}

//#endregion
//#region ../packages/rx/dist/src/init-stream.js
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
* Initialises a lazy stream with an initial value.
* Uses {@link initLazyStream} and {@link cache} together.
* @param options
* @returns
*/
function initLazyStreamWithInitial(options) {
	const r = initLazyStream(options);
	const c = cache(r, options.initialValue);
	return c;
}
/**
* Initialises a lazy stream
* Consider also: {@link initLazyStreamWithInitial}
*
* Uses {@link lazyStream} internally.
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
//#region ../packages/rx/dist/src/sinks/dom.js
/**
* Values from `input` are set to the textContent/innerHTML of an element.
* ```js
* const rxSource = Rx.From.string('hello');
* const rxSet = Rx.Sinks.setHtmlText(rxSource, { query: })
* ```
* @param rxOrSource
* @param optionsOrElementOrQuery
*/
const setHtmlText = (rxOrSource, optionsOrElementOrQuery) => {
	let el;
	let options;
	if (typeof optionsOrElementOrQuery === `string`) options = { query: optionsOrElementOrQuery };
	if (typeof optionsOrElementOrQuery === `object`) if (`nodeName` in optionsOrElementOrQuery) options = { el: optionsOrElementOrQuery };
	else options = optionsOrElementOrQuery;
	if (options === void 0) throw new TypeError(`Missing element as second parameter or option`);
	if (`el` in options) el = options.el;
	else if (`query` in options) el = document.querySelector(options.query);
	else throw new TypeError(`Options does not include 'el' or 'query' fields`);
	if (el === null || el === void 0) throw new Error(`Element could not be resolved.`);
	const stream = resolveSource(rxOrSource);
	const setter = setProperty(options.asHtml ? `innerHTML` : `textContent`, el);
	const off = stream.onValue((value) => {
		setter(value);
	});
	return off;
};

//#endregion
//#region ../packages/rx/dist/src/to-readable.js
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
//#region ../packages/rx/dist/src/ops/annotate.js
/**
* Annotates values from `source`. Output values will be
* in the form `{ value: TIn, annotation: TAnnotation }`.
* Where `TIn` is the type of the input, and `TAnnotation` is
* the return type of the annotator function.
*
* Example calculating area from width & height:
* ```js
* const data = Rx.From.array(
*  { w: 1, h: 3 }, { w: 1, h: 1 }, { w: 2, h: 2 }
* );
* const annotated = Rx.Ops.annotate(data, v => {
*  return { area: v.w * v.h }
* });
* const data = await Rx.toArray(annotated);
* // Data =  [ { value: { w:1, h:3 }, annotation: { area:3 } } ...]
* ```
*
* If you would rather annotate and have values merge with the input,
* use `transform`:
* ```js
* const data = Rx.From.array(
*  { w: 1, h: 3 }, { w: 1, h: 1 }, { w: 2, h: 2 }
* );
* const withArea = Rx.Ops.transform(data, v => {
*  return { ...v, area: v.w * v.h }
* });
* const data = await Rx.toArray(withArea);
* // Data =  [ { w:1, h:3, area:3 }, ...]
* ```
*/
function annotate(input, annotator, options = {}) {
	const upstream = initUpstream(input, {
		...options,
		onValue(value) {
			const annotation = annotator(value);
			upstream.set({
				value,
				annotation
			});
		}
	});
	return toReadable(upstream);
}
/**
* Annotates the input stream using {@link ReactiveOp} as the source of annotations.
* The output values will have the shape of `{ value: TIn, annotation: TAnnotation }`.
* Meaning that the original value is stored under `.value`, and the annotation under `.annotation`.
*
* ```js
* const data = Rx.From.array([ 1, 2, 3 ]);
* const annotated = Rx.Ops.annotateWithOp(data, Rx.Ops.sum());
* const data = await annotated.toArray(annotated);
* // Data =  [ { value: 1, annotation: 1 }, { value: 2, annotation: 3 }, { value: 3, annotation: 6 } ]
* ```
* @param annotatorOp Operator to generate annotations
* @param input Input stream
* @returns
*/
function annotateWithOp(input, annotatorOp) {
	const inputStream = resolveSource(input);
	const stream = annotatorOp(inputStream);
	const synced = syncToObject({
		value: inputStream,
		annotation: stream
	});
	return synced;
}

//#endregion
//#region ../packages/rx/dist/src/ops/chunk.js
/**
* Queue from `source`, emitting when thresholds are reached.
* The resulting Reactive produces arrays.
*
* Can use a combination of elapsed time or number of data items.
*
* By default options are OR'ed together.
*
* ```js
* // Emit data in chunks of 5 items
* chunk(source, { quantity: 5 });
* // Emit a chunk of data every second
* chunk(source, { elapsed: 1000 });
* ```
* @param source
* @param options
* @returns
*/
function chunk(source, options = {}) {
	const queue = new QueueMutable();
	const quantity = options.quantity ?? 0;
	const returnRemainder = options.returnRemainder ?? true;
	const upstreamOpts = {
		...options,
		onStop() {
			if (returnRemainder && !queue.isEmpty) {
				const data = queue.toArray();
				queue.clear();
				upstream.set(data);
			}
		},
		onValue(value) {
			queue.enqueue(value);
			if (quantity > 0 && queue.length >= quantity) send();
			if (timer !== void 0 && timer.runState === `idle`) timer.start();
		}
	};
	const upstream = initUpstream(source, upstreamOpts);
	const send = () => {
		if (queue.isEmpty) return;
		if (timer !== void 0) timer.start();
		const data = queue.toArray();
		queue.clear();
		setTimeout(() => {
			upstream.set(data);
		});
	};
	const timer = options.elapsed ? timeout(send, options.elapsed) : void 0;
	return toReadable(upstream);
}

//#endregion
//#region ../packages/rx/dist/src/ops/transform.js
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
//#region ../packages/rx/dist/src/ops/clone-from-fields.js
/**
* Create a new object from input, based on cloning fields rather than a destructured copy.
* This is useful for event args.
* @param source
* @returns
*/
const cloneFromFields = (source) => {
	return transform(source, (v) => {
		const entries = [];
		for (const field$1 in v) {
			const value = v[field$1];
			if (testPlainObjectOrPrimitive(value)) entries.push([field$1, value]);
		}
		return Object.fromEntries(entries);
	});
};

//#endregion
//#region ../packages/rx/dist/src/ops/combine-latest-to-array.js
/**
* Monitors input reactive values, storing values as they happen to an array.
* Whenever a new value is emitted, the whole array is sent out, containing current
* values from each source, or _undefined_ if not yet emitted.
*
* See {@link combineLatestToObject} to combine streams by name into an object, rather than array.
*
* ```
* const sources = [
*  Rx.fromFunction(Math.random, { loop: true, interval: 100 }),
*  Rx.fromFunction(Math.random, { loop: true, interval: 200 })
* ];
* const r = Rx.combineLatestToArray(sources);
* r.onValue(value => {
*  // Value will be an array of last value from each source:
*  // [number,number]
* });
* ```
*
* The tempo of this stream will be set by the fastest source stream.
* See {@link syncToArray} to have pace determined by slowest source, and only
* send when each source has produce a new value compared to last time.
*
* Set `onSourceDone` to choose behaviour if a source stops. By default it
* is 'break', meaning the whole merged stream stops.
*
* Note: unlike RxJS's `combineLatest`, does not wait for each source to emit once
* before emitting first value.
* @param reactiveSources Sources to merge
* @param options Options for merging
* @returns
*/
function combineLatestToArray(reactiveSources, options = {}) {
	const event$1 = initStream();
	const onSourceDone = options.onSourceDone ?? `break`;
	const data = [];
	const sources = reactiveSources.map((source) => resolveSource(source));
	const noop = () => {};
	const sourceOff = sources.map((_) => noop);
	const doneSources = sources.map((_) => false);
	const unsub = () => {
		for (const v of sourceOff) v();
	};
	for (const [index, v] of sources.entries()) {
		data[index] = void 0;
		sourceOff[index] = v.on((message) => {
			if (messageIsDoneSignal(message)) {
				doneSources[index] = true;
				sourceOff[index]();
				sourceOff[index] = noop;
				if (onSourceDone === `break`) {
					unsub();
					event$1.dispose(`Source has completed and 'break' is set`);
					return;
				}
				if (!doneSources.includes(false)) {
					unsub();
					event$1.dispose(`All sources completed`);
				}
			} else if (messageHasValue(message)) {
				data[index] = message.value;
				event$1.set([...data]);
			}
		});
	}
	return {
		dispose: event$1.dispose,
		isDisposed: event$1.isDisposed,
		on: event$1.on,
		onValue: event$1.onValue
	};
}

//#endregion
//#region ../packages/rx/dist/src/from/object.js
/**
* Creates a Reactive wrapper with the shape of the input object.
*
* Changing the wrapped object directly does not update the Reactive.
* Instead, to update values use:
* * `set()`, 'resets' the whole object
* * `update()` changes a particular field
*
* Consider using {@link Rx.From.objectProxy} to return a object with properties that can be
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
	const set$1 = (v) => {
		const diff = [...compareData(value ?? {}, v, {
			...options,
			includeMissingFromA: true
		})];
		if (diff.length === 0) return;
		value = v;
		setEvent.set(v);
		diffEvent.set(diff);
	};
	const fireFieldUpdate = (field$1, value$1) => {
		for (const [matcher, pattern, list] of fieldChangeEvents) if (matcher(field$1)) list.notify({
			fieldName: field$1,
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
		set: set$1,
		update
	};
}

//#endregion
//#region ../packages/rx/dist/src/ops/combine-latest-to-object.js
/**
* Monitors input reactive values, storing values as they happen to an object.
* Whenever a new value is emitted, the whole object is sent out, containing current
* values from each source (or _undefined_ if not yet emitted)
*
* See {@link combineLatestToArray} to combine streams by name into an array instead.
*
* ```
* const sources = {
*  fast: Rx.fromFunction(Math.random, { loop: true, interval: 100 }),
*  slow: Rx.fromFunction(Math.random, { loop: true, interval: 200 })
* ];
* const r = Rx.combineLatestToObject(sources);
* r.onValue(value => {
*  // 'value' will be an object containing the labelled latest
*  // values from each source.
*  // { fast: number, slow: number }
* });
* ```
*
* The tempo of this stream will be set by the fastest source stream.
* See {@link syncToObject} to have pace determined by slowest source, and only
* send when each source has produce a new value compared to last time.
*
* This source ends if all source streams end.
* @param reactiveSources Sources to merge
* @param options Options for merging
* @returns
*/
function combineLatestToObject(reactiveSources, options = {}) {
	const disposeSources = options.disposeSources ?? true;
	const event$1 = object(void 0);
	const onSourceDone = options.onSourceDone ?? `break`;
	const emitInitial = options.emitInitial ?? true;
	let emitInitialDone = false;
	const states = new Map();
	for (const [key, source] of Object.entries(reactiveSources)) {
		const initialData = `last` in source ? source.last() : void 0;
		const s = {
			source: resolveSource(source),
			done: false,
			data: initialData,
			off: () => {}
		};
		states.set(key, s);
	}
	const sources = Object.fromEntries(Object.entries(states).map((entry) => [entry[0], entry[1].source]));
	const someUnfinished = () => some(states, (v) => !v.done);
	const unsub = () => {
		for (const state of states.values()) state.off();
	};
	const getData = () => {
		const r = {};
		for (const [key, state] of states) {
			const d = state.data;
			if (d !== void 0) r[key] = state.data;
		}
		return r;
	};
	const trigger = () => {
		emitInitialDone = true;
		const d = getData();
		event$1.set(d);
	};
	const wireUpState = (state) => {
		state.off = state.source.on((message) => {
			if (messageIsDoneSignal(message)) {
				state.done = true;
				state.off();
				state.off = () => {};
				if (onSourceDone === `break`) {
					unsub();
					event$1.dispose(`Source has completed and 'break' is behaviour`);
					return;
				}
				if (!someUnfinished()) {
					unsub();
					event$1.dispose(`All sources completed`);
				}
			} else if (messageHasValue(message)) {
				state.data = message.value;
				trigger();
			}
		});
	};
	for (const state of states.values()) wireUpState(state);
	if (!emitInitialDone && emitInitial) trigger();
	return {
		...event$1,
		hasSource(field$1) {
			return states.has(field$1);
		},
		replaceSource(field$1, source) {
			const state = states.get(field$1);
			if (state === void 0) throw new Error(`Field does not exist: '${field$1}'`);
			state.off();
			const s = resolveSource(source);
			state.source = s;
			wireUpState(state);
		},
		setWith(data) {
			const written = {};
			for (const [key, value] of Object.entries(data)) {
				const state = states.get(key);
				if (state !== void 0) {
					if (isWritable(state.source)) {
						state.source.set(value);
						written[key] = value;
					}
					state.data = value;
				}
			}
			return written;
		},
		sources,
		last() {
			return getData();
		},
		dispose(reason) {
			unsub();
			event$1.dispose(reason);
			if (disposeSources) for (const v of states.values()) v.source.dispose(`Part of disposed mergeToObject`);
		}
	};
}

//#endregion
//#region ../packages/rx/dist/src/ops/compute-with-previous.js
/**
* When there is a value from `input`, or the reactive is pinged,
* this reactive emits the result of `fn`.
*
* `fn` is provided the previous value as well as the most recent value.
*
* If no previous value is available, the current value is emitted and `fn` is not called.
* @param input
* @param fn
* @returns
*/
function computeWithPrevious(input, fn) {
	let previousValue;
	let currentValue;
	if (hasLast(input)) currentValue = previousValue = input.last();
	const trigger = () => {
		if (previousValue === void 0 && currentValue !== void 0) {
			previousValue = currentValue;
			upstream.set(previousValue);
		} else if (previousValue !== void 0 && currentValue !== void 0) {
			const vv = fn(previousValue, currentValue);
			previousValue = vv;
			upstream.set(vv);
		}
	};
	const upstream = initUpstream(input, {
		lazy: "very",
		debugLabel: `computeWithPrevious`,
		onValue(value) {
			currentValue = value;
			trigger();
		}
	});
	if (currentValue) trigger();
	return {
		...toReadable(upstream),
		ping: () => {
			if (currentValue !== void 0) trigger();
		}
	};
}

//#endregion
//#region ../packages/rx/dist/src/reactives/debounce.js
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
	const elapsed$1 = intervalToMs(options.elapsed, 50);
	let lastValue;
	const timer = timeout(() => {
		const v = lastValue;
		if (v) {
			upstream.set(v);
			lastValue = void 0;
		}
	}, elapsed$1);
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
//#region ../packages/rx/dist/src/ops/debounce.js
function debounce(options) {
	return (source) => {
		return debounce$1(source, options);
	};
}

//#endregion
//#region ../packages/rx/dist/src/ops/elapsed.js
/**
* Emits time in milliseconds since last message.
* If it is the first value, 0 is used.
* @param input
* @returns
*/
const elapsed = (input) => {
	let last = 0;
	return transform(input, (_ignored) => {
		const elapsed$1 = last === 0 ? 0 : Date.now() - last;
		last = Date.now();
		return elapsed$1;
	});
};

//#endregion
//#region ../packages/rx/dist/src/ops/field.js
/**
* From a source value, yields a field from it. Only works
* if stream values are objects.
*
* If a source value doesn't have that field, it is skipped.
*
* @returns
*/
function field(fieldSource, fieldName, options = {}) {
	const fallbackFieldValue = options.fallbackFieldValue;
	const fallbackObject = options.fallbackObject;
	const upstream = initUpstream(fieldSource, {
		disposeIfSourceDone: true,
		...options,
		onValue(value) {
			let v;
			if (fieldName in value) v = value[fieldName];
			else if (fallbackObject && fieldName in fallbackObject) v = fallbackObject[fieldName];
			if (v === void 0) v = fallbackFieldValue;
			if (v !== void 0) upstream.set(v);
		}
	});
	return toReadable(upstream);
}

//#endregion
//#region ../packages/rx/dist/src/ops/filter.js
/**
* Passes all values where `predicate` function returns _true_.
*/
function filter(input, predicate, options) {
	const upstream = initUpstream(input, {
		...options,
		onValue(value) {
			if (predicate(value)) upstream.set(value);
		}
	});
	return toReadable(upstream);
}
/**
* Drops all values where `predicate` function returns _true_.
*/
function drop(input, predicate, options) {
	const upstream = initUpstream(input, {
		...options,
		onValue(value) {
			if (!predicate(value)) upstream.set(value);
		}
	});
	return toReadable(upstream);
}

//#endregion
//#region ../packages/modulation/src/gaussian.ts
const pow$1 = Math.pow;
const gaussianA = 1 / Math.sqrt(2 * Math.PI);
/**
* Returns a roughly gaussian easing function
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const fn = Easings.gaussian();
* ```
*
* Try different positive and negative values for `stdDev` to pinch
* or flatten the bell shape.
* @param standardDeviation
* @returns
*/
const gaussian = (standardDeviation = .4) => {
	const mean = .5;
	return (t) => {
		const f = gaussianA / standardDeviation;
		let p = -2.5;
		let c = (t - mean) / standardDeviation;
		c *= c;
		p *= c;
		const v = f * pow$1(Math.E, p);
		if (v > 1) return 1;
		if (v < 0) return 0;
		return v;
	};
};

//#endregion
//#region ../packages/modulation/src/easing/easings-named.ts
var easings_named_exports = {};
__export(easings_named_exports, {
	arch: () => arch,
	backIn: () => backIn,
	backInOut: () => backInOut,
	backOut: () => backOut,
	bell: () => bell,
	bounceIn: () => bounceIn,
	bounceInOut: () => bounceInOut,
	bounceOut: () => bounceOut,
	circIn: () => circIn,
	circInOut: () => circInOut,
	circOut: () => circOut,
	cubicIn: () => cubicIn,
	cubicOut: () => cubicOut,
	elasticIn: () => elasticIn,
	elasticInOut: () => elasticInOut,
	elasticOut: () => elasticOut,
	expoIn: () => expoIn,
	expoInOut: () => expoInOut,
	expoOut: () => expoOut,
	quadIn: () => quadIn,
	quadInOut: () => quadInOut,
	quadOut: () => quadOut,
	quartIn: () => quartIn,
	quartOut: () => quartOut,
	quintIn: () => quintIn,
	quintInOut: () => quintInOut,
	quintOut: () => quintOut,
	sineIn: () => sineIn,
	sineInOut: () => sineInOut,
	sineOut: () => sineOut,
	smootherstep: () => smootherstep,
	smoothstep: () => smoothstep
});
const sqrt = Math.sqrt;
const pow = Math.pow;
const cos = Math.cos;
const pi = Math.PI;
const sin = Math.sin;
const bounceOut = (x) => {
	const n1 = 7.5625;
	const d1 = 2.75;
	if (x < 1 / d1) return n1 * x * x;
	else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + .75;
	else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + .9375;
	else return n1 * (x -= 2.625 / d1) * x + .984375;
};
const quintIn = (x) => x * x * x * x * x;
const quintOut = (x) => 1 - pow(1 - x, 5);
const arch = (x) => x * (1 - x) * 4;
const smoothstep = (x) => x * x * (3 - 2 * x);
const smootherstep = (x) => (x * (x * 6 - 15) + 10) * x * x * x;
const sineIn = (x) => 1 - cos(x * pi / 2);
const sineOut = (x) => sin(x * pi / 2);
const quadIn = (x) => x * x;
const quadOut = (x) => 1 - (1 - x) * (1 - x);
const sineInOut = (x) => -(cos(pi * x) - 1) / 2;
const quadInOut = (x) => x < .5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
const cubicIn = (x) => x * x * x;
const cubicOut = (x) => 1 - pow(1 - x, 3);
const quartIn = (x) => x * x * x * x;
const quartOut = (x) => 1 - pow(1 - x, 4);
const expoIn = (x) => x === 0 ? 0 : pow(2, 10 * x - 10);
const expoOut = (x) => x === 1 ? 1 : 1 - pow(2, -10 * x);
const quintInOut = (x) => x < .5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
const expoInOut = (x) => x === 0 ? 0 : x === 1 ? 1 : x < .5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
const circIn = (x) => 1 - sqrt(1 - pow(x, 2));
const circOut = (x) => sqrt(1 - pow(x - 1, 2));
const backIn = (x) => {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return c3 * x * x * x - c1 * x * x;
};
const backOut = (x) => {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
};
const circInOut = (x) => x < .5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
const backInOut = (x) => {
	const c1 = 1.70158;
	const c2 = c1 * 1.525;
	return x < .5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
const elasticIn = (x) => {
	const c4 = 2 * pi / 3;
	return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
};
const elasticOut = (x) => {
	const c4 = 2 * pi / 3;
	return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - .75) * c4) + 1;
};
const bounceIn = (x) => 1 - bounceOut(1 - x);
const bell = gaussian();
const elasticInOut = (x) => {
	const c5 = 2 * pi / 4.5;
	return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
};
const bounceInOut = (x) => x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;

//#endregion
//#region ../packages/modulation/src/easing/index.ts
/**
* Creates a new easing by name
*
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const e = Easings.create(`circInOut`, 1000, elapsedMillisecondsAbsolute);
* ```
* @param nameOrFunction Name of easing, or an easing function
* @param duration Duration (meaning depends on timer source)
* @param timerSource Timer source
* @returns
*/
let easingsMap;
/**
* Returns an easing function by name. Throws an error if
* easing is not found.
*
* ```js
* import { Easings } from "https://unpkg.com/ixfx/dist/modulation.js";
* const fn = Easings.get(`sineIn`);
* // Returns 'eased' transformation of 0.5
* fn(0.5);
* ```
* @param easingName eg `sineIn`
* @returns Easing function
*/
const get = function(easingName) {
	resultThrow(stringTest(easingName, `non-empty`, `easingName`));
	const found = cacheEasings().get(easingName.toLowerCase());
	if (found === void 0) throw new Error(`Easing not found: '${easingName}'`);
	return found;
};
function cacheEasings() {
	if (easingsMap === void 0) {
		easingsMap = new Map();
		for (const [k, v] of Object.entries(easings_named_exports)) easingsMap.set(k.toLowerCase(), v);
		return easingsMap;
	} else return easingsMap;
}

//#endregion
//#region ../packages/modulation/src/interpolate.ts
/**
* Interpolates between `a` and `b` by `amount`. Aka `lerp`.
*
* [ixfx Guide on Interpolation](https://ixfx.fun/data/interpolation/overview/)
*
* @example Get the halfway point between 30 and 60
* ```js
* import { interpolate } from 'https://unpkg.com/ixfx/dist/numbers.js';
* interpolate(0.5, 30, 60);
* ```
*
* See also {@link interpolatorStepped} and {@link interpolatorInterval} for functions
* which help to manage progression from A->B over steps or interval.
* 
* Usually interpolation amount is on a 0...1 scale, inclusive. What is the interpolation result
* if this scale is exceeded? By default it is clamped to 0..1, so the return value is always between `a` and `b` (inclusive).
* 
* Alternatively, set the `limits` option to process `amount`:
* * 'wrap': wrap amount, eg 1.5 is the same as 0.5, 2 is the same as 1
* * 'ignore': allow exceeding values. eg 1.5 will yield b*1.5.
* * 'clamp': default behaviour of clamping interpolation amount to 0..1
* 
* Interpolation can be non-linear using 'easing' option or 'transform' funciton.
* ```js
* interpolate(0.1, 0, 100, { easing: `quadIn` });
* ```
* To interpolate certain types: {@link Visual.Colour.interpolator | Visual.Colour.interpolator }, {@link Geometry.Points.interpolate | Points.interpolate}.
* 
* There are a few variations when calling `interpolate`, depending on what parameters are fixed.
* * `interpolate(amount)`: returns a function that needs a & b 
* * `interpolate(a, b)`:  returns a function that needs the interpolation amount
*/
function interpolate$1(pos1, pos2, pos3, pos4) {
	let amountProcess;
	let limits = `clamp`;
	const handleAmount = (amount) => {
		if (amountProcess) amount = amountProcess(amount);
		if (limits === void 0 || limits === `clamp`) amount = clamp(amount);
		else if (limits === `wrap`) {
			if (amount > 1) amount = amount % 1;
			else if (amount < 0) amount = 1 + amount % 1;
		}
		return amount;
	};
	const doTheEase = (_amt, _a, _b) => {
		resultThrow(numberTest(_a, ``, `a`), numberTest(_b, ``, `b`), numberTest(_amt, ``, `amount`));
		_amt = handleAmount(_amt);
		return (1 - _amt) * _a + _amt * _b;
	};
	const readOpts = (o = {}) => {
		if (o.easing) {
			const easer = get(o.easing);
			if (!easer) throw new Error(`Easing function '${o.easing}' not found`);
			amountProcess = easer;
		} else if (o.transform) {
			if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
			amountProcess = o.transform;
		}
		limits = o.limits ?? `clamp`;
	};
	const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
	if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
	if (typeof pos2 === `number`) {
		let a;
		let b;
		if (pos3 === void 0 || typeof pos3 === `object`) {
			a = pos1;
			b = pos2;
			readOpts(pos3);
			return (amount) => doTheEase(amount, a, b);
		} else if (typeof pos3 === `number`) {
			a = pos2;
			b = pos3;
			readOpts(pos4);
			return doTheEase(pos1, a, b);
		} else throw new Error(`Values for 'a' and 'b' not defined`);
	} else if (pos2 === void 0 || typeof pos2 === `object`) {
		const amount = handleAmount(pos1);
		readOpts(pos2);
		resultThrow(numberTest(amount, ``, `amount`));
		return (aValue, bValue) => rawEase(amount, aValue, bValue);
	}
}

//#endregion
//#region ../packages/rx/dist/src/ops/interpolate.js
/**
* Interpolates to the source value.
*
* Outputs one value for every input value. Thus, to interpolation
* over time, it's necessary to get the source to emit values at the desired rate.
*
* Options can specify an easing name or custom transform of easing progress.
* @param input
* @param options
* @returns
*/
function interpolate(input, options = {}) {
	const amount = options.amount ?? .1;
	const snapAt = options.snapAt ?? .99;
	const index = interpolate$1(amount, options);
	return computeWithPrevious(input, (previous, target) => {
		const v = index(previous, target);
		if (target > previous) {
			if (v / target >= snapAt) return target;
		}
		return v;
	});
}
/**
* From the basis of an input stream of values, run a function over
* each value. The function takes in the last value from the stream as well as the current.
* @param input
* @param fn
* @returns
*/

//#endregion
//#region ../packages/process/src/basic.ts
/**
* Outputs the current largest-seen value
* @returns 
*/
const max$1 = () => {
	let max$2 = Number.MIN_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			max$2 = Math.max(subValue, max$2);
		}
		return max$2;
	};
	return compute;
};
/**
* Outputs the current smallest-seen value
* @returns
*/
const min$1 = () => {
	let min$2 = Number.MAX_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			min$2 = Math.min(subValue, min$2);
		}
		return min$2;
	};
	return compute;
};
/**
* Returns a sum of values
* @returns 
*/
const sum$1 = () => {
	let t = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			t += subValue;
		}
		return t;
	};
	return compute;
};
/**
* Returns the current average of input values
* @returns 
*/
const average$1 = () => {
	let total = 0;
	let tally$2 = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			tally$2++;
			total += subValue;
		}
		return total / tally$2;
	};
	return compute;
};
/**
* Returns the tally (ie number of) values
* @param countArrayItems 
* @returns 
*/
const tally$1 = (countArrayItems) => {
	let t = 0;
	const compute = (value) => {
		if (countArrayItems) if (Array.isArray(value)) t += value.length;
		else t++;
		else t++;
		return t;
	};
	return compute;
};
/**
* Returns the 'best' value seen so far as determined by a ranking function.
* This is similar to min/max but usable for objects.
* @param r 
* @param options 
* @returns 
*/
function rank$1(r, options = {}) {
	const includeType = options.includeType;
	const emitEqualRanked = options.emitEqualRanked ?? false;
	const emitRepeatHighest = options.emitRepeatHighest ?? false;
	let best;
	return (value) => {
		if (includeType && typeof value !== includeType) return;
		if (best === void 0) {
			best = value;
			return best;
		} else {
			const result = r(value, best);
			if (result == `a`) {
				best = value;
				return best;
			} else if (result === `eq` && emitEqualRanked) return best;
			else if (emitRepeatHighest) return best;
		}
	};
}

//#endregion
//#region ../packages/rx/dist/src/ops/math.js
function max(input, options) {
	const p = max$1();
	return process(p, `max`, input, options);
}
function min(input, options) {
	const p = min$1();
	return process(p, `min`, input, options);
}
function average(input, options) {
	const p = average$1();
	return process(p, `average`, input, options);
}
function sum(input, options) {
	const p = sum$1();
	return process(p, `sum`, input, options);
}
function tally(input, options = {}) {
	const countArrayItems = options.countArrayItems ?? true;
	const p = tally$1(countArrayItems);
	return process(p, `tally`, input, options);
}
function rank(input, rank$2, options) {
	const p = rank$1(rank$2, options);
	return process(p, `rank`, input, options);
}
function process(processor, annotationField, input, options = {}) {
	const annotate$1 = options.annotate;
	let previous;
	const skipUndefined = options.skipUndefined ?? true;
	const skipIdentical = options.skipIdentical ?? true;
	const upstream = initUpstream(input, {
		...options,
		onValue(value) {
			const x = processor(value);
			if (x === void 0 && skipUndefined) return;
			if (skipIdentical && x === previous) return;
			previous = x;
			if (annotate$1) {
				const ret = { value };
				ret[annotationField] = x;
				upstream.set(ret);
			} else upstream.set(x);
		}
	});
	return toReadable(upstream);
}

//#endregion
//#region ../packages/rx/dist/src/ops/pipe.js
/**
* Pipes the output of one stream into another, in order.
* The stream returned is a new stream which captures the final output.
*
* If any stream in the pipe closes the whole pipe is closed.
* @param streams
* @returns
*/
const pipe = (...streams) => {
	const event$1 = initStream();
	const unsubs = [];
	const performDispose = (reason) => {
		for (const s of streams) if (!s.isDisposed) s.dispose(reason);
		for (const s of unsubs) s();
		event$1.dispose(reason);
	};
	for (let index = 0; index < streams.length; index++) unsubs.push(streams[index].on((message) => {
		const isLast = index === streams.length - 1;
		if (messageHasValue(message)) if (isLast) event$1.set(message.value);
		else streams[index + 1].set(message.value);
		else if (messageIsDoneSignal(message)) performDispose(`Upstream disposed`);
	}));
	return {
		on: event$1.on,
		onValue: event$1.onValue,
		dispose(reason) {
			performDispose(reason);
		},
		isDisposed() {
			return event$1.isDisposed();
		}
	};
};

//#endregion
//#region ../packages/rx/dist/src/ops/single-from-array.js
/**
* For a stream that emits arrays of values, this op will select a single value.
*
* Can select based on:
* * predicate: a function that returns _true_ for a value
* * at: selection based on array index (can be combined with random ordering to select a random value)
*
* ```js
* // If source is Reactive<Array<number>>, picks the first even number
* singleFromArray(source, {
*  predicate: v => v % 2 === 0
* });
*
* // Selects a random value from source
* singleFromArray(source, {
*  order: `random`,
*  at: 0
* });
* ```
*
* If neither `predicate` or `at` options are given, exception is thrown.
* @param source Source to read from
* @param options Options for selection
* @returns
*/
function singleFromArray(source, options = {}) {
	const order = options.order ?? `default`;
	if (!options.at && !options.predicate) throw new Error(`Options must have 'predicate' or 'at' fields`);
	let preprocess = (values) => values;
	if (order === `random`) preprocess = shuffle;
	else if (typeof order === `function`) preprocess = (values) => values.toSorted(order);
	const upstream = initUpstream(source, { onValue(values) {
		values = preprocess(values);
		if (options.predicate) {
			for (const v of values) if (options.predicate(v)) upstream.set(v);
		} else if (options.at) upstream.set(values.at(options.at));
	} });
	return upstream;
}

//#endregion
//#region ../packages/rx/dist/src/ops/split.js
/**
* Creates a set of streams each of which receives data from `source`.
* By default these are lazy and dispose if the upstream source closes.
*
* See also {@link splitLabelled} to split into named streams.
* @param rxOrSource
* @param options
* @returns
*/
const split = (rxOrSource, options = {}) => {
	const quantity = options.quantity ?? 2;
	const outputs = [];
	const source = resolveSource(rxOrSource);
	for (let index = 0; index < quantity; index++) outputs.push(initUpstream(source, {
		disposeIfSourceDone: true,
		lazy: `initial`
	}));
	return outputs;
};
/**
* Splits `source` into several duplicated streams.
* Returns an object with keys according to `labels`.
* Each value is a stream which echos the values from `source`.
* ```js
* const { a, b, c} = splitLabelled(source, `a`, `b`, `c`);
* // a, b, c are Reactive types
* ```
*
* See also {@link split} to get an unlabelled split
* @param rxOrSource
* @param labels
* @returns
*/
const splitLabelled = (rxOrSource, labels) => {
	const source = resolveSource(rxOrSource);
	const t = {};
	for (const label of labels) t[label] = initUpstream(source, {
		lazy: `initial`,
		disposeIfSourceDone: true
	});
	return t;
};

//#endregion
//#region ../packages/rx/dist/src/ops/switcher.js
/**
* Switcher generates several output streams, labelled according to the values of `cases`.
* Values from `source` are fed to the output streams if their associated predicate function returns _true_.
*
* In this way, we can split one input stream into several output streams, each potentially getting a different
* subset of the input.
*
* With `options`, you can specify whether to send to multiple outputs if several match, or just the first (default behaviour).
*
* The below example shows setting up a switcher and consuming the output streams.
* @example
* ```js
* // Initialise a reactive number, starting at 0
* const switcherSource = Reactive.number(0);
* // Set up the switcher
* const x = Reactive.switcher(switcherSource, {
*  even: v => v % 2 === 0,
*  odd: v => v % 2 !== 0
* });
* // Listen for outputs from each of the resulting streams
* x.even.on(msg => {
*   log(`even: ${msg.value}`);
* });
* x.odd.on(msg => {
*   log(`odd: ${msg.value}`);
* })
* // Set new values to the number source, counting upwards
* // ...this will in turn trigger the outputs above
* setInterval(() => {
*   switcherSource.set(switcherSource.last() + 1);
* }, 1000);
* ```
*
* If `source` closes, all the output streams will be closed as well.
* @param reactiveOrSource
* @param cases
* @param options
* @returns
*/
const switcher = (reactiveOrSource, cases, options = {}) => {
	const match = options.match ?? `first`;
	const source = resolveSource(reactiveOrSource);
	let disposed = false;
	const t = {};
	for (const label of Object.keys(cases)) t[label] = initStream();
	const performDispose = () => {
		if (disposed) return;
		unsub();
		disposed = true;
		for (const stream of Object.values(t)) stream.dispose(`switcher source dispose`);
	};
	const unsub = source.on((message) => {
		if (messageHasValue(message)) {
			for (const [lbl, pred] of Object.entries(cases)) if (pred(message.value)) {
				t[lbl].set(message.value);
				if (match === `first`) break;
			}
		} else if (messageIsDoneSignal(message)) performDispose();
	});
	return t;
};

//#endregion
//#region ../packages/rx/dist/src/ops/sync-to-array.js
/**
* Waits for all sources to produce a value, sending the combined results as an array.
* After sending, it waits again for each source to send at least one value.
*
* Use {@link syncToObject} to output objects based on labelled sources rather than an array of values.
*
* Pace will be set by the slowest source. Alternatively, use {@link combineLatestToArray} where the rate is determined by fastest source.
*
* Only complete results are sent. For example if source A & B finish and source C is still producing values,
* synchronisation is not possible because A & B stopped producing values. Thus the stream will self-terminate
* after `maximumWait` (2 seconds). The newer values from C are lost.
*/
function syncToArray(reactiveSources, options = {}) {
	const onSourceDone = options.onSourceDone ?? `break`;
	const finalValue = options.finalValue ?? `undefined`;
	const maximumWait = intervalToMs(options.maximumWait, 2e3);
	let watchdog;
	const data = [];
	const states = reactiveSources.map((source) => ({
		finalData: void 0,
		done: false,
		source: resolveSource(source),
		unsub: () => {}
	}));
	const unsubscribe = () => {
		for (const s of states) {
			s.unsub();
			s.unsub = () => {};
		}
	};
	const isDataSetComplete = () => {
		for (let index = 0; index < data.length; index++) {
			if (onSourceDone === `allow` && states[index].done) continue;
			if (data[index] === void 0) return false;
		}
		return true;
	};
	const hasIncompleteSource = () => states.some((s) => !s.done);
	const resetDataSet = () => {
		for (let index = 0; index < data.length; index++) {
			if (finalValue === `last` && states[index].done) continue;
			data[index] = void 0;
		}
	};
	const onWatchdog = () => {
		done(`Sync timeout exceeded (${maximumWait.toString()})`);
	};
	const done = (reason) => {
		if (watchdog) clearTimeout(watchdog);
		unsubscribe();
		event$1.dispose(reason);
	};
	const init$1 = () => {
		watchdog = setTimeout(onWatchdog, maximumWait);
		for (const [index, state] of states.entries()) {
			data[index] = void 0;
			state.unsub = state.source.on((valueChanged) => {
				if (messageIsSignal(valueChanged)) {
					if (valueChanged.signal === `done`) {
						state.finalData = data[index];
						state.unsub();
						state.done = true;
						state.unsub = () => {};
						if (finalValue === `undefined`) data[index] = void 0;
						if (onSourceDone === `break`) {
							done(`Source '${index.toString()}' done, and onSourceDone:'break' is set`);
							return;
						}
						if (!hasIncompleteSource()) {
							done(`All sources done`);
							return;
						}
					}
					return;
				}
				data[index] = valueChanged.value;
				if (isDataSetComplete()) {
					event$1.set([...data]);
					resetDataSet();
					if (watchdog) clearTimeout(watchdog);
					watchdog = setTimeout(onWatchdog, maximumWait);
				}
			});
		}
	};
	const event$1 = initStream({
		onFirstSubscribe() {
			unsubscribe();
			init$1();
		},
		onNoSubscribers() {
			if (watchdog) clearTimeout(watchdog);
			unsubscribe();
		}
	});
	return {
		dispose: event$1.dispose,
		isDisposed: event$1.isDisposed,
		on: event$1.on,
		onValue: event$1.onValue
	};
}

//#endregion
//#region ../packages/rx/dist/src/ops/sync-to-object.js
function syncToObject(reactiveSources, options = {}) {
	const keys = Object.keys(reactiveSources);
	const values = Object.values(reactiveSources);
	const s = syncToArray(values, options);
	const st = transform(s, (streamValues) => {
		return zipKeyValue(keys, streamValues);
	});
	return st;
}

//#endregion
//#region ../packages/rx/dist/src/ops/tap.js
/**
* 'Taps' the values from 'input', passing them to the 'process' function.
* Return stream is the input stream, unaffected by what 'process' does.
* @param input Input stream
* @param processors List of processors
* @returns
*/
function tapProcess(input, ...processors) {
	const inputStream = resolveSource(input);
	const chain = Process.flow(...processors);
	inputStream.onValue((value) => {
		chain(value);
	});
	return inputStream;
}
/**
* 'Taps' the values from 'input', passing them to 'diverged'
* Returns the original input stream, unaffected by what 'diverged' does.
* @param input Input stream
* @param diverged Stream to write to
* @returns
*/
function tapStream(input, diverged) {
	const inputStream = resolveSource(input);
	inputStream.onValue((value) => {
		diverged.set(value);
	});
	return inputStream;
}
/**
* Create a parallel 'tap' of processing
* @param input Input stream
* @param ops Series of ops to process data
* @returns
*/
const tapOps = (input, ...ops) => {
	for (const op of ops) input = op(input);
	return input;
};

//#endregion
//#region ../packages/rx/dist/src/ops/throttle.js
/**
* Only allow a value through if a minimum amount of time has elapsed.
* since the last value. This effectively slows down a source to a given number
* of values/ms. Values emitted by the source which are too fast are discarded.
*
* Throttle will fire on the first value received.
*
* In more detail:
* Every time throttle passes a value, it records the time it allowed something through. For every
* value received, it checks the elapsed time against this timestamp, throwing away values if
* the period hasn't elapsed.
*
* With this logic, a fury of values of the source might be discarded if they fall within the elapsed time
* window. But then if there is not a new value for a while, the actual duration between values can be longer
* than expected. This is in contrast to {@link debounce}, which will emit the last value received after a duration,
* even if the source stops sending.
* @param options
* @returns
*/
function throttle(throttleSource, options = {}) {
	const elapsed$1 = intervalToMs(options.elapsed, 0);
	let lastFire = performance.now();
	let lastValue;
	const upstream = initUpstream(throttleSource, {
		...options,
		onValue(value) {
			lastValue = value;
			trigger();
		}
	});
	const trigger = () => {
		const now = performance.now();
		if (elapsed$1 > 0 && now - lastFire > elapsed$1) {
			lastFire = now;
			if (lastValue !== void 0) upstream.set(lastValue);
		}
	};
	return toReadable(upstream);
}

//#endregion
//#region ../packages/rx/dist/src/ops/timeout-value.js
/**
* Emits a value if `source` does not emit a value after `interval`
* has elapsed. This can be useful to reset a reactive to some
* 'zero' state if nothing is going on.
*
* If `source` emits faster than the `interval`, it won't get triggered.
*
* Default for 'timeout': 1000s.
*
* ```js
* // Emit 'hello' if 'source' doesn't emit a value after 1 minute
* const r = Rx.timeoutValue(source, { value: 'hello', interval: { mins: 1 } });
* ```
*
* Can also emit results from a function or generator
* ```js
* // Emits a random number if 'source' doesn't emit a value after 500ms
* const r = Rx.timeoutValue(source, { fn: Math.random, interval: 500 });
* ```
*
* If `immediate` option is _true_ (default), the timer starts from stream initialisation.
* Otherwise it won't start until it observes the first value from `source`.
* @param source
* @param options
*/
function timeoutValue(source, options) {
	let timer;
	const immediate = options.immediate ?? true;
	const repeat = options.repeat ?? false;
	const timeoutMs = intervalToMs(options.interval, 1e3);
	if (!isTrigger(options)) throw new Error(`Param 'options' does not contain trigger 'value' or 'fn' fields`);
	const sendFallback = () => {
		const [value, done] = resolveTriggerValue(options);
		if (done) events.dispose(`Trigger completed`);
		else {
			if (events.isDisposed()) return;
			events.set(value);
			if (repeat) timer = setTimeout(sendFallback, timeoutMs);
		}
	};
	const events = initUpstream(source, {
		disposeIfSourceDone: true,
		onValue(v) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(sendFallback, timeoutMs);
			events.set(v);
		},
		onDispose() {
			if (timer) clearTimeout(timer);
		}
	});
	if (immediate && !timer) timer = setTimeout(sendFallback, timeoutMs);
	return events;
}

//#endregion
//#region ../packages/rx/dist/src/ops/timeout-ping.js
/**
* Pings a reactive if no value is emitted at after `interval`.
* Returns `source`.
*
* ```js
* // Ping `source` if no value is emitted after one minute
* const r = Rx.timeoutPing(source, { mins: 1 });
* ```
*
* Behavior can be stopped using an abort signal.
* @see {@link ReactivePingable}
* @param source
* @param options
*/
function timeoutPing(source, options) {
	let timer;
	const rx = resolveSource(source);
	const abort = options.abort;
	const timeoutMs = intervalToMs(options, 1e3);
	const sendPing = () => {
		if (abort?.aborted || rx.isDisposed()) {
			off();
			return;
		}
		if (isPingable(rx)) rx.ping();
		timer = setTimeout(sendPing, timeoutMs);
	};
	const cancel = () => {
		if (timer) clearTimeout(timer);
	};
	const off = rx.on((message) => {
		if (messageHasValue(message)) {
			cancel();
			timer = setTimeout(sendPing, timeoutMs);
		} else if (messageIsDoneSignal(message)) {
			off();
			cancel();
		}
	});
	timer = setTimeout(sendPing, timeoutMs);
	return rx;
}

//#endregion
//#region ../packages/rx/dist/src/ops/value-to-ping.js
/**
* Pings `target` whenever `source` emits a value. The value itself is ignored, it just
* acts as a trigger.
*
* Returns a new stream capturing the output of `target`.
*
* It `source` or `target` closes, output stream closes too.
*
* @returns
*/
function valueToPing(source, target, options = {}) {
	const lazy = options.lazy ?? `initial`;
	const signal = options.signal;
	const sourceRx = resolveSource(source);
	const gate = options.gate ?? ((value) => true);
	let upstreamOff;
	let downstreamOff;
	if (signal) signal.addEventListener(`abort`, () => {
		done(`Abort signal ${signal.reason}`);
	}, { once: true });
	const events = initStream({
		onFirstSubscribe() {
			if (lazy !== `never` && upstreamOff === void 0) start();
		},
		onNoSubscribers() {
			if (lazy === `very` && upstreamOff !== void 0) {
				upstreamOff();
				upstreamOff = void 0;
			}
		}
	});
	const start = () => {
		upstreamOff = sourceRx.on((message) => {
			if (messageIsDoneSignal(message)) done(`Upstream closed`);
			else if (messageIsSignal(message)) events.signal(message.signal);
			else if (messageHasValue(message)) {
				if (gate(message.value)) target.ping();
			}
		});
		downstreamOff = target.on((message) => {
			if (messageIsDoneSignal(message)) done(`Downstream closed`);
			else if (messageIsSignal(message)) events.signal(message.signal, message.context);
			else if (messageHasValue(message)) events.set(message.value);
		});
	};
	const done = (reason) => {
		events.dispose(reason);
		if (upstreamOff) upstreamOff();
		if (downstreamOff) downstreamOff();
	};
	if (lazy === `never`) start();
	return events;
}

//#endregion
//#region ../packages/rx/dist/src/ops/with-value.js
/**
* A reactive where the last value can be read at any time.
* An initial value must be provided.
* ```js
* const r = Rx.withValue(source, { initial: `hello` });
* r.last(); // Read last value
* ```
*
* Warning: Since most reactives only active when subscribed to, it's important to also subscribe
* to the results of `r` for this flow to happen. Alternatively, use `lazy: 'never'` as an option.
* @param input
* @param options
* @returns
*/
function withValue(input, options) {
	let lastValue = options.initial;
	const upstream = initUpstream(input, {
		...options,
		onValue(value) {
			lastValue = value;
			upstream.set(value);
		}
	});
	const readable = toReadable(upstream);
	return {
		...readable,
		last() {
			return lastValue;
		}
	};
}

//#endregion
//#region ../packages/rx/dist/src/graph.js
/**
* Build a graph of reactive dependencies for `rx`
* @param _rx
*/
function prepare(_rx) {
	let g = graph();
	const nodes = new Map();
	const events = initStream();
	const process$1 = (o, path) => {
		for (const [key, value] of Object.entries(o)) {
			const subPath = path + `.` + key;
			g = connect(g, {
				from: path,
				to: subPath
			});
			if (isReactive(value)) {
				nodes.set(subPath, {
					value,
					type: `rx`
				});
				value.on((v) => {
					console.log(`Rx.prepare value: ${JSON.stringify(v)} path: ${subPath}`);
				});
			} else {
				const valueType = typeof value;
				if (valueType === `bigint` || valueType === `boolean` || valueType === `number` || valueType === `string`) nodes.set(subPath, {
					type: `primitive`,
					value
				});
				else if (valueType === `object`) process$1(value, subPath);
				else if (valueType === `function`) console.log(`Rx.process - not handling functions`);
			}
		}
	};
	const returnValue = {
		dispose: events.dispose,
		isDisposed: events.isDisposed,
		graph: g,
		on: events.on,
		onValue: events.onValue
	};
	return returnValue;
}

//#endregion
//#region ../packages/rx/dist/src/types.js
const symbol = Symbol(`Rx`);

//#endregion
//#region ../packages/rx/dist/src/to-array.js
/**
* Reads a set number of values from `source`, returning as an array. May contain
* empty values if desired values is not reached.
*
* After the limit is reached (or `source` completes), `source` is unsubscribed from.
*
* If no limit is set, it will read until `source` completes or `maximumWait` is reached.
* `maximumWait` is 10 seconds by default.
*
* Use {@link toArrayOrThrow} to throw if desired limit is not reached.
*
* ```js
* // Read from `source` for 5 seconds
* const data = await toArray()(source);
* // Read 5 items from `source`
* const data = await toArray({ limit: 5 })(source);
* // Read for 10s
* const data = await toArray({ maximumWait: 10_1000 })(source);
* ```
* @param source
* @param options
* @returns
*/
async function toArray(source, options = {}) {
	const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
	const maximumWait = intervalToMs(options.maximumWait, 10 * 1e3);
	const underThreshold = options.underThreshold ?? `partial`;
	const read = [];
	const rx = resolveSource(source);
	const promise = new Promise((resolve, reject) => {
		const done = () => {
			clearTimeout(maxWait);
			unsub();
			if (read.length < limit && underThreshold === `throw`) {
				reject(new Error(`Threshold not reached. Wanted: ${limit} got: ${read.length}. Maximum wait: ${maximumWait}`));
				return;
			}
			if (read.length < limit && underThreshold === `fill`) {
				for (let index = 0; index < limit; index++) if (read[index] === void 0) read[index] = options.fillValue;
			}
			resolve(read);
		};
		const maxWait = setTimeout(() => {
			done();
		}, maximumWait);
		const unsub = rx.on((message) => {
			if (messageIsDoneSignal(message)) done();
			else if (messageHasValue(message)) {
				read.push(message.value);
				if (read.length === limit) done();
			}
		});
	});
	return promise;
}
/**
* By default, reads all the values from `source`, or until 5 seconds has elapsed.
*
* If `limit` is provided as an option, it will exit early, or throw if that number of values was not acheived.
*
* ```js
* // Read from `source` for 5 seconds
* const data = await toArrayOrThrow()(source);
* // Read 5 items from `source`
* const data = await toArrayOrThrow({ limit: 5 })(source);
* // Read for 10s
* const data = await toArrayOrThrow({ maximumWait: 10_1000 })(source);
* ```
* @param source
* @param options
* @returns
*/
async function toArrayOrThrow(source, options = {}) {
	const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
	const maximumWait = options.maximumWait ?? 5 * 1e3;
	const v = await toArray(source, {
		limit,
		maximumWait,
		underThreshold: `partial`
	});
	if (options.limit && v.length < options.limit) throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v.length}`);
	return v;
}

//#endregion
//#region ../packages/rx/dist/src/to-generator.js
/**
* Returns an AsyncGenerator wrapper around Reactive.
* This allows values to be iterated over using a `for await` loop,
* like Chains.
*
* ```js
* // Reactive numerical value
* const number = Reactive.number(10);
*
* const g = Reactive.toGenerator(number);
* for await (const v of g) {
*  console.log(v); // Prints out whenever the reactive value changes
* }
* // Execution doesn't continue until Reactive finishes
* ```
*
* When/if `source` closes, an exception is thrown.
* To catch this, wrap the calling `for await` in a try-catch block
* ```js
* try {
*  for await (const v of g) {
*  }
* } catch (error) {
* }
* // Completed
* ```
*
* Use something like `setTimeout` to loop over the generator
* without impeding the rest of your code flow. For example:
* ```js
* // Listen for every pointerup event
* const ptr = Reactive.fromEvent(document.body, `pointerup`);
* // Start iterating
* setTimeout(async () => {
*  const gen = Reactive.toGenerator(ptr);
*  try {
*    for await (const v of gen) {
*      // Prints out whenever there is a click
*      console.log(v);
*    }
*  } catch (e) { }
*  console.log(`Iteration done`);
* });
*
* // Execution continues here immediately
* ```
* @param source
*/
async function* toGenerator(source) {
	const s = resolveSource(source);
	let promiseResolve = (_) => {};
	let promiseReject = (_) => {};
	const promiseInit = () => new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	let promise = promiseInit();
	let keepRunning = true;
	s.on((message) => {
		if (messageHasValue(message)) {
			promiseResolve(message.value);
			promise = promiseInit();
		} else if (messageIsDoneSignal(message)) {
			keepRunning = false;
			promiseReject(`Source has completed`);
		}
	});
	while (keepRunning) yield await promise;
}

//#endregion
//#region ../packages/rx/dist/src/wrap.js
/**
* Wrap a reactive source to allow for chained
* function calls.
*
* Example:
* For every `pointerup` event on the body, chunk the events over
* periods of 200ms, get the number of events in that period,
* and print it out.
*
* eg. detecting single or double-clicks
* ```js
* wrap(Rx.fromEvent<{ x: number, y: number }>(document.body, `pointerup`))
*  .chunk({ elapsed: 200 })
*  .transform(v => v.length)
*  .onValue(v => { console.log(v) });
* ```
* @param source
* @returns
*/
function wrap(source) {
	return {
		source: resolveSource(source),
		enacts: { setHtmlText: (options) => {
			return setHtmlText(source, options);
		} },
		annotate: (transformer) => {
			const a = annotate(source, transformer);
			return wrap(a);
		},
		annotateWithOp: (op) => {
			const a = annotateWithOp(source, op);
			return wrap(a);
		},
		chunk: (options) => {
			const w = wrap(chunk(source, options));
			return w;
		},
		debounce: (options = {}) => {
			return wrap(debounce$1(source, options));
		},
		field: (fieldName, options = {}) => {
			const f = field(source, fieldName, options);
			return wrap(f);
		},
		filter: (predicate, options) => {
			return wrap(filter(source, predicate, options));
		},
		combineLatestToArray: (sources, options = {}) => {
			const srcs = [source, ...sources];
			return wrap(combineLatestToArray(srcs, options));
		},
		combineLatestToObject: (sources, options) => {
			const name = options.name ?? `source`;
			const o = { ...sources };
			o[name] = source;
			return wrap(combineLatestToObject(o, options));
		},
		min: (options = {}) => {
			return wrap(min(source, options));
		},
		max: (options = {}) => {
			return wrap(max(source, options));
		},
		average: (options = {}) => {
			return wrap(average(source, options));
		},
		sum: (options = {}) => {
			return wrap(sum(source, options));
		},
		tally: (options = {}) => {
			return wrap(tally(source, options));
		},
		split: (options = {}) => {
			const streams = split(source, options).map((v) => wrap(v));
			return streams;
		},
		splitLabelled: (...labels) => {
			const l = splitLabelled(source, labels);
			const m = mapObjectShallow(l, (args) => wrap(args.value));
			return m;
		},
		switcher: (cases, options = {}) => {
			const s = switcher(source, cases, options);
			const m = mapObjectShallow(s, (args) => wrap(args.value));
			return m;
		},
		syncToArray: (additionalSources, options = {}) => {
			const unwrapped = [source, ...additionalSources].map((v) => resolveSource(v));
			const x = syncToArray(unwrapped, options);
			return wrap(x);
		},
		syncToObject: (sources, options = {}) => {
			const name = options.name ?? `source`;
			const o = { ...sources };
			o[name] = source;
			return wrap(syncToObject(o, options));
		},
		tapProcess: (...processors) => {
			tapProcess(source, ...processors);
			return wrap(source);
		},
		tapStream: (divergedStream) => {
			tapStream(source, divergedStream);
			return wrap(source);
		},
		tapOps: (source$1, ...ops) => {
			tapOps(source$1, ...ops);
			return wrap(source$1);
		},
		throttle: (options = {}) => {
			return wrap(throttle(source, options));
		},
		transform: (transformer, options = {}) => {
			return wrap(transform(source, transformer, options));
		},
		timeoutValue: (options) => {
			return wrap(timeoutValue(source, options));
		},
		timeoutPing: (options) => {
			return wrap(timeoutPing(source, options));
		},
		toArray: (options) => {
			return toArray(source, options);
		},
		toArrayOrThrow: (options) => {
			return toArrayOrThrow(source, options);
		},
		onValue: (callback) => {
			const s = resolveSource(source);
			s.on((message) => {
				if (messageHasValue(message)) callback(message.value);
			});
		}
	};
}

//#endregion
//#region ../packages/rx/dist/src/from/array.js
const of = (source, options = {}) => {
	if (Array.isArray(source)) return array(source, options);
};
/**
* Reads the contents of `array` into a Reactive, with optional time interval
* between values. A copy of the array is used, so changes will not
* affect the reactive.
*
* See also {@link arrayObject} which monitors changes to array values.
*
* Reads items from an array with a given interval, by default 5ms
*
* ```js
* const data = [`apples`, `oranges`, `pears` ];
* const rx = Rx.From.array(data);
* rx.onValue(v => {
*  // v will be each fruit in turn
* })
* ```
*
* Note that there is the possibility of missing values since there is delay between subscribing and when items start getting emitted.
* If a new subscriber connects to the reactive, they won't get values already emitted.
* @param sourceArray
* @param options
* @returns
*/
const array = (sourceArray, options = {}) => {
	const lazy = options.lazy ?? `initial`;
	const signal = options.signal;
	const whenStopped = options.whenStopped ?? `continue`;
	const debugLifecycle = options.debugLifecycle ?? false;
	const array$1 = [...sourceArray];
	if (lazy !== `very` && whenStopped === `reset`) throw new Error(`whenStopped:'reset' has no effect with 'lazy:${lazy}'. Use lazy:'very' instead.`);
	const intervalMs = intervalToMs(options.interval, 5);
	let index = 0;
	let lastValue = array$1[0];
	const s = initLazyStream({
		...options,
		lazy,
		onStart() {
			if (debugLifecycle) console.log(`Rx.readFromArray:onStart`);
			c.start();
		},
		onStop() {
			if (debugLifecycle) console.log(`Rx.readFromArray:onStop. whenStopped: ${whenStopped} index: ${index}`);
			c.cancel();
			if (whenStopped === `reset`) index = 0;
		}
	});
	const c = continuously(() => {
		if (signal?.aborted) {
			s.dispose(`Signalled (${signal.reason})`);
			return false;
		}
		lastValue = array$1[index];
		index++;
		s.set(lastValue);
		if (index === array$1.length) {
			s.dispose(`Source array complete`);
			return false;
		}
	}, intervalMs);
	if (!lazy) c.start();
	return {
		dispose: s.dispose,
		isDisposed: s.isDisposed,
		isDone() {
			return index === array$1.length;
		},
		last() {
			return lastValue;
		},
		on: s.on,
		onValue: s.onValue
	};
};

//#endregion
//#region ../packages/rx/dist/src/from/array-object.js
/**
* Wraps an array object.
*
* It returns an reactive along with some array-ish functions to manipulating it.
* @param initialValue
* @param options
* @returns
*/
function arrayObject(initialValue = [], options = {}) {
	const eq = options.eq ?? isEqualValueDefault;
	const setEvent = initStream();
	const arrayEvent = initStream();
	let value = initialValue;
	let disposed = false;
	const set$1 = (replacement) => {
		const diff = compareArrays(value, replacement, eq);
		value = replacement;
		setEvent.set([...replacement]);
	};
	const setAt = (index, v) => {
		value[index] = v;
		setEvent.set([...value]);
	};
	const push = (v) => {
		value = [...value, v];
		setEvent.set([...value]);
		const cr = [
			`add`,
			value.length - 1,
			v
		];
		arrayEvent.set([cr]);
	};
	const deleteAt = (index) => {
		const valueChanged = remove(value, index);
		if (valueChanged.length === value.length) return;
		const diff = compareArrays(value, valueChanged, eq);
		value = valueChanged;
		setEvent.set([...value]);
		arrayEvent.set(diff.summary);
	};
	const deleteWhere = (filter$1) => {
		const valueChanged = value.filter((v) => !filter$1(v));
		const count$1 = value.length - valueChanged.length;
		const diff = compareArrays(value, valueChanged, eq);
		value = valueChanged;
		setEvent.set([...value]);
		arrayEvent.set(diff.summary);
		return count$1;
	};
	const insertAt$1 = (index, v) => {
		const valueChanged = insertAt(value, index, v);
		const diff = compareArrays(value, valueChanged, eq);
		value = valueChanged;
		setEvent.set([...value]);
		arrayEvent.set(diff.summary);
	};
	const dispose = (reason) => {
		if (disposed) return;
		setEvent.dispose(reason);
		disposed = true;
	};
	const r = {
		dispose,
		isDisposed() {
			return disposed;
		},
		last: () => value,
		on: setEvent.on,
		onArray: arrayEvent.on,
		onValue: setEvent.onValue,
		setAt,
		push,
		deleteAt,
		deleteWhere,
		insertAt: insertAt$1,
		set: set$1
	};
	return r;
}

//#endregion
//#region ../packages/rx/dist/src/from/boolean.js
function boolean(initialValue) {
	let value = initialValue;
	const events = initStream();
	const set$1 = (v) => {
		value = v;
		events.set(v);
	};
	return {
		dispose: events.dispose,
		isDisposed: events.isDisposed,
		last: () => value,
		on: events.on,
		onValue: events.onValue,
		set: set$1
	};
}

//#endregion
//#region ../packages/rx/dist/src/from/count.js
/**
* Produces an incrementing value. By default starts at 0 and counts
* forever, incrementing every second.
*
* ```js
* const r = Rx.From.count();
* r.onValue(c => {
*  // 0, 1, 2, 3 ... every second
* });
* ```
*
* The `limit` is exclusive
* ```js
* const r = Rx.From.count({limit:5});
* // Yields 0,1,2,3,4
* ```
*
* If limit is less than start, it will count down instead.
* ```js
* const r = Rx.count({start:5, limit: 0});
* // Yie:ds 5,4,3,2,1
* ```
*
* ```js
* // Count 10, 12, 14 ... every 500ms
* const r = Rx.From.count({ start: 10, amount: 2, interval: 500 });
* ```
*
* In addition to setting `limit` (which is exclusive), you can stop with an abort signal
* ```js
* const ac = new AbortController();
* const r = Rx.From.count({signal:ac.signal});
* ...
* ac.abort(`stop`);
* ```
* @param options
*/
function count(options = {}) {
	const lazy = options.lazy ?? `initial`;
	const interval = intervalToMs(options.interval, 1e3);
	const amount = options.amount ?? 1;
	const offset = options.offset ?? 0;
	let produced = 0;
	let value = offset;
	const done = (reason) => {
		events.dispose(reason);
	};
	const timer = continuously(() => {
		if (options.signal?.aborted) {
			done(`Aborted (${options.signal.reason})`);
			return false;
		}
		events.set(value);
		value += 1;
		produced++;
		if (produced >= amount) {
			done(`Limit reached`);
			return false;
		}
	}, interval);
	const events = initLazyStream({
		onStart() {
			timer.start();
		},
		onStop() {
			timer.cancel();
		},
		onDispose() {
			timer.cancel();
		},
		lazy
	});
	return events;
}

//#endregion
//#region ../packages/rx/dist/src/from/derived.js
function derived(fn, reactiveSources, options = {}) {
	const ignoreIdentical = options.ignoreIdentical ?? true;
	const eq = options.eq ?? isEqualValueDefault;
	const sources = combineLatestToObject(reactiveSources);
	const handle = (v) => {
		const last = output.last();
		const vv = fn(v);
		if (vv !== void 0) {
			if (ignoreIdentical && last !== void 0) {
				if (eq(vv, last)) return vv;
			}
			output.set(vv);
		}
		return vv;
	};
	const s = initUpstream(sources, {
		...options,
		onValue(v) {
			handle(v);
		}
	});
	const output = cache(s, fn(sources.last()));
	return output;
}

//#endregion
//#region ../packages/rx/dist/src/from/event.js
/**
* Fired when `eventName` fires on `target`.
*
* Rather than whole event args being emitted on the stream,
* it plucks a field from the event args, or if that's missing, from the target.
*
* ```js
* // Emits the the value of a field named 'x'
* // on the change event args
* eventField(el, `pointermove`, `x`);
* ```
* @param targetOrQuery Event target, HTML element or HTML query (eg '#someId')
* @param eventName Name of event, eg. 'pointermove'
* @param fieldName Name of field, eg 'x'
* @param initialValue Initial data
* @param options Options for source
*/
function eventField(targetOrQuery, eventName, fieldName, initialValue, options = {}) {
	const initial = {};
	initial[fieldName] = initialValue;
	const rxField = field(event(targetOrQuery, eventName, initial, options), fieldName, options);
	return rxField;
}
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
	const lazy = options.lazy ?? false;
	if (initialValue === void 0) initialValue = {};
	const rxObject = object(initialValue, { deepEntries: true });
	let eventAdded = false;
	let disposed = false;
	const callback = (args) => {
		if (debugFiring) console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
		rxObject.set(args);
	};
	const remove$1 = () => {
		if (!eventAdded) return;
		eventAdded = false;
		target.removeEventListener(name, callback);
		if (debugLifecycle) console.log(`Rx.From.event remove '${name}'`);
	};
	const add$1 = () => {
		if (eventAdded) return;
		eventAdded = true;
		target.addEventListener(name, callback);
		if (debugLifecycle) console.log(`Rx.From.event add '${name}'`);
	};
	if (!lazy) add$1();
	return {
		last: () => {
			if (lazy) add$1();
			return rxObject.last();
		},
		dispose: (reason) => {
			if (disposed) return;
			disposed = true;
			remove$1();
			rxObject.dispose(reason);
		},
		isDisposed() {
			return disposed;
		},
		on: (handler) => {
			if (lazy) add$1();
			return rxObject.on(handler);
		},
		onValue: (handler) => {
			if (lazy) add$1();
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
	let count$1 = 0;
	const elapsed$1 = elapsedInterval();
	const stream = initLazyStream({
		lazy: options.lazy ?? `very`,
		onStart() {
			target.addEventListener(name, callback);
			if (debugLifecycle) console.log(`Rx.From.eventTrigger add '${name}'`);
			if (fireInitial && count$1 === 0) {
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
			sinceLast: elapsed$1(),
			total: ++count$1
		});
	};
	return stream;
}

//#endregion
//#region ../packages/rx/dist/src/from/merged.js
/**
* Returns a stream that merges the output of a list of homogenous streams.
* Use {@link mergedWithOptions} to specify additional options.
* @param sources
* @returns
*/
function merged(...sources) {
	return mergedWithOptions(sources);
}
/**
* Returns a stream that merges the output of a list of homogenous streams.
*
* @param sources
* @param options
* @returns
*/
function mergedWithOptions(sources, options = {}) {
	let unsubs = [];
	const stream = initLazyStream({
		...options,
		onStart() {
			for (const s of sources) unsubs.push(s.onValue((v) => {
				stream.set(v);
			}));
		},
		onStop() {
			for (const un of unsubs) un();
			unsubs = [];
		}
	});
	return stream;
}

//#endregion
//#region ../packages/rx/dist/src/from/number.js
function number(initialValue) {
	let value = initialValue;
	const events = initStream();
	const set$1 = (v) => {
		value = v;
		events.set(v);
	};
	return {
		dispose: events.dispose,
		isDisposed: events.isDisposed,
		last: () => value,
		on: events.on,
		onValue: events.onValue,
		set: set$1
	};
}

//#endregion
//#region ../packages/rx/dist/src/from/object-proxy.js
/**
* Creates a proxy of `target` object (or array), so that regular property setting will be intercepted and output
* on a {@link Reactive} object as well.
*
* ```js
* const { proxy, rx } = Rx.From.objectProxy({ colour: `red`, x: 10, y: 20 });
*
* rx.onValue(v => {
*  // Get notified when proxy is changed
* });
*
* // Get and set properties as usual
* console.log(proxy.x);
* proxy.x = 20; // Triggers Reactive
* ```
*
* Keep in mind that changing `target` directly won't affect the proxied object or Reactive. Thus,
* only update the proxied object after calling `fromProxy`.
*
* The benefit of `objectProxy` instead of {@link Rx.From.object} is because the proxied object can be passed to other code that doesn't need
* to know anything about Reactive objects.
*
* You can assign the return values to more meaningful names using
* JS syntax.
* ```js
* const { proxy:colour, rx:colourRx } = Rx.From.objectProxy({ colour: `red` });
* ```
*
* If `target` is an array, it's not possible to change the shape of the array by adding or removing
* elements, only by updating existing ones. This follows the same behaviour of objects. Alternatively, use {@link arrayProxy}.
*
* See also:
* * {@link objectProxySymbol}: Instead of {proxy,rx} return result, puts the `rx` under a symbol on the proxy.
* * {@link arrayProxy}: Proxy an array, allowing inserts and deletes.
* @param target
* @returns
*/
const objectProxy = (target) => {
	const rx = object(target);
	const proxy = new Proxy(target, { set(target$1, p, newValue, _receiver) {
		const isArray = Array.isArray(target$1);
		if (isArray && p === `length`) return true;
		if (typeof p === `string`) rx.updateField(p, newValue);
		if (isArray && typeof p === `string`) {
			const pAsNumber = Number.parseInt(p);
			if (!Number.isNaN(pAsNumber)) {
				target$1[pAsNumber] = newValue;
				return true;
			}
		}
		target$1[p] = newValue;
		return true;
	} });
	return {
		proxy,
		rx
	};
};
const arrayProxy = (target) => {
	const rx = arrayObject(target);
	const proxy = new Proxy(target, { set(target$1, p, newValue, _receiver) {
		if (p === `length`) return true;
		if (typeof p !== `string`) throw new Error(`Expected numeric index, got type: ${typeof p} value: ${JSON.stringify(p)}`);
		const pAsNumber = Number.parseInt(p);
		if (!Number.isNaN(pAsNumber)) {
			rx.setAt(pAsNumber, newValue);
			target$1[pAsNumber] = newValue;
			return true;
		} else throw new Error(`Expected numeric index, got: '${p}'`);
	} });
	return {
		proxy,
		rx
	};
};
/**
* Same as {@link proxy}, but the return value is the proxied object along with
* the Reactive wrapped as symbol property.
*
* ```js
* const person = Rx.fromProxySymbol({name: `marie` });
* person.name = `blah`;
* person[Rx.symbol].on(msg => {
*  // Value changed...
* });
* ```
*
* This means of access can be useful as the return result
* is a bit neater, being a single object instead of two.
* @param target
* @returns
*/
const objectProxySymbol = (target) => {
	const { proxy, rx } = objectProxy(target);
	const p = proxy;
	p[symbol] = rx;
	return p;
};

//#endregion
//#region ../packages/rx/dist/src/from/observable.js
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
//#region ../packages/rx/dist/src/from/string.js
function string(initialValue) {
	let value = initialValue;
	const events = initStream();
	const set$1 = (v) => {
		value = v;
		events.set(v);
	};
	return {
		dispose: events.dispose,
		isDisposed: events.isDisposed,
		last: () => value,
		on: events.on,
		onValue: events.onValue,
		set: set$1
	};
}

//#endregion
//#region ../packages/rx/dist/src/from/index.js
var from_exports = {};
__export(from_exports, {
	array: () => array,
	arrayObject: () => arrayObject,
	arrayProxy: () => arrayProxy,
	boolean: () => boolean,
	count: () => count,
	derived: () => derived,
	event: () => event,
	eventField: () => eventField,
	eventTrigger: () => eventTrigger,
	func: () => func,
	iterator: () => iterator,
	merged: () => merged,
	mergedWithOptions: () => mergedWithOptions,
	number: () => number,
	object: () => object,
	objectProxy: () => objectProxy,
	objectProxySymbol: () => objectProxySymbol,
	observable: () => observable,
	observableWritable: () => observableWritable,
	of: () => of,
	string: () => string
});

//#endregion
//#region ../packages/rx/dist/src/index.js
function run(source, ...ops) {
	let s = resolveSource(source);
	for (const op of ops) s = op(s);
	return s;
}
function writable(source, ...ops) {
	let s = resolveSource(source);
	const head = s;
	for (const op of ops) s = op(s);
	const ss = s;
	return {
		...ss,
		set(value) {
			if (isWritable(head)) head.set(value);
			else throw new Error(`Original source is not writable`);
		}
	};
}
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
const Sinks = { setHtmlText: (options) => {
	return (source) => {
		setHtmlText(source, options);
	};
} };
const Ops = {
	annotate: (annotator) => opify(annotate, annotator),
	annotateWithOp: (annotatorOp) => opify(annotateWithOp, annotatorOp),
	chunk: (options) => {
		return (source) => {
			return chunk(source, options);
		};
	},
	cloneFromFields: () => {
		return (source) => {
			return cloneFromFields(source);
		};
	},
	combineLatestToArray: (options = {}) => {
		return (sources) => {
			return combineLatestToArray(sources, options);
		};
	},
	combineLatestToObject: (options = {}) => {
		return (reactiveSources) => {
			return combineLatestToObject(reactiveSources, options);
		};
	},
	drop: (predicate) => opify(drop, predicate),
	elapsed: () => opify(elapsed),
	field: (fieldName, options) => {
		return (source) => {
			return field(source, fieldName, options);
		};
	},
	filter: (predicate) => opify(filter, predicate),
	interpolate: (options) => opify(interpolate, options),
	min: (options) => opify(min, options),
	max: (options) => opify(max, options),
	sum: (options) => opify(sum, options),
	average: (options) => opify(average, options),
	tally: (options) => opify(tally, options),
	rank: (rank$2, options) => opify(rank, rank$2, options),
	pipe: (...streams) => {
		return (source) => {
			const resolved = resolveSource(source);
			const s = [resolved, ...streams];
			return pipe(...s);
		};
	},
	singleFromArray: (options = {}) => {
		return (source) => {
			return singleFromArray(source, options);
		};
	},
	split: (options = {}) => {
		return (source) => {
			return split(source, options);
		};
	},
	splitLabelled: (labels) => {
		return (source) => {
			return splitLabelled(source, labels);
		};
	},
	switcher: (cases, options = {}) => {
		return (source) => {
			return switcher(source, cases, options);
		};
	},
	syncToArray: (options = {}) => {
		return (reactiveSources) => {
			return syncToArray(reactiveSources, options);
		};
	},
	syncToObject: (options = {}) => {
		return (reactiveSources) => {
			return syncToObject(reactiveSources, options);
		};
	},
	tapProcess: (processor) => {
		return (source) => {
			return tapProcess(source, processor);
		};
	},
	tapStream: (divergedStream) => {
		return (source) => {
			return tapStream(source, divergedStream);
		};
	},
	tapOps: (...ops) => {
		return (source) => {
			return tapOps(source, ...ops);
		};
	},
	throttle: (options) => opify(throttle, options),
	timeoutValue: (options) => {
		return (source) => {
			return timeoutValue(source, options);
		};
	},
	timeoutPing: (options) => {
		return (source) => {
			return timeoutPing(source, options);
		};
	},
	transform: (transformer, options = {}) => {
		return (source) => {
			return transform(source, transformer, options);
		};
	},
	withValue: (opts) => {
		return opify(withValue, opts);
	}
};
/**
* Grabs the next value emitted from `source`.
* By default waits up to a maximum of one second.
* Handles subscribing and unsubscribing.
*
* ```js
* const value = await Rx.takeNextValue(source);
* ```
*
* Throws an error if the source closes without
* a value or the timeout is reached.
*
* @param source
* @param maximumWait
* @returns
*/
async function takeNextValue(source, maximumWait = 1e3) {
	const rx = resolveSource(source);
	let off = () => {};
	let watchdog;
	const p = new Promise((resolve, reject) => {
		off = rx.on((message) => {
			if (watchdog) clearTimeout(watchdog);
			if (messageHasValue(message)) {
				off();
				resolve(message.value);
			} else if (messageIsDoneSignal(message)) {
				reject(new Error(`Source closed. ${message.context ?? ``}`));
				off();
			}
		});
		watchdog = setTimeout(() => {
			watchdog = void 0;
			off();
			reject(new Error(`Timeout waiting for value (${JSON.stringify(maximumWait)})`));
		}, intervalToMs(maximumWait));
	});
	return p;
}
/**
* Connects reactive A to B, optionally transforming the value as it does so.
*
* Returns a function to unsubcribe A->B
* @param a
* @param b
* @param transform
*/
const to$1 = (a, b, transform$1, closeBonA = false) => {
	const unsub = a.on((message) => {
		if (messageHasValue(message)) {
			const value = transform$1 ? transform$1(message.value) : message.value;
			b.set(value);
		} else if (messageIsDoneSignal(message)) {
			unsub();
			if (closeBonA) b.dispose(`Source closed (${message.context ?? ``})`);
		}
	});
	return unsub;
};

//#endregion
//#region src/rx.ts
var rx_exports = {};
__export(rx_exports, {
	From: () => from_exports,
	Ops: () => Ops,
	Sinks: () => Sinks,
	annotate: () => annotate,
	annotateWithOp: () => annotateWithOp,
	average: () => average,
	cache: () => cache,
	chunk: () => chunk,
	cloneFromFields: () => cloneFromFields,
	combineLatestToArray: () => combineLatestToArray,
	combineLatestToObject: () => combineLatestToObject,
	computeWithPrevious: () => computeWithPrevious,
	debounce: () => debounce,
	drop: () => drop,
	elapsed: () => elapsed,
	field: () => field,
	filter: () => filter,
	hasLast: () => hasLast,
	initLazyStream: () => initLazyStream,
	initLazyStreamWithInitial: () => initLazyStreamWithInitial,
	initStream: () => initStream,
	initUpstream: () => initUpstream,
	interpolate: () => interpolate,
	isPingable: () => isPingable,
	isReactive: () => isReactive,
	isTrigger: () => isTrigger,
	isTriggerFunction: () => isTriggerFunction,
	isTriggerGenerator: () => isTriggerGenerator,
	isTriggerValue: () => isTriggerValue,
	isWrapped: () => isWrapped,
	isWritable: () => isWritable,
	manual: () => manual,
	max: () => max,
	messageHasValue: () => messageHasValue,
	messageIsDoneSignal: () => messageIsDoneSignal,
	messageIsSignal: () => messageIsSignal,
	min: () => min,
	opify: () => opify,
	pipe: () => pipe,
	prepare: () => prepare,
	rank: () => rank,
	resolveSource: () => resolveSource,
	resolveTriggerValue: () => resolveTriggerValue,
	run: () => run,
	setHtmlText: () => setHtmlText,
	singleFromArray: () => singleFromArray,
	split: () => split,
	splitLabelled: () => splitLabelled,
	sum: () => sum,
	switcher: () => switcher,
	symbol: () => symbol,
	syncToArray: () => syncToArray,
	syncToObject: () => syncToObject,
	takeNextValue: () => takeNextValue,
	tally: () => tally,
	tapOps: () => tapOps,
	tapProcess: () => tapProcess,
	tapStream: () => tapStream,
	throttle: () => throttle,
	timeoutPing: () => timeoutPing,
	timeoutValue: () => timeoutValue,
	to: () => to$1,
	toArray: () => toArray,
	toArrayOrThrow: () => toArrayOrThrow,
	toGenerator: () => toGenerator,
	transform: () => transform,
	valueToPing: () => valueToPing,
	withValue: () => withValue,
	wrap: () => wrap,
	writable: () => writable
});

//#endregion
export { Ops, Sinks, annotate, annotateWithOp, average as average$2, cache, chunk, cloneFromFields, combineLatestToArray, combineLatestToObject, computeWithPrevious, debounce as debounce$1, drop, elapsed, field, filter as filter$1, from_exports, hasLast, initLazyStream, initLazyStreamWithInitial, initStream, initUpstream, interpolate as interpolate$2, isPingable, isReactive, isTrigger, isTriggerFunction, isTriggerGenerator, isTriggerValue, isWrapped, isWritable, manual, max as max$3, messageHasValue, messageIsDoneSignal, messageIsSignal, min as min$3, opify, pipe, prepare, rank as rank$1, resolveSource, resolveTriggerValue, run as run$1, rx_exports, setHtmlText, singleFromArray, split, splitLabelled, sum as sum$1, switcher, symbol, syncToArray, syncToObject, takeNextValue, tally as tally$1, tapOps, tapProcess, tapStream, throttle as throttle$1, timeoutPing, timeoutValue, to$1 as to, toArray as toArray$1, toArrayOrThrow, toGenerator, transform, valueToPing, withValue, wrap as wrap$1, writable };
//# sourceMappingURL=rx-DPcog8Po.js.map