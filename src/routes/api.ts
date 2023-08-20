import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';

import AuthRoutes from './AuthRoutes';
import CommentRoutes from './CommentRoutes';
import UserRoutes from './UserRoutes';
import PostRoutes from './PostRoutes';



const apiRouter = Router(),
	validate = jetValidator();

// auth routes
const authRouter = Router();

// 	register: (username: string, email: string, password: string) => Promise<UserModel>;
authRouter.post(
	Paths.Auth.Register,
	AuthRoutes.register,
)
// 	login: (email: string, password: string) => Promise<UserModel>;
authRouter.post(
	Paths.Auth.SignIn, // '/api/signin',
	AuthRoutes.signin,
)

// 	logout: () => Promise<void>;
// authRouter.delete(
// 	Paths.Auth.SignOut,
// 	AuthRoutes.signout,
// )

// 	resetPassword: (password: string, passwordConfirmation: string, headers: string) => Promise<void>;
// authRouter.put(
// 	Paths.Auth.Reset,
// 	AuthRoutes.reset
// )


// Comments routes
const commentRouter = Router();

commentRouter.get(
	Paths.Comments.Get,
	CommentRoutes.getAll,
);

commentRouter.get(
	Paths.Comments.GetOne,
	validate(['id', 'number', 'params']),
	CommentRoutes.getOne,
);

commentRouter.post(
	Paths.Comments.Add,
	// validate(['comment', Comment.isComment]),
	CommentRoutes.add,
);

commentRouter.put(
	Paths.Comments.Update,
	// validate(['comment', Comment.isComment]),
	CommentRoutes.update,
);

commentRouter.delete(
	Paths.Comments.Delete,
	validate(['id', 'number', 'params']),
	CommentRoutes.delete,
);


// Posts routes
const postRouter = Router();

postRouter.get(
	Paths.Posts.Get,
	PostRoutes.getAll,
);

postRouter.get(
	Paths.Posts.GetOne,
	validate(['id', 'number', 'params']),
	PostRoutes.getOne,
);

postRouter.get(
	Paths.Posts.Comments,
	PostRoutes.getPostComments,
);

postRouter.get(
	Paths.Posts.Thread,
	PostRoutes.getThread,
);

postRouter.post(
	Paths.Posts.Add,
	// validate(['post', Post.isPost]),
	PostRoutes.add,
);

postRouter.put(
	Paths.Posts.Update,
	// validate(['post', Post.isPost]),
	PostRoutes.update,
);

postRouter.delete(
	Paths.Posts.Delete,
	validate(['id', 'number', 'params']),
	PostRoutes.delete,
);


// Users routes
const userRouter = Router();

userRouter.get(
	Paths.Users.Get,
	UserRoutes.getAll,
);

userRouter.get(
	Paths.Users.GetOne,
	validate(['id', 'number', 'params']),
	UserRoutes.getOne,
);

userRouter.get( // useless
	Paths.Users.Comments,
	UserRoutes.getUserComments,
);

userRouter.get(
	Paths.Users.Posts,
	UserRoutes.getUserPosts,
);

userRouter.post(
	Paths.Users.Add,
	// validate(['user', User.isUser]),
	UserRoutes.add,
);

userRouter.put(
	Paths.Users.Update,
	// validate(['user', User.isUser]),
	UserRoutes.update,
);

userRouter.delete(
	Paths.Users.Delete,
	validate(['id', 'number', 'params']),
	UserRoutes.delete,
);


// Add each router
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.Comments.Base, commentRouter);
apiRouter.use(Paths.Posts.Base, postRouter);
apiRouter.use(Paths.Users.Base, userRouter);


export default apiRouter;
