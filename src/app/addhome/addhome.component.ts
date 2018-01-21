import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'

@Component({
	selector: 'addhome',
	templateUrl: './addhome.component.html',
	styleUrls: ['./addhome.component.css']
})
export class AddhomeComponent {	
	
	constructor(private http: Http) {
	}
  
	ngOnInit() {
	}
}