import { type FileSystem } from '../domain/file-system'

export abstract class AbstractFileSystem<T> implements FileSystem<T> {
  public struct!: T
  abstract read (path: string): Promise<T>
}
