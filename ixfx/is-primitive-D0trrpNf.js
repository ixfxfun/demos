//#region ../packages/guards/src/empty.ts
const nullUndefTest = (value, parameterName = `?`) => {
	if (typeof value === `undefined`) return {
		success: false,
		error: `${parameterName} param is undefined`
	};
	if (value === null) return {
		success: false,
		error: `${parameterName} param is null`
	};
	return {
		success: true,
		value
	};
};

//#endregion
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
export { isPrimitive as isPrimitive$2, nullUndefTest as nullUndefTest$2 };
//# sourceMappingURL=is-primitive-D0trrpNf.js.map