import { GenericRepository } from './generic-repository'

export abstract class FileSystemRepository<T> extends GenericRepository<T> {
  load (data: T): void {
    void super.create(data)
  }
}
