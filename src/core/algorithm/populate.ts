import { Populate } from "./abstract-populate"

export class PopulateFileSystem extends Populate {
  private readonly _alphabeticFolderNames: string[] = new Array(26).fill(0).map((_, i) => String.fromCharCode(65 + i)).concat('etc')
  public gamePath: string

  public populate(): void {
    this._alphabeticFolderNames.forEach((folderName) => {
      console.log(folderName)
    })
  }
}
