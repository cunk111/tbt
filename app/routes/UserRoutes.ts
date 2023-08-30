import { IReq, IRes } from '@models/types'
import { IUser } from '@models/User'

import HttpStatusCodes from '../constants/HttpStatusCodes'
import UserServices from '../controllers/UserController'


async function getAll(_: IReq, res: IRes) {
	const users = await UserServices.getAll()
	return res.status(HttpStatusCodes.OK).json(users)
}

async function getOne(req: IReq, res: IRes) {
	const user = await UserServices.getOne(req.params.id)
	return res.status(HttpStatusCodes.OK).json(user)
}

async function add(req: IReq<IUser>, res: IRes) {
	const user = req.body
	await UserServices.addOne(user)
	return res.status(HttpStatusCodes.CREATED).end()
}

async function update(req: IReq<IUser>, res: IRes) {
	const user = req.body
	await UserServices.updateOne(user)
	return res.status(HttpStatusCodes.OK).end()
}

async function delete_(req: IReq, res: IRes) {
	const id = req.params.id
	await UserServices.delete(id)
	return res.status(HttpStatusCodes.OK).end()
}


export default {
	getAll,
	getOne,
	add,
	update,
	delete: delete_,
} as const
