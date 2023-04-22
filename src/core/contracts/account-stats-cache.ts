export interface StatsCache {
  size: number
  birthtime: Date
  mtime: Date
  isDirectory?: () => boolean
}
