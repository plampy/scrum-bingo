import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { map, switchMap, filter, tap, combineLatest, take, publishLast } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/combineLatest';

import { Player, Room } from '../models';
import { withId } from '../firebase-helper';
import { BoardService } from './board.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PlayerService {
	public player$: Observable<Player>;
	private linkSubject$ = new BehaviorSubject<void>(null);

	constructor(
		private afa: AngularFireAuth,
		private afs: AngularFirestore,
		private boardSvc: BoardService) {
		this.afa.authState.subscribe(authState => {
			if (!authState) {
				this.afa.auth.signInAnonymously();
			}
		});
		this.player$ = Observable.combineLatest(this.linkSubject$, this.afa.authState).pipe(
			switchMap(sub => this.getPlayerInfo())
		);
	}

	linkWithGoogleAccount(): Observable<any> {
		return this.afa.authState.pipe(
			filter(auth => !!auth),
			take(1),
			switchMap(auth => {
				const linkPromise = auth.linkWithPopup(new firebase.auth.GoogleAuthProvider());
				return Observable.fromPromise(linkPromise).pipe(
					switchMap(cred => auth.reauthenticateWithCredential(cred.credential)),
					switchMap(cred => auth.reload())
				);
			}),
			tap(x => this.linkSubject$.next(null))
		);
	}

	getPlayerInfo(): Observable<Player> {
		return this.afa.authState.pipe(
			filter(auth => !!auth),
			switchMap(auth => this.getOrCreatePlayer(auth.uid),
				(user, player) => ({ user, player })),
			map(combined => {
				const isAnonymous = combined.user.isAnonymous;
				return {
					...combined.player,
					isAnonymous,
					displayName: isAnonymous ? null : combined.user.providerData[0].displayName
				};
			})
		);
	}

	logout(): Observable<void> {
		return this.afa.authState.pipe(
			filter(auth => !!auth && !auth.isAnonymous),
			switchMap(auth => auth.delete()),
		);
	}

	private getOrCreatePlayer(userId: string): Observable<Player> {
		return this.afs.collection<Player>('players', ref =>
			ref.where('userId', '==', userId).limit(1)).snapshotChanges()
			.pipe(
			map(actions => withId<Player>(actions)),
			map(players => players[0]),
			switchMap(player => {
				if (player) {
					return of(player);
				}
				const addPromise = this.afs.collection('players').add({ userId, boards: {} });
				return Observable.fromPromise(addPromise).pipe(
					map(d => <Player>{
						id: d.id,
						...player
					})
				);
			})
			);
	}

	update(player: Player): Observable<any> {
		const doc = this.afs.collection('players').doc(player.id);
		const promise = doc.update(player);
		return Observable.fromPromise(promise);
	}
}
