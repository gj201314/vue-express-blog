import settings from '../settings'
import {Db,Connection,Server} from 'mongodb'

export default new Db(settings.db,new Server(settings.host, settings.port),{safe: true})