import { type FileSystemAccountRepository } from '../repository/account-repository'
import { Populate } from './abstract-populate'

export class PopulateFileSystem extends Populate {
  constructor (
    private readonly fileSystemAccountRepository: FileSystemAccountRepository
  ) {
    super()
  }

  public async populate (): Promise<void> {
    this.fileSystemAccountRepository.loadAccount()
    void this.getAllAccounts()
  }

  public async getAllAccounts (): Promise<void> {
    const accounts = await this.fileSystemAccountRepository.findAll()
    const players = accounts.map((account) => {
      const { players } = account
      return players
    }).flat()
    players.forEach((player) => {
      if (player.guildHierarchy !== undefined) {
        console.log(player.guildHierarchy)
      }
    })
  }
}
