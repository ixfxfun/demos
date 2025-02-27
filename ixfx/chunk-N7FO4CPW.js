import {
  afterMatch,
  beforeAfterMatch,
  beforeMatch
} from "./chunk-PSWPSMIG.js";

// src/text/Segments.ts
function* stringSegmentsWholeToEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
function* stringSegmentsLastToWhole(source, delimiter = `.`) {
  let accumulator = ``;
  const orig = source;
  while (source.length > 0) {
    const ba = beforeAfterMatch(source, delimiter, { fromEnd: true, ifNoMatch: `original` });
    if (ba[0] === ba[1] && ba[1] === source) {
      break;
    }
    const v = ba[1] + accumulator;
    yield v;
    accumulator = delimiter + v;
    source = ba[0];
  }
  yield orig;
}
function* stringSegmentsFirstToWhole(source, delimiter = `.`) {
  let accumulator = ``;
  const orig = source;
  while (source.length > 0) {
    const ba = beforeAfterMatch(source, delimiter, { ifNoMatch: `original` });
    if (ba[0] === source && ba[1] === source) break;
    accumulator += ba[0];
    yield accumulator;
    accumulator += delimiter;
    source = ba[1];
  }
  yield orig;
}
function* stringSegmentsWholeToFirst(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const b = beforeMatch(source, delimiter, { ifNoMatch: `original`, fromEnd: true });
    if (b === source) break;
    source = b;
  }
}

export {
  stringSegmentsWholeToEnd,
  stringSegmentsLastToWhole,
  stringSegmentsFirstToWhole,
  stringSegmentsWholeToFirst
};
//# sourceMappingURL=chunk-N7FO4CPW.js.map