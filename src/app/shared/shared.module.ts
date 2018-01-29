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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

import { BoardService } from './board.service';
import { RoomService } from './room.service';
import { PlayerService } from './player.service';
import { KeysPipe } from './pipes/keys.pipe';
import { CreateRoomDialogComponent } from './components/create-room-dialog/create-room-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	declarations: [
		KeysPipe,
		CreateRoomDialogComponent
	],
	providers: [
		TermsService,
		BoardService,
		RoomService,
		PlayerService
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
		MatRippleModule,
		MatSidenavModule,
		MatExpansionModule,
		MatListModule,
		MatDialogModule,
		MatGridListModule,
		KeysPipe
	],
	entryComponents: [
		CreateRoomDialogComponent
	]
})
export class SharedModule { }
