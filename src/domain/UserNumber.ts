export class UserNumber {
	public static fromString(str: string): UserNumber {
		const parsed = JSON.parse(str);

		return new UserNumber(
			parsed._tgId,
			parsed._expiresAt,
			parsed._value
		);
	}

	public get tgId(): number {
		return this._tgId;
	}

	public get expiresAt(): string {
		return this._expiresAt;
	}

	public get value(): number {
		return this._value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	constructor(
		private readonly _tgId: number,
		private readonly _expiresAt: string,
		private readonly _value: number
	) {}
}

export namespace UserNumber {
	export class Record extends UserNumber {
		public get id(): number {
			return this._id;
		}

		constructor(
			private readonly _id: number,
			tgId: number,
			expiresAt: string,
			value: number
		) {
			super(tgId, expiresAt, value);
		}
	}
}
