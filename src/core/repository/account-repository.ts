import { type StructAccountFile } from './../structs/account'
import { join } from 'node:path'
import { type Account } from '../entity/account'
import { FileSystemRepository } from './file-system-repository'
import { readFileSync, readdirSync } from 'node:fs'
import { env } from 'node:process'

export class FileSystemAccountRepository extends FileSystemRepository<Account, typeof StructAccountFile> {
  static readonly alphabeticFolderNames = new Array(26).fill(0).map((_, i) => String.fromCharCode(65 + i)).concat('etc')

  constructor (
    struct: typeof StructAccountFile
  ) {
    super()
    this.struct = struct
  }

  public loadAccount (): void {
    FileSystemAccountRepository.alphabeticFolderNames.forEach((folderName) => {
      const absoluteFolder = join(env.ACCOUNT_PATH as string, folderName)
      const accountFileNames = this.getListOfFilesOnPath(absoluteFolder)
      accountFileNames.forEach((accountFileName) => {
        console.log(accountFileName)
        this.readAccount(absoluteFolder, accountFileName)
      })
    })
  }

  public getListOfFilesOnPath (folder: string): string[] {
    return readdirSync(folder)
  }

  public readAccount (folder: string, fileName: string): void {
    const absoluteAccountPath = join(folder, fileName)
    const accountBuffer = readFileSync(absoluteAccountPath)
    const account = this.struct()
    account.ref().set(accountBuffer)
    const info = account.info.accountName.buffer.toString().split('\0')[0]
    console.log(info)
  }
}
