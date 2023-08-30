import {IUser} from '@models/User'
import {pg} from '@infrastructure/database'

async function getAll(): Promise<IUser[] | null> {
	try {
		return pg
			.select<IUser[]>('*')
			.from('user_account')
			.then((users: IUser[]): IUser[] => users)
	} catch (error) {
		return null
	}
}

async function getOne(id: IUser['id']): Promise<IUser | null> {
	try {
		return pg
			.select<IUser>('*')
			.from('user_account')
			.where({u_id: id})
			.then(users => users)
	} catch (error) {
		return null
	}
}

async function getOneByMail(email: IUser['email']): Promise<IUser | null> {
	try {
		return pg
			.select<IUser>('*')
			.from('user_account')
			.where({email: email})
			.then((users: IUser): IUser => users)
	} catch (error) {
		return null
	}
}

async function add(user: IUser): Promise<void> {
	try {
		return pg
			.insert(user)
			.into('user_account')
	} catch (error) {
		console.error(error)
	}
}

async function update(user: IUser): Promise<void> {
	try {
		return pg
			.update({
				u_username: user.username,
				u_password: user.password,
				email: user.email,
			})
			.into('user_account')
			.where({u_id: user.id})
			.then(val => console.log('update', val))
	} catch (error) {
		console.error(error)
	}
}

async function delete_(id: IUser['id']): Promise<void> {
	try {
		return pg
			.del()
			.into('user_account')
			.where({u_id: id})
			.then(val => console.log('delete', val))
	} catch (error) {
		console.error(error)
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
	getOne,
	getOneByMail,
	add,
	update,
	delete: delete_,
	register, // TODO register is basically add, gotta merge that
	signout,
} as const


