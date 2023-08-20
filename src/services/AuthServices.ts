import {IUser} from '@src/models/User';
import AuthRepo from '@src/repos/AuthRepo';
import {RouteError} from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const USER_NOT_FOUND_ERR = 'user not found';


function register(username: IUser['username'], email: IUser['email'], password: IUser['password']): Promise<IUser | undefined> {
	return AuthRepo.register(username, email, password);
}

function signin(email: IUser['email'], password: IUser['password']): Promise<IUser | undefined> {
	return AuthRepo.signin(email, password);
}

// function signout(post: IUser): Promise<void> {
// 	return AuthRepo.signout(post);
// }

// async function password(post: IUser): Promise<void> {
// 	const persists = await AuthRepo.persists(post.id);
// 	if (!persists) {
// 		throw new RouteError(
// 			HttpStatusCodes.NOT_FOUND,
// 			USER_NOT_FOUND_ERR,
// 		);
// 	}
// 	return AuthRepo.password(post);
// }

export default {
	register,
	signin,
	// signout,
	// password,
} as const;