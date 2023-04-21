import { type Player } from '../domain/player'
import { FileSystemRepository } from './file-system-repository'

export class FileSystemPlayerRepository extends FileSystemRepository<Player> {
}
