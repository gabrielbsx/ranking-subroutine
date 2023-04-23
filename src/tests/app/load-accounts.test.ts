import { beforeEach, describe, expect, test, vi } from 'vitest'
import { cacheInMemory } from '../../core/algorithm/cache'
import { accountStatsCacheAllocation, isAccountCached, isAccountChanged, isValidAccount } from '../../core/app/load-accounts'
import { type StatsCache } from '../../core/contracts/account-stats-cache'

const fileMock: StatsCache = {
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
    accountStatsCacheAllocation(fileMock, 'any-account')
    expect(cacheInMemory.data).toHaveLength(1)
  })
  test('accounts should be not cached stats file if file is directory', () => {
    expect(cacheInMemory.data).toHaveLength(0)
    const isDirectoryMocked = vi.spyOn(fileMock, 'isDirectory').mockReturnValue(true)
    expect(cacheInMemory.data).toHaveLength(0)
    expect(isValidAccount(fileMock)).toBe(false)
    isDirectoryMocked.mockRestore()
  })
  test('accounts should be cached if file is changed or not', () => {
    expect(cacheInMemory.data).toHaveLength(0)
    const originalFileMock = fileMock
    const modifiedFileMock = {
      ...fileMock,
      birthtime: new Date(),
      mtime: new Date()
    }
    accountStatsCacheAllocation(originalFileMock, 'any-account')
    expect(cacheInMemory.data).toHaveLength(1)
    expect(isAccountChanged('any-account', modifiedFileMock)).toBe(true)
    accountStatsCacheAllocation(modifiedFileMock, 'any-account')
    expect(cacheInMemory.data).toHaveLength(1)
    expect(isAccountChanged('any-account', modifiedFileMock)).toBe(false)
  })
  test('accounts should be validate if account stats is cached or not', () => {
    expect(cacheInMemory.data).toHaveLength(0)
    accountStatsCacheAllocation(fileMock, 'any-account')
    expect(cacheInMemory.data).toHaveLength(1)
    expect(isAccountCached('any-account')).toBe(true)
    expect(isAccountCached('any-account-not-cached')).toBe(false)
  })
})
