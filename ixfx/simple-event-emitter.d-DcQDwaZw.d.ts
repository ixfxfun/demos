//#region ../packages/random/src/types.d.ts
/**
* A random source.
*
* Predefined sources: {@link defaultRandom}, {@link gaussianSource}, {@link weightedSource}
*/type RandomSource = () => number;

//#endregion
//#region ../packages/events/src/types.d.ts
type ISimpleEventEmitter<Events> = {
  addEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
  removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
};

//#endregion
//#region ../packages/events/src/simple-event-emitter.d.ts
declare class SimpleEventEmitter<Events> implements ISimpleEventEmitter<Events> {
  #private;
  dispose(): void;
  get isDisposed(): boolean;
  /**
   * Fire event
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  protected fireEvent<K extends keyof Events>(type: K, args: Events[K]): void;
  /**
   * Adds event listener.
   *
   * @throws Error if emitter is disposed
   * @typeParam K - Events
   * @param name Event name
   * @param listener Event handler
   */
  addEventListener<K extends keyof Events>(name: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
  /**
   * Remove event listener
   *
   * @param listener
   */
  removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
  /**
   * Clear all event listeners
   * @private
   */
  clearEventListeners(): void;
}

//#endregion
export { RandomSource as RandomSource$1, SimpleEventEmitter as SimpleEventEmitter$3 };
//# sourceMappingURL=simple-event-emitter.d-DcQDwaZw.d.ts.map