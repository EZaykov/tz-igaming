import { server } from "./application/server";
import { pg } from "./db";

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
