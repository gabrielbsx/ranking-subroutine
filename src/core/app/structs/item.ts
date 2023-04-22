import ref from 'ref-napi'
import StructType from 'ref-struct-di'
import ArrayType from 'ref-array-di'

const struct = StructType(ref)
const array = ArrayType(ref)

export const StructItemEffect = struct({
  effect: ref.types.byte,
  value: ref.types.byte
})

export const StructItem = struct({
  index: ref.types.short,
  effects: array(StructItemEffect, 3)
})
