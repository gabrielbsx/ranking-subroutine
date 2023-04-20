import { type Repository } from './repository'
import { randomUUID } from 'node:crypto'

export abstract class GenericRepository<T> implements Repository<T> {
  protected data: Map<string, T>

  constructor () {
    this.data = new Map()
  }

  async create (item: T): Promise<T> {
    const id = randomUUID()
    this.data.set(id, item)
    return item
  }

  async update (id: string, item: T): Promise<boolean> {
    if (!this.data.has(id)) {
      return false
    }
    this.data.set(id, item)
    return true
  }

  async delete (id: string): Promise<boolean> {
    return this.data.delete(id)
  }

  async find (item: T): Promise<T[]> {
    const items = Array.from(this.data.values()).filter(i => i === item)
    return items
  }

  async findAll (): Promise<T[]> {
    return Array.from(this.data.values())
  }

  async findOne (id: string): Promise<T> {
    const data = this.data.get(id)
    if (data === undefined) {
      throw new Error('Not found')
    }
    return data as T
  }
}
