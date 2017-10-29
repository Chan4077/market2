import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple, RippleRef } from '@angular/material/core';
@Component({
	selector: 'app-testpage',
	templateUrl: './testpage.component.html'
})
export class TestpageComponent implements OnInit {
	@ViewChild(MatRipple) featureDiscovery: MatRipple;
	launchRef: RippleRef;
	interval: any;
	hasFeatureDiscovery: boolean = false;
	constructor() { }

	ngOnInit() {
	}
	launchFeatureDiscovery() {
		this.hasFeatureDiscovery = true;
		// WARNING: May lag quite a bit
		this.interval = setInterval(() => {
			this.launchRef = this.featureDiscovery.launch(0, 0, {
				centered: true,
				persistent: true,
				color: '#ffffff99',
				speedFactor: 0.5
			});
			setTimeout(()=> {
				this.launchRef.fadeOut();
				this.launchRef = null;
			}, 500);
		}, 1500);
	}
	stop() {
		clearInterval(this.interval);
		this.interval = null;
		console.log("test");
		this.hasFeatureDiscovery = false;
	}
}
