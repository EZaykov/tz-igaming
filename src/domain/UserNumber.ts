export class UserNumber {
	public get id(): number {
		return this._id;
	}

	public get tgId(): number {
		return this._tgId;
	}

	public get value(): string {
		return this._value;
	}

	public isExpired(): boolean {
		return +this._expiresAt >= Date.now();
	}

	constructor(
		private readonly _id: number,
		private readonly _tgId: number,
		private readonly _expiresAt: Date,
		private readonly _value: string
	) {}
}
