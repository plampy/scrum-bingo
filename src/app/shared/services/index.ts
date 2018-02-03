import { BoardService } from './board.service';
import { RoomService } from './room.service';
import { PlayerService } from './player.service';
import { TermsService } from './terms.service';


export const services: any[] = [
	BoardService,
	RoomService,
	PlayerService,
	TermsService
];

export * from './board.service';
export * from './room.service';
export * from './player.service';
export * from './terms.service';
