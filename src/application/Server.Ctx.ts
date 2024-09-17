import { injectable, inject } from "inversify";
import { Elysia } from "elysia";
import { types } from "../di/types";
import type { Logger } from "./Logger";
import type { UserNumberRepo } from "../domain/UserNumber.Repo";

@injectable()
export class ServerCtx {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
	public get plugin() {
		return this._plugin;
	}

	constructor(
		@inject(types.logger) logger: Logger,
		@inject(types.userNumberRepo)
		userNumberRepo: UserNumberRepo
	) {
		this._plugin = new Elysia({
			name: "server-ctx"
		})
			.decorate("logger", logger)
			.decorate("userNumberRepo", userNumberRepo);
	}

	private readonly _plugin: Elysia<
		"",
		false,
		{
			decorator: {
				logger: Logger;
				userNumberRepo: UserNumberRepo;
			};
			derive: {};
			resolve: {};
			store: {};
		}
	>;
}
