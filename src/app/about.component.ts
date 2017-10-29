import { Component } from '@angular/core';

@Component({
	selector: 'about-component',
	templateUrl: './about.component.html'
})

export class AboutComponent {
	links = [
		{
			title: "Google+",
			link: "https://plus.google.com/+EdricChan03"
		},
		{
			title: "Facebook",
			link: "https://facebook.com/Chan4077"
		},
		{
			title: "Instagram",
			link: "https://instagram.com/chanedric"
		},
		{
			title: "Github",
			link: "https://github.com/Chan4077"
		},
		{
			title: "Twitter",
			link: "https://twitter.com/EdricChan03"
		}
	]
}
