import { type City, Kingdom } from './enums'
import { type Player } from './player'
import { type Guild } from '../entity/guild'

export abstract class AbstractGuild implements Guild {
  public identifier!: number
  public name!: string
  private _kingdom!: Kingdom
  public city?: City
  public members!: Player[]

  public addMember (player: Player): void {
    this.members.push(player)
  }

  public removeMember (player: Player): void {
    this.members = this.members.filter((p) => p !== player)
  }

  public findMemberBySlotAndName (slot: number, name: string): Player | undefined {
    return this.members.find((p) => p.name === name && p.slot === slot)
  }

  public hasMember (player: Player): boolean {
    return this.members.includes(player)
  }

  public isValidKingdom (kingdom: Kingdom): boolean {
    return Object.values(Kingdom).includes(kingdom)
  }

  set kingdom (kingdom: Kingdom) {
    if (!this.isValidKingdom(kingdom)) {
      throw new Error('Invalid kingdom value')
    }
    this._kingdom = kingdom
  }

  get kingdom (): Kingdom {
    return this._kingdom
  }
}

export class ConcreteGuild extends AbstractGuild {
}
