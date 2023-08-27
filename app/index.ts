import process from 'process'
import logger from 'jet-logger'
import 'module-alias/register' // TODO fix build process
import 'dotenv/config'

import server from './server'

const prompt = `Server listening on port: ${(process.env.PORT || '').toString()}`

server.listen(process.env.PORT, () => logger.info(prompt))
