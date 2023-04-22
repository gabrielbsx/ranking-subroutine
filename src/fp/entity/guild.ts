import { type City, type Kingdom } from '../utils/game-enums'
import { type Mob } from './mob'

export interface Guild {
  identifier: number
  name: string
  kingdom: Kingdom
  city?: City
  members: Mob[]
}
