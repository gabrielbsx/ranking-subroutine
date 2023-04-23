import dotenv from 'dotenv'
import { loadAccounts } from '../core/app/load-accounts'
import { schedule } from '../core/algorithm/schedule'
import { readAccountWrapper } from '../core/app/read-account'
import { StructAccountFile } from '../core/app/structs/account'
import { populateAccount } from '../core/app/populate'
import { accountRepository } from '../core/repository/account-repository'
import { database } from '../core/algorithm/database-client'
import { playerRepository } from '../core/repository/player-repository'

const bootstrap = (): void => {
  console.time('bootstrap')
  dotenv.config()
  console.timeEnd('bootstrap')
}

const main = (): void => {
  bootstrap()
  schedule(
    async () => {
      const readAccount = readAccountWrapper(StructAccountFile)
      const accountRepositoryFactory = await accountRepository(database)
      const playerRepositoryFactory = await playerRepository(database)
      const accounts = loadAccounts(readAccount)
      await populateAccount(
        accountRepositoryFactory,
        playerRepositoryFactory,
        accounts
      )
    },
    '* * * * *'
  )
}

main()
