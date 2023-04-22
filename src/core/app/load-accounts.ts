import { join } from 'node:path'
import { env } from 'node:process'
import { cacheInMemory } from '../algorithm/cache'
import { type Stats, readdirSync, statSync } from 'node:fs'
import { type AccountStatsCache } from '../contracts/account-stats-cache'
import { isEmpty } from '../utils/extensions/empty'
import { not } from '../utils/extensions/operators'

const isAccountCached = (account: string): boolean => {
  const accountStatsCached: AccountStatsCache = cacheInMemory.get(`${account}:stats`)
  if (isEmpty(accountStatsCached)) {
    return false
  }
  return true
}

const isAccountChanged = (account: string, stats: Stats): boolean => {
  const accountStatsCached: AccountStatsCache = cacheInMemory.get(`${account}:stats`)
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
  console.log(`${account} is not changed`)
  return false
}

const isValidAccount = (stats: Stats): boolean => {
  if (stats.isDirectory()) {
    return false
  }
  return true
}

const accountStatsCacheAllocation = (account: string, accountPath: string): void => {
  const accountStat = statSync(accountPath)
  if (not(isValidAccount(accountStat))) {
    return undefined
  }
  if (not(isAccountChanged(account, accountStat))) {
    return undefined
  }
  const accountStatsCache: AccountStatsCache = {
    size: accountStat.size,
    birthtime: accountStat.birthtime,
    mtime: accountStat.mtime
  }
  cacheInMemory.set(`${account}:stats`, accountStatsCache)
}

export const loadAccounts = (): void => {
  const accountSubFolders = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('etc')
  const accountFolder = env.ACCOUNT_PATH
  accountSubFolders.forEach((subFolder) => {
    const accountAbsoluteFolder = join(accountFolder, subFolder)
    readdirSync(accountAbsoluteFolder).forEach((account) => {
      const accountPath = join(accountAbsoluteFolder, account)
      accountStatsCacheAllocation(account, accountPath)
    })
  })
}
