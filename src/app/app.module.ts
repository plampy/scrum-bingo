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

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		CommonModule,
		GameModule,
		FormsModule,
		MatButtonModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
