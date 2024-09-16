import { server } from "./application/server";
import { pg } from "./db";

server.listen({
	port: 3500,
	...(process.env.NODE_ENV === "production"
		? {
				key: Bun.file("./cert/key.pem"),
				cert: Bun.file("./cert/cert.pem"),
				passphrase: "zx18346zx"
		  }
		: {})
});
