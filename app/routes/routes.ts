import {createValidator} from 'express-joi-validation'
import {Router} from 'express'

import Paths from '@constants/Paths'

import AuthRoutes from './AuthRoutes'
import UserRoutes from './UserRoutes'

import {
	authRegisterValidator,
	authSigninValidator,
	userUpdateValidator,
	uuidValidator,
} from './validators/index'

const apiRouter = Router()
const validator = createValidator()

// auth routes
const authRouter = Router()

authRouter.post(
	Paths.Auth.Register,
	validator.body(authRegisterValidator),
	AuthRoutes.register,
)

authRouter.post(
	Paths.Auth.SignIn,
	validator.body(authSigninValidator),
	AuthRoutes.signin,
)

// authRouter.put(
// 	Paths.Auth.Reset,
// 	AuthRoutes.reset
// )


// Users routes
const userRouter = Router()

userRouter.get(
	Paths.Users.Get,
	UserRoutes.getAll,
)

userRouter.get(
	Paths.Users.GetOne,
	validator.params(uuidValidator.required()),
	UserRoutes.getOne,
)

userRouter.put(
	Paths.Users.Update,
	validator.body(userUpdateValidator), // TODO check it works
	UserRoutes.update,
)

userRouter.delete(
	Paths.Users.Delete,
	validator.params(uuidValidator.required()),
	UserRoutes.delete,
)


// Add each router
apiRouter.use(Paths.Auth.Base, authRouter)
apiRouter.use(Paths.Users.Base, userRouter)


export default apiRouter
