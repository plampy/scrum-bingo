export interface Player {
	id?: string;
	userId: string;
	boards: {
		[roomId: string]: string
	};
}
