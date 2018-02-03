import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { mergeMap, tap, map, switchMap, filter, delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';

import { Board, Room, Player } from '../../../shared/models';
import { BoardService, RoomService, PlayerService } from '../../../shared/services';
import { miniBoardAnimation, fade, boardAnimation } from '../../../shared/animations';

@Component({
	selector: 'bingo-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.less'],
	animations: [
		miniBoardAnimation,
		boardAnimation,
	]
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
		this.route.params.subscribe(params => {
			const roomId = params['roomId'];

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
		});
	}

	resetBoard(board: Board) {
		this.boardSvc.createBoard().pipe(
			map(newBoard => ({ ...newBoard, id: board.id, roomId: board.roomId })),
			switchMap(b => this.boardSvc.updateBoard(b))
		).subscribe(b => console.log(b)); // TODO: loading spinner?
	}

	squareClicked(board: Board) {
		Observable.of(board).pipe(
			delay(300),
			switchMap(b => this.boardSvc.updateBoard(b))
		).subscribe(b => console.log(b)); // TODO: loading?
	}
}
