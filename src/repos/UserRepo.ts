import { getRandomInt } from '@src/util/misc';

import {IComment} from '@src/models/Comment';
import { IUser } from '@src/models/User';
import orm from './MockOrm';


async function getAll(): Promise<IUser[]> {
	const db = await orm.openDb();
	return db.users;
}

async function getOne(id: IUser['id']): Promise<IUser | null> {
	const db = await orm.openDb();
	for (const user of db.users) {
		if (user.id === id) {
			return user;
		}
	}
	return null;
}

async function getUserComments(id: IComment['owner']): Promise<IComment[] | null> {
	const db = await orm.openDb();

	return db.comments.filter(comment => comment.owner === id) || null;
}

async function persists(id: number): Promise<boolean> {
	const db = await orm.openDb();
	for (const user of db.users) {
		if (user.id === id) {
			return true;
		}
	}
	return false;
}

async function add(user: IUser): Promise<void> {
	const db = await orm.openDb();
	user.id = getRandomInt();
	db.users.push(user);
	return orm.saveDb(db);
}

async function update(user: IUser): Promise<void> {
	const db = await orm.openDb();
	for (let i = 0; i < db.users.length; i++) {
		if (db.users[i].id === user.id) {
			db.users[i] = user;
			return orm.saveDb(db);
		}
	}
}

async function delete_(id: number): Promise<void> {
	const db = await orm.openDb();
	for (let i = 0; i < db.users.length; i++) {
		if (db.users[i].id === id) {
			db.users.splice(i, 1);
			return orm.saveDb(db);
		}
	}
}


export default {
	getAll,
	getOne,
	getUserComments,
	persists,
	add,
	update,
	delete: delete_,
} as const;
