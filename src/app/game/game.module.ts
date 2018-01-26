import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './game.component';
import { RoomComponent } from './containers/room/room.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [GameComponent, BoardComponent, RoomComponent],
	exports: [GameComponent, BoardComponent, RoomComponent]
})
export class GameModule { }
