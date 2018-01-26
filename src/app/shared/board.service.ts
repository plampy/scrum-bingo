import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Board } from './models/board.model';
import { Observable } from 'rxjs/Observable';
import { Term } from './models/term.model';
import { Square } from './models/square.model';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import { map, filter } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class BoardService {
	readonly boardDb = 'board';
	constructor(private afs: AngularFirestore) { }

	createBoard(roomId: string): Observable<Board> {
		// if (previousBoard) {
		// 	const doc = this.afs.collection(this.boardDb).doc(previousBoard.id);
		// 	doc.delete(); // todo: throw this in the pipe below
		// }
		return this.afs.collection<Term>('terms').valueChanges()
			.pipe(
			take(1),
			switchMap(terms => {
				const board: Board = { rows: [], roomId };
				terms.sort((s1, s2) => 0.5 - Math.random());
				for (let i = 0; i < 5; i++) {
					const rowContent = terms.slice(i * 5, i * 5 + 5);
					const squares = rowContent.map(term => <Square>{ selected: false, text: term.text });
					board.rows.push({ squares: squares });
				}
				board.rows[2].squares[2] = { selected: true, text: 'Free' };
				const promise = this.afs.collection(this.boardDb).add(board);
				return Observable.fromPromise(promise).map(x => {
					board.id = x.id;
					return board;
				});
			}));
	}

	getCompetitorBoards(roomId: string): Observable<Board[]> {
		console.log(`searching for roomid ${roomId}`);
		return this.afs.collection<Board>(this.boardDb, ref => ref.where('roomId', '==', roomId))
			.snapshotChanges()
			.map(actions =>
				actions.map(action => {
					const data = <Board>action.payload.doc.data();
					data.id = action.payload.doc.id;
					return data;
				}));
	}

	getAllBoards(): Observable<Board[]> {
		return this.afs.collection<Board>(this.boardDb)
			.snapshotChanges()
			.map(actions =>
				actions.map(action => {
					const data = <Board>action.payload.doc.data();
					data.id = action.payload.doc.id;
					return data;
				}));
	}

	updateBoard(board: Board) {
		const doc = this.afs.collection<Board>(this.boardDb).doc(board.id);
		doc.update(board);
	}

	deleteBoards(): Observable<any> {
		return this.getAllBoards().pipe(
			take(1),
			map(boards => {
				const deletes = boards.map(board => {
					const doc = this.afs.collection<Board>(this.boardDb).doc(board.id);
					return Observable.fromPromise(doc.delete());
				});
				return Observable.forkJoin(deletes);
			})
		);
	}
}
