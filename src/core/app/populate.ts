
import { type Cache } from '../algorithm/cache'
import { type Account } from '../domain/entity/account'
import { type AccountRepository } from '../repository/account-repository'
import { errorWrapper } from '../utils/extensions/error'
import { not } from '../utils/extensions/operators'

export const populateAccount = (cache: Cache, accountRepository: AccountRepository): void => {
  const fetchCacheAccount = async (value: Account, key: string): Promise<void> => {
    if (not(key.startsWith('account:'))) {
      await Promise.resolve(); return
    }
    const accountCached = value
    const [error, accountFetchedData] = await errorWrapper(async () => await accountRepository.getAccountByUsername(accountCached.username))
    if (error !== null) {
      await Promise.resolve(); return
    }
    console.log(accountFetchedData)
  }
  for (const [key, value] of cache.data) {
    void fetchCacheAccount(value, key)
  }
}
