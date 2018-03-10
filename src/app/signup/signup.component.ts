import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {
	model = new Account()
	
	constructor(private http: Http) {
	}
  
	ngOnInit() {
	}
	
	onSubmit() {
		var formData = new FormData();
		for (var key in this.model) {
			formData.append(key, this.model[key]);
		}		
		this.http
		  .post('http://localhost:8080/addaccount', formData)
		  .subscribe();
	}
}
export class Account {
	constructor (
		public firstname?: string,
		public lastname?: string,
		public email?: string,
		public phone?: string,
		public storename?: string,
		public storeaddress?: string,
		public username?: string,
		public password?: string
	){}
}
