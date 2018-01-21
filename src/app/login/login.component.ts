import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {		
	constructor(private http: Http) {
	}
  
	ngOnInit() {
	}
}