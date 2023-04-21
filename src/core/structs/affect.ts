import ref from 'ref-napi'
import StructType from 'ref-struct-di'

const struct = StructType(ref)

export const StructAffect = struct({
  type: ref.types.byte,
  value: ref.types.byte,
  level: ref.types.short,
  time: ref.types.uint
})

export const StructTimeAffect = struct({
  affect: StructAffect,
  duration: ref.types.longlong
})
