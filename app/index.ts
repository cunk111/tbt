import process from 'process'
import logger from 'jet-logger'
import dotenv from 'dotenv'

import 'module-alias/register' // TODO fix build process

dotenv.config({path: `${__dirname}/../env/.env.${process.env.NODE_ENV}`})

import server from './server'

const prompt = `Server 🎙️ on port: ${(process.env.PORT || '').toString()}`

server.listen(process.env.PORT, () => logger.info(prompt))
