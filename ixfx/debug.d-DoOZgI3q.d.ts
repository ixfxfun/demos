import { __export } from "./chunk-Cl8Af3a2.js";

//#region ../packages/debug/dist/src/types.d.ts
type LogSet = {
  readonly log: MessageLogger;
  readonly warn: MessageLogger;
  readonly error: MessageLogger;
};
type MessageLogger = (message: LogMessage | string) => void;
type LogKind = `info` | `debug` | `error` | `warn`;
type LogMessage = {
  readonly kind?: LogKind;
  readonly msg: any;
  readonly category?: string;
};

//#endregion
//#region ../packages/debug/dist/src/logger.d.ts
/**
* Returns a console logging function which prefixes messages. This is
* useful for tracing messages from different components. Each prefix
* is assigned a colour, further helping to distinguish messages.
*
* Use {@link logSet} to get a bundled set.
*
* ```
* // Initialise once
* const log = logger(`a`);
* const error = logger(`a`, `error`);
* const warn = logger(`a`, `warn);
*
* // And then use
* log(`Hello`);    // console.log(`a Hello`);
* error(`Uh-oh`);  // console.error(`a Uh-oh`);
* warn(`Eek!`);    // console.warn(`a Eeek!`);
* ```
*
* Provide the `colourKey` parameter to make log messages
* be coloured the same, even though the prefix is different.
* ```js
* // Both loggers will use the same colour because they
* // share the colour key `system`
* const log = logger(`a`,`log`,`system`);
* const log2 = logger(`b`, `log`, `system`);
* ```
* @param prefix
* @param kind
* @param colourKey Optional key to colour log lines by instead of prefix
* @returns
*/
declare const logger: (prefix: string, kind?: `log` | `warn` | `error`, colourKey?: string) => MessageLogger;

/**
* Returns a bundled collection of {@link logger}s
*
* ```js
* const con = logSet(`a`);
* con.log(`Hello`);  // console.log(`a Hello`);
* con.warn(`Uh-oh`); // console.warn(`a Uh-oh`);
* con.error(`Eek!`); // console.error(`a Eek!`);
* ```
*
* By default each prefix is assigned a colour. To use
* another logic, provide the `colourKey` parameter.
*
* ```js
* // Both set of loggers will use same colour
* const con = logSet(`a`, true, `system`);
* const con2 = logSet(`b`, true, `system`);
* ```
* @param prefix Prefix for log messages
* @param verbose True by default. If false, log() messages are a no-op
* @param colourKey If specified, log messages will be coloured by this key instead of prefix (default)
* @returns
*/
declare const logSet: (prefix: string, verbose?: boolean, colourKey?: string) => {
  log: MessageLogger;
  warn: MessageLogger;
  error: MessageLogger;
};

/**
* Either a flag for default console logging, or a simple log function
*/
type LogOption = boolean | MessageLogger;

/**
* Resolve a LogOption to a function
* @param l
* @returns
*/
declare const resolveLogOption: (l?: LogOption, defaults?: {
  readonly category?: string;
  readonly kind?: string;
}) => MessageLogger;
declare const logColours: (key: string, args?: unknown) => string;

//#endregion
//#region ../packages/debug/dist/src/fps-counter.d.ts
declare const fpsCounter: (autoDisplay?: boolean, computeAfterFrames?: number) => () => number;

//#endregion
//#region ../packages/debug/dist/src/index.d.ts
declare const getErrorMessage: (ex: unknown) => string;

//#endregion
//#region src/debug.d.ts
declare namespace debug_d_exports {
  export { LogKind, LogMessage, LogOption, LogSet, MessageLogger, fpsCounter, getErrorMessage, logColours, logSet, logger, resolveLogOption };
}
//#endregion
export { LogKind, LogMessage, LogOption, LogSet, MessageLogger, debug_d_exports, fpsCounter as fpsCounter$1, getErrorMessage as getErrorMessage$2, logColours as logColours$1, logSet as logSet$1, logger as logger$1, resolveLogOption as resolveLogOption$1 };
//# sourceMappingURL=debug.d-DoOZgI3q.d.ts.map