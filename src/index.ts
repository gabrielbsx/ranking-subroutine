import * as dotenv from 'dotenv'
import { PopulateFactory } from './core/factory/populate-factory'

dotenv.config()

function main (): void {
  const populateFactory = new PopulateFactory()
  const populate = populateFactory.createPopulate()
  populate.populate()
}

main()
