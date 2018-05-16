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
			if (result == undefined) { alert("Oops! Something went wrong."); }
			else {
				this.userModel = new User(result.firstname, result.storename);
			}
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
			if (results.length == 0) { alert("Oops! Something went wrong."); }
			else {
				this.models = results.map((currentValue, index, array) => {
					return new Item(currentValue);
				});
				console.log(this.models);
			}
		});
	}
	
	setBy(event, model) {
		var formData = new FormData();
		for (var key in model) {
			formData.append(key, model[key]);
		}
		console.log(model);
		this.http
			.post('http://'+sessionStorage.getItem("hostname")+":"+sessionStorage.getItem("port")+'/setBy/'+model.rid , formData)
			.subscribe(res => {
				console.log("successfully posted", res);
				this.getRequests();
			});
	}
}
export class User {

	constructor(
		public firstname?: string,
		public storename?: string
	) {  }

}
