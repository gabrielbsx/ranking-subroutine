import { type Database } from '../algorithm/database-client'
import { type GameAccount } from '../domain/entity/game-account'

export interface AccountRepository {
  getAccountByUsername: (username: string) => Promise<GameAccount>
  getAccountsByUsernames: (usernames: string[]) => Promise<GameAccount[]>
}

export const accountRepository = async (database: Database): Promise<AccountRepository> => {
  const databaseClient = await database.connect()

  const getAccountByUsername = async (username: string): Promise<GameAccount> => {
    const account = await databaseClient.gameAccount.findFirstOrThrow({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })
    return account
  }

  const getAccountsByUsernames = async (usernames: string[]): Promise<GameAccount[]> => {
    console.log(usernames)
    const accounts = await databaseClient.gameAccount.findMany({
      where: {
        username: {
          in: usernames,
          mode: 'insensitive'
        }
      }
    })
    return accounts
  }

  return {
    getAccountsByUsernames,
    getAccountByUsername
  }
}
