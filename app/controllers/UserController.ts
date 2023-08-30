import { IUser } from '@models/User'
import UserRepo from '@services/UserServices'

function getAll(): Promise<IUser[] | null> {
	return UserRepo.getAll()
}

function getOne(id: IUser['id']): Promise<IUser | null> {
	return UserRepo.getOne(id)
}

function addOne(user: IUser): Promise<void> {
	return UserRepo.add(user)
}

async function updateOne(user: IUser): Promise<void> {
	return UserRepo.update(user)
}

async function _delete(id: IUser['id']): Promise<void> {
	return UserRepo.delete(id)
}


export default {
	getAll,
	getOne,
	addOne,
	updateOne,
	delete: _delete,
} as const
