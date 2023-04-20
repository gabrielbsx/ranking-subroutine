import ref from 'ref-napi'
import StructType from 'ref-struct-di'
import ArrayType from 'ref-array-di'
import { StructScore } from './score'

const struct = StructType(ref)
const array = ArrayType(ref)

export const StructMortal = struct({
  newbie: ref.types.byte,
  terraMistica: ref.types.byte,
  molarGargula: ref.types.byte,
  pilulaOrc: ref.types.byte,
  training: ref.types.byte,
  _: array(ref.types.byte, 30)
})

export const StructArch = struct({
  mortalSlot: ref.types.byte,
  mortalLevel: ref.types.byte,
  level355: ref.types.byte,
  level370: ref.types.byte,
  cristal: ref.types.byte,
  _: array(ref.types.byte, 30)
})

export const StructCelestial = struct({
  archLevel: ref.types.short,
  celestialLevel: ref.types.short,
  subCelestialLevel: ref.types.short,
  level40: ref.types.byte,
  level90: ref.types.byte,
  add120: ref.types.byte,
  add150: ref.types.byte,
  add180: ref.types.byte,
  add200: ref.types.byte,
  arcana: ref.types.byte,
  reset: ref.types.byte,
  _: array(ref.types.byte, 30)
})

export const StructSubCelestial = struct({
  subStatus: ref.types.byte,
  classMaster: ref.types.byte,
  class: ref.types.byte,
  experience: ref.types.longlong,
  spawnX: ref.types.short,
  spawnY: ref.types.short,
  baseScore: StructScore,
  learnedSkill: array(ref.types.long, 2),
  scoreBonus: ref.types.short,
  specialBonus: ref.types.short,
  skillBonus: ref.types.short,
  skillBar: struct({
    barOne: array(ref.types.byte, 4),
    barTwo: array(ref.types.byte, 16)
  }),
  soul: ref.types.byte,
  _: array(ref.types.byte, 30)
})

export const StructMobExtra = struct({
  classMaster: ref.types.short,
  citizen: ref.types.byte,
  secondLearnedSkill: ref.types.long,
  fame: ref.types.int,
  soul: ref.types.byte,
  mortalFace: ref.types.short,
  questInfo: struct({
    mortal: StructMortal,
    arch: StructArch,
    celestial: StructCelestial,
    circle: ref.types.byte,
    _: array(ref.types.byte, 30)
  }),
  saveCelestial: StructSubCelestial,
  lastNT: ref.types.long,
  nt: ref.types.int,
  kefraTicket: ref.types.int,
  divineEnd: ref.types.long,
  revigorante: ref.types.long,
  checkTimeKersef: ref.types.int,
  hold: ref.types.uint,
  sephira: ref.types.long,
  saude: ref.types.long,
  guildLevel: ref.types.byte,
  _: array(ref.types.byte, 12),
  __: array(ref.types.int, 9)
})
