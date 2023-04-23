import { readFileSync } from 'node:fs'
import { type Account } from '../domain/entity/account'
import { type StructAccountFile } from './structs/account'
import { readPlayer } from './read-player'
import { type Mob } from '../domain/entity/mob'

export type ReadAccountWrapper = (
  structAccountFile: typeof StructAccountFile
) => ReadAccount

export type ReadAccount = (accountPath: string) => Partial<Account>

export const readAccountWrapper: ReadAccountWrapper = (
  structAccountFile
): ReadAccount => {
  const readAccount: ReadAccount = (accountPath) => {
    const account: Partial<Account> = {}
    const accountBuffer = readFileSync(accountPath)
    const accountStruct = structAccountFile()
    accountStruct.ref().set(accountBuffer)
    account.username = accountStruct.info.accountName.buffer.readCString()
    account.password = accountStruct.info.accountPass.buffer.readCString()
    account.numericToken = accountStruct.info.numericToken.buffer.readCString()
    const players: Mob[] = []
    accountStruct.char.toArray().forEach((mob, index) => {
      const slot = index + 1
      const extra = accountStruct.mobExtra.toArray()[index]
      const player = readPlayer(slot, mob, extra)
      players.push(player)
    })
    account.players = players
    return account
  }
  return readAccount
}
