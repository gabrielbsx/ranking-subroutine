import { not } from "ramda";
import { Evolution, GuildHierarchy, Race } from "./enums";
import { Mob } from "../entity/mob";
import { Guild } from "../entity/guild";

export class Player implements Mob {
  public slot: number
  public name: string
  public experience: number[]
  public level: number[]
  private _race: Race[]
  private _evolution: Evolution
  public guild?: Guild
  public guildHierarchy?: GuildHierarchy

  set evolution(evolution: Evolution) {
    if (not(this.isValidEvolution(evolution))) {
      throw new Error('Invalid evolution value')
    }
    this._evolution = evolution
  }

  set race(race: Race[]) {
    if (not(this.isValidRace(race))) {
      throw new Error('Invalid race value')
    }
    this._race = race
  }

  get evolution() {
    return this._evolution
  }

  get race() {
    return this._race
  }

  public isValidGuildHierarchy(isValidGuildHierarchy: GuildHierarchy) {
    return Object.values(GuildHierarchy).includes(isValidGuildHierarchy);
  }

  public isValidRace(race: Race[]) {
    const hasSomeValidRace = race.some((r) => Object.values(Race).includes(r))
    return hasSomeValidRace
  }

  public isValidEvolution(evolution: Evolution) {
    return Object.values(Evolution).includes(evolution);
  }
}