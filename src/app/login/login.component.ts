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
		  .post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/login' , formData)
		  .subscribe(res => {
			  var result = res.json();
			  result = result[0];
			  sessionStorage.setItem("user", result.id);
			  if (result.supplier) {
				this.router.navigate(['/requests']);
			  } else {
				this.router.navigate(['/cart']);
			  }
		  });
	}
}
export class Account {

	constructor(
		public username?: string,
		public password?: string,
	) {  }

}