import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
	selector: 'bingo-create-room-dialog',
	templateUrl: './create-room-dialog.component.html',
	styleUrls: ['./create-room-dialog.component.less']
})
export class CreateRoomDialogComponent implements OnInit {

	constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
	}
}
