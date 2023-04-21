import { Evolution, GuildHierarchy, Race } from './enums'
import { type Mob } from '../entity/mob'
import { type Guild } from '../entity/guild'
import { type StructMobType } from '../structs/mob'
import { type StructMobExtraType } from '../structs/mob-extra'

export class Player implements Mob {
  public slot!: number
  public name!: string
  public experience!: number[]
  public level!: number[]
  private _race!: Race[]
  private _evolution!: Evolution
  public guild?: Guild
  public guildHierarchy?: GuildHierarchy

  set evolution (evolution: Evolution) {
    if (!this.isValidEvolution(evolution)) {
      throw new Error('Invalid evolution value')
    }
    this._evolution = evolution
  }

  get evolution (): Evolution {
    return this._evolution
  }

  set race (race: Race[]) {
    if (!this.isValidRace(race)) {
      throw new Error('Invalid race value')
    }
    this._race = race
  }

  get race (): Race[] {
    return this._race
  }

  public static castRaceNumberToEnum (race: number): Race {
    switch (race) {
      case 0:
        return Race.TRANSKNIGHT
      case 1:
        return Race.FOEMA
      case 2:
        return Race.BEASTMASTER
      case 3:
        return Race.HUNTRESS
      default:
        throw new Error(`Invalid race value: ${race}`)
    }
  }

  public static castEvolutionNumberToEnum (evolution: number): Evolution {
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
        throw new Error(`Invalid evolution value: ${evolution}`)
    }
  }

  public static castGuildHierarchyNumberToEnum (guildHierarchy: number): GuildHierarchy | undefined {
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
    }
  }

  public isValidGuildHierarchy (isValidGuildHierarchy: GuildHierarchy): boolean {
    return Object.values(GuildHierarchy).includes(isValidGuildHierarchy)
  }

  public isValidRace (race: Race[]): boolean {
    const hasSomeValidRace = race.some((r) => Object.values(Race).includes(r))
    return hasSomeValidRace
  }

  public isValidEvolution (evolution: Evolution): boolean {
    return Object.values(Evolution).includes(evolution)
  }

  public setByCastStructsMobToPlayer (slot: number, mob: StructMobType, extra: StructMobExtraType): void {
    this.name = mob.mobName.buffer.readCString()
    this._race = [
      Player.castRaceNumberToEnum(mob.class),
      Player.castRaceNumberToEnum(extra.saveCelestial.class)
    ]
    this._evolution = Player.castEvolutionNumberToEnum(extra.classMaster)
    this.guildHierarchy = Player.castGuildHierarchyNumberToEnum(mob.guildLevel)
    this.level = [mob.currentScore.level + 1, extra.saveCelestial.baseScore.level + 1]
    this.experience = [mob.experience as number, extra.saveCelestial.experience as number]
    this.slot = slot
  }
}
