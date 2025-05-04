//#region ../packages/flow/src/dispatch-list.ts
var DispatchList = class {
	#handlers;
	#counter = 0;
	#id = Math.floor(Math.random() * 100);
	constructor() {
		this.#handlers = [];
	}
	/**
	* Returns _true_ if list is empty
	* @returns 
	*/
	isEmpty() {
		return this.#handlers.length === 0;
	}
	/**
	* Adds a handler
	* @param handler 
	* @param options 
	* @returns 
	*/
	add(handler, options = {}) {
		this.#counter++;
		const once = options.once ?? false;
		const wrap = {
			id: `${this.#id} - ${this.#counter}`,
			handler,
			once
		};
		this.#handlers.push(wrap);
		return wrap.id;
	}
	remove(id) {
		const length = this.#handlers.length;
		this.#handlers = this.#handlers.filter((handler) => handler.id !== id);
		return this.#handlers.length !== length;
	}
	notify(value) {
		for (const handler of this.#handlers) {
			handler.handler(value);
			if (handler.once) this.remove(handler.id);
		}
	}
	clear() {
		this.#handlers = [];
	}
};

//#endregion
export { DispatchList as DispatchList$2 };
//# sourceMappingURL=dispatch-list-CjWGGaY_.js.map