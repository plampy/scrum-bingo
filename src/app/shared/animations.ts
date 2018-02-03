import { trigger, transition, group, query, style, animate, sequence, stagger, keyframes } from '@angular/animations';

export const fade = [
	query(':enter',
		style({ opacity: 0 }),
		{ optional: true }),
	sequence([
		query(':leave',
			animate('300ms',
				style({
					opacity: 0
				})
			),
			{ optional: true }
		),
		query(':enter',
			animate('300ms',
				style({
					opacity: 1,
				})
			),
			{ optional: true })
	])
];

export const slideUp = [
	query('.mini-board',
		style({ opacity: 0, transform: 'translateY(200%)' }),
		{ optional: true }),
	query('.mini-board', stagger('100ms', [
		animate('.5s ease-in',
			style({ opacity: 1, transform: 'translateY(0)' }),
		)
	]), { optional: true })
];

export const fadeAbsolute = [
	sequence([
		query(':enter, :leave', style({ position: 'absolute' }), { optional: true }),
		query(':enter', style({ opacity: 0 }), { optional: true }),
		query(':leave',
			animate('300ms',
				style({
					opacity: 0
				})
			),
			{ optional: true }
		),
		query(':enter',
			animate('300ms',
				style({
					opacity: 1,
				})
			),
			{ optional: true })
	])
];

export const boardAnimation = trigger('boardAnimation', [
	transition('* => *', fadeAbsolute)
]);

export const miniBoardAnimation = trigger('miniBoardAnimation', [
	transition('* => *', slideUp)
]);

export const routeAnimation = trigger('routeAnimation', [
	transition('* => *', fade)
]);
