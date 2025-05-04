//#region ../packages/core/src/ts-utility.d.ts

type RecursivePartial<T> = { [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object | undefined ? RecursivePartial<T[P]> : T[P] };

//#endregion
//#region ../packages/core/src/records/pathed.d.ts
type PathData<V> = {
  path: string;
  value: V;
};
type PathDataChange<V> = PathData<V> & {
  previous?: V;
  state: `change` | `added` | `removed`;
};

//#endregion
export { PathDataChange, RecursivePartial as RecursivePartial$1 };
//# sourceMappingURL=pathed.d-DcHQ435G.d.ts.map