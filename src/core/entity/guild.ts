import { type City, type Kingdom } from '../domain/enums'
import { type Player } from '../domain/player'

export interface Guild {
  identifier: number
  name: string
  kingdom: Kingdom
  city?: City
  members: Player[]
}
