import joi from 'joi'

const uuidValidator = joi.object({
	id: joi.string().guid({version : 'uuidv4'}),
})

const authRegisterValidator = joi.object({
	email: joi.string().email().trim().required(),
	username: joi.string().trim().min(6).max(60).required(),
	password: joi.string().trim().min(8).required(),
})

const authSigninValidator = joi.object({
	email: joi.string().email().trim(),
	username: joi.string().trim().min(6).max(60),
	password: joi.string().trim().min(8).required(),
}).xor('email', 'username') // whether email or username

const userUpdateValidator = joi.object({
	id: joi.string().guid({version : 'uuidv4'}),
	email: joi.string().email().trim(),
	username: joi.string().trim().min(6).max(60),
	password: joi.string().trim().min(8),
})

export {
	authRegisterValidator,
	authSigninValidator,
	userUpdateValidator,
	uuidValidator,
}