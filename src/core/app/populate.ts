import { type AccountRepository } from '../repository/account-repository'
import { errorWrapper } from '../utils/extensions/error'
import { type PlayerRepository } from '../repository/player-repository'
import { type Account } from '../domain/entity/account'

export const populateAccount = async (
  accountRepository: AccountRepository,
  playerRepository: PlayerRepository,
  accounts: Account[]
): Promise<void> => {
  for (const account of accounts) {
    const [error, accountFetchedData] = await errorWrapper(async () => await accountRepository.getAccountByUsername(account.username))
    if (error !== null || accountFetchedData === null) {
      console.error(error)
      await Promise.resolve()
    }
    const accountId = accountFetchedData?.id as string
    account.players.map(async (player) => {
      const [error, playerFetchedData] = await errorWrapper(async () => await playerRepository.getBySlotAndAccountId(player.slot, accountId))
      if (error !== null) {
        console.error(error)
        await Promise.resolve()
      }
      if (playerFetchedData === null) {
        await playerRepository.insert(player, accountId)
      } else {
        await playerRepository.update(playerFetchedData.id, player)
      }
    })
  }
}
