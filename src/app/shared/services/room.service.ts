import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Room, Player } from '../models';
import { withId } from '../firebase-helper';

import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { map, take, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class RoomService {
	readonly dbName = 'rooms';

	constructor(private afs: AngularFirestore) { }

	createRoom(name: string, player: Player): Observable<Room> {
		const room: Partial<Room> = { name, boards: {}, createdBy: player.userId };
		const collection = this.afs.collection(this.dbName);
		const result = Observable.fromPromise(collection.add(room));
		return result.pipe(
			map(r => <Room>{ id: r.id, name, boards: {} })
		);
	}

	getRooms(): Observable<Room[]> {
		const collection = this.afs.collection(this.dbName);
		return this.afs.collection<Room>(this.dbName).snapshotChanges()
			.pipe(
			map(actions => withId<Room>(actions))
			);
	}

	updateRoom(changes: Partial<Room>): Observable<any> {
		const doc = this.afs.collection<Room>(this.dbName).doc<Room>(changes.id);
		return doc.valueChanges().pipe(
			map(room =>
				({
					...room, ...changes, boards: { ...room.boards, ...changes.boards }
				})
			),
			switchMap(room => Observable.fromPromise(doc.update(room)))
		);
	}
}
