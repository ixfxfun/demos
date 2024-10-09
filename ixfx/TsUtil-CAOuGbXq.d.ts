/**
 * Remaps `TShape` so each field has type `TFieldValue`.
 * Recursive.
 */
type RecursiveReplace<TShape, TFieldValue> = {
    [P in keyof TShape]: TShape[P] extends (infer U)[] ? RecursiveReplace<U, TFieldValue>[] : TShape[P] extends number | string | symbol | undefined ? TFieldValue : RecursiveReplace<TShape[P], TFieldValue>;
};
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object | undefined ? RecursivePartial<T[P]> : T[P];
};
type ReadonlyRemapObjectPropertyType<OriginalType, PropertyType> = {
    readonly [Property in keyof OriginalType]: PropertyType;
};
type RemapObjectPropertyType<OriginalType, PropertyType> = {
    [Property in keyof OriginalType]: PropertyType;
};
type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
type Rest<T extends any[]> = T extends [infer A, ...infer R] ? R : never;

export type { DeepWriteable as D, RecursiveReplace as R, Writeable as W, RecursivePartial as a, ReadonlyRemapObjectPropertyType as b, RemapObjectPropertyType as c, RequireOnlyOne as d, Rest as e };
