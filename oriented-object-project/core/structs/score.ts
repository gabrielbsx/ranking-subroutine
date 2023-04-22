import ref from 'ref-napi'
import StructType from 'ref-struct-di'
import ArrayType from 'ref-array-di'

const struct = StructType(ref)
const array = ArrayType(ref)

export const StructScore = struct({
  level: ref.types.int,
  defense: ref.types.int,
  damage: ref.types.int,
  merchant: ref.types.byte,
  attackRun: ref.types.byte,
  direction: ref.types.byte,
  chaosRate: ref.types.byte,
  maxHealth: ref.types.int,
  maxMana: ref.types.int,
  health: ref.types.int,
  mana: ref.types.int,
  strength: ref.types.short,
  intelligence: ref.types.short,
  dexterity: ref.types.short,
  constitution: ref.types.short,
  special: array(ref.types.short, 4)
})
