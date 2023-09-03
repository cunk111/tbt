declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;

			// global
			NODE_ENV: 'production' | 'development' | 'test';
			PORT: number;
			HOST: string;

			// jet logger
			JET_LOGGER_MODE: string;
			JET_LOGGER_FILEPATH: string;
			JET_LOGGER_TIMESTAMP: boolean
			JET_LOGGER_FORMAT: string;

			// jwt
			COOKIE_DOMAIN: string;
			COOKIE_PATH: string;
			SECURE_COOKIE: boolean
			JWT_SECRET: string;
			COOKIE_SECRET: string;
			COOKIE_EXP: number

			// postgres
			PG_DB: string;
			PG_HOST: string;
			PG_PORT: number;
			PG_USER: string;
			PG_PASSWORD: string;
		}
	}
}

export {}