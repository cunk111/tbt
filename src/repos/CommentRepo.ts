import { IComment } from '@src/models/Comment';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

async function getOne(id: IComment['id']): Promise<IComment | null> {
	const db = await orm.openDb();
	for (const comment of db.comments) {
		if (comment.id === id) {
			return comment;
		}
	}
	return null;
}

async function persists(id: number): Promise<boolean> {
	const db = await orm.openDb();
	for (const comment of db.comments) {
		if (comment.id === id) {
			return true;
		}
	}
	return false;
}

async function getAll(): Promise<IComment[]> {
	const db = await orm.openDb();
	return db.comments;
}

async function add(comment: IComment): Promise<void> {
	const db = await orm.openDb();
	comment.id = getRandomInt();
	comment.date = Date.now();
	db.comments.push(comment);
	return orm.saveDb(db);
}

async function update(comment: IComment): Promise<void> {
	const db = await orm.openDb();
	for (let i = 0; i < db.comments.length; i++) {
		if (db.comments[i].id === comment.id) {
			db.comments[i] = comment;
			return orm.saveDb(db);
		}
	}
}

async function delete_(id: number): Promise<void> {
	const db = await orm.openDb();
	for (let i = 0; i < db.comments.length; i++) {
		if (db.comments[i].id === id) {
			db.comments.splice(i, 1);
			return orm.saveDb(db);
		}
	}
}

export default {
	getAll,
	getOne,
	persists,
	add,
	update,
	delete: delete_,
} as const;
