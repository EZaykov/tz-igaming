declare module "bun" {
	interface Env {
		HOST: string;
		PORT: string;
		NODE_ENV: "development" | "production";
		JWT_SECRET: string;
		PG_USER: string;
		PG_PASSWORD: string;
		PG_PORT: string;
		PG_HOST: string;
		PG_DATABASE: string;
		REDIS_HOST: string;
		REDIS_PORT: string;
		REDIS_USER: string;
		REDIS_PASSWORD: string;
		TLS_PASSPHRASE: string;
		CRON_TTL_IN_SECONDS: string;
		CRON_INTERVAL_IN_SECONDS: string;
	}
}
