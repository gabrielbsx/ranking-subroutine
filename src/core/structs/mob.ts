import ref from "ref-napi"
import structType from "ref-struct-di"
import arrayType from "ref-array-di"
import { structItem } from "./item"
import { structScore } from "./score"

const struct = structType(ref)
const array = arrayType(ref)

export const structMob = struct({
  mobName: array(ref.types.char, 20),
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
  baseScore: structScore,
  currentScore: structScore,
  equipment: array(structItem, 20),
  inventory: array(structItem, 64),
  learnedSkill: ref.types.long,
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
  _: array(ref.types.short, 2),
})
