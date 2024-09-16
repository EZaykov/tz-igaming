import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import qs from "node:querystring";
import { pg } from "../db";
import { redis } from "../cache";

export const restV1 = new Elysia({ prefix: "/v1" })
	.use(jwt({ secret: process.env.JWT_SECRET }))
	.post(
		"/tg-login",
		async (ctx) => {
			const tgInitDataParsed = qs.parse(
				ctx.body.tg_init_data
			) as unknown as {
				user: string;
				chat_instance: string;
				chat_type: string;
				auth_date: string;
				hash: string;
			};
			const tgUserParsed: {
				id: number;
				first_name: string;
				last_name: string;
				username: string;
				language_code: string;
				allows_write_to_pm: boolean;
			} = JSON.parse(tgInitDataParsed.user);
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
					const tgUserData = (await ctx.jwt.verify(auth.value)) as {
						tg_id: number;
						tg_username: string;
					};
					const cacheKeys = {
						userNumber: "userNumber" + "_" + tgUserData.tg_id
					};

					return {
						tgUserData,
						cacheKeys
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

						await Promise.all([
							pg
								.insert({
									value,
									expires_at,
									tg_id: ctx.tgUserData.tg_id
								})
								.onConflict("tg_id")
								.merge()
								.into("usernumber"),
							redis.del(ctx.cacheKeys.userNumber)
						]);

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
						const cached = await redis.get(ctx.cacheKeys.userNumber);

						if (cached !== null) {
							return {
								isFromCache: true,
								value: Number.parseInt(cached)
							};
						}

						// @ts-expect-error
						const [userNumber]: [{ value: number }] | [undefined] =
							await pg
								.select("value")
								.from("usernumber")
								.where("tg_id", tg_id)
								.limit(1);

						if (userNumber !== undefined) {
							await redis.set(
								ctx.cacheKeys.userNumber,
								userNumber.value.toString()
							);
						}

						return {
							isFromCache: false,
							// eslint-disable-next-line @unicorn/no-null
							value: userNumber?.value ?? null
						};
					},
					{
						response: t.Object({
							value: t.Union([t.Number(), t.Null()]),
							isFromCache: t.Boolean()
						})
					}
				);
		}
	);
