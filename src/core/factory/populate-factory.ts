import { PopulateFileSystem } from '../use-case/populate'
import { FileSystemAccountRepository } from '../repository/account-repository'

export class PopulateFactory {
  createPopulate (): PopulateFileSystem {
    const fileSystemAccountRepository = new FileSystemAccountRepository()
    const populate = new PopulateFileSystem(fileSystemAccountRepository)
    return populate
  }
}
