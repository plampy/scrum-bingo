import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './containers/game/game.component';
import { RoomComponent } from './containers/room/room.component';
import { BoardCreatedGuard } from './guards/board-created.guard';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	providers: [BoardCreatedGuard],
	declarations: [GameComponent, BoardComponent, RoomComponent],
	exports: [GameComponent, BoardComponent, RoomComponent]
})
export class GameModule { }
