//#region ../packages/debug/src/util.ts
const getOrGenerateSync = (map, fn) => (key, args) => {
	let value = map.get(key);
	if (value !== void 0) return value;
	value = fn(key, args);
	map.set(key, value);
	return value;
};

//#endregion
//#region ../packages/debug/src/logger.ts
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
const logger = (prefix, kind = `log`, colourKey) => (m) => {
	if (m === void 0) m = `(undefined)`;
	else if (typeof m === `object`) m = JSON.stringify(m);
	const colour = colourKey ?? prefix;
	switch (kind) {
		case `log`: {
			console.log(`%c${prefix} ${m}`, `color: ${logColours(colour)}`);
			break;
		}
		case `warn`: {
			console.warn(prefix, m);
			break;
		}
		case `error`: {
			console.error(prefix, m);
			break;
		}
	}
};
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
const logSet = (prefix, verbose = true, colourKey) => {
	if (verbose) return {
		log: logger(prefix, `log`, colourKey),
		warn: logger(prefix, `warn`, colourKey),
		error: logger(prefix, `error`, colourKey)
	};
	return {
		log: (_) => {
			/** no-op */
		},
		warn: logger(prefix, `warn`, colourKey),
		error: logger(prefix, `error`, colourKey)
	};
};
/**
* Resolve a LogOption to a function
* @param l
* @returns
*/
const resolveLogOption = (l, defaults = {}) => {
	if (l === void 0 || typeof l === `boolean` && !l) return (_) => {
		/** no-op */
	};
	const defaultCat = defaults.category ?? ``;
	const defaultKind = defaults.kind ?? void 0;
	if (typeof l === `boolean`) return (messageOrString) => {
		const m = typeof messageOrString === `string` ? { msg: messageOrString } : messageOrString;
		const kind = m.kind ?? defaultKind;
		const category = m.category ?? defaultCat;
		let message = m.msg;
		if (category) message = `[${category}] ${message}`;
		switch (kind) {
			case `error`: {
				console.error(message);
				break;
			}
			case `warn`: {
				console.warn(message);
				break;
			}
			case `info`: {
				console.info(message);
				break;
			}
			default: console.log(message);
		}
	};
	return l;
};
let logColourCount = 0;
const logColours = getOrGenerateSync(new Map(), () => {
	const hue = ++logColourCount * 137.508;
	return `hsl(${hue},50%,75%)`;
});

//#endregion
//#region ../packages/debug/src/index.ts
const getErrorMessage = (ex) => {
	if (typeof ex === `string`) return ex;
	if (ex instanceof Error) return ex.message;
	return ex;
};

//#endregion
export { getErrorMessage as getErrorMessage$4, logSet as logSet$2, resolveLogOption as resolveLogOption$2 };
//# sourceMappingURL=src-I4YYy_WW.js.map