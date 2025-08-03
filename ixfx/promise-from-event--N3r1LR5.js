//#region ../core/dist/src/promise-from-event.js
const promiseFromEvent = (target, name) => {
	return new Promise((resolve) => {
		const handler = (...args) => {
			target.removeEventListener(name, handler);
			if (Array.isArray(args) && args.length === 1) resolve(args[0]);
			else resolve(args);
		};
		target.addEventListener(name, handler);
	});
};

//#endregion
export { promiseFromEvent };
//# sourceMappingURL=promise-from-event--N3r1LR5.js.map