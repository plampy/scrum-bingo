import { DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export function withId<T>(actions: DocumentChangeAction[]) {
	return actions.map(action => {
		const data = action.payload.doc.data();
		data.id = action.payload.doc.id;
		return <T>data;
	});
}
