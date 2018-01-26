import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsService } from './terms.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';

import { BoardService } from './board.service';
import { RoomService } from './room.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		TermsService,
		BoardService,
		RoomService
	],
	exports: [
		MatButtonModule,
		MatTabsModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatMenuModule,
		MatRippleModule
	]
})
export class SharedModule { }
