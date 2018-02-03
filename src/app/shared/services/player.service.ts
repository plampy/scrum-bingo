import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { map, switchMap, filter, tap, combineLatest } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';

import { Player, Room } from '../models';
import { withId } from '../firebase-helper';
import { BoardService } from './board.service';

@Injectable()
export class PlayerService {
	public player$: Observable<Player>;

	constructor(
		private afa: AngularFireAuth,
		private afs: AngularFirestore,
		private boardSvc: BoardService) {
		const signInPromise = this.afa.auth.signInAnonymously();
		this.player$ = Observable.fromPromise(signInPromise).pipe(
			switchMap(x => this.afa.authState),
			filter(auth => !!auth.uid),
			switchMap(auth =>
				this.afs.collection<Player>('players', ref =>
					ref.where('userId', '==', auth.uid)).snapshotChanges()
					.pipe(
					map(actions => withId<Player>(actions)),
					map(players => players[0]),
					switchMap(player => {
						if (player) {
							return of(player);
						}
						const addPromise = this.afs.collection<Player>('players').add({ userId: auth.uid, boards: {} });
						return Observable.fromPromise(addPromise).pipe(
							map(d => <Player>{ id: d.id, userId: auth.uid })
						);
					}))
			)
		);
	}

	update(player: Player): Observable<any> {
		const doc = this.afs.collection('players').doc(player.id);
		const promise = doc.update(player);
		return Observable.fromPromise(promise);
	}
}
