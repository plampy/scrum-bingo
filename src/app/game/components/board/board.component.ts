import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Board, Square } from '../../../shared/models';

@Component({
	selector: 'bingo-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.less']
})
export class BoardComponent {
	@Input() board: Board = { rows: [] };
	@Input() size: 'default' | 'mini' = 'default';
	@Output() squareClicked = new EventEmitter<Square>();

	markSquare(square: Square) {
		if (this.size == 'mini') {
			return;
		}
		square.selected = true;
		this.squareClicked.emit(square);
	}
}
