import dotenv from 'dotenv'
import { accountStatsCacheAllocation, loadAccounts } from '../core/app/load-accounts'
import { schedule } from '../core/algorithm/schedule'
import { readAccountWrapper } from '../core/app/read-account'
import { StructAccountFile } from '../core/app/structs/account'
import { populateAccount } from '../core/app/populate'
import { cacheInMemory } from '../core/algorithm/cache'
import { accountRepository } from '../core/repository/account-repository'
import { database } from '../core/algorithm/database-client'

const bootstrap = (): void => {
  console.time('bootstrap')
  dotenv.config()
  console.timeEnd('bootstrap')
}

const main = (): void => {
  bootstrap()
  const everyTime = 1000 * 10
  schedule(
    () => {
      const readAccount = readAccountWrapper(StructAccountFile)
      loadAccounts(accountStatsCacheAllocation, readAccount)

      populateAccount(cacheInMemory, accountRepository(database))
    },
    everyTime
  )
}

main()
