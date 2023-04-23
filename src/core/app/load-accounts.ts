import { join } from 'node:path'
import { env } from 'node:process'
import { readdirSync } from 'node:fs'
import { type ReadAccount } from './read-account'
import { type Account } from '../domain/entity/account'

export const loadAccounts = (readAccount: ReadAccount): Account[] => {
  const accountSubFolders = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('etc')
  const accountFolder = env.ACCOUNT_PATH
  const accounts: Account[] = []
  accountSubFolders.forEach((subFolder) => {
    const accountAbsoluteFolder = join(accountFolder, subFolder)
    readdirSync(accountAbsoluteFolder).forEach((accountFileName) => {
      const accountPath = join(accountAbsoluteFolder, accountFileName)
      const account = readAccount(accountPath)
      accounts.push(account as Account)
    })
  })
  return accounts
}
