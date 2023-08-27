import {Sequelize} from 'sequelize'

const db = new Sequelize(
	process.env.PG_DB || 'postgres',
	process.env.PG_USER || 'postgres',
	process.env.PG_PASSWORD || '',
	{
		host: process.env.PG_HOST,
		dialect: 'postgres',
	},
)

module.exports = db