import { beforeEach, describe, expect, test, vi } from 'vitest'
import { cacheInMemory } from '../../core/algorithm/cache'
import { accountStatsCacheAllocation } from '../../core/app/load-accounts'
import { type Stats } from 'node:fs'

const fileMock = {
  size: 1,
  birthtime: new Date(),
  mtime: new Date(),
  isDirectory: (): boolean => false
}

describe('load accoutns', () => {
  beforeEach(() => {
    cacheInMemory.data = new Map<string, any>()
  })
  test('accounts should be cached stats file if this data is not', () => {
    expect(cacheInMemory.data).toHaveLength(0)
    accountStatsCacheAllocation(fileMock as Stats, 'any-account')
    expect(cacheInMemory.data).toHaveLength(1)
  })
  test('accounts should be not cached stats file if file is directory', () => {
    expect(cacheInMemory.data).toHaveLength(0)
    vi.spyOn(fileMock, 'isDirectory').mockReturnValue(true)
    accountStatsCacheAllocation(fileMock as Stats, 'any-account')
    expect(cacheInMemory.data).toHaveLength(0)
  })
})
