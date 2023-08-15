import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';

import PostRepo from '@src/repos/PostRepo';
import UserRepo from '@src/repos/UserRepo';

import { IComment } from '@src/models/Comment';
import { IPost } from '@src/models/Post';
import { IUser } from '@src/models/User';

export const USER_NOT_FOUND_ERR = 'User not found';

function getAll(): Promise<IUser[]> {
	return UserRepo.getAll();
}

function getOne(id: IUser['id']): Promise<IUser | null> {
	return UserRepo.getOne(id);
}

function getUserComments(id: IComment['owner']): Promise<IComment[] | null> {
	return UserRepo.getUserComments(id);
}

function getUserPosts(id: IPost['id']): Promise<IPost[] | null> {

	return PostRepo.getUserPosts(id);
}


function addOne(user: IUser): Promise<void> {
	return UserRepo.add(user);
}

async function updateOne(user: IUser): Promise<void> {
	const persists = await UserRepo.persists(user.id);
	if (!persists) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			USER_NOT_FOUND_ERR,
		);
	}
	return UserRepo.update(user);
}

async function _delete(id: number): Promise<void> {
	const persists = await UserRepo.persists(id);
	if (!persists) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			USER_NOT_FOUND_ERR,
		);
	}
	return UserRepo.delete(id);
}


export default {
	getAll,
	getOne,
	getUserComments,
	getUserPosts,
	addOne,
	updateOne,
	delete: _delete,
} as const;
