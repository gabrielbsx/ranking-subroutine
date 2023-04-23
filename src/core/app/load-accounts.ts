import { join } from 'node:path'
import { env } from 'node:process'
import { cacheInMemory } from '../algorithm/cache'
import { readdirSync, statSync } from 'node:fs'
import { type StatsCache } from '../contracts/account-stats-cache'
import { isEmpty } from '../utils/extensions/empty'
import { not } from '../utils/extensions/operators'
import { type ReadAccount } from './read-account'
import { type Account } from '../domain/entity/account'

export const isAccountCached = (account: string): boolean => {
  const accountStatsCached: StatsCache = cacheInMemory.get(`${account}:stats`)
  if (isEmpty(accountStatsCached)) {
    return false
  }
  return true
}

export const isAccountChanged = (account: string, stats: StatsCache): boolean => {
  const accountStatsCached: StatsCache = cacheInMemory.get(`${account}:stats`)
  if (not(isAccountCached(account))) {
    return true
  }
  const isSizeChanged = accountStatsCached.size !== stats.size
  const isBirthtimeChanged = accountStatsCached.birthtime.getTime() !== stats.birthtime.getTime()
  const isMtimeMsChanged = accountStatsCached.mtime.getTime() !== stats.mtime.getTime()
  const isThereAnyChange = isSizeChanged || isBirthtimeChanged || isMtimeMsChanged
  if (isThereAnyChange) {
    return true
  }
  return false
}

export const isValidAccount = (stats: StatsCache): boolean => {
  if (stats.isDirectory?.() ?? true) {
    return false
  }
  return true
}

type AccountStatsCacheAllocation = (accountStat: StatsCache, account: string) => void
export const accountStatsCacheAllocation: AccountStatsCacheAllocation =
  (accountStat: StatsCache, account: string): void => {
    const accountStatsCache: StatsCache = {
      size: accountStat.size,
      birthtime: accountStat.birthtime,
      mtime: accountStat.mtime
    }
    cacheInMemory.set(`${account}:stats`, accountStatsCache)
  }

export const upAccountOnMemory = (
  account: Partial<Account>
): void => {
  cacheInMemory.set(`account:${account.username as string}`, account)
}

export const loadAccounts = (
  accountStatsCacheAllocation: AccountStatsCacheAllocation,
  readAccount: ReadAccount
): void => {
  const accountSubFolders = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('etc')
  const accountFolder = env.ACCOUNT_PATH
  accountSubFolders.forEach((subFolder) => {
    const accountAbsoluteFolder = join(accountFolder, subFolder)
    readdirSync(accountAbsoluteFolder).forEach((accountFileName) => {
      const accountPath = join(accountAbsoluteFolder, accountFileName)
      const accountStat = statSync(accountPath)
      if (not(isValidAccount(accountStat))) {
        return undefined
      }
      if (not(isAccountChanged(accountFileName, accountStat))) {
        return undefined
      }
      accountStatsCacheAllocation(accountStat, accountFileName)
      const account = readAccount(accountPath)
      upAccountOnMemory(account)
    })
  })
}
