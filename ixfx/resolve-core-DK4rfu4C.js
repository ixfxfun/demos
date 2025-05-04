import { getErrorMessage$4 as getErrorMessage } from "./src-CjCi0sir.js";

//#region ../packages/core/src/reactive-core.ts
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
const hasLast = (rx) => {
	if (!isReactive(rx)) return false;
	if (`last` in rx) {
		const v = rx.last();
		if (v !== void 0) return true;
	}
	return false;
};

//#endregion
//#region ../packages/core/src/resolve-core.ts
/**
* Resolves `r` to a value, where `r` is:
* * primitive value
* * a/sync function
* * a/sync generator/iterator
* * ReactiveNonInitial
* ```js
* await resolve(10);       // 10
* await resolve(() => 10); // 10
* await resole(async () => {
*  sleep(100);
*  return 10;
* });                // 10
* ```
* 
* To resolve an object's properties, use {@link resolveFields}.
* 
* Resolve is not recursive. So if `r` is an object, it will be returned, even
* though its properties may be resolvable.
* @param r 
* @param args 
* @returns 
*/
async function resolve(r, ...args) {
	if (typeof r === `object`) if (`next` in r) {
		const tag = r[Symbol.toStringTag];
		if (tag === `Generator` || tag == `Array Iterator`) {
			const v = r.next();
			if (`done` in v && `value` in v) return v.value;
			return v;
		} else if (tag === `AsyncGenerator`) {
			const v = await r.next();
			if (`done` in v && `value` in v) return v.value;
			return v;
		} else throw new Error(`Object has 'next' prop, but does not have 'AsyncGenerator', 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
	} else if (isReactive(r)) {
		if (hasLast(r)) return r.last();
		throw new Error(`Reactive does not have last value`);
	} else return r;
	else if (typeof r === `function`) {
		const v = await r(args);
		return v;
	} else return r;
}
function resolveSync(r, ...args) {
	if (typeof r === `object`) if (`next` in r) {
		const tag = r[Symbol.toStringTag];
		if (tag === `Generator` || tag == `Array Iterator`) {
			const v = r.next();
			if (`done` in v && `value` in v) return v.value;
			return v;
		} else if (tag === `AsyncGenerator`) throw new Error(`resolveSync cannot work with an async generator`);
		else throw new Error(`Object has 'next' prop, but does not have 'Generator' or 'Array Iterator' string tag symbol. Got: '${tag}'`);
	} else if (isReactive(r)) {
		if (hasLast(r)) return r.last();
		throw new Error(`Reactive does not have last value`);
	} else return r;
	else if (typeof r === `function`) return r(args);
	else return r;
}
function resolveWithFallbackSync(p, fallback, ...args) {
	let errored = false;
	let fallbackValue = fallback.value;
	const overrideWithLast = fallback.overrideWithLast ?? false;
	if (fallbackValue === void 0) throw new Error(`Needs a fallback value`);
	try {
		const r = resolveSync(p, ...args);
		if (typeof r === `undefined`) return fallbackValue;
		if (typeof r === `number` && Number.isNaN(r)) return fallbackValue;
		if (overrideWithLast) fallbackValue = r;
		return r;
	} catch (error) {
		if (!errored) {
			errored = true;
			console.warn(`resolveWithFallbackSync swallowed an error. Additional errors not reported.`, getErrorMessage(error));
		}
		return fallbackValue;
	}
}

//#endregion
export { resolve as resolve$2, resolveSync as resolveSync$2, resolveWithFallbackSync as resolveWithFallbackSync$2 };
//# sourceMappingURL=resolve-core-DK4rfu4C.js.map