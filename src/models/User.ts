export interface IUser {
  id: number;
  name: string;
  email: string;
}

function isUser(arg: unknown): boolean {
	return (
		!!arg &&
		typeof arg === 'object' &&
		'email' in arg &&
		'name' in arg
	);
}

export default {
	isUser,
} as const;
