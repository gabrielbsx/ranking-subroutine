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
  }
}
