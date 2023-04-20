import ref from 'ref-napi'
import structType from 'ref-struct-di'
import arrayType from 'ref-array-di'

const struct = structType(ref)
const array = arrayType(ref)

export const structItemEffect = struct({
  effect: ref.types.byte,
  value: ref.types.byte
})

export const structItem = struct({
  index: ref.types.short,
  effects: array(structItemEffect, 3)
})
