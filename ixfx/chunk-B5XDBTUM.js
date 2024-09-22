// src/random/Guid.ts
var shortGuid = (options = {}) => {
  const source = options.source ?? Math.random;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};

export {
  shortGuid
};
//# sourceMappingURL=chunk-B5XDBTUM.js.map