import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AuthServices from '@src/services/AuthServices';

import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';

async function register(req: IReq<Omit<IUser, 'id'>>, res: IRes) {
	console.log(req);
	const  { username, email, password } = req.body;
	const user = await AuthServices.register(username, email, password);

	if (!user) {
		return res
			.status(HttpStatusCodes.OK)
			.json({error: 'user already exists'});
	}

	return res.status(HttpStatusCodes.OK).json(user);
}

async function signin(req: IReq<Omit<IUser, 'id' | 'username'>>, res: IRes) {
	const  { email, password } = req.body;
	const user = await AuthServices.signin(email, password);
	return res.status(HttpStatusCodes.OK).json(user);
}

async function signout(_: IReq, res: IRes) {
	await AuthServices.signout();
	return res.status(HttpStatusCodes.OK).end();
}

// async function reset(req: IReq<{password: string, passwordConfirmation: string}>, res: IRes) {
// 	const {password, passwordConfirmation} = req.body;
// 	await AuthServices.reset(password, passwordConfirmation);
// 	return res.status(HttpStatusCodes.OK).end();
// }

export default {
	register,
	signin,
	signout,
	// reset,
} as const;
