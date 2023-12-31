import jwt from 'jsonwebtoken'

import HttpStatusCodes from '@constants/HttpStatusCodes'

import {IUser} from '@models/User'
import {IRes} from '@models/types'

import AuthServices from '@services/AuthServices'
import UserServices from '@services/UserServices'
import {matchPassword} from '@utils/encryption'

async function register(res: IRes, user: IUser): Promise<IRes> {
	try {
		// early abort : password too short, username too short, funky email ?
		const {email, username} = user

		// checks existence
		const exists = await AuthServices.checkExistence(username, email)
		// early abort if already exists
		if (Array.isArray(exists) && exists.length > 0) {
			return res
				.status(HttpStatusCodes.FORBIDDEN)
				.json({error: 'user already exists'})
		}

		// else tries to create
		const new_user = await AuthServices
			.register(user)
			.then(user_array => user_array.pop())

		if (!new_user) {
		// creation failed
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({error: 'error creating user'})
		} else {
			// creation succeeded
			const secret = process.env.JWT_SECRET || 'will you fuck off' // TODO
			const token = jwt.sign(
				{id: user.id, name: user.username},
				secret,
				{expiresIn: process.env.COOKIE_EXP})

			res.cookie('jwt', token, {
				httpOnly: true,
				maxAge: 259200000 * 1000, // TODO process.env.COOKIE_EXP
			})


			return res
				.status(HttpStatusCodes.CREATED)
				.json({ // DBUser to IUser
					id: new_user.u_id,
					email: new_user.email,
					username: new_user.u_username,
					token: token,
				})
		}

	} catch (error: unknown) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
	}
}

async function signin(credentials: Partial<IUser>, res: IRes) {
	try {
		const {email, username, password} = credentials

		// early abort if credentials are missing
		if ((!email && !username) || !password) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({error: 'missing credentials, looser'})
		}

		let user
		if (email) {
			user = await UserServices.findByMail(email)
		} else if (username) {
			user = await UserServices.findByUsername(username)
		}

		if (user) {
			const matchFound = matchPassword(password, user.password)
			if (matchFound) {
				const secret = process.env.JWT_SECRET || 'will you fuck off' // TODO
				const token = jwt.sign(
					{id: user.id, name: user.username},
					secret,
					{expiresIn: process.env.COOKIE_EXP})

				res.cookie('jwt', token, {
					httpOnly: true,
					maxAge: 259200000 * 1000, // TODO process.env.COOKIE_EXP
				})

				return res.status(HttpStatusCodes.OK).json({...user, token})
			}
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({error: 'wrong password'})
		}

		return res
			.status(HttpStatusCodes.BAD_REQUEST)
			.json({error: 'user not found'})
	} catch (error) {
		return res
			.status(HttpStatusCodes.BAD_REQUEST)
			.json({error: 'signin went wrong'})
	}
}


// async function password(post: IUser): Promise<void> {
// 	const persists = await UserServices.persists(post.id);
// 	if (!persists) {
// 		throw new RouteError(
// 			HttpStatusCodes.NOT_FOUND,
// 			USER_NOT_FOUND_ERR,
// 		);
// 	}
// 	return UserServices.password(post);
// }

export default {
	register,
	signin,
	// password,
} as const