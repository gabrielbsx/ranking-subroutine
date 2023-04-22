import { describe, expect, test, vi } from 'vitest'
import { schedule } from '../../core/algorithm/schedule'

const mockFunctions = {
  getOk: (): string => {
    return 'ok'
  }
}

describe('schedule', () => {
  test('should be call a function with a schedule', async () => {
    const functionSpy = vi.spyOn(mockFunctions, 'getOk')
    expect(functionSpy.getMockName()).toBe('getOk')
    const mockTime = 1
    schedule(mockFunctions.getOk, mockTime)
    await new Promise(resolve => setTimeout(resolve, mockTime))
    expect(functionSpy).toBeCalledTimes(1)
  })
})
