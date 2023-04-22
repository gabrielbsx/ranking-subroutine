export const schedule = (fn: () => any, time: number): void => {
  setInterval(() => {
    console.time('Schedule is called')
    fn()
    console.timeEnd('Schedule is called')
  }, time)
}
