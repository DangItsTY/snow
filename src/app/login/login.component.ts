import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Router} from '@angular/router'

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	model = new Account()
	
	constructor(private http: Http, private router: Router) {
	}
  
	ngOnInit() {
	}
	
	onSubmit() {
		console.log("logging in");
		this.router.navigateByUrl('/cart');
	}
	
	onSubmit2() {
		var formData = new FormData();
		for (var key in this.model) {
			formData.append(key, this.model[key]);
		}	
		this.http
		  .post('http://localhost:8080/fileupload', formData)
		  .subscribe();
	}
}
export class Account {

	constructor(
		public username?: string,
		public password?: string,
	) {  }

}