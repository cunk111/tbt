import knex from 'knex'

export const pg = knex({
	client: 'pg',
	connection: {
		database: process.env.PG_DB,
		host: process.env.PG_HOST,
		port: Number(process.env.PG_PORT),
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
	},
})
