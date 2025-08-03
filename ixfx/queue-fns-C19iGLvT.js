//#region ../collections/dist/src/queue/queue-fns.js
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
export { dequeue, enqueue, isEmpty, isFull, peek };
//# sourceMappingURL=queue-fns-C19iGLvT.js.map