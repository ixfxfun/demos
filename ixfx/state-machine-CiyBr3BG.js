import { unique$6 as unique } from "./unique-ChIDIqyX.js";

//#region ../packages/flow/src/state-machine/state-machine.ts
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
	const returnMap = new Map();
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
			const seenStates = new Set();
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
export { cloneState, init, isDone, isValidTransition, possible, to as to$2, validateTransition };
//# sourceMappingURL=state-machine-CiyBr3BG.js.map