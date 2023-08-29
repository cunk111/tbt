import { IPost } from '@models/Post'
import { IReq, IRes } from '@models/types'

import HttpStatusCodes from '../constants/HttpStatusCodes'
import PostServices from '../controllers/PostController'



async function getAll(_: IReq, res: IRes) {
	const posts = await PostServices.getAll()
	return res.status(HttpStatusCodes.OK).json(posts)
}

async function getOne(req: IReq, res: IRes) {
	const post = await PostServices.getOne(parseInt(req.params.id, 10))
	return res.status(HttpStatusCodes.OK).json(post)
}

async function getThread(req: IReq, res: IRes) {
	const {id} = req.params
	const thread = await PostServices.getThread(parseInt(id, 10))
	return res.status(HttpStatusCodes.OK).json(thread)
}

async function getPostComments(req: IReq, res: IRes) {
	const {id} = req.params
	const comments = await PostServices.getPostComments(parseInt(id, 10))
	return res.status(HttpStatusCodes.OK).json(comments)
}

async function add(req: IReq<IPost>, res: IRes) {
	const post = req.body
	await PostServices.addOne(post)
	return res.status(HttpStatusCodes.CREATED).end()
}

async function update(req: IReq<IPost>, res: IRes) {
	const post = req.body
	await PostServices.updateOne(post)
	return res.status(HttpStatusCodes.OK).end()
}

async function delete_(req: IReq, res: IRes) {
	const id = +req.params.id
	await PostServices.delete(id)
	return res.status(HttpStatusCodes.OK).end()
}


export default {
	getAll,
	getOne,
	getThread,
	getPostComments,
	add,
	update,
	delete: delete_,
} as const