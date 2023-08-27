import { RouteError } from '@models/classes'
import { IComment } from '@models/Comment'

import CommentRepo from '../services/CommentServices'
import HttpStatusCodes from '@constants/HttpStatusCodes'

export const COMMENT_NOT_FOUND_ERR = 'Comment not found'


function getAll(): Promise<IComment[]> {
	return CommentRepo.getAll()
}

function getOne(id: IComment['id']): Promise<IComment | null> {
	return CommentRepo.getOne(id)
}

function addOne(post: IComment): Promise<void> {
	return CommentRepo.add(post)
}

async function updateOne(post: IComment): Promise<void> {
	const persists = await CommentRepo.persists(post.id)
	if (!persists) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			COMMENT_NOT_FOUND_ERR,
		)
	}
	return CommentRepo.update(post)
}

async function _delete(id: number): Promise<void> {
	const persists = await CommentRepo.persists(id)
	if (!persists) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			COMMENT_NOT_FOUND_ERR,
		)
	}
	return CommentRepo.delete(id)
}


export default {
	getAll,
	getOne,
	// getPostComments,
	// getUserComments,
	addOne,
	updateOne,
	delete: _delete,
} as const
