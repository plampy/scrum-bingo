import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoomComponent } from './game/containers/room/room.component';

const routes: Routes = [
	{ path: 'board', component: GameComponent },
	{ path: 'rooms', component: RoomComponent },
	{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
	{ path: '**', redirectTo: 'rooms' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
