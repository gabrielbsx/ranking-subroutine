import dotenv from 'dotenv'
import { loadAccounts } from '../core/app/load-accounts'
import { schedule } from '../core/algorithm/schedule'

const bootstrap = (): void => {
  console.time('bootstrap')
  dotenv.config()
  console.timeEnd('bootstrap')
}

const main = (): void => {
  bootstrap()
  const everyTime = 1000 * 10
  schedule(loadAccounts, everyTime)
}

main()
