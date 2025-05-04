import { BasicType$1 as BasicType } from "./types.d-BvIm-IgD.js";

//#region ../packages/core/src/types-reactive.d.ts
type ReactiveNonInitial<V> = Reactive<V> & {
  last(): V | undefined;
};
type Unsubscriber = () => void;
type SignalKinds = `done` | `warn`;
type Passed<V> = {
  value: V | undefined;
  signal?: SignalKinds;
  context?: string;
};

/**
* A Reactive
*/
type Reactive<V> = {
  /**
   * Subscribes to a reactive. Receives
   * data as well as signals. Use `onValue` if you
   * just care about values.
   *
   * Return result unsubscribes.
   *
   * ```js
   * const unsub = someReactive.on(msg => {
   *    // Do something with msg.value
   * });
   *
   * unsub(); // Unsubscribe
   * ```
   * @param handler
   */
  on(handler: (value: Passed<V>) => void): Unsubscriber;
  /**
   * Subscribes to a reactive's values.
   * Returns a function that unsubscribes.
   * @param handler
   */
  onValue(handler: (value: V) => void): Unsubscriber;
  /**
   * Disposes the reactive, providing a reason for debug tracing
   * @param reason
   */
  dispose(reason: string): void;
  /**
   * Returns _true_ if Reactive is disposed
   */
  isDisposed(): boolean;
  /**
   * Optional 'set' to write a value. Use {@link ReactiveWritable} if you want this non-optional
   * @param value
   */
  set?(value: V): void;
}; //#endregion
//#region ../packages/core/src/resolve-core.d.ts
/**
* Something that can resolve to a value
*/
type ResolveToValueSync<V> = BasicType | ReactiveNonInitial<V> | Generator<V> | IterableIterator<V> | ((args: any) => V);
type ResolveToValueAsync<V> = AsyncGenerator<V> | AsyncIterableIterator<V> | Promise<V> | ((args: any) => Promise<V>);
type ResolveToValue<V> = ResolveToValueAsync<V> | ResolveToValueSync<V>;

//#endregion
export { ReactiveNonInitial as ReactiveNonInitial$2, ResolveToValue as ResolveToValue$1, ResolveToValueSync as ResolveToValueSync$1 };
//# sourceMappingURL=resolve-core.d-D_VRcxVL.d.ts.map