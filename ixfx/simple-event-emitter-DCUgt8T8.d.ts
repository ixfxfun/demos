//#region ../packages/events/src/types.d.ts
type ISimpleEventEmitter<Events> = {
  addEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
  removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
};

//#endregion
//#region ../packages/events/src/simple-event-emitter.d.ts
//# sourceMappingURL=types.d.ts.map
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
//# sourceMappingURL=simple-event-emitter.d.ts.map

export { ISimpleEventEmitter as ISimpleEventEmitter$1, SimpleEventEmitter as SimpleEventEmitter$3 };
//# sourceMappingURL=simple-event-emitter-DCUgt8T8.d.ts.map