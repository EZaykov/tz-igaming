import { injectable, inject } from "inversify";
import { types } from "../di/types";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { miniApp } from "./UI/miniApp";
import type { V1 } from "./API/v1";
import type { Logger } from "./Logger";

@injectable()
export class Server {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
	public listen(params: Parameters<Elysia["listen"]>[0]) {
		return this._server.listen(params, () => {
			this._logger.info(
				`Server listening on port ${process.env.PORT}`
			);
		});
	}

	constructor(
		@inject(types.logger) private readonly _logger: Logger,
		@inject(types.v1) private readonly _v1: V1
	) {
		this._server = new Elysia()
			.onError((ctx) => {
				this._logger.errorRequest(
					{
						method: ctx.request.method,
						url: ctx.request.url,
						referer: ctx.request.headers.get("referer")!
					},
					ctx.error.message
				);
			})
			.onAfterResponse((ctx) => {
				this._logger.infoRequest(
					{
						method: ctx.request.method,
						url: ctx.request.url,
						referer: ctx.request.headers.get("referer")!
					},
					""
				);
			})
			.use(swagger({ autoDarkMode: true }))
			.use(miniApp)
			.use(this._v1.plugin) as any;
	}

	private readonly _server: Elysia;
}
