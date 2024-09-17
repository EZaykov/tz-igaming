import { injectable } from "inversify";
import { UserNumber } from "../../domain/UserNumber";
import type { UserNumberRepo } from "../../domain/UserNumber.Repo";
import { pg } from "../driver/pg";
import { redis } from "../driver/redis";

const cacheKey = (tgId: number): string =>
	"userNumberCache" + "_" + tgId.toString();

@injectable()
export class UserNumberRepoImpl implements UserNumberRepo {
	public async upsert(userNumber: UserNumber): Promise<void> {
		await Promise.all([
			pg
				.insert({
					value: userNumber.value,
					expires_at: userNumber.expiresAt,
					tg_id: userNumber.tgId
				})
				.onConflict("tg_id")
				.merge()
				.into("usernumber"),
			redis.del(cacheKey(userNumber.tgId))
		]);
	}

	public async findByTgId(tgId: number): Promise<UserNumber | null> {
		const cached = await redis.get(cacheKey(tgId));

		if (cached !== null) {
			return UserNumber.fromString(cached);
		}

		// @ts-expect-error
		const [userNumberRecord]:
			| [{ value: number; tg_id: number; expires_at: string }]
			| [undefined] = await pg
			.select("value", "tg_id", "expires_at")
			.from("usernumber")
			.where("tg_id", tgId)
			.limit(1);

		if (userNumberRecord === undefined) {
			// eslint-disable-next-line @unicorn/no-null
			return null;
		}

		const userNumber = new UserNumber(
			userNumberRecord.tg_id,
			userNumberRecord.expires_at,
			userNumberRecord.value
		);

		await redis.set(cacheKey(tgId), userNumber.toString());

		return userNumber;
	}

	public async deleteAllExpired(): Promise<void> {
		const deleted: { tg_id: number }[] = await pg("usernumber")
			.where("expires_at", "<=", new Date().toISOString())
			.del()
			.returning("tg_id");

		if (deleted.length === 0) {
			return;
		}

		const cacheKeys = deleted.map((record) => cacheKey(record.tg_id));

		await redis.del(cacheKeys);
	}
}
