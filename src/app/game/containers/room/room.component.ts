import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Room } from '../../../shared/models/room.model';
import { RoomService } from '../../../shared/room.service';
import { BoardService } from '../../../shared/board.service';
import { Board } from '../../../shared/models/board.model';
import { take, throttleTime } from 'rxjs/operators';

@Component({
	selector: 'bingo-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
	public rooms$: Observable<Room[]>;

	constructor(
		private roomSvc: RoomService,
		public boardSvc: BoardService,
		private router: Router) { }

	ngOnInit() {
		this.rooms$ = this.roomSvc.getRooms();
	}

	createRoom(name: string) {
		this.roomSvc.createRoom(name).subscribe(this.selectRoom);
	}

	selectRoom(room: Room) {
		// todo: hook this to user/store
		const roomJson = JSON.stringify(room);
		localStorage.setItem('room', roomJson);

		return this.router.navigate(['/board']);
	}
}
