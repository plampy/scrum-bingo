import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from './shared/player.service';

@Component({
	selector: 'bingo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	navLinks = [
		{ label: 'rooms', link: 'rooms' },
		{ label: 'terms', link: 'admin' }
	];
}
