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
		var formData = new FormData();
		for (var key in this.model) {
			formData.append(key, this.model[key]);
		}
		this.http
		  .post('http://localhost:8080/login' , formData)
		  .subscribe(res => {
			  var result = res.json();
			  result = result[0].id;
			  sessionStorage.setItem("user", result);
			  this.router.navigate(['/shop']);
		  });
	}
}
export class Account {

	constructor(
		public username?: string,
		public password?: string,
	) {  }

}