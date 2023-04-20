import { Guild } from "./guild";

export interface Mob {
  slot: number
  name: string
  experience: number[]
  race: string[]
  level: number[]
  evolution: string
  guild?: Guild
  guildHierarchy?: string
  kingdom?: string
}
