import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Term, Square, Board } from '../models';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import 'rxjs/add/observable/fromPromise';
import { withId } from '../firebase-helper';

@Injectable()
export class TermsService {
	readonly termDb = 'terms';
	constructor(private afs: AngularFirestore) { }

	saveTerm(term: Term): Observable<any> {
		const collection = this.afs.collection(this.termDb);
		let promise: Promise<any>;
		if (term.id) {
			promise = collection.doc(term.id).update({ text: term.text });
		}
		else {
			promise = collection.add({ text: term.text });
		}
		return Observable.fromPromise(promise);
	}

	deleteTerm(termId: string): Observable<any> {
		const doc = this.afs.collection(this.termDb).doc(termId);
		return Observable.fromPromise(doc.delete());
	}

	getTerms(): Observable<Term[]> {
		return this.afs.collection<Term>(this.termDb).snapshotChanges()
			.pipe(
			map(actions => withId<Term>(actions))
			);
	}
}
