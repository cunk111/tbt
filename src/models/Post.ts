export interface IPost {
	id: number;
	date: number;
	details: string;
	owner: number;
	title: string;
}

// function isPost(arg: unknown): boolean {
// 	return (
// 		!!arg &&
// 			typeof arg === 'object' &&
// 			'details' in arg &&
// 			'owner' in arg &&
// 			'title' in arg
// 	);
// }

// export default {
// 	isPost,
// } as const;
