import { Evolution, GuildHierarchy, Kingdom, Race } from './game-enums'

export const castingEvolutionBufferToString = (evolution: number): Evolution | undefined => {
  switch (evolution) {
    case 2:
      return Evolution.MORTAL
    case 1:
      return Evolution.ARCH
    case 3:
      return Evolution.CELESTIAL
    case 4:
      return Evolution.SUBCELESTIAL
    default:
      return undefined
  }
}

export const castingRaceBufferToString = (classId: number): Race => {
  switch (classId) {
    case 0:
      return Race.TRANSKNIGHT
    case 1:
      return Race.FOEMA
    case 2:
      return Race.BEASTMASTER
    case 3:
      return Race.HUNTRESS
    default:
      return Race.NONE
  }
}

export const castingKingdomBufferToString = (kingdom: number): Kingdom | undefined => {
  switch (kingdom) {
    case 3:
    case 6:
      return Kingdom.ADVENTURE
    case 7:
      return Kingdom.HEKALOTIA
    case 8:
      return Kingdom.AKELONIA
    default:
      return undefined
  }
}

export const castingGuildHierarchyBufferToString = (guildHierarchy: number): GuildHierarchy | undefined => {
  switch (guildHierarchy) {
    case 1:
      return GuildHierarchy.MEMBER
    case 6:
      return GuildHierarchy.SUBLEADER
    case 7:
      return GuildHierarchy.SUBLEADER
    case 8:
      return GuildHierarchy.SUBLEADER
    case 9:
      return GuildHierarchy.LEADER
    default:
      return undefined
  }
}
