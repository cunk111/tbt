import {IComment} from '@models/Comment'
import {IUser} from '@models/User'

// TODO replace with uuid - or rework logic so it accepts db uuid
import {getRandomInt} from '@utils/misc'

import orm from '../infrastructure/MockOrm'


async function getAll(): Promise<IUser[]> {
	const db = await orm.openDb()
	return db.users
}

async function getOne(id: IUser['id']): Promise<IUser | null> {
	const db = await orm.openDb()
	for (const user of db.users) {
		if (user.id === id) {
			return user
		}
	}
	return null
}

async function getOneByMail(email: IUser['email']): Promise<IUser | null> {
	const db = await orm.openDb()
	for (const user of db.users) {
		if (user.email === email) {
			return user
		}
	}
	return null
}

async function getUserComments(id: IComment['owner']): Promise<IComment[] | null> {
	const db = await orm.openDb()

	return db.comments.filter(comment => comment.owner === id) || null
}

async function persists(id: number): Promise<boolean> {
	const db = await orm.openDb()
	for (const user of db.users) {
		if (user.id === id) {
			return true
		}
	}
	return false
}

async function add(user: IUser): Promise<void> {
	const db = await orm.openDb()
	user.id = getRandomInt()
	db.users.push(user)
	return orm.saveDb(db)
}

async function update(user: IUser): Promise<void> {
	const db = await orm.openDb()
	for (let i = 0; i < db.users.length; i++) {
		if (db.users[i].id === user.id) {
			db.users[i] = user
			return orm.saveDb(db)
		}
	}
}

async function delete_(id: number): Promise<void> {
	const db = await orm.openDb()
	for (let i = 0; i < db.users.length; i++) {
		if (db.users[i].id === id) {
			db.users.splice(i, 1)
			return orm.saveDb(db)
		}
	}
}

async function register(
	username: IUser['username'],
	email: IUser['email'],
	hash: IUser['password'],
): Promise<IUser | undefined> {
	const db = await orm.openDb()

	// check if user already exists
	if (db.users.find(user => user.email === email)) return undefined

	db.users.push({
		id: getRandomInt(),
		email: email,
		username: username,
		password: hash,
	})

	await orm.saveDb(db)
	return db.users.find(user => user.email === email) // yucky
}

async function signout(): Promise<void> {
	const db = await orm.openDb()
	return orm.saveDb(db)
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
	getOne,
	getOneByMail,
	getUserComments,
	persists,
	add,
	update,
	delete: delete_,
	register, // TODO register is basically add, gotta merge that
	signout,
} as const


