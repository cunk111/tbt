import {IUser} from '@models/User'
import {pg} from '@infrastructure/database'
import {hashPassword} from '@utils/encryption'

async function checkExistence(name: IUser['username'], email: IUser['email']) {
	try {
		return pg
			.select<IUser>('u_id')
			.from('user_account')
			.where({u_username: name})
			.orWhere({email: email})
			.then(exists => exists)
	} catch (error) {
		return null
	}
}

async function register(user: IUser) {
	try {
		return pg
			.insert<IUser>({
				u_username: user.username,
				u_password: hashPassword(user.password),
				email: user.email,
			})
			.into('user_account')
			.returning(['u_id', 'email', 'u_username'])
	} catch (error) {
		return null
	}
}

export default {
	checkExistence,
	register,
} as const