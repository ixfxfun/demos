import { Points, Rects, Grids } from '../../ixfx/geometry.js';

const settings = Object.freeze({
  numberOfParticles: 500,
  sampleEl: /** @type {HTMLElement}*/(document.querySelector(`#sample`))
});

let state = Object.freeze({
  /** @type {Particle[]} */
  particles:[],
  pixelCanvas: setupCanvas(`pixelsCanvas`, 300, 200),
  charCanvas: setupCanvas(`charsCanvas`, 300, 200),

});

const testCharsDom = () => {
  const { sampleEl } = settings;
  const outputElement = /** @type {HTMLElement} */(document.querySelector(`#charsDom`));
  
  const chars = (sampleEl.textContent ?? ``).split(``);

  for (const ch of chars) {
    const s = document.createElement(`span`);
    s.textContent = ch;
    outputElement.append(s);
  }
};

const testChars = () => {
  const { charCanvas } = state;
  const context = charCanvas.ready();
  
  const drawX = (x, stroke) => {
    context.strokeStyle = stroke;
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(x,0);
    context.lineTo(x, charCanvas.height);
    context.stroke();
  };
  
  const drawY = (y, stroke) => {
    context.strokeStyle = stroke;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0,y);
    context.lineTo(charCanvas.width, y);
    context.stroke();
  };


  context.fillStyle = `red`;
  context.textBaseline = `top`;
  context.font = `24pt Helvetica`;
  const message = `Hello1234`;

  const metrics = context.measureText(message);

  context.fillText(message, 0, 0);
  metrics.actualBoundingBoxAscent;

  drawY(metrics.actualBoundingBoxAscent, `red`);
  drawY(metrics.actualBoundingBoxDescent, `blue`);
  drawY(metrics.fontBoundingBoxAscent, `pink`);
  drawY(metrics.fontBoundingBoxDescent, `green`);
  drawX(metrics.actualBoundingBoxLeft, `purple`);
  drawX(metrics.actualBoundingBoxRight, `orange`);
  charCanvas.done();
};

const testPixels = () => {
  const { pixelCanvas } = state;
  const context = pixelCanvas.ready();
  context.fillStyle = `red`;
  context.textBaseline = `top`;
  context.font = `24pt Helvetica`;
  context.fillText (`Hello1234`, 0, 0);

  const textP = readParticles(context, pixelCanvas);
  context.restore();

  drawParticles(context, textP);
  pixelCanvas.done();
};
/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {Particle[]} particles 
 */
const drawParticles = (context, particles) => {
  context.save();
  context.translate(0, 100);

  for (const p of particles) {
    //context.fillStyle = `red`;
    context.fillStyle = `rgba(${p.colour[0]}, ${p.colour[1]}, ${p.colour[2]}, 1)`;
    context.fillRect(p.x, p.y, 1,1);
  }
  context.restore();
};

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {Rects.RectPositioned} rect
 */
const readParticles = (context, rect) => {
  const id = context.getImageData(rect.x, rect.y, rect.width, rect.height, );
  const d = id.data;
  const pts = [];
  for (let index=0;index<d.length;index+=4) {
    let ii = index / 4;
    if (d[index+3] === 0) continue;
    const p = {
      x: ii % rect.width,
      y: Math.floor(ii / rect.width),
      colour: [ d[index], d[index+1], d[index+2], d[index+3] ]
    };
    
    pts.push(p);
  }
  return pts;
};

/**
 * 
 * @param {string} id 
 * @param {number} w 
 * @param {number} h 
 */
function setupCanvas(id, w, h) {
  const canvasElement = /** @type {HTMLCanvasElement} */(document.querySelector(`#${id}`));
  const r = window.devicePixelRatio;
  canvasElement.width = w*r;
  canvasElement.height = h*r;
  canvasElement.style.width = w +`px`;
  canvasElement.style.height = h +`px`;

  const context = canvasElement.getContext(`2d`);
  if (!context) throw new Error(`could not create ctx`);
  const ready = () => {
    context.save();
    context.scale(r, r);
    return context;
  };

  const done = () => {
    context?.restore();
  };

  return {
    ready,
    done,
    height: h,
    width: w,
    x: 0,
    y:0
  };
}

const setup = () => {

  testPixels();
  testChars();
  testCharsDom();
};
setup();

/**
 * @typedef {[r:number, g:number, b:number, a:number]} Colour 
 */
/**
 * @typedef Particle
 * @property {number} x
 * @property {number} y
 * @property {number[]} colour
 */

/**
 * Update state
 * @param {Partial<state>} s 
 */
function updateState (s) {
  state = Object.freeze({
    ...state,
    ...s
  });
}
