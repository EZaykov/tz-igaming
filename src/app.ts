import { Container } from "./di/compositionRoot";
import type { Server } from "./application/Server";
import type { UserNumberDeleteExpired } from "./domain/cron/UserNumber.DeleteExpired";
import { types } from "./di/types";

const server = Container.get<Server>(types.server);
const userNumberDeleteExpired =
	Container.get<UserNumberDeleteExpired>(
		types.cron.userNumberDeleteExpired
	);

server.listen({
	port: process.env.PORT,
	...(process.env.NODE_ENV === "production"
		? {
				key: Bun.file("/usr/app/cert/key.pem"),
				cert: Bun.file("/usr/app/cert/cert.pem"),
				passphrase: process.env.TLS_PASSPHRASE
		  }
		: {})
});

userNumberDeleteExpired.run();
