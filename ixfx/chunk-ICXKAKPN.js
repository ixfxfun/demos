import {
  resultToError
} from "./chunk-QVTHCRNR.js";

// src/dom/ResolveEl.ts
var resolveEl = (domQueryOrEl) => {
  const r = resolveElementTry(domQueryOrEl);
  if (r.success) return r.value;
  throw resultToError(r);
};
var resolveElementTry = (domQueryOrEl) => {
  if (typeof domQueryOrEl === `string`) {
    const d = document.querySelector(domQueryOrEl);
    if (d === null) {
      const error = domQueryOrEl.startsWith(`#`) ? `Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'` : `Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`;
      return { success: false, error };
    }
    domQueryOrEl = d;
  } else if (domQueryOrEl === null) {
    return { success: false, error: `Param 'domQueryOrEl' is null` };
  } else if (domQueryOrEl === void 0) {
    return { success: false, error: `Param 'domQueryOrEl' is undefined` };
  }
  const el = domQueryOrEl;
  return { success: true, value: el };
};
var resolveEls = (selectors) => {
  if (selectors === void 0) return [];
  if (selectors === null) return [];
  if (Array.isArray(selectors)) return selectors;
  if (typeof selectors === `string`) {
    const elements = [...document.querySelectorAll(selectors)];
    return elements;
  }
  return [selectors];
};

export {
  resolveEl,
  resolveElementTry,
  resolveEls
};
//# sourceMappingURL=chunk-ICXKAKPN.js.map