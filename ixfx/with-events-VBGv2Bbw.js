import { unique } from "./src-Cyp-w-xE.js";
import { SimpleEventEmitter } from "./maps-CyRBIIF3.js";
import { elapsedInfinity, elapsedSince } from "./elapsed-DeRxnr7s.js";

//#region packages/flow/dist/src/state-machine/state-machine.js
/**
* Clones machine state
* @param toClone
* @returns Cloned of `toClone`
*/
const cloneState = (toClone) => {
	return Object.freeze({
		value: toClone.value,
		visited: [...toClone.visited],
		machine: toClone.machine
	});
};
/**
* Initialises a state machine
* ```js
* const desc = {
*  pants: ['shoes','socks'],
*  socks: ['shoes', 'pants'],
*  shoes: 'shirt',
*  shirt: null
* }
* // Defaults to first key, 'pants'
* let sm = StateMachine.init(descr);
* // Move to 'shoes' state
* sm = StateMachine.to(sm, 'shoes');
* sm.state; // 'shoes'
* sm.visited; // [ 'pants' ]
* StateMachineLight.isDdone(sm); // false
* StateMachineLight.possible(sm); // [ 'shirt' ]
* ```
* @param stateMachine Settings for state machine
* @param initialState Initial state name
* @returns
*/
const init = (stateMachine, initialState) => {
	const [machine, machineValidationError] = validateMachine(stateMachine);
	if (!machine) throw new Error(machineValidationError);
	const state = initialState ?? Object.keys(machine.states)[0];
	if (typeof machine.states[state] === `undefined`) throw new TypeError(`Initial state ('${state}') not found`);
	const transitions = validateAndNormaliseTransitions(machine.states);
	if (transitions === void 0) throw new Error(`Could not normalise transitions`);
	return Object.freeze({
		value: state,
		visited: [],
		machine: Object.freeze(Object.fromEntries(transitions))
	});
};
const validateMachine = (smOrTransitions) => {
	if (typeof smOrTransitions === `undefined`) return [void 0, `Parameter undefined`];
	if (smOrTransitions === null) return [void 0, `Parameter null`];
	if (`states` in smOrTransitions) return [smOrTransitions, ``];
	if (typeof smOrTransitions === `object`) return [{ states: smOrTransitions }, ``];
	return [void 0, `Unexpected type: ${typeof smOrTransitions}. Expected object`];
};
/**
* Returns _true_ if MachineState `sm` is in its final state.
* @param sm
* @returns
*/
const isDone = (sm) => {
	return possible(sm).length === 0;
};
/**
* Returns a list of possible state targets for `sm`, or
* an empty list if no transitions are possible.
* @param sm
* @returns
*/
const possibleTargets = (sm) => {
	validateMachineState(sm);
	const fromS = sm.machine[sm.value];
	if (fromS.length === 1 && fromS[0].state === null) return [];
	return fromS;
};
/**
* Returns a list of possible state names for `sm`, or
* an empty list if no transitions are possible.
*
* @param sm
* @returns
*/
const possible = (sm) => {
	const targets = possibleTargets(sm);
	return targets.map((v) => v.state);
};
const normaliseTargets = (targets) => {
	const normaliseSingleTarget = (target) => {
		if (target === null) return { state: null };
		if (typeof target === `string`) return { state: target };
		else if (typeof target === `object` && `state` in target) {
			const targetState = target.state;
			if (typeof targetState !== `string`) throw new TypeError(`Target 'state' field is not a string. Got: ${typeof targetState}`);
			if (`preconditions` in target) return {
				state: targetState,
				preconditions: target.preconditions
			};
			return { state: targetState };
		} else throw new Error(`Unexpected type: ${typeof target}. Expected string or object with 'state' field.`);
	};
	if (Array.isArray(targets)) {
		let containsNull = false;
		const mapResults = targets.map((t) => {
			const r = normaliseSingleTarget(t);
			if (!r) throw new Error(`Invalid target`);
			containsNull = containsNull || r.state === null;
			return r;
		});
		if (containsNull && mapResults.length > 1) throw new Error(`Cannot have null as an possible state`);
		return mapResults;
	} else {
		const target = normaliseSingleTarget(targets);
		if (!target) return;
		return [target];
	}
};
const validateAndNormaliseTransitions = (d) => {
	const returnMap = /* @__PURE__ */ new Map();
	for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
		if (typeof topLevelState === `undefined`) throw new TypeError(`Top-level undefined state`);
		if (typeof topLevelTargets === `undefined`) throw new TypeError(`Undefined target state for ${topLevelState}`);
		if (returnMap.has(topLevelState)) throw new Error(`State defined twice: ${topLevelState}`);
		if (topLevelState.includes(` `)) throw new Error(`State names cannot contain spaces`);
		returnMap.set(topLevelState, []);
	}
	for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
		const targets = normaliseTargets(topLevelTargets);
		if (targets === void 0) throw new Error(`Could not normalise target`);
		if (targets !== null) {
			const seenStates = /* @__PURE__ */ new Set();
			for (const target of targets) {
				if (seenStates.has(target.state)) throw new Error(`Target state '${target.state}' already exists for '${topLevelState}'`);
				seenStates.add(target.state);
				if (target.state === null) continue;
				if (!returnMap.has(target.state)) throw new Error(`Target state '${target.state}' is not defined as a top-level state. Defined under: '${topLevelState}'`);
			}
			returnMap.set(topLevelState, targets);
		}
	}
	return returnMap;
};
/**
* Validates machine state, throwing an exception if not valid
* and returning `StateTargetStrict`
* @param state
* @returns
*/
const validateMachineState = (state) => {
	if (typeof state === `undefined`) throw new TypeError(`Param 'state' is undefined`);
	if (typeof state.value !== `string`) throw new TypeError(`Existing state is not a string`);
};
/**
* Attempts to transition to a new state. Either a new
* `MachineState` is returned reflecting the change, or
* an exception is thrown.
* @param sm
* @param toState
* @returns
*/
const to = (sm, toState) => {
	validateMachineState(sm);
	validateTransition(sm, toState);
	return Object.freeze({
		value: toState,
		machine: sm.machine,
		visited: unique([sm.visited, [sm.value]])
	});
};
/**
* Returns _true_ if `toState` is a valid transition from current state of `sm`
* @param sm
* @param toState
* @returns
*/
const isValidTransition = (sm, toState) => {
	try {
		validateTransition(sm, toState);
		return true;
	} catch {
		return false;
	}
};
const validateTransition = (sm, toState) => {
	if (toState === null) throw new Error(`Cannot transition to null state`);
	if (typeof toState === `undefined`) throw new Error(`Cannot transition to undefined state`);
	if (typeof toState !== `string`) throw new TypeError(`Parameter 'toState' should be a string. Got: ${typeof toState}`);
	const p = possible(sm);
	if (p.length === 0) throw new Error(`Machine is in terminal state`);
	if (!p.includes(toState)) throw new Error(`Target state '${toState}' not available at current state '${sm.value}'. Possible states: ${p.join(`, `)}`);
};

//#endregion
//#region packages/flow/dist/src/state-machine/with-events.js
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
export { StateMachineWithEvents, init, to };
//# sourceMappingURL=with-events-VBGv2Bbw.js.map