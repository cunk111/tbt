export interface IComment {
	id: number;
	content: string;
	date: number;
	owner: number;
	parent: number;
}

function isComment(arg: unknown): boolean {
	return (
		!!arg &&
			typeof arg === 'object' &&
			'content' in arg &&
			'owner' in arg &&
			'parent' in arg
	);
}

export default {
	isComment,
} as const;
