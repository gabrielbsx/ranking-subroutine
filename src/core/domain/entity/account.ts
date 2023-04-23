import { type Mob } from './mob'

export interface Account {
  username: string
  password: string
  numericToken: string
  accountId?: string
  players: Mob[]
}
