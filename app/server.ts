import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import logger from 'jet-logger'
import express, { Request, Response, NextFunction } from 'express'

import 'express-async-errors'

import routes from '@routes/routes'

import HttpStatusCodes from '@constants/HttpStatusCodes'
import Paths from '@constants/Paths'

import { RouteError } from '@models/classes'
import process from 'process'


const app = express()
app.use(cors<Request>())


// Basic middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(cookieParser(EnvVars.CookieProps.Secret))

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Security
if (process.env.NODE_ENV === 'production') {
	app.use(helmet())
}

// Add APIs, must be after middleware
app.use(Paths.Base, routes)

// Add error handler
app.use((
	err: Error,
	_: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	if (process.env.NODE_ENV !== 'test') {
		logger.err(err, true)
	}
	let status = HttpStatusCodes.BAD_REQUEST
	if (err instanceof RouteError) {
		status = err.status
	}
	return res.status(status).json({ error: err.message })
})

export default app