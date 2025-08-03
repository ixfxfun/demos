import { elapsedInfinity, elapsedSince } from "./elapsed-DEWYfvwx.js";
import { SimpleEventEmitter } from "./simple-event-emitter-BWzQsKia.js";
import { cloneState, init, isDone, isValidTransition, possible, to, validateTransition } from "./state-machine-BUeoIwqN.js";

//#region ../flow/dist/src/state-machine/with-events.js
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
var StateMachineWithEvents = class extends SimpleEventEmitter {
	#sm;
	#smInitial;
	#debug;
	#isDoneNeedsFiring = false;
	#isDone = false;
	#changedAt = elapsedInfinity();
	/**
	* Create a state machine with initial state, description and options
	* @param m Machine description
	* @param opts Options for machine (defaults to `{debug:false}`)
	*/
	constructor(m, opts = {}) {
		super();
		this.#debug = opts.debug ?? false;
		this.#sm = init(m, opts.initial);
		this.#smInitial = cloneState(this.#sm);
	}
	#setIsDone(v) {
		if (this.#isDone === v) return;
		this.#isDone = v;
		if (v) {
			this.#isDoneNeedsFiring = true;
			setTimeout(() => {
				if (!this.#isDoneNeedsFiring) return;
				this.#isDoneNeedsFiring = false;
				this.fireEvent(`stop`, { state: this.#sm.value });
			}, 2);
		} else this.#isDoneNeedsFiring = false;
	}
	/**
	* Return a list of possible states from current state.
	*
	* If list is empty, no states are possible. Otherwise lists
	* possible states, including 'null' for terminal
	*/
	get statesPossible() {
		return possible(this.#sm);
	}
	/**
	* Return a list of all defined states
	*/
	get statesDefined() {
		return Object.keys(this.#sm.machine);
	}
	/**
	* Moves to the next state if possible. If multiple states are possible, it will use the first.
	* If machine is finalised, no error is thrown and null is returned.
	*
	* @returns {(string|null)} Returns new state, or null if machine is finalised
	*/
	next() {
		const p = possible(this.#sm);
		if (p.length === 0) return null;
		this.state = p[0];
		return p[0];
	}
	/**
	* Returns _true_ if state machine is in its final state
	*
	* @returns
	*/
	get isDone() {
		return isDone(this.#sm);
	}
	/**
	* Resets machine to initial state
	*/
	reset() {
		this.#setIsDone(false);
		this.#sm = cloneState(this.#smInitial);
		this.#changedAt = elapsedSince();
	}
	/**
	* Throws if it's not valid to transition to `newState`
	* @param newState
	* @returns
	*/
	validateTransition(newState) {
		validateTransition(this.#sm, newState);
	}
	/**
	* Returns _true_ if `newState` is valid transition from current state.
	* Use {@link validateTransition} if you want an explanation for the _false_ results.
	* @param newState
	* @returns
	*/
	isValid(newState) {
		return isValidTransition(this.#sm, newState);
	}
	/**
	* Gets or sets state. Throws an error if an invalid transition is attempted.
	* Use `isValid()` to check validity without changing.
	*
	* If `newState` is the same as current state, the request is ignored silently.
	*/
	set state(newState) {
		const priorState = this.#sm.value;
		if (newState === this.#sm.value) return;
		this.#sm = to(this.#sm, newState);
		if (this.#debug) console.log(`StateMachine: ${priorState} -> ${newState}`);
		this.#changedAt = elapsedSince();
		setTimeout(() => {
			this.fireEvent(`change`, {
				newState,
				priorState
			});
		}, 1);
		if (isDone(this.#sm)) this.#setIsDone(true);
	}
	get state() {
		return this.#sm.value;
	}
	/**
	* Returns timestamp when state was last changed.
	* See also `elapsed`
	*/
	get changedAt() {
		return this.#changedAt();
	}
	/**
	* Returns milliseconds elapsed since last state change.
	* See also `changedAt`
	*/
	get elapsed() {
		return this.#changedAt();
	}
};

//#endregion
export { StateMachineWithEvents };
//# sourceMappingURL=with-events-B6wswWSq.js.map