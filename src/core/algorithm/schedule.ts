import cron from 'node-cron'

export const schedule = (fn: () => any, time: string): void => {
  cron.schedule(time, fn)
}
