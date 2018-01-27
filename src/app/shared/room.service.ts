import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Room } from './models/room.model';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { map, take } from 'rxjs/operators';
import { withId } from './firebase-helper';

@Injectable()
export class RoomService {
	readonly dbName = 'rooms';

	constructor(private afs: AngularFirestore) { }

	createRoom(name: string): Observable<Room> {
		const room: Partial<Room> = { name, boards: [] };
		const collection = this.afs.collection(this.dbName);
		const result = Observable.fromPromise(collection.add(room));
		return result.pipe(
			map(r => <Room>{ id: r.id, name, boards: [] })
		);
	}

	getRooms(): Observable<Room[]> {
		const collection = this.afs.collection(this.dbName);
		return this.afs.collection<Room>(this.dbName).snapshotChanges()
			.pipe(
			map(actions => withId<Room>(actions))
			);
	}

	updateRoom(room: Room): Observable<any> {
		const doc = this.afs.collection<Room>(this.dbName).doc(room.id);
		const promise = doc.update(room);
		return Observable.fromPromise(promise);
	}
}
