import { __export } from "./chunk-51aI8Tpl.js";

//#region ../packages/events/dist/src/race.d.ts
/**
* Subscribes to events on `target`, returning the event data
* from the first event that fires.
*
* By default waits a maximum of 1 minute.
*
* Automatically unsubscribes on success or failure (ie. timeout)
*
* ```js
* // Event will be data from either event, whichever fires first
* // Exception is thrown if neither fires within 1 second
* const event = await eventRace(document.body, [`pointermove`, `pointerdown`], { timeout: 1000 });
* ```
* @param target Event source
* @param eventNames Event name(s)
* @param options Options
* @returns
*/
declare const eventRace: (target: EventTarget, eventNames: Array<string>, options?: Partial<{
  timeoutMs: number;
  signal: AbortSignal;
}>) => Promise<Event>;

//#endregion
//#region ../packages/events/dist/src/types.d.ts
type Listener<Events> = (event: unknown, sender: ISimpleEventEmitter<Events>) => void;
type ISimpleEventEmitter<Events> = {
  addEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
  removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
};

//#endregion
//#region ../packages/events/dist/src/simple-event-emitter.d.ts
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
//#region src/events.d.ts
declare namespace events_d_exports {
  export { ISimpleEventEmitter, Listener, SimpleEventEmitter, eventRace };
}
//#endregion
export { ISimpleEventEmitter, Listener, SimpleEventEmitter as SimpleEventEmitter$1, eventRace as eventRace$1, events_d_exports };
//# sourceMappingURL=events.d-CKuRwox9.d.ts.map