import {IUser} from '@models/User'
import {pg} from '@infrastructure/database'
import {hashPassword} from '@utils/encryption'

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
			.select<IUser>('*')
			.from('user_account')
			.where({u_id: id})
			.then(user => user)
	} catch (error) {
		return null
	}
}

async function findByMail(email: IUser['email']) {
	try {
		return pg
			.select<IUser>('*')
			.from('user_account')
			.where({email: email})
			.then(user => user)
	} catch (error) {
		return null
	}
}

// async function findByUsername(name: IUser['username']): Promise<IUser | null> {
// 	try {
// 		return pg
// 			.select<IUser>('*')
// 			.from('user_account')
// 			.where({u_username: name})
// 			.then((user: IUser): IUser => user)
// 	} catch (error) {
// 		return null
// 	}
// }

async function add(user: IUser) {
	try {
		return pg
			.insert<IUser>({
				u_username: user.username,
				u_password: hashPassword(user.password),
				email: user.email,
			})
			.into('user_account')
			.returning(['u_id', 'email', 'u_username'])
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
			// .then(val => console.log('delete', val))
	} catch (error) {
		console.error(error)
		return null
	}
}

async function checkExistence(name: IUser['username'], email: IUser['email']) {
	try {
		return pg
			.select<IUser>('u_id')
			.from('user_account')
			.where({u_username: name})
			.orWhere({email: email})
			.then(exists => exists)
	} catch (error) {
		console.error(error)
		return null
	}
}

async function register(
	username: IUser['username'],
	email: IUser['email'],
	hash: IUser['password'],
): Promise<IUser | undefined> {
	// const db = await orm.openDb()
	//
	// check if user already exists
	// if (db.users.find(user => user.email === email)) return undefined
	//
	// db.users.push({
	// 	id: getRandomInt(),
	// 	email: email,
	// 	username: username,
	// 	password: hash,
	// })
	//
	// await orm.saveDb(db)
	// return db.users.find(user => user.email === email) // yucky
	return
}

async function signout(): Promise<void> {
	// const db = await orm.openDb()
	// return orm.saveDb(db)
	return
}

// async function password(comment: IUser): Promise<void> {
// 	const db = await orm.openDb();
// 	for (let i = 0; i < db.comments.length; i++) {
// 		if (db.comments[i].id === comment.id) {
// 			db.comments[i] = comment;
// 			return orm.saveDb(db);
// 		}
// 	}
// }


export default {
	getAll,
	findById,
	findByMail,
	// findByUsername,
	add,
	update,
	delete: delete_,
	checkExistence,
	register, // TODO register is basically add, gotta merge that
	signout,
} as const


