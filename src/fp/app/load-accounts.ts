import { join } from 'node:path'
import { env } from 'node:process'
import { cacheInMemory } from '../algorithm/cache'
import { type Stats, readdirSync, statSync } from 'node:fs'
import { type AccountStatsCache } from '../contracts/account-stats-cache'
import { isEmpty } from '../utils/empty'
import { not } from '../utils/operators'

const isAccountCached = (account: string): boolean => {
  const accountStatsCached: AccountStatsCache = cacheInMemory.get(`${account}:cached`)
  if (isEmpty(accountStatsCached)) {
    return false
  }
  return true
}

const isAccountChanged = (account: string, stats: Stats): boolean => {
  const accountStatsCached: AccountStatsCache = cacheInMemory.get(`${account}:cached`)
  if (not(isAccountCached(account))) {
    return true
  }
  const isSizeChanged = accountStatsCached.size !== stats.size
  const isBirthtimeChanged = accountStatsCached.birthtime !== stats.birthtime.getTime()
  const isMtimeMsChanged = accountStatsCached.mtimeMs !== stats.mtimeMs
  const isThereAnyChange = isSizeChanged || isBirthtimeChanged || isMtimeMsChanged
  if (isThereAnyChange) {
    return true
  }
  return false
}

const isValidAccount = (stats: Stats): boolean => {
  if (stats.isDirectory()) {
    return false
  }
  return true
}

export const loadAccounts = (): void => {
  const accountSubFolders = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('etc')
  const accountFolder = env.ACCOUNT_PATH
  accountSubFolders.forEach((subFolder) => {
    const accountAbsoluteFolder = join(accountFolder, subFolder)
    readdirSync(accountAbsoluteFolder).forEach((account) => {
      const accountPath = join(accountAbsoluteFolder, account)
      const accountStat = statSync(accountPath)
      if (not(isValidAccount(accountStat))) {
        return undefined
      }
      if (not(isAccountChanged(account, accountStat))) {
        return undefined
      }
      const accountStatsCache: AccountStatsCache = {
        size: accountStat.size,
        birthtime: accountStat.birthtime.getTime(),
        mtimeMs: accountStat.mtimeMs
      }
      console.log(`Account ${account} changed`)
      cacheInMemory.set(`${account}:cached`, accountStatsCache)
    })
  })
}
