import type { RedisClientType } from "redis";
import { createClient } from "redis";
import { URL } from "node:url";

const redis_url = new URL(
	`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
);

if (process.env.NODE_ENV === "production") {
	redis_url.username = process.env.REDIS_USER;
	redis_url.password = process.env.REDIS_PASSWORD;
}

// sync client
// fail fast
// autoconnect
class Redis {
	public async get(key: string): Promise<string | null> {
		await this._checkConnect();
		this._checkError();

		return this._client.get(key);
	}

	public async set(
		key: string,
		value: string
	): Promise<string | null> {
		await this._checkConnect();
		this._checkError();

		return this._client.set(key, value);
	}

	public async del(key: string | string[]): Promise<number> {
		await this._checkConnect();
		this._checkError();

		return this._client.del(key);
	}

	constructor() {
		this._client = createClient({
			url: redis_url.href
		});
		this._client.once("error", (error) => {
			this._clientError = error;
		});
	}

	private readonly _client: RedisClientType;
	private _clientError: Error | undefined;

	private async _checkConnect(): Promise<void> {
		if (!this._client.isReady) {
			await this._client.connect();
		}
	}

	private _checkError(): void {
		if (this._clientError) {
			const error = this._clientError;

			this._clientError = undefined;

			throw error;
		}
	}
}

export const redis = new Redis();
