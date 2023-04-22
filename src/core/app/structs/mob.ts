import ref from 'ref-napi'
import StructType from 'ref-struct-di'
import ArrayType from 'ref-array-di'
import { StructItem } from './item'
import { StructScore } from './score'

const struct = StructType(ref)
const array = ArrayType(ref)

export const StructMob = struct({
  mobName: array(ref.types.char, 16),
  clan: ref.types.byte,
  merchant: ref.types.byte,
  guild: ref.types.short,
  class: ref.types.byte,
  reserved: ref.types.short,
  quest: ref.types.byte,
  coin: ref.types.int,
  experience: ref.types.longlong,
  homeTownX: ref.types.short,
  homeTownY: ref.types.short,
  baseScore: StructScore,
  currentScore: StructScore,
  equipment: array(StructItem, 20),
  inventory: array(StructItem, 64),
  learnedSkill: ref.types.int,
  magic: ref.types.uint,
  scoreBonus: ref.types.short,
  specialBonus: ref.types.short,
  skillBonus: ref.types.short,
  critical: ref.types.byte,
  saveMana: ref.types.byte,
  shortSkill: array(ref.types.byte, 4),
  guildLevel: ref.types.byte,
  regeneratesHealth: ref.types.short,
  regeneratesMana: ref.types.short,
  resist: array(ref.types.byte, 4),
  jewel: ref.types.short,
  _: array(ref.types.short, 2)
})

export type StructMobType = ReturnType<typeof StructMob>
