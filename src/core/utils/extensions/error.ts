
export const errorWrapper = async <T>(fn: () => Promise<T>): Promise<[Error | null, T | null]> => {
  try {
    return [null, await fn()]
  } catch (error) {
    return [error as Error, null]
  }
}
