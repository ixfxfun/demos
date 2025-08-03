import { resultToError } from "./numbers-C359_5A6.js";

//#region ../dom/dist/src/resolve-el.js
/**
* Resolves either a string or HTML element to an element.
* Useful when an argument is either an HTML element or query.
*
* ```js
* resolveEl(`#someId`);
* resolveEl(someElement);
* ```
* @param domQueryOrEl
* @returns
*/
const resolveEl = (domQueryOrEl) => {
	const r = resolveElementTry(domQueryOrEl);
	if (r.success) return r.value;
	throw resultToError(r);
};
/**
* Tries to resolve a query, returning a `Result`.
*
* ```js
* const { success, value, error } = resolveElementTry(`#some-element`);
* if (success) {
*  // Do something with value
* } else {
*  console.error(error);
* }
* ```
* @param domQueryOrEl
* @returns
*/
const resolveElementTry = (domQueryOrEl) => {
	if (typeof domQueryOrEl === `string`) {
		const d = document.querySelector(domQueryOrEl);
		if (d === null) {
			const error = domQueryOrEl.startsWith(`#`) ? `Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'` : `Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`;
			return {
				success: false,
				error
			};
		}
		domQueryOrEl = d;
	} else if (domQueryOrEl === null) return {
		success: false,
		error: `Param 'domQueryOrEl' is null`
	};
	else if (domQueryOrEl === void 0) return {
		success: false,
		error: `Param 'domQueryOrEl' is undefined`
	};
	const el = domQueryOrEl;
	return {
		success: true,
		value: el
	};
};
/**
* Returns a set of elements.
*
* Returns an empty list if `selectors` is undefined or null.
*
* @param selectors
* @returns
*/
const resolveEls = (selectors) => {
	if (selectors === void 0) return [];
	if (selectors === null) return [];
	if (Array.isArray(selectors)) return selectors;
	if (typeof selectors === `string`) {
		const elements = [...document.querySelectorAll(selectors)];
		return elements;
	}
	return [selectors];
};

//#endregion
export { resolveEl, resolveElementTry, resolveEls };
//# sourceMappingURL=resolve-el-BdUlUJGi.js.map