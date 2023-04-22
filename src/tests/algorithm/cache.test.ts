import { assertType, describe, expect, test } from 'vitest'
import { cacheInMemory } from '../../core/algorithm/cache'

describe('cache in memory', () => {
  test('should be cached data a map', () => {
    expect(cacheInMemory.data).toBeInstanceOf(Map)
    assertType<Map<string, any>>(cacheInMemory.data)
  })
  test('should be possible to set and get', () => {
    cacheInMemory.set('test', 'ok')
    expect(cacheInMemory.get('test')).toBe('ok')
  })
  test('should be is possible to delete', () => {
    cacheInMemory.delete('test')
    expect(cacheInMemory.get('test')).toBeUndefined()
  })
})
