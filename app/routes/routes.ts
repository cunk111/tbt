import { Router } from 'express'
import jetValidator from 'jet-validator'

import Paths from '@constants/Paths'

import AuthRoutes from './AuthRoutes'
import UserRoutes from './UserRoutes'

const apiRouter = Router(),
	validate = jetValidator()


// auth routes
const authRouter = Router()

authRouter.post(
	Paths.Auth.Register,
	AuthRoutes.register,
)

authRouter.post(
	Paths.Auth.SignIn,
	AuthRoutes.signin,
)

authRouter.delete(
	Paths.Auth.SignOut,
	AuthRoutes.signout,
)

// 	resetPassword: (
// 	  password: string,
// 	  passwordConfirmation: string,
// 	  headers: string,
// 	) => Promise<void>;
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
	validate(['id', 'string', 'params']),
	UserRoutes.getOne,
)

userRouter.post(
	Paths.Users.Add,
	// validate(['user', User.isUser]),
	UserRoutes.add,
)

userRouter.put(
	Paths.Users.Update,
	// validate(['user', User.isUser]),
	UserRoutes.update,
)

userRouter.delete(
	Paths.Users.Delete,
	validate(['id', 'string', 'params']),
	UserRoutes.delete,
)


// Add each router
apiRouter.use(Paths.Auth.Base, authRouter)
apiRouter.use(Paths.Users.Base, userRouter)


export default apiRouter
