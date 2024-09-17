import { injectable } from "inversify";
import nodeCron from "node-cron";
import type { CronDriver } from "../../domain/cron/CronDriver";

@injectable()
export class NodeCron implements CronDriver {
	public schedule(pattern: string, callback: () => void): void {
		nodeCron.schedule(pattern, callback);
	}
}
