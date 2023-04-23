
import { type Cache } from '../algorithm/cache'
import { type Account } from '../domain/entity/account'
import { type AccountRepository } from '../repository/account-repository'
import { not } from '../utils/extensions/operators'

export const populateAccount = (cache: Cache, accountRepository: AccountRepository): void => {
  const fetchCacheAccount = async (value: Account, key: string): Promise<void> => {
    if (not(key.startsWith('account:'))) {
      await Promise.resolve(); return
    }
    const account = value
    const accountData = await accountRepository.getAccountByUsername(account.username)
    console.log(accountData)
  }
  for (const [key, value] of cache.data) {
    void fetchCacheAccount(value, key)
  }
}
