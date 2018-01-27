import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Room } from '../../../shared/models/room.model';
import { RoomService } from '../../../shared/room.service';
import { BoardService } from '../../../shared/board.service';
import { Board } from '../../../shared/models/board.model';
import { take, throttleTime } from 'rxjs/operators';
import { Player } from '../../../shared/models/player.model';
import { PlayerService } from '../../../shared/player.service';

@Component({
	selector: 'bingo-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
	public rooms$: Observable<Room[]>;
	public player$: Observable<Player>;

	constructor(
		private roomSvc: RoomService,
		public boardSvc: BoardService,
		private playerSvc: PlayerService,
		private router: Router) { }

	ngOnInit() {
		this.rooms$ = this.roomSvc.getRooms();
		this.player$ = this.playerSvc.player$;
	}

	createRoom(name: string) {
		this.roomSvc.createRoom(name)
			.subscribe(newRoom => this.selectRoom(newRoom));
	}

	selectRoom(room: Room) {
		this.router.navigate([room.id, 'board']);
	}
}
