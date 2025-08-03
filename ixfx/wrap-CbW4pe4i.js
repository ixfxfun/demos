import { numberTest, resultThrow } from "./numbers-C359_5A6.js";

//#region ../numbers/dist/src/wrap.js
/**
* Wraps floating point numbers to be within a range (default: 0..1). Use {@link wrapInteger} if you want to wrap integer values.
*
* This logic makes sense for some things like rotation angle.
*
* If you just want to lock values to a range without wrapping, consider {@link clamp}.
*
* ```js
* wrap(1.2);   // 0.2
* wrap(2);     // 1.0
* wrap(-0.2); // 0.8
* ```
*
* A range can be provided too:
* ```js
* wrap(30, 20, 50);  	 // 30
* wrap(60, 20, 50);    //  30
* ```
* @param v
* @param min
* @param max
* @returns
*/
const wrap = (v, min = 0, max = 1) => {
	resultThrow(numberTest(v, ``, `min`), numberTest(min, ``, `min`), numberTest(max, ``, `max`));
	if (v === min) return min;
	if (v === max) return min;
	while (v <= min || v >= max) {
		if (v === max) break;
		if (v === min) break;
		if (v > max) v = min + (v - max);
		else if (v < min) v = max - (min - v);
	}
	return v;
};

//#endregion
export { wrap };
//# sourceMappingURL=wrap-CbW4pe4i.js.map