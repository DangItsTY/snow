import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Router, NavigationStart} from '@angular/router'

@Component({
	selector: 'addhome',
	templateUrl: './addhome.component.html',
	styleUrls: ['./addhome.component.css']
})
export class AddhomeComponent {
	hidden: boolean;
	
	constructor(private http: Http, private router: Router) {
	}
  
	ngOnInit() {
		this.hidden = true;
	}
	
	setHiddenState(change) {
		if (change instanceof NavigationStart) {
			if (change.url == "/login" ||
				change.url == "/signup") {
				this.hidden = false;
			} else {
				this.hidden = true;
			}
		}
	}
}