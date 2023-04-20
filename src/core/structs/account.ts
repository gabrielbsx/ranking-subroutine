import ref from 'ref-napi'
import structType from 'ref-struct-di'
import arrayType from 'ref-array-di'
import { structAffect } from './affect'
import { structItem } from './item'
import { structMob } from './mob'
import { structMobExtra } from './mob-extra'

const struct = structType(ref)
const array = arrayType(ref)

export const structUserExtra = struct({
  donate: ref.types.int,
  honra: ref.types.int,
  keyNewbie: ref.types.byte,
  divina: structAffect,
  vip: structAffect,
  timeStamp: struct({
    login: ref.types.longlong,
    delete: array(ref.types.longlong, 4)
  })
})

export const structAccountInfo = struct({
  accountName: array(ref.types.char, 16),
  accountPass: array(ref.types.char, 12),
  realName: array(ref.types.char, 24),
  ssn1: ref.types.int,
  ssn2: ref.types.int,
  email: array(ref.types.char, 48),
  telephone: array(ref.types.char, 16),
  address: array(ref.types.char, 78),
  numericToken: array(ref.types.char, 12),
  year: ref.types.int,
  yearDay: ref.types.int
})

export const structAccountFile = struct({
  info: structAccountInfo,
  char: array(structMob, 4),
  cargo: array(structItem, 128),
  coin: ref.types.int,
  shortSkill: array(array(ref.types.byte, 16), 4),
  affect: array(array(structAffect, 32), 4),
  mobExtra: array(structMobExtra, 4),
  tempKey: array(ref.types.char, 52),
  userExtra: structUserExtra
})
