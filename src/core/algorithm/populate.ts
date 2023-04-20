import { join } from "ramda"
import { Populate } from "./abstract-populate"
import { readFileSync, readdirSync } from "node:fs"
import console from "node:console"

export class PopulateFileSystem extends Populate {
  private readonly _alphabeticFolderNames: string[] = new Array(26).fill(0).map((_, i) => String.fromCharCode(65 + i)).concat('etc')
  public gamePath: string

  public populate(): void {
    this._alphabeticFolderNames.forEach((folderName) => {
      const absoluteFolder = join('/', [this.gamePath, folderName])
      const accountFileNames = this.getListOfFilesOnPath(absoluteFolder)
      accountFileNames.forEach((accountFileName) => {
        this.readAccount(absoluteFolder, accountFileName)
      })
    })
  }

  public async readAccount(folder: string, fileName: string): Promise<void> {
    const absoluteAccountPath = join('/', [folder, fileName])
    const accountBuffer = readFileSync(absoluteAccountPath)
    console.log(accountBuffer.toString())
  }

  public getListOfFilesOnPath(folder: string): string[] {
    return readdirSync(folder)
  }
}
