export const errorWrapper = async (fn: () => Promise<any>): Promise<any> => {
  try {
    return ['ok', await fn()]
  } catch (error) {
    return [error, null]
  }
}
