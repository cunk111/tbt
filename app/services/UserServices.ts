import {DBUser, IUser} from '@models/User'
import {pg} from '@infrastructure/database'


function sanitizeDbUser(user: DBUser | undefined) {
	if (!user) return null
	return {
		id: user.u_id,
		email: user.email,
		username: user.u_username,
		password: user.u_password,
	}
}

async function getAll() {
	try {
		return pg
			.select<IUser[]>('*')
			.from('user_account')
			.then(users => users)
	} catch (error) {
		return null
	}
}

async function findById(id: IUser['id']) {
	try {
		return pg
			.select('*')
			.from('user_account')
			.where({u_id: id})
			.first<DBUser>()
			.then(user => sanitizeDbUser(user))
	} catch (error) {
		return null
	}
}

async function findByMail(email: IUser['email']) {
	try {
		return pg
			.select('*')
			.from('user_account')
			.where({email: email})
			.first<DBUser>()
			.then(user => sanitizeDbUser(user))
	} catch (error) {
		return null
	}
}

async function findByUsername(name: IUser['username']) {
	try {
		return pg
			.select('*')
			.from('user_account')
			.where({u_username: name})
			.first<DBUser>()
			.then(user => sanitizeDbUser(user))
	} catch (error) {
		return null
	}
}

async function update(user: IUser) {
	try {
		return pg
			.update({
				u_username: user.username,
				u_password: user.password, // TODO compare passwords
				email: user.email,
			})
			.into('user_account')
			.where({u_id: user.id})
			.then(user => user)
	} catch (error) {
		return null
	}
}

async function delete_(id: IUser['id']) {
	try {
		return pg
			.del()
			.into('user_account')
			.where({u_id: id})
			.returning('u_id')
	} catch (error) {
		return null
	}
}

export default {
	getAll,
	findById,
	findByMail,
	findByUsername,
	update,
	delete: delete_,
} as const