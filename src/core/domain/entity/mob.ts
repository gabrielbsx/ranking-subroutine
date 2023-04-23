import { type Race, type Evolution, type GuildHierarchy, type Kingdom } from '../../utils/extensions/game-enums'

export interface Mob {
  slot: number
  name: string
  experience: number[]
  race: Race[]
  level: number[]
  evolution?: Evolution
  guild?: number
  guildHierarchy?: GuildHierarchy
  kingdom?: Kingdom
}
