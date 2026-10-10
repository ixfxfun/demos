# draw

We spawn HTML elements to create a trail behind the cursor. We have a 'Brush' which keeps track of its own state, as well as zero or more 'Ink' droplets which are for each bit of ink the brush leaves behind. 

Together, this separation of state is a powerful foundation for playing with drawing interaction beyond the trivial approach.

[Try it online](https://demos.ixfx.fun/pointer/draw/)

Drawing using HTML elements is not clever from a performance point of view, but it makes it super easy to style. One would use SVG or the <CANVAS> element to do this in a better way. See `draw-canvas` for a CANVAS-based approach.

Things to try:
* Look up advanced CSS techniques for styling ink droplets
* Have ink drops drip down over time
* Have some kind of modulation of the brush, eg its size changing based on how fast you have dragged