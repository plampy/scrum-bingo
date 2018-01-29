import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { filter } from 'rxjs/operators';

// stopgap until ngrx stuff gets set up
@Injectable()
export class AppService {
	public navDrawerOpen$ = new ReplaySubject<any>(1);

	openNavDrawer() {
		this.navDrawerOpen$.next({});
	}
}
