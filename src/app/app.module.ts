import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { GameModule } from './game/game.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './containers/home/home.component';
import { AppService } from './services/app.service';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
	shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
	store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void { }
	shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return null; }
	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return curr.routeConfig === null && future.routeConfig === null;
	}
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		CommonModule,
		GameModule,
		FormsModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule
	],
	providers: [
		AppService,
		{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
