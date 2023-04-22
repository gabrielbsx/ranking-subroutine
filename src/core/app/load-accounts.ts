import { join } from 'node:path'
import { env } from 'node:process'
import { cacheInMemory } from '../algorithm/cache'
import { readdirSync, statSync } from 'node:fs'
import { type StatsCache } from '../contracts/account-stats-cache'
import { isEmpty } from '../utils/extensions/empty'
import { not } from '../utils/extensions/operators'

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

export const accountStatsCacheAllocation = (accountStat: StatsCache, account: string): void => {
  if (not(isValidAccount(accountStat))) {
    return undefined
  }
  if (not(isAccountChanged(account, accountStat))) {
    return undefined
  }
  const accountStatsCache: StatsCache = {
    size: accountStat.size,
    birthtime: accountStat.birthtime,
    mtime: accountStat.mtime
  }
  cacheInMemory.set(`${account}:stats`, accountStatsCache)
}

export const loadAccounts = (accountStatsCacheAllocationDependency: typeof accountStatsCacheAllocation): void => {
  const accountSubFolders = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('etc')
  const accountFolder = env.ACCOUNT_PATH
  accountSubFolders.forEach((subFolder) => {
    const accountAbsoluteFolder = join(accountFolder, subFolder)
    readdirSync(accountAbsoluteFolder).forEach((account) => {
      const accountPath = join(accountAbsoluteFolder, account)
      const accountStat = statSync(accountPath)
      accountStatsCacheAllocationDependency(accountStat, account)
    })
  })
}
