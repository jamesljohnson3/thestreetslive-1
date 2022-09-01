import { random } from './random'

const x = ([vx]) => parseFloat(vx)
const y = ([, vy]) => parseFloat(vy)
const vector = (x, y) => [x, y]

const plus = (a, b) => vector(x(a) + x(b), y(a) + y(b))
const minus = (a, b) => vector(x(a) - x(b), y(a) - y(b))
const scale = (v, s) => vector(s * x(v), s * y(v))

const magnitude = v => Math.sqrt(x(v) * x(v) + y(v) * y(v))

const dot = (a, b) => x(a) * x(b) + y(a) * y(b)
const angle = v => Math.atan2(y(v), x(v))

const normalize = v => scale(v, 1 / magnitude(v))
const round = v => v.map(d => Math.round(d))
const randomVector = (topLeft, bottomRight) =>
  vector(
    random(
      Math.min(x(topLeft), x(bottomRight)),
      Math.max(x(topLeft), x(bottomRight))
    ),
    random(
      Math.min(y(topLeft), y(bottomRight)),
      Math.max(y(topLeft), y(bottomRight))
    )
  )

export {
  x,
  y,
  vector,
  plus,
  minus,
  scale,
  magnitude,
  dot,
  angle,
  normalize,
  round,
  randomVector
}
