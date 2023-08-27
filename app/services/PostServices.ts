import { IComment } from '@models/Comment'
import { IPost } from '@models/Post'

import { getRandomInt } from '@utils/misc'

import orm from '../infrastructure/MockOrm'

async function getOne(id: IPost['id']): Promise<IPost | null> {
	const db = await orm.openDb()
	for (const post of db.posts) {
		if (post.id === id) {
			return post
		}
	}
	return null
}

async function getPostComments(id: IComment['parent']): Promise<IComment[] | null> {
	const db = await orm.openDb()

	return db.comments.filter(comment => comment.parent === id) || null
}

async function getUserPosts(id: IPost['owner']): Promise<IPost[] | null> {
	const db = await orm.openDb()

	return db.posts.filter(post => post.owner === id) || null
}

async function persists(id: number): Promise<boolean> {
	const db = await orm.openDb()
	for (const post of db.posts) {
		if (post.id === id) {
			return true
		}
	}
	return false
}

async function getAll(): Promise<IPost[]> {
	const db = await orm.openDb()
	return db.posts
}

async function add(post: IPost): Promise<void> {
	const db = await orm.openDb()
	post.id = getRandomInt()
	post.date = Date.now()
	db.posts.push(post)
	return orm.saveDb(db)
}

async function update(post: IPost): Promise<void> {
	const db = await orm.openDb()
	for (let i = 0; i < db.posts.length; i++) {
		if (db.posts[i].id === post.id) {
			db.posts[i] = post
			return orm.saveDb(db)
		}
	}
}

async function delete_(id: number): Promise<void> {
	const db = await orm.openDb()
	for (let i = 0; i < db.posts.length; i++) {
		if (db.posts[i].id === id) {
			db.posts.splice(i, 1)
			return orm.saveDb(db)
		}
	}
}

export default {
	getAll,
	getOne,
	getPostComments,
	getUserPosts,
	persists,
	add,
	update,
	delete: delete_,
} as const
