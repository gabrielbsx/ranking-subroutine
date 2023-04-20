import { Evolution, GuildHierarchy, Race } from './enums'
import { type Mob } from '../entity/mob'
import { type Guild } from '../entity/guild'

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
}
