//#region ../packages/core/src/is-equal.d.ts
/**
* Function that returns true if `a` and `b` are considered equal
*/type IsEqual<T> = (a: T, b: T) => boolean;

/**
* Return _true_ if `a` and `b` ought to be considered equal
* at a given path
*/

type IsEqualContext<V> = (a: V, b: V | undefined, path: string) => boolean; //#endregion
export { IsEqual as IsEqual$1, IsEqualContext as IsEqualContext$1 };
//# sourceMappingURL=is-equal.d-C_tURsoc.d.ts.map