import { cron } from "@elysiajs/cron";
import { redis } from "../cache";
import { pg } from "../db";

export const deleteExpired = cron({
	name: "deleteExpired",
	pattern: "*/5 * * * * *",
	async run() {
		const deleted: { tg_id: number }[] = await pg("usernumber")
			.where("expires_at", "<=", new Date().toISOString())
			.del()
			.returning("tg_id");

		if (deleted.length === 0) {
			return;
		}

		const cacheKeys = deleted.map(
			(record) => "userNumber" + "_" + record.tg_id
		);

		await redis.del(cacheKeys);
	}
});
