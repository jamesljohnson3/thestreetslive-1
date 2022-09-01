import { random, randomize } from './random'
import NAMES from './filters'
import {
  vector,
  plus,
  minus,
  scale,
  magnitude,
  normalize,
  round,
  randomVector
} from './vector'

const randomCrop = image => {
  const size = randomVector(scale(image.size, 0.4), scale(image.size, 0.6))
  const offset = randomVector([0, 0], minus(image.size, size))

  return {
    size,
    ast: ['crop', round(size).join('x'), round(offset).join(',')]
  }
}

const upScale = len => image => {
  const offset = scale([1, 1], -len)
  const size = plus(scale(offset, -2), image.size)

  return {
    size,
    ast: ['crop', round(size).join('x'), round(offset).join(',')]
  }
}

const randomResize = image => {
  const size = scale(
    normalize(image.size),
    Math.min(
      3000,
      random(
        Math.min(300, magnitude(image.size)),
        Math.max(300, magnitude(image.size))
      )
    )
  )

  return {
    size,
    ast: ['resize', round(size).join('x')]
  }
}

const blur = () => {
  const strength = random(1, 500)
  const amount = random(-200, 100)

  return { ast: ['blur', strength, randomize(0.6) && amount].filter(Boolean) }
}

const sharp = () => {
  const strength = random(0, 20)

  return { ast: ['sharp', strength] }
}

const randomFilter = () => {
  const name = NAMES[random(0, NAMES.length - 1)]
  const amount = random(-100, 200)

  return { ast: ['filter', name, amount] }
}

const preview = image => {
  const DIMENTION_SIZE = 760 * (window.devicePixelRatio || 1)

  // min filters upscale
  const imageScale = Math.min(DIMENTION_SIZE / Math.max(...image.size), 1)
  const size = scale(image.size, imageScale)

  return {
    size,
    ast: ['preview', round(vector(DIMENTION_SIZE, DIMENTION_SIZE)).join('x')]
  }
}

export { randomCrop, upScale, randomResize, randomFilter, blur, sharp, preview }
