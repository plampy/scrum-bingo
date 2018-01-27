import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoomComponent } from './game/containers/room/room.component';
import { BoardCreatedGuard } from './game/guards/board-created.guard';

const routes: Routes = [
	{ path: ':roomId/board', component: GameComponent, canActivate: [BoardCreatedGuard] },
	{ path: 'rooms', component: RoomComponent },
	{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
	{ path: '**', redirectTo: 'rooms' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
