import { type Database } from '../algorithm/database-client'

export interface AccountRepository {
  getAccountByUsername: (username: string) => Promise<void>
}

export const accountRepository = (database: Database): AccountRepository => {
  const databaseClient = database.connect()

  const getAccountByUsername = async (username: string): Promise<void> => {
    const account = await databaseClient.query('SELECT * FROM account WHERE username = $1', [username])
    console.log(account)
  }

  return {
    getAccountByUsername
  }
}
