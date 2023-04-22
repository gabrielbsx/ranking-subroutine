import { not } from '../utils/operators'

const isValidChronos = (chronos: string): boolean => {
  const regex = /^(\*|[0-5]?\d)(\/[0-5]?\d)?(\\-([0-5]?\d))?(,(\*|[0-5]?\d)(\/[0-5]?\d)?(\\-([0-5]?\d))?)*$/
  return regex.test(chronos)
}

export const schedule = (fn: () => any, chronos: string): void => {
  if (not(isValidChronos(chronos))) {
    throw new Error('Invalid chronos')
  }
}
