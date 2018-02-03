import { Component, OnInit } from '@angular/core';
import { BoardService } from '../shared/services';

@Component({
	selector: 'bingo-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.less']
})
export class AdminComponent {
	constructor(private svc: BoardService) { }

	deleteAllBoards() {
		this.svc.deleteBoards().subscribe(res => console.log('delete finished'));
	}
}
