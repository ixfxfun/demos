import { Svg } from '@ixfx/visual.js';
import { Numbers, Modulation, Dom } from '@ixfx/index.js';

// Define settings
const settings = Object.freeze({
  radiusMin: 20,
  // Radius will be max 40% of viewport
  radiusProportion: 0.4,
  strokeWidthMax: 70,
  strokeWidthMin: 3,
  strokeStyle: `#EEBB55`,
  waveSine: Modulation.wave({ shape: `sine`, hertz: 0.1 }),

});

/**
 * @typedef {{
 * sine:number
 * pointer: {x: number, y:number}
 * circleEl: SVGCircleElement|undefined
 * viewportSize: { width:number, height:number }
 * viewportCenter: { x:number, y:number },
 * }} State
 */

/** @type State */
let state = Object.freeze({
  sine: 0,
  viewportSize: { width: 0, height: 0 },
  viewportCenter: { x: 0, y: 0 },
  pointer: { x: 0, y: 0 },
  circleEl: undefined
});

// Update state of world
const update = () => {
  const { waveSine } = settings;

  saveState({
    sine: waveSine()
  });
};

const use = () => {
  const { radiusProportion } = settings;
  const { viewportSize, sine, pointer, circleEl } = state;

  if (circleEl === undefined) return;

  const radius = settings.radiusMin +
    (viewportSize.width * Numbers.scalePercent(sine, 0, radiusProportion));

  const width = settings.strokeWidthMin + (sine * settings.strokeWidthMax);

  // Define circle, using pointer for x,y 
  const circle = { radius, ...pointer };

  // Apply stroke width
  Svg.applyStrokeOpts(circleEl, { strokeWidth: width });

  // Update circle
  Svg.Elements.circleUpdate(circleEl, circle);
};

/**
 * Setup and run main loop 
 */
const setup = () => {
  const svg = document.querySelector(`svg`);
  if (svg === null) return;

  // Resize SVG element to match viewport
  Dom.ElementSizer.svgViewport(svg, size => {
    svg.setAttribute(`viewbox`, `0 0 ${size.width} ${size.height}`);
    saveState({
      viewportSize: size,
      viewportCenter: {
        x: size.width / 2,
        y: size.height / 2
      }
    });
  });

  window.addEventListener(`pointerdown`, event => {
    saveState({
      pointer: { x: event.offsetX, y: event.offsetY }
    });
  });

  window.addEventListener(`pointermove`, event => {
    saveState({
      pointer: { x: event.offsetX, y: event.offsetY }
    });
  });

  // Create SVG `path` element for circle
  const options = {
    fillStyle: `none`,
    strokeStyle: settings.strokeStyle,
    strokeWidth: settings.strokeWidthMax
  };

  saveState({
    circleEl: Svg.Elements.circle({ radius: 10, x: 10, y: 10 }, svg, options)
  });

  const loop = () => {
    update();
    use();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};

const windowBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
});

setup();

/**
 * Save state
 * @param {Partial<state>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
