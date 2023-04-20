import ref from 'ref-napi'
import structType from 'ref-struct-di'

const struct = structType(ref)

export const structAffect = struct({
  type: ref.types.byte,
  value: ref.types.byte,
  level: ref.types.short,
  time: ref.types.uint
})

export const structTimeAffect = struct({
  affect: structAffect,
  duration: ref.types.uint
})
