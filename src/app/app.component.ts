import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { filter, switchMap, take } from 'rxjs/operators';

import { RoomService, PlayerService } from './shared/services';
import { Room, Player } from './shared/models';
import { routeAnimation } from './shared/animations';
import { CreateRoomDialogComponent } from './shared/components/create-room-dialog/create-room-dialog.component';
import { AppService } from './services/app.service';


@Component({
	selector: 'bingo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	animations: [routeAnimation]
})
export class AppComponent implements OnInit {
	public rooms$: Observable<Room[]>;
	public player$: Observable<Player>;
	@ViewChild(MatSidenav) nav: MatSidenav;

	constructor(
		private roomSvc: RoomService,
		private router: Router,
		private appSvc: AppService,
		private playerSvc: PlayerService,
		public createRoomDialog: MatDialog) { }

	ngOnInit() {
		this.player$ = this.playerSvc.player$;
		this.rooms$ = this.roomSvc.getRooms();
		this.appSvc.navDrawerOpen$.subscribe(() => {
			this.nav.open();
		});
	}

	showCreateDialog() {
		this.createRoomDialog.open(CreateRoomDialogComponent)
			.afterClosed().pipe(
			filter(name => !!name),
			switchMap((name: string) =>
				this.playerSvc.player$.pipe(
					take(1),
					switchMap(player => this.roomSvc.createRoom(name, player))
				))
			).subscribe(room => this.router.navigate([room.id, 'board']));
	}

	googleLogin() {
		this.playerSvc.linkWithGoogleAccount().subscribe(
			res => console.log('linked')
		);
	}

	logout() {
		this.playerSvc.logout().subscribe(
			res => this.router.navigate([])
		);
	}
}
