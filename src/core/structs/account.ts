import ref from 'ref-napi'
import StructType from 'ref-struct-di'
import ArrayType from 'ref-array-di'
import { StructAffect } from './affect'
import { StructItem } from './item'
import { StructMob } from './mob'
import { StructMobExtra } from './mob-extra'

const struct = StructType(ref)
const array = ArrayType(ref)

export const StructUserExtra = struct({
  donate: ref.types.int,
  honra: ref.types.int,
  keyNewbie: ref.types.byte,
  divina: StructAffect,
  vip: StructAffect,
  timeStamp: struct({
    login: ref.types.longlong,
    delete: array(ref.types.longlong, 4)
  })
})

export const StructAccountInfo = struct({
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

export const StructAccountFile = struct({
  info: StructAccountInfo,
  char: array(StructMob, 4),
  cargo: array(StructItem, 128),
  coin: ref.types.int,
  shortSkill: array(array(ref.types.byte, 16), 4),
  affect: array(array(StructAffect, 32), 4),
  mobExtra: array(StructMobExtra, 4),
  tempKey: array(ref.types.char, 52),
  userExtra: StructUserExtra
})
