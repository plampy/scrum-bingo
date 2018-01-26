import { Component } from '@angular/core';

@Component({
	selector: 'bingo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	navLinks = [
		{ label: 'rooms', link: 'rooms' },
		{ label: 'board', link: 'board' },
		{ label: 'terms', link: 'admin' }
	];
}
