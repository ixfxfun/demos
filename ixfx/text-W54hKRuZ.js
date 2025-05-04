import { integerTest, throwFromResult } from "./numbers-BSDDLVnO.js";

//#region ../packages/core/src/text.ts
/**
* Given a long string, abbreviates it with ...
* ```js
* abbreviate(`This is something`, 7); // `This is...`
* ```
* 
* If `source` is under `maxLength` the original is returned.
* @param source 
* @param maxLength Maximum length. Defaults to 20
* @returns 
*/
const abbreviate = (source, maxLength = 15) => {
	throwFromResult(integerTest(maxLength, `aboveZero`, `maxLength`));
	if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
	if (source.length > maxLength && source.length > 3) {
		if (maxLength > 15) {
			const chunk = Math.round((maxLength - 2) / 2);
			return source.slice(0, chunk) + `...` + source.slice(-chunk);
		}
		return source.slice(0, maxLength) + `...`;
	}
	return source;
};
/**
* Uses JSON.toString() on `source`, but abbreviates result.
* @param source Object to stringify
* @param maxLength Default 20
* @returns 
*/
const toStringAbbreviate = (source, maxLength = 20) => {
	if (source === void 0) return `(undefined)`;
	if (source === null) return `(null)`;
	return abbreviate(JSON.stringify(source), maxLength);
};
/**
* Returns all the text in `source` that follows `match`. If not found, `source` is returned.
* 
* See also: {@link beforeMatch}, {@link beforeAfterMatch}.
* 
* ```js
* afterMatch(`Hello. There`, `.`); // ' There'
* afterMatch(`Hello, there', `,`); // 'Hello, there'
* ```
* 
* If `source` is _undefined_, an error is thrown.
* @param source
* @param match
* @param options
* @returns
*/
const afterMatch = (source, match, options = {}) => {
	const ba = beforeAfterMatch(source, match, options);
	return ba[1];
};
/**
* Returns the text that is before and after `match`.
* 
* See also: {@link beforeMatch}, {@link afterMatch}.
* 
* If `match` is at the end of start of `source`, after or before might be an empty string.
* @param source 
* @param match 
* @param options 
* @returns 
*/
const beforeAfterMatch = (source, match, options = {}) => {
	if (source === void 0) throw new Error(`Param 'source' is undefined`);
	let fallback = options.fallback;
	const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
	if (ifNoMatch === `original`) fallback = source;
	if (ifNoMatch === `fallback` && fallback === void 0) throw new Error(`Fallback must be provided`);
	const startPos = options.startPos ?? void 0;
	const fromEnd = options.fromEnd ?? false;
	const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
	if (m < 0 && ifNoMatch === `throw`) throw new Error(`Match '${match}' not found in source.`);
	if (m < 0 && ifNoMatch === `original`) return [source, source];
	if (m < 0 && ifNoMatch === `fallback`) return [fallback, fallback];
	return [source.slice(0, m), source.slice(Math.max(0, m + match.length))];
};
/**
* Simple wilcard matching. Use '*' in `pattern` to denote any number of characters.
* ```js
* // Must start with 'cat'
* wildcard(`cat*`,`caterpillar`); // true
* // Must end with 'cat'
* wildcat(`*cat`, `bobcat`);  // true
* // 'cat' anywhere in string
* wildcard(`*cat*`, `see cat run`); // true
* ```
* @param pattern 
* @returns 
*/
const wildcard = (pattern) => {
	const escapeRegex = (value) => value.replaceAll(/([!$()*+./:=?[\\\]^{|}])/g, `\\$1`);
	pattern = pattern.split(`*`).map((m) => escapeRegex(m)).join(`.*`);
	pattern = `^` + pattern + `$`;
	const regex = new RegExp(pattern);
	return (value) => {
		return regex.test(value);
	};
};

//#endregion
export { afterMatch, toStringAbbreviate, wildcard };
//# sourceMappingURL=text-W54hKRuZ.js.map