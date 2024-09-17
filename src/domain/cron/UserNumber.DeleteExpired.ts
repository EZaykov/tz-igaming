import { inject, injectable } from "inversify";
import { types } from "../../di/types";
import type { CronDriver } from "./CronDriver";
import type { UserNumberRepo } from "../UserNumber.Repo";

@injectable()
export class UserNumberDeleteExpired {
	public run(): void {
		this._cron.schedule(
			`*/${Number.parseInt(
				process.env.CRON_INTERVAL_IN_SECONDS
			)} * * * * *`,
			() => {
				this._repo.deleteAllExpired();
			}
		);
	}

	constructor(
		@inject(types.cron.driver) private readonly _cron: CronDriver,
		@inject(types.userNumberRepo)
		private readonly _repo: UserNumberRepo
	) {}
}
