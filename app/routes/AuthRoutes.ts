import AuthController from '@controllers/AuthController'
import {IReq, IRes} from '@models/types'
import {IUser} from '@models/User'

async function register(req: IReq<IUser>, res: IRes) {
	const user = req.body
	await AuthController.register(res, user)
}

async function signin(req: IReq<Partial<IUser>>, res: IRes) {
	const  credentials = req.body
	await AuthController.signin(credentials, res)
}

// async function signout(_: IReq, res: IRes) {
// 	await AuthController.signout()
// 	return res.status(HttpStatusCodes.OK).end()
// }

// async function reset(req: IReq<{password: string, passwordConfirmation: string}>, res: IRes) {
// 	const {password, passwordConfirmation} = req.body;
// 	await AuthController.reset(password, passwordConfirmation);
// 	return res.status(HttpStatusCodes.OK).end();
// }

export default {
	register,
	signin,
	// signout,
	// reset,
} as const
