//#region ../packages/collections/src/stack/IStack.d.ts
/**
 * Stack (immutable)
 *
 * @example Overview
 * ```js
 * stack.push(item); // Return a new stack with item(s) added
 * stack.pop();      // Return a new stack with top-most item removed (ie. newest)
 * stack.peek;       // Return what is at the top of the stack or undefined if empty
 * stack.isEmpty;
 * stack.isFull;
 * stack.length;     // How many items in stack
 * stack.data;       // Get the underlying array
 * ```
 *
 * @example
 * ```js
 * let sanga = new Stack();
 * sanga = sanga.push(`bread`, `tomato`, `cheese`);
 * sanga.peek;  // `cheese`
 * sanga = sanga.pop(); // removes `cheese`
 * sanga.peek;  // `tomato`
 * const sangaAlt = sanga.push(`lettuce`, `cheese`); // sanga stays [`bread`, `tomato`], while sangaAlt is [`bread`, `tomato`, `lettuce`, `cheese`]
 * ```
 *
 * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
 * @class Stack
 * @typeParam V - Type of stored items
 */
interface IStack<V> {
  /**
   * Enumerates stack from bottom-to-top
   *
   */
  forEach(fn: (v: V) => void): void;
  /**
   * Enumerates stack from top-to-bottom
   * @param fn
   */
  forEachFromTop(fn: (v: V) => void): void;
  get data(): readonly V[];
  /**
   * _True_ if stack is empty
   */
  get isEmpty(): boolean;
  /**
   * _True_ if stack is at its capacity. _False_ if not, or if there is no capacity.
   */
  get isFull(): boolean;
  /**
   * Get the item at the top of the stack without removing it (like `pop` would do)
   * @returns Item at the top of the stack, or _undefined_ if empty.
   */
  get peek(): V | undefined;
  /**
   * Number of items in stack
   */
  get length(): number;
}
//#endregion
//#region ../packages/collections/src/stack/IStackMutable.d.ts
/**
 * Stack (mutable)
 *
 * @example Overview
 * ```
 * stack.push(item); // Add one or more items to the top of the stack
 * stack.pop(); // Removes and retiurns the item at the top of the stack (ie the newest thing)
 * stack.peek; // Return what is at the top of the stack or undefined if empty
 * stack.isEmpty/.isFull;
 * stack.length; // How many items in stack
 * stack.data; // Get the underlying array
 * ```
 *
 * @example
 * ```
 * const sanga = new MutableStack();
 * sanga.push(`bread`, `tomato`, `cheese`);
 * sanga.peek;  // `cheese`
 * sanga.pop(); // removes `cheese`
 * sanga.peek;  // `tomato`
 * sanga.push(`lettuce`, `cheese`); // Stack is now [`bread`, `tomato`, `lettuce`, `cheese`]
 * ```
 *
 * Stack can also be created from the basis of an existing array. First index of array will be the bottom of the stack.
 * @typeParam V - Type of stored items
 */
interface IStackMutable<V> extends IStack<V> {
  /**
   * Add items to the 'top' of the stack.
   *
   * @param toAdd Items to add.
   * @returns How many items were added
   */
  push(...toAdd: readonly V[]): number;
  /**
   * Remove and return item from the top of the stack, or _undefined_ if empty.
   * If you just want to find out what's at the top, use {@link peek}.
   */
  pop(): V | undefined;
}
//#endregion
//#region ../packages/collections/src/stack/IStackImmutable.d.ts
interface IStackImmutable<V> extends IStack<V> {
  push(...toAdd: readonly V[]): IStackImmutable<V>;
  pop(): IStackImmutable<V>;
}
//#endregion
//#region ../packages/collections/src/stack/types.d.ts
type StackDiscardPolicy = `older` | `newer` | `additions`;
type StackOpts = {
  readonly debug?: boolean;
  readonly capacity?: number;
  readonly discardPolicy?: StackDiscardPolicy;
};
//#endregion
//#region ../packages/collections/src/stack/StackImmutable.d.ts
declare class StackImmutable<V> implements IStackImmutable<V> {
  private readonly opts;
  readonly data: ReadonlyArray<V>;
  constructor(opts?: StackOpts, data?: ReadonlyArray<V>);
  push(...toAdd: ReadonlyArray<V>): StackImmutable<V>;
  pop(): IStackImmutable<V>;
  forEach(fn: (v: V) => void): void;
  forEachFromTop(fn: (v: V) => void): void;
  get isEmpty(): boolean;
  get isFull(): boolean;
  get peek(): V | undefined;
  get length(): number;
}
/**
 * Returns a stack. Immutable. Use {@link Stacks.mutable} for a mutable alternative.
 *
 * The basic usage is `push`/`pop` to add/remove, returning the modified stack. Use the
 * property `peek` to see what's on top.
 *
 * @example Basic usage
 * ```js
 * // Create
 * let s = stack();
 * // Add one or more items
 * s = s.push(1, 2, 3, 4);
 * // See what's at the top of the stack
 * s.peek;      // 4
 *
 * // Remove from the top of the stack, returning
 * // a new stack without item
 * s = s.pop();
 * s.peek;        // 3
 * ```
 * @param options Options
 * @param startingItems List of items to add to stack. Items will be pushed 'left to right', ie array index 0 will be bottom of the stack.
 */
