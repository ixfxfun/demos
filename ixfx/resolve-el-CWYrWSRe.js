import { resultToError$2 as resultToError } from "./numbers-D3QR_A5v.js";

//#region ../packages/dom/src/resolve-el.ts
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
export { resolveEl as resolveEl$2, resolveEls as resolveEls$2 };
//# sourceMappingURL=resolve-el-CWYrWSRe.js.map