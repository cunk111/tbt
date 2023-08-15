import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import PostServices from '@src/services/PostServices';

import { IPost } from '@src/models/Post';
import { IReq, IRes } from './types/express/misc';


async function getAll(_: IReq, res: IRes) {
	const posts = await PostServices.getAll();
	return res.status(HttpStatusCodes.OK).json({ posts });
}

async function getOne(req: IReq, res: IRes) {
	const posts = await PostServices.getOne(parseInt(req.params.id, 10));
	return res.status(HttpStatusCodes.OK).json({ posts });
}

async function getThread(req: IReq, res: IRes) {
	const {id} = req.params;
	const posts = await PostServices.getThread(parseInt(id, 10));
	return res.status(HttpStatusCodes.OK).json({ posts });
}

async function getPostComments(req: IReq, res: IRes) {
	const {id} = req.params;
	const comments = await PostServices.getPostComments(parseInt(id, 10));
	return res.status(HttpStatusCodes.OK).json({ comments });
}

async function add(req: IReq<{post: IPost}>, res: IRes) {
	const { post } = req.body;
	await PostServices.addOne(post);
	return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<{post: IPost}>, res: IRes) {
	const { post } = req.body;
	await PostServices.updateOne(post);
	return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
	const id = +req.params.id;
	await PostServices.delete(id);
	return res.status(HttpStatusCodes.OK).end();
}


export default {
	getAll,
	getOne,
	getThread,
	getPostComments,
	add,
	update,
	delete: delete_,
} as const;
