import {one} from './foo';

const sum = (a, b) => {
      return a
}

const minus = (a, b ) => {
  return a - b
}

const sum1 = (a, b) => {
  return sum(a, b) + one
}

const doCb = (cb, num) => {
  while (num > 0) {
    cb()
    num--
  }
}

export {
  sum, sum1, doCb
}