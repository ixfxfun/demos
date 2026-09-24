# speed

Changes variable font axes in response to speed in x and y direction.

With each pointer move event, speed is accumulated in the state, in both x and y indepently. At a set interval, this accumulated value is used to calculate the speed of travel. It's also added to a moving averager to avoid jitter.

After these calculations, the movement value is reset to `{ x: 0, y: 0 }`. Since the calculation is driven by a timer and not by the pointer event, it allows the speed to decay to zero when there is no movement. 

Read more:
* [ixfx Averaging](https://ixfx.fun/cleaning/averaging/): `movingAverage`
* [ixfx Normalising](https://ixfx.fun/cleaning/normal/): `scale`, `scalePercent`

See also:
* [Inconsolata font](https://fonts.google.com/specimen/Inconsolata/tester?vfonly=true)