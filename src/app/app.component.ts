import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoomService } from './shared/room.service';
import { Room } from './shared/models/room.model';

@Component({
	selector: 'bingo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	public rooms$: Observable<Room[]>;
	constructor(private roomSvc: RoomService) { }

	ngOnInit() {
		this.rooms$ = this.roomSvc.getRooms();
	}
}
