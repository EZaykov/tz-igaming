import type { UserNumber } from "./UserNumber";

export interface UserNumberRepo {
	findByTgId(tgId: number): Promise<UserNumber | null>;
	deleteAllExpired(): Promise<void>;
}
