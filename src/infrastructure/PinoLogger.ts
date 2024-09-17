import { injectable } from "inversify";
import type { Logger } from "../application/Logger";
import pino from "pino";

@injectable()
export class PinoLogger implements Logger {
	public infoRequest(request: Logger.Request, message: string): void {
		this._pino.info({ request }, message);
	}

	public errorRequest(
		request: Logger.Request,
		message: string
	): void {
		this._pino.error({ request }, message);
	}

	public info(message: string): void {
		this._pino.info(message);
	}

	public error(message: string): void {
		this._pino.error(message);
	}

	private readonly _pino =
		process.env.NODE_ENV === "development"
			? pino({
					transport: {
						target: "pino-pretty",
						options: {
							colorize: true
						}
					}
			  })
			: pino();
}
