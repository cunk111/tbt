import fs from 'fs-extra' // , {copy}
import logger from 'jet-logger'
import childProcess from 'child_process'

(async () => {
	try {
		// Remove current build
		await remove('./dist/')
		// Copy front-end files
		// await copy('./app/public', './dist/public')
		// await copy('./app/views', './dist/views')
		// Copy back-end files
		await exec('tsc --build tsconfig.prod.json', './')
	} catch (err) {
		logger.err(err)
		// eslint-disable-next-line no-process-exit
		process.exit(1)
	}
})()

function remove(loc: string): Promise<void> {
	return new Promise((res, rej) => {
		return fs.remove(loc, (err) => {
			return (!!err ? rej(err) : res())
		})
	})
}

function exec(cmd: string, loc: string): Promise<void> {
	return new Promise((res, rej) => {
		return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
			if (!!stdout) {
				logger.info(stdout)
			}
			if (!!stderr) {
				logger.warn(stderr)
			}
			return (!!err ? rej(err) : res())
		})
	})
}
