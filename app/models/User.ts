import type {JwtPayload} from 'jsonwebtoken'
export interface IUser {
  id: string;
  username: string;
  email: string;
	password: string;
}

export interface DBUser {
	u_id: string;
	u_username: string;
	u_password: string;
	email: string;
}

export interface ILoggedUser extends IUser {
	token: JwtPayload | string;
}