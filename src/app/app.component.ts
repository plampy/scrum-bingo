import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RoomService } from './shared/room.service';
import { Room } from './shared/models/room.model';
import { CreateRoomDialogComponent } from './shared/components/create-room-dialog/create-room-dialog.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
	selector: 'bingo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	public rooms$: Observable<Room[]>;

	constructor(
		private roomSvc: RoomService,
		private router: Router,
		public createRoomDialog: MatDialog) { }

	ngOnInit() {
		this.rooms$ = this.roomSvc.getRooms();
	}

	showCreateDialog() {
		this.createRoomDialog.open(CreateRoomDialogComponent)
			.afterClosed().pipe(
			filter(name => !!name),
			switchMap(name => this.roomSvc.createRoom(name))
			).subscribe(room => this.router.navigate([room.id, 'board']));
	}
}
