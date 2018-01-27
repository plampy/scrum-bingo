import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { filter, map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerService } from '../../shared/player.service';
import { BoardService } from '../../shared/board.service';

@Injectable()
export class BoardCreatedGuard implements CanActivate {
	constructor(
		private playerSvc: PlayerService,
		private boardSvc: BoardService) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		console.log('in guard');
		const roomId = next.params['roomId'];
		return this.playerSvc.player$.pipe(
			tap(player => console.log('in guard')),
			switchMap(player => {
				if (!player.boards[roomId]) {
					return this.boardSvc.createBoard(roomId).pipe(
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
