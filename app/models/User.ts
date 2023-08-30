import type {JwtPayload} from 'jsonwebtoken'
export interface IUser {
  id: string;
  username: string;
  email: string;
	password: string;
}

export interface ILoggedUser extends IUser {
	token: JwtPayload | string;
}

// export interface ILoggingUser extends IUser {
// }