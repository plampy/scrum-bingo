import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatRipple } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { delay, switchMap, take, map } from 'rxjs/operators';
import 'rxjs/add/observable/interval';

import { Board } from '../../shared/models/board.model';
import { BoardService } from '../../shared/board.service';
import { AppService } from '../../services/app.service';

@Component({
	selector: 'bingo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	@ViewChildren(MatRipple) ripples: QueryList<MatRipple>;

	constructor(private appService: AppService) { }

	ngOnInit() {
		Observable.interval(500).pipe(
			delay(500),
			take(5),
			map(i => this.ripples.toArray()[i]))
			.subscribe(ripple => {
				const config = { centered: true, persistent: true, color: 'rgba(140, 201, 249, .8)' };
				ripple.launch(0, 0, config);
			});
	}

	openDrawer() {
		this.appService.openNavDrawer();
	}
}
