import "reflect-metadata";
import { Container as _Container } from "inversify";
import { types } from "./types";
import { ServerCtx } from "../application/Server.Ctx";
import { Server } from "../application/Server";
import { V1 } from "../application/API/v1";
import { UserNumberRepoImpl } from "../infrastructure/repo/UserNumber.Repo.impl";
import { PinoLogger } from "../infrastructure/PinoLogger";
import { NodeCron } from "../infrastructure/driver/NodeCron";
import { UserNumberDeleteExpired } from "../domain/cron/UserNumber.DeleteExpired";

const Container = new _Container();

Container.bind(types.logger).to(PinoLogger).inSingletonScope();
Container.bind(types.userNumberRepo)
	.to(UserNumberRepoImpl)
	.inSingletonScope();
Container.bind(types.serverCtx).to(ServerCtx).inSingletonScope();
Container.bind(types.v1).to(V1).inSingletonScope();
Container.bind(types.server).to(Server);
Container.bind(types.cron.driver).to(NodeCron).inSingletonScope();
Container.bind(types.cron.userNumberDeleteExpired)
	.to(UserNumberDeleteExpired)
	.inSingletonScope();

export { Container };
