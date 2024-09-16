import { knex } from "knex";

export const pg = knex({
	client: "pg",
	connection: {
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		host: process.env.PG_HOST,
		port: Number.parseInt(process.env.PG_PORT),
		database: process.env.PG_DATABASE
	}
});
