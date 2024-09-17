export interface Logger {
	info(message: string): void;
	error(message: string): void;
	infoRequest(req: Logger.Request, message: string): void;
	errorRequest(req: Logger.Request, message: string): void;
}

export namespace Logger {
	export type Request = {
		method: string;
		url: string;
		referer: string;
	};
}
