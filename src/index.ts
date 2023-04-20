import { join } from "ramda";
import { PopulateFileSystem } from "./core/algorithm/populate";

async function main() {
  const populateFS = new PopulateFileSystem()
  populateFS.gamePath = join('/', [__dirname, '..', 'mock', 'account'])
  populateFS.populate()
}

main();