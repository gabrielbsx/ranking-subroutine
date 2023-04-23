
import { type Cache } from '../algorithm/cache'
import { type Account } from '../domain/entity/account'
import { type AccountRepository } from '../repository/account-repository'
import { not } from '../utils/extensions/operators'

export const populateAccount = (cache: Cache, accountRepository: AccountRepository): void => {
  cache.data.forEach((value, key) => {
    if (not(key.startsWith('account:'))) {
      return undefined
    }
    const account: Account = value
    void accountRepository.getAccountByUsername(account.username)
  })
}
