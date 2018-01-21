import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {	
	
	constructor(private http: Http) {
	}
  
	ngOnInit() {
	}
}