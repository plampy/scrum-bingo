import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './containers/game/game.component';
import { BoardCreatedGuard } from './guards/board-created.guard';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	providers: [BoardCreatedGuard],
	declarations: [GameComponent, BoardComponent],
	exports: [GameComponent, BoardComponent]
})
export class GameModule { }
