export interface Player {
	id?: string;
	userId: string;
	displayName?: string;
	isAnonymous?: boolean;
	boards: {
		[roomId: string]: string
	};
}
