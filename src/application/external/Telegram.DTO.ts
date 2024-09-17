export type TgInitDataParsed = {
	user: string;
	chat_instance: string;
	chat_type: string;
	auth_date: string;
	hash: string;
};

export type TgUserParsed = {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	language_code: string;
	allows_write_to_pm: boolean;
};
