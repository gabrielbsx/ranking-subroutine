import { Client } from 'pg'
import { env } from 'node:process'

export interface Database {
  client: Client | undefined
  connect: () => Client
  disconnect: () => Promise<void>
}

export const database: Database = {
  client: undefined,
  connect () {
    if (this.client === undefined) {
      this.client = new Client({
        user: env.DB_USER,
        host: env.DB_HOST,
        database: env.DB_NAME,
        password: env.DB_PASS,
        port: Number(env.DB_PORT)
      })
    }
    return this.client
  },
  async disconnect () {
    if (this.client !== undefined) {
      await this.client.end()
      this.client = undefined
    }
  }
}
