import { type City, type Kingdom } from '../utils/enums'
import { type Player } from '../domain/player'

export interface Guild {
  identifier: number
  name: string
  kingdom: Kingdom
  city?: City
  members: Player[]
}
