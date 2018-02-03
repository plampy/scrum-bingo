import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { filter, map, tap, switchMap, zip } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerService, BoardService, RoomService } from '../../shared/services';
import { Room } from '../../shared/models';

@Injectable()
export class BoardCreatedGuard implements CanActivate {
	constructor(
		private playerSvc: PlayerService,
		private roomSvc: RoomService,
		private boardSvc: BoardService) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const roomId = next.params['roomId'];
		return this.playerSvc.player$.pipe(
			switchMap(player => {
				if (!player.boards[roomId]) {
					return this.boardSvc.createBoard().pipe(
						map(board => ({ ...board, roomId })),
						switchMap(board => this.boardSvc.addBoard(board)),
						switchMap(board => {
							const roomUpdates = <Partial<Room>>{ id: roomId, boards: { [board.id]: true }};
							return this.roomSvc.updateRoom(roomUpdates);
						}, board => board),
						switchMap(board => {
							player.boards[roomId] = board.id;
							return this.playerSvc.update(player);
						}),
						map(res => true)
					);
				}
				return of(true);
			})
		);
	}
}
