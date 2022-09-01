const randomize = (percentage = 0.5) => Math.random() < percentage

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export { random, randomize }
