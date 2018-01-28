import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { mergeMap, tap, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';

import { Board } from '../../../shared/models/board.model';
import { BoardService } from '../../../shared/board.service';
import { Room } from '../../../shared/models/room.model';
import { RoomService } from '../../../shared/room.service';
import { PlayerService } from '../../../shared/player.service';
import { Player } from '../../../shared/models/player.model';

@Component({
	selector: 'bingo-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
	public board$: Observable<Board>;
	public competitorBoards$: Observable<Board[]>;
	public player$: Observable<Player>;

	constructor(
		public boardSvc: BoardService,
		public roomSvc: RoomService,
		private playerSvc: PlayerService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		const roomId = this.route.snapshot.params['roomId'];

		this.player$ = this.playerSvc.player$;
		this.board$ = this.player$.pipe(
			switchMap(player => {
				const boardId = player.boards[roomId];
				return this.boardSvc.getBoard(boardId);
			})
		);
		this.competitorBoards$ = this.boardSvc.getByRoom(roomId).pipe(
			combineLatest(this.board$),
			map(both => {
				const allBoards = both[0];
				const currentBoard = both[1];
				return allBoards.filter(b => b.id != currentBoard.id);
			})
		);
	}

	resetBoard(board: Board) {
		this.board$ = this.boardSvc.createBoard().pipe(
			map(newBoard => ({ ...newBoard, id: board.id, roomId: board.roomId })),
			switchMap(b => this.boardSvc.updateBoard(b))
		);
	}
}