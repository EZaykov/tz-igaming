import type { UserNumber } from "./UserNumber";

export interface UserNumberRepo {
	upsert(userNumber: UserNumber): Promise<void>;
	findByTgId(tgId: number): Promise<UserNumber | null>;
	deleteAllExpired(): Promise<void>;
}
