//#region ../packages/core/src/is-equal.d.ts
/**
 * Function that returns true if `a` and `b` are considered equal
 */
type IsEqual<T> = (a: T, b: T) => boolean;
/**
 * If input is a string, it is returned.
 * Otherwise, it returns the result of JSON.stringify() with fields ordered.
 *
 * This allows for more consistent comparisons when object field orders are different but values the same.
 * @param itemToMakeStringFor
 * @returns
 */

/**
 * Return _true_ if `a` and `b` ought to be considered equal
 * at a given path
 */
type IsEqualContext<V> = (a: V, b: V | undefined, path: string) => boolean; //#endregion

/**
 * Returns _true_ if `a` and `b are equal based on their JSON representations.
 * `path` is ignored.
 * @param a
 * @param b
 * @param path
 * @returns
 */
export { IsEqual as IsEqual$1, IsEqualContext as IsEqualContext$1 };
//# sourceMappingURL=is-equal-B6tO-zUz.d.ts.map