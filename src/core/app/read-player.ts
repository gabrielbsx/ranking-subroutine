import { type Mob } from '../domain/entity/mob'
import {
  castingEvolutionBufferToString,
  castingGuildHierarchyBufferToString,
  castingKingdomBufferToString,
  castingRaceBufferToString
} from '../utils/extensions/casting-game-enums'
import { type StructMobType } from './structs/mob'
import { type StructMobExtraType } from './structs/mob-extra'

export type ReadPlayer = (
  slot: number,
  mob: StructMobType,
  extra: StructMobExtraType
) => Mob

export const readPlayer: ReadPlayer = (slot, mob, extra): Mob => {
  const mobname = mob.mobName.buffer.readCString()
  const level = [
    mob.baseScore.level + 1,
    extra.saveCelestial.baseScore.level + 1
  ]
  const experience = [
    Number(mob.experience),
    Number(extra.saveCelestial.experience)
  ]
  const race = [
    castingRaceBufferToString(mob.class),
    castingRaceBufferToString(extra.saveCelestial.class)
  ]
  const evolution = castingEvolutionBufferToString(extra.classMaster)
  const kingdom = castingKingdomBufferToString(extra.classMaster)
  const guild = mob.guild
  const guildHierarchy = castingGuildHierarchyBufferToString(mob.guildLevel)
  const player: Mob = {
    slot,
    name: mobname,
    experience,
    level,
    evolution,
    guild,
    guildHierarchy,
    kingdom,
    race
  }
  return player
}
