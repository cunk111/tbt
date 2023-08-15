import jsonfile from 'jsonfile';

import { IComment } from '@src/models/Comment';
import { IPost } from '@src/models/Post';
import { IUser } from '@src/models/User';

const DB_FILE_NAME = '_database.json';

interface IDb {
  comments: IComment[];
  posts: IPost[];
  users: IUser[];
}


function openDb(): Promise<IDb> {
	return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

function saveDb(db: IDb): Promise<void> {
	return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


export default {
	openDb,
	saveDb,
} as const;
