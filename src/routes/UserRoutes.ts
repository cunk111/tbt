import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import UserServices from '@src/services/UserServices';

import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';


async function getAll(_: IReq, res: IRes) {
	const users = await UserServices.getAll();
	return res.status(HttpStatusCodes.OK).json({ users });
}

async function getOne(req: IReq, res: IRes) {
	const users = await UserServices.getOne(parseInt(req.params.id, 10));
	return res.status(HttpStatusCodes.OK).json({ users });
}

async function getUserComments(req: IReq, res: IRes) {
	const {id} = req.params;
	const comments = await UserServices.getUserComments(parseInt(id, 10));
	return res.status(HttpStatusCodes.OK).json({ comments });
}

async function getUserPosts(req: IReq, res: IRes) {
	const {id} = req.params;
	const posts = await UserServices.getUserPosts(parseInt(id, 10));
	return res.status(HttpStatusCodes.OK).json({ posts });
}

async function add(req: IReq<{user: IUser}>, res: IRes) {
	const { user } = req.body;
	await UserServices.addOne(user);
	return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<{user: IUser}>, res: IRes) {
	const { user } = req.body;
	await UserServices.updateOne(user);
	return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
	const id = +req.params.id;
	await UserServices.delete(id);
	return res.status(HttpStatusCodes.OK).end();
}


export default {
	getAll,
	getOne,
	getUserComments,
	getUserPosts,
	add,
	update,
	delete: delete_,
} as const;
