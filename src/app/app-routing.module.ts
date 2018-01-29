import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/containers/game/game.component';
import { BoardCreatedGuard } from './game/guards/board-created.guard';
import { HomeComponent } from './containers/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: ':roomId/board', component: GameComponent, canActivate: [BoardCreatedGuard] },
	{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
