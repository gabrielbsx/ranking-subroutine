import { type Mob } from './mob'

export interface Account {
  username: string
  password: string
  numericToken: string
  players: Mob[]
}
