import jwt from 'jsonwebtoken'

import {hashPassword, matchPassword} from '@utils/encryption'
import {ILoggedUser, IUser} from '@models/User'
import UserRepo from '../services/UserServices' // TODO why doesn'it support @services alias ?


// import {RouteError} from '@app/other/classes';
// import HttpStatusCodes from '@app/constants/HttpStatusCodes';

// export const USER_NOT_FOUND_ERR = 'user not found';


async function register(
	username: IUser['username'],
	email: IUser['email'],
	password: IUser['password'],
): Promise<ILoggedUser | undefined> {
	const newUser = await UserRepo.register(username, email, hashPassword(password))

	if (newUser) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
		const token = jwt.sign({
			id: newUser.id.toString(),
			name: newUser.username,
		}, 'SECRET_KEY')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {...newUser, token} as ILoggedUser
	}
	return newUser
}

async function signin(
	email: IUser['email'],
	password: IUser['password'],
): Promise<ILoggedUser | undefined> {
	const potentialUser= await UserRepo.getOneByMail(email)

	if (potentialUser) {
		const matchFound= matchPassword(password, potentialUser.password)
		if (matchFound) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
			const token = jwt.sign({
				id: potentialUser.id.toString(),
				name: potentialUser.username,
			}, 'SECRET_KEY')

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			return {...potentialUser, token} as ILoggedUser
		}
		return undefined
	}
}
function signout(): Promise<void> {
	return UserRepo.signout()
}

// async function password(post: IUser): Promise<void> {
// 	const persists = await UserRepo.persists(post.id);
// 	if (!persists) {
// 		throw new RouteError(
// 			HttpStatusCodes.NOT_FOUND,
// 			USER_NOT_FOUND_ERR,
// 		);
// 	}
// 	return UserRepo.password(post);
// }

export default {
	register,
	signin,
	signout,
	// password,
} as const