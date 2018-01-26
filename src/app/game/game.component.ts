import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '../shared/models/board.model';
import { BoardService } from '../shared/board.service';
import { mergeMap, tap, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Room } from '../shared/models/room.model';
import { RoomService } from '../shared/room.service';
import { combineLatest } from 'rxjs/operators/combineLatest';

@Component({
	selector: 'bingo-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
	public board$: Observable<Board>;
	public competitorBoards$: Observable<Board[]>;

	constructor(
		public boardSvc: BoardService,
		public roomSvc: RoomService,
		private router: Router) { }

	ngOnInit() {
		const roomJson = localStorage.getItem('room');
		if (!roomJson) {
			this.router.navigate(['/rooms']);
		}
		const room = <Room>JSON.parse(roomJson);

		const boardId = localStorage.getItem('boardId');
		if (!boardId) {
			this.board$ = this.boardSvc.createBoard(room.id).pipe(
				switchMap(b => {
					room.boards.push(b.id);
					return this.roomSvc.updateRoom(room).pipe(
						tap(r => {
							const updatedRoomJson = JSON.stringify(room);
							localStorage.setItem('room', updatedRoomJson);
						}),
						map(r => b)
					);
				})
			);
		}

		this.competitorBoards$ = this.boardSvc.getCompetitorBoards(room.id);
	}
}
