export const isEmpty = (value: any): boolean => {
  return value === undefined || value === null || value === ''
}
export const isNotEmpty = (value: any): boolean => !isEmpty(value)
