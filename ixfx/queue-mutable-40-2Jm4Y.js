import { isEqualDefault$2 as isEqualDefault } from "./is-equal-CuJQbSdk.js";
import { SimpleEventEmitter$2 as SimpleEventEmitter } from "./simple-event-emitter-t3Reuycz.js";

//#region ../packages/collections/src/queue/queue-fns.ts
const trimQueue = (opts, queue, toAdd) => {
	const potentialLength = queue.length + toAdd.length;
	const capacity = opts.capacity ?? potentialLength;
	const toRemove = potentialLength - capacity;
	const policy = opts.discardPolicy ?? `additions`;
	switch (policy) {
		case `additions`: {
			if (queue.length === 0) return toAdd.slice(0, toAdd.length - toRemove);
			if (queue.length === opts.capacity) return queue;
			else return [...queue, ...toAdd.slice(0, toRemove - 1)];
		}
		case `newer`: if (toRemove >= queue.length) {
			if (queue.length === 0) return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
			return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
		} else {
			const countToAdd = Math.max(1, toAdd.length - queue.length);
			const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
			const toKeep = queue.slice(0, Math.min(queue.length, capacity - 1));
			const t = [...toKeep, ...toAddFinal];
			return t;
		}
		case `older`: return [...queue, ...toAdd].slice(toRemove);
		default: throw new Error(`Unknown overflow policy ${policy}`);
	}
};
/**
* Adds to the back of the queue (last array index)
* Last item of `toAdd` will potentially be the new end of the queue (depending on capacity limit and overflow policy)
* @typeParam V - Type of values
* @param {QueueOpts} opts
* @param {V[]} queue
* @param {...V[]} toAdd
* @returns {V[]}
*/
const enqueue = (opts, queue, ...toAdd) => {
	if (opts === void 0) throw new Error(`opts parameter undefined`);
	const potentialLength = queue.length + toAdd.length;
	const overSize = opts.capacity && potentialLength > opts.capacity;
	const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
	if (opts.capacity && toReturn.length !== opts.capacity && overSize) throw new Error(`Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`);
	if (!opts.capacity && toReturn.length !== potentialLength) throw new Error(`Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`);
	return toReturn;
};
const dequeue = (opts, queue) => {
	if (queue.length === 0) throw new Error(`Queue is empty`);
	return queue.slice(1);
};
/**
* Returns front of queue (oldest item), or undefined if queue is empty
*
* @typeParam V - Type of values stored
* @param {QueueOpts} opts
* @param {V[]} queue
* @returns {(V | undefined)}
*/
const peek = (opts, queue) => queue[0];
const isEmpty = (opts, queue) => queue.length === 0;
const isFull = (opts, queue) => {
	if (opts.capacity) return queue.length >= opts.capacity;
	return false;
};

//#endregion
//#region ../packages/collections/src/queue/queue-mutable.ts
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
var QueueMutable = class extends SimpleEventEmitter {
	options;
	data;
	eq;
	constructor(opts = {}, data = []) {
		super();
		if (opts === void 0) throw new Error(`opts parameter undefined`);
		this.options = opts;
		this.data = data;
		this.eq = opts.eq ?? isEqualDefault;
	}
	clear() {
		const copy = [...this.data];
		this.data = [];
		this.fireEvent(`removed`, {
			finalData: this.data,
			removed: copy
		});
		this.onClear();
	}
	/**
	* Called when all data is cleared
	*/
	onClear() {}
	at(index) {
		if (index >= this.data.length) throw new Error(`Index outside bounds of queue`);
		const v = this.data.at(index);
		if (v === void 0) throw new Error(`Index appears to be outside range of queue`);
		return v;
	}
	enqueue(...toAdd) {
		this.data = enqueue(this.options, this.data, ...toAdd);
		const length = this.data.length;
		this.onEnqueue(this.data, toAdd);
		return length;
	}
	onEnqueue(result, attemptedToAdd) {
		this.fireEvent(`enqueue`, {
			added: attemptedToAdd,
			finalData: result
		});
	}
	dequeue() {
		const v = peek(this.options, this.data);
		if (v === void 0) return;
		this.data = dequeue(this.options, this.data);
		this.fireEvent(`dequeue`, {
			removed: v,
			finalData: this.data
		});
		this.onRemoved([v], this.data);
		return v;
	}
	onRemoved(removed, finalData) {
		this.fireEvent(`removed`, {
			removed,
			finalData
		});
	}
	/**
	* Removes values that match `predicate`.
	* @param predicate 
	* @returns Returns number of items removed.
	*/
	removeWhere(predicate) {
		const countPre = this.data.length;
		const toRemove = this.data.filter((v) => predicate(v));
		if (toRemove.length === 0) return 0;
		this.data = this.data.filter((element) => !predicate(element));
		this.onRemoved(toRemove, this.data);
		return countPre - this.data.length;
	}
	/**
	* Return a copy of the array
	* @returns 
	*/
	toArray() {
		return [...this.data];
	}
	get isEmpty() {
		return isEmpty(this.options, this.data);
	}
	get isFull() {
		return isFull(this.options, this.data);
	}
	get length() {
		return this.data.length;
	}
	get peek() {
		return peek(this.options, this.data);
	}
};
/**
* Creates a new QueueMutable
* @param options 
* @param startingItems 
* @returns 
*/
function mutable(options = {}, ...startingItems) {
	return new QueueMutable({ ...options }, [...startingItems]);
}

//#endregion
export { QueueMutable as QueueMutable$2, mutable };
//# sourceMappingURL=queue-mutable-40-2Jm4Y.js.map