import { StructAccountFile, type StructAccountInfoType } from './../structs/account'
import { join } from 'node:path'
import { type Account } from '../entity/account'
import { FileSystemRepository } from './file-system-repository'
import { readFileSync, readdirSync } from 'node:fs'
import { env } from 'node:process'
import { Player } from '../domain/player'
import { type StructMobType } from '../structs/mob'
import { type StructMobExtraType } from '../structs/mob-extra'

interface AccountInfo {
  username: string
  password: string
  numericToken: string
}
export class FileSystemAccountRepository extends FileSystemRepository<Account> {
  static readonly alphabeticFolderNames = new Array(26).fill(0).map((_, i) => String.fromCharCode(65 + i)).concat('etc')

  public loadAccount (): void {
    FileSystemAccountRepository.alphabeticFolderNames.forEach((folderName) => {
      const absoluteFolder = join(env.ACCOUNT_PATH, folderName)
      const accountFileNames = this.getListOfFilesOnPath(absoluteFolder)
      accountFileNames.forEach((accountFileName) => {
        this.readAccount(absoluteFolder, accountFileName)
      })
    })
  }

  public getListOfFilesOnPath (folder: string): string[] {
    return readdirSync(folder)
  }

  public extractAccountInfo (accountInfoStruct: StructAccountInfoType): AccountInfo {
    const username = accountInfoStruct.accountName.buffer.readCString()
    const password = accountInfoStruct.accountPass.buffer.readCString()
    const numericToken = accountInfoStruct.numericToken.buffer.readCString()
    const accountInfo = Object.freeze({
      username,
      password,
      numericToken
    })
    return accountInfo
  }

  public extractPlayers (mobs: StructMobType[], mobExtras: StructMobExtraType[]): Player[] {
    const players: Player[] = []
    mobs.forEach((mob, index) => {
      if (mob.mobName.buffer.readCString() === '') {
        return
      }
      const extra = mobExtras[index]
      const player = new Player()
      const slot = index + 1
      player.setByCastStructsMobToPlayer(slot, mob, extra)
      players.push(player)
    })
    return players
  }

  public readAccount (folder: string, fileName: string): void {
    const absoluteAccountPath = join(folder, fileName)
    const accountBuffer = readFileSync(absoluteAccountPath)
    const accountStruct = StructAccountFile()
    accountStruct.ref().set(accountBuffer)
    const accountInfoExtractedFromAccount = this.extractAccountInfo(accountStruct.info)
    const playersExtractedFromAccount = this.extractPlayers(accountStruct.char.toArray(), accountStruct.mobExtra.toArray())
    const account: Account = {
      ...accountInfoExtractedFromAccount,
      players: playersExtractedFromAccount
    }
    this.load(account)
  }
}
