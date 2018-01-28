import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Room } from '../../../shared/models/room.model';
import { RoomService } from '../../../shared/room.service';

@Component({
	selector: 'bingo-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
	public rooms$: Observable<Room[]>;

	constructor(
		private roomSvc: RoomService,
		private router: Router) { }

	ngOnInit() {
		this.rooms$ = this.roomSvc.getRooms();
	}

	createRoom(name: string) {
		this.roomSvc.createRoom(name)
			.subscribe(newRoom => this.selectRoom(newRoom));
	}

	selectRoom(room: Room) {
		this.router.navigate([room.id, 'board']);
	}
}
