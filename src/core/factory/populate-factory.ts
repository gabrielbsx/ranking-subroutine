import { PopulateFileSystem } from '../algorithm/populate'
import { FileSystemAccountRepository } from '../repository/account-repository'
import { StructAccountFile } from '../structs/account'

export class PopulateFactory {
  createPopulate (): PopulateFileSystem {
    const fileSystemAccountRepository = new FileSystemAccountRepository(
      StructAccountFile
    )
    const populate = new PopulateFileSystem(fileSystemAccountRepository)
    return populate
  }
}
