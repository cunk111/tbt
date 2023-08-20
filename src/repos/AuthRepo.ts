import { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import {compare, generateHash} from '@src/util/encryption';
import orm from './MockOrm';

async function register(
	username: IUser['username'],
	email: IUser['email'],
	password: IUser['password'],
): Promise<IUser | undefined> {
	const db = await orm.openDb();

	db.users.push({
		id: getRandomInt(),
		email: email,
		username: username, // email.split('@')[0],
		password: generateHash(password),
	});

	await orm.saveDb(db);
	return db.users.find(user => user.email === email); // yucky
}

// async function persists(id: number): Promise<boolean> {
// 	const db = await orm.openDb();
// 	for (const comment of db.comments) {
// 		if (comment.id === id) {
// 			return true;
// 		}
// 	}
// 	return false;
// }

async function signin(
	email: IUser['email'],
	password: IUser['password'],
): Promise<IUser | undefined> {
	const db = await orm.openDb();

	const potentialUser = db.users.find((user: IUser) => user.email === email);
	if (!!potentialUser) {
		if (compare(password, potentialUser?.password)) {
			return potentialUser;
		}
		return undefined;
	}

	return undefined;
}

// async function signout(comment: IUser): Promise<void> {
// 	const db = await orm.openDb();
// 	comment.id = getRandomInt();
// 	comment.date = Date.now();
// 	db.comments.push(comment);
// 	return orm.saveDb(db);
// }

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
	register,
	signin,
	// signout,
	// password,
	// persists,
} as const;
