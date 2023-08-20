import { Immutable } from '@src/other/types';

const Paths = {
	Base: '/api',
	Auth: {
		Base: '/auth',
		Register: '/register',
		SignIn: '/signin',
		SignOut: '/signout',
		Reset: '/password',
	},
	Comments: {
		Base: '/comments',
		Get: '/all',
		GetOne: '/:id',
		Add: '/add',
		Update: '/update',
		Delete: '/delete/:id',
	},
	Posts: {
		Base: '/posts',
		Get: '/all',
		GetOne: '/:id',
		Comments: '/:id/comments',
		Thread: '/:id/thread',
		Add: '/add',
		Update: '/update',
		Delete: '/delete/:id',
	},
	Users: {
		Base: '/users',
		Get: '/all',
		GetOne: '/:id',
		Comments: '/:id/comments',
		Posts: '/:id/posts',
		Add: '/add',
		Update: '/update',
		Delete: '/delete/:id',
	},
};

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
