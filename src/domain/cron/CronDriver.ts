export interface CronDriver {
	schedule(pattern: string, callback: () => void): void;
}
