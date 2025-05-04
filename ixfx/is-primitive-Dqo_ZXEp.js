//#region ../packages/core/src/is-primitive.ts
/**
* Returns _true_ if `value` is number, string, bigint or boolean.
* Returns _false_ if `value` is an object, null, undefined
* 
* Use {@link isPrimitiveOrObject} to also return true if `value` is an object.
* @param value Value to check
* @returns _True_ if value is number, string, bigint or boolean.
*/
function isPrimitive(value) {
	if (typeof value === `number`) return true;
	if (typeof value === `string`) return true;
	if (typeof value === `bigint`) return true;
	if (typeof value === `boolean`) return true;
	return false;
}

//#endregion
export { isPrimitive as isPrimitive$2 };
//# sourceMappingURL=is-primitive-Dqo_ZXEp.js.map