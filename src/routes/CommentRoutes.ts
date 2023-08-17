import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import CommentServices from '@src/services/CommentServices';

import { IComment } from '@src/models/Comment';
import { IReq, IRes } from './types/express/misc';


async function getAll(_: IReq, res: IRes) {
	const comments = await CommentServices.getAll();
	return res.status(HttpStatusCodes.OK).json(comments);
}

async function getOne(req: IReq, res: IRes) {
	const comments = await CommentServices.getOne(parseInt(req.params.id, 10));
	return res.status(HttpStatusCodes.OK).json(comments);
}

async function add(req: IReq<IComment>, res: IRes) {
	const comment  = req.body;
	console.log(comment);
	await CommentServices.addOne(comment);
	return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<IComment>, res: IRes) {
	const comment = req.body;
	await CommentServices.updateOne(comment);
	return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
	const id = +req.params.id;
	await CommentServices.delete(id);
	return res.status(HttpStatusCodes.OK).end();
}


export default {
	getAll,
	getOne,
	add,
	update,
	delete: delete_,
} as const;
