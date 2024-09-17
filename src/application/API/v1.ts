import { inject, injectable } from "inversify";
import { jwt } from "@elysiajs/jwt";
import type { Logger } from "../Logger";
import type { UserNumberRepo } from "../../domain/UserNumber.Repo";
import { types } from "../../di/types";
import type { ServerCtx } from "../Server.Ctx";
import { Elysia, t } from "elysia";
import qs from "node:querystring";
import type {
	TgInitDataParsed,
	TgUserParsed
} from "../external/Telegram.DTO";
import { UserNumber } from "../../domain/UserNumber";

@injectable()
export class V1 {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
	public get plugin() {
		return this._plugin;
	}

	constructor(
		@inject(types.serverCtx) private readonly _serverCtx: ServerCtx
	) {
		this._plugin = new Elysia({ prefix: "/v1" })
			.use(this._serverCtx.plugin)
			.use(jwt({ secret: process.env.JWT_SECRET }))
			.post(
				"/tg-login",
				async (ctx) => {
					const tgInitDataParsed = qs.parse(
						ctx.body.tg_init_data
					) as unknown as TgInitDataParsed;
					const tgUserParsed: TgUserParsed = JSON.parse(
						tgInitDataParsed.user
					);
					const token = await ctx.jwt.sign({
						tg_id: tgUserParsed.id,
						tg_username: tgUserParsed.username
					});
					const { auth } = ctx.cookie;

					auth.set({
						value: token,
						httpOnly: true,
						maxAge: 7 * 86400,
						path: "/v1"
					});

					return { access_token: token };
				},
				{
					body: t.Object({
						tg_init_data: t.String()
					}),
					response: t.Object({
						access_token: t.String()
					})
				}
			)
			.guard(
				{
					beforeHandle: async (ctx) => {
						const { auth } = ctx.cookie;
						const profile = await ctx.jwt.verify(auth.value);

						if (profile === false) {
							ctx.set.status = 401;

							return "Unauthorized";
						}
					}
				},
				(app) => {
					return app
						.resolve(async (ctx) => {
							const { auth } = ctx.cookie;
							const tgUserData = (await ctx.jwt.verify(
								auth.value
							)) as {
								tg_id: number;
								tg_username: string;
							};

							return {
								tgUserData
							};
						})
						.get(
							"/me",
							async (ctx) => {
								return {
									tg_username: ctx.tgUserData.tg_username,
									tg_id: ctx.tgUserData.tg_id
								};
							},
							{
								response: t.Object({
									tg_username: t.String(),
									tg_id: t.Number()
								})
							}
						)
						.post(
							"/endpoint",
							async (ctx) => {
								const { value, expires_at } = ctx.body;

								try {
									await ctx.userNumberRepo.upsert(
										new UserNumber(
											ctx.tgUserData.tg_id,
											expires_at,
											value
										)
									);
								} catch (e) {
									console.log(e);
								}

								console.log("PUKE!");

								return { success: true };
							},
							{
								body: t.Object({
									value: t.Number(),
									expires_at: t.String({
										format: "date-time"
									})
								})
							}
						)
						.get(
							"/endpoint",
							async (ctx) => {
								const { tg_id } = ctx.tgUserData;
								const found = await ctx.userNumberRepo.findByTgId(
									tg_id
								);

								return {
									// eslint-disable-next-line @unicorn/no-null
									value: found?.value ?? null
								};
							},
							{
								response: t.Object({
									value: t.Union([t.Number(), t.Null()])
								})
							}
						);
				}
			);
	}

	private readonly _plugin: Elysia<
		"/v1",
		false,
		{
			decorator: {
				logger: Logger;
				userNumberRepo: UserNumberRepo;
				jwt: ReturnType<typeof jwt>;
			};
			derive: {};
			resolve: {};
			store: {};
		}
	>;
}
