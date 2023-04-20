import { City, Kingdom } from "../domain/enums"
import { Player } from "../domain/mob"

export interface Guild {
  identifier: number
  name: string
  kingdom: Kingdom
  city?: City
  members: Player[]
}
