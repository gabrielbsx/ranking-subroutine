export const errorWrapper = async (fn: () => Promise<any>): Promise<any> => {
  try {
    return [null, await fn()]
  } catch (error) {
    return [error, null]
  }
}
