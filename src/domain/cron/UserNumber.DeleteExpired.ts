import type { CronDriver } from "./CronDriver";
import type { UserNumberRepo } from "../UserNumber.Repo";

export class UserNumberDeleteExpired {
	public run(): void {
		this._cron.schedule("*/5 * * * * *", () =>
			this._repo.deleteAllExpired()
		);
	}

	constructor(
		private readonly _cron: CronDriver,
		private readonly _repo: UserNumberRepo
	) {}
}
