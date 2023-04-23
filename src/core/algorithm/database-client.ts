import { PrismaClient } from '@prisma/client'

export interface Database {
  client: PrismaClient | undefined
  connect: () => Promise<PrismaClient>
  disconnect: () => Promise<void>
}

export const database: Database = {
  client: undefined,
  async connect () {
    if (this.client === undefined) {
      this.client = new PrismaClient()
      void this.client.$connect()
    }
    return this.client
  },
  async disconnect () {
    if (this.client !== undefined) {
      await this.client.$disconnect()
      this.client = undefined
    }
  }
}
