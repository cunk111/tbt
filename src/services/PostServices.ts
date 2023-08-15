import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';

import PostRepo from '@src/repos/PostRepo';
import { IComment } from '@src/models/Comment';
import { IPost } from '@src/models/Post';

export const QUESTION_NOT_FOUND_ERR = 'Question not found';


function getAll(): Promise<IPost[]> {
	return PostRepo.getAll();
}

function getOne(id: IPost['id']): Promise<IPost | null> {
	return PostRepo.getOne(id);
}

function getPostComments(id: IComment['parent']): Promise<IComment[] | null> {
	return PostRepo.getPostComments(id);
}

async function getThread(id: IPost['id']) { // : Promise<TPost | null>
	const comments = await PostRepo.getPostComments(id);
	const post = await PostRepo.getOne(id);

	if (Array.isArray(comments)) {
		return [post, ...comments.sort((alpha, omega) => alpha.date - omega.date)];
	}
}

function addOne(post: IPost): Promise<void> {
	return PostRepo.add(post);
}

async function updateOne(post: IPost): Promise<void> {
	const persists = await PostRepo.persists(post.id);
	if (!persists) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			QUESTION_NOT_FOUND_ERR,
		);
	}
	return PostRepo.update(post);
}

async function _delete(id: number): Promise<void> {
	const persists = await PostRepo.persists(id);
	if (!persists) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			QUESTION_NOT_FOUND_ERR,
		);
	}
	return PostRepo.delete(id);
}


export default {
	getAll,
	getOne,
	getPostComments,
	getThread,
	addOne,
	updateOne,
	delete: _delete,
} as const;
