import { BasicType$1 as BasicType } from "./types-BDmh3f9N.js";

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

//# sourceMappingURL=types-reactive.d.ts.map
/**
 * Something that can resolve to a value
 */
type ResolveToValueSync<V> = BasicType | ReactiveNonInitial<V> | Generator<V> | IterableIterator<V> | ((args: any) => V);
type ResolveToValueAsync<V> = AsyncGenerator<V> | AsyncIterableIterator<V> | Promise<V> | ((args: any) => Promise<V>);
type ResolveToValue<V> = ResolveToValueAsync<V> | ResolveToValueSync<V>;

//#endregion
/**
 * Resolves `r` to a value, where `r` is:
 * * primitive value
 * * a/sync function
 * * a/sync generator/iterator
 * * ReactiveNonInitial
 * ```js
 * await resolve(10);       // 10
 * await resolve(() => 10); // 10
 * await resole(async () => {
 *  sleep(100);
 *  return 10;
 * });                // 10
 * ```
 *
 * To resolve an object's properties, use {@link resolveFields}.
 *
 * Resolve is not recursive. So if `r` is an object, it will be returned, even
 * though its properties may be resolvable.
 * @param r
 * @param args
 * @returns
 */

export { ReactiveNonInitial as ReactiveNonInitial$2, ResolveToValue as ResolveToValue$1, ResolveToValueSync as ResolveToValueSync$1 };
//# sourceMappingURL=resolve-core-BX-znrh1.d.ts.map