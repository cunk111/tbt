import {IRes} from '@models/types'
import {IUser} from '@models/User'

import UserServices from '@services/UserServices'

import HttpStatusCodes from '@constants/HttpStatusCodes'

async function getAll(res: IRes): Promise<IRes> {
	try {
		const users =  await UserServices.getAll()
		if (!users) {
			return res
				.status(HttpStatusCodes.UNAUTHORIZED)
				.json({error: 'found no users'})
		} else {
			return res.status(HttpStatusCodes.OK).json(users)
		}
	} catch (error: unknown) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
	}

}

async function getOne(res: IRes, id: IUser['id']): Promise<IRes> {
	try {
		const user = await UserServices.findById(id)
		if (!user) {
			return res
				.status(HttpStatusCodes.UNAUTHORIZED)
				.json({error: 'user does not exist'})
		} else {
			return res.status(HttpStatusCodes.OK).json(user)
		}
	} catch (error: unknown) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
	}
}

async function addOne(res: IRes, user: IUser): Promise<IRes> {
	try {
		// TODO move to a legit schema validator middleware
		// early abort : password too short, username too short, funky email ?
		const {email, username, password} = user

		if (password.length < 8) {
			return res
				.status(HttpStatusCodes.FORBIDDEN)
				.json({error: 'password too short'})
		}

		// checks existence
		const exists = await UserServices.checkExistence(username, email)
		// early abort if exists
		if (Array.isArray(exists) && exists.length > 0) {
			return res
				.status(HttpStatusCodes.FORBIDDEN)
				.json({error: 'user already exists'})
		}

		// else tries to create
		const new_user = await UserServices.add(user)
		// creation failed
		if (!new_user) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({error: 'error creating user'})
		} else {
			// creation succeeded
			return res.status(HttpStatusCodes.CREATED).json(new_user)
		}

	} catch (error: unknown) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
	}
}

async function updateOne(res: IRes, user: IUser): Promise<IRes> {
	try {
		const user_id = await UserServices.update(user)
		if (!user_id) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({error: 'error updating user'})
		} else {
			return res.status(HttpStatusCodes.OK).json(user_id)
		}
	} catch (error: unknown) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
	}
}

async function _delete(res: IRes, id: IUser['id']): Promise<IRes> {
	try {
		const user_id = await UserServices.delete(id)
		if (!user_id) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({error: 'error deleting user'})
		} else {
			return res.status(HttpStatusCodes.OK).json(user_id)
		}
	} catch (error: unknown) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
	}
}


export default {
	getAll,
	getOne,
	addOne,
	updateOne,
	delete: _delete,
} as const
