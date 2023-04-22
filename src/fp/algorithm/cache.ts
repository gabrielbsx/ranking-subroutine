import { randomUUID } from 'node:crypto'

export interface Cache {
  data: Map<string, any>
  get: (key: string) => any
  set: (key: string, value: any) => void
  setWithRandomKey: (value: any) => void
}

export const cacheInMemory: Cache = {
  data: new Map(),
  get: (key: string): any => {
    return cacheInMemory.data.get(key)
  },
  set: (key: string, value: any): void => {
    cacheInMemory.data.set(key, value)
  },
  setWithRandomKey: (value: any): void => {
    const key = randomUUID()
    cacheInMemory.data.set(key, value)
  }
}
