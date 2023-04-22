export interface FileSystem<T> {
  struct: T
  read: (path: string) => Promise<T>
}
