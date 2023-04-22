import * as dotenv from 'dotenv'
import { PopulateFactory } from './core/factory/populate-factory'

dotenv.config()

function main (): void {
  console.time('load accounts')
  const populateFactory = new PopulateFactory()
  const populate = populateFactory.createPopulate()
  void populate.populate()
  console.timeEnd('load accounts')
}

main()
