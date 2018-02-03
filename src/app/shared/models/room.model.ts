export interface Room {
	id?: string;
	name: string;
	boards: {
		[boardId: string]: true
	};
	createdBy: string;
}
