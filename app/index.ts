import process from 'process'
import logger from 'jet-logger'
import 'module-alias/register' // TODO fix build process

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires,max-len
require('dotenv').config({path: `${__dirname}/../env/.env.${process.env.NODE_ENV}`})

import server from './server'

const prompt = `Server listening on port: ${(process.env.PORT || '').toString()}`

server.listen(process.env.PORT, () => logger.info(prompt))