declare const immutable: <V>(options?: StackOpts, ...startingItems: ReadonlyArray<V>) => IStackImmutable<V>;
//#endregion
//#region ../packages/collections/src/stack/StackMutable.d.ts
/**
 * Creates a stack. Mutable. Use {@link StackImmutable} for an immutable alternative.
 *
 * @example Basic usage
 * ```js
 * // Create
 * const s = new StackMutable();
 * // Add one or more items
 * s.push(1, 2, 3, 4);
 *
 * // See what's on top
 * s.peek;  // 4
 *
 * // Remove the top-most, and return it
 * s.pop();   // 4
 *
 * // Now there's a new top-most element
 * s.peek;  // 3
 * ```
 */
declare class StackMutable<V> implements IStackMutable<V> {
  readonly opts: StackOpts;
  data: readonly V[];
  constructor(opts?: StackOpts, data?: readonly V[]);
  /**
   * Push data onto the stack.
   * If `toAdd` is empty, nothing happens
   * @param toAdd Data to add
   * @returns Length of stack
   */
  push(...toAdd: readonly V[]): number;
  forEach(fn: (v: V) => void): void;
  forEachFromTop(fn: (v: V) => void): void;
  pop(): V | undefined;
  get isEmpty(): boolean;
  get isFull(): boolean;
  get peek(): V | undefined;
  get length(): number;
}
/**
 * Creates a stack. Mutable. Use {@link Stacks.immutable} for an immutable alternative.
 *
 * @example Basic usage
 * ```js
 * // Create
 * const s = Stacks.mutable();
 * // Add one or more items
 * s.push(1, 2, 3, 4);
 *
 * // See what's on top
 * s.peek;  // 4
 *
 * // Remove the top-most, and return it
 * s.pop();   // 4
 *
 * // Now there's a new top-most element
 * s.peek;  // 3
 * ```
 */
declare const mutable: <V>(opts?: StackOpts, ...startingItems: readonly V[]) => IStackMutable<V>;
//#endregion
//#region ../packages/collections/src/stack/StackFns.d.ts
declare const trimStack: <V>(opts: StackOpts, stack: ReadonlyArray<V>, toAdd: ReadonlyArray<V>) => ReadonlyArray<V>;
declare const push: <V>(opts: StackOpts, stack: ReadonlyArray<V>, ...toAdd: ReadonlyArray<V>) => ReadonlyArray<V>;
declare const pop: <V>(opts: StackOpts, stack: ReadonlyArray<V>) => ReadonlyArray<V>;
/**
 * Peek at the top of the stack (end of array)
 *
 * @typeParam V - Type of stored items
 * @param {StackOpts} opts
 * @param {V[]} stack
 * @returns {(V | undefined)}
 */
declare const peek: <V>(opts: StackOpts, stack: ReadonlyArray<V>) => V | undefined;
declare const isEmpty: <V>(opts: StackOpts, stack: ReadonlyArray<V>) => boolean;
declare const isFull: <V>(opts: StackOpts, stack: ReadonlyArray<V>) => boolean;
declare namespace index_d_exports {
  export { IStack, IStackImmutable, IStackMutable, StackDiscardPolicy, StackImmutable, StackMutable, StackOpts, immutable, isEmpty, isFull, mutable, peek, pop, push, trimStack };
}
//#endregion
export { IStackImmutable as i, StackMutable as n, StackImmutable as r, index_d_exports as t };