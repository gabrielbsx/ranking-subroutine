import * as dotenv from 'dotenv'
import { PopulateFactory } from './core/factory/populate-factory'
import EventEmitter from 'node:events'

dotenv.config()

function main (): void {
  console.time('load accounts')
  const populateObserver = new EventEmitter()
  const populateFactory = new PopulateFactory()
  const populate = populateFactory.createPopulate()
  void populate.populate()
  console.timeEnd('load accounts')
}

main()
