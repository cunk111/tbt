// TODO fix ERR_REQUIRE_ESM
// import bcrypt from 'bcrypt'
// const bcrypt = require('bcrypt')

export const generateHash = (plainPassword: string): string => {
// const salt = bcrypt.genSaltSync(10);

	// return bcrypt.hashSync(plainPassword, salt)
	return plainPassword;
};

export const compare = (password: string, hash: string | undefined) => {
	// return bcrypt.compare(password, <string>hash);
	return password === hash;
};