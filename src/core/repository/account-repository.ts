import { type Database } from '../algorithm/database-client'
import { type GameAccount } from '../domain/entity/game-account'

export interface AccountRepository {
  getAccountByUsername: (username: string) => Promise<GameAccount>
}

export const accountRepository = async (database: Database): Promise<AccountRepository> => {
  const databaseClient = await database.connect()

  const getAccountByUsername = async (username: string): Promise<GameAccount> => {
    const databaseFetched = await databaseClient.query<GameAccount & { _id: string }>('SELECT * FROM "GameAccount" WHERE username ilike $1', [username])
    if (databaseFetched.rowCount === 0) {
      throw new Error('Account not found')
    }
    const accountRow = databaseFetched.rows[0]
    const account: GameAccount = {
      ...accountRow,
      id: accountRow._id
    }
    return account
  }

  return {
    getAccountByUsername
  }
}
