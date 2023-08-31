import {IReq, IRes} from '@models/types'
import {IUser} from '@models/User'

import UserController from '@controllers/UserController'

async function getAll(_: IReq, res: IRes) {
	await UserController.getAll(res)
}

async function getOne(req: IReq, res: IRes) {
	const {id} = req.params
	await UserController.getOne(res, id)
}

async function add(req: IReq<IUser>, res: IRes) {
	const user = req.body
	await UserController.addOne(res, user)
}

async function update(req: IReq<IUser>, res: IRes) {
	const user = req.body
	await UserController.updateOne(res, user)
}

async function delete_(req: IReq, res: IRes) {
	const {id} = req.params
	await UserController.delete(res, id)
}


export default {
	getAll,
	getOne,
	add,
	update,
	delete: delete_,
} as const
