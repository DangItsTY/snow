import {Component, OnInit, ViewChild} from '@angular/core'
import {Http} from '@angular/http'
import {Item} from '../newitem/newitem.component'

@Component({
	selector: 'requests',
	templateUrl: './requests.component.html',
	styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
	models = [];
	userModel = new User();
	userId;
	
	constructor(private http: Http) {
	}
  
	ngOnInit() {
		this.userId = sessionStorage.getItem("user");
		this.getShopInfo();
		this.getRequests();
	}
		
	getShopInfo() {
		console.log("getting shop information...");
		this.http
		  .get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/shopInfo/' + this.userId)
		  .subscribe(res => {
			  console.log("got shop info", res);
			  var results = res.json();
			  var result = results[0];
			  this.userModel = new User(result.firstname, result.storename);
		  });
	}
	
	getRequests() {
		console.log("getting all requests...");
		this.http
		  .get('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/requests/' + this.userId)
		  .subscribe(res => {
			  console.log("got all requests!");
			  console.log(res);
			  var results = res.json();
			  this.models = results.map((currentValue, index, array) => {
				  return new Item(currentValue.name, currentValue.description, 'http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port") + currentValue.image, currentValue.price);
			  });
		  });
	}
}
export class User {

	constructor(
		public firstname?: string,
		public storename?: string
	) {  }

}
