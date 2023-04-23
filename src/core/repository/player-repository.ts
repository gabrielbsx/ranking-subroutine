import { type Prisma, type Player } from '@prisma/client'
import { type Database } from '../algorithm/database-client'
import { type Mob } from '../domain/entity/mob'
import { randomUUID } from 'crypto'

export interface PlayerRepository {
  deleteBySlotAndAccountId: (slot: number, accountId: string) => Promise<void>
  getBySlotAndAccountId: (slot: number, accountId: string) => Promise<Player | null>
  update: (id: string, player: Mob) => Promise<void>
  insert: (player: Mob, accountId: string) => Promise<void>
}

export const playerRepository = async (database: Database): Promise<PlayerRepository> => {
  const databaseClient = await database.connect()

  const getBySlotAndAccountId = async (slot: number, accountId: string): Promise<Player | null> => {
    const player = await databaseClient.player.findFirst({
      where: {
        slot,
        accountId
      }
    })
    return player
  }

  const insert = async (player: Mob, accountId: string): Promise<void> => {
    const data: Prisma.PlayerCreateInput = {
      slot: player.slot,
      gameMode: 'release',
      name: player.name,
      level: player.level,
      class: player.race as string[],
      evolution: player.evolution as string,
      kingdom: player.kingdom as string,
      frag: 0,
      guildHierarchy: player.guildHierarchy as string,
      GameAccount: {
        connect: {
          id: accountId
        }
      },
      id: randomUUID(),
      updatedAt: new Date()
    }
    await databaseClient.player.create({
      data
    })
  }

  const update = async (id: string, player: Mob): Promise<void> => {
    await databaseClient.player.update({
      where: {
        id
      },
      data: {
        name: player.name,
        level: player.level,
        class: player.race,
        evolution: player.evolution,
        kingdom: player.kingdom,
        guildHierarchy: player.guildHierarchy
      }
    })
  }

  const deleteBySlotAndAccountId = async (slot: number, accountId: string): Promise<void> => {
    const player = await databaseClient.player.findFirst({
      where: {
        slot,
        accountId
      }
    })
    if (player !== null) {
      await databaseClient.player.delete({
        where: {
          id: player.id
        }
      })
    }
  }

  return {
    getBySlotAndAccountId,
    deleteBySlotAndAccountId,
    update,
    insert
  }
}
