import dotenv from 'dotenv'
import { loadAccounts } from './app/load-accounts'
import { schedule } from './app/schedule'

const bootstrap = (): void => {
  console.time('bootstrap')
  dotenv.config()
  console.timeEnd('bootstrap')
}

const main = (): void => {
  bootstrap()
  const everyMinute = 1000 * 10
  schedule(loadAccounts, everyMinute)
}

main()
