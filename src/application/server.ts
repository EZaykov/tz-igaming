import { Elysia } from "elysia";
import { miniApp } from "./miniApp";
import { restV1 } from "./restV1";
import { swagger } from "@elysiajs/swagger";
import { logger } from "@bogeychan/elysia-logger";
import { deleteExpired } from "./deleteExpired.cron";

export const server = new Elysia()
	.use(miniApp)
	.use(swagger({ autoDarkMode: true }))
	.use(deleteExpired)
	.use(
		process.env.NODE_ENV === "development"
			? logger({
					transport: {
						target: "pino-pretty",
						options: {
							colorize: true
						}
					}
			  })
			: logger()
	)
	.use(restV1);
