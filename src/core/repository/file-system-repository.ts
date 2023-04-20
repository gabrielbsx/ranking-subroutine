import { GenericRepository } from './generic-repository'

export abstract class FileSystemRepository<T, U> extends GenericRepository<T> {
  protected struct!: U
  load (data: T[]): void {
    data.forEach((item) => {
      void super.create(item)
    })
  }
}
