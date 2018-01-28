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
import { of } from 'rxjs/observable/of';
import { withId } from './firebase-helper';

@Injectable()
export class BoardService {
	readonly boardDb = 'board';
	constructor(private afs: AngularFirestore) { }

	createBoard(): Observable<Board> {
		return this.afs.collection<Term>('terms').valueChanges()
			.pipe(
			take(1),
			map(terms => {
				const board: Board = { rows: [] };
				terms.sort((s1, s2) => 0.5 - Math.random());
				for (let i = 0; i < 5; i++) {
					const rowContent = terms.slice(i * 5, i * 5 + 5);
					const squares = rowContent.map(term => <Square>{ selected: false, text: term.text });
					board.rows.push({ squares: squares });
				}
				board.rows[2].squares[2] = { selected: true, text: 'Free' };
				return board;
			}));
	}

	addBoard(board: Board): Observable<Board> {
		const promise = this.afs.collection(this.boardDb).add(board);
		return Observable.fromPromise(promise).pipe(
			map(x => ({ ...board, id: x.id }))
		);
	}

	getBoard(boardId: string): Observable<Board> {
		const boardDoc = this.afs.collection<Board>(this.boardDb).doc<Board>(boardId);
		return boardDoc.valueChanges().pipe(
			map(board => ({ ...board, id: boardId }))
		);
	}

	getByRoom(roomId: string): Observable<Board[]> {
		return this.afs.collection<Board>(this.boardDb, ref => ref.where('roomId', '==', roomId))
			.snapshotChanges()
			.pipe(
			map(actions => withId<Board>(actions))
			);
	}

	getAllBoards(): Observable<Board[]> {
		return this.afs.collection<Board>(this.boardDb)
			.snapshotChanges()
			.pipe(
			map(actions => withId<Board>(actions))
			);
	}

	updateBoard(board: Board): Observable<Board> {
		const doc = this.afs.collection<Board>(this.boardDb).doc(board.id);
		const promise = doc.update(board);
		return Observable.fromPromise(promise).pipe(
			map(x => board)
		);
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
