import { Immutable } from '@models/types'

const Paths = {
	Base: '/api',
	Auth: {
		Base: '/auth',
		Register: '/register',
		SignIn: '/signin',
		SignOut: '/signout',
		Reset: '/password',
	},
	Users: {
		Base: '/users',
		Get: '/all',
		GetOne: '/:id',
		Comments: '/:id/comments',
		Posts: '/:id/posts',
		Update: '/update',
		Delete: '/delete/:id',
	},
}

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths
